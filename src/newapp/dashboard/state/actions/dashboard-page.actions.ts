import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';

export const loadChartTips = createAction(
  '[Dashboard Page] Load Chart Tips',
  props<{ dashboardId: number; clinicId: number }>()
);
