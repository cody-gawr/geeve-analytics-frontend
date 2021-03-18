import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';
@Injectable()
export class LoginService {
 private headers: HttpHeaders;

    constructor(private http: HttpClient,private _cookieService: CookieService,private router: Router) {
 //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        }

    private apiUrl = environment.apiUrl;

    // Items Predictor Analysis 
    login(uname,password): Observable<any> {
            const formData = new FormData();

            formData.append('email', uname);
            formData.append('password', password);
            return this.http.post(this.apiUrl +"/users/applogin", formData,{ headers: this.headers })
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
    getPlans(): Observable<any> {
            return this.http.get(this.apiUrl +"/plans/getPlans")
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
     // Items Predictor Analysis 
    checkuser(plan_id, user_id): Observable<any> {
            const formData = new FormData();
            formData.append('plan_id', plan_id);
            formData.append('user_id', user_id);
            
            return this.http.post(this.apiUrl +"/users/userCheckPlan", formData)
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
            checkValidString(id): Observable<any> {
            const formData = new FormData();

            formData.append('id', id);
            return this.http.post(this.apiUrl +"/users/userCheckValidString", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
}