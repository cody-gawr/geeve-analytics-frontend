
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";


@Injectable()
export class TreatmentsService {

    public token: string;
    public token_id;
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


   // Get Treatments
    getTreatments(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/treatments/getTreatments?user_id="+user_id+"&clinic_id="+clinic_id+"&type=all", { headers: header })
        .pipe(map((response: Response) => {
            console.log(response);
                        return response;
                    })
        );
    }

    checkTreatmentName(treatmentName,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/treatments/checkTreatmentName?treatmentName="+treatmentName, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
         })
        );
    }
    checkTreatmentNameForUpdate(treatmentName,treatmentId,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/treatments/checkTreatmentNameForUpdate?treatmentName="+treatmentName+"&treatmentId="+treatmentId, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
         })
        );
    }


       // Delete Clinic
    deleteTreatment(treatment_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('id', treatment_id);
    var header = this.getHeaders(); 
     return this.http.post(this.apiUrl +"/treatments/deleteTreatments", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        //Add Treatment
    addTreatment(treatmentName,treatmentStatus,token = this._cookieService.get("token")): Observable<any> {

     const formData = new FormData();
     formData.append('treatmentName', treatmentName);
     formData.append('treatmentStatus', treatmentStatus);
     var header = this.getHeaders();  
     return this.http.post(this.apiUrl +"/treatments/addTreatments/", formData, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
         ); 
     }

     updateTreatment(treatmentName,treatmentStatus,id,token = this._cookieService.get("token")): Observable<any> {
      const formData = new FormData();
      formData.append('treatmentName', treatmentName);
      formData.append('treatmentStatus', treatmentStatus);
      formData.append('id', id);
      var header = this.getHeaders();  
      return this.http.post(this.apiUrl +"/treatments/updateTreatments/", formData, { headers: header })
         .pipe(map((response: Response) => {
                        return response;
                    })
          ); 
      }



    getTreatmentDetail(treatment_id,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();  
        return this.http.get(this.apiUrl +"/treatments/getTreatmentDetail?treatmentId="+treatment_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
         })
        );
    }

}

