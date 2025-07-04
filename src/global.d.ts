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
  type TREND_MODE = 'off' | 'current' | 'weekly' | 'historic';
  type API_TREND_MODE = 'c' | 'w' | 'h';
  type T_SP_TYPE = 'Clinic Total' | 'Clinic Monthly' | 'Dentist Total' | 'Dentist Monthly';
  type T_MODE = 'clinic' | 'provider';
  type C_AVG_MODE = 'off' | 'average' | 'goal';

  interface CaNoneTrendQueryParams {
    clinicId: string | number;
    startDate: Moment | string;
    endDate: Moment | string;
    duration: DATE_RANGE_DURATION;
    clinician?: number;
    dentistId?: number;
    queryWhEnabled?: number;
  }

  interface CaTrendQueryParams {
    clinicId: string | number;
    dentistId: number;
    mode: API_TREND_MODE;
    queryWhEnabled?: number;
  }

  type CA_API_ALL_ENDPOINTS = CA_API_ENDPOINTS | CA_API_ENDPOINTS_TREND;
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
    | 'caCollectionExpHourlyRateOht'
    | 'caTotalDiscounts';

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
    | 'caRecallRateTrend'
    | 'caTotalDiscountsTrend';

  type CA_PROD_CHART_NAME = 'Production' | 'Collection' | 'Collection-Exp';
  type CA_TX_PLAN_AVG_FEE_CHART_NAME = 'Avg. Proposed Fees' | 'Avg. Completed Fees';
  type CA_RECALL_RATE_CHART_NAME = 'Recall Prebook Rate' | 'Reappointment Rate';
  type CA_PROD_SELECT_TAB = 'production_all' | 'production_dentists' | 'production_oht';

  type CA_HOURLY_RATE_SELECT_TAB = 'hourly_rate_all' | 'hourly_rate_dentists' | 'hourly_rate_oht';

  type CA_COL_SELECT_TAB = 'collection_all' | 'collection_dentists' | 'collection_oht';

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

  type FN_PROD_PER_VISIT_CHART_NAME = 'Production Per Visit' | 'Production Per Day';
  type MK_PROD_BY_POSTCODE_CHART_NAME = 'Production By Post Code' | 'Production By Age';

  type MarketingEndpoints =
    | 'mkNumPatientsByReferral'
    | 'mkRevByReferral'
    | 'mkNumNewPatients'
    | 'mkNewPatientAcq'
    | 'mkTotalVisits'
    | 'mkNumPatientsByReferralTrend'
    | 'mkRevByReferralTrend'
    | 'mkTotalVisitsTrend'
    | 'mkNumNewPatientsTrend'
    | 'mkNewPatientAcqTrend'
    | 'mkActivePatients'
    | 'mkActivePatientsTrend'
    | 'mkGetXeroAcct'
    | 'mkGetMyobAcct'
    | 'mkSaveAcctMyob'
    | 'mkSaveAcctXero'
    | 'mkProdByPostCode'
    | 'mkProdByPostCodeTrend'
    | 'mkProdByAge'
    | 'mkProdByAgeTrend';

  type DASHBOARD_NAME = 'Marketing' | 'Finance' | 'ClinicianAnalysis';

  type FinanceEndpoints = FN_API_ENDPOINTS | FN_API_ENDPOINTS_TREND;

  type FN_API_ENDPOINTS =
    | 'fnTotalProduction'
    | 'fnNetProfit'
    | 'fnNetProfitPercentage'
    | 'fnExpenses'
    | 'fnProductionByClinician'
    | 'fnProductionPerVisit'
    | 'fnProductionPerDay'
    | 'fnTotalDiscounts'
    | 'fnTotalCollection';

  type FN_API_ENDPOINTS_TREND =
    | 'fnTotalProductionTrend'
    | 'fnTotalCollectionTrend'
    | 'fnNetProfitTrend'
    | 'fnNetProfitPercentageTrend'
    | 'fnProductionPerVisitTrend'
    | 'fnProductionPerDayTrend'
    | 'fnExpensesTrend'
    | 'fnProductionByClinicianTrend'
    | 'fnTotalDiscountsTrend'
    | 'fnHourlyRate'
    | 'fnHourlyRateTrend';

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
    providerName: string | null;
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
    hours: string | number;
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
    providerName: string | null;
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
    providerName: string | null;
    year: string;
    yearMonth: string;
    weekEnd: string;
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
    providerName: string | null;
    totalFeeAll: string | number;
    totalTreatmentPlans: string | number;
    year: string;
    yearMonth: string;
    weekEnd: string;
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
    providerName: string | null;
    treatmentPerPlanPercentage: string | number;
    treatmentPercentage: string | number;
    year: string;
    yearMonth: string;
    weekEnd: string;
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
    providerName: string | null;
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

  interface CaBaseDataRecord {
    clinicId: string | number;
    clinicName: string;
    day: string;
    month: string;
    weekEnd: string;
    // numComplaints: string | number;
    providerId: string | number;
    providerName: string | null;
    year: string;
    yearMonth: string;
  }

  interface CaBaseApiResponse<T> {
    app: string;
    // data: CaNumComplaintsItem[];
    data: T[];
    goals: string | number;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface CaNumComplaintsItem extends CaBaseDataRecord {
    numComplaints: string | number;
  }

  interface CaNumComplaintsApiResponse extends CaBaseApiResponse<CaNumComplaintsItem> {}

  interface CaTotalDiscountsDataRecord extends CaBaseDataRecord {
    discounts: string | number;
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

  type FU_OUTCOME_CHART_NAME = 'Ticks' | 'Recalls' | 'FTAs' | 'UTAs';

  interface FuGetConversionItem {
    bookedPercent: string | number;
    clinicId: string | number;
    numBooked: string | number;
    totalNum: string | number;
    type: string;
  }

  interface FuGetConversionApiResponse {
    app: string;
    data: FuGetConversionItem[];
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
    goals?: number;
  }

  interface FuGetConversionPerUserItem {
    bookedPercent: string | number;
    clinicId: string | number;
    completedBy: string;
    completedById: string | number;
    numBooked: string | number;
    totalNum: string | number;
    type: string;
  }

  interface FuGetConversionPerUserApiResponse {
    app: string;
    data: Record<'ftas' | 'recalls' | 'ticks' | 'utas', FuGetConversionPerUserItem[]>;
    message: string;
    status: string | number;
    totalFta: number;
    totalRecall: number;
    totalTaFta: number;
    totalTaRecall: number;
    totalTaTick: number;
    totalTaUta: number;
    totalTick: number;
    totalUta: number;
  }

  interface FuGetFollowupCompletionItem {
    clinicIdParameter: string | number;
    completionRate: string | number;
    numCompleted: string | number;
    numTotal: string | number;
    type: string | number;
  }

  interface FuGetFollowupCompletionApiResponse {
    app: string;
    data: FuGetFollowupCompletionItem[];
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
    goals?: number;
  }

  interface FuGetOutcomeItem {
    clinicId: string | number;
    numFollowups: string | number;
    numStatus: string | number;
    status: string;
    statusPercent: string | number;
    type: string;
  }

  interface FuGetOutcomeApiResponse {
    app: string;
    data: Record<'ftas' | 'recalls' | 'ticks' | 'utas', FuGetOutcomeItem[]>;
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }

  interface FuGetPerUserItem {
    clinicId: string | number;
    completedBy: string;
    completedById: string | number;
    numFtas: string | number;
    numPostop: string | number;
    numRecall: string | number;
    numTicks: string | number;
    numTotal: string | number;
    numUtas: string | number;
  }

  interface FuGetPerUserApiResponse {
    app: string;
    data: FuGetPerUserItem[];
    message: string;
    status: string | number;
    total: number;
    totalAverage: number;
    totalTa: number;
  }
}
