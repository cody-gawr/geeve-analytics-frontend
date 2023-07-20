import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import _ from "lodash";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

@Component({
    selector: 'finance-expense-chart',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss']
})
export class FinanceExpensesComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';
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
        private financeFacade: FinanceFacade
    ) {
        combineLatest([
            this.financeFacade.expensesData$,
            this.financeFacade.expensesProduction$
        ])
        .pipe(
            takeUntil(this.destroy$)
        ).subscribe(([expenses, production]) => {
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
}