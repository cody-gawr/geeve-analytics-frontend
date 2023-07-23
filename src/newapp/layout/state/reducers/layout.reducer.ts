import moment, { Moment, isMoment } from "moment";
import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { layoutPageActions } from "../actions";
import { DATE_RANGE_DURATION, TREND_MODE } from "@/newapp/models/layout";

export interface LayoutState {
    enableDateRagne: boolean;
    startDate: string | Moment;
    endDate: string | Moment;
    duration: DATE_RANGE_DURATION;
    trend: TREND_MODE,
    activatedRouteTitle: string;
}

const initialState: LayoutState = {
    enableDateRagne: false,
    startDate: moment().startOf('month'),
    endDate: moment(),
    duration: 'm',
    trend: 'off',
    activatedRouteTitle: ''
}

export const layoutFeature = createFeature({
    name: 'layout',
    reducer: createReducer(
        initialState,
        on(layoutPageActions.saveDateRange, (state, {start, end}): LayoutState => {
            return {
                ...state,
                startDate: start,
                endDate: end
            }
        }),
        on(layoutPageActions.saveStartDate, (state, {start}): LayoutState => {
            return {
                ...state,
                startDate: start,
            }
        }), 
        on(layoutPageActions.saveEndDate, (state, {end}): LayoutState => {
            return {
                ...state,
                endDate: end
            }
        }),
        on(layoutPageActions.setDuration, (state, {duration}): LayoutState => {
            return {
                ...state,
                duration
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
    selectStartDate, selectEndDate,
    selectEnableDateRagne, selectDuration,
    selectTrend,
    selectActivatedRouteTitle
} = layoutFeature;

export const selectDateRange = createSelector(
    selectStartDate,
    selectEndDate,
    (startDate, endDate) => {
        return {start: startDate, end: endDate};
    }
)
export const selectIsFullMonthsDateRange = createSelector(
    selectStartDate,
    selectEndDate,
    (startDate, endDate) => {
        const _startDate = isMoment(startDate)?startDate:moment(startDate);
        const _endDate = isMoment(endDate)?endDate:moment(endDate);
        return _startDate.date() == 1 && 
        (_endDate.date() == _endDate.clone().endOf('month').date() 
            || _endDate.date() == moment().date())
    }
)