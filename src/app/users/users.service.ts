
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";


@Injectable()
export class UsersService {

   public token: string;
   public token_id: string;
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

     getHeaders(){
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2'){
            this.token_id = this._cookieService.get("childid");
        }else {
            this.token_id= this._cookieService.get("userid");
        }
        var authString = this._cookieService.get("token")+" "+this.token_id;
        let headers = new HttpHeaders({'Authorization' : authString});
        return headers;
   }

   // Get Dentist
    getUsers(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Users/getPracticeOwners", { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Delete Clinic
    deleteUser(user_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('id', user_id);
     var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/Users/delete", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Clinic
    updateUser(user_id, value, column, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', user_id);
    formData.append(column, value);
     formData.append('user_id', this._cookieService.get("userid"));
    formData.append('clinic_id', '1');

    var header = this.getHeaders();
    
        return this.http.post(this.apiUrl +"/Users/edit/", formData, { headers: header })
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

     formData.append('user_id', this._cookieService.get("userid"));
     var header = this.getHeaders();
    
        return this.http.post(this.apiUrl +"/Practices/add/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}

