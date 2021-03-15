import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';

@Injectable()
export class DentistService {

   public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;

    constructor(private http: HttpClient,private _cookieService: CookieService,private router: Router) {
   
   }
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
    getDentists(clinic_id, user_id=this._cookieService.get("userid") , token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Dentists/dentists?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Delete Dentist
    deleteDentists(dentist_id, user_id=this._cookieService.get("userid") , token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', dentist_id);
    var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/Dentists/delete", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Dentist
    updateDentists(dentist_id, value,clinic_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('provider_id', dentist_id);
    formData.append('name', value);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('clinic_id',clinic_id);
    var header = this.getHeaders();     
    return this.http.post(this.apiUrl +"/Dentists/update", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


    // Add Dentist
    addDentists(dentist_id, value,clinic_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('provider_id', dentist_id);
    formData.append('name', value);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('clinic_id', clinic_id);
    var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/Dentists/add", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    // Get ChildDentist
    getChildID(clinic_id , token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Users/getChildDentist?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}