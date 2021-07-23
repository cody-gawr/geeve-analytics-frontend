import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../environments/environment";
import { Router  } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FollowupsService {
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

    followupPostOpCalls( clinic_id, month,  year ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Followups/fuPostOpTable?clinic_id="+clinic_id+"&month="+month+"&year="+year, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     followupTickFollowups(clinic_id, month,  year ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Followups/fuTickFollowupsTable?clinic_id="+clinic_id+"&month="+month+"&year="+year, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    followupFtaFollowups(clinic_id, month,  year ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Followups/fuFtaFollowupsTable?clinic_id="+clinic_id+"&month="+month+"&year="+year, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     followupOverdueRecalls( clinic_id, month,  year ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Followups/fuOverdueRecallsTable?clinic_id="+clinic_id+"&month="+month+"&year="+year, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
 

    updateFollowUpStatus(event,pid,cid,type,previousDays,fdate): Observable<any> {
        var header = this.getHeaders(); 
        const formData = new FormData();
        formData.append('event', event);
        formData.append('patient_id', pid);
        formData.append('clinic_id', cid);
        formData.append('date', previousDays);
        formData.append('fdate', fdate);
        formData.append('type', type);
        return this.http.post(this.apiUrl +"/Followups/fuUpdateFollowupStatus",formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 


    updateStatus(event,pid,cid,type,previousDays,fdate): Observable<any> {
        var header = this.getHeaders(); 
        const formData = new FormData();
        formData.append('status', event);
        formData.append('patient_id', pid);
        formData.append('clinic_id', cid);
        formData.append('date', previousDays);
        formData.append('fdate', fdate);
        formData.append('type', type);        
        return this.http.post(this.apiUrl +"/Followups/fuUpdateStatus",formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    cloneRecord(pid,cid,type,followup_date,newFollowupDate, original_appt_date,nextReach = ''): Observable<any> {
        var header = this.getHeaders(); 
        const formData = new FormData();
        formData.append('new_followup', newFollowupDate);
        formData.append('patient_id', pid);
        formData.append('clinic_id', cid);
        formData.append('date', original_appt_date);
        formData.append('followup_date', followup_date);
        formData.append('type', type);
        formData.append('next_reach',nextReach );
        return this.http.post(this.apiUrl +"/Followups/fuCloneStatus",formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
    // Updae tick notes add/update
    notes(notes,pid, date,cid, fdate, type): Observable<any> {
        var header = this.getHeaders(); 
         const formData = new FormData();
        formData.append('notes', notes);
        formData.append('patient_id', pid);
        formData.append('clinic_id', cid);
        formData.append('date', date);
        formData.append('fdate', fdate);
        formData.append('type', type);
        return this.http.post(this.apiUrl +"/Followups/fuUpdateStatus",formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
}
