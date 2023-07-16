import { createAction, props } from '@ngrx/store';

export const loadDentists = createAction(
  '[Dentist Page] Load Dentists Tips',
  props<{ clinicId: string | number, all: number }>()
);
