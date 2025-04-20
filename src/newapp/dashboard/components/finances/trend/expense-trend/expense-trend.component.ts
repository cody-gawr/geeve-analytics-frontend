import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { COLORS } from '@/newapp/constants';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import { externalTooltipHandler } from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import _ from 'lodash';
import moment from 'moment';
import { Subject, takeUntil, combineLatest, map, filter } from 'rxjs';

@Component({
  selector: 'finance-expense-trend-chart',
  templateUrl: './expense-trend.component.html',
  styleUrls: ['./expense-trend.component.scss'],
})
export class FinanceExpenseTrendComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets: ChartDataset[] = [];
  labels = [];

  get isLoading$() {
    return this.financeFacade.isLoadingFnExpensesTrend$;
  }

  get isConnectedWith$() {
    return this.clinicFacade.connectedWith$.pipe(
      map(connectWith => connectWith === 'xero' || connectWith === 'myob'),
    );
  }

  constructor(
    private decimalPipe: DecimalPipe,
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.financeFacade.expensesTrendChartData$,
      this.financeFacade.expensesTrendDurations$,
      this.layoutFacade.trend$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(([chartData, durations, trendMode]) => {
          return chartData.length > 0 && durations.length > 0;
        }),
      )
      .subscribe(([chartData, durations, trendMode]) => {
        this.datasets = [];
        chartData.forEach((v, index) => {
          this.datasets.push({
            data: v.values,
            label: v.label,
            backgroundColor: COLORS.presetColors[index % COLORS.presetColors.length],
            hoverBackgroundColor: COLORS.presetColors[index % COLORS.presetColors.length],
          });
        });
        this.labels =
          trendMode === 'current'
            ? durations.map(dur => moment(dur).format('MMM YYYY'))
            : durations;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
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
        stacked: true,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency = label < 0 ? label.toString().split('-').join('') : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              return `${label < 0 ? '- $' : '$'}${currency}`;
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
      },
      tooltip: {
        mode: 'x',
        itemSort: (a, b) => {
          return b.parsed.y - a.parsed.y;
        },
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function (tooltipItems) {
            if (tooltipItems.parsed.y == 0) {
              return '';
            }
            return `${tooltipItems.dataset.label}: $${tooltipItems.formattedValue}`;
          },
          title: tooltipItems => {
            return `${tooltipItems[0].label}: $${this.decimalPipe.transform(
              _.sumBy(tooltipItems, t => t.parsed.y),
            )}`;
          },
        },
      },
    },
  };
}
