import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { formatXTooltipLabel } from "@/newapp/shared/utils";
import { Component, OnDestroy, OnInit, Input } from "@angular/core";
import { ChartOptions } from "chart.js";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
    selector: 'finance-prod-col-trend-chart',
    templateUrl: './prod-col-trend.component.html',
    styleUrls: ['./prod-col-trend.component.scss']
})
export class FinanceProdColTrendComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();
    datasets = [];
    labels = [];

    get isLoading$(){
        return combineLatest([
            this.financeFacade.isLoadingTotalProductionTrend$,
            this.financeFacade.isLoadingCollectionTrend$
        ]).pipe(
            takeUntil(this.destroy$),
            map(([v, v1]) => v && v1 )
        )
    }

    constructor(
        private financeFacade: FinanceFacade,
        private layoutFacade: LayoutFacade,
        private clinicFacade: ClinicFacade
    ){
        combineLatest(
            [
                this.financeFacade.prodTrendChartData$,
                this.financeFacade.collectionTrendChartData$,
                this.clinicFacade.currentClinicId$
            ]
        )
        .pipe(
            takeUntil(this.destroy$),
        ).subscribe(
            ([prodChartData, colChartData, clinicId]) => {
                if(typeof clinicId == 'string')
                {
                    this.datasets = (<any>prodChartData).datasets;
                    this.labels = (<any>prodChartData).labels;
                }else{
                    this.datasets = [{data: [], label: 'Production'}, {data: [], label: 'Collection'}];
                    this.labels = [];

                    (<any>prodChartData).forEach(
                        (data: {label: string, value: number} & any, index) => {
                            this.datasets[0].data.push(data.value);
                            this.labels.push(data.label);
                        }
                    );

                    (<any>colChartData).forEach(
                        (data: {label: string, value: number} & any, index) => {
                            this.datasets[1].data.push(data.value);
                        }
                    );
                }
            }
        )
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    get hasData(){
        return this.datasets.length > 0 && this.datasets[0].data !== undefined && this.datasets[0].data.length > 0;
    }

    public labelBarOptions: ChartOptions<'bar'> = {
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
                callback: function (label: number, index, labels) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                    let currency =
                      label < 0
                        ? label.toString().split('-').join('')
                        : label.toString();
                    //  if (currency.length > 3) {
                    //    currency = currency.substring(0, 1) + 'K'
                    //  } else{
                    currency = currency.split(/(?=(?:...)*$)/).join(',');
                    //  }
    
                    return `${label < 0 ? '- $' : '$'}${currency}`;
                  }
                  return '';
                }
              }
            }
        },
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => formatXTooltipLabel(tooltipItem),
              title: () => ''
            }
          }
        }
    
      };
    
}