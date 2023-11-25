import { createFeature, createReducer, on } from '@ngrx/store';
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
    })
  ),
});

export const { selectIsLoadingData, selectErrors, selectResBodyList } =
  followupsFeature;
