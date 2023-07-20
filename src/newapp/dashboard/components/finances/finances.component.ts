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

    get netProfitProductionVal$(){
        return this.financeFacade.productionVal$.pipe(
            takeUntil(this.destroy$),
            map(c => Math.round(c??0))
        )
    }

    get netProfitVal$(){
        return this.financeFacade.netProfit$.pipe(
            takeUntil(this.destroy$),
            map(c => Math.round(c??0))
        )
    }

    get netProfitPercentageVal$(){
        return this.financeFacade.netProfitPercentage$.pipe(
            takeUntil(this.destroy$),
            map(c => Math.round(c??0))
        )
    }

    get productionPerVisit$() {
        return this.financeFacade.prodPerVisitTotal$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    get collectionVal$() {
        return this.financeFacade.collectionVal$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    get isLoadingCollectionVal$() {
        return combineLatest([
            this.financeFacade.isLoadingNetProfitProduction$, 
            this.financeFacade.isLoadingCollection$
        ]) .pipe(
            takeUntil(this.destroy$),
            map(([v, v1]) => v && v1)
        )
    }

    get isLoadingNetProfitProduction$() {
        return this.financeFacade.isLoadingNetProfitProduction$;
    }

    get isLoadingNetProfit$() {
        return this.financeFacade.isLoadingNetProfit$;
    }

    get isLoadingNetProfitPercentage$() {
        return this.financeFacade.isLoadingNetProfitPercentage$;
    }

    get isFullMonthsDateRange$() {
        return this.layoutFacade.isFullMonthsDateRange$;
    }

    get isConnectedWith$() {
        return this.dashbordFacade.connectedWith$.pipe(map(v => v && v != 'none'));
    }

    
    get isLoadingProductionPerVisit$() {
        return this.financeFacade.isLoadingFnProdPerVisit$.pipe(
            takeUntil(this.destroy$),
            v => v
        )
    };

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
            this.router.routerState.root.queryParams
        ])
        .pipe(
            takeUntil(this.destroy$)
        ).subscribe(([clinicId, startDate, endDate, duration, connectedWith, route]) => {
            this.dashbordFacade.loadChartTips(5, clinicId);
            const params: FnNetProfitParams = {
                clinicId: clinicId,
                startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
                endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
                duration: duration,
                queryWhEnabled: route && parseInt(route.wh??'0') == 1?1:0,
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
        });
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