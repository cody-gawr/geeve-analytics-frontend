import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { Subject, takeUntil, combineLatest, map, distinctUntilChanged, filter } from 'rxjs';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Router } from '@angular/router';
import moment from 'moment';
import { ClinicianProcedureFacade } from '../../facades/clinician-procedures.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';

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
      filter(params => !!params[0]),
      map(([tips, visibility]) => {
        let tip: ChartTip;
        if (visibility === 'general') {
          tip = tips[9];
        } else {
          tip = tips[50];
        }
        if (tip && tip?.info?.toLowerCase() === 'disabled') return null;
        return tip;
      }),
    );
  }

  get cpPredictorRatioTip$() {
    return combineLatest([
      this.dashbordFacade.chartTips$,
      this.clinicianProcedureFacade.cpPredictorRatioVisibility$,
    ]).pipe(
      filter(params => !!params[0]),
      map(([tips, visibility]) => {
        let tip: ChartTip;
        if (visibility === 'indirect to large direct fillings') {
          tip = tips[10];
        } else if (visibility === 'rct to extraction') {
          tip = tips[11];
        } else {
          tip = tips[12];
        }
        if (tip && tip?.info?.toLowerCase() === 'disabled') return null;
        return tip;
      }),
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
    private dentistFacade: DentistFacade,
  ) {
    this.layoutFacade.setTrend('off');
  }

  ngOnInit(): void {
    this.clinicFacade.currentClinicId$
      .pipe(
        takeUntil(this.destroy$),
        filter(v => !!v),
        distinctUntilChanged(),
      )
      .subscribe(clinicIds => {
        this.dashbordFacade.loadChartTips(2, clinicIds);
      });

    combineLatest([
      this.clinicFacade.currentClinicId$,
      this.layoutFacade.dateRange$,
      this.router.routerState.root.queryParams,
      this.layoutFacade.trend$,
      this.dentistFacade.currentDentistId$,
    ])
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.destroy$),
      )
      .subscribe(params => {
        const [clinicId, dateRange, route, trend, dentistId] = params;
        if (clinicId == null) return;
        const providerId =
          dentistId !== 'all' && typeof clinicId !== 'string' ? dentistId : undefined;
        const startDate = dateRange.start;
        const endDate = dateRange.end;
        const duration = dateRange.duration;

        const queryWhEnabled = route && parseInt(route.wh ?? '-1');

        const _params = {
          clinicId: clinicId,
          startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
          endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
          duration: duration,
          queryWhEnabled,
          dentistId: providerId,
        };

        const isDentistMode = !(dentistId === 'all' || typeof clinicId == 'string');
        const isTrend = trend !== 'off';

        if (isDentistMode && isTrend) {
          for (const api of [
            'cpPredictorAnalysisTrend',
            'cpPredictorSpecialistAnalysisTrend',
            'cpReferralsTrend',
            'cpPredictorRatioTrend',
          ]) {
            const params = {
              clinicId,
              mode: trend === 'current' ? 'c' : trend === 'historic' ? 'h' : 'w',
              queryWhEnabled,
              dentistId: providerId,
            };

            this.clinicianProcedureFacade.loadTrendApiRequest({
              ...params,
              api: api,
            });
          }
        } else {
          this.clinicianProcedureFacade.loadCpPredictorAnalysis(_params);
          this.clinicianProcedureFacade.loadCpPredictorSpecialistAnalysis(_params);
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
    return this.dashbordFacade.getChartTip$(index);
  }
}
