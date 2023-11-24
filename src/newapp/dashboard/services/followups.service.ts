import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import moment from 'moment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowupsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fuApiRequest(api: FU_API_ENDPOINTS, queryParams: FuApiQueryParams) {
    const params = {
      clinic_id: queryParams.clinicId,
      start_date: moment.isMoment(queryParams.startDate)
        ? queryParams.startDate.format('YYYY-MM-DD')
        : queryParams.startDate,
      end_date: moment.isMoment(queryParams.endDate)
        ? queryParams.endDate.format('YYYY-MM-DD')
        : queryParams.endDate,
      duration: queryParams.duration,
    };

    if (queryParams.duration) {
      params['duration'] = queryParams.duration;
    }

    return this.http
      .get(`${this.apiUrl}/Followups/${api}`, {
        params: params,
        withCredentials: true,
      })
      .pipe(map(resBody => <any>camelcaseKeys(resBody, { deep: true })));
  }
}
