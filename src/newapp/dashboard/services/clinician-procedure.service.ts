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
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClinicianProcedureService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  cpPredictorAnalysis({ clinicId, startDate, endDate, queryWhEnabled, dentistId = undefined }) {
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorAnalysis`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          ...([0, 1].indexOf(queryWhEnabled) > -1 ? { wh: queryWhEnabled } : {}),
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <CpPredictorAnalysisApiResponse>camelcaseKeys(resBody, { deep: true })));
  }

  cpPredictorAnalysisTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number,
    dentistId = undefined,
  ) {
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorAnalysisTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          ...([0, 1].indexOf(queryWhEnabled) > -1 ? { wh: queryWhEnabled } : {}),
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <CpPredictorAnalysisApiResponse>camelcaseKeys(resBody, { deep: true })));
  }

  cpPredictorSpecialistAnalysis({
    clinicId,
    startDate,
    endDate,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorSpecialistAnalysis`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          ...([0, 1].indexOf(queryWhEnabled) > -1 ? { wh: queryWhEnabled } : {}),
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <CpPredictorSpecialistAnalysisApiResponse>camelcaseKeys(resBody, { deep: true }),
        ),
      );
  }

  cpPredictorSpecialistAnalysisTrend({
    clinicId,
    startDate,
    endDate,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorSpecialistAnalysisTrend`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          ...([0, 1].indexOf(queryWhEnabled) > -1 ? { wh: queryWhEnabled } : {}),
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody => <CpPredictorSpecialistAnalysisDataItem>camelcaseKeys(resBody, { deep: true }),
        ),
      );
  }

  cpRevPerProcedure({ clinicId, startDate, endDate, queryWhEnabled, dentistId = undefined }) {
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpRevPerProcedure`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          ...([0, 1].indexOf(queryWhEnabled) > -1 ? { wh: queryWhEnabled } : {}),
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <CpRevPerProcedureApiResponse>camelcaseKeys(resBody, { deep: true })));
  }

  cpPredictorRatio({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorRatio`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration,
          ...([0, 1].indexOf(queryWhEnabled) > -1 ? { wh: queryWhEnabled } : {}),
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <CpPredictorRatioApiResponse>camelcaseKeys(resBody, { deep: true })));
  }

  cpPredictorRatioTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number,
    dentistId = undefined,
  ) {
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpPredictorRatioTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          ...([0, 1].indexOf(queryWhEnabled) > -1 ? { wh: queryWhEnabled } : {}),
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <CpPredictorAnalysisApiResponse>camelcaseKeys(resBody, { deep: true })));
  }

  cpReferrals({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
    dentistId = undefined,
  }): Observable<CpReferralsApiResponse> {
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpReferrals`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration,
          ...([0, 1].indexOf(queryWhEnabled) > -1 ? { wh: queryWhEnabled } : {}),
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <CpReferralsApiResponse>camelcaseKeys(resBody, { deep: true })));
  }

  cpReferralsTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number,
    dentistId = undefined,
  ) {
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/cpReferralsTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          ...([0, 1].indexOf(queryWhEnabled) > -1 ? { wh: queryWhEnabled } : {}),
          ...(dentistId === undefined ? {} : { provider_id: dentistId }),
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <CpReferralsApiResponse>camelcaseKeys(resBody, { deep: true })));
  }

  cpNoneTrendApiRequest(api: CP_API_ENDPOINTS, queryParams: CaNoneTrendQueryParams) {
    const params = {
      clinic_id: queryParams.clinicId,
      start_date: moment.isMoment(queryParams.startDate)
        ? queryParams.startDate.format('YYYY-MM-DD')
        : queryParams.startDate,
      end_date: moment.isMoment(queryParams.endDate)
        ? queryParams.endDate.format('YYYY-MM-DD')
        : queryParams.endDate,
      duration: queryParams.duration,
      ...([0, 1].indexOf(queryParams.queryWhEnabled) > -1
        ? { wh: queryParams.queryWhEnabled }
        : {}),
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

  cpTrendApiRequest(api: CP_API_TREND_ENDPOINTS, queryParams: CaTrendQueryParams) {
    return this.http
      .get(`${this.apiUrl}/ClinicianProcedures/${api}`, {
        params: {
          clinic_id: queryParams.clinicId,
          mode: queryParams.mode,
          provider_id: queryParams.dentistId,
          ...([0, 1].indexOf(queryParams.queryWhEnabled) > -1
            ? { wh: queryParams.queryWhEnabled }
            : {}),
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <any>camelcaseKeys(resBody, { deep: true })));
  }
}
