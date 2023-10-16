import { createAction, props } from '@ngrx/store';
import {
  CaNoneTrendQueryParams,
  CaTrendQueryParams,
} from '../../services/clinician-analysis.service';

export const loadNoneTrendApiRequest = createAction(
  '[Clinician Analysis API] load None Trend Api Request',
  props<{
    api: CA_API_ENDPOINTS;
    params: CaNoneTrendQueryParams;
  }>()
);

export const loadTrendApiRequest = createAction(
  '[Clinician Analysis API] load Trend Api Request',
  props<{
    api: CA_API_ENDPOINTS_TREND;
    params: CaTrendQueryParams;
  }>()
);

export const loadCaNoneTrendApiRequestSuccess = createAction(
  '[Clinician Analysis API] Load None Trend Api Success',
  props<{ api: CA_API_ENDPOINTS; resBody: any }>()
);

export const loadCaNoneTrendApiRequestFailure = createAction(
  '[Clinician Analysis API] Load None Trend Api Failure',
  props<{
    api: CA_API_ENDPOINTS;
    error: JeeveError;
  }>()
);

export const loadCaTrendApiRequestSuccess = createAction(
  '[Clinician Analysis API] Load Trend Api Success',
  props<{ api: CA_API_ENDPOINTS_TREND; resBody: any }>()
);

export const loadCaTrendApiRequestFailure = createAction(
  '[Clinician Analysis API] Load Trend Api Failure',
  props<{
    api: CA_API_ENDPOINTS_TREND;
    error: JeeveError;
  }>()
);

export const setProdChartName = createAction(
  '[Clinician Analysis API] Set Prod Chart Name',
  props<{
    chartName: CA_PROD_CHART_NAME;
  }>()
);
