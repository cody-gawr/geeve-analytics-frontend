import { TreatmentStatus } from '@/newapp/enums/treatment-status.enum';

export interface ConversionTrackerDto {
  record_id: number;
  clinic_id: number;
  provider_id: number;
  treatment_id: number;
  consult: string;
  consult_date: string;
  patient_name: string;
  patient_phone: string;
  treatment_status: TreatmentStatus;
  converted_date: string | null;
  notes: string | null;
  is_deleted: false;
}
