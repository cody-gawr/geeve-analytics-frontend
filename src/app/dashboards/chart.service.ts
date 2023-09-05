import { Injectable } from "@angular/core";
import { Chart, Plugin } from "chart.js";
import moment from "moment";
// import { PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ChartService {
  duration$ = new BehaviorSubject<string>("m");
  customSelectedDate$ = new BehaviorSubject<any>(null);
  constructor() {}

  colors = {
    odd: "#119682",
    even: "#EEEEF8",
  };

  baseChartData = {
    shadowOffsetX: 3,
    shadowOffsetY: 3,
    shadowBlur: 5,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    pointBevelWidth: 2,
    pointBevelHighlightColor: "rgba(255, 255, 255, 0.75)",
    pointBevelShadowColor: "rgba(0, 0, 0, 0.5)",
    pointShadowOffsetX: 3,
    pointShadowOffsetY: 3,
    pointShadowBlur: 10,
    pointShadowColor: "rgba(0, 0, 0, 0.5)",
    backgroundOverlayMode: "multiply",
  };

  beforeDrawChart(count: number, isCurrency?: boolean) {
    const array: Plugin[] = [
      {
        id: "plugin-123",
        beforeDraw: (chart: Chart) => {
          const ctx = chart.ctx;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.font = (count.toString().length > 4 ? 24 : 37) + "px Gilroy-Bold";
          ctx.fillStyle = "#454649";
          // Draw text in center
          let perThousands = count
            .toFixed(0)
            .split(/(?=(?:...)*$)/)
            .join(","); //decimal numbers fixed to zero number of digits after decimal point

          if (isCurrency) {
            ctx.fillText("$ " + perThousands, centerX, centerY);
          } else {
            ctx.fillText(perThousands, centerX, centerY);
          }
        },
      },
    ];

    return array;
  }

  changeDuration(period: string) {
    let newAppLayoutData: any = localStorage.getItem("layout");
    if (newAppLayoutData) {
      newAppLayoutData = JSON.parse(newAppLayoutData);
      if (newAppLayoutData.dateRange) {
        newAppLayoutData.dateRange.duration = period;
      }
    } else {
      newAppLayoutData = {
        dateRange: {
          start: null,
          end: null,
          duration: period,
        },
        trend: "off",
      };
    }

    localStorage.setItem("layout", JSON.stringify(newAppLayoutData));

    this.duration$.next(period);
  }

  selectDateFromCalender(event) {
    let val = event.chosenLabel;
    val = val.toString().split(" - ");
    let startDate = val[0];
    let endDate = val[1];

    let newAppLayoutData: any = localStorage.getItem("layout");
    if (newAppLayoutData) {
      newAppLayoutData = JSON.parse(newAppLayoutData);
      if (newAppLayoutData.dateRange) {
        newAppLayoutData.dateRange.start = moment(startDate).toISOString();
        newAppLayoutData.dateRange.end = moment(endDate).toISOString();
      }
    } else {
      newAppLayoutData = {
        dateRange: {
          start: moment(startDate).toISOString(),
          end: moment(endDate).toISOString(),
          duration: "custom",
        },
        trend: "off",
      };
    }

    localStorage.setItem("layout", JSON.stringify(newAppLayoutData));

    this.customSelectedDate$.next({
      startDate,
      endDate,
    });
  }
}
