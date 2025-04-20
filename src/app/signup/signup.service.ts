import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable()
export class SignupService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private router: Router,
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append(
      'Access-Control-Allow-Headers',
      'Origin, Authorization, Content-Type, Accept',
    );
  }

  private apiUrl = environment.apiUrl;
  getUrl(): Observable<any> {
    return this.http.get(this.apiUrl + '/XeroSignup/getUrl', { headers: this.headers }).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }

  getInfo(token): Observable<any> {
    const formData = new FormData();
    formData.append('id', token);
    return this.http
      .post(this.apiUrl + '/XeroSignup/getXeroInfo', formData, {
        headers: this.headers,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        }),
      );
  }
}
