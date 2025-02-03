import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import _ from 'lodash';
import { JeeveError } from '@/newapp/models';
import { FinanceApiActions, FinancePageActions } from '../actions';
import {
  FnTotalDiscountItem,
  FnExpensesDataItem,
  FnProductionByClinicianItem,
  FnProductionPerVisitItem,
  FnTotalProductionItem,
  FnTotalCollectionItem,
  FnNetProfitTrendItem,
  FnNetProfitPercentTrendItem,
  FnProdByClinicianTrendItem,
  FnExpensesApiResponse,
  FnProductionPerDayItem,
} from '@/newapp/models/dashboard/finance';
import { selectTrend } from '@/newapp/layout/state/reducers/layout.reducer';
import moment from 'moment';
import {
  selectCurrentClinicId,
  selectCurrentClinics,
  selectIsMultiClinicsSelected,
} from '@/newapp/clinic/state/reducers/clinic.reducer';
import { DoughnutChartColors } from '@/newapp/shared/constants';
import camelcaseKeys from 'camelcase-keys';

export interface FinanceState {
  isLoadingData: Array<FinanceEndpoints>;
  errors: Array<JeeveError>;

  resBodyList: Record<FinanceEndpoints, unknown>;

  // FnTotalProduction
  netProfitProductionVal: number;
  prodData: FnTotalProductionItem[];
  // FnTotalProductionTrend
  prodTrendData: FnTotalProductionItem[];
  productionTrendVal: number;
  // FnNetProfit
  netProfitVal: number;
  // FnNetProfitTrend
  netProfitTrendData: FnNetProfitTrendItem[];

  netProfitPercentageVal: number;
  netProfitPercentTrendData: FnNetProfitPercentTrendItem[];

  expensesData: FnExpensesDataItem[];
  fnExpensesData: FnExpensesApiResponse;
  expensesTrendData: FnExpensesDataItem[];
  expensesTrendDurations: string[];
  expenseProduction: number;
  prodByClinicData: FnProductionByClinicianItem[];
  prodByClinicTrendData: FnProdByClinicianTrendItem[];
  prodByClinicianTotal: number;
  prodByClinicianTrendTotal: number;

  prodPerVisitData: FnProductionPerVisitItem[];
  prodPerVisitTrendData: FnProductionPerVisitItem[];
  prodPerVisitTotal: number;
  prodPerVisitTrendTotal: number;
  prodPerVisitChartName: FN_PROD_PER_VISIT_CHART_NAME;

  prodPerDayData: FnProductionPerDayItem[];
  prodPerDayTrendData: FnProductionPerDayItem[];
  prodPerDayTotal: number;
  prodPerDayTrendTotal: number;

  totalDiscountData: FnTotalDiscountItem[];
  totalDiscountTrendData: FnTotalDiscountItem[];
  totalDiscountTotal: number;
  totalDiscountTrendTotal: number;

  // FnTotalCollection
  collectionData: FnTotalCollectionItem[];
  collectionVal: number;
  collectionTrendVal: number;

  // FnTotalCollectionTrend
  collectionTrendData: FnTotalCollectionItem[];

  trendProfitChartName: string;
}

const initialState: FinanceState = {
  isLoadingData: [],
  errors: [],

  resBodyList: null,

  netProfitProductionVal: 0,
  netProfitTrendData: [],
  prodData: [],
  prodTrendData: [],

  netProfitVal: 0,
  productionTrendVal: 0,
  netProfitPercentageVal: 0,
  netProfitPercentTrendData: [],
  expenseProduction: 0,

  fnExpensesData: null,
  expensesData: [],
  expensesTrendData: [],
  expensesTrendDurations: [],

  prodByClinicData: [],
  prodByClinicTrendData: [],
  prodByClinicianTotal: 0,
  prodByClinicianTrendTotal: 0,

  prodPerVisitData: [],
  prodPerVisitTrendData: [],
  prodPerVisitTotal: 0,
  prodPerVisitTrendTotal: 0,
  prodPerVisitChartName: 'Production Per Visit',

  prodPerDayData: [],
  prodPerDayTrendData: [],
  prodPerDayTotal: 0,
  prodPerDayTrendTotal: 0,

  totalDiscountData: [],
  totalDiscountTrendData: [],
  totalDiscountTotal: 0,
  totalDiscountTrendTotal: 0,

  collectionData: [],
  collectionVal: 0,
  collectionTrendVal: 0,

  collectionTrendData: [],

  trendProfitChartName: 'Production',
};

