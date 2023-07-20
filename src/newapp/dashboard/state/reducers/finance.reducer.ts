import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as _ from 'lodash';
import { JeeveError } from '@/newapp/models';
import { FinanceApiActions, FinancePageActions } from '../actions';
import { FnTotalDiscountItem, FnExpensesDataItem, FnProductionByClinicianItem, FnProductionPerVisitItem, FnTotalProductionApiResponse, FnTotalProductionItem, FnTotalCollectionItem } from '@/newapp/models/dashboard';

export interface FinanceState {
  isLoadingData: Array<
  'fnTotalProduction' | 
  'fnNetProfit' | 
  'fnNetProfitPercentage' |
  'fnExpenses' |
  'fnProductionByClinician' |
  'fnProductionPerVisit' |
  'fnTotalDiscounts' |
  'fnTotalCollection'
  >;
  // FnTotalProduction
  netProfitProductionVal: number;
  totalProdChartData: FnTotalProductionItem[];

  netProfitVal: number;
  productionTrendVal: number;
  netProfitPercentageVal: number;
  errors: Array<JeeveError>;
  expensesData: FnExpensesDataItem[];
  expenseProduction: number;
  productionChartData: FnProductionByClinicianItem[],
  prodByClinicianTotal: number;
  prodByClinicianTrendTotal: number;

  prodPerVisitData: FnProductionPerVisitItem[];
  prodPerVisitTotal: number;
  prodPerVisitTrendTotal: number;

  totalDiscountChartData: FnTotalDiscountItem[];
  totalDiscountTotal: number;
  totalDiscountTrendTotal: number;

  collectionChartData: FnTotalCollectionItem[];
  collectionVal: number;
  collectionTrendVal: number;
}

const initialState: FinanceState = {
  isLoadingData: [
    'fnTotalProduction', 'fnNetProfit', 
    'fnNetProfitPercentage', 'fnExpenses'],
  netProfitProductionVal: 0,
  totalProdChartData: [],

  netProfitVal: 0,
  productionTrendVal: 0,
  netProfitPercentageVal: 0,
  expenseProduction: 0,
  errors: [],
  expensesData: [],
  productionChartData: [],
  prodByClinicianTotal: 0,
  prodByClinicianTrendTotal: 0,

  prodPerVisitData: [],
  prodPerVisitTotal: 0,
  prodPerVisitTrendTotal: 0,

  totalDiscountChartData: [],
  totalDiscountTotal: 0,
  totalDiscountTrendTotal: 0,

  collectionChartData: [],
  collectionVal: 0,
  collectionTrendVal: 0
};

