import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';
@Injectable()
export class ClinicSettingsService {

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


   // Get ClinicSettings
    getClinicSettings( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Practices/getPractices?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       // Get ClinicSettings
    updateClinicSettings(clinic_id, name, address, contact_name, practice_size,workingDays,postOpCalls, user_id = '23', token = this._cookieService.get("token")): Observable<any> {

        console.log(workingDays,'***');
    const formData = new FormData();

    formData.append('clinicName', name);
    formData.append('address', address);
    formData.append('contactName', contact_name);
    formData.append('practice_size', practice_size);
    formData.append('token_id', this.token_id);
    formData.append('id', clinic_id);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('token', token);
    formData.append('days', workingDays);
    formData.append('post_op_calls', postOpCalls);
    return this.http.post(this.apiUrl +"/Practices/update/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    // Get ClinicSettings
    getXeroLink( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Xeros2/getAuthorizeUrl/?getxero=1&user_id="+user_id+"&clinic_id="+clinic_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    checkXeroStatus( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Xeros2/getXeroStatus?getxero=1&user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    clearSession( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Xeros2/disconnectXero/?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       
}