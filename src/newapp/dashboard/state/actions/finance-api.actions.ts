import { JeeveError } from '@/newapp/models';
import { FnTotalDiscountItem, FnExpensesDataItem, FnProductionByClinicianItem, FnProductionPerVisitItem, FnTotalProductionItem, FnTotalCollectionItem } from '@/newapp/models/dashboard';
import { createAction, props } from '@ngrx/store';

export const fnTotalProductionSuccess = createAction(
  '[Finance API] Load fnTotalProduction Success',
  props<{ value: number, trendVal: number, totalProdChartData: FnTotalProductionItem[] }>()
);

export const fnTotalProductionFailure = createAction(
  '[Finance API] Load fnTotalProduction Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fnTotalCollectionSuccess = createAction(
  '[Finance API] Load fnTotalCollection Success',
  props<{ 
    value: number,
    trendVal: number,                 
    collectionChartData: FnTotalCollectionItem[] 
  }>()
);

export const fnTotalCollectionFailure = createAction(
  '[Finance API] Load fnTotalCollection Failure',
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
  props<{ expensesData: FnExpensesDataItem[], production: number }>()
);

export const fnExpensesFailure = createAction(
  '[Finance API] Load fnExpenses Failure',
  props<{
      error: JeeveError;
  }>()
);

export const fnProductionByClinicianSuccess = createAction(
  '[Finance API] Load fnProductionByClinician Success',
  props<{ 
    productionChartData: FnProductionByClinicianItem[], 
    prodByClinicianTotal: number }>()
);

export const fnProductionByClinicianFailure = createAction(
  '[Finance API] Load fnProductionByClinician Failure',
  props<{
      error: JeeveError;
  }>()
);

export const fnProductionPerVisitSuccess = createAction(
  '[Finance API] Load fnProductionPerVisit Success',
  props<{ 
    prodPerVisitData: FnProductionPerVisitItem[], 
    prodPerVisitTotal: number,
    prodPerVisitTrendTotal: number
   }>()
);

export const fnProductionPerVisitFailure = createAction(
  '[Finance API] Load fnProductionPerVisit Failure',
  props<{
      error: JeeveError;
  }>()
);

export const fnTotalDiscountsSuccess = createAction(
  '[Finance API] Load fnTotalDiscounts Success',
  props<{ 
    totalDiscountChartData: FnTotalDiscountItem[], 
    totalDiscountTotal: number,
    totalDiscountTrendTotal: number
   }>()
);

export const fnTotalDiscountsFailure = createAction(
  '[Finance API] Load fnTotalDiscounts Failure',
  props<{
      error: JeeveError;
  }>()
);
