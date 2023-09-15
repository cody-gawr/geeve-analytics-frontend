import { Component, OnInit, OnDestroy } from "@angular/core";
import { DashboardFacade } from "../../facades/dashboard.facade";
import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { Subject, takeUntil, combineLatest, map } from "rxjs";
import { FinanceFacade } from "../../facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { Router } from "@angular/router";
import { FnNetProfitParams } from "@/newapp/models/dashboard";
import moment from "moment";
import { AuthFacade } from "@/newapp/auth/facades/auth.facade";
import _ from "lodash";

@Component({
  selector: "dashboard-finances",
  templateUrl: "./finances.component.html",
  styleUrls: ["./finances.component.scss"],
})
export class FinancesComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map((t) => t !== "off")
    );
  }

  get clinicId$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map((v) => v)
    );
  }

  errMsg = "";
  noPermission = true;

  constructor(
    private dashbordFacade: DashboardFacade,
    private clinicFacade: ClinicFacade,
    private financeFacade: FinanceFacade,
    private layoutFacade: LayoutFacade,
    private router: Router,
    private authFacade: AuthFacade
  ) {
    combineLatest([
      this.clinicFacade.currentClinicId$,
      this.layoutFacade.dateRange$,
      this.dashbordFacade.connectedWith$,
      this.router.routerState.root.queryParams,
      this.layoutFacade.trend$,
      this.dashbordFacade.connectedClinicId$,
    ])
      .pipe(
        takeUntil(this.destroy$)
        // distinctUntilChanged((prev, curr) => {
        //   return (
        //     prev[0] == curr[0] &&
        //     ((prev[1].duration !== "custom" &&
        //       prev[1].duration == curr[1].duration) ||
        //       (prev[1].start?.isSame(curr[1].start) &&
        //         prev[1].end?.isSame(curr[1].end))) &&
        //     prev[2] == curr[2] &&
        //     prev[3] == curr[3] &&
        //     prev[4] == curr[4]
        //   );
        // })
      )
      .subscribe((params) => {
        const [
          clinicId,
          dateRange,
          connectedWith,
          route,
          trend,
          connectedClinicId,
        ] = params;
        if (clinicId == null) return;
        const newConnectedId =
          typeof clinicId == "string"
            ? _.min(clinicId.split(",").map((c) => parseInt(c)))
            : clinicId;
        if (newConnectedId !== connectedClinicId) {
          return;
        }
        const startDate = dateRange.start;
        const endDate = dateRange.end;
        const duration = dateRange.duration;

        this.dashbordFacade.loadChartTips(5, clinicId);
        const queryWhEnabled = route && parseInt(route.wh ?? "0") == 1 ? 1 : 0;
        this.financeFacade.setErrors([]);
        switch (trend) {
          case "off":
            const params: FnNetProfitParams = {
              clinicId: clinicId,
              startDate: startDate && moment(startDate).format("DD-MM-YYYY"),
              endDate: endDate && moment(endDate).format("DD-MM-YYYY"),
              duration: duration,
              queryWhEnabled,
              connectedWith: connectedWith,
            };

            if (
              (connectedWith && connectedWith != "none") ||
              typeof clinicId === "string"
            ) {
              this.financeFacade.loadFnNetProfit(params);
              this.financeFacade.loadFnNetProfitPercentage(params);
              this.financeFacade.loadFnExpenses(params);
            }

            this.financeFacade.loadFnTotalProduction(params);
            this.financeFacade.loadFnProductionByClinician(params);
            this.financeFacade.loadFnProductionPerVisit(params);
            this.financeFacade.loadFnTotalDiscounts(params);
            this.financeFacade.loadFnTotalCollection(params);
            break;
          case "current":
          case "historic":
            this.financeFacade.loadFnTotalProductionTrend(
              clinicId,
              trend === "current" ? "c" : "h",
              queryWhEnabled
            );
            this.financeFacade.loadFnTotalCollectionTrend(
              clinicId,
              trend === "current" ? "c" : "h",
              queryWhEnabled
            );
            this.financeFacade.loadFnNetProfitTrend(
              clinicId,
              trend === "current" ? "c" : "h",
              connectedWith,
              queryWhEnabled
            );
            this.financeFacade.loadFnNetProfitPercentageTrend(
              clinicId,
              trend === "current" ? "c" : "h",
              connectedWith,
              queryWhEnabled
            );
            this.financeFacade.loadFnProductionPerVisitTrend(
              clinicId,
              trend === "current" ? "c" : "h",
              queryWhEnabled
            );
            this.financeFacade.loadFnExpensesTrend(
              clinicId,
              trend === "current" ? "c" : "h",
              connectedWith,
              queryWhEnabled
            );
            this.financeFacade.loadFnTotalDiscountsTrend(
              clinicId,
              trend === "current" ? "c" : "h",
              queryWhEnabled
            );
            this.financeFacade.loadFnProductionByClinicianTrend(
              clinicId,
              trend === "current" ? "c" : "h",
              queryWhEnabled
            );
            break;
        }
      });

    combineLatest([
      this.financeFacade.errors$,
      this.authFacade.rolesIndividual$,
      this.layoutFacade.trend$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([errs, roleData, trendMode]) => {
        if (roleData?.type === 7) {
          if (errs.length > 0) {
            if (
              errs.every(
                (e) =>
                  (e.status == 403 || e.status == 502 || e.status == 401) &&
                  (trendMode && trendMode !== "off"
                    ? e.api.includes("Trend")
                    : !e.api.includes("Trend"))
              )
            ) {
              this.errMsg = errs[0].message;
              this.noPermission = false;
              return;
            }
          }
        }
        this.noPermission = true;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
