import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {
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
  getUsers(): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/Users/userGetPracticeOwners', header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Delete Clinic
  deleteUser(userId): Observable<any> {
    const formData = new FormData();
    formData.append('id', userId);
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
  /*    updateUser(userId, value, column): Observable<any> {
    const formData = new FormData();

    formData.append('id', userId);
    formData.append(column, value);
    var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/Users/userEdit", formData, header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }*/

  // Update Clinic
  addClinic(name, address, contact_name): Observable<any> {
    const formData = new FormData();

    formData.append('clinicName', name);
    formData.append('address', address);
    formData.append('contactName', contact_name);
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
}
