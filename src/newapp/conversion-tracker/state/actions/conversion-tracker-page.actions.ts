import { TreatmentStatus } from '@/newapp/enums/treatment-status.enum';
import { ConversionCode } from '@/newapp/models/conversion-tracker/conversion-code.model';
import { createAction, props } from '@ngrx/store';

export const loadConversionCodes = createAction(
  '[Conversion Tracker Page] Load Conversion Codes',
  props<{ clinicId: number }>(),
);

export const selectConversionCode = createAction(
  '[Conversion Tracker Page] Select Conversion Codes',
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
