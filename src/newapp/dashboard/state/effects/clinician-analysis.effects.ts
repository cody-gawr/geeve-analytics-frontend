import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClinicianAnalysisService } from '../../services/clinician-analysis.service';
import { ClinicianAnalysisState } from '../reducers/clinician-analysis.reducer';

@Injectable()
export class ClinicianAnalysisEffects {
  constructor(
    private actions$: Actions,
    private caService: ClinicianAnalysisService,
    private store: Store<ClinicianAnalysisState>
  ) {}
}
