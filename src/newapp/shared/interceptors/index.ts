import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CamelCaseInterceptor } from './camel-case.interceptor';
import { ServerErrorInterceptor } from './server-error.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: CamelCaseInterceptor, multi: true }
];