import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import _ from 'lodash';
import { JeeveError } from '@/newapp/models';
import { Dentist } from '@/newapp/models/dentist';
import { DentistApiActions, DentistPageActions } from '../actions';
import { selectCurrentClinics } from '@/newapp/clinic/state/reducers/clinic.reducer';

export interface DentistState {
  isLoadingData: Array<'dentGet' | 'userGetChildDentist'>;
  dentists: Dentist[] | null; // All dentists
  dentistId: number;
  currentDentistId: 'all' | number; // Selected one
  errors: Array<JeeveError>;
}

const initialState: DentistState = {
  isLoadingData: [],
  currentDentistId: 'all',
  dentists: null,
  dentistId: null,
  errors: [],
};

export const dentistFeature = createFeature({
  name: 'dentist',
  reducer: createReducer(
    initialState,
    on(DentistPageActions.loadDentists, (state, {}): DentistState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'dentGet'),
        dentists: null,
        isLoadingData: _.union(isLoadingData, ['dentGet']),
      };
    }),
    on(DentistApiActions.loadDentistsSuccess, (state, { dentists }): DentistState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'dentGet'),
        dentists: dentists,
        currentDentistId: 'all',
        isLoadingData: _.filter(isLoadingData, n => n != 'dentGet'),
      };
    }),
    on(DentistApiActions.loadDentistsFailure, (state, { error }): DentistState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        dentists: null,
        isLoadingData: _.filter(isLoadingData, n => n != 'dentGet'),
        errors: [...errors, { ...error, api: 'dentGet' }],
      };
    }),

    on(DentistPageActions.loadSpecificDentist, (state, {}): DentistState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'userGetChildDentist'),
        dentistId: null,
        isLoadingData: _.union(isLoadingData, ['userGetChildDentist']),
      };
    }),
    on(DentistApiActions.loadSpecificDentistSuccess, (state, { dentistId }): DentistState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'userGetChildDentist'),
        dentistId,
        isLoadingData: _.filter(isLoadingData, n => n != 'userGetChildDentist'),
      };
    }),
    on(DentistApiActions.loadSpecificDentistFailure, (state, { error }): DentistState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        dentistId: null,
        isLoadingData: _.filter(isLoadingData, n => n != 'userGetChildDentist'),
        errors: [...errors, { ...error, api: 'userGetChildDentist' }],
      };
    }),
    on(DentistPageActions.setCurrentDentistId, (state, { dentistId }): DentistState => {
      return {
        ...state,
        currentDentistId: dentistId,
      };
    }),
  ),
});

export const {
  selectErrors,
  selectIsLoadingData,
  selectDentists,
  selectCurrentDentistId,
  selectDentistId,
} = dentistFeature;

export const selectDentistsLoading = createSelector(
  selectIsLoadingData,
  (loadingData): boolean => _.findIndex(loadingData, d => d === 'dentGet') >= 0,
);

export const selectDentistsError = createSelector(selectErrors, (errors): JeeveError | undefined =>
  _.find(errors, e => e.api == 'dentGet'),
);

export const selectIsDentistMode = createSelector(
  selectCurrentDentistId,
  selectCurrentClinics,
  (dentistId, clinics) => {
    return !(dentistId === 'all' || clinics.length > 1);
  },
);
