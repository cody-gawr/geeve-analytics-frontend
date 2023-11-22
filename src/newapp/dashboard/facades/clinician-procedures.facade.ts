import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JeeveError } from '@/newapp/models';
import {
  ClinicianProcedureState,
  selectCpPredictorAnalysisChartData,
  selectCpPredictorAnalysisTrendChartData,
  selectCpPredictorAnalysisVisibility,
  selectCpPredictorRatioChartData,
  selectCpPredictorRatioTrendChartData,
  selectCpPredictorRatioVisibility,
  selectCpPredictorSpecialistAnalysisChartData,
  selectCpReferralsChartData,
  selectCpReferralsVisibility,
  selectCpRevPerProcedureChartData,
  selectErrors,
  selectIsLoadingCpPredictorAnalysis,
  selectIsLoadingCpPredictorAnalysisTrend,
  selectIsLoadingCpPredictorRatio,
  selectIsLoadingCpPredictorRatioTrend,
  selectIsLoadingCpPredictorSpecialistAnalysis,
  selectIsLoadingCpReferrals,
  selectIsLoadingCpRevPerProcedure,
} from '../state/reducers/clinician-procedure.reducer';
import { ClinicianProcedurePageActions } from '../state/actions';

@Injectable()
export class ClinicianProcedureFacade {
  constructor(private store: Store<ClinicianProcedureState>) {}

  public readonly errors$: Observable<JeeveError[]> = this.store.pipe(
    select(selectErrors)
  );

  public readonly isLoadingCpPredictorAnalysis$ = this.store.pipe(
    select(selectIsLoadingCpPredictorAnalysis)
  );

  public readonly isLoadingCpPredictorAnalysisTrend$ = this.store.pipe(
    select(selectIsLoadingCpPredictorAnalysisTrend)
  );

  public readonly isLoadingCpPredictorSpecialistAnalysis$ = this.store.pipe(
    select(selectIsLoadingCpPredictorSpecialistAnalysis)
  );

  public readonly isLoadingCpRevPerProcedure$ = this.store.pipe(
    select(selectIsLoadingCpRevPerProcedure)
  );

  public readonly isLoadingCpPredictorRatio$ = this.store.pipe(
    select(selectIsLoadingCpPredictorRatio)
  );

  public readonly isLoadingCpPredictorRatioTrend$ = this.store.pipe(
    select(selectIsLoadingCpPredictorRatioTrend)
  );

  public readonly isLoadingCpReferrals$ = this.store.pipe(
    select(selectIsLoadingCpReferrals)
  );

  public readonly cpPredictorAnalysisChartData$ = this.store.pipe(
    select(selectCpPredictorAnalysisChartData)
  );

  public readonly cpPredictorSpecialistAnalysisChartData$ = this.store.pipe(
    select(selectCpPredictorSpecialistAnalysisChartData)
  );

  public readonly cpRevPerProcedureChartData$ = this.store.pipe(
    select(selectCpRevPerProcedureChartData)
  );

  public readonly cpPredictorRatioChartData$ = this.store.pipe(
    select(selectCpPredictorRatioChartData)
  );

  public readonly cpPredictorRatioTrendChartData$ = this.store.pipe(
    select(selectCpPredictorRatioTrendChartData)
  );

  public readonly cpReferralsChartData$ = this.store.pipe(
    select(selectCpReferralsChartData)
  );

  public readonly cpPredictorAnalysisVisibility$ = this.store.pipe(
    select(selectCpPredictorAnalysisVisibility)
  );

  public readonly cpPredictorRatioVisibility$ = this.store.pipe(
    select(selectCpPredictorRatioVisibility)
  );

  public readonly cpReferralsVisibility$ = this.store.pipe(
    select(selectCpReferralsVisibility)
  );

  public readonly cpPredictorAnalysisTrendChartData = this.store.pipe(
    select(selectCpPredictorAnalysisTrendChartData)
  );

  public loadCpPredictorAnalysis({
    clinicId,
    startDate,
    endDate,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.store.dispatch(
      ClinicianProcedurePageActions.loadCpPredictorAnalysis({
        clinicId,
        startDate,
        endDate,
        queryWhEnabled,
        dentistId,
      })
    );
  }

  public loadCpPredictorSpecialistAnalysis({
    clinicId,
    startDate,
    endDate,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.store.dispatch(
      ClinicianProcedurePageActions.loadCpPredictorSpecialistAnalysis({
        clinicId,
        startDate,
        endDate,
        queryWhEnabled,
        dentistId,
      })
    );
  }

  public loadCpRevPerProcedure({
    clinicId,
    startDate,
    endDate,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.store.dispatch(
      ClinicianProcedurePageActions.loadCpRevPerProcedure({
        clinicId,
        startDate,
        endDate,
        queryWhEnabled,
        dentistId,
      })
    );
  }

  public loadCpPredictorRatio({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.store.dispatch(
      ClinicianProcedurePageActions.loadCpPredictorRatio({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled,
        dentistId,
      })
    );
  }

  public loadCpReferrals({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
    dentistId = undefined,
  }) {
    this.store.dispatch(
      ClinicianProcedurePageActions.loadCpReferrals({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled,
        dentistId,
      })
    );
  }

  public setCpPredictorAnalysisVisibility(value: 'general' | 'specialist') {
    this.store.dispatch(
      ClinicianProcedurePageActions.setCpPredictorAnalysisVisibility({ value })
    );
  }

  public setCpPredictorRatioVisibility(
    value:
      | 'indirect to large direct fillings'
      | 'rct to extraction'
      | 'rct conversion'
  ) {
    this.store.dispatch(
      ClinicianProcedurePageActions.setCpPredictorRatioVisibility({ value })
    );
  }

  public setCpReferralsVisibility(value: 'combined' | 'internal' | 'external') {
    this.store.dispatch(
      ClinicianProcedurePageActions.setCpReferralsVisibility({ value })
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
      ClinicianProcedurePageActions.loadNoneTrendApiRequest({
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
      ClinicianProcedurePageActions.loadTrendApiRequest({
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
