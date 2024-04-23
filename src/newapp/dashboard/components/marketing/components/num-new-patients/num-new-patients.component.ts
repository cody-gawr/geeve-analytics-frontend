import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { MarketingFacade } from '@/newapp/dashboard/facades/marketing.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  externalTooltipHandler,
  generatingLegend_4,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import moment from 'moment';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'num-new-patients-chart',
  templateUrl: './num-new-patients.component.html',
  styleUrls: ['./num-new-patients.component.scss'],
})
export class MarketingNumNewPatientsComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get trendingIcon() {
    return this.newNumPatientsVal >= this.newNumPatientsPrev
      ? 'trending_up'
      : 'trending_down';
  }

  get maxNewNumPatientsGoal() {
    return this.newNumPatientsVal > this.newNumPatientsGoal
      ? this.newNumPatientsVal
      : this.newNumPatientsGoal;
  }

  get displayTitle$() {
    return this.marketingFacade.isActivePatients$.pipe(
      map(v => (v ? 'No. Active Patients' : 'No. New Patients'))
    );
  }

  get isActivePatients$() {
    return this.marketingFacade.isActivePatients$;
  }

  enableActivePatients() {
    this.marketingFacade.setActivePatients(true);
  }

  disableActivePatients() {
    this.marketingFacade.setActivePatients(false);
  }

  get isFullMonthsDateRange$() {
    return combineLatest([
      this.layoutFacade.isFullMonthsDateRange$,
      this.isTrend$,
    ]).pipe(map(([isFull, isTrend]) => isFull || isTrend));
  }

  newNumPatientsVal = 0;
  newNumPatientsPrev = 0;
  newNumPatientsGoal = 0;

  datasets: ChartDataset[] = [];
  labels = [];

  get isConnectedWith$() {
    return this.dashboardFacade.isConnectedWith$;
  }

  get isLoading$() {
    return combineLatest([
      this.marketingFacade.isLoadingNewNumPatients$,
      this.marketingFacade.isLoadingNewNumPatientsTrend$,
      this.marketingFacade.isLoadingMkActivePatients$,
      this.marketingFacade.isLoadingMkActivePatientsTrend$,
    ]).pipe(
      map(
        ([
          isLoading,
          isTrendLoading,
          isActiveLoading,
          isActiveTrendLoading,
        ]) => {
          return (
            isTrendLoading ||
            isLoading ||
            isActiveLoading ||
            isActiveTrendLoading
          );
        }
      )
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.isMultiClinicsSelected$;
  }

  get durationLabel$() {
    return this.layoutFacade.durationLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get hasData$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMulti]) =>
        isTrend || isMulti ? this.labels.length > 0 : this.newNumPatientsVal > 0
      )
    );
  }

  constructor(
    private marketingFacade: MarketingFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private dashboardFacade: DashboardFacade,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.isTrend$,
      this.marketingFacade.newNumPatientsChartData$,
      this.marketingFacade.newNumPatientsTrendChartData$,
      this.marketingFacade.isActivePatients$,
      this.marketingFacade.activePatientsChartData$,
      this.marketingFacade.activePatientsTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([
          isTrend,
          chartData,
          trendChartData,
          isActive,
          activeChartData,
          activeTrendChartData,
        ]) => {
          if (isActive) {
            if (isTrend) {
              this.datasets = activeTrendChartData.datasets;
              this.labels = activeTrendChartData.labels;
            } else {
              this.datasets = activeChartData.datasets;
              this.labels = activeChartData.labels;
              this.newNumPatientsVal = activeChartData.activePatientsVal;
              this.newNumPatientsPrev = activeChartData.activePatientsPrev;
              this.newNumPatientsGoal = activeChartData.activePatientsGoal;
            }
          } else {
            if (isTrend) {
              this.datasets = trendChartData.datasets;
              this.labels = trendChartData.labels;
            } else {
              this.datasets = chartData.datasets;
              this.labels = chartData.labels;
              this.newNumPatientsVal = chartData.newNumPatientsVal;
              this.newNumPatientsPrev = chartData.newNumPatientsPrev;
              this.newNumPatientsGoal = chartData.newNumPatientsGoal;
            }
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  // get goalCount$() {
  //   return this.layoutFacade.dateRange$.pipe(
  //     map(val => {
  //       switch (val.duration) {
  //         case 'w':
  //         case 'm':
  //         case 'lm':
  //           return 1;
  //         case 'q':
  //         case 'lq':
  //           return 3;
  //         case 'cytd':
  //           return moment().diff(moment().startOf('year'), 'months');
  //         case 'lcytd':
  //           return 12;
  //         case 'fytd':
  //           if (moment().month() + 1 <= 6) {
  //             return moment().diff(
  //               moment().subtract(1, 'year').month(6).date(1),
  //               'months'
  //             );
  //           } else {
  //             return moment().diff(moment().month(6).date(1), 'months');
  //           }
  //         case 'lfytd':
  //           return 12;
  //       }
  //       return 1;
  //     })
  //   );
  // }

  get goalCount$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.goalCount));
  }

  get chartOptions$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMultiClinic]) =>
        isTrend && isMultiClinic
          ? this.stackedChartOptionsMulti
          : this.stackedChartOptions
      )
    );
  }

  get legend$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMultiClinic]) => {
        return isTrend && isMultiClinic;
      })
    );
  }

  public stackedChartOptions: ChartOptions<'bar'> = {
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
        beginAtZero: true,
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: tooltipItems => {
            return (
              tooltipItems.label +
              ': ' +
              this.decimalPipe.transform(tooltipItems.parsed.y)
            );
          },
          title: function () {
            return '';
          },
        },
      },
    },
  };

  public stackedChartOptionsMulti: ChartOptions<'bar'> = {
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
        ticks: {},
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: generatingLegend_4(),
      tooltip: {
        mode: 'x',
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function (tooltipItems) {
            if (tooltipItems.parsed.y > 0) {
              return (
                tooltipItems.dataset.label + ': ' + tooltipItems.formattedValue
              );
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

  barChartColors = [
    { backgroundColor: '#39acac' },
    { backgroundColor: '#48daba' },
  ];

  lineChartColors = [
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
    '#EEEEF8',
    '#119682',
  ];
}
