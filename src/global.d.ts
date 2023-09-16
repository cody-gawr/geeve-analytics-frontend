export {};

declare global {
  interface JeeveError {
    api: string;
    message: string;
    status: number;
    errors: any[];
    platform?: string;
  }
  type CONNECT_WITH_PLATFORM = "xero" | "myob" | "none";
  type API_ENDPOINTS = "ctGetPageTips" | "clinicGetAccountingPlatform";
  type FPT_UTA = "status" | "item";
  type PMS = "core" | "d4w" | "exact" | "myob" | "xero";
  type DATE_RANGE_DURATION =
    | "w"
    | "m"
    | "lm"
    | "q"
    | "lq"
    | "cytd"
    | "lcytd"
    | "fytd"
    | "lfytd"
    | "custom";
  type TREND_MODE = "off" | "current" | "historic";
  type T_SP_TYPE =
    | "Clinic Total"
    | "Clinic Monthly"
    | "Dentist Total"
    | "Dentist Monthly";
  type T_MODE = "clinic" | "provider";
}
