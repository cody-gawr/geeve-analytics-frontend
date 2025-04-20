import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { FollowupsActions } from '../actions';
import _ from 'lodash';

export interface FollowupsState {
  isLoadingData: Array<FU_API_ENDPOINTS>;
  errors: Array<JeeveError>;
  fuGetOutcomeChartName: FU_OUTCOME_CHART_NAME;
  fuGetConversionPerUserChartName: FU_OUTCOME_CHART_NAME;

  resBodyList: Record<FU_API_ENDPOINTS, unknown> | {};
}

const initiateState: FollowupsState = {
  isLoadingData: [],
  errors: [],
  fuGetOutcomeChartName: 'Ticks',
  fuGetConversionPerUserChartName: 'Ticks',
  resBodyList: {},
};

export const followupsFeature = createFeature({
  name: 'followups',
  reducer: createReducer(
    initiateState,
    on(FollowupsActions.loadFuGetConversion, (state): FollowupsState => {
      const api: FU_API_ENDPOINTS = 'fuGetConversion';
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != api),
        isLoadingData: _.union(state.isLoadingData, [api]),
        resBodyList: { ...state.resBodyList, [api]: {} },
      };
    }),
    on(FollowupsActions.loadFuGetConversionPerUser, (state): FollowupsState => {
      const api: FU_API_ENDPOINTS = 'fuGetConversionPerUser';
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != api),
        isLoadingData: _.union(state.isLoadingData, [api]),
        resBodyList: { ...state.resBodyList, [api]: {} },
      };
    }),
    on(FollowupsActions.loadFuGetFollowupCompletion, (state): FollowupsState => {
      const api: FU_API_ENDPOINTS = 'fuGetFollowupCompletion';
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != api),
        isLoadingData: _.union(state.isLoadingData, [api]),
        resBodyList: { ...state.resBodyList, [api]: {} },
      };
    }),
    on(FollowupsActions.loadFuGetOutcome, (state): FollowupsState => {
      const api: FU_API_ENDPOINTS = 'fuGetOutcome';
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != api),
        isLoadingData: _.union(state.isLoadingData, [api]),
        resBodyList: { ...state.resBodyList, [api]: {} },
      };
    }),
    on(FollowupsActions.loadFuGetPerUser, (state): FollowupsState => {
      const api: FU_API_ENDPOINTS = 'fuGetPerUser';
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != api),
        isLoadingData: _.union(state.isLoadingData, [api]),
        resBodyList: { ...state.resBodyList, [api]: {} },
      };
    }),
    on(FollowupsActions.loadFuApiRequestSuccess, (state, { api, resBody }): FollowupsState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != api),
        resBodyList: { ...state.resBodyList, [api]: resBody },
        isLoadingData: _.filter(isLoadingData, n => n != api),
      };
    }),
    on(FollowupsActions.loadFuApiRequestFailure, (state, { api, error }): FollowupsState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        resBodyList: { ...state.resBodyList, [api]: {} },
        isLoadingData: _.filter(isLoadingData, n => n != api),
        errors: [...errors, { ...error, api: api }],
      };
    }),
    on(FollowupsActions.setFuOutComeChartName, (state, { chartName }): FollowupsState => {
      return {
        ...state,
        fuGetOutcomeChartName: chartName,
      };
    }),
    on(FollowupsActions.setFuConversionPerUserChartName, (state, { chartName }): FollowupsState => {
      return {
        ...state,
        fuGetConversionPerUserChartName: chartName,
      };
    }),
  ),
});

export const {
  selectIsLoadingData,
  selectErrors,
  selectResBodyList,
  selectFuGetConversionPerUserChartName,
  selectFuGetOutcomeChartName,
} = followupsFeature;

export const selectIsLoadingFuGetConversion = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fuGetConversion') >= 0,
);

export const selectIsLoadingFuGetConversionPerUser = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fuGetConversionPerUser') >= 0,
);

export const selectIsLoadingFuGetFollowupCompletion = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fuGetFollowupCompletion') >= 0,
);

export const selectIsLoadingFuGetOutcome = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fuGetOutcome') >= 0,
);

export const selectIsLoadingFuGetPerUser = createSelector(
  selectIsLoadingData,
  loadingData => _.findIndex(loadingData, l => l == 'fuGetPerUser') >= 0,
);

export const selectFuGetConversionChartData = createSelector(selectResBodyList, bodyList => {
  //
  let resBody: FuGetConversionApiResponse = bodyList['fuGetConversion'];
  if (!resBody) {
    return {
      datasets: [],
      labels: [],
      total: 0,
      prev: 0,
    };
  }
  let chartData = [],
    chartLabels = [];
  resBody.data?.forEach(item => {
    chartData.push(Math.round(<number>item.bookedPercent));
    chartLabels.push(item.type);
  });
  return {
    datasets: [
      {
        data: chartData,
      },
    ],
    labels: chartLabels,
    total: resBody.total,
    prev: resBody.totalTa,
    goal: resBody?.goals,
  };
});

