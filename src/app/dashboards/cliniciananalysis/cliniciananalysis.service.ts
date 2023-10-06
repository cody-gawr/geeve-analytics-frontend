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
export class ClinicianAnalysisService {
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
  // Dentist Production Service
  DentistProduction(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caDentistProduction?clinic_id=' +
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
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caDentistProduction?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Service
  DentistProductionDentist(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caDentistProductionDentist?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caDentistProductionDentist?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Service
  DentistProductionOht(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caDentistProductionOht?clinic_id=' +
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
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caDentistProductionOht?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Service
  DentistCollection(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollection?clinic_id=' +
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
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollection?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Service
  DentistCollectionDentists(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionDentists?clinic_id=' +
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
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionDentists?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Service
  DentistCollectionOht(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionOht?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionOht?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist collection Exp Service
  DentistCollectionExp(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionExp?clinic_id=' +
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
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExp?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist collection Exp Service
  DentistCollectionExpDentists(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionExpDentists?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpDentists?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist collection Exp Service
  DentistCollectionExpOht(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionExpOht?clinic_id=' +
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
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpOht?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Service
  changeLoginStatus(): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + '/users/changeLoginStatus?token_id=' + this.token_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Single Service
  DentistProductionSingle(
    dentist_id,
    clinic_id = '1',
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caDentistProduction?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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
  // Dentist Production Single Service
  DentistProductionDentistSingle(
    dentist_id,
    clinic_id = '1',
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caDentistProductionDentist?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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
  // Dentist Production Single Service
  DentistProductionOhtSingle(
    dentist_id,
    clinic_id = '1',
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caDentistProductionOht?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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
  // Dentist Production Single Service
  DentistCollectionSingle(
    dentist_id,
    clinic_id = '1',
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollection?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  // Dentist Production Single Service
  DentistCollectionDentistsSingle(
    dentist_id,
    clinic_id = '1',
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionDentists?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  // Dentist Production Single Service
  DentistCollectionOhtSingle(
    dentist_id,
    clinic_id = '1',
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionOht?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  // Dentist Production Single Service
  DentistCollectionExpSingle(
    dentist_id,
    clinic_id = '1',
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExp?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  // Dentist Production Single Service
  DentistCollectionExpDentistsSingle(
    dentist_id,
    clinic_id = '1',
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpDentists?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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
  // Dentist Production Single Service
  DentistCollectionExpOhtSingle(
    dentist_id,
    clinic_id = '1',
    startDate = '',
    endDate = '',
    duration = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpOht?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  // Dentist Production Single Service
  caDentistProtectionTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caDentistProductionTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Single Service
  caDentistProtectionDentistsTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caDentistProductionDentistTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Single Service
  caDentistProtectionOhtTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caDentistProductionOhtTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Single Service
  caDentistCollectionTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Single Service
  caDentistCollectionDentistsTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionDentistsTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Single Service
  caDentistCollectionOhtTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionOhtTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Single Service
  caDentistCollectionExpTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Single Service
  caDentistCollectionExpDentistsTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpDentistsTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Single Service
  caDentistCollectionExpOhtTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpOhtTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  //Treatment Plan Average Cost service
  TreatmentPlan(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caTxPlanAvgProposedFees?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caTxPlanAvgProposedFees?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  //Treatment Plan Average Cost Single service
  TreatmentPlanDentist(
    dentist_id,
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
          '/ClinicianAnalysis/caTxPlanAvgProposedFees?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&provider_id=' +
          dentist_id +
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

  //Treatment Plan Average Cost service
  TreatmentPlanCompletedFees(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caTxPlanAvgCompletedFees?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caTxPlanAvgCompletedFees?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  //Treatment Plan Average Cost Single service
  TreatmentPlanCompletedFeesDentist(
    dentist_id,
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
          '/ClinicianAnalysis/caTxPlanAvgCompletedFees?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&provider_id=' +
          dentist_id +
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

  // Dentist Production Single Service
  caNumberPatientComplaintsTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caNumComplaintsTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Single Service
  caTreatmentPlanAverageCostTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caTxPlanAvgProposedFeesTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // Dentist Production Single Service
  caTreatmentPlanAverageCompletedFeeTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caTxPlanAvgCompletedFeesTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  //Recall Prebook Rate service
  /*    RecallPrebook(clinic_id, startDate = '', endDate = '', duration='' ): Observable<any> {
            return this.http.get(this.apiUrl +"/ClinicianAnalysis/caTreatmentPlanAverageCost?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
            .pipe(map((response: HttpResponse<Object>) => {
                            return response;
                        })
            );
        } */

  //Hourly Rate service
  NoPatients(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caNumComplaints?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caNumComplaints?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&provider_id=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  //Hourly Rate service
  NoPatientsDentist(
    dentist_id,
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
          '/ClinicianAnalysis/caNumComplaints?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  // Dentist Production Service
  RecallPrebook(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caRecallRate?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caRecallRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Service
  RecallPrebookSingle(
    dentist_id,
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
          '/ClinicianAnalysis/caRecallRate?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  // Dentist Production Service
  caReappointRate(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caReappointRate?clinic_id=' +
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
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caReappointRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  caReappointRateTrend(
    dentist_id,
    clinic_id,
    mode,
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caReappointRateTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Service
  caReappointRateSingle(
    dentist_id,
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
          '/ClinicianAnalysis/caReappointRate?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  // Dentist Production Service
  TreatmentPlanRate(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caTxPlanCompRate?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caTxPlanCompRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Service
  TreatmentPlanRateSingle(
    dentist_id,
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
          '/ClinicianAnalysis/caTxPlanCompRate?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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
  //Hourly Rate service
  NewPatients(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caNumNewPatients?clinic_id=' +
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
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caNumNewPatients?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  NewPatientsDentist(
    dentist_id,
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
          '/ClinicianAnalysis/caNumNewPatients?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  hourlyRateChart(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caHourlyRate?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caHourlyRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  hourlyRateChartDesntists(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caHourlyRateDentists?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caHourlyRateDentists?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  hourlyRateChartOht(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caHourlyRateOht?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caHourlyRateOht?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Single Service
  cahourlyRateRateTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caHourlyRateTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // hourly rate collection
  collectionHourlyRate(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionHourlyRate?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionHourlyRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  collectionHourlyRateDentist(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionHourlyRateDentist?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionHourlyRateDentist?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  collectionHourlyRateOht(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionHourlyRateOht?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionHourlyRateOht?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  collectionHourlyRateSingle(
    dentist_id,
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
          '/ClinicianAnalysis/caCollectionHourlyRate?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  collectionHourlyRateTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionHourlyRateTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // hourly rate collection EXP
  collectionExpHourlyRate(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionExpHourlyRate?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpHourlyRate?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  collectionExpHourlyRateDentist(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionExpHourlyRateDentist?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpHourlyRateDentist?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  collectionExpHourlyRateOht(
    clinic_id,
    startDate = '',
    endDate = '',
    duration = '',
    user_type = '',
    clinician = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();

    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
            '/ClinicianAnalysis/caCollectionExpHourlyRateOht?clinic_id=' +
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

    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpHourlyRateOht?clinic_id=' +
          clinic_id +
          '&start_date=' +
          startDate +
          '&end_date=' +
          endDate +
          '&duration=' +
          duration +
          '&clinician=' +
          clinician +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  collectionExpHourlyRateSingle(
    dentist_id,
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
          '/ClinicianAnalysis/caCollectionExpHourlyRate?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  collectionExpHourlyRateTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caCollectionExpHourlyRateTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Single Service
  cahourlyRateChartDesntistsTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caHourlyRateDentistsTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Single Service
  cahourlyRateChartOhtTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caHourlyRateOhtTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Single Service
  canewPatientsRateTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caNumNewPatientsTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Dentist Production Single Service
  catreatmentPlanRateTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caTxPlanCompRateTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  //Treatment Plan Average Cost service
  hourlyRateSingle(
    dentist_id,
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
          '/ClinicianAnalysis/caHourlyRate?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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
  hourlyRateDentistsSingle(
    dentist_id,
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
          '/ClinicianAnalysis/caHourlyRateDentists?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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
  hourlyRateOhtSingle(
    dentist_id,
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
          '/ClinicianAnalysis/caHourlyRateOht?clinic_id=' +
          clinic_id +
          '&provider_id=' +
          dentist_id +
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

  getAccountingDentist(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/getAccountingDentist?clinic_id=' +
          clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  getStatusDentist(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/getStatusDentist?clinic_id=' +
          clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  saveDentistMapping(data, clinic_id): Observable<any> {
    const formData = new FormData();

    formData.append('dentistData', data);
    formData.append('clinic_id', clinic_id);

    var header = this.getHeaders();
    return this.http
      .post(
        this.apiUrl + '/ClinicianAnalysis/saveDentistMapping/',
        formData,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  cpRecallPrebookRateTrend(
    dentist_id,
    clinic_id,
    mode = '',
    queryWhEnabled = 0
  ): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/ClinicianAnalysis/caRecallRateTrend?clinic_id=' +
          clinic_id +
          '&mode=' +
          mode +
          '&provider_id=' +
          dentist_id +
          (queryWhEnabled > 0 ? '&wh=1' : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  /******** get clinic **********/
  getClinics(clinicId, clinicInfo): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl +
          '/clinics/clinicGetInfo?clinic_id=' +
          clinicId +
          '&clinic_info=' +
          clinicInfo,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  /******** get clinic **********/
  getClinicFollowUpSettings(clinicId): Observable<{
    data: {
      clinic_id: number;
      compare_mode: number;
      connectedwith: string;
      consultant: string;
      custom_tx_codes: string;
      daily_task_enable: number; // 0-1
      days: string; // json string
      equip_list_enable: number; // 0-1
      fta_days_later: number;
      fta_enable: number;
      fta_followup_days: number;
      health_screen_mtd: number;
      hourly_rate_appt_hours: number;
      lab_code1: string;
      lab_code2: string;
      max_chart_bars: number;
      net_profit_exclusions: string;
      new_patients_main: number;
      opg_months: number;
      post_op_calls: string;
      post_op_days: number;
      post_op_enable: number;
      recall_code1: string;
      recall_code2: string;
      recall_code3: string;
      recall_enable: number;
      recall_rate_default: number;
      recall_weeks: number;
      referral_enable: number;
      referral_weeks: number;
      tick_days: number;
      tick_enable: number;
      trial_end_date: string;
      uta_days_later: number;
      uta_enable: number;
      uta_followup_days: number;
      utility_ver: string;
      xray_months: number;
      sms_enabled: number;
      accepted_sms_terms: number;
    };
    message: string;
  }> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + '/clinics/clinicGetSettings?clinic_id=' + clinicId,
        header
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.body;
        })
      );
  }
}
