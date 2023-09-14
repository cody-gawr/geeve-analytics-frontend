import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { DashboardService } from "../../services/dashboard.service";
import { DashboardApiActions, DashboardPageActions } from "../actions";

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}

  public readonly getChartTips$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.loadChartTips),
      mergeMap(({ dashboardId, clinicId }) => {
        return this.dashboardService.getCharts(dashboardId, clinicId).pipe(
          map((res) =>
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

  public readonly getClinicAccountingPlatform$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.loadClinicAccountingPlatform),
      mergeMap(({ clinicId }) => {
        return this.dashboardService.getClinicAccountingPlatform(clinicId).pipe(
          map((res) =>
            DashboardApiActions.clinicAccountingPlatformSuccess({
              connectWith: res.data,
              clinicId,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              DashboardApiActions.clinicAccountingPlatformFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });

  //   public readonly loadClinicsInfo$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(DashboardPageActions.loadClinicsInfo),
  //       mergeMap(() => {
  //         return this.dashboardService.getClinicsInfo().pipe(
  //           map((res) =>
  //             DashboardApiActions.loadClinicsInfoSuccess({clinicsInfo: res.data})
  //           ),
  //           catchError((error: HttpErrorResponse) =>
  //             of(DashboardApiActions.loadClinicsInfoFailure({ error: error.error??error }))
  //           )
  //         );
  //       })
  //     );
  //   });

  //   public readonly loadSMSInfo$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(DashboardPageActions.loadSMSInfo),
  //       mergeMap(({startDate, endDate}) => {
  //         return this.dashboardService.getSMSInfo(startDate, endDate).pipe(
  //           map(res => DashboardApiActions.loadSMSInfoSuccess({smsInfo: res.data})),
  //           catchError((error: HttpErrorResponse) =>
  //             of(DashboardApiActions.loadSMSInfoFailure({error: error.error??error}))
  //           )
  //         )
  //       })
  //     )
  //   });

  //   public readonly loadWarehouseInfo$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(DashboardPageActions.loadWarehouseInfo),
  //       mergeMap(({startDate, endDate}) => {
  //         return this.dashboardService.getWarehouseJobInfo(startDate, endDate).pipe(
  //           map(res => DashboardApiActions.loadWarehouseInfoSuccess({warehouseInfo: res.data})),
  //           catchError((error: HttpErrorResponse) =>
  //             of(DashboardApiActions.loadWarehouseInfoFailure({error: error.error??error}))
  //           )
  //         )
  //       })
  //     )
  //   });
}
