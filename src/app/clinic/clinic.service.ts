import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";


@Injectable()
export class ClinicService {

   public token: string;
   public api_url: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
   }


   // Get Dentist
    getClinics(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Practices/getPractices?user_id="+user_id+"&token="+this._cookieService.get("token"), { headers: this.headers })
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
     formData.append('user_id', this._cookieService.get("userid"));
    formData.append('clinic_id', '1');

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
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('token', token);
    
        return this.http.post(this.apiUrl +"/Practices/add/", formData)
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

        formData.append('token', this._cookieService.get("token"));

    return this.http.post(this.apiUrl +"/Practices/logoUpload/", formData)
    .pipe(map((response: Response) => {
                    return response;
                })
    );
    }
}

