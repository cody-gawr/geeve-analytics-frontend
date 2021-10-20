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

  updateCustomiseSettings(data): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append("huddles", data.dashboard);
    formData.append("dashboard", data.dashboard);
    return this.http
      .post(this.apiUrl + "/clinics/updateCustomiseSettings", data, header)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
