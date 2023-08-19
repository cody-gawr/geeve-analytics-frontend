import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JeeveError } from '@/newapp/models';
import { FrontDeskState, selectErrors, selectFdFtaRatioChartData, selectFdFtaRatioTrendChartData, selectFdNumTicksChartData, selectFdNumTicksTrendChartData, selectFdReappointRateChartData, selectFdReappointRateTrendChartData, selectFdRecallRateChartData, selectFdRecallRateTrendChartData, selectFdUtaRatioChartData, selectFdUtaRatioTrendChartData, selectFdUtilRateByDayChartData, selectFdUtilRateChartData, selectFdUtilRateTrendChartData, selectIsByDayData, selectIsLoadingFdFtaRatioData, selectIsLoadingFdFtaRatioTrendData, selectIsLoadingFdNumTicksData, selectIsLoadingFdNumTicksTrendData, selectIsLoadingFdReappointRateData, selectIsLoadingFdReappointRateTrendData, selectIsLoadingFdRecallRateData, selectIsLoadingFdRecallRateTrendData, selectIsLoadingFdUtaRatioData, selectIsLoadingFdUtaRatioTrendData, selectIsLoadingFdUtilisationRateData, selectIsLoadingFdUtilisationRateTrendData } from '../state/reducers/front-desk.reducer';
import { FrontDeskPageActions } from '../state/actions';

@Injectable()
export class FrontDeskFacade {
    constructor(private store: Store<FrontDeskState>) {}

    public readonly errors$: Observable<JeeveError[]> = this.store.pipe(
        select(selectErrors)
    );

    public readonly isLoadingFdUtilRateData$ = this.store.pipe(
        select(selectIsLoadingFdUtilisationRateData)
    );

    public readonly isLoadingFdUtilRateTrendData$ = this.store.pipe(
        select(selectIsLoadingFdUtilisationRateTrendData)
    );

    public readonly isLoadingFdRecallRateData$ = this.store.pipe(
        select(selectIsLoadingFdRecallRateData)
    );

    public readonly isLoadingFdRecallRateTrendData$ = this.store.pipe(
        select(selectIsLoadingFdRecallRateTrendData)
    );

    public readonly isLoadingFdFtaRatioData$ = this.store.pipe(
        select(selectIsLoadingFdFtaRatioData)
    );

    public readonly isLoadingFdFtaRatioTrendData$ = this.store.pipe(
        select(selectIsLoadingFdFtaRatioTrendData)
    );

    public readonly isLoadingFdUtaRatioData$ = this.store.pipe(
        select(selectIsLoadingFdUtaRatioData)
    );

    public readonly isLoadingFdUtaRatioTrendData$ = this.store.pipe(
        select(selectIsLoadingFdUtaRatioTrendData)
    );

    public readonly fdUtilRateChartData$ = this.store.pipe(
        select(selectFdUtilRateChartData)
    );

    public readonly fdUtilRateTrendChartData$ = this.store.pipe(
        select(selectFdUtilRateTrendChartData)
    );

    public readonly fdUtilRateByDayChartData$ = this.store.pipe(
        select(selectFdUtilRateByDayChartData)
    );

    public readonly fdRecallRateChartData$ = this.store.pipe(
        select(selectFdRecallRateChartData)
    );

    public readonly fdRecallRateTrendChartData$ = this.store.pipe(
        select(selectFdRecallRateTrendChartData)
    );

    public readonly fdReappointRateChartData$ = this.store.pipe(
        select(selectFdReappointRateChartData)
    );

    public readonly fdReappointRateTrendChartData$ = this.store.pipe(
        select(selectFdReappointRateTrendChartData)
    );

    public readonly fdNumTicksChartData$ = this.store.pipe(
        select(selectFdNumTicksChartData)
    );

    public readonly fdNumTicksTrendChartData$ = this.store.pipe(
        select(selectFdNumTicksTrendChartData)
    );

