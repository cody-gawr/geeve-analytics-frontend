import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { JeeveResponse } from '@/newapp/models/clinic';
import { environment } from '@/environments/environment';

export interface ItemCode {
    id: number;
    country_code: string;
    jeeve_item_code: string;
    item_code: string;
    item_name: string;
    created: Date;
    updated: Date;
    status: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommonDataService {
    private commonUrl = environment.commonApiUrl;
    constructor(private http: HttpClient) {}

    public getCampaignPatients() {
        return this.http.get<JeeveResponse<ItemCode[]>>(`${this.commonUrl}/data/item-codes`, {
            withCredentials: true,
        }).pipe(body => body);
}
}
