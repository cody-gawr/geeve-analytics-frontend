import { splitName } from '@/app/util';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { FollowupsFacade } from '@/newapp/dashboard/facades/followups.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import moment from 'moment';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'fuGetPerUser',
  templateUrl: './fuGetPerUser.component.html',
  styleUrls: ['./fuGetPerUser.component.scss'],
})
export class FuGetPerUserComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get trendingIcon() {
    if (this.total >= this.prev) {
      return 'trending_up';
    }
    return 'trending_down';
  }

  get maxGoal() {
    if (this.total > this.prev) {
      return this.total;
    } else {
      return this.goal;
    }
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

  total = 0;
  prev = 0;
  goal = 0;

  datasets: ChartDataset[] = [];
  labels = [];

  get isLoading$() {
    return this.fuFacade.isLoadingFuGetConversion$;
  }

  get durationLabel$() {
    return this.layoutFacade.durationCurrLabel$.pipe(map(v => v + ' Total'));
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationPrevLabel$.pipe(map(v => v + ' Total'));
  }

  get hasData() {
    return (
      this.datasets.length > 0 &&
      this.datasets?.some(
        it => it?.data?.length > 0 && _.sumBy(it.data, v => parseFloat(<any>v))
      )
    );
  }

  get isCustomDateRange$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v?.duration == 'custom'));
  }

  constructor(
    private fuFacade: FollowupsFacade,
    private layoutFacade: LayoutFacade
  ) {}

  ngOnInit(): void {
    combineLatest([this.fuFacade.fuGetPerUserChartData$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData]) => {
        this.datasets = chartData.datasets;
        this.labels = chartData.labels;
        this.total = chartData.total;
        this.prev = chartData.prev;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get chartOptions() {
    return this.stackedChartOptions;
  }
  private legendLabelOptions = {
    labels: {
      usePointStyle: true,
      padding: 20,
    },
    onClick: function (e) {
      e.stopPropagation();
    },
  };
  public stackedChartOptions: ChartOptions = {
    hover: {
      mode: null,
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    // curvature: 1,
    // scaleShowVerticalLines: false,
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
              return label;
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
        position: 'top',
        ...this.legendLabelOptions,
      },
      tooltip: {
        mode: 'x',
        callbacks: {
          label: function (tooltipItems) {
            if (
              parseInt(tooltipItems.formattedValue) > 0 &&
              tooltipItems.dataset.label != ''
            ) {
              if (tooltipItems.dataset.label.indexOf('DentistMode-') >= 0) {
                return tooltipItems.label + ': ' + tooltipItems.formattedValue;
              } else {
                return (
                  tooltipItems.dataset.label +
                  ': ' +
                  tooltipItems.formattedValue
                );
              }
            }
            return '';
          },
          title: function (tooltip) {
            let total = 0;
            tooltip.forEach(val => {
              total = total + parseInt(val.formattedValue);
            });
            if (tooltip[0].dataset.label?.indexOf('DentistMode-') >= 0) {
              var dentist = tooltip[0].dataset.label.split('Mode-');
              return dentist[1] + ':' + total;
            } else {
              return tooltip[0].label + ': ' + total;
            }
          },
        },
      },
    },
  };
}