    public readonly fdFtaRatioChartData$ = this.store.pipe(
        select(selectFdFtaRatioChartData)
    );

    public readonly fdFtaRatioTrendChartData$ = this.store.pipe(
        select(selectFdFtaRatioTrendChartData)
    );

    public readonly fdUtaRatioChartData$ = this.store.pipe(
        select(selectFdUtaRatioChartData)
    );

    public readonly fdUtaRatioTrendChartData$ = this.store.pipe(
        select(selectFdUtaRatioTrendChartData)
    );

    public readonly isByDayData$ = this.store.pipe(
        select(selectIsByDayData)
    );

    public readonly isLoadingFdReappointRateData$ = this.store.pipe(
        select(selectIsLoadingFdReappointRateData)
    );

    public readonly isLoadingFdReappointRateTrendData$ = this.store.pipe(
        select(selectIsLoadingFdReappointRateTrendData)
    );

    public readonly isLoadingFdNumTicksData$ = this.store.pipe(
        select(selectIsLoadingFdNumTicksData)
    );

    public readonly isLoadingFdNumTicksTrendData$ = this.store.pipe(
        select(selectIsLoadingFdNumTicksTrendData)
    );

    public setIsByDayData(value: boolean) {
        this.store.dispatch(
            FrontDeskPageActions.setIsByDayData({value})
        )
    }

    public loadFdUtilisationRate({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled
      }) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdUtilisationRate({
            clinicId,
            startDate,
            endDate,
            duration,
            queryWhEnabled
          })
        );
    }

    public loadFdUtilisationRateByDay({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled
      }) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdUtilisationRateByDay({
            clinicId,
            startDate,
            endDate,
            duration,
            queryWhEnabled
          })
        );
    }

    public loadFdUtilisationRateTrend(
        clinicId: string | number, mode = '', queryWhEnabled = 0) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdUtilisationRateTrend({clinicId, mode, queryWhEnabled})
        );
    }
    
    public loadFdRecallRate({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled
      }) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdRecallRate({
            clinicId,
            startDate,
            endDate,
            duration,
            queryWhEnabled
          })
        );
    }

    public loadFdRecallRateTrend(
        clinicId: string | number, mode = '', queryWhEnabled = 0) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdRecallRateTrend({clinicId, mode, queryWhEnabled})
        );
    }

    public loadFdReappointRate({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled
      }) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdReappointRate({
            clinicId,
            startDate,
            endDate,
            duration,
            queryWhEnabled
          })
        );
    }

    public loadFdReappointRateTrend(
        clinicId: string | number, mode = '', queryWhEnabled = 0) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdReappointRateTrend({clinicId, mode, queryWhEnabled})
        );
    }

    public loadFdNumTicks({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled
      }) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdNumTicks({
            clinicId,
            startDate,
            endDate,
            duration,
            queryWhEnabled
          })
        );
    }

    public loadFdNumTicksTrend(
        clinicId: string | number, mode = '', queryWhEnabled = 0) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdNumTicksTrend({clinicId, mode, queryWhEnabled})
        );
    }

    public loadFdFtaRatio({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled
      }) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdFtaRatio({
            clinicId,
            startDate,
            endDate,
            duration,
            queryWhEnabled
          })
        );
    }

    public loadFdFtaRatioTrend(
        clinicId: string | number, mode = '', queryWhEnabled = 0) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdFtaRatioTrend({clinicId, mode, queryWhEnabled})
        );
    }

    public loadFdUtaRatio({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled
      }) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdUtaRatio({
            clinicId,
            startDate,
            endDate,
            duration,
            queryWhEnabled
          })
        );
    }

    public loadFdUtaRatioTrend(
        clinicId: string | number, mode = '', queryWhEnabled = 0) {
        this.store.dispatch(
          FrontDeskPageActions.loadFdUtaRatioTrend({clinicId, mode, queryWhEnabled})
        );
    }
}