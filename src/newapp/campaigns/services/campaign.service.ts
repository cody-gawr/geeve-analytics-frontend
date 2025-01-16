import { environment } from "@/environments/environment";
import { JeeveResponse } from "@/newapp/models/clinic";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import moment, { Moment } from "moment";
import { Observable, Subject, map } from 'rxjs';

export const DefaultFilterElements = [
  {
      iconName: 'medical_services',
      iconUrl: '/assets/jeeve/images/treatment_1.png',
      iconUrlWhite: '/assets/jeeve/images/treatment_1_white.png',
      title: 'Treatment',
      filterName: 'treatment'
  },
  {
      iconName: 'list_alt',
      iconUrl: '/assets/jeeve/images/tx_plans_1.png',
      iconUrlWhite: '/assets/jeeve/images/tx_plans_1_white.png',
      title: 'Incomplete TX Plans',
      filterName: 'incomplete_tx_plan'
  },
  {
      iconName: 'health_and_safety',
      iconUrl: '/assets/jeeve/images/health_insurance_1.png',
      iconUrlWhite: '/assets/jeeve/images/health_insurance_1_white.png',
      title: 'Health Insurance',
      filterName: 'health_insurance'
  },
  {
      iconName: 'schedule',
      iconUrl: '/assets/jeeve/images/overdue_1.png',
      iconUrlWhite: '/assets/jeeve/images/overdue_1_white.png',
      title: 'Overdues',
      filterName: 'overdues'
  },
  {
      iconName: 'personal_injury',
      iconUrl: '/assets/jeeve/images/patient_age_1.png',
      iconUrlWhite: '/assets/jeeve/images/patient_age_1_white.png',
      title: 'Patient Age',
      filterName: 'patient_age'
  },
  {
    iconName: 'personal_injury',
    iconUrl: '/assets/jeeve/images/patient_age_1.png',
    iconUrlWhite: '/assets/jeeve/images/patient_age_1_white.png',
    title: 'Patient Status',
    filterName: 'patient_status'
},
  {
      iconName: 'no_appointment',
      iconUrl: '/assets/jeeve/images/no-appointment-color.png',
      iconUrlWhite: '/assets/jeeve/images/no-appointment.png',
      title: 'No Appointment',
      filterName: 'no_appointment'
  },
  {
    iconName: 'appointment',
    iconUrl: '/assets/jeeve/images/no-appointment-color.png',
    iconUrlWhite: '/assets/jeeve/images/no-appointment.png',
    title: 'Appointment',
    filterName: 'appointment'
}
];

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
    days_overdue?: number;
    amount?: string | number;
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
    totalMsgCount: number;
    sentMsgCount: number;
    pendingCampaignCount: number;
    inProgressMsgCount: string | number;
    failedMsgCount: string | number;
    completedMsgCount: string | number;
}

export interface ICampaignMessage {
    id: number;
    created: string;
    patient_id: number;
    patient_name: string;
    phone_number: string;
    sms_text: string;
    status: string;
    unsubscribed?: boolean;
    sid?: string;
}

export interface IGetPatientsFilterJson {
    filter: string, // filter name
    filter_settings?: any[];
}

@Injectable({
    providedIn: 'root'
})
export class CampaignService {
    private apiUrl = environment.apiUrl;
    private commonUrl = environment.commonApiUrl;

    selectedIconObserver = new Subject<string>();
    selectedFilterName = '';

    range = new FormGroup({
        start: new FormControl<Moment | null>(moment().startOf('month')),
        end: new FormControl<Moment | null>(moment()),
    });

    public get selectedIcon$(): Observable<string> {
        return this.selectedIconObserver.asObservable().pipe(map(v => v));
    }
    public setSelectedIcon (value: string) {
        this.selectedFilterName = value;
        this.selectedIconObserver.next(value);
    }
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

    public getCampaigns(clinicId: number, start?: string, end?: string){
        return this.http.get<JeeveResponse<ICampaign[]>>(`${this.commonUrl}/campaign`, {
            withCredentials: true,
            params: {
                clinic_id: clinicId,
                ...(start && {start}),
                ...(end && {end}),
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
        patientIds: number[], sms_text: string, is_draft: boolean, description: string, campaign_id?: number, phone_number?: string ){
        return this.http.post<JeeveResponse<[number, number]>>(`${this.commonUrl}/campaign`, {
            clinic_id: clinicId,
            filters_json: filters,
            patient_ids: patientIds,
            sms_text,
            is_draft,
            description,
            campaign_id,
            phone_number
        }, {
            withCredentials: true,
        });
    }

    public deleteCampaign(
        clinicId: number, campaign_id: number ){
        return this.http.delete<JeeveResponse<[number, number]>>(`${this.commonUrl}/campaign`, {
            withCredentials: true,
            params: { clinic_id: clinicId, campaign_id}
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
        return this.http.get<JeeveResponse<{ filters: IGetPatientsFilterJson[], messages: ICampaignMessage[]}>>(`${this.commonUrl}/campaign/sms-messages`, {
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

    public resendCampaignMessages(clinicId: number, campaignId: number, messages: any) {
        return this.http.post<JeeveResponse<[number, number]>>(`${this.commonUrl}/campaign/re-send-messages`, 
        {
            clinic_id: clinicId,
            campaign_id: campaignId,
            messages
        },
        {
            withCredentials: true,
        });
    }
}