export const financeFeature = createFeature({
  name: 'finance',
  reducer: createReducer(
    initialState,
    on(FinancePageActions.loadFnTotalProduction, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, (n) => n.api != 'fnTotalProduction'),
        netProfitProductionVal: 0,
        totalProdChartData: [],
        isLoadingData: _.union(isLoadingData, ['fnTotalProduction'])
      };
    }),
    on(
      FinanceApiActions.fnTotalProductionSuccess,
      (state, { value, trendVal, totalProdChartData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != 'fnTotalProduction'),
          netProfitProductionVal: value,
          totalProdChartData: totalProdChartData,
          productionTrendVal: trendVal,
          isLoadingData: _.filter(isLoadingData, (n) => n != 'fnTotalProduction')
        };
      }
    ),
    on(
      FinanceApiActions.fnTotalProductionFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          netProfitProductionVal: null,
          totalProdChartData: [],
          productionTrendVal: 0,
          isLoadingData: _.filter(isLoadingData, (n) => n != 'fnTotalProduction'),
          errors: [...errors, { ...error, api: 'fnTotalProduction' }]
        };
      }
    ),
    on(FinancePageActions.loadFnTotalCollection, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, (n) => n.api != 'fnTotalCollection'),
        collectionVal: 0,
        collectionChartData: [],
        collectionTrendVal: 0,
        isLoadingData: _.union(isLoadingData, ['fnTotalCollection'])
      };
    }),
    on(
      FinanceApiActions.fnTotalCollectionSuccess,
      (state, { value, trendVal, collectionChartData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != 'fnTotalCollection'),
          collectionVal: value,
          collectionChartData: collectionChartData,
          collectionTrendVal: trendVal,
          isLoadingData: _.filter(isLoadingData, (n) => n != 'fnTotalCollection')
        };
      }
    ),
    on(
      FinanceApiActions.fnTotalCollectionFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          collectionVal: null,
          collectionChartData: [],
          collectionTrendVal: 0,
          isLoadingData: _.filter(isLoadingData, (n) => n != 'fnTotalCollection'),
          errors: [...errors, { ...error, api: 'fnTotalCollection' }]
        };
      }
    ),
    on(FinancePageActions.loadFnNetProfit, (state): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
            ...state,
            errors: _.filter(errors, (n) => n.api != 'fnNetProfit'),
            netProfitVal: 0,
            isLoadingData: _.union(isLoadingData, ['fnNetProfit'])
        };
    }),
    on(FinanceApiActions.fnNetProfitSuccess,
        (state, { value }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                errors: _.filter(errors, (n) => n.api != 'fnNetProfit'),
                netProfitVal: value,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnNetProfit')
            };
        }
    ),
    on(FinanceApiActions.fnNetProfitFailure,
        (state, { error }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                netProfitVal: null,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnNetProfit'),
                errors: [...errors, { ...error, api: 'fnNetProfit' }]
            };
        }
    ),
    on(FinancePageActions.loadFnNetProfitPercentage, (state): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
            ...state,
            errors: _.filter(errors, (n) => n.api != 'fnNetProfitPercentage'),
            netProfitPercentageVal: 0,
            isLoadingData: _.union(isLoadingData, ['fnNetProfitPercentage'])
        };
    }),
    on(FinanceApiActions.fnNetProfitPercentageSuccess,
        (state, { value }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                errors: _.filter(errors, (n) => n.api != 'fnNetProfitPercentage'),
                netProfitPercentageVal: value,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnNetProfitPercentage')
            };
        }
    ),
    on(FinanceApiActions.fnNetProfitPercentageFailure,
        (state, { error }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                netProfitPercentageVal: null,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnNetProfitPercentage'),
                errors: [...errors, { ...error, api: 'fnNetProfitPercentage' }]
            };
        }
    ),
    on(FinancePageActions.loadFnExpenses, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
          ...state,
          errors: _.filter(errors, (n) => n.api != 'fnExpenses'),
          expensesData: [],
          expenseProduction: 0,
          isLoadingData: _.union(isLoadingData, ['fnExpenses'])
      };
    }),
    on(FinanceApiActions.fnExpensesSuccess,
        (state, { expensesData, production }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                errors: _.filter(errors, (n) => n.api != 'fnExpenses'),
                expensesData: expensesData,
                expenseProduction: production,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnExpenses')
            };
        }
    ),
    on(FinanceApiActions.fnExpensesFailure,
        (state, { error }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                expensesData: [],
                expenseProduction: 0,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnExpenses'),
                errors: [...errors, { ...error, api: 'fnExpenses' }]
            };
        }
    ),
    // FnProductionByClinician API
    on(FinancePageActions.loadFnProductionByClinician, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
          ...state,
          errors: _.filter(errors, (n) => n.api != 'fnProductionByClinician'),
          productionChartData: [],
          prodByClinicianTotal: 0,
          isLoadingData: _.union(isLoadingData, ['fnProductionByClinician'])
      };
    }),
    on(FinanceApiActions.fnProductionByClinicianSuccess,
        (state, { productionChartData, prodByClinicianTotal }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                errors: _.filter(errors, (n) => n.api != 'fnProductionByClinician'),
                productionChartData: productionChartData,
                prodByClinicianTotal: prodByClinicianTotal,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnProductionByClinician')
            };
        }
    ),
    on(FinanceApiActions.fnProductionByClinicianFailure,
        (state, { error }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                productionChartData: [],
                prodByClinicianTotal: 0,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnProductionByClinician'),
                errors: [...errors, { ...error, api: 'fnProductionByClinician' }]
            };
        }
    ),    
    // FnProductionPerVisit API
    on(FinancePageActions.loadFnProductionPerVisit, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
          ...state,
          errors: _.filter(errors, (n) => n.api != 'fnProductionPerVisit'),
          prodPerVisitData: [],
          prodPerVisitTotal: 0,
          prodPerVisitTrendTotal: 0,
          isLoadingData: _.union(isLoadingData, ['fnProductionPerVisit'])
      };
    }),
    on(FinanceApiActions.fnProductionPerVisitSuccess,
        (state, { prodPerVisitData, prodPerVisitTotal, prodPerVisitTrendTotal }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                errors: _.filter(errors, (n) => n.api != 'fnProductionPerVisit'),
                prodPerVisitData: prodPerVisitData,
                prodPerVisitTotal: prodPerVisitTotal,
                prodPerVisitTrendTotal: prodPerVisitTrendTotal,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnProductionPerVisit')
            };
        }
    ),
    on(FinanceApiActions.fnProductionPerVisitFailure,
        (state, { error }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                prodPerVisitData: [],
                prodPerVisitTotal: 0,
                prodPerVisitTrendTotal: 0,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnProductionPerVisit'),
                errors: [...errors, { ...error, api: 'fnProductionPerVisit' }]
            };
        }
    ),    
    // FnTotalDiscounts API
    on(FinancePageActions.loadFnTotalDiscounts, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
          ...state,
          errors: _.filter(errors, (n) => n.api != 'fnTotalDiscounts'),
          totalDiscountChartData: [],
          totalDiscountTotal: 0,
          totalDiscountTrendTotal: 0,
          isLoadingData: _.union(isLoadingData, ['fnTotalDiscounts'])
      };
    }),
    on(FinanceApiActions.fnTotalDiscountsSuccess,
        (state, { totalDiscountChartData, totalDiscountTotal, totalDiscountTrendTotal }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                errors: _.filter(errors, (n) => n.api != 'fnTotalDiscounts'),
                totalDiscountChartData,
                totalDiscountTotal,
                totalDiscountTrendTotal,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnTotalDiscounts')
            };
        }
    ),
    on(FinanceApiActions.fnTotalDiscountsFailure,
        (state, { error }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                totalDiscountChartData: [],
                totalDiscountTotal: 0,
                totalDiscountTrendTotal: 0,
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnTotalDiscounts'),
                errors: [...errors, { ...error, api: 'fnTotalDiscounts' }]
            };
        }
    ),    
  )
});

