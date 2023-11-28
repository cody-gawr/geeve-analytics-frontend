import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  JeeveLineFillOptions,
  externalTooltipHandler,
} from '@/newapp/shared/utils';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, TooltipItem } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
  selector: 'finance-prod-trend-chart',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})
export class FinanceProdTrendComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  profitChartNames = ['Production', 'Collection', 'Net Profit', 'Net Profit %'];

  datasets: any = [{ data: [] }];
  labels = [];

  public stackLegendGenerator: _DeepPartialObject<LegendOptions<any>> = {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: chart => {
        let labels = [];
        let bg_color = {};
        chart.data.datasets.forEach(item => {
          item.data.forEach((val: number) => {
            if (val > 0) {
              labels.push(item.label);
              bg_color[item.label] = item.backgroundColor;
            }
          });
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map(item => ({
          text: item,
          strokeStyle: bg_color[item],
          fillStyle: bg_color[item],
        }));
      },
    },
    // onClick: (event: MouseEvent, legendItem: LegendItem) => {}
  };

  public labelBarOptionsSingleValue: ChartOptions = {
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

  public stackedChartOptionsDiscount: ChartOptions = {
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
      legend: this.stackLegendGenerator,
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

  public netProfitTrendMultiChartOptions: ChartOptions = {
    ...this.labelBarOptionsSingleValue,
    plugins: {
      tooltip: {
        mode: 'x',
        callbacks: {
          label: tooltipItems => {
            return `${tooltipItems.dataset.label} : ${new Intl.NumberFormat(
              'en-US',
              {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }
            ).format(tooltipItems.parsed.y)}`;
          },
          title: () => '',
        },
      },
    },
  };

  public labelBarOptionsSingleValue1: ChartOptions = {
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
        stacked: true,
        ticks: {
          callback: (label: string | number) => {
            return `${Number(label)}%`;
          },
        },
      },
    },
    plugins: {
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
          label: function (tooltipItems) {
            return `${tooltipItems.label} : ${tooltipItems.formattedValue}%`;
          },
          title: () => '',
        },
      },
    },
  };

  get chartOptions$() {
    return combineLatest([
      this.financeFacade.profitTrendChartName$,
      this.clinicFacade.isMultiClinicsSelected$,
    ]).pipe(
      map(([t, isMultiClinic]) => {
        switch (t) {
          case 'Production':
            return isMultiClinic
              ? this.stackedChartOptionsDiscount
              : this.labelBarOptionsSingleValue;
          case 'Collection':
            return isMultiClinic
              ? this.stackedChartOptionsDiscount
              : this.labelBarOptionsSingleValue;
          case 'Net Profit':
            return isMultiClinic
              ? this.netProfitTrendMultiChartOptions
              : this.labelBarOptionsSingleValue;
          case 'Net Profit %':
            return this.labelBarOptionsSingleValue1;
        }
        return {};
      })
    );
  }

  get legend$() {
    return combineLatest([
      this.clinicFacade.currentClinicId$,
      this.financeFacade.profitTrendChartName$,
    ]).pipe(
      map(([v, chartName]) => {
        if (['Net Profit %', 'Net Profit'].indexOf(chartName) >= 0)
          return false;
        return typeof v === 'string' ? true : false;
      })
    );
  }

  get isLoading$() {
    return combineLatest([
      this.financeFacade.profitTrendChartName$,
      this.financeFacade.isLoadingTotalProductionTrend$,
      this.financeFacade.isLoadingCollectionTrend$,
      this.financeFacade.isLoadingNetProfitTrend$,
      this.financeFacade.isLoadingNetProfitPercentageTrend$,
    ]).pipe(
      map(
        ([
          t,
          isLoadingProdTrend,
          isLoadingColTrend,
          isNetProfitTrend,
          isNetProfitPercentTrend,
        ]) => {
          switch (t) {
            case 'Production':
              return isLoadingProdTrend;
            case 'Collection':
              return isLoadingColTrend;
            case 'Net Profit':
              return isNetProfitTrend;
            case 'Net Profit %':
              return isNetProfitPercentTrend;
          }
          return false;
        }
      )
    );
  }

  get chartName$() {
    return this.financeFacade.profitTrendChartName$;
  }

  constructor(
    private financeFacade: FinanceFacade,
    private dashboardFacade: DashboardFacade,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade
  ) {}

  get chartType$() {
    return combineLatest([
      this.financeFacade.profitTrendChartName$,
      this.clinicFacade.isMultiClinicsSelected$,
    ]).pipe(
      map(([t, isMultiClinic]) => {
        switch (t) {
          case 'Production':
            return isMultiClinic ? 'bar' : 'line';
          case 'Collection':
            return isMultiClinic ? 'bar' : 'line';
          case 'Net Profit':
            return 'line';
          case 'Net Profit %':
            return 'line';
        }
        return 'line';
      })
    );
  }

  get isDisconnectedPlatform$() {
    return combineLatest([
      this.dashboardFacade.connectedWith$,
      this.financeFacade.profitTrendChartName$,
    ]).pipe(
      map(([connectWith, chartName]) => {
        if (chartName === 'Net Profit' || chartName === 'Net Profit %') {
          return !(connectWith === 'xero' || connectWith === 'myob');
        }
        return false;
      })
    );
  }

  ngOnInit(): void {
    combineLatest([
      this.financeFacade.prodTrendChartData$,
      this.clinicFacade.currentClinicId$,
      this.layoutFacade.trend$,
      this.financeFacade.collectionTrendChartData$,
      this.financeFacade.profitTrendChartName$,
      this.financeFacade.netProfitTrendChartData$,
      this.financeFacade.netProfitPercentTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([
          prodChartData,
          clinicId,
          trend,
          collectionTrendChartData,
          chartName,
          netProfitTrendChartData,
          netProfitPercentChartData,
        ]) => {
          if (!prodChartData) {
            return;
          }
          let chartDataset = [],
            chartLabels = [];
          switch (chartName) {
            case 'Production':
              if (typeof clinicId === 'string') {
                chartDataset = (<any>prodChartData).datasets;
                chartLabels = (<any>prodChartData).labels;
              } else {
                chartDataset = [{ data: [] }];
                if (Array.isArray(prodChartData)) {
                  (<any>prodChartData).forEach(
                    (data: { label: string; value: number } & any, index) => {
                      chartDataset[0].data.push(data.value);
                      chartLabels.push(data.label);
                    }
                  );
                }
              }
              break;
            case 'Collection':
              if (typeof clinicId === 'string') {
                chartDataset = (<any>collectionTrendChartData).datasets;
                chartLabels = (<any>collectionTrendChartData).labels;
              } else {
                chartDataset = [{ data: [] }];
                (<any>collectionTrendChartData).forEach(
                  (data: { label: string; value: number } & any, index) => {
                    chartDataset[0].data.push(data.value);
                    chartLabels.push(data.label);
                  }
                );
              }

              break;
            case 'Net Profit':
              if (typeof clinicId === 'string') {
                chartDataset = (<any>netProfitTrendChartData).datasets;
                chartLabels = (<any>netProfitTrendChartData).labels;
              } else {
                chartDataset = [{ data: [] }];
                (<any>netProfitTrendChartData).forEach(
                  (data: { label: string; value: number } & any, index) => {
                    chartDataset[0].data.push(data.value);
                    chartLabels.push(data.label);
                  }
                );
              }
              break;
            case 'Net Profit %':
              chartDataset = [{ data: [] }];
              netProfitPercentChartData.forEach(
                (data: { label: string; value: number } & any, index) => {
                  chartDataset[0].data.push(data.value);
                  chartLabels.push(data.label);
                }
              );
          }

          this.datasets = chartDataset;
          this.labels = chartLabels;
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  switchChartName(chartName) {
    this.financeFacade.setTrendChartName(chartName);
  }
}
