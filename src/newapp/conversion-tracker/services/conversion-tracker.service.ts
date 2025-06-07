import { environment } from '@/environments/environment';
import { TreatmentStatus } from '@/newapp/enums/treatment-status.enum';
import { ApiResponse } from '@/newapp/models';
import { ConversionTracker, ConversionTrackerDto } from '@/newapp/models/conversion-tracker';
import { ConversionCodeDto } from '@/newapp/models/conversion-tracker/conversion-code.dto';
import { ConversionCode } from '@/newapp/models/conversion-tracker/conversion-code.model';
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

  updateConversionTrackerTreatmentStatus(recordId: number, treatmentStatus: TreatmentStatus) {
    return this.http
      .patch<ApiResponse<number>>(`${this.commonApiUrl}/conversion/tracker/${recordId}`, null, {
        params: {
          treatment_status: treatmentStatus,
        },
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
}
