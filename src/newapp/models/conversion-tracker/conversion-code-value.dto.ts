import { TreatmentStatus } from '@/newapp/enums/treatment-status.enum';

export interface ConversionCodeValueDto {
  record_id: number;
  conversion_code_id: number;
  type: TreatmentStatus;
  code: string;
}
