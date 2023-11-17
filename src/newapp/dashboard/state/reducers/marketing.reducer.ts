import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as _ from 'lodash';
import { JeeveError } from '@/newapp/models';
import { MarketingApiActions, MarketingPageActions } from '../actions';
import {
  MkActivePatientsApiResponse,
  MkActivePatientsTrendApiResponse,
  MkNewPatientAcqApiResponse,
  MkNewPatientAcqItem,
  MkNewPatientAcqTrendApiResponse,
  MkNewPatientsByReferral,
  MkNewPatientsByReferralApiResponse,
  MkNewPatientsByReferralMultiItem,
  MkNewPatientsByReferralTrendApiResponse,
  MkNumNewPatientsApiResponse,
  MkNumNewPatientsTrendApiResponse,
  MkRevByReferral,
  MkRevByReferralMultiItem,
  MkRevByReferralTrendApiResponse,
  MkRevenueByReferralApiResponse,
  MkTotalVisitsApiResponse,
  MkTotalVisitsTrendApiResponse,
  MkXeroOrMyobAccountsApiResponse,
} from '@/newapp/models/dashboard/marketing';
import {
  selectCurrentClinicId,
  selectIsMultiClinicsSelected,
} from '@/newapp/clinic/state/reducers/clinic.reducer';
import { DoughnutChartColors } from '@/newapp/shared/constants';
import { selectTrend } from '@/newapp/layout/state/reducers/layout.reducer';
import moment from 'moment';
import { ChartDataset, Colors } from 'chart.js';
import { selectConnectedWith } from './dashboard.reducer';
import { COLORS } from '@/newapp/constants';

type MarketingEndpoints =
  | 'mkNumPatientsByReferral'
  | 'mkRevByReferral'
  | 'mkNumNewPatients'
  | 'mkNewPatientAcq'
  | 'mkTotalVisits'
  | 'mkNumPatientsByReferralTrend'
  | 'mkRevByReferralTrend'
  | 'mkTotalVisitsTrend'
  | 'mkNumNewPatientsTrend'
  | 'mkNewPatientAcqTrend'
  | 'mkActivePatients'
  | 'mkActivePatientsTrend'
  | 'mkGetXeroAcct'
  | 'mkGetMyobAcct'
  | 'mkSaveAcctMyob'
  | 'mkSaveAcctXero';

export interface MarketingState {
  isLoadingData: Array<MarketingEndpoints>;

  errors: Array<JeeveError>;

  newPatientsByReferralData: MkNewPatientsByReferralApiResponse | null;
  newPatientsByReferralTrendData: MkNewPatientsByReferralTrendApiResponse | null;
  revenueByReferralData: MkRevenueByReferralApiResponse | null;
  revenueByReferralTrendData: MkRevByReferralTrendApiResponse | null;
  newNumPatientsData: MkNumNewPatientsApiResponse | null;
  activePatientsData: MkActivePatientsApiResponse | null;
  activePatientsTrendData: MkActivePatientsTrendApiResponse | null;
  newNumPatientsTrendData: MkNumNewPatientsTrendApiResponse | null;
  newPatientAcqData: MkNewPatientAcqApiResponse | null;
  newPatientAcqTrendData: MkNewPatientAcqTrendApiResponse | null;
  totalVisitsData: MkTotalVisitsApiResponse | null;
  totalVisitsTrendData: MkTotalVisitsTrendApiResponse | null;
  isActivePatients: boolean;
  xeroAccounts: MkXeroOrMyobAccountsApiResponse | null;
  myobAccounts: MkXeroOrMyobAccountsApiResponse | null;
}

const initialState: MarketingState = {
  isLoadingData: [],
  errors: [],
  newPatientsByReferralData: null,
  newPatientsByReferralTrendData: null,
  revenueByReferralData: null,
  revenueByReferralTrendData: null,
  newNumPatientsData: null,
  activePatientsData: null,
  activePatientsTrendData: null,
  newNumPatientsTrendData: null,
  newPatientAcqData: null,
  newPatientAcqTrendData: null,
  totalVisitsData: null,
  totalVisitsTrendData: null,
  xeroAccounts: null,
  isActivePatients: false,
  myobAccounts: null,
};

