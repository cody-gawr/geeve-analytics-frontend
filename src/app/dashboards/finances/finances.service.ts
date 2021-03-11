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
        return this.http.get(this.apiUrl +"/Finance/netProfit?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
            // categoryExpenses
    categoryExpenses(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/expenses?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
             // finProductionByClinician
    finProductionByClinician(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/productionByClinician?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                 // finTotalDiscounts
    finTotalDiscounts(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/discounts?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
                 // finTotalProduction
    finTotalProduction(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/totalProduction?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                 // finCollection
    finCollection(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/totalCollection?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                     // finProductionPerVisit
    finProductionPerVisit(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/productionPerVisit?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


                    // finOverdueAccounts
    finOverdueAccounts(clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/overdues?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

             // finProductionByClinician
     finProductionByClinicianTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/productionByClinicianTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                  // finTotalDiscounts
    finTotalDiscountsTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/discountsTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
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
        return this.http.get(this.apiUrl +"/Finance/totalProductionTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
                          
    finCollectionTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/totalCollectionTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

                              
    finProductionPerVisitTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/productionPerVisitTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
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
        return this.http.get(this.apiUrl +"/Finance/netProfitTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
             // finExpensesByCategoryTrend
    finExpensesByCategoryTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/expensesTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
                // finExpensesByCategoryMktTrend
    finExpensesByCategoryMktTrend(clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/finExpensesByCategoryTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}
