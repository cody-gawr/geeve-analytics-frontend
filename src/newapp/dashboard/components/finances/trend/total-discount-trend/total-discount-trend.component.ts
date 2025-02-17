import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import {
  JeeveLineFillOptions,
  externalTooltipHandler,
  generatingLegend_4,
} from '@/newapp/shared/utils';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import {
  ChartOptions,
  LegendOptions,
  TooltipItem,
  ChartDataset,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'finance-total-discount-trend-chart',
  templateUrl: './total-discount-trend.component.html',
  styleUrls: ['./total-discount-trend.component.scss'],
})
export class FinanceTotalDiscountTrendComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets: ChartDataset[] = [];
  labels = [];

  get isMultiClinic$() {
    return this.clinicFacade.isMultiClinicsSelected$;
  }

  get isLoading$() {
    return this.financeFacade.isLoadingFnTotalDiscountTrend$;
  }

  get chartType$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v => (typeof v === 'string' ? 'bar' : 'line'))
    );
  }

  get legend$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v => (typeof v === 'string' ? true : false))
    );
  }

  constructor(
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade
  ) {}

  get hasData() {
    return (
      this.datasets?.length > 0 &&
      this.datasets?.some(
        it => it?.data?.length > 0 && _.sumBy(it.data, v => parseFloat(<any>v))
      )
    );
  }

  ngOnInit(): void {
    combineLatest([
      this.financeFacade.totalDiscountTrendChartData$,
      this.clinicFacade.currentClinicId$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData, clinicId]) => {
        if (typeof clinicId === 'string') {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
        } else {
          this.datasets = [{ data: chartData.data }];
          this.labels = chartData.labels;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
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
        display: true,
      },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: (tooltipItems: TooltipItem<any>) => {
            let label = tooltipItems.label;
            return `${label} : ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(tooltipItems.parsed.y))}`;
          },
          title: () => '',
        },
      },
    },
  };

  public stackedChartOptionsDiscount: ChartOptions<'bar'> = {
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
              return `${label < 0 ? '- $' : '$'}${currency}`;
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
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function (tooltipItems) {
            return `${tooltipItems.dataset.label}: $${tooltipItems.formattedValue}`;
          },
          title: function (tooltipItems) {
            return `${tooltipItems[0].label}: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(_.sumBy(tooltipItems, t => t.parsed.y))}`;
          },
        },
      },
    },
  };

  get chartOptions$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v =>
        typeof v === 'string'
          ? this.stackedChartOptionsDiscount
          : this.labelBarOptionsSingleValue
      )
    );
  }
}
