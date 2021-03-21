import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';

@Injectable()
export class DentistGoalsService {

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


   // Get ClinicGoals
    getDentistGoals(clinic_id='', dentist_id ='', user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Goals/goalGetDentist?user_id="+user_id+"&clinic_id="+clinic_id+"&dentist_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       // Get ClinicGoals
    updateDentistGoals(clinicData, clinic_id='', dentist_id = '', user_id =this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {

            const formData = new FormData();

    formData.append('goals', clinicData);
    formData.append('user_id', user_id);
    formData.append('clinic_id', clinic_id);
    formData.append('dentist_id', dentist_id);
    var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/Goals/goalAddDentist", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
       })
      );
    }

       
}