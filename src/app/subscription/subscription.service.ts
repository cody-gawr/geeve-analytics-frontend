
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";

@Injectable()
export class SubscriptionService {

    public token: string;
    public token_id: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
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


    private apiUrl = environment.apiUrl;

    // Items Predictor Analysis 
    getPlans(clinic_id,user_id): Observable<any> {
        var header = this.getHeaders(); 
            return this.http.get(this.apiUrl +"/MemberPlan/getSubscriptions?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }

    getClinicSettings( clinic_id='1', user_id = this._cookieService.get("userid")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Practices/getPracticesFrontendSubscription?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    sendContactUsMail(userName,userEmail,userPhone,userMessage,clinicEmail): Observable<any> {
        console.log(clinicEmail);
    const formData = new FormData();

    formData.append('userName', userName);
    formData.append('userEmail', userEmail);
    formData.append('userPhone', userPhone);
    formData.append('userMessage', userMessage);
    formData.append('clinicEmail', clinicEmail);
    formData.append('user_id', this._cookieService.get("userid"));

    return this.http.post(this.apiUrl +"/Practices/sendContactEmail/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }





}


