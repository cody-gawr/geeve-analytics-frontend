export enum FD_CHART_ID {
  utilisation = 15,
  utilisationByDay = 69,
  recallRate = 16,
  reappointRate = 17,
  numberTicks = 20,
  ftaRatio = 18,
  utaRatio = 19
}
export interface FdUtaRatioApiResponse {
  app: string;
  data: FdUtaRatioItem[];
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
  goals: string | number;
}

export interface FdUtaRatioTrendApiResponse {
  app: string;
  data: FdUtaRatioItem[];
  message: string;
  status: string | number;
}

export interface FdUtaRatioItem {
  clinicId: number | string;
  clinicName: string;
  utaRatio: number | string;
  month: null | unknown;
  providerId: null | unknown;
  providerName: null | string;
  totalAppts: number | string;
  totalUta: string | number;
  year: null | unknown;
  yearMonth: null | unknown;
  goals?: number;
}

export interface FdFtaRatioApiResponse {
  app: string;
  data: FdFtaRatioItem[];
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
  goals: number | string;
}

export interface FdFtaRatioTrendApiResponse {
  app: string;
  data: FdFtaRatioItem[];
  message: string;
  status: string | number;
}

export interface FdFtaRatioItem {
  clinicId: number | string;
  clinicName: string;
  ftaRatio: number | string;
  month: null | unknown;
  providerId: null | unknown;
  providerName: null | string;
  totalAppts: number | string;
  totalFta: string | number;
  year: null | unknown;
  yearMonth: null | unknown;
  goals?: number;
}

export interface FdNumTicksApiResponse {
  app: string;
  data: FdNumTicksItem[];
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FdNumTicksTrendApiResponse {
  app: string;
  data: FdNumTicksItem[];
  message: string;
  status: string | number;
}

export interface FdNumTicksItem {
  clinicId: number | string;
  clinicName: string;
  providerId: null | unknown;
  providerName: null | string;
  year: null | unknown;
  yearMonth: null | unknown;
  month: null | unknown;
  numTicks: number | string;
}

export interface FdReappointRateApiResponse {
  app: string;
  data: FdReappointRateItem[];
  message: string;
  status: string | number;
  goals: number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FdReappointRateItem {
  clinicId: number | string;
  clinicName: string;
  month: null | unknown;
  day: null | unknown;
  providerId: null | unknown;
  providerName: null | string;
  reappointRate: string | number;
  reappointments: string | number;
  totalAppts: string | number;
  year: null | unknown;
  yearMonth: null | unknown;
  goals: string | number;
}

export interface FdReappointRateTrendApiResponse {
  app: string;
  data: FdReappointRateItem[];
  message: string;
  status: string | number;
}

export interface FdRecallRateApiResponse {
  app: string;
  data: FdRecallRateItem[];
  message: string;
  status: string | number;
  goals: number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FdRecallRateTrendApiResponse {
  app: string;
  data: FdRecallRateItem[];
  message: string;
  status: string | number;
}

export interface FdRecallRateItem {
  clinicId: number | string;
  clinicName: string;
  month: null | unknown;
  day: null | unknown;
  providerId: null | unknown;
  providerName: null | string;
  recallPatient: string | number;
  recallPercent: string | number;
  totalPatient: string | number;
  year: null | unknown;
  yearMonth: null | unknown;
  goals?: number | string;
}

export interface FdUtilisationRateApiResponse {
  app: string;
  data: FdUtilisationRateItem[];
  message: string;
  status: string | number;
  goals: number | string;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FdUtilisationRateItem {
  appBookId: number | string;
  appBookName: string;
  clinicId: number | string;
  clinicName: string;
  month: null | unknown;
  plannedHour: string | number;
  providerId: null | unknown;
  providerName: null | string;
  utilRate: number | string;
  workedHour: number | string;
  year: null | unknown;
  yearMonth: null | unknown;
  goals?: number | string;
}

export interface FdUtilisationRateTrendApiResponse {
  app: string;
  data: FdUtilisationRateItem[];
  message: string;
  status: string | number;
  goals: number | string;
}

export interface FdUtilisationRateByDayApiResponse {
  app: string;
  data: FdUtilisationRateByDayItem[];
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FdUtilisationRateByDayItem {
  clinicId: string | number;
  clinicName: string;
  dayName: string;
  month: null | unknown;
  plannedHour: string | number;
  utilRate: number | string;
  workedHour: number | string;
  year: null | unknown;
  yearMonth: null | unknown;
}
