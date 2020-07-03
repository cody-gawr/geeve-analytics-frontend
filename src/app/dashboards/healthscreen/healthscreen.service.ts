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
export class HealthScreenService {
 public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;

    constructor(private http: HttpClient,private _cookieService: CookieService,private router: Router) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        this.headers.append("Token", this._cookieService.get("token"));
         this.router.events.subscribe(event => {
         if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        this.token_id = this._cookieService.get("childid");
        else
        this.token_id= this._cookieService.get("userid");
        });

   }

    // Dentist Production Service
    healthCheckStats( clinic_id, user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/HealthChecks/healthCheckStats?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
   hourlyRateChart( clinic_id, startDate = '', endDate = '', duration='', user_type='',clinician='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token"),limit=5 ): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caHourlyRateChart?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician+"&limit=5&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
            return response;
                    })
        );
    }
        // Items Predictor Analysis 
    mkNewPatientsByReferral(clinic_id, startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token"),limit=5  ): Observable<any> {
        return this.http.get(this.apiUrl +"/Marketings/mkNewPatientsByReferral?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&limit="+limit+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}
