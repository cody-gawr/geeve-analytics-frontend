import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import _ from 'lodash';
import { JeeveError } from '@/newapp/models';
import { ClinicianProcedureApiActions, ClinicianProcedurePageActions } from '../actions';
import {
  CpPredictorAnalysisApiResponse,
  CpPredictorAnalysisDataItem,
  CpPredictorRatioApiResponse,
  CpPredictorRatioTrendApiResponse,
  CpPredictorRatioTrendDataItem,
  CpPredictorSpecialistAnalysisApiResponse,
  CpReferralsApiResponse,
  CpReferralsTrendApiResponse,
  CpReferralsTrendDataItem,
  CpRevPerProcedureApiResponse,
} from '@/newapp/models/dashboard/clinician-procedure';
import {
  selectCurrentClinics,
  selectIsMultiClinicsSelected,
} from '@/newapp/clinic/state/reducers/clinic.reducer';
import { selectCurrentDentistId } from '@/newapp/dentist/state/reducers/dentist.reducer';
import { selectTrend } from '@/newapp/layout/state/reducers/layout.reducer';
import { ChartData } from 'chart.js';
import moment from 'moment';
import { selectAuthUserData } from '@/newapp/auth/state/reducers/auth.reducer';
import { COLORS } from '@/newapp/constants';

export interface ClinicianProcedureState {
  isLoadingData: Array<CP_API_ENDPOINTS | CP_API_TREND_ENDPOINTS>;
  errors: Array<JeeveError>;

  resBodyList: Record<CP_API_ENDPOINTS, unknown> | {};
  resBodyListTrend: Record<CP_API_TREND_ENDPOINTS, unknown> | {};

  cpPredictorAnalysisData: CpPredictorAnalysisApiResponse;
  cpPredictorSpecialistAnalysisData: CpPredictorSpecialistAnalysisApiResponse;
  cpRevPerProcedureData: CpRevPerProcedureApiResponse;
  cpPredictorRatioData: CpPredictorRatioApiResponse;
  cpReferralsData: CpReferralsApiResponse;

  cpPredictorAnalysisVisibility: 'general' | 'specialist';
  cpPredictorRatioVisibility:
    | 'indirect to large direct fillings'
    | 'rct to extraction'
    | 'rct conversion';
  cpReferralsVisibility: 'internal' | 'external' | 'combined';
}

const initialState: ClinicianProcedureState = {
  isLoadingData: [],
  errors: [],

  resBodyList: {},
  resBodyListTrend: {},

  cpPredictorAnalysisData: null,
  cpPredictorSpecialistAnalysisData: null,
  cpRevPerProcedureData: null,
  cpPredictorRatioData: null,
  cpReferralsData: null,

  cpPredictorAnalysisVisibility: 'general',
  cpPredictorRatioVisibility: 'indirect to large direct fillings',
  cpReferralsVisibility: 'combined',
};

const generalPropertyToDescription: Record<string, string> = {
  crowns: 'Crowns & Onlays',
  splints: 'Splints',
  rct: 'Root Canals',
  perio: 'Perio Charts',
  extract: 'Surgical Extractions',
  ss_crowns: 'Stainless Steel Crowns',
  comp_veneers: 'Composite Veneers',
  imp_crowns: 'Implant Crowns',
  whitening: 'Whitening',
};

const specialistPropertyToDescription: Record<string, string> = {
  imp_surg: 'Implant Surg',
  ortho_fix: 'Braces',
  ortho_align: 'Aligners',
  sleep: 'MAS',
  perio_surg: 'Perio Surg',
  endo_retreat: 'Endo Re-treat',
  veneers_ind: 'Veneers (indirect)',
};

const cpPredictorRatioVisibilityToLabel: Record<string, string[]> = {
  'indirect to large direct fillings': ['Indirect Restorations', 'Large Direct Restorations'],
  'rct to extraction': ['RCT', 'Extractions'],
  'rct conversion': ["RCT's Started", "RCT's Completed"],
};

const cpPredictorRatioVisibilityToProperty: Record<string, string> = {
  'indirect to large direct fillings': 'val.crown',
  'rct to extraction': 'val.extraction',
  'rct conversion': 'val.completed',
};

const cpReferralsTrendChartLabels = [
  'Oral Surgeon',
  'Orthodontics',
  'Prosthodontics',
  'Endodontics',
  'Paediatrics',
  'Periodontics',
  'Sleep Consult',
  'Implants',
  'Oral Medicine',
];

