
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClinicianAnalysisService {
 public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        this.headers.append("Token", this._cookieService.get("token"));

   }

    // Dentist Production Service
    DentistProduction( clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caDentistProtection?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    // Dentist Production Single Service
    DentistProductionSingle(dentist_id, clinic_id = '1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caDentistProtection?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Dentist Production Single Service
    caDentistProtectionTrend(dentist_id, clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caDentistProtectionTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&mode="+mode, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    //Treatment Plan Average Cost service
    TreatmentPlan( clinic_id='1', startDate = '', endDate = '', duration='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caTreatmentPlanAverageCost?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  

    //Treatment Plan Average Cost Single service
    TreatmentPlanDentist(dentist_id,clinic_id='1', startDate = '', endDate = '', duration='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caTreatmentPlanAverageCost?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

        // Dentist Production Single Service
    caNumberPatientComplaintsTrend(dentist_id, clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caNumberPatientComplaintsTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&mode="+mode, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
            // Dentist Production Single Service
    caTreatmentPlanAverageCostTrend(dentist_id, clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caTreatmentPlanAverageCostTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&mode="+mode, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }     
    
    //Recall Prebook Rate service
/*    RecallPrebook(clinic_id='1', startDate = '', endDate = '', duration='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caTreatmentPlanAverageCost?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } */
    
    //Hourly Rate service
    NoPatients(clinic_id='1', startDate = '', endDate = '', duration='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caNumberPatientComplaints?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    //Hourly Rate service
    NoPatientsDentist(dentist_id,clinic_id='1', startDate = '', endDate = '', duration='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/caNumberPatientComplaints?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Dentist Production Service
    RecallPrebook( clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/cpRecallPrebookRate?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

        // Dentist Production Service
    RecallPrebookSingle(dentist_id, clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/cpRecallPrebookRate?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

            // Dentist Production Service
    TreatmentPlanRate( clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/cpTreatmentPlanRate?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

                // Dentist Production Service
    TreatmentPlanRateSingle(dentist_id, clinic_id='1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/AccountingInvoicesAndReceipts/cpTreatmentPlanRate?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token")+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 
}

