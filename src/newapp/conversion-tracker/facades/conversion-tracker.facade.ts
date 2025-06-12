import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { JeeveError } from '@/newapp/models';
import {
  ConversionTrackerState,
  selectConversionCodes,
  selectConversionTrackers,
  selectLoading,
  selectSelectedConversionCode,
} from '../state/reducers/conversion-tracker.reducer';
import { ConversionTrackerApiActions, ConversionTrackerPageActions } from '../state/actions';
import { ActiveTreatmentStatus, TreatmentStatus } from '@/newapp/enums/treatment-status.enum';
import { Actions, ofType } from '@ngrx/effects';

@Injectable()
export class ConversionTrackerFacade {
  constructor(
    private store: Store<ConversionTrackerState>,
    private actions$: Actions,
  ) {}

  readonly selectedConversionCode$ = this.store.pipe(select(selectSelectedConversionCode));
  readonly conversionCodes$ = this.store.pipe(select(selectConversionCodes));
  readonly conversionTrackers$ = this.store.pipe(select(selectConversionTrackers));
  readonly isCreatingConversionCode$ = this.store.pipe(
    select(selectLoading),
    map(loading => loading.createConversionCode),
  );
  readonly isDeletingConversionCode$ = this.store.pipe(
    select(selectLoading),
    map(loading => loading.deleteConversionCode),
  );

  readonly createConversionCodeSuccess$ = this.actions$.pipe(
    ofType(ConversionTrackerApiActions.createConversionCodeSuccess),
    map(({ conversionCode }) => conversionCode),
  );

  readonly createConversionCodeValueSuccess$ = this.actions$.pipe(
    ofType(ConversionTrackerApiActions.createConversionCodeValueSuccess),
    map(({ conversionCodeValue }) => conversionCodeValue),
  );

  readonly deleteConversionCodeValueSuccess$ = this.actions$.pipe(
    ofType(ConversionTrackerApiActions.deleteConversionCodeValueSuccess),
    map(({ deletedCount }) => deletedCount),
  );

  loadConversionCodes(clinicId: number) {
    this.store.dispatch(ConversionTrackerPageActions.loadConversionCodes({ clinicId }));
  }

  loadConversionTrackers(payload: {
    clinicId: number;
    providerId: number;
    startDate: string;
    endDate: string;
    consultCode: string;
  }) {
    this.store.dispatch(ConversionTrackerPageActions.loadConversionTrackers(payload));
  }

  selectConversionCode(id: number) {
    this.store.dispatch(ConversionTrackerPageActions.selectConversionCode({ id }));
  }

  updateConversionTrackerTreatmentStatus(
    recordId: number,
    treatmentStatus: TreatmentStatus,
    payload: {
      clinicId: number;
      providerId: number;
      startDate: string;
      endDate: string;
      consultCode: string;
    },
  ) {
    this.store.dispatch(
      ConversionTrackerPageActions.updateConversionTrackerTreatmentStatus({
        recordId,
        treatmentStatus,
        payload,
      }),
    );
  }

  createConversionCode(clinicId: number, consultCode: string) {
    this.store.dispatch(
      ConversionTrackerPageActions.createConversionCode({
        clinicId,
        consultCode,
      }),
    );
  }

  deleteConversionCode(clinicId: number, recordId: number) {
    this.store.dispatch(
      ConversionTrackerPageActions.deleteConversionCode({
        clinicId,
        recordId,
      }),
    );
  }

  createConversionCodeValue(payload: {
    clinicId: number;
    conversionCodeId: number;
    treatmentStatus: ActiveTreatmentStatus;
    code: string;
  }) {
    this.store.dispatch(ConversionTrackerPageActions.createConversionCodeValue(payload));
  }

  deleteConversionCodeValue(clinicId: number, recordId: number) {
    this.store.dispatch(
      ConversionTrackerPageActions.deleteConversionCodeValue({ clinicId, recordId }),
    );
  }
}
