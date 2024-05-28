import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private router: Router
  ) {
    //append headers
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append(
      'Access-Control-Allow-Headers',
      'Origin, Authorization, Content-Type, Accept'
    );
  }

  private apiUrl = environment.apiUrl;

  // Items Predictor Analysis
  login(uname, password, otp = ''): Observable<any> {
    const formData = new FormData();

    formData.append('email', uname);
    formData.append('password', password);
    if(otp) formData.append('otp', otp);
    return this.http
      .post(environment.commonApiUrl + '/login', formData, {
        headers: this.headers,
        withCredentials: true,
        observe: 'response' as const,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Items Predictor Analysis
  checkEmail(email, captcha): Observable<any> {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('captcha', captcha);
    return this.http
      .post(this.apiUrl + '/users/userForgotPassword', formData, {
        observe: 'response' as const,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // resetPassword
  resetPassword(password, id): Observable<any> {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('confirm_password', password);
    formData.append('id', id);
    return this.http
      .post(this.apiUrl + '/users/userSetPassword', formData, {
        observe: 'response' as const,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Items Predictor Analysis
  checkEmailExists(email): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    return this.http
      .post(this.apiUrl + '/users/userCheckEmailExists', formData, {
        observe: 'response' as const,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Items Predictor Analysis
  addUser(email, password, user_type, plan_id): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('user_type', user_type);
    formData.append('plan_id', plan_id);
    formData.append('status', '0');

    return this.http
      .post(this.apiUrl + '/users/addPracticeOwner', formData, {
        observe: 'response' as const,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  getPlans(): Observable<any> {
    return this.http.get(this.apiUrl + '/plans/getPlans').pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }
  // Items Predictor Analysis
  checkuser(plan_id): Observable<any> {
    const formData = new FormData();
    formData.append('plan_id', plan_id);
    return this.http
      .post(this.apiUrl + '/users/userCheckPlan', formData, {
        observe: 'response' as const,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Items Predictor Analysis
  createSubscription(token: any, plan_id): Observable<any> {
    const formData = new FormData();
    formData.append('token', token.id);
    formData.append('email', token.email);
    formData.append('plan_id', plan_id);

    return this.http
      .post(this.apiUrl + '/users/createSubscription', formData, {
        observe: 'response' as const,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Items Predictor Analysis
  autoLogin(userId): Observable<any> {
    const formData = new FormData();
    return this.http
      .post(this.apiUrl + '/users/autologin', formData, {
        observe: 'response' as const,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  checkValidString(id): Observable<any> {
    const formData = new FormData();
    formData.append('id', id);
    return this.http
      .post(this.apiUrl + '/users/userCheckValidString', formData, {
        observe: 'response' as const,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
}
