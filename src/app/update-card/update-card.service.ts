
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';

@Injectable()
export class UpdateCardService {


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

  checkValidString(id): Observable<any> {
            const formData = new FormData();

            formData.append('id', id);
            return this.http.post(this.apiUrl +"/Users/checkValidStringUpdate", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }

   retryPayment(subscription_id,plan_type): Observable<any> {
            const formData = new FormData();
            formData.append('subscription_id', subscription_id);
            formData.append('plan_type', plan_type);
            
            return this.http.post(this.apiUrl +"/Patients/retryPayment", formData)
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
     updateCardRetryPayment(token:any,subscription_id,plan_type): Observable<any> {
            const formData = new FormData();
            formData.append('token', token);
            formData.append('subscription_id', subscription_id);
            formData.append('plan_type', plan_type);

            return this.http.post(this.apiUrl +"/Patients/updateCardRetryPayment", formData)
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
     getCardDetails(subscription_id,plan_type): Observable<any> {
            const formData = new FormData();
            formData.append('subscription_id', subscription_id);
            formData.append('plan_type', plan_type);

            return this.http.post(this.apiUrl +"/Patients/getCardDetails", formData)
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
}


