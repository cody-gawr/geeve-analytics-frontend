import { JeeveError } from '@/newapp/models';
import { createAction, props } from '@ngrx/store';

export const loadFnTotalProduction = createAction(
  '[Fanance Page] Load fnTotalProduction',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>()
);

export const loadFnTotalProductionTrend = createAction(
  '[Fanance Page] Load fnTotalProductionTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>()
);
export const loadFnTotalCollection = createAction(
  '[Fanance Page] Load fnTotalCollection',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>()
);

export const loadFnTotalCollectionTrend = createAction(
  '[Fanance Page] Load fnTotalCollectionTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>()
);

export const loadFnNetProfit = createAction(
  '[Fanance Page] load fnNetProfit',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
    connectedWith?: string;
  }>()
);

export const loadFnNetProfitTrend = createAction(
  '[Fanance Page] load fnNetProfitTrend',
  props<{
    clinicId: number | string;
    mode: string;
    connectedWith: string;
    queryWhEnabled: number;
  }>()
);

export const loadFnNetProfitPercentageTrend = createAction(
  '[Fanance Page] load fnNetProfitPercentageTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
    connectedWith?: string;
  }>()
);

export const loadFnNetProfitPercentage = createAction(
  '[Fanance Page] load fnNetProfitPercentage',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
    connectedWith?: string;
  }>()
);

export const loadFnExpenses = createAction(
  '[Fanance Page] load fnExpenses',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
    connectedWith?: string;
  }>()
);

export const loadFnExpensesTrend = createAction(
  '[Fanance Page] load fnExpensesTrend',
  props<{
    clinicId: number | string;
    mode: string;
    connectedWith: string;
    queryWhEnabled: number;
  }>()
);

export const loadFnProductionByClinician = createAction(
  '[Fanance Page] load fnProductionByClinician',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>()
);

export const loadFnProdByClinicianTrend = createAction(
  '[Fanance Page] load fnProductionByClinicianTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>()
);

export const loadFnProductionPerVisit = createAction(
  '[Fanance Page] load fnProductionPerVisit',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>()
);

export const loadFnProdPerVisitTrend = createAction(
  '[Fanance Page] load fnProductionPerVisitTrend',
  props<{
    clinicId: string | number;
    mode: string;
    queryWhEnabled: number;
  }>()
);

export const loadFnTotalDiscounts = createAction(
  '[Fanance Page] load fnTotalDiscounts',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>()
);

export const loadFnTotalDiscountsTrend = createAction(
  '[Fanance Page] load fnTotalDiscountsTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>()
);

export const setTrendProfitChart = createAction(
  '[Fanance Page] load Trend Profit Chart',
  props<{
    chartName: string;
  }>()
);

export const setErrors = createAction(
  '[Fanance Page] set Errors',
  props<{
    errors: JeeveError[];
  }>()
);
