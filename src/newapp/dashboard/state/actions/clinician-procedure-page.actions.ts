import { createAction, props } from '@ngrx/store';

export const loadTrendApiRequest = createAction(
  '[Clinician Procedure API] Load Trend Api Request',
  props<{
    api: CP_API_TREND_ENDPOINTS;
    params: CaTrendQueryParams;
  }>(),
);

export const loadTrendApiRequests = createAction(
  '[Clinician Procedure API] Load Trend Api Request',
  props<{
    requests: { api: CP_API_TREND_ENDPOINTS; params: CaTrendQueryParams }[];
  }>(),
);

export const loadCpPredictorAnalysis = createAction(
  '[Clinician Procedure Page] Load cpPredictorAnalysis',
  props<{
    clinicId: number;
    startDate: string;
    endDate: string;
    queryWhEnabled: number;
    dentistId?: number;
  }>(),
);

export const loadCpPredictorSpecialistAnalysis = createAction(
  '[Clinician Procedure Page] Load cpPredictorSpecialistAnalysis',
  props<{
    clinicId: number;
    startDate: string;
    endDate: string;
    queryWhEnabled: number;
    dentistId?: number;
  }>(),
);

export const loadCpRevPerProcedure = createAction(
  '[Clinician Procedure Page] Load cpRevPerProcedure',
  props<{
    clinicId: number;
    startDate: string;
    endDate: string;
    queryWhEnabled: number;
    dentistId?: number;
  }>(),
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
  }>(),
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
  }>(),
);

export const setCpPredictorAnalysisVisibility = createAction(
  '[Clinician Procedure Page] Set cpPredictorAnalysisVisibility',
  props<{ value: 'general' | 'specialist' }>(),
);

export const setCpPredictorRatioVisibility = createAction(
  '[Clinician Procedure Page] Set cpPredictorRatioVisibility',
  props<{
    value: 'indirect to large direct fillings' | 'rct to extraction' | 'rct conversion';
  }>(),
);

export const setCpReferralsVisibility = createAction(
  '[Clinician Procedure Page] Set cpReferralsVisibility',
  props<{ value: 'combined' | 'internal' | 'external' }>(),
);

export const loadCpNoneTrendApiRequestSuccess = createAction(
  '[Clinician Procedure API] Load None Trend Api Success',
  props<{ api: CP_API_ENDPOINTS; resBody: any }>(),
);

export const loadCpNoneTrendApiRequestFailure = createAction(
  '[Clinician Procedure API] Load None Trend Api Failure',
  props<{
    api: CP_API_ENDPOINTS;
    error: JeeveError;
  }>(),
);

export const loadCpTrendApiRequestSuccess = createAction(
  '[Clinician Procedure API] Load Trend Api Success',
  props<{ api: CP_API_TREND_ENDPOINTS; resBody: any }>(),
);

export const loadCpTrendApiRequestFailure = createAction(
  '[Clinician Procedure API] Load Trend Api Failure',
  props<{
    api: CP_API_TREND_ENDPOINTS;
    error: JeeveError;
  }>(),
);
