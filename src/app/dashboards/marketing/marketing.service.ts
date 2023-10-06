import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MarketingService {
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
  // Items Predictor Analysis
  mkNewPatientsByReferral(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkNumPatientsByReferral?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Items Predictor Analysis  trend mode

  mkNewPatientsByReferralTrend(
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkNumPatientsByReferralTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
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
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkTotalVisits?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Items Predictor Analysis
  mkRevenueByReferral(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkRevByReferral?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Items Predictor Analysis  trend mode

  mkRevenueByReferralTrend(
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkRevByReferralTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  //Referral to Other Clinicians Internal / External
  mkTotalVisitsTrend(
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkTotalVisitsTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  //Referral to Other Clinicians Internal / External
  fdnewPatientsRatio(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkNumNewPatients?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  //Referral to Other Clinicians Internal / External
  fdActivePatient(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkActivePatients?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  //Referral to Other Clinicians Internal / External
  mkNoNewPatientsTrend(
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkNumNewPatientsTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  mkNoActivePatientsTrend(
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkActivePatientsTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  //Get Xero Accounts
  getAccounts(
    clinic_id,
    user_id = this._cookieService.get('userid')
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/Marketing/mkGetXeroAcct?user_id=' +
          user_id +
          '&clinic_id=' +
          clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  //Get Xero Categories
  saveSelectedCategories(clinic_id, categories): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('clinic_id', clinic_id);
    formData.append('categories', categories);
    return this.http
      .post(this.apiUrl + '/Marketing/mkSaveAcctXero', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  //Get Xero Accounts
  getMyobAccounts(
    clinic_id,
    user_id = this._cookieService.get('userid')
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/Myob/mkGetMyobAcct?clinic_id=' + clinic_id, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  //Get Xero Categories
  mkSaveAcctMyob(clinic_id, categories): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('clinic_id', clinic_id);
    formData.append('categories', categories);
    return this.http
      .post(this.apiUrl + '/Myob/mkSaveAcctMyob', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // categoryExpenses
  categoryExpenses(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    connectedwith = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    if (connectedwith == 'xero') {
      return this.http
        .get(
          this.apiUrl +
            '/Marketing/mkNewPatientAcq?clinic_id=' +
            clinic_id +
            '&start_date=' +
            startDate +
            '&end_date=' +
            endDate +
            '&duration=' +
            duration +
            (queryWhEnabled > 0 ? '&wh=1' : ''),
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    } else if (connectedwith == 'myob') {
      return this.http
        .get(
          this.apiUrl +
            '/Marketing/mkMyobNewPatientAcq?clinic_id=' +
            clinic_id +
            '&start_date=' +
            startDate +
            '&end_date=' +
            endDate +
            '&duration=' +
            duration +
            (queryWhEnabled > 0 ? '&wh=1' : ''),
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    }

    return null;
  }

  // finExpensesByCategoryTrend
  categoryExpensesTrend(
    clinic_id,
    mode = '',
    connectedwith = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    if (connectedwith == 'xero') {
      return this.http
        .get(
          this.apiUrl +
            '/Marketing/mkNewPatientAcqTrend?clinic_id=' +
            clinic_id +
            '&mode=' +
            mode +
            (queryWhEnabled > 0 ? '&wh=1' : ''),
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    } else if (connectedwith == 'myob') {
      return this.http
        .get(
          this.apiUrl +
            '/Marketing/mkMyobNewPatientAcqTrend?clinic_id=' +
            clinic_id +
            '&mode=' +
            mode +
            (queryWhEnabled > 0 ? '&wh=1' : ''),
          header
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            return response;
          })
        );
    }

    return null;
  }

  saveXeroCategories(clinic_id, categories): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('clinic_id', clinic_id);
    formData.append('xero_selected_accounts', categories);
    return this.http
      .post(this.apiUrl + '/Marketing/mkSaveAcctXeroNew', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
}
