import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";


@Injectable()
export class PatientsDetailService {

   public token: string;
   public api_url: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
   }


   // Get Dentist
    getPatients(memberid, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Patients/getAllPatient?member_plan_id="+memberid+"&token="+this._cookieService.get("token"), { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    updatePatients(patient_id,member_plan_id, patient_status,token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
    
        formData.append('patient_id', patient_id);
        formData.append('member_plan_id',member_plan_id);
        formData.append('status',patient_status);
        formData.append('token', token);
        
            return this.http.post(this.apiUrl +"/Patients/updatePatientByID/", formData)
            .pipe(map((response: Response) => {
                console.log(response);
                            return response;
                        })
            );
        }

    getPlans(user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {
        return this.http.get(this.apiUrl +"/MemberPlan/getAllMemberPlans?token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid"), { headers: this.headers })
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

        return this.http.post(this.apiUrl +"/Patients/deletePatientByID", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


        // Update Clinic
    inviteMember(clinic_id,invite_member_name, invite_member_email,token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('clinic_id', clinic_id);
    formData.append('invite_member_name', invite_member_name);
    formData.append('invite_member_email', invite_member_email);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('token', token);
    
        return this.http.post(this.apiUrl +"/InviteMember/add/", formData)
        .pipe(map((response: Response) => {
                     return response;
                     console.log(response);
                    })
        );
    }
    logoUpload( formData): Observable<any> {
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        formData.append('id', this._cookieService.get("childid"));
        else
        formData.append('id', this._cookieService.get("userid"));

        formData.append('token', this._cookieService.get("token"));

    return this.http.post(this.apiUrl +"/Practices/logoUpload/", formData)
    .pipe(map((response: Response) => {
                    return response;
                })
    );
    }

    getClinincname(id,token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/MemberPlan/getMembersclinics?&member_plan_id="+id+"&token="+this._cookieService.get("token"), { headers: this.headers })
        .pipe(map((response: Response) => {
            // console.log(response)
                        return response;
                    })

        );
    }
}