export const financeFeature = createFeature({
  name: 'finance',
  reducer: createReducer(
    initialState,
    // fnHourlyRate, fnHourlyRateTrend
    on(FinancePageActions.loadFnChartDescription, (state, { chartDescription }): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        resBodyList: { ...state.resBodyList, [chartDescription]: null },
        errors: _.filter(errors, n => n.api != chartDescription),
        isLoadingData: _.union(isLoadingData, [chartDescription]),
      };
    }),
    on(
      FinanceApiActions.fnChartDescriptionSuccess,
      (state, { chartDesc, chartDescData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != chartDesc),
          resBodyList: { ...state.resBodyList, [chartDesc]: chartDescData },
          isLoadingData: _.filter(isLoadingData, n => n != chartDesc),
        };
      }
    ),
    on(
      FinanceApiActions.fnChartDescriptionFailure,
      (state, { chartDesc, error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          resBodyList: { ...state.resBodyList, [chartDesc]: null },
          isLoadingData: _.filter(isLoadingData, n => n != chartDesc),
          errors: [...errors, { ...error, api: chartDesc }],
        };
      }
    ),
    on(FinancePageActions.loadFnTotalProduction, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnTotalProduction'),
        netProfitProductionVal: 0,
        prodData: [],
        isLoadingData: _.union(isLoadingData, ['fnTotalProduction']),
      };
    }),
    on(
      FinanceApiActions.fnTotalProductionSuccess,
      (state, { value, trendVal, prodData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnTotalProduction'),
          netProfitProductionVal: value,
          prodData: prodData,
          productionTrendVal: trendVal,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnTotalProduction'),
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
          prodData: [],
          productionTrendVal: 0,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnTotalProduction'),
          errors: [...errors, { ...error, api: 'fnTotalProduction' }],
        };
      }
    ),
    on(FinancePageActions.loadFnTotalCollection, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnTotalCollection'),
        collectionVal: 0,
        collectionData: [],
        collectionTrendVal: 0,
        isLoadingData: _.union(isLoadingData, ['fnTotalCollection']),
      };
    }),
    on(
      FinanceApiActions.fnTotalCollectionSuccess,
      (state, { value, trendVal, collectionData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnTotalCollection'),
          collectionVal: value,
          collectionData: collectionData,
          collectionTrendVal: trendVal,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnTotalCollection'),
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
          collectionData: [],
          collectionTrendVal: 0,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnTotalCollection'),
          errors: [...errors, { ...error, api: 'fnTotalCollection' }],
        };
      }
    ),
    on(FinancePageActions.loadFnNetProfit, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnNetProfit'),
        netProfitVal: 0,
        isLoadingData: _.union(isLoadingData, ['fnNetProfit']),
      };
    }),
    on(
      FinanceApiActions.fnNetProfitSuccess,
      (state, { value }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnNetProfit'),
          netProfitVal: value,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnNetProfit'),
        };
      }
    ),
    on(
      FinanceApiActions.fnNetProfitFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          netProfitVal: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnNetProfit'),
          errors: [...errors, { ...error, api: 'fnNetProfit' }],
        };
      }
    ),
    on(FinancePageActions.loadFnNetProfitPercentage, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnNetProfitPercentage'),
        netProfitPercentageVal: 0,
        isLoadingData: _.union(isLoadingData, ['fnNetProfitPercentage']),
      };
    }),
    on(
      FinanceApiActions.fnNetProfitPercentageSuccess,
      (state, { value }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnNetProfitPercentage'),
          netProfitPercentageVal: value,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnNetProfitPercentage'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnNetProfitPercentageFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          netProfitPercentageVal: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnNetProfitPercentage'
          ),
          errors: [...errors, { ...error, api: 'fnNetProfitPercentage' }],
        };
      }
    ),
    // FnExpenses API
    on(FinancePageActions.loadFnExpenses, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnExpenses'),
        fnExpensesData: null,
        expensesData: [],
        expenseProduction: 0,
        isLoadingData: _.union(isLoadingData, ['fnExpenses']),
      };
    }),
    on(
      FinanceApiActions.fnExpensesSuccess,
      (state, { expensesBodyData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnExpenses'),
          fnExpensesData: expensesBodyData,
          expensesData: expensesBodyData.data,
          expenseProduction: expensesBodyData.production,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnExpenses'),
        };
      }
    ),
    on(
      FinanceApiActions.fnExpensesFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fnExpensesData: null,
          expensesData: [],
          expenseProduction: 0,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnExpenses'),
          errors: [...errors, { ...error, api: 'fnExpenses' }],
        };
      }
    ),
    // FnExpensesTrend API
    on(FinancePageActions.loadFnExpensesTrend, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnExpensesTrend'),
        expensesTrendData: [],
        expensesTrendDurations: [],
        isLoadingData: _.union(isLoadingData, ['fnExpensesTrend']),
      };
    }),
    on(
      FinanceApiActions.fnExpensesTrendSuccess,
      (state, { expensesTrendData, durations }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnExpensesTrend'),
          expensesTrendData: expensesTrendData,
          expensesTrendDurations: durations,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnExpensesTrend'),
        };
      }
    ),
    on(
      FinanceApiActions.fnExpensesTrendFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          expensesTrendData: [],
          expensesTrendDurations: [],
          isLoadingData: _.filter(isLoadingData, n => n != 'fnExpensesTrend'),
          errors: [...errors, { ...error, api: 'fnExpensesTrend' }],
        };
      }
    ),
    // FnProductionByClinician API
    on(
      FinancePageActions.loadFnProductionByClinician,
      (state): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnProductionByClinician'),
          prodByClinicData: [],
          prodByClinicianTotal: 0,
          isLoadingData: _.union(isLoadingData, ['fnProductionByClinician']),
        };
      }
    ),
    on(
      FinanceApiActions.fnProductionByClinicianSuccess,
      (state, { prodByClinicData, prodByClinicianTotal }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnProductionByClinician'),
          prodByClinicData: prodByClinicData,
          prodByClinicianTotal: prodByClinicianTotal,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionByClinician'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnProductionByClinicianFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          prodByClinicData: [],
          prodByClinicianTotal: 0,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionByClinician'
          ),
          errors: [...errors, { ...error, api: 'fnProductionByClinician' }],
        };
      }
    ),
    // FnProdutionByClinicianTrend API
    on(FinancePageActions.loadFnProdByClinicianTrend, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnProductionByClinicianTrend'),
        prodByClinicTrendData: [],
        isLoadingData: _.union(isLoadingData, ['fnProductionByClinicianTrend']),
      };
    }),
    on(
      FinanceApiActions.fnProdByClinicianTrendSuccess,
      (state, { prodByClinicTrendData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(
            errors,
            n => n.api != 'fnProductionByClinicianTrend'
          ),
          prodByClinicTrendData: prodByClinicTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionByClinicianTrend'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnProdByClinicianTrendFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          prodByClinicTrendData: [],
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionByClinicianTrend'
          ),
          errors: [
            ...errors,
            { ...error, api: 'fnProductionByClinicianTrend' },
          ],
        };
      }
    ),
    on(
      FinancePageActions.setProdPerVisitChartName,
      (state, { chartName }): FinanceState => {
        return {
          ...state,
          prodPerVisitChartName: chartName,
        };
      }
    ),
    // FnProductionPerVisit API
    on(FinancePageActions.loadFnProductionPerVisit, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnProductionPerVisit'),
        prodPerVisitData: [],
        prodPerVisitTotal: 0,
        prodPerVisitTrendTotal: 0,
        isLoadingData: _.union(isLoadingData, ['fnProductionPerVisit']),
      };
    }),
    on(
      FinanceApiActions.fnProductionPerVisitSuccess,
      (
        state,
        { prodPerVisitData, prodPerVisitTotal, prodPerVisitTrendTotal }
      ): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnProductionPerVisit'),
          prodPerVisitData: prodPerVisitData,
          prodPerVisitTotal: prodPerVisitTotal,
          prodPerVisitTrendTotal: prodPerVisitTrendTotal,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionPerVisit'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnProductionPerVisitFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          prodPerVisitData: [],
          prodPerVisitTotal: 0,
          prodPerVisitTrendTotal: 0,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionPerVisit'
          ),
          errors: [...errors, { ...error, api: 'fnProductionPerVisit' }],
        };
      }
    ),
    // FnProdutionPerVisitTrend API
    on(FinancePageActions.loadFnProdPerVisitTrend, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnProductionPerVisitTrend'),
        prodPerVisitTrendData: [],
        isLoadingData: _.union(isLoadingData, ['fnProductionPerVisitTrend']),
      };
    }),
    on(
      FinanceApiActions.fnProductionPerVisitTrendSuccess,
      (state, { prodPerVisitTrendData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnProductionPerVisitTrend'),
          prodPerVisitTrendData: prodPerVisitTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionPerVisitTrend'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnProductionPerVisitTrendFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          prodPerVisitTrendData: [],
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionPerVisitTrend'
          ),
          errors: [...errors, { ...error, api: 'fnProductionPerVisitTrend' }],
        };
      }
    ),
    // FnProductionPerDay API
    on(FinancePageActions.loadFnProductionPerDay, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnProductionPerDay'),
        prodPerDayData: [],
        prodPerDayTotal: 0,
        prodPerDayTrendTotal: 0,
        isLoadingData: _.union(isLoadingData, ['fnProductionPerDay']),
      };
    }),
    on(
      FinanceApiActions.fnProductionPerDaySuccess,
      (
        state,
        { prodPerDayData, prodPerDayTotal, prodPerDayTrendTotal }
      ): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnProductionPerDay'),
          prodPerDayData: prodPerDayData,
          prodPerDayTotal: prodPerDayTotal,
          prodPerDayTrendTotal: prodPerDayTrendTotal,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionPerDay'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnProductionPerDayFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          prodPerDayData: [],
          prodPerDayTotal: 0,
          prodPerDayTrendTotal: 0,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionPerDay'
          ),
          errors: [...errors, { ...error, api: 'fnProductionPerDay' }],
        };
      }
    ),
    // FnProdutionPerDayTrend API
    on(FinancePageActions.loadFnProdPerDayTrend, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnProductionPerDayTrend'),
        prodPerDayTrendData: [],
        isLoadingData: _.union(isLoadingData, ['fnProductionPerDayTrend']),
      };
    }),
    on(
      FinanceApiActions.fnProductionPerDayTrendSuccess,
      (state, { prodPerDayTrendData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnProductionPerDayTrend'),
          prodPerDayTrendData: prodPerDayTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionPerDayTrend'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnProductionPerDayTrendFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          prodPerDayTrendData: [],
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnProductionPerDayTrend'
          ),
          errors: [...errors, { ...error, api: 'fnProductionPerDayTrend' }],
        };
      }
    ),
    // FnTotalDiscounts API
    on(FinancePageActions.loadFnTotalDiscounts, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnTotalDiscounts'),
        totalDiscountData: [],
        totalDiscountTotal: 0,
        totalDiscountTrendTotal: 0,
        isLoadingData: _.union(isLoadingData, ['fnTotalDiscounts']),
      };
    }),
    on(
      FinanceApiActions.fnTotalDiscountsSuccess,
      (
        state,
        { totalDiscountData, totalDiscountTotal, totalDiscountTrendTotal }
      ): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnTotalDiscounts'),
          totalDiscountData: totalDiscountData,
          totalDiscountTotal,
          totalDiscountTrendTotal,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnTotalDiscounts'),
        };
      }
    ),
    on(
      FinanceApiActions.fnTotalDiscountsFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          totalDiscountData: [],
          totalDiscountTotal: 0,
          totalDiscountTrendTotal: 0,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnTotalDiscounts'),
          errors: [...errors, { ...error, api: 'fnTotalDiscounts' }],
        };
      }
    ),
    // FnTotalDiscountsTrend API
    on(FinancePageActions.loadFnTotalDiscountsTrend, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnTotalDiscountsTrend'),
        totalDiscountTrendData: [],
        isLoadingData: _.union(isLoadingData, ['fnTotalDiscountsTrend']),
      };
    }),
    on(
      FinanceApiActions.fnTotalDiscountsTrendSuccess,
      (state, { totalDiscountTrendData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnTotalDiscountsTrend'),
          totalDiscountTrendData: totalDiscountTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnTotalDiscountsTrend'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnTotalDiscountsTrendFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          totalDiscountTrendData: [],
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnTotalDiscountsTrend'
          ),
          errors: [...errors, { ...error, api: 'fnTotalDiscountsTrend' }],
        };
      }
    ),
    // FnTotalProductionTrend API
    on(FinancePageActions.loadFnTotalProductionTrend, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnTotalProductionTrend'),
        prodTrendData: [],
        isLoadingData: _.union(isLoadingData, ['fnTotalProductionTrend']),
      };
    }),
    on(
      FinanceApiActions.fnTotalProductionTrendSuccess,
      (state, { prodTrendData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnTotalProductionTrend'),
          prodTrendData: prodTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnTotalProductionTrend'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnTotalProductionTrendFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          prodTrendData: [],
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnTotalProductionTrend'
          ),
          errors: [...errors, { ...error, api: 'fnTotalProductionTrend' }],
        };
      }
    ),
    // FnTotalCollectionTrend API
    on(FinancePageActions.loadFnTotalCollectionTrend, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnTotalCollectionTrend'),
        collectionTrendData: [],
        isLoadingData: _.union(isLoadingData, ['fnTotalCollectionTrend']),
      };
    }),
    on(
      FinanceApiActions.fnTotalCollectionTrendSuccess,
      (state, { collectionTrendData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnTotalCollectionTrend'),
          collectionTrendData: collectionTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnTotalCollectionTrend'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnTotalCollectionTrendFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          collectionTrendData: [],
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnTotalCollectionTrend'
          ),
          errors: [...errors, { ...error, api: 'fnTotalCollectionTrend' }],
        };
      }
    ),
    // FnNetProfitTrend
    on(FinancePageActions.loadFnNetProfitTrend, (state): FinanceState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fnNetProfitTrend'),
        netProfitTrendData: [],
        isLoadingData: _.union(isLoadingData, ['fnNetProfitTrend']),
      };
    }),
    on(
      FinanceApiActions.fnNetProfitTrendSuccess,
      (state, { netProfitTrendData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnNetProfitTrend'),
          netProfitTrendData: netProfitTrendData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fnNetProfitTrend'),
        };
      }
    ),
    on(
      FinanceApiActions.fnNetProfitTrendFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          netProfitTrendData: [],
          isLoadingData: _.filter(isLoadingData, n => n != 'fnNetProfitTrend'),
          errors: [...errors, { ...error, api: 'fnNetProfitTrend' }],
        };
      }
    ),
    // FnNetProfitPercentageTrend
    on(
      FinancePageActions.loadFnNetProfitPercentageTrend,
      (state): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnNetProfitPercentageTrend'),
          netProfitPercentTrendData: [],
          isLoadingData: _.union(isLoadingData, ['fnNetProfitPercentageTrend']),
        };
      }
    ),
    on(
      FinanceApiActions.fnNetProfitPercentTrendSuccess,
      (state, { netProfitPercentTrendData }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fnNetProfitPercentageTrend'),
          netProfitPercentTrendData: netProfitPercentTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnNetProfitPercentageTrend'
          ),
        };
      }
    ),
    on(
      FinanceApiActions.fnNetProfitPercentTrendFailure,
      (state, { error }): FinanceState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          netProfitPercentTrendData: [],
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fnNetProfitPercentageTrend'
          ),
          errors: [...errors, { ...error, api: 'fnNetProfitPercentageTrend' }],
        };
      }
    ),

    on(
      FinancePageActions.setTrendProfitChart,
      (state, { chartName }): FinanceState => {
        return {
          ...state,
          trendProfitChartName: chartName,
        };
      }
    ),
    on(FinancePageActions.setErrors, (state, { errors }): FinanceState => {
      return {
        ...state,
        errors,
      };
    })
  ),
});

