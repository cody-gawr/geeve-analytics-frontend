import { environment } from '@/environments/environment';
import {
  CpPredictorAnalysisApiResponse,
  CpPredictorRatioApiResponse,
  CpPredictorSpecialistAnalysisApiResponse,
  CpPredictorSpecialistAnalysisDataItem,
  CpReferralsApiResponse,
  CpRevPerProcedureApiResponse,
} from '@/newapp/models/dashboard/clinician-procedure';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import moment from 'moment';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClinicianProcedureService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  cpPredictorAnalysisDestroy = new Subject<void>();
  cpPredictorAnalysisDestroy$ = this.cpPredictorAnalysisDestroy.asObservable();
  cpPredictorAnalysis({
    clinicId,
    startDate,
    endDate,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.cpPredictorAnalysisDestroy.next();
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorAnalysis`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          wh: queryWhEnabled,
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(
        takeUntil(this.cpPredictorAnalysisDestroy$),
        map(
          resBody =>
            <CpPredictorAnalysisApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  cpPredictorAnalysisTrendDestroy = new Subject<void>();
  cpPredictorAnalysisTrendDestroy$ =
    this.cpPredictorAnalysisDestroy.asObservable();
  cpPredictorAnalysisTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number,
    dentistId = undefined
  ) {
    this.cpPredictorAnalysisTrendDestroy.next();
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorAnalysisTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          wh: queryWhEnabled,
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(
        takeUntil(this.cpPredictorAnalysisTrendDestroy$),
        map(
          resBody =>
            <CpPredictorAnalysisApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  cpPredictorSpecialistAnalysisDestroy = new Subject<void>();
  cpPredictorSpecialistAnalysisDestroy$ =
    this.cpPredictorAnalysisDestroy.asObservable();
  cpPredictorSpecialistAnalysis({
    clinicId,
    startDate,
    endDate,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.cpPredictorSpecialistAnalysisDestroy.next();
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorSpecialistAnalysis`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          wh: queryWhEnabled,
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(
        takeUntil(this.cpPredictorSpecialistAnalysisDestroy$),
        map(
          resBody =>
            <CpPredictorSpecialistAnalysisApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  cpPredictorSpecialistAnalysisTrendDestroy = new Subject<void>();
  cpPredictorSpecialistAnalysisTrendDestroy$ =
    this.cpPredictorAnalysisDestroy.asObservable();
  cpPredictorSpecialistAnalysisTrend({
    clinicId,
    startDate,
    endDate,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.cpPredictorSpecialistAnalysisTrendDestroy.next();
    return this.http
      .get(
        `${this.apiUrl}/ClinicianProcedures/cpPredictorSpecialistAnalysisTrend`,
        {
          params: {
            clinic_id: clinicId,
            start_date: startDate,
            end_date: endDate,
            wh: queryWhEnabled,
            ...(dentistId === undefined ? {} : { provider_id: dentistId }),
          },
          withCredentials: true,
        }
      )
      .pipe(
        takeUntil(this.cpPredictorSpecialistAnalysisTrendDestroy$),
        map(
          resBody =>
            <CpPredictorSpecialistAnalysisDataItem>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  cpRevPerProcedureDestroy = new Subject<void>();
  cpRevPerProcedureDestroy$ = this.cpPredictorAnalysisDestroy.asObservable();
  cpRevPerProcedure({
    clinicId,
    startDate,
    endDate,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.cpRevPerProcedureDestroy.next();
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpRevPerProcedure`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          wh: queryWhEnabled,
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(
        takeUntil(this.cpRevPerProcedureDestroy$),
        map(
          resBody =>
            <CpRevPerProcedureApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  cpPredictorRatioDestroy = new Subject<void>();
  cpPredictorRatioDestroy$ = this.cpPredictorAnalysisDestroy.asObservable();
  cpPredictorRatio({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.cpPredictorRatioDestroy.next();
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorRatio`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration,
          wh: queryWhEnabled,
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(
        takeUntil(this.cpPredictorRatioDestroy$),
        map(
          resBody =>
            <CpPredictorRatioApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  cpPredictorRatioTrendDestroy = new Subject<void>();
  cpPredictorRatioTrendDestroy$ =
    this.cpPredictorAnalysisDestroy.asObservable();
  cpPredictorRatioTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number,
    dentistId = undefined
  ) {
    this.cpPredictorRatioTrendDestroy.next();
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorRatioTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          wh: queryWhEnabled,
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(
        takeUntil(this.cpPredictorRatioTrendDestroy$),
        map(
          resBody =>
            <CpPredictorAnalysisApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  cpReferralsDestroy = new Subject<void>();
  cpReferralsDestroy$ = this.cpReferralsDestroy.asObservable();
  cpReferrals({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
    dentistId = undefined,
  }): Observable<CpReferralsApiResponse> {
    this.cpReferralsDestroy.next();

    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpReferrals`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration,
          wh: queryWhEnabled,
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(
        takeUntil(this.cpReferralsDestroy$),
        map(
          resBody =>
            <CpReferralsApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  cpReferralsTrendDestroy = new Subject<void>();
  cpReferralsTrendDestroy$ = this.cpReferralsDestroy.asObservable();
  cpReferralsTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number,
    dentistId = undefined
  ) {
    this.cpReferralsTrendDestroy.next();
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpReferralsTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          wh: queryWhEnabled,
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(
        takeUntil(this.cpReferralsTrendDestroy$),
        map(
          resBody =>
            <CpReferralsApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  cpNoneTrendApiRequest(
    api: CP_API_ENDPOINTS,
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
      .get(`${this.apiUrl}/ClinicianProcedures/${api}`, {
        params: params,
        withCredentials: true,
      })
      .pipe(map(resBody => <any>camelcaseKeys(resBody, { deep: true })));
  }

  trendDestroy: Record<CP_API_TREND_ENDPOINTS, Subject<void>> | {} = {};
  trendDestroy$: Record<CP_API_TREND_ENDPOINTS, Observable<void>> | {} = {};
  cpTrendApiRequest(
    api: CP_API_TREND_ENDPOINTS,
    queryParams: CaTrendQueryParams
  ) {
    if (!Object.keys(this.trendDestroy).includes(api)) {
      this.trendDestroy[api] = new Subject<void>();
      this.trendDestroy$[api] = this.trendDestroy[api].asObservable();
    }
    this.trendDestroy[api].next();
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/${api}`, {
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
