import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable()
export class SetupService {
  public token: string;
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  private baseApiUrl = environment.baseApiUrl;
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
  getXeroLink(clinic_id): Observable<HttpResponse<{
    success: boolean,
    data: {
      url:string
    }
  }>> {
    var header = this.getHeaders();
    return this.http
      .get(
        environment.commonApiUrl +
          `/xero/auth-url/?clinics=[${clinic_id}]`,
        header
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  // Get getConnectCoreLink
  getConnectCoreLink(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
         environment.baseApiUrl + '/v1/common/corepractice/getAuthorizeUrl?clinic_id=' + clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getConnectDentallyLink(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        environment.baseApiUrl +
          '/v1/common/dentally/getAuthorizeUrl?clinic_id=' +
          clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getPMSLink(): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/users/userGetPMS/token', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }

  checkXeroStatus(clinic_id): Observable<any> {
    var header = this.getHeaders();
    // return this.http
    //   .get(
    //     this.apiUrl + '/Xeros2/xeroGetStatus?getxero=1&clinic_id=' + clinic_id,
    //     header
    //   )
    //   .pipe(
    //     map((response: HttpResponse<Object>) => {
    //       return response;
    //     })
    //   );
    return this.http
      .get(
        this.apiUrl +
          `/clinics/clinicGetAccountingPlatform?clinic_id=${clinic_id}&platform=xero`,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  getMyobLink(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/Myob/getAuthorizeUrl?clinic_id=' + clinic_id, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  checkMyobStatus(clinic_id): Observable<any> {
    var header = this.getHeaders();
    // return this.http
    //   .get(this.apiUrl + '/Myob/myobGetStatus?clinic_id=' + clinic_id, header)
    //   .pipe(
    //     map((response: HttpResponse<Object>) => {
    //       return response;
    //     })
    //   );
    return this.http
      .get(
        this.apiUrl +
          `/clinics/clinicGetAccountingPlatform?clinic_id=${clinic_id}&platform=myob`,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  clearSession(clinic_id): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('clinic_id', clinic_id);
    return this.http
      .post(this.apiUrl + '/Xeros2/disconnectXero/', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  clearSessionMyob(clinic_id): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('clinic_id', clinic_id);
    return this.http
      .post(this.apiUrl + '/Myob/disconnectMyob/', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  checkReportsStatus(
    clinicId,
    userId = this._cookieService.get('userid')
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + '/users/userCheckStatus/' + userId + '/' + clinicId,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  checkExactRepotrStatus(
    clinicId,
    userId = this._cookieService.get('userid')
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + '/users/userExactCheckStatus/' + userId + '/' + clinicId,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  updateStepperStatus(): Observable<any> {
    const formData = new FormData();
    formData.append('stepper_status', this._cookieService.get('stepper'));
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/users/userUpdateStepper', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  addClinic(name, displayName, days, pms, coreURL): Observable<any> {
    const formData = new FormData();
    // address,phone_no,clinicEmail,
    formData.append('clinicName', name);
    formData.append('displayName', displayName);
    formData.append('pms', pms);
    formData.append('days', days);
    // formData.append('coreURL', coreURL);
    formData.append('product', 'jeeve_analytics');
    /*formData.append('contactName', contact_name);*/
    /*formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('linkedin', linkedin);
    formData.append('logo', clinic_logo);
    formData.append('instagram', instagram);*/
    var header = this.getHeaders();

    return this.http
      .post(this.baseApiUrl + '/v1/common/clinics', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getClinicLocation(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + '/corepractice/getLocations?clinic_id=' + clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  saveClinicLocation(clinic_id, location_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/corepractice/saveLocation?clinic_id=' +
          clinic_id +
          '&location_id=' +
          location_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  checkCoreStatus(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        environment.baseApiUrl +
          '/v1/common/corepractice/checkStatus?clinic_id=' + clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  checkDentallyStatus(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        environment.baseApiUrl +
          '/v1/common/dentally/checkStatus?clinic_id=' +
          clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  checkCoreSyncStatus(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/corepractice/checkCoreSyncStatus?clinic_id=' +
          clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
}
