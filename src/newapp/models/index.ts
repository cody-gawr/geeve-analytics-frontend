import { FormControl, FormGroup } from '@angular/forms';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};

export class JeeveError {
  api: API_ENDPOINTS | string;
  message!: string;
  status!: number;
  errors!: any[];
  platform?: string;

  constructor(
    message: string,
    status: number = 500,
    errors: any[] = [],
    api = '',
    platform = null,
  ) {
    this.message = message;
    this.status = status;
    this.errors = errors;
    this.api = api;
    this.platform = platform;
  }
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
