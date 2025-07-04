import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JeeveError } from '@/newapp/models';
import {
  FinanceState,
  selectErrors,
  selectExpensesData,
  selectIsLoadingFnExpenses,
  selectIsLoadingNetProfit,
  selectIsLoadingNetProfitPercentage,
  selectIsLoadingTotalProduction,
  selectNetProfitPercentageVal,
  selectNetProfitProductionVal,
  selectNetProfitVal,
  selectExpenseProduction,
  selectProdByClinicianTotal,
  selectProdByClinicData,
  selectProdByClinicianTrendTotal,
  selectTotalDiscountData,
  selectTotalDiscountTotal,
  selectTotalDiscountTrendTotal,
  selectIsLoadingFnProdPerClinic,
  selectIsLoadingFnTotalDiscount,
  selectCollectionData,
  selectCollectionVal,
  selectIsLoadingCollection,
  selectCollectionTrendVal,
  selectProductionTrendVal,
  selectProdData,
  selectProdTrendData,
  selectIsLoadingTotalProductionTrend,
  selectTrendProfitChartName,
  selectCollectionTrendData,
  selectIsLoadingCollectionTrend,
  selectIsLoadingNetProfitTrend,
  selectNetProfitTrendData,
  selectIsLoadingNetProfitPercentTrend,
  selectNetProfitPercentTrendChartData,
  selectProdTrendChartData,
  selectCollectionTrendChartData,
  selectNetProfitTrendChartData,
  selectExpensesTrendChartData,
  selectIsLoadingFnExpensesTrend,
  selectExpensesTrendDurations,
  selectIsLoadingFnProdPerClinicTrend,
  selectProdByClinicianTrendChartData,
  selectIsLoadingFnTotalDiscountTrend,
  selectTotalDiscountTrendChartData,
  selectProdPerVisitTrendChartData,
  selectIsLoadingAllData,
  selectIsLoadingAllTrendData,
  selectProductionCollectionTrendChartData,
  selectFnExpensesData,
  selectProdPerVisitChartName,
  selectProdPerVisitChartData,
  selectIsLoadingFnProdPerVisitOrDay,
  selectIsLoadingFnProdPerVisitOrDayTrend,
  selectIsLoadingChartDesc,
  selectHourlyRateChartData,
} from '../state/reducers/finance.reducer';
import { FnFinanceSpParams } from '@/newapp/models/dashboard/finance';
import { FinancePageActions } from '../state/actions';
import { ChartDescParams } from '@/newapp/models/dashboard';

@Injectable()
export class FinanceFacade {
  constructor(private store: Store<FinanceState>) {}

  isLoadingChartDesc$ = (chartDesc: FinanceEndpoints) => {
    return this.store.pipe(select(selectIsLoadingChartDesc(chartDesc)));
  };

  loadChartDescription(
    chartDescription: FinanceEndpoints,
    params: ChartDescParams<FinanceEndpoints>,
  ) {
    this.store.dispatch(
      FinancePageActions.loadFnChartDescription({
        chartDescription,
        ...params,
      }),
    );
  }

  public readonly errors$: Observable<JeeveError[]> = this.store.pipe(select(selectErrors));

  public readonly hourlyRateChartData$ = this.store.pipe(select(selectHourlyRateChartData));

  public readonly productionVal$ = this.store.pipe(select(selectNetProfitProductionVal));

  public readonly netProfitVal$ = this.store.pipe(select(selectNetProfitVal));

  public readonly netProfitTrendData$ = this.store.pipe(select(selectNetProfitTrendData));

  public readonly netProfitTrendChartData$ = this.store.pipe(select(selectNetProfitTrendChartData));

  public readonly productionTrendVal$ = this.store.pipe(select(selectProductionTrendVal));

  public readonly netProfitPercentageVal$ = this.store.pipe(select(selectNetProfitPercentageVal));

  public readonly netProfitPercentTrendChartData$ = this.store.pipe(
    select(selectNetProfitPercentTrendChartData),
  );

  public readonly isLoadingTotalProduction$ = this.store.pipe(
    select(selectIsLoadingTotalProduction),
  );

  public readonly isLoadingTotalProductionTrend$ = this.store.pipe(
    select(selectIsLoadingTotalProductionTrend),
  );

  public readonly isLoadingCollection$ = this.store.pipe(select(selectIsLoadingCollection));

  public readonly isLoadingCollectionTrend$ = this.store.pipe(
    select(selectIsLoadingCollectionTrend),
  );

  public readonly isLoadingNetProfit$ = this.store.pipe(select(selectIsLoadingNetProfit));

  public readonly isLoadingNetProfitTrend$ = this.store.pipe(select(selectIsLoadingNetProfitTrend));

