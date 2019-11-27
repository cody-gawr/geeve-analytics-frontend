
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";


@Injectable()
export class PlansService {

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
    getPlans(clinic_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {
        return this.http.get(this.apiUrl +"/MemberPlan/getMemberplan?token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }


    getTreatments(user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {
        return this.http.get(this.apiUrl +"/Treatments/getTreatments?token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid"), { headers: this.headers })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }



       // Delete Clinic
    deletePlan(id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('token', token);

        return this.http.post(this.apiUrl +"/MemberPlan/deleteMemberplan", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    
    // updateUser(memberid,clinic_id, value, column, token = this._cookieService.get("token")): Observable<any> {
    // const formData = new FormData();

    // formData.append('id', memberid);
    // formData.append('clinic_id', clinic_id);
    //  formData.append(column, value);
    //  formData.append('user_id', this._cookieService.get("userid"));
    //  formData.append('token', token);
    
    //     return this.http.post(this.apiUrl +"/MemberPlan/updateMemberplan/", formData)
    //     .pipe(map((response: Response) => {
    //                     return response;
    //                 })
    //     );
    // }


    updateUser(memberid,clinic_id,planName,planOrder,planLength,totalAmount,discount,treatment_id,description,isFeatured,token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
    
        formData.append('id', memberid);
        formData.append('clinic_id', clinic_id);
        formData.append('planName', planName);
        formData.append('planOrder', planOrder);
        formData.append('planLength', planLength);
        formData.append('totalAmount', totalAmount);
        formData.append('discount', discount);
        formData.append('treatment_id', treatment_id);
        formData.append('description', description);
        formData.append('isFeatured', isFeatured);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        
        return this.http.post(this.apiUrl +"/MemberPlan/updateMemberplan/", formData)
         .pipe(map((response: Response) => {
                            return response;
                        })
            );
        }



    // Update Clinic
    addPlans(planName,planOrder,planLength,totalAmount,discount, description,clinic_id,treat,isFeatured,token =this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('clinic_id', clinic_id);
    formData.append('planName', planName);
    formData.append('planOrder', planOrder);
    formData.append('planLength', planLength);
    formData.append('discount',discount);
    formData.append('totalAmount',totalAmount);
    formData.append('description', description);
    formData.append('treatment_id',treat );
    formData.append('isFeatured',isFeatured);
    
    formData.append('token', token);

        return this.http.post(this.apiUrl +"/MemberPlan/addmemberplan/", formData)
        .pipe(map((response: Response) => {
                        return response;
        })
        );
    }/*Also checking planorder */
    getPlannamevalidation(planName,clinic_id,planOrder,token = this._cookieService.get("token"),user_id = this._cookieService.get("userid")): 
    Observable<any> {
        return this.http.get(this.apiUrl +"/MemberPlan/getPlannamevalidation?token="+this._cookieService.get("token")+"&planName="+planName+"&clinic_id="+clinic_id+"&user_id="+this._cookieService.get("userid")+"&planOrder="+planOrder, { headers: this.headers })
        .pipe(map((response: Response) => {
            // console.log(response);
                    return response;
                })
        );
    }
    getUpdateplanvalidation(planName,clinic_id,memberid,planOrder, token = this._cookieService.get("token"),user_id = this._cookieService.get("userid")): 
    Observable<any> {
        return this.http.get(this.apiUrl +"/MemberPlan/getUpdateplanvalidation?token="+this._cookieService.get("token")+"&planName="+planName+"&clinic_id="+clinic_id+"&id="+memberid+"&user_id="+this._cookieService.get("userid")+"&planOrder="+planOrder, { headers: this.headers })
        .pipe(map((response: Response) => {
            // console.log(response);
                    return response;
                })
        );
    }
}

