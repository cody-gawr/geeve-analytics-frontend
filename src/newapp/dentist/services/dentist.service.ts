import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as _ from 'lodash';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import camelcaseKeys from 'camelcase-keys';
import { DentistsListApiResponse } from '@/newapp/models/dentist';

@Injectable({
  providedIn: 'root'
})
export class DentistService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDentists = (
    clinicId: string | number,
    isAll: number
  ): Observable<DentistsListApiResponse> => {
    return this.http.get<DentistsListApiResponse>(
      `${this.apiUrl}/Dentists/dentGet?clinic_id=${clinicId}&all=${isAll}`,
      { withCredentials: true }
    ).pipe(map(res => <DentistsListApiResponse> camelcaseKeys(res, {deep: true})));
  };
}
