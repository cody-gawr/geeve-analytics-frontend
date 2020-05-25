
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable()
export class LoginService {


    constructor(private http: HttpClient) {}
    private apiUrl = environment.apiUrl;

    // Items Predictor Analysis 
    login(uname,password): Observable<any> {
            const formData = new FormData();

            formData.append('email', uname);
            formData.append('password', password);
            return this.http.post(this.apiUrl +"/users/applogin", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
     // Items Predictor Analysis 
    checkEmail(email): Observable<any> {
            const formData = new FormData();

            formData.append('email', email);
            return this.http.post(this.apiUrl +"/users/forgotPasswordApi", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
        checkValidString(id): Observable<any> {
            const formData = new FormData();

            formData.append('id', id);
            return this.http.post(this.apiUrl +"/users/checkValidString", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
         // resetPassword 
    resetPassword(password,id): Observable<any> {
            const formData = new FormData();
            formData.append('password', password);
            formData.append('confirm_password', password);
            formData.append('id', id);

            return this.http.post(this.apiUrl +"/users/resetPasswordApi", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
           // Items Predictor Analysis 
    createSubscription(token:any,plan_id, user_id): Observable<any> {
            const formData = new FormData();
            formData.append('token', token.id);
            formData.append('email', token.email);
            
            formData.append('plan_id', plan_id);
            formData.append('user_id', user_id);
            
            return this.http.post(this.apiUrl +"/users/createSubscription", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
      // Items Predictor Analysis 
    autoLogin(user_id): Observable<any> {
            const formData = new FormData();

            formData.append('user_id', user_id);
            return this.http.post(this.apiUrl +"/users/autologin", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
        getPlans(): Observable<any> {
            return this.http.get(this.apiUrl +"/plans/getPlans")
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
}


