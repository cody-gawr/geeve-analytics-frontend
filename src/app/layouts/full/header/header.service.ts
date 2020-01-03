
import {map} from 'rxjs/operators';
import { Injectable, OnInIt } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { CookieService } from "angular2-cookie/core";

import { environment } from "../../../../environments/environment";
@Injectable()
export class HeaderService implements OnInIt {
   public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id :any = 0;
    


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

            formData.append('user_id', this._cookieService.get("userid"));
            return this.http.post(this.apiUrl +"/users/applogout", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
        getClinics(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
            this.demo();

        return this.http.get(this.apiUrl +"/Practices/getPractices?user_id="+this._cookieService.get("userid")+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    demo()
    {
        console.log(this._cookieService.get("user_type"));
        console.log(typeof this._cookieService.get("user_type"));
         if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        this.token_id = this._cookieService.get("childid");
        else
        this.token_id= this._cookieService.get("userid");
    }
}


