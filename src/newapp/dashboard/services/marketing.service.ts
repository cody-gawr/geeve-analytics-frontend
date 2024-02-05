import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import camelcaseKeys from 'camelcase-keys';
import {
  MkNewPatientAcqApiResponse,
  MkNewPatientsByReferralApiResponse,
  MkNewPatientsByReferralTrendApiResponse,
  MkNumNewPatientsApiResponse,
  MkRevenueByReferralApiResponse,
  MkRevByReferralTrendApiResponse,
  MkTotalVisitsApiResponse,
  MkTotalVisitsTrendApiResponse,
  MkNumNewPatientsTrendApiResponse,
  MkActiveNewPatientsItem,
  MkActivePatientsApiResponse,
  MkXeroOrMyobAccountsApiResponse,
} from '@/newapp/models/dashboard/marketing';

@Injectable({
  providedIn: 'root',
})
export class MarketingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  // Items Predictor Analysis
  mkNewPatientsByReferral(
    clinicId: number | string,
    startDate: string,
    endDate: string,
    duration: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkNumPatientsByReferral`, {
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
            <MkNewPatientsByReferralApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  mkNewPatientsByReferralTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkNumPatientsByReferralTrend`, {
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
            <MkNewPatientsByReferralTrendApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  mkRevByReferral(
    clinicId: number | string,
    startDate: string,
    endDate: string,
    duration: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkRevByReferral`, {
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
            <MkRevenueByReferralApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  mkRevByReferralTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkRevByReferralTrend`, {
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
            <MkRevByReferralTrendApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  mkNumNewPatients(
    clinicId: number | string,
    startDate: string,
    endDate: string,
    duration: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkNumNewPatients`, {
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
            <MkNumNewPatientsApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  mkNumNewPatientsTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkNumNewPatientsTrend`, {
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
            <MkNumNewPatientsTrendApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  mkNewPatientAcq(
    clinicId: number | string,
    startDate: string,
    endDate: string,
    duration: string,
    connectedWith: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkNewPatientAcq`, {
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
            <MkNewPatientAcqApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  mkNewPatientAcqTrend(
    clinicId: number | string,
    mode: string,
    connectedWith: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkNewPatientAcqTrend`, {
        params: {
          clinic_id: clinicId,
          mode: mode,
          wh: queryWhEnabled,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <MkNewPatientAcqApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  mkTotalVisits(
    clinicId: number | string,
    startDate: string,
    endDate: string,
    duration: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkTotalVisits`, {
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
            <MkTotalVisitsApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  mkTotalVisitsTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkTotalVisitsTrend`, {
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
            <MkTotalVisitsTrendApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  mkActivePatients(
    clinicId: number | string,
    startDate: string,
    endDate: string,
    duration: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkActivePatients`, {
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
            <MkActivePatientsApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  mkActivePatientsTrend(
    clinicId: number | string,
    mode: string,
    queryWhEnabled: number
  ) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkActivePatientsTrend`, {
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
            <MkActivePatientsApiResponse>camelcaseKeys(resBody, { deep: true })
        )
      );
  }

  mkGetXeroAcct(clinicId: number | string, userId: number) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkGetXeroAcct`, {
        params: {
          clinic_id: clinicId,
          user_id: userId,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <MkXeroOrMyobAccountsApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  mkGetMyobAcct(clinicId: number | string, userId: number) {
    return this.http
      .get(`${this.apiUrl}/Marketing/mkGetMyobAcct`, {
        params: {
          clinic_id: clinicId,
          user_id: userId,
        },
        withCredentials: true,
      })
      .pipe(
        map(
          resBody =>
            <MkXeroOrMyobAccountsApiResponse>(
              camelcaseKeys(resBody, { deep: true })
            )
        )
      );
  }

  mkSaveAcctMyob(clinicId: number | string, categories: string[]) {
    const formData = new FormData();
    formData.append('clinic_id', <any>clinicId);
    formData.append('categories', <any>categories);
    return this.http
      .post(`${this.apiUrl}/Marketing/mkSaveAcctMyob`, formData, {
        withCredentials: true,
      })
      .pipe(map(resBody => <any>camelcaseKeys(resBody, { deep: true })));
  }

  mkSaveAcctXero(clinicId: number | string, categories: string[]) {
    const formData = new FormData();
    formData.append('clinic_id', <any>clinicId);
    formData.append('categories', <any>categories);
    return this.http
      .post(`${this.apiUrl}/Marketing/mkSaveAcctXero`, formData, {
        withCredentials: true,
      })
      .pipe(map(resBody => <any>camelcaseKeys(resBody, { deep: true })));
  }
}
