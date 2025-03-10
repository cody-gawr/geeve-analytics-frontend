import { Login } from '../../models/auth';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Observable, map } from 'rxjs';
import {
  AuthApiActions,
  AuthPageActions,
  RolesPageActions,
} from '../state/actions';
import {
  AuthState,
  selectAuthUserData,
  selectError,
  selectIsClinicianUser,
  selectIsLoading,
  selectIsLoadingRolesIndividual,
  selectLogoutError,
  selectLogoutSuccess,
  selectRolesIndividual,
  selectRolesIndividualAndClinics,
  selectSuccess,
} from '../state/reducers/auth.reducer';
import { LoginUser, RolesIndividualApiResponse } from '../../models/user';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { CookieService } from 'ngx-cookie';
import { getTodayMoment } from '@/newapp/shared/utils';

@Injectable()
export class AuthFacade {
  constructor(
    private readonly store: Store<AuthState>,
    private cookieService: CookieService,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade
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

  public readonly authUserData$: Observable<LoginUser> = this.store.pipe(
    select(selectAuthUserData)
  );

  public readonly chartLimitDesc$: Observable<string> = this.store.pipe(
    select(selectAuthUserData),
    map(v => `Results plotted on the graph are limited to ${v.maxChartBars} due to your settings. This can be updated via Settings -> My Account -> Customisations -> Max Chart Bars. Totals beneath the chart still reflect the full amount.`)
  );

  public readonly isLoadingRolesIndividual$ = this.store.pipe(
    select(selectIsLoadingRolesIndividual)
  );

  public readonly rolesIndividual$: Observable<RolesIndividualApiResponse | null> =
    this.store.pipe(select(selectRolesIndividual));

  public readonly isClinicianUser$ = this.store.pipe(
    select(selectIsClinicianUser)
  );

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

  public loginFailed(msg: string = 'unknown') {
    this.store.dispatch(AuthApiActions.loginFailure({ error: msg }));
  }

  public logout() {
    this.clinicFacade.setCurrentSingleClinicId(null);
    this.clinicFacade.setCurrentMultiClinicIDs([]);
    this.layoutFacade.saveDateRange(
      getTodayMoment().startOf('month'),
      getTodayMoment(),
      'm',
      1,
      true
    );
    localStorage.clear();
    this.cookieService.removeAll();
    this.store.dispatch(AuthPageActions.logout());
  }

  public getRolesIndividual() {
    this.store.dispatch(RolesPageActions.getRolesIndividual({}));
  }
}
