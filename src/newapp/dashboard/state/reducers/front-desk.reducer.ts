import { JeeveError } from '@/newapp/models';
import {
  FdFtaRatioApiResponse,
  FdFtaRatioTrendApiResponse,
  FdNumTicksApiResponse,
  FdNumTicksTrendApiResponse,
  FdReappointRateApiResponse,
  FdReappointRateTrendApiResponse,
  FdRecallRateApiResponse,
  FdRecallRateTrendApiResponse,
  FdUtaRatioApiResponse,
  FdUtaRatioTrendApiResponse,
  FdUtilisationRateApiResponse,
  FdUtilisationRateByDayApiResponse,
  FdUtilisationRateItem,
  FdUtilisationRateTrendApiResponse,
} from '@/newapp/models/dashboard/front-desk';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { FrontDeskApiActions, FrontDeskPageActions } from '../actions';
import _ from 'lodash';
import * as moment from 'moment';
import {
  selectCurrentClinicId,
  selectCurrentClinics,
  selectIsMultiClinicsSelected,
} from '@/newapp/clinic/state/reducers/clinic.reducer';
import { DoughnutChartColors } from '@/newapp/shared/constants';
import { selectComputedDurationUnits, selectTrend } from '@/newapp/layout/state/reducers/layout.reducer';

type FrontDeskEndpoints =
  | 'fdUtilisationRate'
  | 'fdUtilisationRateTrend'
  | 'fdUtilisationRateByDay'
  | 'fdRecallRate'
  | 'fdRecallRateTrend'
  | 'fdReappointRate'
  | 'fdReappointRateTrend'
  | 'fdNumTicks'
  | 'fdNumTicksTrend'
  | 'fdFtaRatio'
  | 'fdFtaRatioTrend'
  | 'fdUtaRatio'
  | 'fdUtaRatioTrend';

const GOAL_THICKNESS = 0.5;

export interface FrontDeskState {
  isLoadingData: Array<FrontDeskEndpoints>;

  errors: Array<JeeveError>;

  fdUtilisationRateData: FdUtilisationRateApiResponse | null;
  fdUtilisationRateTrendData: FdUtilisationRateTrendApiResponse | null;

  fdUtilisationRateByDayData: FdUtilisationRateByDayApiResponse | null;

  fdRecallRateData: FdRecallRateApiResponse | null;
  fdRecallRateTrendData: FdRecallRateTrendApiResponse | null;

  fdReappointRateData: FdReappointRateApiResponse | null;
  fdReappointRateTrendData: FdReappointRateTrendApiResponse | null;

  fdNumTicksData: FdNumTicksApiResponse | null;
  fdNumTicksTrendData: FdNumTicksTrendApiResponse | null;

  fdFtaRatioData: FdFtaRatioApiResponse | null;
  fdFtaRatioTrendData: FdFtaRatioTrendApiResponse | null;

  fdUtaRatioData: FdUtaRatioApiResponse | null;
  fdUtaRatioTrendData: FdUtaRatioTrendApiResponse | null;

  fdCancellationRatioData: any;
  fdCancellationRatioTrendData: any;

  isByDayData: boolean;
}

const initialState: FrontDeskState = {
  isLoadingData: [],

  errors: [],

  fdUtilisationRateData: null,
  fdUtilisationRateTrendData: null,

  fdUtilisationRateByDayData: null,

  fdRecallRateData: null,
  fdRecallRateTrendData: null,

  fdReappointRateData: null,
  fdReappointRateTrendData: null,

  fdNumTicksData: null,
  fdNumTicksTrendData: null,

  fdFtaRatioData: null,
  fdFtaRatioTrendData: null,

  fdUtaRatioData: null,
  fdUtaRatioTrendData: null,

  fdCancellationRatioData: null,
  fdCancellationRatioTrendData: null,

  isByDayData: false,
};

