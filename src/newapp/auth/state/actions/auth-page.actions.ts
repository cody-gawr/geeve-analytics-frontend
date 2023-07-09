/* NgRx */
import { createAction, props } from '@ngrx/store';

import { Login } from '../../../models/auth';

export const login = createAction(
  '[Login Page] Login',
  props<{ form: Login }>()
);

export const logout = createAction('[Layout Page] Logout');
