
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';


@Injectable()
export class DefaultersService {

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
   getInofficeDefaultersMembers(clinic_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/InofficePayments/getInofficeDefaultersMembers?user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }

       // Get Dentist
   getDefaultersMembers(clinic_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {
         var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Patients/getDefaulterMembers?user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }
  

    // Update Clinic
    sendDefaultersemail(defaulter_patient_id,defaulter_name, defaulter_email,defaulter_type,defaulter_plan_id,token =this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('defaulter_patient_id', defaulter_patient_id); 
    formData.append('defaulter_name', defaulter_name);
    formData.append('defaulter_email', defaulter_email)
    formData.append('defaulter_type', defaulter_type);
    formData.append('defaulter_plan_id', defaulter_plan_id);
    var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/DefaultersEmail/sendDefaultersemail/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
        })
        );
    }

}

