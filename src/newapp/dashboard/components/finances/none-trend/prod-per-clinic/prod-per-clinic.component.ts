import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { externalTooltipHandler } from '@/newapp/shared/utils';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'prod-per-clinic-chart',
  templateUrl: './prod-per-clinic.component.html',
  styleUrls: ['./prod-per-clinic.component.scss'],
})
export class FinanceProdPerClinicComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets = [{ data: [] }];
  labels = [];
  productionChartTotal = 0;
  productionChartTrendTotal = 0;
  productionChartTrendIcon = 'down';

  get isLoading$() {
    return this.financeFacade.isLoadingFnProdPerClinician$;
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => typeof v == 'string')
    );
  }

  constructor(
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade
  ) {}

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
        onClick(e) {
          e.native.stopPropagation();
        },
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function (tooltipItem) {
            return (
              tooltipItem.label + ': ' + Math.round(tooltipItem.parsed) + '%'
            );
          },
        },
      },
    },
  };

  public pieChartColors = [
    {
      backgroundColor: [
        '#6edbbb',
        '#b0fffa',
        '#abb3ff',
        '#ffb4b5',
        '#fffcac',
        '#FFE4E4',
        '#FFD578',
        '#54D2FF',
        '#E58DD7',
        '#A9AABC',
        '#F2ECFF',
        '#5689C9',
        '#F9F871',
      ],
    },
  ];

  ngOnInit(): void {
    combineLatest([
      this.clinicFacade.currentClinicId$,
      this.financeFacade.prodByClinicianTotal$,
      this.financeFacade.prodByClinicianTrendTotal$,
      this.financeFacade.prodByClinicianChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([
          clinicId,
          prodByClinicianTotal,
          prodByClinicianTrendTotal,
          _prodByClinicData,
        ]) => {
          // missing sort
          const chartData = [],
            chartLabels = [];
          let chartTotal = 0;
          const prodByClinicData = _prodByClinicData.slice();

          if (typeof clinicId === 'string') {
            prodByClinicData.sort(
              (a, b) =>
                parseFloat(<string>b.productionPerClinic) -
                parseFloat(<string>a.productionPerClinic)
            );
          } else {
            prodByClinicData.sort(
              (a, b) =>
                parseFloat(<string>b.prodPerClinician) -
                parseFloat(<string>a.prodPerClinician)
            );
          }

          prodByClinicData.forEach((val, index) => {
            if (typeof clinicId == 'number') {
              const prodPerClinician = Math.round(
                parseFloat(<string>val.prodPerClinician)
              );

              if (prodPerClinician > 0) {
                chartData.push(prodPerClinician);
                chartLabels.push(val.providerName);
                chartTotal = chartTotal + prodPerClinician;
              }
            } else {
              const prodPerClinic = Math.round(
                parseFloat(<string>val.productionPerClinic)
              );
              const tPr = Math.round(
                (prodPerClinic * 100) / prodByClinicianTotal
              );
              chartData.push(tPr);
              chartLabels.push(val.clinicName);
              chartTotal = chartTotal + tPr;
            }
          });
          this.productionChartTrendTotal = prodByClinicianTrendTotal;
          this.productionChartTotal = chartTotal;
          this.labels = chartLabels;
          this.datasets = [{ data: chartData }];
          if (this.productionChartTotal >= this.productionChartTrendTotal) {
            this.productionChartTrendIcon = 'up';
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
