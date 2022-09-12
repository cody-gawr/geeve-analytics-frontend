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
        formData.append("clinic_id", data.clinic_id);
        formData.append("meeting_topic", data.meeting_topic);
        formData.append("meeting_date", data.start_date);
        formData.append("start_time", data.start_time);
        formData.append("end_time", data.end_time);
        formData.append("duration", data.duration);
        formData.append("agenda_template_id", data.template);
        formData.append("created_by", data.user_id);
        formData.append("status", data.status);
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

    getUpcomingMeetings(user_id, clinic_id): Observable<any> {
        const formData = new FormData();
        formData.append("userid", user_id);
        formData.append("clinic_id", clinic_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smGetUpcommingMeetings", formData, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    getCompletedMeetings(user_id, clinic_id): Observable<any> {
        const formData = new FormData();
        formData.append("userid", user_id);
        formData.append("clinic_id", clinic_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smGetCompletedMeetings",formData, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    publishMeeting(user_ids, meeting_id, clinic_id): Observable<any> {
        const formData = new FormData();
        formData.append("user_ids", user_ids);
        formData.append("meeting_id", meeting_id);
        formData.append("clinic_id", clinic_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smPublishMeeting", formData, header)
        .pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    getMeetingAgenda(meeting_id, clinic_id): Observable<any> {
        const formData = new FormData();
        formData.append("meeting_id", meeting_id);
        formData.append("clinic_id", clinic_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smGetMeetingAgenda", formData, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    saveMeetingAgenda(data): Observable<any>{
        const formData = new FormData();
        formData.append("clinic_id", data.clinic_id);
        formData.append("meeting_id", data.meeting_id);
        formData.append("category", data.category);
        formData.append("agenda_item", data.item);
        formData.append("agenda_order", data.agenda_order);
        formData.append("staff_member", data.person);
        formData.append("description", data.description);
        formData.append("duration", data.duration);
        formData.append("flag", data.flag);
        if(data.flag == "update"){
            formData.append("meeting_agenda_id", data.meeting_agenda_id);
        }
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smSaveMeetingAgenda", formData, header)
        .pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    getInvitedMeetings(user_id, clinic_id): Observable<any>{
        const formData = new FormData();
        formData.append("userid", user_id);
        formData.append("clinic_id", clinic_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smGetInvitedMeetings",formData, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    saveMeetingAttended(meeting_id, user_id, clinic_id): Observable<any>{
        const formData = new FormData();
        formData.append("userid",user_id);
        formData.append("clinic_id",clinic_id);
        formData.append("meeting_id",meeting_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smSaveMeetingAttended", formData, header).pipe(
            map((response : Response)=>{
                return response;
            })
        );
    }

    getMeeting(meeting_id, clinic_id): Observable<any>{
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/StaffMeeting/smGetMeeting?id="+meeting_id+"&clinic_id="+clinic_id, header).pipe(
            map((response : Response)=>{
                return response;
            })
        );
    }
// ---
    // getInvitedUsers(meeting_id, clinic_id): Observable<any>{
    //     var header = this.getHeaders();
    //     return this.http.get(this.apiUrl + "/StaffMeeting/smGetInvitedUsers?meeting_id="+meeting_id+"&clinic_id="+clinic_id, header).pipe(
    //         map((response : Response)=>{
    //             return response;
    //         })
    //     );
    // }

    getPublishedMeeting(user_id, clinic_id): Observable<any>{
        const formData = new FormData();
        formData.append("userid",user_id);
        formData.append("clinic_id",clinic_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smGetPublishedMeetings", formData, header).pipe(
            map((response : Response)=>{
                return response;
            })
        );
    }

    getCompeleteInvitedMeetings(user_id, clinic_id): Observable<any>{
        const formData = new FormData();
        formData.append("userid", user_id);
        formData.append("clinic_id", clinic_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smGetInvitedCompleteMeetings",formData, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    markMeetingComplete(meeting_id, clinic_id): Observable<any>{
        const formData = new FormData();
        formData.append("meeting_id", meeting_id);
        formData.append("clinic_id", clinic_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smMarkCompleteMeeting",formData, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    getMeetingDetails(meeting_id, clinic_id, user_id): Observable<any>{
        const formData = new FormData();
        formData.append("meeting_id", meeting_id);
        formData.append("clinic_id", clinic_id);
        formData.append("userId", user_id);
        var header = this.getHeaders();
        return this.http.post(this.apiUrl + "/StaffMeeting/smGetMeetingDetails",formData, header).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    
    
}
