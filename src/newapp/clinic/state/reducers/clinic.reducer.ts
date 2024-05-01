import { Clinic } from '../../../models/clinic';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ClinicApiActions, ClinicPageActions } from '../actions';

export interface ClinicState {
  success: boolean;
  isLoading: boolean;
  clinics: Clinic[]; // All clinics
  currentSingleClinicId: 'all' | number | null; // For signle selection
  currentMultiClinicIds: number[];
  error: string | null;
  hasPrimeClinics: 'yes' | 'no';
  isMultiSelection: boolean;
}

const initialState: ClinicState = {
  success: false,
  isLoading: false,
  currentSingleClinicId: null,
  currentMultiClinicIds: [],
  clinics: [],
  error: null,
  hasPrimeClinics: 'no',
  isMultiSelection: null,
};

export const clinicFeature = createFeature({
  name: 'clinic',
  reducer: createReducer(
    initialState,
    on(
      ClinicPageActions.setCurrentSingleClinicId,
      (state, { clinicId }): ClinicState => {
        if (clinicId === 'all') {
          return {
            ...state,
            currentSingleClinicId: clinicId,
            currentMultiClinicIds: state.clinics.slice().map(v => v.id),
          };
        } else {
          return {
            ...state,
            currentSingleClinicId: clinicId,
            currentMultiClinicIds: [clinicId],
          };
        }
      }
    ),
    on(
      ClinicPageActions.setCurrentMultiClinicIDs,
      (state, { clinicIDs }): ClinicState => {
        if (clinicIDs.length === 1) {
          return {
            ...state,
            currentMultiClinicIds: clinicIDs,
            currentSingleClinicId: clinicIDs[0],
          };
        } else {
          return {
            ...state,
            currentMultiClinicIds: clinicIDs,
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
        clinics: [],
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
          ...(clinics.length > 0 && state.currentSingleClinicId == null
            ? { currentSingleClinicId: clinics[0].id }
            : {}),
          ...(clinics.length > 0 &&
          (state.currentMultiClinicIds == null ||
            state.currentMultiClinicIds.length == 0)
            ? { currentMultiClinicIds: [clinics[0].id] }
            : {}),
        };
      }
    ),
    on(ClinicApiActions.loadClinicsFailure, (state, { error }): ClinicState => {
      return {
        ...state,
        success: false,
        isLoading: false,
        error,
      };
    }),
    on(
      ClinicPageActions.setMultiClinicSelection,
      (state, { value }): ClinicState => {
        return {
          ...state,
          isMultiSelection: value,
        };
      }
    )
  ),
});

export const {
  selectSuccess,
  selectError,
  selectIsLoading,
  selectClinics,
  selectCurrentSingleClinicId,
  selectCurrentMultiClinicIds,
  selectHasPrimeClinics,
  selectIsMultiSelection,
} = clinicFeature;

export const selectCurrentClinics = createSelector(
  selectIsMultiSelection,
  selectCurrentSingleClinicId,
  selectCurrentMultiClinicIds,
  selectClinics,
  (isMulti, singleId, multiIds, clinics) => {
    if (isMulti == null) return clinics?.length > 0 ? [clinics[0]] : [];
    if (isMulti) {
      return clinics.filter(c => multiIds && multiIds.includes(c.id));
    } else {
      return singleId === 'all'
        ? clinics
        : clinics.filter(c => c.id == <number>singleId);
    }
  }
);

export const selectIsMultiClinicsSelected = createSelector(
  selectCurrentClinics,
  clinics => clinics.length > 1
);

export const selectCurrentClinicId = createSelector(
  selectCurrentClinics,
  clinics => {
    return clinics.length > 0
      ? clinics.length > 1
        ? clinics.map(c => c.id).join(',')
        : clinics[0].id
      : null;
  }
);

export const selectIsEachClinicExact = createSelector(
  selectCurrentClinics,
  clinics => {
    return clinics.every(c => c.pms == 'exact');
  }
);

export const selectIsEachClinicCore = createSelector(
  selectCurrentClinics,
  clinics => {
    return clinics.every(c => c.pms == 'core');
  }
);

export const selectIsEachClinicD4w = createSelector(
  selectCurrentClinics,
  clinics => {
    return clinics.every(c => c.pms == 'd4w');
  }
);

export const selectIsAnyClinicHasD4w = createSelector(
  selectCurrentClinics,
  clinics => {
    return clinics.some(c => c.pms == 'd4w');
  }
);

export const selectIsEachClinicPraktika = createSelector(
  selectCurrentClinics,
  clinics => {
    return clinics.every(c => c.pms == 'praktika');
  }
);
