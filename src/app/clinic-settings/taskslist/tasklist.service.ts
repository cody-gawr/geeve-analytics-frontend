import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";
import { environment } from "../../../environments/environment";
@Injectable()

export class TasklistService {
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;
    public token_id;

    constructor(private http: HttpClient, private _cookieService: CookieService) { }

    getHeaders() {
        if (this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2') {
            this.token_id = this._cookieService.get("childid");
        } else {
            this.token_id = this._cookieService.get("userid");
        }
        let headers = { headers: new HttpHeaders(), withCredentials: true };
        return headers;

    }

    // Get tasks
    getTasks(clinic_id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/clinics/getTaskLists?clinic_id=" + clinic_id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }
    // Get tasks list
    getTasksList(clinic_id, id): Observable<any> {
        var header = this.getHeaders();
        return this.http.get(this.apiUrl + "/clinics/getTaskList?clinic_id=" + clinic_id + '&id=' + id, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Get tasks item
    addTasksItem(id, task_name, clinic_id): Observable<any> {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('list_id', id);
        formData.append('task_name', task_name);
        formData.append('clinic_id', clinic_id);
        return this.http.post(this.apiUrl + "/clinics/clinicAddEndDayTasks", formData, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // Get tasks item
    updateTasksItem(id, list_id, task_name, clinic_id): Observable<any> {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('list_id', list_id);
        formData.append('task_name', task_name);
        formData.append('clinic_id', clinic_id);
        return this.http.post(this.apiUrl + "/clinics/clinicAddEndDayTasks", formData, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    deleteTasksItem(id, clinic_id): Observable<any> {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('id', id);        
        formData.append('clinic_id', clinic_id);
        return this.http.post(this.apiUrl + "/clinics/clinicDeleteEndDayTasks", formData, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    // update tasks
    updateTaskStatus(event, id, cid, is_default): Observable<any> {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('clinic_id', cid);
        formData.append('is_active', event);
        formData.append('is_default', is_default);
        return this.http.post(this.apiUrl + "/clinics/getUpdateTaskList", formData, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

    addTask(id, list_name, assigned_roles, clinic_id): Observable<any> {
        var header = this.getHeaders();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('list_name', list_name);
        formData.append('assigned_roles', assigned_roles);
        formData.append('clinic_id', clinic_id);
        return this.http.post(this.apiUrl + "/clinics/getAddTaskList", formData, header)
            .pipe(map((response: Response) => {
                return response;
            })
            );
    }

}