import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../environments/environment";
import { Router  } from '@angular/router';
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
    getprofileSettings( clinic_id, token = this._cookieService.get("token")): Observable<any> {
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

            var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/Users/userChangePassword", formData, { headers: header })
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

        return this.http.post(this.apiUrl +"/Users/userLogoUpload", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    clearSession( clinic_id, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros/clearSession/?getxero=1?clinic_id="+clinic_id, { headers: header })
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
            return this.http.post(this.apiUrl +"/Users/userUpdateCard", formData, { headers: header })
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
            return this.http.post(this.apiUrl +"/Users/userRetryPayment", formData, { headers: header })
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
       

    getPaymentDetails(): Observable<any> {
        const formData = new FormData();
        formData.append('type', "analytics");
        formData.append('user_id', this._cookieService.get("userid"));
        var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/users/getUserPaymentData", formData, { headers: header })
            .pipe(map((response: Response) => {
                return response;
            })
        );
    }

    getCardDetails(customer_id): Observable<any> {
      const formData = new FormData();
            formData.append('customer_id', customer_id);
             var header = this.getHeaders(); 
            return this.http.post(this.apiUrl +"/users/userGetCard", formData, { headers: header })
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }

     createSetupIntent(customer): Observable<any> {
            const formData = new FormData();
            formData.append('customer', customer);
             var header = this.getHeaders(); 
            return this.http.post(this.apiUrl +"/users/userCreateSetupIntent", formData, { headers: header })
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
     updateCustomerCard(customer): Observable<any> {
            const formData = new FormData();
            formData.append('customer', customer);
             var header = this.getHeaders(); 
            return this.http.post(this.apiUrl +"/users/userUpdateCustomerCard", formData,  { headers: header })
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
    // GET CHARTS TIPS
    getChartsTips(): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/ChartsTips/ctGetTips",  { headers: header }).pipe(map((response: Response) => {
            return response;
        }));
    }
}

