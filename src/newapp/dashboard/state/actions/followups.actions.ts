import { createAction, props } from '@ngrx/store';

export const loadApiRequest = createAction(
  '[Followups API] load Api Request',
  props<{
    api: FU_API_ENDPOINTS;
    params: FuApiQueryParams;
  }>()
);

export const loadFuApiRequestSuccess = createAction(
  '[Followups API] load Api Request Success',
  props<{
    api: FU_API_ENDPOINTS;
    resBody: any;
  }>()
);

export const loadFuApiRequestFailure = createAction(
  '[Followups API] load Api Request Failure',
  props<{
    api: FU_API_ENDPOINTS;
    error: JeeveError;
  }>()
);
