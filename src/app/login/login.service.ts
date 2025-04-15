import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieOptions, CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { AppConstants } from '../app.constants';
import { updateUserData } from '../util';

@Injectable()
export class LoginService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    public constants: AppConstants,
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

  me() {
     this.http
      .get(environment.commonApiUrl + '/me', {
        headers: this.headers,
        withCredentials: true,
        observe: 'response' as const,
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response.body;
        })
      ).subscribe((body:any) => {
        if(body.status === 200)
          this.updateUserInfo(body.data);
      });
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

  updateUserInfo(data) {
      var datares = [];
      updateUserData(data);
      datares['username'] = data.username;
      datares['email'] = data.email;
      datares['token'] = data.token;
      datares['userid'] = data.id;
      datares['clinicid'] = data.clinic_id;
      datares['parentid'] = data.parent_id;
      datares['user_type'] = data.user_type;
      /*datares['user_image'] = data.user_image;        */
      datares['stepper_status'] = parseInt(data.stepper_status);
      datares['login_status'] = data.status;
      datares['display_name'] = data.display_name;
      datares['dentistid'] = data.dentist_id;
      //datares['mfa_enabled'] = data.mfa_enabled;
      datares['features_dismissed'] =
        data.features_dismissed;
      datares['show_pay_promo'] =
        data.show_pay_promo;
      datares['health_screen_mtd'] = data.health_screen_mtd;
      datares['max_chart_bars'] = data.max_chart_bars;
      let opts = this.constants.cookieOpt as CookieOptions;

      var nextStep = (
        datares['stepper_status'] + 1
      ).toString();

      this._cookieService.put('stepper', nextStep, opts);
      this._cookieService.put('userid', '', opts);

      //this._cookieService.put('multiClinicEnabled', data.multi_clinic_enabled, opts);
      this._cookieService.put(
        'dash1_multi',
        data.dash1_multi,
        opts
      );
      this._cookieService.put('mfa_enabled', datares['mfa_enabled']);
      this._cookieService.put(
        'dash2_multi',
        data.dash2_multi,
        opts
      );
      this._cookieService.put(
        'dash3_multi',
        data.dash3_multi,
        opts
      );
      this._cookieService.put(
        'dash4_multi',
        data.dash4_multi,
        opts
      );
      this._cookieService.put(
        'dash5_multi',
        data.dash5_multi,
        opts
      );

      this._cookieService.put('childid', '', opts);
      this._cookieService.put('dentistid', '', opts);
      this._cookieService.put('userid', datares['userid'], opts);
      //this._cookieService.put("token", datares['token'], opts);
      this._cookieService.put('username', datares['username'], opts);
      this._cookieService.put('email', datares['email'], opts);
      this._cookieService.put('user_type', datares['user_type'], opts);

      this._cookieService.put(
        'login_status',
        datares['login_status'],
        opts
      );

      this._cookieService.put(
        'display_name',
        datares['display_name'],
        opts
      );

      this._cookieService.put(
        'features_dismissed',
        datares['features_dismissed'],
        opts
      );

      sessionStorage.setItem(
        'show_pay_promo',
        datares['show_pay_promo']
      );

      this._cookieService.put(
        'health_screen_mtd',
        datares['health_screen_mtd'],
        opts
      );

      this._cookieService.put(
        'max_chart_bars',
        datares['max_chart_bars'],
        opts
      );

      /*this._cookieService.put("user_image", datares['user_image'], opts);        */
      if (datares['user_type'] != '2' && datares['user_type'] != '7') {
        this._cookieService.put('userid', datares['parentid'], opts);
        this._cookieService.put('childid', datares['userid'], opts);
        this._cookieService.put('clinicid', datares['clinicid'], opts);
        this._cookieService.put('dentist_toggle', 'false', opts);
      }
  }
}
