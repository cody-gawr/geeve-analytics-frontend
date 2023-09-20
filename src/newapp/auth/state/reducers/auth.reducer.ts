/* NgRx */
import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import {
  AuthApiActions,
  AuthPageActions,
  RolesApiActions,
  RolesPageActions,
} from '../actions';
import {
  RolesIndividualApiResponse,
  RolesApiResponse,
  LoginUser,
} from '../../../models/user';
import _ from 'lodash';
import { selectHasPrimeClinics } from '../../../clinic/state/reducers/clinic.reducer';
import { JeeveError } from '@/newapp/models';

export interface AuthState {
  success: boolean;
  error: string | null;
  isLoadingData: Array<'rolesGet' | 'rolesIndividual'>;
  errors: Array<JeeveError>;
  isLoading: boolean;
  logoutSuccess: boolean;
  logoutError: string | null;
  rolesIndividual: RolesIndividualApiResponse | null;
  roles: RolesApiResponse | null;
  authUserData: LoginUser | null;
}

const initialState: AuthState = {
  success: false,
  error: null,
  isLoading: false,
  isLoadingData: [],
  errors: [],
  logoutSuccess: false,
  logoutError: null,
  rolesIndividual: null,
  roles: null,
  authUserData: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthPageActions.login, (state): AuthState => {
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };
    }),

    on(AuthApiActions.loginSuccess, (state, { authUserData }): AuthState => {
      return {
        ...state,
        success: true,
        logoutSuccess: false,
        isLoading: false,
        authUserData,
      };
    }),
    on(AuthApiActions.loginFailure, (state, { error }): AuthState => {
      return {
        ...state,
        success: false,
        error,
        isLoading: false,
        authUserData: null,
      };
    }),
    on(AuthApiActions.logoutSuccess, (state): AuthState => {
      return {
        ...state,
        logoutSuccess: true,
      };
    }),
    on(AuthApiActions.logoutFailure, (state, { error }): AuthState => {
      return {
        ...state,
        logoutSuccess: false,
        logoutError: error,
      };
    }),
    on(RolesPageActions.getRoles, (state): AuthState => {
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != 'rolesGet'),
        isLoadingData: _.union(state.isLoadingData, ['rolesGet']),
        roles: null,
      };
    }),
    on(RolesApiActions.getRolesSuccess, (state, { userRoles }): AuthState => {
      return {
        ...state,
        roles: userRoles,
        errors: _.filter(state.errors, n => n.api != 'rolesGet'),
        isLoadingData: _.filter(state.isLoadingData, n => n != 'rolesGet'),
      };
    }),
    on(RolesApiActions.getRolesFailure, (state, { error }): AuthState => {
      return {
        ...state,
        roles: null,
        isLoadingData: _.filter(state.isLoadingData, n => n != 'rolesGet'),
        errors: [...state.errors, { ...error, api: 'rolesGet' }],
      };
    }),
    on(RolesPageActions.getRolesIndividual, (state): AuthState => {
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != 'rolesIndividual'),
        isLoadingData: _.union(state.isLoadingData, ['rolesIndividual']),
        rolesIndividual: null,
      };
    }),
    on(
      RolesApiActions.getRolesIndividualSuccess,
      (state, { userRolesIndividual }): AuthState => {
        return {
          ...state,
          rolesIndividual: userRolesIndividual,
          errors: _.filter(state.errors, n => n.api != 'rolesIndividual'),
          isLoadingData: _.filter(
            state.isLoadingData,
            n => n != 'rolesIndividual'
          ),
        };
      }
    ),
    on(
      RolesApiActions.getRolesIndividualFailure,
      (state, { error }): AuthState => {
        return {
          ...state,
          rolesIndividual: null,
          isLoadingData: _.filter(
            state.isLoadingData,
            n => n != 'rolesIndividual'
          ),
          errors: [...state.errors, { ...error, api: 'rolesIndividual' }],
        };
      }
    )
  ),
});

export const {
  selectSuccess,
  selectError,
  selectIsLoading,
  selectLogoutSuccess,
  selectLogoutError,
  selectRoles,
  selectRolesIndividual,
  selectAuthUserData,
  selectIsLoadingData,
} = authFeature;

export const selectIsLoadingRolesIndividual = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'rolesIndividual') >= 0
);

export const selectRolesIndividualPermissions = createSelector(
  selectRolesIndividual,
  (userRolesIndividual): string[] => userRolesIndividual?.data ?? []
);

export const selectRolesIndividualAndClinics = createSelector(
  selectRolesIndividual,
  selectHasPrimeClinics,
  (rolesIndividual, hasPrimeClinics) => {
    return { ...(rolesIndividual ?? {}), hasPrimeClinics };
  }
);
