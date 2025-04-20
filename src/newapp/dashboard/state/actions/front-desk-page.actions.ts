import { createAction, props } from '@ngrx/store';

export const loadFdUtilisationRate = createAction(
  '[FrontDesk Page] Load fdUtilisationRate',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdUtilisationRateTrend = createAction(
  '[FrontDesk Page] Load fdUtilisationRateTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdUtilisationRateByDay = createAction(
  '[FrontDesk Page] Load fdUtilisationRateByDay',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdRecallRate = createAction(
  '[FrontDesk Page] Load fdRecallRate',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdRecallRateTrend = createAction(
  '[FrontDesk Page] Load fdRecallRateTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdReappointRate = createAction(
  '[FrontDesk Page] Load fdReappointRate',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdReappointRateTrend = createAction(
  '[FrontDesk Page] Load fdReappointRateTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdNumTicks = createAction(
  '[FrontDesk Page] Load fdNumTicks',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdNumTicksTrend = createAction(
  '[FrontDesk Page] Load fdNumTicksTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdFtaRatio = createAction(
  '[FrontDesk Page] Load fdFtaRatio',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdFtaRatioTrend = createAction(
  '[FrontDesk Page] Load fdFtaRatioTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdUtaRatio = createAction(
  '[FrontDesk Page] Load fdUtaRatio',
  props<{
    clinicId: number | string;
    startDate: string;
    endDate: string;
    duration: string;
    queryWhEnabled: number;
  }>(),
);

export const loadFdUtaRatioTrend = createAction(
  '[FrontDesk Page] Load fdUtaRatioTrend',
  props<{
    clinicId: number | string;
    mode: string;
    queryWhEnabled: number;
  }>(),
);

export const setIsByDayData = createAction(
  '[FrontDesk Page] Set isByDayData',
  props<{ value: boolean }>(),
);

export const setErrors = createAction(
  '[FrontDesk API] Set Errors',
  props<{
    errors: JeeveError[];
  }>(),
);
