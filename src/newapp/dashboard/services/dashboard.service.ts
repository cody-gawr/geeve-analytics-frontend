import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import _ from 'lodash';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChartTipsApiResponse } from '../../models/dashboard/finance';
import camelcaseKeys from 'camelcase-keys';
import { ChartDescParams } from '@/newapp/models/dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  spChartDescriptionCall<K, T>(
      dashboard: DASHBOARD_NAME, params: ChartDescParams<T>,
    ) {
      return this.http
        .get(`${this.apiUrl}/${dashboard}/${params.chartDescription}`, {
          params: {
            clinic_id: params.clinicId,
            ...(params.mode ? {mode: params.mode}: {}),
            ...(params.startDate ? {start_date: params.startDate}: {}),
            ...(params.endDate ? {end_date: params.endDate}: {}),
            ...(params.duration ? {duration: params.duration}: {}),
            ...(params.queryWhEnabled ? {wh: params.queryWhEnabled}: {}),
          },
          withCredentials: true,
        })
        .pipe(
          map(
            resBody => <K>resBody
          )
        );
    }

  getCharts = (
    dashboardId: number,
    clinicId: string | number
  ): Observable<ChartTipsApiResponse> => {
    return this.http
      .get<ChartTipsApiResponse>(
        `${this.apiUrl}/chartsTips/ctGetPageTips?dashboard_id=${dashboardId}&clinic_id=${clinicId}`,
        { withCredentials: true }
      )
      .pipe(
        map(res => <ChartTipsApiResponse>camelcaseKeys(res, { deep: true }))
      );
  };
}
