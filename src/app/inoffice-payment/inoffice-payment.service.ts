
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";

@Injectable()
export class InofficePaymentService {


     public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
   }
    getInofficePlanDetails(payment_id): Observable<any> {
        return this.http.get(this.apiUrl +"/InofficePayments/getInofficePlanDetails?payment_id="+payment_id, { headers: this.headers })
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
    checkEmailExists(email): Observable<any> {
            const formData = new FormData();
            formData.append('email', email);
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

            return this.http.post(this.apiUrl +"/users/addPracticeOwner", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
             // Items Predictor Analysis 
    createInofficeSubscription(token:any,plan_name, monthly_weekly_payment,duration,id,patient_id): Observable<any> {
            const formData = new FormData();
            formData.append('token', token.id);
            formData.append('email', token.email);
            formData.append('inoffice_id', id);
            
            formData.append('plan_name', plan_name);
            formData.append('amount', monthly_weekly_payment);
            formData.append('duration', duration);
            formData.append('patient_id', patient_id);

            return this.http.post(this.apiUrl +"/Patients/createInofficeSubscription", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }

}


