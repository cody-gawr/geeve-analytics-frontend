import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class KpiReportService {
  public token: string;
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  public token_id;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private router: Router,
  ) {}

  getHeaders() {
    if (
      this._cookieService.get('user_type') != '1' &&
      this._cookieService.get('user_type') != '2'
    ) {
      this.token_id = this._cookieService.get('childid');
    } else {
      this.token_id = this._cookieService.get('userid');
    }
    let headers = {
      headers: new HttpHeaders(),
      withCredentials: true,
      observe: 'response' as const,
    };
    return headers;
  }

  getKpiReport(clinic_id, startDate = '', endDate = '', clinician = ''): Observable<any> {
    var header = this.getHeaders();
    const urlParams = new URLSearchParams(window.location.search);
    const isWhEnabled = parseInt(urlParams.get('wh') ?? '0');
    if (clinician == 'all' || clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/Kpi/getKpiReport?clinic_id=' +
            clinic_id +
            '&start_date=' +
            startDate +
            '&end_date=' +
            endDate +
            (isWhEnabled ? '&wh=1' : ''),
          header,
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          }),
        );
    }
    return this.http
      .get(
        this.apiUrl +
          '/Kpi/getKpiReport?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&provider_id=' +
          clinician +
          (isWhEnabled ? '&wh=1' : ''),
        header,
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        }),
      );
  }
  // Get ClinicSettings
  getClinicSettings(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/clinics/clinicGet?clinic_id=' + clinic_id, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }
}
