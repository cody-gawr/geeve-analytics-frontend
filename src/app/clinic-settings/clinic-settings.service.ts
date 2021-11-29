import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
@Injectable()
export class ClinicSettingsService {

    public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;
    public clinicData: any;

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

    // Get ClinicSettings
    getClinicSettings(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/clinics/clinicGet?clinic_id=" + clinic_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    // Get ClinicSettings
    getClinicFollowUPSettings(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/clinics/clinicGetSettings?clinic_id=" + clinic_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Get ClinicSettings
    updateClinicSettings(clinic_id, name, address, contact_name, workingDays, phoneNo, clinicEmail, ftaUta,  timezone, subtractedAccounts, equipmentList, dailyTasks, compareMode): Observable<any> {

        equipmentList = (equipmentList == true) ? 1 : 0;
        dailyTasks = (dailyTasks == true) ? 1 : 0;
        compareMode = (compareMode == true) ? 1 : 0;
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append('clinicName', name);
        formData.append('address', address);
        formData.append('contactName', contact_name);
        formData.append('days', workingDays);        
        formData.append('net_profit_exclusions', subtractedAccounts);
        formData.append('phoneNo', phoneNo);
        formData.append('clinicEmail', clinicEmail);
        formData.append('fta_uta', ftaUta);        
        formData.append('timezone', timezone);
        formData.append('equip_list_enable', equipmentList);
        formData.append('daily_task_enable', dailyTasks);
        formData.append('compare_mode', compareMode);

        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/clinics/clinicUpdate", formData, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    // Get ClinicSettings
    getXeroLink(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/Xeros2/getAuthorizeUrl?getxero=1&clinic_id=" + clinic_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    checkXeroStatus(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/Xeros2/xeroGetStatus?getxero=1&clinic_id=" + clinic_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    getMyobLink(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/Myob/getAuthorizeUrl?clinic_id=" + clinic_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    checkMyobStatus(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/Myob/myobGetStatus?clinic_id=" + clinic_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    clinicGetAccountingPlatform(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/Clinics/clinicGetAccountingPlatform?clinic_id=" + clinic_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    clearSession(clinic_id): Observable<any> {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        return this.http.post(this.apiUrl + "/Xeros2/disconnectXero/", formData, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    clearSessionMyob(clinic_id): Observable<any> {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        return this.http.post(this.apiUrl + "/Myob/disconnectMyob/", formData, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    setClinicData(data) {
        this.clinicData = data;
        return true;
    }

    getClinicData(): Observable<any> {
        return this.clinicData;
    }

    updatePartialSetting(clinic_id, value, column): Observable<any> {
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append(column, value);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/clinics/clinicUpdate", formData, header).pipe(map((response: Response) => {
            return response;
        })
        );
    }

    updatePartialClinicSetting(clinic_id, value, column): Observable<any> {
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append(column, value);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/clinics/clinicSettingsSave", formData, header).pipe(map((response: Response) => {
            return response;
        })
        );
    }

    deleteDailyTask(clinic_id, task_id): Observable<any> {
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append('id', task_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/clinics/clinicDeleteEndDayTasks", formData, header).pipe(map((response: Response) => {
            return response;
        })
        );
    }

    deleteEqupList(clinic_id, task_id): Observable<any> {
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append('id', task_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/clinics/clinicDeleteEquipmentItem", formData, header).pipe(map((response: Response) => {
            return response;
        })
        );
    }

    // Get ClinicSettings follow ups
    getFollowUpSettings(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http
            .get(
                this.apiUrl + "/clinics/clinicGetSettings?clinic_id=" + clinic_id,
                header
            )
            .pipe(
                map((response: Response) => {
                    return response;
                })
            );
    }

    updateFollowUpSettings(clinic_id, post_op_calls, tickDays, postOpCallsMh, recallWeeks, ftaFollowupDays, utaFollowupDays, utaFollowupDaysLater, ftaFollowupDaysLater): Observable<any> {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append('tick_days', tickDays);
        formData.append('post_op_calls', post_op_calls);
        formData.append('post_op_days', postOpCallsMh);
        formData.append('recall_weeks', recallWeeks);
        formData.append('fta_followup_days', ftaFollowupDays);
        formData.append('uta_followup_days', utaFollowupDays);
        formData.append('uta_days_later', utaFollowupDaysLater);
        formData.append('fta_days_later', ftaFollowupDaysLater);


        return this.http
            .post(this.apiUrl + "/clinics/clinicSettingsSave", formData, header)
            .pipe(
                map((response: Response) => {
                    return response;
                })
            );
    }

}