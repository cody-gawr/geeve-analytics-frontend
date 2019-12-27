
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";

@Injectable()
export class PatientInfoService {

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


   
    getSubPatients(patient_id, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Patients/getAllPatientByID?patient_id="+patient_id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid"), { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }


    getAppointments(patient_id, member_plan_id, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Patients/getAppointments?patient_id="+patient_id+"&member_plan_id="+member_plan_id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid"), { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }

    log_appointment( patient_id, member_plan_id): Observable<any> { 
    const formData = new FormData();      
        formData.append('patient_id', patient_id);
        formData.append('member_plan_id', member_plan_id);
        formData.append('token', this._cookieService.get("token"));
formData.append('user_id', this._cookieService.get("userid"));
        return this.http.post(this.apiUrl +"/Patients/logAppointment/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    deleteAppointment(id, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Patients/deleteAppointment?id="+id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid"), { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }

       // Delete Clinic
    deletePatients(patient_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('patient_id', patient_id);
    formData.append('token', token);
formData.append('user_id', this._cookieService.get("userid"));
        return this.http.post(this.apiUrl +"/Patients/deletePatientByID", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    getPatientContract(patient_id, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Patients/getPatientContract?patient_id="+patient_id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid"), { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }

    
    updatePatients(patient_id,member_plan_id,contract_upload,token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
    
        formData.append('patient_id', patient_id);
        formData.append('member_plan_id',member_plan_id);
        formData.append('contract_upload', contract_upload);
        // formData.append('status',patient_status);
        formData.append('token', token);
       formData.append('user_id', this._cookieService.get("userid"));
            return this.http.post(this.apiUrl +"/Patients/UploadContract/", formData)
            .pipe(map((response: Response) => {
          //      console.log(response);
                            return response;
                        })
            );
    }


    contractUpload( formData): Observable<any> {
       
        formData.append('id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
formData.append('user_id', this._cookieService.get("userid"));
    return this.http.post(this.apiUrl +"/Patients/logoUpload/", formData)
    .pipe(map((response: Response) => {
        // console.log(response);
        
                    return response;
                })
    );
    }

    getBenefitsUsed(patient_id,member_plan_id, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"PatientsBenefits/getBenefitsUsed?patient_id="+patient_id+"&member_plan_id="+member_plan_id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid"), { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                    })
        );
    }

    addBenefits(patient_id,member_plan_id,member_treatment_id,patients_sittings,sitting,token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
    
        formData.append('patients_id', patient_id);
        formData.append('member_plan_id',member_plan_id);
        formData.append('member_treatment_id', member_treatment_id);
        formData.append('patients_sittings',patients_sittings);
        formData.append('sitting',sitting);
        formData.append('token', token);
       formData.append('user_id', this._cookieService.get("userid"));
            return this.http.post(this.apiUrl +"/PatientsBenefits/addBenefits/", formData)
            .pipe(map((response: Response) => {
          //      console.log(response);
                return response;
            })
            );
    }

    updateSittingStatus(patient_id,member_plan_id,sitting_id,sitting_status,performed_date,token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
    
        formData.append('patients_id', patient_id);
        formData.append('member_plan_id',member_plan_id);
        formData.append('sitting_id', sitting_id);
        formData.append('sitting_status',sitting_status);
        formData.append('performed_date', performed_date);
        formData.append('token', token);
       formData.append('user_id', this._cookieService.get("userid"));
            return this.http.post(this.apiUrl +"/PatientsBenefits/updateSittingStatus/", formData)
            .pipe(map((response: Response) => {
          //      console.log(response);
                            return response;
                        })
            );
    }
    getPaymentHistory(patient_id,member_plan_id,user_id,clinic_id, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"PaymentHistory/getPaymentHistory?patient_id="+patient_id+"&member_plan_id="+member_plan_id+"&user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid"), { headers: this.headers })
        .pipe(map((response: Response) => {
                return response;
                console.log(response);
                    })
        );
    }

    deleteBenefitsUsed(patient_id,token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
    
        formData.append('patients_benefits_id', patient_id);
        formData.append('token', token);
       formData.append('user_id', this._cookieService.get("userid"));
            return this.http.post(this.apiUrl +"/PatientsBenefits/deleteBenefitsUsed/", formData)
            .pipe(map((response: Response) => {
          //      console.log(response);
                            return response;
                        })
            );
    }

        updatePatientsDetails(patient_name, patient_address,patient_dob,patient_age,patient_gender,patient_phone_no,patient_home_phno,patient_status,patient_id,token =this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
        
        formData.append('patient_name', patient_name);
        formData.append('patient_address', patient_address);
        formData.append('patient_dob',patient_dob);
        formData.append('patient_age', patient_age);
        formData.append('patient_gender', patient_gender);
        formData.append('patient_phone_no',patient_phone_no);
        formData.append('patient_home_phno', patient_home_phno);
        formData.append('patient_status', patient_status);
        formData.append('patient_id', patient_id);
        formData.append('token', token);
       formData.append('user_id', this._cookieService.get("userid"));

            return this.http.post(this.apiUrl +"/Patients/updatePatientDetails/", formData)
            .pipe(map((response: Response) => {
                            return response;
            })
            );
        }
       
}