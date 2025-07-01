import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  LayoutState,
  selectActivatedRouteTitle,
  selectAverage,
  selectDateRange,
  selectDurationCurrLabel,
  selectDurationPrevLabel,
  selectIsFullMonthsDateRange,
  selectTrend,
  selectCompareEnabled,
  selectIsFullSingleMonthDateRange,
  selectHideDatePicker,
  selectPaths,
  selectHideClinicSelectionDropdown,
  selectIsFullSingleMonthOrYearOrCurrentMonthDateRange,
  selectIsClinicSelectionVisible,
  selectIsDentistSelectionVisible,
} from '../state/reducers/layout.reducer';
import { Moment } from 'moment';
import { layoutPageActions } from '../state/actions';

@Injectable()
export class LayoutFacade {
  constructor(private readonly store: Store<LayoutState>) {}

  public readonly activatedRouteTitle$ = this.store.pipe(select(selectActivatedRouteTitle));

  public readonly dateRange$ = this.store.pipe(select(selectDateRange));

  public readonly trend$: Observable<TREND_MODE> = this.store.pipe(select(selectTrend));

  public readonly isTrend$: Observable<boolean> = this.store.pipe(
    select(selectTrend),
    map(v => v !== 'off'),
  );

  public readonly average$: Observable<C_AVG_MODE> = this.store.pipe(select(selectAverage));

  public readonly compare$ = this.store.pipe(select(selectCompareEnabled));

  public readonly isFullMonthsDateRange$ = this.store.pipe(select(selectIsFullMonthsDateRange));

  public readonly isFullSingleMonthDateRange$ = this.store.pipe(
    select(selectIsFullSingleMonthDateRange),
  );

  public readonly selectIsFullSingleMonthOrYearOrCurrentMonthDateRange$ = this.store.pipe(
    select(selectIsFullSingleMonthOrYearOrCurrentMonthDateRange),
  );

  public readonly selectIsClinicSelectionVisible$ = this.store.pipe(
    select(selectIsClinicSelectionVisible),
  );
  public readonly selectIsDentistSelectionVisible$ = this.store.pipe(
    select(selectIsDentistSelectionVisible),
  );

  public readonly paths$ = this.store.pipe(select(selectPaths));

  public saveDateRange(
    start: Moment | null,
    end: Moment | null,
    duration: DATE_RANGE_DURATION,
    goalCount?: number,
    enableGoal?: boolean,
  ) {
    this.store.dispatch(
      layoutPageActions.saveDateRange({
        start,
        end,
        duration,
        goalCount,
        enableGoal,
      }),
    );
  }

  public setTrend(trend: TREND_MODE) {
    this.store.dispatch(layoutPageActions.setTrend({ trend }));
  }

  public setAverage(avg: C_AVG_MODE) {
    this.store.dispatch(layoutPageActions.setAvgMode({ cMode: avg }));
  }

  public setCompareMode(compareMode: boolean) {
    this.store.dispatch(layoutPageActions.setCompareMode({ cMode: compareMode }));
  }

  public setActivatedRouteTitle(title: string) {
    this.store.dispatch(layoutPageActions.setActivatedRouteTitle({ title }));
  }

  public readonly durationCurrLabel$ = this.store.pipe(select(selectDurationCurrLabel));

  public readonly durationPrevLabel$ = this.store.pipe(select(selectDurationPrevLabel));

  public readonly hideDatePicker$ = this.store.pipe(select(selectHideDatePicker));
  public readonly hideClinicSelectionDropdown$ = this.store.pipe(
    select(selectHideClinicSelectionDropdown),
  );

  public setHideDatePicker(hide: boolean) {
    this.store.dispatch(layoutPageActions.setHideDatePicker({ hide }));
  }

  public setHideClinicSelectionDropDown(hide: boolean) {
    this.store.dispatch(layoutPageActions.setHideClinicSelectionDropDown({ hide }));
  }

  public showClinicSelection(isClinicSelectionVisible: boolean) {
    this.store.dispatch(layoutPageActions.showClinicSelection({ isClinicSelectionVisible }));
  }

  public showDentistSelection(isDentistSelectionVisible: boolean) {
    this.store.dispatch(layoutPageActions.showDentistSelection({ isDentistSelectionVisible }));
  }

  public savePaths(paths: { name: string; path?: string }[]) {
    this.store.dispatch(layoutPageActions.setPaths({ paths }));
  }
}
