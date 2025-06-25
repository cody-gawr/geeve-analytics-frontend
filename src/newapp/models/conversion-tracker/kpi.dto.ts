export interface KpiDto {
  type: string;
  current_value: number;
  current_unit?: string;
  delta_value: number;
  delta_unit?: string;
}
