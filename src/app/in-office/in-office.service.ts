
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";

import { Router, NavigationEnd, Event  } from '@angular/router';

@Injectable()
export class InOfficeService {

   public token: string;
   public api_url: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public user_id;
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

    getClinicSettings( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Practices/getPractices?user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Delete Clinic
    deletePlan(id,clinic_id,plan_id,user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('patient_id', id);
    formData.append('clinic_id', clinic_id);
    formData.append('user_id', this.user_id);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('token', token);
     formData.append('token_id', this.token_id);
     formData.append('inoffice_payment_id', plan_id);

        return this.http.post(this.apiUrl +"/InofficePayments/deleteInofficeMembers/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

  

    addPaymentPlans(patient_name, patient_email,patient_dob,patient_phone_no,plan_name,plan_description,clinic_id,total_amount,setup_fee,deposite_percentage,deposite_amount,balance_amount,payment_frequency,duration,monthly_weekly_payment,start_date,patient_id,token =this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
        formData.append('patient_name', patient_name);
        formData.append('patient_email', patient_email);
        formData.append('plan_description', plan_description);
        formData.append('patient_dob',patient_dob );
        formData.append('patient_phone_no',patient_phone_no);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('clinic_id', clinic_id);
        formData.append('total_amount',total_amount);
        formData.append('setup_fee', setup_fee);
        formData.append('deposite_percentage',deposite_percentage);
        formData.append('deposite_amount',deposite_amount);
        formData.append('balance_amount',balance_amount );
        formData.append('payment_frequency',payment_frequency );
        formData.append('duration',duration );
        formData.append('monthly_weekly_payment',monthly_weekly_payment );
        formData.append('patient_id',patient_id );
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        formData.append('token_id', this.token_id);

            return this.http.post(this.apiUrl +"/InofficePayments/addPaymentPlans/", formData)
            .pipe(map((response: Response) => {
                // console.log(response);
                            return response;
            })
            );
        }

    getInofficeMembers(clinic_id,token = this._cookieService.get("token"),user_id = this._cookieService.get("userid")): 
    Observable<any> {
        return this.http.get(this.apiUrl +"/InofficePayments/getInofficeMembers?token="+this._cookieService.get("token")+"&clinic_id="+clinic_id+"&user_id="+this._cookieService.get("userid")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
            // console.log(response);
                    return response;
                })
        );
    }
    getexportData(clinic_id, start_date,end_date, token = this._cookieService.get("token"),user_id = this._cookieService.get("userid")): 
    Observable<any> {
        return this.http.get(this.apiUrl +"/InofficePayments/getExportData?token="+this._cookieService.get("token")+"&clinic_id="+clinic_id+"&user_id="+this._cookieService.get("userid")+"&token_id="+this.token_id+"&start_date="+start_date+"&end_date="+end_date, { headers: this.headers })
        .pipe(map((response: Response) => {
            // console.log(response);
                    return response;
                })
        );
    }



    updatePatientsDetails(patient_name, patient_address,patient_dob,patient_age,patient_gender,patient_phone_no,patient_home_phno,patient_id,token =this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
        formData.append('patient_name', patient_name);
        formData.append('patient_address', patient_address);
        formData.append('patient_dob',patient_dob);
        formData.append('patient_age', patient_age);
        formData.append('patient_gender', patient_gender);
        formData.append('patient_phone_no',patient_phone_no);
        formData.append('patient_home_phno', patient_home_phno);
        formData.append('patient_id', patient_id);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        formData.append('token_id', this.token_id);
       
            return this.http.post(this.apiUrl +"/InofficePayments/updatePatientsDetails/", formData)
            .pipe(map((response: Response) => {

                            return response;
            })
            );
        }

    getInofficeMembersByID(patient_id,clinic_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/InofficePayments/getInofficeMembersByIDAll?patient_id="+patient_id+"&user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                })
        );
    }

    getemailvalidation(patient_email,clinic_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Patients/getemailvalidation?patient_email="+patient_email+"&user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                })
        );
    }
   
   
    
}

