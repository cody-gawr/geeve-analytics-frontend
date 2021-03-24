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
    dentistProduction( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhProductionCard?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
     // clinic recallRate
    recallRate( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhRecallRateCard?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    rebookTreatmentRate( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhRebookRateCard?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


     dentistList( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhDentistTable?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     getPatients( clinic_id,currentDentist,previousDay, user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhPatientsCard?clinic_id="+clinic_id+"&previous_days="+previousDay+"&provider_id="+currentDentist+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     getNewPatients( clinic_id, currentDentist,previousDay,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhNewPatCard?clinic_id="+clinic_id+"&previous_days="+previousDay+"&provider_id="+currentDentist+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     getScheduleHours( clinic_id, currentDentist,previousDay,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhSchedHoursCard?clinic_id="+clinic_id+"&previous_days="+previousDay+"&provider_id="+currentDentist+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getUnscheduleHours( clinic_id, currentDentist,previousDay,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedBalCard?clinic_id="+clinic_id+"&previous_days="+previousDay+"&provider_id="+currentDentist+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getAppointmentCards( clinic_id,currentDentist, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhApptTable?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&provider_id="+currentDentist, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
    
     getReAppointment( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhReappointPrev?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

     getUnscheduledPatients( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedPatPrev?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getUnscheduledValues( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedBalPrev?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getTodayPatients( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhPatientsCurrent?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getTodayUnscheduledHours( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedHoursCurrent?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
     getTodayUnscheduledBal( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhOverdueBalCurrent?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
     getNoShow( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhNoShowPrev?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
     getTodayPostopCalls( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhPostOpCurrent?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
    getReminders( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhReminders?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    getFollowupsUnscheduledPatients( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUnschedPatTable?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    followupPostOpCalls( clinic_id, previousDays,  user_type, clinician ="", token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhPostOpTable?clinic_id="+clinic_id+"&previous_days="+previousDays+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


    getDentists(clinic_id='1',  token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Dentists/dentGet?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    updateFollowUpStatus(event,pid,cid,uid,type,previousDays,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MorningHuddle/mhUpdateFollowupStatus?event="+event+"&patient_id="+pid+"&clinic_id="+cid+"&previous_days="+previousDays+"&type="+type, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
}
