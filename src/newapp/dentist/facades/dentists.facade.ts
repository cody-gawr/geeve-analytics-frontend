import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  DentistState,
  selectCurrentDentistId,
  selectDentistId,
  selectDentists,
  selectDentistsError,
  selectDentistsLoading,
  selectIsDentistMode,
} from '../state/reducers/dentist.reducer';
import { Dentist } from '@/newapp/models/dentist';
import { JeeveError } from '@/newapp/models';
import { DentistPageActions } from '../state/actions';
@Injectable()
export class DentistFacade {
  constructor(private readonly store: Store<DentistState>) {}

  public readonly dentists$: Observable<Dentist[] | null> = this.store.pipe(
    select(selectDentists)
  );

  public readonly dentistId$: Observable<number | null> = this.store.pipe(
    select(selectDentistId)
  );

  public readonly currentDentistId$ = this.store.pipe(
    select(selectCurrentDentistId)
  );

  public readonly isDentistsLoading$: Observable<boolean> = this.store.pipe(
    select(selectDentistsLoading)
  );

  public readonly isDentistMode$ = this.store.pipe(select(selectIsDentistMode));

  public readonly dentistsError$: Observable<JeeveError | null> =
    this.store.pipe(select(selectDentistsError));

  public loadDentists(clinicId: string | number, all = 0) {
    this.store.dispatch(DentistPageActions.loadDentists({ clinicId, all }));
  }

  public loadSpecificDentist(clinicId: string | number) {
    this.store.dispatch(DentistPageActions.loadSpecificDentist({ clinicId }));
  }

  public setCurrentDentistId(dentistId: number) {
    this.store.dispatch(DentistPageActions.setCurrentDentistId({ dentistId }));
  }
}
