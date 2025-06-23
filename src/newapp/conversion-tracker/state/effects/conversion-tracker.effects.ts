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

  readonly createConversionCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversionTrackerPageActions.createConversionCode),
      mergeMap(({ clinicId, consultCode }) => {
        return this.conversionTrackerService.createConversionCode(clinicId, consultCode).pipe(
          mergeMap(conversionCode => [
            ConversionTrackerApiActions.createConversionCodeSuccess({ conversionCode }),
            ConversionTrackerPageActions.loadConversionCodes({ clinicId }),
          ]),
          catchError((res: HttpErrorResponse) =>
            of(
              ConversionTrackerApiActions.createConversionCodeFailure({
                error: {
                  api: `${this.commonApiUrl}/conversion/code`,
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

  readonly upsertConversionCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversionTrackerPageActions.upsertConversionCode),
      mergeMap(({ clinicId, conversionCodePayload }) => {
        return this.conversionTrackerService
          .upsertConversionCode(clinicId, conversionCodePayload)
          .pipe(
            mergeMap(conversionCode => [
              ConversionTrackerApiActions.upsertConversionCodeSuccess({ conversionCode }),
              ConversionTrackerPageActions.loadConversionCodes({
                clinicId,
              }),
            ]),
            catchError((res: HttpErrorResponse) =>
              of(
                ConversionTrackerApiActions.upsertConversionCodeFailure({
                  error: {
                    api: `${this.commonApiUrl}/conversion/code`,
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

  readonly deleteConversionCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversionTrackerPageActions.deleteConversionCode),
      mergeMap(({ clinicId, recordId }) => {
        return this.conversionTrackerService.deleteConversionCode(recordId).pipe(
          mergeMap(deletedCount => [
            ConversionTrackerApiActions.deleteConversionCodeSuccess({ deletedCount }),
            ConversionTrackerPageActions.loadConversionCodes({ clinicId }),
          ]),
          catchError((res: HttpErrorResponse) =>
            of(
              ConversionTrackerApiActions.deleteConversionCodeFailure({
                error: {
                  api: `${this.commonApiUrl}/conversion/code`,
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

  readonly createConversionCodeValue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversionTrackerPageActions.createConversionCodeValue),
      mergeMap(({ clinicId, conversionCodeId, treatmentStatus, code }) => {
        return this.conversionTrackerService
          .createConversionCodeValue(conversionCodeId, treatmentStatus, code)
          .pipe(
            mergeMap(conversionCodeValue => [
              ConversionTrackerApiActions.createConversionCodeValueSuccess({ conversionCodeValue }),
              ConversionTrackerPageActions.loadConversionCodes({ clinicId }),
            ]),
            catchError((res: HttpErrorResponse) =>
              of(
                ConversionTrackerApiActions.createConversionCodeValueFailure({
                  error: {
                    api: `${this.commonApiUrl}/conversion/code-value`,
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

  readonly deleteConversionCodeValue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversionTrackerPageActions.deleteConversionCodeValue),
      mergeMap(({ clinicId, recordId }) => {
        return this.conversionTrackerService.deleteConversionCodeValue(recordId).pipe(
          mergeMap(deletedCount => [
            ConversionTrackerApiActions.deleteConversionCodeValueSuccess({ deletedCount }),
            ConversionTrackerPageActions.loadConversionCodes({ clinicId }),
          ]),
          catchError((res: HttpErrorResponse) =>
            of(
              ConversionTrackerApiActions.deleteConversionCodeValueFailure({
                error: {
                  api: `${this.commonApiUrl}/conversion/code-value`,
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

  readonly loadConversionTrackerInsights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversionTrackerPageActions.deleteConversionCodeValue),
      mergeMap(({ clinicId, recordId }) => {
        return this.conversionTrackerService.deleteConversionCodeValue(recordId).pipe(
          mergeMap(deletedCount => [
            ConversionTrackerApiActions.deleteConversionCodeValueSuccess({ deletedCount }),
            ConversionTrackerPageActions.loadConversionCodes({ clinicId }),
          ]),
          catchError((res: HttpErrorResponse) =>
            of(
              ConversionTrackerApiActions.deleteConversionCodeValueFailure({
                error: {
                  api: `${this.commonApiUrl}/conversion/code-value`,
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
