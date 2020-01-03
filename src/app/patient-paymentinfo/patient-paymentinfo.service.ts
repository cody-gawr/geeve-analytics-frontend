
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";

@Injectable()
export class PatientPaymentinfoService {

   public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        this.token_id = this._cookieService.get("childid");
        else
        this.token_id= this._cookieService.get("userid");
   }
   
    getInofficePlan(payment_id, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/InofficePayments/getInofficePlanDetails?payment_id="+payment_id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }

    getPaymentHistory(id, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"InofficePayments/getInofficeMembersPlanInvoicesDetails?inoffice_payment_id="+id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }
       
}