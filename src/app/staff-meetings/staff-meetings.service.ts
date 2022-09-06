import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class StaffMeetingService {
    public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;

    constructor(private http: HttpClient, private _cookieService: CookieService, private router: Router) { }

    getHeaders() {
        if (this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2') {
            this.token_id = this._cookieService.get("childid");
        } else {
            this.token_id = this._cookieService.get("userid");
        }
        let headers = { headers: new HttpHeaders(), withCredentials: true };
        return headers;
    }


    createMeeting(data): Observable<any>{
        const formData = new FormData();
        formData.append("id", data.id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smCreateMeeting", formData, header)
        .pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    getAdengaTemplate(): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/StaffMeeting/smGetAgendaTemplate", header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    getUpcommingMeetings(user_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/StaffMeeting/smGetUpcommingMeetings/"+user_id, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    getCompletedMeetings(user_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/StaffMeeting/smGetCompletedMeetings/"+user_id, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    publishMeeting(meeting_id): Observable<any> {
        const formData = new FormData();
        formData.append("id", meeting_id.id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smPublishMeeting", formData, header)
        .pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    getMeetingAgenda(meeting_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/StaffMeeting/smGetMeetingAgenda/"+meeting_id, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    saveMeetingAgenda(data): Observable<any>{
        const formData = new FormData();
        formData.append("id", data.id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smSaveMeetingAgenda", formData, header)
        .pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    getInvitedMeetings(user_id): Observable<any>{
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/StaffMeeting/smGetInvitedMeetings/"+user_id, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    saveMeetingAttended(user_id): Observable<any>{
        const formData = new FormData();
        formData.append("id",user_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smSaveMeetingAttended/", formData, header).pipe(
            map((response : Response)=>{
                return response;
            })
        );
    }

}
