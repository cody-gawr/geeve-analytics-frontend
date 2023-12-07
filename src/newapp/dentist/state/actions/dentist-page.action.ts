import { createAction, props } from '@ngrx/store';

export const loadDentists = createAction(
  '[Dentist Page] Load Dentists Tips',
  props<{ clinicId: string | number; all: number }>()
);

export const loadSpecificDentist = createAction(
  '[Dentist Page] Load Specific Dentist',
  props<{ clinicId: string | number }>()
);

export const setCurrentDentistId = createAction(
  '[Dentist Page] Current Dentists Id',
  props<{ dentistId: number }>()
);
