import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Router } from '@angular/router';
import moment from 'moment';
import { MarketingFacade } from '../../facades/marketing.facade';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import _ from 'lodash';

@Component({
  selector: 'dashboard-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss'],
})
export class MarketingComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map(t => t !== 'off')
    );
  }

  get authUserId$() {
    return this.authFacade.authUserData$.pipe(
      map(
        authUserData => (authUserData ?? this.authFacade.getAuthUserData()).id
      )
    );
  }

  get clinicId$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  constructor(
    private dashbordFacade: DashboardFacade,
    private clinicFacade: ClinicFacade,
    private marketingFacade: MarketingFacade,
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
      this.authUserId$,
      this.dashbordFacade.connectedClinicId$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const [
          clinicId,
          dateRange,
          connectedWith,
          route,
          trend,
          userId,
          connectedClinicId,
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

        this.dashbordFacade.loadChartTips(4, clinicId);
        const queryWhEnabled = route && parseInt(route.wh ?? '0') == 1 ? 1 : 0;
        this.marketingFacade.setErrors([]);
        switch (trend) {
          case 'off':
            const params = {
              clinicId: clinicId,
              startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
              endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
              duration: duration,
              queryWhEnabled,
              connectedWith: connectedWith,
            };
            this.marketingFacade.loadRevByReferral(params);
            this.marketingFacade.loadMkNewPatientsByReferral(params);
            this.marketingFacade.loadNewPatientsAcq({
              ...params,
              connectedWith,
            });
            this.marketingFacade.loadNewNumPatients(params);
            this.marketingFacade.loadActivePatients(params);

            this.marketingFacade.loadTotalVisits(params);
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
            this.marketingFacade.loadNewPatientsAcqTrend({
              clinicId,
              mode: trend === 'current' ? 'c' : 'h',
              queryWhEnabled,
              connectedWith,
            });
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

        if (connectedWith == 'myob') {
          this.marketingFacade.loadMkGetMyobAccounts({ clinicId, userId });
        } else if (connectedWith == 'xero') {
          this.marketingFacade.loadMkGetXeroAccounts({ clinicId, userId });
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get getNumNewPatientsTip$() {
    return combineLatest([
      this.dashbordFacade.chartTips$,
      this.marketingFacade.isActivePatients$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([tip, v]) => {
        if (v) {
          return tip && tip[61] && tip[61];
        } else {
          return tip && tip[36] && tip[36];
        }
      })
    );
  }

  getChartTip(index: number) {
    return this.dashbordFacade.chartTips$.pipe(
      takeUntil(this.destroy$),
      map(c => {
        if (c && c[index]) {
          return c[index];
        }
        return '';
      })
    );
  }
}
