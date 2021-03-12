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

   // Get ClinicSettings
    getClinicSettings( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Clinics/getClinics?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       // Get ClinicSettings
   
    updateClinicSettings(clinic_id, name, address, contact_name, practice_size,workingDays,postOpCalls,phoneNo,clinicEmail,facebook,twitter,linkedin,instagram,logo, user_id = '23', token = this._cookieService.get("token")): Observable<any> {

        const formData = new FormData();
    formData.append('clinicName', name);
    formData.append('address', address);
    formData.append('contactName', contact_name);
    formData.append('practice_size', practice_size);
    formData.append('id', clinic_id);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('days', workingDays);
    formData.append('logo', logo);
    formData.append('phoneNo', phoneNo);
    formData.append('clinicEmail', clinicEmail);
    formData.append('post_op_calls', postOpCalls);

    var social_info = JSON.stringify({facebook: facebook, twitter: twitter, linkedin: linkedin, instagram: instagram});
    formData.append('social_info', social_info);
    var header = this.getHeaders();
    return this.http.post(this.apiUrl +"/Clinics/updateClinic/", formData, { headers: header})
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    // Get ClinicSettings
    getXeroLink( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/getAuthorizeUrl?getxero=1&user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    checkXeroStatus( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/getXeroStatus?getxero=1&user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    clearSession( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/disconnectXero/?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header})
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    logoUpload( formData): Observable<any> {
            if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
            formData.append('id', this._cookieService.get("childid"));
            else
            formData.append('id', this._cookieService.get("userid"));
            var header = this.getHeaders();            
            return this.http.post(this.apiUrl +"/Users/logoUpload/", formData, { headers: header})
            .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       
}