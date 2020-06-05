
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";

@Injectable()
export class ThankYouService {


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
       getClinicSettings( clinic_id='1', patientId,user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
           
                return this.http.get(this.apiUrl +"/Practices/getPracticesFrontend?clinic_id="+clinic_id+'&patientId='+patientId, { headers: this.headers })
                .pipe(map((response: Response) => {
                                return response;
                })
        );
    }

}


