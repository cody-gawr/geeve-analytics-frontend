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
export class FinancesService {
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

    // NetProfit
    NetProfit(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/finNetProfit?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
        // NetProfit
    NetProfitPercent(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/finNetProfitPercent?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
        // NetProfit
    NetProfitPms(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnNetProfit?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
            // categoryExpenses
    categoryExpenses(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnExpenses?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
             // finProductionByClinician
    finProductionByClinician(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnProductionByClinician?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                 // finTotalDiscounts
    finTotalDiscounts(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnDiscounts?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
                 // finTotalProduction
    finTotalProduction(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnTotalProduction?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                 // finCollection
    finCollection(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnTotalCollection?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                     // finProductionPerVisit
    finProductionPerVisit(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnProductionPerVisit?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


                    // finOverdueAccounts
    finOverdueAccounts(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnOverdues?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

             // finProductionByClinician
     finProductionByClinicianTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnProductionByClinicianTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                  // finTotalDiscounts
    finTotalDiscountsTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnDiscountsTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
                  // finTotalDiscounts
    finOverdueAccountsTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/overduesTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  

                      // finTotalProductionTrend
    finTotalProductionTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnTotalProductionTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
                          
    finCollectionTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnTotalCollectionTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

                              
    finProductionPerVisitTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnProductionPerVisitTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
                              // finNetProfitTrend
    finNetProfitTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/finNetProfitTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     // finNetProfitPercentTrend
    finNetProfitPercentTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/finNetProfitPercentTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

         // finNetProfitPMSTrend
    finNetProfitPMSTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnNetProfitTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
             // finExpensesByCategoryTrend
    finExpensesByCategoryTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnExpensesTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
                // finExpensesByCategoryMktTrend
    finExpensesByCategoryMktTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnExpensesTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}
