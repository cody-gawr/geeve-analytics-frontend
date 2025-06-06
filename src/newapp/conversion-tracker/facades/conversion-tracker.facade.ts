import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { JeeveError } from '@/newapp/models';
import {
  ConversionTrackerState,
  selectConversionCodes,
  selectConversionTrackers,
  selectSelectedConversionCode,
} from '../state/reducers/conversion-tracker.reducer';
import { ConversionTrackerPageActions } from '../state/actions';
import { ConversionCode } from '@/newapp/models/conversion-tracker';
import { TreatmentStatus } from '@/newapp/enums/treatment-status.enum';

@Injectable()
export class ConversionTrackerFacade {
  constructor(private store: Store<ConversionTrackerState>) {}

  readonly selectedConversionCode$ = this.store.pipe(select(selectSelectedConversionCode));
  readonly conversionCodes$ = this.store.pipe(select(selectConversionCodes));
  readonly conversionTrackers$ = this.store.pipe(select(selectConversionTrackers));

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
}
