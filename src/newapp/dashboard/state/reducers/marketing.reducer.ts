import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as _ from 'lodash';
import { JeeveError } from '@/newapp/models';
import { MarketingApiActions, MarketingPageActions } from '../actions';
import { 
    MkActivePatientsApiResponse,
    MkActivePatientsTrendApiResponse,
    MkNewPatientAcqApiResponse, MkNewPatientAcqTrendApiResponse, MkNewPatientsByReferral, MkNewPatientsByReferralApiResponse, 
    MkNewPatientsByReferralMultiItem, 
    MkNewPatientsByReferralTrendApiResponse, 
    MkNumNewPatientsApiResponse, MkNumNewPatientsTrendApiResponse, MkRevByReferral, MkRevByReferralMultiItem, MkRevByReferralTrendApiResponse, MkRevenueByReferralApiResponse, MkTotalVisitsApiResponse, MkTotalVisitsTrendApiResponse 
} from '@/newapp/models/dashboard/marketing';
import { selectCurrentClinicId } from '@/newapp/clinic/state/reducers/clinic.reducer';
import { DoughnutChartColors } from '@/newapp/shared/constants';
import { selectTrend } from '@/newapp/layout/state/reducers/layout.reducer';
import moment from 'moment';
import { ChartDataset } from 'chart.js';
import { selectConnectedWith } from './dashboard.reducer';

type MarketingEndpoints =  
    'mkNumPatientsByReferral' | 'mkRevByReferral' |
    'mkNumNewPatients' | 'mkNewPatientAcq' |
    'mkTotalVisits' | 'mkNumPatientsByReferralTrend' |
    'mkRevByReferralTrend' | 'mkTotalVisitsTrend' |
    'mkNumNewPatientsTrend' | 'mkNewPatientAcqTrend' |
    'mkActivePatients' | 'mkActivePatientsTrend';

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
  isActivePatients: false
};

