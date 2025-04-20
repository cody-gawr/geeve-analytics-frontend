/* NgRx */
import { createAction, props } from '@ngrx/store';

export const getRolesIndividual = createAction(
  '[Roles Individual]',
  props<{ clinicId?: number }>(),
);

export const getRoles = createAction('Roles');
