import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import {
  externalTooltipHandler,
  formatXTooltipLabel,
} from '@/newapp/shared/utils';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'finance-prod-col-trend-chart',
  templateUrl: './prod-col-trend.component.html',
  styleUrls: ['./prod-col-trend.component.scss'],
})
export class FinanceProdColTrendComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  datasets: ChartDataset[] = [];
  labels = [];

  get isLoading$() {
    return combineLatest([
      this.financeFacade.isLoadingTotalProductionTrend$,
      this.financeFacade.isLoadingCollectionTrend$,
    ]).pipe(map(([v, v1]) => v && v1));
  }

  constructor(private financeFacade: FinanceFacade) {}

  ngOnInit(): void {
    combineLatest([this.financeFacade.prodCollChartData$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([prodCollChartData]) => {
        this.datasets = prodCollChartData.datasets;
        this.labels = prodCollChartData.labels;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get hasData() {
    return (
      this.datasets.length > 0 &&
      this.datasets[0].data !== undefined &&
      this.datasets[0].data.length > 0
    );
  }

  public labelBarOptions: ChartOptions<'bar'> = {
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
        stacked: false,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: false,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency =
                label < 0
                  ? label.toString().split('-').join('')
                  : label.toString();
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
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: tooltipItem => formatXTooltipLabel(tooltipItem),
          title: () => '',
        },
      },
    },
  };
}
