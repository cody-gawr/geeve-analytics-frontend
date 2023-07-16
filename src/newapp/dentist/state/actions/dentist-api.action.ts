/* NgRx */
import { JeeveError } from '@/newapp/models';
import { Dentist } from '@/newapp/models/dentist';
import { createAction, props } from '@ngrx/store';

export const loadDentistsSuccess = createAction(
    '[Dentist API] load Dentists Success',
    props<{ dentists: Dentist[] }>()
);

export const loadDentistsFailure = createAction(
    '[Dentist API] load Dentists Failure',
    props<{ error: JeeveError }>()
);
