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
  hourlyRateProdSelectTab: CA_PROD_SELECT_TAB;
  hourlyRateColSelectTab: CA_COL_SELECT_TAB;
  hourlyRateColExpSelectTab: CA_COL_EXP_SELECT_TAB;
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
  hourlyRateProdSelectTab: 'production_all',
  hourlyRateColSelectTab: 'collection_all',
  hourlyRateColExpSelectTab: 'collection_exp_all',
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
} = clinicianAnalysisFeature;

export const selectIsLoadingCaDentistProduction = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caDentistProduction') >= 0
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
  (
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
    isLoadingCaCollectionExpOht
  ) => {
    switch (prodChartName) {
      case 'Production':
        switch (prodTab) {
          case 'production_all':
            return isLoadingCaDentistProduction;
          case 'production_dentists':
            return isLoadingCaDentistProductionDentist;
          case 'production_oht':
            return isLoadingCaDentistProductionOht;
        }
        break;
      case 'Collection':
        switch (colTab) {
          case 'collection_all':
            return isLoadingCaCollection;
          case 'collection_dentists':
            return isLoadingCaCollectionDentists;
          case 'collection_oht':
            return isLoadingCaCollectionOht;
        }
        break;
      case 'Collection-Exp':
        switch (colExpTab) {
          case 'collection_exp_all':
            return isLoadingCaCollectionExp;
          case 'collection_exp_dentists':
            return isLoadingCaCollectionExpDentists;
          case 'collection_exp_oht':
            return isLoadingCaCollectionExpOht;
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
  (
    bodyList,
    selectedClinics,
    trendMode,
    averageMode,
    prodChartName,
    prodTab,
    colTab,
    colExpTab,
    currentDentistId
  ) => {
    const isAllDentist = currentDentistId === 'all';
    let resBody: CaDentistProductionApiResponse | CaCollectionApiResponse =
      null;
    switch (prodChartName) {
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
        if (prodChartName === 'Production') {
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
      resBody.data.forEach((res, i) => {
        if (prodChartName === 'Production') {
          chartData.push(Math.round(<number>res.production));
        } else {
          chartData.push(Math.round(<number>res.collection));
        }

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
          tableData: [],
        };
      }

      let gaugeValue = 0,
        gaugeLabel = '',
        maxGoal = 0,
        tableData = [];

      resBody.data.forEach(res => {
        gaugeValue = Math.round(
          prodChartName === 'Production' ? res.production : res.collection
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
        tableData,
      };
    }
  }
);

export const selectIsLoadingCaHourlyRate = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'caHourlyRate') >= 0
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
  (
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
    isLoadingCaCollectionExpHourlyRateOht
  ) => {
    switch (hourlyRateChartName) {
      case 'Production':
        switch (hourlyRateProdTab) {
          case 'production_all':
            return isLoadingCaHourlyRate;
          case 'production_dentists':
            return isLoadingCaHourlyRateDentist;
          case 'production_oht':
            return isLoadingCaHourlyRateOht;
        }
        break;
      case 'Collection':
        switch (hourlyRateColTab) {
          case 'collection_all':
            return isLoadingCaCollectionHourlyRate;
          case 'collection_dentists':
            return isLoadingCaCollectionHourlyRateDentists;
          case 'collection_oht':
            return isLoadingCaCollectionHourlyRateOht;
        }
        break;
      case 'Collection-Exp':
        switch (hourlyRatecolExpTab) {
          case 'collection_exp_all':
            return isLoadingCaCollectionExpHourlyRate;
          case 'collection_exp_dentists':
            return isLoadingCaCollectionExpHourlyRateDentists;
          case 'collection_exp_oht':
            return isLoadingCaCollectionExpHourlyRateOht;
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
  selectHourlyRateColSelectTab,
  selectHourlyRateColExpSelectTab,
  selectCurrentDentistId,
  (
    bodyList,
    selectedClinics,
    trendMode,
    averageMode,
    prodChartName,
    prodTab,
    colTab,
    colExpTab,
    currentDentistid
  ) => {
    let resBody: CaHourlyRateApiResponse | CaCollectionHourlyRateApiResponse =
      null;
    const isAllDentist = currentDentistid === 'all';
    switch (prodChartName) {
      case 'Production':
        if (isAllDentist) {
          switch (prodTab) {
            case 'production_all':
              resBody = bodyList['caHourlyRate'];
              break;
            case 'production_dentists':
              resBody = bodyList['caHourlyRateDentists'];
              break;
            case 'production_oht':
              resBody = bodyList['caHourlyRateOht'];
              break;
          }
        } else {
          resBody = bodyList['caHourlyRate'];
        }

        break;
      case 'Collection':
        if (isAllDentist) {
          switch (colTab) {
            case 'collection_all':
              resBody = bodyList['caCollectionHourlyRate'];
              break;
            case 'collection_dentists':
              resBody = bodyList['caCollectionHourlyRateDentist'];
              break;
            case 'collection_oht':
              resBody = bodyList['caCollectionHourlyRateOht'];
              break;
          }
        } else {
          resBody = bodyList['caCollectionHourlyRate'];
        }

        break;
      case 'Collection-Exp':
        if (isAllDentist) {
          switch (colExpTab) {
            case 'collection_exp_all':
              resBody = bodyList['caCollectionExpHourlyRate'];
              break;
            case 'collection_exp_dentists':
              resBody = bodyList['caCollectionExpHourlyRateDentist'];
              break;
            case 'collection_exp_oht':
              resBody = bodyList['caCollectionExpHourlyRateOht'];
              break;
          }
        } else {
          resBody = bodyList['caCollectionExpHourlyRate'];
        }
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
