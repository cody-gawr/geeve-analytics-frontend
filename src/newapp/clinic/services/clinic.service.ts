import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import _ from 'lodash';

import { ClinicsListApiResponse, IClinicDTO, JeeveResponse } from '../../models/clinic';
import { environment } from '@/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import camelcaseKeys from 'camelcase-keys';
import { ICampaign } from '@/newapp/models/clinic/campaign';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  private apiUrl = environment.apiUrl;
  private commonUrl = environment.commonApiUrl;

  constructor(private http: HttpClient) {}

  public getClinics(): Observable<ClinicsListApiResponse> {
    return this.http
      .get<ClinicsListApiResponse>(`${this.apiUrl}/clinics/clinicGet`, {
        withCredentials: true,
      })
      .pipe(map(res => <any>camelcaseKeys(res, { deep: true })));
  }

  public getUserClinics(): Observable<JeeveResponse<IClinicDTO[]>> {
    return this.http
      .get<JeeveResponse<IClinicDTO[]>>(`${this.commonUrl}/clinics`, {
        withCredentials: true,
        params: { product: 'jeeve_analytics' },
      }).pipe(map(res => res));
  }

  public checkCoreSyncStatus(clinicId: number): Observable<JeeveResponse<{
    refresh_token: boolean,
    token: boolean,
    core_user_id: boolean,
    sync_successes: number
  }>> {
    return this.http
      .get<JeeveResponse<{
        refresh_token: boolean,
        token: boolean,
        core_user_id: boolean,
        sync_successes: number
      }>>(`${this.commonUrl}/corepractice/checkStatus`, {
        withCredentials: true,
        params: { clinic_id: clinicId}
      }).pipe(map(res => res));
  }

  public checkDentallySyncStatus(clinicId: number): Observable<JeeveResponse<{
    site_id: string,
    sync_successes: number,
  }>> {
    return this.http
      .get<JeeveResponse<{
        site_id: string, sync_successes: number
      }>>(`${this.commonUrl}/dentally/checkStatus`, {
        withCredentials: true,
        params: { clinic_id: clinicId}
      }).pipe(map(res => res));
  }

  public checkPraktikaSyncStatus(clinicId: number): Observable<JeeveResponse<{sync_successes: number}>> {
    return this.http
      .get<JeeveResponse<any>>(`${this.commonUrl}/praktika/checkStatus`, {
        withCredentials: true,
        params: { clinic_id: clinicId}
      }).pipe(map(res => res));
  }

  public getClinicAuthorizeUrl(clinicId: number) {
    return this.http.get<JeeveResponse<any>>(
      `${environment.commonApiUrl}/corepractice/getAuthorizeUrl?clinic_id=${clinicId}`,
      { withCredentials: true },
    );
  }

  public getClinicLocations(clinic_id: number): Observable<any> {
    return this.http
      .get(
        this.apiUrl + '/corepractice/getLocations?clinic_id=' + clinic_id,
        { withCredentials: true },
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  saveCoreLocation(clinic_id, location_id): Observable<any> {
    return this.http
      .get(
        this.apiUrl +
          '/corepractice/saveLocation?clinic_id=' +
          clinic_id +
          '&location_id=' +
          location_id,
          { withCredentials: true },
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  public getDentallyAuthorizeUrl(clinicId: number) {
    return this.http.get<JeeveResponse<any>>(
      `${environment.commonApiUrl}/dentally/getAuthorizeUrl?clinic_id=${clinicId}`,
      { withCredentials: true },
    );
  }

  public CreatePraktikaConfig(customer_user: string, customer_secret: string, clinicID: number, customer_id?: number) {
    const body = {
      customer_user: customer_user,
      customer_secret: customer_secret,
      customer_id
    }
    return this.http.post<JeeveResponse<any>>(`${environment.commonApiUrl}/praktika/config?clinic_id=${clinicID}`, body, { withCredentials: true })
      .pipe(take(1), map((response: JeeveResponse<any>) => {
        return { response };
      }))
  }


  public validatePraktikaLogin(customer_user: string, customer_secret: string) {
    const body = {
      customer_user: customer_user,
      customer_secret: customer_secret,
    };
    return this.http
      .post<
        JeeveResponse<any>
      >(`${environment.commonApiUrl}/praktika/validate-login`, body, { withCredentials: true })
      .pipe(
        take(1),
        map((response: JeeveResponse<any>) => {
          return { response };
        })
      );
  }

  public getCampaigns(clinicId: number): Observable<JeeveResponse<{ campaigns: ICampaign[] }>> {
    return this.http
      .get<JeeveResponse<any>>(`${this.apiUrl}/clinics/campaigns`, {
        params: {clinic_id: clinicId},
        withCredentials: true,
      }).pipe(map(res => res));
  }

  public getCampaingDetails(clinicId: number, campaignId: number, start: Moment, end: Moment): Observable<JeeveResponse<any>> {
    return this.http
      .get<JeeveResponse<any>>(`${this.apiUrl}/clinics/campaigns/data`, {
        withCredentials: true,
        params: {
          clinic_id: clinicId,
          campaign_id: campaignId,
          start_date: start.format('YYYY-MM-DD'),
          end_date: end.format('YYYY-MM-DD'),
        },
      }).pipe(map(res => res));
  }

  getClinicAccountingPlatform = (
    clinicId: number
  ): Observable<{
    data: { connectedWith: CONNECT_WITH_PLATFORM; name: string };
    message: string;
  }> => {
    return this.http
      .get<any>(
        `${this.apiUrl}/clinics/clinicGetAccountingPlatform?clinic_id=${clinicId}`,
        { withCredentials: true }
      )
      .pipe(map(res => <any>camelcaseKeys(res, { deep: true })));
  };

  checkXeroStatus(clinic_id): Observable<JeeveResponse<
  {
    
    tenantId: string | null,
    tenantName: string | null,
    error: string | undefined // Present if there was an error
    
  }>> {
    return this.http
      .get(
        environment.commonApiUrl +
          `/connect/xero/status?clinics=[${clinic_id}]`,
          { withCredentials: true }
      )
      .pipe(map((res) => <any>res));
  }
}
