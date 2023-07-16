export type API_ENDPOINTS = 'ctGetPageTips' | 'clinicGetAccountingPlatform';
export type CONNECT_WITH_PLATFORM = 'xero' | 'myob' | 'none';
export interface ChartTip {
  title: string;
  info: string;
}

export interface ChartTipsApiResponse {
  app: string;
  data: {[key: number]: ChartTip };
}

export interface FnTotalProductionApiResponse {
  app: string;
  data: {
    clinicId: string | number;
    clinicName: string;
    day: unknown | null;
    month: unknown | null;
    production: string | number;
    providerId: unknown | null;
    providerName: string | null;
    providerType: string | null;
    week: unknown | null;
    weekEnd: unknown | null;
    weekStart: unknown | null;
    year: unknown | null;
    yearMonth: unknown | null;
  }[];
  goals: number;
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FnNetProfitApiResponse {
  app: string;
  data: number;
  message: string;
  status: string | number;
}

export interface FnNetProfitParams {
  clinicId: number,
  startDate: string,
  endDate: string,
  duration: string ,
  queryWhEnabled: number,
  connectedWith?: string
}

export interface FnExpensesApiResponse {
  app: string;
  data: ExpensesDataItem[];
  dataTa: number;
  message: string;
  production: number;
  status: string | number;
}

export interface ExpensesDataItem {
  accountName: string;
  clinicId: number;
  clinicName: string;
  expense: number;
  month: null | unknown;
  year: null | unknown
  yearMonth: null | unknown;
}