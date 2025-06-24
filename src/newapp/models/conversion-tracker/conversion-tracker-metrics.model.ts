import { Kpi } from './kpi.model';

export interface ConversionTrackerMetrics {
  totalConsult: Kpi;
  conversionRate: Kpi;
  avgTimeToConversion: Kpi;
}
