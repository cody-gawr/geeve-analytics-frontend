import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClinicianAnalysisActions } from '../state/actions';
import {
  ClinicianAnalysisState,
  selectCaProductionChartData,
  selectColExpSelectTab,
  selectColSelectTab,
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

  public readonly isLoadingCaProduction$ = this.store.pipe(
    select(selectIsLoadingCaProduction)
  );

  public setProdChartName(chartName: CA_PROD_CHART_NAME) {
    this.store.dispatch(
      ClinicianAnalysisActions.setProdChartName({ chartName })
    );
  }

  public readonly caProductionChartData$ = this.store.pipe(
    select(selectCaProductionChartData)
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
}
