import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import * as _ from "lodash";
import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ChartTipsApiResponse } from "../../models/dashboard";
import camelcaseKeys from "camelcase-keys";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // getCharts = (
  //   dashboardId: number,
  //   clinicId: number
  // ): Observable<ChartTipsApiResponse> => {
  //   return this.http.get<ChartTipsApiResponse>(
  //     `${this.apiUrl}/chartsTips/ctGetPageTips?dashboard_id=${dashboardId}&clinic_id=${clinicId}`,
  //     { withCredentials: true }
  //   );
  // };

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
        map((res) => <ChartTipsApiResponse>camelcaseKeys(res, { deep: true }))
      );
  };

  getClinicAccountingPlatform = (
    clinicId: number
  ): Observable<{ data: CONNECT_WITH_PLATFORM; message: string }> => {
    return this.http
      .get<any>(
        `${this.apiUrl}/Clinics/clinicGetAccountingPlatform?clinic_id=${clinicId}`,
        { withCredentials: true }
      )
      .pipe(map((res) => <any>camelcaseKeys(res, { deep: true })));
  };
}
