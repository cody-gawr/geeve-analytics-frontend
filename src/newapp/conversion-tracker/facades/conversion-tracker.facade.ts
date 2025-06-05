import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { JeeveError } from '@/newapp/models';
import { ConversionTrackerModule } from '../conversion-tracker.module';
import {
  ConversionTrackerState,
  selectConversionCodes,
  selectConversionTrackers,
  selectSelectedConversionCode,
} from '../state/reducers/conversion-tracker.reducer';
import { ConversionTrackerPageActions } from '../state/actions';

@Injectable()
export class ConversionTrackerFacade {
  constructor(private store: Store<ConversionTrackerState>) {}

  readonly selectedConversionCode$ = this.store.pipe(select(selectSelectedConversionCode));
  readonly conversionCodes$ = this.store.pipe(select(selectConversionCodes));
  readonly conversionTrackers$ = this.store.pipe(select(selectConversionTrackers));

  loadConversionCodes(clinicId: number) {
    this.store.dispatch(ConversionTrackerPageActions.loadConversionCodes({ clinicId }));
  }
}
