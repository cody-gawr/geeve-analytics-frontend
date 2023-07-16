import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DashboardPageActions } from '../state/actions';
import {
  DashboardState,
  selectChartTips,
  selectConnectedWith,
  selectErrors
} from '../state/reducers/dashboard.reducer';
import { JeeveError } from '@/newapp/models';

@Injectable()
export class DashboardFacade {
  constructor(private store: Store<DashboardState>) {}

  public readonly errors$: Observable<JeeveError[]> = this.store.pipe(
    select(selectErrors)
  );

  public readonly chartTips$ = this.store.pipe(
    select(selectChartTips)
  );

  public readonly connectedWith$ = this.store.pipe(
    select(selectConnectedWith)
  )

  public loadChartTips(dashboardId: number, clinicId: number) {
    this.store.dispatch(
      DashboardPageActions.loadChartTips({ dashboardId, clinicId })
    );
  }

  public loadClinicAccountingPlatform(clinicId: number) {
    this.store.dispatch(
      DashboardPageActions.loadClinicAccountingPlatform({ clinicId })
    );
  }
}
