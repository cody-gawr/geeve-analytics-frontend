import moment, { Moment, isMoment } from 'moment';
import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { layoutPageActions } from '../actions';
import { getTodayMoment, getUnitsInDurationRange } from '@/newapp/shared/utils';
import { DateRangeMenus } from '@/newapp/shared/components/date-range-menu/date-range-menu.component';
import { selectIsClinicianUser } from '@/newapp/auth/state/reducers/auth.reducer';

export interface LayoutState {
  enableDateRagne: boolean;
  dateRange: {
    start: Moment;
    end: Moment;
    duration: DATE_RANGE_DURATION;
    goalCount: number;
    enableGoal: boolean;
  };
  trend: TREND_MODE;
  average: C_AVG_MODE;
  activatedRouteTitle: string;
  compare: boolean;
  hideDatePicker: boolean;
  hideClinicSelectionDropdown: boolean;
  paths: { name: string, path?: string }[];
}

const initialState: LayoutState = {
  enableDateRagne: false,
  dateRange: {
    start: getTodayMoment().startOf('month'),
    end: getTodayMoment(),
    duration: 'm',
    goalCount: 1,
    enableGoal: true,
  },
  trend: 'off',
  average: 'off',
  compare: false,
  activatedRouteTitle: '',
  hideDatePicker: false,
  hideClinicSelectionDropdown: false,
  paths: []
};

export const layoutFeature = createFeature({
  name: 'layout',
  reducer: createReducer(
    initialState,
    on(
      layoutPageActions.saveDateRange,
      (state, { start, end, duration, goalCount, enableGoal }): LayoutState => {
        return {
          ...state,
          dateRange: {
            start,
            end,
            duration,
            goalCount: goalCount ?? state.dateRange.goalCount,
            enableGoal: enableGoal ?? state.dateRange.enableGoal,
          },
        };
      }
    ),
    on(layoutPageActions.setHideDatePicker, (state, { hide }): LayoutState => {
      return {
        ...state,
        hideDatePicker: hide,
      };
    }),
    on(layoutPageActions.setHideClinicSelectionDropDown, (state, { hide }): LayoutState => {
      return {
        ...state,
        hideClinicSelectionDropdown: hide,
      };
    }),
    on(layoutPageActions.setTrend, (state, { trend }): LayoutState => {
      return {
        ...state,
        trend,
      };
    }),
    on(layoutPageActions.setAvgMode, (state, { cMode }): LayoutState => {
      return {
        ...state,
        average: cMode,
      };
    }),
    on(layoutPageActions.setCompareMode, (state, { cMode }): LayoutState => {
      const trend: TREND_MODE = cMode ? 'off' : state.trend;

      return {
        ...state,
        compare: cMode,
        trend,
      };
    }),
    on(
      layoutPageActions.setActivatedRouteTitle,
      (state, { title }): LayoutState => {
        return {
          ...state,
          activatedRouteTitle: title,
        };
      }
    ),
    on(
      layoutPageActions.setPaths,
      (state, { paths }): LayoutState => {
        return {
          ...state,
          paths: paths,
        };
      }
    ),
  ),
});

export const {
  selectDateRange,
  selectEnableDateRagne,
  selectTrend,
  selectAverage,
  selectActivatedRouteTitle,
  selectCompare,
  selectHideDatePicker,
  selectHideClinicSelectionDropdown,
  selectPaths
} = layoutFeature;

export const selectComputedDurationUnits = createSelector(
  selectTrend,
  selectDateRange,
  (trend, {start, end}) => {
    return getUnitsInDurationRange(trend, start, end);
  }
);

export const selectCompareEnabled = createSelector(
  selectCompare,
  selectIsClinicianUser,
  (compare, isClinicianUser) => {
    return isClinicianUser && compare;
  }
);

export const selectIsFullMonthsDateRange = createSelector(
  selectDateRange,
  ({ start, end }) => {
    const _startDate = isMoment(start) ? start : moment(start);
    const _endDate = isMoment(end) ? end : moment(end);
    return (
      _startDate.date() == 1 &&
      (_endDate.date() == _endDate.clone().endOf('month').date() ||
        _endDate.date() == moment().date())
    );
  }
);

export const selectIsFullSingleMonthDateRange = createSelector(
  selectDateRange,
  ({ start, end }) => {
    const _startDate = isMoment(start) ? start : moment(start);
    const _endDate = isMoment(end) ? end : moment(end);
    return (
      _startDate.date() == 1 &&
      _endDate.date() == _startDate.clone().endOf('month').date()
    );
  }
);

export const selectIsFullSingleMonthOrYearOrCurrentMonthDateRange = createSelector(
  selectDateRange,
  ({ start, end, duration }) => {
    if(['m', 'lm', 'cytd', 'lcytd'].includes(duration)){
      return true;
    } else if(duration === 'custom'){
      const _startDate = isMoment(start) ? start : moment(start);
      const _endDate = isMoment(end) ? end : moment(end);

      return _startDate.isSame(moment().startOf('month'), 'day') || (
        _startDate.isSame(moment().startOf('year'), 'day') &&
        _endDate.isSame(moment(), 'day')
      ) || (
        _startDate.date() == 1 &&
        _endDate.isSame(_startDate.clone().endOf('month'), 'day')
      ) || (
        _startDate.isSame(_startDate.clone().startOf('year'), 'day') &&
        _endDate.isSame(_startDate.clone().endOf('year'), 'day')
      );
    }else{
      return false;
    }
  }
);

export const selectDurationCurrLabel = createSelector(
  selectDateRange,
  ({ duration }) => {
    const menu = DateRangeMenus.find(m => m.range == duration);
    if (menu) return menu.label;
    else return 'Current';
  }
);

export const selectDurationPrevLabel = createSelector(
  selectDurationCurrLabel,
  l => {
    if (l.includes('Last') || l.includes('This')) {
      return l.replace(/^Last/g, 'Previous').replace(/^This/g, 'Last');
    } else {
      return 'Last ' + l;
    }
  }
);
