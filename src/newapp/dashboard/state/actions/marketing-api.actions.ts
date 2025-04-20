import { JeeveError } from '@/newapp/models';
import {
  MkActivePatientsApiResponse,
  MkActivePatientsTrendApiResponse,
  MkNewPatientAcqApiResponse,
  MkNewPatientAcqTrendApiResponse,
  MkNewPatientsByReferralApiResponse,
  MkNewPatientsByReferralTrendApiResponse,
  MkNumNewPatientsApiResponse,
  MkNumNewPatientsTrendApiResponse,
  MkRevByReferralTrendApiResponse,
  MkRevenueByReferralApiResponse,
  MkTotalVisitsApiResponse,
  MkTotalVisitsTrendApiResponse,
  MkXeroOrMyobAccountsApiResponse,
} from '@/newapp/models/dashboard/marketing';
import { createAction, props } from '@ngrx/store';

export const mkNewPatientsByReferralSuccess = createAction(
  '[Marketing API] Load mkNewPatientsByReferral Success',
  props<{ newPatientsByReferralData: MkNewPatientsByReferralApiResponse }>(),
);

export const mkNewPatientsByReferralFailure = createAction(
  '[Marketing API] Load mkNewPatientsByReferral Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkNewPatientsByReferralTrendSuccess = createAction(
  '[Marketing API] Load mkNewPatientsByReferralTrend Success',
  props<{
    newPatientsByReferralTrendData: MkNewPatientsByReferralTrendApiResponse;
  }>(),
);

export const mkNewPatientsByReferralTrendFailure = createAction(
  '[Marketing API] Load mkNewPatientsByReferralTrend Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkRevenueByReferralSuccess = createAction(
  '[Marketing API] Load mkRevenueByReferral Success',
  props<{ revenueByReferralData: MkRevenueByReferralApiResponse }>(),
);

export const mkRevenueByReferralFailure = createAction(
  '[Marketing API] Load mkRevenueByReferral Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkRevByReferralTrendSuccess = createAction(
  '[Marketing API] Load mkRevByReferralTrend Success',
  props<{ revenueByReferralTrendData: MkRevByReferralTrendApiResponse }>(),
);

export const mkRevByReferralTrendFailure = createAction(
  '[Marketing API] Load mkRevByReferralTrend Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkNumNewPatientsSuccess = createAction(
  '[Marketing API] Load mkNumNewPatients Success',
  props<{ newPatientsRatioData: MkNumNewPatientsApiResponse }>(),
);

export const mkNumNewPatientsFailure = createAction(
  '[Marketing API] Load mkNumNewPatients Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkNumNewPatientsTrendSuccess = createAction(
  '[Marketing API] Load mkNumNewPatientsTrend Success',
  props<{ numNewPatientsTrendData: MkNumNewPatientsTrendApiResponse }>(),
);

export const mkNumNewPatientsTrendFailure = createAction(
  '[Marketing API] Load mkNumNewPatientsTrend Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkActivePatientsSuccess = createAction(
  '[Marketing API] Load mkActivePatients Success',
  props<{ activePatientsData: MkActivePatientsApiResponse }>(),
);

export const mkActivePatientsFailure = createAction(
  '[Marketing API] Load mkActivePatients Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkActivePatientsTrendSuccess = createAction(
  '[Marketing API] Load mkActivePatientsTrend Success',
  props<{ activePatientsTrendData: MkActivePatientsTrendApiResponse }>(),
);

export const mkActivePatientsTrendFailure = createAction(
  '[Marketing API] Load mkActivePatientsTrend Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkNewPatientAcqTrendSuccess = createAction(
  '[Marketing API] Load mkNewPatientAcqTrend Success',
  props<{ newPatientAcqTrenddata: MkNewPatientAcqTrendApiResponse }>(),
);

export const mkNewPatientAcqTrendFailure = createAction(
  '[Marketing API] Load mkNewPatientAcqTrend Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkNewPatientAcqSuccess = createAction(
  '[Marketing API] Load mkNewPatientAcq Success',
  props<{ newPatientAcqdata: MkNewPatientAcqApiResponse }>(),
);

export const mkNewPatientAcqFailure = createAction(
  '[Marketing API] Load mkNewPatientAcq Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkTotalVisitsSuccess = createAction(
  '[Marketing API] Load mkTotalVisits Success',
  props<{ mkTotalVisitsData: MkTotalVisitsApiResponse }>(),
);

export const mkTotalVisitsFailure = createAction(
  '[Marketing API] Load mkTotalVisits Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkTotalVisitsTrendSuccess = createAction(
  '[Marketing API] Load mkTotalVisitsTrend Success',
  props<{ mkTotalVisitsTrendData: MkTotalVisitsTrendApiResponse }>(),
);

export const mkTotalVisitsTrendFailure = createAction(
  '[Marketing API] Load mkTotalVisitsTrend Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkGetXeroAcctSuccess = createAction(
  '[Marketing API] Load mkGetXeroAcct Success',
  props<{ xeroAccounts: MkXeroOrMyobAccountsApiResponse }>(),
);

export const mkGetXeroAcctFailure = createAction(
  '[Marketing API] Load mkGetXeroAcct Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkGetMyobAcctSuccess = createAction(
  '[Marketing API] Load mkGetMyobAcct Success',
  props<{ myobAccounts: MkXeroOrMyobAccountsApiResponse }>(),
);

export const mkGetMyobAcctFailure = createAction(
  '[Marketing API] Load mkGetMyobAcct Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkSaveAcctMyobSuccess = createAction('[Marketing API] Save mkSaveAcctMyob Success');

export const mkSaveAcctMyobFailure = createAction(
  '[Marketing API] Save mkSaveAcctMyob Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkSaveAcctXeroSuccess = createAction('[Marketing API] Save mkSaveAcctXero Success');

export const mkSaveAcctXeroFailure = createAction(
  '[Marketing API] Save mkSaveAcctXero Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const mkChartDescriptionSuccess = createAction(
  '[Marketing API] Load Market Chart Description Success',
  props<{ chartDesc: MarketingEndpoints; mkChartDescData: any }>(),
);

export const mkChartDescriptionFailure = createAction(
  '[Marketing API] Load Market Chart Description Failure',
  props<{
    chartDesc: MarketingEndpoints;
    error: JeeveError;
  }>(),
);
