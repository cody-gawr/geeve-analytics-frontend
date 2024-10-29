import { createAction, props } from '@ngrx/store';

export const loadClinics = createAction('[Clinic Page] Load Clinics');
export const loadUserClinics = createAction('[Clinic Page] Load User Clinics');
export const loadCampaigns = createAction('[Clinic Page] Load Campaigns', props<{
  clinicId: number;
}>());
export const setCurrentSingleClinicId = createAction(
  '[Clinic Page] Set Current Clinic Id',
  props<{ clinicId: 'all' | number | null }>()
);

export const setCurrentMultiClinicIDs = createAction(
  '[Clinic Page] Set Current Clinics',
  props<{ clinicIDs: Array<number> }>()
);

export const setMultiClinicSelection = createAction(
  '[Clinic Page] Set Multi Clinic Selection',
  props<{ value: boolean }>()
);

export const loadCoreSyncStatus = createAction(
  '[Clinic Page] Load Core Sync Status', props<{ clinicId: number }>());

export const loadDentallySyncStatus = createAction(
  '[Clinic Page] Load Dentally Sync Status', props<{ clinicId: number }>());

export const loadPraktikaSyncStatus = createAction(
  '[Clinic Page] Load Praktika Sync Status', props<{ clinicId: number }>());


export const loadClinicAccountingPlatform = createAction(
  '[Clinic Page] Load Clinic Accounting Platform',
  props<{ clinicId: number }>()
);

export const setConnectedClinicId = createAction(
  '[Clinic API] set connected clinic id',
  props<{
    clinicId: number;
  }>()
);
  