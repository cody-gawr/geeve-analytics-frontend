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
  // multiClinicEnabled: number;
  dash1Multi: number; //(clinician analysis)
  dash2Multi: number; //(clinician procedures & referrals)
  dash3Multi: number; //(front desk)
  dash4Multi: number; //(marketing)
  dash5Multi: number; //(finance)
}

export interface RolesApiResponse {}

export interface RolesIndividualApiResponse {
  data: string[];
  type: number;
  plan: string;
}