export const marketingFeature = createFeature({
  name: 'marketing',
  reducer: createReducer(
    initialState,
    on(
      MarketingApiActions.mkNewPatientsByReferralFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newPatientsByReferralData: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkNumPatientsByReferral'
          ),
          errors: [...errors, { ...error, api: 'mkNumPatientsByReferral' }],
        };
      }
    ),
    // mkNewPatientsByReferral
    on(
      MarketingPageActions.loadMkNewPatientsByReferral,
      (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newPatientsByReferralData: null,
          errors: _.filter(errors, n => n.api != 'mkNumPatientsByReferral'),
          isLoadingData: _.union(isLoadingData, ['mkNumPatientsByReferral']),
        };
      }
    ),
    on(
      MarketingApiActions.mkNewPatientsByReferralSuccess,
      (state, { newPatientsByReferralData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkNumPatientsByReferral'),
          newPatientsByReferralData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkNumPatientsByReferral'
          ),
        };
      }
    ),
    // on(
    //   MarketingApiActions.mkNewPatientsByReferralFailure,
    //   (state, { error }): MarketingState => {
    //     const { isLoadingData, errors } = state;
    //     return {
    //       ...state,
    //       newPatientsByReferralData: null,
    //       isLoadingData: _.filter(
    //         isLoadingData,
    //         (n) => n != "mkNumPatientsByReferral"
    //       ),
    //       errors: [...errors, { ...error, api: "mkNumPatientsByReferral" }],
    //     };
    //   }
    // ),
    // mkNewPatientsByReferralTrend
    on(
      MarketingPageActions.loadMkNewPatientsByReferralTrend,
      (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newPatientsByReferralTrendData: null,
          errors: _.filter(
            errors,
            n => n.api != 'mkNumPatientsByReferralTrend'
          ),
          isLoadingData: _.union(isLoadingData, [
            'mkNumPatientsByReferralTrend',
          ]),
        };
      }
    ),
    on(
      MarketingApiActions.mkNewPatientsByReferralTrendSuccess,
      (state, { newPatientsByReferralTrendData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(
            errors,
            n => n.api != 'mkNumPatientsByReferralTrend'
          ),
          newPatientsByReferralTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkNumPatientsByReferralTrend'
          ),
        };
      }
    ),
    on(
      MarketingApiActions.mkNewPatientsByReferralTrendFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newPatientsByReferralTrendData: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkNumPatientsByReferralTrend'
          ),
          errors: [
            ...errors,
            { ...error, api: 'mkNumPatientsByReferralTrend' },
          ],
        };
      }
    ),
    // mkRevByReferral
    on(
      MarketingPageActions.loadMkRevenueByReferral,
      (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          revenueByReferralData: null,
          errors: _.filter(errors, n => n.api != 'mkRevByReferral'),
          isLoadingData: _.union(isLoadingData, ['mkRevByReferral']),
        };
      }
    ),
    on(
      MarketingApiActions.mkRevenueByReferralSuccess,
      (state, { revenueByReferralData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkRevByReferral'),
          revenueByReferralData,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkRevByReferral'),
        };
      }
    ),
    on(
      MarketingApiActions.mkRevenueByReferralFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          revenueByReferralData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkRevByReferral'),
          errors: [...errors, { ...error, api: 'mkRevByReferral' }],
        };
      }
    ),

    // mkRevByReferralTrend
    on(
      MarketingPageActions.loadMkRevByReferralTrend,
      (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          revenueByReferralTrendData: null,
          errors: _.filter(errors, n => n.api != 'mkRevByReferralTrend'),
          isLoadingData: _.union(isLoadingData, ['mkRevByReferralTrend']),
        };
      }
    ),
    on(
      MarketingApiActions.mkRevByReferralTrendSuccess,
      (state, { revenueByReferralTrendData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkRevByReferralTrend'),
          revenueByReferralTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkRevByReferralTrend'
          ),
        };
      }
    ),
    on(
      MarketingApiActions.mkRevByReferralTrendFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          revenueByReferralTrendData: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkRevByReferralTrend'
          ),
          errors: [...errors, { ...error, api: 'mkRevByReferralTrend' }],
        };
      }
    ),

    // mkNumNewPatients
    on(MarketingPageActions.loadMkNumNewPatients, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        newNumPatientsData: null,
        errors: _.filter(errors, n => n.api != 'mkNumNewPatients'),
        isLoadingData: _.union(isLoadingData, ['mkNumNewPatients']),
      };
    }),
    on(
      MarketingApiActions.mkNumNewPatientsSuccess,
      (state, { newPatientsRatioData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkNumNewPatients'),
          newNumPatientsData: newPatientsRatioData,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkNumNewPatients'),
        };
      }
    ),
    on(
      MarketingApiActions.mkNumNewPatientsFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newNumPatientsData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkNumNewPatients'),
          errors: [...errors, { ...error, api: 'mkNumNewPatients' }],
        };
      }
    ),

    // mkNumNewPatientsTrend
    on(
      MarketingPageActions.loadMkNumNewPatientsTrend,
      (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newNumPatientsTrendData: null,
          errors: _.filter(errors, n => n.api != 'mkNumNewPatientsTrend'),
          isLoadingData: _.union(isLoadingData, ['mkNumNewPatientsTrend']),
        };
      }
    ),
    on(
      MarketingApiActions.mkNumNewPatientsTrendSuccess,
      (state, { numNewPatientsTrendData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkNumNewPatientsTrend'),
          newNumPatientsTrendData: numNewPatientsTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkNumNewPatientsTrend'
          ),
        };
      }
    ),
    on(
      MarketingApiActions.mkNumNewPatientsTrendFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newNumPatientsTrendData: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkNumNewPatientsTrend'
          ),
          errors: [...errors, { ...error, api: 'mkNumNewPatientsTrend' }],
        };
      }
    ),

    // mkActivePatients
    on(MarketingPageActions.loadMkActivePatients, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        activePatientsData: null,
        errors: _.filter(errors, n => n.api != 'mkActivePatients'),
        isLoadingData: _.union(isLoadingData, ['mkActivePatients']),
      };
    }),
    on(
      MarketingApiActions.mkActivePatientsSuccess,
      (state, { activePatientsData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkActivePatients'),
          activePatientsData: activePatientsData,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkActivePatients'),
        };
      }
    ),
    on(
      MarketingApiActions.mkActivePatientsFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          activePatientsData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkActivePatients'),
          errors: [...errors, { ...error, api: 'mkActivePatients' }],
        };
      }
    ),

    // mkActivePatientsTrend
    on(
      MarketingPageActions.loadMkActivePatientsTrend,
      (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          activePatientsTrendData: null,
          errors: _.filter(errors, n => n.api != 'mkActivePatientsTrend'),
          isLoadingData: _.union(isLoadingData, ['mkActivePatientsTrend']),
        };
      }
    ),
    on(
      MarketingApiActions.mkActivePatientsTrendSuccess,
      (state, { activePatientsTrendData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkActivePatientsTrend'),
          activePatientsTrendData: activePatientsTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkActivePatientsTrend'
          ),
        };
      }
    ),
    on(
      MarketingApiActions.mkActivePatientsTrendFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          activePatientsTrendData: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkActivePatientsTrend'
          ),
          errors: [...errors, { ...error, api: 'mkActivePatientsTrend' }],
        };
      }
    ),

    // mkNewPatienttAcq
    on(MarketingPageActions.loadMkNewPatientAcq, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        newPatientAcqData: null,
        errors: _.filter(errors, n => n.api != 'mkNewPatientAcq'),
        isLoadingData: _.union(isLoadingData, ['mkNewPatientAcq']),
      };
    }),
    on(
      MarketingApiActions.mkNewPatientAcqSuccess,
      (state, { newPatientAcqdata }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkNewPatientAcq'),
          newPatientAcqData: newPatientAcqdata,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkNewPatientAcq'),
        };
      }
    ),
    on(
      MarketingApiActions.mkNewPatientAcqFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newPatientAcqData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkNewPatientAcq'),
          errors: [...errors, { ...error, api: 'mkNewPatientAcq' }],
        };
      }
    ),

    // mkNewPatienttAcqTrend
    on(
      MarketingPageActions.loadMkNewPatientAcqTrend,
      (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newPatientAcqTrendData: null,
          errors: _.filter(errors, n => n.api != 'mkNewPatientAcqTrend'),
          isLoadingData: _.union(isLoadingData, ['mkNewPatientAcqTrend']),
        };
      }
    ),
    on(
      MarketingApiActions.mkNewPatientAcqTrendSuccess,
      (state, { newPatientAcqTrenddata }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkNewPatientAcqTrend'),
          newPatientAcqTrendData: newPatientAcqTrenddata,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkNewPatientAcqTrend'
          ),
        };
      }
    ),
    on(
      MarketingApiActions.mkNewPatientAcqTrendFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newPatientAcqTrendData: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkNewPatientAcqTrend'
          ),
          errors: [...errors, { ...error, api: 'mkNewPatientAcqTrend' }],
        };
      }
    ),

    // mkTotalVisits
    on(MarketingPageActions.loadMkTotalVisits, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        totalVisitsData: null,
        errors: _.filter(errors, n => n.api != 'mkTotalVisits'),
        isLoadingData: _.union(isLoadingData, ['mkTotalVisits']),
      };
    }),
    on(
      MarketingApiActions.mkTotalVisitsSuccess,
      (state, { mkTotalVisitsData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkTotalVisits'),
          totalVisitsData: mkTotalVisitsData,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkTotalVisits'),
        };
      }
    ),
    on(
      MarketingApiActions.mkTotalVisitsFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          totalVisitsData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkTotalVisits'),
          errors: [...errors, { ...error, api: 'mkTotalVisits' }],
        };
      }
    ),

    // mkTotalVisitsTrend
    on(MarketingPageActions.loadMkTotalVisitsTrend, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        totalVisitsTrendData: null,
        errors: _.filter(errors, n => n.api != 'mkTotalVisitsTrend'),
        isLoadingData: _.union(isLoadingData, ['mkTotalVisitsTrend']),
      };
    }),
    on(
      MarketingApiActions.mkTotalVisitsTrendSuccess,
      (state, { mkTotalVisitsTrendData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkTotalVisitsTrend'),
          totalVisitsTrendData: mkTotalVisitsTrendData,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkTotalVisitsTrend'
          ),
        };
      }
    ),
    on(
      MarketingApiActions.mkTotalVisitsTrendFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          totalVisitsTrendData: null,
          isLoadingData: _.filter(
            isLoadingData,
            n => n != 'mkTotalVisitsTrend'
          ),
          errors: [...errors, { ...error, api: 'mkTotalVisitsTrend' }],
        };
      }
    ),
    // mkGetXeroAcct
    on(MarketingPageActions.loadMkGetXeroAccounts, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        xeroAccounts: null,
        errors: _.filter(errors, n => n.api != 'mkGetXeroAcct'),
        isLoadingData: _.union(isLoadingData, ['mkGetXeroAcct']),
      };
    }),
    on(
      MarketingApiActions.mkGetXeroAcctSuccess,
      (state, { xeroAccounts }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'mkGetXeroAcct'),
          xeroAccounts,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkGetXeroAcct'),
        };
      }
    ),
    on(
      MarketingApiActions.mkGetXeroAcctFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          xeroAccounts: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkGetXeroAcct'),
          errors: [...errors, { ...error, api: 'mkGetXeroAcct' }],
        };
      }
    ),
    // mkGetMyobAcct
    on(MarketingPageActions.saveAcctMyob, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'mkSaveAcctMyob'),
        isLoadingData: _.union(isLoadingData, ['mkSaveAcctMyob']),
      };
    }),
    on(MarketingApiActions.mkSaveAcctMyobSuccess, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'mkSaveAcctMyob'),
        isLoadingData: _.filter(isLoadingData, n => n != 'mkSaveAcctMyob'),
      };
    }),
    on(
      MarketingApiActions.mkSaveAcctMyobFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkSaveAcctMyob'),
          errors: [...errors, { ...error, api: 'mkSaveAcctMyob' }],
        };
      }
    ),
    // mkSaveAcctXero
    on(MarketingPageActions.saveAcctXero, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'mkSaveAcctXero'),
        isLoadingData: _.union(isLoadingData, ['mkSaveAcctXero']),
      };
    }),
    on(MarketingApiActions.mkSaveAcctXeroSuccess, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'mkSaveAcctXero'),
        isLoadingData: _.filter(isLoadingData, n => n != 'mkSaveAcctXero'),
      };
    }),
    on(
      MarketingApiActions.mkSaveAcctXeroFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          isLoadingData: _.filter(isLoadingData, n => n != 'mkSaveAcctXero'),
          errors: [...errors, { ...error, api: 'mkSaveAcctXero' }],
        };
      }
    ),
    on(
      MarketingPageActions.setIsActivePatients,
      (state, { isActive }): MarketingState => {
        return {
          ...state,
          isActivePatients: isActive,
        };
      }
    ),
    on(MarketingPageActions.setErrors, (state, { errors }): MarketingState => {
      return {
        ...state,
        errors: errors,
      };
    })
  ),
});

