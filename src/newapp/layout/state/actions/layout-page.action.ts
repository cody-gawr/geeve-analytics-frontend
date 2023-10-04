/* NgRx */
import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';

export const saveDateRange = createAction(
  '[Layout Pages] Date Range on Top Bar',
  props<{
    start: Moment | null;
    end: Moment | null;
    duration: DATE_RANGE_DURATION;
  }>()
);

export const setTrend = createAction(
  '[Layout Pages] Set Trend Mode',
  props<{ trend: TREND_MODE }>()
);

export const setAvgMode = createAction(
  '[Layout Pages] Set Chart Average Mode',
  props<{ cMode: C_AVG_MODE }>()
);

export const setActivatedRouteTitle = createAction(
  '[Layout Pages] Set Activated Route Title',
  props<{ title: string }>()
);
