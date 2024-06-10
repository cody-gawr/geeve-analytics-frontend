import { environment } from '@/environments/environment';
import {
  FdFtaRatioApiResponse,
  FdFtaRatioTrendApiResponse,
  FdNumTicksApiResponse,
  FdNumTicksTrendApiResponse,
  FdReappointRateApiResponse,
  FdReappointRateTrendApiResponse,
  FdRecallRateApiResponse,
  FdRecallRateTrendApiResponse,
  FdUtaRatioApiResponse,
  FdUtaRatioTrendApiResponse,
  FdUtilisationRateApiResponse,
  FdUtilisationRateByDayApiResponse,
  FdUtilisationRateTrendApiResponse,
} from '@/newapp/models/dashboard/front-desk';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FrontDeskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  fdUtilisationRate({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
  }) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdUtilisationRate`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration: duration,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdUtilisationRateApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  fdUtilisationRateTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdUtilisationRateTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdUtilisationRateTrendApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  fdUtilisationRateByDay({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
  }) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdUtilisationRateByDay`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration: duration,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdUtilisationRateByDayApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  fdRecallRate({ clinicId, startDate, endDate, duration, queryWhEnabled }) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdRecallRate`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration: duration,
          wh: queryWhEnabled,
          dashboard_id: 3,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdRecallRateApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  fdRecallRateTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdRecallRateTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          wh: queryWhEnabled,
          dashboard_id: 3,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdRecallRateTrendApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  fdReappointRate({ clinicId, startDate, endDate, duration, queryWhEnabled }) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdReappointRate`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration: duration,
          wh: queryWhEnabled,
          dashboard_id: 3,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdReappointRateApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  fdReappointRateTrend(
    clinicId: number | string,
    mode,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdReappointRateTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          wh: queryWhEnabled,
          dashboard_id: 3,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdReappointRateTrendApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  fdNumTicks({ clinicId, startDate, endDate, duration, queryWhEnabled }) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdNumTicks`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration: duration,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdNumTicksApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  fdNumTicksTrend(clinicId: number | string, mode, queryWhEnabled: number) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdNumTicksTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdNumTicksTrendApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  fdFtaRatio({ clinicId, startDate, endDate, duration, queryWhEnabled }) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdFtaRatio`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration: duration,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdFtaRatioApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  fdFtaRatioTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdFtaRatioTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdFtaRatioTrendApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  fdUtaRatio({ clinicId, startDate, endDate, duration, queryWhEnabled }) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdUtaRatio`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration: duration,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdUtaRatioApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  fdUtaRatioTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdUtaRatioTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <FdUtaRatioTrendApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  fdCancellationRatio({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
  }) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdCancellationRatio`, {
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          end_date: endDate,
          duration: duration,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <any>camelcaseKeys(resBody, { deep: true })));
  }

  fdCancellationRatioTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdCancellationRatioTrend`, {
        params: {
          clinic_id: clinicId,
          mode,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(map(resBody => <any>camelcaseKeys(resBody, { deep: true })));
  }
}
