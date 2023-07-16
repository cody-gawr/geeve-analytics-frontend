import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JeeveError } from '@/newapp/models';
import { FinanceState, selectErrors, selectExpensesData, selectIsLoadingNetProfit, selectIsLoadingNetProfitPercentage, selectIsLoadingNetProfitProduction, selectNetProfitPercentageVal, selectNetProfitProductionVal, selectNetProfitVal } from '../state/reducers/finance.reducer';
import { FnNetProfitParams } from '@/newapp/models/dashboard';
import { FinancePageActions } from '../state/actions';

@Injectable()
export class FinanceFacade {
  constructor(private store: Store<FinanceState>) {}

  public readonly errors$: Observable<JeeveError[]> = this.store.pipe(
    select(selectErrors)
  );

  public readonly netProfitProduction$ = this.store.pipe(
    select(selectNetProfitProductionVal)
  );

  public readonly netProfit$ = this.store.pipe(
    select(selectNetProfitVal)
  );

  public readonly netProfitPercentage$ = this.store.pipe(
    select(selectNetProfitPercentageVal)
  );

  public readonly isLoadingNetProfitProduction$ = this.store.pipe(
    select(selectIsLoadingNetProfitProduction)
  );

  public readonly isLoadingNetProfit$ = this.store.pipe(
    select(selectIsLoadingNetProfit)
  );

  public readonly isLoadingNetProfitPercentage$ = this.store.pipe(
    select(selectIsLoadingNetProfitPercentage)
  );

  public readonly expensesData = this.store.pipe(
    select(selectExpensesData)
  )

  public loadFnTotalProduction(params: FnNetProfitParams) {
    this.store.dispatch(
      FinancePageActions.loadFnTotalProduction(params)
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
}
