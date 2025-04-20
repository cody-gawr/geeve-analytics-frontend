import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, groupBy, map, mergeMap, of, switchMap } from 'rxjs';
// import { ClinicianAnalysisService } from '../../services/clinician-analysis.service';
// import { ClinicianAnalysisState } from '../reducers/clinician-analysis.reducer';
import { ClinicianAnalysisActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ChartDescParams } from '@/newapp/models/dashboard';
import { DashboardService } from '../../services/dashboard.service';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class ClinicianAnalysisEffects {
  constructor(
    private actions$: Actions,
    // private caService: ClinicianAnalysisService,
    private dashboardService: DashboardService,
    // private store: Store<ClinicianAnalysisState>
  ) {}

  public readonly loadCaChartDescription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicianAnalysisActions.loadCaChartDescription),
      groupBy(action => action.chartDescription), // Group actions by `chart description`
      mergeMap(grouped$ =>
        grouped$.pipe(
          switchMap((params: ChartDescParams<CA_API_ALL_ENDPOINTS>) => {
            return this.dashboardService
              .spChartDescriptionCall<any, CA_API_ALL_ENDPOINTS>('ClinicianAnalysis', params)
              .pipe(
                map(data =>
                  ClinicianAnalysisActions.caChartDescriptionSuccess({
                    chartDesc: params.chartDescription,
                    chartDescData: camelcaseKeys(data, { deep: true }),
                  }),
                ),
                catchError((error: HttpErrorResponse) =>
                  of(
                    ClinicianAnalysisActions.caChartDescriptionFailure({
                      chartDesc: params.chartDescription,
                      error: error.error ?? error,
                    }),
                  ),
                ),
              );
          }),
        ),
      ),
    );
  });
  // // None Trend
  // public readonly loadNoneTrendApiRequest$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ClinicianAnalysisActions.loadNoneTrendApiRequest),
  //     mergeMap(({ api, params }) => {
  //       return this.caService.caNoneTrendApiRequest(api, params).pipe(
  //         map(data =>
  //           ClinicianAnalysisActions.loadCaNoneTrendApiRequestSuccess({
  //             api,
  //             resBody: data,
  //           })
  //         ),
  //         catchError((error: HttpErrorResponse) =>
  //           of(
  //             ClinicianAnalysisActions.loadCaNoneTrendApiRequestFailure({
  //               api,
  //               error: error.error ?? error,
  //             })
  //           )
  //         )
  //       );
  //     })
  //   );
  // });
  // // Trend
  // public readonly loadTrendApiRequest$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ClinicianAnalysisActions.loadTrendApiRequest),
  //     mergeMap(({ api, params }) => {
  //       return this.caService.caTrendApiRequest(api, params).pipe(
  //         map(data =>
  //           ClinicianAnalysisActions.loadCaTrendApiRequestSuccess({
  //             api,
  //             resBody: data,
  //           })
  //         ),
  //         catchError((error: HttpErrorResponse) =>
  //           of(
  //             ClinicianAnalysisActions.loadCaTrendApiRequestFailure({
  //               api,
  //               error: error.error ?? error,
  //             })
  //           )
  //         )
  //       );
  //     })
  //   );
  // });
}
