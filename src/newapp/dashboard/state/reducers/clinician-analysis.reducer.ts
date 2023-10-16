import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ClinicianAnalysisActions } from '../actions';
import _ from 'lodash';

export interface ClinicianAnalysisState {
  isLoadingData: Array<CA_API_ENDPOINTS | CA_API_ENDPOINTS_TREND>;
  errors: Array<JeeveError>;

  productionChartName: CA_PROD_CHART_NAME;
  resBodyList: Record<CA_API_ENDPOINTS, unknown>[];
  resBodyListTrend: Record<CA_API_ENDPOINTS_TREND, unknown>[];
}

const initiateState: ClinicianAnalysisState = {
  isLoadingData: [],
  errors: [],
  productionChartName: 'Production',
  resBodyList: [],
  resBodyListTrend: [],
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
    ),
    on(
      ClinicianAnalysisActions.loadNoneTrendApiRequest,
      (state, { api }): ClinicianAnalysisState => {
        return {
          ...state,
          errors: _.filter(state.errors, n => n.api != api),
          isLoadingData: _.union(state.isLoadingData, [api]),
          resBodyList: Object.entries(state.resBodyList)
            .filter(([key]) => key !== api)
            .map(([key, value]) => value),
        };
      }
    ),
    on(
      ClinicianAnalysisActions.loadTrendApiRequest,
      (state, { api }): ClinicianAnalysisState => {
        return {
          ...state,
          errors: _.filter(state.errors, n => n.api != api),
          isLoadingData: _.union(state.isLoadingData, [api]),
          resBodyListTrend: Object.entries(state.resBodyListTrend)
            .filter(([key]) => key !== api)
            .map(([key, value]) => value),
        };
      }
    ),
    on(
      ClinicianAnalysisActions.loadCaNoneTrendApiRequestSuccess,
      (state, { api, resBody }): ClinicianAnalysisState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != api),
          resBodyList: { ...state.resBodyList, [api]: resBody },
          isLoadingData: _.filter(isLoadingData, n => n != api),
        };
      }
    ),
    on(
      ClinicianAnalysisActions.loadCaNoneTrendApiRequestFailure,
      (state, { api, error }): ClinicianAnalysisState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          resBodyList: Object.entries(state.resBodyList)
            .filter(([key]) => key !== api)
            .map(([key, value]) => value),
          isLoadingData: _.filter(isLoadingData, n => n != api),
          errors: [...errors, { ...error, api: api }],
        };
      }
    ),
    on(
      ClinicianAnalysisActions.loadCaTrendApiRequestSuccess,
      (state, { api, resBody }): ClinicianAnalysisState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != api),
          resBodyListTrend: { ...state.resBodyListTrend, [api]: resBody },
          isLoadingData: _.filter(isLoadingData, n => n != api),
        };
      }
    ),
    on(
      ClinicianAnalysisActions.loadCaTrendApiRequestFailure,
      (state, { api, error }): ClinicianAnalysisState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          resBodyListTrend: Object.entries(state.resBodyListTrend)
            .filter(([key]) => key !== api)
            .map(([key, value]) => value),
          isLoadingData: _.filter(isLoadingData, n => n != api),
          errors: [...errors, { ...error, api: api }],
        };
      }
    )
  ),
});

export const { selectErrors, selectIsLoadingData, selectProductionChartName } =
  clinicianAnalysisFeature;

export const selectIsLoadingCaDentistProduction = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caDentistProduction') >= 0
);

export const selectIsLoadingCaDentistProductionDentist = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caDentistProductionDentist') >= 0
);

export const selectIsLoadingCaDentistProductionOht = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caDentistProductionOht') >= 0
);

export const selectIsLoadingCaCollection = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollection') >= 0
);

export const selectIsLoadingCaCollectionDentists = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollectionDentists') >= 0
);

export const selectIsLoadingCaCollectionOht = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollectionOht') >= 0
);

export const selectIsLoadingCaCollectionExp = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollectionExp') >= 0
);

export const selectIsLoadingCaCollectionExpDentists = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caCollectionExpDentists') >= 0
);

export const selectIsLoadingCaCollectionExpOht = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollectionExpOht') >= 0
);
