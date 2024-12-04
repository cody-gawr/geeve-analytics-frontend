import { environment } from "@/environments/environment";
import { JeeveResponse } from "@/newapp/models/clinic";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

export interface ISpResultPatient {
    clinic_id: number;
    patient_id: number;
    patient_name: string;
    mobile: string;
    last_appointment: string; // YYYY-MM-DD
    last_provider: number; 
    next_appointment: string;
    next_provider: number;
    prev_campaigns: string;
}

export interface ICampaignFilter {
    clinic_id: number;
    campaign_id: number;
    filter_name: string;
    filter_settings: string;
    id: number;
}

export interface ICampaignPending {
    campaign_id: number;
    clinic_id: number;
    created: string;
    id: number;
    patient_id: number;
    phone_number: string;
    sms_text: string;
}

export interface ICampaignSettings {
    id: number;
    campaign_filters: ICampaignFilter[],
    clinic_id: number;
    created: string;
    description: string;
    sms_template: string;
    pending_campaign: ICampaignPending[];
    started: string | null;
    status: 'draft' | 'started';
}

export interface ICampaign {
    id: number;
    clinic_id: number;
    description: string;
    sms_template: string;
    status: 'draft' | 'started';
    created: string;
    started: string;
    sentMsgCount: number;
    pendingCampaignCount: number;
}

export interface IGetPatientsFilterJson {
    filter: string, // filter name
    filter_settings: any[];
    // start_date: string, // YYYY-MM-DD
    // end_date: string, // YYYY-MM-DD
    // items?: string // CSV format list
}

@Injectable({
    providedIn: 'root'
})
export class CampaignService {
    private apiUrl = environment.apiUrl;
    private commonUrl = environment.commonApiUrl;
    constructor(private http: HttpClient) {}

    public getCampaignPatients(clinicId: number, filters: IGetPatientsFilterJson[] = []): Observable<any> {
        return this.http.get<JeeveResponse<ISpResultPatient[]>>(`${this.commonUrl}/campaign/patients`, {
            withCredentials: true,
            params: {
                clinic_id: clinicId,
                ...(filters.length > 0 && { filters_json: JSON.stringify(filters) })
            }
        }).pipe(body => body);
    }

    public getCampaigns(clinicId: number){
        return this.http.get<JeeveResponse<ICampaign[]>>(`${this.commonUrl}/campaign`, {
            withCredentials: true,
            params: {
                clinic_id: clinicId,
            }
        }).pipe(body => body);
    }

    public getIndividualCampaign(clinicId: number, campaignId: number){
        return this.http.get<JeeveResponse<ICampaignSettings>>(`${this.commonUrl}/campaign/find`, {
            withCredentials: true,
            params: {
                clinic_id: clinicId,
                campaign_id: campaignId
            }
        }).pipe(body => body);
    }

    public createCampaign(
        clinicId: number, filters: IGetPatientsFilterJson[], 
        patientIds: number[], sms_text: string, is_draft: boolean, description: string, campaign_id?: number ){
        return this.http.post<JeeveResponse<[number, number]>>(`${this.commonUrl}/campaign`, {
            clinic_id: clinicId,
            filters_json: filters,
            patient_ids: patientIds,
            sms_text,
            is_draft,
            description,
            campaign_id
        }, {
            withCredentials: true,
        });
    }

    public getCreditData(
        clinicId: number
    ){
        return this.http.get<JeeveResponse<{
            used_credits: number,
            remain_credits: number,
            cost_per_sms: number
        }>>(`${this.commonUrl}/sms/getCreditData`, {
            withCredentials: true,
            params: {
                clinic_id: clinicId,
            }
        }).pipe(body => body);
    }

    public getCampaignSmsMessages(clinicId: number, campaignId: number){
        return this.http.get<JeeveResponse<ICampaign[]>>(`${this.commonUrl}/campaign/sms-messages`, {
            withCredentials: true,
            params: {
                clinic_id: clinicId,
                campaign_id: campaignId
            }
        }).pipe(body => body);
    }

    public resendCampaign(clinicId: number, campaignId: number) {
        return this.http.get<JeeveResponse<[number, number]>>(`${this.commonUrl}/campaign/re-send`, {
            withCredentials: true,
            params: {
                clinic_id: clinicId,
                campaign_id: campaignId
            }
        });
    }
}