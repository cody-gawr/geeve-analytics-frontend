import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as _ from 'lodash';
import { JeeveError } from '@/newapp/models';
import { FinanceApiActions, FinancePageActions } from '../actions';
import { ExpensesDataItem } from '@/newapp/models/dashboard';

export interface FinanceState {
  isLoadingData: Array<
  'fnTotalProduction' | 
  'fnNetProfit' | 
  'fnNetProfitPercentage' |
  'fnExpenses'>;
  netProfitProductionVal: number;
  netProfitVal: number;
  netProfitPercentageVal: number;
  errors: Array<JeeveError>;
  expensesData: ExpensesDataItem[]
}

const initialState: FinanceState = {
  isLoadingData: [
    'fnTotalProduction', 'fnNetProfit', 
    'fnNetProfitPercentage', 'fnExpenses'],
  netProfitProductionVal: 0,
  netProfitVal: 0,
  netProfitPercentageVal: 0,
  errors: [],
  expensesData: []
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
        isLoadingData: _.union(isLoadingData, ['fnTotalProduction'])
      };
    }),
    on(
      FinanceApiActions.fnTotalProductionSuccess,
      (state, { value }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != 'fnTotalProduction'),
          netProfitProductionVal: value,
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
          isLoadingData: _.filter(isLoadingData, (n) => n != 'fnTotalProduction'),
          errors: [...errors, { ...error, api: 'fnTotalProduction' }]
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
          isLoadingData: _.union(isLoadingData, ['fnExpenses'])
      };
    }),
    on(FinanceApiActions.fnExpensesSuccess,
        (state, { expensesData }): FinanceState => {
            const { isLoadingData, errors } = state;
            return {
                ...state,
                errors: _.filter(errors, (n) => n.api != 'fnExpenses'),
                expensesData: expensesData,
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
                isLoadingData: _.filter(isLoadingData, (n) => n != 'fnExpenses'),
                errors: [...errors, { ...error, api: 'fnExpenses' }]
            };
        }
    ),    
  )
});

export const { 
    selectErrors, 
    selectIsLoadingData, 
    selectNetProfitProductionVal,
    selectNetProfitVal,
    selectNetProfitPercentageVal,
    selectExpensesData
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

export const selectIsLoadingNetProfit = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'fnNetProfit') >= 0
)

export const selectIsLoadingNetProfitPercentage = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'fnNetProfitPercentage') >= 0
)
