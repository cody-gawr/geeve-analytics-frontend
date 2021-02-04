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


   // Get profileSettings
    getprofileSettings( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Users/getPractices?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
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

           var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/Users/updateprofileSettings/", formData, { headers: header })
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

            var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/Users/changePasswordApi/", formData, { headers: header })
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

        return this.http.post(this.apiUrl +"/Users/logoUpload/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    clearSession( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros/clearSession/?getxero=1?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       
         updateCardRetryPayment(token:any,customer_id,last_invoic_id): Observable<any> {
            const formData = new FormData();
            
            formData.append('customer_id', customer_id);
            formData.append('last_invoic_id', last_invoic_id);
var header = this.getHeaders(); 
            return this.http.post(this.apiUrl +"/Users/updateCardRetryPayment", formData, { headers: header })
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }

         retryPayment(customer_id,last_invoic_id): Observable<any> {
            const formData = new FormData();
            formData.append('customer_id', customer_id);
            formData.append('last_invoic_id', last_invoic_id);
            var header = this.getHeaders(); 
            return this.http.post(this.apiUrl +"/Users/retryPayment", formData, { headers: header })
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
       

    getPaymentDetails(): Observable<any> {
     const formData = new FormData();
     formData.append('user_id', this._cookieService.get("userid"));
     formData.append('type', "analytics");
    var header = this.getHeaders(); 
        return this.http.post(this.solutionsUrl +"/users/getUserPaymentData", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    getCardDetails(customer_id): Observable<any> {
      const formData = new FormData();
            formData.append('customer_id', customer_id);
            return this.http.post(this.apiUrl +"/users/getCardDetails", formData, { headers: header })
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }

     createSetupIntent(customer): Observable<any> {
            const formData = new FormData();
            formData.append('customer', customer);
            return this.http.post(this.apiUrl +"/users/createSetupIntent", formData)
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
     updateCustomerCard(customer): Observable<any> {
            const formData = new FormData();
            formData.append('customer', customer);

            return this.http.post(this.apiUrl +"/users/updateCustomerCard", formData)
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
}

