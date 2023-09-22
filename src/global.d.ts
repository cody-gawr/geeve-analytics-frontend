export {};

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

  type CA_API_ENDPOINTS =
    | 'caDentistProduction'
    | 'caDentistProductionDentist'
    | 'caDentistProductionOht'
    | 'caCollection'
    | 'caCollectionDentists'
    | 'caCollectionOht'
    | 'caCollectionExp'
    | 'caCollectionExpDentists'
    | 'caCollectionExpOht'
    | 'caTxPlanAvgProposedFees'
    | 'caTxPlanAvgCompletedFees'
    | 'caNumComplaints'
    | 'caRecallRate'
    | 'caReappointRate'
    | 'caTxPlanCompRate'
    | 'caNumNewPatients'
    | 'caHourlyRate'
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
    | 'caDentistProductionDentistTrend'
    | 'caDentistProductionOhtTrend'
    | 'caCollectionTrend'
    | 'caCollectionDentistsTrend'
    | 'caCollectionOhtTrend'
    | 'caCollectionExpTrend'
    | 'caCollectionExpDentistsTrend'
    | 'caCollectionExpOhtTrend'
    | 'caNumComplaintsTrend'
    | 'caTxPlanAvgProposedFeesTrend'
    | 'caTxPlanAvgCompletedFeesTrend'
    | 'caReappointRateTrend'
    | 'caHourlyRateTrend'
    | 'caCollectionHourlyRateTrend'
    | 'caCollectionExpHourlyRateTrend'
    | 'caHourlyRateDentistsTrend'
    | 'caHourlyRateOhtTrend'
    | 'caNumNewPatientsTrend'
    | 'caTxPlanCompRateTrend'
    | 'caRecallRateTrend';

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
}
