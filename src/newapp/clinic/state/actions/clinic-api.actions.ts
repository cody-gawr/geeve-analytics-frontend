import { createAction, props } from '@ngrx/store';

import { Clinic, IClinicDTO } from '../../../models/clinic';
import { ICampaign } from '@/newapp/models/clinic/campaign';

// Load clinics from anaytics API
export const loadClinicsSuccess = createAction(
  '[Clinic API] Load Clinics Success',
  props<{ clinics: Clinic[]; hasPrimeClinics: 'yes' | 'no' }>()
);

export const loadClinicsFailure = createAction(
  '[Clinic API] Load Clinics Fail',
  props<{ error: string }>()
);

// Load user clinics from common API
export const loadUserClinicsSuccess = createAction(
  '[Clinic API] Load User Clinics Success',
  props<{ clinics: IClinicDTO[]; }>()
);

export const loadUserClinicsFailure = createAction(
  '[Clinic API] Load User Clinics Fail',
  props<{ error: JeeveError }>()
);

// Check the status of core sync
export const checkCoreSyncSuccess = createAction(
  '[Clinic API] Check Core Sync Success',
  props<{ clinicId: number, hasCoreSync: boolean, numberOfSuccess: number }>()
);

export const checkCoreSyncFailure = createAction(
  '[Clinic API] Check Core Sync Fail',
  props<{ clinicId: number, error: JeeveError }>()
);

// Check the status of Dentally sync
export const checkDentallySyncSuccess = createAction(
  '[Clinic API] Check Dentally Sync Success',
  props<{ clinicId: number, hasDentallySync: boolean, numberOfSuccess: number }>()
);

export const checkDentallySyncFailure = createAction(
  '[Clinic API] Check Dentally Sync Fail',
  props<{ clinicId: number, error: JeeveError }>()
);

// Check the status of Praktika sync
export const checkPraktikaSyncSuccess = createAction(
  '[Clinic API] Check Praktika Sync Success',
  props<{ clinicId: number, hasPraktikaSync: boolean, numberOfSuccess: number }>()
);

export const checkPraktikaSyncFailure = createAction(
  '[Clinic API] Check Praktika Sync Fail',
  props<{ clinicId: number, error: JeeveError }>()
);

// load Campaigns
export const loadCampaignsSuccess = createAction(
  '[Clinic API] Load Campaigns Success',
  props<{ campaigns: ICampaign[], clinicId: number }>()
);

export const loadCampaignsFailure = createAction(
  '[Clinic API] Load Campaigns Fail',
  props<{ error: JeeveError, clinicId: number }>()
);

export const clinicAccountingPlatformSuccess = createAction(
  '[Clinic API] Load Clinic Accounting Platform Success',
  props<{ connectWith: CONNECT_WITH_PLATFORM; clinicId: number }>()
);

export const clinicAccountingPlatformFailure = createAction(
  '[Clinic API] Load Clinic Accounting Platform Failure',
  props<{
    error: JeeveError;
  }>()
);