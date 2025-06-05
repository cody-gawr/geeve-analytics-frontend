import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { JeeveError } from '@/newapp/models';
import { ConversionCode, ConversionTracker } from '@/newapp/models/conversion-tracker';
import { ConversionTrackerApiActions, ConversionTrackerPageActions } from '../actions';

export interface ConversionTrackerState {
  loading: {
    conversionCodes: boolean;
    conversionTrackers: boolean;
  };
  error: {
    conversionCodes: JeeveError | null;
    conversionTrackers: JeeveError | null;
  };
  selectedConversionCode: ConversionCode | null;
  conversionCodes: ConversionCode[];
  conversionTrackers: ConversionTracker[];
}

const initialState: ConversionTrackerState = {
  loading: {
    conversionCodes: false,
    conversionTrackers: false,
  },
  error: {
    conversionCodes: null,
    conversionTrackers: null,
  },
  selectedConversionCode: null,
  conversionCodes: [],
  conversionTrackers: [],
};

export const conversionTrackerFeacture = createFeature({
  name: 'conversion-tracker',
  reducer: createReducer(
    initialState,
    on(ConversionTrackerPageActions.loadConversionCodes, (state): ConversionTrackerState => {
      const { loading } = state;
      return {
        ...state,
        loading: {
          ...loading,
          conversionCodes: true,
        },
      };
    }),
    on(
      ConversionTrackerApiActions.loadConversionCodesSuccess,
      (state, { conversionCodes }): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            conversionCodes: false,
          },
          error: {
            ...error,
            conversionCodes: null,
          },
          conversionCodes,
        };
      },
    ),
    on(
      ConversionTrackerApiActions.loadConversionCodesFailure,
      (state, { error: conversionCodesError }): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            conversionCodes: false,
          },
          error: {
            ...error,
            conversionCodes: conversionCodesError,
          },
          conversionCodes: [],
        };
      },
    ),
  ),
});

export const {
  selectLoading,
  selectError,
  selectConversionCodes,
  selectConversionTrackers,
  selectSelectedConversionCode,
} = conversionTrackerFeacture;
