import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JeeveError } from '@/newapp/models';
import { ClinicianAnalysisActions } from '../state/actions';
import {
  ClinicianAnalysisState,
  selectIsLoadingCaCollection,
  selectIsLoadingCaCollectionDentists,
  selectIsLoadingCaCollectionExp,
  selectIsLoadingCaCollectionExpDentists,
  selectIsLoadingCaCollectionExpOht,
  selectIsLoadingCaCollectionOht,
  selectIsLoadingCaDentistProduction,
  selectIsLoadingCaDentistProductionDentist,
  selectIsLoadingCaDentistProductionOht,
  selectProductionChartName,
} from '../state/reducers/clinician-analysis.reducer';

@Injectable()
export class ClinicianAnalysisFacade {
  constructor(private store: Store<ClinicianAnalysisState>) {}
  public readonly prodChartName$ = this.store.pipe(
    select(selectProductionChartName)
  );

  public readonly isLoadingCaProduction$ = this.store.pipe(
    select(selectIsLoadingCaDentistProduction)
  );

  public readonly isLoadingCaProductionDentist$ = this.store.pipe(
    select(selectIsLoadingCaDentistProductionDentist)
  );

  public readonly isLoadingCaProductionOht$ = this.store.pipe(
    select(selectIsLoadingCaDentistProductionOht)
  );

  public readonly isLoadingCaCollection$ = this.store.pipe(
    select(selectIsLoadingCaCollection)
  );

  public readonly isLoadingCaCollectionDentists$ = this.store.pipe(
    select(selectIsLoadingCaCollectionDentists)
  );

  public readonly isLoadingCaCollectionOht$ = this.store.pipe(
    select(selectIsLoadingCaCollectionOht)
  );

  public readonly isLoadingCaCollectionExp$ = this.store.pipe(
    select(selectIsLoadingCaCollectionExp)
  );

  public readonly isLoadingCaCollectionExpDentists$ = this.store.pipe(
    select(selectIsLoadingCaCollectionExpDentists)
  );

  public readonly isLoadingCaCollectionExpOht$ = this.store.pipe(
    select(selectIsLoadingCaCollectionExpOht)
  );

  public setProdChartName(chartName: CA_PROD_CHART_NAME) {
    this.store.dispatch(
      ClinicianAnalysisActions.setProdChartName({ chartName })
    );
  }
}
