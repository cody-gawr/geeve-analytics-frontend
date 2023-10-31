import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ClinicianAnalysisActions } from '../actions';
import _ from 'lodash';
import {
  selectClinics,
  selectCurrentClinics,
} from '@/newapp/clinic/state/reducers/clinic.reducer';
import { dynamicBarBackgroundColor } from '@/newapp/shared/utils';
import {
  selectAverage,
  selectTrend,
} from '@/newapp/layout/state/reducers/layout.reducer';
import { selectCurrentDentistId } from '@/newapp/dentist/state/reducers/dentist.reducer';
import { COLORS } from '@/newapp/constants';
import { selectRolesIndividual } from '@/newapp/auth/state/reducers/auth.reducer';
import moment from 'moment';
import { ChartDataset } from 'chart.js';

export interface ClinicianAnalysisState {
  isLoadingData: Array<CA_API_ENDPOINTS | CA_API_ENDPOINTS_TREND>;
  errors: Array<JeeveError>;

  resBodyList: Record<CA_API_ENDPOINTS, unknown> | {};
  resBodyListTrend: Record<CA_API_ENDPOINTS_TREND, unknown> | {};

  productionChartName: CA_PROD_CHART_NAME;
  prodSelectTab: CA_PROD_SELECT_TAB;
  colSelectTab: CA_COL_SELECT_TAB;
  colExpSelectTab: CA_COL_EXP_SELECT_TAB;

  hourlyRateChartName: CA_PROD_CHART_NAME;
  hourlyRateProdSelectTab: CA_HOURLY_RATE_SELECT_TAB;
  hourlyRateColSelectTab: CA_COL_SELECT_TAB;
  hourlyRateColExpSelectTab: CA_COL_EXP_SELECT_TAB;

  txPlanAvgFeeChartName: CA_TX_PLAN_AVG_FEE_CHART_NAME;
  recallRateChartName: CA_RECALL_RATE_CHART_NAME;
}

const initiateState: ClinicianAnalysisState = {
  isLoadingData: [],
  errors: [],

  resBodyList: {},
  resBodyListTrend: {},

  productionChartName: 'Production',
  prodSelectTab: 'production_all',
  colSelectTab: 'collection_all',
  colExpSelectTab: 'collection_exp_all',

  hourlyRateChartName: 'Production',
  hourlyRateProdSelectTab: 'hourly_rate_all',
  hourlyRateColSelectTab: 'collection_all',
  hourlyRateColExpSelectTab: 'collection_exp_all',

  txPlanAvgFeeChartName: 'Avg. Proposed Fees',
  recallRateChartName: 'Recall Prebook Rate',
};

export const clinicianAnalysisFeature = createFeature({
  name: 'clinician-analysis',
  reducer: createReducer(
    initiateState,
    on(
      ClinicianAnalysisActions.setProdChartName,
      (state, { chartName }): ClinicianAnalysisState => {
        return {
          ...state,
          productionChartName: chartName,
        };
      }
    ),
    on(
      ClinicianAnalysisActions.setProdSelectTab,
      (state, { tabName }): ClinicianAnalysisState => {
        return {
          ...state,
          prodSelectTab: tabName,
        };
      }
    ),
    on(
      ClinicianAnalysisActions.setColSelectTab,
      (state, { tabName }): ClinicianAnalysisState => {
        return {
          ...state,
          colSelectTab: tabName,
        };
      }
    ),
    on(
      ClinicianAnalysisActions.setColExpSelectTab,
      (state, { tabName }): ClinicianAnalysisState => {
        return {
          ...state,
          colExpSelectTab: tabName,
        };
      }
    ),
    on(
      ClinicianAnalysisActions.setHourlyRateChartName,
      (state, { chartName }): ClinicianAnalysisState => {
        return {
          ...state,
          hourlyRateChartName: chartName,
        };
      }
    ),
    on(
      ClinicianAnalysisActions.setHourlyRateProdSelectTab,
      (state, { tabName }): ClinicianAnalysisState => {
        return {
          ...state,
          hourlyRateProdSelectTab: tabName,
        };
      }
    ),
    on(
      ClinicianAnalysisActions.setHourlyRateColSelectTab,
      (state, { tabName }): ClinicianAnalysisState => {
        return {
          ...state,
          hourlyRateColSelectTab: tabName,
        };
      }
    ),
    on(
      ClinicianAnalysisActions.setHourlyRateColExpSelectTab,
      (state, { tabName }): ClinicianAnalysisState => {
        return {
          ...state,
          hourlyRateColExpSelectTab: tabName,
        };
      }
    ),
    on(
      ClinicianAnalysisActions.setTxTplanAvgFeeChartName,
      (state, { chartName }): ClinicianAnalysisState => {
        return {
          ...state,
          txPlanAvgFeeChartName: chartName,
        };
      }
    ),
    on(
      ClinicianAnalysisActions.setRecallRateChartName,
      (state, { chartName }): ClinicianAnalysisState => {
        return {
          ...state,
          recallRateChartName: chartName,
        };
      }
    ),
    on(
      ClinicianAnalysisActions.loadNoneTrendApiRequest,
      (state, { api }): ClinicianAnalysisState => {
        return {
          ...state,
          errors: _.filter(state.errors, n => n.api != api),
          isLoadingData: _.union(state.isLoadingData, [api]),
          resBodyList: { ...state.resBodyList, [api]: {} },
        };
      }
    ),
    on(
      ClinicianAnalysisActions.loadTrendApiRequest,
      (state, { api }): ClinicianAnalysisState => {
        return {
          ...state,
          errors: _.filter(state.errors, n => n.api != api),
          isLoadingData: _.union(state.isLoadingData, [api]),
          resBodyListTrend: { ...state.resBodyListTrend, [api]: {} },
        };
      }
    ),
    on(
      ClinicianAnalysisActions.loadCaNoneTrendApiRequestSuccess,
      (state, { api, resBody }): ClinicianAnalysisState => {
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
      ClinicianAnalysisActions.loadCaNoneTrendApiRequestFailure,
      (state, { api, error }): ClinicianAnalysisState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          resBodyList: { ...state.resBodyList, [api]: {} },
          isLoadingData: _.filter(isLoadingData, n => n != api),
          errors: [...errors, { ...error, api: api }],
        };
      }
    ),
    on(
      ClinicianAnalysisActions.loadCaTrendApiRequestSuccess,
      (state, { api, resBody }): ClinicianAnalysisState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != api),
          resBodyListTrend: { ...state.resBodyListTrend, [api]: resBody },
          isLoadingData: _.filter(isLoadingData, n => n != api),
        };
      }
    ),
    on(
      ClinicianAnalysisActions.loadCaTrendApiRequestFailure,
      (state, { api, error }): ClinicianAnalysisState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          resBodyListTrend: { ...state.resBodyListTrend, [api]: {} },
          isLoadingData: _.filter(isLoadingData, n => n != api),
          errors: [...errors, { ...error, api: api }],
        };
      }
    )
  ),
});

export const {
  selectErrors,
  selectIsLoadingData,
  selectProductionChartName,
  selectResBodyList,
  selectResBodyListTrend,
  selectProdSelectTab,
  selectColSelectTab,
  selectColExpSelectTab,

  selectHourlyRateChartName,
  selectHourlyRateProdSelectTab,
  selectHourlyRateColSelectTab,
  selectHourlyRateColExpSelectTab,
  selectTxPlanAvgFeeChartName,
  selectRecallRateChartName,
} = clinicianAnalysisFeature;

export const selectIsLoadingCaDentistProduction = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caDentistProduction') >= 0
);

export const selectIsLoadingCaDentistProductionTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caDentistProductionTrend') >= 0
);

