import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { Component, OnDestroy, OnInit, Input } from "@angular/core";
import { Subject, takeUntil, map, combineLatest } from "rxjs";

@Component({
  selector: "trend-mode-toggle",
  templateUrl: "./trend-mode-toggle.component.html",
  styleUrls: ["./trend-mode-toggle.component.scss"],
})
export class TrendModeToggleComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(
    private layoutFacade: LayoutFacade,
    private financeFacade: FinanceFacade
  ) {}

  get trendMode$() {
    return this.layoutFacade.trend$;
  }

  get isLoading$() {
    return combineLatest([
      this.financeFacade.isLoadingAllData$,
      this.financeFacade.isLoadingAllTrendData$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([v1, v2]) => v1 || v2)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onChangeTrendMode(event) {
    this.layoutFacade.setTrend(event.value);
  }
}
