import { TreatmentStatus } from '@/newapp/enums/treatment-status.enum';
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

export const updateConversionTrackerTreatmentStatus = createAction(
  '[Conversion Tracker Page] Update Treatment Status of a Conversion Tracker',
  props<{
    recordId: number;
    treatmentStatus: TreatmentStatus;
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
