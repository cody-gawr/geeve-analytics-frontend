import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  externalTooltipHandler,
  externalTooltipHandlerHiddenColorBoxes,
  generatingLegend_3,
  JeeveLineFillOptions,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, TooltipItem } from 'chart.js';
import { combineLatest, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'fn-hourly-rate-chart',
  template: `
    <app-chart
      [chartTitle]="chartTitle"
      [chartType]="chartType$ | async"
      [toolTip]="toolTip"
      [durationCurrLabel]="durationCurrLabel$ | async"
      [durationPrevLabel]="durationPrevLabel$ | async"
      [duration]="duration$ | async"
      [curr]="curr"
      [prev]="prev"
      [isLoading]="isLoading$ | async"
      [datasets]="datasets"
      [labels]="labels"
      [hasData]="hasData$ | async"
      [chartOptions]="chartOptions$ | async"
      currency="$"
      noDataAlertMessage="You have no hourly rate in the selected period"
      [gaugeValue]="curr"
      [gaugeSize]="250"
      [gaugeMax]="curr"
      [newLogo]="true"
      [appendCurrency]="false"
      style="height: 100%;"
    ></app-chart>
  `,
})
export class FnHourlyRateChartComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  chartTitle = 'Hourly Rate';
  curr = 0;
  prev = 0;

  labels = [];
  datasets: ChartDataset<any>;
  chartData: { production: number; hours: number }[] = [];
  constructor(
    private layoutFacade: LayoutFacade,
    private financeFacade: FinanceFacade,
    private decimalPipe: DecimalPipe,
    private clinicFacade: ClinicFacade,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.financeFacade.hourlyRateChartData$.pipe(takeUntil(this.destroy)).subscribe(chartData => {
      if (chartData) {
        this.chartData = chartData.chartData;
        this.datasets = chartData.datasets;
        this.labels = chartData.chartLabels;
        this.curr = chartData.curr;
        this.prev = chartData.prev;
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get isLoading$() {
    return combineLatest([
      this.layoutFacade.trend$,
      this.financeFacade.isLoadingChartDesc$('fnHourlyRate'),
      this.financeFacade.isLoadingChartDesc$('fnHourlyRateTrend'),
    ]).pipe(
      map(([trend, isLoading, isTrendLoading]) => {
        if (trend === 'off') {
          return isLoading;
        } else {
          return isTrendLoading;
        }
      }),
    );
  }

  get chartType$() {
    return combineLatest([
      this.layoutFacade.trend$,
      this.clinicFacade.isMultiClinicsSelected$,
    ]).pipe(map(([trend, isMulti]) => (trend === 'off' ? (isMulti ? 'bar' : 'arch') : 'line')));
  }

  get hasData$() {
    return combineLatest([
      this.clinicFacade.isMultiClinicsSelected$,
      this.layoutFacade.trend$,
    ]).pipe(
      map(([isMulti, trend]) => {
        if (trend !== 'off' || isMulti) {
          return (
            this.labels.length > 0 && this.datasets.length > 0 && this.datasets[0].data.length > 0
          );
        } else {
          return this.curr > 0;
        }
      }),
    );
  }

  get duration$() {
    return this.layoutFacade.dateRange$.pipe(map(v => v.duration));
  }

  get durationCurrLabel$() {
    return combineLatest([this.layoutFacade.trend$, this.layoutFacade.durationCurrLabel$]).pipe(
      map(([trend, curLabel]) => (trend === 'off' ? curLabel : null)),
    );
  }

  get durationPrevLabel$() {
    return combineLatest([this.layoutFacade.trend$, this.layoutFacade.durationPrevLabel$]).pipe(
      map(([trend, prevLabel]) => (trend === 'off' ? prevLabel : null)),
    );
  }

  get chartOptions$() {
    return this.layoutFacade.trend$.pipe(
      map(trend => (trend === 'off' ? this.barChartOptions : this.labelBarOptionsSingleValue)),
    );
  }

  public labelBarOptionsSingleValue: ChartOptions<'line'> = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
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
        stacked: false,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: false,
        ticks: {
          callback: function (label, index, labels) {
            return `${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(label))}`;
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'x',
        displayColors: (ctx, options) => {
          return !ctx.tooltip;
        },
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandlerHiddenColorBoxes,
        callbacks: {
          label: (tooltipItem: TooltipItem<any>) => {
            const extraData = this.chartData[tooltipItem.dataIndex];
            const labelItems = [];
            labelItems.push(
              `${tooltipItem.label} : ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(Number(tooltipItem.parsed.y))}`,
            );

            labelItems.push(
              `Production : ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(extraData.production)}`,
            );

            labelItems.push(
              `Hours : ${new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(extraData.hours)}`,
            );

            return labelItems;
          },
          title: () => '',
        },
      },
    },
  };
  public barChartOptions: ChartOptions<'bar'> = {
    hover: { mode: null },
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
          offset: true,
        },
        ticks: {
          autoSkip: false,
        },
        offset: true,
        stacked: true,
      },
      y: {
        suggestedMin: 0,
        min: 0,
        beginAtZero: true,
        ticks: {
          callback: (label: number, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return '$' + this.decimalPipe.transform(label);
            }
            return '';
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
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          // use label callback to return the desired label
          label: tooltipItem => {
            return `Hourly Rate: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(tooltipItem.parsed.y))}`;
          },
          // remove title
          title: () => '',
        },
      },
      legend: generatingLegend_3(),
    },
  };
}
