import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { DentistApiActions, DentistPageActions } from '../actions';
import { DentistService } from '../../services/dentist.service';

@Injectable()
export class DentistEffects {
  constructor(
    private actions$: Actions,
    private dentistService: DentistService,
  ) {}

  public readonly loadDentists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DentistPageActions.loadDentists),
      switchMap(({ clinicId, all }) => {
        return this.dentistService.getDentists(clinicId, all).pipe(
          map(data => {
            return DentistApiActions.loadDentistsSuccess({
              dentists: data.data,
            });
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              DentistApiActions.loadDentistsFailure({
                error: error.error ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public readonly loadSpecificDentist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DentistPageActions.loadSpecificDentist),
      switchMap(({ clinicId }) => {
        return this.dentistService.getSpecificDentist(clinicId).pipe(
          map(data => {
            return DentistApiActions.loadSpecificDentistSuccess({
              dentistId: data.data,
            });
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              DentistApiActions.loadSpecificDentistFailure({
                error: error.error ?? error,
              }),
            ),
          ),
        );
      }),
    );
  });
}
