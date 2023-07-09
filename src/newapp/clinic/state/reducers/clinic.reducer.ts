import { Clinic } from '../../../models/clinic';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ClinicApiActions, ClinicPageActions } from '../actions';

export interface ClinicState {
  success: boolean;
  isLoading: boolean;
  clinics: Clinic[];
  currentClinicId: number | null;
  error: string | null;
  hasPrimeClinics: 'yes' | 'no';
}

const initialState: ClinicState = {
  success: false,
  isLoading: false,
  currentClinicId: null,
  clinics: [],
  error: null,
  hasPrimeClinics: 'no'
};

export const clinicFeature = createFeature({
  name: 'clinic',
  reducer: createReducer(
    initialState,
    on(
      ClinicPageActions.setCurrentClinicId,
      (state, { clinicId }): ClinicState => {
        return {
          ...state,
          currentClinicId: clinicId
        };
      }
    ),
    on(ClinicPageActions.loadClinics, (state): ClinicState => {
      return {
        ...state,
        success: false,
        error: null,
        isLoading: true,
        clinics: []
      };
    }),
    on(
      ClinicApiActions.loadClinicsSuccess,
      (state, { clinics, hasPrimeClinics }): ClinicState => {
        return {
          ...state,
          success: true,
          isLoading: false,
          clinics,
          hasPrimeClinics
        };
      }
    ),
    on(ClinicApiActions.loadClinicsFailure, (state, { error }): ClinicState => {
      return {
        ...state,
        success: false,
        isLoading: false,
        error
      };
    })
  )
});

export const {
  selectSuccess,
  selectError,
  selectIsLoading,
  selectClinics,
  selectCurrentClinicId,
  selectHasPrimeClinics
} = clinicFeature;

export const selectCurrentClinic = createSelector(
  selectClinics,
  selectCurrentClinicId,
  (clinics, currentClinicId): Clinic | undefined =>
    clinics.find((c) => c.id == currentClinicId)
);
