import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { MarketingFacade } from '@/newapp/dashboard/facades/marketing.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  externalTooltipHandler,
  renderTooltipLabel,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'mk-total-visits-chart',
  templateUrl: './total-visits.component.html',
  styleUrls: ['./total-visits.component.scss'],
})
export class MarketingTotalVisitsComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get trendingIcon() {
    return this.totalVisitsVal >= this.totalVisitsPrev
      ? 'trending_up'
      : 'trending_down';
  }

  get maxTotalVisitsGoal() {
    return this.totalVisitsVal > this.totalVisitsGoal
      ? this.totalVisitsVal
      : this.totalVisitsGoal;
  }

  get isActivePatients$() {
    return this.marketingFacade.isActivePatients$;
  }

  get goalCount$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.goalCount));
  }

  totalVisitsVal = 0;
  totalVisitsPrev = 0;
  totalVisitsGoal = 0;

  datasets: ChartDataset[] = [];
  labels = [];

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.marketingFacade.isLoadingTotalVisits$,
      this.marketingFacade.isLoadingTotalVisitsTrend$,
    ]).pipe(
      map(([isTrend, isLoading, isTrendLoading]) =>
        isTrend ? isTrendLoading : isLoading
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

  get isConnectedWith$() {
    return this.dashboardFacade.isConnectedWith$;
  }

  get showGoal$() {
    return combineLatest([
      this.layoutFacade.isFullSingleMonthDateRange$,
      this.layoutFacade.dateRange$,
    ]).pipe(
      map(
        ([isFullSingle, v]) =>
          (isFullSingle || (v.duration !== 'custom' && v.enableGoal)) &&
          this.totalVisitsGoal > 0
      )
    );
  }

  get hasData$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMulti]) =>
        isTrend || isMulti ? this.labels.length > 0 : this.totalVisitsVal > 0
      )
    );
  }

  constructor(
    private marketingFacade: MarketingFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe,
    private dashboardFacade: DashboardFacade
  ) {
    combineLatest([
      this.isTrend$,
      this.marketingFacade.totalVisitsChartData$,
      this.marketingFacade.totalVisitsTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isTrend, chartData, trendChartData]) => {
        if (isTrend) {
          this.datasets = trendChartData.datasets;
          this.labels = trendChartData.labels;
        } else {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          this.totalVisitsVal = chartData.totalVisitsVal;
          this.totalVisitsPrev = chartData.totalVisitsPrev;
          this.totalVisitsGoal = chartData.totalVisitsGoal;
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
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

  public stackLegendGenerator: _DeepPartialObject<LegendOptions<any>> = {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: chart => {
        let labels = [];
        let bgColor = {};
        chart.data.datasets.forEach(item => {
          item.data.forEach((val: number) => {
            if (val > 0) {
              labels.push(item.label);
              bgColor[item.label] = item.backgroundColor;
            }
          });
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map(item => ({
          text: item,
          strokeStyle: bgColor[item],
          fillStyle: bgColor[item],
        }));
      },
    },
  };

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
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'x',
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: tooltipItem => renderTooltipLabel(tooltipItem),
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