export const { 
    selectErrors, 
    selectIsLoadingData, 
    selectNetProfitProductionVal,
    selectProductionTrendVal,
    selectNetProfitVal,
    selectNetProfitPercentageVal,
    selectExpensesData,
    selectExpenseProduction,
    selectProductionChartData,
    selectTotalProdChartData,
    selectCollectionChartData,
    selectCollectionVal,
    selectCollectionTrendVal,
    selectProdByClinicianTotal,
    selectProdByClinicianTrendTotal,
    selectProdPerVisitData,
    selectProdPerVisitTotal,
    selectProdPerVisitTrendTotal,
    selectTotalDiscountChartData,
    selectTotalDiscountTotal,
    selectTotalDiscountTrendTotal
} = financeFeature;

export const selectFnTotalProductionError = createSelector(
  selectErrors,
  (errors): JeeveError | undefined =>
    _.find(errors, (e) => e.api == 'fnTotalProduction')
);

export const selectFnNetProfitError = createSelector(
    selectErrors,
    (errors): JeeveError | undefined =>
      _.find(errors, (e) => e.api == 'fnNetProfit')
);

export const selectIsLoadingNetProfitProduction = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'fnTotalProduction') >= 0
)

export const selectIsLoadingCollection = createSelector(
  selectIsLoadingData,
  (loadingData) => _.findIndex(loadingData, (l) => l == 'fnTotalCollection') >= 0
)

export const selectIsLoadingNetProfit = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'fnNetProfit') >= 0
)

export const selectIsLoadingNetProfitPercentage = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'fnNetProfitPercentage') >= 0
)

export const selectIsLoadingFnExpenses= createSelector(
  selectIsLoadingData,
  (loadingData) => _.findIndex(loadingData, (l) => l == 'fnExpenses') >= 0
)

export const selectIsLoadingFnProdPerVisit= createSelector(
  selectIsLoadingData,
  (loadingData) => _.findIndex(loadingData, (l) => l == 'fnProductionPerVisit') >= 0
)

export const selectIsLoadingFnProdPerClinic= createSelector(
  selectIsLoadingData,
  (loadingData) => _.findIndex(loadingData, (l) => l == 'fnProductionByClinician') >= 0
)

export const selectIsLoadingFnTotalDiscount= createSelector(
  selectIsLoadingData,
  (loadingData) => _.findIndex(loadingData, (l) => l == 'fnTotalDiscounts') >= 0
)