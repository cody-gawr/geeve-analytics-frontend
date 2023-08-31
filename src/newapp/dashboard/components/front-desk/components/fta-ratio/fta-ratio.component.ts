import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { DashboardFacade } from "@/newapp/dashboard/facades/dashboard.facade";
import { FrontDeskFacade } from "@/newapp/dashboard/facades/front-desk.facade";
import { MarketingFacade } from "@/newapp/dashboard/facades/marketing.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { DateRangeMenus } from "@/newapp/shared/components/date-range-menu/date-range-menu.component";
import { JeeveLineFillOptions } from "@/newapp/shared/utils";
import { DecimalPipe } from "@angular/common";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ChartOptions, LegendOptions, ChartDataset } from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import _ from "lodash";
import { Subject, takeUntil, combineLatest, map } from "rxjs";

@Component({
  selector: "fd-fta-ratio-chart",
  templateUrl: "./fta-ratio.component.html",
  styleUrls: ["./fta-ratio.component.scss"],
})
export class FrontDeskFtaRatioComponent implements OnInit, OnDestroy {
  @Input() toolTip = "";

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get trendingIcon() {
    if (this.fdFtaRatioVal >= this.fdFtaRatioPrev) {
      return "trending_up";
    }
    return "trending_down";
  }

  get maxfdFtaRatioGoal() {
    if (this.fdFtaRatioVal > this.fdFtaRatioPrev) {
      return this.fdFtaRatioVal;
    } else {
      return this.fdFtaRatioGoal;
    }
  }

  get showGoals$() {
    return this.layoutFacade.dateRange$.pipe(
      takeUntil(this.destroy$),
      map((val) => {
        if (["m", "lm"].indexOf(val.duration) >= 0) {
          return true;
        }

        if (
          val.start.date() == 1 &&
          val.end.date() == val.end.clone().endOf("month").date()
        ) {
          return true;
        }

        return false;
      })
    );
  }

  fdFtaRatioVal = 0;
  fdFtaRatioPrev = 0;
  fdFtaRatioGoal = 0;

  datasets: ChartDataset[] = [];
  labels = [];

  get maxFdFtaRatioGoal() {
    if (this.fdFtaRatioVal > this.fdFtaRatioPrev) {
      return this.fdFtaRatioVal;
    } else {
      return this.fdFtaRatioGoal;
    }
  }

  get isLoading$() {
    return combineLatest([
      this.isTrend$,
      this.frontDeskFacade.isLoadingFdFtaRatioData$,
      this.frontDeskFacade.isLoadingFdFtaRatioTrendData$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([isTrend, isLoading, isTrendLoading]) => {
        return isTrend ? isTrendLoading : isLoading;
      })
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map((v) => typeof v == "string")
    );
  }

  get durationLabel$() {
    return this.layoutFacade.durationLabel$.pipe(
      takeUntil(this.destroy$),
      map((val) => val)
    );
  }

