export interface ChartDescParams<T> {
  chartDescription?: T;
  clinicId: number | string;
  mode?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  queryWhEnabled?: number;
  connectedWith?: CONNECT_WITH_PLATFORM;
  clinician?: string | number;
  dentistId?: string | number;
}
