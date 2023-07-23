import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { JeeveLineFillOptions } from "@/newapp/shared/utils";
import { Component, OnDestroy, OnInit, Input } from "@angular/core";
import { ChartOptions, TooltipItem } from "chart.js";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
    selector: 'finance-prod-per-visit-trend-chart',
    templateUrl: './prod-per-visit-trend.component.html',
    styleUrls: ['./prod-per-visit-trend.component.scss']
})
export class FinanceProdPerVisitTrendComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    datasets = [];
    labels = [];

    get isLoading$(){
        return this.financeFacade.isLoadingFnProdPerVisitTrend$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    constructor(
        private financeFacade: FinanceFacade,
        private layoutFacade: LayoutFacade
    ){
        combineLatest(
            [
                this.financeFacade.prodPerVisitTrendChartData$,
                this.layoutFacade.trend$,
            ]
        )
        .pipe(
            takeUntil(this.destroy$),
        ).subscribe(
            ([chartData, trendMode]) => {
                this.datasets = [{data: []}];
                this.labels = [];
                chartData.forEach(
                    values => {
                        this.datasets[0].data.push(values.value);
                        this.labels.push(values.label);
                    }
                )
            }
        )
    }

    ngOnInit(): void {
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
            hoverBorderWidth: 7
          },
          line: JeeveLineFillOptions,
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 500,
          easing: 'easeOutSine'
        },
        scales: {
          x: 
            {
              stacked: false,
              ticks: {
                autoSkip: false
              }
            }
          ,
          y: 
            {
              stacked: false,
              ticks: {
                callback: function (label, index, labels) {
                  return `${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(Number(label))}`;
                }
              }
            }
        },
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            mode: 'x',
            displayColors(ctx, options) {
              return !ctx.tooltip
            },
            callbacks: {
              label: (tooltipItems: TooltipItem<any>) => {
                let label = tooltipItems.label;
                return `${label} : ${new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(Number(tooltipItems.parsed.y))}`;
              },
              title: () => ''
            }
          }
        }
      };
}