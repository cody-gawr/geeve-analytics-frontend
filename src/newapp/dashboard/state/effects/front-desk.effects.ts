import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { FrontDeskService } from '../../services/front-desk.service';
import { FrontDeskState } from '../reducers/front-desk.reducer';
import { FrontDeskApiActions, FrontDeskPageActions } from '../actions';

@Injectable()
export class FrontDeskEffects {
  constructor(
    private actions$: Actions,
    private frontDeskService: FrontDeskService,
    private store: Store<FrontDeskState>
  ) {}
  // FdUtilisationRate
  public readonly loadFdUtilisationRate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdUtilisationRate),
      switchMap(params => {
        return this.frontDeskService.fdUtilisationRate(params).pipe(
          map(data =>
            FrontDeskApiActions.fdUtilisationRateSuccess({
              fdUtilisationRateData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FrontDeskApiActions.fdUtilisationRateFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  public readonly loadFdUtilisationRateTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdUtilisationRateTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.frontDeskService
          .fdUtilisationRateTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(res =>
              FrontDeskApiActions.fdUtilisationRateTrendSuccess({
                fdUtilisationRateTrendData: res,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                FrontDeskApiActions.fdUtilisationRateTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });

  public readonly loadFdUtilisationRateByDay$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdUtilisationRateByDay),
      switchMap(params => {
        return this.frontDeskService.fdUtilisationRateByDay(params).pipe(
          map(data =>
            FrontDeskApiActions.fdUtilisationRateByDaySuccess({
              fdUtilisationRateByDayData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FrontDeskApiActions.fdUtilisationRateByDayFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });
  // FdRecallRate
  public readonly loadFdRecallRate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdRecallRate),
      switchMap(params => {
        return this.frontDeskService.fdRecallRate(params).pipe(
          map(data =>
            FrontDeskApiActions.fdRecallRateSuccess({
              fdRecallRateData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FrontDeskApiActions.fdRecallRateFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  public readonly loadFdRecallRateTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdRecallRateTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.frontDeskService
          .fdRecallRateTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(res =>
              FrontDeskApiActions.fdRecallRateTrendSuccess({
                fdRecallRateTrendData: res,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                FrontDeskApiActions.fdRecallRateTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });

  // FdReappointRate
  public readonly loadFdReappointRate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdReappointRate),
      switchMap(params => {
        return this.frontDeskService.fdReappointRate(params).pipe(
          map(data =>
            FrontDeskApiActions.fdReappointRateSuccess({
              fdReappointRateData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FrontDeskApiActions.fdReappointRateFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  public readonly loadFdReappointRateTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdReappointRateTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.frontDeskService
          .fdReappointRateTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(res =>
              FrontDeskApiActions.fdReappointRateTrendSuccess({
                fdReappointRateTrendData: res,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                FrontDeskApiActions.fdReappointRateTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });

  // FdNumTicks
  public readonly loadFdNumTicks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdNumTicks),
      switchMap(params => {
        return this.frontDeskService.fdNumTicks(params).pipe(
          map(data =>
            FrontDeskApiActions.fdNumTicksSuccess({
              fdNumTicksData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FrontDeskApiActions.fdNumTicksFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  public readonly loadFdNumTicksTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdNumTicksTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.frontDeskService
          .fdNumTicksTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(res =>
              FrontDeskApiActions.fdNumTicksTrendSuccess({
                fdNumTicksTrendData: res,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                FrontDeskApiActions.fdNumTicksTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });
  // FdFtaRatio
  public readonly loadFdFtaRatio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdFtaRatio),
      switchMap(params => {
        return this.frontDeskService.fdFtaRatio(params).pipe(
          map(data =>
            FrontDeskApiActions.fdFtaRatioSuccess({
              fdFtaRatioData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FrontDeskApiActions.fdFtaRatioFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  public readonly loadFdFtaRatioTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdFtaRatioTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.frontDeskService
          .fdFtaRatioTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(res =>
              FrontDeskApiActions.fdFtaRatioTrendSuccess({
                fdFtaRatioTrendData: res,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                FrontDeskApiActions.fdFtaRatioTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });
  // FdUtaRatio
  public readonly loadFdUtaRatio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdUtaRatio),
      switchMap(params => {
        return this.frontDeskService.fdUtaRatio(params).pipe(
          map(data =>
            FrontDeskApiActions.fdUtaRatioSuccess({
              fdUtaRatioData: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FrontDeskApiActions.fdUtaRatioFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  public readonly loadFdUtaRatioTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontDeskPageActions.loadFdUtaRatioTrend),
      switchMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.frontDeskService
          .fdUtaRatioTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(res =>
              FrontDeskApiActions.fdUtaRatioTrendSuccess({
                fdUtaRatioTrendData: res,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                FrontDeskApiActions.fdUtaRatioTrendFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
      })
    );
  });
}
