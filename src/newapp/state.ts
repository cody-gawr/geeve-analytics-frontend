import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

interface State {}

export const reducers: ActionReducerMap<State> = {};
export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [
      { clinic: [ 'clinics', 'currentClinicId' ] },
      { auth: [ 'authUserData', 'rolesIndividual' ] },
      // { layout: ['startDate', 'endDate', 'enableDateRagne', 'duration', 'trend'] }
    ],
    rehydrate: true
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer
];
