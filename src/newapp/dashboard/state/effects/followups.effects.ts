import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { FollowupsActions } from '../actions';
import { FollowupsService } from '../../services/followups.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class FollowupsEffects {
  constructor(
    private actions$: Actions,
    private fuService: FollowupsService
  ) {}

  // fuGetConversion
  public readonly loadFuGetConversion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FollowupsActions.loadFuGetConversion),
      switchMap(({ params }) => {
        const api: FU_API_ENDPOINTS = 'fuGetConversion';
        return this.fuService.fuApiRequest(api, params).pipe(
          map(data =>
            FollowupsActions.loadFuApiRequestSuccess({
              api,
              resBody: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FollowupsActions.loadFuApiRequestFailure({
                api,
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  // fuGetConversionPerUser
  public readonly loadFuGetConversionPerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FollowupsActions.loadFuGetConversionPerUser),
      switchMap(({ params }) => {
        const api: FU_API_ENDPOINTS = 'fuGetConversionPerUser';
        return this.fuService.fuApiRequest(api, params).pipe(
          map(data =>
            FollowupsActions.loadFuApiRequestSuccess({
              api,
              resBody: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FollowupsActions.loadFuApiRequestFailure({
                api,
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  // fuGetFollowupCompletion
  public readonly loadFuGetFollowupCompletion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FollowupsActions.loadFuGetFollowupCompletion),
      switchMap(({ params }) => {
        const api: FU_API_ENDPOINTS = 'fuGetFollowupCompletion';
        return this.fuService.fuApiRequest(api, params).pipe(
          map(data =>
            FollowupsActions.loadFuApiRequestSuccess({
              api,
              resBody: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FollowupsActions.loadFuApiRequestFailure({
                api,
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  // fuGetOutcome
  public readonly loadFuGetOutcome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FollowupsActions.loadFuGetOutcome),
      switchMap(({ params }) => {
        const api: FU_API_ENDPOINTS = 'fuGetOutcome';
        return this.fuService.fuApiRequest(api, params).pipe(
          map(data =>
            FollowupsActions.loadFuApiRequestSuccess({
              api,
              resBody: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FollowupsActions.loadFuApiRequestFailure({
                api,
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  // fuGetPerUser
  public readonly loadFuGetPerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FollowupsActions.loadFuGetPerUser),
      switchMap(({ params }) => {
        const api: FU_API_ENDPOINTS = 'fuGetPerUser';
        return this.fuService.fuApiRequest(api, params).pipe(
          map(data =>
            FollowupsActions.loadFuApiRequestSuccess({
              api,
              resBody: data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FollowupsActions.loadFuApiRequestFailure({
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
