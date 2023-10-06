import { createAction, props } from '@ngrx/store';

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
