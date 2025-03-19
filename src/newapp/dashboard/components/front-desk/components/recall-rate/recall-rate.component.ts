import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { FrontDeskFacade } from '@/newapp/dashboard/facades/front-desk.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import {
  JeeveLineFillOptions,
  generatingLegend,
  generatingLegend_4,
} from '@/newapp/shared/utils';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'fd-recall-rate-chart',
  templateUrl: './recall-rate.component.html',
  styleUrls: ['./recall-rate.component.scss'],
})
export class FrontDeskRecallRateComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;

  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get trendingIcon() {
    if (this.fdRecallRateVal >= this.fdRecallRatePrev) {
      return 'trending_up';
    }
    return 'trending_down';
  }

  get showGoals$() {
    return combineLatest([
      this.layoutFacade.dateRange$,
      this.layoutFacade.isFullSingleMonthDateRange$,
    ]).pipe(
      map(([v, isFullSingle]) => {
        return (v.duration !== 'custom' && v.enableGoal) || isFullSingle;
      })
    );
  }

  fdRecallRateVal = 0;
  fdRecallRatePrev = 0;
  fdRecallRateGoal = 0;

  datasets: ChartDataset[] = [];
  labels = [];

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.frontDeskFacade.isLoadingFdRecallRateData$,
      this.frontDeskFacade.isLoadingFdRecallRateTrendData$,
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
    return this.layoutFacade.durationCurrLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationPrevLabel$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get isConnectedWith$() {
    return this.clinicFacade.isConnectedWith$;
  }

  get hasData$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMulti]) =>
        isTrend || isMulti ? this.labels.length > 0 : this.fdRecallRateVal > 0
      )
    );
  }

  get isFullMonthDate$() {
    return this.layoutFacade.isFullMonthsDateRange$;
  }

  constructor(
    private frontDeskFacade: FrontDeskFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private dashboardFacade: DashboardFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.isTrend$,
      this.frontDeskFacade.fdRecallRateChartData$,
      this.frontDeskFacade.fdRecallRateTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isTrend, chartData, trendChartData]) => {
        if (isTrend) {
          this.datasets = trendChartData.datasets;
          this.labels = trendChartData.labels;
        } else {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          this.fdRecallRateVal = chartData.fdRecallRateVal;
          this.fdRecallRatePrev = chartData.fdRecallRatePrev;
          this.fdRecallRateGoal = parseInt(<any>chartData.fdRecallRateGoal);
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

  // public legendGenerator: _DeepPartialObject<LegendOptions<any>> = {
  //   display: true,
  //   position: 'bottom',
  //   labels: {
  //     boxWidth: 8,
  //     usePointStyle: true,
  //     generateLabels: chart => {
  //       let bgColor = {};
  //       let labels = chart.data.labels.map((value: string, i) => {
  //         bgColor[value.split('--')[3]] =
  //           chart.data.datasets[0].backgroundColor[i];
  //         return value.split('--')[3];
  //       });
  //       labels = [...new Set(labels)];
  //       labels = labels.splice(0, 10);
  //       return labels.map((label, index) => ({
  //         text: label,
  //         strokeStyle: bgColor[label],
  //         fillStyle: bgColor[label],
  //       }));
  //     },
  //   },
  //   onClick: () => {},
  // };

  public stackedChartOptions: ChartOptions = {
    elements: {
      line: JeeveLineFillOptions,
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    // fill: false,
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
          label: function (tooltipItems) {
            var Targetlable = '';
            const v = tooltipItems.dataset.data[tooltipItems.dataIndex];
            let Tlable = tooltipItems.dataset.label;
            if (Tlable != '') {
              Tlable = Tlable + ': ';
              Targetlable = Tlable;
            }
            //let ylable = Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;
            let ylable = tooltipItems.parsed._custom
              ? +(
                  tooltipItems.parsed._custom.max +
                  tooltipItems.parsed._custom.min
                ) / 2
              : v;
            var tlab = 0;
            if (typeof tooltipItems.chart.data.datasets[1] === 'undefined') {
            } else {
              const tval =
                tooltipItems.chart.data.datasets[1].data[
                  tooltipItems.dataIndex
                ];
              if (Array.isArray(tval)) {
                tlab = Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
                if (tlab == 0) {
                  Tlable = '';
                }
              }
            }
            if (tlab == 0 && Targetlable == 'Target: ') {
              return '';
            } else {
              return Tlable + tooltipItems.label + ': ' + ylable + '%';
            }
          },
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
          label: function (tooltipItems) {
            let label = tooltipItems.label;
            if ((<string>tooltipItems.label).indexOf('--') >= 0) {
              let lbl = (<string>tooltipItems.label).split('--');
              if (typeof lbl[3] === 'undefined') {
                label = lbl[0];
              } else {
                label = lbl[0] + ' - ' + lbl[3];
              }
            }
            var Targetlable = '';
            const v = tooltipItems.dataset.data[tooltipItems.dataIndex];
            let Tlable = tooltipItems.dataset.label;
            if (Tlable != '') {
              Tlable = Tlable + ': ';
              Targetlable = Tlable;
            }
            //let ylable = Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;
            let ylable = tooltipItems.parsed._custom
              ? +(
                  tooltipItems.parsed._custom.max +
                  tooltipItems.parsed._custom.min
                ) / 2
              : v;

            var tlab = 0;
            if (typeof tooltipItems.chart.data.datasets[1] === 'undefined') {
            } else {
              const tval =
                tooltipItems.chart.data.datasets[1].data[
                  tooltipItems.dataIndex
                ];
              if (Array.isArray(tval)) {
                tlab = Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
                if (tlab == 0) {
                  Tlable = '';
                }
              }
            }
            if (tlab == 0 && Targetlable == 'Target: ') {
              return '';
            } else {
              return Tlable + label + ': ' + ylable + '%';
            }
          },
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
      legend: generatingLegend(3),
    },
  };
}
