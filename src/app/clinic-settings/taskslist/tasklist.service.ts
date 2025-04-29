import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';
@Injectable()
export class TasklistService {
  private headers: HttpHeaders;
  private apiUrl = environment.apiUrl;
  private apiNodeUrl = environment.apiNodeUrl;
  public token_id;

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
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
  getTasks(clinic_id): Observable<any> {
    var header = this.getHeaders();
    return this.http.get(this.apiUrl + '/clinics/getTaskLists?clinic_id=' + clinic_id, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }

  // Get tasks list
  getTasksList(clinic_id, id): Observable<any> {
    var header = this.getHeaders();
    return this.http
      .get(this.apiUrl + '/clinics/getTaskList?clinic_id=' + clinic_id + '&list_id=' + id, header)
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response;
        }),
      );
  }

  // Get tasks item
  addTasksItem(id, task_name, clinic_id): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('list_id', id);
    formData.append('task_name', task_name);
    formData.append('clinic_id', clinic_id);
    return this.http.post(this.apiUrl + '/clinics/clinicAddEndDayTasks', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }

  updateTaskListSortOrder(
    clinic_id,
    sortOrderPayload: { id: number; sort_order: number }[],
  ): Observable<HttpResponse<{ status: number; message: string }>> {
    var header = this.getHeaders();
    console.log({ header });

    // return new Subject<HttpResponse<{ status: number; message: string }>>().asObservable();
    const formData = new FormData();
    formData.append('clinic_id', clinic_id);
    sortOrderPayload.forEach((item, index) => {
      formData.append(`tasks[${index}].id`, item.id.toString());
      formData.append(`tasks[${index}].sort_order`, item.sort_order.toString());
    });
    return this.http
      .patch<{
        status: number;
        message: string;
      }>(
        this.apiNodeUrl + '/clinics/task-list/sort-order',
        { clinic_id, tasks: sortOrderPayload },
        header,
      )
      .pipe(map(response => response));
  }

  // Get tasks item
  updateTasksItem(id, list_id, task_name, clinic_id): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('list_id', list_id);
    formData.append('task_name', task_name);
    formData.append('clinic_id', clinic_id);
    return this.http.post(this.apiUrl + '/clinics/clinicAddEndDayTasks', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }

  deleteTasksItem(id, clinic_id): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('clinic_id', clinic_id);
    return this.http.post(this.apiUrl + '/clinics/clinicDeleteEndDayTasks', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }

  deleteTaskList(id, clinic_id): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('list_id', id);
    formData.append('clinic_id', clinic_id);
    return this.http.post(this.apiUrl + '/clinics/getDeleteTaskList', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }

  // update tasks
  updateTaskStatus(event, id, cid, is_default): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('list_id', id);
    formData.append('clinic_id', cid);
    formData.append('is_active', event);
    formData.append('is_default', is_default);
    return this.http.post(this.apiUrl + '/clinics/getUpdateTaskList', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }
  // update tasks
  updateTasklist(list_id, clinic_id, list_name, assigned_roles): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('list_id', list_id);
    formData.append('clinic_id', clinic_id);
    formData.append('list_name', list_name);
    formData.append('assigned_roles', assigned_roles);
    return this.http.post(this.apiUrl + '/clinics/getUpdateTaskList', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }

  addTask(id, list_name, assigned_roles, clinic_id): Observable<any> {
    var header = this.getHeaders();
    const formData = new FormData();
    formData.append('list_id', id);
    formData.append('list_name', list_name);
    formData.append('assigned_roles', assigned_roles);
    formData.append('clinic_id', clinic_id);
    return this.http.post(this.apiUrl + '/clinics/getAddTaskList', formData, header).pipe(
      map((response: HttpResponse<Object>) => {
        return response;
      }),
    );
  }
}
