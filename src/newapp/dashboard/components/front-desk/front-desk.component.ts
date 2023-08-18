import { Component, OnInit, OnDestroy } from "@angular/core";
import { DashboardFacade } from "../../facades/dashboard.facade";
import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { Router } from "@angular/router";
import { FnNetProfitParams } from "@/newapp/models/dashboard";
import moment from "moment";
import { AuthFacade } from "@/newapp/auth/facades/auth.facade";
import { FrontDeskFacade } from "../../facades/front-desk.facade";

@Component({
    selector: 'dashboard-front-desk',
    templateUrl: './front-desk.component.html',
    styleUrls: ['./front-desk.component.scss']
})
export class FrontDeskComponent implements OnInit, OnDestroy {

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    get isTrend$(){
        return this.layoutFacade.trend$.pipe(
            takeUntil(this.destroy$),
            map(t => t !== 'off')
        )
    }

    get authUserId$() {
        return this.authFacade.authUserData$.pipe(
          map(authUserData => (authUserData??this.authFacade.getAuthUserData()).id))
    }

    constructor(
        private dashbordFacade: DashboardFacade,
        private clinicFacade: ClinicFacade,
        private frontDeskFacade: FrontDeskFacade,
        private layoutFacade: LayoutFacade,
        private authFacade: AuthFacade,
        private router: Router
    ) {
        combineLatest([
            this.clinicFacade.currentClinicId$,
            this.layoutFacade.dateRange$,
            this.dashbordFacade.connectedWith$,
            this.router.routerState.root.queryParams,
            this.layoutFacade.trend$,
            this.authUserId$
        ])
        .pipe(
            takeUntil(this.destroy$),
        ).subscribe(([clinicId, dateRange, connectedWith, route, trend, userId]) => {
            if(clinicId == null) return;
            if(typeof clinicId !== 'string' && connectedWith == null) return;
            const startDate = dateRange.start;
            const endDate = dateRange.end;
            const duration = dateRange.duration; 
  
            this.dashbordFacade.loadChartTips(3, clinicId);
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

                    this.frontDeskFacade.loadFdUtilisationRate(params);
                    this.frontDeskFacade.loadFdUtilisationRateByDay(params);
                    this.frontDeskFacade.loadFdRecallRate(params);
                    this.frontDeskFacade.loadFdReappointRate(params);
                    this.frontDeskFacade.loadFdNumTicks(params);
                    this.frontDeskFacade.loadFdFtaRatio(params);
                    this.frontDeskFacade.loadFdUtaRatio(params);
                    break;
                case 'current':
                case 'historic':
                    this.frontDeskFacade.loadFdUtilisationRateTrend(
                        clinicId,
                        trend==='current'?'c':'h',
                        queryWhEnabled
                    );
                    this.frontDeskFacade.loadFdRecallRateTrend(
                        clinicId,
                        trend==='current'?'c':'h',
                        queryWhEnabled
                    );
                    this.frontDeskFacade.loadFdReappointRateTrend(
                        clinicId,
                        trend==='current'?'c':'h',
                        queryWhEnabled
                    );
                    this.frontDeskFacade.loadFdNumTicksTrend(
                        clinicId,
                        trend==='current'?'c':'h',
                        queryWhEnabled
                    );
                    this.frontDeskFacade.loadFdFtaRatioTrend(
                        clinicId,
                        trend==='current'?'c':'h',
                        queryWhEnabled
                    );
                    this.frontDeskFacade.loadFdUtaRatioTrend(
                        clinicId,
                        trend==='current'?'c':'h',
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