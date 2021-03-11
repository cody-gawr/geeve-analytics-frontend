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
export class ClinicianProceeduresService {
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
    ItemsPredictorAnalysis(clinic_id='1', startDate = '', endDate = '', user_type='',clinician='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/predictorAnalysis?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    ItemsPredictorAnalysisTrendDentist(dentist_id, clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/predictorAnalysisTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&provider_id="+dentist_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    ItemsPredictorAnalysisDentist(dentist_id, clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/predictorAnalysis?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    //Predictor Ratio 1:
    PredictorRatio( clinic_id='1', startDate = '', endDate = '',duration='', user_type='',clinician='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/predictorRatio?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
        //Predictor Ratio 1:
    PredictorRatioDentist(dentist_id, clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/predictorRatio?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
    
   //Total Revenue of Clinician Per Procedure
    ClinicianProceedure(clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/revPerProcedure?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

   //Total Revenue of Clinician Per Procedure
    ClinicianProceedureDentist(dentist_id, clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/revPerProcedure?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

    //Referral to Other Clinicians Internal / External
    ClinicianReferral( clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/referrals?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


    //Referral to Other Clinicians Internal / External
    ClinicianReferralDentist(dentist_id, clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/referrals?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        //Referral to Other Clinicians Internal / External
    ClinicianReferralTrendDentist(dentist_id, clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/referralsTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
            //Referral to Other Clinicians Internal / External
    CpPredictorRatioTrend(dentist_id, clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/predictorRatioTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
      
}