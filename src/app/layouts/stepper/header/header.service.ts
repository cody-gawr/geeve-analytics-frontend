import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Injectable()
export class StepperHeaderService {
  public token: string;
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  public token_id: any = 0;

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
  // Items Predictor Analysis
  logout(id): Observable<any> {
    const formData = new FormData();
    var header = this.getHeaders();
    return this.http.post(this.apiUrl + '/users/userLogout', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }

  getClinics(): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/clinics/clinicGet', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }
}
