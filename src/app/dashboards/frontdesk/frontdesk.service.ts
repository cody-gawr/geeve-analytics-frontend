import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CancellationRatioResponse } from './frontdesk.interfaces';
@Injectable({
  providedIn: 'root'
})
export class FrontDeskService {
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
      observe: 'response' as const
    };
    return headers;
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
          '/FrontDesk/fdUtilisationRate?clinic_id=' +
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
  } // Items Predictor Analysis
  fdWorkTimeAnalysisByDay(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdUtilisationRateByDay?clinic_id=' +
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
  fdFtaRatio(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdFtaRatio?clinic_id=' +
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
  fdUtaRatio(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdUtaRatio?clinic_id=' +
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
  fdNumberOfTicks(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = ''
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdNumTicks?clinic_id=' +
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
  //Referral to Other Clinicians Internal / External
  fdWorkTimeAnalysisTrend(clinic_id, mode = ''): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdUtilisationRateTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  //Referral to Other Clinicians Internal / External
  fdFtaRatioTrend(clinic_id, mode = ''): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdFtaRatioTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  //Referral to Other Clinicians Internal / External
  fdUtaRatioTrend(clinic_id, mode = ''): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdUtaRatioTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  //Referral to Other Clinicians Internal / External
  fdNumberOfTicksTrend(clinic_id, mode = ''): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdNumTicksTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode,
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
          '/FrontDesk/fdRecallRate?clinic_id=' +
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
          '/FrontDesk/fdReappointRate?clinic_id=' +
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

  //Referral to Other Clinicians Internal / External
  fdRecallPrebookRateTrend(dentist_id, clinic_id, mode = ''): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdRecallRateTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  frontdeskdRecallPrebookRateTrend(clinic_id, mode = ''): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdRecallRateTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  //Referral to Other Clinicians Internal / External
  // fdTreatmentPrebookRateTrend(dentist_id,clinic_id, mode ='' ): Observable<any> {
  //     var header = this.getHeaders();
  //     return this.http.get(this.apiUrl +"/FrontDesk/fdReappointRateTrend?clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, header)
  //     .pipe(map((response: HttpResponse<Object>) => {
  //                     return response;
  //                 })
  //     );
  // }
  fdReappointRateTrend(clinic_id, mode = ''): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/FrontDesk/fdReappointRateTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getCancellationRatio(
    clinicId: number,
    startDate: string,
    endDate: string
  ): Observable<CancellationRatioResponse> {
    const header = this.getHeaders();
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdCancellationRatio`, {
        ...header,
        params: {
          clinic_id: clinicId,
          start_date: startDate,
          endDate: endDate
        }
      })
      .pipe(
        map(
          (response: HttpResponse<CancellationRatioResponse>) => response.body
        )
      );
  }

  getCancellationRatioTrend(
    clinicId: number,
    mode: string
  ): Observable<CancellationRatioResponse> {
    const header = this.getHeaders();
    return this.http
      .get(`${this.apiUrl}/FrontDesk/fdCancellationRatioTrend`, {
        ...header,
        params: {
          clinic_id: clinicId,
          mode
        }
      })
      .pipe(
        map(
          (response: HttpResponse<CancellationRatioResponse>) => response.body
        )
      );
  }
}
