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
