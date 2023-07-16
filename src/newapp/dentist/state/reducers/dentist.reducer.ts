import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as _ from 'lodash';
import { JeeveError } from '@/newapp/models';
import { Dentist } from '@/newapp/models/dentist';
import { DentistApiActions, DentistPageActions } from '../actions';

export interface DentistState {
  isLoadingData: Array<'dentGet'>;
  dentists: Dentist[] | null;

  errors: Array<JeeveError>;
}

const initialState: DentistState = {
  isLoadingData: [],
  dentists: null,
  errors: []
};

export const dentistFeature = createFeature({
  name: 'dentist',
  reducer: createReducer(
    initialState,
    on(DentistPageActions.loadDentists, (state, {}): DentistState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, (n) => n.api != 'dentGet'),
        dentists: null,
        isLoadingData: _.union(isLoadingData, ['dentGet'])
      };
    }),
    on(
      DentistApiActions.loadDentistsSuccess,
      (state, { dentists }): DentistState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != 'dentGet'),
          dentists: dentists,
          isLoadingData: _.filter(isLoadingData, (n) => n != 'dentGet')
        };
      }
    ),
    on(
      DentistApiActions.loadDentistsFailure,
      (state, { error }): DentistState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          dentists: null,
          isLoadingData: _.filter(isLoadingData, (n) => n != 'dentGet'),
          errors: [...errors, { ...error, api: 'dentGet' }]
        };
      }
    )
  )
});

export const { selectErrors, selectIsLoadingData, selectDentists } =
  dentistFeature;

export const selectDentistsLoading = createSelector(
  selectIsLoadingData,
  (loadingData): boolean => _.findIndex(loadingData, (d) => d === 'dentGet') >= 0
)

export const selectDentistsError = createSelector(
  selectErrors,
  (errors): JeeveError | undefined =>
    _.find(errors, (e) => e.api == 'dentGet')
);
