import { formatXTooltipLabel } from '@/app/util';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { chartPlugin, externalTooltipHandler } from '@/newapp/shared/utils';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'total-discount-chart',
  templateUrl: './total-discount.component.html',
  styleUrls: ['./total-discount.component.scss'],
})
export class FinanceTotalDiscountComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets = [{ data: [] }];

  totalDiscountChartLabels = [];
  totalDiscountChartTotal = 0;
  totalDiscountChartTrendTotal = 0;

  get isLoading$() {
    return this.financeFacade.isLoadingFnTotalDiscount$;
  }

  get hasData() {
    return (
      this.datasets[0]?.data?.length > 0 &&
      this.datasets[0]?.data?.every(v => v !== 0)
    );
  }

  get trendingIcon() {
    if (this.totalDiscountChartTotal >= this.totalDiscountChartTrendTotal) {
      return 'trending_up';
    }
    return 'trending_down';
  }

  get durationLabel$() {
    return this.layoutFacade.durationLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$;
  }

  get getTrendTip$() {
    return this.durationTrendLabel$.pipe(
      map(v => {
        if (this.totalDiscountChartTrendTotal > 0) {
          return (
            v +
            ': $' +
            this.decimalPipe.transform(this.totalDiscountChartTrendTotal)
          );
        }
        return '';
      })
    );
  }

  get legend$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v => {
        return typeof v === 'string';
      })
    );
  }

  get duration$() {
    return this.layoutFacade.dateRange$.pipe(
      takeUntil(this.destroy$),
      map(v => v.duration)
    );
  }

  constructor(
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe
  ) {}

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
        onClick: event => {
          event.native.stopPropagation();
        },
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

  ngOnInit(): void {
    combineLatest([
      this.clinicFacade.currentClinicId$,
      this.financeFacade.totalDiscountTotal$,
      this.financeFacade.totalDiscountTrendTotal$,
      this.financeFacade.totalDiscountData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([
          clinicId,
          totalDiscountTotal,
          totalDiscountTrendTotal,
          totalDiscountData,
        ]) => {
          const chartData = [],
            chartLabels = [];
          if (typeof clinicId == 'string') {
            const data = _.chain(totalDiscountData)
              .sortBy(t => t.discounts)
              .groupBy('clinicId')
              .map((values, cId) => {
                return {
                  clinicName: values[0].clinicName,
                  discounts: _.sumBy(values, v => _.round(<number>v.discounts)),
                };
              })
              .value();
            data.sort((a, b) => b.discounts - a.discounts);
            data.forEach(v => {
              chartData.push(v.discounts);
              chartLabels.push(v.clinicName);
            });
          } else {
            const data = [...totalDiscountData];
            data.sort(
              (a, b) =>
                parseFloat(<string>b.discounts) -
                parseFloat(<string>a.discounts)
            );
            data.forEach((val, index) => {
              const discounts = _.round(<number>val.discounts);
              if (discounts > 0) {
                chartData.push(discounts);
                chartLabels.push(val.providerName ?? '');
              }
            });
          }

          this.totalDiscountChartTrendTotal = Math.round(
            totalDiscountTrendTotal ?? 0
          );

          this.totalDiscountChartTotal = Math.round(totalDiscountTotal);
          this.totalDiscountChartLabels = chartLabels;
          this.datasets = [{ data: chartData }];
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get plugins$() {
    return this.financeFacade.totalDiscountTotal$.pipe(
      map(dC => {
        {
          return [chartPlugin(dC, true)];
        }
      })
    );
  }
}
