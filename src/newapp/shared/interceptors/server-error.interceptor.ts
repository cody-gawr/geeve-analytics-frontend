import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/state/reducers/auth.reducer';
import { AuthApiActions } from '../../auth/state/actions';
import { ToastrService } from 'ngx-toastr';
import { getApiErrorMesssage } from '../utils';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<AuthState>,
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // refresh token
          this.store.dispatch(
            AuthApiActions.loginFailure({ error: error.message })
          );
          if (!(error.url && error.url.includes('/login'))) {
            //this.router.navigateByUrl('/login', );
            this.router.navigate(['/login'], {
              queryParams: this.router.url.includes('/login')
                ? {}
                : { returnUrl: this.router.url },
            });
          }
        } else if ([403, 410].indexOf(error.status) > -1) {
          // const errMsg = getApiErrorMesssage(error);
          // this.toastr.warning(``, getApiErrorMesssage(error));
          // this.router.navigateByUrl("/dashboards/healthscreen");
        } else {
          this.toastr.error(getApiErrorMesssage(error));
        }
        return throwError(() => error);
      })
    );
  }
}
