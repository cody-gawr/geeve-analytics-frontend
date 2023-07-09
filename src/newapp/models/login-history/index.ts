export interface LoginHistoryItem {
  index?: number;
  id: number;
  userType: string | null;
  email: string;
  clinicId: number | null;
  clinicName: string | null;
  maxLoginDate: string | null;
  loginsInLast14Days: number;
  loginsInLast30Days: number;
  loginsInLast60Days: number;
  loginsInLast90Days: number;
}

export interface LoginHistoryResponse {
  data: LoginHistoryItem[];
}
