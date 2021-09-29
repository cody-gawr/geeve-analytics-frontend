
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../environments/environment";
import { Router  } from '@angular/router';
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
        let headers =  {headers: new HttpHeaders(), withCredentials: true};
        return headers;
    }

   
    // Get ClinicSettings
    getXeroLink( clinic_id): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/getAuthorizeUrl/?getxero=1&clinic_id="+clinic_id, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    getPMSLink(): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/users/userGetPMS/token", header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    checkXeroStatus( clinic_id): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Xeros2/xeroGetStatus?getxero=1&clinic_id="+clinic_id, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    getMyobLink( clinic_id): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Myob/getAuthorizeUrl?clinic_id="+clinic_id, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    checkMyobStatus( clinic_id): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Myob/myobGetStatus?clinic_id="+clinic_id, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    clearSession( clinic_id): Observable<any> {
        var header = this.getHeaders(); 
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        return this.http.post(this.apiUrl +"/Xeros2/disconnectXero/", formData, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    clearSessionMyob( clinic_id): Observable<any> {
        var header = this.getHeaders(); 
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        return this.http.post(this.apiUrl +"/Myob/disconnectMyob/", formData, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    checkReportsStatus( clinicId, userId = this._cookieService.get("userid")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/users/userCheckStatus/"+userId+"/"+clinicId, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }



     updateStepperStatus(): Observable<any> {
            const formData = new FormData();
            formData.append('stepper_status', this._cookieService.get("stepper"));
            var header = this.getHeaders(); 
            return this.http.post(this.apiUrl +"/users/userUpdateStepper", formData,  header)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
    }

    addClinic(name,address,phone_no,clinicEmail,displayName,days): Observable<any> {
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
    var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/clinics/clinicAdd", formData,header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }       
}