
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HealthScreenService {
 public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        this.headers.append("Token", this._cookieService.get("token"));

   }

    // Dentist Production Service
    healthCheckStats( clinic_id='1', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/HealthChecks/healthCheckStats?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token"), { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}

