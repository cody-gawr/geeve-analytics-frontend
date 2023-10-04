import { createFeature, createReducer } from '@ngrx/store';

export interface ClinicianAnalysisState {
  isLoadingData: Array<CA_API_ENDPOINTS>;
  errors: Array<JeeveError>;
}

const initiateState: ClinicianAnalysisState = {
  isLoadingData: [],
  errors: [],
};

export const clinicianAnalysisFeature = createFeature({
  name: 'clinician-analysis',
  reducer: createReducer(initiateState),
});

export const { selectErrors, selectIsLoadingData } = clinicianAnalysisFeature;
