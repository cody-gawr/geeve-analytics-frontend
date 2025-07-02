import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';
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
  selectIsDateRangePickerVisible,
  selectPaths,
  selectIsClinicSelectionEnabled,
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

  private isDateRangePickerVisibleRoute = new BehaviorSubject<boolean>(true);
  public readonly isDateRangePickerVisibleRoute$ =
    this.isDateRangePickerVisibleRoute.asObservable();

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

  public readonly isDateRangePickerVisible$ = combineLatest([
    this.isDateRangePickerVisibleRoute$.pipe(distinctUntilChanged()),
    this.store.pipe(select(selectIsDateRangePickerVisible)),
  ]).pipe(
    map(
      ([isDateRangePickerVisibleRoute, isDateRangePickerVisible]) =>
        isDateRangePickerVisibleRoute && isDateRangePickerVisible,
    ),
  );

  public readonly isClinicSelectionEnabled$ = this.store.pipe(
    select(selectIsClinicSelectionEnabled),
  );

  public setIsDateRangePickerVisibleRoute(isVisible: boolean) {
    this.isDateRangePickerVisibleRoute.next(isVisible);
  }

  public toggleDateRangePicker(isVisible: boolean) {
    this.store.dispatch(layoutPageActions.toggleDateRangePicker({ isVisible }));
  }

  public setClinicSelectionEnabled(isEnabled: boolean) {
    this.store.dispatch(layoutPageActions.setClinicSelectionEnabled({ isEnabled }));
  }

  public toggleClinicSelection(isVisible: boolean) {
    this.store.dispatch(layoutPageActions.toggleClinicSelection({ isVisible }));
  }

  public toggleDentistSelection(isVisible: boolean) {
    this.store.dispatch(layoutPageActions.toggleDentistSelection({ isVisible }));
  }

  public savePaths(paths: { name: string; path?: string }[]) {
    this.store.dispatch(layoutPageActions.setPaths({ paths }));
  }
}
