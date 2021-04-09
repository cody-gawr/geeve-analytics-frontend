import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
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

    constructor(private http: HttpClient,private _cookieService: CookieService,private router: Router) { }
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

   hourlyRateChart( clinic_id, startDate = '', endDate = '', duration='', user_type='',clinician='', token = this._cookieService.get("token"),limit=5 ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/health/chHourlyLeaders?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician+"&limit=5", { headers: header })
        .pipe(map((response: Response) => {
            return response;
                    })
        );
    }
        // Items Predictor Analysis 
    mkNewPatientsByReferral(clinic_id, startDate = '', endDate = '',duration='', token = this._cookieService.get("token"),limit=5  ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/health/chReferralLeaders?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&limit="+limit, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                       // finProductionPerVisit
    finProductionPerVisit(clinic_id='1', startDate = '', endDate = '', duration='', token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Health/chProductionPerVisit?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Added by Hanney Sharma on 01-04-2021    
    commonCall(clinic_id,startDate, endDate, functionName): Observable<any> { // Top production card service
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/health/"+functionName+"?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
            })
        );
    }


}