export const marketingFeature = createFeature({
  name: 'marketing',
  reducer: createReducer(
    initialState,
    // mkNewPatientsByReferral
    on(MarketingPageActions.loadMkNewPatientsByReferral, (state): MarketingState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        newPatientsByReferralData: null,
        errors: _.filter(errors, (n) => n.api != 'mkNumPatientsByReferral'),
        isLoadingData: _.union(isLoadingData, ['mkNumPatientsByReferral'])
      };
    }),
    on(
        MarketingApiActions.mkNewPatientsByReferralSuccess,
      (state, { newPatientsByReferralData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != 'mkNumPatientsByReferral'),
          newPatientsByReferralData,
          isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNumPatientsByReferral')
        };
      }
    ),
    on(
      MarketingApiActions.mkNewPatientsByReferralFailure,
      (state, { error }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newPatientsByReferralData: null,
          isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNumPatientsByReferral'),
          errors: [...errors, { ...error, api: 'mkNumPatientsByReferral' }]
        };
      }
    ),
    // mkNewPatientsByReferralTrend
    on(MarketingPageActions.loadMkNewPatientsByReferralTrend, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
            ...state,
            newPatientsByReferralTrendData: null,
            errors: _.filter(errors, (n) => n.api != 'mkNumPatientsByReferralTrend'),
            isLoadingData: _.union(isLoadingData, ['mkNumPatientsByReferralTrend'])
        };
    }),
    on(
        MarketingApiActions.mkNewPatientsByReferralTrendSuccess,
    (state, { newPatientsByReferralTrendData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
        ...state,
        errors: _.filter(errors, (n) => n.api != 'mkNumPatientsByReferralTrend'),
        newPatientsByReferralTrendData,
        isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNumPatientsByReferralTrend')
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
        isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNumPatientsByReferralTrend'),
        errors: [...errors, { ...error, api: 'mkNumPatientsByReferralTrend' }]
        };
    }
    ),
    // mkRevByReferral
    on(MarketingPageActions.loadMkRevenueByReferral, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          revenueByReferralData: null,
          errors: _.filter(errors, (n) => n.api != 'mkRevByReferral'),
          isLoadingData: _.union(isLoadingData, ['mkRevByReferral'])
        };
    }),
    on(
        MarketingApiActions.mkRevenueByReferralSuccess,
    (state, { revenueByReferralData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
        ...state,
        errors: _.filter(errors, (n) => n.api != 'mkRevByReferral'),
        revenueByReferralData,
        isLoadingData: _.filter(isLoadingData, (n) => n != 'mkRevByReferral')
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
        isLoadingData: _.filter(isLoadingData, (n) => n != 'mkRevByReferral'),
        errors: [...errors, { ...error, api: 'mkRevByReferral' }]
        };
    }
    ),

    // mkRevByReferralTrend
    on(MarketingPageActions.loadMkRevByReferralTrend, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
            ...state,
            revenueByReferralTrendData: null,
            errors: _.filter(errors, (n) => n.api != 'mkRevByReferralTrend'),
            isLoadingData: _.union(isLoadingData, ['mkRevByReferralTrend'])
        };
    }),
    on(
        MarketingApiActions.mkRevByReferralTrendSuccess,
    (state, { revenueByReferralTrendData }): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
        ...state,
        errors: _.filter(errors, (n) => n.api != 'mkRevByReferralTrend'),
        revenueByReferralTrendData,
        isLoadingData: _.filter(isLoadingData, (n) => n != 'mkRevByReferralTrend')
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
        isLoadingData: _.filter(isLoadingData, (n) => n != 'mkRevByReferralTrend'),
        errors: [...errors, { ...error, api: 'mkRevByReferralTrend' }]
        };
    }
    ),

    // mkNumNewPatients
    on(MarketingPageActions.loadMkNumNewPatients, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newNumPatientsData: null,
          errors: _.filter(errors, (n) => n.api != 'mkNumNewPatients'),
          isLoadingData: _.union(isLoadingData, ['mkNumNewPatients'])
        };
    }),
    on(
        MarketingApiActions.mkNumNewPatientsSuccess,
        (state, { newPatientsRatioData }): MarketingState => {
            const { isLoadingData, errors } = state;
            return {
            ...state,
            errors: _.filter(errors, (n) => n.api != 'mkNumNewPatients'),
            newNumPatientsData: newPatientsRatioData,
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNumNewPatients')
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
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNumNewPatients'),
            errors: [...errors, { ...error, api: 'mkNumNewPatients' }]
            };
        }
    ),

    // mkNumNewPatientsTrend
    on(MarketingPageActions.loadMkNumNewPatientsTrend, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
            ...state,
            newNumPatientsTrendData: null,
            errors: _.filter(errors, (n) => n.api != 'mkNumNewPatientsTrend'),
            isLoadingData: _.union(isLoadingData, ['mkNumNewPatientsTrend'])
        };
    }),
    on(
        MarketingApiActions.mkNumNewPatientsTrendSuccess,
        (state, { numNewPatientsTrendData }): MarketingState => {
            const { isLoadingData, errors } = state;
            return {
            ...state,
            errors: _.filter(errors, (n) => n.api != 'mkNumNewPatientsTrend'),
            newNumPatientsTrendData: numNewPatientsTrendData,
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNumNewPatientsTrend')
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
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNumNewPatientsTrend'),
            errors: [...errors, { ...error, api: 'mkNumNewPatientsTrend' }]
            };
        }
    ),

    // mkActivePatients
    on(MarketingPageActions.loadMkActivePatients, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          activePatientsData: null,
          errors: _.filter(errors, (n) => n.api != 'mkActivePatients'),
          isLoadingData: _.union(isLoadingData, ['mkActivePatients'])
        };
    }),
    on(
        MarketingApiActions.mkActivePatientsSuccess,
        (state, { activePatientsData }): MarketingState => {
            const { isLoadingData, errors } = state;
            return {
            ...state,
            errors: _.filter(errors, (n) => n.api != 'mkActivePatients'),
            activePatientsData: activePatientsData,
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkActivePatients')
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
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkActivePatients'),
            errors: [...errors, { ...error, api: 'mkActivePatients' }]
            };
        }
    ),

    // mkActivePatientsTrend
    on(MarketingPageActions.loadMkActivePatientsTrend, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          activePatientsTrendData: null,
          errors: _.filter(errors, (n) => n.api != 'mkActivePatientsTrend'),
          isLoadingData: _.union(isLoadingData, ['mkActivePatientsTrend'])
        };
    }),
    on(
        MarketingApiActions.mkActivePatientsTrendSuccess,
        (state, { activePatientsTrendData }): MarketingState => {
            const { isLoadingData, errors } = state;
            return {
            ...state,
            errors: _.filter(errors, (n) => n.api != 'mkActivePatientsTrend'),
            activePatientsTrendData: activePatientsTrendData,
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkActivePatientsTrend')
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
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkActivePatientsTrend'),
            errors: [...errors, { ...error, api: 'mkActivePatientsTrend' }]
            };
        }
    ),

    // mkNewPatienttAcq
    on(MarketingPageActions.loadMkNewPatientAcq, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          newPatientAcqData: null,
          errors: _.filter(errors, (n) => n.api != 'mkNewPatientAcq'),
          isLoadingData: _.union(isLoadingData, ['mkNewPatientAcq'])
        };
    }),
    on(
        MarketingApiActions.mkNewPatientAcqSuccess,
        (state, { newPatientAcqdata }): MarketingState => {
            const { isLoadingData, errors } = state;
            return {
            ...state,
            errors: _.filter(errors, (n) => n.api != 'mkNewPatientAcq'),
            newPatientAcqData: newPatientAcqdata,
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNewPatientAcq')
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
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNewPatientAcq'),
            errors: [...errors, { ...error, api: 'mkNewPatientAcq' }]
            };
        }
    ),

    // mkNewPatienttAcqTrend
    on(MarketingPageActions.loadMkNewPatientAcqTrend, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
            ...state,
            newPatientAcqTrendData: null,
            errors: _.filter(errors, (n) => n.api != 'mkNewPatientAcqTrend'),
            isLoadingData: _.union(isLoadingData, ['mkNewPatientAcqTrend'])
        };
    }),
    on(
        MarketingApiActions.mkNewPatientAcqTrendSuccess,
        (state, { newPatientAcqTrenddata }): MarketingState => {
            const { isLoadingData, errors } = state;
            return {
            ...state,
            errors: _.filter(errors, (n) => n.api != 'mkNewPatientAcqTrend'),
            newPatientAcqTrendData: newPatientAcqTrenddata,
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNewPatientAcqTrend')
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
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkNewPatientAcqTrend'),
            errors: [...errors, { ...error, api: 'mkNewPatientAcqTrend' }]
            };
        }
    ),

    // mkTotalVisits
    on(MarketingPageActions.loadMkTotalVisits, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          totalVisitsData: null,
          errors: _.filter(errors, (n) => n.api != 'mkTotalVisits'),
          isLoadingData: _.union(isLoadingData, ['mkTotalVisits'])
        };
    }),
    on(
        MarketingApiActions.mkTotalVisitsSuccess,
        (state, { mkTotalVisitsData }): MarketingState => {
            const { isLoadingData, errors } = state;
            return {
            ...state,
            errors: _.filter(errors, (n) => n.api != 'mkTotalVisits'),
            totalVisitsData: mkTotalVisitsData,
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkTotalVisits')
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
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkTotalVisits'),
            errors: [...errors, { ...error, api: 'mkTotalVisits' }]
            };
        }
    ),


    // mkTotalVisitsTrend
    on(MarketingPageActions.loadMkTotalVisitsTrend, (state): MarketingState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          totalVisitsTrendData: null,
          errors: _.filter(errors, (n) => n.api != 'mkTotalVisitsTrend'),
          isLoadingData: _.union(isLoadingData, ['mkTotalVisitsTrend'])
        };
    }),
    on(
        MarketingApiActions.mkTotalVisitsTrendSuccess,
        (state, { mkTotalVisitsTrendData }): MarketingState => {
            const { isLoadingData, errors } = state;
            return {
            ...state,
            errors: _.filter(errors, (n) => n.api != 'mkTotalVisitsTrend'),
            totalVisitsTrendData: mkTotalVisitsTrendData,
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkTotalVisitsTrend')
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
            isLoadingData: _.filter(isLoadingData, (n) => n != 'mkTotalVisitsTrend'),
            errors: [...errors, { ...error, api: 'mkTotalVisitsTrend' }]
            };
        }
    ),

    on(
        MarketingPageActions.setIsActivePatients,
        (state, { isActive }): MarketingState => {
            return {
                ...state,
                isActivePatients: isActive
            };
        }
    ),
  )
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
    selectIsActivePatients
 } = marketingFeature;

 // Loading State
