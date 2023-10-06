import { createAction, props } from '@ngrx/store';
import {
  FdFtaRatioApiResponse,
  FdFtaRatioTrendApiResponse,
  FdNumTicksApiResponse,
  FdNumTicksTrendApiResponse,
  FdReappointRateApiResponse,
  FdReappointRateTrendApiResponse,
  FdRecallRateApiResponse,
  FdRecallRateTrendApiResponse,
  FdUtaRatioApiResponse,
  FdUtaRatioTrendApiResponse,
  FdUtilisationRateApiResponse,
  FdUtilisationRateByDayApiResponse,
  FdUtilisationRateTrendApiResponse,
} from '@/newapp/models/dashboard/front-desk';

export const fdUtilisationRateSuccess = createAction(
  '[FrontDesk API] Load fdUtilisationRate Success',
  props<{ fdUtilisationRateData: FdUtilisationRateApiResponse }>()
);

export const fdUtilisationRateFailure = createAction(
  '[FrontDesk API] Load fdUtilisationRate Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdUtilisationRateTrendSuccess = createAction(
  '[FrontDesk API] Load fdUtilisationRateTrend Success',
  props<{ fdUtilisationRateTrendData: FdUtilisationRateTrendApiResponse }>()
);

export const fdUtilisationRateTrendFailure = createAction(
  '[FrontDesk API] Load fdUtilisationRateTrend Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdUtilisationRateByDaySuccess = createAction(
  '[FrontDesk API] Load fdUtilisationRateByDay Success',
  props<{ fdUtilisationRateByDayData: FdUtilisationRateByDayApiResponse }>()
);

export const fdUtilisationRateByDayFailure = createAction(
  '[FrontDesk API] Load fdUtilisationRateByDay Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdRecallRateSuccess = createAction(
  '[FrontDesk API] Load fdRecallRate Success',
  props<{ fdRecallRateData: FdRecallRateApiResponse }>()
);

export const fdRecallRateFailure = createAction(
  '[FrontDesk API] Load fdRecallRate Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdRecallRateTrendSuccess = createAction(
  '[FrontDesk API] Load fdRecallRateTrend Success',
  props<{ fdRecallRateTrendData: FdRecallRateTrendApiResponse }>()
);

export const fdRecallRateTrendFailure = createAction(
  '[FrontDesk API] Load fdRecallRateTrend Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdReappointRateSuccess = createAction(
  '[FrontDesk API] Load fdReappointRate Success',
  props<{ fdReappointRateData: FdReappointRateApiResponse }>()
);

export const fdReappointRateFailure = createAction(
  '[FrontDesk API] Load fdReappointRate Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdReappointRateTrendSuccess = createAction(
  '[FrontDesk API] Load fdReappointRateTrend Success',
  props<{ fdReappointRateTrendData: FdReappointRateTrendApiResponse }>()
);

export const fdReappointRateTrendFailure = createAction(
  '[FrontDesk API] Load fdReappointRateTrend Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdNumTicksSuccess = createAction(
  '[FrontDesk API] Load fdNumTicks Success',
  props<{ fdNumTicksData: FdNumTicksApiResponse }>()
);

export const fdNumTicksFailure = createAction(
  '[FrontDesk API] Load fdNumTicks Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdNumTicksTrendSuccess = createAction(
  '[FrontDesk API] Load fdNumTicksTrend Success',
  props<{ fdNumTicksTrendData: FdNumTicksTrendApiResponse }>()
);

export const fdNumTicksTrendFailure = createAction(
  '[FrontDesk API] Load fdNumTicksTrend Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdFtaRatioSuccess = createAction(
  '[FrontDesk API] Load fdFtaRatio Success',
  props<{ fdFtaRatioData: FdFtaRatioApiResponse }>()
);

export const fdFtaRatioFailure = createAction(
  '[FrontDesk API] Load fdFtaRatio Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdFtaRatioTrendSuccess = createAction(
  '[FrontDesk API] Load fdFtaRatioTrend Success',
  props<{ fdFtaRatioTrendData: FdFtaRatioTrendApiResponse }>()
);

export const fdFtaRatioTrendFailure = createAction(
  '[FrontDesk API] Load fdFtaRatioTrend Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdUtaRatioSuccess = createAction(
  '[FrontDesk API] Load fdUtaRatio Success',
  props<{ fdUtaRatioData: FdUtaRatioApiResponse }>()
);

export const fdUtaRatioFailure = createAction(
  '[FrontDesk API] Load fdUtaRatio Failure',
  props<{
    error: JeeveError;
  }>()
);

export const fdUtaRatioTrendSuccess = createAction(
  '[FrontDesk API] Load fdUtaRatioTrend Success',
  props<{ fdUtaRatioTrendData: FdUtaRatioTrendApiResponse }>()
);

export const fdUtaRatioTrendFailure = createAction(
  '[FrontDesk API] Load fdUtaRatioTrend Failure',
  props<{
    error: JeeveError;
  }>()
);
