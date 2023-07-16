/* NgRx */
import { DATE_RANGE_DURATION, TREND_MODE } from '@/newapp/models/layout';
import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';

export const saveStartDate = createAction(
    '[Layout Pages] Save Start Date on Top Bar',
    props<{ start: Moment | null }>()
);

export const saveEndDate = createAction(
    '[Layout Pages] Save End Date on Top Bar',
    props<{ end: Moment | null }>()
);

export const saveDateRange = createAction(
  '[Layout Pages] Date Range on Top Bar',
  props<{ start: Moment | null, end: Moment | null }>()
);

export const setDuration = createAction(
  '[Layout Pages] Set Date Range Duration on Top Bar',
  props<{ duration: DATE_RANGE_DURATION}>()
);

export const setTrend = createAction(
  '[Layout Pages] Set Trend Mode',
  props<{ trend: TREND_MODE}>()
);