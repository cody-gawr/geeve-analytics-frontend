import { JeeveError } from "@/newapp/models";
import {
  FnTotalDiscountItem,
  FnExpensesDataItem,
  FnProductionByClinicianItem,
  FnProductionPerVisitItem,
  FnTotalProductionItem,
  FnTotalCollectionItem,
  FnNetProfitTrendItem,
  FnNetProfitPercentTrendItem,
  FnProdByClinicianTrendItem,
} from "@/newapp/models/dashboard/finance";
import { createAction, props } from "@ngrx/store";

export const fnTotalProductionSuccess = createAction(
  "[Finance API] Load fnTotalProduction Success",
  props<{
    value: number;
    trendVal: number;
    prodData: FnTotalProductionItem[];
  }>()
);

export const fnTotalProductionFailure = createAction(
  "[Finance API] Load fnTotalProduction Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnTotalProductionTrendSuccess = createAction(
  "[Finance API] Load fnTotalProductionTrend Success",
  props<{ prodTrendData: FnTotalProductionItem[] }>()
);

export const fnTotalProductionTrendFailure = createAction(
  "[Finance API] Load fnTotalProductionTrend Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnTotalCollectionSuccess = createAction(
  "[Finance API] Load fnTotalCollection Success",
  props<{
    value: number;
    trendVal: number;
    collectionData: FnTotalCollectionItem[];
  }>()
);

export const fnTotalCollectionFailure = createAction(
  "[Finance API] Load fnTotalCollection Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnTotalCollectionTrendSuccess = createAction(
  "[Finance API] Load fnTotalCollectionTrend Success",
  props<{
    collectionTrendData: FnTotalCollectionItem[];
  }>()
);

export const fnTotalCollectionTrendFailure = createAction(
  "[Finance API] Load fnTotalCollectionTrend Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnNetProfitSuccess = createAction(
  "[Finance API] Load fnNetProfit Success",
  props<{ value: number }>()
);

export const fnNetProfitFailure = createAction(
  "[Finance API] Load fnNetProfit Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnNetProfitTrendSuccess = createAction(
  "[Finance API] Load fnNetProfitTrend Success",
  props<{ netProfitTrendData: FnNetProfitTrendItem[] }>()
);

export const fnNetProfitTrendFailure = createAction(
  "[Finance API] Load fnNetProfitTrend Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnNetProfitPercentTrendSuccess = createAction(
  "[Finance API] Load fnNetProfitPercentageTrend Success",
  props<{ netProfitPercentTrendData: FnNetProfitPercentTrendItem[] }>()
);

export const fnNetProfitPercentTrendFailure = createAction(
  "[Finance API] Load fnNetProfitPercentageTrend Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnNetProfitPercentageSuccess = createAction(
  "[Finance API] Load fnNetProfitPercentage Success",
  props<{ value: number }>()
);

export const fnNetProfitPercentageFailure = createAction(
  "[Finance API] Load fnNetProfitPercentage Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnExpensesSuccess = createAction(
  "[Finance API] Load fnExpenses Success",
  props<{ expensesData: FnExpensesDataItem[]; production: number }>()
);

export const fnExpensesFailure = createAction(
  "[Finance API] Load fnExpenses Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnExpensesTrendSuccess = createAction(
  "[Finance API] Load fnExpensesTrend Success",
  props<{ expensesTrendData: FnExpensesDataItem[]; durations: string[] }>()
);

export const fnExpensesTrendFailure = createAction(
  "[Finance API] Load fnExpensesTrend Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnProductionByClinicianSuccess = createAction(
  "[Finance API] Load fnProductionByClinician Success",
  props<{
    prodByClinicData: FnProductionByClinicianItem[];
    prodByClinicianTotal: number;
  }>()
);

export const fnProductionByClinicianFailure = createAction(
  "[Finance API] Load fnProductionByClinician Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnProdByClinicianTrendSuccess = createAction(
  "[Finance API] Load fnProductionByClinicianTrend Success",
  props<{
    prodByClinicTrendData: FnProdByClinicianTrendItem[];
  }>()
);

export const fnProdByClinicianTrendFailure = createAction(
  "[Finance API] Load fnProductionByClinicianTrend Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnProductionPerVisitSuccess = createAction(
  "[Finance API] Load fnProductionPerVisit Success",
  props<{
    prodPerVisitData: FnProductionPerVisitItem[];
    prodPerVisitTotal: number;
    prodPerVisitTrendTotal: number;
  }>()
);

export const fnProductionPerVisitFailure = createAction(
  "[Finance API] Load fnProductionPerVisit Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnProductionPerVisitTrendSuccess = createAction(
  "[Finance API] Load fnProductionPerVisitTrend Success",
  props<{ prodPerVisitTrendData: FnProductionPerVisitItem[] }>()
);

export const fnProductionPerVisitTrendFailure = createAction(
  "[Finance API] Load fnProductionPerVisitTrend Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnTotalDiscountsSuccess = createAction(
  "[Finance API] Load fnTotalDiscounts Success",
  props<{
    totalDiscountData: FnTotalDiscountItem[];
    totalDiscountTotal: number;
    totalDiscountTrendTotal: number;
  }>()
);

export const fnTotalDiscountsFailure = createAction(
  "[Finance API] Load fnTotalDiscounts Failure",
  props<{
    error: JeeveError;
  }>()
);

export const fnTotalDiscountsTrendSuccess = createAction(
  "[Finance API] Load fnTotalDiscountsTrend Success",
  props<{
    totalDiscountTrendData: FnTotalDiscountItem[];
  }>()
);

export const fnTotalDiscountsTrendFailure = createAction(
  "[Finance API] Load fnTotalDiscountsTrend Failure",
  props<{
    error: JeeveError;
  }>()
);
