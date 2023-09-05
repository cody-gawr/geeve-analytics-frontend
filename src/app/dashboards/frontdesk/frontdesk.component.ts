import * as $ from "jquery";
import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FrontDeskService } from "./frontdesk.service";
import { DentistService } from "../../dentist/dentist.service";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderService } from "../../layouts/full/header/header.service";
import { CookieService } from "ngx-cookie";
import { ToastrService } from "ngx-toastr";
import { ChartOptions, LegendOptions, ChartDataset } from "chart.js";
import { ChartService } from "../chart.service";
import { AppConstants } from "../../app.constants";
import { environment } from "../../../environments/environment";
import { ChartstipsService } from "../../shared/chartstips.service";
import { ClinicianAnalysisService } from "../cliniciananalysis/cliniciananalysis.service";
import * as _ from "lodash";
import * as moment from "moment";
import { LocalStorageService } from "../../shared/local-storage.service";
import { take, Subject, interval } from "rxjs";
import { CancellationRatio } from "./frontdesk.interfaces";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { JeeveLineFillOptions } from "../../shared/chart-options";

export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  templateUrl: "./frontdesk.component.html",
  styleUrls: ["./frontdesk.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FrontDeskComponent implements AfterViewInit {
  @ViewChild("myCanvas") canvas: ElementRef;

  lineChartColors;
  public doughnutChartColors: string[];
  predictedChartColors;
  preoceedureChartColors;
  subtitle: string;
  public clinic_id: any = {};
  public dentistCount: any = {};
  public clinicsData: any[] = [];
  public trendText;
  public charTips: any = [];
  public showTopVlaues: boolean = false;
  public showUtiTable: boolean = false;
  public utilShow: any = 1;
  public apiUrl = environment.apiUrl;
  public showGoals: boolean = false;
  public numberOfRecords: number = 20;
  public maxLegendLabelLimit = 10;
  public legendBackgroundColor = [
    "#6edbbb",
    "#b0fffa",
    "#abb3ff",
    "#ffb4b5",
    "#fffcac",
    "#FFE4E4",
    "#FFD578",
    "#54D2FF",
    "#E58DD7",
    "#A9AABC",
    "#F2ECFF",
    "#5689C9",
    "#F9F871",
  ];
  public isAllClinic: boolean;
  private destroy = new Subject<void>();
  private destroy$ = this.destroy.asObservable();
  public queryWhEnabled = 0;

  chartData1 = [{ data: [330, 600, 260, 700], label: "Account A" }];
  chartLabels1 = ["January", "February", "Mars", "April"];
  public get isCancellationRatioContainerVisible(): boolean {
    return false;
    //return this.localStorageService.isEachClinicPmsCore(this.clinic_id);
  }

  public get isUtaRatioContainerVisible(): boolean {
    return (
      this.localStorageService.isEachClinicPmsD4w(this.clinic_id) ||
      this.localStorageService.isEachClinicPmsCore(this.clinic_id)
    );
  }

  public get isExact(): boolean {
    return this.localStorageService.isEachClinicExact(this.clinic_id);
  }

  public get isCore(): boolean {
    return this.localStorageService.isEachClinicPmsCore(this.clinic_id);
  }

  constructor(
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private frontdeskService: FrontDeskService,
    private dentistService: DentistService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private _cookieService: CookieService,
    private router: Router,
    private chartService: ChartService,
    public constants: AppConstants,
    public chartstipsService: ChartstipsService,
    private clinicianAnalysisService: ClinicianAnalysisService
  ) {
    router.routerState.root.queryParams.subscribe((val) => {
      if (val && val.wh) {
        this.queryWhEnabled = val.wh;
      }
    });
    // this.getChartsTips();
    this.getAllClinics();
  }
  private warningMessage: string;
  private myTemplate: any = "";
  public Apirequest = 0;

  initiate_clinic() {
    var val = $("#currentClinic").attr("cid");
    if (val != undefined) {
      if (val == "all") {
        this.clinic_id = this.clinics;
      } else {
        this.clinic_id = val;
      }
      if (this.clinic_id.indexOf(",") >= 0 || Array.isArray(this.clinic_id)) {
        this.isAllClinic = true;
        this.getMaxBarLimit();
      } else {
        this.isAllClinic = false;
      }

      let newAppLayoutData: any = localStorage.getItem("layout");
      if (newAppLayoutData) {
        newAppLayoutData = JSON.parse(newAppLayoutData);
        if (newAppLayoutData.dateRange) {
          this.startDate = moment(newAppLayoutData.dateRange.start).format(
            "YYYY-MM-DD"
          );
          this.endDate = moment(newAppLayoutData.dateRange.end).format(
            "YYYY-MM-DD"
          );
          this.filterDate(newAppLayoutData.dateRange.duration);
        }
      } else {
        this.filterDate(this.chartService.duration$.value);
      }
      //this.filterDate(this.chartService.duration$.value);
      // this.getDentists();
      this.getChartsTips();
    }
  }

  public clinics = [];
  getAllClinics() {
    this.headerService.getClinic.subscribe((res) => {
      if (res.status == 200) {
        let temp = [];
        res.body.data.forEach((item) => {
          temp.push(item.id);
        });
        this.clinics = [...temp];
      }
    });
  }

  formatDate(date) {
    if (date) {
      var dateArray = date.split("-");
      const d = new Date();
      d.setFullYear(+dateArray[2], +dateArray[1] - 1, +dateArray[0]);
      const formattedDate = this.datePipe.transform(d, "dd MMM yyyy");
      return formattedDate;
    } else return date;
  }

  ngAfterViewInit() {
    $("#currentDentist").attr("did", "all");
    this.route.params.subscribe((params) => {
      this.clinic_id = this.route.snapshot.paramMap.get("id");
      //    this.filterDate('cytd');
      this.getClinics();
      // this.initiate_clinic();

      $("#title").html("<span>Front Desk</span>");
      $("#sa_datepicker").val(
        this.formatDate(this.startDate) + " - " + this.formatDate(this.endDate)
      );

      $(".external_clinic").show();
      //$('.dentist_dropdown').hide();
      $(".header_filters").addClass("flex_direct_mar");
      $(".header_filters").removeClass("hide_header");
      $("#title").html(
        '<span>Front Desk</span> <span class="page-title-date">' +
          this.formatDate(this.startDate) +
          " - " +
          this.formatDate(this.endDate) +
          "</span>"
      );
      $(".external_clinic").show();
      //$('.external_dentist').show();
      $(document).on("click", function (e) {
        if ($(document.activeElement).attr("id") == "sa_datepicker") {
          $(".customRange").show();
        } else if ($(document.activeElement).attr("id") == "customRange") {
          $(".customRange").show();
        } else {
          $(".customRange").hide();
        }
      });
    });

    let predictedGradient = this.canvas.nativeElement
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 400);
    predictedGradient.addColorStop(0, "rgba(12, 209,169,0.8)");
    predictedGradient.addColorStop(1, "rgba(22, 82, 141, 0.9)");
    let predictedGradient1 = this.canvas.nativeElement
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 100);
    predictedGradient1.addColorStop(1, "rgba(12, 209,169,0.9)");
    predictedGradient1.addColorStop(0, "rgba(22, 82, 141, 0.6)");
    let predictedGradient2 = this.canvas.nativeElement
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 100);
    predictedGradient2.addColorStop(1, "rgba(59, 227,193,4)");
    predictedGradient2.addColorStop(0, "rgba(22, 82, 141, 9)");
    let predictedGradient3 = this.canvas.nativeElement
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 100);
    predictedGradient3.addColorStop(1, "rgba(94, 232,205,0.7)");
    predictedGradient3.addColorStop(0, "rgba(22, 82, 141, 0.9)");
    let predictedGradient4 = this.canvas.nativeElement
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 100);
    predictedGradient4.addColorStop(1, "rgba(148, 240,221,0.8)");
    predictedGradient4.addColorStop(0, "rgba(22, 82, 141, 0.8)");
    let predictedGradient5 = this.canvas.nativeElement
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 100);
    predictedGradient5.addColorStop(1, "rgba(201, 247,238,0.8)");
    predictedGradient5.addColorStop(0, "rgba(22, 82, 141, 0.9)");
    this.doughnutChartColors = [
      "#6cd8ba",
      "#b0fffa",
      "#abb3ff",
      "#feefb8",
      "#91ADEA",
      "#ffb4b5",
      "#F2C6C6",
      "#FDC6C0",
      "#FEEEE1",
      "#FFDD99",
      "#A8DDDD",
      "#F4F4A0",
      "#C3DDFF",
      "#9FDBDB",
      "#CCFDCC",
      "#B1F2EC",
      "#BBEBFA",
      "#BBEBFA",
      "#D7ECF3",
      "#BBE7FF",
      "#C8CDF0",
      "#F7C4F5",
      "#6cd8ba",
      "#feefb8",
      "#FF6384",
      "#fe7b85",
      "#87ada9",
      "#386087",
      "#54D2FF",
      "#E58DD7",
    ];
    this.predictedChartColors = [
      {
        backgroundColor: predictedGradient,
        hoverBorderWidth: 2,
        hoverBorderColor: "#1CA49F",
        borderColor: "rgba(25,179,148,0.7)",
      },
      {
        backgroundColor: predictedGradient1,
        hoverBorderWidth: 2,
        hoverBorderColor: "#1CA49F",
        borderColor: "rgba(25,179,148,0.7)",
      },
      {
        backgroundColor: predictedGradient2,
        hoverBorderWidth: 2,
        hoverBorderColor: "#1CA49F",
        borderColor: "rgba(25,179,148,0.7)",
      },
      {
        backgroundColor: predictedGradient3,
        hoverBorderWidth: 2,
        hoverBorderColor: "#1CA49F",
        borderColor: "rgba(25,179,148,0.7)",
      },
      {
        backgroundColor: predictedGradient4,
        hoverBorderWidth: 2,
        hoverBorderColor: "#1CA49F",
        borderColor: "rgba(25,179,148,0.7)",
      },
      {
        backgroundColor: predictedGradient5,
        hoverBorderWidth: 2,
        hoverBorderColor: "#1CA49F",
      },
    ];

    this.filterDate(this.chartService.duration$.value);
  }

  getMaxBarLimit() {
    const ids: number[] =
      typeof this.clinic_id == "string"
        ? this.clinic_id.split(",").map((id) => Number(id))
        : this.clinic_id;
    ids.sort((a, b) => a - b);
    this.clinicianAnalysisService
      .getClinicFollowUpSettings(ids[0])
      .subscribe((res) => {
        //if (res.status == 200) {
        if (res.data.max_chart_bars)
          this.numberOfRecords = res.data.max_chart_bars;
        //}
      });
  }

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
        labels = labels.splice(0, this.maxLegendLabelLimit);
        return labels.map((label, index) => ({
          text: label,
          strokeStyle: bgColor[label],
          fillStyle: bgColor[label],
        }));
      },
    },
    onClick: () => {},
  };

  public barBackgroundColor(data) {
    let dynamicColors = [];
    data.forEach((res) => {
      if (Array.isArray(this.clinic_id)) {
        this.clinic_id.forEach((item, index) => {
          if (res.clinic_id == item) {
            dynamicColors.push(this.legendBackgroundColor[index]);
          }
        });
      } else {
        this.clinic_id.split(",").forEach((item, index) => {
          if (res.clinic_id == item) {
            dynamicColors.push(this.legendBackgroundColor[index]);
          }
        });
      }
    });
    return dynamicColors;
  }
  public date = new Date();
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
        labels = labels.splice(0, this.maxLegendLabelLimit);
        return labels.map((item) => ({
          text: item,
          strokeStyle: bg_color[item],
          fillStyle: bg_color[item],
        }));
      },
    },
    onClick: () => {},
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
  public stackedChartOptionsTic: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: "rectRounded",
        hoverBorderWidth: 7,
      },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
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
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency =
                label < 0
                  ? label.toString().split("-").join("")
                  : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(",");
              return label; // `${label < 0 ? '- $' : '$'}${currency}`;
            }
            return "";
          },
        },
      },
    },
    plugins: {
      legend: this.stackLegendGenerator,
      tooltip: {
        mode: "x",
        // enabled: false,
        // external: function (t) {
        //   const tooltip = t.tooltip;
        //   const chart = t.chart;
        //   if (!tooltip) return;
        //   var tooltipEl = document.getElementById('chartjs-tooltip');
        //   if (!tooltipEl) {
        //     tooltipEl = document.createElement('div');
        //     tooltipEl.id = 'chartjs-tooltip';
        //     tooltipEl.style.backgroundColor = '#FFFFFF';
        //     tooltipEl.style.borderColor = '#B2BABB';
        //     tooltipEl.style.borderWidth = 'thin';
        //     tooltipEl.style.borderStyle = 'solid';
        //     tooltipEl.style.zIndex = '999999';
        //     tooltipEl.style.backgroundColor = '#000000';
        //     tooltipEl.style.color = '#FFFFFF';
        //     document.body.appendChild(tooltipEl);
        //   }
        //   if (tooltip.opacity === 0) {
        //     tooltipEl.style.opacity = '0';
        //     return;
        //   } else {
        //     tooltipEl.style.opacity = '0.8';
        //   }

        //   tooltipEl.classList.remove('above', 'below', 'no-transform');
        //   if (tooltip.yAlign) {
        //     tooltipEl.classList.add(tooltip.yAlign);
        //   } else {
        //     tooltipEl.classList.add('no-transform');
        //   }

        //   function getBody(bodyItem) {
        //     let result = [];
        //     bodyItem.forEach((items) => {
        //       items.lines.forEach((item) => {
        //         if (item.split(':')[1].trim() != '$NaN') {
        //           result.push(items.lines);
        //         }
        //       });
        //     });
        //     return result;
        //     // return bodyItem.lines;
        //   }
        //   if (tooltip.body) {
        //     var titleLines = tooltip.title || [];
        //     var bodyLines = getBody(tooltip.body);
        //     // var bodyLines = tooltip.body.map(getBody);
        //     var labelColorscustom = tooltip.labelColors;
        //     var innerHtml = '<table><thead>';
        //     innerHtml += '</thead><tbody>';

        //     let total: any = 0;
        //     bodyLines.forEach(function (body, i) {
        //       if (!body[0].includes('$0')) {
        //         var singleval = body[0].split(':');
        //         if (singleval[1].includes('-')) {
        //           var temp = singleval[1].split('$');
        //           var amount = temp[1].replace(/,/g, '');
        //           total -= parseFloat(amount);
        //         } else {
        //           var temp = singleval[1].split('$');
        //           var amount = temp[1].replace(/,/g, '');
        //           total += parseFloat(amount);
        //         }
        //       }
        //     });
        //     total = Math.round(total);
        //     if (total != 0) {
        //       var num_parts = total.toString().split('.');
        //       num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        //       total = num_parts.join('.');
        //     }
        //     titleLines.forEach(function (title) {
        //       innerHtml +=
        //         '<tr><th colspan="2" style="text-align: left;">' +
        //         title +
        //         ': ' +
        //         total +
        //         '</th></tr>';
        //     });
        //     bodyLines.forEach(function (body, i) {
        //       if (!body[0].includes('$0')) {
        //         var body_custom = body[0];
        //         body_custom = body_custom.split(':');
        //         if (body_custom[1].includes('-')) {
        //           var temp_ = body_custom[1].split('$');
        //           temp_[1] = Math.round(temp_.length > 1?temp_[1].replace(/,/g, ''):0);
        //           temp_[1] = temp_[1].toString();
        //           temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
        //           body_custom[1] = temp_.join('');
        //         } else {
        //           var temp_ = body_custom[1].split('$');
        //           temp_[1] = Math.round(temp_.length > 1?temp_[1].replace(/,/g, ''):0);
        //           temp_[1] = temp_[1].toString();
        //           temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
        //           body_custom[1] = temp_.join('');
        //         }

        //         body[0] = body_custom.join(':');
        //         innerHtml +=
        //           '<tr><td class="td-custom-tooltip-color"><span class="custom-tooltip-color" style="background:' +
        //           labelColorscustom[i].backgroundColor +
        //           '"></span></td><td style="padding: 0px">' +
        //           body[0] +
        //           '</td></tr>';
        //       }
        //     });
        //     innerHtml += '</tbody></table>';
        //     tooltipEl.innerHTML = innerHtml;
        //     //tableRoot.innerHTML = innerHtml;
        //   }
        //   // disable displaying the color box;
        //   var position = chart.canvas.getBoundingClientRect();
        //   // Display, position, and set styles for font
        //   tooltipEl.style.position = 'fixed';
        //   tooltipEl.style.left =
        //     position.left + window.pageXOffset + tooltip.caretX - 70 + 'px';
        //   tooltipEl.style.top =
        //     position.top + window.pageYOffset + tooltip.caretY - 70 + 'px';
        //   // tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        //   // tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        //   // tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        //   // tooltipEl.style.padding =
        //   //   tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        //   tooltipEl.style.pointerEvents = 'none';
        // },
        // displayColors: false,
        callbacks: {
          label: function (tooltipItems) {
            // let currency = tooltipItems.formattedValue.toString();
            // let currencySegs = currency.split('.');
            // currencySegs[0] = currencySegs[0]
            //   .split('-')
            //   .join('')
            //   .split(/(?=(?:...)*$)/)
            //   .join(',');
            // currency = currencySegs.join('.');
            // return (
            //   tooltipItems.dataset.label +
            //   `: ${parseInt(tooltipItems.formattedValue.toString()) < 0 ? '- $' : '$'}${currency}`
            // );
            return `${tooltipItems.dataset.label}: ${tooltipItems.parsed.y}`;
          },
          title: function (tooltipItems) {
            return `${tooltipItems[0].label}: ${_.sumBy(
              tooltipItems,
              (t) => t.parsed.y
            )}`;
          },
        },
      },
    },
  };

  public stackedChartOptionsT: ChartOptions = {
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
        // stacked:true,
        ticks: {
          // max:100,
          callback: function (label: number) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }
            return "";
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
            //let total = parseInt(tooltipItems.formattedValue.toString()) > 100 ? 100 : tooltipItems.formattedValue;
            let label = tooltipItems.label;
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
              return Tlable + label + ": " + ylable;
            }
          },
          afterLabel: function (tooltipItems) {
            let hour = "0";
            let phour = "0";
            if (
              tooltipItems.label.indexOf("--") >= 0 &&
              tooltipItems.datasetIndex == 0
            ) {
              let lbl = tooltipItems.label.split("--");
              hour = lbl[1];
              phour = lbl[2];
              return ["", "Available Hours: " + phour, "Used Hours: " + hour];
            }
            return "";
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

  public stackedChartOptionsUti1: ChartOptions = {
    hover: { mode: null },
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
    animation: {
      duration: 1,
      easing: "linear",
      onComplete: function () {
        var chartInstance = this,
          ctx = chartInstance.ctx;
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.textBaseline = "bottom";
        // Loop through each data in the datasets
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            // var data = "$"+dataset.data[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let num = dataset.data[index];
            // let dataK = Math.abs(num) > 999 ? Math.sign(num)*(Math.round(Math.abs(num)/100)/10) + 'k' : Math.sign(num)*Math.abs(num);
            let dataK = shortenLargeNumber(num, 1);
            let dataDisplay = `${dataK}%`;
            //ctx.font = this.helpers.fontString(11, 'normal', 'Gilroy-Bold');
            ctx.font = "normal 11px Gilroy-Bold";
            ctx.fillText(dataDisplay, bar.x, bar.y + 2);

            function shortenLargeNumber(num, digits) {
              let units = ["k", "M", "G", "T", "P", "E", "Z", "Y"];
              let decimal: number = 0;

              for (var i = units.length - 1; i >= 0; i--) {
                decimal = Math.pow(1000, i + 1);

                if (num <= -decimal || num >= decimal) {
                  return +(num / decimal).toFixed(digits) + units[i];
                }
              }

              return num;
            }
          });
        });
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          callback: function (tickValue: string, index, values) {
            let value = this.getLabelForValue(index);
            if (value && value.toString().includes("--")) {
              let lbl = value.split("--");
              value = lbl[0];
            }
            return value;
          },
        },
      },
      y: {
        min: 0,
        max: 100,
        // stacked:true,
        ticks: {
          callback: function (label: string | number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            return `${Number(label)}%`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: this.legendGenerator,
    },
  };

  public stackedChartOptionsUtiDP = this.stackedChartOptionsUti;
  public stackedChartOptionsticks: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: "rectRounded",
        hoverBorderWidth: 7,
      },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
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
        stacked: true,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }
            return "";
          },
        },
      },
    },
    plugins: {
      tooltip: {
        // custom: function (tooltip) {
        //   if (!tooltip) return;
        //   // disable displaying the color box;
        //   tooltip.displayColors = false;
        // },
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          label: function (tooltipItems) {
            return (
              tooltipItems.label + ": " + tooltipItems.formattedValue + "%"
            );
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

  public numOfTicksChartOptionsticks: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: "rectRounded",
        hoverBorderWidth: 7,
      },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
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
        stacked: true,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }
            return "";
          },
        },
      },
    },
    plugins: {
      tooltip: {
        // custom: function (tooltip) {
        //   if (!tooltip) return;
        //   // disable displaying the color box;
        //   tooltip.displayColors = false;
        // },
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          label: function (tooltipItems) {
            return tooltipItems.label + ": " + tooltipItems.formattedValue;
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

  public stackedChartColors: Array<any> = [
    { backgroundColor: "#76F2E5" },
    { backgroundColor: "#6BE6EF" },
    { backgroundColor: "#68D8D6" },
    { backgroundColor: "#3DCCC7" },
    { backgroundColor: "#68FFF9" },
    { backgroundColor: "#07BEB8" },
  ];
  public stackedChartType = "bar";
  public lineChartType = "line";

  public stackedChartLegend = true;

  //labels
  public stackedChartLabels: string[] = [];
  public stackedChartLabels1: string[] = [];

  //data
  public stackedChartData: any[] = [
    { data: [], label: "Crowns" },
    { data: [], label: "Splints " },
    { data: [], label: "Root Canals" },
    { data: [], label: "Perio Charts" },
    { data: [], label: "Surgical Extractions" },
  ];

  public stackedChartData1: any[] = [];
  public stackedChartData2: any[] = [];
  public stackedChartData3: any[] = [];
  public stackedChartData4: any[] = [];
  public stackedChartData5: any[] = [];
  public selectedDentist;
  public dentists;
  public duration = "";
  public utilityratemessage: boolean = false;
  // events
  public chartClicked(e: any): void {}

  public chartHovered(e: any): void {}
  public gaugeType = "arch";
  public gaugeValue = "";
  public gaugeLabel = "";
  public gaugeThick = "20";
  public foregroundColor = "#4ccfae";
  public backgroundColor = "#f4f0fa";
  public cap = "round";
  public size = "250";
  public gaugeAppendText = "%";
  public startDate = "";
  public endDate = "";
  public DateDiffernce = "";
  public selectedValToggle = "off";
  myDateParser(dateStr: string): string {
    // 2018-01-01T12:12:12.123456; - converting valid date format like this

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20);

    let validDate = date;
    return validDate;
  }
  loadDentist(newValue) {
    $("#title").html("<span>Front Desk</span>");
    $("#sa_datepicker").val(
      this.formatDate(this.startDate) + " - " + this.formatDate(this.endDate)
    );
    if (newValue == "all" && this.clinic_id) {
      if (!this.isExact) {
        if (this.utilShow == 1) {
          this.fdWorkTimeAnalysis();
        } else if (this.utilShow == 2) {
          this.fdWorkTimeByDay();
        }
      }
      this.fdRecallPrebookRate();
      this.fdtreatmentPrebookRate();
      this.fdNumberOfTicks();
      this.fdFtaRatio();
      interval(400)
        .pipe(take(1))
        .subscribe(() => {
          if (this.isCancellationRatioContainerVisible) {
            this.getCancellationRatio();
          } else if (this.isUtaRatioContainerVisible) {
            this.fdUtaRatio();
          }
        });
    }
  }

  public workTimeData = [
    {
      data: [],
      label: "",
      backgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
      hoverBackgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
    },
  ];
  public workTimeLabels = [];

  public workTimeLabels1 = [];
  public workTimeData1 = [];
  public workTimeTotal;
  public prevWorkTimeTotal;
  public workTimeGoal;
  public prevWorkTimeTooltip = "down";
  public goalchecked = "off";
  public stackedChartOptionssWT: ChartOptions = this.stackedChartOptions;
  public fdWorkTimeAnalysisLoader: boolean;
  public showMultiClinicUR: boolean = false;
  public fdUtiData: any = [];

  //Items Predictor Analysis
  private fdWorkTimeAnalysis() {
    this.fdWorkTimeAnalysisLoader = true;
    this.workTimeLabels = [];
    this.showMultiClinicUR = false;
    if (this.DateDiffernce > "365") {
      this.utilityratemessage = true;
      this.fdWorkTimeAnalysisLoader = false;
    } else {
      this.utilityratemessage = false;
      this.clinic_id &&
        this.frontdeskService
          .fdWorkTimeAnalysis(
            this.clinic_id,
            this.startDate,
            this.endDate,
            this.duration,
            this.queryWhEnabled
          )
          .subscribe({
            next: (res) => {
              this.fdUtiData = [];
              if (res.status == 200) {
                this.fdWorkTimeAnalysisLoader = false;
                this.workTimeData1 = [];
                this.workTimeLabels1 = [];
                this.prevWorkTimeTooltip = "down";
                if (res.body.data.length > 0) {
                  res.body.data.forEach((res) => {
                    var temp = {
                      name: res.app_book_name,
                      scheduled_hours: Math.round(res.planned_hour * 100) / 100,
                      clinican_hours: Math.round(res.worked_hour * 100) / 100,
                      util_rate: Math.round(res.util_rate * 100),
                    };
                    this.fdUtiData.push(temp);
                  });
                  if (res.body.data.length > this.numberOfRecords)
                    res.body.data = res.body.data.slice(
                      0,
                      this.numberOfRecords
                    );
                  res.body.data.forEach((res) => {
                    this.workTimeData1.push(Math.round(res.util_rate * 100));
                    if (
                      this.clinic_id.indexOf(",") >= 0 ||
                      Array.isArray(this.clinic_id)
                    ) {
                      this.isAllClinic = true;
                      this.showMultiClinicUR = true;
                    } else {
                      this.isAllClinic = false;
                    }
                    this.workTimeLabels1.push(
                      res.app_book_name +
                        "--" +
                        res.worked_hour +
                        "--" +
                        res.planned_hour +
                        "--" +
                        res.clinic_name
                    );
                  });
                }
                this.workTimeData[0]["data"] = this.workTimeData1;
                if (this.isAllClinic)
                  this.workTimeData[0].backgroundColor =
                    this.barBackgroundColor(res.body.data);
                this.workTimeLabels = this.workTimeLabels1;
                this.workTimeTotal = Math.round(res.body.total);
                this.prevWorkTimeTotal = Math.round(res.body.total_ta);
                this.workTimeGoal = res.body.goals;
                if (this.workTimeTotal >= this.prevWorkTimeTotal)
                  this.prevWorkTimeTooltip = "up";
                this.stackedChartOptionssWT.plugins.annotation = undefined;
                if (this.goalchecked == "average") {
                  this.stackedChartOptionssWT.plugins.annotation = {
                    annotations: [
                      {
                        type: "line",
                        // mode: 'horizontal',
                        scaleID: "y-axis-0",
                        yMax: this.workTimeTotal,
                        yMin: this.workTimeTotal,
                        borderColor: "#0e3459",
                        borderWidth: 2,
                        borderDash: [2, 2],
                        borderDashOffset: 0,
                      },
                    ],
                  };
                } else if (this.goalchecked == "goal") {
                  this.stackedChartOptionssWT.plugins.annotation = {
                    annotations: [
                      {
                        type: "line",
                        // mode: 'horizontal',
                        scaleID: "y-axis-0",
                        yMax: this.workTimeGoal,
                        yMin: this.workTimeGoal,
                        borderColor: "red",
                        borderWidth: 2,
                        borderDash: [2, 2],
                        borderDashOffset: 0,
                      },
                    ],
                  };
                }
              }
            },
            error: (error) => {
              this.warningMessage = "Please Provide Valid Inputs!";
            },
          });
    }
  }

  public byDayData: ChartDataset[] = [
    {
      data: [],
      label: "",
      backgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
      hoverBackgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
    },
  ];

  public byDayDataTemp: any = [];
  public byDayLabels: any = [];
  public byDayLabelsTemp: any = [];
  public byDayDataTable: any = [];
  public byDayLoader: boolean;
  public byTotal: any = 0;
  public prevByDayTotal: any = 0;
  // Function for utilisation by day
  public fdWorkTimeByDay() {
    this.byDayLoader = true;
    this.frontdeskService
      .fdWorkTimeAnalysisByDay(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.queryWhEnabled
      )
      .subscribe({
        next: (res) => {
          this.byDayLoader = false;
          this.byDayDataTemp = [];
          this.byDayLabelsTemp = [];
          this.byDayDataTable = [];
          this.byTotal = 0;
          this.prevByDayTotal = 0;
          if (res.status == 200) {
            moment.updateLocale("en-au", {
              week: {
                dow: 1,
              },
            });
            const weekdays: string[] = moment.weekdays(true);
            const fillableData: {
              day: string;
              plannedHour: number;
              workedHour: number;
            }[] = _.chain(res.body.data)
              .groupBy("day")
              .map((items: any, day: string) => {
                return {
                  day,
                  plannedHour: _.chain(items)
                    .sumBy((item) => Number(item.planned_hour))
                    .value(),
                  workedHour: _.chain(items)
                    .sumBy((item) => Number(item.worked_hour))
                    .value(),
                };
              })
              .value();
            const data: {
              day: string;
              plannedHour: number;
              workedHour: number;
            }[] = weekdays.map((weekday) => {
              const item = fillableData.find((ele) => ele.day == weekday);
              return item
                ? item
                : { day: weekday, plannedHour: 0, workedHour: 0 };
            });
            this.byDayDataTable = data.map(
              ({ day, plannedHour, workedHour }) => ({
                day,
                scheduled_hours: plannedHour,
                clinican_hours: workedHour,
                util_rate: _.round((workedHour / plannedHour || 0) * 100),
              })
            );
            this.byDayData[0]["data"] = data.map(
              ({ workedHour, plannedHour }) =>
                _.round((workedHour / plannedHour || 0) * 100)
            );
            this.byDayLabels = data.map(
              ({ day, workedHour, plannedHour }) =>
                `${day}--${workedHour}--${plannedHour}`
            );

            this.isAllClinic =
              this.clinic_id.indexOf(",") >= 0 || Array.isArray(this.clinic_id);
            this.byTotal = Math.round(res.body.total);
            this.prevByDayTotal = Math.round(res.body.total_ta);
          }
        },
        error: (error) => {
          this.warningMessage = "Please Provide Valid Inputs!";
        },
      });
  }

  public showmulticlinicFta: boolean = false;
  public ftaLabels: any = [];
  public ftaLabels1: any = [];
  public ftaMulti: ChartDataset[] = [
    {
      data: [],
      label: "",
      backgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
      hoverBackgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
    },
  ];
  public ftaTotal;
  public ftaPrevTotal;
  public ftaTooltip = "up";
  public ftaGoal;
  public maxftaGoal: any = 0;

  public fdFtaRatioLoader: boolean;

  //Predictor Ratio :
  private fdFtaRatio() {
    if (this.duration) {
      this.fdFtaRatioLoader = true;
      this.ftaTotal = 0;

      this.showmulticlinicFta = false;
      this.clinic_id &&
        this.frontdeskService
          .fdFtaRatio(
            this.clinic_id,
            this.startDate,
            this.endDate,
            this.duration,
            this.queryWhEnabled
          )
          .subscribe({
            next: (res) => {
              this.ftaTotal = 0;
              this.ftaPrevTotal = 0;
              if (res.status == 200) {
                this.fdFtaRatioLoader = false;
                this.ftaMulti[0]["data"] = [];
                this.ftaLabels = [];
                this.ftaLabels1 = [];
                if (res.body.total > 0) {
                  res.body.data.forEach((item: any) => {
                    this.ftaLabels1.push(_.round(item.fta_ratio, 1));
                    this.ftaLabels.push(item.clinic_name);
                  });
                }
                if (
                  this.clinic_id.indexOf(",") >= 0 ||
                  Array.isArray(this.clinic_id)
                ) {
                  this.showmulticlinicFta = true;
                }
                this.ftaMulti[0]["data"] = this.ftaLabels1;

                if (res.body.total > 100) res.body.total = 100;
                if (res.body.total_ta > 100) res.body.total_ta = 100;
                this.ftaTotal = _.round(res.body.total, 1);
                this.ftaPrevTotal = _.round(res.body.total_ta, 1);
                this.ftaGoal = res.body.goals;
                if (this.ftaTotal > this.ftaGoal)
                  this.maxftaGoal = this.ftaTotal;
                else this.maxftaGoal = this.ftaGoal;
                if (this.maxftaGoal == 0) this.maxftaGoal = "";
                if (this.ftaTotal >= this.ftaPrevTotal)
                  this.ftaTooltip = "down";
              }
            },
            error: (error) => {
              this.warningMessage = "Please Provide Valid Inputs!";
            },
          });
    }
  }

  public showmulticlinicUta: boolean = false;
  public utaLabels: any = [];
  public utaLabels1: any = [];
  public utaMulti: ChartDataset[] = [
    {
      data: [],
      label: "",
      backgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
      hoverBackgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
    },
  ];
  public utaTotal;
  public utaPrevTotal;
  public utaTooltip = "up";
  public utaGoal;
  public fdUtaRatioLoader: boolean;
  public maxutaGoal: any = 0;
  //Predictor Ratio :
  private fdUtaRatio() {
    if (this.duration) {
      this.fdUtaRatioLoader = true;
      this.utaTotal = 0;
      this.showmulticlinicUta = false;
      // console.log(
      //   typeof this.clinic_id == 'object'
      //     ? this.clinic_id.join(',')
      //     : this.clinic_id
      // );

      this.frontdeskService
        .fdUtaRatio(
          this.clinic_id,
          this.startDate,
          this.endDate,
          this.duration,
          this.queryWhEnabled
        )
        .subscribe({
          next: (res) => {
            this.utaTotal = 0;
            this.utaPrevTotal = 0;
            if (res.status == 200) {
              this.fdUtaRatioLoader = false;
              this.utaMulti[0]["data"] = [];
              this.utaLabels = [];
              this.utaLabels1 = [];
              if (res.body.total > 0) {
                res.body.data.forEach((item: any) => {
                  this.utaLabels1.push(_.round(item.uta_ratio, 1));
                  this.utaLabels.push(item.clinic_name);
                });
              }
              if (
                this.clinic_id.indexOf(",") >= 0 ||
                Array.isArray(this.clinic_id)
              ) {
                this.showmulticlinicUta = true;
              }
              this.utaMulti[0]["data"] = this.utaLabels1;

              if (res.body.total > 100) res.body.total = 100;
              if (res.body.total_ta > 100) res.body.data_ta = 100;
              this.utaTotal = _.round(res.body.total, 1);
              this.utaPrevTotal = _.round(res.body.total_ta, 1);
              this.utaGoal = res.body.goals;
              if (this.utaTotal > this.utaGoal) this.maxutaGoal = this.utaTotal;
              else this.maxutaGoal = this.utaGoal;
              if (this.maxutaGoal == 0) this.maxutaGoal = "";
              if (this.utaTotal >= this.utaPrevTotal) this.utaTooltip = "down";
            }
          },
          error: (error) => {
            this.warningMessage = "Please Provide Valid Inputs!";
          },
        });
    }
  }

  public cancellationRatioMultiChartData: ChartDataset[] = [];
  public cancellationRatioMultiChartLabels: string[] = [];
  public cancellationRatioTotal: number = 0;
  public cancellationRatioPrevTotal: number = 0;
  public isLoadingCancellationRatioChartData: boolean = false;
  public isCancellationRatioMultiChartVisible: boolean = false;
  public cancellationRatioGoal: number = -1;
  public maxCancellationRatioGoal: number = 0;
  public cancellationRatioTooltip: string = "up";

  private getCancellationRatio() {
    const clinicIds: string =
      typeof this.clinic_id == "object"
        ? this.clinic_id.join(",")
        : this.clinic_id;
    if (this.duration) {
      this.isCancellationRatioMultiChartVisible = false;
      this.isLoadingCancellationRatioChartData = true;
      this.cancellationRatioTotal = 0;
      this.cancellationRatioPrevTotal = 0;
      this.frontdeskService
        .getCancellationRatio(
          clinicIds,
          this.startDate,
          this.endDate,
          this.duration,
          this.queryWhEnabled
        )
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            this.isLoadingCancellationRatioChartData = false;
            if (clinicIds.split(",").length > 1) {
              this.isCancellationRatioMultiChartVisible = true;
              this.cancellationRatioMultiChartLabels = res.data.map(
                (item) => item.clinic_name
              );
              this.cancellationRatioMultiChartData = Object.entries(
                _.chain(res.data)
                  .groupBy((item) => item.clinic_id)
                  .value()
              ).map(([, items]) => {
                const data: number[] = [];
                const colors: string[] = [];
                (<any>items).forEach((item, index) => {
                  data.push(_.round(parseFloat(item.cancel_ratio), 1));
                  colors.push(index % 2 == 1 ? "#119582" : "#ffb4b5");
                });
                return {
                  data,
                  backgroundColor: colors,
                  hoverBackgroundColor: colors,
                };
              });

              this.cancellationRatioGoal = res.goals;
            }

            this.cancellationRatioTotal = _.round(res.total, 1);
            this.cancellationRatioPrevTotal = _.round(res.total_ta, 1);
            this.maxCancellationRatioGoal =
              this.cancellationRatioTotal > this.cancellationRatioGoal
                ? this.cancellationRatioTotal
                : this.cancellationRatioGoal;
            this.cancellationRatioTooltip =
              this.cancellationRatioTotal >= this.cancellationRatioPrevTotal
                ? "down"
                : "up";
          },
          error: () => {
            this.warningMessage = "Please Provide Valid Inputs!";
          },
        });
    }
  }

  public ticksMulti: any[] = [
    {
      data: [],
      label: "",
      backgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
      hoverBackgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
    },
  ];
  public showmulticlinicticks: boolean = false;
  public ticksLabels: any = [];
  public ticksLabels1: any = [];
  public ticksTotal;
  public ticksPrevTotal;
  public ticksTooltip = "down";
  public fdNumberOfTicksLoader: boolean;

  //Predictor Ratio :
  private fdNumberOfTicks() {
    if (this.duration) {
      this.fdNumberOfTicksLoader = true;
      this.ticksPrevTotal = 0;
      this.showmulticlinicticks = false;
      var user_id;
      var clinic_id;
      this.clinic_id &&
        this.frontdeskService
          .fdNumberOfTicks(
            this.clinic_id,
            this.startDate,
            this.endDate,
            this.duration,
            this.queryWhEnabled
          )
          .subscribe({
            next: (res) => {
              this.ticksMulti[0]["data"] = [];
              this.ticksLabels = [];
              this.ticksLabels1 = [];
              if (res.status == 200) {
                this.fdNumberOfTicksLoader = false;
                if (
                  this.clinic_id.indexOf(",") >= 0 ||
                  Array.isArray(this.clinic_id)
                ) {
                  this.showmulticlinicticks = true;
                  if (res.body.total > 0 && res.body.data) {
                    res.body.data.sort((a, b) =>
                      a.num_ticks === b.num_ticks
                        ? 0
                        : a.num_ticks < b.num_ticks || -1
                    );
                    res.body.data.forEach((res) => {
                      if (res.clinic_id) {
                        this.ticksLabels1.push(Math.round(res.num_ticks));
                        this.ticksLabels.push(res.clinic_name);
                      }
                    });
                  }
                  this.ticksMulti[0]["data"] = this.ticksLabels1;
                }
                this.ticksPrevTotal = 0;
                this.ticksTotal = 0;
                if (res.body.data.length > 0)
                  this.ticksTotal = Math.round(res.body.total);
                this.ticksPrevTotal = Math.round(res.body.total_ta);
                if (this.ticksTotal >= this.ticksPrevTotal)
                  this.ticksTooltip = "up";
              }
            },
            error: (error) => {
              this.warningMessage = "Please Provide Valid Inputs!";
            },
          });
    }
  }

  public recallPrebookTotal;
  public recallPrebookGoal = 0;
  public recallPrebookPrevTotal;
  public recallPrebookTooltip = "down";
  public fdRecallPrebookRateLoader: boolean;
  public maxrecallPrebookGoal: any = 0;
  public fdPrebookRateMulti: any[] = [
    {
      data: [],
      label: "",
      backgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
      hoverBackgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
    },
  ];
  public showmulticlinicPrebook: boolean = false;
  public fdPrebookRateLabels: any = [];
  public fdPrebookRateTrnd: any = [];
  //Predictor Ratio :
  private fdRecallPrebookRate() {
    if (this.duration) {
      this.fdRecallPrebookRateLoader = true;
      this.recallPrebookTotal = 0;
      this.showmulticlinicPrebook = false;
      this.clinic_id &&
        this.frontdeskService
          .fdRecallPrebookRate(
            this.clinic_id,
            this.startDate,
            this.endDate,
            this.duration,
            this.queryWhEnabled
          )
          .subscribe({
            next: (res) => {
              if (res.status == 200) {
                this.fdPrebookRateMulti[0]["data"] = [];
                this.fdPrebookRateLabels = [];
                this.fdPrebookRateTrnd = [];
                this.fdRecallPrebookRateLoader = false;
                if (
                  this.clinic_id.indexOf(",") >= 0 ||
                  Array.isArray(this.clinic_id)
                ) {
                  this.showmulticlinicPrebook = true;
                  if (res.body.total > 0 && res.body.data) {
                    res.body.data.sort((a, b) =>
                      a.recall_patient === b.recall_patient
                        ? 0
                        : a.recall_patient < b.recall_patient || -1
                    );
                    res.body.data.forEach((res) => {
                      if (res.clinic_id) {
                        this.fdPrebookRateTrnd.push(
                          Math.round(
                            (res.recall_patient / res.total_patient) * 100
                          )
                        );
                        this.fdPrebookRateLabels.push(res.clinic_name);
                      }
                    });
                  }
                  this.fdPrebookRateMulti[0]["data"] = this.fdPrebookRateTrnd;
                }
                this.recallPrebookPrevTotal = 0;
                this.recallPrebookGoal = res.body.goals;
                this.recallPrebookTotal = 0;
                this.recallPrebookTotal = Math.round(res.body.total);
                this.recallPrebookPrevTotal = Math.round(res.body.total_ta);
                if (this.recallPrebookTotal >= this.recallPrebookPrevTotal)
                  this.recallPrebookTooltip = "up";
                this.maxrecallPrebookGoal = this.recallPrebookGoal;
                if (this.maxrecallPrebookGoal <= 0)
                  this.maxrecallPrebookGoal = this.recallPrebookTotal;
              }
            },
            error: (error) => {
              this.warningMessage = "Please Provide Valid Inputs!";
            },
          });
    }
  }

  public treatmentPrebookTotal;
  public treatmentPrebookGoal = 0;

  public treatmentPrebookPrevTotal;
  public treatmentPrebookTooltip = "down";
  public fdtreatmentPrebookRateLoader: boolean;
  public maxtreatmentPrebookGoal: any = 0;
  public fdReappointRateMulti: any[] = [
    {
      data: [],
      label: "",
      backgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
      hoverBackgroundColor: [
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
        "#119582",
        "#ffb4b5",
      ],
    },
  ];
  public showmulticlinicReappointRate: boolean = false;
  public fdReappointRateLabels: any = [];
  public fdReappointRateTrnd: any = [];
  //Predictor Ratio :
  private fdtreatmentPrebookRate() {
    if (this.duration) {
      this.fdtreatmentPrebookRateLoader = true;
      this.treatmentPrebookTotal = 0;
      this.showmulticlinicReappointRate = false;

      this.clinic_id &&
        this.frontdeskService
          .fdReappointRate(
            this.clinic_id,
            this.startDate,
            this.endDate,
            this.duration,
            this.queryWhEnabled
          )
          .subscribe({
            next: (res) => {
              if (res.status == 200) {
                this.fdtreatmentPrebookRateLoader = false;
                this.fdReappointRateMulti[0]["data"] = [];
                this.fdReappointRateLabels = [];
                this.fdReappointRateTrnd = [];
                if (res.body.total > 0) {
                  res.body.data.sort((a, b) =>
                    a.reappoint_rate === b.reappoint_rate
                      ? 0
                      : a.reappoint_rate < b.reappoint_rate || -1
                  );
                  res.body.data.forEach((res) => {
                    this.fdReappointRateTrnd.push(
                      Math.round(res.reappoint_rate)
                    );
                    this.fdReappointRateLabels.push(res.clinic_name);
                  });
                }
                if (
                  this.clinic_id.indexOf(",") >= 0 ||
                  Array.isArray(this.clinic_id)
                ) {
                  this.showmulticlinicReappointRate = true;
                }
                this.fdReappointRateMulti[0]["data"] = this.fdReappointRateTrnd;

                this.treatmentPrebookPrevTotal = 0;
                this.treatmentPrebookTotal = 0;
                this.treatmentPrebookGoal = res.body.goals;
                this.treatmentPrebookTotal = Math.round(res.body.total);
                this.treatmentPrebookPrevTotal = Math.round(res.body.total_ta);
                if (
                  this.treatmentPrebookTotal >= this.treatmentPrebookPrevTotal
                )
                  this.treatmentPrebookTooltip = "up";
                if (this.treatmentPrebookTotal > this.treatmentPrebookGoal)
                  this.maxtreatmentPrebookGoal = this.treatmentPrebookTotal;
                else this.maxtreatmentPrebookGoal = this.treatmentPrebookGoal;
                if (this.maxtreatmentPrebookGoal == 0)
                  this.maxtreatmentPrebookGoal = "";
              }
            },
            error: (error) => {
              this.warningMessage = "Please Provide Valid Inputs!";
            },
          });
    }
  }

  public currentText;

  // Filter By Date
  filterDate(duration) {
    this.isDisabled = true;
    $(".target_filter").removeClass("mat-button-toggle-checked");
    $(".target_off").addClass("mat-button-toggle-checked");
    this.showTrend = false;
    $(".customRange").css("display", "none");
    if (duration == "w") {
      this.showGoals = false;
      this.trendText = "Last Week";
      this.currentText = "This Week";
      const now = new Date();
      if (now.getDay() == 0) var day = 7;
      else var day = now.getDay();

      var first = now.getDate() - day + 1;
      var last = first + 6;
      this.startDate = this.datePipe.transform(
        new Date(now.setDate(first)).toUTCString(),
        "dd-MM-yyyy"
      );
      var end = new Date();
      end.setFullYear(now.getFullYear());
      end.setMonth(now.getMonth() + 1);
      end.setDate(last);
      this.endDate = this.datePipe.transform(
        new Date(end).toUTCString(),
        "dd-MM-yyyy"
      );
      this.duration = "w";
      this.DateDiffernce = "";
      this.loadDentist("all");
    } else if (duration == "m") {
      this.showGoals = true;
      this.trendText = "Last Month";
      this.currentText = "This Month";

      var date = new Date();
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth(), 1),
        "dd-MM-yyyy"
      );
      this.endDate = this.datePipe.transform(new Date(), "dd-MM-yyyy");
      this.duration = "m";
      this.DateDiffernce = "";
      this.loadDentist("all");
    } else if (duration == "lm") {
      this.showGoals = true;
      this.duration = "lm";
      this.trendText = "Previous Month";
      this.currentText = "Last Month";

      const date = new Date();
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth() - 1, 1),
        "dd-MM-yyyy"
      );
      this.endDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth(), 0),
        "dd-MM-yyyy"
      );
      this.DateDiffernce = "";
      this.loadDentist("all");
    } else if (duration == "q") {
      this.showGoals = false;
      this.trendText = "Last Quarter";
      this.currentText = "This Quarter";

      const now = new Date();
      var cmonth = now.getMonth() + 1;
      var cyear = now.getFullYear();
      if (cmonth >= 1 && cmonth <= 3) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 0, 1),
          "dd-MM-yyyy"
        );
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy')
      } else if (cmonth >= 4 && cmonth <= 6) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 3, 1),
          "dd-MM-yyyy"
        );
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'dd-MM-yyyy');
      } else if (cmonth >= 7 && cmonth <= 9) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 6, 1),
          "dd-MM-yyyy"
        );
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'dd-MM-yyyy');
      } else if (cmonth >= 10 && cmonth <= 12) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 9, 1),
          "dd-MM-yyyy"
        );
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 12, 0), 'dd-MM-yyyy');
      }
      this.duration = "q";
      this.DateDiffernce = "";
      this.endDate = this.datePipe.transform(new Date(), "dd-MM-yyyy");
      this.loadDentist("all");
    } else if (duration == "lq") {
      this.showGoals = false;
      this.trendText = "Previous Quarter";
      this.currentText = "Last Quarter";

      const now = new Date();
      var cmonth = now.getMonth() + 1;
      var cyear = now.getFullYear();

      if (cmonth >= 1 && cmonth <= 3) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear() - 1, 9, 1),
          "dd-MM-yyyy"
        );
        this.endDate = this.datePipe.transform(
          new Date(now.getFullYear() - 1, 12, 0),
          "dd-MM-yyyy"
        );
      } else if (cmonth >= 4 && cmonth <= 6) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 0, 1),
          "dd-MM-yyyy"
        );
        this.endDate = this.datePipe.transform(
          new Date(now.getFullYear(), 3, 0),
          "dd-MM-yyyy"
        );
      } else if (cmonth >= 7 && cmonth <= 9) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 3, 1),
          "dd-MM-yyyy"
        );
        this.endDate = this.datePipe.transform(
          new Date(now.getFullYear(), 6, 0),
          "dd-MM-yyyy"
        );
      } else if (cmonth >= 10 && cmonth <= 12) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 6, 1),
          "dd-MM-yyyy"
        );
        this.endDate = this.datePipe.transform(
          new Date(now.getFullYear(), 9, 0),
          "dd-MM-yyyy"
        );
      }
      this.duration = "lq";
      this.DateDiffernce = "";
      this.loadDentist("all");
    } else if (duration == "cytd") {
      this.showGoals = false;
      this.trendText = "Last Year";
      this.currentText = "This Year";
      this.duration = "cytd";
      var date = new Date();
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear(), 0, 1),
        "dd-MM-yyyy"
      );
      this.endDate = this.datePipe.transform(new Date(), "dd-MM-yyyy");
      this.DateDiffernce = "";
      this.loadDentist("all");
    } else if (duration == "lcytd") {
      this.showGoals = false;
      this.trendText = "Previous Year";
      this.currentText = "Last Year";
      this.duration = "lcytd";
      var date = new Date();
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear() - 1, 0, 1),
        "dd-MM-yyyy"
      );
      this.endDate = this.datePipe.transform(
        new Date(date.getFullYear() - 1, 11, 31),
        "dd-MM-yyyy"
      );
      this.DateDiffernce = "";
      this.loadDentist("all");
    } else if (duration == "fytd") {
      this.showGoals = false;
      this.duration = "fytd";
      this.trendText = "Last Financial Year";
      this.currentText = "This Financial Year";

      var date = new Date();
      if (date.getMonth() + 1 <= 6) {
        this.startDate = this.datePipe.transform(
          new Date(date.getFullYear() - 1, 6, 1),
          "dd-MM-yyyy"
        );
      } else {
        this.startDate = this.datePipe.transform(
          new Date(date.getFullYear(), 6, 1),
          "dd-MM-yyyy"
        );
      }
      this.endDate = this.datePipe.transform(new Date(), "dd-MM-yyyy");
      this.DateDiffernce = "";
      this.loadDentist("all");
    } else if (duration == "lfytd") {
      this.showGoals = false;
      this.trendText = "Previous Financial Year";
      this.currentText = "Last Financial Year";
      this.duration = "lfytd";
      var date = new Date();
      if (date.getMonth() + 1 <= 6) {
        this.startDate = this.datePipe.transform(
          new Date(date.getFullYear() - 2, 6, 1),
          "dd-MM-yyyy"
        );
      } else {
        this.startDate = this.datePipe.transform(
          new Date(date.getFullYear() - 1, 6, 1),
          "dd-MM-yyyy"
        );
      }
      if (date.getMonth() + 1 <= 6) {
        this.endDate = this.datePipe.transform(
          new Date(date.getFullYear() - 1, 5, 30),
          "dd-MM-yyyy"
        );
      } else {
        this.endDate = this.datePipe.transform(
          new Date(date.getFullYear(), 5, 30),
          "dd-MM-yyyy"
        );
      }
      /*       this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');       */
      this.DateDiffernce = "";
      this.loadDentist("all");
    } else if (duration == "custom") {
      this.trendText = "";
      this.currentText = "";
      this.duration = "custom";
      //  $('.customRange').css('display','block');
      let selectedDate = this.chartService.customSelectedDate$.value;
      if (selectedDate == null) {
        let newAppLayoutData: any = localStorage.getItem("layout");
        if (newAppLayoutData) {
          newAppLayoutData = JSON.parse(newAppLayoutData);
          if (newAppLayoutData.dateRange) {
            selectedDate = {
              startDate: moment(newAppLayoutData.dateRange.start).format(
                "YYYY-MM-DD"
              ),
              endDate: moment(newAppLayoutData.dateRange.end).format(
                "YYYY-MM-DD"
              ),
            };
          }
        }
      }
      this.startDate = this.datePipe.transform(
        selectedDate.startDate,
        "dd-MM-yyyy"
      );
      this.endDate = this.datePipe.transform(
        selectedDate.endDate,
        "dd-MM-yyyy"
      );
      var selectedMonth = this.datePipe.transform(selectedDate.startDate, "M");
      var selectedYear = this.datePipe.transform(
        selectedDate.startDate,
        "yyyy"
      );
      var selectedStartDate = this.datePipe.transform(
        selectedDate.startDate,
        "d"
      );
      var selectedEndDate = this.datePipe.transform(selectedDate.endDate, "d");
      var LastDay = new Date(
        parseInt(selectedYear),
        parseInt(selectedMonth),
        0
      ).getDate();
      if (
        parseInt(selectedStartDate) == 1 &&
        parseInt(selectedEndDate) == LastDay
      ) {
        this.showGoals = true;
      } else {
        this.showGoals = false;
      }

      var date1: any = new Date(selectedDate.startDate);
      var date2: any = new Date(selectedDate.endDate);
      var diffTime: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
      if (diffTime > 365) {
        this.DateDiffernce = diffTime;
      } else {
        this.DateDiffernce = "";
      }

      this.loadDentist("all");
    }
    $(".filter").removeClass("active");
    $(".filter_" + duration).addClass("active");
    // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
  }

  choosedDate(val) {
    val = val.chosenLabel;
    var val = val.toString().split(" - ");
    // calculating date differnce
    var date2: any = new Date(val[1]);
    var date1: any = new Date(val[0]);
    var diffTime: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    if (diffTime > 365) {
      this.DateDiffernce = diffTime;
    } else {
      this.DateDiffernce = "";
    }
    this.startDate = this.datePipe.transform(val[0], "dd-MM-yyyy");
    this.endDate = this.datePipe.transform(val[1], "dd-MM-yyyy");
    this.duration = "custom";
    this.loadDentist("all");

    // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
    $(".customRange").css("display", "none");
  }
  toggleFilter(val) {
    $(".target_filter").removeClass("mat-button-toggle-checked");
    $(".target_" + val).addClass("mat-button-toggle-checked");
    $(".filter").removeClass("active");
    this.Apirequest = 0;
    if (val == "current") {
      this.toggleChecked = true;
      this.trendValue = "c";
      this.stackedChartOptionssWT.plugins.annotation = undefined;
      this.toggleChangeProcess();
    } else if (val == "historic") {
      this.toggleChecked = true;
      this.trendValue = "h";
      this.stackedChartOptionssWT.plugins.annotation = undefined;
      this.toggleChangeProcess();
    } else if (val == "off") {
      if (this.goalchecked == "average") {
        this.stackedChartOptionssWT.plugins.annotation = {
          annotations: [
            {
              type: "line",
              // mode: 'horizontal',
              scaleID: "y-axis-0",
              yMax: this.workTimeTotal,
              yMin: this.workTimeTotal,
              borderColor: "red",
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
          ],
        };
      } else if (this.goalchecked == "goal") {
        this.stackedChartOptionssWT.plugins.annotation = {
          annotations: [
            {
              type: "line",
              // mode: 'horizontal',
              scaleID: "y-axis-0",
              yMax: this.workTimeGoal,
              yMin: this.workTimeGoal,
              borderColor: "red",
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
          ],
        };
      }
      this.filterDate("m");
      this.showTrend = false;
    }
  }
  private getClinics() {
    this.headerService.getClinic.subscribe(
      (res) => {
        if (res.status == 200) {
          this.clinicsData = res.body.data;
        }
      },
      (error) => {
        // this.warningMessage = "Please Provide Valid Inputs!";
      }
    );
  }
  initiate_dentist() {
    var val = $(".internal_dentist").val();
    if (this.clinic_id.indexOf(",") >= 0 || Array.isArray(this.clinic_id)) {
      //this.loadDentist(val);
    } else {
      this.loadDentist(val);
    }
  }
  toggleChecked = false;
  trendValue = "";
  isDisabled = true;
  isChecked = true;
  mode = "Internal";
  showTrend: boolean = false;
  toggleChangeProcess() {
    this.Apirequest = 6;
    this.showTrend = true;
    this.fdwtaRatioTrend();
    this.fdRecallPrebookRateTrend();
    this.fdTreatmentPrebookRateTrend();
    this.fdNumberOfTicksTrend();
    this.fdFtaRatioTrend();
    interval(400)
      .pipe(take(1))
      .subscribe(() => {
        if (this.isCancellationRatioContainerVisible) {
          this.getCancellationRatioTrend();
        } else if (this.isUtaRatioContainerVisible) {
          this.fdUtaRatioTrend();
        }
      });
  }

  public ftaChartTrend: any[] = [
    {
      data: [],
      label: "",
      shadowOffsetX: 3,
      shadowOffsetY: 2,
      shadowBlur: 3,
      shadowColor: "rgba(0, 0, 0, 0.3)",
      pointBevelWidth: 2,
      pointBevelHighlightColor: "rgba(255, 255, 255, 0.75)",
      pointBevelShadowColor: "rgba(0, 0, 0, 0.3)",
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: "rgba(0, 0, 0, 0.3)",
      backgroundOverlayMode: "multiply",
    },
  ];
  public ftaChartTrend1 = [];
  public ftaChartTrendLabels = [];
  public ftaChartTrendLabels1 = [];
  public fdFtaRatioTrendLoader: boolean;
  public ftaChartTrendMulti: any[] = [{ data: [], label: "" }];
  public ftaTrendMultiLabels = [];
  public showByclinicfta: boolean = false;
  private fdFtaRatioTrend() {
    this.fdFtaRatioTrendLoader = true;
    this.ftaChartTrendLabels = [];
    this.ftaChartTrendLabels1 = [];
    this.ftaChartTrend1 = [];
    this.showByclinicfta = false;
    this.ftaChartTrendMulti = [];
    this.ftaTrendMultiLabels = [];

    this.clinic_id &&
      this.frontdeskService
        .fdFtaRatioTrend(this.clinic_id, this.trendValue, this.queryWhEnabled)
        .subscribe({
          next: (res) => {
            this.fdFtaRatioTrendLoader = false;
            this.ftaChartTrendLabels1 = [];
            this.ftaChartTrend1 = [];
            this.Apirequest = this.Apirequest - 1;
            if (res.status == 200) {
              this.ftaChartTrendMulti[0] = { data: [], label: "" };
              if (
                this.clinic_id.indexOf(",") >= 0 ||
                Array.isArray(this.clinic_id)
              ) {
                this.showByclinicfta = true;
                const data = _.chain(res.body.data)
                  .groupBy(this.trendValue == "c" ? "year_month" : "year")
                  .map((items: any[], duration) => {
                    const totalFta = _.chain(items)
                      .sumBy((item) => Number(item.total_fta))
                      .value();
                    const totalAppts = _.chain(items)
                      .sumBy((item) => Number(item.total_appts))
                      .value();
                    return {
                      duration:
                        this.trendValue == "c"
                          ? this.datePipe.transform(duration, "MMM y")
                          : duration,
                      fta_ratio: _.round((totalFta / totalAppts || 0) * 100, 1),
                    };
                  })
                  .value();
                this.ftaChartTrendMulti[0]["data"] = data.map(
                  (item) => item.fta_ratio
                );
                this.ftaChartTrendMulti[0]["backgroundColor"] =
                  this.doughnutChartColors[0];

                this.ftaTrendMultiLabels = data.map((item) => item.duration);
              } else {
                res.body.data.forEach((res) => {
                  if (res.val > 100) res.val = 100;
                  this.ftaChartTrend1.push(_.round(res.fta_ratio, 1));
                  if (this.trendValue == "c")
                    this.ftaChartTrendLabels1.push(
                      this.datePipe.transform(res.year_month, "MMM y")
                    );
                  else this.ftaChartTrendLabels1.push(res.year);
                });
                this.ftaChartTrend[0]["data"] = this.ftaChartTrend1;
                this.ftaChartTrendLabels = this.ftaChartTrendLabels1;
              }
            }
          },
          error: (error) => {
            this.warningMessage = "Please Provide Valid Inputs!";
          },
        });
  }

  public wtaChartTrend: any[] = [
    {
      data: [],
      label: "",
      order: 2,
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
      ],
      shadowOffsetX: 3,
      shadowOffsetY: 2,
      shadowBlur: 3,
      shadowColor: "rgba(0, 0, 0, 0.3)",
      pointBevelWidth: 2,
      pointBevelHighlightColor: "rgba(255, 255, 255, 0.75)",
      pointBevelShadowColor: "rgba(0, 0, 0, 0.3)",
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: "rgba(0, 0, 0, 0.3)",
      backgroundOverlayMode: "multiply",
    },
    {
      data: [],
      label: "",
      shadowOffsetX: 3,
      backgroundColor: "rgba(255, 0, 128, 1)",
      order: 1,
    },
  ];
  public wtaChartTrend1 = [];
  public wtaChartTrendLabels = [];
  public wtaChartTrendLabels1 = [];
  public fdwtaRatioTrendLoader: boolean;
  public targetData = [];
  public uRChartTrendMulti: any[] = [{ data: [], label: "" }];
  public uRChartTrendMultiLabels = [];
  public showByclinicUR: boolean = false;

  private fdwtaRatioTrend() {
    this.fdwtaRatioTrendLoader = true;
    this.wtaChartTrendLabels = [];
    this.wtaChartTrendLabels1 = [];
    this.wtaChartTrend1 = [];
    this.targetData = [];
    this.showByclinicUR = false;
    this.uRChartTrendMulti = [];
    this.uRChartTrendMultiLabels = [];
    if (this.trendValue == "h") {
      // utilisation rate showing messageif more than 12 months
      this.utilityratemessage = true;
      this.Apirequest = this.Apirequest - 1;
      this.fdwtaRatioTrendLoader = false;
    } else {
      this.utilityratemessage = false;
      this.clinic_id &&
        this.frontdeskService
          .fdWorkTimeAnalysisTrend(
            this.clinic_id,
            this.trendValue,
            this.queryWhEnabled
          )
          .subscribe({
            next: (res) => {
              this.wtaChartTrendLabels1 = [];
              this.wtaChartTrend1 = [];
              this.Apirequest = this.Apirequest - 1;
              if (res.status == 200) {
                this.uRChartTrendMulti[0] = { data: [], label: "" };
                res.body.data.sort((a, b) =>
                  a.duration === b.duration ? 0 : a.duration > b.duration || -1
                );
                if (
                  this.clinic_id.indexOf(",") >= 0 ||
                  Array.isArray(this.clinic_id)
                ) {
                  this.showByclinicUR = true;
                }
                this.fdwtaRatioTrendLoader = false;
                if (
                  this.clinic_id.indexOf(",") >= 0 ||
                  Array.isArray(this.clinic_id)
                ) {
                  const data = _.chain(res.body.data)
                    .groupBy("year_month")
                    .map((items: any[], duration: string) => {
                      const plannedHour = _.chain(items)
                        .sumBy((item) => Number(item.planned_hour))
                        .value();
                      const workedHour = _.chain(items)
                        .sumBy((item) => Number(item.worked_hour))
                        .value();
                      return {
                        duration,
                        util_rate: _.round((workedHour / plannedHour) * 100, 0),
                      };
                    })
                    .value();
                  this.uRChartTrendMultiLabels = data.map((item) =>
                    this.datePipe.transform(item.duration, "MMM y")
                  );
                  this.uRChartTrendMulti[0]["data"] = data.map(
                    (item) => item.util_rate
                  );
                  this.uRChartTrendMulti[0]["backgroundColor"] =
                    this.doughnutChartColors[0];
                } else {
                  res.body.data.forEach((res) => {
                    this.wtaChartTrend1.push(Math.round(res.util_rate * 100));
                    if (
                      res.goals == -1 ||
                      res.goals == null ||
                      res.goals == ""
                    ) {
                      this.targetData.push(null);
                    } else {
                      this.targetData.push(res.goals);
                    }
                    if (this.trendValue == "c")
                      this.wtaChartTrendLabels1.push(
                        this.datePipe.transform(res.year_month, "MMM y") +
                          "--" +
                          res.worked_hour +
                          "--" +
                          res.planned_hour
                      );
                    else
                      this.wtaChartTrendLabels1.push(
                        res.year +
                          "--" +
                          res.worked_hour +
                          "--" +
                          res.planned_hour
                      );
                  });

                  var mappedtargetData = [];
                  this.targetData.map(function (v) {
                    if (v == null) {
                      mappedtargetData.push([v - 0, v + 0]);
                    } else {
                      mappedtargetData.push([v - 0.5, v + 0.5]);
                    }
                  });
                  if (this.trendValue == "c") {
                    this.wtaChartTrend[0]["label"] = "Actual";
                    this.wtaChartTrend[1]["label"] = "Target";
                    this.wtaChartTrend[1]["data"] = mappedtargetData;
                  } else {
                    this.wtaChartTrend[0]["label"] = "";
                    this.wtaChartTrend[1]["label"] = "";
                    this.wtaChartTrend[1]["data"] = [];
                  }
                  this.wtaChartTrend[0]["data"] = this.wtaChartTrend1;

                  this.wtaChartTrendLabels = this.wtaChartTrendLabels1;
                }
              }
            },
            error: (error) => {
              this.warningMessage = "Please Provide Valid Inputs!";
            },
          });
    }
  }

  public utaChartTrend: any[] = [
    {
      data: [],
      label: "",
      shadowOffsetX: 3,
      shadowOffsetY: 2,
      shadowBlur: 3,
      shadowColor: "rgba(0, 0, 0, 0.3)",
      pointBevelWidth: 2,
      pointBevelHighlightColor: "rgba(255, 255, 255, 0.75)",
      pointBevelShadowColor: "rgba(0, 0, 0, 0.3)",
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: "rgba(0, 0, 0, 0.3)",
      backgroundOverlayMode: "multiply",
    },
  ];
  public utaChartTrend1 = [];
  public utaChartTrendLabels = [];
  public utaChartTrendLabels1 = [];
  public fdUtaRatioTrendLoader: boolean;
  public utaChartTrendMulti: any[] = [{ data: [], label: "" }];
  public utaTrendMultiLabels = [];
  public showByclinicUta: boolean = false;
  private fdUtaRatioTrend() {
    this.fdUtaRatioTrendLoader = true;
    this.utaChartTrendLabels1 = [];
    this.utaChartTrendLabels = [];
    this.utaChartTrend1 = [];
    this.showByclinicUta = false;
    this.utaChartTrendMulti = [];
    this.utaTrendMultiLabels = [];

    this.frontdeskService
      .fdUtaRatioTrend(this.clinic_id, this.trendValue, this.queryWhEnabled)
      .subscribe({
        next: (res) => {
          this.utaChartTrendLabels1 = [];
          this.utaChartTrend1 = [];
          this.Apirequest = this.Apirequest - 1;
          if (res.status == 200) {
            this.utaChartTrendMulti[0] = { data: [], label: "" };
            res.body.data.sort((a, b) =>
              a.duration === b.duration ? 0 : a.duration > b.duration || -1
            );
            this.fdUtaRatioTrendLoader = false;
            if (
              this.clinic_id.indexOf(",") >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.showByclinicUta = true;
              const data = _.chain(res.body.data)
                .groupBy(this.trendValue == "c" ? "year_month" : "year")
                .map((items: any[], duration: string) => {
                  const totalUta = _.chain(items)
                    .sumBy((item) => Number(item.total_uta))
                    .value();
                  const totalAppts = _.chain(items)
                    .sumBy((item) => Number(item.total_appts))
                    .value();
                  return {
                    duration:
                      this.trendValue == "c"
                        ? this.datePipe.transform(duration, "MMM y")
                        : duration,
                    uta_ratio: _.round((totalUta / totalAppts || 0) * 100, 1),
                  };
                })
                .value();
              this.utaChartTrendMulti[0]["data"] = data.map(
                (item) => item.uta_ratio
              );
              this.utaChartTrendMulti[0]["backgroundColor"] =
                this.doughnutChartColors[0];
              this.utaTrendMultiLabels = data.map((item) => item.duration);
            } else {
              res.body.data.forEach((res) => {
                if (res.val > 100) res.val = 100;
                this.utaChartTrend1.push(_.round(res.uta_ratio, 1));
                if (this.trendValue == "c")
                  this.utaChartTrendLabels1.push(
                    this.datePipe.transform(res.year_month, "MMM y")
                  );
                else this.utaChartTrendLabels1.push(res.year);
              });
              this.utaChartTrend[0]["data"] = this.utaChartTrend1;

              this.utaChartTrendLabels = this.utaChartTrendLabels1;
            }
          }
        },
        error: (error) => {
          this.warningMessage = "Please Provide Valid Inputs!";
        },
      });
  }

  public isLoadingCancellationRatioTrendChartData: boolean = false;
  public isCancellationRatioTrendMultiChartVisible: boolean = false;
  public cancellationRatioTrendChartLabels: string[] = [];
  public cancellationRatioTrendChartData: ChartDataset[] = [];

  private getCancellationRatioTrend() {
    this.isLoadingCancellationRatioTrendChartData = true;
    this.cancellationRatioTrendChartLabels = [];
    this.isCancellationRatioTrendMultiChartVisible = false;
    this.cancellationRatioTrendChartData = [];

    const clinicIds: string =
      typeof this.clinic_id == "object"
        ? this.clinic_id.join(",")
        : this.clinic_id;

    this.frontdeskService
      .getCancellationRatioTrend(
        clinicIds,
        this.trendValue,
        this.queryWhEnabled
      )
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.isLoadingCancellationRatioTrendChartData = false;
          if (clinicIds.split(",").length > 1) {
            this.isCancellationRatioTrendMultiChartVisible = true;
            const data = _.chain(res.data)
              .groupBy(this.trendValue == "c" ? "year_month" : "year")
              .map((items: CancellationRatio[], duration: string) => {
                const totalCancellation = _.chain(items)
                  .sumBy((item) => Number(item.total_cancel))
                  .value();
                const totalAppts = _.chain(items)
                  .sumBy((item) => Number(item.total_appts))
                  .value();
                return {
                  duration:
                    this.trendValue == "c"
                      ? this.datePipe.transform(duration, "MMM y")
                      : duration,
                  cancel_ratio: _.round(
                    (totalCancellation / totalAppts || 0) * 100,
                    1
                  ),
                };
              })
              .value();
            this.cancellationRatioTrendChartData = [
              {
                data: data.map((item) => item.cancel_ratio),
                backgroundColor: this.doughnutChartColors[0],
              },
            ];
            this.cancellationRatioTrendChartLabels = data.map(
              (item) => item.duration
            );
          } else {
            this.cancellationRatioTrendChartData = [
              {
                data: res.data.map((item) =>
                  _.round(parseFloat(item.cancel_ratio), 1)
                ),
              },
            ];
            this.cancellationRatioTrendChartLabels = res.data.map((item) =>
              this.trendValue == "c"
                ? this.datePipe.transform(item.year_month, "MMM y")
                : item.year
            );
          }
        },
        error: () => {
          this.warningMessage = "Please Provide Valid Inputs!";
        },
      });
  }

  public tickChartTrend: any[] = [
    {
      data: [],
      label: "",
      shadowOffsetX: 3,
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
      ],
      shadowOffsetY: 2,
      shadowBlur: 3,
      shadowColor: "rgba(0, 0, 0, 0.3)",
      pointBevelWidth: 2,
      pointBevelHighlightColor: "rgba(255, 255, 255, 0.75)",
      pointBevelShadowColor: "rgba(0, 0, 0, 0.3)",
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: "rgba(0, 0, 0, 0.3)",
      backgroundOverlayMode: "multiply",
    },
  ];
  public tickChartTrend1 = [];
  public tickChartTrendLabels = [];
  public tickChartTrendLabels1 = [];
  public fdNumberOfTicksTrendLoader: boolean;
  public ticChartTrendMulti: any[] = [{ data: [], label: "" }];
  public ticChartTrendMultiLabels = [];
  public ticPChartTrendMultiLabels1 = [];
  public showByclinictic: boolean = false;
  private fdNumberOfTicksTrend() {
    this.fdNumberOfTicksTrendLoader = true;
    this.tickChartTrendLabels = [];
    this.tickChartTrendLabels1 = [];
    this.tickChartTrend1 = [];
    this.showByclinictic = false;
    this.ticChartTrendMulti = [];
    this.ticChartTrendMultiLabels = [];
    this.ticPChartTrendMultiLabels1 = [];
    this.clinic_id &&
      this.frontdeskService
        .fdNumberOfTicksTrend(
          this.clinic_id,
          this.trendValue,
          this.queryWhEnabled
        )
        .subscribe({
          next: (res) => {
            this.tickChartTrendLabels1 = [];
            this.tickChartTrend1 = [];
            this.Apirequest = this.Apirequest - 1;
            if (res.status == 200) {
              this.fdNumberOfTicksTrendLoader = false;
              if (
                this.clinic_id.indexOf(",") >= 0 ||
                Array.isArray(this.clinic_id)
              ) {
                this.showByclinictic = true;
                this.ticChartTrendMultiLabels = _.chain(res.body.data)
                  .groupBy(this.trendValue == "c" ? "year_month" : "year")
                  .map((items, duration) => duration)
                  .value()
                  .map((item) =>
                    this.trendValue == "c"
                      ? this.datePipe.transform(item, "MMM y")
                      : item
                  );
                this.ticChartTrendMulti = _.chain(res.body.data)
                  .groupBy("clinic_id")
                  .map((items: any[]) => {
                    const clinicName = items[0].clinic_name;
                    return {
                      label: clinicName,
                      data: items.map((item) => Number(item.num_ticks)),
                    };
                  })
                  .value()
                  .map((item, index: number) => ({
                    ...item,
                    backgroundColor: this.doughnutChartColors[index],
                    hoverBackgroundColor: this.doughnutChartColors[index],
                  }));
              } else {
                res.body.data.forEach((res) => {
                  this.tickChartTrend1.push(res.num_ticks);
                  if (this.trendValue == "c")
                    this.tickChartTrendLabels1.push(
                      this.datePipe.transform(res.year_month, "MMM y")
                    );
                  else this.tickChartTrendLabels1.push(res.year);
                });
                this.tickChartTrend[0]["data"] = this.tickChartTrend1;

                this.tickChartTrendLabels = this.tickChartTrendLabels1;
              }
            }
          },
          error: (error) => {
            this.warningMessage = "Please Provide Valid Inputs!";
          },
        });
  }

  public recallPrebookChartTrend: any[] = [
    {
      data: [],
      label: "",
      shadowOffsetX: 3,
      order: 2,
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
      ],
      shadowOffsetY: 2,
      shadowBlur: 3,
      shadowColor: "rgba(0, 0, 0, 0.3)",
      pointBevelWidth: 2,
      pointBevelHighlightColor: "rgba(255, 255, 255, 0.75)",
      pointBevelShadowColor: "rgba(0, 0, 0, 0.3)",
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: "rgba(0, 0, 0, 0.3)",
      backgroundOverlayMode: "multiply",
    },
    {
      data: [],
      label: "",
      shadowOffsetX: 3,
      backgroundColor: "rgba(255, 0, 128, 1)",
      order: 1,
    },
  ];
  public recallPrebookChartTrend1 = [];
  public recallPrebookChartTrendLabels = [];
  public recallPrebookChartTrendLabels1 = [];
  public fdRecallPrebookRateTrendLoader: boolean;
  public fdRecallPrebookRatetargetData = [];

  public rPChartTrendMulti: any[] = [{ data: [], label: "" }];
  public rPChartTrendMultiLabels = [];
  public rPChartTrendMultiLabels1 = [];
  public showByclinicRP: boolean = false;

  private fdRecallPrebookRateTrend() {
    this.fdRecallPrebookRateTrendLoader = true;
    this.recallPrebookChartTrendLabels = [];
    this.recallPrebookChartTrendLabels1 = [];
    this.recallPrebookChartTrend1 = [];
    this.fdRecallPrebookRatetargetData = [];
    this.showByclinicRP = false;
    this.rPChartTrendMulti = [];
    this.rPChartTrendMultiLabels = [];
    this.rPChartTrendMultiLabels1 = [];
    this.clinic_id &&
      this.frontdeskService
        .frontdeskdRecallPrebookRateTrend(
          this.clinic_id,
          this.trendValue,
          this.queryWhEnabled
        )
        .subscribe({
          next: (res) => {
            this.Apirequest = this.Apirequest - 1;
            if (res.status == 200) {
              this.rPChartTrendMulti[0] = { data: [], label: "" };
              res.body.data.sort((a, b) =>
                a.duration === b.duration ? 0 : a.duration > b.duration || -1
              );
              if (
                this.clinic_id.indexOf(",") >= 0 ||
                Array.isArray(this.clinic_id)
              ) {
                this.showByclinicRP = true;
              }
              this.fdRecallPrebookRateTrendLoader = false;
              if (
                this.clinic_id.indexOf(",") >= 0 ||
                Array.isArray(this.clinic_id)
              ) {
                const data = _.chain(res.body.data)
                  .groupBy(this.trendValue == "c" ? "year_month" : "year")
                  .map((items: any[], duration) => {
                    const totalPatient = _.chain(items)
                      .sumBy((item) => Number(item.total_patient))
                      .value();
                    const recallPatient = _.chain(items)
                      .sumBy((item) => Number(item.recall_patient))
                      .value();
                    return {
                      duration,
                      recall_percent: _.round(
                        (recallPatient / totalPatient) * 100,
                        0
                      ),
                    };
                  })
                  .value();
                this.rPChartTrendMulti[0]["data"] = data.map(
                  (item) => item.recall_percent
                );
                this.rPChartTrendMulti[0]["backgroundColor"] =
                  this.doughnutChartColors[0];
                this.rPChartTrendMultiLabels = data.map((item) =>
                  this.trendValue == "c"
                    ? this.datePipe.transform(item.duration, "MMM y")
                    : item.duration
                );
              } else {
                this.recallPrebookChartTrendLabels1 = [];
                this.recallPrebookChartTrend1 = [];
                res.body.data.forEach((res) => {
                  if (res.recall_percent > 0)
                    this.recallPrebookChartTrend1.push(
                      Math.round(res.recall_percent)
                    );
                  if (res.goals == -1 || res.goals == null || res.goals == "") {
                    this.fdRecallPrebookRatetargetData.push(null);
                  } else {
                    this.fdRecallPrebookRatetargetData.push(res.goals);
                  }
                  if (this.trendValue == "c")
                    this.recallPrebookChartTrendLabels1.push(
                      this.datePipe.transform(res.year_month, "MMM y")
                    );
                  else this.recallPrebookChartTrendLabels1.push(res.year);
                });

                var mappedfdRecallPrebookRatetargetData = [];
                this.fdRecallPrebookRatetargetData.map(function (v) {
                  if (v == null) {
                    mappedfdRecallPrebookRatetargetData.push([v - 0, v + 0]);
                  } else {
                    mappedfdRecallPrebookRatetargetData.push([
                      v - 0.5,
                      v + 0.5,
                    ]);
                  }
                });
                if (this.trendValue == "c") {
                  this.recallPrebookChartTrend[0]["label"] = "Actual";
                  this.recallPrebookChartTrend[1]["label"] = "Target";
                  this.recallPrebookChartTrend[1]["data"] =
                    mappedfdRecallPrebookRatetargetData;
                } else {
                  this.recallPrebookChartTrend[0]["label"] = "";
                  this.recallPrebookChartTrend[1]["label"] = "";
                  this.recallPrebookChartTrend[1]["data"] = [];
                }
                this.recallPrebookChartTrend[0]["data"] =
                  this.recallPrebookChartTrend1;

                this.recallPrebookChartTrendLabels =
                  this.recallPrebookChartTrendLabels1;
              }
            }
          },
          error: (error) => {
            this.warningMessage = "Please Provide Valid Inputs!";
          },
        });
  }

  public treatmentPrebookChartTrend: any[] = [
    {
      data: [],
      label: "",
      shadowOffsetX: 3,
      order: 2,
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
      ],
      shadowOffsetY: 2,
      shadowBlur: 3,
      shadowColor: "rgba(0, 0, 0, 0.3)",
      pointBevelWidth: 2,
      pointBevelHighlightColor: "rgba(255, 255, 255, 0.75)",
      pointBevelShadowColor: "rgba(0, 0, 0, 0.3)",
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: "rgba(0, 0, 0, 0.3)",
      backgroundOverlayMode: "multiply",
    },
    {
      data: [],
      label: "",
      shadowOffsetX: 3,
      backgroundColor: "rgba(255, 0, 128, 1)",
      order: 1,
    },
  ];
  public treatmentPrebookChartTrend1 = [];
  public treatmentPrebookChartTrendLabels = [];
  public treatmentPrebookChartTrendLabels1 = [];
  public fdTreatmentPrebookRateTrendLoader: boolean = false;
  public fdTreatmentPrebookRatetargetData = [];
  public tPChartTrendMulti: any[] = [{ data: [], label: "" }];
  public tPChartTrendMultiLabels = [];

  public showByclinic: boolean = false;
  private fdTreatmentPrebookRateTrend() {
    this.fdTreatmentPrebookRateTrendLoader = true;
    this.treatmentPrebookChartTrendLabels1 = [];
    this.treatmentPrebookChartTrendLabels = [];

    this.treatmentPrebookChartTrend1 = [];
    this.fdTreatmentPrebookRatetargetData = [];
    this.showByclinic = false;
    this.tPChartTrendMulti = [];
    this.tPChartTrendMultiLabels = [];

    this.clinic_id &&
      this.frontdeskService
        .fdReappointRateTrend(
          this.clinic_id,
          this.trendValue,
          this.queryWhEnabled
        )
        .subscribe({
          next: (res) => {
            this.Apirequest = this.Apirequest - 1;
            if (res.status == 200) {
              this.tPChartTrendMulti[0] = { data: [], label: "" };
              this.fdTreatmentPrebookRateTrendLoader = false;
              if (
                this.clinic_id.indexOf(",") >= 0 ||
                Array.isArray(this.clinic_id)
              ) {
                this.showByclinic = true;
                const data = _.chain(res.body.data)
                  .groupBy(this.trendValue == "c" ? "year_month" : "year")
                  .map((items: any[], duration: string) => {
                    const totalAppts = _.chain(items)
                      .sumBy((item) => Number(item.total_appts))
                      .value();
                    const reappointments = _.chain(items)
                      .sumBy((item) => Number(item.reappointments))
                      .value();
                    return {
                      duration,
                      reappoint_rate: _.round(
                        (reappointments / totalAppts || 0) * 100
                      ),
                    };
                  })
                  .value();
                this.tPChartTrendMulti[0]["data"] = data.map(
                  (item) => item.reappoint_rate
                );
                this.tPChartTrendMulti[0]["backgroundColor"] =
                  this.doughnutChartColors[0];
                this.tPChartTrendMultiLabels = data.map((item) =>
                  this.trendValue == "c"
                    ? this.datePipe.transform(item.duration, "MMM y")
                    : item.duration
                );
                // res.body.data.forEach((res) => {
                //   let reappointSum = 0;
                //   res.val.forEach((reslt, key) => {
                //     reappointSum += Math.round(reslt.reappoint_rate);
                //     // if (typeof (this.tPChartTrendMulti[key]) == 'undefined') {
                //     //   this.tPChartTrendMulti[key] = { data: [], label: '' };
                //     // }
                //     // if (typeof (this.tPChartTrendMulti[key]['data']) == 'undefined') {
                //     //   this.tPChartTrendMulti[key]['data'] = [];
                //     // }

                //     //   this.tPChartTrendMulti[key]['data'].push(Math.round(reslt.reappoint_rate));
                //     //   this.tPChartTrendMulti[key]['label'] = reslt.clinic_name;
                //     //   this.tPChartTrendMulti[key]['backgroundColor'] = this.doughnutChartColors[key];
                //     //   this.tPChartTrendMulti[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];
                //   });
                //   // this.tPChartTrendMulti[0]['data'].push(Math.round(((reappointSum / res.val.length) + Number.EPSILON) * 100) / 100);
                //   this.tPChartTrendMulti[0]['data'].push(
                //     reappointSum / res.val.length
                //   );
                //   this.tPChartTrendMulti[0]['backgroundColor'] =
                //     this.doughnutChartColors[0];
                //   if (this.trendValue == 'c')
                //     this.tPChartTrendMultiLabels1.push(
                //       this.datePipe.transform(res.duration, 'MMM y')
                //     );
                //   else this.tPChartTrendMultiLabels1.push(res.duration);
                // });
                // this.tPChartTrendMultiLabels = this.tPChartTrendMultiLabels1;
              } else {
                this.treatmentPrebookChartTrendLabels1 = [];
                this.treatmentPrebookChartTrend1 = [];
                res.body.data.forEach((res) => {
                  this.treatmentPrebookChartTrend1.push(
                    Math.round(res.reappoint_rate)
                  );
                  if (res.goals == -1 || res.goals == null || res.goals == "") {
                    this.fdTreatmentPrebookRatetargetData.push(null);
                  } else {
                    this.fdTreatmentPrebookRatetargetData.push(res.goals);
                  }
                  if (this.trendValue == "c")
                    this.treatmentPrebookChartTrendLabels1.push(
                      this.datePipe.transform(res.year_month, "MMM y")
                    );
                  else this.treatmentPrebookChartTrendLabels1.push(res.year);
                });
                var mappedtargetDataPrebookRatetargetData = [];
                this.fdTreatmentPrebookRatetargetData.map(function (v) {
                  if (v == null) {
                    mappedtargetDataPrebookRatetargetData.push([v - 0, v + 0]);
                  } else {
                    mappedtargetDataPrebookRatetargetData.push([
                      v - 0.5,
                      v + 0.5,
                    ]);
                  }
                });
                if (this.trendValue == "c") {
                  this.treatmentPrebookChartTrend[0]["label"] = "Actual";
                  this.treatmentPrebookChartTrend[1]["label"] = "Target";
                  this.treatmentPrebookChartTrend[1]["data"] =
                    mappedtargetDataPrebookRatetargetData;
                } else {
                  this.treatmentPrebookChartTrend[0]["label"] = "";
                  this.treatmentPrebookChartTrend[1]["label"] = "";
                  this.treatmentPrebookChartTrend[1]["data"] = [];
                }
                this.treatmentPrebookChartTrend[0]["data"] =
                  this.treatmentPrebookChartTrend1;

                this.treatmentPrebookChartTrendLabels =
                  this.treatmentPrebookChartTrendLabels1;
              }
            }
          },
          error: (error) => {
            this.warningMessage = "Please Provide Valid Inputs!";
          },
        });
  }
  goalToggle(val) {
    this.goalchecked = val;
    this.fdWorkTimeAnalysis();
  }

  getChartsTips() {
    this.chartstipsService.getCharts(3, this.clinic_id).subscribe({
      next: (res) => {
        this.charTips = res.data;
      },
      error: (error) => {},
    });
  }

  setTopValues() {
    this.showTopVlaues = !this.showTopVlaues;
    this.stackedChartOptionsUtiDP = this.stackedChartOptionsUti1;
  }
  showTable(val) {
    this.showUtiTable = val;
  }

  changeUtil(val) {
    if (parseInt(val) == 1) {
      this.fdWorkTimeAnalysis();
    } else if (parseInt(val) == 2) {
      this.fdWorkTimeByDay();
    }
    this.utilShow = val;
  }
}