export const selectIsLoadingCaDentistProductionDentist = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caDentistProductionDentist') >= 0
);

export const selectIsLoadingCaDentistProductionOht = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caDentistProductionOht') >= 0
);

export const selectIsLoadingCaCollection = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollection') >= 0
);

export const selectIsLoadingCaCollectionTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollectionTrend') >= 0
);

export const selectIsLoadingCaCollectionDentists = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollectionDentists') >= 0
);

export const selectIsLoadingCaCollectionOht = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollectionOht') >= 0
);

export const selectIsLoadingCaCollectionExp = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollectionExp') >= 0
);

export const selectIsLoadingCaCollectionExpTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollectionExpTrend') >= 0
);

export const selectIsLoadingCaCollectionExpDentists = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caCollectionExpDentists') >= 0
);

export const selectIsLoadingCaCollectionExpOht = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caCollectionExpOht') >= 0
);

export const selectIsLoadingCaProduction = createSelector(
  selectCurrentDentistId,
  selectTrend,
  selectProductionChartName,
  selectProdSelectTab,
  selectColSelectTab,
  selectColExpSelectTab,
  selectIsLoadingCaDentistProduction,
  selectIsLoadingCaDentistProductionDentist,
  selectIsLoadingCaDentistProductionOht,
  selectIsLoadingCaCollection,
  selectIsLoadingCaCollectionDentists,
  selectIsLoadingCaCollectionOht,
  selectIsLoadingCaCollectionExp,
  selectIsLoadingCaCollectionExpDentists,
  selectIsLoadingCaCollectionExpOht,
  selectIsLoadingCaDentistProductionTrend,
  selectIsLoadingCaCollectionTrend,
  selectIsLoadingCaCollectionExpTrend,
  (
    currentDentistIds,
    trendMode,
    prodChartName,
    prodTab,
    colTab,
    colExpTab,
    isLoadingCaDentistProduction,
    isLoadingCaDentistProductionDentist,
    isLoadingCaDentistProductionOht,
    isLoadingCaCollection,
    isLoadingCaCollectionDentists,
    isLoadingCaCollectionOht,
    isLoadingCaCollectionExp,
    isLoadingCaCollectionExpDentists,
    isLoadingCaCollectionExpOht,

    isLoadingCaDentistProductionTrend,
    isLoadingCaCollectionTrend,
    isLoadingCaCollectionExpTrend
  ) => {
    const isTrend = currentDentistIds === 'all' || trendMode === 'off';

    switch (prodChartName) {
      case 'Production':
        if (isTrend) {
          switch (prodTab) {
            case 'production_all':
              return isLoadingCaDentistProduction;
            case 'production_dentists':
              return isLoadingCaDentistProductionDentist;
            case 'production_oht':
              return isLoadingCaDentistProductionOht;
          }
        } else {
          return isLoadingCaDentistProductionTrend;
        }
      case 'Collection':
        if (isTrend) {
          switch (colTab) {
            case 'collection_all':
              return isLoadingCaCollection;
            case 'collection_dentists':
              return isLoadingCaCollectionDentists;
            case 'collection_oht':
              return isLoadingCaCollectionOht;
          }
        } else {
          return isLoadingCaCollectionTrend;
        }

      case 'Collection-Exp':
        if (isTrend) {
          switch (colExpTab) {
            case 'collection_exp_all':
              return isLoadingCaCollectionExp;
            case 'collection_exp_dentists':
              return isLoadingCaCollectionExpDentists;
            case 'collection_exp_oht':
              return isLoadingCaCollectionExpOht;
          }
        } else {
          return isLoadingCaCollectionExpTrend;
        }
    }
  }
);

