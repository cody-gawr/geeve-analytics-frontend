import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';

@Injectable()
export class RolesService {
  public token: string;
  public token_id: string;
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
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
  // Get updateprofileSettings
  updateprofileSettings(displayName, email): Observable<any> {
    const formData = new FormData();
    formData.append('displayName', displayName);
    formData.append('email', email);
    formData.append('id', this._cookieService.get('userid'));
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
    formData.append('id', this._cookieService.get('userid'));
    var header = this.getHeaders();

    return this.http
      .post(this.apiUrl + '/Users/userChangePassword', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  clearSession(clinic_id): Observable<HttpResponse<
  {
    success: boolean,
    data: {}
  }
  >> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('clinic_id', clinic_id);
    return this.http
      .post(environment.commonApiUrl + `/connect/xero/disconnect?clinics=[${clinic_id}]`, header)
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }
}
