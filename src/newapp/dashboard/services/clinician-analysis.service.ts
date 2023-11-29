import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import moment from 'moment';
import { map, Subject, Observable, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClinicianAnalysisService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  destroy: Record<CA_API_ENDPOINTS, Subject<void>> | {} = {};
  destroy$: Record<CA_API_ENDPOINTS, Observable<void>> | {} = {};
  caNoneTrendApiRequest(
    api: CA_API_ENDPOINTS,
    queryParams: CaNoneTrendQueryParams
  ) {
    if (!Object.keys(this.destroy).includes(api)) {
      this.destroy[api] = new Subject<void>();
      this.destroy$[api] = this.destroy[api].asObservable();
    }
    this.destroy[api].next();
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
      .pipe(
        takeUntil(this.destroy$[api]),
        map(resBody => <any>camelcaseKeys(resBody, { deep: true }))
      );
  }

  trendDestroy: Record<CA_API_ENDPOINTS_TREND, Subject<void>> | {} = {};
  trendDestroy$: Record<CA_API_ENDPOINTS_TREND, Observable<void>> | {} = {};
  caTrendApiRequest(
    api: CA_API_ENDPOINTS_TREND,
    queryParams: CaTrendQueryParams
  ) {
    if (!Object.keys(this.trendDestroy).includes(api)) {
      this.trendDestroy[api] = new Subject<void>();
      this.trendDestroy$[api] = this.trendDestroy[api].asObservable();
    }
    this.trendDestroy[api].next();
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
      .pipe(
        takeUntil(this.trendDestroy$[api]),
        map(resBody => <any>camelcaseKeys(resBody, { deep: true }))
      );
  }
}
