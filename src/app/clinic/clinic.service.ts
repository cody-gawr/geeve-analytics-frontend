import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

export interface IApiResponse<T> {
  status: string;
  success?: boolean;
  message: string;
  error?: string;
  count: number;
  data: T;
}

@Injectable()
export class ClinicService {
  public token: string;
  public api_url: string;
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

  // Get Dentist
  getClinics(): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/clinics/clinicGet', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }

  // Delete Clinic
  deleteClinic(clinic_id): Observable<any> {
    const formData = new FormData();

    formData.append('id', clinic_id);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/clinics/clinicDelete', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  removeClinic(clinicId: string): Observable<any> {
    const formData = new FormData();

    formData.append('clinic_id', clinicId);
    var header = this.getHeaders();
    return this.http
      .post(
        environment.baseApiUrl + '/v1/common/corepractice/disconnect',
        formData,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  removeDentallyClinic(clinicId: string): Observable<any> {
    const formData = new FormData();

    formData.append('clinic_id', clinicId);
    var header = this.getHeaders();
    return this.http
      .post(
        environment.baseApiUrl + '/v1/common/dentally/disconnect',
        formData,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Update Clinic
  updateClinic(clinic_id, value, column): Observable<any> {
    const formData = new FormData();
    formData.append(column, value);
    formData.append('clinic_id', '1');
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/clinics/clinicUpdate', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Update Clinic
  addClinic(name, address, contact_name, pms, coreURL): Observable<any> {
    const formData = new FormData();

    formData.append('clinicName', name);
    formData.append('address', address);
    formData.append('contactName', contact_name);
    formData.append('pms', pms);
    formData.append('coreURL', coreURL);
    formData.append('product', 'jeeve_analytics');

    var header = this.getHeaders();
    return this.http
      .post(environment.baseApiUrl + '/v1/common/clinics', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getUserDetails(): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/users/userInfo', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }
  // Get Dentist
  getClinicProviders(selectedClinics): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/clinics/clinicGetProviders?clinic_id=' +
          selectedClinics,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  checkMappedLocations(): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/corepractice/checkMappedLocations', header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  public CreatePraktikaConfig(
    customer_user: string,
    customer_secret: string,
    clinicID: number
  ) {
    const body = {
      customer_user: customer_user,
      customer_secret: customer_secret,
    };
    return this.http
      .post<
        IApiResponse<any>
      >(`${environment.baseApiUrl}/v1/common/clinics/${clinicID}/pms/praktika/config`, body, { withCredentials: true })
      .pipe(
        take(1),
        map((response: IApiResponse<any>) => {
          return { response };
        })
      );
  }

  public validatePraktikaLogin(customer_user: string, customer_secret: string) {
    const body = {
      customer_user: customer_user,
      customer_secret: customer_secret,
    };
    return this.http
      .post<
        IApiResponse<any>
      >(`${environment.baseApiUrl}/v1/common/praktika/validate-login`, body, { withCredentials: true })
      .pipe(
        take(1),
        map((response: IApiResponse<any>) => {
          return { response };
        })
      );
  }
}
