import { createAction, props } from '@ngrx/store';

import { Clinic } from '../../../models/clinic';

export const loadClinicsSuccess = createAction(
  '[Clinic API] Load Clinics Success',
  props<{ clinics: Clinic[]; hasPrimeClinics: 'yes' | 'no' }>()
);

export const loadClinicsFailure = createAction(
  '[Clinic API] Load Clinics Fail',
  props<{ error: string }>()
);
