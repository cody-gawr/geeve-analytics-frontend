import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ClinicGoalsService {
  public token: string;
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  public token_id;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private router: Router,
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

  // Get ClinicGoals
  getClinicGoals(clinic_id = ''): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/Goals/goalGetClinic?clinic_id=' + clinic_id, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }
  // Get ClinicGoals updated
  getGoalAllData(clinic_id = '', dentist_id, selectedYear): Observable<any> {
    var header = this.getHeaders();
    if (dentist_id == '') {
      return this.http
        .get(
          this.apiUrl + '/Goals/goalGetData?clinic_id=' + clinic_id + '&year=' + selectedYear,
          header,
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          }),
        );
    }
    return this.http
      .get(
        this.apiUrl +
          '/Goals/goalGetData?clinic_id=' +
          clinic_id +
          '&dentist_id=' +
          dentist_id +
          '&year=' +
          selectedYear,
        header,
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        }),
      );
  }
  // Get ClinicGoals
  updateClinicGoals(clinicData, clinic_id = ''): Observable<any> {
    const formData = new FormData();
    formData.append('goals', clinicData);
    formData.append('clinic_id', clinic_id);
    var header = this.getHeaders();
    return this.http.post(this.apiUrl + '/Goals/goalAddClinic', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }
}
