import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class CamelCaseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const modEvent = event.clone({
            body: camelcaseKeys(event.body, { deep: true }),
          });

          return modEvent;
        }
        return event;
      })
    );
  }
}
