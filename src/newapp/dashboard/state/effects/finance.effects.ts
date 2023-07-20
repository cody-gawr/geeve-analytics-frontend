import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FinanceService } from '../../services/finance.service';
import { FinanceApiActions, FinancePageActions } from '../actions';

@Injectable()
export class FinanceEffects {
  constructor(
    private actions$: Actions,
    private financeService: FinanceService
  ) {}

  public readonly loadFnTotalProduction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnTotalProduction),
      mergeMap((params) => {
        return this.financeService.fnTotalProduction(params).pipe(
          map((res) =>
            FinanceApiActions.fnTotalProductionSuccess({ 
              value: res.total, trendVal: res.totalTa, totalProdChartData: res.data })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnTotalProductionFailure({
                error: error.error ?? error
              })
            )
          )
        );
      })
    );
  });

  public readonly loadFnTotalCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnTotalCollection),
      mergeMap((params) => {
        return this.financeService.fnTotalCollection(params).pipe(
          map((res) =>
            FinanceApiActions.fnTotalCollectionSuccess({ 
              value: res.total, trendVal: res.totalTa, collectionChartData: res.data })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnTotalCollectionFailure({
                error: error.error ?? error
              })
            )
          )
        );
      })
    );
  });

  public readonly loadfnNetProfit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnNetProfit),
      mergeMap((params) => {
        return this.financeService.fnNetProfit(params).pipe(
          map((res) =>
            FinanceApiActions.fnNetProfitSuccess({ value: res.data })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnNetProfitFailure({
                error: error.error ?? error
              })
            )
          )
        );
      })
    );
  });

  public readonly loadfnNetProfitPercentage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnNetProfitPercentage),
      mergeMap((params) => {
        return this.financeService.fnNetProfitPercentage(params).pipe(
          map((res) =>
            FinanceApiActions.fnNetProfitPercentageSuccess({ value: res.data })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnNetProfitPercentageFailure({
                error: error.error ?? error
              })
            )
          )
        );
      })
    );
  });

  public readonly loadfnExpenses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnExpenses),
      mergeMap((params) => {
        return this.financeService.fnExpenses(params).pipe(
          map((res) =>
            FinanceApiActions.fnExpensesSuccess({ 
              expensesData: res.data, 
              production: res.production
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnExpensesFailure({
                error: error.error ?? error
              })
            )
          )
        );
      })
    );
  });

  public readonly loadfnProductionByClinician$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnProductionByClinician),
      mergeMap((params) => {
        return this.financeService.fnProductionByClinician(params).pipe(
          map((res) =>
            FinanceApiActions.fnProductionByClinicianSuccess({ 
              productionChartData: res.data, 
              prodByClinicianTotal: res.total
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnProductionByClinicianFailure({
                error: error.error ?? error
              })
            )
          )
        );
      })
    );
  });

  public readonly loadfnProductionPerVisit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnProductionPerVisit),
      mergeMap((params) => {
        return this.financeService.fnProductionPerVisit(params).pipe(
          map((res) =>
            FinanceApiActions.fnProductionPerVisitSuccess({ 
              prodPerVisitData: res.data, 
              prodPerVisitTotal: res.total,
              prodPerVisitTrendTotal: res.totalTa
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnProductionPerVisitFailure({
                error: error.error ?? error
              })
            )
          )
        );
      })
    );
  });

  public readonly loadFnTotalDiscounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FinancePageActions.loadFnTotalDiscounts),
      mergeMap((params) => {
        return this.financeService.fnTotalDiscounts(params).pipe(
          map((res) =>
            FinanceApiActions.fnTotalDiscountsSuccess({ 
              totalDiscountChartData: res.data, 
              totalDiscountTotal: res.total,
              totalDiscountTrendTotal: res.totalTa
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceApiActions.fnTotalDiscountsFailure({
                error: error.error ?? error
              })
            )
          )
        );
      })
    );
  });

}
