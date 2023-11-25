export {};
import { Moment } from 'moment';
declare global {
  interface JeeveError {
    api: string;
    message: string;
    status: number;
    errors: any[];
    platform?: string;
  }
  type CONNECT_WITH_PLATFORM = 'xero' | 'myob' | 'none';
  type API_ENDPOINTS = 'ctGetPageTips' | 'clinicGetAccountingPlatform';
  type FPT_UTA = 'status' | 'item';
  type PMS = 'core' | 'd4w' | 'exact' | 'myob' | 'xero';
  type DATE_RANGE_DURATION =
    | 'w'
    | 'm'
    | 'lm'
    | 'q'
    | 'lq'
    | 'cytd'
    | 'lcytd'
    | 'fytd'
    | 'lfytd'
    | 'custom';
  type TREND_MODE = 'off' | 'current' | 'historic';
  type API_TREND_MODE = 'c' | 'h';
  type T_SP_TYPE =
    | 'Clinic Total'
    | 'Clinic Monthly'
    | 'Dentist Total'
    | 'Dentist Monthly';
  type T_MODE = 'clinic' | 'provider';
  type C_AVG_MODE = 'off' | 'average' | 'goal';

  interface CaNoneTrendQueryParams {
    clinicId: string | number;
    startDate: Moment | string;
    endDate: Moment | string;
    duration: DATE_RANGE_DURATION;
    clinician?: string;
    dentistId?: number;
    queryWhEnabled?: number;
  }

  interface CaTrendQueryParams {
    clinicId: string | number;
    dentistId: number;
    mode: API_TREND_MODE;
    queryWhEnabled?: number;
  }
  type CA_API_ENDPOINTS =
    | 'caDentistProduction' // 1
    | 'caDentistProductionDentist'
    | 'caDentistProductionOht'
    | 'caCollection'
    | 'caCollectionDentists'
    | 'caCollectionOht'
    | 'caCollectionExp'
    | 'caCollectionExpDentists'
    | 'caCollectionExpOht'
    | 'caTxPlanAvgProposedFees' // 4
    | 'caTxPlanAvgCompletedFees'
    | 'caNumComplaints' // 7
    | 'caRecallRate' // 6
    | 'caReappointRate'
    | 'caTxPlanCompRate' // 5
    | 'caNumNewPatients' // 3
    | 'caHourlyRate' // 2
    | 'caHourlyRateDentists'
    | 'caHourlyRateOht'
    | 'caCollectionHourlyRate'
    | 'caCollectionHourlyRateDentist'
    | 'caCollectionHourlyRateOht'
    | 'caCollectionExpHourlyRate'
    | 'caCollectionExpHourlyRateDentist'
    | 'caCollectionExpHourlyRateOht';

  type CA_API_ENDPOINTS_TREND =
    | 'caDentistProductionTrend'
    | 'caCollectionTrend'
    | 'caCollectionExpTrend'
    | 'caNumComplaintsTrend'
    | 'caTxPlanAvgProposedFeesTrend'
    | 'caTxPlanAvgCompletedFeesTrend'
    | 'caReappointRateTrend'
    | 'caHourlyRateTrend'
    | 'caCollectionHourlyRateTrend'
    | 'caCollectionExpHourlyRateTrend'
    | 'caNumNewPatientsTrend'
    | 'caTxPlanCompRateTrend'
    | 'caRecallRateTrend';

  type CA_PROD_CHART_NAME = 'Production' | 'Collection' | 'Collection-Exp';
  type CA_TX_PLAN_AVG_FEE_CHART_NAME =
    | 'Avg. Proposed Fees'
    | 'Avg. Completed Fees';
  type CA_RECALL_RATE_CHART_NAME = 'Recall Prebook Rate' | 'Reappointment Rate';
  type CA_PROD_SELECT_TAB =
    | 'production_all'
    | 'production_dentists'
    | 'production_oht';

  type CA_HOURLY_RATE_SELECT_TAB =
    | 'hourly_rate_all'
    | 'hourly_rate_dentists'
    | 'hourly_rate_oht';

  type CA_COL_SELECT_TAB =
    | 'collection_all'
    | 'collection_dentists'
    | 'collection_oht';

  type CA_COL_EXP_SELECT_TAB =
    | 'collection_exp_all'
    | 'collection_exp_dentists'
    | 'collection_exp_oht';

  type CP_API_ENDPOINTS =
    | 'cpPredictorAnalysis'
    | 'cpPredictorSpecialistAnalysis'
    | 'cpRevPerProcedure'
    | 'cpPredictorRatio'
    | 'cpReferrals';

  type CP_API_TREND_ENDPOINTS =
    | 'cpPredictorAnalysisTrend'
    | 'cpPredictorSpecialistAnalysisTrend'
    | 'cpReferralsTrend'
    | 'cpPredictorRatioTrend';

  interface FnProduction {
    clinicId: number | string;
    clinicName: string;
    month: number | string;
    production: number | string;
    providerId: number | string;
    providerName: string;
    providerType: string;
    week: number | string;
    weekEnd: number | string;
    weekStart: number | string;
    year: number | string;
    yearMonth: string;
    goals?: number;
  }

  interface CaDentistProductionItem {
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

  interface CaDentistProductionApiResponse {
    app: string;
    data: CaDentistProductionItem[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface CaCollectionItem {
    clinicId: string | number;
    clinicName: string;
    day: unknown;
    month: unknown;
    collection: string | number;
    providerId: string | number;
    providerName: string;
    providerType: 'OHT' | string;
    week: unknown;
    weekEnd: unknown;
    weekStart: unknown;
    year: unknown;
    yearMonth: unknown;
  }

  interface CaCollectionApiResponse {
    app: string;
    data: CaCollectionItem[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface CaHourlyRateItem {
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
    hourlyRate: string | number;
  }

  interface CaHourlyRateApiResponse {
    app: string;
    data: CaHourlyRateItem[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface CaCollectionHourlyRateItem {
    clinicId: string | number;
    clinicName: string;
    day: unknown;
    month: unknown;
    collection: string | number;
    providerId: string | number;
    providerName: string;
    providerType: 'OHT' | string;
    week: unknown;
    weekEnd: unknown;
    weekStart: unknown;
    year: unknown;
    yearMonth: unknown;
    hourlyRate: string | number;
    hours: string | number;
  }

  interface CaCollectionHourlyRateApiResponse {
    app: string;
    data: CaCollectionHourlyRateItem[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface CaNumNewPatientsItem {
    clinicId: string | number;
    clinicName: string;
    day: unknown;
    month: unknown;
    newPatients: string | number;
    providerId: string | number;
    providerName: string;
    year: unknown;
    yearMonth: unknown;
    goals?: string | number; // trend
  }

  interface CaNumNewPatientsApiResponse {
    app: string;
    data: CaNumNewPatientsItem[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface CaTxPlanAvgFeeItem {
    clinicId: string | number;
    clinicName: string;
    day: unknown;
    month: unknown;
    averageFees: string | number;
    providerId: string | number;
    providerName: string;
    totalFeeAll: string | number;
    totalTreatmentPlans: string | number;
    year: unknown;
    yearMonth: unknown;
  }

  interface CaTxPlanAvgFeeApiResponse {
    app: string;
    data: CaTxPlanAvgFeeItem[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface CaTxPlanCompRateItem {
    clinicId: string | number;
    clinicName: string;
    day: unknown;
    month: unknown;
    chartAvgTotal: string | number;
    chartCount: string | number;
    itemsDone: string | number;
    itemsTotal: string | number;
    providerId: string | number;
    providerName: string;
    treatmentPerPlanPercentage: string | number;
    treatmentPercentage: string | number;
    year: unknown;
    yearMonth: unknown;
    goals?: number | string;
  }

  interface CaTxPlanCompRateApiResponse {
    app: string;
    data: CaTxPlanCompRateItem[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface CaRecallRateItem {
    clinicId: string | number;
    clinicName: string;
    day: unknown;
    month: unknown;
    recallPatient: string | number;
    recallPercent: string | number;
    providerId: string | number;
    providerName: string;
    totalPatient: string | number;
    year: unknown;
    yearMonth: unknown;
    goals?: string | number;
  }

  interface CaReappRateItem {
    clinicId: string | number;
    clinicName: string;
    day: unknown;
    month: unknown;
    reappointRate: string | number;
    providerId: string | number;
    providerName: string;
    totalAppts: string | number;
    reappointments: string | number;
    year: unknown;
    yearMonth: unknown;
    goals?: string | number;
  }

  interface CaRecallRateApiResponse {
    app: string;
    data: CaRecallRateItem[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface CaReappRateApiResponse {
    app: string;
    data: CaReappRateItem[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface CaNumComplaintsItem {
    clinicId: string | number;
    clinicName: string;
    day: unknown;
    month: unknown;
    numComplaints: string | number;
    providerId: string | number;
    providerName: string;
    year: unknown;
    yearMonth: unknown;
  }

  interface CaNumComplaintsApiResponse {
    app: string;
    data: CaNumComplaintsItem[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface FuApiQueryParams {
    clinicId: string | number;
    startDate: string;
    endDate: string;
    duration?: string;
  }

  type FU_API_ENDPOINTS =
    | 'fuGetConversion'
    | 'fuGetConversionPerUser'
    | 'fuGetFollowupCompletion'
    | 'fuGetOutcome'
    | 'fuGetPerUser';
}
