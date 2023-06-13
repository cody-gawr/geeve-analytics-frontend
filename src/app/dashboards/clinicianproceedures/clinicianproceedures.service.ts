import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../../environments/environment";
import { Router  } from '@angular/router';
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
        let headers =  {headers: new HttpHeaders(), withCredentials: true, observe: 'response' as const };
        return headers;
    }
    // Items Predictor Analysis 
    ItemsPredictorAnalysis(clinic_id, startDate = '', endDate = '', user_type='',clinician='', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorAnalysis?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }
    // Items Predictor Analysis 
    ItemsPredictorAnalysisSpecial(clinic_id, startDate = '', endDate = '', user_type='',clinician='',queryWhEnabled=0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorSpecialistAnalysis?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    ItemsPredictorAnalysisTrendDentist(dentist_id, clinic_id, mode ='',queryWhEnabled=0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorAnalysisTrend?clinic_id="+clinic_id+"&provider_id="+dentist_id+"&mode="+mode + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }  
    // Items Predictor Analysis  
    ItemsPredictorAnalysisSpecialTrendDentist(dentist_id, clinic_id, mode ='', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorSpecialistAnalysisTrend?clinic_id="+clinic_id+"&provider_id="+dentist_id+"&mode="+mode + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    ItemsPredictorAnalysisDentist(dentist_id, clinic_id, startDate = '', endDate = '', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorAnalysis?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }
    // Items Predictor Analysis  
    ItemsPredictorAnalysisSpecialistDentist(dentist_id, clinic_id, startDate = '', endDate = '', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorSpecialistAnalysis?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }

    //Predictor Ratio 1:
    PredictorRatio( clinic_id, startDate = '', endDate = '',duration='', user_type='',clinician='', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorRatio?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }  
        //Predictor Ratio 1:
    PredictorRatioDentist(dentist_id, clinic_id, startDate = '', endDate = '',duration='', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorRatio?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id+"&duration="+duration + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }  
    
   //Total Revenue of Clinician Per Procedure
    ClinicianProceedure(clinic_id, startDate = '', endDate = '', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpRevPerProcedure?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    } 

   //Total Revenue of Clinician Per Procedure
    ClinicianProceedureDentist(dentist_id, clinic_id, startDate = '', endDate = '', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpRevPerProcedure?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    } 

    //Referral to Other Clinicians Internal / External
    ClinicianReferral( clinic_id, startDate = '', endDate = '',duration='', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpReferrals?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }


    //Referral to Other Clinicians Internal / External
    ClinicianReferralDentist(dentist_id, clinic_id, startDate = '', endDate = '',duration='', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpReferrals?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id+"&duration="+duration + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }

        //Referral to Other Clinicians Internal / External
    ClinicianReferralTrendDentist(dentist_id, clinic_id, mode ='', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpReferralsTrend?clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }
            //Referral to Other Clinicians Internal / External
    CpPredictorRatioTrend(dentist_id, clinic_id, mode ='', queryWhEnabled = 0): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorRatioTrend?clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id + (queryWhEnabled > 0?'&wh=1': ''), header)
        .pipe(map((response: HttpResponse<Object>) => {
                        return response;
                    })
        );
    }
      
}