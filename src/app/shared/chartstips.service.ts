import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../environments/environment";
import { Router  } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ChartstipsService {
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
    // Dentist Production Service
    getCharts( dashboard_id  ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/chartsTips/ctGetPageTips?dashboard_id="+dashboard_id, header)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }    
}
