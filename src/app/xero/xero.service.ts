
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable()
export class XeroService {


    constructor(private http: HttpClient) {}
    private apiUrl = environment.apiUrl;

    // Items Predictor Analysis 
    login(uname,password): Observable<any> {
            const formData = new FormData();

            formData.append('email', uname);
            formData.append('password', password);
            return this.http.post(this.apiUrl +"/users/userLogin", formData)
            .pipe(map((response: HttpResponse<Object>) => {
                            return response;
                        })
            );
    }

}


