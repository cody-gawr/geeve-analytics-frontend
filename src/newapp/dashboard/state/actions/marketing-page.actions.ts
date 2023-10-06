import { createAction, props } from '@ngrx/store';

export const loadMkNewPatientsByReferral = createAction(
  '[Marketing Page] Load mkNewPatientsByReferral',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkNewPatientsByReferralTrend = createAction(
  '[Marketing Page] Load mkNewPatientsByReferralTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkRevenueByReferral = createAction(
  '[Marketing Page] Load mkRevByReferral',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkRevByReferralTrend = createAction(
  '[Marketing Page] Load mkRevByReferralTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkNumNewPatients = createAction(
  '[Marketing Page] Load mkNumNewPatients',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkActivePatients = createAction(
  '[Marketing Page] Load mkActivePatients',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkActivePatientsTrend = createAction(
  '[Marketing Page] Load mkActivePatientsTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkNumNewPatientsTrend = createAction(
  '[Marketing Page] Load mkNumNewPatientsTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkNewPatientAcq = createAction(
  '[Marketing Page] Load mkNewPatientAcq',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    connectedWith: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkNewPatientAcqTrend = createAction(
  '[Marketing Page] Load mkNewPatientAcqTrend',
  props<{
    clinicId: number | string;
    mode: string;
    connectedWith: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkTotalVisits = createAction(
  '[Marketing Page] Load mkTotalVisits',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>()
);

export const loadMkTotalVisitsTrend = createAction(
  '[Marketing Page] Load mkTotalVisitsTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>()
);

export const setIsActivePatients = createAction(
  '[Marketing Page] Set setIsActivePatients',
  props<{
    isActive: boolean;
  }>()
);

export const loadMkGetXeroAccounts = createAction(
  '[Marketing Page] Load mkGetXeroAcct',
  props<{
    clinicId: number | string;
    userId: number;
  }>()
);

export const loadMkGetMyobAccounts = createAction(
  '[Marketing Page] Load mkGetMyobAcct',
  props<{
    clinicId: number | string;
    userId: number;
  }>()
);

export const saveAcctMyob = createAction(
  '[Marketing Page] Save mkSaveAcctMyob',
  props<{
    clinicId: number | string;
    categories: string[];
  }>()
);

export const saveAcctXero = createAction(
  '[Marketing Page] Save mkSaveAcctXero',
  props<{
    clinicId: number | string;
    categories: string[];
  }>()
);

export const setErrors = createAction(
  '[Marketing Page] Set errors',
  props<{
    errors: JeeveError[];
  }>()
);
