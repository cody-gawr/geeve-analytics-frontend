import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable()
export class ProfileSettingsService {
  public token: string;
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  private solutionsUrl = environment.solutionsUrl;
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

  // Get profileSettings
  getprofileSettings(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/Users/getPractices?clinic_id=' + clinic_id, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  generate2FAQRCode(): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(environment.commonApiUrl + '/generateQR', header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  verifyCode(code: string, remove = false): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('otp', code);
    if(remove) formData.append('remove', 'yes');
    return this.http
      .post(environment.commonApiUrl + '/verifyOTP', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Get updateprofileSettings
  updateprofileSettings(displayName, email): Observable<any> {
    const formData = new FormData();
    formData.append('displayName', displayName);
    formData.append('email', email);
    //formData.append('user_image', imageURL);

    var header = this.getHeaders();

    return this.http
      .post(this.apiUrl + '/Users/userUpdateProfile', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Get updateprofileSettingsHealthScreen
  updateprofileSettingsHealthScreen(health_screen_mtd): Observable<any> {
    const formData = new FormData();
    formData.append('health_screen_mtd', health_screen_mtd);

    var header = this.getHeaders();

    return this.http
      .post(this.apiUrl + '/Users/userUpdateProfile', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Get updatePassword
  updatePassword(currentPassword, newPassword): Observable<any> {
    const formData = new FormData();
    formData.append('oldpassword', currentPassword);
    formData.append('password', newPassword);
    formData.append('confirm_password', newPassword);

    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/Users/userChangePassword', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  clearSession(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + '/Xeros/clearSession/?getxero=1?clinic_id=' + clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  updateCardRetryPayment(
    token: any,
    customer_id,
    last_invoic_id
  ): Observable<any> {
    const formData = new FormData();

    formData.append('customer_id', customer_id);
    formData.append('last_invoic_id', last_invoic_id);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/Users/userUpdateCard', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  retryPayment(customer_id, last_invoic_id): Observable<any> {
    const formData = new FormData();
    formData.append('customer_id', customer_id);
    formData.append('last_invoic_id', last_invoic_id);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/Users/userRetryPayment', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getPaymentDetails(): Observable<any> {
    const formData = new FormData();
    /* formData.append('type', "analytics");
        formData.append('user_id', this._cookieService.get("userid"));*/
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/users/getUserPaymentData', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getCardDetails(customer_id): Observable<any> {
    const formData = new FormData();
    formData.append('customer_id', customer_id);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/users/userGetCard', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  createSetupIntent(customer): Observable<any> {
    const formData = new FormData();
    formData.append('customer', customer);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/users/userCreateSetupIntent', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  updateCustomerCard(customer): Observable<any> {
    const formData = new FormData();
    formData.append('customer', customer);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/users/userUpdateCustomerCard', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // GET CHARTS TIPS
  getChartsTips(): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/ChartsTips/ctGetTips', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }
  // GET CHARTS TIPS
  getStripeKey(): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/users/getPublishableKey', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }
  // save CHARTS TIPS
  saveChartsTips(data): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('chart_tips', data);
    return this.http
      .post(this.apiUrl + '/ChartsTips/ctSaveTips', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
}
