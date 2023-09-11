import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { Component, OnDestroy, OnInit, Input } from "@angular/core";
import { Subject, takeUntil, map } from "rxjs";

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

  get isLoadingAll$() {
    return this.financeFacade.isLoadingAllData$.pipe(
      takeUntil(this.destroy$),
      map((v) => v)
    );
  }

  get isLoadingAllTrend$() {
    return this.financeFacade.isLoadingAllTrendData$.pipe(
      takeUntil(this.destroy$),
      map((v) => v)
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
