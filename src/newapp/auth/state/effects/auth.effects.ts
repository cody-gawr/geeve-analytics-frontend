import { AuthService } from '../../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  AuthApiActions,
  AuthPageActions,
  RolesApiActions,
  RolesPageActions
} from '../actions';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  public readonly login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.login),
      mergeMap(({ form }) => {
        return this.authService.login(form).pipe(
          map((res) => res.data.data),
          map((authUserData) => {
            return AuthApiActions.loginSuccess({authUserData});
          }),
          catchError((error: HttpErrorResponse) =>
            of(AuthApiActions.loginFailure({ error: error.message }))
          )
        );
      })
    );
  });

  public readonly logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.logout),
      mergeMap(() => {
        return this.authService.logout().pipe(
          map((res) => {
            this.cookieService.delete('is_logged_in');
            return AuthApiActions.logoutSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(AuthApiActions.logoutFailure({ error: error.message }))
          )
        );
      })
    );
  });

  public readonly getRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RolesPageActions.getRoles),
      mergeMap(() => {
        return this.authService.getRoles().pipe(
          map((res) => {
            return RolesApiActions.getRolesSuccess({ userRoles: res });
          }),
          catchError((error: HttpErrorResponse) =>
            of(RolesApiActions.getRolesFailure({ error: error.error ?? error }))
          )
        );
      })
    );
  });

  public readonly getRolesIndividual$ = createEffect((clinicId?: number) => {
    return this.actions$.pipe(
      ofType(RolesPageActions.getRolesIndividual),
      mergeMap(() => {
        return this.authService.getRolesIndividual(clinicId).pipe(
          map((res) => {
            return RolesApiActions.getRolesIndividualSuccess({
              userRolesIndividual: res
            });
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              RolesApiActions.getRolesIndividualFailure({
                error: error.error ?? error
              })
            )
          )
        );
      })
    );
  });
}
