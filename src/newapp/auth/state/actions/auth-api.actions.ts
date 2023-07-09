import { LoginUser } from '@/newapp/models/user';
import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction('[Auth API] Login Success', props<{ authUserInfo: LoginUser }>());

export const loginFailure = createAction(
  '[Auth API] Login Fail',
  props<{ error: string }>()
);

export const logoutSuccess = createAction('[Auth API] Logout Success');

export const logoutFailure = createAction(
  '[Auth API] Logout Fail',
  props<{ error: string }>()
);
