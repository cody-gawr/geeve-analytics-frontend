import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardApiActions, DashboardPageActions } from '../actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}

  public readonly getChartTips$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.loadChartTips),
      switchMap(({ dashboardId, clinicId }) => {
        return this.dashboardService.getCharts(dashboardId, clinicId).pipe(
          map(res =>
            DashboardApiActions.loadChartTipsSuccess({ chartData: res.data })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              DashboardApiActions.loadChartTipsFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });
}
