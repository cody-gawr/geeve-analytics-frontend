import { ConversionCodeValueDto } from './conversion-code-value.dto';

export interface ConversionCodeDto {
  record_id: number;
  clinic_id: number;
  consult_code: string;
  code_values: ConversionCodeValueDto[];
}
