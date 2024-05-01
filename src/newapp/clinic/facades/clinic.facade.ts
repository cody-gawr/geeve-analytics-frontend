import { Clinic } from '../../models/clinic';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClinicPageActions } from '../state/actions';
import {
  ClinicState,
  selectClinics,
  selectError,
  selectSuccess,
  selectCurrentMultiClinicIds,
  selectCurrentSingleClinicId,
  selectIsMultiSelection,
  selectCurrentClinicId,
  selectCurrentClinics,
  selectIsEachClinicExact,
  selectIsEachClinicCore,
  selectIsEachClinicD4w,
  selectIsMultiClinicsSelected,
  selectIsAnyClinicHasD4w,
  selectIsEachClinicPraktika,
} from '../state/reducers/clinic.reducer';
import { combineLatest, map } from 'rxjs';

@Injectable()
export class ClinicFacade {
  constructor(private store: Store<ClinicState>) {}

  public readonly success$: Observable<boolean> = this.store.pipe(
    select(selectSuccess)
  );

  public readonly error$: Observable<string> = this.store.pipe(
    select(selectError)
  );

  public readonly clinics$: Observable<Clinic[]> = this.store.pipe(
    select(selectClinics)
  );

  public readonly currentMultiClinicIDs$ = this.store.pipe(
    select(selectCurrentMultiClinicIds)
  );

  public readonly currentClinicId$ = this.store.pipe(
    select(selectCurrentClinicId)
  );

  public readonly currentClinics$ = this.store.pipe(
    select(selectCurrentClinics)
  );

  public readonly isEachClinicExact$ = this.store.pipe(
    select(selectIsEachClinicExact)
  );

  public readonly isEachClinicCore$ = this.store.pipe(
    select(selectIsEachClinicCore)
  );

  public readonly isEachClinicPraktika$ = this.store.pipe(
    select(selectIsEachClinicPraktika)
  );

  public readonly isEachClinicD4w$ = this.store.pipe(
    select(selectIsEachClinicD4w)
  );

  public readonly isAnyClinicHasD4w$ = this.store.pipe(
    select(selectIsAnyClinicHasD4w)
  );

  public readonly currentSingleClinicId$ = this.store.pipe(
    select(selectCurrentSingleClinicId)
  );

  public readonly currentMultiClinicIds$ = this.store.pipe(
    select(selectCurrentMultiClinicIds)
  );

  public readonly isMultiSelection$ = this.store.pipe(
    select(selectIsMultiSelection)
  );

  public readonly isMultiClinicsSelected$ = this.store.pipe(
    select(selectIsMultiClinicsSelected)
  );

  public loadClinics() {
    this.store.dispatch(ClinicPageActions.loadClinics());
  }

  public setCurrentSingleClinicId(clinicId: 'all' | number | null) {
    this.store.dispatch(
      ClinicPageActions.setCurrentSingleClinicId({ clinicId })
    );
  }

  public setCurrentMultiClinicIDs(clinicIDs: Array<number>) {
    this.store.dispatch(
      ClinicPageActions.setCurrentMultiClinicIDs({ clinicIDs })
    );
  }

  public getCurrentClinics$(isMulti: boolean, isString = false) {
    return combineLatest([
      this.currentSingleClinicId$,
      this.currentMultiClinicIds$,
      this.clinics$,
    ]).pipe(
      map(([singleId, multiIds, clinics]) => {
        if (isMulti) {
          return clinics.filter(c => multiIds.includes(c.id));
        } else {
          return singleId === 'all'
            ? clinics
            : [clinics.find(c => c.id == <number>singleId)];
        }
      }),
      map(v => {
        return isString ? v.join(',') : v;
      })
    );
  }

  public setMultiClinicSelection(value: boolean) {
    this.store.dispatch(ClinicPageActions.setMultiClinicSelection({ value }));
  }
}
