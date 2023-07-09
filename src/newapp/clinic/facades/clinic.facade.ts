import { Clinic } from '../../models/clinic';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { ClinicPageActions } from '../state/actions';
import {
  ClinicState,
  selectClinics,
  selectCurrentClinic,
  selectError,
  selectSuccess
} from '../state/reducers/clinic.reducer';

@Injectable()
export class ClinicFacade {
  constructor(private store: Store<ClinicState>) {}

  public readonly success$: Observable<boolean> = this.store.pipe(
    select(selectSuccess)
  );

  public readonly error$: Observable<string> = this.store.pipe(
    select(selectError),
    filter(Boolean)
  );

  public readonly clinics$: Observable<Array<Clinic>> = this.store.pipe(
    select(selectClinics)
  );

  public readonly currentClinic$: Observable<Clinic> = this.store.pipe(
    select(selectCurrentClinic),
    filter(Boolean)
  );

  public loadClinics() {
    this.store.dispatch(ClinicPageActions.loadClinics());
  }

  public setCurrentClinicId(clinicId: number | null) {
    this.store.dispatch(ClinicPageActions.setCurrentClinicId({ clinicId }));
  }
}
