import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../../facades/dashboard.facade';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { FinanceFacade } from '../../../facades/finance.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';

@Component({
  selector: 'trend-finances',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],
})
export class TrendFinanceComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

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
    private clinicFacade: ClinicFacade
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get profitTrendTip$() {
    return combineLatest([
      this.financeFacade.profitTrendChartName$,
      this.dashbordFacade.chartTips$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([chartName, tips]) => {
        if (tips) {
          switch (chartName) {
            case 'Production':
              return tips[31];
            case 'Collection':
              return tips[33];
            case 'Net Profit':
              return tips[26];
            case 'Net Profit %':
              return tips[27];
          }
        }
        return '';
      })
    );
  }

  getChartTip(index: number) {
    return this.dashbordFacade.chartTips$.pipe(
      takeUntil(this.destroy$),
      map(c => {
        if (c && c[index]) {
          return c[index];
        }
        return '';
      })
    );
  }
}
