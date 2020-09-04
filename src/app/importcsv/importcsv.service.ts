import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";

import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class ImportcsvService {
    public token_id;

  constructor(private http: HttpClient,private _cookieService: CookieService,private router: Router){}
    private apiUrl = environment.apiUrl;

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

  public uploadFile(file: File, clinic_id): Observable<string | any> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('clinic_id', clinic_id);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('target', 'webroot/uploads/');
    formData.append('file_input', 'file');
   var header = this.getHeaders(); 

   // console.log(formData);
  return this.http.post(this.apiUrl +"/AccountingInvoicesAndReceipts/uploadFile", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
  }
   // Get Logs
    getLogs(clinic_id='1',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
      var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/logs/getUploadedCsvLogs?user_id="+user_id+"&clinic_id="+clinic_id,  { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
   // Process All Files
    processAllFiles(clinic_id='1',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/processAllCsv?user_id="+user_id+"&clinic_id="+clinic_id,  { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
}