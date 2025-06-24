import { ActiveTreatmentStatus } from '@/newapp/enums/treatment-status.enum';
import { JeeveError } from '@/newapp/models';
import {
  ConversionCodeValue,
  ConversionTracker,
  ConversionTrackerMetrics,
} from '@/newapp/models/conversion-tracker';
import { ConversionCode } from '@/newapp/models/conversion-tracker/conversion-code.model';
import { createAction, props } from '@ngrx/store';

export const loadConversionCodesSuccess = createAction(
  '[Conversion Tracker API] Load Conversion Codes Success',
  props<{ conversionCodes: ConversionCode[] }>(),
);

export const loadConversionCodesFailure = createAction(
  '[Conversion Tracker API] Load Conversion Codes Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const loadConversionTrackersSuccess = createAction(
  '[Conversion Tracker API] Load Conversion Trackers Success',
  props<{ conversionTrackers: ConversionTracker[] }>(),
);

export const loadConversionTrackersFailure = createAction(
  '[Conversion Tracker API] Load Conversion Trackers Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const updateConversionTrackerTreatmentStatusSuccess = createAction(
  '[Conversion Tracker API] Update Treatment Status of a Conversion Tracker Success',
  props<{
    affectedCount: number;
  }>(),
);

export const updateConversionTrackerTreatmentStatusFailure = createAction(
  '[Conversion Tracker API] Update Treatment Status of a Conversion Tracker Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const createConversionCodeSuccess = createAction(
  '[Conversion Tracker API] Create Conversion Code Success',
  props<{
    conversionCode: ConversionCode;
  }>(),
);

export const createConversionCodeFailure = createAction(
  '[Conversion Tracker API] Create Conversion Code Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const upsertConversionCodeSuccess = createAction(
  '[Conversion Tracker API] Upsert Conversion Code Success',
  props<{
    conversionCode: ConversionCode;
  }>(),
);

export const upsertConversionCodeFailure = createAction(
  '[Conversion Tracker API] Upsert Conversion Code Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const deleteConversionCodeSuccess = createAction(
  '[Conversion Tracker API] Delete Conversion Code Success',
  props<{
    deletedCount: number;
  }>(),
);

export const deleteConversionCodeFailure = createAction(
  '[Conversion Tracker API] Delete Conversion Code Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const createConversionCodeValueSuccess = createAction(
  '[Conversion Tracker API] Create Conversion Code Value Success',
  props<{
    conversionCodeValue: ConversionCodeValue;
  }>(),
);

export const createConversionCodeValueFailure = createAction(
  '[Conversion Tracker API] Create Conversion Code Value Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const deleteConversionCodeValueSuccess = createAction(
  '[Conversion Tracker API] Delete Conversion Code Value Success',
  props<{
    deletedCount: number;
  }>(),
);

export const deleteConversionCodeValueFailure = createAction(
  '[Conversion Tracker API] Delete Conversion Code Value Failure',
  props<{
    error: JeeveError;
  }>(),
);

export const loadConversionTrackerMetricsSuccess = createAction(
  '[Conversion Tracker API] Load Conversion Tracker Metrics Success',
  props<{ conversionTrackerMetrics: ConversionTrackerMetrics }>(),
);

export const loadConversionTrackerMetricsFailure = createAction(
  '[Conversion Tracker API] Load Conversion Tracker Metrics Failure',
  props<{ error: JeeveError }>(),
);
