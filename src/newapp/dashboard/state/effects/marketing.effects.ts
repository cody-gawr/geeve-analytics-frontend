import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of, groupBy, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  MarketingState,
} from '../reducers/marketing.reducer';
import { MarketingApiActions, MarketingPageActions } from '../actions';
import { MarketingService } from '../../services/marketing.service';
import { ChartDescParams } from '@/newapp/models/dashboard/marketing';

@Injectable()
export class MarketingEffects {
  constructor(
    private actions$: Actions,
    private marketingService: MarketingService,
    private store: Store<MarketingState>
  ) {}

  public readonly loadMkNewPatientsByReferral$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkNewPatientsByReferral),
      switchMap(
        ({ clinicId, startDate, endDate, duration, queryWhEnabled }) => {
          return this.marketingService
            .mkNewPatientsByReferral(
              clinicId,
              startDate,
              endDate,
              duration,
              queryWhEnabled
            )
            .pipe(
              map(data =>
                MarketingApiActions.mkNewPatientsByReferralSuccess({
                  newPatientsByReferralData: data,
                })
              ),
              catchError((error: HttpErrorResponse) =>
                of(
                  MarketingApiActions.mkNewPatientsByReferralFailure({
                    error: error.error ?? error,
                  })
                )
              )
            );
        }
      )
    );
  });

  public readonly loadMkNewPatientsByReferralTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkNewPatientsByReferralTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.marketingService
          .mkNewPatientsByReferralTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(data =>
              MarketingApiActions.mkNewPatientsByReferralTrendSuccess({
                newPatientsByReferralTrendData: data,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                MarketingApiActions.mkNewPatientsByReferralTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });

  public readonly loadMkRevenueByReferral$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkRevenueByReferral),
      switchMap(
        ({ clinicId, startDate, endDate, duration, queryWhEnabled }) => {
          return this.marketingService
            .mkRevByReferral(
              clinicId,
              startDate,
              endDate,
              duration,
              queryWhEnabled
            )
            .pipe(
              map(data =>
                MarketingApiActions.mkRevenueByReferralSuccess({
                  revenueByReferralData: data,
                })
              ),
              catchError((error: HttpErrorResponse) =>
                of(
                  MarketingApiActions.mkRevenueByReferralFailure({
                    error: error.error ?? error,
                  })
                )
              )
            );
        }
      )
    );
  });

  public readonly loadMkRevenueByReferralTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkRevByReferralTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.marketingService
          .mkRevByReferralTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(data =>
              MarketingApiActions.mkRevByReferralTrendSuccess({
                revenueByReferralTrendData: data,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                MarketingApiActions.mkRevByReferralTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });

  public readonly loadMkNumNewPatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkNumNewPatients),
      switchMap(
        ({ clinicId, startDate, endDate, duration, queryWhEnabled }) => {
          return this.marketingService
            .mkNumNewPatients(
              clinicId,
              startDate,
              endDate,
              duration,
              queryWhEnabled
            )
            .pipe(
              map(data =>
                MarketingApiActions.mkNumNewPatientsSuccess({
                  newPatientsRatioData: data,
                })
              ),
              catchError((error: HttpErrorResponse) =>
                of(
                  MarketingApiActions.mkNumNewPatientsFailure({
                    error: error.error ?? error,
                  })
                )
              )
            );
        }
      )
    );
  });

  public readonly loadMkActivePatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkActivePatients),
      switchMap(
        ({ clinicId, startDate, endDate, duration, queryWhEnabled }) => {
          return this.marketingService
            .mkActivePatients(
              clinicId,
              startDate,
              endDate,
              duration,
              queryWhEnabled
            )
            .pipe(
              map(data =>
                MarketingApiActions.mkActivePatientsSuccess({
                  activePatientsData: data,
                })
              ),
              catchError((error: HttpErrorResponse) =>
                of(
                  MarketingApiActions.mkActivePatientsFailure({
                    error: error.error ?? error,
                  })
                )
              )
            );
        }
      )
    );
  });

  public readonly loadMkActivePatientsTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkActivePatientsTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.marketingService
          .mkActivePatientsTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(data =>
              MarketingApiActions.mkActivePatientsTrendSuccess({
                activePatientsTrendData: data,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                MarketingApiActions.mkActivePatientsTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });

  public readonly loadMkNumNewPatientsTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkNumNewPatientsTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.marketingService
          .mkNumNewPatientsTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(data =>
              MarketingApiActions.mkNumNewPatientsTrendSuccess({
                numNewPatientsTrendData: data,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                MarketingApiActions.mkNumNewPatientsTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });

  public readonly loadMkNewPatientAcq$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkNewPatientAcq),
      switchMap(
        ({
          clinicId,
          startDate,
          endDate,
          duration,
          connectedWith,
          queryWhEnabled,
        }) => {
          return this.marketingService
            .mkNewPatientAcq(
              clinicId,
              startDate,
              endDate,
              duration,
              connectedWith,
              queryWhEnabled
            )
            .pipe(
              map(data =>
                MarketingApiActions.mkNewPatientAcqSuccess({
                  newPatientAcqdata: data,
                })
              ),
              catchError((error: HttpErrorResponse) =>
                of(
                  MarketingApiActions.mkNewPatientAcqFailure({
                    error: error.error ?? error,
                  })
                )
              )
            );
        }
      )
    );
  });

  public readonly loadMkNewPatientAcqTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkNewPatientAcqTrend),
      switchMap(({ clinicId, mode, connectedWith, queryWhEnabled }) => {
        return this.marketingService
          .mkNewPatientAcqTrend(clinicId, mode, connectedWith, queryWhEnabled)
          .pipe(
            map(data =>
              MarketingApiActions.mkNewPatientAcqTrendSuccess({
                newPatientAcqTrenddata: data,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                MarketingApiActions.mkNewPatientAcqTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });

  public readonly loadMkTotalVisits$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkTotalVisits),
      switchMap(
        ({ clinicId, startDate, endDate, duration, queryWhEnabled }) => {
          return this.marketingService
            .mkTotalVisits(
              clinicId,
              startDate,
              endDate,
              duration,
              queryWhEnabled
            )
            .pipe(
              map(data =>
                MarketingApiActions.mkTotalVisitsSuccess({
                  mkTotalVisitsData: data,
                })
              ),
              catchError((error: HttpErrorResponse) =>
                of(
                  MarketingApiActions.mkTotalVisitsFailure({
                    error: error.error ?? error,
                  })
                )
              )
            );
        }
      )
    );
  });

  public readonly loadMkTotalVisitsTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkTotalVisitsTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.marketingService
          .mkTotalVisitsTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(data =>
              MarketingApiActions.mkTotalVisitsTrendSuccess({
                mkTotalVisitsTrendData: data,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                MarketingApiActions.mkTotalVisitsTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });

  public readonly loadMkXeroAccounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkGetXeroAccounts),
      switchMap(({ clinicId, userId }) => {
        return this.marketingService.mkGetXeroAcct(clinicId, userId).pipe(
          map(data =>
            MarketingApiActions.mkGetXeroAcctSuccess({
              xeroAccounts: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              MarketingApiActions.mkGetXeroAcctFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  public readonly loadMkMyobAccounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkGetMyobAccounts),
      switchMap(({ clinicId, userId }) => {
        return this.marketingService.mkGetMyobAcct(clinicId, userId).pipe(
          map(data =>
            MarketingApiActions.mkGetMyobAcctSuccess({
              myobAccounts: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              MarketingApiActions.mkGetMyobAcctFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  public readonly saveMkMyobAccounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.saveAcctMyob),
      switchMap(({ clinicId, categories }) => {
        return this.marketingService.mkSaveAcctMyob(clinicId, categories).pipe(
          map(data => MarketingApiActions.mkSaveAcctMyobSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              MarketingApiActions.mkSaveAcctMyobFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  public readonly saveMkXeroAccounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.saveAcctXero),
      switchMap(({ clinicId, categories }) => {
        return this.marketingService.mkSaveAcctXero(clinicId, categories).pipe(
          map(data => MarketingApiActions.mkSaveAcctXeroSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              MarketingApiActions.mkSaveAcctXeroFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  public readonly loadMkChartDescription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketingPageActions.loadMkChartDescription),
      groupBy((action) => action.chartDescription), // Group actions by `chart description`
      mergeMap((grouped$) =>
        grouped$.pipe(
          switchMap((params: ChartDescParams) => {
            return this.marketingService
              .mkChartDescriptionCall<any>(
                params
              )
              .pipe(
                map(data =>
                  MarketingApiActions.mkChartDescriptionSuccess({
                    chartDesc: params.chartDescription,
                    mkChartDescData: data,
                  })
                ),
                catchError((error: HttpErrorResponse) =>
                  of(
                    MarketingApiActions.mkChartDescriptionFailure({
                      chartDesc: params.chartDescription,
                      error: error.error ?? error,
                    })
                  )
                )
              );
            }
          )
        )
      )
    );
  });
}
