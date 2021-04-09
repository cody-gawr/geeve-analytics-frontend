import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { CookieService } from "ngx-cookie";

import { environment } from "../../../../environments/environment";
@Injectable()
export class HeaderrightService {
   public token: string;
   public token_id: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;


    constructor(private http: HttpClient,private _cookieService: CookieService) {}
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
    logout(id): Observable<any> {
            const formData = new FormData();
            return this.http.post(this.apiUrl +"/users/userLogout", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    } 
    
    getClinics(clinic_id='1', token = this._cookieService.get("token")): Observable<any> {        
        var header = this.getHeaders();         
        return this.http.get(this.apiUrl +"/clinics/clinicGet", { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


}