export const {
  selectErrors,
  selectResBodyList,
  selectIsLoadingData,
  selectNetProfitProductionVal,
  selectProductionTrendVal,
  selectNetProfitVal,
  selectNetProfitTrendData,
  selectNetProfitPercentageVal,
  selectNetProfitPercentTrendData,
  selectFnExpensesData,
  selectExpensesData,
  selectExpensesTrendData,
  selectExpensesTrendDurations,
  selectExpenseProduction,
  selectProdByClinicData,
  selectProdByClinicTrendData,
  selectProdData,
  selectProdTrendData,
  selectCollectionData,
  selectCollectionTrendData,
  selectCollectionVal,
  selectCollectionTrendVal,
  selectProdByClinicianTotal,
  selectProdByClinicianTrendTotal,
  selectProdPerVisitData,
  selectProdPerVisitTrendData,
  selectProdPerVisitTotal,
  selectProdPerVisitTrendTotal,
  selectProdPerVisitChartName,
  selectProdPerDayData,
  selectProdPerDayTrendData,
  selectProdPerDayTotal,
  selectProdPerDayTrendTotal,
  selectTotalDiscountData,
  selectTotalDiscountTrendData,
  selectTotalDiscountTotal,
  selectTotalDiscountTrendTotal,
  selectTrendProfitChartName,
  
} = financeFeature;