  get durationTrendLabel$() {
    return this.layoutFacade.durationTrendLabel$.pipe(
      takeUntil(this.destroy$),
      map((l) => l)
    );
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map((t) => t !== "off")
    );
  }

  get isConnectedWith$() {
    return this.dashboardFacade.connectedWith$.pipe(
      takeUntil(this.destroy$),
      map((v) => v && v != "none")
    );
  }

  get isFullMonthsDateRange$() {
    return this.layoutFacade.isFullMonthsDateRange$.pipe(
      takeUntil(this.destroy$),
      map((v) => v)
    );
  }

  get hasData$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMulti]) => {
        if (isTrend || isMulti) {
          return this.labels.length > 0;
        } else {
          return this.fdFtaRatioVal > 0;
        }
      })
    );
  }

  constructor(
    private frontDeskFacade: FrontDeskFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private decimalPipe: DecimalPipe,
    private dashboardFacade: DashboardFacade
  ) {
    combineLatest([
      this.isTrend$,
      this.frontDeskFacade.fdFtaRatioChartData$,
      this.frontDeskFacade.fdFtaRatioTrendChartData$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isTrend, chartData, trendChartData]) => {
        if (isTrend) {
          this.datasets = trendChartData.datasets;
          this.labels = trendChartData.labels;
        } else {
          this.datasets = chartData.datasets;
          this.labels = chartData.labels;
          this.fdFtaRatioVal = chartData.fdFtaRatioVal;
          this.fdFtaRatioPrev = chartData.fdFtaRatioPrev;
          this.fdFtaRatioGoal = <number>chartData.fdFtaRatioGoal;
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get chartOptions$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      takeUntil(this.destroy$),
      map(([isTrend, isMultiClinic]) => {
        if (isTrend) {
          return isMultiClinic
            ? this.stackedChartOptionsTC
            : this.stackedChartOptions;
        } else {
          return this.stackedChartOptionsUti;
        }
      })
    );
  }

  get chartType$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      takeUntil(this.destroy$),
      map(([isTrend, isMultiClinic]) => {
        if (isTrend) {
          return isMultiClinic ? "bar" : "line";
        } else {
          return "bar";
        }
      })
    );
  }

  public stackLegendGenerator: _DeepPartialObject<LegendOptions<any>> = {
    display: true,
    position: "bottom",
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: (chart) => {
        let labels = [];
        let bg_color = {};
        chart.data.datasets.forEach((item) => {
          item.data.forEach((val: number) => {
            if (val > 0) {
              labels.push(item.label);
              bg_color[item.label] = item.backgroundColor;
            }
          });
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map((item) => ({
          text: item,
          strokeStyle: bg_color[item],
          fillStyle: bg_color[item],
        }));
      },
    },
  };
  public legendGenerator: _DeepPartialObject<LegendOptions<any>> = {
    display: true,
    position: "bottom",
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: (chart) => {
        let bgColor = {};
        let labels = chart.data.labels.map((value: string, i) => {
          bgColor[value.split("--")[3]] =
            chart.data.datasets[0].backgroundColor[i];
          return value.split("--")[3];
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map((label, index) => ({
          text: label,
          strokeStyle: bgColor[label],
          fillStyle: bgColor[label],
        }));
      },
    },
    onClick: () => {},
  };

  public stackedChartOptions: ChartOptions = {
    elements: {
      line: JeeveLineFillOptions,
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: "easeOutSine",
    },
    // fill: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label + "%";
            }
            return "";
          },
        },
      },
    },
    plugins: {
      tooltip: {
        mode: "x",
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          label: function (tooltipItems) {
            let total =
              parseInt(tooltipItems.label) > 100
                ? 100
                : tooltipItems.formattedValue;
            var Targetlable = "";
            const v = tooltipItems.dataset.data[tooltipItems.dataIndex];
            let Tlable = tooltipItems.dataset.label;
            if (Tlable != "") {
              Tlable = Tlable + ": ";
              Targetlable = Tlable;
            }
            //let ylable = Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;
            let ylable = tooltipItems.parsed._custom
              ? +(
                  tooltipItems.parsed._custom.max +
                  tooltipItems.parsed._custom.min
                ) / 2
              : v;
            var tlab = 0;
            if (typeof tooltipItems.chart.data.datasets[1] === "undefined") {
            } else {
              const tval =
                tooltipItems.chart.data.datasets[1].data[
                  tooltipItems.dataIndex
                ];
              if (Array.isArray(tval)) {
                tlab = Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
                if (tlab == 0) {
                  Tlable = "";
                }
              }
            }
            if (tlab == 0 && Targetlable == "Target: ") {
              return "";
            } else {
              return Tlable + tooltipItems.label + ": " + ylable + "%";
            }
          },
          title: function () {
            return "";
          },
        },
      },
      legend: {
        display: true,
      },
    },
  };
  public stackedChartOptionsTC: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: "rectRounded",
        hoverBorderWidth: 7,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: "easeOutSine",
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        min: 0,
        max: 100,
        ticks: {
          callback: function (value: string) {
            // when the floored value is the same as the value we have a whole number
            return `${value}%`;
          },
        },
      },
    },
    plugins: {
      legend: this.stackLegendGenerator,
      tooltip: {
        mode: "x",
        enabled: true,
        // custom: function (tooltip: ChartTooltipModel) {
        //   tooltip.displayColors = false;
        // },
        displayColors(ctx, options) {
          return false;
        },
        callbacks: {
          label: function (tooltipItems) {
            return `${tooltipItems.formattedValue}%`;
          },
        },
      },
    },
  };

  public stackedChartOptionsUti: ChartOptions = {
    hover: { mode: null },
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
    animation: {
      duration: 1,
      easing: "linear",
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          callback: function (tickValue: string, index: number) {
            let value = this.getLabelForValue(index);
            if (value && value.toString().includes("--")) {
              let lbl = value.split("--");
              value = lbl[0];
            }
            return value;
          },
        },
        stacked: true,
      },
      y: {
        min: 0,
        max: 100,
        // stacked:true,
        ticks: {
          callback: function (label, index, labels) {
            return label + "%";
          },
        },
      },
    },
    plugins: {
      tooltip: {
        mode: "x",
        // custom: function (tooltip) {
        //   if (!tooltip) return;
        //   tooltip.displayColors = false;
        // },
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          label: function (tooltipItems) {
            let label = tooltipItems.label;
            //let total = parseInt(tooltipItems.formattedValue.toString()) > 100 ? 100 : tooltipItems.formattedValue;
            if ((<string>tooltipItems.label).indexOf("--") >= 0) {
              let lbl = (<string>tooltipItems.label).split("--");
              if (typeof lbl[3] === "undefined") {
                label = lbl[0];
              } else {
                label = lbl[0] + " - " + lbl[3];
              }
            }
            var Targetlable = "";
            const v = tooltipItems.dataset.data[tooltipItems.dataIndex];
            let Tlable = tooltipItems.dataset.label;
            if (Tlable != "") {
              Tlable = Tlable + ": ";
              Targetlable = Tlable;
            }
            //let ylable = Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;
            let ylable = tooltipItems.parsed._custom
              ? +(
                  tooltipItems.parsed._custom.max +
                  tooltipItems.parsed._custom.min
                ) / 2
              : v;

            var tlab = 0;
            if (typeof tooltipItems.chart.data.datasets[1] === "undefined") {
            } else {
              const tval =
                tooltipItems.chart.data.datasets[1].data[
                  tooltipItems.dataIndex
                ];
              if (Array.isArray(tval)) {
                tlab = Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
                if (tlab == 0) {
                  Tlable = "";
                }
              }
            }
            if (tlab == 0 && Targetlable == "Target: ") {
              return "";
            } else {
              return Tlable + label + ": " + ylable + "%";
            }
          },
          afterLabel: function (tooltipItems) {
            let hour = 0;
            let phour = 0;
            if (
              tooltipItems.label.indexOf("--") >= 0 &&
              tooltipItems.datasetIndex == 0
            ) {
              let lbl = tooltipItems.label.split("--");
              hour = Number(lbl[1]);
              phour = Number(lbl[2]);
              return [
                "",
                "Available Hours: " + Math.round(phour * 100) / 100,
                "Used Hours: " + Math.round(hour * 100) / 100,
              ];
            }
            return "";
          },
          title: function () {
            return "";
          },
        },
      },
      legend: this.legendGenerator,
    },
  };
}
