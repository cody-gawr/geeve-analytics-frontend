
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";

@Injectable()
export class DentistGoalsService {

   public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
   }


   // Get ClinicGoals
    getDentistGoals(clinic_id='1', user_id = this._cookieService.get("userid"), dentist_id ='1', token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"Goals/getDentistGoals?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&dentist_id="+dentist_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       // Get ClinicGoals
    updateDentistGoals(clinicData, clinic_id='1', user_id =this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
            const formData = new FormData();

    formData.append('goals', clinicData);
    formData.append('user_id', user_id);
    formData.append('clinic_id', clinic_id);
    formData.append('dentist_id', '1');
    formData.append('token', token);

        return this.http.post(this.apiUrl +"Goals/addDentistGoal/", formData)
        .pipe(map((response: Response) => {
                        return response;
       })
        );
    }

       
}

