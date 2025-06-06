import { TreatmentStatus } from '@/newapp/enums/treatment-status.enum';

export interface ConversionTracker {
  recordId: number;
  clinicId: number;
  providerId: number;
  treatmentId: number;
  consult: string;
  consultDate: string;
  patientName: string;
  patientPhone: string;
  treatmentStatus: TreatmentStatus;
  isDeleted: false;
}
