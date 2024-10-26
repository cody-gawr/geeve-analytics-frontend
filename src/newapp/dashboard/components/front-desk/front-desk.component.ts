import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import {
  Subject,
  takeUntil,
  combineLatest,
  map,
  filter,
  distinctUntilChanged,
} from 'rxjs';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Router } from '@angular/router';
import moment from 'moment';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { FrontDeskFacade } from '../../facades/front-desk.facade';
import _ from 'lodash';

@Component({
  selector: 'dashboard-front-desk',
  templateUrl: './front-desk.component.html',
  styleUrls: ['./front-desk.component.scss'],
})
export class FrontDeskComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get isPraktika$() {
    return this.clinicFacade.isEachClinicPraktika$;
  }

  get isCore$() {
    return this.clinicFacade.isEachClinicCore$;
  }

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
    private frontDeskFacade: FrontDeskFacade,
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
        this.dashbordFacade.loadChartTips(3, clinicIds);
      });

    combineLatest([
      this.clinicFacade.currentClinics$,
      this.layoutFacade.dateRange$,
      this.clinicFacade.connectedWith$,
      this.router.routerState.root.queryParams,
      this.layoutFacade.trend$,
      this.clinicFacade.connectedClinicId$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(params => {
        const [
          clinics,
          dateRange,
          connectedWith,
          route,
          trend,
          connectedClinicId,
        ] = params;

        const clinicId =
          clinics.length > 0
            ? clinics.length > 1
              ? clinics.map(c => c.id).join(',')
              : clinics[0].id
            : null;
        const isEachClinicPmsCoreOrExact =
          clinics.every(c => c.pms == 'core') ||
          clinics.every(c => c.pms == 'exact');
        const isEachClinicPmsCoreOrPraktika = clinics.every(
          c => c.pms == 'praktika' || c.pms == 'core'
        );
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
        this.frontDeskFacade.setErrors([]);
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
            if (!isEachClinicPmsCoreOrExact) {
              this.frontDeskFacade.loadFdUtilisationRate(params);
              this.frontDeskFacade.loadFdUtilisationRateByDay(params);
            }
            this.frontDeskFacade.loadFdRecallRate(params);
            this.frontDeskFacade.loadFdReappointRate(params);
            this.frontDeskFacade.loadFdNumTicks(params);
            this.frontDeskFacade.loadFdFtaRatio(params);
            if (!isEachClinicPmsCoreOrPraktika) {
              this.frontDeskFacade.loadFdUtaRatio(params);
            }
            break;
          case 'current':
          case 'historic':
            if (!isEachClinicPmsCoreOrExact) {
              this.frontDeskFacade.loadFdUtilisationRateTrend(
                clinicId,
                trend === 'current' ? 'c' : 'h',
                queryWhEnabled
              );
            }
            this.frontDeskFacade.loadFdRecallRateTrend(
              clinicId,
              trend === 'current' ? 'c' : 'h',
              queryWhEnabled
            );
            this.frontDeskFacade.loadFdReappointRateTrend(
              clinicId,
              trend === 'current' ? 'c' : 'h',
              queryWhEnabled
            );
            this.frontDeskFacade.loadFdNumTicksTrend(
              clinicId,
              trend === 'current' ? 'c' : 'h',
              queryWhEnabled
            );
            this.frontDeskFacade.loadFdFtaRatioTrend(
              clinicId,
              trend === 'current' ? 'c' : 'h',
              queryWhEnabled
            );
            if (!isEachClinicPmsCoreOrPraktika) {
              this.frontDeskFacade.loadFdUtaRatioTrend(
                clinicId,
                trend === 'current' ? 'c' : 'h',
                queryWhEnabled
              );
            }

            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  getChartTip(index: number) {
    return this.dashbordFacade.chartTips$.pipe(
      map(c => {
        if (c && c[index]) {
          return c[index];
        }
        return '';
      })
    );
  }
}