export const selectCaProductionChartData = createSelector(
  selectResBodyList,
  selectCurrentClinics,
  selectTrend,
  selectAverage,
  selectProductionChartName,
  selectProdSelectTab,
  selectColSelectTab,
  selectColExpSelectTab,
  selectCurrentDentistId,
  selectRolesIndividual,
  (
    bodyList,
    selectedClinics,
    trendMode,
    averageMode,
    chartName,
    prodTab,
    colTab,
    colExpTab,
    currentDentistId,
    rolesInd
  ) => {
    const isAllDentist = currentDentistId === 'all';
    const isTrend = trendMode && trendMode !== 'off';
    let resBody: CaDentistProductionApiResponse | CaCollectionApiResponse =
      null;
    switch (chartName) {
      case 'Production':
        if (isAllDentist) {
          switch (prodTab) {
            case 'production_all':
              resBody = bodyList['caDentistProduction'];
              break;
            case 'production_dentists':
              resBody = bodyList['caDentistProductionDentist'];
              break;
            case 'production_oht':
              resBody = bodyList['caDentistProductionOht'];
              break;
          }
        } else {
          resBody = bodyList['caDentistProduction'];
        }
        break;
      case 'Collection':
        if (isAllDentist) {
          switch (colTab) {
            case 'collection_all':
              resBody = bodyList['caCollection'];
              break;
            case 'collection_dentists':
              resBody = bodyList['caCollectionDentists'];
              break;
            case 'collection_oht':
              resBody = bodyList['caCollectionOht'];
              break;
          }
        } else {
          resBody = bodyList['caCollection'];
        }

        break;
      case 'Collection-Exp':
        if (isAllDentist) {
          switch (colExpTab) {
            case 'collection_exp_all':
              resBody = bodyList['caCollectionExp'];
              break;
            case 'collection_exp_dentists':
              resBody = bodyList['caCollectionExpDentists'];
              break;
            case 'collection_exp_oht':
              resBody = bodyList['caCollectionExpOht'];
              break;
          }
        } else {
          resBody = bodyList['caCollectionExp'];
        }
        break;
    }
    if (isAllDentist) {
      let chartData = [],
        chartLabels = [],
        chartColors;
      if (!resBody?.data) {
        return {
          datasets: [],
          labels: [],
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
          tableData: [],
        };
      }

      if (selectedClinics.length > 1) {
        if (chartName === 'Production') {
          resBody.data
            .sort(
              (a, b) =>
                parseFloat(<string>a.production) -
                parseFloat(<string>b.production)
            )
            .reverse();
        } else {
          resBody.data
            .sort(
              (a, b) =>
                parseFloat(<string>a.collection) -
                parseFloat(<string>b.collection)
            )
            .reverse();
        }
      }

      if (resBody.data.length > 20) {
        resBody.data = resBody.data.slice(0, 20);
      }
      const tableData = [];
      let dentistKey = 0;
      resBody.data.forEach((res, i) => {
        if (chartName === 'Production') {
          chartData.push(Math.round(<number>res.production));
        } else {
          chartData.push(Math.round(<number>res.collection));
        }

        const pName =
          res.providerName +
          (selectedClinics.length > 1 ? ` - ${res.clinicName}` : '');

        chartLabels.push(pName);
        dentistKey = i;

        tableData.push({
          label: pName,
          value: chartData[i],
        });
      });

      if (rolesInd.type === 4) {
        chartColors = [
          {
            backgroundColor: [],
            hoverBorderColor: '#000',
          },
        ];

        chartColors[dentistKey] = '#1CA49F';
      } else chartColors = [];

      let datasets = [
        {
          data: [],
          backgroundColor: dynamicBarBackgroundColor(
            resBody.data,
            chartLabels,
            selectClinics.length > 1,
            selectedClinics,
            isTrend,
            averageMode == 'average'
          ),
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
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

      datasets[0].data = chartData;
      return {
        datasets,
        labels: chartLabels,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: parseInt(<string>resBody.goals),
        tableData,
      };
    } else {
      if (!resBody?.data) {
        return {
          gaugeValue: 0,
          gaugeLabel: '',
          maxGoal: 0,
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
          tableData: [],
        };
      }

      let gaugeValue = 0,
        gaugeLabel = '',
        maxGoal = 0;

      resBody.data.forEach(res => {
        gaugeValue = Math.round(
          chartName === 'Production' ? res.production : res.collection
        );

        gaugeLabel = res.providerName;
      });
      const goal = parseInt(<string>resBody.goals);
      maxGoal = gaugeValue > goal ? gaugeValue : goal;
      return {
        gaugeValue: gaugeValue,
        gaugeLabel: gaugeLabel,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: goal,
        maxGoal: maxGoal,
      };
    }
  }
);

export const selectCaProductionTrendChartData = createSelector(
  selectResBodyListTrend,
  selectTrend,
  selectProductionChartName,
  (bodyList, trendMode, chartName) => {
    let resBody: CaDentistProductionApiResponse | CaCollectionApiResponse =
      null;
    switch (chartName) {
      case 'Production':
        resBody = bodyList['caDentistProductionTrend'];
        break;
      case 'Collection':
        resBody = bodyList['caCollectionTrend'];
        break;
      case 'Collection-Exp':
        resBody = bodyList['caCollectionExpTrend'];
        break;
    }

    let chartData = [],
      chartLabels = [];
    if (!resBody?.data) {
      return {
        datasets: [],
        labels: [],
        // total: 0,
        // average: 0,
        // prev: 0,
        // goal: 0,
        tableData: [],
      };
    }
    const targetData = [],
      tableData = [];
    resBody.data.forEach((res, i) => {
      if (chartName === 'Production') {
        chartData.push(Math.round(<number>res.production));
      } else {
        chartData.push(Math.round(<number>res.collection));
      }

      if (res.goals == -1 || res.goals == null || res.goals == '') {
        targetData.push(null);
      } else {
        targetData.push(res.goals);
      }

      if (trendMode == 'current') {
        chartLabels.push(moment(res.yearMonth).format('MMM YYYY'));
      } else if (trendMode === 'historic') {
        chartLabels.push(res.year);
      } else {
        const wDate = moment(res.weekEnd).format('YYYY-MM-DD');
        chartLabels.push('WE ' + wDate);
        tableData.push({
          label: wDate,
          value: chartData[i],
        });
      }
    });

    let datasets: ChartDataset<'bar'>[] = [
      {
        data: chartData,
        label: '',
        // shadowOffsetX: 3,
        //   xAxisID: "x-axis-actual",
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        order: 2,
      },
      {
        data: [],
        label: '',
        //  xAxisID: "x-axis-target",
        backgroundColor: 'rgba(255, 0, 128, 1)',
        order: 1,
        // minHeight: 5
      },
    ];

    const maxVal = Math.max(...chartData);
    var subVal = 1;
    if (maxVal >= 20001) {
      subVal = 200;
    } else if (maxVal > 5000 && maxVal < 20000) {
      subVal = 100;
    } else if (maxVal > 3000 && maxVal < 5000) {
      subVal = 50;
    } else if (maxVal > 2000 && maxVal < 3000) {
      subVal = 10;
    } else if (maxVal > 100 && maxVal < 2000) {
      subVal = 1;
    } else if (maxVal > 51 && maxVal < 100) {
      subVal = 0.2;
    } else if (maxVal <= 50) {
      subVal = 0.1;
    }

    const mappedtargetData = [];
    targetData.map(function (v) {
      if (v == null) {
        mappedtargetData.push([v - 0, v + 0]);
      } else {
        mappedtargetData.push([v - subVal, v + subVal]);
      }
    });

    if (trendMode == 'current') {
      datasets[0]['label'] = 'Actual';
      datasets[1]['label'] = 'Target';
      datasets[1]['data'] = mappedtargetData; //this.targetData.map(v => [v - subVal, v + subVal]);
    } else {
      datasets[0]['label'] = '';
      datasets[1]['label'] = '';
      datasets[1]['data'] = [];
    }

    const dynamicColors = [];
    chartLabels.forEach((label, labelIndex) => {
      dynamicColors.push(labelIndex % 2 === 0 ? COLORS.odd : COLORS.even);
    });

    datasets[0].backgroundColor = dynamicColors;

    return {
      datasets,
      labels: chartLabels,
      // total: Math.round(resBody.total),
      // average: Math.round(resBody.totalAverage),
      // prev: Math.round(resBody.totalTa),
      // goal: parseInt(<string>resBody.goals),
      tableData,
    };
  }
);

export const selectIsLoadingCaHourlyRate = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caHourlyRate') >= 0
);

export const selectIsLoadingCaHourlyRateTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caHourlyRateTrend') >= 0
);

export const selectIsLoadingCaHourlyRateDentists = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caHourlyRateDentists') >= 0
);

export const selectIsLoadingCaHourlyRateOht = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caHourlyRateOht') >= 0
);

export const selectIsLoadingCaCollectionHourlyRate = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caCollectionHourlyRate') >= 0
);

export const selectIsLoadingCaCollectionHourlyRateTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caCollectionHourlyRateTrend') >= 0
);

export const selectIsLoadingCaCollectionHourlyRateDentist = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caCollectionHourlyRateDentist') >= 0
);

export const selectIsLoadingCaCollectionHourlyRateOht = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caCollectionHourlyRateOht') >= 0
);

export const selectIsLoadingCaCollectionExpHourlyRate = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caCollectionExpHourlyRate') >= 0
);

export const selectIsLoadingCaCollectionExpHourlyRateTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caCollectionExpHourlyRateTrend') >= 0
);

export const selectIsLoadingCaCollectionExpHourlyRateDentist = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caCollectionExpHourlyRateDentist') >= 0
);

export const selectIsLoadingCaCollectionExpHourlyRateOht = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caCollectionExpHourlyRateOht') >= 0
);

export const selectIsLoadingCaHourlyRateAll = createSelector(
  selectCurrentDentistId,
  selectTrend,
  selectHourlyRateChartName,
  selectHourlyRateProdSelectTab,
  selectHourlyRateColSelectTab,
  selectHourlyRateColExpSelectTab,
  selectIsLoadingCaHourlyRate,
  selectIsLoadingCaHourlyRateDentists,
  selectIsLoadingCaHourlyRateOht,
  selectIsLoadingCaCollectionHourlyRate,
  selectIsLoadingCaCollectionHourlyRateDentist,
  selectIsLoadingCaCollectionHourlyRateOht,
  selectIsLoadingCaCollectionExpHourlyRate,
  selectIsLoadingCaCollectionExpHourlyRateDentist,
  selectIsLoadingCaCollectionExpHourlyRateOht,
  selectIsLoadingCaHourlyRateTrend,
  selectIsLoadingCaCollectionHourlyRateTrend,
  selectIsLoadingCaCollectionExpHourlyRateTrend,
  (
    currentDentistIds,
    trendMode,
    hourlyRateChartName,
    hourlyRateProdTab,
    hourlyRateColTab,
    hourlyRatecolExpTab,
    isLoadingCaHourlyRate,
    isLoadingCaHourlyRateDentist,
    isLoadingCaHourlyRateOht,
    isLoadingCaCollectionHourlyRate,
    isLoadingCaCollectionHourlyRateDentists,
    isLoadingCaCollectionHourlyRateOht,
    isLoadingCaCollectionExpHourlyRate,
    isLoadingCaCollectionExpHourlyRateDentists,
    isLoadingCaCollectionExpHourlyRateOht,
    isLoadingCaHourlyRateTrend,
    isLoadingCaCollectionHourlyRateTrend,
    isLoadingCaCollectionExpHourlyRateTrend
  ) => {
    const isTrend = currentDentistIds === 'all' || trendMode === 'off';
    switch (hourlyRateChartName) {
      case 'Production':
        if (isTrend) {
          switch (hourlyRateProdTab) {
            case 'hourly_rate_all':
              return isLoadingCaHourlyRate;
            case 'hourly_rate_dentists':
              return isLoadingCaHourlyRateDentist;
            case 'hourly_rate_oht':
              return isLoadingCaHourlyRateOht;
          }
        } else {
          return isLoadingCaHourlyRateTrend;
        }
      case 'Collection':
        if (isTrend) {
          switch (hourlyRateColTab) {
            case 'collection_all':
              return isLoadingCaCollectionHourlyRate;
            case 'collection_dentists':
              return isLoadingCaCollectionHourlyRateDentists;
            case 'collection_oht':
              return isLoadingCaCollectionHourlyRateOht;
          }
        } else {
          return isLoadingCaCollectionHourlyRateTrend;
        }
      case 'Collection-Exp':
        if (isTrend) {
          switch (hourlyRatecolExpTab) {
            case 'collection_exp_all':
              return isLoadingCaCollectionExpHourlyRate;
            case 'collection_exp_dentists':
              return isLoadingCaCollectionExpHourlyRateDentists;
            case 'collection_exp_oht':
              return isLoadingCaCollectionExpHourlyRateOht;
          }
        } else {
          return isLoadingCaCollectionExpHourlyRateTrend;
        }
    }
  }
);

