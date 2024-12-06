import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  LayoutState,
  selectActivatedRouteTitle,
  selectAverage,
  selectDateRange,
  selectDurationLabel,
  selectDurationTrendLabel,
  selectIsFullMonthsDateRange,
  selectTrend,
  selectCompareEnabled,
  selectIsFullSingleMonthDateRange,
  selectHideDatePicker,
  selectPaths,
} from '../state/reducers/layout.reducer';
import { Moment } from 'moment';
import { layoutPageActions } from '../state/actions';

@Injectable()
export class LayoutFacade {
  constructor(private readonly store: Store<LayoutState>) {}

  public readonly activatedRouteTitle$ = this.store.pipe(
    select(selectActivatedRouteTitle)
  );

  public readonly dateRange$ = this.store.pipe(select(selectDateRange));

  public readonly trend$: Observable<TREND_MODE> = this.store.pipe(
    select(selectTrend)
  );

  public readonly average$: Observable<C_AVG_MODE> = this.store.pipe(
    select(selectAverage)
  );

  public readonly compare$ = this.store.pipe(select(selectCompareEnabled));

  public readonly isFullMonthsDateRange$ = this.store.pipe(
    select(selectIsFullMonthsDateRange)
  );

  public readonly isFullSingleMonthDateRange$ = this.store.pipe(
    select(selectIsFullSingleMonthDateRange)
  );

  public readonly paths$ = this.store.pipe(
    select(selectPaths)
  );

  public saveDateRange(
    start: Moment | null,
    end: Moment | null,
    duration: DATE_RANGE_DURATION,
    goalCount?: number,
    enableGoal?: boolean
  ) {
    this.store.dispatch(
      layoutPageActions.saveDateRange({
        start,
        end,
        duration,
        goalCount,
        enableGoal,
      })
    );
  }

  public setTrend(trend: TREND_MODE) {
    this.store.dispatch(layoutPageActions.setTrend({ trend }));
  }

  public setAverage(avg: C_AVG_MODE) {
    this.store.dispatch(layoutPageActions.setAvgMode({ cMode: avg }));
  }

  public setCompareMode(compareMode: boolean) {
    this.store.dispatch(
      layoutPageActions.setCompareMode({ cMode: compareMode })
    );
  }

  public setActivatedRouteTitle(title: string) {
    this.store.dispatch(layoutPageActions.setActivatedRouteTitle({ title }));
  }

  public readonly durationLabel$ = this.store.pipe(select(selectDurationLabel));

  public readonly durationTrendLabel$ = this.store.pipe(
    select(selectDurationTrendLabel)
  );

  public readonly hideDatePicker$ = this.store.pipe(select(selectHideDatePicker));

  public setHideDatePicker(hide: boolean) {
    this.store.dispatch(layoutPageActions.setHideDatePicker({ hide }));
  }

  public savePaths(paths: {name: string, path: string}[]){
    this.store.dispatch(layoutPageActions.setPaths({paths}));
  }
}
