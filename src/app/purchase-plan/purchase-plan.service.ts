
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';

@Injectable()
export class PurchasePlanService {


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
    getSubPatients(patient_id): Observable<any> {
        return this.http.get(this.apiUrl +"/Patients/getAllPatientByIDWithoutToken?patient_id="+patient_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }

    getPlanDetail(plan_id): Observable<any> {
        return this.http.get(this.apiUrl +"/MemberPlan/getPlanDetail?plan_id="+plan_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }

    // addPatient(name,dob,gender,patient_amount,id): Observable<any> {
    //         const formData = new FormData();
    //         formData.append('sub_patients_name', name);
    //         formData.append('sub_patients_dob', dob);
    //         formData.append('sub_patients_gender', gender);
    //         formData.append('sub_patients_amount', patient_amount);
    //         formData.append('patients_id', id);
    //         return this.http.post(this.apiUrl +"/SubPatients/addSubpatients", formData)
    //         .pipe(map((response: Response) => {
    //                         return response;
    //                     })
    //         );
    // }
    updatePatients(patient_amount,status, id,patient_email): Observable<any> {
            const formData = new FormData();
            formData.append('total_amount', patient_amount);
            formData.append('patient_status', status);            
            formData.append('id', id);            
            formData.append('patient_email', patient_email);            
            
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
    checkPatientEmailExists(email,clinic_id,user_id): Observable<any> {
            return this.http.get(this.apiUrl +"/Patients/checkPatientEmailExists?patient_email="+email+"&clinic_id="+clinic_id+"&user_id="+user_id, { headers: this.headers })
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }
        // Items Predictor Analysis 
    checkTreatmentName(email,clinic_id,user_id): Observable<any> {
            return this.http.get(this.apiUrl +"/Patients/checkPatientEmailExists?patient_email="+email+"&clinic_id="+clinic_id+"&user_id="+user_id, { headers: this.headers })
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }

       // Items Predictor Analysis 
    addPatient(email,name,phone_no, clinic_id,user_id,plan_id,plan_amount): Observable<any> {

         const formData = new FormData();

        formData.append('user_id', user_id);
        formData.append('clinic_id', clinic_id);
        formData.append('member_plan_id', plan_id);
        formData.append('total_amount', plan_amount);        
        formData.append('patient_email', email);
        formData.append('patient_name', name);
        formData.append('patient_phone_no', phone_no);
        formData.append('patient_address', 'NULL');
        formData.append('patient_dob', '2018-02-01');
        formData.append('patient_age', '12');
        formData.append('patient_gender', 'MALE');
        formData.append('patient_home_phno', 'NULL');
        formData.append('patient_status', 'INACTIVE');
        formData.append('stripe_token', 'NULL');
         return this.http.post(this.apiUrl +"/Patients/addPatient/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
      addSubPatients(name,dob,gender,patient_amount,id): Observable<any> {
            const formData = new FormData();
            formData.append('sub_patients_name', name);
            formData.append('sub_patients_dob', dob);
            formData.append('sub_patients_gender', gender);
            formData.append('sub_patients_amount', patient_amount);
            formData.append('patients_id', id);
            return this.http.post(this.apiUrl +"/SubPatients/addSubpatients", formData)
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
    createSubscription(token:any,plan_id, patient_id,amount,member_plan_id, user_id,patient_name, patient_email): Observable<any> {
            const formData = new FormData();
            formData.append('token', token);
            formData.append('email', patient_email);
            
            formData.append('plan_id', plan_id);
            formData.append('patient_id', patient_id);
            
            formData.append('user_id', user_id);
            formData.append('amount', amount);
            formData.append('member_plan_id', member_plan_id);
            formData.append('patient_name', patient_email);
            formData.append('patient_email', patient_email);
            return this.http.post(this.apiUrl +"/Patients/createSubscription", formData)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }

}


