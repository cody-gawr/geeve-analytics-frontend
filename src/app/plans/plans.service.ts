import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class PlansService {
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
  getPlans(): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/Plans/getPlans', header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }

  // Delete Clinic
  deletePlan(user_id): Observable<any> {
    const formData = new FormData();
    formData.append('id', user_id);
    var header = this.getHeaders();

    return this.http.post(this.apiUrl + '/Plans/delete', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }

  // Update Clinic
  updatePlan(
    user_id,
    plan,
    allowedClinics,
    description,
    amount
  ): Observable<any> {
    const formData = new FormData();

    formData.append('id', user_id);
    formData.append('plan', plan);
    formData.append('allowedClinics', allowedClinics);
    formData.append('description', description);
    formData.append('amount', amount);
    formData.append('user_id', this._cookieService.get('userid'));
    formData.append('clinic_id', '1');
    var header = this.getHeaders();

    return this.http
      .post(this.apiUrl + '/Plans/update/', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Update Clinic
  addPlans(
    plan,
    allowedClinics,
    description,
    amount,
    discount
  ): Observable<any> {
    const formData = new FormData();

    formData.append('plan', plan);
    formData.append('allowedClinics', allowedClinics);
    formData.append('description', description);
    formData.append('amount', amount);
    formData.append('discount', discount);
    var header = this.getHeaders();
    return this.http.post(this.apiUrl + '/Plans/add/', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      })
    );
  }
}
