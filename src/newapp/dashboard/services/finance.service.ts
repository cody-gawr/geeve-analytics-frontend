import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as _ from 'lodash';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FnExpensesApiResponse, FnNetProfitApiResponse, FnNetProfitParams, FnTotalProductionApiResponse } from '../../models/dashboard';
import camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fnTotalProduction = (params: FnNetProfitParams): Observable<FnTotalProductionApiResponse> => {
    const {
        clinicId,
        startDate = '',
        endDate = '',
        duration = '',
        queryWhEnabled = 0
    } = params;
    return this.http.get<FnTotalProductionApiResponse>(
      `${this.apiUrl}/Finance/fnTotalProduction`,
      { 
        params: {
            clinic_id: clinicId, 
            start_date: startDate, 
            end_date: endDate,
            duration: duration,
            wh: queryWhEnabled
        },
        withCredentials: true 
      }
    ).pipe(map(res => <FnTotalProductionApiResponse> camelcaseKeys(res, {deep: true})));
  };

  fnNetProfit = (
    params: FnNetProfitParams
  ): Observable<FnNetProfitApiResponse> => {
    const {
        clinicId,
        startDate = '',
        endDate = '',
        duration = '',
        queryWhEnabled = 0,
        connectedWith = ''
    } = params;
    return this.http.get<FnNetProfitApiResponse>(
        `${this.apiUrl}/Finance/fnNetProfit${connectedWith == 'xero'? '':'Myob'}`,
        {
            params: {
                clinic_id: clinicId, 
                start_date: startDate, 
                end_date: endDate,
                duration: duration,
                wh: queryWhEnabled
            },
            withCredentials: true
        }
    ).pipe(map(res => <FnNetProfitApiResponse> camelcaseKeys(res, {deep: true})));
  }

  fnNetProfitPercentage = (
    params: FnNetProfitParams
  ): Observable<FnNetProfitApiResponse> => {
    const {
        clinicId,
        startDate = '',
        endDate = '',
        duration = '',
        queryWhEnabled = 0,
        connectedWith = ''
    } = params;
    return this.http.get<FnNetProfitApiResponse>(
        `${this.apiUrl}/Finance/fnNetProfitPercentage${connectedWith == 'xero'? '':'Myob'}`,
        {
            params: {
                clinic_id: clinicId, 
                start_date: startDate, 
                end_date: endDate,
                duration: duration,
                wh: queryWhEnabled
            },
            withCredentials: true
        }
    ).pipe(map(res => <FnNetProfitApiResponse> camelcaseKeys(res, {deep: true})));
  }

  fnExpenses = (
    params: FnNetProfitParams
  ): Observable<FnExpensesApiResponse> => {
    const {
        clinicId,
        startDate = '',
        endDate = '',
        duration = '',
        queryWhEnabled = 0,
        connectedWith = ''
    } = params;
    return this.http.get<FnExpensesApiResponse>(
      `${this.apiUrl}/Finance/fnExpenses${connectedWith == 'xero'? '':'Myob'}`,
      {
        params: {
            clinic_id: clinicId, 
            start_date: startDate, 
            end_date: endDate,
            duration: duration,
            wh: queryWhEnabled
        },
        withCredentials: true
      }
    ).pipe(map(res => <FnExpensesApiResponse> camelcaseKeys(res, {deep: true})));
  }
}
