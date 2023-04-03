import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
@Injectable()
export class ClinicSettingsService {

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
        let headers = { headers: new HttpHeaders(), withCredentials: true, observe: 'response' as const };
        return headers;
    }

    // Get ClinicSettings
    getClinicSettings(clinic_id): Observable<{
        status: string,
        total: number,
        message: string,
        hasPrimeClinics: string,
        data: {
            address: string,
            clinicEmail: string,
            clinicName: string,
            compare_mode: number,
            config_user: any,
            connectedwith: string,
            consultant: string,
            contactName: string,
            created: string,
            daily_task_enable: number,
            datasource: string,
            days: string,
            db_name: string,
            db_server: string,
            equip_list_enable: number,
            fta_uta: string,
            id: number,
            is_deleted: number,
            net_profit_exclusions: string,
            phoneNo: string,
            pms: string,
            sr: number,
            timezone: string,
            trial_end_date: string,
            user_id: number,
            utility_ver: string,
            wh_name: string,
            wh_server: string,
            sms_enabled: number,
        },
        httpRes: HttpResponse<any>
    }> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/clinics/clinicGet?clinic_id=" + clinic_id, header)
            .pipe(map((response: HttpResponse<any>) => {
                return { ...response.body, httpRes: response};
            })
            );
    }
    // Get ClinicSettings
    getClinicFollowUPSettings(clinic_id): Observable<{
        data: {
            clinic_id: number,
            compare_mode: number,
            connectedwith: string,
            consultant: string,
            custom_tx_codes: string,
            daily_task_enable: number, // 0-1
            days: string, // json string
            equip_list_enable: number, // 0-1
            fta_days_later: number,
            fta_enable: number,
            fta_followup_days: number,
            health_screen_mtd: number,
            hourly_rate_appt_hours: number,
            lab_code1: string,
            lab_code2: string,
            max_chart_bars: number,
            net_profit_exclusions: string,
            new_patients_main: number,
            opg_months: number,
            post_op_calls: string,
            post_op_days: number,
            post_op_enable: number,
            recall_code1: string,
            recall_code2: string,
            recall_code3: string,
            recall_enable: number,
            recall_rate_default: number,
            recall_weeks: number,
            referral_enable: number,
            referral_weeks: number,
            tick_days: number,
            tick_enable: number,
            trial_end_date: string,
            uta_days_later: number,
            uta_enable: number,
            uta_followup_days: number,
            utility_ver: string,
            xray_months: number,
            sms_enabled: number,
            accepted_sms_terms: number,
        },
        httpRes: HttpResponse<any>
    }> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/clinics/clinicGetSettings?clinic_id=" + clinic_id, header)
            .pipe(map((response: HttpResponse<any>) => {
                return {
                    ...response.body,
                    httpRes: response
                }
            }));
    }

    // Get ClinicSettings
    updateClinicSettings(clinic_id, name, address, contact_name, workingDays, ftaUta,  timezone, subtractedAccounts, compareMode): Observable<any> {

        compareMode = (compareMode == true) ? 1 : 0;
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append('clinicName', name);
        formData.append('address', address);
        formData.append('contactName', contact_name);
        formData.append('days', workingDays);        
        formData.append('net_profit_exclusions', subtractedAccounts);
        formData.append('fta_uta', ftaUta);        
        formData.append('timezone', timezone);
        formData.append('compare_mode', compareMode);

        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/clinics/clinicUpdate", formData, header)
            .pipe(map((response: HttpResponse<Object>) => {
                return response;
            })
            );
    }
    // Get ClinicSettings

    getXeroConsentURL(clinic_id: number): Observable<{
        auth_url: string
    }> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/Xero/consentUrl?clinic_id=" + clinic_id, header)
            .pipe(map((response: HttpResponse<any>) => {
                return response.body;
            })
            );
    }

    checkXeroTokenExpiry(clinic_id: number): Observable<{tenantName: string}> {
        const headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/Xero/checkTokenExpiry?clinic_id=" + clinic_id, headers)
        .pipe(map((response: HttpResponse<any>) => {
            return response.body;
        }));
    }

    getMyobConsentURL(clinic_id: number): Observable<{
        auth_url: string
    }> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/Myob/consentUrl?clinic_id=" + clinic_id, header)
            .pipe(map((response: HttpResponse<any>) => {
                return response.body;
            })
            );
    }

    checkMyobTokenExpiry(clinic_id: number): Observable<{
        tenantName: string
    }> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/Myob/checkTokenExpiry?clinic_id=" + clinic_id, header)
            .pipe(map((response: HttpResponse<any>) => {
                return response.body;
            })
            );
    }

    disconnectXeroOAuth(clinic_id: number): Observable<{status: boolean}> {
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/Xero/disconnectOAuth?clinic_id=" + clinic_id, {}, header)
            .pipe(map((response: HttpResponse<any>) => {
                return response.body;
            })
            );
    }

    disconnectMyobOAuth(clinic_id: number): Observable<{status: boolean}> {
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/Myob/disconnectOAuth?clinic_id=" + clinic_id, {}, header)
            .pipe(map((response: HttpResponse<any>) => {
                return response.body;
            })
            );
    }

    clinicGetAccountingPlatform(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/Clinics/clinicGetAccountingPlatform?clinic_id=" + clinic_id, header)
            .pipe(map((response: HttpResponse<Object>) => {
                return response;
            })
            );
    }

    updatePartialSetting(clinic_id, value, column): Observable<any> {
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append(column, value);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/clinics/clinicUpdate", formData, header).pipe(map((response: HttpResponse<Object>) => {
            return response;
        })
        );
    }

    updatePartialClinicSetting(clinic_id, value, column): Observable<any> {
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append(column, value);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/clinics/clinicSettingsSave", formData, header).pipe(map((response: HttpResponse<Object>) => {
            return response;
        })
        );
    }

    deleteDailyTask(clinic_id, task_id): Observable<any> {
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append('id', task_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/clinics/clinicDeleteEndDayTasks", formData, header).pipe(map((response: HttpResponse<Object>) => {
            return response;
        })
        );
    }

    deleteEqupList(clinic_id, task_id): Observable<any> {
        const formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append('id', task_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/clinics/clinicDeleteEquipmentItem", formData, header).pipe(map((response: HttpResponse<Object>) => {
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
                map((response: HttpResponse<Object>) => {
                    return response;
                })
            );
    }

    updateFollowUpSettings(clinic_id, post_op_calls, tickDays, postOpCallsMh, recallWeeks, ftaFollowupDays, utaFollowupDays, utaFollowupDaysLater, ftaFollowupDaysLater,referralWeeks): Observable<any> {
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
        formData.append('referral_weeks', referralWeeks);


        return this.http
            .post(this.apiUrl + "/clinics/clinicSettingsSave", formData, header)
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return response;
                })
            );
    }

    private data = {
        body: {
            "message": "",
            "data": {
                "clinic_id": 0,
                "xray_months": 0,
                "opg_months": 0,
                "recall_code1": "",
                "recall_code2": "",
                "recall_code3": "",
                "lab_code1": "",
                "lab_code2": "",
                "new_patients_main": 0,
                "recall_rate_default": 0,
                "hourly_rate_appt_hours": 0,
                "fta_enable": 0,
                "fta_days_later": 0,
                "fta_followup_days": 0,
                "uta_enable": 0,
                "uta_days_later": 0,
                "uta_followup_days": 0,
                "post_op_enable": 0,
                "post_op_days": 0,
                "post_op_calls": "",
                "tick_enable": 0,
                "tick_days": 0,
                "recall_enable": 0,
                "recall_weeks": 0,
                "referral_enable": 0,
                "referral_weeks": 0,
                "health_screen_mtd": 0,
                "days": "",
                "equip_list_enable": 0,
                "daily_task_enable": 0,
                "compare_mode": 0,
                "net_profit_exclusions": "",
                "custom_tx_codes": "",
                "trial_end_date": null,
                "utility_ver": "",
                "connectedwith": "",
                "consultant": "",
                "max_chart_bars": 20
            },
        },
        status: 0
    };

    private clincsSetting = new BehaviorSubject(this.data);
    getClincsSetting = this.clincsSetting.asObservable();

    setClincsSetting(data){
        this.clincsSetting.next(data);
    }

    private data1 = {
        body: {
        "message": "",
        "data": [],
        "total": 0,
        "hasPrimeClinics": ""
        },
        "status": 0,

    };

    private clinicData = new BehaviorSubject(this.data1);
    getClinicData = this.clinicData.asObservable();

    setClinicData(data){
        this.clinicData.next(data);
    }

    
    getSocialLinks(clinic_id: number): Observable<{
        data: {
            facebook_id: string,
            google_id: string
        },
        googleConnected: boolean
    }> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl+"/reviews/getSocialLinks?clinic_id="+clinic_id, header)
        .pipe(
            map((response: HttpResponse<any>) => {
                return response.body;
            })
        );
    }

    updateReviewSettings(
        clinic_id: number,
        {sms_enabled = undefined, accepted_sms_terms = undefined}
      ): Observable<{status: boolean}> {
        const header = this.getHeaders();
        return this.http
          .post(
            this.apiUrl + '/reviews/settings',
            {
              clinic_id,
              sms_enabled,
              accepted_sms_terms
            },
            header
          )
          .pipe(
            map((res: HttpResponse<any>) => {
              return res.body;
            })
          );
      }

    getGoogleAuthUrl(clinic_id: number): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/reviews/getGoogleAuthUrl?clinic_id="+clinic_id, header)
        .pipe(
            map((response: HttpResponse<Object>) => {
                return response;
            })
        );
    }

    updateSocialLinks(clinic_id: number, facebookId: string, googleId: string): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/reviews/updateSocialLinks",{
            clinic_id, facebook_id: facebookId, google_id: googleId}, header)
        .pipe(
            map((response: HttpResponse<Object>) => {
                return response;
            })
        );
    }

    getReviewMsgTemplateList(clinic_id: number = null): Observable<{
        data: any
    }> {
        var header = this.getHeaders(); 
        return this.http.get(this.apiUrl +"/reviews/getReviewMsgTemplateList"+ (clinic_id?"?clinic_id=" + clinic_id: ""), header)
        .pipe(
            map((response: HttpResponse<any>) => {
                return response.body;
            })
        );
    }

    addReviewMsgTemplate(clinic_id: number, name: string, msgTemplate: string): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/reviews/addReviewMsgTemplate",{
            clinic_id, name: name, msg_template: msgTemplate}, header)
        .pipe(
            map((response: HttpResponse<Object>) => {
                return response;
            })
        );
    }

    updateReviewMsgTemplate(id: number, clinic_id:number, name: string, msgTemplate: string): Observable<any> {
        var header = this.getHeaders(); 
        return this.http.post(this.apiUrl +"/reviews/updateReviewMsgTemplate",{id, clinic_id, name: name, msg_template: msgTemplate}, header)
        .pipe(
            map((response: HttpResponse<Object>) => {
                return response;
            })
        );
    }

    removeReviewMsgTemplate(id: number, clinic_id:number): Observable<any> {
        var header = this.getHeaders();
        return this.http.post(this.apiUrl +"/reviews/removeReviewMsgTemplate",{id, clinic_id}, header)
        .pipe(
            map((response: HttpResponse<Object>) => {
                return response;
            })
        );
    }
}