export const selectIsLoadingMkNewPatientsByReferral = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkNumPatientsByReferral') >= 0
);

export const selectIsLoadingMkNewPatientsByReferralTrend = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkNumPatientsByReferralTrend') >= 0
);

export const selectIsLoadingMkRevByReferral = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkRevByReferral') >= 0
);

export const selectIsLoadingMkRevByReferralTrend = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkRevByReferralTrend') >= 0
);

export const selectIsLoadingMkNumNewPatients = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkNumNewPatients') >= 0
);

export const selectIsLoadingMkActivePatients = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkActivePatients') >= 0
);

export const selectIsLoadingMkActivePatientsTrend = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkActivePatientsTrend') >= 0
);

export const selectIsLoadingMkNumNewPatientsTrend = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkNumNewPatientsTrend') >= 0
);

export const selectIsLoadingMkNewPatientAcq = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkNewPatientAcq') >= 0
);

export const selectIsLoadingMkNewPatientAcqTrend = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkNewPatientAcqTrend') >= 0
);

export const selectIsLoadingMkTotalVisits = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkTotalVisits') >= 0
);

export const selectIsLoadingMkTotalVisitsTrend = createSelector(
    selectIsLoadingData,
    (loadingData) => _.findIndex(loadingData, (l) => l == 'mkTotalVisitsTrend') >= 0
);

