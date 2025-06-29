import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JeeveResponse } from '@/newapp/models/clinic';
import { environment } from '@/environments/environment';

export interface ItemCode {
  item_code: string;
  item_display_name: string;
}

export interface QueryMethod {
  query_comm_methods: string
}

@Injectable({
  providedIn: 'root',
})
export class CommonDataService {
  private commonUrl = environment.commonApiUrl;
  constructor(private http: HttpClient) {}

  public getCampaignItemCodes(clinicId: number) {
    return this.http
      .get<JeeveResponse<ItemCode[]>>(`${this.commonUrl}/data/item-codes`, {
        params: { clinic_id: clinicId },
        withCredentials: true,
      })
      .pipe(body => body);
  }


  public getQueryMethods_D4wPatients(clinicId: number) {
    return this.http
      .get<JeeveResponse<QueryMethod[]>>(`${this.commonUrl}/data/d4w-patients-query-methods`, {
        params: { clinic_id: clinicId },
        withCredentials: true,
      })
      .pipe(body => body);
  }

  public getCampaignHealthFunds(clinicId: number) {
    return this.http
      .get<JeeveResponse<string[]>>(`${environment.apiUrl}/clinics/getHealthFund`, {
        params: { clinic_id: clinicId },
        withCredentials: true,
      })
      .pipe(body => body);
  }

  public createPaymentIntent(creditAmount: number, clinic_id: number) {
    return this.http.post<
      JeeveResponse<{
        totalAmount: number;
        taxAmount: number;
        clientSecret: string;
      }>
    >(
      environment.commonApiUrl + '/sms/createPaymentIntent',
      {
        amount: creditAmount,
        clinic_id,
      },
      {
        withCredentials: true,
      },
    );
  }
}
