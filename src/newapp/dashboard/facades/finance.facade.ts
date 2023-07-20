import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JeeveError } from '@/newapp/models';
import { FinanceState, selectErrors, selectExpensesData, 
  selectIsLoadingFnExpenses, selectIsLoadingNetProfit, 
  selectIsLoadingNetProfitPercentage, selectIsLoadingNetProfitProduction, 
  selectNetProfitPercentageVal, selectNetProfitProductionVal, 
  selectNetProfitVal, selectExpenseProduction, 
  selectProdByClinicianTotal, selectProductionChartData, selectProdByClinicianTrendTotal, selectProdPerVisitData, selectProdPerVisitTotal, selectProdPerVisitTrendTotal, selectTotalDiscountChartData, selectTotalDiscountTotal, selectTotalDiscountTrendTotal, selectIsLoadingFnProdPerVisit, selectIsLoadingFnProdPerClinic, selectIsLoadingFnTotalDiscount, selectCollectionChartData, selectCollectionVal, selectIsLoadingCollection, selectCollectionTrendVal, selectProductionTrendVal, selectTotalProdChartData } from '../state/reducers/finance.reducer';
import { FnNetProfitParams } from '@/newapp/models/dashboard';
import { FinancePageActions } from '../state/actions';

@Injectable()
export class FinanceFacade {
  constructor(private store: Store<FinanceState>) {}

  public readonly errors$: Observable<JeeveError[]> = this.store.pipe(
    select(selectErrors)
  );

  public readonly productionVal$ = this.store.pipe(
    select(selectNetProfitProductionVal)
  );

  public readonly netProfit$ = this.store.pipe(
    select(selectNetProfitVal)
  );

  public readonly productionTrendVal$ = this.store.pipe(
    select(selectProductionTrendVal)
  );

  public readonly netProfitPercentage$ = this.store.pipe(
    select(selectNetProfitPercentageVal)
  );

  public readonly isLoadingNetProfitProduction$ = this.store.pipe(
    select(selectIsLoadingNetProfitProduction)
  );

  public readonly isLoadingCollection$ = this.store.pipe(
    select(selectIsLoadingCollection)
  )

  public readonly isLoadingNetProfit$ = this.store.pipe(
    select(selectIsLoadingNetProfit)
  );

  public readonly isLoadingNetProfitPercentage$ = this.store.pipe(
    select(selectIsLoadingNetProfitPercentage)
  );

  public readonly isLoadingFnExpenses$ = this.store.pipe(
    select(selectIsLoadingFnExpenses)
  );

  public readonly isLoadingFnProdPerVisit$ = this.store.pipe(
    select(selectIsLoadingFnProdPerVisit)
  );

  public readonly isLoadingFnProdPerClinician$ = this.store.pipe(
    select(selectIsLoadingFnProdPerClinic)
  );

  public readonly isLoadingFnTotalDiscount$ = this.store.pipe(
    select(selectIsLoadingFnTotalDiscount)
  );

  public readonly expensesData$ = this.store.pipe(
    select(selectExpensesData)
  );

  public readonly expensesProduction$ = this.store.pipe(
    select(selectExpenseProduction)
  );

  public readonly prodByClinicianChartData$ = this.store.pipe(
    select(selectProductionChartData)
  );

  public readonly prodChartData$ = this.store.pipe(
    select(selectTotalProdChartData)
  );

  public readonly collectionChartData$ = this.store.pipe(
    select(selectCollectionChartData)
  )

  public readonly collectionVal$ = this.store.pipe(
    select(selectCollectionVal)
  );

  
  public readonly collectionTrendVal$ = this.store.pipe(
    select(selectCollectionTrendVal)
  )

  public readonly prodByClinicianTotal$ = this.store.pipe(
    select(selectProdByClinicianTotal)
  )

  public readonly prodByClinicianTrendTotal$ = this.store.pipe(
    select(selectProdByClinicianTrendTotal)
  )

  public readonly prodPerVisitData$ = this.store.pipe(
    select(selectProdPerVisitData)
  );

  public readonly prodPerVisitTotal$ = this.store.pipe(
    select(selectProdPerVisitTotal)
  );

  public readonly prodPerVisitTrendTotal$ = this.store.pipe(
    select(selectProdPerVisitTrendTotal)
  );

  public readonly totalDiscountChartData$ = this.store.pipe(
    select(selectTotalDiscountChartData)
  );

  public readonly totalDiscountTotal$ = this.store.pipe(
    select(selectTotalDiscountTotal)
  );

  public readonly totalDiscountTrendTotal$ = this.store.pipe(
    select(selectTotalDiscountTrendTotal)
  );

  public loadFnTotalProduction(params: FnNetProfitParams) {
    this.store.dispatch(
      FinancePageActions.loadFnTotalProduction(params)
    );
  }

  public loadFnTotalCollection(params: FnNetProfitParams) {
    this.store.dispatch(
      FinancePageActions.loadFnTotalCollection(params)
    );
  }

  public loadFnNetProfit(params: FnNetProfitParams) {
    this.store.dispatch(
      FinancePageActions.loadFnNetProfit(params)
    );
  }

  public loadFnNetProfitPercentage(params: FnNetProfitParams) {
    this.store.dispatch(
      FinancePageActions.loadFnNetProfitPercentage(params)
    );
  }

  public loadFnExpenses(params: FnNetProfitParams) {
    this.store.dispatch(
      FinancePageActions.loadFnExpenses(params)
    )
  }

  public loadFnProductionByClinician(params: FnNetProfitParams) {
    this.store.dispatch(
      FinancePageActions.loadFnProductionByClinician(params)
    )
  }

  public loadFnProductionPerVisit(params: FnNetProfitParams) {
    this.store.dispatch(
      FinancePageActions.loadFnProductionPerVisit(params)
    )
  }

  public loadFnTotalDiscounts(params: FnNetProfitParams) {
    this.store.dispatch(
      FinancePageActions.loadFnTotalDiscounts(params)
    )
  }
}
