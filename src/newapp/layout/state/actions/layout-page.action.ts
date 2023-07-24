/* NgRx */
import { DATE_RANGE_DURATION, TREND_MODE } from '@/newapp/models/layout';
import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';

export const saveDateRange = createAction(
  '[Layout Pages] Date Range on Top Bar',
  props<{ start: Moment | null, end: Moment | null, duration: DATE_RANGE_DURATION }>()
);


export const setTrend = createAction(
  '[Layout Pages] Set Trend Mode',
  props<{ trend: TREND_MODE}>()
);

export const setActivatedRouteTitle = createAction(
  '[Layout Pages] Set Activated Route Title',
  props<{ title: string}>()
);