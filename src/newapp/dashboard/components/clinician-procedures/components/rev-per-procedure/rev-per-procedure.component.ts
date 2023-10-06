import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianProcedureFacade } from '@/newapp/dashboard/facades/clinician-procedures.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { DateRangeMenus } from '@/newapp/shared/components/date-range-menu/date-range-menu.component';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';
import { formatXTooltipLabel } from '@/newapp/shared/utils';

@Component({
  selector: 'cp-rev-per-procedure-chart',
  templateUrl: './rev-per-procedure.component.html',
  styleUrls: ['./rev-per-procedure.component.scss'],
})
export class CpRevPerProcedureComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets: ChartDataset[] = [];
  labels = [];
  showTopValues = false;

  get isLoading$() {
    return this.cpFacade.isLoadingCpRevPerProcedure$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => typeof v == 'string')
    );
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map(t => t !== 'off')
    );
  }

  get hasData() {
    return this.labels.length > 0;
  }

  constructor(
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private dentistFacade: DentistFacade,
    private cpFacade: ClinicianProcedureFacade,
    private sanitized: DomSanitizer,
    private numPipe: DecimalPipe
  ) {
    combineLatest([
      //this.isTrend$,
      // this.dentistFacade.currentDentistId$,
      this.cpFacade.cpRevPerProcedureChartData$,
      //this.isMultipleClinic$
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([
          //isTrend,
          //dentistId,
          chartData,
          //isMultiClinics
        ]) => {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
        }
      );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  toggleShowTopValues() {
    this.showTopValues = !this.showTopValues;
  }

  get chartOptions() {
    return this.showTopValues
      ? this.proceedureChartOptions1
      : this.proceedureChartOptionsDP;
  }

  public proceedureChartOptionsDP: ChartOptions = {
    indexAxis: 'y', // horizontal bar chart,
    hover: { mode: null },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
    animation: {
      duration: 1,
      easing: 'linear',
    },
    scales: {
      x: {
        ticks: {
          callback: (label: number, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return '$' + this.numPipe.transform(label);
            }
            return '';
          },
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number, index) {
            const yLabel = this.getLabelForValue(index);
            if (yLabel.length > 20) {
              return yLabel.slice(0, 20) + '....';
            } else {
              return yLabel;
            }
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        onClick: function (e) {
          e.native.stopPropagation();
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: function () {
            //var idx = tooltipItems[0].index;
            // return data.labels[idx];//do something with title
            return '';
          },
          label: tooltipItem => formatXTooltipLabel(tooltipItem),
        },
      },
    },
  };

  public proceedureChartOptions1: ChartOptions = {
    ...this.proceedureChartOptionsDP,
    animation: {
      duration: 1,
      easing: 'linear',
      onComplete: function () {
        var chartInstance = this,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.textBaseline = 'bottom';
        // Loop through each data in the datasets
        this.data.datasets.forEach((dataset, i) => {
          var meta = chartInstance.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            let num = dataset.data[index];
            let dataK = shortenLargeNumber(num, 1);
            let dataDisplay = `$${dataK}`;
            ctx.font = 'normal 11px Gilroy-Bold';
            ctx.fillText(dataDisplay, bar.x + 20, bar.y + 5);

            function shortenLargeNumber(num, digits) {
              var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
                decimal;

              for (var i = units.length - 1; i >= 0; i--) {
                decimal = Math.pow(1000, i + 1);

                if (num <= -decimal || num >= decimal) {
                  return +(num / decimal).toFixed(digits) + units[i];
                }
              }

              return num;
            }
          });
        });
      },
    },
  };
}
