import { Moment } from 'moment';

type CLINIC_TIMEZONE =
  | 'Australia/Lord_Howe'
  | 'Australia/Hobart'
  | 'Australia/Currie'
  | 'Australia/Melbourne'
  | 'Australia/Sydney'
  | 'Australia/Broken_Hill'
  | 'Australia/Brisbane'
  | 'Australia/Lindeman'
  | 'Australia/Adelaide'
  | 'Australia/Darwin'
  | 'Australia/Perth'
  | 'Australia/Eucla';

export interface Clinic {
  acceptedSmsTerms: number;
  address: string;
  clinicEmail: string;
  clinicName: string;
  compare_mode: number;
  configUser: { id: number; clinicsCount: number };
  connectedwith: string;
  consultant: string;
  contactName: string;
  created: string;
  dailyTaskEnable: number;
  datasource: string;
  days: string;
  dbName: string;
  dbServer: string;
  equipListEnable: number;
  ftaUta: string;
  id: number;
  isDeleted: number;
  netProfit_exclusions: string;
  phoneNo: string;
  pms: string;
  smsEnabled: number;
  sr: number;
  timezone: CLINIC_TIMEZONE;
  trialEndDate: string;
  userId: number;
  utility_ver: string;
  whName: string;
  whServer: string;
}

export interface ClinicRow extends Clinic {
  syncSchedule: string | null;
}

export interface ClinicAppData {
  id: number;
  syncMinute: number;
  syncEnabled: boolean;
}

export interface ClinicAppDataCore extends ClinicAppData {
  syncReferralsDays: number; // Referral Details
  syncApptDetailsDays: number; // Appointment Details
  syncApptcreatedDays: number; // Appointment Created
  syncTxperformedDays: number; //
  syncInvcreatedDays: number;
  syncPaymentreceivedDays: number;
  syncTxplansDays: number;
  syncApptlistDays: number;
  syncAvailsDays: number;
}

export interface ClinicAppDataD4w extends ClinicAppData {
  syncD4WAccountingDays: number;
  syncD4WItemsDays: number;
  syncD4WTxplansDays: number;
  syncD4WWorktimeDays: number;
  syncD4WReferralsDays: number;
  syncD4WStatusDays: number;
  syncD4WPatientsDays: number;
}

export interface MasterUser {
  id: number;
  displayName: string;
}

export interface ClinicDBOptions {
  dbServers: string[];
  dbNames: string[];
  whServers: string[];
  whNames: string[];
}

export interface ClinicAppDataExact extends ClinicAppData {}

export interface ClinicAppDataMyob extends ClinicAppData {
  lastSuccessfulSync: string | Date | Moment;
}

export interface ClinicAppDataXero extends ClinicAppData {
  lastSuccessfulSync: string | Date | Moment;
}

export interface ClinicsListApiResponse {
  data: Array<Clinic>;
  message: string;
  status: string;
  total: number;
  hasPrimeClinics: 'yes' | 'no';
}

export interface MasterUsersListApiResponse {
  data: Array<MasterUser>;
}

export interface UpdateClinicDetailResponse {
  data: string;
}

export interface JeeveResponse<T> {
  data: T;
}

export interface ClinicSetting {
  connectedWith: string;
  consultant: string;
}

export interface SyncHistory {
  syncDate: string;
}

export interface UpdateClinicRequest {
  pms: PMS;
  consultant: string;
  dbServer: string;
  dbName: string;
  whServer: string;
  whName: string;
  syncSettings?:
    | ClinicAppDataCore
    | ClinicAppDataD4w
    | ClinicAppDataExact
    | ClinicAppDataMyob
    | ClinicAppDataXero;
}

export interface CreateClinicRequest {
  selectedMasterUserId: number;
  clinicName: string;
  clinicAddress: string;
  contactName: string;
  isSunday: boolean;
  isMonday: boolean;
  isTuesday: boolean;
  isWednesday: boolean;
  isThursday: boolean;
  isFriday: boolean;
  isSaturday: boolean;
  pms: string;
  dataSource?: string | null;
  dbServer: string;
  dbName: string;
  whServer: string;
  whName: string;
}
