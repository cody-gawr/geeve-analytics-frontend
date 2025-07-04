import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  of,
  withLatestFrom,
  filter,
  mergeMap,
  Subject,
  takeUntil,
  groupBy,
  switchMap,
} from 'rxjs';
import { FinanceService } from '../../services/finance.service';
import { FinanceApiActions, FinancePageActions } from '../actions';
import { Store } from '@ngrx/store';
import { FinanceState, selectIsLoadingNetProfit } from '../reducers/finance.reducer';
import { ChartDescParams } from '@/newapp/models/dashboard';
import { DashboardService } from '../../services/dashboard.service';

@Injectable()
export class FinanceEffects {
  constructor(
    private actions$: Actions,
    private financeService: FinanceService,
    private dashboardService: DashboardService,
    private store: Store<FinanceState>,
  ) {}

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  public readonly loadFnChartDescription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnChartDescription),
      groupBy(action => action.chartDescription), // Group actions by `chart description`
      mergeMap(grouped$ =>
        grouped$.pipe(
          switchMap((params: ChartDescParams<FinanceEndpoints>) => {
            return this.dashboardService
              .spChartDescriptionCall<any, FinanceEndpoints>('Finance', params)
              .pipe(
                map(data =>
                  FinanceApiActions.fnChartDescriptionSuccess({
                    chartDesc: params.chartDescription,
                    chartDescData: data,
                  }),
                ),
                catchError((error: HttpErrorResponse) =>
                  of(
                    FinanceApiActions.fnChartDescriptionFailure({
                      chartDesc: params.chartDescription,
                      error: error.error ?? error,
                    }),
                  ),
                ),
              );
          }),
        ),
      ),
    );
  });

  public readonly loadFnTotalProduction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnTotalProduction),
      mergeMap(params => {
        return this.financeService.fnTotalProduction(params).pipe(
          map(res =>
            FinanceApiActions.fnTotalProductionSuccess({
              value: res.total,
              trendVal: res.totalTa,
              prodData: res.data,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnTotalProductionFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public readonly loadFnTotalProductionTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnTotalProductionTrend),
      mergeMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.financeService.fnTotalProductionTrend(clinicId, mode, queryWhEnabled).pipe(
          map(res =>
            FinanceApiActions.fnTotalProductionTrendSuccess({
              prodTrendData: res.data,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnTotalProductionTrendFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
      takeUntil(this.destroy$),
    );
  });

  public readonly loadFnTotalCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnTotalCollection),
      mergeMap(params => {
        return this.financeService.fnTotalCollection(params).pipe(
          map(res =>
            FinanceApiActions.fnTotalCollectionSuccess({
              value: res.total,
              trendVal: res.totalTa,
              collectionData: res.data,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnTotalCollectionFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public readonly loadFnTotalCollectionTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnTotalCollectionTrend),
      mergeMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.financeService.fnTotalCollectionTrend(clinicId, mode, queryWhEnabled).pipe(
          map(res =>
            FinanceApiActions.fnTotalCollectionTrendSuccess({
              collectionTrendData: res.data,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnTotalCollectionTrendFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public readonly loadfnNetProfit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnNetProfit),
      withLatestFrom(this.store.select(selectIsLoadingNetProfit)),
      filter(([action, isLoading]) => isLoading),
      mergeMap(([params]) => {
        return this.financeService.fnNetProfit(params).pipe(
          map(res => FinanceApiActions.fnNetProfitSuccess({ value: res.data })),
          catchError((error: HttpErrorResponse) => {
            const jeeErr = error.error?.jeeveError ?? error;
            jeeErr.api = 'fnNetProfit';
            jeeErr.platform = params.connectedWith;
            return of(
              FinanceApiActions.fnNetProfitFailure({
                error: jeeErr,
              }),
            );
          }),
        );
      }),
    );
  });

  public readonly loadfnNetProfitTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnNetProfitTrend),
      mergeMap(({ clinicId, mode, connectedWith, queryWhEnabled }) => {
        return this.financeService
          .fnNetProfitTrend(clinicId, mode, connectedWith, queryWhEnabled)
          .pipe(
            map(res =>
              FinanceApiActions.fnNetProfitTrendSuccess({
                netProfitTrendData: res.data,
              }),
            ),
            catchError((error: HttpErrorResponse) => {
              const jeeErr = error.error?.jeeveError ?? error;
              jeeErr.api = 'fnNetProfitTrend';
              jeeErr.platform = connectedWith;
              return of(
                FinanceApiActions.fnNetProfitTrendFailure({
                  error: jeeErr,
                }),
              );
            }),
          );
      }),
    );
  });

  public readonly loadfnNetProfitPercentage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnNetProfitPercentage),
      mergeMap(params => {
        return this.financeService.fnNetProfitPercentage(params).pipe(
          map(res => FinanceApiActions.fnNetProfitPercentageSuccess({ value: res.data })),
          catchError((error: HttpErrorResponse) => {
            const jeeErr = error.error?.jeeveError ?? error;
            jeeErr.api = 'fnNetProfitPercentage';
            jeeErr.platform = params.connectedWith;
            return of(
              FinanceApiActions.fnNetProfitPercentageFailure({
                error: jeeErr,
              }),
            );
          }),
        );
      }),
    );
  });

  public readonly loadfnNetProfitPercentageTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnNetProfitPercentageTrend),
      mergeMap(({ clinicId, mode, connectedWith, queryWhEnabled }) => {
        return this.financeService
          .fnNetProfitPercentageTrend(clinicId, mode, connectedWith, queryWhEnabled)
          .pipe(
            map(res =>
              FinanceApiActions.fnNetProfitPercentTrendSuccess({
                netProfitPercentTrendData: res.data,
              }),
            ),
            catchError((error: HttpErrorResponse) => {
              const jeeErr = error.error?.jeeveError ?? error;
              jeeErr.api = 'fnNetProfitPercentageTrend';
              jeeErr.platform = connectedWith;
              return of(
                FinanceApiActions.fnNetProfitPercentTrendFailure({
                  error: jeeErr,
                }),
              );
            }),
          );
      }),
    );
  });

  public readonly loadfnExpenses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnExpenses),
      mergeMap(params => {
        return this.financeService.fnExpenses(params).pipe(
          map(res =>
            FinanceApiActions.fnExpensesSuccess({
              expensesBodyData: res,
            }),
          ),
          catchError((error: HttpErrorResponse) => {
            const jeeErr = error.error?.jeeveError ?? error;
            jeeErr.api = 'fnExpenses';
            jeeErr.platform = params.connectedWith;
            return of(
              FinanceApiActions.fnExpensesFailure({
                error: jeeErr,
              }),
            );
          }),
        );
      }),
    );
  });

  public readonly loadfnExpensesTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnExpensesTrend),
      mergeMap(({ clinicId, mode, connectedWith, queryWhEnabled }) => {
        return this.financeService
          .fnExpensesTrend(clinicId, mode, connectedWith, queryWhEnabled)
          .pipe(
            map(res =>
              FinanceApiActions.fnExpensesTrendSuccess({
                expensesTrendData: res.data,
                durations: res.durations,
              }),
            ),
            catchError((error: HttpErrorResponse) => {
              const jeeErr = error.error?.jeeveError ?? error;
              jeeErr.api = 'fnExpensesTrend';
              jeeErr.platform = connectedWith;
              return of(
                FinanceApiActions.fnExpensesTrendFailure({
                  error: jeeErr,
                }),
              );
            }),
          );
      }),
    );
  });

  public readonly loadfnProductionByClinician$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnProductionByClinician),
      mergeMap(params => {
        return this.financeService.fnProductionByClinician(params).pipe(
          map(res =>
            FinanceApiActions.fnProductionByClinicianSuccess({
              prodByClinicData: res.data,
              prodByClinicianTotal: res.total,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnProductionByClinicianFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public readonly loadfnProdByClinicianTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnProdByClinicianTrend),
      mergeMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.financeService
          .fnProductionByClinicianTrend(clinicId, mode, queryWhEnabled)
          .pipe(
            map(res =>
              FinanceApiActions.fnProdByClinicianTrendSuccess({
                prodByClinicTrendData: res.data,
              }),
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                FinanceApiActions.fnProdByClinicianTrendFailure({
                  error: error.error?.jeeveError ?? error,
                }),
              ),
            ),
          );
      }),
    );
  });

  public readonly loadfnProductionPerVisit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnProductionPerVisit),
      mergeMap(params => {
        return this.financeService.fnProductionPerVisit(params).pipe(
          map(res =>
            FinanceApiActions.fnProductionPerVisitSuccess({
              prodPerVisitData: res.data,
              prodPerVisitTotal: res.total,
              prodPerVisitTrendTotal: res.totalTa,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnProductionPerVisitFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public readonly loadfnProductionPerVisitTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnProdPerVisitTrend),
      mergeMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.financeService.fnProductionPerVisitTrend(clinicId, mode, queryWhEnabled).pipe(
          map(res =>
            FinanceApiActions.fnProductionPerVisitTrendSuccess({
              prodPerVisitTrendData: res.data,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnProductionPerVisitTrendFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public readonly loadfnProductionPerDay$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnProductionPerDay),
      mergeMap(params => {
        return this.financeService.fnProductionPerDay(params).pipe(
          map(res =>
            FinanceApiActions.fnProductionPerDaySuccess({
              prodPerDayData: res.data,
              prodPerDayTotal: res.total,
              prodPerDayTrendTotal: res.totalTa,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnProductionPerDayFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public readonly loadfnProductionPerDayTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnProdPerDayTrend),
      mergeMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.financeService.fnProductionPerDayTrend(clinicId, mode, queryWhEnabled).pipe(
          map(res =>
            FinanceApiActions.fnProductionPerDayTrendSuccess({
              prodPerDayTrendData: res.data,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnProductionPerDayTrendFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public readonly loadFnTotalDiscounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnTotalDiscounts),
      mergeMap(params => {
        return this.financeService.fnTotalDiscounts(params).pipe(
          map(res =>
            FinanceApiActions.fnTotalDiscountsSuccess({
              totalDiscountData: res.data,
              totalDiscountTotal: res.total,
              totalDiscountTrendTotal: res.totalTa,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnTotalDiscountsFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public readonly loadFnTotalDiscountsTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnTotalDiscountsTrend),
      mergeMap(({ clinicId, mode, queryWhEnabled }) => {
        return this.financeService.fnTotalDiscountsTrend(clinicId, mode, queryWhEnabled).pipe(
          map(res =>
            FinanceApiActions.fnTotalDiscountsTrendSuccess({
              totalDiscountTrendData: res.data,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnTotalDiscountsTrendFailure({
                error: error.error?.jeeveError ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });
}
