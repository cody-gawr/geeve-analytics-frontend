import { JeeveError } from '@/newapp/models';
import { ExpensesDataItem } from '@/newapp/models/dashboard';
import { createAction, props } from '@ngrx/store';

export const fnTotalProductionSuccess = createAction(
  '[Finance API] Load fnTotalProduction Success',
  props<{ value: number }>()
);

export const fnTotalProductionFailure = createAction(
  '[Finance API] Load fnTotalProduction Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fnNetProfitSuccess = createAction(
    '[Finance API] Load fnNetProfit Success',
    props<{ value: number }>()
  );
  
export const fnNetProfitFailure = createAction(
    '[Finance API] Load fnNetProfit Failure',
    props<{
        error: JeeveError;
    }>()
);

export const fnNetProfitPercentageSuccess = createAction(
    '[Finance API] Load fnNetProfitPercentage Success',
    props<{ value: number }>()
  );
  
export const fnNetProfitPercentageFailure = createAction(
    '[Finance API] Load fnNetProfitPercentage Failure',
    props<{
        error: JeeveError;
    }>()
);

export const fnExpensesSuccess = createAction(
  '[Finance API] Load fnExpenses Success',
  props<{ expensesData: ExpensesDataItem[] }>()
);

export const fnExpensesFailure = createAction(
  '[Finance API] Load fnExpenses Failure',
  props<{
      error: JeeveError;
  }>()
);