export const selectIsLoadingChartDesc = (chartDesc: FinanceEndpoints) => {
  return createSelector(
    selectIsLoadingData,
    loadingData => _.findIndex(loadingData, l => l == chartDesc) >= 0
  );
}

export const selectFnTotalProductionError = createSelector(
  selectErrors,
  (errors): JeeveError | undefined =>
    _.find(errors, e => e.api == 'fnTotalProduction')
);

export const selectFnNetProfitError = createSelector(
  selectErrors,
  (errors): JeeveError | undefined =>
    _.find(errors, e => e.api == 'fnNetProfit')
);

export const selectIsLoadingTotalProduction = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fnTotalProduction') >= 0
);

export const selectIsLoadingTotalProductionTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fnTotalProductionTrend') >= 0
);

export const selectIsLoadingCollection = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fnTotalCollection') >= 0
);

export const selectIsLoadingCollectionTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fnTotalCollectionTrend') >= 0
);

export const selectIsLoadingNetProfit = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fnNetProfit') >= 0
);

export const selectIsLoadingNetProfitTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fnNetProfitTrend') >= 0
);

export const selectIsLoadingNetProfitPercentage = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fnNetProfitPercentage') >= 0
);

export const selectIsLoadingNetProfitPercentTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fnNetProfitPercentageTrend') >= 0
);

