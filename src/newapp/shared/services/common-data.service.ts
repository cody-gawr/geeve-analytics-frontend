import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { JeeveResponse } from '@/newapp/models/clinic';
import { environment } from '@/environments/environment';

export interface ItemCode {
    item_code: string;
    item_display_name: string;

    // id: number;
    // country_code: string;
    // jeeve_item_code: string;
    // item_code: string;
    // item_name: string;
    // created: Date;
    // updated: Date;
    // status: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommonDataService {
    private commonUrl = environment.commonApiUrl;
    constructor(private http: HttpClient) {}

    public getCampaignItemCodes(clinicId: number) {
        return this.http.get<JeeveResponse<ItemCode[]>>(`${this.commonUrl}/data/item-codes`, {
            params: {clinic_id: clinicId},
            withCredentials: true,
        }).pipe(body => body);
    }

    public getCampaignHealthFunds(clinicId: number) {
        return this.http.get<JeeveResponse<string[]>>(`${environment.apiUrl}/clinics/getHealthFund`, {
            params: {clinic_id: clinicId},
            withCredentials: true,
        }).pipe(body => body);
    }
}
