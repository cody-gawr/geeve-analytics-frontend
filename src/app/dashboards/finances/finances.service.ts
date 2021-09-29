import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../../environments/environment";
import { Router  } from '@angular/router';
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
        let headers =  {headers: new HttpHeaders(), withCredentials: true};
        return headers;
    }

    // NetProfit
    NetProfit(clinic_id, startDate = '', endDate = '', duration=''  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/finNetProfit?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
        // NetProfit
    NetProfitPercent(clinic_id, startDate = '', endDate = '', duration=''  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/finNetProfitPercent?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
        // NetProfit
    NetProfitPms(clinic_id, startDate = '', endDate = '', duration='',connectedwith =''  ): Observable<any> {
        var header = this.getHeaders(); 
        if(connectedwith == 'xero'){
        return this.http.get(this.apiUrl +"/Finance/fnNetProfit?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
     }else if(connectedwith == 'myob'){
             return this.http.get(this.apiUrl +"/Finance/fnNetProfitMyob?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
              .pipe(map((response: Response) => {
                    return response;
                         })
                    );   
            }
    }
     // NetProfitPercentage
    netProfitPercentage(clinic_id, startDate = '', endDate = '', duration='',connectedwith =''  ): Observable<any> {
        var header = this.getHeaders(); 
        if(connectedwith == 'xero'){
        return this.http.get(this.apiUrl +"/Finance/fnNetProfitPercentage?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
        }else if(connectedwith == 'myob'){
            return this.http.get(this.apiUrl +"/Finance/fnNetProfitPercentageMyob?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
        }
    }
       // categoryExpenses
    categoryExpenses(clinic_id, startDate = '', endDate = '', duration='',connectedwith =''  ): Observable<any> {
        var header = this.getHeaders(); 
        if(connectedwith == 'xero'){
            return this.http.get(this.apiUrl +"/Finance/fnExpenses?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
        }else if(connectedwith == 'myob'){
            return this.http.get(this.apiUrl +"/Finance/fnExpensesMyob?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
        }
    }
        // finProductionByClinician
    finProductionByClinician(clinic_id, startDate = '', endDate = '', duration=''  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnProductionByClinician?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // finTotalDiscounts
    finTotalDiscounts(clinic_id, startDate = '', endDate = '', duration=''  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnDiscounts?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
        // finTotalProduction
    finTotalProduction(clinic_id, startDate = '', endDate = '', duration=''  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnTotalProduction?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // finCollection
    finCollection(clinic_id, startDate = '', endDate = '', duration=''  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnTotalCollection?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // finProductionPerVisit
    finProductionPerVisit(clinic_id, startDate = '', endDate = '', duration=''  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnProductionPerVisit?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


        // finOverdueAccounts
    finOverdueAccounts(clinic_id, startDate = '', endDate = '', duration=''  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnOverdues?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // finProductionByClinician
     finProductionByClinicianTrend(clinic_id, mode =''  ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnProductionByClinicianTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // finTotalDiscounts
    finTotalDiscountsTrend(clinic_id, mode ='' ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnDiscountsTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
        // finTotalDiscounts
    finOverdueAccountsTrend(clinic_id, mode ='' ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/overduesTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  

        // finTotalProductionTrend
    finTotalProductionTrend(clinic_id, mode ='' ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnTotalProductionTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
                          
    finCollectionTrend(clinic_id, mode ='' ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnTotalCollectionTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

                              
    finProductionPerVisitTrend(clinic_id, mode ='' ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnProductionPerVisitTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
        // finNetProfitTrend
    finNetProfitTrend(clinic_id, mode ='' ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/finNetProfitTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     // finNetProfitPercentTrend
    finNetProfitPercentTrend(clinic_id, mode ='' ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/finNetProfitPercentTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // finNetProfitPMSTrend
    finNetProfitPMSTrend(clinic_id, mode ='',connectedwith='' ): Observable<any> {
        var header = this.getHeaders(); 
        if(connectedwith == 'xero'){
            return this.http.get(this.apiUrl +"/Finance/fnNetProfitTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
        }else if(connectedwith == 'myob'){
            return this.http.get(this.apiUrl +"/Finance/fnNetProfitMyobTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
        }
        
    }

    // finNetProfitPMSTrend
    finNetProfitPMSPercentTrend(clinic_id, mode ='',connectedwith='' ): Observable<any> {
        var header = this.getHeaders(); 
        if(connectedwith == 'xero'){
            return this.http.get(this.apiUrl +"/Finance/fnNetProfitPercentageTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
        }else if(connectedwith == 'myob'){
            return this.http.get(this.apiUrl +"/Finance/fnNetProfitPercentageMyobTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
        }
        
    }
        // finExpensesByCategoryTrend
    finExpensesByCategoryTrend(clinic_id, mode ='',connectedwith='' ): Observable<any> {
        var header = this.getHeaders(); 
        if(connectedwith == 'xero'){
        return this.http.get(this.apiUrl +"/Finance/fnExpensesTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
        }else if(connectedwith == 'myob'){
            return this.http.get(this.apiUrl +"/Finance/fnExpensesMyobTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
        }
    }
                // finExpensesByCategoryMktTrend
    finExpensesByCategoryMktTrend(clinic_id, mode ='' ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Finance/fnExpensesTrend?clinic_id="+clinic_id+"&mode="+mode, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}
