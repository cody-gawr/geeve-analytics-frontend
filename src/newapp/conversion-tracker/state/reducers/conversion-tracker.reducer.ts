import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { JeeveError } from '@/newapp/models';
import { ConversionCode, ConversionTracker } from '@/newapp/models/conversion-tracker';
import { ConversionTrackerApiActions, ConversionTrackerPageActions } from '../actions';

export interface ConversionTrackerState {
  loading: {
    conversionCodes: boolean;
    conversionTrackers: boolean;
    createConversionCode: boolean;
    deleteConversionCode: boolean;
    createConversionCodeValue: boolean;
    deleteConversionCodeValue: boolean;
  };
  error: {
    conversionCodes: JeeveError | null;
    conversionTrackers: JeeveError | null;
    createConvesionCode: JeeveError | null;
    deleteConversionCode: JeeveError | null;
    createConversionCodeValue: JeeveError | null;
    deleteConversionCodeValue: JeeveError | null;
  };
  selectedConversionCode: ConversionCode | null;
  conversionCodes: ConversionCode[];
  conversionTrackers: ConversionTracker[];
}

const initialState: ConversionTrackerState = {
  loading: {
    conversionCodes: false,
    conversionTrackers: false,
    createConversionCode: false,
    deleteConversionCode: false,
    createConversionCodeValue: false,
    deleteConversionCodeValue: false,
  },
  error: {
    conversionCodes: null,
    conversionTrackers: null,
    createConvesionCode: null,
    deleteConversionCode: null,
    createConversionCodeValue: null,
    deleteConversionCodeValue: null,
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
    on(
      ConversionTrackerPageActions.selectConversionCode,
      (state, { id }): ConversionTrackerState => {
        const { conversionCodes } = state;
        return {
          ...state,
          selectedConversionCode: conversionCodes.find(code => code.recordId === id) || null,
        };
      },
    ),

    on(
      ConversionTrackerApiActions.loadConversionTrackersSuccess,
      (state, { conversionTrackers }): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            conversionTrackers: false,
          },
          error: {
            ...error,
            conversionTrackers: null,
          },
          conversionTrackers,
        };
      },
    ),
    on(
      ConversionTrackerApiActions.loadConversionTrackersFailure,
      (state, { error: conversionTrackersError }): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            conversionTrackers: false,
          },
          error: {
            ...error,
            conversionTrackers: conversionTrackersError,
          },
          conversionTrackers: [],
        };
      },
    ),
    on(ConversionTrackerPageActions.createConversionCode, (state): ConversionTrackerState => {
      const { loading } = state;
      return {
        ...state,
        loading: {
          ...loading,
          createConversionCode: true,
        },
      };
    }),
    on(ConversionTrackerApiActions.createConversionCodeSuccess, (state): ConversionTrackerState => {
      const { loading, error } = state;
      return {
        ...state,
        loading: {
          ...loading,
          createConversionCode: false,
        },
        error: {
          ...error,
          createConvesionCode: null,
        },
      };
    }),
    on(
      ConversionTrackerApiActions.createConversionCodeFailure,
      (state, { error: createConversionCodeError }): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            createConversionCode: false,
          },
          error: {
            ...error,
            createConvesionCode: createConversionCodeError,
          },
        };
      },
    ),
    on(ConversionTrackerPageActions.deleteConversionCode, (state): ConversionTrackerState => {
      const { loading } = state;
      return {
        ...state,
        loading: {
          ...loading,
          deleteConversionCode: true,
        },
      };
    }),
    on(
      ConversionTrackerApiActions.deleteConversionCodeSuccess,
      (state, { deletedCount }): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            createConversionCode: false,
          },
          error: {
            ...error,
            deleteConversionCode: null,
          },
        };
      },
    ),
    on(
      ConversionTrackerApiActions.deleteConversionCodeFailure,
      (state, { error: deleteConversionCodeError }): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            deleteConversionCode: false,
          },
          error: {
            ...error,
            deleteConversionCode: deleteConversionCodeError,
          },
        };
      },
    ),

    on(ConversionTrackerPageActions.createConversionCodeValue, (state): ConversionTrackerState => {
      const { loading } = state;
      return {
        ...state,
        loading: {
          ...loading,
          createConversionCodeValue: true,
        },
      };
    }),
    on(
      ConversionTrackerApiActions.createConversionCodeValueSuccess,
      (state): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            createConversionCodeValue: false,
          },
          error: {
            ...error,
            createConversionCodeValue: null,
          },
        };
      },
    ),
    on(
      ConversionTrackerApiActions.createConversionCodeValueFailure,
      (state, { error: createConversionCodeError }): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            createConversionCodeValue: false,
          },
          error: {
            ...error,
            createConversionCodeValue: createConversionCodeError,
          },
        };
      },
    ),
    on(ConversionTrackerPageActions.deleteConversionCodeValue, (state): ConversionTrackerState => {
      const { loading } = state;
      return {
        ...state,
        loading: {
          ...loading,
          deleteConversionCodeValue: true,
        },
      };
    }),
    on(
      ConversionTrackerApiActions.deleteConversionCodeValueSuccess,
      (state, { deletedCount }): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            deleteConversionCodeValue: false,
          },
          error: {
            ...error,
            deleteConversionCodeValue: null,
          },
        };
      },
    ),
    on(
      ConversionTrackerApiActions.deleteConversionCodeValueFailure,
      (state, { error: deleteConversionCodeError }): ConversionTrackerState => {
        const { loading, error } = state;
        return {
          ...state,
          loading: {
            ...loading,
            deleteConversionCodeValue: false,
          },
          error: {
            ...error,
            deleteConversionCodeValue: deleteConversionCodeError,
          },
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
