
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MarketingService {
 public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;


    constructor(private http: HttpClient,private _cookieService: CookieService) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
   }

    // Items Predictor Analysis 
    mkNewPatientsByReferral(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/Marketings/mkNewPatientsByReferral?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    fdvisitsRatio(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/Marketings/mkTotalVisits?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Items Predictor Analysis  
    mkRevenueByReferral(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/Marketings/mkRevenueByReferral?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
                        //Referral to Other Clinicians Internal / External
    mkTotalVisitsTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/Marketings/mkTotalVisitsTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&mode="+mode, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

}

