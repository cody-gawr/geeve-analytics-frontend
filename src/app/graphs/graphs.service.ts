import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class GraphsService {
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

  getFollowupsPerUser(
    clinic_id,
    startDate,
    endDate,
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/StaffMeeting/smGetPerUser?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Service
  DentistProduction(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/StaffMeeting/smDentistProduction?clinic_id=' +
            clinic_id +
            '&start_date=' +
            startDate +
            '&end_date=' +
            endDate +
            '&duration=' +
            duration,
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    }
    return this.http
      .get(
        this.apiUrl +
          '/StaffMeeting/smDentistProduction?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  hourlyRateChart(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/StaffMeeting/smHourlyRate?clinic_id=' +
            clinic_id +
            '&start_date=' +
            startDate +
            '&end_date=' +
            endDate +
            '&duration=' +
            duration,
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    }
    return this.http
      .get(
        this.apiUrl +
          '/StaffMeeting/smHourlyRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Service
  RecallPrebook(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/StaffMeeting/smRecallRate?clinic_id=' +
            clinic_id +
            '&start_date=' +
            startDate +
            '&end_date=' +
            endDate +
            '&duration=' +
            duration,
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    }
    return this.http
      .get(
        this.apiUrl +
          '/StaffMeeting/smRecallRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Service
  caReappointRate(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/StaffMeeting/smReappointRate?clinic_id=' +
            clinic_id +
            '&start_date=' +
            startDate +
            '&end_date=' +
            endDate +
            '&duration=' +
            duration,
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    }
    return this.http
      .get(
        this.apiUrl +
          '/StaffMeeting/smReappointRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Items Predictor Analysis
  fdWorkTimeAnalysis(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/StaffMeeting/smUtilisationRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Items Predictor Analysis
  fdvisitsRatio(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/StaffMeeting/smTotalVisits?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Items Predictor Analysis
  fdReappointRate(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/StaffMeeting/smReappointRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Items Predictor Analysis
  fdRecallPrebookRate(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/StaffMeeting/smRecallRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
}
