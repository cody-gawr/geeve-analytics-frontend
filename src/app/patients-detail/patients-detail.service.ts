import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';


@Injectable()
export class PatientsDetailService {

   public token: string;
   public api_url: string;
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

     getHeaders(){
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2'){
            this.token_id = this._cookieService.get("childid");
        }else {
            this.token_id= this._cookieService.get("userid");
        }
        var authString = this._cookieService.get("token")+" "+this.token_id;
        let headers = new HttpHeaders({'Authorization' : authString});
        return headers;
   }
    getClinicSettings( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Practices/getPractices?user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


   // Get Dentist
    getPatients(clinic_id,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Patients/getAllPatient?clinic_id="+clinic_id+"&user_id="+this._cookieService.get("userid"), { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Get Dentist
    getInviteMembers(clinic_id,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Patients/getInviteMembers?clinic_id="+clinic_id+"&user_id="+this._cookieService.get("userid"), { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

// Get Dentist
    deleteInviteMembers(id,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/InviteMember/deleteInviteMembers?id="+id+"&user_id="+this._cookieService.get("userid"), { headers: header })
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
        formData.append('user_id', this._cookieService.get("userid"));
   var header = this.getHeaders(); 
          
            return this.http.post(this.apiUrl +"/Patients/updatePatientByID/", formData, { headers: header })
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
        }

    getPlans(clinic_id='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {  
    var header = this.getHeaders();  
        return this.http.get(this.apiUrl +"/MemberPlan/getAllMemberPlans?user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }
    getPlansForPurchase(clinic_id='',patient_id,plan_id,plan_length,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {   
            var header = this.getHeaders();  
        return this.http.get(this.apiUrl +"/MemberPlan/getPlansForPurchase?user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id+'&patient_id='+patient_id+'&plan_id='+plan_id+'&plan_length='+plan_length, { headers: header })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }

       // Delete Clinic
    deletePatients(patient_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('patient_id', patient_id);
    formData.append('user_id', this._cookieService.get("userid"));
    var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/Patients/deletePatientByID", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


        // Update Clinic
    inviteMember(clinic_id,invite_member_name, invite_member_email,type,token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('clinic_id', clinic_id);
    formData.append('invite_member_name', invite_member_name);
    formData.append('invite_member_email', invite_member_email);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('type', type);

   var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/InviteMember/add/", formData, { headers: header })
        .pipe(map((response: Response) => {
                     return response;
                    })
        );
    }
    logoUpload( formData): Observable<any> {
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        formData.append('id', this._cookieService.get("childid"));
        else
        formData.append('id', this._cookieService.get("userid"));

        formData.append('user_id', this._cookieService.get("userid"));
 var header = this.getHeaders();

    return this.http.post(this.apiUrl +"/Practices/logoUpload/", formData,  { headers: header })
    .pipe(map((response: Response) => {
                    return response;
                })
    );
    }

    getClinincname(id,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/MemberPlan/getMembersclinics?&member_plan_id="+id+"&user_id="+this._cookieService.get("userid"), { headers: header })
        .pipe(map((response: Response) => {
            // console.log(response)
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
        formData.append('user_id', this._cookieService.get("userid"));
        var header = this.getHeaders();
       
        return this.http.post(this.apiUrl +"/InofficePayments/updatePatientsDetails/", formData,  { headers: header })
            .pipe(map((response: Response) => {
                console.log(response);
                            return response;
            })
            );
        }

        changeMemberPlan(patient_id, plan_id,token =this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
        
        formData.append('patient_id', patient_id);
        formData.append('plan_id', plan_id);
        formData.append('user_id', this._cookieService.get("userid"));
        var header = this.getHeaders();
       
        return this.http.post(this.apiUrl +"/MemberPlan/changeMemberPlan/", formData,  { headers: header })
            .pipe(map((response: Response) => {
                console.log(response);
                            return response;
            })
            );
        }

    getInofficeMembersByID(patient_id,clinic_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/Patients/getAllPatientByID?patient_id="+patient_id+"&user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                return response;         
                })
        );
    }

    getexportData(clinic_id,start_date,end_date, token = this._cookieService.get("token"),user_id = this._cookieService.get("userid")):
    Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/Patients/getExportData?clinic_id="+clinic_id+"&user_id="+this._cookieService.get("userid")+"&start_date="+start_date+"&end_date="+end_date, { headers: header })
        .pipe(map((response: Response) => {
            // console.log(response);
                    return response;
                })
        );
    }
}

