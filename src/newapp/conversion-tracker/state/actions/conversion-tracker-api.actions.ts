import { JeeveError } from '@/newapp/models';
import { ConversionCode } from '@/newapp/models/conversion-tracker/conversion-code.model';
import { createAction, props } from '@ngrx/store';

export const loadConversionCodesSuccess = createAction(
  '[Conversion Tracker API] Load Conversion Trackers Success',
  props<{ conversionCodes: ConversionCode[] }>(),
);

export const loadConversionCodesFailure = createAction(
  '[Conversion Tracker API] Load Conversion Trackers Failure',
  props<{
    error: JeeveError;
  }>(),
);
