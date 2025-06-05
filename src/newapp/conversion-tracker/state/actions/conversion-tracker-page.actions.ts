import { ConversionCode } from '@/newapp/models/conversion-tracker/conversion-code.model';
import { createAction, props } from '@ngrx/store';

export const loadConversionCodes = createAction(
  '[Conversion Tracker Page] Load Conversion Codes',
  props<{ clinicId: number }>(),
);
