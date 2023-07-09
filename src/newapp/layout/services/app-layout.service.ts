import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  ClinicState,
  selectCurrentClinic,
  selectCurrentClinicId
} from '../../clinic/state/reducers/clinic.reducer';
import { filter, map, Observable } from 'rxjs';
import { Clinic } from '../../models/clinic';

@Injectable({
  providedIn: 'root'
})
export class AppLayoutService {
  public readonly currentClinicId$: Observable<number | null> =
    this.store.select(selectCurrentClinicId);

  public readonly currentClinic$: Observable<Clinic> = this.store
    .select(selectCurrentClinic)
    .pipe(filter(Boolean));
  public readonly clinicDetailSidenavOpened$: Observable<boolean> =
    this.currentClinicId$.pipe(map((v) => v != null));

  constructor(private store: Store<ClinicState>) {}
}
