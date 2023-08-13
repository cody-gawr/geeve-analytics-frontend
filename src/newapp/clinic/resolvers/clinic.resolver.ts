import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {
  catchError,
  filter,
  first,
  map,
  Observable,
  of,
  throwError
} from 'rxjs';

import { Clinic } from '../../models/clinic';
import { select, Store } from '@ngrx/store';
import {
  ClinicState,
  selectCurrentClinics
} from '../state/reducers/clinic.reducer';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicResolver implements Resolve<Clinic | null> {
  constructor(
    private store: Store<ClinicState>,
    private router: Router,
    private notifier: NotificationService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Clinic | null> {
    const clinicId = route.paramMap.get('clinicId');
    const error = new Error('Wrong clinic ID provided');

    if (clinicId !== null && parseInt(clinicId)) {
      return this.store.pipe(
        select(selectCurrentClinics),
        first(),
        map((c) => {
          if (c === undefined) {
            throw error;
          }
          return c;
        }),
        catchError((err: Error) => {
          this.internalErrorHandler(err);
          return throwError(() => err);
        })
      );
    } else {
      this.internalErrorHandler(error);
      return of(null);
    }
  }

  private internalErrorHandler(err: Error) {
    this.notifier.showError(err.message);
    this.router.navigate(['/clinics']);
  }
}