export const selectIsLoadingFnExpenses = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fnExpenses') >= 0
);

export const selectIsLoadingFnExpensesTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fnExpensesTrend') >= 0
);

export const selectIsLoadingFnProdPerVisit = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fnProductionPerVisit') >= 0
);

export const selectIsLoadingFnProdPerVisitTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fnProductionPerVisitTrend') >= 0
);

export const selectIsLoadingFnProdPerDay = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fnProductionPerDay') >= 0
);

export const selectIsLoadingFnProdPerDayTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fnProductionPerDayTrend') >= 0
);


export const selectIsLoadingFnProdPerClinic = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fnProductionByClinician') >= 0
);

export const selectIsLoadingFnProdPerClinicTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fnProductionByClinicianTrend') >= 0
);

export const selectIsLoadingFnTotalDiscount = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fnTotalDiscounts') >= 0
);

export const selectIsLoadingFnTotalDiscountTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fnTotalDiscountsTrend') >= 0
);

export const selectNetProfitPercentTrendChartData = createSelector(
  selectNetProfitPercentTrendData,
  selectTrend,
  selectCurrentClinicId,
  (netPrifitPercentTrendData, trendMode, clinicId) => {
    if (typeof clinicId === 'string') {
      return _.chain(netPrifitPercentTrendData)
        .groupBy(trendMode == 'current' ? 'yearMonth' : 'year')
        .map((values, duration) => {
          const sumNetProfit = _.sumBy(values, v =>
            parseFloat(<string>v.netProfit ?? '0')
          );
          const sumCollection = _.sumBy(values, v =>
            parseFloat(<string>v.collection ?? '0')
          );
          return {
            label:
              trendMode == 'current'
                ? moment(duration).format('MMM YYYY')
                : duration,
            value: _.round((sumNetProfit / sumCollection) * 100),
          };
        })
        .value();
    } else {
      return netPrifitPercentTrendData.map(v => {
        return {
          label:
            trendMode == 'current'
              ? moment(v.yearMonth).format('MMM YYYY')
              : v.year,
          value: _.round(parseFloat(<string>v.netProfitPercent ?? '0')),
        };
      });
    }
  }
);

export const selectProdTrendChartData = createSelector(
  selectProdTrendData,
  selectTrend,
  selectCurrentClinicId,
  (prodTrendData, trendMode, clinicId) => {
    if (typeof clinicId === 'string') {
      let i = 0;
      const chartDataset = _.chain(prodTrendData)
        .groupBy('clinicId')
        .map((values, clinicId) => {
          const item = {
            label: values[0].clinicName,
            data: values.map(v =>
              Math.round(parseFloat(<string>v.production ?? '0'))
            ),
            backgroundColor: DoughnutChartColors[i],
            hoverBackgroundColor: DoughnutChartColors[i],
          };
          i++;
          return item;
        })
        .value();
      return {
        datasets: chartDataset,
        labels: _.chain(prodTrendData)
          .sortBy('year')
          .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
          .map((values, duration) =>
            trendMode == 'current'
              ? moment(duration).format('MMM YYYY')
              : duration
          )
          .value(),
      };
    } else {
      return _.chain(prodTrendData)
        .sortBy('year')
        .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
        .map((values, duration) => {
          const sumProd = _.sumBy(values, v =>
            _.round(parseFloat(<string>v.production ?? '0'))
          );
          return {
            label:
              trendMode == 'current'
                ? moment(duration).format('MMM YYYY')
                : duration,
            value: sumProd,
          };
        })
        .value();
    }
  }
);

