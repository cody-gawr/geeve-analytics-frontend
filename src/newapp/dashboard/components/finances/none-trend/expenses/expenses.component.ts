import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { DoughnutChartColors } from "@/newapp/shared/constants";
import { JeeveLineFillOptions } from "@/newapp/shared/utils";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ChartOptions } from "chart.js";
import _ from "lodash";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
    selector: 'finance-expense-chart',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss']
})
export class FinanceExpensesComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';
    @Input() isFullMonths = false;
    get isLoading$() {
        return this.financeFacade.isLoadingFnExpenses$
    }

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    selectedData: {value: number, name: string}[] = [];
    unSelectedData: {value: number, name: string}[] = [];
    isShowLabels = true;
    isExplodeSlices = false;
    arcWidth = 0.75;
    isDoughnut = false;
    isGradient = false;
    isTooltipDisabled = false;

    datasets = [];
    labels = [];

    get hasData$() {
        return combineLatest([
            this.clinicFacade.currentClinicId$
        ])
        .pipe(
            takeUntil(this.destroy$),
            map(([clinicId]) => {
                if(typeof clinicId === 'string'){
                    return this.datasets.length > 0;
                }else{
                    return this.selectedData.length > 0;
                }
            })
        )
    }

    get isMultipleClinic$(){
        return this.clinicFacade.currentClinicId$.pipe(
          takeUntil(this.destroy$),
          map(v => typeof v == 'string')
        )
    }

    colorScheme = {
        domain: [
          '#6edbba',
          '#abb3ff',
          '#b0fffa',
          '#ffb4b5',
          '#d7f8ef',
          '#fffdac',
          '#fef0b8',
          '#4ccfae'
        ]
    };

    constructor(
        private financeFacade: FinanceFacade,
        private clinicFacade: ClinicFacade
    ) {
        combineLatest([
            this.financeFacade.expensesData$,
            this.financeFacade.expensesProduction$,
            this.clinicFacade.currentClinicId$
        ])
        .pipe(
            takeUntil(this.destroy$)
        ).subscribe(([expenses, production, clinicId]) => {

            if(typeof clinicId === 'string'){
                this.datasets = [];
                let i = 0;
                _.chain(expenses).groupBy('accountName')
                .map(
                    (items, accountName) => {
                        return {
                            items,
                            accountName
                        }
                    }
                ).value().forEach(
                    v => {
                        const bgColor = DoughnutChartColors[i];
                        i++;
                        this.datasets.push({
                            data: _.chain(v.items).orderBy('clinicId', 'asc')
                            .value()
                            .map(item => _.round((item.expense / production) * 100)),
                            label: v.accountName,
                            backgroundColor: bgColor,
                            hoverBackgroundColor: bgColor
                        });
                    }
                );
                this.labels = _.chain(expenses).unionBy(item => item.clinicName)
                .value()
                .map(item => item.clinicName);
                
            }else{
                if(production > 0){
                    this.selectedData = [];
                    this.unSelectedData = [];
                    expenses.forEach((item, index) => {
                        const chartItem = {
                            name: `${item.accountName}--${item.expense}`,
                            value: _.round((item.expense/production) * 100)
                        };
        
                        if(index < 15){
                            this.selectedData.push(chartItem);
                        }else{
                            this.unSelectedData.push(chartItem);
                        }
                    });
                }
            }

        })
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    pieTooltipText({ data, index }) {
        const labl = data.name.split('--');
        if(labl.length > 1){
            const label = labl[0];
            const exp = Math.round(labl[1])
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return `
              <span class="tooltip-label">${label}</span>
              <span class="tooltip-val"> ${data.value}% ($${exp})</span>
            `;
        }else{
            return '';
        }
    }

    pieLabelText(labels) {
        return labels.split('--')[0];
    }

    public labelBarOptionsMultiPercentage: ChartOptions<'bar'> = {
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
              stacked: true,
              ticks: {
                autoSkip: false
              }
            },
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
            display: false
          },
          tooltip: {
            displayColors: (ctx, options) => {
              const tooltip = ctx.tooltip;
              if (!tooltip) return true;
              // disable displaying the color box;
              return false
            },
            mode: 'x',
            callbacks: {
              label: (
                tooltipItem
              ) => {
                return `${tooltipItem.dataset.label}: ${
                  tooltipItem.formattedValue
                }%`;
              },
              title: () => ''
            }
          }
        }
    
    };
}