import { createAction, props } from '@ngrx/store';

export const loadClinics = createAction('[Clinic Page] Load Clinics');
export const setCurrentClinicId = createAction(
  '[Clinic Page] Set Current Clinic Id',
  props<{ clinicId: string | number | null }>()
);

export const setCurrentMultiClinicIDs = createAction(
  '[Clinic Page] Set Current Clinics',
  props<{ clinicIDs: Array<'all' | number>, isPrevAll: boolean }>()
);