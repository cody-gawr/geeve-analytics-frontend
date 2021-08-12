import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../environments/environment";
import { Router  } from '@angular/router';

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
    getDentists(clinic_id, all = 0,  token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Dentists/dentGet?clinic_id="+clinic_id+"&all="+all, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Delete Dentist
    deleteDentists(dentist_id,  token = this._cookieService.get("token")): Observable<any> {
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
    updateDentists(dentist_id, value,clinic_id, isActive = null,jeeveId='', token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('clinic_id',clinic_id);
    formData.append('provider_id', dentist_id);
    
    if(jeeveId != ''){
        jeeveId = (jeeveId == 'null')? '' : jeeveId;
        formData.append('jeeve_id',jeeveId);
    }   
    if(typeof(value) != 'undefined' && value != '') {
      formData.append('name', value);
    }
    if(isActive != null){
        formData.append('is_active',isActive);
    }
    var header = this.getHeaders();     
    return this.http.post(this.apiUrl +"/Dentists/dentUpdate", formData, { headers: header })
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
        return this.http.get(this.apiUrl +"/Users/userGetChildDentist?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}