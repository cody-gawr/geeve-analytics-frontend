
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";

@Injectable()
export class InOfficeHistoryService {

   public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        this.token_id = this._cookieService.get("childid");
        else
        this.token_id= this._cookieService.get("userid");
        
   }
  
    getPatientContract(patient_id, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Patients/getPatientContract?patient_id="+patient_id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }
  
    updatePatients(patient_id,contract_upload,token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
    
        formData.append('patient_id', patient_id);
        formData.append('contract_upload', contract_upload);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        formData.append('token_id', this.token_id);
       
            return this.http.post(this.apiUrl +"/InofficePayments/UploadContract/", formData)
            .pipe(map((response: Response) => {
          //      console.log(response);
                            return response;
                        })
            );
    }
    contractUpload( formData): Observable<any> {
       
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        formData.append('token_id', this.token_id);

    return this.http.post(this.apiUrl +"/Patients/logoUpload/", formData)
    .pipe(map((response: Response) => {
        // console.log(response);
        
                    return response;
                })
    );
    }
    deleteInofficeMembersPlan(patient_id,inoffice_payment_id,token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
    
        formData.append('patient_id', patient_id);
        formData.append('inoffice_payment_id', inoffice_payment_id);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        formData.append('token_id', this.token_id);
       
            return this.http.post(this.apiUrl +"/InofficePayments/deleteInofficeMembersPlan/", formData)
            .pipe(map((response: Response) => {
          //      console.log(response);
                            return response;
                        })
            );
    }

    getInofficeMembersByID(patient_id,clinic_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/InofficePayments/getInofficeMembersByID?patient_id="+patient_id+"&user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                // console.log(response);
                return response;
              
                })
        );
    }
    addPaymentPlans(patient_name, patient_email,plan_name,plan_description,clinic_id,total_amount,setup_fee,deposite_percentage,deposite_amount,balance_amount,payment_frequency,duration,monthly_weekly_payment,start_date,token =this._cookieService.get("token")): Observable<any> {
   
        const formData = new FormData();
        formData.append('patient_name', patient_name);
        formData.append('patient_email', patient_email);
        formData.append('plan_name',plan_name);
        formData.append('plan_description', plan_description);
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
        formData.append('start_date',start_date );
        //formData.append('due_date',due_date );
        formData.append('token', token);
        formData.append('token_id', this.token_id);

            return this.http.post(this.apiUrl +"/InofficePayments/addPaymentPlans/", formData)
            .pipe(map((response: Response) => {
                           return response;
            })
            );
        }
    getInofficeMembersPlanInvoices(patient_id,inoffice_payment_id, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/InofficePayments/getInofficeMembersPlanInvoices?patient_id="+patient_id+"&inoffice_payment_id="+inoffice_payment_id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                })
        );
    }
    getClinicPatientsbyId(patient_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Patients/getClinicPatientsbyId?patient_id="+patient_id+"&user_id="+this._cookieService.get("userid")+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                })
        );
    }
}