export interface ChartTip {
  title: string;
  info: string;
}

export interface ChartTipsApiResponse {
  app: string;
  data: { [key: number]: ChartTip };
}

export interface FnTotalProductionApiResponse {
  app: string;
  data: FnTotalProductionItem[];
  goals: number;
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FnTotalProductionTrendApiResponse {
  app: string;
  data: FnTotalProductionItem[];
  goals: number;
  message: string;
  status: string | number;
}

export interface FnTotalCollectionApiResponse {
  app: string;
  data: FnTotalCollectionItem[];
  goals: number;
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FnTotalCollectionTrendApiResponse {
  app: string;
  data: FnTotalCollectionItem[];
  message: string;
  status: string | number;
}

export interface FnNetProfitApiResponse {
  app: string;
  data: number;
  message: string;
  status: string | number;
}

export interface FnNetProfitTrendApiResponse {
  app: string;
  data: FnNetProfitTrendItem[];
  message: string;
  status: string | number;
}

export interface FnNetProfitPercentTrendApiResponse {
  app: string;
  data: FnNetProfitPercentTrendItem[];
  message: string;
  status: string | number;
}

export interface FnNetProfitTrendItem {
  clinicId: number;
  clinicName: string;
  month: number;
  netProfit: string | number;
  year: number;
  yearMonth: string;
}

export interface FnNetProfitPercentTrendItem {
  clinicId: number;
  clinicName: string;
  collection: string | number;
  month: number;
  netProfit: string | number;
  netProfitPercent: string | number;
  year: number;
  yearMonth: string;
}

export interface FnNetProfitParams {
  clinicId: string | number;
  startDate: string;
  endDate: string;
  duration: string;
  queryWhEnabled: number;
  connectedWith?: string;
}

export interface FnExpensesApiResponse {
  app: string;
  data: FnExpensesDataItem[];
  dataTa: number;
  message: string;
  production: number;
  productions: FnProduction[];
  status: string | number;
}

export interface FnExpensesTrendApiResponse {
  app: string;
  data: FnExpensesDataItem[];
  durations: string[];
  message: string;
  status: string | number;
}

export interface FnProductionByClinicianApiResponse {
  app: string;
  data: FnProductionByClinicianItem[];
  mesage: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FnProdByClinicianTrendApiResponse {
  app: string;
  data: FnProdByClinicianTrendItem[];
  mesage: string;
  status: string | number;
  total: number;
}

export interface FnProdByClinicianTrendItem {
  duration: string;
  val: Array<{
    prodPerClinician?: string;
    providerName?: string;
    production?: string;
    clinicName?: string;
    clinicId?: string | number;
  }>;
}

export interface FnProductionPerVisitApiResponse {
  app: string;
  data: FnProductionPerVisitItem[];
  mesage: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FnProdPerVisitTrendApiResponse {
  app: string;
  data: FnProductionPerVisitItem[];
  mesage: string;
  status: string | number;
}

export interface FnTotalDiscountItem {
  clinicId: string | number;
  clinicName: string;
  day: null | unknown;
  discounts: string | number;
  month: null | unknown;
  providerId: string | number;
  providerName: string;
  year: null | unknown;
  yearMonth: null | unknown;
}

export interface FnTotalDiscountsApiResponse {
  app: string;
  data: FnTotalDiscountItem[];
  mesage: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface FnTotalDiscountsTrendApiResponse {
  app: string;
  data: FnTotalDiscountItem[];
  mesage: string;
  status: string | number;
}

export interface FnProductionByClinicianItem {
  clinicId: string | number;
  clinicName: string;
  day: null | unknown;
  month: null | unknown;
  prodPerClinician: string | number;
  productionPerClinic: string | number;
  productionPerProvider: string | number;
  providerId: string | number;
  providerName: string;
  year: null | unknown;
  yearMonth: null | unknown;
}

export interface FnProductionPerVisitItem {
  clinicId: string | number;
  clinicName: string;
  day: null | unknown;
  month: null | unknown;
  numVisits: string | number;
  prodPerVisit: string | number;
  production: string | number;
  year: null | unknown;
  yearMonth: null | unknown;
}

export interface FnExpensesDataItem {
  accountName: string;
  clinicId: number;
  clinicName: string;
  expense: number;
  month: null | unknown;
  year: null | unknown;
  yearMonth: null | unknown;
}

export interface FnTotalProductionItem {
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
}

export interface FnTotalCollectionItem {
  clinicId: string | number;
  clinicName: string;
  collection: string | number;
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
}
