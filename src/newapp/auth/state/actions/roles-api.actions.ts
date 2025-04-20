/* NgRx */
import { JeeveError } from '@/newapp/models';
import { RolesApiResponse, RolesIndividualApiResponse } from '../../../models/user';
import { createAction, props } from '@ngrx/store';

export const getRolesIndividualSuccess = createAction(
  '[Roles Individual API] Load Success',
  props<{ userRolesIndividual: RolesIndividualApiResponse }>(),
);

export const getRolesSuccess = createAction(
  'Roles API] Load Success',
  props<{ userRoles: RolesApiResponse }>(),
);

export const getRolesIndividualFailure = createAction(
  '[Roles Individual API] Load Failure',
  props<{ error: JeeveError }>(),
);

export const getRolesFailure = createAction(
  'Roles API] Load Failure',
  props<{ error: JeeveError }>(),
);
