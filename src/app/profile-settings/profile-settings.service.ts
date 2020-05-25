
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';
@Injectable()
export class ProfileSettingsService {

   public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
        private solutionsUrl = environment.solutionsUrl;
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


   // Get profileSettings
    getprofileSettings( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Users/getPractices?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
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
            if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')         
            formData.append('id', this._cookieService.get("childid"));
            else
            formData.append('id', this._cookieService.get("userid"));

            formData.append('token', token);
    formData.append('token_id', this.token_id);

        return this.http.post(this.apiUrl +"/Users/updateprofileSettings/", formData)
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
            if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')         
            formData.append('id', this._cookieService.get("childid"));
            else
            formData.append('id', this._cookieService.get("userid"));

            formData.append('token', token);
            formData.append('token_id', this.token_id);
        return this.http.post(this.apiUrl +"/Users/changePasswordApi/", formData)
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
            formData.append('token_id', this.token_id);

        return this.http.post(this.apiUrl +"/Users/logoUpload/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    clearSession( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Xeros/clearSession/?getxero=1?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       
         updateCardRetryPayment(token:any,customer_id,last_invoic_id): Observable<any> {
            const formData = new FormData();
            formData.append('token', token);
            formData.append('customer_id', customer_id);
            formData.append('last_invoic_id', last_invoic_id);

            return this.http.post(this.apiUrl +"/Users/updateCardRetryPayment", formData)
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }

         retryPayment(customer_id,last_invoic_id): Observable<any> {
            const formData = new FormData();
            formData.append('customer_id', customer_id);
            formData.append('last_invoic_id', last_invoic_id);

            return this.http.post(this.apiUrl +"/Users/retryPayment", formData)
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
       

    getPaymentDetails(): Observable<any> {
     const formData = new FormData();
     formData.append('user_id',  this.token_id);
     formData.append('type', "analytics");

        return this.http.post(this.solutionsUrl +"/users/getUserPaymentData", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}

