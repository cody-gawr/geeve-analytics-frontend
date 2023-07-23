import { Component, OnInit, OnDestroy } from "@angular/core";
import { DashboardFacade } from "../../facades/dashboard.facade";
import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { FinanceFacade } from "../../facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { Router } from "@angular/router";
import { FnNetProfitParams } from "@/newapp/models/dashboard";
import moment from "moment";

@Component({
    selector: 'dashboard-finances',
    templateUrl: './finances.component.html',
    styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit, OnDestroy {

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    get isTrend$(){
        return this.layoutFacade.trend$.pipe(
            takeUntil(this.destroy$),
            map(t => t !== 'off')
        )
    }

    constructor(
        private dashbordFacade: DashboardFacade,
        private clinicFacade: ClinicFacade,
        private financeFacade: FinanceFacade,
        private layoutFacade: LayoutFacade,
        private router: Router
    ) {
        combineLatest([
            this.clinicFacade.currentClinicId$, 
            this.layoutFacade.startDate$,
            this.layoutFacade.endDate$,
            this.layoutFacade.duration$,
            this.dashbordFacade.connectedWith$,
            this.router.routerState.root.queryParams,
            this.layoutFacade.trend$
        ])
        .pipe(
            takeUntil(this.destroy$)
        ).subscribe(([clinicId, startDate, endDate, duration, connectedWith, route, trend]) => {
            this.dashbordFacade.loadChartTips(5, clinicId);
            const queryWhEnabled = route && parseInt(route.wh??'0') == 1?1:0;
            switch(trend){
                case 'off':
                    const params: FnNetProfitParams = {
                        clinicId: clinicId,
                        startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
                        endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
                        duration: duration,
                        queryWhEnabled,
                        connectedWith: connectedWith
                    };
        
                    if( connectedWith && connectedWith != 'none'){
                        this.financeFacade.loadFnNetProfit(params);
                        this.financeFacade.loadFnNetProfitPercentage(params);
                        this.financeFacade.loadFnExpenses(params);
                    }   
                    
                    this.financeFacade.loadFnTotalProduction(params);
                    this.financeFacade.loadFnProductionByClinician(params);
                    this.financeFacade.loadFnProductionPerVisit(params);
                    this.financeFacade.loadFnTotalDiscounts(params);
                    this.financeFacade.loadFnTotalCollection(params);
                    break;
                case 'current':
                    this.financeFacade.loadFnTotalProductionTrend(
                        clinicId,
                        'c',
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnTotalCollectionTrend(
                        clinicId,
                        'c',
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnNetProfitTrend(
                        clinicId,
                        'c',
                        connectedWith,
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnNetProfitPercentageTrend(
                        clinicId,
                        'c',
                        connectedWith,
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnProductionPerVisitTrend(
                        clinicId,
                        'c',
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnExpensesTrend(
                        clinicId,
                        'c',
                        connectedWith,
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnTotalDiscountsTrend(
                        clinicId,
                        'c',
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnProductionByClinicianTrend(
                        clinicId,
                        'c',
                        queryWhEnabled
                    );
                    break;
                case 'historic':
                    this.financeFacade.loadFnTotalProductionTrend(
                        clinicId,
                        'h',
                        queryWhEnabled
                    )
                    this.financeFacade.loadFnTotalCollectionTrend(
                        clinicId,
                        'h',
                        queryWhEnabled
                    )
                    this.financeFacade.loadFnNetProfitTrend(
                        clinicId,
                        'h',
                        connectedWith,
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnNetProfitPercentageTrend(
                        clinicId,
                        'h',
                        connectedWith,
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnProductionPerVisitTrend(
                        clinicId,
                        'h',
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnExpensesTrend(
                        clinicId,
                        'h',
                        connectedWith,
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnTotalDiscountsTrend(
                        clinicId,
                        'h',
                        queryWhEnabled
                    );
                    this.financeFacade.loadFnProductionByClinicianTrend(
                        clinicId,
                        'h',
                        queryWhEnabled
                    );
                    break;
            }

        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}