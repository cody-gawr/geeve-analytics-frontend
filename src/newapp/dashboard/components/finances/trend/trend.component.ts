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

    get chartTips$(){
        return this.dashbordFacade.chartTips$;
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    getChartTip(index: number) {
        return this.chartTips$.pipe(map(c => {
            if(c && c[index]){
                return c[index].info;
            }
            return '';
        }))
    }
}