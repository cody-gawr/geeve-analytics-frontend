import { Login } from '../../models/auth';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { AuthApiActions, AuthPageActions, RolesPageActions } from '../state/actions';
import {
  AuthState,
  selectAuthUserInfo,
  selectError,
  selectIsLoading,
  selectLogoutError,
  selectLogoutSuccess,
  selectRolesIndividual,
  selectRolesIndividualAndClinics,
  selectSuccess
} from '../state/reducers/auth.reducer';
import { LoginUser, RolesIndividualApiResponse } from '../../models/user';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class AuthFacade {
  constructor(
    private readonly store: Store<AuthState>,
    private localStorage: LocalStorageService
  ) {}

  public readonly success$: Observable<boolean> = this.store.pipe(
    select(selectSuccess)
  );

  public readonly logoutSuccess$: Observable<boolean> = this.store.pipe(
    select(selectLogoutSuccess)
  );

  public readonly isLoading$: Observable<boolean> = this.store.pipe(
    select(selectIsLoading)
  );

  public readonly error$: Observable<string> = this.store.pipe(
    select(selectError),
    filter(Boolean)
  );

  public readonly authUserInfo$: Observable<LoginUser> = this.store.pipe(
    select(selectAuthUserInfo)
  );

  public readonly rolesIndividual$: Observable<RolesIndividualApiResponse | null> =
    this.store.pipe(select(selectRolesIndividual));

  public readonly rolesIndividualAndClinics$ = this.store.pipe(
    select(selectRolesIndividualAndClinics)
  );

  public readonly logoutError$: Observable<string> = this.store.pipe(
    select(selectLogoutError),
    filter(Boolean)
  );

  public login(form: Login) {
    this.store.dispatch(AuthPageActions.login({ form }));
  }

  public loginFailed(msg: string = 'unknown'){
    this.store.dispatch(
      AuthApiActions.loginFailure({ error: msg })
    );
  }

  public logout() {
    this.store.dispatch(AuthPageActions.logout());
  }

  public getRolesIndividual() {
    this.store.dispatch(RolesPageActions.getRolesIndividual({}));
  }

  public getAuthUserData(): LoginUser {
    return camelcaseKeys(JSON.parse(this.localStorage.getData('authUserData') ?? ''), {deep: true});
  }
}
