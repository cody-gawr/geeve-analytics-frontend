import { LoginUser } from '../user';

export interface Login {
  email: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
}

export interface LoginApiResponse {
  data: {
    data: LoginUser;
    audit: boolean;
    message: string;
  };
  message: string;
  status: number;
}

export interface LogoutApiResponse {
  success: boolean;
}
