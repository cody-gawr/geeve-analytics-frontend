
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";


@Injectable()
export class RolesUsersService {

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
    getUsers(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Users/getRolesUsers?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token"), { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Get Dentist
    getRoles(token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Roles/getRoles?token="+this._cookieService.get("token"), { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // checkUserEmail
    checkUserEmail( email, token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Users/checkUserEmail?email="+email+"&token="+this._cookieService.get("token"), { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
         })
        );
    }

       // Delete Clinic
    deleteUser(user_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', user_id);
    formData.append('token', token);

        return this.http.post(this.apiUrl +"/Users/delete", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Clinic
    saveRoles(role_id, checkedRoles, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', role_id);
    formData.append('permisions', checkedRoles);
    formData.append('token', token);    
        return this.http.post(this.apiUrl +"/Roles/saveRoles/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Update Clinic
    addRoleUser(display_name, email, user_type,password, clinic_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('display_name', display_name);
    formData.append('email', email);
    formData.append('user_type', user_type);
    formData.append('clinic_id', clinic_id);
    formData.append('password', password);

     formData.append('user_id', this._cookieService.get("userid"));
    formData.append('token', token);
    
        return this.http.post(this.apiUrl +"/Users/addRoleUser/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}