  public readonly isLoadingNetProfitPercentage$ = this.store.pipe(
    select(selectIsLoadingNetProfitPercentage),
  );

  public readonly isLoadingNetProfitPercentageTrend$ = this.store.pipe(
    select(selectIsLoadingNetProfitPercentTrend),
  );

  public readonly isLoadingFnExpenses$ = this.store.pipe(select(selectIsLoadingFnExpenses));

  public readonly isLoadingFnExpensesTrend$ = this.store.pipe(
    select(selectIsLoadingFnExpensesTrend),
  );

  public readonly isLoadingFnProdPerVisit$ = this.store.pipe(
    select(selectIsLoadingFnProdPerVisitOrDay),
  );

  public readonly isLoadingFnProdPerVisitTrend$ = this.store.pipe(
    select(selectIsLoadingFnProdPerVisitOrDayTrend),
  );

  public readonly isLoadingFnProdPerClinician$ = this.store.pipe(
    select(selectIsLoadingFnProdPerClinic),
  );

  public readonly isLoadingFnProdPerClinicianTrend$ = this.store.pipe(
    select(selectIsLoadingFnProdPerClinicTrend),
  );

  public readonly isLoadingFnTotalDiscount$ = this.store.pipe(
    select(selectIsLoadingFnTotalDiscount),
  );

  public readonly isLoadingFnTotalDiscountTrend$ = this.store.pipe(
    select(selectIsLoadingFnTotalDiscountTrend),
  );

  public readonly expensesData$ = this.store.pipe(select(selectExpensesData));
  public readonly fnExpensesData$ = this.store.pipe(select(selectFnExpensesData));

  public readonly expensesTrendChartData$ = this.store.pipe(select(selectExpensesTrendChartData));

  public readonly expensesTrendDurations$ = this.store.pipe(select(selectExpensesTrendDurations));

  public readonly expensesProduction$ = this.store.pipe(select(selectExpenseProduction));

  public readonly prodByClinicianChartData$ = this.store.pipe(select(selectProdByClinicData));

  public readonly prodByClinicianTrendChartData$ = this.store.pipe(
    select(selectProdByClinicianTrendChartData),
  );

  public readonly prodData$ = this.store.pipe(select(selectProdData));

  public readonly prodTrendData$ = this.store.pipe(select(selectProdTrendData));

  public readonly prodTrendChartData$ = this.store.pipe(select(selectProdTrendChartData));

  public readonly collectionData$ = this.store.pipe(select(selectCollectionData));

  public readonly collectionTrendData$ = this.store.pipe(select(selectCollectionTrendData));

  public readonly collectionTrendChartData$ = this.store.pipe(
    select(selectCollectionTrendChartData),
  );

  public readonly collectionVal$ = this.store.pipe(select(selectCollectionVal));

  public readonly collectionTrendVal$ = this.store.pipe(select(selectCollectionTrendVal));

  public readonly prodByClinicianTotal$ = this.store.pipe(select(selectProdByClinicianTotal));

  public readonly prodByClinicianTrendTotal$ = this.store.pipe(
    select(selectProdByClinicianTrendTotal),
  );

  public readonly prodPerVisitChartData$ = this.store.pipe(select(selectProdPerVisitChartData));

  public readonly prodPerVisitTrendChartData$ = this.store.pipe(
    select(selectProdPerVisitTrendChartData),
  );

  public readonly prodPerVisitChartName$ = this.store.pipe(select(selectProdPerVisitChartName));

  public readonly totalDiscountData$ = this.store.pipe(select(selectTotalDiscountData));

  public readonly totalDiscountTrendChartData$ = this.store.pipe(
    select(selectTotalDiscountTrendChartData),
  );

  public readonly totalDiscountTotal$ = this.store.pipe(select(selectTotalDiscountTotal));

  public readonly totalDiscountTrendTotal$ = this.store.pipe(select(selectTotalDiscountTrendTotal));

  public readonly profitTrendChartName$ = this.store.pipe(select(selectTrendProfitChartName));

  public readonly isLoadingAllData$ = this.store.pipe(select(selectIsLoadingAllData));

  public readonly isLoadingAllTrendData$ = this.store.pipe(select(selectIsLoadingAllTrendData));

  public readonly prodCollChartData$ = this.store.pipe(
    select(selectProductionCollectionTrendChartData),
  );

  public setErrors(errors: JeeveError[]) {
    this.store.dispatch(FinancePageActions.setErrors({ errors }));
  }

  public loadFnTotalProduction(params: FnFinanceSpParams) {
    this.store.dispatch(FinancePageActions.loadFnTotalProduction(params));
  }

