import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../environments/environment";
import { Router  } from '@angular/router';

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
        let headers =  {headers: new HttpHeaders(), withCredentials: true};
        return headers;
    }


   // Get ClinicGoals
    getDentistGoals(clinic_id='', dentist_id =''): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Goals/goalGetDentist?clinic_id="+clinic_id+"&dentist_id="+dentist_id, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       // Get ClinicGoals
    updateDentistGoals(clinicData, clinic_id='', dentist_id = ''): Observable<any> {

            const formData = new FormData();

    formData.append('goals', clinicData);
    formData.append('clinic_id', clinic_id);
    formData.append('dentist_id', dentist_id);
    var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/Goals/goalAddDentist", formData, header)
        .pipe(map((response: Response) => {
                        return response;
       })
      );
    }

       
}