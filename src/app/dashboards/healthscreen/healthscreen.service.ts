import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class HealthScreenService {
  public token: string;
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  public token_id;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private router: Router
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

  // Get ClinicSettings
  getCustomiseSettings(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + '/clinics/clinicGetSettings?clinic_id=' + clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  hourlyRateChart(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    limit = 5
  ): Observable<any> {
    const urlParams = new URLSearchParams(window.location.search);
    const isWh = parseInt(urlParams.get('wh') ?? '0');
    var header = this.getHeaders();
    if (duration == '') {
      return this.http
        .get(
          this.apiUrl +
            '/health/chHourlyLeaders?clinic_id=' +
            clinic_id +
            '&start_date=' +
            startDate +
            '&end_date=' +
            endDate +
            '&limit=5' +
            (isWh ? '&wh=1' : ''),
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    }

    return this.http
      .get(
        this.apiUrl +
          '/health/chHourlyLeaders?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&limit=5' +
          (isWh ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Items Predictor Analysis
  mkNewPatientsByReferral(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    limit = 5
  ): Observable<any> {
    const urlParams = new URLSearchParams(window.location.search);
    const isWh = parseInt(urlParams.get('wh') ?? '0');
    var header = this.getHeaders();
    if (duration == '') {
      return this.http
        .get(
          this.apiUrl +
            '/health/chReferralLeaders?clinic_id=' +
            clinic_id +
            '&start_date=' +
            startDate +
            '&end_date=' +
            endDate +
            '&limit=' +
            limit +
            (isWh ? '&wh=1' : ''),
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    }

    return this.http
      .get(
        this.apiUrl +
          '/health/chReferralLeaders?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&limit=' +
          limit +
          (isWh ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // finProductionPerVisit
  finProductionPerVisit(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = ''
  ): Observable<any> {
    const urlParams = new URLSearchParams(window.location.search);
    const isWh = parseInt(urlParams.get('wh') ?? '0');
    var header = this.getHeaders();
    if (duration == '') {
      return this.http
        .get(
          this.apiUrl +
            '/Health/chProductionPerVisit?clinic_id=' +
            clinic_id +
            '&start_date=' +
            startDate +
            '&end_date=' +
            endDate +
            (isWh ? '&wh=1' : ''),
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    }

    return this.http
      .get(
        this.apiUrl +
          '/Health/chProductionPerVisit?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          (isWh ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Added by Hanney Sharma on 01-04-2021
  commonCall(clinic_id, startDate, endDate, functionName): Observable<any> {
    // Top production card service
    const urlParams = new URLSearchParams(window.location.search);
    const isWh = parseInt(urlParams.get('wh') ?? '0');
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/health/' +
          functionName +
          '?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          (isWh ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Added by Hanney Sharma on 01-04-2021
  getSetting(): Observable<any> {
    // Top production card service
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/health/chGetSetting', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }
}
