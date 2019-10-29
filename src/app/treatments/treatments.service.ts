
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


   // Get Treatments
    getTreatments(user_id = this._cookieService.get("userid"), clinic_id='1', token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/treatments/getTreatments?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&type=all", { headers: this.headers })
        .pipe(map((response: Response) => {
            console.log(response);
                        return response;
                    })
        );
    }

    checkTreatmentName(treatmentName,token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/treatments/checkTreatmentName?token="+this._cookieService.get("token")+"&treatmentName="+treatmentName, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
         })
        );
    }
    checkTreatmentNameForUpdate(treatmentName,treatmentId,token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/treatments/checkTreatmentNameForUpdate?token="+this._cookieService.get("token")+"&treatmentName="+treatmentName+"&treatmentId="+treatmentId, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
         })
        );
    }


       // Delete Clinic
    deleteTreatment(treatment_id, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('id', treatment_id);
    formData.append('token', token);
     return this.http.post(this.apiUrl +"/treatments/deleteTreatments", formData)
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
     formData.append('token', token); 
     return this.http.post(this.apiUrl +"/treatments/addTreatments/", formData)
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
      formData.append('token', token); 
      return this.http.post(this.apiUrl +"/treatments/updateTreatments/", formData)
         .pipe(map((response: Response) => {
                        return response;
                    })
          ); 
      }



    getTreatmentDetail(treatment_id,token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/treatments/getTreatmentDetail?token="+this._cookieService.get("token")+"&treatmentId="+treatment_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
         })
        );
    }

}

