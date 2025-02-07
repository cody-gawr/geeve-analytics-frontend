import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { ClinicService } from '../../services/clinic.service';
import { ClinicApiActions, ClinicPageActions } from '../actions';

@Injectable()
export class ClinicEffects {
  constructor(
    private actions$: Actions,
    private clinicService: ClinicService
  ) {}

  public readonly loadClinics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicPageActions.loadClinics),
      mergeMap(() => {
        return this.clinicService.getClinics().pipe(
          map(res =>
            ClinicApiActions.loadClinicsSuccess({
              clinics: res.data,
              hasPrimeClinics: res.hasPrimeClinics,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(ClinicApiActions.loadClinicsFailure({ error: error.message }))
          )
        );
      })
    );
  });

  public readonly loadUserClinics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicPageActions.loadUserClinics),
      mergeMap(() => {
        return this.clinicService.getUserClinics().pipe(
          map(res =>
            ClinicApiActions.loadUserClinicsSuccess({
              clinics: res.data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(ClinicApiActions.loadUserClinicsFailure({ error: error.error ?? error }))
          )
        );
      })
    );
  });

  public readonly loadCoreSyncStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicPageActions.loadCoreSyncStatus),
      mergeMap(({ clinicId }) => {
        return this.clinicService.checkCoreSyncStatus(clinicId).pipe(
          map(res =>
            ClinicApiActions.checkCoreSyncSuccess({
              clinicId,
              hasCoreSync: res.data.refresh_token && res.data.token && res.data.core_user_id,
              numberOfSuccess: res.data.sync_successes
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(ClinicApiActions.checkCoreSyncFailure({ clinicId, error: error.error ?? error }))
          )
        );
      })
    );
  });

  public readonly loadDentallySyncStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicPageActions.loadDentallySyncStatus),
      mergeMap(({ clinicId }) => {
        return this.clinicService.checkDentallySyncStatus(clinicId).pipe(
          map(res =>
            ClinicApiActions.checkDentallySyncSuccess({
              clinicId,
              hasDentallySync: !!res.data.site_id,
              numberOfSuccess: res.data.sync_successes
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(ClinicApiActions.checkDentallySyncFailure({ clinicId, error: error.error ?? error }))
          )
        );
      })
    );
  });

  public readonly loadPraktikaSyncStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicPageActions.loadPraktikaSyncStatus),
      mergeMap(({ clinicId }) => {
        return this.clinicService.checkPraktikaSyncStatus(clinicId).pipe(
          map(res =>
            ClinicApiActions.checkPraktikaSyncSuccess({
              clinicId,
              hasPraktikaSync: true,
              numberOfSuccess: res.data.sync_successes
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(ClinicApiActions.checkPraktikaSyncFailure({ clinicId, error: error.error ?? error }))
          )
        );
      })
    );
  });

  public readonly loadCampaigns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicPageActions.loadCampaigns),
      mergeMap(({ clinicId }) => {
        return this.clinicService.getCampaigns(clinicId).pipe(
          map(res =>
            ClinicApiActions.loadCampaignsSuccess({
              campaigns: res.data?.campaigns ?? [],
              clinicId
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(ClinicApiActions.loadCampaignsFailure({ error: error.error ?? error, clinicId }))
          )
        );
      })
    );
  });

  public readonly getClinicAccountingPlatform$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClinicPageActions.loadClinicAccountingPlatform),
      switchMap(({ clinicId, pms }) => {
        if(pms.toLowerCase() === 'xero' || true){
          return this.clinicService.checkXeroStatus(clinicId).pipe(
            map(res => 
                ClinicApiActions.clinicAccountingPlatformSuccess({
                  connectWith: res.success && res.data.tenantId? 'xero': null,
                  clinicId,
                })
              ),
            catchError((error: HttpErrorResponse) =>
              of(
                ClinicApiActions.clinicAccountingPlatformFailure({
                  error: error.error ?? error,
                })
              )
            )
          );
        }
        return this.clinicService.getClinicAccountingPlatform(clinicId).pipe(
          map(res =>
            ClinicApiActions.clinicAccountingPlatformSuccess({
              connectWith: res.data?.connectedWith ?? null,
              clinicId,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              ClinicApiActions.clinicAccountingPlatformFailure({
                error: error.error ?? error,
              })
            )
          )
        );
      })
    );
  });
}