export const selectCaHourlyRateChartData = createSelector(
  selectResBodyList,
  selectCurrentClinics,
  selectTrend,
  selectAverage,
  selectHourlyRateChartName,
  selectHourlyRateProdSelectTab,
  // selectHourlyRateColSelectTab,
  // selectHourlyRateColExpSelectTab,
  selectCurrentDentistId,
  (
    bodyList,
    selectedClinics,
    trendMode,
    averageMode,
    prodChartName,
    prodTab,
    // colTab,
    // colExpTab,
    currentDentistid
  ) => {
    let resBody: CaHourlyRateApiResponse | CaCollectionHourlyRateApiResponse =
      null;
    const isAllDentist = currentDentistid === 'all';
    switch (prodChartName) {
      case 'Production':
        if (isAllDentist) {
          switch (prodTab) {
            case 'hourly_rate_all':
              resBody = bodyList['caHourlyRate'];
              break;
            case 'hourly_rate_dentists':
              resBody = bodyList['caHourlyRateDentists'];
              break;
            case 'hourly_rate_oht':
              resBody = bodyList['caHourlyRateOht'];
              break;
          }
        } else {
          resBody = bodyList['caHourlyRate'];
        }

        break;
      case 'Collection':
        if (isAllDentist) {
          switch (prodTab) {
            case 'hourly_rate_all':
              resBody = bodyList['caCollectionHourlyRate'];
              break;
            case 'hourly_rate_dentists':
              resBody = bodyList['caCollectionHourlyRateDentist'];
              break;
            case 'hourly_rate_oht':
              resBody = bodyList['caCollectionHourlyRateOht'];
              break;
          }
        } else {
          resBody = bodyList['caCollectionHourlyRate'];
        }

        break;
      case 'Collection-Exp':
        if (isAllDentist) {
          switch (prodTab) {
            case 'hourly_rate_all':
              resBody = bodyList['caCollectionExpHourlyRate'];
              break;
            case 'hourly_rate_dentists':
              resBody = bodyList['caCollectionExpHourlyRateDentist'];
              break;
            case 'hourly_rate_oht':
              resBody = bodyList['caCollectionExpHourlyRateOht'];
              break;
          }
        } else {
          resBody = bodyList['caCollectionExpHourlyRate'];
        }

        break;
    }
    if (isAllDentist) {
      let chartData = [],
        chartLabels = [];
      if (!resBody?.data) {
        return {
          datasets: [],
          labels: [],
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
          tableData: [],
        };
      }

      if (selectedClinics.length > 1) {
        resBody.data
          .sort(
            (a, b) =>
              parseFloat(<string>a.hourlyRate) -
              parseFloat(<string>b.hourlyRate)
          )
          .reverse();
      }

      if (resBody.data.length > 20) {
        resBody.data = resBody.data.slice(0, 20);
      }
      const tableData = [];
      resBody.data.forEach((res, i) => {
        chartData.push(Math.round(<number>res.hourlyRate));

        const pName =
          res.providerName +
          (selectedClinics.length > 1 ? ` - ${res.clinicName}` : '');
        if (res.providerName != null && res.providerName != 'Anonymous') {
          chartLabels.push(pName);
        } else {
          chartLabels.push(pName);
        }

        tableData.push({
          label: pName,
          value: chartData[i],
        });
      });

      let datasets = [
        {
          data: [],
          backgroundColor: dynamicBarBackgroundColor(
            resBody.data,
            chartLabels,
            selectClinics.length > 1,
            selectedClinics,
            trendMode !== 'off',
            averageMode == 'average'
          ),
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
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

      datasets[0].data = chartData;
      return {
        datasets,
        labels: chartLabels,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: parseInt(<string>resBody.goals),
        tableData,
      };
    } else {
      if (!resBody?.data) {
        return {
          gaugeValue: 0,
          gaugeLabel: '',
          maxGoal: 0,
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
        };
      }

      let gaugeValue = 0,
        gaugeLabel = '',
        maxGoal = 0;

      resBody.data.forEach(res => {
        gaugeValue = Math.round(res.hourlyRate);

        var name = res.providerName;
        if (name != null && name != '') {
          name = name.split(')');
          if (name.length > 0 && name[1] != undefined) {
            name = name[1].split(',');
            if (name.length > 0) name = name[1] + ' ' + name[0];
          }
          gaugeLabel = name;
        } else gaugeLabel = res.provider;
      });
      const goal = parseInt(<string>resBody.goals);
      maxGoal = gaugeValue > goal ? gaugeValue : goal;
      return {
        gaugeValue: gaugeValue,
        gaugeLabel: gaugeLabel,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: goal,
        maxGoal: maxGoal,
      };
    }
  }
);

export const selectCaHourlyRateTrendChartData = createSelector(
  selectResBodyListTrend,
  selectTrend,
  selectHourlyRateChartName,
  (bodyList, trendMode, chartName) => {
    let resBody: CaHourlyRateApiResponse | CaCollectionHourlyRateApiResponse =
      null;
    switch (chartName) {
      case 'Production':
        resBody = bodyList['caHourlyRateTrend'];
        break;
      case 'Collection':
        resBody = bodyList['caCollectionHourlyRateTrend'];
        break;
      case 'Collection-Exp':
        resBody = bodyList['caCollectionExpHourlyRateTrend'];
        break;
    }

    let chartData = [],
      chartLabels = [];
    if (!resBody?.data) {
      return {
        datasets: [],
        labels: [],
      };
    }
    const targetData = [];
    resBody.data.forEach((res, i) => {
      chartData.push(Math.round(<number>res.hourlyRate));
      if (res.goals == -1 || res.goals == null || res.goals == '') {
        targetData.push(null);
      } else {
        targetData.push(res.goals);
      }

      if (trendMode == 'current') {
        chartLabels.push(moment(res.yearMonth).format('MMM YYYY'));
      } else {
        chartLabels.push(res.year);
      }
    });

    let datasets: ChartDataset<any>[] = [
      {
        data: chartData,
        order: 2,
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
        ],
        label: '',
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
        order: 1,
        label: '',
        shadowOffsetX: 3,
        backgroundColor: 'rgba(255, 0, 128, 1)',
      },
    ];

    const maxVal = Math.max(...chartData);
    var subVal = 1;
    if (maxVal >= 20001) {
      subVal = 200;
    } else if (maxVal > 5000 && maxVal < 20000) {
      subVal = 100;
    } else if (maxVal > 3000 && maxVal < 5000) {
      subVal = 50;
    } else if (maxVal > 2000 && maxVal < 3000) {
      subVal = 10;
    } else if (maxVal > 100 && maxVal < 2000) {
      subVal = 1;
    } else if (maxVal > 51 && maxVal < 100) {
      subVal = 0.2;
    } else if (maxVal <= 50) {
      subVal = 0.1;
    }

    const mappedtargetData = [];
    targetData.map(function (v) {
      if (v == null) {
        mappedtargetData.push([v - 0, v + 0]);
      } else {
        mappedtargetData.push([v - subVal, v + subVal]);
      }
    });

    if (trendMode == 'current') {
      datasets[0]['label'] = 'Actual';
      datasets[1]['label'] = 'Target';
      datasets[1]['data'] = mappedtargetData; //this.targetData.map(v => [v - subVal, v + subVal]);
    } else {
      datasets[0]['label'] = '';
      datasets[1]['label'] = '';
      datasets[1]['data'] = [];
    }

    const dynamicColors = [];
    chartLabels.forEach((label, labelIndex) => {
      dynamicColors.push(labelIndex % 2 === 0 ? COLORS.odd : COLORS.even);
    });

    datasets[0].backgroundColor = dynamicColors;

    return {
      datasets,
      labels: chartLabels,
    };
  }
);

export const selectIsLoadingCaNumNewPatients = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caNumNewPatients') >= 0
);

export const selectIsLoadingCaNumNewPatientsTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caNumNewPatientsTrend') >= 0
);

export const selectCaNumNewPatientsChartData = createSelector(
  selectResBodyList,
  selectCurrentClinics,
  selectTrend,
  selectAverage,
  selectCurrentDentistId,
  selectRolesIndividual,
  (bodyList, selectedClinics, trend, average, currentDentistid, rolesInd) => {
    let resBody: CaNumNewPatientsApiResponse = bodyList['caNumNewPatients'];
    const isAllDentist = currentDentistid === 'all';
    if (!resBody?.data) {
      return {
        datasets: [],
        labels: [],
        total: 0,
        average: 0,
        prev: 0,
        goal: 0,
        tableData: [],
      };
    }

    if (isAllDentist) {
      if (selectedClinics.length > 1) {
        resBody.data
          .sort(
            (a, b) =>
              parseFloat(<string>a.newPatients) -
              parseFloat(<string>b.newPatients)
          )
          .reverse();
      }

      const chartData = [],
        chartLabels = [];
      let chartColors = [];

      if (resBody.data.length > 20) {
        resBody.data = resBody.data.slice(0, 20);
      }
      let newpKey = 0;
      const tableData = [];
      resBody.data.forEach((res, i) => {
        chartData.push(Math.round(<number>res.newPatients));

        const pName =
          res.providerName +
          (selectedClinics.length > 1 ? ` - ${res.clinicName}` : '');
        chartLabels.push(pName);
        if (res.providerName != 'Anonymous') newpKey = i;
        tableData.push({
          label: pName,
          value: chartData[i],
        });
      });

      if (!isAllDentist && trend === 'off' && average === 'average') {
        chartColors = [
          {
            backgroundColor: dynamicBarBackgroundColor(
              resBody.data,
              chartLabels,
              selectClinics.length > 1,
              selectedClinics,
              trend !== 'off',
              average == 'average'
            ),
          },
        ];
      } else {
        if (rolesInd.type == 4) {
          chartColors = [{ backgroundColor: [] }];
          chartColors[0].backgroundColor[newpKey] = '#1CA49F';
        } else chartColors = [{ backgroundColor: COLORS.doughnutChartColors }];
      }

      let datasets = [
        {
          data: chartData,
          backgroundColor: chartColors[0].backgroundColor,
        },
      ];

      return {
        datasets,
        labels: chartLabels,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: parseInt(<string>resBody.goals),
        maxData: Math.max(...chartData),
        tableData,
        chartColors,
      };
    } else {
      if (!resBody?.data) {
        return {
          gaugeValue: 0,
          gaugeLabel: '',
          maxGoal: 0,
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
        };
      }

      let gaugeValue = 0,
        gaugeLabel = '',
        maxGoal = 0;

      resBody.data.forEach(res => {
        gaugeValue = Math.round(<number>res.newPatients);

        let name: any = res.providerName;
        if (name != null && name != '') {
          name = name.split(')');
          if (name.length > 0 && name[1] != undefined) {
            name = name[1].split(',');
            if (name.length > 0) name = name[1] + ' ' + name[0];
          }
          gaugeLabel = name;
        } else gaugeLabel = res.providerName;
      });
      const goal = parseInt(<string>resBody.goals);
      maxGoal = gaugeValue > goal ? gaugeValue : goal;
      return {
        gaugeValue: gaugeValue,
        gaugeLabel: gaugeLabel,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: goal,
        maxGoal: maxGoal,
      };
    }
  }
);

export const selectCaNumNewPatientsTrendChartData = createSelector(
  selectResBodyListTrend,
  selectTrend,
  (bodyList, trendMode) => {
    let resBody: CaNumNewPatientsApiResponse =
      bodyList['caNumNewPatientsTrend'];

    let chartData = [],
      chartLabels = [];
    if (!resBody?.data) {
      return {
        datasets: [],
        labels: [],
        tableData: [],
      };
    }
    const targetData = [],
      tableData = [];
    resBody.data.forEach((res, i) => {
      chartData.push(Math.round(<number>res.newPatients));
      if (res.goals == -1 || res.goals == null || res.goals == '') {
        targetData.push(null);
      } else {
        targetData.push(res.goals);
      }

      if (trendMode == 'current') {
        chartLabels.push(moment(res.yearMonth).format('MMM YYYY'));
      } else {
        chartLabels.push(res.year);
      }
    });

    let datasets: ChartDataset<any>[] = [
      {
        data: chartData,
        order: 2,
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
        ],
        label: '',
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
        order: 1,
        label: '',
        shadowOffsetX: 3,
        backgroundColor: 'rgba(255, 0, 128, 1)',
      },
    ];

    const maxVal = Math.max(...chartData);
    var subVal = 1;
    if (maxVal >= 20001) {
      subVal = 200;
    } else if (maxVal > 5000 && maxVal < 20000) {
      subVal = 100;
    } else if (maxVal > 3000 && maxVal < 5000) {
      subVal = 50;
    } else if (maxVal > 2000 && maxVal < 3000) {
      subVal = 10;
    } else if (maxVal > 100 && maxVal < 2000) {
      subVal = 1;
    } else if (maxVal > 51 && maxVal < 100) {
      subVal = 0.2;
    } else if (maxVal <= 50) {
      subVal = 0.1;
    }

    const mappedtargetData = [];
    targetData.map(function (v) {
      if (v == null) {
        mappedtargetData.push([v - 0, v + 0]);
      } else {
        mappedtargetData.push([v - subVal, v + subVal]);
      }
    });

    if (trendMode == 'current') {
      datasets[0]['label'] = 'Actual';
      datasets[1]['label'] = 'Target';
      datasets[1]['data'] = mappedtargetData; //this.targetData.map(v => [v - subVal, v + subVal]);
    } else {
      datasets[0]['label'] = '';
      datasets[1]['label'] = '';
      datasets[1]['data'] = [];
    }

    const dynamicColors = [];
    chartLabels.forEach((label, labelIndex) => {
      dynamicColors.push(labelIndex % 2 === 0 ? COLORS.odd : COLORS.even);
    });

    datasets[0].backgroundColor = dynamicColors;

    return {
      datasets,
      labels: chartLabels,
      tableData,
    };
  }
);