export const selectFuGetConversionPerUserChartData = createSelector(selectResBodyList, bodyList => {
  let resBody: FuGetConversionPerUserApiResponse = bodyList['fuGetConversionPerUser'];
  if (!resBody) {
    return {
      datasetsFta: [],
      labelsFta: [],
      datasetsUta: [],
      labelsUta: [],
      datasetsRecalls: [],
      labelsRecalls: [],
      datasetsTicks: [],
      labelsTicks: [],
      totalFta: 0,
      totalUta: 0,
      totalRecalls: 0,
      totalTicks: 0,
      prevTicks: 0,
      prevRecalls: 0,
      prevFta: 0,
      prevUta: 0,
    };
  }
  let chartDataFtas = [],
    chartLabelsFtas = [];
  resBody.data?.ftas?.forEach(fta => {
    chartDataFtas.push(Math.round(<number>fta.bookedPercent));
    chartLabelsFtas.push(fta.completedBy);
  });
  let chartDataUtas = [],
    chartLabelsUtas = [];
  resBody.data?.utas?.forEach(uta => {
    chartDataUtas.push(Math.round(<number>uta.bookedPercent));
    chartLabelsUtas.push(uta.completedBy);
  });
  let chartDataRecalls = [],
    chartLabelsRecalls = [];
  resBody.data?.recalls?.forEach(recall => {
    chartDataRecalls.push(Math.round(<number>recall.bookedPercent));
    chartLabelsRecalls.push(recall.completedBy);
  });

  let chartDataTicks = [],
    chartLabelsTicks = [];
  resBody.data?.ticks?.forEach(ticks => {
    chartDataTicks.push(Math.round(<number>ticks.bookedPercent));
    chartLabelsTicks.push(ticks.completedBy);
  });

  return {
    datasetsFta: [{ data: chartDataFtas }],
    labelsFta: chartLabelsFtas,
    datasetsUta: [{ data: chartDataUtas }],
    labelsUta: chartLabelsUtas,
    datasetsRecalls: [{ data: chartDataRecalls }],
    labelsRecalls: chartLabelsRecalls,
    datasetsTicks: [{ data: chartDataTicks }],
    labelsTicks: chartLabelsTicks,
    totalFta: resBody.totalFta,
    totalUta: resBody.totalUta,
    totalRecalls: resBody.totalRecall,
    totalTicks: resBody.totalTick,
    prevTicks: resBody.totalTaTick,
    prevRecalls: resBody.totalTaRecall,
    prevFta: resBody.totalTaFta,
    prevUta: resBody.totalTaUta,
  };
});

export const selectFuGetFollowupCompletionChartData = createSelector(
  selectResBodyList,
  bodyList => {
    let resBody: FuGetFollowupCompletionApiResponse = bodyList['fuGetFollowupCompletion'];
    if (!resBody) {
      return {
        datasets: [],
        labels: [],
        total: 0,
        prev: 0,
      };
    }
    let chartData = [],
      chartLabels = [];
    resBody.data?.forEach(item => {
      if (parseInt(<string>item.completionRate) >= 0 && parseInt(<string>item.numTotal) > 0) {
        chartData.push(item.completionRate);
        chartLabels.push(item.type);
      }
    });

    return {
      datasets: [
        {
          data: chartData,
        },
      ],
      labels: chartLabels,
      total: resBody.total,
      prev: resBody.totalTa,
      goal: resBody?.goals,
    };
  },
);

export const selectFuGetOutcomeChartData = createSelector(selectResBodyList, bodyList => {
  let resBody: FuGetOutcomeApiResponse = bodyList['fuGetOutcome'];
  if (!resBody) {
    return {
      total: 0,
      prev: 0,
      ticks: [],
      recalls: [],
      utas: [],
      ftas: [],
    };
  }
  let tick = [],
    recall = [],
    fta = [],
    uta = [];
  resBody.data?.ticks?.forEach(item => {
    if (item.status)
      tick.push({
        name: item.status,
        value: item.statusPercent,
      });
  });

  resBody.data?.recalls?.forEach(item => {
    if (item.status)
      recall.push({
        name: item.status,
        value: item.statusPercent,
      });
  });

  resBody.data?.utas?.forEach(item => {
    if (item.status)
      uta.push({
        name: item.status,
        value: item.statusPercent,
      });
  });

  resBody.data?.ftas?.forEach(item => {
    if (item.status) {
      fta.push({
        name: item.status,
        value: item.statusPercent,
      });
    }
  });

  return {
    total: resBody.total,
    prev: resBody.totalTa,
    ticks: tick,
    recalls: recall,
    utas: uta,
    ftas: fta,
  };
});

export const selectFuGetPerUserChartData = createSelector(selectResBodyList, bodyList => {
  let resBody: FuGetPerUserApiResponse = bodyList['fuGetPerUser'];
  if (!resBody) {
    return {
      datasets: [],
      labels: [],
      total: 0,
      prev: 0,
    };
  }
  let chartData1 = [],
    chartData2 = [],
    chartData3 = [],
    chartData4 = [],
    chartData5 = [],
    chartLabels = [];

  resBody.data?.forEach(item => {
    chartData1.push(item.numTicks);
    chartData2.push(item.numPostop);
    chartData3.push(item.numRecall);
    chartData4.push(item.numFtas);
    chartData5.push(item.numUtas);
    chartLabels.push(item.completedBy);
  });

  return {
    datasets: [
      { data: chartData1, label: 'Ticks' },
      { data: chartData2, label: 'Post Op' },
      { data: chartData3, label: 'Recall' },
      { data: chartData4, label: 'Ftas' },
      { data: chartData5, label: 'Utas' },
    ],
    labels: chartLabels,
    total: resBody.total,
    prev: resBody.totalTa,
  };
});