export const frontDeskFeature = createFeature({
  name: 'front-desk',
  reducer: createReducer(
    initialState,
    // FdUtilisationRate
    on(FrontDeskPageActions.loadFdUtilisationRate, (state): FrontDeskState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fdUtilisationRate'),
        fdUtilisationRateData: null,
        isLoadingData: _.union(isLoadingData, ['fdUtilisationRate']),
      };
    }),
    on(
      FrontDeskApiActions.fdUtilisationRateSuccess,
      (state, { fdUtilisationRateData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdUtilisationRate'),
          fdUtilisationRateData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdUtilisationRate'),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdUtilisationRateFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdUtilisationRateData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdUtilisationRate'),
          errors: [...errors, { ...error, api: 'fdUtilisationRate' }],
        };
      }
    ),
    // FdUtilisationRateTrend
    on(
      FrontDeskPageActions.loadFdUtilisationRateTrend,
      (state): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdUtilisationRateTrend'),
          fdUtilisationRateTrendData: null,
          isLoadingData: _.union(isLoadingData, ['fdUtilisationRateTrend']),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdUtilisationRateTrendSuccess,
      (state, { fdUtilisationRateTrendData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdUtilisationRateTrend'),
          fdUtilisationRateTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fdUtilisationRateTrend'
          ),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdUtilisationRateTrendFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdUtilisationRateTrendData: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fdUtilisationRateTrend'
          ),
          errors: [...errors, { ...error, api: 'fdUtilisationRateTrend' }],
        };
      }
    ),
    // FdUtilisationRateByDay
    on(
      FrontDeskPageActions.loadFdUtilisationRateByDay,
      (state): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdUtilisationRateByDay'),
          fdUtilisationRateByDayData: null,
          isLoadingData: _.union(isLoadingData, ['fdUtilisationRateByDay']),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdUtilisationRateByDaySuccess,
      (state, { fdUtilisationRateByDayData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdUtilisationRateByDay'),
          fdUtilisationRateByDayData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fdUtilisationRateByDay'
          ),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdUtilisationRateByDayFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdUtilisationRateByDayData: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fdUtilisationRateByDay'
          ),
          errors: [...errors, { ...error, api: 'fdUtilisationRateByDay' }],
        };
      }
    ),
    // FdRecallRate
    on(FrontDeskPageActions.loadFdRecallRate, (state): FrontDeskState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fdRecallRate'),
        fdRecallRateData: null,
        isLoadingData: _.union(isLoadingData, ['fdRecallRate']),
      };
    }),
    on(
      FrontDeskApiActions.fdRecallRateSuccess,
      (state, { fdRecallRateData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdRecallRate'),
          fdRecallRateData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdRecallRate'),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdRecallRateFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdRecallRateData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdRecallRate'),
          errors: [...errors, { ...error, api: 'fdRecallRate' }],
        };
      }
    ),
    // FdRecallRateTrend
    on(FrontDeskPageActions.loadFdRecallRateTrend, (state): FrontDeskState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fdRecallRateTrend'),
        fdRecallRateTrendData: null,
        isLoadingData: _.union(isLoadingData, ['fdRecallRateTrend']),
      };
    }),
    on(
      FrontDeskApiActions.fdRecallRateTrendSuccess,
      (state, { fdRecallRateTrendData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdRecallRateTrend'),
          fdRecallRateTrendData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdRecallRateTrend'),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdRecallRateTrendFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdRecallRateTrendData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdRecallRateTrend'),
          errors: [...errors, { ...error, api: 'fdRecallRateTrend' }],
        };
      }
    ),
    // FdReappointRate
    on(FrontDeskPageActions.loadFdReappointRate, (state): FrontDeskState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fdReappointRate'),
        fdReappointRateData: null,
        isLoadingData: _.union(isLoadingData, ['fdReappointRate']),
      };
    }),
    on(
      FrontDeskApiActions.fdReappointRateSuccess,
      (state, { fdReappointRateData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdReappointRate'),
          fdReappointRateData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdReappointRate'),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdReappointRateFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdReappointRateData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdReappointRate'),
          errors: [...errors, { ...error, api: 'fdReappointRate' }],
        };
      }
    ),
    // FdReappointRateTrend
    on(
      FrontDeskPageActions.loadFdReappointRateTrend,
      (state): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdReappointRateTrend'),
          fdReappointRateTrendData: null,
          isLoadingData: _.union(isLoadingData, ['fdReappointRateTrend']),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdReappointRateTrendSuccess,
      (state, { fdReappointRateTrendData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdReappointRateTrend'),
          fdReappointRateTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fdReappointRateTrend'
          ),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdReappointRateTrendFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdReappointRateTrendData: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'fdReappointRateTrend'
          ),
          errors: [...errors, { ...error, api: 'fdReappointRateTrend' }],
        };
      }
    ),
    // FdNumTicks
    on(FrontDeskPageActions.loadFdNumTicks, (state): FrontDeskState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fdNumTicks'),
        fdNumTicksData: null,
        isLoadingData: _.union(isLoadingData, ['fdNumTicks']),
      };
    }),
    on(
      FrontDeskApiActions.fdNumTicksSuccess,
      (state, { fdNumTicksData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdNumTicks'),
          fdNumTicksData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdNumTicks'),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdNumTicksFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdNumTicksData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdNumTicks'),
          errors: [...errors, { ...error, api: 'fdNumTicks' }],
        };
      }
    ),
    // FdNumTicksTrend
    on(FrontDeskPageActions.loadFdNumTicksTrend, (state): FrontDeskState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fdNumTicksTrend'),
        fdNumTicksTrendData: null,
        isLoadingData: _.union(isLoadingData, ['fdNumTicksTrend']),
      };
    }),
    on(
      FrontDeskApiActions.fdNumTicksTrendSuccess,
      (state, { fdNumTicksTrendData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdNumTicksTrend'),
          fdNumTicksTrendData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdNumTicksTrend'),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdNumTicksTrendFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdNumTicksTrendData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdNumTicksTrend'),
          errors: [...errors, { ...error, api: 'fdNumTicksTrend' }],
        };
      }
    ),
    // fdFtaRatio
    on(FrontDeskPageActions.loadFdFtaRatio, (state): FrontDeskState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fdFtaRatio'),
        fdFtaRatioData: null,
        isLoadingData: _.union(isLoadingData, ['fdFtaRatio']),
      };
    }),
    on(
      FrontDeskApiActions.fdFtaRatioSuccess,
      (state, { fdFtaRatioData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdFtaRatio'),
          fdFtaRatioData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdFtaRatio'),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdFtaRatioFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdFtaRatioData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdFtaRatio'),
          errors: [...errors, { ...error, api: 'fdFtaRatio' }],
        };
      }
    ),
    // FdFtaRatioTrend
    on(FrontDeskPageActions.loadFdFtaRatioTrend, (state): FrontDeskState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fdFtaRatioTrend'),
        fdFtaRatioTrendData: null,
        isLoadingData: _.union(isLoadingData, ['fdFtaRatioTrend']),
      };
    }),
    on(
      FrontDeskApiActions.fdFtaRatioTrendSuccess,
      (state, { fdFtaRatioTrendData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdFtaRatioTrend'),
          fdFtaRatioTrendData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdFtaRatioTrend'),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdFtaRatioTrendFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdFtaRatioTrendData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdFtaRatioTrend'),
          errors: [...errors, { ...error, api: 'fdFtaRatioTrend' }],
        };
      }
    ),
    // FdUtaRatio
    on(FrontDeskPageActions.loadFdUtaRatio, (state): FrontDeskState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fdUtaRatio'),
        fdUtaRatioData: null,
        isLoadingData: _.union(isLoadingData, ['fdUtaRatio']),
      };
    }),
    on(
      FrontDeskApiActions.fdUtaRatioSuccess,
      (state, { fdUtaRatioData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdUtaRatio'),
          fdUtaRatioData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdUtaRatio'),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdUtaRatioFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdUtaRatioData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdUtaRatio'),
          errors: [...errors, { ...error, api: 'fdUtaRatio' }],
        };
      }
    ),
    // FdUtaRatioTrend
    on(FrontDeskPageActions.loadFdUtaRatioTrend, (state): FrontDeskState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'fdUtaRatioTrend'),
        fdUtaRatioTrendData: null,
        isLoadingData: _.union(isLoadingData, ['fdUtaRatioTrend']),
      };
    }),
    on(
      FrontDeskApiActions.fdUtaRatioTrendSuccess,
      (state, { fdUtaRatioTrendData }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'fdUtaRatioTrend'),
          fdUtaRatioTrendData,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdUtaRatioTrend'),
        };
      }
    ),
    on(
      FrontDeskApiActions.fdUtaRatioTrendFailure,
      (state, { error }): FrontDeskState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          fdUtaRatioTrendData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'fdUtaRatioTrend'),
          errors: [...errors, { ...error, api: 'fdUtaRatioTrend' }],
        };
      }
    ),
    on(
      FrontDeskPageActions.setIsByDayData,
      (state, { value }): FrontDeskState => {
        return {
          ...state,
          isByDayData: value,
        };
      }
    ),
    on(FrontDeskPageActions.setErrors, (state, { errors }): FrontDeskState => {
      return {
        ...state,
        errors,
      };
    })
  ),
});

