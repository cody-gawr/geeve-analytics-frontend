import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { MarketingFacade } from '@/newapp/dashboard/facades/marketing.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { MkNewPatientsByReferral } from '@/newapp/models/dashboard/marketing';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, Chart } from 'chart.js';
import _, { camelCase } from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'new-patient-by-referral-chart',
  templateUrl: './new-patient-by-referral.component.html',
  styleUrls: ['./new-patient-by-referral.component.scss'],
})
export class MarketingNewPatientByReferralComponent
  implements OnInit, OnDestroy
{
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets = [];
  labels = [];
  newPatientsByReferralVal = 0;
  isChartClicked = false;

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.marketingFacade.isLoadingNewPatientsByReferral$,
      this.marketingFacade.isLoadingNewPatientsByReferralTrend$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([isTrend, v, v1]) => (isTrend ? v1 : v))
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => typeof v == 'string')
    );
  }

  get chartType$() {
    return combineLatest([
      this.clinicFacade.currentClinicId$,
      this.isTrend$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([v, trendMode]) => {
        if (trendMode) {
          return 'bar';
        }
        if (typeof v === 'string') {
          return 'bar';
        } else {
          return 'doughnut';
        }
      })
    );
  }

  get chartOptions$() {
    return combineLatest([
      this.clinicFacade.currentClinicId$,
      this.isTrend$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([v, isTrend]) => {
        if (isTrend) {
          return this.stackedChartOptionsRef;
        }
        if (typeof v === 'string') {
          return this.stackedChartOptionsRef;
        } else {
          return this.noNewPatientsByReferralChartOptions;
        }
      })
    );
  }

  get hasData() {
    return this.labels.length > 0;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map(t => t !== 'off')
    );
  }

  get isActivePatients$() {
    return this.marketingFacade.isActivePatients$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  constructor(
    private marketingFacade: MarketingFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe
  ) {
    this.loadData();
  }

  loadData() {
    combineLatest([
      this.marketingFacade.newPatientsByReferralChartData$,
      this.isTrend$,
      this.marketingFacade.newPatientsByReferralTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData, isTrend, trendChartData]) => {
        this.isChartClicked = false;
        if (isTrend) {
          this.datasets = trendChartData.datasets;
          this.labels = trendChartData.labels;
        } else {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          this.newPatientsByReferralVal = chartData.newPatientsByReferralVal;
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  public chartClicked(event: any) {
    if (!this.isChartClicked && event.active.length > 0) {
      // pms != exact or core
      const clickedElementIndex = event.active[0].index;
      const activeLabel = camelCase(
        <string>(<Chart>event.event.chart).data.labels[clickedElementIndex]
      );
      combineLatest([
        this.isMultipleClinic$,
        this.marketingFacade.newPatientsByReferralData$,
      ])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([isMulti, result]) => {
          if (result != null && !isMulti) {
            const apiResData = <MkNewPatientsByReferral>result.data;
            let chartData = [],
              chartLabels = [];
            if (apiResData.patientsRefname[activeLabel].length > 0) {
              this.isChartClicked = true;
              apiResData.patientsRefname[activeLabel]
                .slice(0, 15)
                .forEach(item => {
                  chartData.push(parseInt(<string>item.numReferrals));
                  chartLabels.push(item.referralName);
                });
            }
            this.datasets = [{ data: chartData }];
            this.labels = chartLabels;
          }
        });
    }
  }

  public noNewPatientsByReferralChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: tooltipItem => {
            return (
              tooltipItem.label +
              ': ' +
              this.decimalPipe.transform(
                <number>tooltipItem.dataset.data[tooltipItem.dataIndex]
              )
            );
          },
          title: function () {
            return '';
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
        onClick: function (e) {
          e.native.stopPropagation();
        },
      },
    },
    elements: {},
  };

  public stackedChartOptionsRef: ChartOptions<'bar'> = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency =
                label < 0
                  ? label.toString().split('-').join('')
                  : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              return label; // `${label < 0 ? '- $' : '$'}${currency}`;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        itemSort: (itemA, itemB): number => {
          return itemB.parsed.y - itemA.parsed.y;
        },
        callbacks: {
          label: function (tooltipItems) {
            if (tooltipItems.parsed.y > 0) {
              return `${tooltipItems.dataset.label}: ${tooltipItems.formattedValue}`;
            } else {
              return '';
            }
          },
          title: tooltipItems => {
            const sumV = _.sumBy(tooltipItems, t => t.parsed.y);
            return `${tooltipItems[0].label}: ${this.decimalPipe.transform(
              sumV
            )}`;
          },
        },
      },
    },
  };
}
