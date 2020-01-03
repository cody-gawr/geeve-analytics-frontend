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


   // Get Dentist
    getClinics(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Practices/getPractices?user_id="+this._cookieService.get("userid")+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Delete Clinic
    deleteClinic(clinic_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', clinic_id);
    formData.append('token', token);
     formData.append('user_id', this._cookieService.get("user_id"));
     formData.append('token_id', this.token_id);

        return this.http.post(this.apiUrl +"/Practices/delete", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Clinic
    updateClinic(clinic_id, value, column, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', clinic_id);
    formData.append(column, value);
     formData.append('user_id', this._cookieService.get("user_id"));
    formData.append('clinic_id', '1');
     formData.append('token_id', this.token_id);

    formData.append('token', token);
    
        return this.http.post(this.apiUrl +"/Practices/update/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Update Clinic
    addClinic(name, address, contact_name,phone_no,publishable_key,secret_key,clinic_logo, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('clinicName', name);
    formData.append('address', address);
    formData.append('contactName', contact_name);
    formData.append('phoneNo', phone_no);
    formData.append('publishable_key', publishable_key);
    formData.append('secret_key', secret_key);
    formData.append('logo', clinic_logo);
    formData.append('user_id', this._cookieService.get("user_id"));
    formData.append('token', token);
    formData.append('token_id', this.token_id);
    
        return this.http.post(this.apiUrl +"/Practices/add/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    logoUpload( formData): Observable<any> {                 
    formData.append('user_id', this._cookieService.get("user_id"));
    formData.append('token', this._cookieService.get("token"));
    formData.append('token_id', this.token_id);

    return this.http.post(this.apiUrl +"/Practices/logoUpload/", formData)
    .pipe(map((response: Response) => {
                    return response;
                })
    );
    }
}

