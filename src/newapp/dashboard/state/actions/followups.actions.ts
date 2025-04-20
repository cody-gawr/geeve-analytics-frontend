import { createAction, props } from '@ngrx/store';

export const loadFuGetConversion = createAction(
  '[Followups API] load loadFuGetConversion',
  props<{
    params: FuApiQueryParams;
  }>(),
);

export const loadFuGetConversionPerUser = createAction(
  '[Followups API] load FuGetConversionPerUser',
  props<{
    params: FuApiQueryParams;
  }>(),
);

export const loadFuGetFollowupCompletion = createAction(
  '[Followups API] load FuGetFollowupCompletion',
  props<{
    params: FuApiQueryParams;
  }>(),
);

export const loadFuGetOutcome = createAction(
  '[Followups API] load FuGetOutcome',
  props<{
    params: FuApiQueryParams;
  }>(),
);

export const loadFuGetPerUser = createAction(
  '[Followups API] load FuGetPerUser',
  props<{
    params: FuApiQueryParams;
  }>(),
);

export const loadFuApiRequestSuccess = createAction(
  '[Followups API] load Api Request Success',
  props<{
    api: FU_API_ENDPOINTS;
    resBody: any;
  }>(),
);

export const loadFuApiRequestFailure = createAction(
  '[Followups API] load Api Request Failure',
  props<{
    api: FU_API_ENDPOINTS;
    error: JeeveError;
  }>(),
);

export const setFuOutComeChartName = createAction(
  '[Followups API] Set FuGetOutcome Chart Name',
  props<{
    chartName: FU_OUTCOME_CHART_NAME;
  }>(),
);

export const setFuConversionPerUserChartName = createAction(
  '[Followups API] Set FuGetConversionPerUser Chart Name',
  props<{
    chartName: FU_OUTCOME_CHART_NAME;
  }>(),
);
