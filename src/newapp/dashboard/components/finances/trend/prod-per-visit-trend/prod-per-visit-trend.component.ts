// import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
// import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { JeeveLineFillOptions, splitName } from '@/newapp/shared/utils';
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
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  datasets: ChartDataset[] = [];
  labels = [];

  chartData: {
    prod: number;
    numVisits: number;
    prodPerVisits: number;
  }[];

  get isLoading$() {
    return this.financeFacade.isLoadingFnProdPerVisitTrend$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get chartOptions() {
    return this.labelBarOptionsSingleValue;
  }

  constructor(
    private financeFacade: FinanceFacade,
    // private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe // private clinicFacade: ClinicFacade
  ) {
    combineLatest([
      this.financeFacade.prodPerVisitTrendChartData$,
      // this.layoutFacade.trend$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartData]) => {
        this.datasets = [
          {
            data: [],
            label: '',
            //shadowOffsetX: 3,
            //backgroundColor: "rgba(0, 0, 255, 0.2)",
          },
        ];
        this.labels = [];
        this.chartData = chartData;
        chartData.forEach(values => {
          this.datasets[0].data.push(values.value);
          this.labels.push(values.label);
        });
      });
  }

  ngOnInit(): void {}

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
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
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
              }).format(Number(tooltipItem.parsed.y))}`
            );

            labelItems.push(
              `Production : ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(extraData.prod)}`
            );

            labelItems.push(
              `Num Visits : ${new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(extraData.numVisits)}`
            );

            // labelItems.push(
            //   `Production Per Visit : ${new Intl.NumberFormat('en-US', {
            //     style: 'currency',
            //     currency: 'USD',
            //     minimumFractionDigits: 0,
            //     maximumFractionDigits: 0,
            //   }).format(extraData.prodPerVisits)}`
            // );
            return labelItems;
          },
          title: () => '',
        },
      },
    },
  };

  // public barChartOptionsTrend: ChartOptions<'bar'> = {
  //   // scaleShowVerticalLines: false,
  //   // cornerRadius: 60,
  //   hover: { mode: null },
  //   // curvature: 1,
  //   animation: {
  //     duration: 1500,
  //     easing: 'easeOutSine',
  //   },
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   // scaleStartValue: 0,
  //   scales: {
  //     x: {
  //       grid: {
  //         display: true,
  //         offset: true,
  //       },
  //       ticks: {
  //         autoSkip: false,
  //       },
  //       display: false,
  //       offset: true,
  //       stacked: true,
  //     },
  //     y: {
  //       suggestedMin: 0,
  //       min: 0,
  //       beginAtZero: true,
  //       ticks: {
  //         callback: (label: number, index, labels) => {
  //           // when the floored value is the same as the value we have a whole number
  //           if (Math.floor(label) === label) {
  //             return '$' + this.decimalPipe.transform(label);
  //           }
  //           return '';
  //         },
  //       },
  //     },
  //   },
  //   plugins: {
  //     tooltip: {
  //       mode: 'x',
  //       displayColors(ctx, options) {
  //         return !ctx.tooltip;
  //       },
  //       callbacks: {
  //         // use label callback to return the desired label
  //         label: tooltipItem => {
  //           const v = tooltipItem.parsed.y;
  //           let Tlable = tooltipItem.dataset.label;
  //           if (Tlable != '') {
  //             Tlable = Tlable + ': ';
  //           }
  //           //let ylable = Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;
  //           let ylable = tooltipItem.parsed._custom
  //             ? +(
  //                 tooltipItem.parsed._custom.max +
  //                 tooltipItem.parsed._custom.min
  //               ) / 2
  //             : v;
  //           if (ylable == 0 && Tlable == 'Target: ') {
  //             //return  Tlable + this.splitName(tooltipItem.xLabel).join(' ');
  //             return '';
  //           } else {
  //             return (
  //               Tlable + splitName(tooltipItem.label).join(' ') + ': $' + ylable
  //             );
  //           }
  //         },
  //         // remove title
  //         title: function (tooltipItem) {
  //           return '';
  //         },
  //       },
  //     },
  //     legend: {
  //       position: 'top',
  //       onClick: function (e, legendItem) {
  //         var index = legendItem.datasetIndex;
  //         var ci = this.chart;
  //         if (index == 0) {
  //           ci.getDatasetMeta(1).hidden = true;
  //           ci.getDatasetMeta(index).hidden = false;
  //         } else if (index == 1) {
  //           ci.getDatasetMeta(0).hidden = true;
  //           ci.getDatasetMeta(index).hidden = false;
  //         }
  //         ci.update();
  //       },
  //     },
  //   },
  // };
}
