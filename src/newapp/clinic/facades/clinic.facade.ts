import { Clinic } from '../../models/clinic';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClinicPageActions } from '../state/actions';
import {
  ClinicState,
  selectClinics,
  selectCurrentClinic,
  selectCurrentClinicId,
  selectCurrentMultiClinicIDs,
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
    select(selectError)
  );

  public readonly clinics$: Observable<Array<Clinic>> = this.store.pipe(
    select(selectClinics)
  );

  public readonly currentClinic$: Observable<Clinic> = this.store.pipe(
    select(selectCurrentClinic)
  );

  public readonly currentClinicId$: Observable<string | number | null> = this.store.pipe(
    select(selectCurrentClinicId)
  ); 

  public readonly currentMultiClinicIDs$ = this.store.pipe(
    select(selectCurrentMultiClinicIDs)
  ); 

  public loadClinics() {
    this.store.dispatch(ClinicPageActions.loadClinics());
  }

  public setCurrentClinicId(clinicId: string | number | null) {
    this.store.dispatch(ClinicPageActions.setCurrentClinicId({ clinicId }));
  }

  public setCurrentMultiClinicIDs(clinicIDs: Array<'all' | number>, isPrevAll: boolean) {
    this.store.dispatch(ClinicPageActions.setCurrentMultiClinicIDs({ clinicIDs, isPrevAll }));
  }
}
