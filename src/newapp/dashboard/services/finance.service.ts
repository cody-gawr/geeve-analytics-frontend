import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as _ from 'lodash';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FnExpensesApiResponse, FnExpensesTrendApiResponse, FnNetProfitApiResponse, FnNetProfitParams, FnNetProfitPercentTrendApiResponse, FnNetProfitTrendApiResponse, FnProdByClinicianTrendApiResponse, FnProdPerVisitTrendApiResponse, FnProductionByClinicianApiResponse, FnProductionPerVisitApiResponse, FnTotalCollectionApiResponse, FnTotalCollectionTrendApiResponse, FnTotalDiscountsApiResponse, FnTotalDiscountsTrendApiResponse, FnTotalProductionApiResponse, FnTotalProductionTrendApiResponse } from '../../models/dashboard';
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

  fnTotalProductionTrend = (
    clinicId: string | number, 
    mode = '', 
    queryWhEnabled = 0
  ): Observable<FnTotalProductionTrendApiResponse> => {
    return this.http.get<FnTotalProductionTrendApiResponse>(
      `${this.apiUrl}/Finance/fnTotalProductionTrend`,
      { 
        params: {
            clinic_id: clinicId, 
            mode,
            wh: queryWhEnabled
        },
        withCredentials: true 
      }
    ).pipe(map(res => <FnTotalProductionTrendApiResponse> camelcaseKeys(res, {deep: true})));
  };

  fnTotalCollection = (params: FnNetProfitParams): Observable<FnTotalCollectionApiResponse> => {
    const {
        clinicId,
        startDate = '',
        endDate = '',
        duration = '',
        queryWhEnabled = 0
    } = params;
    return this.http.get<FnTotalCollectionApiResponse>(
      `${this.apiUrl}/Finance/fnTotalCollection`,
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
    ).pipe(map(res => <FnTotalCollectionApiResponse> camelcaseKeys(res, {deep: true})));
  };

  fnTotalCollectionTrend = (clinicId: string | number, mode = '', queryWhEnabled = 0): Observable<FnTotalCollectionTrendApiResponse> => {
    return this.http.get<FnTotalCollectionTrendApiResponse>(
      `${this.apiUrl}/Finance/fnTotalCollectionTrend`,
      { 
        params: {
            clinic_id: clinicId,
            mode,
            wh: queryWhEnabled
        },
        withCredentials: true 
      }
    ).pipe(map(res => <FnTotalCollectionTrendApiResponse> camelcaseKeys(res, {deep: true})));
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

  fnNetProfitTrend = (
    clinicId: string | number,
    mode = '',
    connectedWith = '',
    queryWhEnabled = 0
  ): Observable<FnNetProfitTrendApiResponse> => {
    return this.http.get<FnNetProfitTrendApiResponse>(
        `${this.apiUrl}/Finance/fnNetProfit${connectedWith == 'xero'? '':'Myob'}Trend`,
        {
            params: {
                clinic_id: clinicId,
                mode,
                wh: queryWhEnabled
            },
            withCredentials: true
        }
    ).pipe(map(res => <FnNetProfitTrendApiResponse> camelcaseKeys(res, {deep: true})));
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

  
  fnNetProfitPercentageTrend = (
    clinicId: string | number,
    mode = '',
    connectedWith = '',
    queryWhEnabled = 0
  ): Observable<FnNetProfitPercentTrendApiResponse> => {
    return this.http.get<FnNetProfitPercentTrendApiResponse>(
        `${this.apiUrl}/Finance/fnNetProfitPercentage${connectedWith == 'xero'? '':'Myob'}Trend`,
        {
            params: {
                clinic_id: clinicId,
                mode,
                wh: queryWhEnabled
            },
            withCredentials: true
        }
    ).pipe(map(res => <FnNetProfitPercentTrendApiResponse> camelcaseKeys(res, {deep: true})));
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
      `${this.apiUrl}/Finance/fnExpenses${connectedWith == 'myob'? 'Myob':''}`,
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

  fnExpensesTrend = (
    clinicId: string | number,
    mode: string,
    connectedWith: string,
    queryWhEnabled: number
  ): Observable<FnExpensesTrendApiResponse> => {
    return this.http.get<FnExpensesTrendApiResponse>(
      `${this.apiUrl}/Finance/fnExpenses${connectedWith == 'xero'? '':'Myob'}Trend`,
      {
        params: {
            clinic_id: clinicId,
            mode,
            wh: queryWhEnabled
        },
        withCredentials: true
      }
    ).pipe(map(res => <FnExpensesTrendApiResponse> camelcaseKeys(res, {deep: true})));
  }

  fnProductionByClinician(
    params: FnNetProfitParams
  ): Observable<FnProductionByClinicianApiResponse>{
    const {
        clinicId,
        startDate = '',
        endDate = '',
        duration = '',
        queryWhEnabled = 0,
    } = params;
    return this.http.get(
      `${this.apiUrl}/Finance/fnProductionByClinician`,
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
    ).pipe(map(res => <FnProductionByClinicianApiResponse> camelcaseKeys(res, {deep: true})));
  }

  fnProductionByClinicianTrend(
    clinicId: string | number,
    mode: string,
    queryWhEnabled: number
  ): Observable<FnProdByClinicianTrendApiResponse>{
    return this.http.get(
      `${this.apiUrl}/Finance/fnProductionByClinicianTrend`,
      {
        params: {
          clinic_id: clinicId, 
          mode,
          wh: queryWhEnabled
        },
        withCredentials: true
      }
    ).pipe(map(res => <FnProdByClinicianTrendApiResponse> camelcaseKeys(res, {deep: true})));
  }

  fnProductionPerVisit(
    params: FnNetProfitParams
  ){
    const {
        clinicId,
        startDate = '',
        endDate = '',
        duration = '',
        queryWhEnabled = 0,
    } = params;
    return this.http.get(
      `${this.apiUrl}/Finance/fnProductionPerVisit`,
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
    ).pipe(map(res => <FnProductionPerVisitApiResponse> camelcaseKeys(res, {deep: true})));
  }

  fnProductionPerVisitTrend(
    clinicId: string | number,
    mode: string,
    queryWhEnabled: number
  ){
    return this.http.get(
      `${this.apiUrl}/Finance/fnProductionPerVisitTrend`,
      {
        params: {
          clinic_id: clinicId, 
          mode,
          wh: queryWhEnabled
        },
        withCredentials: true
      }
    ).pipe(map(res => <FnProdPerVisitTrendApiResponse> camelcaseKeys(res, {deep: true})));
  }

  fnTotalDiscounts(
    params: FnNetProfitParams
  ){
    const {
        clinicId,
        startDate = '',
        endDate = '',
        duration = '',
        queryWhEnabled = 0,
    } = params;
    return this.http.get(
      `${this.apiUrl}/Finance/fnDiscounts`,
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
    ).pipe(map(res => <FnTotalDiscountsApiResponse> camelcaseKeys(res, {deep: true})));
  }

  fnTotalDiscountsTrend(
    clinicId: string | number,
    mode: string,
    queryWhEnabled: number
  ){
    return this.http.get(
      `${this.apiUrl}/Finance/fnDiscountsTrend`,
      {
        params: {
          clinic_id: clinicId, 
          mode,
          wh: queryWhEnabled
        },
        withCredentials: true
      }
    ).pipe(map(res => <FnTotalDiscountsTrendApiResponse> camelcaseKeys(res, {deep: true})));
  }
}
