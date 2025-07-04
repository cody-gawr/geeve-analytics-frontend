import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { MarketingFacade } from '@/newapp/dashboard/facades/marketing.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import {
  externalTooltipHandler,
  generatingLegend_4,
  renderTooltipLabel,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'num-new-patients-chart',
  templateUrl: './num-new-patients.component.html',
  styleUrls: ['./num-new-patients.component.scss'],
})
export class MarketingNumNewPatientsComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get trendingIcon() {
    return this.newNumPatientsVal >= this.newNumPatientsPrev ? 'trending_up' : 'trending_down';
  }

  get maxNewNumPatientsGoal() {
    return this.newNumPatientsVal > this.newNumPatientsGoal
      ? this.newNumPatientsVal
      : this.newNumPatientsGoal;
  }

  get displayTitle$() {
    return this.marketingFacade.isActivePatients$.pipe(
      map(v => (v ? 'No. Active Patients' : 'No. New Patients')),
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
      this.isTrend$,
      this.layoutFacade.selectIsFullSingleMonthOrYearOrCurrentMonthDateRange$,
    ]).pipe(
      map(([v1, v2]) => {
        return v1 || v2;
      }),
    );
  }

  get showGoal$() {
    return combineLatest([
      this.layoutFacade.isFullSingleMonthDateRange$,
      this.layoutFacade.dateRange$,
      this.isActivePatients$,
    ]).pipe(
      map(
        ([isFullSingle, v, isActive]) =>
          (isFullSingle || (v.duration !== 'custom' && v.enableGoal)) && !isActive,
      ),
    );
  }

  newNumPatientsVal = 0;
  newNumPatientsPrev = 0;
  newNumPatientsGoal = 0;

  datasets: ChartDataset[] = [];
  labels = [];

  get isConnectedWith$() {
    return this.clinicFacade.isConnectedWith$;
  }

  get isLoading$() {
    return combineLatest([
      this.marketingFacade.isLoadingNewNumPatients$,
      this.marketingFacade.isLoadingNewNumPatientsTrend$,
      this.marketingFacade.isLoadingMkActivePatients$,
      this.marketingFacade.isLoadingMkActivePatientsTrend$,
    ]).pipe(
      map(([isLoading, isTrendLoading, isActiveLoading, isActiveTrendLoading]) => {
        return isTrendLoading || isLoading || isActiveLoading || isActiveTrendLoading;
      }),
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.isMultiClinicsSelected$;
  }

  get durationLabel$() {
    return this.layoutFacade.durationCurrLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationPrevLabel$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get hasData$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMulti]) =>
        isTrend || isMulti ? this.labels.length > 0 : this.newNumPatientsVal > 0,
      ),
    );
  }

  constructor(
    private marketingFacade: MarketingFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private dashboardFacade: DashboardFacade,
    private decimalPipe: DecimalPipe,
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
        ([isTrend, chartData, trendChartData, isActive, activeChartData, activeTrendChartData]) => {
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
        },
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get goalCount$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.goalCount));
  }

  get chartOptions$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMultiClinic]) =>
        isTrend && isMultiClinic ? this.stackedChartOptionsMulti : this.stackedChartOptions,
      ),
    );
  }

  get legend$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMultiClinic]) => {
        return isTrend && isMultiClinic;
      }),
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
          label: tooltipItem => renderTooltipLabel(tooltipItem),
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
          label: tooltipItem => renderTooltipLabel(tooltipItem),
          title: tooltipItems => {
            const sumV = _.sumBy(tooltipItems, t => t.parsed.y);
            return `${tooltipItems[0].label}: ${this.decimalPipe.transform(sumV)}`;
          },
        },
      },
    },
  };

  barChartColors = [{ backgroundColor: '#39acac' }, { backgroundColor: '#48daba' }];

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
