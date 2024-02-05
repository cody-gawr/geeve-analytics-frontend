import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { FrontDeskFacade } from '@/newapp/dashboard/facades/front-desk.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { generatingLegend_4 } from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'fd-number-ticks-chart',
  templateUrl: './number-ticks.component.html',
  styleUrls: ['./number-ticks.component.scss'],
})
export class FrontDeskNumberTicksComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get trendingIcon() {
    if (this.fdNumOfTicksVal >= this.fdNumOfTicksPrev) {
      return 'trending_up';
    }
    return 'trending_down';
  }

  fdNumOfTicksVal = 0;
  fdNumOfTicksPrev = 0;

  datasets: ChartDataset[] = [];
  labels = [];

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.frontDeskFacade.isLoadingFdNumTicksData$,
      this.frontDeskFacade.isLoadingFdNumTicksTrendData$,
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

  get isFullMonthsDateRange$() {
    return this.layoutFacade.isFullMonthsDateRange$;
  }

  get hasData$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMulti]) => {
        if (isTrend || isMulti) {
          return this.labels.length > 0;
        } else {
          return this.fdNumOfTicksVal > 0;
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
  ) {
    combineLatest([
      this.isTrend$,
      this.frontDeskFacade.fdNumTicksChartData$,
      this.frontDeskFacade.fdNumTicksTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isTrend, chartData, trendChartData]) => {
        if (isTrend) {
          this.datasets = trendChartData.datasets;
          this.labels = trendChartData.labels;
        } else {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          this.fdNumOfTicksVal = chartData.fdNumOfTicksVal;
          this.fdNumOfTicksPrev = chartData.fdNumOfTicksPrev;
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get chartOptions$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMultiClinic]) => {
        if (isTrend) {
          return isMultiClinic
            ? this.stackedChartOptionsTic
            : this.numOfTicksChartOptionsticks;
        } else {
          return this.stackedChartOptionsT;
        }
      })
    );
  }

  public stackedChartOptionsTic: ChartOptions = {
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
      // colors: { enabled: true },
      legend: generatingLegend_4(),
      tooltip: {
        mode: 'x',
        callbacks: {
          label: function (tooltipItems) {
            return `${tooltipItems.dataset.label}: ${tooltipItems.parsed.y}`;
          },
          title: function (tooltipItems) {
            return `${tooltipItems[0].label}: ${_.sumBy(
              tooltipItems,
              t => t.parsed.y
            )}`;
          },
        },
      },
    },
  };

  public numOfTicksChartOptionsticks: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
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
        stacked: true,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      tooltip: {
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          label: function (tooltipItems) {
            return tooltipItems.label + ': ' + tooltipItems.formattedValue;
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

  public stackedChartOptionsT: ChartOptions = {
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
        // stacked:true,
        ticks: {
          // max:100,
          callback: function (label: number) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
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
              return Tlable + label + ': ' + ylable;
            }
          },
          afterLabel: function (tooltipItems) {
            let hour = '0';
            let phour = '0';
            if (
              tooltipItems.label.indexOf('--') >= 0 &&
              tooltipItems.datasetIndex == 0
            ) {
              let lbl = tooltipItems.label.split('--');
              hour = lbl[1];
              phour = lbl[2];
              return ['', 'Available Hours: ' + phour, 'Used Hours: ' + hour];
            }
            return '';
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
}