export const selectCollectionTrendChartData = createSelector(
  selectCollectionTrendData,
  selectTrend,
  selectCurrentClinicId,
  (collectionTrendData, trendMode, clinicId) => {
    if (typeof clinicId === 'string') {
      let i = 0;
      const chartDataset = _.chain(collectionTrendData)
        .groupBy('clinicId')
        .map((values, clinicId) => {
          const item = {
            label: values[0].clinicName,
            data: values.map(v =>
              Math.round(parseFloat(<string>v.collection ?? '0'))
            ),
            backgroundColor: DoughnutChartColors[i],
            hoverBackgroundColor: DoughnutChartColors[i],
          };
          i++;
          return item;
        })
        .value();
      return {
        datasets: chartDataset,
        labels: _.chain(collectionTrendData)
          .sortBy('year')
          .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
          .map((values, duration) =>
            trendMode == 'current'
              ? moment(duration).format('MMM YYYY')
              : duration
          )
          .value(),
      };
    } else {
      return _.chain(collectionTrendData)
        .sortBy('year')
        .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
        .map((values, duration) => {
          const sumCollection = _.sumBy(values, v =>
            _.round(parseFloat(<string>v.collection ?? '0'))
          );
          return {
            label:
              trendMode == 'current'
                ? moment(duration).format('MMM YYYY')
                : duration,
            value: sumCollection,
          };
        })
        .value();
    }
  }
);

export const selectProductionCollectionTrendChartData = createSelector(
  selectProdTrendData,
  selectCollectionTrendData,
  selectTrend,
  (prodData, collData, trendMode) => {
    const totalProductionCollection = [
        { data: [], label: 'Production' },
        { data: [], label: 'Collection' },
      ],
      chartLabels = [];

    if (!trendMode && trendMode == 'off') {
      return {
        datasets: [],
        labels: [],
      };
    }
    _.chain(prodData)
      .sortBy('yearMonth')
      .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
      .map((values, duration) => {
        const sumProd = _.sumBy(values, v =>
          _.round(parseFloat(<string>v.production ?? '0'))
        );
        return {
          label:
            trendMode == 'current'
              ? moment(duration).format('MMM YYYY')
              : duration,
          value: _.round(sumProd),
        };
      })
      .value()
      .forEach(item => {
        totalProductionCollection[0].data.push(item.value);
        chartLabels.push(item.label);
      });

    const collChartData = _.chain(collData)
      .sortBy('yearMonth')
      .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
      .map((values, duration) => {
        const sumColl = _.sumBy(values, v =>
          _.round(parseFloat(<string>v.collection ?? '0'))
        );
        return {
          label:
            trendMode == 'current'
              ? moment(duration).format('MMM YYYY')
              : duration,
          value: _.round(sumColl),
        };
      })
      .value();

    chartLabels.forEach(dur => {
      const itemValue = collChartData.find(item => item.label == dur);
      totalProductionCollection[1].data.push(itemValue ? itemValue.value : 0);
    });
    return {
      datasets: totalProductionCollection,
      labels: chartLabels,
    };
  }
);

export const selectNetProfitTrendChartData = createSelector(
  selectNetProfitTrendData,
  selectTrend,
  selectCurrentClinicId,
  (netProfitTrendData, trendMode, clinicId) => {
    if (typeof clinicId === 'string') {
      const chartData = [],
        chartLabels = [];
      _.chain(netProfitTrendData)
        .groupBy(trendMode == 'current' ? 'yearMonth' : 'year')
        .map((values, duration) => {
          const sumNetProfit = _.sumBy(values, v =>
            parseFloat(<string>v.netProfit ?? '0')
          );
          return {
            label:
              trendMode == 'current'
                ? moment(duration).format('MMM YYYY')
                : duration,
            value: sumNetProfit,
          };
        })
        .value()
        .forEach((values, index) => {
          chartData.push(values.value);
          chartLabels.push(values.label);
        });

      let chartDataset: any = [{ label: 'Total', data: chartData }];

      return { datasets: chartDataset, labels: chartLabels };
    } else {
      return netProfitTrendData.map(val => {
        return {
          label:
            trendMode == 'current'
              ? moment(val.yearMonth).format('MMM YYYY')
              : val.year,
          value: _.round(parseFloat(<string>val.netProfit ?? '0')),
        };
      });
    }
  }
);

export const selectIsLoadingFnProdPerVisitOrDayTrend = createSelector(
  selectIsLoadingFnProdPerVisitTrend,
  selectIsLoadingFnProdPerDayTrend,
  selectProdPerVisitChartName,
  (isLoadingProdPerVisitTrend, isLoadingProdPerDayTrend, chartName) => {
    return chartName === 'Production Per Day'? isLoadingProdPerDayTrend: isLoadingProdPerVisitTrend;
  }
);

