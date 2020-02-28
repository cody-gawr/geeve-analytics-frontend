
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


   // Get ClinicGoals
    getDentistGoals(clinic_id='', dentist_id ='', user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Goals/getDentistGoals?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&dentist_id="+dentist_id+"&token_id="+this.token_id, { headers: this.headers })
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
    formData.append('token', token);
    formData.append('token_id', this.token_id);

        return this.http.post(this.apiUrl +"/Goals/addDentistGoal/", formData)
        .pipe(map((response: Response) => {
                        return response;
       })
      );
    }

       
}

