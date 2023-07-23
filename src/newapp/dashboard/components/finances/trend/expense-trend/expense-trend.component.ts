import { DashboardFacade } from "@/newapp/dashboard/facades/dashboard.facade";
import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { DecimalPipe } from "@angular/common";
import { Component, OnDestroy, OnInit, Input } from "@angular/core";
import { ChartOptions } from "chart.js";
import _ from "lodash";
import moment from "moment";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
    selector: 'finance-expense-trend-chart',
    templateUrl: './expense-trend.component.html',
    styleUrls: ['./expense-trend.component.scss']
})
export class FinanceExpenseTrendComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';

    doughnutChartColors = [
        '#6cd8ba',
        '#b0fffa',
        '#abb3ff',
        '#feefb8',
        '#91ADEA',
        '#ffb4b5',
        '#F2C6C6',
        '#FDC6C0',
        '#FEEEE1',
        '#FFDD99',
        '#A8DDDD',
        '#F4F4A0',
        '#C3DDFF',
        '#9FDBDB',
        '#CCFDCC',
        '#B1F2EC',
        '#D7ECF3',
        '#C8CDF0',
        '#F7C4F5',
        '#BBEBFA',
        '#D7ECF3',
        '#BBE7FF',
        '#9BD0F5',
        '#36A2EB',
        '#FF6384',
        '#fe7b85',
        '#87ada9',
        '#386087',
        '#54D2FF',
        '#E58DD7'
    ];

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    datasets = [];
    labels = [];

    get isLoading$(){
        return this.financeFacade.isLoadingFnExpensesTrend$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    get isConnectedWith$(){
        return this.dashboardFacade.connectedWith$.pipe(
            takeUntil(this.destroy$),
            map(v => v && v != 'none')
        )
    }

    constructor(
        private decimalPipe: DecimalPipe,
        private financeFacade: FinanceFacade,
        private dashboardFacade: DashboardFacade,
        private layoutFacade: LayoutFacade
    ){
        combineLatest(
            [
                this.financeFacade.expensesTrendChartData$,
                this.financeFacade.expensesTrendDurations$,
                this.layoutFacade.trend$
            ]
        )
        .pipe(
            takeUntil(this.destroy$),
        ).subscribe(
            ([chartData, durations, trendMode]) => {
                chartData.forEach(
                    (v, index) => {
                        this.datasets.push(
                            {
                                data: v.values,
                                label: v.label,
                                backgroundColor: this.doughnutChartColors[index],
                                hoverBackgroundColor: this.doughnutChartColors[index]
                            }
                        )
                    }
                );
                this.labels = trendMode === 'current'? durations.map(
                    dur => moment(dur).format('MMM YYYY')
                ):durations;
            }
        )
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    public stackedChartOptions: ChartOptions<'bar'> = {
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
          legend: {
            display: true
          },
          tooltip: {
            mode: 'x',
            callbacks: {
              label: function (tooltipItems) {
                if(tooltipItems.parsed.y > 0){
                  return `${tooltipItems.dataset.label}: $${tooltipItems.formattedValue}`;
                }else{
                  return ''
                }
              },
              title: (tooltipItems) => {
                return `${tooltipItems[0].label}: $${this.decimalPipe.transform(_.sumBy(tooltipItems, t => t.parsed.y))}`
              }
            }
          }
        },
    
    };
}