export const {
  selectErrors,
  selectIsLoadingData,
  selectFdUtilisationRateData,
  selectFdUtilisationRateTrendData,
  selectFdUtilisationRateByDayData,

  selectFdRecallRateData,
  selectFdRecallRateTrendData,

  selectFdReappointRateData,
  selectFdReappointRateTrendData,

  selectFdNumTicksData,
  selectFdNumTicksTrendData,

  selectFdFtaRatioData,
  selectFdFtaRatioTrendData,

  selectFdUtaRatioData,
  selectFdUtaRatioTrendData,

  selectIsByDayData,
} = frontDeskFeature;

export const selectIsLoadingFdUtilisationRateData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdUtilisationRate') >= 0
);
export const selectIsLoadingFdUtilisationRateTrendData = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fdUtilisationRateTrend') >= 0
);
export const selectIsLoadingFdUtilisationRateByDayData = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'fdUtilisationRateByDay') >= 0
);
export const selectIsLoadingFdRecallRateData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdRecallRate') >= 0
);
export const selectIsLoadingFdRecallRateTrendData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdRecallRateTrend') >= 0
);
export const selectIsLoadingFdReappointRateData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdReappointRate') >= 0
);
export const selectIsLoadingFdReappointRateTrendData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdReappointRateTrend') >= 0
);
export const selectIsLoadingFdNumTicksData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdNumTicks') >= 0
);
export const selectIsLoadingFdNumTicksTrendData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdNumTicksTrend') >= 0
);
export const selectIsLoadingFdFtaRatioData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdFtaRatio') >= 0
);
export const selectIsLoadingFdFtaRatioTrendData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdFtaRatioTrend') >= 0
);
export const selectIsLoadingFdUtaRatioData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdUtaRatio') >= 0
);
export const selectIsLoadingFdUtaRatioTrendData = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fdUtaRatioTrend') >= 0
);

