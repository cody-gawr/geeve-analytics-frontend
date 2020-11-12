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
export class FrontDeskService {
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
    // Items Predictor Analysis 
    fdWorkTimeAnalysis(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdWorkTimeAnalysis?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    fdFtaRatio(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdFtaRatio?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Items Predictor Analysis  
    fdUtaRatio(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdUtaRatio?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Items Predictor Analysis  
    fdNumberOfTicks(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdNumberOfTicks?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
            //Referral to Other Clinicians Internal / External
    fdWorkTimeAnalysisTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdWorkTimeAnalysisTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
                //Referral to Other Clinicians Internal / External
    fdFtaRatioTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdFtaRatioTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
                    //Referral to Other Clinicians Internal / External
    fdUtaRatioTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdUtaRatioTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                        //Referral to Other Clinicians Internal / External
    fdNumberOfTicksTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdNumberOfTicksTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Items Predictor Analysis  
    fdRecallPrebookRate(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdRecallPrebookRate?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
     
        // Items Predictor Analysis  
    fdTreatmentPrebookRate(clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdTreatmentPrebookRate?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       
                               //Referral to Other Clinicians Internal / External
    fdRecallPrebookRateTrend(dentist_id,clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdRecallPrebookRateTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
    frontdeskdRecallPrebookRateTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdRecallPrebookRateTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
                                   //Referral to Other Clinicians Internal / External
    fdTreatmentPrebookRateTrend(dentist_id,clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdTreatmentPrebookRateTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }    
      frontdeskTreatmentPrebookRateTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/FrontDesks/fdTreatmentPrebookRateTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }    
}