import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { JeeveLineFillOptions } from "@/newapp/shared/utils";
import { Component, OnDestroy, OnInit, Input } from "@angular/core";
import { ChartOptions, LegendOptions } from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import _ from "lodash";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
    selector: 'finance-total-discount-trend-chart',
    templateUrl: './total-discount-trend.component.html',
    styleUrls: ['./total-discount-trend.component.scss']
})
export class FinanceTotalDiscountTrendComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    datasets = [];
    labels = [];

    get isMultiClinic$(){
        return this.clinicFacade.currentClinicId$.pipe(
            takeUntil(this.destroy$),
            map(v => typeof v === 'string')
        )
    }

    get isLoading$(){
        return this.financeFacade.isLoadingFnTotalDiscountTrend$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    get chartType$(){
        return this.clinicFacade.currentClinicId$.pipe(
            takeUntil(this.destroy$),
            map(v => typeof v === 'string'?'bar':'line')
        )
    }

    constructor(
        private financeFacade: FinanceFacade,
        private clinicFacade: ClinicFacade,
        private layoutFacade: LayoutFacade
    ){
        combineLatest(
            [
                this.financeFacade.totalDiscountTrendChartData$,
                this.layoutFacade.trend$,
                this.clinicFacade.currentClinicId$
            ]
        )
        .pipe(
            takeUntil(this.destroy$),
        ).subscribe(
            ([chartData, trendMode, clinicId]) => {
                if(typeof clinicId === 'string'){
                    this.datasets = chartData.datasets;
                    this.labels = chartData.labels;
                }else{
                    this.datasets = [{data: chartData.data}];
                    this.labels = chartData.labels
                }
            }
        )
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    public stackLegendGenerator: _DeepPartialObject<LegendOptions<any>> = {
        display: true,
        position: 'bottom',
        labels: {
        boxWidth: 8,
        usePointStyle: true,
        generateLabels: (chart) => {
            let labels = [];
            let bg_color = {};
            chart.data.datasets.forEach((item) => {
            item.data.forEach((val: number) => {
                if (val > 0) {
                labels.push(item.label);
                bg_color[item.label] = item.backgroundColor;
                }
            });
            });
            labels = [...new Set(labels)];
            labels = labels.splice(0, 10);
            return labels.map((item) => ({
            text: item,
            strokeStyle: bg_color[item],
            fillStyle: bg_color[item]
            }));
        }
        },
        // onClick: (event: MouseEvent, legendItem: LegendItem) => {}
    };
    public labelBarOptionsSingleValue1: ChartOptions<'line'> = {
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
              stacked: true,
              ticks: {
                callback: (label: string | number) => {
                  return `${Number(label)}%`;
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
              label: function (tooltipItems) {
                return `${tooltipItems.label} : ${tooltipItems.formattedValue}%`;
              },
              title: () => ''
            }
          }
        }
    
    };

    public stackedChartOptionsDiscount: ChartOptions<'bar'> = {
        elements: {
          point: {
            radius: 5,
            hoverRadius: 7,
            pointStyle: 'rectRounded',
            hoverBorderWidth: 7
          }
        },
        // scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        // barThickness: 10,
        animation: {
          duration: 500,
          easing: 'easeOutSine'
        },
        scales: {
          x: 
            {
              stacked: true,
              ticks: {
                autoSkip: false
              }
            }
          ,
          y: 
            {
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
                }
              }
            }
        },
        plugins: {
          legend: this.stackLegendGenerator,
          tooltip: {
            mode: 'x',
            callbacks: {
              label: function (tooltipItems) {
                return `${tooltipItems.dataset.label}: ${tooltipItems.parsed.y}`
              },
              title: function(tooltipItems){
                return `${tooltipItems[0].label}: ${_.sumBy(tooltipItems, t => t.parsed.y)}`
              }
            }
          }
        },
    
    };

    get chartOptions$(){
        return this.clinicFacade.currentClinicId$.pipe(
            takeUntil(this.destroy$),
            map(v => typeof v === 'string'?this.stackedChartOptionsDiscount:this.labelBarOptionsSingleValue1)
        )
    }
}