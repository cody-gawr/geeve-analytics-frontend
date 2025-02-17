import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { DashboardPageActions } from '../state/actions';
import {
  DashboardState,
  selectChartTips,
  selectErrors,
} from '../state/reducers/dashboard.reducer';
import { JeeveError } from '@/newapp/models';

@Injectable()
export class DashboardFacade {
  constructor(private store: Store<DashboardState>) {}

  public readonly errors$: Observable<JeeveError[]> = this.store.pipe(
    select(selectErrors)
  );

  public readonly chartTips$ = this.store.pipe(select(selectChartTips));

  public getChartTip$(index: number) {
      return this.chartTips$.pipe(
        map(tips => {
          if (tips && tips[index]) {
            if(tips[index]?.info?.toLowerCase() === 'disabled') return null;
            return tips[index];
          }
          return {
            title: '',
            info: ''
          };
        })
      );
  }

  public loadChartTips(dashboardId: number, clinicId: string | number) {
    this.store.dispatch(
      DashboardPageActions.loadChartTips({ dashboardId, clinicId })
    );
  }
}
