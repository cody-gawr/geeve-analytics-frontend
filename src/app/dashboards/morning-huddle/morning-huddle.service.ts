import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';
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
    dentistProduction( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/huddleDentistPerformance?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
     // clinic recallRate
    recallRate( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/huddleRecallPrebookRate?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    rebookTreatmentRate( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/huddleTreatmentPrebookRate?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


     dentistList( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/huddledDentistList?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     getPatients( clinic_id,currentDentist,previousDay, user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/getPatients?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDay+"&provider_id="+currentDentist+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     getNewPatients( clinic_id, currentDentist,previousDay,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/getNewPatients?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDay+"&provider_id="+currentDentist+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     getScheduleHours( clinic_id, currentDentist,previousDay,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/getScheduledHours?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDay+"&provider_id="+currentDentist+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getUnscheduleHours( clinic_id, currentDentist,previousDay,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/getUnscheduled?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDay+"&provider_id="+currentDentist+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getAppointmentCards( clinic_id,currentDentist, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/getAppointmentCards?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician+"&provider_id="+currentDentist, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
    
     getReAppointment( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/huddleFDReappointment?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

     getUnscheduledPatients( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/huddleFDUnscheduledPatients?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getUnscheduledValues( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/huddleFDUnscheduledValue?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getTodayPatients( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/getTodayPatients?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getTodayUnscheduledHours( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/huddleUnscheduledHours?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
     getTodayUnscheduledBal( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/huddleOutstandingBalance?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
     getTodayPostopCalls( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/huddlePostOpCalls?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
    getReminders( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/getRemindersRecallsOverdue?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
    getRemindersTreatmentOutstanding( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/getRemindersTreatmentOutstanding?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
    getRemindersOutstandingBalances( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/getRemindersOutstandingBalances?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    getFollowupsUnscheduledPatients( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/getFollowupsUnscheduledPatients?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    followupPostOpCalls( clinic_id, previousDays,  user_type, clinician ="", user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/followupPostOpCalls?user_id="+user_id+"&clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


    getDentists(clinic_id='1', user_id=this._cookieService.get("userid") , token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/dentists?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    updateFollowUpStatus(event,pid,cid,uid,type,previousDays,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/morning-huddle/updateFollowUpStatus?event="+event+"&pid="+pid+"&cid="+cid+"&uid="+uid+"&previous_days="+previousDays+"&type="+type, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
}
