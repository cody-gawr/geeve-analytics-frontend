import { createAction, props } from "@ngrx/store";
import {
  CaNoneTrendQueryParams,
  CaTrendQueryParams,
} from "../../services/clinician-analysis.service";

export const loadNoneTrendApiRequest = createAction(
  "[Clinician Analysis API] load None Trend Api Request",
  props<{
    api: CA_API_ENDPOINTS;
    params: CaNoneTrendQueryParams;
  }>()
);

export const loadTrendApiRequest = createAction(
  "[Clinician Analysis API] load Trend Api Request",
  props<{
    api: CA_API_ENDPOINTS_TREND;
    params: CaTrendQueryParams;
  }>()
);

export const loadCaNoneTrendApiRequestSuccess = createAction(
  "[Clinician Analysis API] Load None Trend Api Success",
  props<{ resBody: any }>()
);

export const loadCaTrendApiRequestFailure = createAction(
  "[Clinician Analysis API] Load Trend Api Failure",
  props<{
    error: JeeveError;
  }>()
);
