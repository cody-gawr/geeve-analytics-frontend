import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../../environments/environment";
import { Router  } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MorningHuddleService {
 public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;
    
    constructor(private http: HttpClient,private _cookieService: CookieService,private router: Router) {}

    getHeaders(){
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2'){
            this.token_id = this._cookieService.get("childid");
        } else {
            this.token_id= this._cookieService.get("userid");
        }
        var authString = this._cookieService.get("token")+" "+this.token_id;
        let headers = new HttpHeaders({'Authorization' : authString});
        return headers;
    }

    // clinic Production Service
    dentistProduction( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhProductionCard?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
     // clinic recallRate
    recallRate( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhRecallRateCard?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    reappointRate( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhReappointRateCard?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


     dentistList( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhDentistTable?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     getPatients( clinic_id,currentDentist,previousDay, user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhPatientsCard?clinic_id="+clinic_id+"&date="+previousDay+"&provider_id="+currentDentist+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     getNewPatients( clinic_id, currentDentist,previousDay,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhNewPatCard?clinic_id="+clinic_id+"&date="+previousDay+"&provider_id="+currentDentist+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     getScheduleHours( clinic_id, currentDentist,previousDay,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhSchedHoursCard?clinic_id="+clinic_id+"&date="+previousDay+"&provider_id="+currentDentist+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getUnscheduleHours( clinic_id, currentDentist,previousDay,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedBalCard?clinic_id="+clinic_id+"&date="+previousDay+"&provider_id="+currentDentist+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getAppointmentCards( clinic_id,currentDentist, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhApptTable?clinic_id="+clinic_id+"&date="+previousDays+"&provider_id="+currentDentist, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
    
    //  getReAppointment( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
    //     var header = this.getHeaders(); 
    //     return this.http.get(this.apiUrl +"/MorningHuddle/mhReappointPrev?clinic_id="+clinic_id+"&date="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
    //     .pipe(map((response: Response) => {
    //                     return response;
    //                 })
    //     );
    // } 

     /*getUnscheduledPatients( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedPatPrev?clinic_id="+clinic_id+"&date="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }*/
    
     getUnscheduledValues( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedBalPrev?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getTodayPatients( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhPatientsCurrent?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getTodayUnscheduledHours( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedHoursCurrent?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getChairUtilisationRate( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhChairUtilRate?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     getTodayUnscheduledBal( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhOverdueBalCurrent?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getNoShow( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhNoShowPrev?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
     getTodayPostopCalls( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhPostOpPrev?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
    getReminders( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhReminders?clinic_id="+clinic_id+"&date="+previousDays+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
/*
    getFollowupsUnscheduledPatients( clinic_id, previousDays,  days, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedPatTable?clinic_id="+clinic_id+"&date="+previousDays, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }*/
    followupPostOpCalls( clinic_id, previousDays,  days, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhPostOpTable?clinic_id="+clinic_id+"&date="+previousDays, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     followupTickFollowups( clinic_id, previousDays,  days, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhTickFollowupsTable?clinic_id="+clinic_id+"&date="+previousDays, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     followupOverdueRecalls( clinic_id, previousDays,  days, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhOverdueRecallsTable?clinic_id="+clinic_id+"&date="+previousDays, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }



    getDentists(clinic_id,  token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Dentists/dentGet?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    updateFollowUpStatus(event,pid,cid,type,previousDays): Observable<any> {
        var header = this.getHeaders(); 
        const formData = new FormData();
        formData.append('event', event);
        formData.append('patient_id', pid);
        formData.append('clinic_id', cid);
        formData.append('date', previousDays);
        formData.append('type', type);
        return this.http.post(this.apiUrl +"/MorningHuddle/mhUpdateFollowupStatus",formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

    getEndOfDays(cid,previousDays): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhEndDayTasks?clinic_id="+cid+"&date="+previousDays, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

    getEquipmentList(cid,previousDays): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhEquipmentList?clinic_id="+cid+"&date="+previousDays, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    updateStatus(event,pid,cid,type,previousDays): Observable<any> {
        var header = this.getHeaders(); 
        const formData = new FormData();
        formData.append('status', event);
        formData.append('patient_id', pid);
        formData.append('clinic_id', cid);
        formData.append('date', previousDays);
        formData.append('type', type);
        return this.http.post(this.apiUrl +"/MorningHuddle/mhUpdateStatus",formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    updateEndStatus(event,tid,thid,cid,date): Observable<any> {
        var header = this.getHeaders(); 
        const formData = new FormData();
        formData.append('status', event);
        formData.append('task_id', tid);
        formData.append('history_id', thid);
        formData.append('clinic_id', cid);
        formData.append('date', date);
        return this.http.post(this.apiUrl +"/MorningHuddle/mhUpdateEndDayTasks",formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Updae tick notes add/update
    notes(notes,pid, date,cid): Observable<any> {
        var header = this.getHeaders(); 
         const formData = new FormData();
        formData.append('notes', notes);
        formData.append('patient_id', pid);
        formData.append('clinic_id', cid);
        formData.append('date', date);
        formData.append('type', 'tick-follower');
        return this.http.post(this.apiUrl +"/MorningHuddle/mhUpdateStatus",formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
    // Updae tick notes add/update
    updateEquimentList(data,clinic_id,date): Observable<any> {
        var header = this.getHeaders(); 
         const formData = new FormData();
        formData.append('data', data);
        formData.append('clinic_id', clinic_id);
        formData.append('date', date);
        return this.http.post(this.apiUrl +"/MorningHuddle/mhUpdateEqulist",formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

      cloneRecord(pid,cid,type,followup_date,newFollowupDate, original_appt_date): Observable<any> {
        var header = this.getHeaders(); 
        const formData = new FormData();
        formData.append('new_followup', newFollowupDate);
        formData.append('patient_id', pid);
        formData.append('clinic_id', cid);
        formData.append('date', original_appt_date);
        formData.append('followup_date', followup_date);
        formData.append('type', type);
        return this.http.post(this.apiUrl +"/MorningHuddle/mhCloneStatus",formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
}
