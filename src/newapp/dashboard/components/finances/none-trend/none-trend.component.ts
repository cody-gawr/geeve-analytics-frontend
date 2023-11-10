import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { FinanceFacade } from '../../../facades/finance.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';

@Component({
  selector: 'none-trend-finances',
  templateUrl: './none-trend.component.html',
  styleUrls: ['./none-trend.component.scss'],
})
export class NoneTrendFinanceComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get netProfitProductionVal$() {
    return this.financeFacade.productionVal$.pipe(
      takeUntil(this.destroy$),
      map(c => Math.round(c ?? 0))
    );
  }

  get netProfitVal$() {
    return this.financeFacade.netProfitVal$.pipe(
      takeUntil(this.destroy$),
      map(c => Math.round(c ?? 0))
    );
  }

  get netProfitPercentageVal$() {
    return this.financeFacade.netProfitPercentageVal$.pipe(
      takeUntil(this.destroy$),
      map(c => Math.round(c ?? 0))
    );
  }

  get productionPerVisit$() {
    return this.financeFacade.prodPerVisitTotal$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get collectionVal$() {
    return this.financeFacade.collectionVal$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get isLoadingCollectionVal$() {
    return combineLatest([
      this.financeFacade.isLoadingTotalProduction$,
      this.financeFacade.isLoadingCollection$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([v, v1]) => v && v1)
    );
  }

  get isLoadingNetProfitProduction$() {
    return this.financeFacade.isLoadingTotalProduction$;
  }

  get isLoadingNetProfit$() {
    return this.financeFacade.isLoadingNetProfit$;
  }

  get isLoadingNetProfitPercentage$() {
    return this.financeFacade.isLoadingNetProfitPercentage$;
  }

  get isFullMonthsDateRange$() {
    return this.layoutFacade.isFullMonthsDateRange$;
  }

  get isConnectedWith$() {
    return this.dashbordFacade.isConnectedWith$;
  }

  get isLoadingProductionPerVisit$() {
    return this.financeFacade.isLoadingFnProdPerVisit$.pipe(
      takeUntil(this.destroy$),
      v => v
    );
  }
  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => typeof v == 'string')
    );
  }

  get toolTipFnProductionPerVisit$() {
    return combineLatest([
      this.dashbordFacade.chartTips$,
      this.isMultipleClinic$,
    ]).pipe(
      map(([c, v]) => {
        if (c && c[v ? 95 : 30]) {
          return c[v ? 95 : 30];
        }
        return null;
      })
    );
  }

  constructor(
    private dashbordFacade: DashboardFacade,
    private financeFacade: FinanceFacade,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  getChartTip(index: number) {
    return this.dashbordFacade.chartTips$.pipe(
      map(c => {
        if (c && c[index]) {
          return c[index];
        }
        return null;
      })
    );
  }
}
