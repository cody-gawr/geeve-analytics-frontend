import { ConversionCode } from './conversion-code.model';

export interface ConversionCodeDialogData {
  mode: 'Create' | 'Update';
  conversionCode?: ConversionCode;
}
