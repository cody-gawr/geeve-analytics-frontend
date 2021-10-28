import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie";
import { environment } from "../../../environments/environment";
@Injectable()
export class ChartsService {
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  public token_id;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) {}

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
  getCharts(): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(
        this.apiUrl + "/ChartsTips/getCharts",
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
    formData.append("recall_codes", data.recall_codes);

    return this.http
      .post(this.apiUrl + "/clinics/clinicSettingsSave", formData, header)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