export const clinicianProcedureFeature = createFeature({
  name: 'clinician-procedure',
  reducer: createReducer(
    initialState,
    on(ClinicianProcedurePageActions.loadCpPredictorAnalysis, (state): ClinicianProcedureState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'cpPredictorAnalysis'),
        cpPredictorAnalysisData: null,
        isLoadingData: _.union(isLoadingData, ['cpPredictorAnalysis']),
      };
    }),
    on(
      ClinicianProcedureApiActions.loadCpPredictorAnalysisSuccess,
      (state, { cpPredictorAnalysisData }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'cpPredictorAnalysis'),
          cpPredictorAnalysisData,
          isLoadingData: _.filter(isLoadingData, n => n != 'cpPredictorAnalysis'),
        };
      },
    ),
    on(
      ClinicianProcedureApiActions.loadCpPredictorAnalysisFailure,
      (state, { error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          cpPredictorAnalysisData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'cpPredictorAnalysis'),
          errors: [...errors, { ...error, api: 'cpPredictorAnalysis' }],
        };
      },
    ),
    // cpPredictorSpecialistAnalysis
    on(
      ClinicianProcedurePageActions.loadCpPredictorSpecialistAnalysis,
      (state): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'cpPredictorSpecialistAnalysis'),
          cpPredictorAnalysisData: null,
          isLoadingData: _.union(isLoadingData, ['cpPredictorSpecialistAnalysis']),
        };
      },
    ),
    on(
      ClinicianProcedureApiActions.loadCpPredictorSpecialistAnalysisSuccess,
      (state, { cpPredictorSpecialistAnalysisData }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'cpPredictorSpecialistAnalysis'),
          cpPredictorSpecialistAnalysisData,
          isLoadingData: _.filter(isLoadingData, n => n != 'cpPredictorSpecialistAnalysis'),
        };
      },
    ),
    on(
      ClinicianProcedureApiActions.loadCpPredictorSpecialistAnalysisFailure,
      (state, { error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          cpPredictorSpecialistAnalysisData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'cpPredictorSpecialistAnalysis'),
          errors: [...errors, { ...error, api: 'cpPredictorSpecialistAnalysis' }],
        };
      },
    ),
    // cpRevPerProcedure
    on(ClinicianProcedurePageActions.loadCpRevPerProcedure, (state): ClinicianProcedureState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'cpRevPerProcedure'),
        cpRevPerProcedureData: null,
        isLoadingData: _.union(isLoadingData, ['cpRevPerProcedure']),
      };
    }),
    on(
      ClinicianProcedureApiActions.loadCpRevPerProcedureSuccess,
      (state, { cpRevPerProcedureData }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'cpRevPerProcedure'),
          cpRevPerProcedureData,
          isLoadingData: _.filter(isLoadingData, n => n != 'cpRevPerProcedure'),
        };
      },
    ),
    on(
      ClinicianProcedureApiActions.loadCpRevPerProcedureFailure,
      (state, { error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          cpRevPerProcedureData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'cpRevPerProcedure'),
          errors: [...errors, { ...error, api: 'cpRevPerProcedure' }],
        };
      },
    ),
    // cpPredictorRatio
    on(ClinicianProcedurePageActions.loadCpPredictorRatio, (state): ClinicianProcedureState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'cpPredictorRatio'),
        cpPredictorRatioData: null,
        isLoadingData: _.union(isLoadingData, ['cpPredictorRatio']),
      };
    }),
    on(
      ClinicianProcedureApiActions.loadCpPredictorRatioSuccess,
      (state, { cpPredictorRatioData }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'cpPredictorRatio'),
          cpPredictorRatioData,
          isLoadingData: _.filter(isLoadingData, n => n != 'cpPredictorRatio'),
        };
      },
    ),
    on(
      ClinicianProcedureApiActions.loadCpPredictorRatioFailure,
      (state, { error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          cpPredictorRatioData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'cpPredictorRatio'),
          errors: [...errors, { ...error, api: 'cpPredictorRatio' }],
        };
      },
    ),
    // cpReferrals
    on(ClinicianProcedurePageActions.loadCpReferrals, (state): ClinicianProcedureState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'cpReferrals'),
        cpReferralsData: null,
        isLoadingData: _.union(isLoadingData, ['cpReferrals']),
      };
    }),
    on(
      ClinicianProcedureApiActions.loadCpReferralsSuccess,
      (state, { cpReferralsData }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'cpReferrals'),
          cpReferralsData,
          isLoadingData: _.filter(isLoadingData, n => n != 'cpReferrals'),
        };
      },
    ),
    on(
      ClinicianProcedureApiActions.loadCpReferralsFailure,
      (state, { error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          cpReferralsData: null,
          isLoadingData: _.filter(isLoadingData, n => n != 'cpReferrals'),
          errors: [...errors, { ...error, api: 'cpReferrals' }],
        };
      },
    ),
    // cpPredictorAnalysisVisibility
    on(
      ClinicianProcedurePageActions.setCpPredictorAnalysisVisibility,
      (state, { value }): ClinicianProcedureState => {
        return {
          ...state,
          cpPredictorAnalysisVisibility: value,
        };
      },
    ),
    // cpPredictorRatioVisibility
    on(
      ClinicianProcedurePageActions.setCpPredictorRatioVisibility,
      (state, { value }): ClinicianProcedureState => {
        return {
          ...state,
          cpPredictorRatioVisibility: value,
        };
      },
    ),
    // cpReferralsVisibility
    on(
      ClinicianProcedurePageActions.setCpReferralsVisibility,
      (state, { value }): ClinicianProcedureState => {
        return {
          ...state,
          cpReferralsVisibility: value,
        };
      },
    ),
    on(
      ClinicianProcedurePageActions.loadTrendApiRequest,
      (state, { api }): ClinicianProcedureState => {
        return {
          ...state,
          errors: _.filter(state.errors, n => n.api != api),
          isLoadingData: _.union(state.isLoadingData, [api]),
          resBodyListTrend: { ...state.resBodyListTrend, [api]: {} },
        };
      },
    ),
    on(
      ClinicianProcedurePageActions.loadCpNoneTrendApiRequestSuccess,
      (state, { api, resBody }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != api),
          resBodyList: { ...state.resBodyList, [api]: resBody },
          isLoadingData: _.filter(isLoadingData, n => n != api),
        };
      },
    ),
    on(
      ClinicianProcedurePageActions.loadCpNoneTrendApiRequestFailure,
      (state, { api, error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          resBodyList: { ...state.resBodyList, [api]: {} },
          isLoadingData: _.filter(isLoadingData, n => n != api),
          errors: [...errors, { ...error, api: api }],
        };
      },
    ),
    on(
      ClinicianProcedurePageActions.loadCpTrendApiRequestSuccess,
      (state, { api, resBody }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != api),
          isLoadingData: _.filter(isLoadingData, n => n != api),
          resBodyListTrend: { ...state.resBodyListTrend, [api]: resBody },
        };
      },
    ),
    on(
      ClinicianProcedurePageActions.loadCpTrendApiRequestFailure,
      (state, { api, error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          resBodyListTrend: { ...state.resBodyListTrend, [api]: {} },
          isLoadingData: _.filter(isLoadingData, n => n != api),
          errors: [...errors, { ...error, api: api }],
        };
      },
    ),
  ),
});

