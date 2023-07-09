import { API_ENDPOINTS, ChartTip } from '../../../models/dashboard';
import { createAction, props } from '@ngrx/store';

export class JeeveError {
  api: API_ENDPOINTS | string;
  message!: string;
  status!: number;
  errors!: any[];

  constructor(
    message: string,
    status: number = 500,
    errors: any[] = [],
    api = ''
  ) {
    this.message = message;
    this.status = status;
    this.errors = errors;
    this.api = api;
  }
}

export const loadChartTipsSuccess = createAction(
  '[Dashboard API] Load Chart Tips',
  props<{ chartData: ChartTip[] }>()
);

export const loadChartTipsFailure = createAction(
  '[Dashboard API] Load Chart Tips Failure',
  props<{
    error: JeeveError;
  }>()
);
