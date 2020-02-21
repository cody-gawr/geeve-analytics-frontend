
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


   // Get Dentist
   getInofficeDefaultersMembers(clinic_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {
        return this.http.get(this.apiUrl +"/InofficePayments/getInofficeDefaultersMembers?token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }

       // Get Dentist
   getDefaultersMembers(clinic_id,user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): 
    Observable<any> {
        return this.http.get(this.apiUrl +"/MemberPlan/getDefaultersMembers?token="+this._cookieService.get("token")+"&user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                    return response;
                })
        );
    }
  

    // Update Clinic
    sendDefaultersemail(defaulter_name, defaulter_email,token =this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('defaulter_name', defaulter_name);
    formData.append('defaulter_email', defaulter_email);
    formData.append('token', token);
    formData.append('token_id', this.token_id);

        return this.http.post(this.apiUrl +"/DefaultersEmail/sendDefaultersemail/", formData)
        .pipe(map((response: Response) => {
                        return response;
        })
        );
    }

}

