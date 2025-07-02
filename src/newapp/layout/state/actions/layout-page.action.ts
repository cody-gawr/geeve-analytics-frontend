/* NgRx */
import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';

export const saveDateRange = createAction(
  '[Layout Pages] Date Range on Top Bar',
  props<{
    start: Moment | null;
    end: Moment | null;
    duration: DATE_RANGE_DURATION;
    goalCount?: number;
    enableGoal?: boolean;
  }>(),
);

export const setTrend = createAction(
  '[Layout Pages] Set Trend Mode',
  props<{ trend: TREND_MODE }>(),
);

export const setAvgMode = createAction(
  '[Layout Pages] Set Chart Average Mode',
  props<{ cMode: C_AVG_MODE }>(),
);

export const setCompareMode = createAction(
  '[Layout Pages] Set Compare Mode',
  props<{ cMode: boolean }>(),
);

export const setActivatedRouteTitle = createAction(
  '[Layout Pages] Set Activated Route Title',
  props<{ title: string }>(),
);

export const toggleDateRangePicker = createAction(
  '[Layout Pages] Toggle Date Range Picker',
  props<{ isVisible: boolean }>(),
);

export const setClinicSelectionEnabled = createAction(
  '[Layout Pages] Update Clinic Selection Enabled State',
  props<{ isEnabled: boolean }>(),
);

export const toggleClinicSelection = createAction(
  '[Layout Pages] Toggle Clinic Selection Visibility',
  props<{ isVisible: boolean }>(),
);

export const toggleDentistSelection = createAction(
  '[Layout Pages] Toggle Dentist Selection Visibility',
  props<{ isVisible: boolean }>(),
);

export const setPaths = createAction(
  '[Layout Pages] Set Paths',
  props<{
    paths: {
      name: string;
      path?: string;
    }[];
  }>(),
);
