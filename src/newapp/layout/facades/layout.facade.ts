import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, map, filter } from 'rxjs';
import { LayoutState, selectDateRange, selectDuration, selectEndDate, selectIsFullMonthsDateRange, selectStartDate, selectTrend } from '../state/reducers/layout.reducer';
import moment, { isMoment, Moment } from 'moment';
import { layoutPageActions } from '../state/actions';
import { DATE_RANGE_DURATION, TREND_MODE } from '@/newapp/models/layout';
import { DateRangeMenus } from '@/newapp/shared/components/date-range-menu/date-range-menu.component';

@Injectable()
export class LayoutFacade {
  constructor(
    private readonly store: Store<LayoutState>
  ) {}

  public readonly startDate$: Observable<Moment | null > = this.store.pipe(
    select(selectStartDate),
    map(d => isMoment(d)?d:moment(d))
  );

  public readonly endDate$: Observable<Moment | null > = this.store.pipe(
    select(selectEndDate),
    map(d => isMoment(d)?d:moment(d))
  );

  public readonly dateRange$: Observable<{start: Moment | null, end: Moment | null}> = this.store.pipe(
    select(selectDateRange),
    map(({start, end}) => { return {
      start: isMoment(start)?start:moment(start), 
      end: isMoment(end)?end:moment(end)
    } })
  );

  public readonly duration$: Observable<DATE_RANGE_DURATION> = this.store.pipe(
    select(selectDuration)
  );

  public readonly trend$: Observable<TREND_MODE> = this.store.pipe(
    select(selectTrend)
  );

  public readonly isFullMonthsDateRange$ = this.store.pipe(
    select(selectIsFullMonthsDateRange)
  );

  public saveStartDate(start: Moment | null) {
    this.store.dispatch(layoutPageActions.saveStartDate({ start }));
  }

  public saveEndDate(end: Moment | null) {
    this.store.dispatch(layoutPageActions.saveEndDate({ end }));
  }
  public saveDateRange(start: Moment | null, end: Moment | null) {
    this.store.dispatch(layoutPageActions.saveDateRange({ start, end }));
  }

  public setDuration(duration: DATE_RANGE_DURATION) {
    this.store.dispatch(layoutPageActions.setDuration({ duration }));
  }

  public setTrend(trend: TREND_MODE) {
    this.store.dispatch(layoutPageActions.setTrend({ trend }));
  }

  get durationLabel$() {
    return this.duration$.pipe(
          map(d => {
              const menu = DateRangeMenus.find(m => m.range == d);
              if(menu) return menu.label;
              else return 'Current';
          })
      );
  }

  get durationTrendLabel$() {
      return this.durationLabel$.pipe(
          map(l => l.replace(/^Last/g, 'Previous').replace(/^This/g, 'Last')));
  }
}
