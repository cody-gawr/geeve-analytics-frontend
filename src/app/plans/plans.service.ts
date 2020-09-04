
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';


@Injectable()
export class PlansService {

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

   // Get Dentist
    getPlans(clinic_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MemberPlan/getMemberplan?user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }


    getPatientsonPlan(memberplan_id, user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {
         var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MemberPlan/getPatientsonPlan?user_id="+this._cookieService.get("userid")+"&id="+memberplan_id, { headers: header })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }

    getTreatments(user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {
         var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Treatments/getTreatments?user_id="+this._cookieService.get("userid"), { headers: header })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }



       // Delete Clinic
    deletePlan(id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('id', id);
     formData.append('user_id', this._cookieService.get("userid"));
         var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/MemberPlan/deleteMemberplan", formData,{ headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


    updateUser(memberid,clinic_id,planName,planOrder,planLength,totalAmount,discount,description,isFeatured,hidden,preventative_plan,preventative_frequency,treatment_inclusions,treatment_exclusions,preventative_discount,sendMail, updateUser,changeType,token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
    
        formData.append('id', memberid);
        formData.append('clinic_id', clinic_id);
        formData.append('planName', planName);
        formData.append('planOrder', planOrder);
        formData.append('planLength', planLength);
        formData.append('totalAmount', totalAmount);
        formData.append('discount', discount);
        formData.append('description', description);
        formData.append('isFeatured', isFeatured);
        formData.append('hidden', hidden);

        formData.append('preventative_plan',preventative_plan);
        formData.append('preventative_frequency', preventative_frequency);
        formData.append('treatment_inclusions',treatment_inclusions );
        formData.append('treatment_exclusions',treatment_exclusions);
        formData.append('preventative_discount',preventative_discount);
         formData.append('user_id', this._cookieService.get("userid"));
        
         formData.append('sendMail', sendMail);
        formData.append('updateUser', updateUser);
        formData.append('changeType', changeType);
        var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/MemberPlan/updateMemberplan/", formData, { headers: header })
         .pipe(map((response: Response) => {
                            return response;
                        })
            );
        }



    // Update Clinic
    addPlans(planName,planOrder,planLength,totalAmount,discount, description,clinic_id,isFeatured,preventative_plan,preventative_frequency,treatment_inclusions,treatment_exclusions,preventative_discount,token =this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('clinic_id', clinic_id);
    formData.append('planName', planName);
    formData.append('planOrder', planOrder);
    formData.append('planLength', planLength);
    formData.append('discount',discount);
    formData.append('totalAmount',totalAmount);
    formData.append('description', description);
    formData.append('isFeatured',isFeatured);
    formData.append('preventative_plan',preventative_plan);
    formData.append('preventative_frequency', preventative_frequency);
    formData.append('treatment_inclusions',treatment_inclusions );
    formData.append('treatment_exclusions',treatment_exclusions);
    formData.append('preventative_discount',preventative_discount);
     formData.append('user_id', this._cookieService.get("userid"));
      var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/MemberPlan/addmemberplan/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
        })
        );
    }/*Also checking planorder */
    getPlannamevalidation(planName,clinic_id,token = this._cookieService.get("token"),user_id = this._cookieService.get("userid")): 
    Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MemberPlan/getPlannamevalidation?planName="+planName+"&clinic_id="+clinic_id+"&user_id="+this._cookieService.get("userid"), { headers: header })
        .pipe(map((response: Response) => {
            // console.log(response);
                    return response;
                })
        );
    }
    getUpdateplanvalidation(planName,clinic_id,memberid,planOrder, token = this._cookieService.get("token"),user_id = this._cookieService.get("userid")): 
    Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/MemberPlan/getUpdateplanvalidation?planName="+planName+"&clinic_id="+clinic_id+"&id="+memberid+"&user_id="+this._cookieService.get("userid")+"&planOrder="+planOrder, { headers: header })
        .pipe(map((response: Response) => {
            // console.log(response);
                    return response;
                })
        );
    }

        retryUpdate(memberid,clinic_id,planName,planOrder,planLength,totalAmount,discount,description,isFeatured,hidden,preventative_plan,preventative_frequency,treatment_inclusions,treatment_exclusions,preventative_discount,sendMail, updateUser,changeType,token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
    
        formData.append('id', memberid);
        formData.append('clinic_id', clinic_id);
        formData.append('planName', planName);
        formData.append('planOrder', planOrder);
        formData.append('planLength', planLength);
        formData.append('totalAmount', totalAmount);
        formData.append('discount', discount);
        formData.append('description', description);
        formData.append('isFeatured', isFeatured);
        formData.append('hidden', hidden);

        formData.append('preventative_plan',preventative_plan);
        formData.append('preventative_frequency', preventative_frequency);
        formData.append('treatment_inclusions',treatment_inclusions );
        formData.append('treatment_exclusions',treatment_exclusions);
        formData.append('preventative_discount',preventative_discount);
         formData.append('user_id', this._cookieService.get("userid"));
        
         formData.append('sendMail', sendMail);
        formData.append('updateUser', updateUser);
        formData.append('changeType', changeType);
        var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/MemberPlan/retryUpdate/", formData, { headers: header })
         .pipe(map((response: Response) => {
                            return response;
                        })
            );
        }


       // Delete Clinic
    discard(id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('id', id);
         var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/MemberPlan/discard", formData,{ headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    getRetryPatients(id, token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
        formData.append('id', id);
         var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/MemberPlan/getRetryPatients", formData,{ headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}

