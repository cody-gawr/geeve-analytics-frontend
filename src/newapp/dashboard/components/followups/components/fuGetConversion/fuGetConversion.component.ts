import { splitName } from '@/app/util';
import { FollowupsFacade } from '@/newapp/dashboard/facades/followups.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import moment from 'moment';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'fuGetConversion',
  templateUrl: './fuGetConversion.component.html',
  styleUrls: ['./fuGetConversion.component.scss'],
})
export class FuGetConversionComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
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

  get isCustomDateRange$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v?.duration == 'custom'));
  }

  get showGoals$() {
    return combineLatest([
      this.layoutFacade.dateRange$,
      this.layoutFacade.isFullSingleMonthDateRange$,
    ]).pipe(
      map(([v, isFullSingle]) => {
        return (v.duration !== 'custom' && v.enableGoal) || isFullSingle;
      }),
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
    return this.layoutFacade.durationCurrLabel$.pipe(map(v => v + ' Avg'));
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationPrevLabel$.pipe(map(v => v + ' Avg'));
  }

  get hasData() {
    return this.datasets.length > 0 && this.datasets?.some(it => it?.data?.length > 0);
  }

  constructor(
    private fuFacade: FollowupsFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe,
  ) {}

  ngOnInit(): void {
    combineLatest([this.fuFacade.fuGetConversionChartData$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData]) => {
        this.datasets = chartData.datasets;
        this.labels = chartData.labels;
        this.total = chartData.total;
        this.prev = chartData.prev;
        this.goal = <number>chartData.goal;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get chartOptions() {
    return this.barChartOptions1;
  }

  public barChartOptions1: ChartOptions<'bar'> = {
    // borderRadius: 50,
    hover: { mode: null },
    // scaleShowVerticalLines: false,
    // cornerRadius: 60,
    // curvature: 1,
    animation: {
      duration: 1500,
      easing: 'easeOutSine',
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          callback: (label: number, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return this.decimalPipe.transform(label) + '%';
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
        bodyFont: {
          family: 'Gilroy-Regular',
        },
        cornerRadius: 0,
        callbacks: {
          label: tooltipItem => {
            return (
              splitName(tooltipItem.label).join(' ') +
              ': ' +
              this.decimalPipe.transform(tooltipItem.formattedValue) +
              '%'
            );
          },
          title: function () {
            return '';
          },
        },
      },
    },
  };
}
