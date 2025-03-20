import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { MarketingFacade } from '@/newapp/dashboard/facades/marketing.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { MkRevByReferral } from '@/newapp/models/dashboard/marketing';
import {
  externalTooltipHandler,
  formatXTooltipLabel,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import _ from 'lodash';
import camelCase from 'camelcase';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';

@Component({
  selector: 'revenue-by-referral-chart',
  templateUrl: './revenue-by-referral.component.html',
  styleUrls: ['./revenue-by-referral.component.scss'],
})
export class MarketingRevByReferralComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets = [{ data: [] }];
  labels = [];
  tableData = [];
  revByReferralVal = 0;

  isChartClicked = false;

  showTableInfo = false;
  toggleTableInfo() {
    this.showTableInfo = !this.showTableInfo;
  }

  get isExactOrCore$() {
    return combineLatest([
      this.clinicFacade.isEachClinicExact$,
      this.clinicFacade.isEachClinicCore$,
    ]).pipe(
      map(values => {
        return values[0] || values[1];
      })
    );
  }

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.marketingFacade.isLoadingRevByReferral$,
      this.marketingFacade.isLoadingRevByReferralTrend$,
    ]).pipe(map(([isTrend, v, v1]) => (isTrend ? v1 : v)));
  }

  get isLoadingTrend$() {
    return this.marketingFacade.isLoadingRevByReferralTrend$;
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v => typeof v == 'string')
    );
  }

  get chartType$() {
    return combineLatest([
      this.clinicFacade.currentClinicId$,
      this.isTrend$,
    ]).pipe(
      map(([v, isTrend]) => {
        if (isTrend) {
          return 'bar';
        } else if (typeof v === 'string') {
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
      map(([v, isTrend]) => {
        if (isTrend) {
          return this.stackedChartOptionsRev;
        }
        if (typeof v === 'string') {
          return this.stackedChartOptionsRev;
        } else {
          return this.pieChartOptions;
        }
      })
    );
  }

  get hasData() {
    return this.datasets.length > 0 && this.labels.length > 0;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get legend$() {
    return combineLatest([this.isMultipleClinic$, this.isTrend$]).pipe(
      map(([isMultiClinics, isTrend]) => !isMultiClinics && !isTrend)
    );
  }

  get isTableIconVisible$() {
    return combineLatest([
      this.isTrend$,
      this.isMultipleClinic$
    ]).pipe(
      map(
      ([isTrend, isMultiClinicsMode]) => 
        !isTrend && !isMultiClinicsMode && this.hasData && (this.tableData?.length > 0)
    ));
  }

  get showMaxBarsAlert$() {
    return combineLatest([
      this.showTableView$,
      this.isTableIconVisible$,
    ]).pipe(
      map(([v, v1]) => {
        return !v && (this.tableData?.length > this.labels?.length) && v1;
      })
    ) 
}

  get showMaxBarsAlertMsg$() {
    return this.authFacade.chartLimitDesc$;
  }

  get showTableView$() {
    return this.isTableIconVisible$.pipe(map(
      v => this.showTableInfo && v
    ))
}

  constructor(
    private marketingFacade: MarketingFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe,
    private authFacade: AuthFacade
  ) {
    this.loadData();
  }

  loadData() {
    combineLatest([
      this.marketingFacade.revByReferralChartData$,
      this.isTrend$,
      this.marketingFacade.revByReferralTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData, isTrend, trendChartData]) => {
        this.isChartClicked = false;
        // missing sort
        if (isTrend) {
          this.datasets = trendChartData.datasets;
          this.labels = trendChartData.labels;
          //this.revByReferralVal = trendChartData.revByReferralVal;
        } else {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          this.revByReferralVal = chartData.revByReferralVal;
          this.tableData = chartData.tableData
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
        this.marketingFacade.revByReferralData$,
      ])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([isMulti, result]) => {
          if (result != null && !isMulti) {
            const apiResData = <MkRevByReferral>result.data;
            let chartData = [],
              chartLabels = [];
            if (apiResData.patientsRefname[activeLabel].length > 0) {
              this.isChartClicked = true;
              _.chain(apiResData.patientsRefname[activeLabel])
                .sortBy(a => -parseFloat(<string>a.invoiceAmount))
                .slice(0, 15)
                .value()
                .forEach(item => {
                  chartData.push(parseFloat(<string>item.invoiceAmount));
                  chartLabels.push(item.referralName);
                });
            }
            this.datasets = [{ data: chartData }];
            this.labels = chartLabels;
          }
        });
    }
  }

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // colors: { enabled: true },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: args => {
          externalTooltipHandler(args, 'pointer');
        },
        callbacks: {
          label: tooltipItem => formatXTooltipLabel(tooltipItem),
          title: () => '',
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
  };

  public stackedChartOptionsRev: ChartOptions<'bar'> = {
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
          callback: function (label: number) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency =
                label < 0
                  ? label.toString().split('-').join('')
                  : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              return `${label < 0 ? '- $' : '$'}${currency}`;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        // enabled: false,
        itemSort: (itemA, itemB): number => {
          return itemB.parsed.y - itemA.parsed.y;
        },
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.parsed.y == 0) {
              return '';
            }
            return tooltipItem.parsed.y < 0
              ? '- $'
              : `${tooltipItem.dataset.label}: $${tooltipItem.formattedValue}`;
          },
          title: tooltipItems => {
            const sumV = _.sumBy(tooltipItems, t => t.parsed.y);
            return `${tooltipItems[0].label}: $${this.decimalPipe.transform(
              sumV
            )}`;
          },
        },
      },
    },
  };
}
