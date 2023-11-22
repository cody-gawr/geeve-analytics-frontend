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
}
