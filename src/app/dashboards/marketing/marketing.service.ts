import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {
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
    mkNewPatientsByReferral(clinic_id='1', startDate = '', endDate = '',duration='', token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Marketing/mkNumPatientsByReferral?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Items Predictor Analysis  
    fdvisitsRatio(clinic_id='1', startDate = '', endDate = '',duration='', token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Marketing/mkTotalVisits?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Items Predictor Analysis  
    mkRevenueByReferral(clinic_id='1', startDate = '', endDate = '',duration='', token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Marketing/mkRevByReferral?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
                        //Referral to Other Clinicians Internal / External
    mkTotalVisitsTrend(clinic_id='1', mode ='', token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Marketing/mkTotalVisitsTrend?clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    //Referral to Other Clinicians Internal / External
    fdnewPatientsRatio(clinic_id='1', startDate = '', endDate = '',duration='', token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Marketing/mkNumNewPatients?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    //Referral to Other Clinicians Internal / External
    mkNoNewPatientsTrend(clinic_id='1', mode ='', token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Marketing/mkNumNewPatientsTrend?clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     //Get Xero Accounts
   getAccounts(clinic_id='1',user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
    var header = this.getHeaders(); 
    return this.http.get(this.apiUrl +"/Marketing/mkGetAccounts?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
    .pipe(map((response: Response) => {
                    return response;
                })
        );
    }
     //Get Xero Categories
   saveSelectedCategories(clinic_id='1',categories, token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Marketing/mkSaveSelectedCategories?clinic_id="+clinic_id+"&categories="+categories, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }             

   // categoryExpenses
    categoryExpenses(clinic_id='1', startDate = '', endDate = '', duration='', token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Marketing/mkNewPatientAcq?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                 // finExpensesByCategoryTrend
    categoryExpensesTrend(clinic_id='1', mode ='', token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Marketing/mkNewPatientAcqTrend?clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

}