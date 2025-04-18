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
export class MorningHuddleService {
  public token: string;
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  public token_id;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private router: Router,
  ) { }

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

  // clinic Production Service
  dentistProduction(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    const urlParams = new URLSearchParams(window.location.search);
    const isWhEnabled = urlParams.get('wh') ? parseInt(urlParams.get('wh')) : -1;
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhProductionCard?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays +
          (isWhEnabled > -1 ? '&wh=' + isWhEnabled : ''),
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
        '/MorningHuddle/mhProductionCard?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
        '&clinician=' +
        clinician +
        (isWhEnabled > -1 ? '&wh=' + isWhEnabled : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // clinic recallRate
  recallRate(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    const urlParams = new URLSearchParams(window.location.search);
    const isWhEnabled = urlParams.get('wh') ? parseInt(urlParams.get('wh')) : -1;;
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhRecallRateCard?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays +
          (isWhEnabled > -1 ? '&wh=' + isWhEnabled : ''),
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
        '/MorningHuddle/mhRecallRateCard?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
        '&clinician=' +
        clinician +
        (isWhEnabled > -1 ? '&wh=' + isWhEnabled : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  reappointRate(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    const urlParams = new URLSearchParams(window.location.search);
    const isWhEnabled = urlParams.get('wh') ? parseInt(urlParams.get('wh')) : -1;;
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhReappointRateCard?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays +
          (isWhEnabled > -1 ? '&wh=' + isWhEnabled : ''),
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
        '/MorningHuddle/mhReappointRateCard?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
        '&clinician=' +
        clinician +
        (isWhEnabled > -1 ? '&wh=' + isWhEnabled : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  dentistList(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    const urlParams = new URLSearchParams(window.location.search);
    const isWhEnabled = urlParams.get('wh') ? parseInt(urlParams.get('wh')) : -1;;
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhDentistTable?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays +
          (isWhEnabled > -1 ? '&wh=' + isWhEnabled : ''),
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
        '/MorningHuddle/mhDentistTable?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
        '&clinician=' +
        clinician +
        (isWhEnabled > -1 ? '&wh=' + isWhEnabled : ''),
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getPatients(
    clinic_id,
    currentDentist,
    previousDay,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhPatientsCard?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDay +
          '&provider_id=' +
          currentDentist,
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
        '/MorningHuddle/mhPatientsCard?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDay +
        '&provider_id=' +
        currentDentist +
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

  getNewPatients(
    clinic_id,
    currentDentist,
    previousDay,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDay = previousDay.slice(0, 10);
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhNewPatCard?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDay +
          '&provider_id=' +
          currentDentist,
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
        '/MorningHuddle/mhNewPatCard?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDay +
        '&provider_id=' +
        currentDentist +
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

  getScheduleHours(
    clinic_id,
    currentDentist,
    previousDay,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDay = previousDay.slice(0, 10);
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhSchedHoursCard?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDay +
          '&provider_id=' +
          currentDentist,
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
        '/MorningHuddle/mhSchedHoursCard?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDay +
        '&provider_id=' +
        currentDentist +
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

  getUnscheduleHours(
    clinic_id,
    currentDentist,
    previousDay,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDay = previousDay.slice(0, 10);
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhUnschedBalCard?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDay +
          '&provider_id=' +
          currentDentist,
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
        '/MorningHuddle/mhUnschedBalCard?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDay +
        '&provider_id=' +
        currentDentist +
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

  getAppointmentCards(
    clinic_id,
    currentDentist,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    const urlParams = new URLSearchParams(window.location.search);
    const isWhEnabled = urlParams.get('wh') ? parseInt(urlParams.get('wh')) : -1;;
    return this.http
      .get(
        this.apiUrl +
        '/MorningHuddle/mhApptTable?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
        '&provider_id=' +
        currentDentist,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getUnscheduledValues(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhUnschedBalPrev?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays,
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
        '/MorningHuddle/mhUnschedBalPrev?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
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

  getTodayPatients(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhPatientsCurrent?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays,
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
        '/MorningHuddle/mhPatientsCurrent?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
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

  getTodayUnscheduledHours(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    const urlParams = new URLSearchParams(window.location.search);
    const isWhEnabled = urlParams.get('wh') ? parseInt(urlParams.get('wh')) : -1;;
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhUnschedHoursCurrent?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays,
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
        '/MorningHuddle/mhUnschedHoursCurrent?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
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

  getChairUtilisationRate(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhChairUtilRate?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays,
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
        '/MorningHuddle/mhChairUtilRate?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
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

  getTodayUnscheduledBal(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhOverdueBalCurrent?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays,
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
        '/MorningHuddle/mhOverdueBalCurrent?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
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

  getNoShow(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhNoShowPrev?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays,
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
        '/MorningHuddle/mhNoShowPrev?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
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

  getTodayPostopCalls(
    clinic_id,
    previousDays,
    user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    if (clinician == '') {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhPostOpPrev?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays,
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
        '/MorningHuddle/mhPostOpPrev?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays +
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

  getReminders(
    clinic_id,
    previousDays,
    // user_type,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    // const urlParams = new URLSearchParams(window.location.search);
    // const isWhEnabled = urlParams.get('wh')?parseInt(urlParams.get('wh')): -1;;
    if (!!clinician) {
      return this.http
        .get(
          this.apiUrl +
          '/MorningHuddle/mhReminders?clinic_id=' +
          clinic_id +
          '&date=' +
          previousDays +
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


    return this.http
      .get(
        this.apiUrl +
        '/MorningHuddle/mhReminders?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  /*
        getFollowupsUnscheduledPatients( clinic_id, previousDays,  days, clinician ="" ): Observable<any> {
            var header = this.getHeaders(); 
            return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedPatTable?clinic_id="+clinic_id+"&date="+previousDays, header)
            .pipe(map((response: HttpResponse<Object>) => {
                            return response;
                        })
            );
        }*/
  followupPostOpCalls(
    clinic_id,
    previousDays,
    days,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    return this.http
      .get(
        this.apiUrl +
        '/MorningHuddle/mhPostOpTable?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  followupTickFollowups(
    clinic_id,
    previousDays,
    days,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    return this.http
      .get(
        this.apiUrl +
        '/MorningHuddle/mhTickFollowupsTable?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  followupFtaFollowups(clinic_id, previousDays, days): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    return this.http
      .get(
        this.apiUrl +
        '/MorningHuddle/mhFtaFollowupsTable?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  followupUtaFollowups(clinic_id, previousDays, days): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    return this.http
      .get(
        this.apiUrl +
        '/MorningHuddle/mhUtaFollowupsTable?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  followupOverdueRecalls(
    clinic_id,
    previousDays,
    days,
    clinician = ''
  ): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    return this.http
      .get(
        this.apiUrl +
        '/MorningHuddle/mhOverdueRecallsTable?clinic_id=' +
        clinic_id +
        '&date=' +
        previousDays,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getDentists(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/Dentists/dentGet?clinic_id=' + clinic_id, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  updateFollowUpStatus(
    event,
    pid,
    cid,
    type,
    previousDays,
    fdate
  ): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('event', event);
    formData.append('patient_id', pid);
    formData.append('clinic_id', cid);
    formData.append('date', previousDays);
    formData.append('fdate', fdate);
    formData.append('type', type);
    return this.http
      .post(
        this.apiUrl + '/MorningHuddle/mhUpdateFollowupStatus',
        formData,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getEndOfDays(cid, previousDays): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    return this.http
      .get(
        this.apiUrl +
        '/MorningHuddle/mhEndDayTasks?clinic_id=' +
        cid +
        '&date=' +
        previousDays,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getEquipmentList(cid, previousDays): Observable<any> {
    var header = this.getHeaders();
    previousDays = previousDays.slice(0, 10);
    return this.http
      .get(
        this.apiUrl +
        '/MorningHuddle/mhEquipmentList?clinic_id=' +
        cid +
        '&date=' +
        previousDays,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  getScripts(cid): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/MorningHuddle/mhGetScripts?clinic_id=' + cid, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  updateStatus(event, pid, cid, type, previousDays, fdate): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('status', event);
    formData.append('patient_id', pid);
    formData.append('clinic_id', cid);
    formData.append('date', previousDays);
    formData.append('fdate', fdate);
    formData.append('type', type);
    return this.http
      .post(this.apiUrl + '/MorningHuddle/mhUpdateStatus', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  updateEndStatus(event, tid, thid, cid, date): Observable<any> {
    var header = this.getHeaders();
    date = date.slice(0, 10);
    const formData = new FormData();
    formData.append('status', event);
    formData.append('task_id', tid);
    formData.append('history_id', thid);
    formData.append('clinic_id', cid);
    formData.append('date', date);
    return this.http
      .post(
        this.apiUrl + '/MorningHuddle/mhUpdateEndDayTasks',
        formData,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Updae tick notes add/update
  notes(notes, pid, date, cid, fdate, type): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('notes', notes);
    formData.append('patient_id', pid);
    formData.append('clinic_id', cid);
    formData.append('date', date);
    formData.append('fdate', fdate);
    formData.append('type', type);
    return this.http
      .post(this.apiUrl + '/MorningHuddle/mhUpdateStatus', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  // Updae tick notes add/update
  updateEquimentList(data, clinic_id, date): Observable<any> {
    var header = this.getHeaders();
    date = date.slice(0, 10);
    const formData = new FormData();
    formData.append('data', data);
    formData.append('clinic_id', clinic_id);
    formData.append('date', date);
    return this.http
      .post(this.apiUrl + '/MorningHuddle/mhUpdateEqulist', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  cloneRecord(
    pid,
    cid,
    type,
    followup_date,
    newFollowupDate,
    original_appt_date,
    nextReach = ''
  ): Observable<{
    status: boolean;
    message: 'success' | 'already';
    $getRecord: any;
  }> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('new_followup', newFollowupDate);
    formData.append('patient_id', pid);
    formData.append('clinic_id', cid);
    formData.append('date', original_appt_date);
    formData.append('followup_date', followup_date);
    formData.append('type', type);
    formData.append('next_reach', nextReach);
    return this.http
      .post(this.apiUrl + '/MorningHuddle/mhCloneStatus', formData, header)
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.body;
        })
      );
  }
  // Users api
  createPaymentIntent(
    creditAmount: number,
    clinic_id: number
  ): Observable<{
    data: {
      totalAmount: number;
      taxAmount: number;
      clientSecret: string;
    };
  }> {
    const header = this.getHeaders();
    return this.http
      .post(
        environment.commonApiUrl + '/sms/createPaymentIntent',
        {
          amount: creditAmount,
          clinic_id,
        },
        header
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          return res.body;
        })
      );
  }

  getCreditStatus(
    clinic_id: number,
    appt_ids: {
      appiont_id: string;
      phone_number: string;
    }[] = [],
    date = ''
  ): Observable<{
    status: boolean;
    data: {
      sms_status_list: Array<{ sms_status: string; appoint_id: string }>;
      remain_credits: number;
      cost_per_sms: number;
      phone_number: string | null;
      review_msg: string | null;
    };
  }> {
    const header = this.getHeaders();
    return this.http
      .post(
        environment.commonApiUrl + '/sms/updateCreditStatus',
        {
          clinic_id: clinic_id,
          appts: appt_ids,
          date: date,
        },
        header
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          return res.body;
        })
      );
  }

  sendReviewMsg(
    clinic_id: number,
    patient_id: number,
    patient_name: string,
    review_msg: string,
    phone_number: string,
    appoint_id: string
  ): Observable<{ status: string; sid: string }> {
    const header = this.getHeaders();
    return this.http
      .post(
        environment.commonApiUrl + '/sms/sendReviewMsg',
        {
          clinic_id,
          patient_id,
          patient_name,
          review_msg,
          phone_number,
          appoint_id,
        },
        header
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          return res.body;
        })
      );
  }

  initiateCall(callType: string, callId: number, phoneNumber: string, patientName: string, doctorName: string, procedure: string, clinicName: string, clinicId: number, treatmentId: number, patientId: number, originalAppointmentDate: string) {
    const header = this.getHeaders();
    return this.http.post(`${environment.baseApiUrl}/v1/voice/initiate`, {
      phoneNumber: phoneNumber,
      callType: callType,
      callId: callId,
      treatmentId: treatmentId,
      clinicId: clinicId,
      patientData: {
        patientId: patientId,
        name: patientName,
        doctorName: doctorName,
        procedure: procedure,
        clinicName: clinicName,
        callerName: 'Emma',
        originalAppointmentDate: originalAppointmentDate
      }
    }, header)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res.body;
        })
      );
  }

  scheduleBulkCall(calls: Array<{
    recordId: number;
    phoneNumber: string;
    callType: string;
    clinicId: number;
    treatmentId: number;
    followUpDate: string;
    payload: {
      name: string;
      doctorName: string;
      procedure: string;
      clinicName: string;
      callerName: string;
      originalAppointmentDate: string;
      treatmentId: number;
      patientId: number;
    };
  }>) {
    return this.http.post(`${environment.baseApiUrl}/v1/voice/schedules`, { calls });
  }

  getCallLogs(recordId: number, clinicId: string) {
    return this.http.get(`${environment.baseApiUrl}/v1/voice/call-logs`, {
      params: {
        callId: recordId,
        callType: 'postop'
      }
    });
  }
}
