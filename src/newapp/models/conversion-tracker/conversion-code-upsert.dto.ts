import { ConversionCodeValueUpsertDto } from './conversion-code-value-upsert.dto';

export interface ConversionCodeUpsertDto {
  recordId?: number;
  clinicId?: number;
  consultCode: string;
  codeValues?: ConversionCodeValueUpsertDto[];
}
