import { createAction, props } from '@ngrx/store';

export const loadChartTips = createAction(
  '[Dashboard Page] Load Chart Tips',
  props<{ dashboardId: number; clinicId: string | number }>()
);


export const loadClinicAccountingPlatform = createAction(
  '[Dashboard Page] Load Clinic Accounting Platform',
  props<{ clinicId: string | number }>()
);
