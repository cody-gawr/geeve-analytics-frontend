export interface User {
  name: string;
  email: string;
  displayName: string;
}

export interface LoginUser {
  username: string;
  email: string;
  token: string;
  id: string;
  clinicId: string;
  parentId: string;
  userType: string;
  stepperStatus: number;
  status: string;
  displayName: string;
  dentistId: string;
  featuresDismissed: string;
  healthScreenMtd: string;
  dash1Multi: number; //(clinician analysis)
  dash2Multi: number; //(clinician procedures & referrals)
  dash3Multi: number; //(front desk)
  dash4Multi: number; //(marketing)
  dash5Multi: number; //(finance)
  maxChartBars: number;
}

export interface UserRole {
  created: string;
  id: number;
  is_default: number;
  is_deleted: number;
  modified: string;
  permisions: string[];
  role: string;
  role_id: number;
  user_id: number;
}

export interface RolesApiResponse {
  data: UserRole[];
  message: string;
}

export interface RolesIndividualApiResponse {
  data: string[];
  type: number;
  plan: string;
}
