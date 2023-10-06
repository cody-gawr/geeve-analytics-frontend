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
export class FollowupsService {
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

  getFollowupsPerUser(
    clinic_id,
    startDate,
    endDate,
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Followups/fuGetPerUser?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  getFollowupOutcome(
    clinic_id,
    startDate,
    endDate,
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Followups/fuGetOutcome?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  getConversion(clinic_id, startDate, endDate, duration = ''): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Followups/fuGetConversion?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  getConversionPerUser(
    clinic_id,
    startDate,
    endDate,
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Followups/fuGetConversionPerUser?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  getCompletionRate(
    clinic_id,
    startDate,
    endDate,
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Followups/fuGetFollowupCompletion?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
}