export const {
  selectErrors,
  selectIsLoadingData,
  selectCpPredictorAnalysisData,
  selectCpPredictorSpecialistAnalysisData,
  selectCpRevPerProcedureData,
  selectCpPredictorRatioData,
  selectCpReferralsData,
  selectCpPredictorAnalysisVisibility,
  selectCpPredictorRatioVisibility,
  selectCpReferralsVisibility,
  selectResBodyList,
  selectResBodyListTrend,
} = clinicianProcedureFeature;

export const selectCpPredictorAnalysisError = createSelector(
  selectErrors,
  (errors): JeeveError | undefined => _.find(errors, e => e.api == 'cpPredictorAnalysis'),
);

export const selectIsLoadingCpPredictorAnalysis = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'cpPredictorAnalysis') != -1,
);

export const selectIsLoadingCpPredictorAnalysisTrend = createSelector(
  selectIsLoadingData,
  loadingData => {
    return _.findIndex(loadingData, l => l == 'cpPredictorAnalysisTrend') != -1;
  },
);

export const selectIsLoadingCpPredictorSpecialistAnalysis = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'cpPredictorSpecialistAnalysis') != -1,
);

export const selectIsLoadingCpRevPerProcedure = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'cpRevPerProcedure') != -1,
);

export const selectIsLoadingCpPredictorRatio = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'cpPredictorRatio') != -1,
);

export const selectIsLoadingCpPredictorRatioTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'cpPredictorRatioTrend') != -1,
);

export const selectIsLoadingCpReferrals = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'cpReferrals') != -1,
);

export const selectIsLoadingCpReferralsTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'cpReferralsTrend') != -1,
);

