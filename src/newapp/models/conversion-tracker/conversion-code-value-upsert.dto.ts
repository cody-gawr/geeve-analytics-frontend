import { TreatmentStatus } from '@/newapp/enums/treatment-status.enum';

export interface ConversionCodeValueUpsertDto {
  recordId?: number;
  conversionCodeId?: number;
  type: TreatmentStatus;
  code: string;
}
