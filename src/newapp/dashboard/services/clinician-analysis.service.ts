import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import moment, { Moment } from 'moment';
import { map } from 'rxjs';

export interface CaNoneTrendQueryParams {
  clinicId: string | number;
  startDate: Moment | string;
  endDate: Moment | string;
  duration: DATE_RANGE_DURATION;
  clinician?: string;
  dentistId?: number;
  queryWhEnabled?: number;
}

export interface CaTrendQueryParams {
  clinicId: string | number;
  dentistId: number;
  mode: API_TREND_MODE;
  queryWhEnabled?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ClinicianAnalysisService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  caNoneTrendApiRequest(
    api: CA_API_ENDPOINTS,
    queryParams: CaNoneTrendQueryParams
  ) {
    const params = {
      clinic_id: queryParams.clinicId,
      start_date: moment.isMoment(queryParams.startDate)
        ? queryParams.startDate.format('YYYY-MM-DD')
        : queryParams.startDate,
      end_date: moment.isMoment(queryParams.endDate)
        ? queryParams.endDate.format('YYYY-MM-DD')
        : queryParams.endDate,
      duration: queryParams.duration,
      wh: queryParams.queryWhEnabled ?? 0,
    };

    if (queryParams.clinician) {
      params['clinician'] = queryParams.clinician;
    }

    if (queryParams.dentistId) {
      params['provider_id'] = queryParams.dentistId;
    }
    return this.http
      .get(`${this.apiUrl}/ClinicianAnalysis/${api}`, {
        params: params,
        withCredentials: true,
      })
      .pipe(map(resBody => <any>camelcaseKeys(resBody, { deep: true })));
  }

  caTrendApiRequest(
    api: CA_API_ENDPOINTS_TREND,
    queryParams: CaTrendQueryParams
  ) {
    return this.http
      .get(`${this.apiUrl}/ClinicianAnalysis/${api}`, {
        params: {
          clinic_id: queryParams.clinicId,
          mode: queryParams.mode,
          provider_id: queryParams.dentistId,
          wh: queryParams.queryWhEnabled ?? 0,
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <any>camelcaseKeys(resBody, { deep: true })));
  }

  // getAccountingDentist
  // getStatusDentist
  // saveDentistMapping
  // getClinics
  // getClinicFollowUpSettings
}
