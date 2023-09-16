import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { MarketingPageActions } from "../state/actions";
import {
  MarketingState,
  selectActivePatientsChartData,
  selectActivePatientsTrendChartData,
  selectErrors,
  selectIsActivePatients,
  selectIsActivePatientsWithPlatform,
  selectIsLoadingMkMyobAccounts,
  selectIsLoadingMkNewPatientAcq,
  selectIsLoadingMkNewPatientAcqTrend,
  selectIsLoadingMkNewPatientsByReferral,
  selectIsLoadingMkNewPatientsByReferralTrend,
  selectIsLoadingMkNumNewPatients,
  selectIsLoadingMkNumNewPatientsTrend,
  selectIsLoadingMkRevByReferral,
  selectIsLoadingMkRevByReferralTrend,
  selectIsLoadingMkSaveAcctMyob,
  selectIsLoadingMkSaveAcctXero,
  selectIsLoadingMkTotalVisits,
  selectIsLoadingMkTotalVisitsTrend,
  selectIsLoadingMkXeroAccounts,
  selectMyobAccounts,
  selectNewPatientAcqChartData,
  selectNewPatientAcqTrendChartData,
  selectNewPatientsByReferralChartData,
  selectNewPatientsByReferralData,
  selectNewPatientsByReferralTrendChartData,
  selectNumNewPatientsChartData,
  selectNumNewPatientsTrendChartData,
  selectRevByReferralChartData,
  selectRevByReferralTrendChartData,
  selectRevenueByReferralData,
  selectTotalVisitsChartData,
  selectTotalVisitsTrendChartData,
  selectXeroAccounts,
} from "../state/reducers/marketing.reducer";

@Injectable()
export class MarketingFacade {
  constructor(private store: Store<MarketingState>) {}

  public readonly errors$: Observable<JeeveError[]> = this.store.pipe(
    select(selectErrors)
  );

  public readonly xeroAccounts$ = this.store.pipe(select(selectXeroAccounts));

  public readonly myobAccounts$ = this.store.pipe(select(selectMyobAccounts));

  public readonly newPatientsByReferralChartData$ = this.store.pipe(
    select(selectNewPatientsByReferralChartData)
  );

  public readonly newPatientsByReferralData$ = this.store.pipe(
    select(selectNewPatientsByReferralData)
  );

  public readonly newPatientsByReferralTrendChartData$ = this.store.pipe(
    select(selectNewPatientsByReferralTrendChartData)
  );

  public readonly newNumPatientsChartData$ = this.store.pipe(
    select(selectNumNewPatientsChartData)
  );

  public readonly newNumPatientsTrendChartData$ = this.store.pipe(
    select(selectNumNewPatientsTrendChartData)
  );

  public readonly activePatientsChartData$ = this.store.pipe(
    select(selectActivePatientsChartData)
  );

  public readonly activePatientsTrendChartData$ = this.store.pipe(
    select(selectActivePatientsTrendChartData)
  );

  public readonly revByReferralChartData$ = this.store.pipe(
    select(selectRevByReferralChartData)
  );

  public readonly revByReferralData$ = this.store.pipe(
    select(selectRevenueByReferralData)
  );

  public readonly revByReferralTrendChartData$ = this.store.pipe(
    select(selectRevByReferralTrendChartData)
  );

  public readonly newPatientsAcqChartData$ = this.store.pipe(
    select(selectNewPatientAcqChartData)
  );

  public readonly newPatientsAcqTrendChartData$ = this.store.pipe(
    select(selectNewPatientAcqTrendChartData)
  );

  public readonly totalVisitsChartData$ = this.store.pipe(
    select(selectTotalVisitsChartData)
  );

  public readonly totalVisitsTrendChartData$ = this.store.pipe(
    select(selectTotalVisitsTrendChartData)
  );

  public readonly isLoadingNewPatientsByReferral$ = this.store.pipe(
    select(selectIsLoadingMkNewPatientsByReferral)
  );

  public readonly isLoadingNewPatientsByReferralTrend$ = this.store.pipe(
    select(selectIsLoadingMkNewPatientsByReferralTrend)
  );

  public readonly isLoadingRevByReferral$ = this.store.pipe(
    select(selectIsLoadingMkRevByReferral)
  );

  public readonly isLoadingRevByReferralTrend$ = this.store.pipe(
    select(selectIsLoadingMkRevByReferralTrend)
  );

  public readonly isLoadingNewNumPatients$ = this.store.pipe(
    select(selectIsLoadingMkNumNewPatients)
  );

  public readonly isLoadingNewNumPatientsTrend$ = this.store.pipe(
    select(selectIsLoadingMkNumNewPatientsTrend)
  );

  public readonly isLoadingNewPatientsAcq$ = this.store.pipe(
    select(selectIsLoadingMkNewPatientAcq)
  );

  public readonly isLoadingNewPatientsAcqTrend$ = this.store.pipe(
    select(selectIsLoadingMkNewPatientAcqTrend)
  );

