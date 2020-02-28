
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

    constructor(private http: HttpClient,private _cookieService: CookieService,private router: Router) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        this.router.events.subscribe(event => {
         if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        this.token_id = this._cookieService.get("childid");
        else
        this.token_id= this._cookieService.get("userid");
        });
   }

    // Items Predictor Analysis 
    ItemsPredictorAnalysis(clinic_id='1', startDate = '', endDate = '', user_type='',clinician='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpItemsPredictorAnalysis?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&user_type="+user_type+"&clinician="+clinician+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    ItemsPredictorAnalysisTrendDentist(dentist_id, clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpItemsPredictorAnalysisTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&provider_id="+dentist_id+"&mode="+mode+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    ItemsPredictorAnalysisDentist(dentist_id, clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpItemsPredictorAnalysis?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    //Predictor Ratio 1:
    PredictorRatio( clinic_id='1', startDate = '', endDate = '',duration='', user_type='',clinician='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorRatio?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
        //Predictor Ratio 1:
    PredictorRatioDentist(dentist_id, clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorRatio?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id+"&duration="+duration+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
    
   //Total Revenue of Clinician Per Procedure
    ClinicianProceedure(clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpTotalRevenueOfClinicianPerProcedure?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

   //Total Revenue of Clinician Per Procedure
    ClinicianProceedureDentist(dentist_id, clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpTotalRevenueOfClinicianPerProcedure?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

    //Referral to Other Clinicians Internal / External
    ClinicianReferral( clinic_id='1', startDate = '', endDate = '',duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpReferralToOtherClinicians?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


    //Referral to Other Clinicians Internal / External
    ClinicianReferralDentist(dentist_id, clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpReferralToOtherClinicians?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        //Referral to Other Clinicians Internal / External
    ClinicianReferralTrendDentist(dentist_id, clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpReferralToOtherCliniciansTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&mode="+mode+"&provider_id="+dentist_id+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
            //Referral to Other Clinicians Internal / External
    CpPredictorRatioTrend(dentist_id, clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorRatioTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&mode="+mode+"&provider_id="+dentist_id+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
      
}

