import { TreatmentStatus } from '@/newapp/enums/treatment-status.enum';

export interface ConversionTracker {
  recordId: number;
  clinicId: number;
  providerId: number;
  treatmentId: number;
  patientName: string;
  patientPhone: string;
  treatmentStatus: TreatmentStatus;
  isDeleted: false;
}