  public readonly isLoadingTotalVisits$ = this.store.pipe(
    select(selectIsLoadingMkTotalVisits)
  );

  public readonly isLoadingTotalVisitsTrend$ = this.store.pipe(
    select(selectIsLoadingMkTotalVisitsTrend)
  );

  public readonly isLoadingMkMyobAccounts$ = this.store.pipe(
    select(selectIsLoadingMkMyobAccounts)
  );

  public readonly isLoadingMkXeroAccounts$ = this.store.pipe(
    select(selectIsLoadingMkXeroAccounts)
  );

  public readonly isLoadingMkSaveMyobAccounts$ = this.store.pipe(
    select(selectIsLoadingMkSaveAcctMyob)
  );

  public readonly isLoadingMkSaveXeroAccounts$ = this.store.pipe(
    select(selectIsLoadingMkSaveAcctXero)
  );

  public readonly isActivePatients$ = this.store.pipe(
    select(selectIsActivePatientsWithPlatform)
  );

  public setActivePatients(isActive: boolean) {
    this.store.dispatch(MarketingPageActions.setIsActivePatients({ isActive }));
  }

  public loadMkNewPatientsByReferral({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
  }) {
    this.store.dispatch(
      MarketingPageActions.loadMkNewPatientsByReferral({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled,
      })
    );
  }

  public loadMkNewPatientsByReferralTrend({ clinicId, mode, queryWhEnabled }) {
    this.store.dispatch(
      MarketingPageActions.loadMkNewPatientsByReferralTrend({
        clinicId,
        mode,
        queryWhEnabled,
      })
    );
  }

  public loadNewPatientsAcq({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
    connectedWith,
  }) {
    this.store.dispatch(
      MarketingPageActions.loadMkNewPatientAcq({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled,
        connectedWith,
      })
    );
  }

  public loadNewPatientsAcqTrend({
    clinicId,
    mode,
    queryWhEnabled,
    connectedWith,
  }) {
    this.store.dispatch(
      MarketingPageActions.loadMkNewPatientAcqTrend({
        clinicId,
        mode,
        queryWhEnabled,
        connectedWith,
      })
    );
  }

  public loadNewNumPatients({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
  }) {
    this.store.dispatch(
      MarketingPageActions.loadMkNumNewPatients({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled,
      })
    );
  }

  public loadNewNumPatientsTrend({ clinicId, mode, queryWhEnabled }) {
    this.store.dispatch(
      MarketingPageActions.loadMkNumNewPatientsTrend({
        clinicId,
        mode,
        queryWhEnabled,
      })
    );
  }

  public loadActivePatients({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
  }) {
    this.store.dispatch(
      MarketingPageActions.loadMkActivePatients({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled,
      })
    );
  }

  public loadActivePatientsTrend({ clinicId, mode, queryWhEnabled }) {
    this.store.dispatch(
      MarketingPageActions.loadMkActivePatientsTrend({
        clinicId,
        mode,
        queryWhEnabled,
      })
    );
  }

  public loadRevByReferral({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
  }) {
    this.store.dispatch(
      MarketingPageActions.loadMkRevenueByReferral({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled,
      })
    );
  }

  public loadRevByReferralTrend({ clinicId, mode, queryWhEnabled }) {
    this.store.dispatch(
      MarketingPageActions.loadMkRevByReferralTrend({
        clinicId,
        mode,
        queryWhEnabled,
      })
    );
  }

  public loadTotalVisits({
    clinicId,
    startDate,
    endDate,
    duration,
    queryWhEnabled,
  }) {
    this.store.dispatch(
      MarketingPageActions.loadMkTotalVisits({
        clinicId,
        startDate,
        endDate,
        duration,
        queryWhEnabled,
      })
    );
  }

  public loadTotalVisitsTrend({ clinicId, mode, queryWhEnabled }) {
    this.store.dispatch(
      MarketingPageActions.loadMkTotalVisitsTrend({
        clinicId,
        mode,
        queryWhEnabled,
      })
    );
  }

  public loadMkGetMyobAccounts({ clinicId, userId }) {
    this.store.dispatch(
      MarketingPageActions.loadMkGetMyobAccounts({
        clinicId,
        userId,
      })
    );
  }

  public loadMkGetXeroAccounts({ clinicId, userId }) {
    this.store.dispatch(
      MarketingPageActions.loadMkGetXeroAccounts({
        clinicId,
        userId,
      })
    );
  }

  public saveXeroAccounts({ clinicId, categories }) {
    this.store.dispatch(
      MarketingPageActions.saveAcctXero({
        clinicId,
        categories,
      })
    );
  }

  public saveMyobAccounts({ clinicId, categories }) {
    this.store.dispatch(
      MarketingPageActions.saveAcctMyob({
        clinicId,
        categories,
      })
    );
  }

  public setErrors(errors: JeeveError[]) {
    this.store.dispatch(
      MarketingPageActions.setErrors({
        errors,
      })
    );
  }
}
