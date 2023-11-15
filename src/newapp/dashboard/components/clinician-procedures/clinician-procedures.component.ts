import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Router } from '@angular/router';
import moment from 'moment';
import { ClinicianProcedureFacade } from '../../facades/clinician-procedures.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';

@Component({
  selector: 'clinician-procedures',
  templateUrl: './clinician-procedures.component.html',
  styleUrls: ['./clinician-procedures.component.scss'],
})
export class ClinicianProcedureComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get isDentistMode$() {
    return this.dentistFacade.isDentistMode$;
  }

  get cpPredictorAnalysisTip$() {
    return combineLatest([
      this.dashbordFacade.chartTips$,
      this.clinicianProcedureFacade.cpPredictorAnalysisVisibility$,
    ]).pipe(
      map(([tips, visibility]) => {
        if (visibility === 'general') {
          if (tips && tips[9]) {
            return tips[9];
          }
        } else {
          if (tips && tips[50]) {
            return tips[50];
          }
        }
        return '';
      })
    );
  }

  get cpPredictorRatioTip$() {
    return combineLatest([
      this.dashbordFacade.chartTips$,
      this.clinicianProcedureFacade.cpPredictorRatioVisibility$,
    ]).pipe(
      map(([tips, visibility]) => {
        if (visibility === 1) {
          if (tips && tips[10]) {
            return tips[10];
          }
        } else if (visibility === 2) {
          if (tips && tips[11]) {
            return tips[11];
          }
        } else {
          if (tips && tips[12]) {
            return tips[12];
          }
        }
        return '';
      })
    );
  }

  get clinicId$() {
    return this.clinicFacade.currentClinicId$;
  }

  constructor(
    private dashbordFacade: DashboardFacade,
    private clinicFacade: ClinicFacade,
    private clinicianProcedureFacade: ClinicianProcedureFacade,
    private layoutFacade: LayoutFacade,
    private router: Router,
    private dentistFacade: DentistFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.isDentistMode$,
      this.isTrend$,
      this.clinicFacade.currentClinicId$,
      this.layoutFacade.dateRange$,
      this.router.routerState.root.queryParams,
      this.layoutFacade.trend$,
      this.dentistFacade.currentDentistId$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const [
          isDentistMode,
          isTrend,
          clinicId,
          dateRange,
          route,
          trend,
          dentistId,
        ] = params;
        if (clinicId == null) return;
        const providerId =
          dentistId !== 'all' && typeof clinicId !== 'string'
            ? dentistId
            : undefined;
        const startDate = dateRange.start;
        const endDate = dateRange.end;
        const duration = dateRange.duration;

        this.dashbordFacade.loadChartTips(2, clinicId);
        const queryWhEnabled = route && parseInt(route.wh ?? '0') == 1 ? 1 : 0;

        const _params = {
          clinicId: clinicId,
          startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
          endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
          duration: duration,
          queryWhEnabled,
          dentistId: providerId,
        };

        if (isDentistMode && isTrend) {
          for (const api of [
            'cpPredictorAnalysisTrend',
            'cpPredictorSpecialistAnalysisTrend',
            'cpReferralsTrend',
            'cpPredictorRatioTrend',
          ]) {
            const params = {
              clinicId,
              mode:
                trend === 'current' ? 'c' : trend === 'historic' ? 'h' : 'w',
              queryWhEnabled,
              dentistId: providerId,
            };

            console.log({ api });
            this.clinicianProcedureFacade.loadTrendApiRequest({
              ...params,
              api: api,
            });
          }
        } else {
          this.clinicianProcedureFacade.loadCpPredictorAnalysis(_params);
          this.clinicianProcedureFacade.loadCpPredictorSpecialistAnalysis(
            _params
          );
          this.clinicianProcedureFacade.loadCpRevPerProcedure(_params);
          this.clinicianProcedureFacade.loadCpPredictorRatio(_params);
          this.clinicianProcedureFacade.loadCpReferrals(_params);
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