export const selectProdPerVisitTrendChartData = createSelector(
  selectProdPerVisitTrendData,
  selectProdPerDayTrendData,
  selectProdPerVisitChartName,
  selectTrend,
  (prodPerVisitTrendData, prodPerDayTrendData, chartName, trendMode) => {
    if(chartName === 'Production Per Day'){
      return _.chain(prodPerDayTrendData)
      .sortBy('yearMonth')
      .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
      .map((values, duration) => {
        const sumProd = _.sumBy(values, v =>
          _.round(parseFloat(<string>v.production ?? '0'))
        );
        const sumDays = _.sumBy(values, v =>
          _.round(parseFloat(<string>v.workingDays ?? '0'))
        );

        const sumProdPerDays = _.sumBy(values, v =>
          _.round(parseFloat(<string>v.prodPerDay ?? '0'))
        );

        return {
          label:
            trendMode == 'current'
              ? moment(duration).format('MMM YYYY')
              : duration,
          value: _.round(sumProd / sumDays),
          prod: sumProd,
          numTotal: sumDays,
          prodPerDays: sumProdPerDays,
        };
      })
      .value();
    }
    return _.chain(prodPerVisitTrendData)
      .sortBy('yearMonth')
      .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
      .map((values, duration) => {
        const sumProd = _.sumBy(values, v =>
          _.round(parseFloat(<string>v.production ?? '0'))
        );
        const sumVisits = _.sumBy(values, v =>
          _.round(parseFloat(<string>v.numVisits ?? '0'))
        );

        const sumProdPerVisits = _.sumBy(values, v =>
          _.round(parseFloat(<string>v.prodPerVisit ?? '0'))
        );

        return {
          label:
            trendMode == 'current'
              ? moment(duration).format('MMM YYYY')
              : duration,
          value: _.round(sumProd / sumVisits),
          prod: sumProd,
          numTotal: sumVisits,
          prodPerVisits: sumProdPerVisits,
        };
      })
      .value();
  }
);

export const selectIsLoadingFnProdPerVisitOrDay = createSelector(
  selectIsLoadingFnProdPerVisit,
  selectIsLoadingFnProdPerDay,
  selectProdPerVisitChartName,
  (isLoadingProdPerVisit, isLoadingProdPerDay, chartName) => {
    return chartName === 'Production Per Day'? isLoadingProdPerDay: isLoadingProdPerVisit;
  }
);

export const selectProdPerVisitChartData = createSelector(
  selectProdPerVisitTotal,
  selectProdPerVisitTrendTotal,
  selectProdPerVisitData,

  selectProdPerDayTotal,
  selectProdPerDayTrendTotal,
  selectProdPerDayData,

  selectProdPerVisitChartName,
  (val, trendVal, visitData, dayVal, dayTrendVal, dayData, chartName) => {
    let _val: number, _trendVal: number, chartData: any;
    const isPerDay = chartName === 'Production Per Day';
    if(isPerDay){
      _val = dayVal;
      _trendVal = dayTrendVal;
      chartData = dayData;
    }else{
      _val = val;
      _trendVal = trendVal;
      chartData = visitData;
    }
    const chartLabels = [];
    const datasets = [
      {
        data: [],
        label: '',
        shadowOffsetX: 3,
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
      },
    ];

    chartData?.forEach((d: (FnProductionPerDayItem & {numTotal: string | number}) | (FnProductionPerVisitItem & {numTotal: string | number})) => {
      const v = <string>(isPerDay?(<FnProductionPerDayItem>d).prodPerDay:(<FnProductionPerVisitItem>d).prodPerVisit);
      datasets[0].data.push(
        Math.round(parseFloat(v ?? '0'))
      );
      chartLabels.push(d.clinicName);
      d.numTotal = isPerDay?(<FnProductionPerDayItem>d).workingDays:(<FnProductionPerVisitItem>d).numVisits;
    });

    return {
      productionVisitVal: Math.round(_val),
      productionVisitTrendVal: Math.round(_trendVal),
      chartLabels,
      chartData: isPerDay?<Array<FnProductionPerDayItem & {numTotal: string | number}>>chartData:<Array<FnProductionPerVisitItem & {numTotal: string | number}>>chartData,
      datasets
    }
  }
);

export const selectExpensesTrendChartData = createSelector(
  selectCurrentClinics,
  selectExpensesTrendData,
  selectExpensesTrendDurations,
  selectTrend,
  (currentClinics, expensesTrendData, expensesTrendDurations, trendMode) =>
    _.chain(expensesTrendData)
      .groupBy(currentClinics.length > 1 ? 'clinicName' : 'accountName')
      .map((values, name) => {
        const data = _.chain(values)
          .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
          .map((subValues, duration) => {
            return {
              duration,
              expense: _.sumBy(subValues, v => v.expense),
            };
          })
          .value();

        return {
          values: expensesTrendDurations.map(dur => {
            const item = data.find(d => d.duration == dur);
            return !!item ? Math.round(item.expense) : 0;
          }),
          label: name,
        };
      })
      .value()
);

export const selectTotalDiscountTrendChartData = createSelector(
  selectTotalDiscountTrendData,
  selectTrend,
  selectCurrentClinicId,
  (trendData, trendMode, clinicId) => {
    if (typeof clinicId === 'string') {
      let chartDataset = [],
        labels = [];
      let i = 0;
      _.chain(trendData)
        .groupBy('clinicId')
        .map((values, cId) => {
          return values;
        })
        .value()
        .forEach(values => {
          const chartData = values.map(v =>
            _.round(parseFloat(<string>v.discounts ?? '0'))
          );
          chartDataset.push({
            data: _.sum(chartData) > 0 ? chartData : [],
            label: values[0].clinicName,
            backgroundColor: DoughnutChartColors[i],
            hoverBackgroundColor: DoughnutChartColors[i],
          });

          if (i == 0) {
            labels = values.map(v =>
              trendMode == 'current'
                ? moment(v.yearMonth).format('MMM YYYY')
                : v.year
            );
          }
          i++;
        });
      return {
        datasets: chartDataset,
        labels: labels,
      };
    } else {
      const chartData = [],
        labels = [];
      trendData.forEach(res => {
        const discount = parseFloat(<string>res.discounts ?? '0');

        chartData.push(discount);
        labels.push(
          trendMode == 'current'
            ? moment(res.yearMonth).format('MMM YYYY')
            : res.year
        );
      });
      return {
        data: chartData,
        labels: labels,
      };
    }
  }
);

