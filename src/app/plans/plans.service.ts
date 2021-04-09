import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
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
   }

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

   // Get Dentist
    getPlans(clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Plans/getPlans", { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Delete Clinic
    deletePlan(user_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('id', user_id);
   var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/Plans/delete", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Clinic
    updatePlan(user_id, plan, allowedClinics, description, amount, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', user_id);
    formData.append('plan', plan);
    formData.append('allowedClinics', allowedClinics);
    formData.append('description', description);
    formData.append('amount', amount);
     formData.append('user_id', this._cookieService.get("userid"));
    formData.append('clinic_id', '1');
   var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/Plans/update/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Clinic
    addPlans(plan, allowedClinics, description,amount, discount): Observable<any> {
    const formData = new FormData();

    formData.append('plan', plan);
    formData.append('allowedClinics', allowedClinics);
    formData.append('description', description);
    formData.append('amount',amount);
    formData.append('discount', discount);
    var header = this.getHeaders();   
        return this.http.post(this.apiUrl +"/Plans/add/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
        })
        );
    }
}
