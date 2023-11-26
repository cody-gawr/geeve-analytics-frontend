import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { FollowupsActions } from '../actions';
import _ from 'lodash';

export interface FollowupsState {
  isLoadingData: Array<FU_API_ENDPOINTS>;
  errors: Array<JeeveError>;

  resBodyList: Record<FU_API_ENDPOINTS, unknown> | {};
}

const initiateState: FollowupsState = {
  isLoadingData: [],
  errors: [],

  resBodyList: {},
};

export const followupsFeature = createFeature({
  name: 'followups',
  reducer: createReducer(
    initiateState,
    on(FollowupsActions.loadApiRequest, (state, { api }): FollowupsState => {
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != api),
        isLoadingData: _.union(state.isLoadingData, [api]),
        resBodyList: { ...state.resBodyList, [api]: {} },
      };
    }),
    on(
      FollowupsActions.loadFuApiRequestSuccess,
      (state, { api, resBody }): FollowupsState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != api),
          resBodyList: { ...state.resBodyList, [api]: resBody },
          isLoadingData: _.filter(isLoadingData, n => n != api),
        };
      }
    ),
    on(
      FollowupsActions.loadFuApiRequestFailure,
      (state, { api, error }): FollowupsState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          resBodyList: { ...state.resBodyList, [api]: {} },
          isLoadingData: _.filter(isLoadingData, n => n != api),
          errors: [...errors, { ...error, api: api }],
        };
      }
    )
  ),
});

export const { selectIsLoadingData, selectErrors, selectResBodyList } =
  followupsFeature;

export const selectIsLoadingFuGetConversion = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fuGetConversion') >= 0
);

export const selectIsLoadingFuGetConversionPerUser = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fuGetConversionPerUser') >= 0
);

export const selectIsLoadingFuGetFollowupCompletion = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fuGetFollowupCompletion') >= 0
);

export const selectIsLoadingFuGetOutcome = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fuGetOutcome') >= 0
);

export const selectIsLoadingFuGetPerUser = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fuGetPerUser') >= 0
);
