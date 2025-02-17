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
      filter(params => !!params[0]),
      map(([c, v]) => {
        let tip = c[v ? 95 : 30];
        if(tip && tip?.info?.toLowerCase() === 'disabled') return null;
        return tip;
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
        let tip;
        switch (chartName) {
          case 'Production':
            tip = tips[31];
            break;
          case 'Collection':
            tip = tips[33];
            break;
          case 'Net Profit':
            tip = tips[26];
            break;
          case 'Net Profit %':
            tip = tips[27];
        }
        if(tip && tip?.info?.toLowerCase() === 'disabled') return null;
        return tip;
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
        let tip;
        switch (chartName) {
          case 'Production Per Visit':
            tip = tips[32];
            break;
          case 'Production Per Day':
            tip = tips[99];
        }
        if(tip && tip?.info?.toLowerCase() === 'disabled') return null;
        return tip;
      })
    );
  }

  getChartTip(index: number) {
    return this.dashbordFacade.getChartTip$(index)
  }
}
