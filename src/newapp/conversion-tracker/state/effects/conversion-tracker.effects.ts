import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConversionTrackerService } from '../../services/conversion-tracker.service';
import { ConversionTrackerApiActions, ConversionTrackerPageActions } from '../actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@/environments/environment';

@Injectable()
export class ConversionTrackerEffect {
  private commonApiUrl = environment.commonApiUrl;

  constructor(
    private actions$: Actions,
    private conversionTrackerService: ConversionTrackerService,
  ) {}

  readonly loadConversionCodes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversionTrackerPageActions.loadConversionCodes),
      mergeMap(({ clinicId }) => {
        return this.conversionTrackerService.getConversionCodes(clinicId).pipe(
          map(conversionCodes =>
            ConversionTrackerApiActions.loadConversionCodesSuccess({ conversionCodes }),
          ),
          catchError((res: HttpErrorResponse) =>
            of(
              ConversionTrackerApiActions.loadConversionCodesFailure({
                error: {
                  api: `${this.commonApiUrl}/conversion/codes`,
                  message: res.message,
                  status: res.status,
                  errors: Array.isArray(res.error) ? res.error : [res.error],
                },
              }),
            ),
          ),
        );
      }),
    );
  });

  readonly loadConversionTrackers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversionTrackerPageActions.loadConversionTrackers),
      mergeMap(payload => {
        return this.conversionTrackerService.getConversionTrackers(payload).pipe(
          map(conversionTrackers =>
            ConversionTrackerApiActions.loadConversionTrackersSuccess({ conversionTrackers }),
          ),
          catchError((res: HttpErrorResponse) =>
            of(
              ConversionTrackerApiActions.loadConversionTrackersFailure({
                error: {
                  api: `${this.commonApiUrl}/conversion/trackers`,
                  message: res.message,
                  status: res.status,
                  errors: Array.isArray(res.error) ? res.error : [res.error],
                },
              }),
            ),
          ),
        );
      }),
    );
  });

  readonly updateConversionTrackerTreatmentStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversionTrackerPageActions.updateConversionTrackerTreatmentStatus),
      mergeMap(({ recordId, treatmentStatus, payload }) => {
        return this.conversionTrackerService
          .updateConversionTrackerTreatmentStatus(recordId, treatmentStatus)
          .pipe(
            mergeMap(affectedCount => [
              ConversionTrackerApiActions.updateConversionTrackerTreatmentStatusSuccess({
                affectedCount,
              }),
              ConversionTrackerPageActions.loadConversionTrackers(payload),
            ]),
            catchError((res: HttpErrorResponse) =>
              of(
                ConversionTrackerApiActions.updateConversionTrackerTreatmentStatusFailure({
                  error: {
                    api: `${this.commonApiUrl}/conversion/tracker/${recordId}`,
                    message: res.message,
                    status: res.status,
                    errors: Array.isArray(res.error) ? res.error : [res.error],
                  },
                }),
              ),
            ),
          );
      }),
    );
  });
}
