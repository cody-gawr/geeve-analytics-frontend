import { ActiveTreatmentStatus, TreatmentStatus } from '@/newapp/enums/treatment-status.enum';
import { ConversionCodeUpsertDto } from '@/newapp/models/conversion-tracker';
import { createAction, props } from '@ngrx/store';

export const loadConversionCodes = createAction(
  '[Conversion Tracker Page] Load Conversion Codes',
  props<{ clinicId: number }>(),
);

export const selectConversionCode = createAction(
  '[Conversion Tracker Page] Select Conversion Code',
  props<{ id: number }>(),
);

export const loadConversionTrackers = createAction(
  '[Conversion Tracker Page] Load Conversion Trackers',
  props<{
    clinicId: number;
    providerId: number;
    startDate: string;
    endDate: string;
    consultCode: string;
  }>(),
);

export const updateConversionTracker = createAction(
  '[Conversion Tracker Page] Update Conversion Tracker',
  props<{
    recordId: number;
    updatePayload: { treatmentStatus?: TreatmentStatus; notes?: string };
    payload: {
      clinicId: number;
      providerId: number;
      startDate: string;
      endDate: string;
      consultCode: string;
    };
  }>(),
);

export const createConversionCode = createAction(
  '[Conversion Tracker Page] Create Conversion Code',
  props<{
    clinicId: number;
    consultCode: string;
  }>(),
);

export const deleteConversionCode = createAction(
  '[Conversion Tracker Page] Delete Conversion Code',
  props<{
    clinicId: number;
    recordId: number;
  }>(),
);

export const upsertConversionCode = createAction(
  '[Conversion Tracker Page] Upsert Conversion Code',
  props<{
    clinicId: number;
    conversionCodePayload: ConversionCodeUpsertDto;
  }>(),
);

export const createConversionCodeValue = createAction(
  '[Conversion Tracker Page] Create Conversion Code Value',
  props<{
    clinicId: number;
    conversionCodeId: number;
    treatmentStatus: ActiveTreatmentStatus;
    code: string;
  }>(),
);

export const deleteConversionCodeValue = createAction(
  '[Conversion Tracker Page] Delete Conversion Code Value',
  props<{
    clinicId: number;
    recordId: number;
  }>(),
);

export const loadConversionTrackerMetrics = createAction(
  '[Conversion Tracker Page] Load Conversion Tracker Metrics',
  props<{ clinicId: number }>(),
);