// Chart Data

export const selectNewPatientsByReferralChartData = createSelector(
    selectNewPatientsByReferralData,
    selectCurrentClinicId,
    (newPatientsByReferralData, clinicId): {newPatientsByReferralVal: number, labels: string[], datasets: ChartDataset[]} => {
        if(newPatientsByReferralData == null){
            return {
                newPatientsByReferralVal: 0,
                labels: [],
                datasets: []
            }
        }
        if(typeof clinicId === 'string'){
            const data = <MkNewPatientsByReferralMultiItem[]>newPatientsByReferralData.data;
            const chartLables = _.chain(data)
            .map((item) => item.clinicName)
            .value();
            return {
                newPatientsByReferralVal: Math.round(newPatientsByReferralData.total??0),
                labels: chartLables,
                datasets: _.chain(data).map(v => v.val).flatten().groupBy('reftypeName').map(
                    (items, refTypeName) => {
                        return {
                            data: chartLables.map(
                                clinicName => {
                                    const item = items.find(i => i.clinicName == clinicName);
                                    return item? item.patientsVisits: 0;
                                }
                            ),
                            label: refTypeName
                        }
                    }
                ).value()
            }
        }else{
            const data = <MkNewPatientsByReferral>newPatientsByReferralData.data;
            const chartData = [], chartLabels = [];
            data.patientsReftype.slice(0, 15).forEach(v => {
                chartData.push(v.patientsVisits);
                chartLabels.push(v.reftypeName);
            });

            return {
                newPatientsByReferralVal: Math.round(newPatientsByReferralData.total),
                datasets: [{data: chartData}],
                labels: chartLabels
            }
        }
    }
);

export const selectNewPatientsByReferralTrendChartData = createSelector(
    selectNewPatientsByReferralTrendData,
    selectTrend,
    (trendChartData, trendMode): { datasets: ChartDataset[], labels: string[]} => {
        if(trendChartData == null){
            return {
                datasets: [],
                labels: []
            }
        }
        let i = 0;
        const chartLabels = [];
        const datasets = _.chain(trendChartData.data).map(
            v => {
                chartLabels.push(trendMode === 'current'?
                    moment(v.duration).format('MMM YYYY'):v.duration);
                return v.val.map(v1 => {
                    return {
                        duration: v.duration,
                        ...v1
                    }
                })
            }
        ).flatten()
        .groupBy('itemName')
        .map(
            (v, itemName) => {
                const bgColor = DoughnutChartColors[i];
                i++;
                return {
                    data: v.map(v1 => v1.numReferrals),
                    label: itemName,
                    backgroundColor:  bgColor,
                    hoverBackgroundColor: bgColor
                }
            }
        ).value();

        return {
            datasets,
            labels: chartLabels
        }
    }
);

