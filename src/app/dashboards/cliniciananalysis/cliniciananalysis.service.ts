import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ClinicianAnalysisService {
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
        var authString = this._cookieService.get("token")+" "+this.token_id;
        let headers = new HttpHeaders({'Authorization' : authString});
        return headers;
    }
    // Dentist Production Service
    DentistProduction( clinic_id, startDate = '', endDate = '', duration='', user_type='',clinician='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caDentistProduction?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    // Dentist Production Service
    changeLoginStatus(user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/users/changeLoginStatus?user_id="+user_id+"&token_id="+this.token_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    // Dentist Production Single Service
    DentistProductionSingle(dentist_id, clinic_id = '1', startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caDentistProduction?user_id="+user_id+"&clinic_id="+clinic_id+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Dentist Production Single Service
    caDentistProtectionTrend(dentist_id, clinic_id, mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caDentistProductionTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    //Treatment Plan Average Cost service
    TreatmentPlan( clinic_id, startDate = '', endDate = '', duration='', user_type='',clinician='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caTxPlanAvgCost?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  

    //Treatment Plan Average Cost Single service
    TreatmentPlanDentist(dentist_id,clinic_id, startDate = '', endDate = '', duration='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caTxPlanAvgCost?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&provider_id="+dentist_id+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

        // Dentist Production Single Service
    caNumberPatientComplaintsTrend(dentist_id, clinic_id, mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caNumComplaintsTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
            // Dentist Production Single Service
    caTreatmentPlanAverageCostTrend(dentist_id, clinic_id, mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caTxPlanAvgCostTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }     
    
    //Recall Prebook Rate service
/*    RecallPrebook(clinic_id, startDate = '', endDate = '', duration='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token") ): Observable<any> {
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caTreatmentPlanAverageCost?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } */
    
    //Hourly Rate service
    NoPatients(clinic_id, startDate = '', endDate = '', duration='', user_type='',clinician='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caNumComplaints?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

    //Hourly Rate service
    NoPatientsDentist(dentist_id,clinic_id, startDate = '', endDate = '', duration='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caNumComplaints?user_id="+user_id+"&clinic_id="+clinic_id+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

        // Dentist Production Service
    RecallPrebook( clinic_id, startDate = '', endDate = '', duration='', user_type='',clinician='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caRecallRate?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

        // Dentist Production Service
    RecallPrebookSingle(dentist_id, clinic_id, startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caRecallRate?user_id="+user_id+"&clinic_id="+clinic_id+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

        // Dentist Production Service
    treatmentPrePrebook( clinic_id, startDate = '', endDate = '', duration='', user_type='',clinician='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caRebookRate?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

        // Dentist Production Service
    treatmentPrePrebookSingle(dentist_id, clinic_id, startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caRebookRate?user_id="+user_id+"&clinic_id="+clinic_id+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 



            // Dentist Production Service
    TreatmentPlanRate( clinic_id, startDate = '', endDate = '', duration='', user_type='',clinician='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caTxPlanCompRate?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 

                // Dentist Production Service
    TreatmentPlanRateSingle(dentist_id, clinic_id, startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caTxPlanCompRate?user_id="+user_id+"&clinic_id="+clinic_id+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
        //Hourly Rate service
    NewPatients(clinic_id, startDate = '', endDate = '', duration='', user_type='',clinician='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caNumNewPatients?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 
    NewPatientsDentist(dentist_id,clinic_id, startDate = '', endDate = '', duration='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caNumNewPatients?user_id="+user_id+"&clinic_id="+clinic_id+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
            return response;
                    })
        );
    }

    hourlyRateChart( clinic_id, startDate = '', endDate = '', duration='', user_type='',clinician='',user_id = this._cookieService.get("userid"), token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caHourlyRate?user_id="+user_id+"&clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration+"&user_type="+user_type+"&clinician="+clinician, { headers: header })
        .pipe(map((response: Response) => {
            return response;
                    })
        );
    }

                // Dentist Production Single Service
    cahourlyRateRateTrend(dentist_id,clinic_id, mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caHourlyRateTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    } 


                // Dentist Production Single Service
    canewPatientsRateTrend(dentist_id,clinic_id, mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caNumNewPatientsTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

                    // Dentist Production Single Service
    catreatmentPlanRateTrend(dentist_id,clinic_id, mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token")): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caTxPlanCompRateTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
         
        //Treatment Plan Average Cost service
    hourlyRateSingle(dentist_id, clinic_id, startDate = '', endDate = '', duration='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caHourlyRate?user_id="+user_id+"&clinic_id="+clinic_id+"&provider_id="+dentist_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, { headers: header })
        .pipe(map((response: Response) => {
            return response;
                    })
        );
    }

    getAccountingDentist(clinic_id, user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/getAccountingDentist?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
            return response;
                    })
        );
    } 
    getStatusDentist(clinic_id, user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/getStatusDentist?user_id="+user_id+"&clinic_id="+clinic_id, { headers: header })
        .pipe(map((response: Response) => {
            return response;
        })
        );
    } 

    saveDentistMapping(data, clinic_id, user_id =this._cookieService.get("userid"), token = this._cookieService.get("token")): Observable<any> {
        
            const formData = new FormData();

    formData.append('dentistData', data);
    formData.append('user_id', user_id);
    formData.append('clinic_id', clinic_id);
  
    var header = this.getHeaders();
        return this.http.post(this.apiUrl +"/ClinicianAnalysis/saveDentistMapping/", formData, { headers: header })
        .pipe(map((response: Response) => {
            return response;
       })
      );
    }

       cpRecallPrebookRateTrend(dentist_id,clinic_id='1', mode ='', user_id = this._cookieService.get("userid") ,token = this._cookieService.get("token") ): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/ClinicianAnalysis/caRecallRateTrend?user_id="+user_id+"&clinic_id="+clinic_id+"&mode="+mode+"&provider_id="+dentist_id, { headers: header })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }  
}
