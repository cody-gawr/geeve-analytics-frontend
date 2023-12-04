import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  of,
  withLatestFrom,
  filter,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { ClinicianProcedureService } from '../../services/clinician-procedure.service';
import {
  ClinicianProcedureState,
  selectIsLoadingCpPredictorAnalysis,
  selectIsLoadingCpPredictorRatio,
  selectIsLoadingCpPredictorSpecialistAnalysis,
  selectIsLoadingCpReferrals,
  selectIsLoadingCpRevPerProcedure,
} from '../reducers/clinician-procedure.reducer';
import {
  ClinicianProcedurePageActions,
  ClinicianProcedureApiActions,
} from '../actions';

@Injectable()
export class ClinicianProcedureEffects {
  constructor(
    private actions$: Actions,
    private clinicianProcedureService: ClinicianProcedureService,
    private store: Store<ClinicianProcedureState>
  ) {}
  // cpPredictorAnalysis
  public readonly loadCpPredictorAnalysis$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicianProcedurePageActions.loadCpPredictorAnalysis),
      withLatestFrom(this.store.select(selectIsLoadingCpPredictorAnalysis)),
      filter(([action, isLoading]) => isLoading),
      switchMap(([params]) => {
        return this.clinicianProcedureService.cpPredictorAnalysis(params).pipe(
          map(data =>
            ClinicianProcedureApiActions.loadCpPredictorAnalysisSuccess({
              cpPredictorAnalysisData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              ClinicianProcedureApiActions.loadCpPredictorAnalysisFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });
  // cpPredictorSpecialistAnalysis
  public readonly loadCpPredictorSpecialistAnalysis$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicianProcedurePageActions.loadCpPredictorSpecialistAnalysis),
      withLatestFrom(
        this.store.select(selectIsLoadingCpPredictorSpecialistAnalysis)
      ),
      filter(([action, isLoading]) => isLoading),
      switchMap(([params]) => {
        return this.clinicianProcedureService
          .cpPredictorSpecialistAnalysis(params)
          .pipe(
            map(data =>
              ClinicianProcedureApiActions.loadCpPredictorSpecialistAnalysisSuccess(
                { cpPredictorSpecialistAnalysisData: data }
              )
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                ClinicianProcedureApiActions.loadCpPredictorSpecialistAnalysisFailure(
                  {
                    error: error.error ?? error,
                  }
                )
              )
            )
          );
      })
    );
  });
  // cpRevPerProcedure
  public readonly loadCpRevPerProcedure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicianProcedurePageActions.loadCpRevPerProcedure),
      withLatestFrom(this.store.select(selectIsLoadingCpRevPerProcedure)),
      filter(([action, isLoading]) => isLoading),
      switchMap(([params]) => {
        return this.clinicianProcedureService.cpRevPerProcedure(params).pipe(
          map(data =>
            ClinicianProcedureApiActions.loadCpRevPerProcedureSuccess({
              cpRevPerProcedureData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              ClinicianProcedureApiActions.loadCpRevPerProcedureFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });
  // cpPredictorRatio
  public readonly loadCpPredictorRatio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicianProcedurePageActions.loadCpPredictorRatio),
      withLatestFrom(this.store.select(selectIsLoadingCpPredictorRatio)),
      filter(([action, isLoading]) => isLoading),
      switchMap(([params]) => {
        return this.clinicianProcedureService.cpPredictorRatio(params).pipe(
          map(data =>
            ClinicianProcedureApiActions.loadCpPredictorRatioSuccess({
              cpPredictorRatioData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              ClinicianProcedureApiActions.loadCpPredictorRatioFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });
  // cpReferrals
  public readonly loadCpPreferrals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicianProcedurePageActions.loadCpReferrals),
      withLatestFrom(this.store.select(selectIsLoadingCpReferrals)),
      filter(([action, isLoading]) => isLoading),
      switchMap(([params]) => {
        return this.clinicianProcedureService.cpReferrals(params).pipe(
          map(data =>
            ClinicianProcedureApiActions.loadCpReferralsSuccess({
              cpReferralsData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              ClinicianProcedureApiActions.loadCpReferralsFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  // None Trend
  public readonly loadNoneTrendApiRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicianProcedurePageActions.loadNoneTrendApiRequest),
      tap(({ api }) => console.log(api)),
      mergeMap(({ api, params }) => {
        return this.clinicianProcedureService
          .cpNoneTrendApiRequest(api, params)
          .pipe(
            map(data =>
              ClinicianProcedurePageActions.loadCpNoneTrendApiRequestSuccess({
                api,
                resBody: data,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                ClinicianProcedurePageActions.loadCpNoneTrendApiRequestFailure({
                  api,
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });

  // Trend
  public readonly loadTrendApiRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicianProcedurePageActions.loadTrendApiRequest),
      mergeMap(({ api, params }) => {
        return this.clinicianProcedureService
          .cpTrendApiRequest(api, params)
          .pipe(
            map(data =>
              ClinicianProcedurePageActions.loadCpTrendApiRequestSuccess({
                api,
                resBody: data,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                ClinicianProcedurePageActions.loadCpTrendApiRequestFailure({
                  api,
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });
}
