export interface CancellationRatio {
  clinic_id: number;
  clinic_name: string;
  year: string;
  month: string;
  year_month: string;
  provider_id: number;
  total_cancellation: string;
  total_appts: string;
  cancel_ratio: string;
}

export interface CancellationRatioResponse {
  data: CancellationRatio[];
  goals?: number;
  total?: number;
  total_average?: number;
  total_ta?: number;
  sqls?: string[];
}
