import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as _ from 'lodash';

import {
  ClinicsListApiResponse,
} from '../../models/clinic';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // public getClinics(): Observable<ClinicsListApiResponse> {
  //   return this.http.get<ClinicsListApiResponse>(`${this.apiUrl}/clinics/clinicGet`, {
  //     withCredentials: true
  //   });
  // }

  public getClinics(): Observable<ClinicsListApiResponse> {
    return this.http.get<ClinicsListApiResponse>(`${this.apiUrl}/clinics/clinicGet`, {
      withCredentials: true
    }).pipe(map(res => <any>camelcaseKeys(res, {deep: true})));
  }
}