export const selectCpPredictorAnalysisChartData = createSelector(
  selectCpPredictorAnalysisData,
  selectCurrentClinics,
  selectCurrentDentistId,
  selectAuthUserData,
  (resData, clinics, dentistId, authUserData) => {
    if (!resData || !resData.data || resData.data.length == 0) {
      return {
        datasets: [],
        labels: [],
      };
    }

    let chartDatasets = [],
      chartLabels = [];

    if (clinics.length > 1) {
      Object.keys(generalPropertyToDescription).forEach(() => {
        chartDatasets.push({
          data: [],
          label: '',
        });
      });

      _.chain(resData.data)
        .groupBy('clinicId')
        .map(items => {
          return {
            ...items[0],
            whitening: _.sumBy(items, item => Math.round(parseFloat(<string>item.whitening))),
            imp_crowns: _.sumBy(items, item => Math.round(parseFloat(<string>item.impCrowns))),
            crowns: _.sumBy(items, item => Math.round(parseFloat(<string>item.crowns))),
            splints: _.sumBy(items, item => Math.round(parseFloat(<string>item.splints))),
            rct: _.sumBy(items, item => Math.round(parseFloat(<string>item.rct))),
            perio: _.sumBy(items, item => Math.round(parseFloat(<string>item.perio))),
            extract: _.sumBy(items, item => Math.round(parseFloat(<string>item.extract))),
            ss_crowns: _.sumBy(items, item => Math.round(parseFloat(<string>item.ssCrowns))),
            comp_veneers: _.sumBy(items, item => Math.round(parseFloat(<string>item.compVeneers))),
          };
        })
        .value()
        .forEach(item => {
          chartLabels.push(item.clinicName);
          Object.keys(generalPropertyToDescription).forEach((key, index) => {
            chartDatasets[index]['data'].push(Math.trunc(item[key]));
            chartDatasets[index]['label'] = generalPropertyToDescription[key];
          });
        });
      return {
        datasets: chartDatasets,
        labels: chartLabels,
      };
    } else if (dentistId !== 'all') {
      const chartDatasets: any[] = [
        {
          data: [10, 1, 5],
          label: 'Items Predictor Analysis ',
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
      ];
      const chartData = [];
      const chartLabels = [];
      var temp = [];
      temp['Crowns'] = resData.data[0].crowns;

      temp['Splints'] = resData.data[0].splints;

      temp['Root Canals'] = resData.data[0].rct;

      temp['Perio'] = resData.data[0].perio;

      temp['Surgical Extractions'] = resData.data[0].extract;
      temp['Stainless Steel Crowns'] = resData.data[0].ssCrowns;
      temp['Composite Veneers'] = resData.data[0].compVeneers;
      temp['Implant Crowns'] = resData.data[0].impCrowns;
      temp['Whitening'] = resData.data[0].whitening;
      var tupleArray = [];
      for (var key in temp) tupleArray.push([key, temp[key]]);
      tupleArray.sort(function (a, b) {
        return b[1] - a[1];
      });

      tupleArray.forEach((res, key) => {
        chartData.push(res[1]);
        chartLabels.push(res[0]);
      });
      chartDatasets[0]['data'] = chartData;
      chartDatasets[0]['label'] = 'DentistMode-' + resData.data[0].providerName;
      //this.itemPredictedChartLabels= ['Crowns','Splints','Root Canals','Perio','Surgical Extractions'];

      const maxData = Math.max(...chartDatasets[0]['data']);
      return {
        datasets: chartDatasets,
        labels: chartLabels,
        maxData: maxData,
      };
    } else {
      chartDatasets = [
        { data: [], label: 'Crowns & Onlays' },
        { data: [], label: 'Splints' },
        { data: [], label: 'Root Canals' },
        { data: [], label: 'Perio Charts' },
        { data: [], label: 'Surgical Extractions' },
        { data: [], label: 'Stainless Steel Crowns' },
        { data: [], label: 'Composite Veneers' },
        { data: [], label: 'Implant Crowns' },
        { data: [], label: 'Whitening' },
      ];
      const stackedChartData1 = [],
        stackedChartData2 = [],
        stackedChartData3 = [],
        stackedChartData4 = [],
        stackedChartData5 = [],
        stackedChartData6 = [],
        stackedChartData7 = [],
        stackedChartData8 = [],
        stackedChartData9 = [],
        paTableData = [];

      resData.data
        .filter(
          item =>
            Math.round(parseFloat(<string>item.crowns)) +
              Math.round(parseFloat(<string>item.splints)) +
              Math.round(parseFloat(<string>item.rct)) +
              Math.round(parseFloat(<string>item.perio)) +
              Math.round(parseFloat(<string>item.extract)) +
              Math.round(parseFloat(<string>item.ssCrowns)) +
              Math.round(parseFloat(<string>item.compVeneers)) +
              Math.round(parseFloat(<string>item.impCrowns)) >
              0 && item.providerId,
        )
        .forEach((item, index) => {
          // let ipKey = null;
          if (index < authUserData.maxChartBars) {
            stackedChartData1.push(item.crowns);
            stackedChartData2.push(item.splints);
            stackedChartData3.push(item.rct);
            stackedChartData4.push(item.perio);
            stackedChartData5.push(item.extract);
            stackedChartData6.push(item.ssCrowns);
            stackedChartData7.push(item.compVeneers);
            stackedChartData8.push(item.impCrowns);
            stackedChartData9.push(item.whitening);
            chartLabels.push(item.providerName);
            console.log(item.providerName);
          }

          let temp = {
            name: item.providerName,
            Crowns_Onlays: Math.round(parseFloat(<string>item.crowns)),
            Splints: Math.round(parseFloat(<string>item.splints)),
            RCT: Math.round(parseFloat(<string>item.rct)),
            Perio: Math.round(parseFloat(<string>item.perio)),
            Surg_Ext: Math.round(parseFloat(<string>item.extract)),
            Imp_Crowns: Math.round(parseFloat(<string>item.impCrowns)),
            SS_Crowns: Math.round(parseFloat(<string>item.ssCrowns)),
            Comp_Veneers: Math.round(parseFloat(<string>item.compVeneers)),
            Whitening: Math.round(parseFloat(<string>item.whitening)),
          };
          console.log(temp);
          paTableData.push(temp);
          // if (item.providerName != 'Anonymous') {
          //   ipKey = index;
          // }
        });

      chartDatasets[0]['data'] = stackedChartData1;
      chartDatasets[1]['data'] = stackedChartData2;
      chartDatasets[2]['data'] = stackedChartData3;
      chartDatasets[3]['data'] = stackedChartData4;
      chartDatasets[4]['data'] = stackedChartData5;
      chartDatasets[5]['data'] = stackedChartData6;
      chartDatasets[6]['data'] = stackedChartData7;
      chartDatasets[7]['data'] = stackedChartData8;
      chartDatasets[8]['data'] = stackedChartData9;

      const stackedChartDataMax =
        Math.max(...chartDatasets[0]['data']) +
        Math.max(...chartDatasets[1]['data']) +
        Math.max(...chartDatasets[2]['data']) +
        Math.max(...chartDatasets[3]['data']) +
        Math.max(...chartDatasets[4]['data']) +
        Math.max(...chartDatasets[5]['data']) +
        Math.max(...chartDatasets[6]['data']) +
        Math.max(...chartDatasets[7]['data']) +
        Math.max(...chartDatasets[8]['data']);

      const bgColors = [
        { backgroundColor: '#6cd8ba' },
        { backgroundColor: '#b0fffa' },
        { backgroundColor: '#abb3ff' },
        { backgroundColor: '#feefb8' },
        { backgroundColor: '#ffb4b5' },
        { backgroundColor: '#fffcac' },
      ];
      return {
        datasets: chartDatasets,
        labels: chartLabels,
        bgColors,
        maxData: stackedChartDataMax,
        paTableData,
      };
    }
  },
);

export const selectCpPredictorSpecialistAnalysisChartData = createSelector(
  selectCpPredictorSpecialistAnalysisData,
  selectCurrentClinics,
  selectCurrentDentistId,
  selectAuthUserData,
  (resData, clinics, dentistId, authUserData) => {
    if (!resData || !resData.data || resData.data.length == 0) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let chartDatasets = [],
      chartLabels = [];
    if (clinics.length > 1) {
      chartLabels = _.chain(resData.data)
        .uniqBy(item => item.clinicId)
        .sortBy(item => item.clinicId)
        .map(item => item.clinicName)
        .value();
      const descriptionMap: Record<string, string> = {
        impSurg: 'Implant Surg',
        orthoFix: 'Braces',
        orthoAlign: 'Aligners',
        sleep: 'MAS',
        perioSurg: 'Perio Surg',
        endoRetreat: 'Endo Re-treat',
        veneersInd: 'Veneers (indirect)',
      };
      Object.entries(descriptionMap).forEach(([property, description], index) => {
        const data: number[] = _.chain(resData.data)
          .groupBy('clinicId')
          .sortBy((items, clinicId) => clinicId)
          .map((items, clinicId) => {
            return _.chain(items)
              .sumBy(item => Number(item[property]) || 0)
              .value();
          })
          .value();
        chartDatasets.push({
          data,
          label: description,
          backgroundColor: COLORS.presetColors[index % COLORS.presetColors.length],
          hoverBackgroundColor: COLORS.presetColors[index % COLORS.presetColors.length],
        });
      });

      return {
        datasets: chartDatasets,
        labels: chartLabels,
      };
    } else if (dentistId !== 'all') {
      const chartDatasets: any[] = [
        {
          data: [10, 1, 5],
          label: 'Items Predictor Specail Analysis ',
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
      ];
      const chartData = [];
      const chartLabels = [];
      var temp = [];
      temp['Implant Surg'] = resData.data[0].impSurg;
      temp['Braces'] = resData.data[0].orthoFix;
      temp['Aligners'] = resData.data[0].orthoAlign;
      temp['MAS'] = resData.data[0].sleep;
      temp['Perio Surg'] = resData.data[0].perioSurg;
      temp['Endo Re-treat'] = resData.data[0].endoRetreat;
      temp['Veneers (indirect)'] = resData.data[0].veneersInd;
      var tupleArray = [];
      for (var key in temp) tupleArray.push([key, temp[key]]);
      tupleArray.sort(function (a, b) {
        return b[1] - a[1];
      });

      tupleArray.forEach((res, key) => {
        chartData.push(res[1]);
        chartLabels.push(res[0]);
      });
      chartDatasets[0]['data'] = chartData;
      chartDatasets[0]['label'] = 'DentistMode-' + resData.data[0].providerName;
      //this.itemPredictedChartLabels= ['Crowns','Splints','Root Canals','Perio','Surgical Extractions'];

      const maxData = Math.max(...chartDatasets[0]['data']);
      return {
        datasets: chartDatasets,
        labels: chartLabels,
        maxData: maxData,
      };
    } else {
      chartDatasets = [
        { data: [], label: 'Implant Surg' },
        { data: [], label: 'Braces' },
        { data: [], label: 'Aligners' },
        { data: [], label: 'MAS' },
        { data: [], label: 'Perio Surg' },
        { data: [], label: 'Endo Re-treat' },
        { data: [], label: 'Veneers (indirect)' },
      ];
      const stackedChartData1 = [],
        stackedChartData2 = [],
        stackedChartData3 = [],
        stackedChartData4 = [],
        stackedChartData5 = [],
        stackedChartData6 = [],
        stackedChartData7 = [],
        paSpecialTableData = [];

      resData.data
        .filter(
          item =>
            Math.round(parseFloat(<string>item.impSurg)) +
              Math.round(parseFloat(<string>item.orthoFix)) +
              Math.round(parseFloat(<string>item.sleep)) +
              Math.round(parseFloat(<string>item.orthoAlign)) +
              Math.round(parseFloat(<string>item.perioSurg)) +
              Math.round(parseFloat(<string>item.veneersInd)) >
              0 && item.providerId,
        )
        .forEach((item, index) => {
          // let ipKey = null;
          if (index < authUserData.maxChartBars) {
            stackedChartData1.push(item.impSurg);
            stackedChartData2.push(item.orthoFix);
            stackedChartData3.push(item.orthoAlign);
            stackedChartData4.push(item.sleep);
            stackedChartData5.push(item.perioSurg);
            stackedChartData6.push(item.endoRetreat);
            stackedChartData7.push(item.veneersInd);
            chartLabels.push(item.providerName);
            // if (item.providerName != 'Anonymous') {
            //   ipKey = index;
            // }
          }

          let temp = {
            name: item.providerName,
            Implant_Surg: Math.round(parseFloat(<string>item.impSurg)),
            Braces: Math.round(parseFloat(<string>item.orthoFix)),
            Aligners: Math.round(parseFloat(<string>item.orthoAlign)),
            MAS: Math.round(parseFloat(<string>item.sleep)),
            Perio_Surg: Math.round(parseFloat(<string>item.perioSurg)),
            Endo_Re_treat: Math.round(parseFloat(<string>item.endoRetreat)),
            Veneers_ind: Math.round(parseFloat(<string>item.veneersInd)),
          };

          paSpecialTableData.push(temp);
        });
      chartDatasets[0]['data'] = stackedChartData1;
      chartDatasets[1]['data'] = stackedChartData2;
      chartDatasets[2]['data'] = stackedChartData3;
      chartDatasets[3]['data'] = stackedChartData4;
      chartDatasets[4]['data'] = stackedChartData5;
      chartDatasets[5]['data'] = stackedChartData6;
      chartDatasets[6]['data'] = stackedChartData7;

      const stackedChartDataMax =
        Math.max(...chartDatasets[0]['data']) +
        Math.max(...chartDatasets[1]['data']) +
        Math.max(...chartDatasets[2]['data']) +
        Math.max(...chartDatasets[3]['data']) +
        Math.max(...chartDatasets[4]['data']) +
        Math.max(...chartDatasets[5]['data']) +
        Math.max(...chartDatasets[6]['data']);

      const bgColors = [
        { backgroundColor: '#6cd8ba' },
        { backgroundColor: '#b0fffa' },
        { backgroundColor: '#abb3ff' },
        { backgroundColor: '#feefb8' },
        { backgroundColor: '#ffb4b5' },
        { backgroundColor: '#fffcac' },
        { backgroundColor: '#6cd8ba' },
        { backgroundColor: '#feefb8' },
      ];
      return {
        datasets: chartDatasets,
        labels: chartLabels,
        bgColors,
        maxData: stackedChartDataMax,
        paSpecialTableData: paSpecialTableData,
      };
    }
  },
);

export const selectCpRevPerProcedureChartData = createSelector(
  selectCpRevPerProcedureData,
  resData => {
    if (!resData) {
      return {
        datasets: [],
        labels: [],
      };
    }
    const chartData = [],
      chartLabels = [];
    resData.data.forEach(item => {
      chartData.push(Math.round(<number>item.total));
      if (item.itemName != null) {
        chartLabels.push(item.itemName);
      } else {
        chartLabels.push(item.treatCode);
      }
    });
    const chartDatasets = [
      {
        data: [],
        label: 'Total Revenue of Clinician Per Procedure',
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 5,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: [
          '#119682',
          '#eeeef8',
          '#119682',
          '#eeeef8',
          '#119682',
          '#eeeef8',
          '#119682',
          '#eeeef8',
          '#119682',
          '#eeeef8',
        ],
        pointBevelWidth: 2,
        pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
        pointBevelShadowColor: 'rgba(0, 0, 0, 0.5)',
        pointShadowOffsetX: 3,
        pointShadowOffsetY: 3,
        pointShadowBlur: 10,
        pointShadowColor: 'rgba(0, 0, 0, 0.5)',
        backgroundOverlayMode: 'multiply',
      },
    ];
    chartDatasets[0]['data'] = chartData;
    return {
      datasets: chartDatasets,
      labels: chartLabels,
    };
  },
);

export const selectCpPredictorRatioChartData = createSelector(
  selectCpPredictorRatioData,
  selectCurrentClinics,
  selectCpPredictorRatioVisibility,
  (resData, clinics, visibility) => {
    if (!resData) {
      return {
        datasets: [],
        labels: [],
      };
    }

    let chartDatasets1 = [],
      chartDatasets2 = [],
      chartDatasets3 = [],
      chartLabels1 = [],
      chartLabels2 = [],
      chartLabels3 = [];

    if (clinics.length > 1) {
      const types = ['crown-largefilling', 'rct-extraction', 'rctstarted-rctcompleted'];
      chartDatasets1 = [
        { data: [], label: '' },
        { data: [], label: '' },
      ];
      chartDatasets2 = [
        { data: [], label: '' },
        { data: [], label: '' },
      ];
      chartDatasets3 = [
        { data: [], label: '' },
        { data: [], label: '' },
      ];
      let ratio1 = 0,
        ratio2 = 0,
        ratio3 = 0,
        ratio4 = 0,
        ratio5 = 0,
        ratio6 = 0,
        multifulratio1 = '',
        multifulratio2 = '',
        multifulratio3 = '';

      let cpPredictorRatioPrev1 = [0, 0];

      let cpPredictorRatioPrev2 = [0, 0];

      let cpPredictorRatioPrev3 = [0, 0];

      types.forEach(type => {
        resData.data
          .filter(item => item.type == type)
          .forEach(ele => {
            switch (type) {
              case 'crown-largefilling':
                chartDatasets1[0]['data'].push(ele.firstValue);
                chartDatasets1[1]['data'].push(ele.secondValue);
                chartDatasets1[0]['label'] = 'Indirect Restorations';
                chartDatasets1[1]['label'] = 'Large Direct Restorations';
                ratio1 += Math.round(parseFloat(<string>ele.firstValue)) || 0;
                ratio2 += Math.round(parseFloat(<string>ele.secondValue)) || 0;
                multifulratio1 = ratio1 + ':' + ratio2;
                cpPredictorRatioPrev1[0] += Number(ele.totalTa.split(':')[0]);
                cpPredictorRatioPrev1[1] += Number(ele.totalTa.split(':')[1]);
                chartLabels1.push(ele.clinicName);
                break;
              case 'rct-extraction':
                chartDatasets2[0]['data'].push(ele.firstValue);
                chartDatasets2[1]['data'].push(ele.secondValue);
                chartDatasets2[0]['label'] = 'RCT';
                chartDatasets2[1]['label'] = 'Extractions';
                ratio3 += Math.round(parseFloat(<string>ele.firstValue)) || 0;
                ratio4 += Math.round(parseFloat(<string>ele.secondValue)) || 0;
                multifulratio2 = ratio3 + ':' + ratio4;
                cpPredictorRatioPrev2[0] += Number(ele.totalTa.split(':')[0]);
                cpPredictorRatioPrev2[1] += Number(ele.totalTa.split(':')[1]);
                chartLabels2.push(ele.clinicName);
                break;
              case 'rctstarted-rctcompleted':
                chartDatasets3[0]['data'].push(ele.firstValue);
                chartDatasets3[1]['data'].push(ele.secondValue);
                chartDatasets3[0]['label'] = "RCT's Started";
                chartDatasets3[1]['label'] = "RCT's Completed";
                ratio5 += Math.round(parseFloat(<string>ele.firstValue)) || 0;
                ratio6 += Math.round(parseFloat(<string>ele.secondValue)) || 0;
                multifulratio3 = ratio5 + ':' + ratio6;
                cpPredictorRatioPrev3[0] += Number(ele.totalTa.split(':')[0]);
                cpPredictorRatioPrev3[1] += Number(ele.totalTa.split(':')[1]);
                chartLabels3.push(ele.clinicName);
                break;
              default:
                break;
            }
          });
      });
      if (visibility === 'indirect to large direct fillings') {
        return {
          datasets: chartDatasets1,
          labels: chartLabels1,
          cpPredictorRatioPrev: cpPredictorRatioPrev1.join(':'),
          ratio1: ratio1,
          ratio2: ratio2,
          multifulRatio: multifulratio1,
        };
      } else if (visibility === 'rct to extraction') {
        return {
          datasets: chartDatasets2,
          labels: chartLabels2,
          cpPredictorRatioPrev: cpPredictorRatioPrev2.join(':'),
          ratio1: ratio3,
          ratio2: ratio4,
          multifulRatio: multifulratio2,
        };
      } else {
        return {
          datasets: chartDatasets3,
          labels: chartLabels3,
          cpPredictorRatioPrev: cpPredictorRatioPrev3.join(':'),
          ratio1: ratio5,
          ratio2: ratio6,
          multifulRatio: multifulratio3,
        };
      }
    } else {
      const cpPredictorRatioPrev1 =
        resData.data.find(item => item.type == 'crown-largefilling')?.totalTa || '';

      const cpPredictorRatioPrev2 =
        resData.data.find(item => item.type == 'rct-extraction')?.totalTa || '';

      const cpPredictorRatioPrev3 =
        resData.data.find(item => item.type == 'rctstarted-rctcompleted')?.totalTa || '';
      (chartDatasets1 = [
        { data: [], label: 'Indirect Restorations' },
        { data: [], label: 'Large Direct Restorations' },
      ]),
        (chartDatasets2 = [
          { data: [], label: 'RCT' },
          { data: [], label: 'Extractions' },
        ]),
        (chartDatasets3 = [
          { data: [], label: "RCT's Started" },
          { data: [], label: "RCT's Completed" },
        ]);
      let cpPredictorRatioAvr1 = '',
        cpPredictorRatioAvr2 = '',
        cpPredictorRatioAvr3 = '';
      resData.data.forEach(item => {
        let provider = item.providerName ?? '';
        switch (item.type) {
          case 'crown-largefilling':
            chartDatasets1[0]['data'].push(item.firstValue);
            chartDatasets1[1]['data'].push(item.secondValue);
            cpPredictorRatioAvr1 = item.ratio;
            chartLabels1.push(provider);
            break;
          case 'rct-extraction':
            chartDatasets2[0]['data'].push(item.firstValue);
            chartDatasets2[1]['data'].push(item.secondValue);
            cpPredictorRatioAvr2 = item.ratio;
            chartLabels2.push(provider);
            break;
          case 'rctstarted-rctcompleted':
            chartDatasets3[0]['data'].push(Math.round(parseFloat(<string>item.firstValue)));
            chartDatasets3[1]['data'].push(Math.round(parseFloat(<string>item.secondValue)));
            cpPredictorRatioAvr3 = item.ratio;
            chartLabels3.push(provider);
            break;
          default:
            break;
        }
      });

      if (visibility === 'indirect to large direct fillings') {
        return {
          datasets: chartDatasets1,
          labels: chartLabels1,
          cpPredictorRatioPrev: cpPredictorRatioPrev1,
          cpPredictorRatioAvr: cpPredictorRatioAvr1,
        };
      } else if (visibility === 'rct to extraction') {
        return {
          datasets: chartDatasets2,
          labels: chartLabels2,
          cpPredictorRatioPrev: cpPredictorRatioPrev2,
          cpPredictorRatioAvr: cpPredictorRatioAvr2,
        };
      } else {
        return {
          datasets: chartDatasets3,
          labels: chartLabels3,
          cpPredictorRatioPrev: cpPredictorRatioPrev3,
          cpPredictorRatioAvr: cpPredictorRatioAvr3,
        };
      }
    }
    //changeDentistPredictorMain('1');
  },
);

export const selectCpReferralsChartData = createSelector(
  selectCpReferralsData,
  selectCpReferralsVisibility,
  selectIsMultiClinicsSelected,
  (resData, visibility, isMultiClinics) => {
    if (!resData) {
      return {};
    }
    let chartData1 = [],
      chartLabels1 = [],
      chartData2 = [],
      chartLabels2 = [],
      chartData3 = [],
      chartLabels3 = [];

    let pieChartInternalTotal = 0,
      pieChartExternalTotal = 0,
      pieChartCombinedTotal = 0,
      pieChartInternalPrev = 0,
      pieChartExternalPrev = 0,
      pieChartCombinedPrev = 0;
    if (isMultiClinics) {
      const data: _.CollectionChain<{
        treatItemName: string;
        internal: number;
        external: number;
        total: number;
      }> = _.chain(resData.data)
        .groupBy('treatItemName')
        .map((items: any[], treatItemName: string) => {
          return {
            treatItemName,
            internal: _.sumBy(items, item => Number(item.internal)),
            external: _.sumBy(items, item => Number(item.external)),
            total: _.sumBy(items, item => Number(item.total)),
          };
        });
      const data1 = data.orderBy(item => item.internal, 'desc').filter(item => item.internal > 0);
      const data2 = data.orderBy(item => item.external, 'desc').filter(item => item.external > 0);
      const data3 = data.orderBy(item => item.total, 'desc').filter(item => item.total > 0);
      chartData1 = data1.map(v => v.internal).value();
      chartLabels1 = data1.map(v => v.treatItemName).value();
      pieChartInternalTotal = data1.sumBy(item => item.internal).value();

      chartData2 = data2.map(v => v.external).value();
      chartLabels2 = data2.map(v => v.treatItemName).value();
      pieChartExternalTotal = data2.sumBy(item => item.external).value();

      chartData3 = data3.map(v => v.total).value();
      chartLabels3 = data3.map(v => v.treatItemName).value();
      pieChartCombinedTotal = data3.sumBy(item => item.total).value();
    } else {
      resData.data.forEach(item => {
        if (Math.round(parseFloat(<string>item.total)) > 0) {
          if (Math.round(parseFloat(<string>item.internal)) > 0) {
            chartData1.push(item.internal);
            chartLabels1.push(item.treatItemName);
          }
          if (Math.round(parseFloat(<string>item.external)) > 0) {
            chartData2.push(item.external);
            chartLabels2.push(item.treatItemName);
          }

          chartData3.push(item.total);
          chartLabels3.push(item.treatItemName);

          pieChartInternalTotal =
            pieChartInternalTotal + Math.round(parseFloat(<string>item.internal));
          pieChartExternalTotal =
            pieChartExternalTotal + Math.round(parseFloat(<string>item.external));
          pieChartCombinedTotal =
            pieChartCombinedTotal + Math.round(parseFloat(<string>item.total));
        }
      });

      pieChartInternalPrev =
        pieChartInternalPrev + Math.round(parseFloat(<string>resData.totalTa.internal));
      pieChartExternalPrev =
        pieChartExternalPrev + Math.round(parseFloat(<string>resData.totalTa.external));
      pieChartCombinedPrev =
        pieChartCombinedPrev + Math.round(parseFloat(<string>resData.totalTa.total));
    }

    if (visibility === 'internal') {
      return {
        datasets: [{ data: chartData1 }],
        labels: chartLabels1,
        referralsVal: pieChartCombinedTotal,
        referralsPrev: pieChartCombinedPrev,
        referralsVal2: pieChartInternalTotal,
        referralsPrev2: pieChartInternalPrev,
        referralsVal3: pieChartExternalTotal,
        referralsPrev3: pieChartExternalPrev,
        maxVal: Math.max(...chartData1),
      };
    } else if (visibility === 'external') {
      return {
        datasets: [{ data: chartData2 }],
        labels: chartLabels2,
        referralsVal2: pieChartInternalTotal,
        referralsPrev2: pieChartInternalPrev,
        referralsVal3: pieChartExternalTotal,
        referralsPrev3: pieChartExternalPrev,
        referralsVal: pieChartCombinedTotal,
        referralsPrev: pieChartCombinedPrev,
        maxVal: Math.max(...chartData2),
      };
    } else {
      return {
        datasets: [{ data: chartData3 }],
        labels: chartLabels3,
        referralsVal2: pieChartInternalTotal,
        referralsPrev2: pieChartInternalPrev,
        referralsVal3: pieChartExternalTotal,
        referralsPrev3: pieChartExternalPrev,
        referralsVal: pieChartCombinedTotal,
        referralsPrev: pieChartCombinedPrev,
        maxVal: Math.max(...chartData3),
      };
    }
  },
);

export const selectCpPredictorAnalysisTrendChartData = createSelector(
  selectResBodyListTrend,
  selectTrend,
  selectCpPredictorAnalysisVisibility,
  (resBodyList, trendMode, visibility) => {
    const resBody: CpPredictorAnalysisApiResponse | CpPredictorSpecialistAnalysisApiResponse =
      visibility == 'general'
        ? <CpPredictorAnalysisApiResponse>resBodyList['cpPredictorAnalysisTrend']
        : <CpPredictorSpecialistAnalysisApiResponse>(
            resBodyList['cpPredictorSpecialistAnalysisTrend']
          );
    let data: ChartData = {
      datasets: [],
      labels: [],
    };

    if (!_.isEmpty(resBody) && trendMode != 'off') {
      const trendItems = resBody.data;

      const keys = Object.keys(
        visibility == 'general' ? generalPropertyToDescription : specialistPropertyToDescription,
      );

      data = {
        datasets: _.map(
          _.zipObject(
            keys,
            _.map(keys, key => _(trendItems).map(_.camelCase(key)).compact().value()),
          ),
          (values: number[], key: string) => ({
            label:
              visibility == 'general'
                ? generalPropertyToDescription[key]
                : specialistPropertyToDescription[key],
            data: values,
          }),
        ),
        labels: _(trendItems)
          .map((trendItem: CpPredictorAnalysisDataItem) =>
            trendMode == 'current'
              ? moment(trendItem.yearMonth).format('MMM YYYY')
              : trendItem.year,
          )
          .value(),
      };
    }

    return data;
  },
);

export const selectCpPredictorRatioTrendChartData = createSelector(
  selectResBodyListTrend,
  selectTrend,
  selectCpPredictorRatioVisibility,
  (resBodyList, trendMode, visibility) => {
    const resBody = <CpPredictorRatioTrendApiResponse>resBodyList['cpPredictorRatioTrend'];

    let data: ChartData = {
      datasets: [],
      labels: [],
    };

    if (!_.isEmpty(resBody) && trendMode != 'off') {
      const trendItems = resBody.data;
      const values: string[][] = _.unzip(
        _(trendItems).map(cpPredictorRatioVisibilityToProperty[visibility]).value(),
      );

      if (!_.isEmpty(values)) {
        data = {
          datasets: (<string[]>cpPredictorRatioVisibilityToLabel[visibility]).map(
            (label: string, index: number) => ({
              label,
              data: values[index].map(v => parseInt(v)),
            }),
          ),
          labels: _(trendItems)
            .map((trendItem: CpPredictorRatioTrendDataItem) =>
              trendMode == 'current'
                ? moment(trendItem.duration).format('MMM YYYY')
                : trendItem.duration,
            )
            .value(),
        };
      }
    }

    return data;
  },
);

export const selectCpReferralsTrendChartData = createSelector(
  selectResBodyListTrend,
  selectTrend,
  selectCpReferralsVisibility,
  (resBodyList, trendMode, visibility) => {
    const resBody = <CpReferralsTrendApiResponse>resBodyList['cpReferralsTrend'];

    let data: ChartData = {
      datasets: [],
      labels: [],
    };

    if (!_.isEmpty(resBody) && trendMode != 'off') {
      const trendItems: CpReferralsTrendDataItem[] = resBody.data[visibility];
      const values: string[][] = _.unzip(_(trendItems).map('val').value());
      if (!_.isEmpty(values)) {
        data = {
          datasets: cpReferralsTrendChartLabels.map((label: string, index: number) => ({
            label,
            data: values[index].map(v => parseInt(v)),
          })),
          labels: _(trendItems)
            .map((trendItem: CpReferralsTrendDataItem) =>
              trendMode == 'current'
                ? moment(trendItem.duration).format('MMM YYYY')
                : trendItem.duration,
            )
            .value(),
        };
      }
    }

    return data;
  },
);
