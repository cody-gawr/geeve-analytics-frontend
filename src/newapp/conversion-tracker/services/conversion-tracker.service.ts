import { environment } from '@/environments/environment';
import { ApiResponse } from '@/newapp/models';
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
}
