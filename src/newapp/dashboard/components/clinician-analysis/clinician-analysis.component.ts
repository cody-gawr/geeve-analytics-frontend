import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Router } from '@angular/router';
import moment from 'moment';
import { ClinicianAnalysisFacade } from '../../facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';

@Component({
  selector: 'clinician-analysis',
  templateUrl: './clinician-analysis.component.html',
  styleUrls: ['./clinician-analysis.component.scss'],
})
export class ClinicianAnalysisComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map(t => t !== 'off')
    );
  }

  get clinicId$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get isAllDentist$() {
    return this.dentistFacade.currentDentistId$.pipe(
      takeUntil(this.destroy$),
      map(v => {
        return v === 'all';
      })
    );
  }

  get isEnableCompare$() {
    return this.authFacade.rolesIndividual$.pipe(
      takeUntil(this.destroy$),
      map(v => v?.type == 4 && v?.plan != 'lite')
    );
  }

  constructor(
    private dashbordFacade: DashboardFacade,
    private clinicFacade: ClinicFacade,
    private caFacade: ClinicianAnalysisFacade,
    private layoutFacade: LayoutFacade,
    private router: Router,
    private dentistFacade: DentistFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.clinicFacade.currentClinicId$,
      this.layoutFacade.dateRange$,
      this.router.routerState.root.queryParams,
      this.layoutFacade.trend$,
      this.dentistFacade.currentDentistId$,
      this.isAllDentist$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const [clinicId, dateRange, route, trend, dentistId, isAllClinic] =
          params;
        if (clinicId == null) return;
        const providerId =
          dentistId !== 'all' && typeof clinicId !== 'string'
            ? dentistId
            : undefined;
        const startDate = dateRange.start;
        const endDate = dateRange.end;
        const duration = dateRange.duration;

        this.dashbordFacade.loadChartTips(1, clinicId);
        const queryWhEnabled = route && parseInt(route.wh ?? '0') == 1 ? 1 : 0;
        if (trend === 'off' || isAllClinic) {
          const params = {
            clinicId: clinicId,
            startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
            endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
            duration: duration,
            queryWhEnabled,
            dentistId: providerId,
          };
          this.caFacade.loadNoneTrendApiRequest({
            ...params,
            api: 'caDentistProduction',
          });
          this.caFacade.loadNoneTrendApiRequest({
            ...params,
            api: 'caCollection',
          });
          this.caFacade.loadNoneTrendApiRequest({
            ...params,
            api: 'caCollectionExp',
          });
          this.caFacade.loadNoneTrendApiRequest({
            ...params,
            api: 'caDentistProductionDentist',
          });
          this.caFacade.loadNoneTrendApiRequest({
            ...params,
            api: 'caDentistProductionOht',
          });
          this.caFacade.loadNoneTrendApiRequest({
            ...params,
            api: 'caCollectionDentists',
          });
          this.caFacade.loadNoneTrendApiRequest({
            ...params,
            api: 'caCollectionOht',
          });
          this.caFacade.loadNoneTrendApiRequest({
            ...params,
            api: 'caCollectionExpDentists',
          });
          this.caFacade.loadNoneTrendApiRequest({
            ...params,
            api: 'caCollectionExpOht',
          });
        } else {
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
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
