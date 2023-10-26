import { createAction, props } from '@ngrx/store';

export const loadNoneTrendApiRequest = createAction(
  '[Clinician Procedure API] load None Trend Api Request',
  props<{
    api: CP_API_ENDPOINTS;
    params: CaNoneTrendQueryParams;
  }>()
);

export const loadTrendApiRequest = createAction(
  '[Clinician Procedure API] load Trend Api Request',
  props<{
    api: CP_API_TREND_ENDPOINTS;
    params: CaTrendQueryParams;
  }>()
);

export const loadCpPredictorAnalysis = createAction(
  '[Clinician Procedure Page] Load cpPredictorAnalysis',
  props<{
    clinicId: number;
    startDate: string;
    endDate: string;
    queryWhEnabled: number;
    dentistId?: number;
  }>()
);

export const loadCpPredictorSpecialistAnalysis = createAction(
  '[Clinician Procedure Page] Load cpPredictorSpecialistAnalysis',
  props<{
    clinicId: number;
    startDate: string;
    endDate: string;
    queryWhEnabled: number;
    dentistId?: number;
  }>()
);

export const loadCpRevPerProcedure = createAction(
  '[Clinician Procedure Page] Load cpRevPerProcedure',
  props<{
    clinicId: number;
    startDate: string;
    endDate: string;
    queryWhEnabled: number;
    dentistId?: number;
  }>()
);

export const loadCpPredictorRatio = createAction(
  '[Clinician Procedure Page] Load cpPredictorRatio',
  props<{
    clinicId: number;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
    dentistId?: number;
  }>()
);

export const loadCpReferrals = createAction(
  '[Clinician Procedure Page] Load cpReferrals',
  props<{
    clinicId: number;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
    dentistId?: number;
  }>()
);

export const setCpPredictorAnalysisVisibility = createAction(
  '[Clinician Procedure Page] Set cpPredictorAnalysisVisibility',
  props<{ value: 'general' | 'specialist' }>()
);

export const setCpPredictorRatioVisibility = createAction(
  '[Clinician Procedure Page] Set cpPredictorRatioVisibility',
  props<{ value: number }>()
);

export const setCpReferralsVisibility = createAction(
  '[Clinician Procedure Page] Set cpReferralsVisibility',
  props<{ value: 'combined' | 'internal' | 'external' }>()
);

export const loadCaNoneTrendApiRequestSuccess = createAction(
  '[Clinician Procedure API] Load None Trend Api Success',
  props<{ api: CP_API_ENDPOINTS; resBody: any }>()
);

export const loadCaNoneTrendApiRequestFailure = createAction(
  '[Clinician Procedure API] Load None Trend Api Failure',
  props<{
    api: CP_API_ENDPOINTS;
    error: JeeveError;
  }>()
);

export const loadCaTrendApiRequestSuccess = createAction(
  '[Clinician Procedure API] Load Trend Api Success',
  props<{ api: CP_API_TREND_ENDPOINTS; resBody: any }>()
);

export const loadCaTrendApiRequestFailure = createAction(
  '[Clinician Procedure API] Load Trend Api Failure',
  props<{
    api: CP_API_TREND_ENDPOINTS;
    error: JeeveError;
  }>()
);
