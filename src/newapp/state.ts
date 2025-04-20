import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

interface State {}

export const reducers: ActionReducerMap<State> = {};
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        clinic: ['currentSingleClinicId', 'currentMultiClinicIds'],
      },
      {
        dentist: ['currentDentistId'],
      },
      {
        auth: ['authUserData'],
      },
      { layout: ['dateRange', 'trend', 'average', 'compare'] },
    ],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
