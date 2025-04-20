import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianProcedureFacade } from '@/newapp/dashboard/facades/clinician-procedures.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { formatXTooltipLabel, shortString } from '@/newapp/shared/utils';
import { ChartTip } from '@/newapp/models/dashboard/finance';

@Component({
  selector: 'cp-rev-per-procedure-chart',
  templateUrl: './rev-per-procedure.component.html',
  styleUrls: ['./rev-per-procedure.component.scss'],
})
export class CpRevPerProcedureComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets: ChartDataset[] = [];
  labels = [];
  showTopValues = false;

  get isLoading$() {
    return this.cpFacade.isLoadingCpRevPerProcedure$;
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(map(v => typeof v == 'string'));
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get hasData() {
    return this.labels.length > 0;
  }

  constructor(
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private cpFacade: ClinicianProcedureFacade,
    private numPipe: DecimalPipe,
  ) {}

  ngOnInit(): void {
    combineLatest([this.cpFacade.cpRevPerProcedureChartData$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData]) => {
        this.datasets = chartData.datasets;
        this.labels = chartData.labels;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  toggleShowTopValues() {
    this.showTopValues = !this.showTopValues;
  }

  get chartOptions() {
    return this.showTopValues ? this.proceedureChartOptions1 : this.proceedureChartOptionsDP;
  }

  public proceedureChartOptionsDP: ChartOptions = {
    indexAxis: 'y', // horizontal bar chart,
    hover: { mode: null },
    responsive: true,
    maintainAspectRatio: false,
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
            return shortString(yLabel);
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
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
