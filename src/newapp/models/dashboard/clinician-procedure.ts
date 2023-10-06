export interface CpPredictorAnalysisApiResponse {
  app: string;
  status: number | string;
  message: string;
  data: CpPredictorAnalysisDataItem[];
}

export interface CpPredictorAnalysisDataItem {
  clinicId: string | number;
  clinicName: string;
  year: null | unknown;
  month: null;
  yearMonth: null;
  providerId: string | number;
  providerName: string;
  whitening: string | number;
  impCrowns: string;
  crowns: string | number;
  splints: string | number;
  rct: string | number;
  perio: string | number;
  extract: string | number;
  ssCrowns: string | number;
  compVeneers: string | number;
}

export interface CpPredictorSpecialistAnalysisApiResponse {
  app: string;
  status: number | string;
  message: string;
  data: CpPredictorSpecialistAnalysisDataItem[];
  goals: number;
}

export interface CpPredictorSpecialistAnalysisDataItem {
  clinicId: string | number;
  clinicName: string;
  year: null | unknown;
  month: null;
  yearMonth: null;
  providerId: string | number;
  providerName: string;
  impSurg: string | number;
  orthoFix: string | number;
  orthoAlign: string | number;
  sleep: string | number;
  perioSurg: string | number;
  endoRetreat: string | number;
  veneersInd: string | number;
}

export interface CpRevPerProcedureApiResponse {
  app: string;
  status: number | string;
  message: string;
  data: CpRevPerProcedureDataItem[];
  goals: number;
}

export interface CpRevPerProcedureDataItem {
  clinicId: string | number;
  clinicName: string;
  year: null | unknown;
  month: null | unknown;
  day: null | unknown;
  yearMonth: null;
  providerId: string | number;
  providerName: string;
  treatCode: string | number;
  itemName: string;
  total: string | number;
}

export interface CpPredictorRatioApiResponse {
  app: string;
  status: number | string;
  message: string;
  data: CpPredictorRatioDataItem[];
  goals: number[];
}

export interface CpPredictorRatioDataItem {
  clinicId: string | number;
  clinicName: string;
  year: null | unknown;
  month: null | unknown;
  yearMonth: null;
  providerId: string | number;
  providerName: string;
  type: string;
  firstValue: string | number;
  secondValue: string | number;
  ratio: string;
  totalTa: string;
}

export interface CpReferralsApiResponse {
  app: string;
  status: number | string;
  message: string;
  data: CpReferralsDataItem[];
  goals: number;
  total: number;
  totalTa: {
    internal: string | number;
    external: string | number;
    total: string | number;
  };
  totalAverage: number;
}

export interface CpReferralsDataItem {
  clinicId: string | number;
  clinicName: string;
  year: null | unknown;
  month: null | unknown;
  day: null | unknown;
  yearMonth: null;
  providerId: string | number;
  providerName: string;
  treatItemName: string;
  internal: number | string;
  external: number | string;
  duration: string;
  total: number | string;
  val?: any;
}