export const selectFdUtilRateChartData = createSelector(
  selectFdUtilisationRateData,
  selectCurrentClinics,
  (resBody, clinics) => {
    if (resBody == null) {
      return {
        fdUtiData: [],
        datasets: [],
        labels: [],
        fdUtilRateVal: 0,
        fdutilRatePrev: 0,
        fdUtilRateGoal: 0,
      };
    }
    const fdUtiData = [],
      chartData = [],
      chartLabels = [];
    resBody.data.forEach(val => {
      fdUtiData.push({
        name: val.appBookName,
        scheduledHours: Math.round(<number>val.plannedHour),
        clinicanHours: Math.round(<number>val.workedHour),
        utilRate: Math.round(parseFloat(<string>val.utilRate) * 100),
      });
    });

    resBody.data.slice(0, 20).forEach(val => {
      chartData.push(Math.round(parseFloat(<string>val.utilRate) * 100));
      chartLabels.push(
        `${val.appBookName}--${val.workedHour}--${val.plannedHour}--${val.clinicName}`
      );
    });
    const chartDatasets = [
      {
        data: [],
        label: '',
        backgroundColor: [
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
        ],
        hoverBackgroundColor: [
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
        ],
      },
    ];

    chartDatasets[0]['data'] = chartData;
    if (clinics.length > 1) {
      let dynamicColors = [],
        legendBackgroundColor = [
          '#6edbbb',
          '#b0fffa',
          '#abb3ff',
          '#ffb4b5',
          '#fffcac',
          '#FFE4E4',
          '#FFD578',
          '#54D2FF',
          '#E58DD7',
          '#A9AABC',
          '#F2ECFF',
          '#5689C9',
          '#F9F871',
        ];

      resBody.data.forEach(res => {
        clinics.forEach((item, index) => {
          if (res.clinicId == item.id) {
            dynamicColors.push(legendBackgroundColor[index]);
          }
        });
      });

      chartDatasets[0]['backgroundColor'] = dynamicColors;
    }

    return {
      fdUtiData,
      datasets: chartDatasets,
      labels: chartLabels,
      fdUtilRateVal: Math.round(resBody.total),
      fdutilRatePrev: Math.round(resBody.totalTa),
      fdUtilRateGoal: resBody.goals,
    };
  }
);

export const selectFdUtilRateByDayChartData = createSelector(
  selectFdUtilisationRateByDayData,
  resBody => {
    if (resBody == null) {
      return {
        fdUtiByDayData: [],
        datasets: [],
        labels: [],
        fdUtilRateByDayVal: 0,
        fdUtilRateByDayPrev: 0,
      };
    }
    const chartData = [],
      chartLabels = [],
      fdUtiByDayData = [];
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    days.forEach(d => {
      fdUtiByDayData.push({
        day: d,
        scheduledHours: 0,
        clinicanHours: 0,
        utilRate: 0,
      });
      chartData.push(0);
      chartLabels.push(`${d}--0--0`);
    });
    _.chain(resBody.data)
      .groupBy('dayName')
      .map((items, day) => {
        const plannedHour = _.sumBy(items, v =>
          parseFloat(<string>v.plannedHour)
        );
        const workedHour = _.sumBy(items, v =>
          parseFloat(<string>v.workedHour)
        );
        return {
          day,
          plannedHour,
          workedHour,
        };
      })
      .value()
      .forEach(item => {
        const idx = days.findIndex(d => d === item.day);
        if (idx >= 0) {
          const utilRate = _.round((item.workedHour / item.plannedHour) * 100);
          fdUtiByDayData[idx] = {
            day: item.day,
            scheduledHours: item.plannedHour,
            clinicanHours: item.workedHour,
            utilRate: utilRate,
          };
          chartData[idx] = utilRate;
          chartLabels[idx] =
            `${item.day}--${item.workedHour}--${item.plannedHour}`;
        }
      });

    const chartDatasets = [
      {
        data: [],
        label: '',
        backgroundColor: [
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
        ],
        hoverBackgroundColor: [
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
        ],
      },
    ];
    chartDatasets[0]['data'] = chartData;
    return {
      fdUtiByDayData,
      datasets: chartDatasets,
      labels: chartLabels,
      fdUtilRateByDayVal: Math.round(resBody.total),
      fdUtilRateByDayPrev: Math.round(resBody.totalTa),
    };
  }
);

