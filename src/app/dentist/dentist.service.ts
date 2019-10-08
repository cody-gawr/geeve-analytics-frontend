
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";


@Injectable()
export class DentistService {

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


   // Get Dentist
    getDentists(clinic_id='1', user_id=this._cookieService.get("userid") , token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/dentists?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token"), { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Delete Dentist
    deleteDentists(dentist_id, user_id=this._cookieService.get("userid") , token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', dentist_id);
    formData.append('token', token);

        return this.http.post(this.apiUrl +"/Dentists/delete", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Dentist
    updateDentists(dentist_id, value,clinic_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('provider_id', dentist_id);
    formData.append('name', value);
     formData.append('user_id', '23');
    formData.append('clinic_id',clinic_id);

    formData.append('token', token);
    
        return this.http.post(this.apiUrl +"/Dentists/update", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


    // Add Dentist
    addDentists(dentist_id, value,clinic_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('provider_id', dentist_id);
    formData.append('name', value);
     formData.append('user_id', this._cookieService.get("userid"));
    formData.append('clinic_id', clinic_id);

    formData.append('token', token);
    
        return this.http.post(this.apiUrl +"/Dentists/add", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}

