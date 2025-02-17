import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import {
  Subject,
  takeUntil,
  combineLatest,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Router } from '@angular/router';
import moment from 'moment';
import { MarketingFacade } from '../../facades/marketing.facade';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import _ from 'lodash';
import { ChartDescParams } from '@/newapp/models/dashboard';

@Component({
  selector: 'dashboard-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss'],
})
export class MarketingComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get authUserId$() {
    return this.authFacade.authUserData$.pipe(
      map(
        authUserData => (authUserData ?? this.authFacade.getAuthUserData()).id
      )
    );
  }

  get clinicId$() {
    return this.clinicFacade.currentClinicId$;
  }

  constructor(
    private dashbordFacade: DashboardFacade,
    private clinicFacade: ClinicFacade,
    private marketingFacade: MarketingFacade,
    private layoutFacade: LayoutFacade,
    private authFacade: AuthFacade,
    private router: Router
  ) {
    this.layoutFacade.setTrend('off');
  }

  ngOnInit(): void {
    this.clinicFacade.currentClinicId$
      .pipe(
        takeUntil(this.destroy$),
        filter(v => !!v),
        distinctUntilChanged()
      )
      .subscribe(clinicIds => {
        this.dashbordFacade.loadChartTips(4, clinicIds);
      });

    combineLatest([
      this.clinicFacade.currentClinicId$,
      this.layoutFacade.dateRange$,
      this.clinicFacade.connectedWith$,
      this.router.routerState.root.queryParams,
      this.layoutFacade.trend$,
      this.clinicFacade.connectedClinicId$,
      this.clinicFacade.isMultiClinicsSelected$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(params => {
        const [
          clinicId,
          dateRange,
          connectedWith,
          route,
          trend,
          connectedClinicId,
          isMultiClinics,
        ] = params;
        if (clinicId == null) return;
        const newConnectedId =
          typeof clinicId == 'string'
            ? _.min(clinicId.split(',').map(c => parseInt(c)))
            : clinicId;
        if (newConnectedId !== connectedClinicId) {
          return;
        }
        const startDate = dateRange.start;
        const endDate = dateRange.end;
        const duration = dateRange.duration;

        const queryWhEnabled = route && parseInt(route.wh ?? '0') == 1 ? 1 : 0;
        this.marketingFacade.setErrors([]);
        switch (trend) {
          case 'off':
            const params: ChartDescParams<MarketingEndpoints> = {
              clinicId: clinicId,
              startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
              endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
              duration: duration,
              queryWhEnabled,
              connectedWith: connectedWith,
            };
            this.marketingFacade.loadRevByReferral(<any>params);
            this.marketingFacade.loadMkNewPatientsByReferral(<any>params);
            ['mkProdByPostCode', 'mkProdByAge'].forEach(chartName => {
              this.marketingFacade.loadChartDescription(
                <MarketingEndpoints>chartName, params);
            });
            if (['xero', 'myob'].includes(connectedWith) || isMultiClinics) {
              this.marketingFacade.loadNewPatientsAcq({
                ...<any>params,
                connectedWith,
              });
            }
            this.marketingFacade.loadNewNumPatients(<any>params);
            this.marketingFacade.loadActivePatients(<any>params);

            this.marketingFacade.loadTotalVisits(<any>params);
            break;
          case 'current':
          case 'historic':
            this.marketingFacade.loadRevByReferralTrend({
              clinicId,
              mode: trend === 'current' ? 'c' : 'h',
              queryWhEnabled,
            });
            this.marketingFacade.loadMkNewPatientsByReferralTrend({
              clinicId,
              mode: trend === 'current' ? 'c' : 'h',
              queryWhEnabled,
            });
            ['mkProdByPostCodeTrend', 'mkProdByAgeTrend'].forEach(chartName => {
              this.marketingFacade.loadChartDescription(<MarketingEndpoints>chartName, {
                clinicId,
                mode: trend === 'current' ? 'c' : 'h',
                queryWhEnabled,
              });
            });
            if (['xero', 'myob'].includes(connectedWith) || isMultiClinics) {
              this.marketingFacade.loadNewPatientsAcqTrend({
                clinicId,
                mode: trend === 'current' ? 'c' : 'h',
                queryWhEnabled,
                connectedWith,
              });
            }
            this.marketingFacade.loadNewNumPatientsTrend({
              clinicId,
              mode: trend === 'current' ? 'c' : 'h',
              queryWhEnabled,
            });
            this.marketingFacade.loadActivePatientsTrend({
              clinicId,
              mode: trend === 'current' ? 'c' : 'h',
              queryWhEnabled,
            });

            this.marketingFacade.loadTotalVisitsTrend({
              clinicId,
              mode: trend === 'current' ? 'c' : 'h',
              queryWhEnabled,
            });
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get getNumNewPatientsTip$() {
    return combineLatest([
      this.dashbordFacade.chartTips$,
      this.marketingFacade.isActivePatients$,
    ]).pipe(
      filter(params => !!params[0]),
      map(([chartTips, v]) => {
        let tip;
        if (v) {
          tip = chartTips[61];
        } else {
          tip = chartTips[36];
        }
        if(tip && tip?.info?.toLowerCase() === 'disabled') return null;
        return tip;
      })
    );
  }

  getChartTip(index: number) {
    return this.dashbordFacade.getChartTip$(index);
  }

  postCodeChartTip$ = combineLatest([
    this.dashbordFacade.chartTips$,
    this.marketingFacade.prodByPostCodeChartName$,
  ]).pipe(
    filter(params => !!params[0]),
    map(([tips, chartName]) => {
      let tip;
      if (chartName === 'Production By Post Code') {
        tip = tips[100];
      }else if (chartName === 'Production By Age') {
        tip = tips[101];
      }
      if(tip && tip?.info?.toLowerCase() === 'disabled') return null;
      return tip;
    })
  );
}
