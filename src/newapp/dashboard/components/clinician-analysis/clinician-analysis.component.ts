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
import { ChartTip } from '@/newapp/models/dashboard/finance';
import { CA_CHART_ID } from '@/newapp/models/dashboard/clinician-analysis';
import { ChartDescParams } from '@/newapp/models/dashboard';

@Component({
  selector: 'clinician-analysis',
  templateUrl: './clinician-analysis.component.html',
  styleUrls: ['./clinician-analysis.component.scss'],
})
export class ClinicianAnalysisComponent implements OnInit, OnDestroy {
  CaChartIDs = CA_CHART_ID;

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
        let tip: ChartTip = null;
        switch (chartName) {
          case 'Production':
            tip = tips[this.CaChartIDs.production];
            break;
          case 'Collection':
            tip = tips[this.CaChartIDs.collection];
            break;
          case 'Collection-Exp':
            tip = tips[this.CaChartIDs.collectionExp];
        }
        if(tip && tip?.info?.toLowerCase() === 'disabled'){
          return null;
        }

        return tip;
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
      this.dashbordFacade.chartTips$
    ]).pipe(
      takeUntil(this.destroy$),
      filter(params => params[0]?.length > 0 && !!params[6]),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      map(([clinics, dateRange, compare, route, dentistId, trend, tips]) => {
        const providerId =
          dentistId !== 'all' && clinics.length == 1 ? dentistId : undefined;
        const startDate = dateRange.start;
        const endDate = dateRange.end;
        const duration = dateRange.duration;
        const queryWhEnabled = route && parseInt(route.wh ?? '-1');
        // const isEachClinicPraktika = clinics.every(c => c.pms === 'praktika');

        let queryParams: ChartDescParams<CA_API_ALL_ENDPOINTS> = {
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

        return { queryParams, trend, queryWhEnabled, tips };
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
        ({ queryParams, trend, queryWhEnabled }) => {
          const { dentistId: providerId } = queryParams;
          const isTrend = trend !== 'off' && providerId;

          if (!isTrend) {
            const caEndpoints = ['caNumNewPatients', 'caNumComplaints', 'caTotalDiscounts'];

            caEndpoints.push('caTxPlanCompRate');

            for (const api of caEndpoints) {
              this.caFacade.loadChartDescription(
                <CA_API_ENDPOINTS>api,
                queryParams,
              );
            }
          } else {
            const endpoints = [];
            endpoints.push('caNumNewPatientsTrend', 'caNumComplaintsTrend', 'caTotalDiscountsTrend');

            endpoints.push('caTxPlanCompRateTrend');
            endpoints.forEach(api => {
              const params = {
                clinicId: queryParams.clinicId,
                mode:
                  trend === 'current' ? 'c' : trend === 'historic' ? 'h' : 'w',
                queryWhEnabled,
                dentistId: queryParams.dentistId,
              };
              this.caFacade.loadChartDescription(
                api,
                params);
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


          for (const api of caEndpoints) {
            this.caFacade.loadChartDescription(
              api,
              queryParams
            );
          }

          caTrendEndpoints.forEach(api => {
            const params = {
              clinicId: queryParams.clinicId,
              mode:
                trend === 'current' ? 'c' : trend === 'historic' ? 'h' : 'w',
              queryWhEnabled,
              dentistId: queryParams.dentistId,
            };
            this.caFacade.loadChartDescription(
              api,
              params);
          });
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
              this.caFacade.loadChartDescription(api, queryParams);
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
              this.caFacade.loadChartDescription(api, params);
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
          { queryParams, trend, queryWhEnabled },
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
              this.caFacade.loadChartDescription(api, queryParams);
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
              this.caFacade.loadChartDescription(api, params);
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
            this.caFacade.loadChartDescription(api, queryParams);
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
            this.caFacade.loadChartDescription(api, params);
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get txPlanAvgTooltip$() {
    return combineLatest([
      this.caFacade.txPlanAvgFeeChartName$,
      this.dashbordFacade.chartTips$,
    ]).pipe(
      map(([chartName, tipData]) => {
        tipData = tipData ?? [];
        let tip: ChartTip;
        if (chartName == 'Avg. Completed Fees') {
          tip = tipData[this.CaChartIDs.txPlanAvgCompleteFees];
        } else {
          tip = tipData[this.CaChartIDs.txPlanAvgProposedFees];
        }
        if(tip && tip?.info?.toLowerCase() === 'disabled'){
          return null;
        }
        return tip;
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
        let tip: ChartTip;
        if (chartName == 'Recall Prebook Rate') {
          tip = tipData[4];
        } else {
          tip = tipData[5];
        }
        if(tip && tip?.info?.toLowerCase() === 'disabled'){
          return null;
        }
        return tip;
      })
    );
  }

  getChartTip$(tipNum: number) {
    return this.dashbordFacade.getChartTip$(tipNum);
  }
}
