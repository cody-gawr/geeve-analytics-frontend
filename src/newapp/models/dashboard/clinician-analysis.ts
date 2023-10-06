/** None Trend */
// Production
export interface CaDentistProductionDataItem {
  clinicId: string | number;
  clinicName: string;
  day: unknown;
  month: unknown;
  production: string | number;
  providerId: string | number;
  providerName: string;
  providerType: 'OHT' | string;
  week: unknown;
  weekEnd: unknown;
  weekStart: unknown;
  year: unknown;
  yearMonth: unknown;
}

export interface CaDentistProductionApiResponse {
  app: string;
  data: CaDentistProductionDataItem[];
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
  goals: string | number;
}

export interface CaDentistProductionDentistApiResponse {
  app: string;
  data: CaDentistProductionDataItem[];
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
  goals: string | number;
}

export interface CaDentistProductionOhtApiResponse {}

// Collection
export interface CaCollectionApiResponse {}

export interface CaCollectionDentistsApiResponse {}

export interface CaCollectionOhtApiResponse {}

export interface CaCollectionExpApiResponse {}

export interface CaCollectionExpDentistsApiResponse {}

export interface CaCollectionExpOhtApiResponse {}

/** TREND **/
// Production
export interface CaDentistProductionTrendApiResponse {}

export interface CaDentistProductionDentistTrendApiResponse {}

export interface CaDentistProductionOhtTrendApiResponse {}

// Collection
export interface CaCollectionTrendApiResponse {}

export interface CaCollectionDentistsTrendApiResponse {}

export interface CaCollectionOhtTrendApiResponse {}
