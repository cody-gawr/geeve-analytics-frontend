

import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';

@Injectable()
export class ClinicGoalsService {

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
        var authString = this._cookieService.get("token")+" "+this.token_id;
        let headers = new HttpHeaders({'Authorization' : authString});
        return headers;
    }

   // Get ClinicGoals
    getClinicGoals(clinic_id='', token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Goals/goalGetClinic?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    // Get ClinicGoals updated
    getGoalAllData(clinic_id='', token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Goals/getGoalAllData?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       // Get ClinicGoals
    updateClinicGoals(clinicData, clinic_id='', token = this._cookieService.get("token")): Observable<any> {
            const formData = new FormData();
        formData.append('goals', clinicData);
        formData.append('clinic_id', clinic_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl +"/Goals/goalAddClinic", formData,{ headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       
}

