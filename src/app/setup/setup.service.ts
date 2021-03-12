
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';
@Injectable()
export class SetupService {

   public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;

    constructor(private http: HttpClient,private _cookieService: CookieService,private router: Router) {}

     getHeaders(){
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2'){
            this.token_id = this._cookieService.get("childid");
        } else {
            this.token_id= this._cookieService.get("userid");
        }
        var authString = this._cookieService.get("token")+" "+this.token_id;
        let headers = new HttpHeaders({'Authorization' : authString});
        return headers;
    }

   
    // Get ClinicSettings
    getXeroLink( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/getAuthorizeUrl/?getxero=1&user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    checkXeroStatus( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/getXeroStatus?getxero=1&user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    clearSession( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/disconnectXero/?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    checkReportsStatus( clinicId, user_id = this._cookieService.get("userid")): Observable<any> {
        return this.http.get(this.apiUrl +"/users/checkReportsStatus/"+user_id+"/"+clinicId, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    sendCompleteEmail( user_id = this._cookieService.get("userid")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/users/sendCompleteEmail/"+user_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

     updateStepperStatus(): Observable<any> {
            const formData = new FormData();
            formData.append('user_id', this._cookieService.get("userid"));
            formData.append('stepper_status', this._cookieService.get("stepper"));
            var header = this.getHeaders(); 
            return this.http.post(this.apiUrl +"/users/updateStepperStatus", formData,  { headers: header })
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }

    addClinic(name,address,phone_no,clinicEmail,displayName,days, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('clinicName', name);
    formData.append('address', address);
    formData.append('phoneNo', phone_no);
    formData.append('clinicEmail', clinicEmail);    
    formData.append('display_name', displayName);    
    formData.append('days', days);    
    /*formData.append('contactName', contact_name);*/
    /*formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('linkedin', linkedin);
    formData.append('logo', clinic_logo);
    formData.append('instagram', instagram);*/
    formData.append('user_id', this._cookieService.get("userid"));
    var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/Clinics/add/", formData,{ headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

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

        return this.http.post(this.apiUrl +"/MemberPlan/addmemberplan/", formData,{ headers: header })
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
            var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/Users/logoUpload/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       
}

