import { TreatmentStatus } from '@/newapp/enums/treatment-status.enum';

export interface ConversionCodeValue {
  recordId: number;
  conversionCodeId: number;
  type: TreatmentStatus;
  code: string;
}
