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

   // Get Dentist
    getPlans(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Plans/getPlans?token="+this._cookieService.get("token")+"&token_id="+this.token_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Delete Clinic
    deletePlan(user_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('id', user_id);
    formData.append('token', token);
    formData.append('token_id', this.token_id);

        return this.http.post(this.apiUrl +"/Plans/delete", formData)
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
    formData.append('token', token);
    formData.append('token_id', this.token_id);
    
        return this.http.post(this.apiUrl +"/Plans/update/", formData)
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
    formData.append('token_id', this.token_id);

    formData.append('amount',amount);
    formData.append('discount', discount);
     formData.append('token', this._cookieService.get("token"));
        return this.http.post(this.apiUrl +"/Plans/add/", formData)
        .pipe(map((response: Response) => {
                        return response;
        })
        );
    }
}