  public loadFnTotalProductionTrend(
    clinicId: string | number,
    mode = '',
    queryWhEnabled = undefined,
  ) {
    this.store.dispatch(
      FinancePageActions.loadFnTotalProductionTrend({
        clinicId,
        mode,
        queryWhEnabled,
      }),
    );
  }

  public loadFnTotalCollection(params: FnFinanceSpParams) {
    this.store.dispatch(FinancePageActions.loadFnTotalCollection(params));
  }

  public loadFnTotalCollectionTrend(
    clinicId: string | number,
    mode = '',
    queryWhEnabled = undefined,
  ) {
    this.store.dispatch(
      FinancePageActions.loadFnTotalCollectionTrend({
        clinicId,
        mode,
        queryWhEnabled,
      }),
    );
  }

  public loadFnNetProfit(params: FnFinanceSpParams) {
    this.store.dispatch(FinancePageActions.loadFnNetProfit(params));
  }

  public loadFnNetProfitTrend(
    clinicId: string | number,
    mode = '',
    connectedWith = '',
    queryWhEnabled = undefined,
  ) {
    this.store.dispatch(
      FinancePageActions.loadFnNetProfitTrend({
        clinicId,
        mode,
        connectedWith,
        queryWhEnabled,
      }),
    );
  }

  public loadFnNetProfitPercentage(params: FnFinanceSpParams) {
    this.store.dispatch(FinancePageActions.loadFnNetProfitPercentage(params));
  }

  public loadFnNetProfitPercentageTrend(
    clinicId: string | number,
    mode = '',
    connectedWith = '',
    queryWhEnabled = undefined,
  ) {
    this.store.dispatch(
      FinancePageActions.loadFnNetProfitPercentageTrend({
        clinicId,
        mode,
        queryWhEnabled,
        connectedWith,
      }),
    );
  }

  public loadFnExpenses(params: FnFinanceSpParams) {
    this.store.dispatch(FinancePageActions.loadFnExpenses(params));
  }

  public loadFnExpensesTrend(
    clinicId: string | number,
    mode: string,
    connectedWith: string,
    queryWhEnabled: number = undefined,
  ) {
    this.store.dispatch(
      FinancePageActions.loadFnExpensesTrend({
        clinicId,
        mode,
        connectedWith,
        queryWhEnabled,
      }),
    );
  }

  public loadFnProductionByClinician(params: FnFinanceSpParams) {
    this.store.dispatch(FinancePageActions.loadFnProductionByClinician(params));
  }

  public loadFnProductionByClinicianTrend(
    clinicId: string | number,
    mode: string,
    queryWhEnabled: number = undefined,
  ) {
    this.store.dispatch(
      FinancePageActions.loadFnProdByClinicianTrend({
        clinicId,
        mode,
        queryWhEnabled,
      }),
    );
  }

  public loadFnProductionPerVisit(params: FnFinanceSpParams) {
    this.store.dispatch(FinancePageActions.loadFnProductionPerVisit(params));
  }

  public loadFnProductionPerDay(params: FnFinanceSpParams) {
    this.store.dispatch(FinancePageActions.loadFnProductionPerDay(params));
  }

  public loadFnProductionPerVisitTrend(
    clinicId: string | number,
    mode: string,
    queryWhEnabled: number = undefined,
  ) {
    this.store.dispatch(
      FinancePageActions.loadFnProdPerVisitTrend({
        clinicId,
        mode,
        queryWhEnabled,
      }),
    );
  }

  public loadFnProductionPerDayTrend(
    clinicId: string | number,
    mode: string,
    queryWhEnabled: number = undefined,
  ) {
    this.store.dispatch(
      FinancePageActions.loadFnProdPerDayTrend({
        clinicId,
        mode,
        queryWhEnabled,
      }),
    );
  }

  public setProdPerVisitChartName(chartName: FN_PROD_PER_VISIT_CHART_NAME) {
    this.store.dispatch(FinancePageActions.setProdPerVisitChartName({ chartName }));
  }

  public loadFnTotalDiscounts(params: FnFinanceSpParams) {
    this.store.dispatch(FinancePageActions.loadFnTotalDiscounts(params));
  }

  public loadFnTotalDiscountsTrend(
    clinicId: string | number,
    mode: string,
    queryWhEnabled: number = undefined,
  ) {
    this.store.dispatch(
      FinancePageActions.loadFnTotalDiscountsTrend({
        clinicId,
        mode,
        queryWhEnabled,
      }),
    );
  }

  public setTrendChartName(chartName: string) {
    this.store.dispatch(FinancePageActions.setTrendProfitChart({ chartName }));
  }
}
