import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, map, filter } from "rxjs";
import {
  LayoutState,
  selectActivatedRouteTitle,
  selectDateRange,
  selectDurationLabel,
  selectDurationTrendLabel,
  selectIsFullMonthsDateRange,
  selectTrend,
} from "../state/reducers/layout.reducer";
import { Moment } from "moment";
import { layoutPageActions } from "../state/actions";
import { DATE_RANGE_DURATION, TREND_MODE } from "@/newapp/models/layout";
import { DateRangeMenus } from "@/newapp/shared/components/date-range-menu/date-range-menu.component";

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

  public readonly isFullMonthsDateRange$ = this.store.pipe(
    select(selectIsFullMonthsDateRange)
  );

  public saveDateRange(
    start: Moment | null,
    end: Moment | null,
    duration: DATE_RANGE_DURATION
  ) {
    this.store.dispatch(
      layoutPageActions.saveDateRange({ start, end, duration })
    );
  }

  public setTrend(trend: TREND_MODE) {
    this.store.dispatch(layoutPageActions.setTrend({ trend }));
  }

  public setActivatedRouteTitle(title: string) {
    this.store.dispatch(layoutPageActions.setActivatedRouteTitle({ title }));
  }

  public readonly durationLabel$ = this.store.pipe(select(selectDurationLabel));

  public readonly durationTrendLabel$ = this.store.pipe(
    select(selectDurationTrendLabel)
  );
}
