import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
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
    getClinicSettings( clinic_id, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/clinics/clinicGet?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       // Get ClinicSettings
    updateClinicSettings(clinic_id, name, address, contact_name, workingDays,postOpCalls,phoneNo,clinicEmail,ftaUta,postOpCallsMh,unscheduledPatientsMh, token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append('clinicName', name);
        formData.append('address', address);
        formData.append('contactName', contact_name);
        formData.append('days', workingDays);
        formData.append('post_op_calls', postOpCalls);
        formData.append('phoneNo', phoneNo);
        formData.append('clinicEmail', clinicEmail);
        formData.append('fta_uta', ftaUta);
        formData.append('post_op_days', postOpCallsMh);
        formData.append('unsched_days', unscheduledPatientsMh);
    var header = this.getHeaders();
    return this.http.post(this.apiUrl +"/clinics/clinicUpdate", formData, { headers: header})
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    // Get ClinicSettings
    getXeroLink( clinic_id, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/getAuthorizeUrl?getxero=1&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    checkXeroStatus( clinic_id, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/xeroGetStatus?getxero=1&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    getMyobLink( clinic_id, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Myob/getAuthorizeUrl?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    checkMyobStatus( clinic_id, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Myob/myobGetStatus?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    clinicGetAccountingPlatform( clinic_id, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Clinics/clinicGetAccountingPlatform?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
   

    clearSession( clinic_id, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/disconnectXero?clinic_id="+clinic_id, { headers: header})
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    clearSessionMyob( clinic_id, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Myob/disconnectMyob?clinic_id="+clinic_id, { headers: header})
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
            return this.http.post(this.apiUrl +"/Users/userLogoUpload", formData, { headers: header})
            .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       
}