export const selectIsLoadingCaTxPlanAvgProposedFees = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caTxPlanAvgProposedFees') >= 0
);

export const selectIsLoadingCaTxPlanAvgProposedFeesTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caTxPlanAvgProposedFeesTrend') >= 0
);

export const selectIsLoadingCaTxPlanAvgCompletedFees = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caTxPlanAvgCompletedFees') >= 0
);

export const selectIsLoadingCaTxPlanAvgCompletedFeesTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caTxPlanAvgCompletedFeesTrend') >= 0
);

export const selectIsLoadingCaTxPlanAvgFeeAll = createSelector(
  selectCurrentDentistId,
  selectTrend,
  selectTxPlanAvgFeeChartName,
  selectIsLoadingCaTxPlanAvgCompletedFees,
  selectIsLoadingCaTxPlanAvgProposedFees,
  selectIsLoadingCaTxPlanAvgProposedFeesTrend,
  selectIsLoadingCaTxPlanAvgCompletedFeesTrend,
  (
    currentDentistId,
    trendMode,
    chartName,
    isCompleteFee,
    isProposedFee,
    isProposedFeeTrend,
    isCompleteFeeTrend
  ) => {
    const isTrend = currentDentistId === 'all' || trendMode !== 'off';
    if (chartName === 'Avg. Completed Fees') {
      return isTrend ? isCompleteFeeTrend : isCompleteFee;
    } else {
      return isTrend ? isProposedFeeTrend : isProposedFee;
    }
  }
);

export const selectTxPlanAvgFeesChartData = createSelector(
  selectResBodyList,
  selectCurrentClinics,
  selectTrend,
  selectAverage,
  selectTxPlanAvgFeeChartName,
  selectCurrentDentistId,
  selectRolesIndividual,
  (
    bodyList,
    selectedClinics,
    trendMode,
    averageMode,
    chartName,
    currentDentistId,
    rolesInd
  ) => {
    const isAllDentist = currentDentistId === 'all';
    let resBody: CaTxPlanAvgFeeApiResponse = null;

    if (chartName === 'Avg. Completed Fees') {
      resBody = bodyList['caTxPlanAvgCompletedFees'];
    } else {
      resBody = bodyList['caTxPlanAvgProposedFees'];
    }

    if (isAllDentist) {
      let chartData = [],
        chartLabels = [],
        chartColors;
      if (!resBody?.data) {
        return {
          datasets: [],
          labels: [],
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
          tableData: [],
        };
      }

      if (selectedClinics.length > 1) {
        resBody.data
          .sort(
            (a, b) =>
              parseFloat(<string>a.averageFees) -
              parseFloat(<string>b.averageFees)
          )
          .reverse();
      }

      if (resBody.data.length > 20) {
        resBody.data = resBody.data.slice(0, 20);
      }
      const tableData = [];
      let dentistKey = 0;
      resBody.data.forEach((res, i) => {
        chartData.push(Math.round(<number>res.averageFees));

        const pName =
          res.providerName +
          (selectedClinics.length > 1 ? ` - ${res.clinicName}` : '');

        chartLabels.push(pName);
        dentistKey = i;

        tableData.push({
          label: pName,
          value: chartData[i],
        });
      });

      if (rolesInd.type === 4) {
        chartColors = [
          {
            backgroundColor: [],
            hoverBorderColor: '#000',
          },
        ];

        chartColors[dentistKey] = '#1CA49F';
      } else chartColors = [];

      let datasets = [
        {
          data: [],
          backgroundColor: dynamicBarBackgroundColor(
            resBody.data,
            chartLabels,
            selectClinics.length > 1,
            selectedClinics,
            trendMode !== 'off',
            averageMode == 'average'
          ),
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
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

      datasets[0].data = chartData;
      return {
        datasets,
        labels: chartLabels,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: parseInt(<string>resBody.goals),
        tableData,
      };
    } else {
      if (!resBody?.data) {
        return {
          gaugeValue: 0,
          gaugeLabel: '',
          maxGoal: 0,
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
          tableData: [],
        };
      }

      let gaugeValue = 0,
        gaugeLabel = '',
        maxGoal = 0,
        tableData = [];

      resBody.data.forEach(res => {
        gaugeValue = Math.round(<number>res.averageFees);

        gaugeLabel = res.providerName;
      });
      const goal = parseInt(<string>resBody.goals);
      maxGoal = gaugeValue > goal ? gaugeValue : goal;
      return {
        gaugeValue: gaugeValue,
        gaugeLabel: gaugeLabel,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: goal,
        maxGoal: maxGoal,
        tableData,
      };
    }
  }
);

export const selectTxPlanAvgFeesTrendChartData = createSelector(
  selectResBodyListTrend,
  selectTrend,
  selectTxPlanAvgFeeChartName,
  (bodyList, trendMode, chartName) => {
    let resBody: CaTxPlanAvgFeeApiResponse = null;

    if (chartName === 'Avg. Completed Fees') {
      resBody = bodyList['caTxPlanAvgCompletedFeesTrend'];
    } else {
      resBody = bodyList['caTxPlanAvgProposedFeesTrend'];
    }

    let chartData = [],
      chartLabels = [];
    if (!resBody?.data) {
      return {
        datasets: [],
        labels: [],
      };
    }
    resBody.data.forEach(res => {
      const avgFee = Math.round(<number>res.averageFees);
      if (avgFee >= 0) {
        chartData.push(avgFee);
      }
      chartLabels.push(
        trendMode === 'current'
          ? moment(res.yearMonth).format('MMM YYYY')
          : res.year
      );
    });
    const datasets: ChartDataset<any>[] = [
      {
        data: [],
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

    datasets[0].data = chartData;

    const dynamicColors = [];
    chartLabels.forEach((label, labelIndex) => {
      dynamicColors.push(labelIndex % 2 === 0 ? COLORS.odd : COLORS.even);
    }); // This is dynamic array for colors of bars
    datasets[0].backgroundColor = dynamicColors;

    return {
      datasets,
      labels: chartLabels,
    };
  }
);

export const selectIsLoadingCaTxPlanCompRate = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caTxPlanCompRate') >= 0
);

export const selectIsLoadingCaTxPlanCompRateTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caTxPlanCompRateTrend') >= 0
);

export const selectTxPlanCompRateChartData = createSelector(
  selectResBodyList,
  selectCurrentClinics,
  selectTrend,
  selectAverage,
  selectCurrentDentistId,
  selectRolesIndividual,
  (
    bodyList,
    selectedClinics,
    trendMode,
    averageMode,
    currentDentistId,
    rolesInd
  ) => {
    const isAllDentist = currentDentistId === 'all';
    let resBody: CaTxPlanCompRateApiResponse = bodyList['caTxPlanCompRate'];

    if (isAllDentist) {
      let chartData = [],
        chartLabels = [],
        chartColors;
      if (!resBody?.data) {
        return {
          datasets: [],
          labels: [],
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
          tableData: [],
        };
      }

      if (selectedClinics.length > 1) {
        resBody.data
          .sort(
            (a, b) =>
              parseFloat(<string>a.treatmentPerPlanPercentage) -
              parseFloat(<string>b.treatmentPerPlanPercentage)
          )
          .reverse();
      }

      if (resBody.data.length > 20) {
        resBody.data = resBody.data.slice(0, 20);
      }
      const tableData = [];
      let dentistKey = 0;
      resBody.data.forEach((res, i) => {
        chartData.push(Math.round(<number>res.treatmentPerPlanPercentage));

        const pName =
          res.providerName +
          (selectedClinics.length > 1 ? ` - ${res.clinicName}` : '');

        chartLabels.push(pName);
        dentistKey = i;

        tableData.push({
          label: pName,
          value: chartData[i],
        });
      });

      if (rolesInd.type === 4) {
        chartColors = [
          {
            backgroundColor: [],
            hoverBorderColor: '#000',
          },
        ];

        chartColors[dentistKey] = '#1CA49F';
      } else chartColors = [];

      let datasets = [
        {
          data: [],
          backgroundColor: dynamicBarBackgroundColor(
            resBody.data,
            chartLabels,
            selectClinics.length > 1,
            selectedClinics,
            trendMode !== 'off',
            averageMode == 'average'
          ),
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
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

      datasets[0].data = chartData;
      return {
        datasets,
        labels: chartLabels,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: parseInt(<string>resBody.goals),
        tableData,
      };
    } else {
      if (!resBody?.data) {
        return {
          gaugeValue: 0,
          gaugeLabel: '',
          maxGoal: 0,
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
          tableData: [],
        };
      }

      let gaugeValue = 0,
        gaugeLabel = '',
        maxGoal = 0,
        tableData = [];

      resBody.data.forEach(res => {
        gaugeValue = Math.round(<number>res.treatmentPerPlanPercentage);

        gaugeLabel = res.providerName;
      });
      const goal = parseInt(<string>resBody.goals);
      maxGoal = gaugeValue > goal ? gaugeValue : goal;
      return {
        gaugeValue: gaugeValue,
        gaugeLabel: gaugeLabel,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: goal,
        maxGoal: maxGoal,
        tableData,
      };
    }
  }
);

export const selectTxPlanCompRateTrendChartData = createSelector(
  selectResBodyListTrend,
  selectTrend,
  (bodyList, trendMode) => {
    let resBody: CaTxPlanCompRateApiResponse =
      bodyList['caTxPlanCompRateTrend'];

    let chartData = [],
      chartLabels = [];
    if (!resBody?.data) {
      return {
        datasets: [],
        labels: [],
      };
    }
    const targetData = [];
    resBody.data.forEach(res => {
      const treatPer = Math.round(<number>res.treatmentPerPlanPercentage);
      if (treatPer >= 0) {
        chartData.push(treatPer);
      }
      if (res.goals == -1 || res.goals == null || res.goals == '') {
        targetData.push(null);
      } else {
        targetData.push(res.goals);
      }
      chartLabels.push(
        trendMode === 'current'
          ? moment(res.yearMonth).format('MMM YYYY')
          : res.year
      );
    });

    const sumpercantagevalue = chartData.reduce((acc, cur) => acc + cur, 0);

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

    if (sumpercantagevalue > 0) {
      const mappedtargetData = [];
      targetData.map(function (v) {
        if (v == null) {
          mappedtargetData.push([v - 0, v + 0]);
        } else {
          mappedtargetData.push([v - 0.5, v + 0.5]);
        }
      });

      if (trendMode == 'current') {
        datasets[0]['label'] = 'Actual';
        datasets[1]['label'] = 'Target';
        datasets[1]['data'] = mappedtargetData; //this.targetData.map(v => [v - subVal, v + subVal]);
      } else {
        datasets[0]['label'] = '';
        datasets[1]['label'] = '';
        datasets[1]['data'] = [];
      }
    } else {
      chartLabels = [];
    }

    datasets[0].data = chartData;

    const dynamicColors = [];
    chartLabels.forEach((label, labelIndex) => {
      dynamicColors.push(labelIndex % 2 === 0 ? COLORS.odd : COLORS.even);
    }); // This is dynamic array for colors of bars
    datasets[0].backgroundColor = dynamicColors;

    return {
      datasets,
      labels: chartLabels,
    };
  }
);

export const selectIsLoadingCaRecallRate = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caRecallRate') >= 0
);

export const selectIsLoadingCaRecallRateTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caRecallRateTrend') >= 0
);

export const selectIsLoadingCaReappointRate = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caReappointRate') >= 0
);

export const selectIsLoadingCaReappointRateTrend = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caReappointRateTrend') >= 0
);

