import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';

import { environment } from '@/environments/environment';
import { Login, LoginApiResponse, LogoutApiResponse } from '../../models/auth';
import { RolesIndividualApiResponse, RolesApiResponse } from '../../models/user';
import camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClinet: HttpClient,
    private cookieService: CookieService,
  ) {}

  // login = (form: Login): Observable<LoginResponse> => {
  //   return this.httpClinet.post<LoginResponse>(
  //     `${this.apiUrl}/users/userLogin`,
  //     form,
  //     { withCredentials: true }
  //   );
  // };

  // logout = (): Observable<LogoutResponse> => {
  //   return this.httpClinet.post<LogoutResponse>(
  //     `${this.apiUrl}/users/userLogout`,
  //     {},
  //     {
  //       withCredentials: true
  //     }
  //   );
  // };

  // getRolesIndividual = (
  //   clinicId?: number
  // ): Observable<RolesIndividualApiResponse> => {
  //   return this.httpClinet.get<RolesIndividualApiResponse>(
  //     `${this.apiUrl}/Roles/rolesIndividual${
  //       clinicId ? `?clinic_id=${clinicId}` : ''
  //     }`,
  //     {
  //       withCredentials: true
  //     }
  //   );
  // };

  // getRoles = (): Observable<RolesApiResponse> => {
  //   return this.httpClinet.get<RolesApiResponse>(`${this.apiUrl}/Roles/rolesGet`, {
  //     withCredentials: true
  //   });
  // };

  login = (form: Login): Observable<LoginApiResponse> => {
    return this.httpClinet
      .post<LoginApiResponse>(`${this.apiUrl}/users/userLogin`, form, {
        withCredentials: true,
      })
      .pipe(map(res => <LoginApiResponse>(<unknown>camelcaseKeys(res, { deep: true }))));
  };

  logout = (): Observable<LogoutApiResponse> => {
    return this.httpClinet
      .post<LogoutApiResponse>(
        `${this.apiUrl}/users/userLogout`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(map(res => <LogoutApiResponse>(<unknown>camelcaseKeys(res, { deep: true }))));
  };

  getRolesIndividual = (clinicId?: number): Observable<RolesIndividualApiResponse> => {
    return this.httpClinet
      .get<RolesIndividualApiResponse>(
        `${this.apiUrl}/Roles/rolesIndividual${clinicId ? `?clinic_id=${clinicId}` : ''}`,
        {
          withCredentials: true,
        },
      )
      .pipe(
        map(data => <RolesIndividualApiResponse>(<unknown>camelcaseKeys(data, { deep: true }))),
      );
  };

  getRoles = (): Observable<RolesApiResponse> => {
    return this.httpClinet
      .get<any>(`${this.apiUrl}/Roles/rolesGet`, {
        withCredentials: true,
      })
      .pipe(
        map(data => {
          return {
            data: data?.map(item => ({
              created: item.created,
              id: item.id,
              is_default: 0,
              is_deleted: item.is_deleted,
              modified: item.modified,
              permisions: item.mapped_permissions.analytics,
              role: item.role,
              role_id: item.role_id,
              user_id: item.user_id,
            })),
            message: data.success ? 'success' : 'failure',
          };
        }),
      );
  };

  isAuthenticated = (): boolean => {
    return this.cookieService.get('is_logged_in') === 'YES';
  };
}
