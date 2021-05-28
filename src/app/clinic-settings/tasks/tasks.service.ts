import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../../environments/environment";
@Injectable()

export class TaskService {  
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;

    constructor(private http: HttpClient,private _cookieService: CookieService) {}
    
    getHeaders()
    {
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2'){
            this.token_id = this._cookieService.get("childid");
        } else {
            this.token_id= this._cookieService.get("userid");
        }
        var authString = this._cookieService.get("token")+" "+this.token_id;
        let headers = new HttpHeaders({'Authorization' : authString});
        return headers;

    }

   // Get tasks
    getTasks( clinic_id): Observable<any>
    {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/clinics/clinicGetEndDayTasks?clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
   // update tasks
    updateTaskStatus( event,id,cid,is_default): Observable<any>
    {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('clinic_id', cid);
        formData.append('is_active', event);          
        formData.append('is_default', is_default);          
        return this.http.post(this.apiUrl +"/clinics/clinicUpdateEndDayTasks", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       
}