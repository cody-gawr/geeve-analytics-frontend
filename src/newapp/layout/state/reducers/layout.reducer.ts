import moment, { Moment, isMoment } from "moment";
import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { layoutPageActions } from "../actions";
import { DATE_RANGE_DURATION, TREND_MODE } from "@/newapp/models/layout";

export interface LayoutState {
    enableDateRagne: boolean;
    dateRange: {
        start: Moment,
        end: Moment,
        duration: DATE_RANGE_DURATION
    };
    trend: TREND_MODE,
    activatedRouteTitle: string;
}

const initialState: LayoutState = {
    enableDateRagne: false,
    dateRange: {
        start: moment().startOf('month'),
        end: moment(),
        duration: 'm'
    },
    trend: 'off',
    activatedRouteTitle: ''
}

export const layoutFeature = createFeature({
    name: 'layout',
    reducer: createReducer(
        initialState,
        on(layoutPageActions.saveDateRange, (state, {start, end, duration}): LayoutState => {
            return {
                ...state,
                dateRange: {
                    start,
                    end,
                    duration
                }
            }
        }),
        on(layoutPageActions.setTrend, (state, {trend}): LayoutState => {
            return {
                ...state,
                trend
            }
        }),
        on(layoutPageActions.setActivatedRouteTitle, (state, {title}): LayoutState => {
            return {
                ...state,
                activatedRouteTitle: title
            }
        }),
    )
});

export const { 
    selectDateRange,
    selectEnableDateRagne,
    selectTrend,
    selectActivatedRouteTitle
} = layoutFeature;

export const selectIsFullMonthsDateRange = createSelector(
    selectDateRange,
    ({start, end}) => {
        const _startDate = isMoment(start)?start:moment(start);
        const _endDate = isMoment(end)?end:moment(end);
        return _startDate.date() == 1 && 
        (_endDate.date() == _endDate.clone().endOf('month').date() 
            || _endDate.date() == moment().date())
    }
)