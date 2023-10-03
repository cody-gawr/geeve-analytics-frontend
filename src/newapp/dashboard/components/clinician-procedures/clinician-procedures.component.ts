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
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map(t => t !== 'off')
    );
  }

  get cpPredictorAnalysisTip$() {
    return combineLatest([
      this.dashbordFacade.chartTips$,
      this.clinicianProcedureFacade.cpPredictorAnalysisVisibility$,
    ]).pipe(
      takeUntil(this.destroy$),
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
      takeUntil(this.destroy$),
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
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  constructor(
    private dashbordFacade: DashboardFacade,
    private clinicFacade: ClinicFacade,
    private clinicianProcedureFacade: ClinicianProcedureFacade,
    private layoutFacade: LayoutFacade,
    private router: Router,
    private dentistFacade: DentistFacade
  ) {
    combineLatest([
      this.clinicFacade.currentClinicId$,
      this.layoutFacade.dateRange$,
      // this.dashbordFacade.connectedWith$,
      this.router.routerState.root.queryParams,
      this.layoutFacade.trend$,
      this.dentistFacade.currentDentistId$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const [clinicId, dateRange, route, trend, dentistId] = params;
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

        this.clinicianProcedureFacade.loadCpPredictorAnalysis(_params);
        this.clinicianProcedureFacade.loadCpPredictorSpecialistAnalysis(
          _params
        );
        this.clinicianProcedureFacade.loadCpRevPerProcedure(_params);
        this.clinicianProcedureFacade.loadCpPredictorRatio(_params);
        this.clinicianProcedureFacade.loadCpReferrals(_params);
        // switch (trend) {
        //   case 'off':
        //     const params = {
        //       clinicId: clinicId,
        //       startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
        //       endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
        //       duration: duration,
        //       queryWhEnabled,
        //       dentistId: providerId,
        //     };

        //     this.clinicianProcedureFacade.loadCpPredictorAnalysis(params);
        //     this.clinicianProcedureFacade.loadCpPredictorSpecialistAnalysis(
        //       params
        //     );
        //     this.clinicianProcedureFacade.loadCpRevPerProcedure(params);
        //     this.clinicianProcedureFacade.loadCpPredictorRatio(params);
        //     this.clinicianProcedureFacade.loadCpReferrals(params);
        //     break;
        //   case 'current':
        //   case 'historic':
        //     break;
        // }
      });
  }

  ngOnInit(): void {}

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