export const selectFdUtilRateTrendChartData = createSelector(
  selectFdUtilisationRateTrendData,
  selectCurrentClinicId,
  selectTrend,
  selectComputedDurationUnits,
  (resBody, clinicId, trendMode, yearsOrMonths) => {
    if (resBody == null || !resBody.data) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let chartDatasets = [],
      chartLabels = [];
    if (typeof clinicId === 'string') {
      const chartData = [];
      _.chain(resBody.data)
        .groupBy('yearMonth')
        .map((items, duration) => {
          const plannedHour = _.chain(items)
            .sumBy(item => Number(item.plannedHour))
            .value();
          const workedHour = _.chain(items)
            .sumBy(item => Number(item.workedHour))
            .value();
          return {
            duration,
            utilRate: _.round((workedHour / plannedHour) * 100, 0),
          };
        })
        .value()
        .forEach(item => {
          chartData.push(_.round(item.utilRate, 1));
          chartLabels.push(moment(item.duration).format('MMM YYYY'));
        });
      chartDatasets = [
        {
          data: chartData,
          backgroundColor: DoughnutChartColors[0],
        },
      ];
    } else {
      const chartData = [],
        targetData = [];
      const temp = _.chain(resBody.data)
        .groupBy((item) => {
          const date = moment();
          if(trendMode === 'current'){
            date.set({ year: Number(item.year), month: Number(item.month) - 1 });
          }else{
            date.set({ year: Number(item.year)});          
          }
          return trendMode === 'current'? date.format('MMM YYYY'): date.format('YYYY');
        }).map((values: FdUtilisationRateItem[], key: string) => ({values, key})).value();

    const d = yearsOrMonths.map(
        (ym) =>
          temp.find((i) => i.key == ym) || {
            key: ym,
            values: []
          }
    );


      d.forEach(({values, key}) => {
        
        chartData.push(Math.round(_.sumBy(values, v => Number(v.utilRate)) / values.length) * 100);
        if (values.every(item => item.goals == -1 || item.goals == '' || item.goals == null)) {
          targetData.push([0, 0]);
        } else {
          const goals = _.sumBy(values, v => parseFloat(<string>v.goals) || 0) / values.length;
          targetData.push([
            goals - GOAL_THICKNESS,
            goals + GOAL_THICKNESS,
          ]);
        }
        chartLabels.push(
          `${
            key
            // trendMode == 'current'
            //   ? moment(item.yearMonth).format('MMM YYYY')
            //   : item.year
          }--${_.sumBy(values, v => Number(v.workedHour))/ values.length}--${_.sumBy(values, v => Number(v.plannedHour))/values.length}`
        );
      });
      chartDatasets = [
        {
          data: [],
          label: '',
          order: 2,
          backgroundColor: [
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
          ],
          shadowOffsetX: 3,
          shadowOffsetY: 2,
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          pointBevelWidth: 2,
          pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
          pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
          pointShadowOffsetX: 3,
          pointShadowOffsetY: 3,
          pointShadowBlur: 10,
          pointShadowColor: 'rgba(0, 0, 0, 0.3)',
          backgroundOverlayMode: 'multiply',
        },
        {
          data: [],
          label: '',
          shadowOffsetX: 3,
          backgroundColor: 'rgba(255, 0, 128, 1)',
          order: 1,
        },
      ];
      chartDatasets[0]['data'] = chartData;
      if (trendMode === 'current') {
        chartDatasets[0]['label'] = 'Actual';
        chartDatasets[1]['label'] = 'Target';
        chartDatasets[1]['data'] = targetData;
      } else {
        chartDatasets[0]['label'] = '';
        chartDatasets[1]['label'] = '';
        chartDatasets[1]['data'] = [];
      }
    }
    return {
      datasets: chartDatasets,
      labels: chartLabels,
    };
  }
);

export const selectFdRecallRateChartData = createSelector(
  selectFdRecallRateData,
  selectCurrentClinicId,
  (resBody, clinicId) => {
    if (resBody == null) {
      return {
        datasets: [],
        labels: [],
        fdRecallRateVal: 0,
        fdRecallRatePrev: 0,
        fdRecallRateGoal: 0,
      };
    }
    let chartDatasets = [],
      chartLabels = [];
    if (typeof clinicId === 'string') {
      const chartData = [];
      resBody.data.forEach(item => {
        if (item.clinicId) {
          chartData.push(
            Math.round(
              (parseFloat(<string>item.recallPatient) /
                parseFloat(<string>item.totalPatient)) *
                100
            )
          );
          chartLabels.push(item.clinicName);
        }
      });
      chartDatasets = [
        {
          data: [],
          label: '',
          backgroundColor: [
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
          ],
          hoverBackgroundColor: [
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
          ],
        },
      ];
      chartDatasets[0]['data'] = chartData;
    }

    return {
      datasets: chartDatasets,
      labels: chartLabels,
      fdRecallRateVal: Math.round(resBody.total),
      fdRecallRatePrev: Math.round(resBody.totalTa),
      fdRecallRateGoal: resBody.goals,
    };
  }
);

