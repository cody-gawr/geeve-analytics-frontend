import { Component, OnInit, OnDestroy } from "@angular/core";
import { DashboardFacade } from "../../../facades/dashboard.facade";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { FinanceFacade } from "../../../facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";

@Component({
    selector: 'trend-finances',
    templateUrl: './trend.component.html',
    styleUrls: ['./trend.component.scss']
})
export class TrendFinanceComponent implements OnInit, OnDestroy {

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    constructor(
        private dashbordFacade: DashboardFacade,
        private financeFacade: FinanceFacade,
        private layoutFacade: LayoutFacade,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    get profitTrendTip$(){
        return combineLatest([
            this.financeFacade.profitTrendChartName$,
            this.dashbordFacade.chartTips$
        ]).pipe(
            takeUntil(this.destroy$),
            map(([chartName, tips]) => {
                if(tips){
                    switch(chartName){
                        case 'Production':
                            return tips[31].info;
                        case 'Collection':
                            return tips[33].info;
                        case 'Net Profit':
                            return tips[26].info;
                        case 'Net Profit %':
                            return tips[27].info;
                    }
                }
                return '';
            })
        )
    }

    getChartTip(index: number) {
        return this.dashbordFacade.chartTips$.pipe(
            takeUntil(this.destroy$),
            map(c => {
            if(c && c[index]){
                return c[index].info;
            }
            return '';
        }))
    }
}