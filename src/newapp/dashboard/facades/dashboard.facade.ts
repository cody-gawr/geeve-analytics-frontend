import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DashboardPageActions } from '../state/actions';
import {
  DashboardState,
  selectErrors
} from '../state/reducers/dashboard.reducer';
import { JeeveError } from '../state/actions/dashboard-api.actions';

@Injectable()
export class DashboardFacade {
  constructor(private store: Store<DashboardState>) {}

  public readonly errors$: Observable<JeeveError[]> = this.store.pipe(
    select(selectErrors)
  );

  public loadChartTips(dashboardId: number, clinicId: number) {
    this.store.dispatch(
      DashboardPageActions.loadChartTips({ dashboardId, clinicId })
    );
  }
}
