import { API_ENDPOINTS, ChartTip } from '../../../models/dashboard';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { DashboardApiActions, DashboardPageActions } from '../actions';
import { JeeveError } from '../actions/dashboard-api.actions';
import * as _ from 'lodash';

export interface DashboardState {
  isLoadingData: Array<API_ENDPOINTS>;
  chartTips: ChartTip[] | null;

  errors: Array<JeeveError>;
}

const initialState: DashboardState = {
  isLoadingData: [],
  chartTips: null,
  errors: []
};

export const dashboardFeature = createFeature({
  name: 'dashboard',
  reducer: createReducer(
    initialState,
    on(DashboardPageActions.loadChartTips, (state, {}): DashboardState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, (n) => n.api != 'ctGetPageTips'),
        chartTips: null,
        isLoadingData: _.union(isLoadingData, ['ctGetPageTips'])
      };
    }),
    on(
      DashboardApiActions.loadChartTipsSuccess,
      (state, { chartData }): DashboardState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != 'ctGetPageTips'),
          chartTips: chartData,
          isLoadingData: _.filter(isLoadingData, (n) => n != 'ctGetPageTips')
        };
      }
    ),
    on(
      DashboardApiActions.loadChartTipsFailure,
      (state, { error }): DashboardState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          chartTips: null,
          isLoadingData: _.filter(isLoadingData, (n) => n != 'ctGetPageTips'),
          errors: [...errors, { ...error, api: 'ctGetPageTips' }]
        };
      }
    )
  )
});

export const { selectErrors, selectIsLoadingData, selectChartTips } =
  dashboardFeature;

export const selectChartTipsError = createSelector(
  selectErrors,
  (errors): JeeveError | undefined =>
    _.find(errors, (e) => e.api == 'ctGetPageTips')
);
