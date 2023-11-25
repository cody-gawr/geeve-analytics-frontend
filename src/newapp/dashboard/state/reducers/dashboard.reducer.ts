import { ChartTip } from '../../../models/dashboard/finance';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { DashboardApiActions, DashboardPageActions } from '../actions';
import _ from 'lodash';
import { JeeveError } from '@/newapp/models';

export interface DashboardState {
  isLoadingData: Array<API_ENDPOINTS>;
  chartTips: { [key: number]: ChartTip } | null;
  connectedWith: CONNECT_WITH_PLATFORM;
  connectedClinicId: number;
  errors: Array<JeeveError>;
}

const initialState: DashboardState = {
  isLoadingData: [],
  chartTips: null,
  errors: [],
  connectedWith: null,
  connectedClinicId: null,
};

export const dashboardFeature = createFeature({
  name: 'dashboard',
  reducer: createReducer(
    initialState,
    on(DashboardPageActions.loadChartTips, (state, {}): DashboardState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'ctGetPageTips'),
        chartTips: null,
        isLoadingData: _.union(isLoadingData, ['ctGetPageTips']),
      };
    }),
    on(
      DashboardApiActions.loadChartTipsSuccess,
      (state, { chartData }): DashboardState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'ctGetPageTips'),
          chartTips: chartData,
          isLoadingData: _.filter(isLoadingData, n => n != 'ctGetPageTips'),
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
          isLoadingData: _.filter(isLoadingData, n => n != 'ctGetPageTips'),
          errors: [...errors, { ...error, api: 'ctGetPageTips' }],
        };
      }
    ),
    on(
      DashboardPageActions.loadClinicAccountingPlatform,
      (state, {}): DashboardState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'clinicGetAccountingPlatform'),
          connectedWith: null,
          isLoadingData: _.union(isLoadingData, [
            'clinicGetAccountingPlatform',
          ]),
        };
      }
    ),
    on(
      DashboardApiActions.clinicAccountingPlatformSuccess,
      (state, { connectWith, clinicId }): DashboardState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'clinicGetAccountingPlatform'),
          connectedWith: connectWith,
          connectedClinicId: clinicId,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'clinicGetAccountingPlatform'
          ),
        };
      }
    ),
    on(
      DashboardApiActions.clinicAccountingPlatformFailure,
      (state, { error }): DashboardState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          connectedWith: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'clinicGetAccountingPlatform'
          ),
          errors: [...errors, { ...error, api: 'clinicGetAccountingPlatform' }],
        };
      }
    ),
    on(
      DashboardPageActions.setConnectedClinicId,
      (state, { clinicId }): DashboardState => {
        return {
          ...state,
          connectedClinicId: clinicId,
        };
      }
    )
  ),
});

export const {
  selectErrors,
  selectIsLoadingData,
  selectChartTips,
  selectConnectedWith,
  selectConnectedClinicId,
} = dashboardFeature;

export const selectIsLoadingClinicAccountingPlatform = createSelector(
  selectIsLoadingData,
  isLoadingData =>
    _.findIndex(isLoadingData, l => l == 'clinicGetAccountingPlatform') >= 0
);

export const selectChartTipsError = createSelector(
  selectErrors,
  (errors): JeeveError | undefined =>
    _.find(errors, e => e.api == 'ctGetPageTips')
);

export const selectIsConnectedWith = createSelector(
  selectConnectedWith,
  connectWith => {
    return connectWith && connectWith !== 'none';
  }
);
