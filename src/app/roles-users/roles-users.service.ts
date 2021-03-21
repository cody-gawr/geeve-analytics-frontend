
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';


@Injectable()
export class RolesUsersService {

   public token: string;
   public api_url: string;
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

   // Get Dentist
    getUsers(user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Users/userGetRoles", { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Get Dentist
    getRoles(user_id= this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Roles/rolesGet", { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

           // Get Dentist
    getRoleUserDetails(role_id,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Users/userGetRoleDetails?role_id="+role_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // checkUserEmail
    checkUserEmail( email, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Users/userCheckEmail?email="+email, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
         })
        );
    }

       // Delete Clinic
    deleteUser(user_id, token = this._cookieService.get("token")): Observable<any> {
        const formData = new FormData();
        formData.append('id', user_id);
        
        var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/Users/userDelete", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Clinic
    saveRoles(role_id, checkedRoles, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
console.log(role_id);
    formData.append('role_id', role_id);
    formData.append('permisions', checkedRoles);
   
     var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/Roles/rolesUpdate", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Update Clinic
    addRoleUser(display_name, email, user_type,selectedClinic,password,selected_dentist, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    var dentist= JSON.stringify(selected_dentist);
    console.log(selected_dentist,dentist);
    formData.append('display_name', display_name);
    formData.append('email', email);
    formData.append('usertype', user_type);
    formData.append('password', password);
    formData.append('selected_dentist', dentist);
    formData.append('selectedClinic', selectedClinic);
     
     var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/Users/userAdd", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

      // Update Clinic
    updateRoleUser(id,display_name, email, user_type,selectedClinic,selected_dentist, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    var dentist= JSON.stringify(selected_dentist);
    console.log(dentist);
    formData.append('id', id);    
    formData.append('display_name', display_name);
    formData.append('email', email);
    formData.append('usertype', user_type);
    formData.append('selected_dentist', dentist);
    formData.append('selectedClinic', selectedClinic);
     
     var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/Users/userUpdate", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

}