export const selectRevByReferralChartData = createSelector(
    selectRevenueByReferralData,
    selectCurrentClinicId,
    (revByReferralData, clinicId): {revByReferralVal: number, labels: string[], datasets: ChartDataset[]} => {
        if(revByReferralData == null){
            return {
                revByReferralVal: 0,
                labels: [],
                datasets: []
            }
        }
        if(typeof clinicId === 'string'){
            const data = <MkRevByReferralMultiItem[]>revByReferralData.data;
            const chartLables = _.chain(data)
            .map((item) => item.clinicName)
            .value();
            return {
                revByReferralVal: Math.round(revByReferralData.total??0),
                labels: chartLables,
                datasets: _.chain(data).map(v => v.val).flatten().groupBy('reftypeName').map(
                    (items, refTypeName) => {
                        return {
                            data: chartLables.map(
                                clinicName => {
                                    const item = items.find(i => i.clinicName == clinicName);
                                    return item? item.invoiceAmount: 0;
                                }
                            ),
                            label: refTypeName
                        }
                    }
                ).value()
            }
        }else{
            const data = <MkRevByReferral>revByReferralData.data;
            const chartData = [], chartLabels = [];
            data.patientsReftype.slice(0, 15).forEach(
                (v, idx)=>{
                    if(v.invoiceAmount > 0){
                        chartData.push(Math.round(v.invoiceAmount));
                        chartLabels.push(v.reftypeName);
                    }
                }
            );

            return {
                revByReferralVal: Math.round(revByReferralData.total??0),
                datasets: [{data: chartData}],
                labels: chartLabels
            }
        }
    }
);

export const selectRevByReferralTrendChartData = createSelector(
    selectRevenueByReferralTrendData,
    selectTrend,
    (trendChartData, trendMode): {datasets: ChartDataset[], labels: string[]} => {
        if(trendChartData == null){
            return {
                datasets: [],
                labels: []
            }
        }
        let i = 0;
        const chartLabels = [];
        const datasets = _.chain(trendChartData.data).map(
            v => {
                chartLabels.push(trendMode === 'current'?
                    moment(v.duration).format('MMM YYYY'):v.duration);
                return v.val.map(v1 => {
                    return {
                        duration: v.duration,
                        ...v1
                    }
                })
            }
        ).flatten()
        .groupBy('itemName')
        .map(
            (v, itemName) => {
                const bgColor = DoughnutChartColors[i];
                i++;
                return {
                    data: v.map(v1 => v1.invoiceAmount),
                    label: itemName,
                    backgroundColor:  bgColor,
                    hoverBackgroundColor: bgColor
                }
            }
        ).value();

        return {
            datasets,
            labels: chartLabels
        }
    }
);

export const selectNumNewPatientsChartData = createSelector(
    selectNewNumPatientsData,
    (newNumPatientsData): {
        newNumPatientsVal: number,
        newNumPatientsPrev: number,
        newNumPatientsGoal: number,
        datasets: ChartDataset[],
        labels: string[]
    } => {
        if(newNumPatientsData == null){
            return {
                newNumPatientsVal: 0,
                newNumPatientsPrev: 0,
                newNumPatientsGoal: 0,
                datasets: [],
                labels: []
            }
        }
        const chartData = [], chartLabels = [];
        newNumPatientsData.data.forEach(v => {
            chartData.push(Math.round(parseFloat(<string>v.newPatients)));
            chartLabels.push(v.clinicName);
        });
        return {
            newNumPatientsVal: newNumPatientsData.total,
            newNumPatientsPrev: newNumPatientsData.totalTa,
            newNumPatientsGoal: newNumPatientsData.goals,
            datasets: [{data: chartData}],
            labels: chartLabels
        }
    }
);