export const {
  selectErrors,
  selectIsLoadingData,
  selectNewPatientsByReferralData,
  selectNewPatientsByReferralTrendData,
  selectRevenueByReferralData,
  selectRevenueByReferralTrendData,
  selectNewNumPatientsData,
  selectNewNumPatientsTrendData,
  selectActivePatientsData,
  selectActivePatientsTrendData,
  selectTotalVisitsData,
  selectTotalVisitsTrendData,
  selectNewPatientAcqData,
  selectNewPatientAcqTrendData,
  selectIsActivePatients,
  selectXeroAccounts,
  selectMyobAccounts,
} = marketingFeature;

// Loading State
export const selectIsLoadingMkNewPatientsByReferral = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'mkNumPatientsByReferral') >= 0
);

export const selectIsLoadingMkNewPatientsByReferralTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'mkNumPatientsByReferralTrend') >= 0
);

export const selectIsLoadingMkRevByReferral = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkRevByReferral') >= 0
);

export const selectIsLoadingMkRevByReferralTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkRevByReferralTrend') >= 0
);

export const selectIsLoadingMkNumNewPatients = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkNumNewPatients') >= 0
);

export const selectIsLoadingMkActivePatients = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkActivePatients') >= 0
);

export const selectIsLoadingMkActivePatientsTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'mkActivePatientsTrend') >= 0
);

export const selectIsLoadingMkNumNewPatientsTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'mkNumNewPatientsTrend') >= 0
);

export const selectIsLoadingMkNewPatientAcq = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkNewPatientAcq') >= 0
);

export const selectIsLoadingMkNewPatientAcqTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkNewPatientAcqTrend') >= 0
);

export const selectIsLoadingMkTotalVisits = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkTotalVisits') >= 0
);

export const selectIsLoadingMkTotalVisitsTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkTotalVisitsTrend') >= 0
);

export const selectIsLoadingMkXeroAccounts = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkGetXeroAcct') >= 0
);

export const selectIsLoadingMkMyobAccounts = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkGetMyobAcct') >= 0
);

export const selectIsLoadingMkSaveAcctMyob = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkSaveAcctMyob') >= 0
);

export const selectIsLoadingMkSaveAcctXero = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'mkSaveAcctXero') >= 0
);

// Chart Data

export const selectNewPatientsByReferralChartData = createSelector(
  selectNewPatientsByReferralData,
  selectIsMultiClinicsSelected,
  (
    newPatientsByReferralData,
    isMultiClinics
  ): {
    newPatientsByReferralVal: number;
    labels: string[];
    datasets: ChartDataset[];
  } => {
    if (newPatientsByReferralData == null) {
      return {
        newPatientsByReferralVal: 0,
        labels: [],
        datasets: [],
      };
    }
    if (
      isMultiClinics &&
      !('patientsReftype' in newPatientsByReferralData.data)
    ) {
      const data = <MkNewPatientsByReferralMultiItem[]>(
        newPatientsByReferralData.data
      );
      const chartLables = _.chain(data)
        .map(item => item.clinicName)
        .value();
      return {
        newPatientsByReferralVal: Math.round(
          newPatientsByReferralData.total ?? 0
        ),
        labels: chartLables,
        datasets: _.chain(data)
          .map(v => v.val)
          .flatten()
          .groupBy('reftypeName')
          .map((items, refTypeName) => {
            return {
              data: chartLables.map(clinicName => {
                const item = items.find(i => i.clinicName == clinicName);
                return item ? item.patientsVisits : 0;
              }),
              label: refTypeName,
            };
          })
          .value(),
      };
    } else {
      const data = <MkNewPatientsByReferral>newPatientsByReferralData.data;
      const chartData = [],
        chartLabels = [];
      if (data.patientsReftype) {
        data.patientsReftype.slice(0, 15).forEach(v => {
          chartData.push(v.patientsVisits);
          chartLabels.push(v.reftypeName);
        });
      }
      return {
        newPatientsByReferralVal: Math.round(newPatientsByReferralData.total),
        datasets: [{ data: chartData }],
        labels: chartLabels,
      };
    }
  }
);

