import { Clinic } from "../../../models/clinic";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { ClinicApiActions, ClinicPageActions } from "../actions";

export interface ClinicState {
  success: boolean;
  isLoading: boolean;
  clinics: Clinic[];
  currentSingleClinicId: "all" | number | null;
  currentMultiClinicIds: number[];
  error: string | null;
  hasPrimeClinics: "yes" | "no";
  isMultiSelection: boolean;
}

const initialState: ClinicState = {
  success: false,
  isLoading: false,
  currentSingleClinicId: null,
  currentMultiClinicIds: [],
  clinics: [],
  error: null,
  hasPrimeClinics: "no",
  isMultiSelection: null,
};

export const clinicFeature = createFeature({
  name: "clinic",
  reducer: createReducer(
    initialState,
    on(
      ClinicPageActions.setCurrentSingleClinicId,
      (state, { clinicId }): ClinicState => {
        return {
          ...state,
          currentSingleClinicId: clinicId,
        };
      }
    ),
    on(
      ClinicPageActions.setCurrentMultiClinicIDs,
      (state, { clinicIDs }): ClinicState => {
        return {
          ...state,
          currentMultiClinicIds: clinicIDs,
        };
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
          ...(clinics.length > 0 && state.currentMultiClinicIds == null
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
    if (isMulti == null) return [];
    if (isMulti) {
      return clinics.filter((c) => multiIds && multiIds.includes(c.id));
    } else {
      return singleId === "all"
        ? clinics
        : clinics.filter((c) => c.id == <number>singleId);
    }
  }
);

export const selectCurrentClinicId = createSelector(
  selectCurrentClinics,
  (clinics) => {
    if (clinics.length > 0) {
      return clinics.length > 1
        ? clinics.map((c) => c.id).join(",")
        : clinics[0].id;
    } else {
      return null;
    }
  }
);

export const selectIsExactCurrentClinics = createSelector(
  selectCurrentClinics,
  (clinics) => {
    return clinics.every((c) => c.pms == "exact");
  }
);

export const selectIsCoreCurrentClinics = createSelector(
  selectCurrentClinics,
  (clinics) => {
    return clinics.every((c) => c.pms == "core");
  }
);

export const selectIsD4wCurrentClinics = createSelector(
  selectCurrentClinics,
  (clinics) => {
    return clinics.every((c) => c.pms == "d4w");
  }
);
