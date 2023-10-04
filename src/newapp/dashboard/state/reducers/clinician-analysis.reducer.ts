import { createFeature, createReducer, on } from '@ngrx/store';
import { ClinicianAnalysisActions } from '../actions';

export interface ClinicianAnalysisState {
  isLoadingData: Array<CA_API_ENDPOINTS>;
  errors: Array<JeeveError>;

  productionChartName: CA_PROD_CHART_NAME;
}

const initiateState: ClinicianAnalysisState = {
  isLoadingData: [],
  errors: [],
  productionChartName: 'Production',
};

export const clinicianAnalysisFeature = createFeature({
  name: 'clinician-analysis',
  reducer: createReducer(
    initiateState,
    on(
      ClinicianAnalysisActions.setProdChartName,
      (state, { chartName }): ClinicianAnalysisState => {
        return {
          ...state,
          productionChartName: chartName,
        };
      }
    )
  ),
});

export const { selectErrors, selectIsLoadingData, selectProductionChartName } =
  clinicianAnalysisFeature;
