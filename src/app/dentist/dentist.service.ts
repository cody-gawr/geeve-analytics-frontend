import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class DentistService {
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

  // Get Dentist
  getDentists(clinic_id, all = 0): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Dentists/dentGet?clinic_id=' +
          clinic_id +
          '&all=' +
          all,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  } // Get Dentist
  getJeeveNames(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + '/Dentists/getJeeveNames?clinic_id=' + clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // get Appbook
  getAppbook(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/Dentists/getAppbook?clinic_id=' + clinic_id, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Delete Dentist
  deleteDentists(dentist_id): Observable<any> {
    const formData = new FormData();

    formData.append('id', dentist_id);
    var header = this.getHeaders();

    return this.http
      .post(this.apiUrl + '/Dentists/delete', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Update Dentist
  updateDentists(
    dentist_id,
    value,
    clinic_id,
    isActive = null,
    jeeveId = '',
    updatedColumn = '',
    appBookId = '',
    jeeve_name = ''
  ): Observable<any> {
    const formData = new FormData();

    formData.append('clinic_id', clinic_id);
    formData.append('provider_id', dentist_id);

    if (jeeveId != '') {
      jeeveId = jeeveId == 'null' ? '' : jeeveId;
      formData.append('jeeve_id', jeeveId);
    }
    if (appBookId != '') {
      appBookId = appBookId == 'null' ? '' : appBookId;
      formData.append('app_book_id', appBookId);
    }
    if (updatedColumn != '') {
      formData.append(updatedColumn, value);
    }
    if (typeof value != 'undefined' && value != '' && updatedColumn == '') {
      formData.append('name', value);
    }
    if (typeof jeeve_name != 'undefined' && jeeve_name != '') {
      formData.append('jeeve_name', jeeve_name);
    }
    if (isActive != null) {
      formData.append('is_active', isActive);
    }
    var header = this.getHeaders();
    return this.http
      .post(environment.apiUrl + '/Dentists/dentUpdate', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Add Dentist
  addDentists(dentist_id, value, clinic_id): Observable<any> {
    const formData = new FormData();

    formData.append('provider_id', dentist_id);
    formData.append('name', value);
    formData.append('clinic_id', clinic_id);
    var header = this.getHeaders();

    return this.http.post(this.apiUrl + '/Dentists/add', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }
  // Get ChildDentist
  getChildID(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + '/Users/userGetChildDentist?clinic_id=' + clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  updateJeeveName(clinic_id, jeeve_name): Observable<any> {
    const formData = new FormData();
    formData.append('clinic_id', clinic_id);
    formData.append('jeeve_name', jeeve_name);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/Dentists/updateJeeveName', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getReferFriend(
    clinic_id,
    referFriendName,
    referFriendEmail
  ): Observable<any> {
    const formData = new FormData();
    formData.append('clinic_id', clinic_id);
    formData.append('recipient_name', referFriendName);
    formData.append('recipient_email', referFriendEmail);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/users/userReferFriend', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Get ClinicSettings
  getClinicSettings(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/clinics/clinicGet?clinic_id=' + clinic_id, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  private dentistList = new BehaviorSubject({
    body: { message: '', data: [] },
    status: 0,
  });

  currentDentistList = this.dentistList.asObservable();
  setDentistList(list) {
    this.dentistList.next(list);
  }
}
