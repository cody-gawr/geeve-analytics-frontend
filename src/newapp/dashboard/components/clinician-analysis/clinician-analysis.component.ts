import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import {
  Observable,
  Subject,
  takeUntil,
  combineLatest,
  map,
  distinctUntilChanged,
} from 'rxjs';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Router } from '@angular/router';
import moment from 'moment';
import { ClinicianAnalysisFacade } from '../../facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';

const caEndpoints = [
  'caDentistProduction',
  'caCollection',
  'caCollectionExp',
  'caDentistProductionDentist',
  'caDentistProductionOht',
  'caCollectionDentists',
  'caCollectionOht',
  'caCollectionExpDentists',
  'caCollectionExpOht',
  'caHourlyRate',
  'caCollectionHourlyRate',
  'caCollectionExpHourlyRate',
  'caHourlyRateDentists',
  'caHourlyRateOht',
  'caCollectionHourlyRateDentist',
  'caCollectionHourlyRateOht',
  'caCollectionExpHourlyRateDentist',
  'caCollectionExpHourlyRateOht',
  'caNumNewPatients',
  'caTxPlanAvgProposedFees',
  'caTxPlanAvgCompletedFees',
  'caTxPlanCompRate',
  'caRecallRate',
  'caReappointRate',
  'caNumComplaints',
];

@Component({
  selector: 'clinician-analysis',
  templateUrl: './clinician-analysis.component.html',
  styleUrls: ['./clinician-analysis.component.scss'],
})
export class ClinicianAnalysisComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get clinicId$() {
    return this.clinicFacade.currentClinicId$;
  }

  get isAverageToggleVisible$(): Observable<boolean> {
    return combineLatest([
      this.dentistFacade.currentDentistId$,
      this.clinicFacade.currentMultiClinicIDs$,
    ]).pipe(
      map(
        ([dentistId, clinicIds]) => dentistId === 'all' || clinicIds.length > 1
      )
    );
  }

  get isEnableCompare$() {
    return this.authFacade.rolesIndividual$.pipe(
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
      this.clinicFacade.currentClinics$,
      this.layoutFacade.dateRange$,
      this.router.routerState.root.queryParams,
      this.dentistFacade.currentDentistId$,
      this.layoutFacade.trend$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(params => {
        const [clinics, dateRange, route, dentistId, trend] = params;
        if (clinics.length == 0) return;

        const isTrend = trend !== 'off' && dentistId !== 'all';
        const providerId =
          dentistId !== 'all' && clinics.length == 1 ? dentistId : undefined;

        const startDate = dateRange.start;
        const endDate = dateRange.end;
        const duration = dateRange.duration;
        const clinicIds = clinics.map(v => v.id).join(',');
        this.dashbordFacade.loadChartTips(1, clinicIds);
        const queryWhEnabled = route && parseInt(route.wh ?? '0') == 1 ? 1 : 0;

        const queryParams = {
          clinicId: clinicIds,
          startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
          endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
          duration: duration,
          queryWhEnabled,
          dentistId: providerId,
        };

        if (providerId) {
          const endpoints = [
            'caDentistProductionTrend',
            'caCollectionTrend',
            'caCollectionExpTrend',
          ];

          if (isTrend) {
            endpoints.push(
              'caHourlyRateTrend',
              'caCollectionHourlyRateTrend',
              'caCollectionExpHourlyRateTrend',
              'caNumNewPatientsTrend',
              'caTxPlanAvgProposedFeesTrend',
              'caTxPlanAvgCompletedFeesTrend',
              'caTxPlanCompRateTrend',
              'caRecallRateTrend',
              'caReappointRateTrend',
              'caNumComplaintsTrend'
            );
          }

          endpoints.forEach(api => {
            const params = {
              clinicId: clinicIds,
              mode:
                trend === 'current' ? 'c' : trend === 'historic' ? 'h' : 'w',
              queryWhEnabled,
              dentistId: providerId,
            };
            this.caFacade.loadTrendApiRequest({
              ...params,
              api: api,
            });
          });
        }

        if (!isTrend) {
          for (const api of caEndpoints) {
            this.caFacade.loadNoneTrendApiRequest({
              ...queryParams,
              api,
            });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  getChartTip(index: number) {
    return this.dashbordFacade.chartTips$.pipe(
      map(c => (c && c[index] ? c[index] : ''))
    );
  }

  get txPlanAvgTooltip$() {
    return combineLatest([
      this.caFacade.txPlanAvgFeeChartName$,
      this.dashbordFacade.chartTips$,
    ]).pipe(
      map(([chartName, tipData]) => {
        tipData = tipData ?? [];
        if (chartName == 'Avg. Completed Fees') {
          return tipData[53] ?? '';
        } else {
          return tipData[3] ?? '';
        }
      })
    );
  }

  get recallRateTooltip$() {
    return combineLatest([
      this.caFacade.recallRateChartName$,
      this.dashbordFacade.chartTips$,
    ]).pipe(
      map(([chartName, tipData]) => {
        tipData = tipData ?? [];
        if (chartName == 'Recall Prebook Rate') {
          return tipData[4] ?? '';
        } else {
          return tipData[5] ?? '';
        }
      })
    );
  }
}
