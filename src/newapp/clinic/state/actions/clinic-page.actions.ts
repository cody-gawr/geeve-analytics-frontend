import { createAction, props } from '@ngrx/store';

export const loadClinics = createAction('[Clinic Page] Load Clinics');
export const setCurrentClinicId = createAction(
  '[Clinic Page] Set Current Clinic Id',
  props<{ clinicId: number | null }>()
);