export const selectNumNewPatientsTrendChartData = createSelector(
    selectNewNumPatientsTrendData,
    selectCurrentClinicId,
    selectTrend,
    (newNumPatientsTrendData, clinicId, trendMode): {datasets: ChartDataset[], labels: string[]} => {
        if(newNumPatientsTrendData == null){
            return {
                datasets: [],
                labels: []
            }
        }
        if(typeof clinicId === 'string') {
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
            .map((items) => {
              const bgColor = DoughnutChartColors[i];
              i++;
              return {
                data: items.map((item) => _.round(<number>item.newPatients)),
                label: items.length > 0 ? items[0].clinicName : '',
                backgroundColor: bgColor,
                hoverBackgroundColor: bgColor
              };
            })
            .value();

            return {
                datasets: chartDatasets,
                labels: chartLabels
            }

        }else{
            const chartData = [], chartLabels = [];
            const bgColors = [];
            newNumPatientsTrendData.data.forEach(
                (v, index) => {
                    chartData.push(v.newPatients);
                    chartLabels.push(
                        trendMode === 'current'? moment(v.yearMonth).format('MMM YYYY'): v.year
                    );
                    bgColors.push(
                        index % 2 == 0? '#119682': '#EEEEF8'
                    );
                }
            );
            return {
                datasets: [{
                    data: chartData,
                    backgroundColor: bgColors
                }],
                labels: chartLabels
            }
        }
    }
);

export const selectActivePatientsChartData = createSelector(
    selectActivePatientsData,
    (activePatientsData) => {
        if(activePatientsData == null){
            return {
                activePatientsVal: 0,
                activePatientsPrev: 0,
                activePatientsGoal: 0,
                datasets: [],
                labels: []
            }
        }
        const chartData = [], chartLabels = [];
        activePatientsData.data.forEach(v => {
            chartData.push(Math.round(parseFloat(<string>v.activePatients)));
            chartLabels.push(v.clinicName);
        });
        return {
            activePatientsVal: activePatientsData.total,
            activePatientsPrev: activePatientsData.totalTa,
            activePatientsGoal: activePatientsData.goals,
            datasets: [{data: chartData}],
            labels: chartLabels
        }
    }
);

export const selectActivePatientsTrendChartData = createSelector(
    selectActivePatientsTrendData,
    selectCurrentClinicId,
    selectTrend,
    (activePatientsTrendData, clinicId, trendMode) => {
        if(activePatientsTrendData == null){
            return {
                datasets: [],
                labels: []
            }
        }
        if(typeof clinicId === 'string') {
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
            .map((items) => {
              const bgColor = DoughnutChartColors[i];
              i++;
              return {
                data: items.map((item) => _.round(<number>item.activePatients)),
                label: items.length > 0 ? items[0].clinicName : '',
                backgroundColor: bgColor,
                hoverBackgroundColor: bgColor
              };
            })
            .value();

            return {
                datasets: chartDatasets,
                labels: chartLabels
            }

        }else{
            const chartData = [], chartLabels = [];
            const bgColors = [];
            activePatientsTrendData.data.forEach(
                (v, index) => {
                    chartData.push(v.activePatients);
                    chartLabels.push(
                        trendMode === 'current'? moment(v.yearMonth).format('MMM YYYY'): v.year
                    );
                    bgColors.push(
                        index % 2 == 0? '#119682': '#EEEEF8'
                    );
                }
            );
            return {
                datasets: [{
                    data: chartData,
                    backgroundColor: bgColors
                }],
                labels: chartLabels
            }
        }
    }
);

export const selectNewPatientAcqChartData = createSelector(
    selectNewPatientAcqData,
    (newPatientAcqData) => {
        if(newPatientAcqData == null){
            return {
                newPatientAcqVal: 0,
                newPatientAcqPrev: 0,
                newPatientAcqGoal: 0,
                labels: [],
                datasets: []
            }
        }
        const newPatientAcqVal = _.round(
            _.chain(newPatientAcqData.data).sumBy(v => v.cost).value() /
            _.chain(newPatientAcqData.data).sumBy(
                v => parseFloat(<string>v.newPatients)).value()
        );
        return {
            newPatientAcqVal: newPatientAcqVal,
            newPatientAcqPrev: Math.round(newPatientAcqData.data_ta),
            newPatientAcqGoal: newPatientAcqData.goals,
            labels: newPatientAcqData.data.map(v => v.clinicName),
            datasets: [{
                data: newPatientAcqData.data.map(v => _.round(v.costPerPatient)), 
                backgroundColor: [
                    "#119682",
                    "#EEEEF8",
                    "#119682",
                    "#EEEEF8",
                    "#119682",
                    "#EEEEF8",
                    "#119682",
                    "#EEEEF8",
                    "#119682",
                    "#EEEEF8",
                    "#119682",
                    "#EEEEF8",
                    "#119682",
                ]
            }]
        }
    }
);

