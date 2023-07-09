import { Clinic } from '../clinic';

export interface DailyScheduleItem {
  index?: number;
  position?: number;
  clinicId: number;
  clinicName: string;
  procedureName: string;
  monthsToProcess?: number;
  monthsToProcessUpdated?: number;
  procedureId: number;
  enabled?: boolean;
  exists?: boolean;
}

export interface HourlyScheduleItem {
  index?: number;
  position?: number;
  clinicId: number;
  clinicName: string;
  procedureName: string;

  procedureId: number;
  monthsToProcess?: number;
  monthsToProcessUpdated?: number;
  startTime?: string;
  startTimeUpdated?: string;
  endTime?: string;
  endTimeUpdated?: string;
  enabled?: boolean;
  exists?: boolean;
}

export type T_SP_TYPE =
  | 'Clinic Total'
  | 'Clinic Monthly'
  | 'Dentist Total'
  | 'Dentist Monthly';
export type T_MODE = 'clinic' | 'provider';

export interface WarehouseProcedureItem {
  position?: number;
  id?: number;
  spCall: string;
  spCallUpdated?: string;
  spType: T_SP_TYPE;
  spTypeUpdated?: T_SP_TYPE;
  mode: T_MODE;
  modeUpdated?: T_MODE;
  whTable: string;
  whTableUpdated?: string;
}

export interface WarehouseValidatorItem {
  id?: number;
  spName: string;
  spNameUpdated?: string;
  clinicId: string | number;
  clinicIdUpdated?: string | number;
  startDate: string;
  startDateUpdated?: string;
  endDate: string;
  endDateUpdated?: string;
  providerId: number | string;
  providerIdUpdated?: number | string;
  isGroupBy: number | string;
  isGroupByUpdated?: number | string;
  trendType: number | string;
  trendTypeUpdated?: number | string;
  providerType: number | string;
  providerTypeUpdated?: number | string;
  // isDebugMode: number | string;
  // isDebugModeUpdated?: number | string;
  dbServer: string;
  dbServerUpdated?: string;
  dbName: string;
  dbNameUpdated?: string;
  compareId: number | string;
  compareIdUpdated?: number | string;
  enabled: boolean;
  enabledUpdated?: boolean;
  //childs?: Omit<WarehouseValidatorItem, "childs">[]
}

export interface WarehouseValidatorHistoryItem {
  id: number;
  totalSps: number;
  successes: number;
  failures: number;
  noOutputs: number;
  createdAt: string;
}

export interface WarehouseSchedulerInfo {
  clinics?: Pick<Clinic, 'id' | 'clinicName'>[];
  procedures?: WarehouseProcedureItem[];
}

export interface WarehouseSchedulerInfoApiResponse {
  data: WarehouseSchedulerInfo;
}

export interface AddDailySchedulePrepareApiResponse {
  data: DailyScheduleItem[];
}

export interface WarehouseScheduleHistoryItem {
  id: number;
  startTime: string;
  //scheduleType: 'Hourly' | 'Daily';
  totalJobs: number;
  successes: number;
  failures: number;
  inProgress: boolean;
}
