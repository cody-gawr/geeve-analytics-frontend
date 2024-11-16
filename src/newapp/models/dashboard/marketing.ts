export interface MkXeroOrMyobAccountsApiResponse {
  app: string;
  data: XeroOrAccountData;
  message: string;
  status: string | number;
}

export interface XeroOrAccountData {
  categories: Record<number, string>[];
  selectedCategories: string[];
}

export interface MkNewPatientsByReferralApiResponse {
  app: string;
  data: MkNewPatientsByReferral | Array<MkNewPatientsByReferralMultiItem>;
  goals: number;
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface MkNewPatientsByReferral {
  patientsRefname: Record<string, Array<PatientsRefName>>;
  patientsReftype: Array<PatientsRefType>;
}

export interface MkNewPatientsByReferralMultiItem {
  clinicName: string;
  val: Array<{
    clinicId: string | number;
    clinicName: string;
    patientsVisits: number;
    reftypeName: string;
    production: string | number;
  }>;
}

export interface MkNewPatientsByReferralTrendApiResponse {
  app: string;
  data: {
    duration: string;
    val: Array<{
      itemName: string;
      numReferrals: number;
    }>;
  }[];
  message: string;
  status: string | number;
}

export interface MkRevenueByReferralApiResponse {
  app: string;
  data: MkRevByReferral | MkRevByReferralMultiItem[];
  goals: number;
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface MkRevByReferral {
  patientsRefname: Record<string, Array<RevenueRefName>>;
  patientsReftype: Array<RevenueRefType>;
}

export interface MkRevByReferralMultiItem {
  clinicName: string;
  val: Array<{
    clinicId: string | number;
    clinicName: string;
    invoiceAmount: number;
    reftypeName: string;
    production: string | number;
  }>;
}

export interface MkRevByReferralTrendApiResponse {
  app: string;
  data: {
    duration: string;
    val: Array<{
      itemName: string;
      invoiceAmount: number;
    }>;
  }[];
  message: string;
  status: string | number;
}

export interface MkNumNewPatientsApiResponse {
  app: string;
  data: MkNumNewPatientsItem[];
  goals: number;
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface MkActivePatientsApiResponse {
  app: string;
  data: MkActiveNewPatientsItem[];
  goals: number;
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface MkActivePatientsTrendApiResponse {
  app: string;
  data: MkActiveNewPatientsItem[];
  goals: number;
  message: string;
  status: string | number;
}

export interface MkNumNewPatientsTrendApiResponse {
  app: string;
  data: MkNumNewPatientsTrendItem[];
  goals: number;
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface MkNumNewPatientsItem {
  clinicId: number;
  clinicName: string;
  month: null | unknown;
  newPatients: string | number;
  providerId: null | unknown;
  providerName: null | string;
  year: null | unknown;
  yearMonth: null | unknown;
}

export interface MkActiveNewPatientsItem {
  clinicId: number;
  clinicName: string;
  month: null | unknown;
  activePatients: string | number;
  providerId: null | unknown;
  providerName: null | string;
  year: null | unknown;
  yearMonth: null | unknown;
}

export interface MkNumNewPatientsTrendItem {
  clinicId: number;
  clinicName: string;
  goals: number;
  month: null | unknown;
  newPatients: string | number;
  providerId: null | unknown;
  providerName: null | string;
  year: null | unknown;
  yearMonth: null | unknown;
}

export interface MkNewPatientAcqApiResponse {
  app: string;
  data: MkNewPatientAcqItem[];
  goals: number;
  message: string;
  status: string | number;
  dataTa: number;
}

export interface MkTotalVisitsApiResponse {
  app: string;
  data: MkTotalVisitsItem[];
  goals: number;
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface MkTotalVisitsTrendApiResponse {
  app: string;
  data: MkTotalVisitsItem[];
  goals: number;
  message: string;
  status: string | number;
  total: number;
  totalAverage: number;
  totalTa: number;
}

export interface MkTotalVisitsItem {
  clinicId: number;
  clinicName: string;
  day: null | number;
  month: null | unknown;
  numVisits: string | number;
  totalAppts: string | number;
  totalFtaUta: string | number;
  year: null | unknown;
  yearMonth: null | unknown;
  goals: number;
}

export interface MkNewPatientAcqTrendApiResponse {
  app: string;
  data: MkNewPatientAcqItem[];
  goals: number;
  message: string;
  status: string | number;
}

export interface MkNewPatientAcqItem {
  clinicId: number;
  clinicName: string;
  cost: string | number;
  costPerPatient: number;
  month: null | unknown;
  newPatients: string | number;
  year: null | unknown;
  yearMonth: null | unknown;
}

export interface PatientsRefName {
  clinicId: string | number;
  clinicName: string;
  day: null | unknown;
  month: null | unknown;
  numReferrals: string | number;
  referralName: string;
  reftypeName: string;
  patientName: string;
  year: null | unknown;
  yearMonth: null | unknown;
}

export interface RevenueRefName {
  clinicId: string | number;
  clinicName: string;
  day: null | unknown;
  invoiceAmount: string | number;
  month: null | unknown;
  numReferrals: string | number;
  referralName: string;
  reftypeName: string;
  year: null | unknown;
  yearMonth: null | unknown;
}

export interface PatientsRefType {
  clinic: string;
  clinicId: string | number;
  patientsVisits: number;
  reftypeName: string;
}

export interface RevenueRefType {
  clinic: string;
  clinicId: string | number;
  invoiceAmount: number;
  reftypeName: string;
}
