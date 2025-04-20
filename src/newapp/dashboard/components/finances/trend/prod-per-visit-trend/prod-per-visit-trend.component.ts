import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import {
  JeeveLineFillOptions,
  externalTooltipHandlerHiddenColorBoxes,
} from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ChartOptions, TooltipItem, ChartDataset } from 'chart.js';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'finance-prod-per-visit-trend-chart',
  templateUrl: './prod-per-visit-trend.component.html',
  styleUrls: ['./prod-per-visit-trend.component.scss'],
})
export class FinanceProdPerVisitTrendComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets: ChartDataset[] = [];
  labels = [];
  chartNames: FN_PROD_PER_VISIT_CHART_NAME[] = ['Production Per Visit', 'Production Per Day'];
  chartName: FN_PROD_PER_VISIT_CHART_NAME = 'Production Per Visit';

  get chartName$() {
    return this.financeFacade.prodPerVisitChartName$;
  }

  switchChartName(chartName: FN_PROD_PER_VISIT_CHART_NAME) {
    this.financeFacade.setProdPerVisitChartName(chartName);
  }

  chartData:
    | {
        prod: number;
        numTotal: number;
        prodPerVisits: number;
      }[]
    | {
        prod: number;
        numTotal: number;
        prodPerDays: number;
      }[];

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
            let label = tooltipItem.label;
            const extraData = this.chartData[tooltipItem.dataIndex];
            const labelItems = [];
            labelItems.push(
              `${label} : ${new Intl.NumberFormat('en-US', {
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
              }).format(extraData.prod)}`,
            );

            labelItems.push(
              `${this.chartName === 'Production Per Visit' ? 'Num Visits' : 'Num Days'} : ${new Intl.NumberFormat(
                'en-US',
                {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                },
              ).format(extraData.numTotal)}`,
            );

            return labelItems;
          },
          title: () => '',
        },
      },
    },
  };

  get isLoading$() {
    return this.financeFacade.isLoadingFnProdPerVisitTrend$;
  }

  constructor(
    private financeFacade: FinanceFacade,
    private decimalPipe: DecimalPipe, // private clinicFacade: ClinicFacade
  ) {}

  ngOnInit(): void {
    combineLatest([this.financeFacade.prodPerVisitTrendChartData$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData]) => {
        this.datasets = [
          {
            data: [],
            label: '',
          },
        ];
        this.labels = [];
        this.chartData = chartData;
        chartData.forEach(values => {
          this.datasets[0].data.push(values.value);
          this.labels.push(values.label);
        });
      });

    this.chartName$.pipe(takeUntil(this.destroy$)).subscribe(v => (this.chartName = v));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
