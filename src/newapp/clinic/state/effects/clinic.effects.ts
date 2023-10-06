import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
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
}
