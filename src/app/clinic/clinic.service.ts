import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';

@Injectable()
export class ClinicService {

   public token: string;
   public api_url: string;
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

   // Get Dentist
    getClinics(clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/clinics/clinicGet", { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Delete Clinic
    deleteClinic(clinic_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', clinic_id);
    var header = this.getHeaders();
        return this.http.post(this.apiUrl +"/clinics/clinicDelete", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Clinic
    updateClinic(clinic_id, value, column, token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
        formData.append(column, value);
        formData.append('clinic_id', '1');
        var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/clinics/clinicUpdate", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Update Clinic
    addClinic(name, address, contact_name, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('clinicName', name);
    formData.append('address', address);
    formData.append('contactName', contact_name);

    var header = this.getHeaders();
        return this.http.post(this.apiUrl +"/clinics/clinicAdd", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    getUserDetails(token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/users/userInfo", { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
      // Get Dentist
    getClinicProviders(selectedClinics,clinic_id='1', token = this._cookieService.get("token")): Observable<any> {  
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/clinics/clinicGetProviders?clinic_id="+selectedClinics, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}