export const selectNewPatientAcqTrendChartData = createSelector(
    selectNewPatientAcqTrendData,
    selectTrend,
    (newPatientAcqTrendData, trendMode) => {
        if(newPatientAcqTrendData == null){
            return {
                datasets: [],
                labels: []
            }
        }
        const chartLabels = _.chain(newPatientAcqTrendData.data)
        .groupBy(trendMode == 'current' ? 'yearMonth' : 'year')
        .map((items, duration) =>
          trendMode == 'current'
            ? moment(duration).format('MMM YYYY')
            : duration
        )
        .value();
        let i = 0;
        const chartDatasets = _.chain(newPatientAcqTrendData.data)
            .groupBy('clinicId')
            .map((items) => {
            const bgColors = DoughnutChartColors[i];
            i++;
            return {
                data: items.map((item) =>
                    _.round(<number>item.costPerPatient)
                ),
                label: items.length > 0 ? <string>items[0].clinicName : '',
                backgroundColor: bgColors,
                hoverBackgroundColor: bgColors
            }
            })
            .value();

        return {
            datasets: chartDatasets,
            labels: chartLabels
        }
    }
);


export const selectTotalVisitsChartData = createSelector(
    selectTotalVisitsData,
    (totalVisitsData) => {
        if(totalVisitsData == null){
            return {
                totalVisitsVal: 0,
                totalVisitsPrev: 0,
                totalVisitsGoal: 0,
                datasets: [],
                labels: []
            }
        }
        const chartData = [], chartLabels = [];
        totalVisitsData.data.forEach(v => {
            chartData.push(Math.round(<number>v.numVisits));
            chartLabels.push(v.clinicName);
        });

        return {
            totalVisitsVal: totalVisitsData.total,
            totalVisitsPrev: totalVisitsData.totalTa,
            totalVisitsGoal: totalVisitsData.goals,
            datasets: [{data: chartData}],
            labels: chartLabels
        }
    }
);

export const selectTotalVisitsTrendChartData = createSelector(
    selectTotalVisitsTrendData,
    selectCurrentClinicId,
    selectTrend,
    (totalVisitsTrendData, clinicId, trendMode) => {
        if(totalVisitsTrendData == null){
            return {
                datasets: [],
                labels: []
            }
        }
        if(typeof clinicId === 'string') {
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
            .map((items) => {
              const bgColor = DoughnutChartColors[i];
              i++;
              return {
                data: items.map((item) => _.round(<number>item.numVisits)),
                label: items.length > 0 ? items[0].clinicName : '',
                backgroundColor: bgColor,
                hoverBackgroundColor: bgColor
              };
            })
            .value();

            return {
                datasets: chartDatasets,
                labels: chartLabels
            }

        }else{
            const chartData = [], chartLabels = [];
            const bgColors = [];
            totalVisitsTrendData.data.forEach(
                (v, index) => {
                    chartData.push(v.numVisits);
                    chartLabels.push(
                        trendMode === 'current'? moment(v.yearMonth).format('MMM YYYY'): v.year
                    );
                    bgColors.push(
                        index % 2 == 0? '#119682': '#EEEEF8'
                    );
                }
            );
            return {
                datasets: [{
                    data: chartData,
                    backgroundColor: bgColors
                }],
                labels: chartLabels
            }
        }
    }
);

export const selectIsActivePatientsWithPlatform = createSelector(
    selectIsActivePatients,
    selectConnectedWith,
    (isActive, isConnected) => {
        return isActive && isConnected;
    }
)