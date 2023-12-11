import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  FollowupsState,
  selectFuGetConversionChartData,
  selectFuGetConversionPerUserChartData,
  selectFuGetConversionPerUserChartName,
  selectFuGetFollowupCompletionChartData,
  selectFuGetOutcomeChartData,
  selectFuGetOutcomeChartName,
  selectFuGetPerUserChartData,
  selectIsLoadingFuGetConversion,
  selectIsLoadingFuGetConversionPerUser,
  selectIsLoadingFuGetFollowupCompletion,
  selectIsLoadingFuGetOutcome,
  selectIsLoadingFuGetPerUser,
} from '../state/reducers/followups.reducer';
import { FollowupsActions } from '../state/actions';

@Injectable()
export class FollowupsFacade {
  constructor(private store: Store<FollowupsState>) {}

  public readonly fuGetConversionPerUserChartName$ = this.store.pipe(
    select(selectFuGetConversionPerUserChartName)
  );

  public readonly fuGetOutcomeChartName$ = this.store.pipe(
    select(selectFuGetOutcomeChartName)
  );

  public readonly isLoadingFuGetConversion$ = this.store.pipe(
    select(selectIsLoadingFuGetConversion)
  );

  public readonly isLoadingFuGetConversionPerUser$ = this.store.pipe(
    select(selectIsLoadingFuGetConversionPerUser)
  );

  public readonly isLoadingFuGetFollowupCompletion$ = this.store.pipe(
    select(selectIsLoadingFuGetFollowupCompletion)
  );

  public readonly isLoadingFuGetOutcome$ = this.store.pipe(
    select(selectIsLoadingFuGetOutcome)
  );

  public readonly isLoadingFuGetPerUser$ = this.store.pipe(
    select(selectIsLoadingFuGetPerUser)
  );

  public setFuOutComeChartName(chartName: FU_OUTCOME_CHART_NAME) {
    this.store.dispatch(FollowupsActions.setFuOutComeChartName({ chartName }));
  }

  public setFuConversionPerUserChartName(chartName: FU_OUTCOME_CHART_NAME) {
    this.store.dispatch(
      FollowupsActions.setFuConversionPerUserChartName({ chartName })
    );
  }

  public readonly fuGetConversionChartData$ = this.store.pipe(
    select(selectFuGetConversionChartData)
  );
  public loadFuGetConversion(params: FuApiQueryParams) {
    this.store.dispatch(
      FollowupsActions.loadFuGetConversion({
        params,
      })
    );
  }

  public readonly fuGetConversionPerUserChartDat$ = this.store.pipe(
    select(selectFuGetConversionPerUserChartData)
  );
  public loadFuGetConversionPerUser(params: FuApiQueryParams) {
    this.store.dispatch(
      FollowupsActions.loadFuGetConversionPerUser({
        params,
      })
    );
  }

  public readonly fuGetFollowupCompletionChartData$ = this.store.pipe(
    select(selectFuGetFollowupCompletionChartData)
  );
  public loadFuGetFollowupCompletion(params: FuApiQueryParams) {
    this.store.dispatch(
      FollowupsActions.loadFuGetFollowupCompletion({
        params,
      })
    );
  }

  public readonly fuGetOutcomeChartData$ = this.store.pipe(
    select(selectFuGetOutcomeChartData)
  );
  public loadFuGetOutcome(params: FuApiQueryParams) {
    this.store.dispatch(
      FollowupsActions.loadFuGetOutcome({
        params,
      })
    );
  }

  public readonly fuGetPerUserChartData$ = this.store.pipe(
    select(selectFuGetPerUserChartData)
  );
  public loadFuGetPerUser(params: FuApiQueryParams) {
    this.store.dispatch(
      FollowupsActions.loadFuGetPerUser({
        params,
      })
    );
  }
}
