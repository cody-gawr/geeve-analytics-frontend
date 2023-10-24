import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClinicianAnalysisActions } from '../state/actions';
import {
  ClinicianAnalysisState,
  selectCaHourlyRateChartData,
  selectCaNumComplaintsChartData,
  selectCaNumNewPatientsChartData,
  selectCaProductionChartData,
  selectColExpSelectTab,
  selectColSelectTab,
  selectHourlyRateChartName,
  selectHourlyRateColExpSelectTab,
  selectHourlyRateColSelectTab,
  selectHourlyRateProdSelectTab,
  selectIsLoadingCaHourlyRateAll,
  selectIsLoadingCaNumComplaints,
  selectIsLoadingCaProduction,
  selectIsLoadingCaRecallRateAll,
  selectIsLoadingCaTxPlanAvgFeeAll,
  selectIsLoadingCaTxPlanCompRate,
  selectProdSelectTab,
  selectProductionChartName,
  selectRecallRateChartData,
  selectRecallRateChartName,
  selectTxPlanAvgFeesChartData,
  selectTxPlanCompRateChartData,
  selectTxPlanAvgFeeChartName,
  selectCaProductionTrendChartData,
} from '../state/reducers/clinician-analysis.reducer';

@Injectable()
export class ClinicianAnalysisFacade {
  constructor(private store: Store<ClinicianAnalysisState>) {}
  public readonly prodChartName$ = this.store.pipe(
    select(selectProductionChartName)
  );

  public readonly hourlyRateChartName$ = this.store.pipe(
    select(selectHourlyRateChartName)
  );

  public readonly txPlanAvgFeeChartName$ = this.store.pipe(
    select(selectTxPlanAvgFeeChartName)
  );

  public readonly recallRateChartName$ = this.store.pipe(
    select(selectRecallRateChartName)
  );

  public readonly isLoadingCaProduction$ = this.store.pipe(
    select(selectIsLoadingCaProduction)
  );

  public readonly isLoadingCaHourlyRateAll$ = this.store.pipe(
    select(selectIsLoadingCaHourlyRateAll)
  );

  public readonly isLoadingTxPlanAvgFee$ = this.store.pipe(
    select(selectIsLoadingCaTxPlanAvgFeeAll)
  );

  public readonly isLoadingCaTxPlanCompRate$ = this.store.pipe(
    select(selectIsLoadingCaTxPlanCompRate)
  );

  public readonly isLoadingRecallRateAll$ = this.store.pipe(
    select(selectIsLoadingCaRecallRateAll)
  );

  public readonly isLoadingCaNumComplaints$ = this.store.pipe(
    select(selectIsLoadingCaNumComplaints)
  );

  public setProdChartName(chartName: CA_PROD_CHART_NAME) {
    this.store.dispatch(
      ClinicianAnalysisActions.setProdChartName({ chartName })
    );
  }

  public setHourlyRateChartName(chartName: CA_PROD_CHART_NAME) {
    this.store.dispatch(
      ClinicianAnalysisActions.setHourlyRateChartName({ chartName })
    );
  }

  public setTxTplanAvgFeeChartName(chartName: CA_TX_PLAN_AVG_FEE_CHART_NAME) {
    this.store.dispatch(
      ClinicianAnalysisActions.setTxTplanAvgFeeChartName({ chartName })
    );
  }

  public setRecallRateChartName(chartName: CA_RECALL_RATE_CHART_NAME) {
    this.store.dispatch(
      ClinicianAnalysisActions.setRecallRateChartName({ chartName })
    );
  }

  public readonly caProductionChartData$ = this.store.pipe(
    select(selectCaProductionChartData)
  );

  public readonly caProductionTrendChartData$ = this.store.pipe(
    select(selectCaProductionTrendChartData)
  );

  public readonly caHourlyRateChartData$ = this.store.pipe(
    select(selectCaHourlyRateChartData)
  );

  public readonly caNumNewPatientsChartData$ = this.store.pipe(
    select(selectCaNumNewPatientsChartData)
  );

  public readonly caTxPlanAvgFeesChartData$ = this.store.pipe(
    select(selectTxPlanAvgFeesChartData)
  );

  public readonly caTxPlanCompRateChartData$ = this.store.pipe(
    select(selectTxPlanCompRateChartData)
  );

  public readonly caRecallRateChartData$ = this.store.pipe(
    select(selectRecallRateChartData)
  );

  public readonly caNumComplaintsChartData$ = this.store.pipe(
    select(selectCaNumComplaintsChartData)
  );

  public readonly prodSelectTab$ = this.store.pipe(select(selectProdSelectTab));

  public readonly colSelectTab$ = this.store.pipe(select(selectColSelectTab));

  public readonly colExpSelectTab$ = this.store.pipe(
    select(selectColExpSelectTab)
  );

  public setProdSelectTab(tabName: CA_PROD_SELECT_TAB) {
    this.store.dispatch(ClinicianAnalysisActions.setProdSelectTab({ tabName }));
  }

  public setColSelectTab(tabName: CA_COL_SELECT_TAB) {
    this.store.dispatch(ClinicianAnalysisActions.setColSelectTab({ tabName }));
  }

  public setColExpSelectTab(tabName: CA_COL_EXP_SELECT_TAB) {
    this.store.dispatch(
      ClinicianAnalysisActions.setColExpSelectTab({ tabName })
    );
  }

  public loadNoneTrendApiRequest({
    api,
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.store.dispatch(
      ClinicianAnalysisActions.loadNoneTrendApiRequest({
        api: api,
        params: {
          clinicId,
          startDate,
          endDate,
          duration,
          queryWhEnabled,
          dentistId,
        },
      })
    );
  }

  public loadTrendApiRequest({
    api,
    clinicId,
    mode,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.store.dispatch(
      ClinicianAnalysisActions.loadTrendApiRequest({
        api: api,
        params: {
          clinicId: clinicId,
          dentistId: dentistId,
          mode,
          queryWhEnabled,
        },
      })
    );
  }

  public readonly hourlyRateProdSelectTab$ = this.store.pipe(
    select(selectHourlyRateProdSelectTab)
  );

  public readonly hourlyRateColSelectTab$ = this.store.pipe(
    select(selectHourlyRateColSelectTab)
  );

  public readonly hourlyRateColExpSelectTab$ = this.store.pipe(
    select(selectHourlyRateColExpSelectTab)
  );

  public setHourlyRateProdSelectTab(tabName: CA_PROD_SELECT_TAB) {
    this.store.dispatch(
      ClinicianAnalysisActions.setHourlyRateProdSelectTab({ tabName })
    );
  }

  public setHourlyRateColSelectTab(tabName: CA_COL_SELECT_TAB) {
    this.store.dispatch(
      ClinicianAnalysisActions.setHourlyRateColSelectTab({ tabName })
    );
  }

  public setHourlyRateColExpSelectTab(tabName: CA_COL_EXP_SELECT_TAB) {
    this.store.dispatch(
      ClinicianAnalysisActions.setHourlyRateColExpSelectTab({ tabName })
    );
  }
}
