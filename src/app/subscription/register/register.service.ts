
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../../environments/environment";

@Injectable()
export class RegisterService {

    public token: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }


    private apiUrl = environment.apiUrl;

    // Items Predictor Analysis 
    checkPatientEmailExists(email,clinic_id,user_id): Observable<any> {
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

}


