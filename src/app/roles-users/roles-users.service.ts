
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

  getHeaders(){
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2'){
            this.token_id = this._cookieService.get("childid");
        }else {
            this.token_id= this._cookieService.get("userid");
        }
        var authString = this._cookieService.get("token")+" "+this.token_id;
        let headers = new HttpHeaders({'Authorization' : authString});
        return headers;
   }

   // Get Dentist
    getUsers(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
var header = this.getHeaders(); 

        return this.http.get(this.apiUrl +"/Users/getRolesUsers?user_id="+this._cookieService.get("userid")+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Get Dentist
    getRoles(token = this._cookieService.get("token")): Observable<any> {

    if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        this.token_id = this._cookieService.get("childid");
        else
        this.token_id= this._cookieService.get("userid");
        var authString = this._cookieService.get("token")+" "+this.token_id;
        let headers = new HttpHeaders({'Authorization' : authString});


        return this.http.get(this.apiUrl +"/Roles/getRoles?user_id="+this._cookieService.get("userid"), { headers: headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // checkUserEmail
    checkUserEmail( email, token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/Users/checkUserEmail?email="+email+"&user_id="+this._cookieService.get("userid"), { headers: header })
        .pipe(map((response: Response) => {
                        return response;
         })
        );
    }

       // Delete Clinic
    deleteUser(user_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('id', user_id);
   formData.append('user_id', this._cookieService.get("userid"));
       var header = this.getHeaders(); 

        return this.http.post(this.apiUrl +"/Users/delete", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Update Clinic
    saveRoles(role_id, checkedRoles, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('role_id', role_id);
    formData.append('permisions', checkedRoles);
    formData.append('user_id', this._cookieService.get("userid"));
        var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/Roles/saveRoles/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Update Clinic
    addRoleUser(display_name, email, user_type,password, clinic_id,dentist_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('display_name', display_name);
    formData.append('email', email);
    formData.append('user_type', user_type);
    formData.append('clinic_id', clinic_id);
    formData.append('password', password);
    formData.append('dentist_id', dentist_id);

    formData.append('user_id', this._cookieService.get("userid"));
        var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/Users/addRoleUser/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Update Clinic
    updateRoleUser(user_id, value, column, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append(column, value);

    formData.append('id', user_id);
      var header = this.getHeaders(); 
    
        return this.http.post(this.apiUrl +"/Users/updateUser/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}

