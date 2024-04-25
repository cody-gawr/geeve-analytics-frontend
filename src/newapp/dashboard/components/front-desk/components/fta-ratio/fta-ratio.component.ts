import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { FrontDeskFacade } from '@/newapp/dashboard/facades/front-desk.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  JeeveLineFillOptions,
  generatingLegend_4,
  renderTooltipLabel,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import moment from 'moment';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'fd-fta-ratio-chart',
  templateUrl: './fta-ratio.component.html',
  styleUrls: ['./fta-ratio.component.scss'],
})
export class FrontDeskFtaRatioComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get trendingIcon() {
    if (this.fdFtaRatioVal >= this.fdFtaRatioPrev) {
      return 'trending_up';
    }
    return 'trending_down';
  }

  get maxfdFtaRatioGoal() {
    if (this.fdFtaRatioVal > this.fdFtaRatioPrev) {
      return this.fdFtaRatioVal;
    } else {
      return this.fdFtaRatioGoal;
    }
  }

  get showGoals$() {
    return combineLatest([
      this.layoutFacade.dateRange$,
      this.layoutFacade.isFullSingleMonthDateRange$,
    ]).pipe(
      map(([v, isFullSingle]) => {
        return v.enableGoal || isFullSingle;
      })
    );
  }

  fdFtaRatioVal = 0;
  fdFtaRatioPrev = 0;
  fdFtaRatioGoal = 0;

  datasets: ChartDataset[] = [];
  labels = [];

  // get maxFdFtaRatioGoal() {
  //   if (this.fdFtaRatioVal > this.fdFtaRatioPrev) {
  //     return this.fdFtaRatioVal;
  //   } else {
  //     return this.fdFtaRatioGoal;
  //   }
  // }

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.frontDeskFacade.isLoadingFdFtaRatioData$,
      this.frontDeskFacade.isLoadingFdFtaRatioTrendData$,
    ]).pipe(
      map(([isTrend, isLoading, isTrendLoading]) => {
        return isTrend ? isTrendLoading : isLoading;
      })
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

  get hasData$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMulti]) => {
        if (isTrend || isMulti) {
          return this.labels.length > 0;
        } else {
          return this.fdFtaRatioVal > 0;
        }
      })
    );
  }

  get isFullMonthDate$() {
    return this.layoutFacade.isFullMonthsDateRange$;
  }

  constructor(
    private frontDeskFacade: FrontDeskFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe,
    private dashboardFacade: DashboardFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.isTrend$,
      this.frontDeskFacade.fdFtaRatioChartData$,
      this.frontDeskFacade.fdFtaRatioTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isTrend, chartData, trendChartData]) => {
        if (isTrend) {
          this.datasets = trendChartData.datasets;
          this.labels = trendChartData.labels;
        } else {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          this.fdFtaRatioVal = chartData.fdFtaRatioVal;
          this.fdFtaRatioPrev = chartData.fdFtaRatioPrev;
          this.fdFtaRatioGoal = <number>chartData.fdFtaRatioGoal;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get chartOptions$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMultiClinic]) => {
        if (isTrend) {
          return isMultiClinic
            ? this.stackedChartOptionsTC
            : this.stackedChartOptions;
        } else {
          return this.stackedChartOptionsUti;
        }
      })
    );
  }

  get chartType$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMultiClinic]) => {
        if (isTrend) {
          return isMultiClinic ? 'bar' : 'line';
        } else {
          return 'bar';
        }
      })
    );
  }

  public legendGenerator: _DeepPartialObject<LegendOptions<any>> = {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: chart => {
        let bgColor = {};
        let labels = chart.data.labels.map((value: string, i) => {
          bgColor[value.split('--')[3]] =
            chart.data.datasets[0].backgroundColor[i];
          return value.split('--')[3];
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map((label, index) => ({
          text: label,
          strokeStyle: bgColor[label],
          fillStyle: bgColor[label],
        }));
      },
    },
    onClick: () => {},
  };

  public stackedChartOptions: ChartOptions = {
    elements: {
      line: JeeveLineFillOptions,
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
        min: 0,
        max: 100,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label + '%';
            }
            return '';
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          label: tooltipItem => renderTooltipLabel(tooltipItem, '%'),
          title: function () {
            return '';
          },
        },
      },
      legend: {
        display: true,
      },
    },
  };
  public stackedChartOptionsTC: ChartOptions = {
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
        min: 0,
        max: 100,
        ticks: {
          callback: function (value: string) {
            // when the floored value is the same as the value we have a whole number
            return `${value}%`;
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: generatingLegend_4(),
      tooltip: {
        mode: 'x',
        enabled: true,
        displayColors(ctx, options) {
          return false;
        },
        callbacks: {
          label: function (tooltipItems) {
            return `${tooltipItems.formattedValue}%`;
          },
        },
      },
    },
  };

  public stackedChartOptionsUti: ChartOptions = {
    hover: { mode: null },
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
          autoSkip: false,
          callback: function (tickValue: string, index: number) {
            let value = this.getLabelForValue(index);
            if (value && value.toString().includes('--')) {
              let lbl = value.split('--');
              value = lbl[0];
            }
            return value;
          },
        },
        stacked: true,
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function (label, index, labels) {
            return label + '%';
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          label: tooltipItem => renderTooltipLabel(tooltipItem, '%'),
          afterLabel: function (tooltipItems) {
            let hour = 0;
            let phour = 0;
            if (
              tooltipItems.label.indexOf('--') >= 0 &&
              tooltipItems.datasetIndex == 0
            ) {
              let lbl = tooltipItems.label.split('--');
              hour = Number(lbl[1]);
              phour = Number(lbl[2]);
              return [
                '',
                'Available Hours: ' + Math.round(phour * 100) / 100,
                'Used Hours: ' + Math.round(hour * 100) / 100,
              ];
            }
            return '';
          },
          title: function () {
            return '';
          },
        },
      },
      legend: this.legendGenerator,
    },
  };
}
