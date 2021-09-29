import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../../environments/environment";
@Injectable()

export class ScriptsService {  
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
        let headers =  {headers: new HttpHeaders(), withCredentials: true};
        return headers;

    }

   // Get tasks
    getScripts( clinic_id): Observable<any>
    {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/clinics/clinicGetScripts?clinic_id="+clinic_id, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }   

    addUpdateScript(id,name,text,type,colour,clinic_id): Observable<any>
    {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('record_id', id);
        formData.append('clinic_id', clinic_id);                  
        formData.append('followup_type', type);
        formData.append('script_title', name);
        formData.append('script_text', text);
        formData.append('colour', colour);
        return this.http.post(this.apiUrl +"/clinics/clinicAddUpdateScript", formData, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    updateSingleColumn(record_id,column,value,clinic_id): Observable<any>
    {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('record_id', record_id);
        formData.append('clinic_id', clinic_id);                  
        formData.append(column, value);
        return this.http.post(this.apiUrl +"/clinics/clinicAddUpdateScript", formData, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    deleteScript(clinic_id,record_id): Observable<any>
    {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('record_id', record_id);
        formData.append('clinic_id', clinic_id);                  
        return this.http.post(this.apiUrl +"/clinics/clinicDeleteScripts", formData, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
       
}