export const selectFdRecallRateTrendChartData = createSelector(
  selectFdRecallRateTrendData,
  selectCurrentClinicId,
  selectTrend,
  (resBody, clinicId, trendMode) => {
    if (resBody == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let chartDatasets = [],
      chartLabels = [];
    if (typeof clinicId === 'string') {
      const chartData = [];
      _.chain(resBody.data)
        .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
        .map((items, duration) => {
          const totalPatient = _.chain(items)
            .sumBy(item => Number(item.totalPatient))
            .value();
          const recallPatient = _.chain(items)
            .sumBy(item => Number(item.recallPatient))
            .value();
          return {
            duration,
            recallPercent: _.round((recallPatient / totalPatient) * 100, 0),
          };
        })
        .value()
        .forEach(item => {
          chartData.push(_.round(item.recallPercent));
          chartLabels.push(
            trendMode === 'current'
              ? moment(item.duration).format('MMM YYYY')
              : item.duration
          );
        });
      chartDatasets = [
        { data: chartData, backgroundColor: DoughnutChartColors[0], label: '' },
      ];
    } else {
      const chartData = [],
        targetData = [];
      resBody.data.forEach(item => {
        const recallPercent = Math.round(<number>item.recallPercent);
        if (recallPercent >= 0) {
          chartData.push(recallPercent);
          if (item.goals == -1 || item.goals == null || item.goals == '') {
            targetData.push([0, 0]);
          } else {
            targetData.push([
              parseFloat(<string>item.goals) - GOAL_THICKNESS,
              parseFloat(<string>item.goals) + GOAL_THICKNESS,
            ]);
          }
          chartLabels.push(
            trendMode === 'current'
              ? moment(item.yearMonth).format('MMM YYYY')
              : item.year
          );
        }
      });
      chartDatasets = [
        {
          data: [],
          label: '',
          shadowOffsetX: 3,
          order: 2,
          backgroundColor: [
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
          ],
          shadowOffsetY: 2,
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          pointBevelWidth: 2,
          pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
          pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
          pointShadowOffsetX: 3,
          pointShadowOffsetY: 3,
          pointShadowBlur: 10,
          pointShadowColor: 'rgba(0, 0, 0, 0.3)',
          backgroundOverlayMode: 'multiply',
        },
        {
          data: [],
          label: '',
          shadowOffsetX: 3,
          backgroundColor: 'rgba(255, 0, 128, 1)',
          order: 1,
        },
      ];
      chartDatasets[0]['data'] = chartData;
      if (trendMode === 'current') {
        chartDatasets[0]['label'] = 'Actual';
        chartDatasets[1]['label'] = 'Target';
        chartDatasets[1]['data'] = targetData;
      } else {
        chartDatasets[0]['label'] = '';
        chartDatasets[1]['label'] = '';
        chartDatasets[1]['data'] = [];
      }
    }
    return {
      datasets: chartDatasets,
      labels: chartLabels,
    };
  }
);

export const selectFdReappointRateChartData = createSelector(
  selectFdReappointRateData,
  resBody => {
    if (resBody == null) {
      return {
        datasets: [],
        labels: [],
        fdReappointRateVal: 0,
        fdReappointRatePrev: 0,
        fdReappointRateGoal: 0,
      };
    }
    const chartData = [],
      chartLabels = [];
    if (resBody.total > 0) {
      resBody.data.forEach(item => {
        chartData.push(Math.round(<number>item.reappointRate));
        chartLabels.push(item.clinicName);
      });
    }

    const chartDatasets = [
      {
        data: [],
        label: '',
        backgroundColor: [
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
        ],
        hoverBackgroundColor: [
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
        ],
      },
    ];
    chartDatasets[0]['data'] = chartData;
    return {
      datasets: chartDatasets,
      labels: chartLabels,
      fdReappointRateVal: Math.round(resBody.total),
      fdReappointRatePrev: Math.round(resBody.totalTa),
      fdReappointRateGoal: resBody.goals,
    };
  }
);

export const selectFdReappointRateTrendChartData = createSelector(
  selectFdReappointRateTrendData,
  selectCurrentClinicId,
  selectTrend,
  (resBody, clinicId, trendMode) => {
    if (resBody == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let chartDatasets = [],
      chartLabels = [];
    if (typeof clinicId === 'string') {
      const chartData = [];
      _.chain(resBody.data)
        .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
        .map((items, duration) => {
          const totalAppts = _.chain(items)
            .sumBy(item => Number(item.totalAppts))
            .value();
          const reappointments = _.chain(items)
            .sumBy(item => Number(item.reappointments))
            .value();
          return {
            duration,
            reappointRate: _.round((reappointments / totalAppts || 0) * 100),
          };
        })
        .value()
        .forEach(item => {
          chartData.push(_.round(item.reappointRate));
          chartLabels.push(
            trendMode === 'current'
              ? moment(item.duration).format('MMM YYYY')
              : item.duration
          );
        });
      chartDatasets = [
        { data: chartData, label: '', backgroundColor: DoughnutChartColors[0] },
      ];
    } else {
      const chartData = [],
        targetData = [];
      resBody.data.forEach(item => {
        chartData.push(Math.round(<number>item.reappointRate));
        if (item.goals == -1 || item.goals == null || item.goals == '') {
          targetData.push([0, 0]);
        } else {
          targetData.push([
            parseFloat(<string>item.goals) - GOAL_THICKNESS,
            parseFloat(<string>item.goals) + GOAL_THICKNESS,
          ]);
        }
        chartLabels.push(
          trendMode === 'current'
            ? moment(item.yearMonth).format('MMM YYYY')
            : item.year
        );
      });
      chartDatasets = [
        {
          data: [],
          label: '',
          // shadowOffsetX: 3,
          order: 2,
          backgroundColor: [
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
          ],
        },
        {
          data: [],
          label: '',
          backgroundColor: 'rgba(255, 0, 128, 1)',
          order: 1,
        },
      ];
      chartDatasets[0]['data'] = chartData;
      if (trendMode == 'current') {
        chartDatasets[0]['label'] = 'Actual';
        chartDatasets[1]['label'] = 'Target';
        chartDatasets[1]['data'] = targetData;
      } else {
        chartDatasets[0]['label'] = '';
        chartDatasets[1]['label'] = '';
        chartDatasets[1]['data'] = [];
      }
    }
    return {
      datasets: chartDatasets,
      labels: chartLabels,
    };
  }
);

export const selectFdNumTicksChartData = createSelector(
  selectFdNumTicksData,
  selectCurrentClinicId,
  (resBody, clinicId) => {
    if (resBody == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let chartDatasets = [],
      chartLabels = [],
      chartData = [];
    if (typeof clinicId === 'string') {
      if (resBody.total > 0) {
        resBody.data.forEach(item => {
          if (item.clinicId) {
            chartLabels.push(item.clinicName);
            chartData.push(Math.round(<number>item.numTicks));
          }
        });
      }
      chartDatasets = [
        {
          data: [],
          label: '',
          backgroundColor: [
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
          ],
          hoverBackgroundColor: [
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
            '#119582',
            '#ffb4b5',
          ],
        },
      ];
      chartDatasets[0]['data'] = chartData;
    }

    return {
      datasets: chartDatasets,
      labels: chartLabels,
      fdNumOfTicksVal: Math.round(resBody.total),
      fdNumOfTicksPrev: Math.round(resBody.totalTa),
    };
  }
);

export const selectFdNumTicksTrendChartData = createSelector(
  selectFdNumTicksTrendData,
  selectCurrentClinicId,
  selectTrend,
  (resBody, clinicId, trendMode) => {
    if (resBody == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let chartDatasets = [],
      chartLabels = [];
    if (typeof clinicId === 'string') {
      chartLabels = _.chain(resBody.data)
        .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
        .map((items, duration) => {
          return trendMode === 'current'
            ? moment(duration).format('MMM YYYY')
            : duration;
        })
        .value();
      let i = 0;
      chartDatasets = _.chain(resBody.data)
        .groupBy('clinicId')
        .map(items => {
          const clinicName = items[0].clinicName;
          const bgColor = DoughnutChartColors[i];
          i++;
          return {
            label: clinicName,
            data: items.map(val => Number(val.numTicks)),
            backgroundColor: bgColor,
            hoverBackgroundColor: bgColor,
          };
        })
        .value();
    } else {
      const chartData = [];
      resBody.data.forEach(item => {
        chartData.push(Math.round(<number>item.numTicks));
        chartLabels.push(
          trendMode === 'current'
            ? moment(item.yearMonth).format('MMM YYYY')
            : item.year
        );
      });
      chartDatasets = [
        {
          data: [],
          label: '',
          shadowOffsetX: 3,
          backgroundColor: [
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
            '#EEEEF8',
            '#119682',
          ],
          shadowOffsetY: 2,
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          pointBevelWidth: 2,
          pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
          pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
          pointShadowOffsetX: 3,
          pointShadowOffsetY: 3,
          pointShadowBlur: 10,
          pointShadowColor: 'rgba(0, 0, 0, 0.3)',
          backgroundOverlayMode: 'multiply',
        },
      ];
      chartDatasets[0]['data'] = chartData;
    }
    return {
      datasets: chartDatasets,
      labels: chartLabels,
    };
  }
);

export const selectFdFtaRatioChartData = createSelector(
  selectFdFtaRatioData,
  resBody => {
    if (resBody == null) {
      return {
        datasets: [],
        labels: [],
        fdFtaRatioVal: 0,
        fdFtaRatioPrev: 0,
        fdFtaRatioGoal: 0,
      };
    }
    const chartData = [],
      chartLabels = [];
    if (resBody.total > 0) {
      resBody.data.forEach(item => {
        chartData.push(_.round(<number>item.ftaRatio, 1));
        chartLabels.push(item.clinicName);
      });
    }

    const chartDatasets = [
      {
        data: [],
        label: '',
        backgroundColor: [
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
        ],
        hoverBackgroundColor: [
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
        ],
      },
    ];

    chartDatasets[0]['data'] = chartData;

    return {
      datasets: chartDatasets,
      labels: chartLabels,
      fdFtaRatioVal: _.round(resBody.total > 100 ? 100 : resBody.total, 1),
      fdFtaRatioPrev: _.round(resBody.totalTa, 1),
      fdFtaRatioGoal: resBody.goals,
    };
  }
);

export const selectFdFtaRatioTrendChartData = createSelector(
  selectFdFtaRatioTrendData,
  selectIsMultiClinicsSelected,
  selectTrend,
  (resBody, isMultiClinics, trendMode) => {
    if (resBody == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let chartDatasets = [];
    const chartData = [],
      targetData = [],
      chartLabels = [];
    if (isMultiClinics) {
      _.chain(resBody.data)
        .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
        .map((items, duration) => {
          const totalFta = _.chain(items)
            .sumBy(item => Number(item.totalFta))
            .value();
          const totalAppts = _.chain(items)
            .sumBy(item => Number(item.totalAppts))
            .value();
          return {
            duration:
              trendMode === 'current'
                ? moment(duration).format('MMM YYYY')
                : duration,
            ftaRatio: _.round((totalFta / totalAppts) * 100, 1),
          };
        })
        .value()
        .forEach(item => {
          chartData.push(_.round(item.ftaRatio, 1));
          chartLabels.push(item.duration);
        });
      chartDatasets = [
        { data: chartData, label: '', backgroundColor: DoughnutChartColors[0] },
      ];
    } else {
      resBody.data.forEach(item => {
        chartData.push(_.round(<number>item.ftaRatio, 1));
        if (item.goals == -1 || !item.goals) {
          targetData.push(null);
        } else {
          targetData.push(item.goals);
        }
        chartLabels.push(
          trendMode === 'current'
            ? moment(item.yearMonth).format('MMM YYYY')
            : item.year
        );
      });
      const mappedtargetData = [];
      targetData.map(function (v) {
        if (v == null) {
          mappedtargetData.push([v - 0, v + 0]);
        } else {
          mappedtargetData.push([v - GOAL_THICKNESS, v + GOAL_THICKNESS]);
        }
      });
      chartDatasets = [
        {
          data: [],
          label: 'Actual',
          order: 2,
        },
        {
          data: trendMode == 'current' ? mappedtargetData : [],
          label: trendMode == 'current' ? 'Target' : '',
          backgroundColor: 'rgba(255, 0, 128, 1)',
          order: 1,
          type: 'bar',
        },
      ];
      chartDatasets[0]['data'] = chartData;
    }

    return {
      datasets: chartDatasets,
      labels: chartLabels,
    };
  }
);

export const selectFdUtaRatioChartData = createSelector(
  selectFdUtaRatioData,
  resBody => {
    if (resBody == null) {
      return {
        datasets: [],
        labels: [],
        fdUtaRatioVal: 0,
        fdUtaRatioPrev: 0,
        fdUtaRatioGoal: 0,
      };
    }
    const chartData = [],
      chartLabels = [];
    if (resBody.total > 0) {
      resBody.data.forEach(item => {
        chartData.push(_.round(<number>item.utaRatio, 1));
        chartLabels.push(item.clinicName);
      });
    }

    const chartDatasets = [
      {
        data: [],
        label: '',
        backgroundColor: [
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
        ],
        hoverBackgroundColor: [
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
          '#119582',
          '#ffb4b5',
        ],
      },
    ];

    chartDatasets[0]['data'] = chartData;

    return {
      datasets: chartDatasets,
      labels: chartLabels,
      fdUtaRatioVal: _.round(resBody.total > 100 ? 100 : resBody.total, 1),
      fdUtaRatioPrev: _.round(resBody.totalTa, 1),
      fdUtaRatioGoal: resBody.goals,
    };
  }
);

export const selectFdUtaRatioTrendChartData = createSelector(
  selectFdUtaRatioTrendData,
  selectCurrentClinicId,
  selectTrend,
  (resBody, clinicId, trendMode) => {
    if (resBody == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let chartDatasets = [],
      targetData = [];
    const chartData = [],
      chartLabels = [];
    if (typeof clinicId === 'string') {
      _.chain(resBody.data)
        .groupBy(trendMode === 'current' ? 'yearMonth' : 'year')
        .map((items, duration) => {
          const totalUta = _.chain(items)
            .sumBy(item => Number(item.totalUta))
            .value();
          const totalAppts = _.chain(items)
            .sumBy(item => Number(item.totalAppts))
            .value();
          return {
            duration:
              trendMode === 'current'
                ? moment(duration).format('MMM YYYY')
                : duration,
            utaRatio: _.round((totalUta / totalAppts) * 100, 1),
          };
        })
        .value()
        .forEach(item => {
          chartData.push(_.round(item.utaRatio, 1));
          chartLabels.push(item.duration);
        });
      chartDatasets = [
        { data: chartData, label: '', backgroundColor: DoughnutChartColors[0] },
      ];
    } else {
      resBody.data.forEach(item => {
        chartData.push(_.round(<number>item.utaRatio, 1));
        if (item.goals == -1 || !item.goals) {
          targetData.push(null);
        } else {
          targetData.push(item.goals);
        }
        chartLabels.push(
          trendMode === 'current'
            ? moment(item.yearMonth).format('MMM YYYY')
            : item.year
        );
      });
      const mappedtargetData = [];
      targetData.map(function (v) {
        if (v == null) {
          mappedtargetData.push([v - 0, v + 0]);
        } else {
          mappedtargetData.push([v - GOAL_THICKNESS, v + GOAL_THICKNESS]);
        }
      });
      chartDatasets = [
        {
          data: chartData,
          label: 'Actual',
          order: 2,
        },
        {
          data: trendMode == 'current' ? mappedtargetData : [],
          label: trendMode == 'current' ? 'Target' : '',
          backgroundColor: 'rgba(255, 0, 128, 1)',
          order: 1,
          type: 'bar',
        },
      ];
    }

    return {
      datasets: chartDatasets,
      labels: chartLabels,
    };
  }
);
