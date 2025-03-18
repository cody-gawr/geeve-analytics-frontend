import { formatXTooltipLabel } from '@/app/util';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
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
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info?.toLowerCase() === 'coming-soon';
  }
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets = [{ data: [] }];

  totalDiscountChartLabels = [];
  totalDiscountChartTotal = 0;
  totalDiscountChartTrendTotal = 0;

  public showTableInfo: boolean = false;
  public tableData = [];

  get isLoading$() {
    return this.financeFacade.isLoadingFnTotalDiscount$;
  }

  get hasData() {
    return (
      this.datasets?.length > 0 &&
      this.datasets?.some(
        it => it?.data?.length > 0 && _.sumBy(it.data, v => parseFloat(<any>v))
      )
    );
  }

  get showMaxBarsAlert() {
    return !this.showTableView && this.hasData && (this.tableData?.length > this.totalDiscountChartLabels?.length);
  }

  get showTableView() {
    return this.showTableInfo && this.tableData.length > 0 && this.hasData;
  }

  get showMaxBarsAlertMsg$() {
    return this.authFacade.chartLimitDesc$;
  }

  get paTableColumnA$() {
    return this.clinicFacade.isMultiClinicsSelected$.pipe(map(i => i? 'Clinic Name':'Dentist Name'));
  }

  get trendingIcon() {
    if (this.totalDiscountChartTotal >= this.totalDiscountChartTrendTotal) {
      return 'trending_up';
    }
    return 'trending_down';
  }

  get durationLabel$() {
    return this.layoutFacade.durationCurrLabel$;
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationPrevLabel$;
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
    private decimalPipe: DecimalPipe,
    private authFacade: AuthFacade
  ) {}

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // colors: { enabled: true },
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
      this.authFacade.authUserData$
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([
          clinicId,
          totalDiscountTotal,
          totalDiscountTrendTotal,
          totalDiscountData,
          authUserData
        ]) => {
          const chartData = [],
            chartLabels = [], tableData = [];
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
            data.forEach((v, index) => {
              if(index < authUserData.maxChartBars){
                chartData.push(v.discounts);
                chartLabels.push(v.clinicName);
              }
              tableData.push({
                label: v.clinicName,
                value: v.discounts
              });
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
                const providerName = val.providerName ?? '';
                if(index < authUserData.maxChartBars){
                  chartData.push(discounts);
                  chartLabels.push(providerName);
                }

                tableData.push({
                  label: providerName,
                  value: val.discounts
                });
              }
            });
          }

          this.totalDiscountChartTrendTotal = Math.round(
            totalDiscountTrendTotal ?? 0
          );

          this.totalDiscountChartTotal = Math.round(totalDiscountTotal);
          this.totalDiscountChartLabels = chartLabels;
          this.datasets = [
            { data: chartData?.every(val => val == 0) ? chartData : [] },
          ];
          this.tableData = tableData;
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

  toggleTableInfo() {
    this.showTableInfo = !this.showTableInfo;
  }
}