export const selectNewPatientsByReferralTrendChartData = createSelector(
  selectNewPatientsByReferralTrendData,
  selectTrend,
  (
    trendChartData,
    trendMode
  ): { datasets: ChartDataset[]; labels: string[] } => {
    if (trendChartData == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let i = 0;
    const chartLabels = [];
    const datasets = _.chain(trendChartData.data)
      .map(v => {
        chartLabels.push(
          trendMode === 'current'
            ? moment(v.duration).format('MMM YYYY')
            : v.duration
        );
        return v.val.map(v1 => {
          return {
            duration: v.duration,
            ...v1,
          };
        });
      })
      .flatten()
      .groupBy('itemName')
      .map((v, itemName) => {
        const bgColor = DoughnutChartColors[i];
        i++;
        return {
          data: v.map(v1 => v1.numReferrals),
          label: itemName,
          backgroundColor: bgColor,
          hoverBackgroundColor: bgColor,
        };
      })
      .value();

    return {
      datasets,
      labels: chartLabels,
    };
  }
);

export const selectRevByReferralChartData = createSelector(
  selectRevenueByReferralData,
  selectIsMultiClinicsSelected,
  (
    revByReferralData,
    isMultiClinics
  ): {
    revByReferralVal: number;
    labels: string[];
    datasets: ChartDataset[];
  } => {
    if (revByReferralData == null) {
      return {
        revByReferralVal: 0,
        labels: [],
        datasets: [],
      };
    }

    if (isMultiClinics && !('patientsReftype' in revByReferralData.data)) {
      const data = <MkRevByReferralMultiItem[]>revByReferralData.data;

      const chartLables = _.chain(data)
        .map(item => item.clinicName)
        .value();
      return {
        revByReferralVal: Math.round(revByReferralData.total ?? 0),
        labels: chartLables,
        datasets: _.chain(data)
          .map(v => v.val)
          .flatten()
          .groupBy('reftypeName')
          .map((items, refTypeName) => {
            return {
              data: chartLables.map(clinicName => {
                const item = items.find(i => i.clinicName == clinicName);
                return item ? item.invoiceAmount : 0;
              }),
              label: refTypeName,
            };
          })
          .value(),
      };
    } else {
      const data = <MkRevByReferral>revByReferralData.data;
      const chartData = [],
        chartLabels = [];
      if (data.patientsReftype) {
        data.patientsReftype.slice(0, 15).forEach((v, idx) => {
          if (v.invoiceAmount > 0) {
            chartData.push(Math.round(v.invoiceAmount));
            chartLabels.push(v.reftypeName);
          }
        });
      }

      return {
        revByReferralVal: Math.round(revByReferralData.total ?? 0),
        datasets: [{ data: chartData }],
        labels: chartLabels,
      };
    }
  }
);

export const selectRevByReferralTrendChartData = createSelector(
  selectRevenueByReferralTrendData,
  selectTrend,
  (
    trendChartData,
    trendMode
  ): { datasets: ChartDataset[]; labels: string[] } => {
    if (trendChartData == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let i = 0;
    const chartLabels = [];
    const datasets = _.chain(trendChartData.data)
      .map(v => {
        chartLabels.push(
          trendMode === 'current'
            ? moment(v.duration).format('MMM YYYY')
            : v.duration
        );
        return v.val.map(v1 => {
          return {
            duration: v.duration,
            ...v1,
          };
        });
      })
      .flatten()
      .groupBy('itemName')
      .map((v, itemName) => {
        const bgColor = DoughnutChartColors[i];
        i++;
        return {
          data: v.map(v1 => v1.invoiceAmount),
          label: itemName,
          backgroundColor: bgColor,
          hoverBackgroundColor: bgColor,
        };
      })
      .value();

    return {
      datasets,
      labels: chartLabels,
    };
  }
);

export const selectNumNewPatientsChartData = createSelector(
  selectNewNumPatientsData,
  (
    newNumPatientsData
  ): {
    newNumPatientsVal: number;
    newNumPatientsPrev: number;
    newNumPatientsGoal: number;
    datasets: ChartDataset[];
    labels: string[];
  } => {
    if (newNumPatientsData == null) {
      return {
        newNumPatientsVal: 0,
        newNumPatientsPrev: 0,
        newNumPatientsGoal: 0,
        datasets: [],
        labels: [],
      };
    }

    const chartData = [],
      chartLabels = [];
    newNumPatientsData.data.forEach(v => {
      chartData.push(Math.round(parseFloat(<string>v.newPatients)));
      chartLabels.push(v.clinicName);
    });
    const chartDatasets = [
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
        ],
        shadowOffsetY: 2,
        shadowBlur: 3,
        // hoverBackgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    return {
      newNumPatientsVal: newNumPatientsData.total,
      newNumPatientsPrev: newNumPatientsData.totalTa,
      newNumPatientsGoal: newNumPatientsData.goals,
      datasets: chartDatasets,
      labels: chartLabels,
    };
  }
);

export const selectNumNewPatientsTrendChartData = createSelector(
  selectNewNumPatientsTrendData,
  selectCurrentClinicId,
  selectTrend,
  (
    newNumPatientsTrendData,
    clinicId,
    trendMode
  ): { datasets: ChartDataset[]; labels: string[] } => {
    if (newNumPatientsTrendData == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    if (typeof clinicId === 'string') {
      const chartLabels = _.chain(newNumPatientsTrendData.data)
        .groupBy(trendMode == 'current' ? 'yearMonth' : 'year')
        .map((items, duration: string) =>
          trendMode == 'current'
            ? moment(duration).format('MMM YYYY')
            : duration
        )
        .value();

      let i = 0;
      const chartDatasets = _.chain(newNumPatientsTrendData.data)
        .groupBy('clinicId')
        .map(items => {
          const bgColor = DoughnutChartColors[i];
          i++;
          return {
            data: items.map(item => _.round(<number>item.newPatients)),
            label: items.length > 0 ? items[0].clinicName : '',
            backgroundColor: bgColor,
            hoverBackgroundColor: bgColor,
          };
        })
        .value();

      return {
        datasets: chartDatasets,
        labels: chartLabels,
      };
    } else {
      const chartData = [],
        chartLabels = [];
      const bgColors = [];
      newNumPatientsTrendData.data.forEach((v, index) => {
        chartData.push(v.newPatients);
        chartLabels.push(
          trendMode === 'current'
            ? moment(v.yearMonth).format('MMM YYYY')
            : v.year
        );
        bgColors.push(index % 2 == 0 ? '#119682' : '#EEEEF8');
      });
      return {
        datasets: [
          {
            data: chartData,
            backgroundColor: bgColors,
          },
        ],
        labels: chartLabels,
      };
    }
  }
);

export const selectActivePatientsChartData = createSelector(
  selectActivePatientsData,
  activePatientsData => {
    if (activePatientsData == null) {
      return {
        activePatientsVal: 0,
        activePatientsPrev: 0,
        activePatientsGoal: 0,
        datasets: [],
        labels: [],
      };
    }
    const chartData = [],
      chartLabels = [];
    activePatientsData.data.forEach((v, index) => {
      chartData.push(Math.round(parseFloat(<string>v.activePatients)));
      chartLabels.push(v.clinicName);
    });
    const datasets: ChartDataset<any>[] = [
      {
        data: chartData,
        label: '',
        shadowOffsetX: 3,
        backgroundColor: [
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
        ],
        shadowOffsetY: 2,
        shadowBlur: 3,
        // hoverBackgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    return {
      activePatientsVal: activePatientsData.total,
      activePatientsPrev: activePatientsData.totalTa,
      activePatientsGoal: activePatientsData.goals,
      datasets: datasets,
      labels: chartLabels,
    };
  }
);

export const selectActivePatientsTrendChartData = createSelector(
  selectActivePatientsTrendData,
  selectCurrentClinicId,
  selectTrend,
  (activePatientsTrendData, clinicId, trendMode) => {
    if (activePatientsTrendData == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    if (typeof clinicId === 'string') {
      const chartLabels = _.chain(activePatientsTrendData.data)
        .groupBy(trendMode == 'current' ? 'yearMonth' : 'year')
        .map((items, duration: string) =>
          trendMode == 'current'
            ? moment(duration).format('MMM YYYY')
            : duration
        )
        .value();

      let i = 0;
      const chartDatasets = _.chain(activePatientsTrendData.data)
        .groupBy('clinicId')
        .map(items => {
          const bgColor = DoughnutChartColors[i];
          i++;
          return {
            data: items.map(item => _.round(<number>item.activePatients)),
            label: items.length > 0 ? items[0].clinicName : '',
            backgroundColor: bgColor,
            hoverBackgroundColor: bgColor,
          };
        })
        .value();

      return {
        datasets: chartDatasets,
        labels: chartLabels,
      };
    } else {
      const chartData = [],
        chartLabels = [];
      const bgColors = [];
      activePatientsTrendData.data.forEach((v, index) => {
        chartData.push(v.activePatients);
        chartLabels.push(
          trendMode === 'current'
            ? moment(v.yearMonth).format('MMM YYYY')
            : v.year
        );
        bgColors.push(index % 2 == 0 ? '#119682' : '#EEEEF8');
      });
      return {
        datasets: [
          {
            data: chartData,
            backgroundColor: bgColors,
          },
        ],
        labels: chartLabels,
      };
    }
  }
);

export const selectNewPatientAcqChartData = createSelector(
  selectNewPatientAcqData,
  newPatientAcqData => {
    if (newPatientAcqData == null) {
      return {
        newPatientAcqVal: 0,
        newPatientAcqPrev: 0,
        newPatientAcqGoal: 0,
        labels: [],
        datasets: [],
      };
    }
    const newPatientAcqVal = _.round(
      _.chain(newPatientAcqData.data)
        .sumBy(v => v.cost)
        .value() /
        _.chain(newPatientAcqData.data)
          .sumBy(v => parseFloat(<string>v.newPatients))
          .value()
    );
    return {
      newPatientAcqVal: newPatientAcqVal,
      newPatientAcqPrev: Math.round(newPatientAcqData.dataTa),
      newPatientAcqGoal: newPatientAcqData.goals,
      labels: newPatientAcqData.data.map(v => v.clinicName),
      datasets: [
        {
          data: newPatientAcqData.data.map(v => _.round(v.costPerPatient)),
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
          ],
        },
      ],
    };
  }
);

export const selectNewPatientAcqTrendChartData = createSelector(
  selectNewPatientAcqTrendData,
  selectTrend,
  (newPatientAcqTrendData, trendMode) => {
    if (newPatientAcqTrendData == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    const chartLabels = [];
    const chartData = [];
    const backgroundColors = [];

    _.chain(newPatientAcqTrendData.data)
      .groupBy(trendMode == 'current' ? 'yearMonth' : 'year')
      .map((items, duration) => {
        return {
          value: _.round(
            _.sumBy(items, (item: MkNewPatientAcqItem) => <number>item.cost) /
              _.sumBy(
                items,
                (item: MkNewPatientAcqItem) => <number>item.newPatients
              ),
            0
          ),
          duration:
            trendMode == 'current'
              ? moment(duration).format('MMM YYYY')
              : duration,
        };
      })
      .value()
      .forEach((data, index) => {
        chartData.push(data.value);
        backgroundColors.push(index % 2 == 0 ? COLORS.even : COLORS.odd);
        chartLabels.push(data.duration);
      });

    return {
      datasets: [
        {
          data: chartData,
          backgroundColor: backgroundColors,
        },
      ],
      labels: chartLabels,
    };
  }
);

export const selectTotalVisitsChartData = createSelector(
  selectTotalVisitsData,
  totalVisitsData => {
    if (totalVisitsData == null) {
      return {
        totalVisitsVal: 0,
        totalVisitsPrev: 0,
        totalVisitsGoal: 0,
        datasets: [],
        labels: [],
      };
    }
    const chartData = [],
      chartLabels = [];
    totalVisitsData.data.forEach(v => {
      chartData.push(Math.round(<number>v.numVisits));
      chartLabels.push(v.clinicName);
    });

    const datasets: ChartDataset<any>[] = [
      {
        data: chartData,
        label: '',
        shadowOffsetX: 3,
        backgroundColor: [
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
          COLORS.even,
          COLORS.odd,
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

    return {
      totalVisitsVal: totalVisitsData.total,
      totalVisitsPrev: totalVisitsData.totalTa,
      totalVisitsGoal: totalVisitsData.goals,
      datasets: datasets,
      labels: chartLabels,
    };
  }
);

export const selectTotalVisitsTrendChartData = createSelector(
  selectTotalVisitsTrendData,
  selectCurrentClinicId,
  selectTrend,
  (totalVisitsTrendData, clinicId, trendMode) => {
    if (totalVisitsTrendData == null) {
      return {
        datasets: [],
        labels: [],
      };
    }
    if (typeof clinicId === 'string') {
      const chartLabels = _.chain(totalVisitsTrendData.data)
        .groupBy(trendMode == 'current' ? 'yearMonth' : 'year')
        .map((items, duration: string) =>
          trendMode == 'current'
            ? moment(duration).format('MMM YYYY')
            : duration
        )
        .value();

      let i = 0;
      const chartDatasets = _.chain(totalVisitsTrendData.data)
        .groupBy('clinicId')
        .map(items => {
          const bgColor = DoughnutChartColors[i];
          i++;
          return {
            data: items.map(item => _.round(<number>item.numVisits)),
            label: items.length > 0 ? items[0].clinicName : '',
            backgroundColor: bgColor,
            hoverBackgroundColor: bgColor,
          };
        })
        .value();

      return {
        datasets: chartDatasets,
        labels: chartLabels,
      };
    } else {
      const chartData = [],
        chartLabels = [];
      const bgColors = [];
      totalVisitsTrendData.data.forEach((v, index) => {
        chartData.push(v.numVisits);
        chartLabels.push(
          trendMode === 'current'
            ? moment(v.yearMonth).format('MMM YYYY')
            : v.year
        );
        bgColors.push(index % 2 == 0 ? '#119682' : '#EEEEF8');
      });
      return {
        datasets: [
          {
            data: chartData,
            backgroundColor: bgColors,
          },
        ],
        labels: chartLabels,
      };
    }
  }
);

export const selectIsActivePatientsWithPlatform = createSelector(
  selectIsActivePatients,
  selectConnectedWith,
  (isActive, isConnected) => {
    return isActive && isConnected;
  }
);
