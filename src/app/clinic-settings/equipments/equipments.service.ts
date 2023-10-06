import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';
@Injectable()
export class EquipmentsService {
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  public token_id;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) {}

  getHeaders() {
    if (
      this._cookieService.get('user_type') != '1' &&
      this._cookieService.get('user_type') != '2'
    ) {
      this.token_id = this._cookieService.get('childid');
    } else {
      this.token_id = this._cookieService.get('userid');
    }
    let headers = {
      headers: new HttpHeaders(),
      withCredentials: true,
      observe: 'response' as const,
    };
    return headers;
  }

  // Get tasks
  getItems(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + '/clinics/clinicGetEquipmentList?clinic_id=' + clinic_id,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
  // update tasks
  updateItemStatus(event, id, cid, is_default): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('clinic_id', cid);
    formData.append('is_active', event);
    formData.append('is_default', is_default);
    return this.http
      .post(
        this.apiUrl + '/clinics/clinicUpdateEquipmentList',
        formData,
        header
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }

  addItem(id, task_name, quantity, clinic_id): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('equip_item', task_name);
    formData.append('quantity', quantity);
    formData.append('clinic_id', clinic_id);
    return this.http
      .post(this.apiUrl + '/clinics/clinicAddEquipmentItem', formData, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        })
      );
  }
}
