import { splitName } from '@/app/util';
import { FollowupsFacade } from '@/newapp/dashboard/facades/followups.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'fuGetConversionPerUser',
  templateUrl: './fuGetConversionPerUser.component.html',
  styleUrls: ['./fuGetConversionPerUser.component.scss'],
})
export class FuGetConversionPerUserComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  chartNames: FU_OUTCOME_CHART_NAME[] = ['Ticks', 'Recalls', 'FTAs', 'UTAs'];

  datasets = [];
  labels = [];
  total = 0;
  prev = 0;

  get trendingIcon() {
    if (this.total >= this.prev) {
      return 'trending_up';
    }
    return 'trending_down';
  }

  get isLoading$() {
    return this.fuFacade.isLoadingFuGetConversionPerUser$;
  }

  get chartName$() {
    return this.fuFacade.fuGetConversionPerUserChartName$;
  }

  pieTooltipText({ data, index }) {
    const labl = data.name.split('--');
    const label = labl[0].charAt(0).toUpperCase() + labl[0].slice(1);
    const val = data.value;
    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val"> ${val}%</span>
    `;
  }

  pieLabelText(labels) {
    const labl = labels.split('--');
    return labl[0].charAt(0).toUpperCase() + labl[0].slice(1);
  }

  public colorScheme = {
    domain: [
      '#6edbba',
      '#abb3ff',
      '#b0fffa',
      '#ffb4b5',
      '#d7f8ef',
      '#fffdac',
      '#fef0b8',
      '#4ccfae',
    ],
  };

  constructor(
    private fuFacade: FollowupsFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.fuFacade.fuGetConversionPerUserChartDat$,
      this.fuFacade.fuGetConversionPerUserChartName$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData, chartName]) => {
        switch (chartName) {
          case 'Ticks':
            this.datasets = chartData.datasetsTicks;
            this.labels = chartData.labelsTicks;
            this.total = chartData.totalTicks;
            this.prev = chartData.prevTicks;
            break;
          case 'Recalls':
            this.datasets = chartData.datasetsRecalls;
            this.labels = chartData.labelsRecalls;
            this.total = chartData.totalRecalls;
            this.prev = chartData.prevRecalls;
            break;
          case 'FTAs':
            this.datasets = chartData.datasetsFta;
            this.labels = chartData.labelsFta;
            this.total = chartData.totalFta;
            this.prev = chartData.prevFta;
            break;
          case 'UTAs':
            this.datasets = chartData.datasetsUta;
            this.labels = chartData.labelsUta;
            this.total = chartData.totalUta;
            this.prev = chartData.prevUta;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  switchChartName(chartName) {
    this.fuFacade.setFuConversionPerUserChartName(chartName);
  }

  get durationLabel$() {
    return this.layoutFacade.durationLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$;
  }

  get noDataMessage$() {
    return this.fuFacade.fuGetOutcomeChartName$.pipe(
      map(chartName => {
        switch (chartName) {
          case 'Ticks':
            return 'No TICK followups were completed in this period';
          case 'Recalls':
            return 'No Recall followups were completed in this period';
          case 'FTAs':
            return 'No FTA followups were completed in this period';
          case 'UTAs':
            return 'No UTA followups were completed in this period';
        }
      })
    );
  }

  get hasData() {
    return this.datasets.length > 0 && this.labels.length > 0;
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
