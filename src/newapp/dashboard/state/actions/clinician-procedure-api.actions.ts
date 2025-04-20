import { JeeveError } from '@/newapp/models';
import { createAction, props } from '@ngrx/store';
import {
  CpPredictorAnalysisApiResponse,
  CpPredictorRatioApiResponse,
  CpPredictorSpecialistAnalysisApiResponse,
  CpReferralsApiResponse,
  CpRevPerProcedureApiResponse,
} from '@/newapp/models/dashboard/clinician-procedure';

export const loadCpPredictorAnalysisSuccess = createAction(
  '[Clinician Procedure API] Load cpPredictorAnalysis Success',
  props<{ cpPredictorAnalysisData: CpPredictorAnalysisApiResponse }>(),
);

export const loadCpPredictorAnalysisFailure = createAction(
  '[Clinician Procedure API] Load cpPredictorAnalysis Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const loadCpPredictorSpecialistAnalysisSuccess = createAction(
  '[Clinician Procedure API] Load cpPredictorSpecialistAnalysis Success',
  props<{
    cpPredictorSpecialistAnalysisData: CpPredictorSpecialistAnalysisApiResponse;
  }>(),
);

export const loadCpPredictorSpecialistAnalysisFailure = createAction(
  '[Clinician Procedure API] Load cpPredictorSpecialistAnalysis Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const loadCpRevPerProcedureSuccess = createAction(
  '[Clinician Procedure API] Load CpRevPerProcedure Success',
  props<{ cpRevPerProcedureData: CpRevPerProcedureApiResponse }>(),
);

export const loadCpRevPerProcedureFailure = createAction(
  '[Clinician Procedure API] Load CpRevPerProcedure Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const loadCpPredictorRatioSuccess = createAction(
  '[Clinician Procedure API] Load CpPredictorRatio Success',
  props<{ cpPredictorRatioData: CpPredictorRatioApiResponse }>(),
);

export const loadCpPredictorRatioFailure = createAction(
  '[Clinician Procedure API] Load cpPredictorRatio Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const loadCpReferralsSuccess = createAction(
  '[Clinician Procedure API] Load cpReferrals Success',
  props<{ cpReferralsData: CpReferralsApiResponse }>(),
);

export const loadCpReferralsFailure = createAction(
  '[Clinician Procedure API] Load cpReferrals Failure',
  props<{
    error: JeeveError;
  }>(),
);
