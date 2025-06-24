import { KpiDto } from './kpi.dto';

export interface ConversionTrackerMetricsDto {
  total_consult: KpiDto;
  conversion_rate: KpiDto;
  avg_time_to_conversion: KpiDto;
}
