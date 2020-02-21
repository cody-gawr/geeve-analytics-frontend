
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';

@Injectable()
export class InofficePaymentService {


     public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
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
    getInofficePlanDetails(payment_id): Observable<any> {
        return this.http.get(this.apiUrl +"/InofficePayments/getInofficePlanDetails?payment_id="+payment_id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }

    getClinic(patient_id): Observable<any> {
        return this.http.get(this.apiUrl +"/Patients/getClinicDetails?patient_id="+patient_id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }

    checkInvoiceStatus(id): Observable<any> {
        return this.http.get(this.apiUrl +"/InofficePayments/checkInvoiceStatus?id="+id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }

    addSubPatients(name,age,gender,patient_amount,id): Observable<any> {
            const formData = new FormData();
            formData.append('sub_patients_name', name);
            formData.append('sub_patients_age', age);
            formData.append('sub_patients_gender', gender);
            formData.append('sub_patients_amount', patient_amount);
            formData.append('patients_id', id);
            formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        formData.append('token_id', this.token_id);
            return this.http.post(this.apiUrl +"/SubPatients/addSubpatients", formData)
            .pipe(map((response: Response) => {
                   return response;
               })
            );
    }
    updatePatients(patient_amount,status, id): Observable<any> {
            const formData = new FormData();
            formData.append('total_amount', patient_amount);
            formData.append('patient_status', status);            
            formData.append('id', id);         
             formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        formData.append('token_id', this.token_id);   
            return this.http.post(this.apiUrl +"/Patients/updatePatient", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
    // Items Predictor Analysis 
    login(uname,password): Observable<any> {
            const formData = new FormData();

            formData.append('email', uname);
            formData.append('password', password);
             formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        formData.append('token_id', this.token_id);
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
             formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        formData.append('token_id', this.token_id);
            return this.http.post(this.apiUrl +"/users/forgotPasswordApi", formData)
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
             formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        formData.append('token_id', this.token_id);
            return this.http.post(this.apiUrl +"/users/resetPasswordApi", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
     // Items Predictor Analysis 
    checkEmailExists(email): Observable<any> {
            const formData = new FormData();
            formData.append('email', email);
             formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        formData.append('token_id', this.token_id);
            return this.http.post(this.apiUrl +"/users/checkEmailExists", formData)
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
            formData.append('user_id', this._cookieService.get("userid"));
            formData.append('token', this._cookieService.get("token"));
            formData.append('token_id', this.token_id);
            return this.http.post(this.apiUrl +"/users/addPracticeOwner", formData)
            .pipe(map((response: Response) => {
                            return response;
             })
            );
    }
             // Items Predictor Analysis 
    createInofficeSubscription(token,plan_name, monthly_weekly_payment,duration,id,patient_id,clinic_id,payment_frequency,balance_amount): Observable<any> {
            const formData = new FormData();
            formData.append('token', token);
            formData.append('inoffice_id', id);
            
            formData.append('plan_name', plan_name);
            formData.append('amount', monthly_weekly_payment);
            formData.append('duration', duration);
            formData.append('patient_id', patient_id);
            formData.append('user_id', this._cookieService.get("userid"));
            formData.append('payment_frequency', payment_frequency);
            formData.append('token_id', this.token_id);
            formData.append('clinic_id', clinic_id);

            formData.append('balance_amount', balance_amount);
            return this.http.post(this.apiUrl +"/Patients/createInofficeSubscription", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }

}


