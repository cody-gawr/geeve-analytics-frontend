import { Clinic } from '../../../models/clinic';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ClinicApiActions, ClinicPageActions } from '../actions';

export interface ClinicState {
  success: boolean;
  isLoading: boolean;
  clinics: Clinic[];
  currentClinicId: string | number | null;
  error: string | null;
  hasPrimeClinics: 'yes' | 'no';
}

const initialState: ClinicState = {
  success: false,
  isLoading: false,
  currentClinicId: null,
  clinics: [],
  error: null,
  hasPrimeClinics: 'no',
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
    on(
      ClinicPageActions.setCurrentMultiClinicIDs,
      (state, { clinicIDs, isPrevAll }): ClinicState => {
        if(clinicIDs.length == state.clinics.length && 
          !clinicIDs.includes('all') && 
          isPrevAll)
        {
          return {
            ...state,
            currentClinicId: null
          }
        }else 
        if(clinicIDs.length > 0 && clinicIDs.includes('all') && !isPrevAll){
          return {
            ...state,
            currentClinicId: state.clinics.map(c => c.id).join(',')
          }
        }else{
          const selectedClinicIDs = <number[]>clinicIDs.filter(c => c !='all');
          return {
            ...state,
            currentClinicId: selectedClinicIDs.length > 0?(selectedClinicIDs.length == 1?selectedClinicIDs[0]:selectedClinicIDs.join(',')):null
          };
        }
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
          hasPrimeClinics,
          ...(clinics.length > 0 && state.currentClinicId == null?{currentClinicId: clinics[0].id}:{})
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
  selectHasPrimeClinics,
} = clinicFeature;

export const selectCurrentClinic = createSelector(
  selectClinics,
  selectCurrentClinicId,
  (clinics, currentClinicId): Clinic | undefined =>
    clinics.find((c) => c.id == currentClinicId)
);

export const selectCurrentMultiClinicIDs = createSelector(
  selectCurrentClinicId,
  (currentClinicId) => {
    if(typeof currentClinicId === 'string'){
      return currentClinicId.split(',').map(v => parseInt(v));
    }else if(currentClinicId != null){
      return [currentClinicId];
    }else{
      return [];
    }
  }
)