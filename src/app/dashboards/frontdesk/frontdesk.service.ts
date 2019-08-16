
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
export class FrontDeskService {
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
    fdWorkTimeAnalysis(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/FrontDesks/fdWorkTimeAnalysis?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    fdFtaRatio(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/FrontDesks/fdFtaRatio?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Items Predictor Analysis  
    fdUtaRatio(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/FrontDesks/fdUtaRatio?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Items Predictor Analysis  
    fdNumberOfTicks(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/FrontDesks/fdNumberOfTicks?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
            //Referral to Other Clinicians Internal / External
    fdWorkTimeAnalysisTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/FrontDesks/fdWorkTimeAnalysisTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&mode="+mode, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
                //Referral to Other Clinicians Internal / External
    fdFtaRatioTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/FrontDesks/fdFtaRatioTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&mode="+mode, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
                    //Referral to Other Clinicians Internal / External
    fdUtaRatioTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/FrontDesks/fdUtaRatioTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&mode="+mode, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                        //Referral to Other Clinicians Internal / External
    fdNumberOfTicksTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/FrontDesks/fdNumberOfTicksTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&mode="+mode, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
      
}