export const selectProdByClinicianTrendChartData = createSelector(
  selectProdByClinicTrendData,
  selectTrend,
  // selectCurrentClinicId,
  selectCurrentClinics,
  (prodByClinicTrendData, trendMode, clinics) => {
    const chartDataset = [],
      labels = [];
    _.chain(prodByClinicTrendData)
      .sortBy('duration')
      .value()
      .forEach(value => {
        let sumProd = 0;
        let newVal = [];
        if (clinics.length > 1) {
          sumProd = _.sumBy(value.val, v => parseFloat(v.production));
          newVal = clinics.map(c => {
            const val = value.val.find(
              v => parseInt(<string>v.clinicId) == c.id
            );
            if (val) {
              return val;
            } else {
              return {
                production: 0,
                clinicName: c.clinicName,
                clinicId: c.id,
              };
            }
          });
        } else {
          newVal = value.val;
        }

        newVal.forEach((result, key) => {
          let production = 0,
            total = 0;
          if (clinics.length > 1) {
            production = parseFloat(result.production);
          } else {
            production = parseFloat(result.prodPerClinician);
          }
          if (production > 0) {
            total = production;
          }

          if (chartDataset[key] === undefined) {
            chartDataset[key] = { data: [], label: '' };
          }

          if (clinics.length > 1) {
            chartDataset[key].data.push((total / sumProd) * 100);
            chartDataset[key].label = result.clinicName;
          } else {
            chartDataset[key].data.push(total);
            chartDataset[key].label = result.providerName;
          }
          chartDataset[key].backgroundColor = DoughnutChartColors[key];
          chartDataset[key].hoverBackgroundColor = DoughnutChartColors[key];
        });
        labels.push(
          trendMode == 'current'
            ? moment(value.duration).format('MMM YYYY')
            : value.duration
        );
      });
    return {
      datasets: chartDataset,
      labels: labels,
    };
  }
);

export const selectIsLoadingAllData = createSelector(
  selectIsLoadingNetProfit,
  selectIsLoadingNetProfitPercentage,
  selectIsLoadingFnExpenses,
  selectIsLoadingTotalProduction,
  selectIsLoadingFnProdPerClinic,
  selectIsLoadingFnProdPerVisit,
  selectIsLoadingFnTotalDiscount,
  selectIsLoadingCollection,
  (s1, s2, s3, s4, s5, s6, s7, s8) => {
    return s1 || s2 || s3 || s4 || s5 || s6 || s7 || s8;
  }
);

export const selectIsLoadingAllTrendData = createSelector(
  selectIsLoadingNetProfitTrend,
  selectIsLoadingNetProfitPercentTrend,
  selectIsLoadingFnExpensesTrend,
  selectIsLoadingTotalProductionTrend,
  selectIsLoadingFnProdPerClinicTrend,
  selectIsLoadingFnProdPerVisitTrend,
  selectIsLoadingFnTotalDiscountTrend,
  selectIsLoadingCollectionTrend,
  (s1, s2, s3, s4, s5, s6, s7, s8) => {
    return s1 || s2 || s3 || s4 || s5 || s6 || s7 || s8;
  }
);

export const selectHourlyRateChartData = createSelector(
  selectResBodyList,
  selectTrend,
  selectIsMultiClinicsSelected,
  (body, trend, isMultiClinics) => {
    if(!body) {
      return null;
    }
    const data: CaHourlyRateApiResponse = <any>camelcaseKeys(
      body[trend === 'off'?'fnHourlyRate':'fnHourlyRateTrend'], {deep: true});
    if(!data){
      return null;
    }
    const chartLabels = [];

    if(trend === 'off'){
      const datasets: any = [
        {
          data: [],
          label: '',
          shadowOffsetX: 3,
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
        },
      ];
  
      if(isMultiClinics){
        _(data?.data).groupBy('clinicName')
        .map((values, name) => {
          return {
            values: values.map(v => Number(v.hourlyRate)),
            label: name
          }
        }).value().
        forEach(({values, label}, i) => {
          chartLabels.push(label);
          datasets[0].data.push(
            Math.round(_.sumBy(values))
          );
        });
      }
  
      return {
        curr: Math.round(data.total),
        prev: Math.round(data.totalTa),
        chartLabels,
        datasets
      }
    }else{
      const datasets = [
        {
          data: [],
          label: '',
        },
      ];
      _.chain(data.data)
      .sortBy('yearMonth')
      .groupBy(trend === 'current' ? 'yearMonth' : 'year')
      .map((values, duration) => {
        const sumHourlyRate = _.sumBy(values, v =>
          _.round(parseFloat(<string>v.hourlyRate ?? '0'))
        );

        return {
          label:
            trend == 'current'
              ? moment(duration).format('MMM YYYY')
              : duration,
          value: sumHourlyRate,
        };
      })
      .value().forEach(v => {
        chartLabels.push(v.label);
        datasets[0].data.push(v.value);
      });
      return {
        datasets,
        chartLabels
      }   
    }
  }
);