import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClinicianAnalysisActions } from '../state/actions';
import {
  ClinicianAnalysisState,
  selectCaHourlyRateChartData,
  selectCaProductionChartData,
  selectColExpSelectTab,
  selectColSelectTab,
  selectHourlyRateChartName,
  selectHourlyRateColExpSelectTab,
  selectHourlyRateColSelectTab,
  selectHourlyRateProdSelectTab,
  selectIsLoadingCaHourlyRateAll,
  selectIsLoadingCaProduction,
  selectProdSelectTab,
  selectProductionChartName,
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

  public readonly isLoadingCaProduction$ = this.store.pipe(
    select(selectIsLoadingCaProduction)
  );

  public readonly isLoadingCaHourlyRateAll$ = this.store.pipe(
    select(selectIsLoadingCaHourlyRateAll)
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

  public readonly caProductionChartData$ = this.store.pipe(
    select(selectCaProductionChartData)
  );

  public readonly caHourlyRateChartData$ = this.store.pipe(
    select(selectCaHourlyRateChartData)
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
