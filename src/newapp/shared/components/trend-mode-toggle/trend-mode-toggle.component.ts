import { environment } from '@/environments/environment';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { MarketingFacade } from '@/newapp/dashboard/facades/marketing.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subject, takeUntil, map, combineLatest } from 'rxjs';

@Component({
  selector: 'trend-mode-toggle',
  templateUrl: './trend-mode-toggle.component.html',
  styleUrls: ['./trend-mode-toggle.component.scss'],
})
export class TrendModeToggleComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(
    private layoutFacade: LayoutFacade,
    private financeFacade: FinanceFacade,
    private marketingFacade: MarketingFacade,
  ) {}

  get isTest(): boolean {
    return environment.test;
  }

  get trendMode$() {
    return this.layoutFacade.trend$;
  }

  get isLoading$() {
    return combineLatest([
      this.financeFacade.isLoadingAllData$,
      this.financeFacade.isLoadingAllTrendData$,
      this.marketingFacade.isLoadingAllData$,
      this.marketingFacade.isLoadingAllTrendData$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([v1, v2, v3, v4]) => v1 || v2 || v3 || v4),
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onChangeTrendMode(event: MatButtonToggleChange) {
    console.log(event.value);
    this.layoutFacade.setTrend(event.value);
  }
}
