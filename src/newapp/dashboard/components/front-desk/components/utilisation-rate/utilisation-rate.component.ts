import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FrontDeskFacade } from '@/newapp/dashboard/facades/front-desk.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import moment from 'moment';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'fd-utilisation-rate-chart',
  templateUrl: './utilisation-rate.component.html',
  styleUrls: ['./utilisation-rate.component.scss'],
})
export class FrontDeskUtilRateComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get trendingIcon() {
    if (this.fdUtilRateVal >= this.fdUtilRatePrev) {
      return 'trending_up';
    }
    return 'trending_down';
  }

  get isByDayData$() {
    return this.frontDeskFacade.isByDayData$;
  }

  enableIsByDayData() {
    this.frontDeskFacade.setIsByDayData(true);
  }

  disableIsByDayData() {
    this.frontDeskFacade.setIsByDayData(false);
  }

  fdUtilRateVal = 0;
  fdUtilRatePrev = 0;
  fdUtilRateGoal = 0;

  datasets: ChartDataset[] = [];
  labels = [];

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.frontDeskFacade.isLoadingFdUtilRateData$,
      this.frontDeskFacade.isLoadingFdUtilRateTrendData$,
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

  get isExact$() {
    return this.clinicFacade.isExactCurrentClinics$;
  }
  get isCore$() {
    return this.clinicFacade.isCoreCurrentClinics$;
  }
  get hasData$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMulti]) => {
        if (isTrend || isMulti) {
          return this.labels.length > 0;
        } else {
          return this.fdUtilRateVal > 0;
        }
      })
    );
  }

  get isDateRageInvalid$() {
    return combineLatest([
      this.layoutFacade.trend$,
      this.layoutFacade.dateRange$,
    ]).pipe(
      map(([trendMode, dateRange]) => {
        if (trendMode === 'historic') return true;
        if (!!trendMode && trendMode != 'off') {
          const endDateObj = moment(dateRange.end);
          const difference = endDateObj.diff(dateRange.start, 'days');
          if (difference > 365) {
            return true;
          }
        }
        return false;
      })
    );
  }

  get showGoals$() {
    return this.layoutFacade.dateRange$.pipe(
      map(val => {
        if (['m', 'lm'].indexOf(val?.duration) >= 0) {
          return true;
        }

        if (
          val &&
          val.start &&
          val.start.date() == 1 &&
          val.end.date() == val.end.clone().endOf('month').date()
        ) {
          return true;
        }

        return false;
      })
    );
  }

  constructor(
    private frontDeskFacade: FrontDeskFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade
  ) {
    combineLatest([
      this.isTrend$,
      this.frontDeskFacade.isByDayData$,
      this.frontDeskFacade.fdUtilRateChartData$,
      this.frontDeskFacade.fdUtilRateTrendChartData$,
      this.frontDeskFacade.fdUtilRateByDayChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([isTrend, isByDayData, chartData, trendChartData, byDayChartData]) => {
          if (isTrend) {
            this.datasets = trendChartData.datasets;
            this.labels = trendChartData.labels;
          } else {
            if (isByDayData) {
              this.datasets = byDayChartData.datasets;
              this.labels = byDayChartData.labels;
              this.fdUtilRateVal = byDayChartData.fdUtilRateByDayVal;
              this.fdUtilRatePrev = byDayChartData.fdUtilRateByDayPrev;
            } else {
              this.datasets = chartData.datasets;
              this.labels = chartData.labels;
              this.fdUtilRateVal = chartData.fdUtilRateVal;
              this.fdUtilRatePrev = chartData.fdutilRatePrev;
              this.fdUtilRateGoal = <number>chartData.fdUtilRateGoal;
            }
          }
        }
      );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get chartOptions$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMultiClinic]) => {
        if (isTrend && isMultiClinic) {
          return this.stackedChartOptionsTC;
        }
        return this.stackedChartOptionsUti;
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
        let bg_color = {};
        chart.data.datasets.forEach(item => {
          item.data.forEach((val: number) => {
            if (val > 0) {
              labels.push(item.label);
              bg_color[item.label] = item.backgroundColor;
            }
          });
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map(item => ({
          text: item,
          strokeStyle: bg_color[item],
          fillStyle: bg_color[item],
        }));
      },
    },
  };
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
      legend: this.stackLegendGenerator,
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
        // stacked:true,
        ticks: {
          callback: function (label, index, labels) {
            return label + '%';
          },
        },
      },
    },
    plugins: {
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
      legend: this.legendGenerator,
    },
  };
}
