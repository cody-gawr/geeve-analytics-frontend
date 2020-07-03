
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { CookieService } from "angular2-cookie/core";
import { Router, NavigationEnd, Event  } from '@angular/router';

import { environment } from "../../../../environments/environment";
@Injectable()
export class HeaderrightService {
   public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;

    constructor(private http: HttpClient,private _cookieService: CookieService,private router: Router) {}

     getHeaders(){
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2'){
            this.token_id = this._cookieService.get("childid");
        }else {
            this.token_id= this._cookieService.get("userid");
        }
        var authString = this._cookieService.get("token")+" "+this.token_id;
        let headers = new HttpHeaders({'Authorization' : authString});
        return headers;
   }
    // Items Predictor Analysis 
    logout(id): Observable<any> {
            const formData = new FormData();

            formData.append('user_id', id);
            return this.http.post(this.apiUrl +"/users/applogout", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    } 
    getClinics(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Practices/getPractices?user_id="+user_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


}


