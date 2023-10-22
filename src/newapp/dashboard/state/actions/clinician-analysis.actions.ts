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

export const setProdSelectTab = createAction(
  '[Clinician Analysis API] Set Prod Select Tab',
  props<{
    tabName: CA_PROD_SELECT_TAB;
  }>()
);

export const setColSelectTab = createAction(
  '[Clinician Analysis API] Set Collection Select Tab',
  props<{
    tabName: CA_COL_SELECT_TAB;
  }>()
);

export const setColExpSelectTab = createAction(
  '[Clinician Analysis API] Set CollectionExp Select Tab',
  props<{
    tabName: CA_COL_EXP_SELECT_TAB;
  }>()
);

export const setHourlyRateChartName = createAction(
  '[Clinician Analysis API] Set Hourly Rate Chart Name',
  props<{
    chartName: CA_PROD_CHART_NAME;
  }>()
);

export const setHourlyRateProdSelectTab = createAction(
  '[Clinician Analysis API] Set Hourly Rate Prod Select Tab',
  props<{
    tabName: CA_PROD_SELECT_TAB;
  }>()
);

export const setHourlyRateColSelectTab = createAction(
  '[Clinician Analysis API] Set Hourly Rate Collection Select Tab',
  props<{
    tabName: CA_COL_SELECT_TAB;
  }>()
);

export const setHourlyRateColExpSelectTab = createAction(
  '[Clinician Analysis API] Set Hourly Rate CollectionExp Select Tab',
  props<{
    tabName: CA_COL_EXP_SELECT_TAB;
  }>()
);
