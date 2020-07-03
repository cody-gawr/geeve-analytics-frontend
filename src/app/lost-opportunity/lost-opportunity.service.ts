import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LostOpportunityService {
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
        this.headers.append("Token", this._cookieService.get("token"));
        this.router.events.subscribe(event => {
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
            this.token_id = this._cookieService.get("childid");
        else
            this.token_id= this._cookieService.get("userid");
        });

   }

    // clinic Production Service
    dentistProduction( clinic_id, user_type = this._cookieService.get("user_type"), user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/lostOpportunityDiscounts?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+token+"&user_type="+user_type+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
   
    
}