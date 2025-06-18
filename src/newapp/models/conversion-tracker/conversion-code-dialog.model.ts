import { ConversionCode } from './conversion-code.model';

export interface ConversionCodeDialogData {
  mode: 'create' | 'update';
  conversionCode?: ConversionCode;
}
