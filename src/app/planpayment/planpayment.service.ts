
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
            return this.http.post(this.apiUrl +"/users/userAppLogin", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
     // Items Predictor Analysis 
    checkEmail(email): Observable<any> {
            const formData = new FormData();

            formData.append('email', email);
            return this.http.post(this.apiUrl +"/users/userForgotPasswordApi", formData)
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
            return this.http.post(this.apiUrl +"/users/userResetPasswordApi", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
     // Items Predictor Analysis 
    checkEmailExists(email): Observable<any> {
            const formData = new FormData();
            formData.append('email', email);
            return this.http.post(this.apiUrl +"/users/userCheckEmailExists", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
         // Items Predictor Analysis 
    addUser(email, password,user_type,plan_id): Observable<any> {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);  
            formData.append('user_type', user_type);           
            formData.append('plan_id', plan_id);  
            formData.append('status', '0');            

            return this.http.post(this.apiUrl +"/users/addPracticeOwner", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }

}


