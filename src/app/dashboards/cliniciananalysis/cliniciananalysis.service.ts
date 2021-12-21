import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../../environments/environment";
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class ClinicianAnalysisService {
    public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;
    constructor(private http: HttpClient, private _cookieService: CookieService, private router: Router) { }
    getHeaders() {
        if (this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2') {
            this.token_id = this._cookieService.get("childid");
        } else {
            this.token_id = this._cookieService.get("userid");
        }
        let headers = { headers: new HttpHeaders(), withCredentials: true };
        return headers;
    }
    // Dentist Production Service
    DentistProduction(clinic_id, startDate = '', endDate = '', duration = '', user_type = '', clinician = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caDentistProduction?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration + "&clinician=" + clinician, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    // Dentist Production Service
    DentistCollection(clinic_id, startDate = '', endDate = '', duration = '', user_type = '', clinician = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caCollection?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration + "&clinician=" + clinician, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    // Dentist collection Exp Service
    DentistCollectionExp(clinic_id, startDate = '', endDate = '', duration = '', user_type = '', clinician = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caCollectionExp?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration + "&clinician=" + clinician, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    // Dentist Production Service
    changeLoginStatus(): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/users/changeLoginStatus?token_id=" + this.token_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    // Dentist Production Single Service
    DentistProductionSingle(dentist_id, clinic_id = '1', startDate = '', endDate = '', duration = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caDentistProduction?clinic_id=" + clinic_id + "&provider_id=" + dentist_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    // Dentist Production Single Service
    DentistCollectionSingle(dentist_id, clinic_id = '1', startDate = '', endDate = '', duration = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caCollection?clinic_id=" + clinic_id + "&provider_id=" + dentist_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Dentist Production Single Service
    DentistCollectionExpSingle(dentist_id, clinic_id = '1', startDate = '', endDate = '', duration = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caCollectionExp?clinic_id=" + clinic_id + "&provider_id=" + dentist_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Dentist Production Single Service
    caDentistProtectionTrend(dentist_id, clinic_id, mode = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caDentistProductionTrend?clinic_id=" + clinic_id + "&mode=" + mode + "&provider_id=" + dentist_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }    // Dentist Production Single Service
    caDentistCollectionTrend(dentist_id, clinic_id, mode = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caCollectionTrend?clinic_id=" + clinic_id + "&mode=" + mode + "&provider_id=" + dentist_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

     // Dentist Production Single Service
     caDentistCollectionExpTrend(dentist_id, clinic_id, mode = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caCollectionExpTrend?clinic_id=" + clinic_id + "&mode=" + mode + "&provider_id=" + dentist_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    //Treatment Plan Average Cost service
    TreatmentPlan(clinic_id, startDate = '', endDate = '', duration = '', user_type = '', clinician = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caTxPlanAvgCost?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration + "&clinician=" + clinician, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    //Treatment Plan Average Cost Single service
    TreatmentPlanDentist(dentist_id, clinic_id, startDate = '', endDate = '', duration = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caTxPlanAvgCost?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&provider_id=" + dentist_id + "&duration=" + duration, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Dentist Production Single Service
    caNumberPatientComplaintsTrend(dentist_id, clinic_id, mode = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caNumComplaintsTrend?clinic_id=" + clinic_id + "&mode=" + mode + "&provider_id=" + dentist_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    // Dentist Production Single Service
    caTreatmentPlanAverageCostTrend(dentist_id, clinic_id, mode = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caTxPlanAvgCostTrend?clinic_id=" + clinic_id + "&mode=" + mode + "&provider_id=" + dentist_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    //Recall Prebook Rate service
    /*    RecallPrebook(clinic_id, startDate = '', endDate = '', duration='' ): Observable<any> {
            return this.http.get(this.apiUrl +"/ClinicianAnalysis/caTreatmentPlanAverageCost?clinic_id="+clinic_id+"&start_date="+startDate+"&end_date="+endDate+"&duration="+duration, header)
            .pipe(map((response: Response) => {
                            return response;
                        })
            );
        } */

    //Hourly Rate service
    NoPatients(clinic_id, startDate = '', endDate = '', duration = '', user_type = '', clinician = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caNumComplaints?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration + "&provider_id=" + clinician, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    //Hourly Rate service
    NoPatientsDentist(dentist_id, clinic_id, startDate = '', endDate = '', duration = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caNumComplaints?clinic_id=" + clinic_id + "&provider_id=" + dentist_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Dentist Production Service
    RecallPrebook(clinic_id, startDate = '', endDate = '', duration = '', user_type = '', clinician = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caRecallRate?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration + "&clinician=" + clinician, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Dentist Production Service
    RecallPrebookSingle(dentist_id, clinic_id, startDate = '', endDate = '', duration = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caRecallRate?clinic_id=" + clinic_id + "&provider_id=" + dentist_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Dentist Production Service
    caReappointRate(clinic_id, startDate = '', endDate = '', duration = '', user_type = '', clinician = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caReappointRate?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration + "&clinician=" + clinician, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    caReappointRateTrend(dentist_id, clinic_id, mode): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caReappointRateTrend?clinic_id=" + clinic_id + "&mode=" + mode + "&provider_id=" + dentist_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Dentist Production Service
    caReappointRateSingle(dentist_id, clinic_id, startDate = '', endDate = '', duration = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caReappointRate?clinic_id=" + clinic_id + "&provider_id=" + dentist_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }



    // Dentist Production Service
    TreatmentPlanRate(clinic_id, startDate = '', endDate = '', duration = '', user_type = '', clinician = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caTxPlanCompRate?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration + "&clinician=" + clinician, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Dentist Production Service
    TreatmentPlanRateSingle(dentist_id, clinic_id, startDate = '', endDate = '', duration = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caTxPlanCompRate?clinic_id=" + clinic_id + "&provider_id=" + dentist_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    //Hourly Rate service
    NewPatients(clinic_id, startDate = '', endDate = '', duration = '', user_type = '', clinician = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caNumNewPatients?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration + "&clinician=" + clinician, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    NewPatientsDentist(dentist_id, clinic_id, startDate = '', endDate = '', duration = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caNumNewPatients?clinic_id=" + clinic_id + "&provider_id=" + dentist_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    hourlyRateChart(clinic_id, startDate = '', endDate = '', duration = '', user_type = '', clinician = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caHourlyRate?clinic_id=" + clinic_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration + "&clinician=" + clinician, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Dentist Production Single Service
    cahourlyRateRateTrend(dentist_id, clinic_id, mode = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caHourlyRateTrend?clinic_id=" + clinic_id + "&mode=" + mode + "&provider_id=" + dentist_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }


    // Dentist Production Single Service
    canewPatientsRateTrend(dentist_id, clinic_id, mode = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caNumNewPatientsTrend?clinic_id=" + clinic_id + "&mode=" + mode + "&provider_id=" + dentist_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Dentist Production Single Service
    catreatmentPlanRateTrend(dentist_id, clinic_id, mode = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caTxPlanCompRateTrend?clinic_id=" + clinic_id + "&mode=" + mode + "&provider_id=" + dentist_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    //Treatment Plan Average Cost service
    hourlyRateSingle(dentist_id, clinic_id, startDate = '', endDate = '', duration = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caHourlyRate?clinic_id=" + clinic_id + "&provider_id=" + dentist_id + "&start_date=" + startDate + "&end_date=" + endDate + "&duration=" + duration, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    getAccountingDentist(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/getAccountingDentist?clinic_id=" + clinic_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    getStatusDentist(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/getStatusDentist?clinic_id=" + clinic_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    saveDentistMapping(data, clinic_id): Observable<any> {

        const formData = new FormData();

        formData.append('dentistData', data);
        formData.append('clinic_id', clinic_id);

        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/ClinicianAnalysis/saveDentistMapping/", formData, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    cpRecallPrebookRateTrend(dentist_id, clinic_id, mode = ''): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/ClinicianAnalysis/caRecallRateTrend?clinic_id=" + clinic_id + "&mode=" + mode + "&provider_id=" + dentist_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    /******** get clinic **********/
    getClinics(clinicId, clinicInfo): Observable<any> {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('clinic_id', clinicId);
        formData.append('clinic_info', clinicInfo);
        return this.http.post(this.apiUrl + "/clinics/clinicGetInfo", formData, header).pipe(map((response: Response) => { return response; }));
    }
    /******** get clinic **********/
    getClinicSettings(clinicId): Observable<any> {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('clinic_id', clinicId);
        return this.http.post(this.apiUrl + "/clinics/clinicGetSettings", formData, header).pipe(map((response: Response) => { return response; }));
    }
}
