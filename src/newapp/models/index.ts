import { FormControl, FormGroup } from "@angular/forms";
import { API_ENDPOINTS } from "./dashboard";

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};

export class JeeveError {
  api: API_ENDPOINTS | string;
  message!: string;
  status!: number;
  errors!: any[];

  constructor(
    message: string,
    status: number = 500,
    errors: any[] = [],
    api = ""
  ) {
    this.message = message;
    this.status = status;
    this.errors = errors;
    this.api = api;
  }
}
