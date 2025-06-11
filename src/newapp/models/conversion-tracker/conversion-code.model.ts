import { ConversionCodeValue } from './conversion-code-value.model';

export interface ConversionCode {
  recordId: number;
  clinicId: number;
  consultCode: string;
  codeValues: ConversionCodeValue[];
}
