export interface Kpi {
  type: string;
  currentValue: number;
  currentUnit?: string;
  deltaValue: number;
  deltaUnit?: string;
}
