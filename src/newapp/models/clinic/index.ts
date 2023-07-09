import { Moment } from 'moment';
import { User } from '../user';

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

export type FPT_UTA = 'status' | 'item';

export interface Clinic {
  // id: number;
  // clinicName: string;
  // pms: string;
  // core: ClinicAppDataCore | null;
  // d4W: ClinicAppDataD4w | null;
  // exact: ClinicAppDataExact | null;
  // myob: ClinicAppDataMyob | null;
  // xero: ClinicAppDataXero | null;
  // setting: ClinicSetting | null;
  // syncHistories: SyncHistory[];
  // dbServer: string;
  // dbName: string;
  // whServer: string;
  // whName: string;
  // user: Pick<User, 'email'>;

  accepted_sms_terms: number;
  address: string;
  clinicEmail: string;
  clinicName: string;
  compare_mode: number;
  config_user: { id: number; clinics_count: number };
  connectedwith: string;
  consultant: string;
  contactName: string;
  created: string;
  daily_task_enable: number;
  datasource: string;
  days: string;
  db_name: string;
  db_server: string;
  equip_list_enable: number;
  fta_uta: string;
  id: number;
  is_deleted: number;
  net_profit_exclusions: string;
  phoneNo: string;
  pms: string;
  sms_enabled: number;
  sr: number;
  timezone: CLINIC_TIMEZONE;
  trial_end_date: string;
  user_id: number;
  utility_ver: string;
  wh_name: string;
  wh_server: string;
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

export type PMS = 'core' | 'd4w' | 'exact' | 'myob' | 'xero';

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
