import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ClinicianAnalysisService } from '../../services/clinician-analysis.service';
import { ClinicianAnalysisState } from '../reducers/clinician-analysis.reducer';
import { ClinicianAnalysisActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ClinicianAnalysisEffects {
  constructor(
    private actions$: Actions,
    private caService: ClinicianAnalysisService,
    private store: Store<ClinicianAnalysisState>
  ) {}
  // None Trend
  public readonly loadNoneTrendApiRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicianAnalysisActions.loadNoneTrendApiRequest),
      mergeMap(({ api, params }) => {
        return this.caService.caNoneTrendApiRequest(api, params).pipe(
          map(data =>
            ClinicianAnalysisActions.loadCaNoneTrendApiRequestSuccess({
              api,
              resBody: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              ClinicianAnalysisActions.loadCaNoneTrendApiRequestFailure({
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
      ofType(ClinicianAnalysisActions.loadTrendApiRequest),
      mergeMap(({ api, params }) => {
        return this.caService.caTrendApiRequest(api, params).pipe(
          map(data =>
            ClinicianAnalysisActions.loadCaTrendApiRequestSuccess({
              api,
              resBody: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              ClinicianAnalysisActions.loadCaTrendApiRequestFailure({
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