export const selectIsLoadingCaRecallRateAll = createSelector(
  selectCurrentDentistId,
  selectTrend,
  selectRecallRateChartName,
  selectIsLoadingCaRecallRate,
  selectIsLoadingCaReappointRate,
  selectIsLoadingCaRecallRateTrend,
  selectIsLoadingCaReappointRateTrend,
  (
    currentDentistId,
    trendMode,
    chartName,
    isRecall,
    isReapp,
    isRecallTrend,
    isReappTrend
  ) => {
    const isTrend = currentDentistId === 'all' || trendMode !== 'off';
    if (chartName === 'Recall Prebook Rate') {
      return isTrend ? isRecallTrend : isRecall;
    } else {
      return isTrend ? isReappTrend : isReapp;
    }
  }
);

export const selectRecallRateChartData = createSelector(
  selectResBodyList,
  selectCurrentClinics,
  selectTrend,
  selectAverage,
  selectRecallRateChartName,
  selectCurrentDentistId,
  selectRolesIndividual,
  (
    bodyList,
    selectedClinics,
    trendMode,
    averageMode,
    chartName,
    currentDentistId,
    rolesInd
  ) => {
    const isAllDentist = currentDentistId === 'all';
    let resBody: CaRecallRateApiResponse | CaReappRateApiResponse = null;
    if (chartName === 'Recall Prebook Rate') {
      resBody = bodyList['caRecallRate'];
    } else {
      resBody = bodyList['caReappointRate'];
    }

    if (isAllDentist) {
      let chartData = [],
        chartLabels = [],
        chartColors;
      if (!resBody?.data) {
        return {
          datasets: [],
          labels: [],
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
          tableData: [],
        };
      }

      if (selectedClinics.length > 1) {
        resBody.data
          .sort(
            (a, b) =>
              parseFloat(<string>a.recallPercent) -
              parseFloat(<string>b.recallPercent)
          )
          .reverse();
      }

      if (resBody.data.length > 20) {
        resBody.data = resBody.data.slice(0, 20);
      }
      const tableData = [];
      let dentistKey = 0;
      resBody.data.forEach((res, i) => {
        chartData.push(
          chartName === 'Recall Prebook Rate'
            ? Math.round(<number>res.recallPercent)
            : Math.round(<number>res.reappointRate)
        );

        const pName =
          res.providerName +
          (selectedClinics.length > 1 ? ` - ${res.clinicName}` : '');

        chartLabels.push(pName);
        dentistKey = i;

        tableData.push({
          label: pName,
          value: chartData[i],
        });
      });

      if (rolesInd.type === 4) {
        chartColors = [
          {
            backgroundColor: [],
            hoverBorderColor: '#000',
          },
        ];

        chartColors[dentistKey] = '#1CA49F';
      } else chartColors = [];

      let datasets = [
        {
          data: [],
          backgroundColor: dynamicBarBackgroundColor(
            resBody.data,
            chartLabels,
            selectClinics.length > 1,
            selectedClinics,
            trendMode !== 'off',
            averageMode == 'average'
          ),
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
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

      datasets[0].data = chartData;
      return {
        datasets,
        labels: chartLabels,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: parseInt(<string>resBody.goals),
        tableData,
      };
    } else {
      if (!resBody?.data) {
        return {
          gaugeValue: 0,
          gaugeLabel: '',
          maxGoal: 0,
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
          tableData: [],
        };
      }

      let gaugeValue = 0,
        gaugeLabel = '',
        maxGoal = 0,
        tableData = [];

      resBody.data.forEach(res => {
        gaugeValue = Math.round(<number>res.recallPercent);

        gaugeLabel = res.providerName;
      });
      const goal = parseInt(<string>resBody.goals);
      maxGoal = gaugeValue > goal ? gaugeValue : goal;

      return {
        gaugeValue: gaugeValue,
        gaugeLabel: gaugeLabel,
        total: Math.round(resBody.total),
        average: 12,
        prev: Math.round(resBody.totalTa),
        goal: goal,
        maxGoal: maxGoal,
        tableData,
      };
    }
  }
);

export const selectRecallRateTrendChartData = createSelector(
  selectResBodyListTrend,
  selectTrend,
  selectRecallRateChartName,
  (bodyList, trendMode, chartName) => {
    let resBody: CaRecallRateApiResponse | CaReappRateApiResponse = null;

    if (chartName === 'Recall Prebook Rate') {
      resBody = bodyList['caRecallRateTrend'];
    } else {
      resBody = bodyList['caReappointRateTrend'];
    }

    let chartData = [],
      chartLabels = [];
    if (!resBody?.data) {
      return {
        datasets: [],
        labels: [],
      };
    }
    const targetData = [];
    resBody.data.forEach(res => {
      const val =
        chartName === 'Recall Prebook Rate'
          ? Math.round(<number>res.recallPercent)
          : Math.round(<number>res.reappointRate);
      if (val >= 0) {
        chartData.push(val);
      }
      if (res.goals == -1 || res.goals == null || res.goals == '') {
        targetData.push(null);
      } else {
        targetData.push(res.goals);
      }
      chartLabels.push(
        trendMode === 'current'
          ? moment(res.yearMonth).format('MMM YYYY')
          : res.year
      );
    });

    const sumpercantagevalue = chartData.reduce((acc, cur) => acc + cur, 0);

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

    if (sumpercantagevalue > 0) {
      const mappedtargetData = [];
      targetData.map(function (v) {
        if (v == null) {
          mappedtargetData.push([v - 0, v + 0]);
        } else {
          mappedtargetData.push([v - 0.5, v + 0.5]);
        }
      });

      if (trendMode == 'current') {
        datasets[0]['label'] = 'Actual';
        datasets[1]['label'] = 'Target';
        datasets[1]['data'] = mappedtargetData; //this.targetData.map(v => [v - subVal, v + subVal]);
      } else {
        datasets[0]['label'] = '';
        datasets[1]['label'] = '';
        datasets[1]['data'] = [];
      }
    } else {
      chartLabels = [];
    }

    datasets[0].data = chartData;

    const dynamicColors = [];
    chartLabels.forEach((label, labelIndex) => {
      dynamicColors.push(labelIndex % 2 === 0 ? COLORS.odd : COLORS.even);
    }); // This is dynamic array for colors of bars
    datasets[0].backgroundColor = dynamicColors;

    return {
      datasets,
      labels: chartLabels,
    };
  }
);

export const selectIsLoadingCaNumComplaints = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caTxPlanCompRate') >= 0
);

export const selectIsLoadingCaNumComplaintsTrend = createSelector(
  selectIsLoadingData,
  loadingData =>
    _.findIndex(loadingData, l => l == 'caTxPlanCompRateTrend') >= 0
);

export const selectCaNumComplaintsChartData = createSelector(
  selectResBodyList,
  selectCurrentClinics,
  selectTrend,
  selectAverage,
  selectCurrentDentistId,
  selectRolesIndividual,
  (bodyList, selectedClinics, trend, average, currentDentistid, rolesInd) => {
    let resBody: CaNumComplaintsApiResponse = bodyList['caNumComplaints'];
    const isAllDentist = currentDentistid === 'all';
    if (!resBody?.data) {
      return {
        datasets: [],
        labels: [],
        total: 0,
        average: 0,
        prev: 0,
        goal: 0,
        tableData: [],
      };
    }

    if (isAllDentist) {
      if (selectedClinics.length > 1) {
        resBody.data
          .sort(
            (a, b) =>
              parseFloat(<string>a.numComplaints) -
              parseFloat(<string>b.numComplaints)
          )
          .reverse();
      }

      const chartData = [],
        chartLabels = [];
      let chartColors = [];

      if (resBody.data.length > 20) {
        resBody.data = resBody.data.slice(0, 20);
      }
      let newpKey = 0;
      const tableData = [];
      resBody.data.forEach((res, i) => {
        chartData.push(Math.round(<number>res.numComplaints));

        const pName =
          res.providerName +
          (selectedClinics.length > 1 ? ` - ${res.clinicName}` : '');
        chartLabels.push(pName);
        if (res.providerName != 'Anonymous') newpKey = i;
        tableData.push({
          label: pName,
          value: chartData[i],
        });
      });

      if (!isAllDentist && trend === 'off' && average === 'average') {
        chartColors = [
          {
            backgroundColor: dynamicBarBackgroundColor(
              resBody.data,
              chartLabels,
              selectClinics.length > 1,
              selectedClinics,
              trend !== 'off',
              average == 'average'
            ),
          },
        ];
      } else {
        if (rolesInd.type == 4) {
          chartColors = [{ backgroundColor: [] }];
          chartColors[0].backgroundColor[newpKey] = '#1CA49F';
        } else chartColors = [{ backgroundColor: COLORS.doughnutChartColors }];
      }

      let datasets = [
        {
          data: chartData,
          backgroundColor: chartColors[0].backgroundColor,
        },
      ];

      return {
        datasets,
        labels: chartLabels,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: parseInt(<string>resBody.goals),
        maxData: Math.max(...chartData),
        tableData,
        chartColors,
      };
    } else {
      if (!resBody?.data) {
        return {
          gaugeValue: 0,
          gaugeLabel: '',
          maxGoal: 0,
          total: 0,
          average: 0,
          prev: 0,
          goal: 0,
        };
      }

      let gaugeValue = 0,
        gaugeLabel = '',
        maxGoal = 0;

      resBody.data.forEach(res => {
        gaugeValue = Math.round(<number>res.numComplaints);

        let name: any = res.providerName;
        if (name != null && name != '') {
          name = name.split(')');
          if (name.length > 0 && name[1] != undefined) {
            name = name[1].split(',');
            if (name.length > 0) name = name[1] + ' ' + name[0];
          }
          gaugeLabel = name;
        } else gaugeLabel = res.providerName;
      });
      const goal = parseInt(<string>resBody.goals);
      maxGoal = gaugeValue > goal ? gaugeValue : goal;
      return {
        gaugeValue: gaugeValue,
        gaugeLabel: gaugeLabel,
        total: Math.round(resBody.total),
        average: Math.round(resBody.totalAverage),
        prev: Math.round(resBody.totalTa),
        goal: goal,
        maxGoal: maxGoal,
      };
    }
  }
);

export const selectCaNumComplaintsTrendChartData = createSelector(
  selectResBodyListTrend,
  selectTrend,
  (bodyList, trendMode) => {
    let resBody: CaNumComplaintsApiResponse = bodyList['caNumComplaintsTrend'];
    let chartData = [],
      chartLabels = [];
    if (!resBody?.data) {
      return {
        datasets: [],
        labels: [],
      };
    }
    resBody.data.forEach(res => {
      const avgFee = Math.round(<number>res.numComplaints);
      if (avgFee >= 0) {
        chartData.push(avgFee);
      }
      chartLabels.push(
        trendMode === 'current'
          ? moment(res.yearMonth).format('MMM YYYY')
          : res.year
      );
    });
    const datasets: ChartDataset<any>[] = [
      {
        data: [],
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

    datasets[0].data = chartData;

    const dynamicColors = [];
    chartLabels.forEach((label, labelIndex) => {
      dynamicColors.push(labelIndex % 2 === 0 ? COLORS.odd : COLORS.even);
    }); // This is dynamic array for colors of bars
    datasets[0].backgroundColor = dynamicColors;

    return {
      datasets,
      labels: chartLabels,
    };
  }
);
