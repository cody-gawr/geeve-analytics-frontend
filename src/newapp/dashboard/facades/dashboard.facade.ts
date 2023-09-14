import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DashboardPageActions } from "../state/actions";
import {
  DashboardState,
  selectChartTips,
  selectConnectedClinicId,
  selectConnectedWith,
  selectErrors,
  selectIsLoadingClinicAccountingPlatform,
} from "../state/reducers/dashboard.reducer";
import { JeeveError } from "@/newapp/models";

@Injectable()
export class DashboardFacade {
  constructor(private store: Store<DashboardState>) {}

  public readonly errors$: Observable<JeeveError[]> = this.store.pipe(
    select(selectErrors)
  );

  public readonly chartTips$ = this.store.pipe(select(selectChartTips));

  public readonly connectedWith$ = this.store.pipe(select(selectConnectedWith));

  public readonly isLoadingClinicAccounting$ = this.store.pipe(
    select(selectIsLoadingClinicAccountingPlatform)
  );

  public readonly connectedClinicId$ = this.store.pipe(
    select(selectConnectedClinicId)
  );

  public loadChartTips(dashboardId: number, clinicId: string | number) {
    this.store.dispatch(
      DashboardPageActions.loadChartTips({ dashboardId, clinicId })
    );
  }

  public loadClinicAccountingPlatform(clinicId: number) {
    this.store.dispatch(
      DashboardPageActions.loadClinicAccountingPlatform({ clinicId })
    );
  }

  public setConnectedClinicId(clinicId: number) {
    this.store.dispatch(
      DashboardPageActions.setConnectedClinicId({ clinicId })
    );
  }
}
