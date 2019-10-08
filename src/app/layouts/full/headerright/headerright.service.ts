
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { CookieService } from "angular2-cookie/core";

import { environment } from "../../../../environments/environment";
@Injectable()
export class HeaderrightService {
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
        return this.http.get(this.apiUrl +"/Practices/getPractices?user_id="+user_id+"&token="+this._cookieService.get("token"), { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


}


