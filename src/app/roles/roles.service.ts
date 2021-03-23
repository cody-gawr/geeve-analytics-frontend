import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";

@Injectable()
export class RolesService {

   public token: string;
   public token_id: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,private _cookieService: CookieService) {}
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

   // Get profileSettings
    getprofileSettings( clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/Users/getPractices?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       // Get updateprofileSettings
    updateprofileSettings(displayName, email, imageURL, token = this._cookieService.get("token")): Observable<any> {
            const formData = new FormData();
            formData.append('displayName', displayName);
            formData.append('email', email);
            formData.append('user_image', imageURL);            
            formData.append('id', this._cookieService.get("userid"));
             var header = this.getHeaders();

        return this.http.post(this.apiUrl +"/Users/userUpdateProfile", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       // Get updatePassword
    updatePassword(currentPassword, newPassword, token = this._cookieService.get("token")): Observable<any> {
            const formData = new FormData();
            formData.append('oldpassword', currentPassword);
            formData.append('password', newPassword);
            formData.append('confirm_password', newPassword);            
            formData.append('id', this._cookieService.get("userid"));
            var header = this.getHeaders();

        return this.http.post(this.apiUrl +"/Users/userChangePassword", formData,{ headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    logoUpload( formData): Observable<any> {
        formData.append('id', this._cookieService.get("userid"));
          var header = this.getHeaders();

        return this.http.post(this.apiUrl +"/Users/userLogoUpload", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    clearSession( clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/Xeros/clearSession/?getxero=1?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       
}