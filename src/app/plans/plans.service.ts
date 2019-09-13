
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
    getPlans(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Plans/getPlans?token="+this._cookieService.get("token"), { headers: this.headers })
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

        return this.http.post(this.apiUrl +"/Plans/delete", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Clinic
    updateUser(user_id, value, column, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', user_id);
    formData.append(column, value);
     formData.append('user_id', this._cookieService.get("userid"));
    formData.append('clinic_id', '1');

    formData.append('token', token);
    
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

