import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { Subject, combineLatest, map } from 'rxjs';
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
    return this.financeFacade.productionVal$.pipe(map(c => Math.round(c ?? 0)));
  }

  get netProfitVal$() {
    return this.financeFacade.netProfitVal$.pipe(map(c => Math.round(c ?? 0)));
  }

  get netProfitPercentageVal$() {
    return this.financeFacade.netProfitPercentageVal$.pipe(
      map(c => Math.round(c ?? 0))
    );
  }

  get collectionVal$() {
    return this.financeFacade.collectionVal$;
  }

  get isLoadingCollectionVal$() {
    return combineLatest([
      this.financeFacade.isLoadingTotalProduction$,
      this.financeFacade.isLoadingCollection$,
    ]).pipe(map(([v, v1]) => v && v1));
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
    return this.clinicFacade.connectedWith$.pipe(
      map(v => v === 'xero' || v === 'myob')
    );
  }

  get isLoadingProductionPerVisit$() {
    return this.financeFacade.isLoadingFnProdPerVisit$;
  }
  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v => typeof v == 'string')
    );
  }

  get toolTipFnProductionPerVisit$() {
    return combineLatest([
      this.dashboardFacade.chartTips$,
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
    private dashboardFacade: DashboardFacade,
    private financeFacade: FinanceFacade,
    private layoutFacade: LayoutFacade,
    private clinicFacade: ClinicFacade
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  getChartTip(index: number) {
    return this.dashboardFacade.chartTips$.pipe(
      map(c => {
        if (c && c[index]) {
          return c[index];
        }
        return null;
      })
    );
  }
  get prodPerVisitTip$() {
    return combineLatest([
      this.financeFacade.prodPerVisitChartName$,
      this.dashboardFacade.chartTips$,
    ]).pipe(
      map(([chartName, tips]) => {
        if (tips) {
          switch (chartName) {
            case 'Production Per Visit':
              return tips[32] ?? '';
            case 'Production Per Day':
              return tips[99] ?? '';
          }
        }
        return '';
      })
    );
  }
}
