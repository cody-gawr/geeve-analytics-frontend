import { environment } from '@/environments/environment';
import { ActiveTreatmentStatus, TreatmentStatus } from '@/newapp/enums/treatment-status.enum';
import { ApiResponse } from '@/newapp/models';
import {
  ConversionCodeUpsertDto,
  ConversionCodeValue,
  ConversionCodeValueDto,
  ConversionTracker,
  ConversionTrackerDto,
  ConversionTrackerMetrics,
  ConversionTrackerMetricsDto,
} from '@/newapp/models/conversion-tracker';
import { ConversionCodeDto } from '@/newapp/models/conversion-tracker/conversion-code.dto';
import { ConversionCode } from '@/newapp/models/conversion-tracker/conversion-code.model';
import { snakeCaseKeys } from '@/newapp/shared/helpers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversionTrackerService {
  private commonApiUrl = environment.commonApiUrl;
  constructor(private http: HttpClient) {}

  getConversionCodes(clinicId: number): Observable<ConversionCode[]> {
    return this.http
      .get<ApiResponse<ConversionCodeDto[]>>(`${this.commonApiUrl}/conversion/codes`, {
        params: {
          clinic_id: clinicId,
        },
        withCredentials: true,
      })
      .pipe(map(res => <ConversionCode[]>camelcaseKeys(res.data, { deep: true })));
  }

  getConversionTrackers(payload: {
    clinicId: number;
    providerId: number;
    startDate: string;
    endDate: string;
    consultCode: string;
  }): Observable<ConversionTracker[]> {
    return this.http
      .get<ApiResponse<ConversionTrackerDto[]>>(`${this.commonApiUrl}/conversion/trackers`, {
        params: {
          clinic_id: payload.clinicId,
          provider_id: payload.providerId,
          start_date: payload.startDate,
          end_date: payload.endDate,
          consult_code: payload.consultCode,
        },
        withCredentials: true,
      })
      .pipe(map(res => <ConversionTracker[]>camelcaseKeys(res.data, { deep: true })));
  }

  updateConversionTracker(
    recordId: number,
    updatePayload: { treatmentStatus?: TreatmentStatus; notes?: string },
  ) {
    return this.http
      .patch<ApiResponse<number>>(`${this.commonApiUrl}/conversion/tracker/${recordId}`, null, {
        params: snakeCaseKeys(updatePayload),
        withCredentials: true,
      })
      .pipe(map(res => res.data));
  }

  createConversionCode(clinicId: number, consultCode: string): Observable<ConversionCode> {
    return this.http
      .post<ApiResponse<ConversionCodeDto>>(
        `${this.commonApiUrl}/conversion/code`,
        {
          clinic_id: clinicId,
          consult_code: consultCode,
        },
        {
          withCredentials: true,
        },
      )
      .pipe(map(res => <ConversionCode>camelcaseKeys(res.data, { deep: true })));
  }

  upsertConversionCode(
    clinicId: number,
    conversionCodePayload: ConversionCodeUpsertDto,
  ): Observable<ConversionCode> {
    const { recordId, consultCode, codeValues } = conversionCodePayload;

    return this.http
      .put<ApiResponse<ConversionCodeDto>>(
        `${this.commonApiUrl}/conversion/code`,
        {
          clinic_id: clinicId,
          record_id: recordId,
          consult_code: consultCode,
          code_values: codeValues.map(cv => snakeCaseKeys(cv)),
        },
        {
          withCredentials: true,
        },
      )
      .pipe(map(res => <ConversionCode>camelcaseKeys(res.data, { deep: true })));
  }

  deleteConversionCode(recordId: number): Observable<number> {
    return this.http
      .delete<ApiResponse<number>>(`${this.commonApiUrl}/conversion/code`, {
        params: {
          record_id: recordId,
        },
        withCredentials: true,
      })
      .pipe(map(res => res.data));
  }

  createConversionCodeValue(
    conversionCodeId: number,
    treatmentStatus: ActiveTreatmentStatus,
    code: string,
  ): Observable<ConversionCodeValue> {
    return this.http
      .post<ApiResponse<ConversionCodeValueDto>>(
        `${this.commonApiUrl}/conversion/code-value`,
        {
          conversion_code_id: conversionCodeId,
          type: treatmentStatus,
          code,
        },
        {
          withCredentials: true,
        },
      )
      .pipe(map(res => <ConversionCodeValue>camelcaseKeys(res.data, { deep: true })));
  }

  deleteConversionCodeValue(recordId: number): Observable<number> {
    return this.http
      .delete<ApiResponse<number>>(`${this.commonApiUrl}/conversion/code-value`, {
        params: {
          record_id: recordId,
        },
        withCredentials: true,
      })
      .pipe(map(res => res.data));
  }

  loadConversionTrackerMetrics(clinicId: number): Observable<ConversionTrackerMetrics> {
    return this.http
      .get<ApiResponse<ConversionTrackerMetricsDto>>(`${this.commonApiUrl}/conversion/metrics`, {
        params: {
          clinic_id: clinicId,
        },
        withCredentials: true,
      })
      .pipe(map(res => <ConversionTrackerMetrics>camelcaseKeys(res.data, { deep: true })));
  }
}
