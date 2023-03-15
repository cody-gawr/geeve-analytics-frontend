import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class RolesUsersService {
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
      withCredentials: true,
      observe: 'response' as const
    };
    return headers;
  }

  // Get Dentist
  getUsers(): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/Users/userGetRoles', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }

  // Get Dentist
  getRoles(): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/Roles/rolesGet', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }

  // Get Roles For individual
  getRolesIndividual(clinic_id = ''): Observable<any> {
    var header = this.getHeaders();
    if (clinic_id == '') {
      return this.http.get(this.apiUrl + '/Roles/rolesIndividual', header).pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
    }
    return this.http
      .get(
        this.apiUrl + '/Roles/rolesIndividual?clinic_id=' + clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Get Dentist
  getRoleUserDetails(role_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/Users/userGetRoleDetails?role_id=' + role_id, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // checkUserEmail
  checkUserEmail(email, user_roll = ''): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Users/userCheckEmail?email=' +
          email +
          '&user_roll=' +
          user_roll,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Delete Clinic
  deleteUser(userId, usertype): Observable<any> {
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('del_user_type', usertype);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/Users/userDelete', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Update Clinic
  saveRoles(role_id, checkedRoles): Observable<any> {
    const formData = new FormData();
    formData.append('role_id', role_id);
    formData.append('permisions', checkedRoles);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/Roles/rolesUpdate', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Update Clinic
  addRoleUser(
    display_name,
    email,
    user_type,
    selectedClinic,
    password,
    selected_dentist
  ): Observable<any> {
    const formData = new FormData();
    var dentist = JSON.stringify(selected_dentist);
    formData.append('display_name', display_name);
    formData.append('email', email);
    formData.append('userType', user_type);
    formData.append('password', password);
    formData.append('selected_dentist', dentist);
    formData.append('clinic_id', selectedClinic);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/Users/userAdd', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  addUserClinicConsultantMap(
    usrId,
    selectedClinics,
    display_name,
    email
  ): Observable<any> {
    const formData = new FormData();
    formData.append('id', usrId);
    formData.append('clinic_id', selectedClinics);
    formData.append('display_name', display_name);
    formData.append('email', email);
    var header = this.getHeaders();
    return this.http
      .post(this.apiUrl + '/Users/userClinicConsultantMap', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Update Clinic
  updateRoleUser(
    id,
    display_name,
    email,
    user_type,
    selectedClinic,
    selected_dentist,
    removedClinics,
    status
  ): Observable<any> {
    const formData = new FormData();
    var dentist = JSON.stringify(selected_dentist);
    formData.append('id', id);
    formData.append('display_name', display_name);
    formData.append('email', email);
    formData.append('usertype', user_type);
    formData.append('selected_dentist', dentist);
    formData.append('clinic_id', selectedClinic);
    formData.append('removed_ids', removedClinics);
    formData.append('status', status);

    var header = this.getHeaders();

    return this.http
      .post(this.apiUrl + '/Users/userUpdate', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getClinics(): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/clinics/clinicGet', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }

  private body = {
    body: { message: '', data: [], plan: '', type: 0 },
    status: 0
  };

  private roleIndividual = new BehaviorSubject(this.body);
  getRoleIndividual = this.roleIndividual.asObservable();

  setRoleIndividual(res) {
    this.roleIndividual.next(res);
  }
}
