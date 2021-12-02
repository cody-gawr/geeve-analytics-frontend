import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie";
import { environment } from "../../../environments/environment";
@Injectable()
export class CustomisationsService {
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  public token_id;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) { }

  getHeaders() {
    if (
      this._cookieService.get("user_type") != "1" &&
      this._cookieService.get("user_type") != "2"
    ) {
      this.token_id = this._cookieService.get("childid");
    } else {
      this.token_id = this._cookieService.get("userid");
    }
    let headers = { headers: new HttpHeaders(), withCredentials: true };
    return headers;
  }

  // Get ClinicSettings
  getCustomiseSettings(clinic_id): Observable<any> {
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

  updateCustomiseSettings(data): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append("clinic_id", data.clinic_id);
    formData.append("xray_months", data.xray_months);
    formData.append("opg_months", data.opg_months);
    formData.append("recall_code1", data.recall_code1);
    formData.append("recall_code2", data.recall_code2);
    formData.append("recall_code3", data.recall_code3);
    formData.append("new_patients_main", data.new_patients);
    formData.append("recall_rate_default", data.recall_rate_default);
    formData.append("lab_code1", data.lab_code1);
    formData.append("lab_code2", data.lab_code2);


    return this.http
      .post(this.apiUrl + "/clinics/clinicSettingsSave", formData, header)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  clinicHuddleNotificationsSave(data): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append("clinic_id", data.clinic_id);
    formData.append(data.type, data.value);
    return this.http
      .post(this.apiUrl + "/clinics/clinicHuddleNotificationsSave", formData, header)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  clinicHuddleNotificationsGet(data): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append("clinic_id", data.clinic_id);
    formData.append(data.type, data.value);
    return this.http
      .post(this.apiUrl + "/clinics/clinicHuddleNotificationsUpdate", formData, header)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  getclinicHuddleNotifications(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + "/clinics/clinicHuddleNotificationsGet?clinic_id=" + clinic_id,
        header
      )
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
