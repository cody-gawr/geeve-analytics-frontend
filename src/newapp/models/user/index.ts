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
}

export interface RolesApiResponse {}

export interface RolesIndividualApiResponse {
  data: string[];
  type: string;
  plan: string;
}
