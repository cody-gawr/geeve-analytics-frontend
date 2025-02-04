import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../../facades/dashboard.facade';
import { combineLatest, map, filter } from 'rxjs';
import { FinanceFacade } from '../../../facades/finance.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';

@Component({
  selector: 'trend-finances',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],
})
export class TrendFinanceComponent implements OnInit, OnDestroy {
  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
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
    private clinicFacade: ClinicFacade
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  get profitTrendTip$() {
    return combineLatest([
      this.financeFacade.profitTrendChartName$,
      this.dashbordFacade.chartTips$,
    ]).pipe(
      filter(params => !!params[1]),
      map(([chartName, tips]) => {
        if (tips) {
          switch (chartName) {
            case 'Production':
              return tips[31] ?? '';
            case 'Collection':
              return tips[33] ?? '';
            case 'Net Profit':
              return tips[26] ?? '';
            case 'Net Profit %':
              return tips[27] ?? '';
          }
        }
        return '';
      })
    );
  }

  get prodPerVisitTip$() {
    return combineLatest([
      this.financeFacade.prodPerVisitChartName$,
      this.dashbordFacade.chartTips$,
    ]).pipe(
      filter(params => !!params[1]),
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

  getChartTip(index: number) {
    return this.dashbordFacade.chartTips$.pipe(
      map(c => {
        if (c && c[index]) {
          return c[index];
        }
        return '';
      })
    );
  }
}
