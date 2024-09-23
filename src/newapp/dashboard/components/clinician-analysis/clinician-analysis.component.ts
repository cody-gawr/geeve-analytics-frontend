import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Router } from '@angular/router';
import moment from 'moment';
import { ClinicianAnalysisFacade } from '../../facades/clinician-analysis.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';

interface QueryParams {
  clinicId: string;
  startDate: string;
  endDate: string;
  duration: DATE_RANGE_DURATION;
  queryWhEnabled?: 0 | 1;
  dentistId?: number;
  clinician?: number;
}

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
      this.layoutFacade.compare$,
      this.dentistFacade.currentDentistId$,
      this.clinicFacade.currentMultiClinicIDs$,
    ]).pipe(
      map(
        ([compare, dentistId, clinicIds]) =>
          compare || dentistId === 'all' || clinicIds.length > 1
      )
    );
  }

  get prodChartTip$() {
    return combineLatest([
      this.caFacade.prodChartName$,
      this.dashbordFacade.chartTips$,
    ]).pipe(
      filter(params => !!params[1]),
      map(([chartName, tips]) => {
        switch (chartName) {
          case 'Production':
            return tips[1] ?? '';
          case 'Collection':
            return tips[49] ?? '';
          case 'Collection-Exp':
            return tips[62] ?? '';
        }
        return '';
      })
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
  ) {
    this.layoutFacade.setTrend('off');
  }

  get queryParams$() {
    return combineLatest([
      this.clinicFacade.currentClinics$,
      this.layoutFacade.dateRange$,
      this.layoutFacade.compare$,
      this.router.routerState.root.queryParams,
      this.dentistFacade.currentDentistId$,
      this.layoutFacade.trend$,
    ]).pipe(
      takeUntil(this.destroy$),
      filter(params => params[0]?.length > 0),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      map(([clinics, dateRange, compare, route, dentistId, trend]) => {
        const providerId =
          dentistId !== 'all' && clinics.length == 1 ? dentistId : undefined;
        const startDate = dateRange.start;
        const endDate = dateRange.end;
        const duration = dateRange.duration;
        const queryWhEnabled = route && parseInt(route.wh ?? '0') == 1 ? 1 : 0;
        const isEachClinicPraktika = clinics.every(c => c.pms === 'praktika');

        let queryParams: QueryParams = {
          clinicId: clinics.map(v => v.id).join(','),
          startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
          endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
          duration: duration,
        };
        queryParams = compare
          ? {
              ...queryParams,
              clinician: providerId,
            }
          : {
              ...queryParams,
              queryWhEnabled,
              dentistId: providerId,
            };

        return { queryParams, trend, queryWhEnabled, isEachClinicPraktika };
      })
    );
  }

  ngOnInit(): void {
    this.clinicFacade.currentClinicId$
      .pipe(
        takeUntil(this.destroy$),
        filter(v => !!v),
        distinctUntilChanged()
      )
      .subscribe(clinicIds => {
        this.dashbordFacade.loadChartTips(1, clinicIds);
      });

    this.queryParams$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(
        ({ queryParams, trend, queryWhEnabled, isEachClinicPraktika }) => {
          const { dentistId: providerId } = queryParams;
          const isTrend = trend !== 'off' && providerId;

          if (!isTrend) {
            const caEndpoints = ['caNumNewPatients', 'caNumComplaints'];

            caEndpoints.push('caTxPlanCompRate');

            for (const api of caEndpoints) {
              this.caFacade.loadNoneTrendApiRequest({
                api: <CA_API_ENDPOINTS>api,
                ...queryParams,
              });
            }
          } else {
            const endpoints = [];
            endpoints.push('caNumNewPatientsTrend', 'caNumComplaintsTrend');

            endpoints.push('caTxPlanCompRateTrend');
            endpoints.forEach(api => {
              const params = {
                clinicId: queryParams.clinicId,
                mode:
                  trend === 'current' ? 'c' : trend === 'historic' ? 'h' : 'w',
                queryWhEnabled,
                dentistId: queryParams.dentistId,
              };
              this.caFacade.loadTrendApiRequest({
                ...params,
                api: api,
              });
            });
          }
        }
      );

    combineLatest([
      this.queryParams$,
      this.caFacade.prodChartName$,
      this.caFacade.prodSelectTab$,
      this.caFacade.colSelectTab$,
      this.caFacade.colExpSelectTab$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(
        ([
          { queryParams, trend, queryWhEnabled },
          visibility,
          prodSelectShow,
          colSelectShow,
          colExpSelectShow,
        ]) => {
          const { dentistId: providerId } = queryParams;
          const isTrend = trend !== 'off' && providerId;
          const caEndpoints = [],
            caTrendEndpoints = [];

          switch (visibility) {
            case 'Production':
              if (!queryParams.dentistId) {
                switch (prodSelectShow) {
                  case 'production_all':
                    caEndpoints.push('caDentistProduction');
                    break;
                  case 'production_dentists':
                    caEndpoints.push('caDentistProductionDentist');
                    break;
                  case 'production_oht':
                    caEndpoints.push('caDentistProductionOht');
                }
              } else {
                caEndpoints.push('caDentistProduction');
                caTrendEndpoints.push('caDentistProductionTrend');
              }
              break;
            case 'Collection':
              if (!queryParams.dentistId) {
                switch (colSelectShow) {
                  case 'collection_all':
                    caEndpoints.push('caCollection');
                    break;
                  case 'collection_dentists':
                    caEndpoints.push('caCollectionDentists');
                    break;
                  case 'collection_oht':
                    caEndpoints.push('caCollectionOht');
                }
              } else {
                caEndpoints.push('caCollection');
                caTrendEndpoints.push('caCollectionTrend');
              }
              break;
            case 'Collection-Exp':
              if (!queryParams.dentistId) {
                switch (colExpSelectShow) {
                  case 'collection_exp_all':
                    caEndpoints.push('caCollectionExp');
                    break;
                  case 'collection_exp_dentists':
                    caEndpoints.push('caCollectionExpDentists');
                    break;
                  case 'collection_exp_oht':
                    caEndpoints.push('caCollectionExpOht');
                    break;
                }
              } else {
                caEndpoints.push('caCollectionExp');
                caTrendEndpoints.push('caCollectionExpTrend');
              }
          }

          //if (!isTrend) {
          for (const api of caEndpoints) {
            this.caFacade.loadNoneTrendApiRequest({
              ...queryParams,
              api,
            });
          }
          //} else {
          caTrendEndpoints.forEach(api => {
            const params = {
              clinicId: queryParams.clinicId,
              mode:
                trend === 'current' ? 'c' : trend === 'historic' ? 'h' : 'w',
              queryWhEnabled,
              dentistId: queryParams.dentistId,
            };
            this.caFacade.loadTrendApiRequest({
              ...params,
              api: api,
            });
          });
          //}
        }
      );

    combineLatest([
      this.queryParams$,
      this.caFacade.hourlyRateChartName$,
      this.caFacade.hourlyRateProdSelectTab$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(
        ([
          { queryParams, trend, queryWhEnabled },
          visibility,
          prodSelectShow,
        ]) => {
          const { dentistId: providerId } = queryParams;
          const isTrend = trend !== 'off' && providerId;
          const caEndpoints = [],
            caTrendEndpoints = [];

          switch (visibility) {
            case 'Production':
              if (!queryParams.dentistId) {
                switch (prodSelectShow) {
                  case 'hourly_rate_all':
                    caEndpoints.push('caHourlyRate');
                    break;
                  case 'hourly_rate_dentists':
                    caEndpoints.push('caHourlyRateDentists');
                    break;
                  case 'hourly_rate_oht':
                    caEndpoints.push('caHourlyRateOht');
                }
              } else {
                caEndpoints.push('caHourlyRate');
                caTrendEndpoints.push('caHourlyRateTrend');
              }
              break;
            case 'Collection':
              if (!queryParams.dentistId) {
                switch (prodSelectShow) {
                  case 'hourly_rate_all':
                    caEndpoints.push('caCollectionHourlyRate');
                    break;
                  case 'hourly_rate_dentists':
                    caEndpoints.push('caCollectionHourlyRateDentist');
                    break;
                  case 'hourly_rate_oht':
                    caEndpoints.push('caCollectionHourlyRateOht');
                }
              } else {
                caEndpoints.push('caCollectionHourlyRate');
                caTrendEndpoints.push('caCollectionHourlyRateTrend');
              }
              break;
            case 'Collection-Exp':
              if (!queryParams.dentistId) {
                switch (prodSelectShow) {
                  case 'hourly_rate_all':
                    caEndpoints.push('caCollectionExpHourlyRate');
                    break;
                  case 'hourly_rate_dentists':
                    caEndpoints.push('caCollectionExpHourlyRateDentist');
                    break;
                  case 'hourly_rate_oht':
                    caEndpoints.push('caCollectionExpHourlyRateOht');
                    break;
                }
              } else {
                caEndpoints.push('caCollectionExpHourlyRate');
                caTrendEndpoints.push('caCollectionExpHourlyRateTrend');
              }
          }

          if (!isTrend) {
            for (const api of caEndpoints) {
              this.caFacade.loadNoneTrendApiRequest({
                ...queryParams,
                api,
              });
            }
          } else {
            caTrendEndpoints.forEach(api => {
              const params = {
                clinicId: queryParams.clinicId,
                mode:
                  trend === 'current' ? 'c' : trend === 'historic' ? 'h' : 'w',
                queryWhEnabled,
                dentistId: queryParams.dentistId,
              };
              this.caFacade.loadTrendApiRequest({
                ...params,
                api: api,
              });
            });
          }
        }
      );

    combineLatest([this.queryParams$, this.caFacade.txPlanAvgFeeChartName$])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(
        ([
          { queryParams, trend, queryWhEnabled, isEachClinicPraktika },
          visibility,
        ]) => {
          const caEndpoints = [],
            caTrendEndpoints = [];
          const { dentistId: providerId } = queryParams;
          const isTrend = trend !== 'off' && providerId;

          switch (visibility) {
            case 'Avg. Proposed Fees':
              caEndpoints.push('caTxPlanAvgProposedFees');
              caTrendEndpoints.push('caTxPlanAvgProposedFeesTrend');

              break;
            case 'Avg. Completed Fees':
              caEndpoints.push('caTxPlanAvgCompletedFees');
              caTrendEndpoints.push('caTxPlanAvgCompletedFeesTrend');

              break;
          }

          if (!isTrend) {
            for (const api of caEndpoints) {
              this.caFacade.loadNoneTrendApiRequest({
                ...queryParams,
                api,
              });
            }
          } else {
            caTrendEndpoints.forEach(api => {
              const params = {
                clinicId: queryParams.clinicId,
                mode:
                  trend === 'current' ? 'c' : trend === 'historic' ? 'h' : 'w',
                queryWhEnabled,
                dentistId: queryParams.dentistId,
              };
              this.caFacade.loadTrendApiRequest({
                ...params,
                api: api,
              });
            });
          }
        }
      );

    combineLatest([this.queryParams$, this.caFacade.recallRateChartName$])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(([{ queryParams, trend, queryWhEnabled }, visibility]) => {
        const { dentistId: providerId } = queryParams;
        const isTrend = trend !== 'off' && providerId;
        const caEndpoints = [],
          caTrendEndpoints = [];

        switch (visibility) {
          case 'Recall Prebook Rate':
            caEndpoints.push('caRecallRate');
            caTrendEndpoints.push('caRecallRateTrend');
            break;
          case 'Reappointment Rate':
            caEndpoints.push('caReappointRate');
            caTrendEndpoints.push('caReappointRateTrend');
            break;
        }

        if (!isTrend) {
          for (const api of caEndpoints) {
            this.caFacade.loadNoneTrendApiRequest({
              ...queryParams,
              api,
            });
          }
        } else {
          caTrendEndpoints.forEach(api => {
            const params = {
              clinicId: queryParams.clinicId,
              mode:
                trend === 'current' ? 'c' : trend === 'historic' ? 'h' : 'w',
              queryWhEnabled,
              dentistId: queryParams.dentistId,
            };
            this.caFacade.loadTrendApiRequest({
              ...params,
              api: api,
            });
          });
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
