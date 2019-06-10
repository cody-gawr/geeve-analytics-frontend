
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
export class ClinicianProceeduresService {
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
    ItemsPredictorAnalysis(clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpItemsPredictorAnalysis?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    ItemsPredictorAnalysisDentist(dentist_id, clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpItemsPredictorAnalysis?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    //Predictor Ratio 1:
    PredictorRatio( clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorRatio?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
        //Predictor Ratio 1:
    PredictorRatioDentist(dentist_id, clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpPredictorRatio?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
    
   //Total Revenue of Clinician Per Procedure
    ClinicianProceedure(clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpTotalRevenueOfClinicianPerProcedure?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

   //Total Revenue of Clinician Per Procedure
    ClinicianProceedureDentist(dentist_id, clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpTotalRevenueOfClinicianPerProcedure?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

    //Referral to Other Clinicians Internal / External
    ClinicianReferral( clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpReferralToOtherClinicians?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


    //Referral to Other Clinicians Internal / External
    ClinicianReferralDentist(dentist_id, clinic_id='1', startDate = '', endDate = '', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianProcedures/cpReferralToOtherClinicians?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
      
}

