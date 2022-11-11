import * as $ from 'jquery';
import { Component, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { MarketingService } from './marketing.service';
import { FinancesService } from '../finances/finances.service';
import { DentistService } from '../../dentist/dentist.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderService } from '../../layouts/full/header/header.service';
import { CookieService } from "ngx-cookie";
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';/**/
import { BaseChartDirective, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ChartService } from '../chart.service';
import { ClinicSettingsService } from '../../clinic-settings/clinic-settings.service';
import { ITooltipData } from '../../shared/tooltip/tooltip.directive';
import { AppConstants } from '../../app.constants';
import { ChartstipsService } from '../../shared/chartstips.service';
import { RolesUsersService } from '../../roles-users/roles-users.service';
import { environment } from "../../../environments/environment";

export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MarketingComponent implements AfterViewInit {
  @ViewChild("myCanvas") canvas2: ElementRef;
  @ViewChild("revenueRefChart") revenueRefChart: BaseChartDirective;

  closeResult: string;
  lineChartColors = [
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
    this.chartService.colors.even
  ];
  predictedChartColors;
  preoceedureChartColors;
  doughnutChartColors;
  subtitle: string;
  public clinic_id: any = {};
  public patientText: any = 'No. New Patients';
  public dentistCount: any = {};
  public clinicsData: any[] = [];
  public trendText;
  public showTrendNewpateint: boolean = true;
  public goalCount = 1;
  public timeout = 2500;
  public xeroConnect: boolean = true;
  public myobConnect: boolean = true;
  public connectedwith: any;
  public filteredCountriesMultiple: any[];
  public selectedAccounts: any[] = [];
  public Apirequest = 0;
  public newPatientsReferral$ = new BehaviorSubject<number>(0);
  public revenueByReferralCount$ = new BehaviorSubject<number>(0);
  public charTips: any = [];
  public userPlan: any = '';
  public apiUrl = environment.apiUrl;
  public showGoals: boolean = false;
  public activePatients: boolean = false;
  public multipleClinicsSelected: boolean = false;
  public maxLegendLabelLimit = 10;
  chartData1 = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels1 = ['January', 'February', 'Mars', 'April'];
  pluginObservable$: Observable<PluginServiceGlobalRegistrationAndOptions[]>;
  revenuePluginObservable$: Observable<PluginServiceGlobalRegistrationAndOptions[]>;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [];
  public isVisibleAccountGraphs: boolean = false;

  constructor(private toastr: ToastrService,
    private marketingService: MarketingService,
    private financesService: FinancesService,
    private dentistService: DentistService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private _cookieService: CookieService,
    private router: Router,
    public ngxSmartModalService: NgxSmartModalService,
    private clinicSettingsService: ClinicSettingsService,
    public decimalPipe: DecimalPipe,
    private chartService: ChartService,
    public constants: AppConstants,
    public chartstipsService: ChartstipsService,
    private rolesUsersService: RolesUsersService
  ) {
    this.connectedwith = this._cookieService.get("a_connect");
    this.isVisibleAccountGraphs = this.connectedwith == 'none' ? false : true;
    this.getChartsTips();
    this.getAllClinics();
  }

  public stackLegendGenerator = {
    display: true,
    position: "bottom",
    labels: {
      boxWidth : 8,
      usePointStyle: true,
      generateLabels : (chart)=>{
        let labels = [];
        let bg_color = {};
        chart.data.datasets.forEach((item)=>{
          item.data.forEach(val=>{
            if(val > 0){
              labels.push(item.label);
              bg_color[item.label] = item.backgroundColor;
            }
          })
        })
        labels = [...new Set(labels)]; 
        labels = labels.splice(0,this.maxLegendLabelLimit);
        return labels.map((item)=>({
          text: item,
          strokeStyle : bg_color[item],
          fillStyle : bg_color[item],
        }));
      }
    },
    onClick : (event, legendItem, legend)=>{
      return;
    }
  }
  private warningMessage: string;
  private myTemplate: any = "";
  async initiate_clinic() {
    this.userPlan = this._cookieService.get("user_plan");
    if (this.userPlan == 'lite') {
      this.router.navigateByUrl('/login');
    }
    this.getRolesIndividual();
    var val = $('#currentClinic').attr('cid');
    // this.clinic_id = val;
    if (val != undefined) {
      if(val == 'all'){
        this.clinic_id = this.clinics;
      }else{
        this.clinic_id = val;
      }
      if( val.indexOf(',') == -1 && val != 'all'){
        this.multipleClinicsSelected = false;
        this.clinic_id = val;
        await this.clinicGetAccountingPlatform();
        // this.connectedwith = this._cookieService.get("a_connect");
        this.isVisibleAccountGraphs = this.connectedwith == 'none' ? false : true;
        if (this.connectedwith == 'myob') {
          this.xeroConnect = false;
          this.checkMyobStatus();
        } else if (this.connectedwith == 'xero') {
          this.myobConnect = false;
          this.checkXeroStatus();
        } else {
          this.xeroConnect = false;
          this.myobConnect = false;
        }
        this.filterDate(this.chartService.duration$.value);
      }else{
        this.isVisibleAccountGraphs = true; 
        this.multipleClinicsSelected = true;
        this.filterDate(this.chartService.duration$.value);
      }
      
    }else{
      this.multipleClinicsSelected = true;
    }
  }

  public clinics = [];
  getAllClinics(){
    this.headerService.getClinics().subscribe(res=>{
        if(res.status == 200){
          res.data.forEach(item=>{
            this.clinics.push(item.id);
          });
        }
    });
  }

  clinicGetAccountingPlatform() {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.clinicSettingsService.clinicGetAccountingPlatform(self.clinic_id).subscribe((res) => {
        if (res.message == 'success') {
          if (res.data != '') {
            self.connectedwith = res.data;
            resolve(true);
          } else {
            self.connectedwith = '';
            resolve(true);
          }
        } else {
          self.connectedwith = '';
          resolve(true);
        }
      }, error => {
        self.warningMessage = "Please Provide Valid Inputs!";
        resolve(true);
      });
    });


  }
  formatDate(date) {
    if (date) {
      var dateArray = date.split("-")
      const d = new Date();
      d.setFullYear(+dateArray[2], (+dateArray[1] - 1), +dateArray[0])
      const formattedDate = this.datePipe.transform(d, 'dd MMM yyyy');
      return formattedDate;
    } else return date;
  }

  ngAfterViewInit() {
    // plugin observable for the center text in doughnut chart to subscribe the no patients count
    this.pluginObservable$ = this.newPatientsReferral$.pipe(
      takeUntil(this.destroyed$),
      map((productionCount) => {
        return this.chartService.beforeDrawChart(productionCount)
      })
    );
    /*this.revenuePluginObservable$ = this.revenueByReferralCount$.pipe(
      takeUntil(this.destroyed$),
      map((revenueCount) => {      
        return this.chartService.beforeDrawChart(revenueCount);
      })
    );*/
    this.revenuePluginObservable$ = this.revenueByReferralCount$.pipe(
      takeUntil(this.destroyed$),
      map((revenueCount) => {
        //return this.chartService.beforeDrawChart(revenueCount, true)
        this.pieChartOptions.elements.center.text = "$" + this.decimalPipe.transform(revenueCount);
        return [];
      })
    );
    // end of plugin observable logic

    $('#currentDentist').attr('did', 'all');
    //$('.dentist_dropdown').hide();
    this.route.params.subscribe(params => {
      this.clinic_id = this.route.snapshot.paramMap.get("id");
      //  this.filterDate('cytd');
      this.getClinics();

      //    this.initiate_clinic();

      //$('#title').html('Marketing');
      $('.external_clinic').show();
      //$('.dentist_dropdown').addClass('hide');
      $('.header_filters').removeClass('hide_header');
      $('.header_filters').addClass('flex_direct_mar');
      $('#title').html('<span>Marketing</span>');
      $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate));

      // $('.external_clinic').show();
      // $('.external_dentist').show();
      $(document).on('click', function (e) {
        if ($(document.activeElement).attr('id') == 'sa_datepicker') {
          $('.customRange').show();
        }
        else if ($(document.activeElement).attr('id') == 'customRange') {
          $('.customRange').show();
        }
        else {
          $('.customRange').hide();
        }
      })
    });

    let proceedureGradient = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    proceedureGradient.addColorStop(0, 'rgba(22, 82, 141, 0.8)');
    proceedureGradient.addColorStop(1, 'rgba(12, 209,169,0.9)');
    let proceedureGradient1 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    proceedureGradient1.addColorStop(1, 'rgba(12, 209,169,0.8)');
    proceedureGradient1.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    let proceedureGradient2 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    proceedureGradient2.addColorStop(1, 'rgba(59, 227,193,0.8');
    proceedureGradient2.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    let proceedureGradient3 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    proceedureGradient3.addColorStop(1, 'rgba(94, 232,205,0.8)');
    proceedureGradient3.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    let proceedureGradient4 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    proceedureGradient4.addColorStop(1, 'rgba(148, 240,221,0.8)');
    proceedureGradient4.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    let proceedureGradient5 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    proceedureGradient5.addColorStop(1, 'rgba(201, 247,238,0.8)');
    proceedureGradient5.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    this.doughnutChartColors = ['#6cd8ba', '#b0fffa', '#abb3ff', '#feefb8', '#91ADEA', '#ffb4b5', '#F2C6C6', '#FDC6C0', '#FEEEE1', '#FFDD99', '#A8DDDD', '#F4F4A0', '#C3DDFF', '#9FDBDB', '#CCFDCC', '#B1F2EC', '#BBEBFA', '#BBEBFA', '#D7ECF3', '#BBE7FF', '#C8CDF0', '#F7C4F5', '#6cd8ba', '#feefb8'];

    this.preoceedureChartColors = [
      {
        backgroundColor: proceedureGradient,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(25,179,148,0.7)'
      },
      {
        backgroundColor: proceedureGradient1,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(25,179,148,0.7)'

      },
      {
        backgroundColor: proceedureGradient2,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(25,179,148,0.7)'

      },
      {
        backgroundColor: proceedureGradient3,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(25,179,148,0.7)'

      },
      {
        backgroundColor: proceedureGradient4,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(25,179,148,0.7)'

      },
      {
        backgroundColor: proceedureGradient5,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F'
      }
    ];
    //this.filterDate(this.chartService.duration$.value);
  }

  public labelBarmkRevenueByReferralOptionsStacked: any = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7
      },
    },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        stacked: true,

        ticks: {
          userCallback: function (item) {
            return item;
          },
        },
      }],
    }, legend: {
      display: true
    },
    tooltips: {
      mode: 'x-axis',
      enabled: false,
      custom: function (tooltip) {
        if (!tooltip) return;
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.style.backgroundColor = "#FFFFFF";
          tooltipEl.style.borderColor = "#B2BABB";
          tooltipEl.style.borderWidth = "thin";
          tooltipEl.style.borderStyle = "solid";
          tooltipEl.style.zIndex = "999999";
          tooltipEl.style.backgroundColor = "#000000";
          tooltipEl.style.color = "#FFFFFF";
          document.body.appendChild(tooltipEl);
        }
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = "0";
          return;
        } else {
          tooltipEl.style.opacity = "0.8";
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
          tooltipEl.classList.add(tooltip.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = tooltip.body.map(getBody);
          var labelColorscustom = tooltip.labelColors;
          var innerHtml = '<table><thead>';
          innerHtml += '</thead><tbody>';
          titleLines.forEach(function (title) {
            innerHtml += '<tr><th colspan="2" style="text-align: left;">' + title + '</th></tr>';
          });
          bodyLines.forEach(function (body, i) {
            var singledata = body[0].split(":");
            singledata[1] = singledata[1].trim();
            if (singledata[1] > 0) {

              singledata[1] = singledata[1].split(/(?=(?:...)*$)/).join(',');
              body[0] = singledata.join(": $");
              innerHtml += '<tr><td class="td-custom-tooltip-color"><span class="custom-tooltip-color" style="background:' + labelColorscustom[i].backgroundColor + '"></span></td><td style="padding: 0px">' + body[0] + '</td></tr>';
            }
          });
          innerHtml += '</tbody></table>';
          tooltipEl.innerHTML = innerHtml;
          //tableRoot.innerHTML = innerHtml;
        }
        // disable displaying the color box;
        var position = this._chart.canvas.getBoundingClientRect();
        // Display, position, and set styles for font
        tooltipEl.style.position = 'fixed';
        tooltipEl.style.left = ((position.left + window.pageXOffset + tooltip.caretX) - 50) + 'px';
        tooltipEl.style.top = ((position.top + window.pageYOffset + tooltip.caretY) - 70) + 'px';
        tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
        tooltip.displayColors = false;
      },
      callbacks: {
        label: function (tooltipItems, data) {

          return data.datasets[tooltipItems.datasetIndex].label + ": " + tooltipItems.yLabel;
        },

      }
    }
  };

  public labelBarmkPatientByReferralOptionsStacked: any = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7
      },
    },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        stacked: true,

        ticks: {
          userCallback: function (item) {
            return item;
          },
        },
      }],
    }, legend: {
      display: true
    },
    tooltips: {
      mode: 'x-axis',
      enabled: false,
      custom: function (tooltip) {
        if (!tooltip) return;
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.style.backgroundColor = "#FFFFFF";
          tooltipEl.style.borderColor = "#B2BABB";
          tooltipEl.style.borderWidth = "thin";
          tooltipEl.style.borderStyle = "solid";
          tooltipEl.style.zIndex = "999999";
          tooltipEl.style.backgroundColor = "#000000";
          tooltipEl.style.color = "#FFFFFF";
          document.body.appendChild(tooltipEl);
        }
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = "0";
          return;
        } else {
          tooltipEl.style.opacity = "0.8";
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
          tooltipEl.classList.add(tooltip.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = tooltip.body.map(getBody);
          var labelColorscustom = tooltip.labelColors;
          var innerHtml = '<table><thead>';
          innerHtml += '</thead><tbody>';
          titleLines.forEach(function (title) {
            innerHtml += '<tr><th colspan="2" style="text-align: left;">' + title + '</th></tr>';
          });
          bodyLines.forEach(function (body, i) {
            var singledata = body[0].split(":");
            singledata[1] = singledata[1].trim();
            if (singledata[1] > 0) {

              singledata[1] = singledata[1].split(/(?=(?:...)*$)/).join(',');
              body[0] = singledata.join(": ");
              innerHtml += '<tr><td class="td-custom-tooltip-color"><span class="custom-tooltip-color" style="background:' + labelColorscustom[i].backgroundColor + '"></span></td><td style="padding: 0px">' + body[0] + '</td></tr>';
            }
          });
          innerHtml += '</tbody></table>';
          tooltipEl.innerHTML = innerHtml;
          //tableRoot.innerHTML = innerHtml;
        }
        // disable displaying the color box;
        var position = this._chart.canvas.getBoundingClientRect();
        // Display, position, and set styles for font
        tooltipEl.style.position = 'fixed';
        tooltipEl.style.left = ((position.left + window.pageXOffset + tooltip.caretX) - 50) + 'px';
        tooltipEl.style.top = ((position.top + window.pageYOffset + tooltip.caretY) - 70) + 'px';
        tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
        tooltip.displayColors = false;
      },
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[tooltipItems.datasetIndex].label + ": " + tooltipItems.yLabel;
        },

      }
    }
  };


  public date = new Date();
  public stackedChartOptions: any = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7
      },
    },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 1,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          userCallback: function (label, index, labels) {
            // when the floored value is the same as jhgjghe value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }

          },
        },
      }],
    }, legend: {
      display: true
    },
    tooltips: {
      mode: 'x-axis',
      custom: function (tooltip) {
        if (!tooltip) return;
        // disable displaying the colorg box;
        tooltip.displayColors = false;
      },
      callbacks: {
        label: (tooltipItems, data) => {
          return tooltipItems.xLabel + ": " + this.decimalPipe.transform(tooltipItems.yLabel);
        },
        title: function () {
          return '';
        }

      }
    },
  };

  public stackedChartOptionsMulti: any = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7
      },
    },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          userCallback: function (item) {
            return item;
          },
        },
      }],
    }, 
    legend: this.stackLegendGenerator,
    tooltips: {
      mode: 'x-axis',
      enabled: false,
      custom: function (tooltip) {
        if (!tooltip) return;
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.style.backgroundColor = "#FFFFFF";
          tooltipEl.style.borderColor = "#B2BABB";
          tooltipEl.style.borderWidth = "thin";
          tooltipEl.style.borderStyle = "solid";
          tooltipEl.style.zIndex = "999999";
          tooltipEl.style.backgroundColor = "#000000";
          tooltipEl.style.color = "#FFFFFF";
          document.body.appendChild(tooltipEl);
        }
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = "0";
          return;
        } else {
          tooltipEl.style.opacity = "0.8";
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
          tooltipEl.classList.add(tooltip.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        var bodyLineCont = 0;
        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = tooltip.body.map(getBody);
          var labelColorscustom = tooltip.labelColors;
          var innerHtml = '<table><thead>';
          innerHtml += '</thead><tbody>';
          let total: any = 0;
          bodyLines.forEach(function (body, i) {
           // if (!body[0].includes("0")) {
              var singleval = body[0].split(':');
              if (singleval[1].includes("-")) {
                var temp = singleval[1];
                var amount = temp;
                total -= parseFloat(amount);
              } else {
                var temp = singleval[1];
                var amount = temp;
                total += parseFloat(amount);
              }

          //  }
          });
          total = Math.round(total);
          if (total != 0) {
            var num_parts = total.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            total = num_parts.join(".");
          }
          titleLines.forEach(function (title) {
            innerHtml += '<tr><th colspan="2" style="text-align: left;">' + title + ': ' + total + '</th></tr>';
          });
          bodyLines.forEach(function (body, i) {
            var singledata = body[0].split(":");
            singledata[1] = singledata[1].trim();
            if (singledata[1] > 0) {

              singledata[1] = singledata[1].split(/(?=(?:...)*$)/).join(',');
              body[0] = singledata.join(": ");
              innerHtml += '<tr><td class="td-custom-tooltip-color"><span class="custom-tooltip-color" style="background:' + labelColorscustom[i].backgroundColor + '"></span></td><td style="padding: 0px">' + body[0] + '</td></tr>';
            }
          });
          innerHtml += '</tbody></table>';
          tooltipEl.innerHTML = innerHtml;
          //tableRoot.innerHTML = innerHtml;
        }
        // disable displaying the color box;
        var position = this._chart.canvas.getBoundingClientRect();
        // Display, position, and set styles for font
        tooltipEl.style.position = 'fixed';
        tooltipEl.style.left = ((position.left + window.pageXOffset + tooltip.caretX) - 80) + 'px';
        tooltipEl.style.top = ((position.top + window.pageYOffset + tooltip.caretY) - (70 + (bodyLineCont * 15))) + 'px';
        tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
        tooltip.displayColors = false;
      },
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[tooltipItems.datasetIndex].label + ": " + Math.round(tooltipItems.yLabel);
        },

      }
    }
  };

  public stackedChartOptionsRev: any = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7
      },
    },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          userCallback: function (label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency = label < 0 ? label.toString().split('-').join('') : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              return `${label < 0 ? '- $' : '$'}${currency}`;
            }
          },
        },
      }],
    }, legend: {
      display: true
    },
    tooltips: {
      mode: 'x-axis',
      enabled: false,
      custom: function (tooltip) {
        if (!tooltip) return;
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.style.backgroundColor = "#FFFFFF";
          tooltipEl.style.borderColor = "#B2BABB";
          tooltipEl.style.borderWidth = "thin";
          tooltipEl.style.borderStyle = "solid";
          tooltipEl.style.zIndex = "999999";
          tooltipEl.style.backgroundColor = "#000000";
          tooltipEl.style.color = "#FFFFFF";
          document.body.appendChild(tooltipEl);
        }
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = "0";
          return;
        } else {
          tooltipEl.style.opacity = "0.8";
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
          tooltipEl.classList.add(tooltip.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = tooltip.body.map(getBody);
          var labelColorscustom = tooltip.labelColors;
          var innerHtml = '<table><thead>';
          innerHtml += '</thead><tbody>';

          let total: any = 0;
          bodyLines.forEach(function (body, i) {
            if (!body[0].includes("$0")) {
              var singleval = body[0].split(':');
              if (singleval[1].includes("-")) {
                var temp = singleval[1].split('$');
                var amount = temp[1].replace(/,/g, '');
                total -= parseFloat(amount);
              } else {
                var temp = singleval[1].split('$');
                var amount = temp[1].replace(/,/g, '');
                total += parseFloat(amount);
              }

            }
          });
          total = Math.round(total);
          if (total != 0) {
            var num_parts = total.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            total = num_parts.join(".");
          }
          titleLines.forEach(function (title) {
            innerHtml += '<tr><th colspan="2" style="text-align: left;">' + title + ': $' + total + '</th></tr>';

          });
          bodyLines.forEach(function (body, i) {
            if (!body[0].includes("$0")) {
              var body_custom = body[0];
              body_custom = body_custom.split(":");
              if (body_custom[1].includes("-")) {
                var temp_ = body_custom[1].split('$');
                temp_[1] = Math.round(temp_[1].replace(/,/g, ''));
                temp_[1] = temp_[1].toString();
                temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
                body_custom[1] = temp_.join("$");
              } else {
                var temp_ = body_custom[1].split('$');
                temp_[1] = Math.round(temp_[1].replace(/,/g, ''));
                temp_[1] = temp_[1].toString();
                temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
                body_custom[1] = temp_.join("$");
              }

              body[0] = body_custom.join(":");
              innerHtml += '<tr><td class="td-custom-tooltip-color"><span class="custom-tooltip-color" style="background:' + labelColorscustom[i].backgroundColor + '"></span></td><td style="padding: 0px">' + body[0] + '</td></tr>';
            }
          });
          innerHtml += '</tbody></table>';
          tooltipEl.innerHTML = innerHtml;
          //tableRoot.innerHTML = innerHtml;
        }
        // disable displaying the color box;
        var position = this._chart.canvas.getBoundingClientRect();
        // Display, position, and set styles for font
        tooltipEl.style.position = 'fixed';
        tooltipEl.style.left = ((position.left + window.pageXOffset + tooltip.caretX) - 20) + 'px';
        tooltipEl.style.top = ((position.top + window.pageYOffset + tooltip.caretY) - 70) + 'px';
        tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
        tooltip.displayColors = false;
      },
      callbacks: {
        label: function (tooltipItems, data) {
          let currency = tooltipItems.yLabel.toString();
          currency = currency.split(".");
          currency[0] = currency[0].split('-').join('').split(/(?=(?:...)*$)/).join(',');
          currency = currency.join(".");
          return data.datasets[tooltipItems.datasetIndex].label + `: ${tooltipItems.yLabel < 0 ? '- $' : '$'}${currency}`;;
        },

      }
    }
  };
  public stackedChartOptionsRef: any = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7
      },
    },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          userCallback: function (label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency = label < 0 ? label.toString().split('-').join('') : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              return label;// `${label < 0 ? '- $' : '$'}${currency}`;
            }
          },
        },
      }],
    }, legend: {
      display: true
    },
    tooltips: {
      mode: 'x-axis',
      enabled: false,
      custom: function (tooltip) {
        if (!tooltip) return;
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.style.backgroundColor = "#FFFFFF";
          tooltipEl.style.borderColor = "#B2BABB";
          tooltipEl.style.borderWidth = "thin";
          tooltipEl.style.borderStyle = "solid";
          tooltipEl.style.zIndex = "999999";
          tooltipEl.style.backgroundColor = "#000000";
          tooltipEl.style.color = "#FFFFFF";
          document.body.appendChild(tooltipEl);
        }
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = "0";
          return;
        } else {
          tooltipEl.style.opacity = "0.8";
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
          tooltipEl.classList.add(tooltip.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = tooltip.body.map(getBody);
          var labelColorscustom = tooltip.labelColors;
          var innerHtml = '<table><thead>';
          innerHtml += '</thead><tbody>';

          let total: any = 0;
          bodyLines.forEach(function (body, i) {
            if (!body[0].includes("$0")) {
              var singleval = body[0].split(':');
              if (singleval[1].includes("-")) {
                var temp = singleval[1].split('$');
                var amount = temp[1].replace(/,/g, '');
                total -= parseFloat(amount);
              } else {
                var temp = singleval[1].split('$');
                var amount = temp[1].replace(/,/g, '');
                total += parseFloat(amount);
              }

            }
          });
          total = Math.round(total);
          if (total != 0) {
            var num_parts = total.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            total = num_parts.join(".");
          }
          titleLines.forEach(function (title) {
            innerHtml += '<tr><th colspan="2" style="text-align: left;">' + title + ': ' + total + '</th></tr>';

          });
          bodyLines.forEach(function (body, i) {
            if (!body[0].includes("$0")) {
              var body_custom = body[0];
              body_custom = body_custom.split(":");
              if (body_custom[1].includes("-")) {
                var temp_ = body_custom[1].split('$');
                temp_[1] = Math.round(temp_[1].replace(/,/g, ''));
                temp_[1] = temp_[1].toString();
                temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
                body_custom[1] = temp_.join("");
              } else {
                var temp_ = body_custom[1].split('$');
                temp_[1] = Math.round(temp_[1].replace(/,/g, ''));
                temp_[1] = temp_[1].toString();
                temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
                body_custom[1] = temp_.join("");
              }

              body[0] = body_custom.join(":");
              innerHtml += '<tr><td class="td-custom-tooltip-color"><span class="custom-tooltip-color" style="background:' + labelColorscustom[i].backgroundColor + '"></span></td><td style="padding: 0px">' + body[0] + '</td></tr>';
            }
          });
          innerHtml += '</tbody></table>';
          tooltipEl.innerHTML = innerHtml;
          //tableRoot.innerHTML = innerHtml;
        }
        // disable displaying the color box;
        var position = this._chart.canvas.getBoundingClientRect();
        // Display, position, and set styles for font
        tooltipEl.style.position = 'fixed';
        tooltipEl.style.left = ((position.left + window.pageXOffset + tooltip.caretX) - 20) + 'px';
        tooltipEl.style.top = ((position.top + window.pageYOffset + tooltip.caretY) - 70) + 'px';
        tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
        tooltip.displayColors = false;
      },
      callbacks: {
        label: function (tooltipItems, data) {
          let currency = tooltipItems.yLabel.toString();
          currency = currency.split(".");
          currency[0] = currency[0].split('-').join('').split(/(?=(?:...)*$)/).join(',');
          currency = currency.join(".");
          return data.datasets[tooltipItems.datasetIndex].label + `: ${tooltipItems.yLabel < 0 ? '- $' : '$'}${currency}`;;
        },

      }
    }
  };

  public stackedChartColors: Array<any> = [
    { backgroundColor: '#119682' },
    { backgroundColor: '#6BE6EF' },
    { backgroundColor: '#68D8D6' },
    { backgroundColor: '#3DCCC7' },
    { backgroundColor: '#68FFF9' },
    { backgroundColor: '#119682' }
  ];
  public stackedChartType = 'bar';
  public stackedChartLegend = true;

  //labels
  public stackedChartLabels: string[] = [];
  public stackedChartLabels1: string[] = [];

  //data
  public stackedChartData: any[] = [
    { data: [], label: 'Crowns' },
    { data: [], label: 'Splints ' },
    { data: [], label: 'Root Canals' },
    { data: [], label: 'Perio Charts' },
    { data: [], label: 'Surgical Extractions' }];

  public stackedChartData1: any[] = [];
  public stackedChartData2: any[] = [];
  public stackedChartData3: any[] = [];
  public stackedChartData4: any[] = [];
  public stackedChartData5: any[] = [];
  public duration = '';
  // events
  public chartClicked(e: any, labels): void {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if (activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        if (labels === 'newPatients') {
          this.drilldownNewPatients(label);
        }
        if (labels === 'revenue') {
          this.drilldownRevenueReferral(label);
        }
      }
    }
  }

  filterCountryMultiple(event) {
    let query = event.query;
    this.filteredCountriesMultiple = this.filterCountry(query, this.categories);
  }
  filterCountry(query, categories: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      if (category.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(category);
      }
    }
    return filtered;
  }
  public chartHovered(e: any): void {
  }
  public gaugeType = "arch";
  public gaugeValue = '';
  public gaugeLabel = "";
  public gaugeThick = "20";
  public foregroundColor = "#4ccfae";
  public backgroundColor = '#f4f0fa';
  public cap = "round";
  public size = "250"  
  public gaugePrependText = '$';
  public startDate = '';
  public endDate = '';
  public selectedValToggle = 'off';
  public selectedDentist;
  public dentists;
  public pieChartType = 'doughnut';

  public pieChartColors = [
    {
      backgroundColor: [
        // '#6edbbb',
        // '#b0fffa',
        // '#abb3ff',
        // '#ffb4b5',
        // '#fffcac',
        // '#D7F8EF',
        // '#FEEFB8'
        '#6edbbb', '#b0fffa', '#abb3ff', '#ffb4b5', '#fffcac', '#FFE4E4', '#FFD578', '#54D2FF', '#E58DD7', '#A9AABC', '#F2ECFF', '#5689C9', '#F9F871'

      ]
    }
  ]

  public totalRevenueByReferral = '$ 0';
  public totalNewPatientsReferral = 0;


  public noNewPatientsByReferralChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return data.labels[tooltipItem.index] + ": " + this.decimalPipe.transform(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
        }
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20
      },
      onClick: function (e) {
        e.stopPropagation();
      }
    },

    elements: {
      center: {
        text: ''
      }
    }
  };

  public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return data.labels[tooltipItem.index] + ": $ " + this.decimalPipe.transform(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
        }
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20
      },
      onClick: function (e) {
        e.stopPropagation();
      }
    },
    elements: {
      center: {
        text: ''
      }
    }
  };
  myDateParser(dateStr: string): string {
    // 2018-01-01T12:12:12.123456; - converting valid date f74ormat like this

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)

    let validDate = date;

    return validDate
  }

  enableDiabaleButton(val) {
    if(val <= 0 ){
      $('.sa_tabs_data button').prop('disabled',false);
    }else{
      $('.sa_tabs_data button').prop('disabled',true);     
    }
  }

  loadDentist(newValue) {
    // $('.sa_tabs_data button').prop('disabled',true); 
    this.Apirequest = 5;
    if (this.connectedwith != '' && this.connectedwith != 'none' && this.connectedwith != undefined && !this.multipleClinicsSelected) {
      this.Apirequest = 6;
    }

    $('#title').html('<span>Marketing</span>');
    $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate));

    if (newValue == 'all') {
      this.mkNewPatientsByReferral();
      this.mkRevenueByReferral();
      if(this.activePatients || !this.isVisibleAccountGraphs){
        this.fdActivePatient();
      }        
      this.fdnewPatientsRatio();


      // if(!this.isVisibleAccountGraphs){
      //   this.fdActivePatient();
      // }
      if(!this.multipleClinicsSelected && this.connectedwith != 'none'){
        this.fdnewPatientsAcq();
        
      }

      this.fdvisitsRatio();
      if (this.connectedwith == 'myob' && this.multipleClinicsSelected == false) {
        this.getMyobAccounts();
      } else if (this.connectedwith == 'xero' && this.multipleClinicsSelected == false) {
        this.getAccounts();
      }
      //this.fdWorkTimeAnalysis();
    }
  }

  public newPatientsTimeData: number[] = [];
  public newPatientsTimeLabels = [];
  public newPatientsTimeLabels1 = [];
  public newPatientsTimeData1: number[] = [];
  public newPatientsTimeLabelsl2 = [];
  public mkNewPatientsByReferralLoader: any;
  public mkNewPatientsByReferralAll: any = [];
  public mkNewPatientsByReferalMulti: any[] = [
    { data: [], label: '' }];
  public showmulticlinicNewPatients:boolean = false;
  public mkNewPatientsByReferalLabels:any=[];
  //Items Predictor Analysis 
  private mkNewPatientsByReferral() {
    this.mkNewPatientsByReferralLoader = true;
    this.newPatientsTimeLabels = [];
    var user_id;
    var clinic_id;
    this.mkNewPatientsByReferalMulti = [];
    this.showmulticlinicNewPatients = false;
    this.mkNewPatientsByReferalLabels = [];
    this.marketingService.mkNewPatientsByReferral(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      if (data.message == 'success') {
        this.mkNewPatientsByReferalMulti = [];
        this.mkNewPatientsByReferalLabels = [];
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.totalNewPatientsReferral = Math.round(data.total);
          this.showmulticlinicNewPatients = true;
          data.data.forEach(res => {
            res.val.forEach((result, key) => {
              if (typeof (this.mkNewPatientsByReferalMulti[key]) == 'undefined') {
                this.mkNewPatientsByReferalMulti[key] = { data: [], label: '' };
              }
              if (typeof (this.mkNewPatientsByReferalMulti[key]['data']) == 'undefined') {
                this.mkNewPatientsByReferalMulti[key]['data'] = [];
              }
              var total = Math.trunc(result.patients_visits);
              if (result.production > 0 && result.production.toString().includes('.')) {
                var num_parts = result.production.split(".");
                num_parts[1] = num_parts[1].charAt(0);
                total = num_parts.join(".");
              }
              this.mkNewPatientsByReferalMulti[key]['data'].push(total);
              this.mkNewPatientsByReferalMulti[key]['label'] = result.reftype_name;
             });
             this.mkNewPatientsByReferalLabels.push(res.clinic_name);
          });
          this.mkNewPatientsByReferralLoader = false;
        }else{
          this.mkNewPatientsByReferralAll = data;
          this.totalNewPatientsReferral = Math.round(data.total);
          this.newPatientsReferral$.next(this.totalNewPatientsReferral)
          // this.noNewPatientsByReferralChartOptions.elements.center.text = this.decimalPipe.transform(this.totalNewPatientsReferral);

          this.newPatientsTimeData1 = [];
          this.newPatientsTimeLabelsl2 = [];
          this.newPatientsTimeLabels1 = [];
          if (data.data.patients_reftype.length > 0) {
            var i = 0;
            data.data.patients_reftype.forEach(res => {
              if (res.patients_visits > 0) {
                if (i < 10) {
                  this.newPatientsTimeData1.push(res.patients_visits);
                  this.newPatientsTimeLabels1.push(res.reftype_name);
                  i++;
                }
              }
            });
          }
          this.newPatientsTimeData = this.newPatientsTimeData1;
          this.newPatientsTimeLabels = this.newPatientsTimeLabels1;
          var self = this;
          setTimeout(function () {
            self.mkNewPatientsByReferralLoader = false;
          }, this.timeout);
        }
        
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  private drilldownNewPatients(label) {
    this.newPatientsTimeData1 = [];
    this.newPatientsTimeLabels1 = [];
    this.newPatientsTimeData = [];
    this.newPatientsTimeLabels = [];
    this.newPatientsTimeLabelsl2 = [];
    if (this.mkNewPatientsByReferralAll.data.patients_refname[label].length > 0) {
      var i = 0;
      let totalVisits = 0;
      this.mkNewPatientsByReferralAll.data.patients_refname[label].forEach(res => {
        if (i < 10) {
          totalVisits = totalVisits + parseInt(res.num_referrals);
          this.newPatientsTimeData1.push(res.num_referrals);
          this.newPatientsReferral$.next(totalVisits);
          this.newPatientsTimeLabels1.push(res.referral_name);
          i++;
        }
      });
    }
    this.newPatientsTimeData = this.newPatientsTimeData1;
    this.newPatientsTimeLabelsl2 = this.newPatientsTimeLabels1;
  }

  public revenueReferralData: number[] = [];
  public revenueReferralLabels = [];
  public revenueReferralLabels1 = [];
  public revenueReferralData1: number[] = [];
  public revenueReferralLabelsl2 = [];
  public mkRevenueByReferralLoader: any;

  public reffralAllData: any = [];
  public mkNewPatientsByReferalRevMulti: any[] = [
    { data: [], label: '' }];
  public showmulticlinicNewPatientsRev:boolean = false;
  public mkNewPatientsByReferalRevLabels:any=[];
  public totalNewPatientsReferralRev:any=0;
  //Items Predictor Analysis 
  private mkRevenueByReferral() {
    this.mkRevenueByReferralLoader = true;
    var user_id;
    var clinic_id;
    this.mkNewPatientsByReferalRevMulti = [];
    this.showmulticlinicNewPatientsRev = false;
    this.mkNewPatientsByReferalRevLabels = [];
    this.totalNewPatientsReferralRev =0;
    this.marketingService.mkRevenueByReferral(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      this.reffralAllData = [];
      this.revenueReferralData = [];
      this.revenueReferralLabels = [];
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      if (data.message == 'success') {
        this.mkNewPatientsByReferalRevMulti = [];
        this.mkNewPatientsByReferalRevLabels = [];
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.totalNewPatientsReferralRev = Math.round(data.total);
          this.showmulticlinicNewPatientsRev = true;
          data.data.forEach(res => {
            res.val.forEach((result, key) => {
              if (typeof (this.mkNewPatientsByReferalRevMulti[key]) == 'undefined') {
                this.mkNewPatientsByReferalRevMulti[key] = { data: [], label: '' };
              }
              if (typeof (this.mkNewPatientsByReferalRevMulti[key]['data']) == 'undefined') {
                this.mkNewPatientsByReferalRevMulti[key]['data'] = [];
              }
              var total = Math.trunc(result.invoice_amount);
              if (result.production > 0 && result.production.toString().includes('.')) {
                var num_parts = result.production.split(".");
                num_parts[1] = num_parts[1].charAt(0);
                total = num_parts.join(".");
              }
              this.mkNewPatientsByReferalRevMulti[key]['data'].push(total);
              this.mkNewPatientsByReferalRevMulti[key]['label'] = result.reftype_name;
             });
             this.mkNewPatientsByReferalRevLabels.push(res.clinic_name);
          });
          this.mkRevenueByReferralLoader = false;
        }else{
            this.reffralAllData = data;
            this.totalRevenueByReferral = this.decimalPipe.transform(Math.round(this.reffralAllData.total || 0));
            this.revenueByReferralCount$.next(Math.round(this.reffralAllData.total || 0));
            //// this.pieChartOptions.elements.center.text = '$ ' + this.totalRevenueByReferral;
            if (this.revenueRefChart) {
              this.revenueRefChart.ngOnDestroy();
              this.revenueRefChart.chart = this.revenueRefChart.getChartBuilder(this.revenueRefChart.ctx);
            }
            this.revenueReferralData1 = [];
            this.revenueReferralLabelsl2 = [];
            this.revenueReferralLabels1 = [];
            if (this.reffralAllData.data.patients_reftype.length > 0) {
              var i = 0;
              this.reffralAllData.data.patients_reftype.forEach(res => {
                if (res.invoice_amount > 0) {
                  if (i < 10) {
                    this.revenueReferralData1.push(Math.round(res.invoice_amount));
                    this.revenueReferralLabels1.push(res.reftype_name);
                    i++;
                  }
                }
              });
            }

            this.revenueReferralData = this.revenueReferralData1;
            this.revenueReferralLabels = this.revenueReferralLabels1;
            var self = this;

            setTimeout(function () {
              self.mkRevenueByReferralLoader = false;
            }, this.timeout);
        }
        
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public mkRevenueByReferralChartTrend: any[] = [];

  public revenueReferralLabelsTrend = [];
  public revenueReferralLabels1Trend = [];


  private mkRevenueByReferralTrend() {
    this.mkRevenueByReferralLoader = true;
    this.revenueReferralLabelsTrend = [];
    this.revenueReferralLabels1Trend = [];
    this.showTrend = true;
    this.mkRevenueByReferralChartTrend = [];
    var user_id;
    var clinic_id;
    this.marketingService.mkRevenueByReferralTrend(this.clinic_id, this.trendValue).subscribe((data) => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      if (data.message == 'success') {
        data.data.forEach(res => {
          res.val.forEach((result, key) => {
            if (typeof (this.mkRevenueByReferralChartTrend[key]) == 'undefined') {
              this.mkRevenueByReferralChartTrend[key] = { data: [], label: '' };
            }
            if (typeof (this.mkRevenueByReferralChartTrend[key]['data']) == 'undefined') {
              this.mkRevenueByReferralChartTrend[key]['data'] = [];
            }
            var total = result.invoice_amount;

            this.mkRevenueByReferralChartTrend[key]['data'].push(total);
            this.mkRevenueByReferralChartTrend[key]['label'] = result.item_name;
            this.mkRevenueByReferralChartTrend[key]['backgroundColor'] = this.doughnutChartColors[key];
            this.mkRevenueByReferralChartTrend[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];

          });
          if (this.trendValue == 'c') {
            this.revenueReferralLabels1Trend.push(this.datePipe.transform(res.duration, 'MMM y'));
          }
          else {
            this.revenueReferralLabels1Trend.push(res.duration);
          }
        });
        this.revenueReferralLabelsTrend = this.revenueReferralLabels1Trend;
        this.mkRevenueByReferralLoader = false;
      }
    }, error => {
      this.Apirequest -= 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public mkNewPatientsReferralChartTrend: any[] = [];

  public newPatientsTimeLabelsTrend = [];
  public newPatientsTimeLabels1Trend = [];


  private mkNewPatientsByReferralTrend() {
    this.mkNewPatientsByReferralLoader = true;
    this.newPatientsTimeLabelsTrend = [];
    this.newPatientsTimeLabels1Trend = [];
    this.showTrend = true;
    this.mkNewPatientsReferralChartTrend = [];
    var user_id;
    var clinic_id;
    this.marketingService.mkNewPatientsByReferralTrend(this.clinic_id, this.trendValue).subscribe((data) => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      if (data.message == 'success') {

        data.data.forEach(res => {
          res.val.forEach((result, key) => {
            if (typeof (this.mkNewPatientsReferralChartTrend[key]) == 'undefined') {
              this.mkNewPatientsReferralChartTrend[key] = { data: [], label: '' };
            }
            if (typeof (this.mkNewPatientsReferralChartTrend[key]['data']) == 'undefined') {
              this.mkNewPatientsReferralChartTrend[key]['data'] = [];
            }
            var total = result.num_referrals;

            this.mkNewPatientsReferralChartTrend[key]['data'].push(total);
            this.mkNewPatientsReferralChartTrend[key]['label'] = result.item_name;
            this.mkNewPatientsReferralChartTrend[key]['backgroundColor'] = this.doughnutChartColors[key];
            this.mkNewPatientsReferralChartTrend[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];

          });
          if (this.trendValue == 'c') {
            this.newPatientsTimeLabels1Trend.push(this.datePipe.transform(res.duration, 'MMM y'));
          }
          else {
            this.newPatientsTimeLabels1Trend.push(res.duration);
          }
        });
        this.newPatientsTimeLabelsTrend = this.newPatientsTimeLabels1Trend;
        this.mkNewPatientsByReferralLoader = false;
      }
    }, error => {
      this.Apirequest -= 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }
  private drilldownRevenueReferral(label) {
    var user_id;
    var clinic_id;
    /* this.marketingService.mkRevenueByReferral(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
          if(data.message == 'success'){*/
    this.revenueReferralData1 = [];
    this.revenueReferralLabels1 = [];
    this.revenueReferralData = [];
    this.revenueReferralLabels = [];
    this.revenueReferralLabelsl2 = [];
    if (this.reffralAllData.data.patients_refname[label].length > 0) {
      var i = 0;
      let totalRevenue = 0;
      this.reffralAllData.data.patients_refname[label].forEach(res => {
        totalRevenue = totalRevenue + parseFloat(res.invoice_amount);
        if (i < 10) {
          this.revenueReferralData1.push(res.invoice_amount);
          this.revenueReferralLabels1.push(res.referral_name);
          i++;
        }
      });
      totalRevenue = Math.round(totalRevenue);
      this.revenueByReferralCount$.next(totalRevenue);
    }
    this.revenueReferralData = this.revenueReferralData1;
    this.revenueReferralLabelsl2 = this.revenueReferralLabels1;


    /*    }
     }, error => {
       this.warningMessage = "Please Provide Valid Inputs!";
     }
     );*/
  }

  public visitsTotal;
  public visitsPrevTotal;
  public visitsTooltip = 'down';
  public totalvisit: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3,
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
      ],
      shadowOffsetY: 2,
      shadowBlur: 3,
      // hoverBackgroundColor: 'rgba(0, 0, 0, 0.6)',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      pointBevelWidth: 2,
      pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
      pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: 'rgba(0, 0, 0, 0.3)',
      backgroundOverlayMode: 'multiply'
    }
  ];
  public TvisitTrend1 = [];
  public TvisitTrendLabels1 = [];
  public fdvisitsRatioLoader: any;
  public visitsGoal: any = 0;
  public showBar: boolean = false;
  //Predictor Ratio :
  private fdvisitsRatio() {
    this.showBar = false;
    if (this.duration) {
      this.visitsTotal = 0;
      this.fdvisitsRatioLoader = true;
      this.visitsTooltip = 'down';
      var user_id;
      var clinic_id;
      this.marketingService.fdvisitsRatio(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
        this.visitsTotal = 0;
        this.visitsPrevTotal = 0;
        this.fdvisitsRatioLoader = false;
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        if (data.message == 'success') {
          this.totalvisit[0]['data'] = [];
          this.TvisitTrend1 = [];
          this.TvisitTrendLabels1 = [];  

          if (data.total > 0) {
            data.data.forEach(res => { 
              this.TvisitTrend1.push(Math.round(res.num_visits));
              this.TvisitTrendLabels1.push(res.clinic_name);
            });
          }
          if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
            this.showBar = true;
          }
          this.totalvisit[0]['data'] = this.TvisitTrend1;

          this.visitsTotal = data.total;
          this.visitsPrevTotal = data.total_ta;
          this.visitsGoal = data.goals;
          if (this.visitsTotal >= this.visitsPrevTotal)
            this.visitsTooltip = 'up';

          this.visitsGoal = data.goals;
        }
      }, error => {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.warningMessage = "Please Provide Valid Inputs!";
      }
      );
    }
  }

  public Accounts = [];

  private getAccounts() {
    this.marketingService.getAccounts(this.clinic_id).subscribe((data) => {
      this.Accounts = [];
      this.selectedAccounts = [];
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      if (data.message == 'success') {
        for (let key in data.data.categories) {
          this.Accounts.push(data.data.categories[key]);
        }
        for (let key in data.data.selectedCategories) {
          this.selectedAccounts.push(data.data.selectedCategories[key]);
        }

      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  private getMyobAccounts() {
    this.marketingService.getMyobAccounts(this.clinic_id).subscribe((data) => {
      this.Accounts = [];
      this.selectedAccounts = [];
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      if (data.message == 'success') {
        for (let key in data.data.categories) {
          this.Accounts.push(data.data.categories[key]);
        }
        for (let key in data.data.selectedCategories) {
          this.selectedAccounts.push(data.data.selectedCategories[key]);
        }

      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public newPativentbr: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3,
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
      ],
      shadowOffsetY: 2,
      shadowBlur: 3,
      // hoverBackgroundColor: 'rgba(0, 0, 0, 0.6)',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      pointBevelWidth: 2,
      pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
      pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: 'rgba(0, 0, 0, 0.3)',
      backgroundOverlayMode: 'multiply'
    }
  ];
  public newPTrend1 = [];
  public newPTrendLabels1 = [];
  public showNPBar: boolean = false;

  public newPatientsTotal = 0;
  public newPatientsPrevTotal = 0;
  public newPatientsTooltip = 'down';
  public newPatientsGoal;
  public fdnewPatientsRatioLoader: any;
  public maxnewPatientsGoal: any = 0;
  //Predictor Ratio :
  private fdnewPatientsRatio() {
    this.showNPBar = false;
    if (this.duration) {
      this.fdnewPatientsRatioLoader = true;
      this.newPatientsTooltip = 'down';
      this.newPatientsTotal = 0;
      var user_id;
      var clinic_id;
      this.marketingService.fdnewPatientsRatio(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
        this.newPatientsTotal = 0;
        this.newPatientsPrevTotal = 0;
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        if (data.message == 'success') {
          this.fdnewPatientsRatioLoader = false;
          this.newPativentbr[0]['data'] = [];
          this.newPTrend1 = [];
          this.newPTrendLabels1 = [];
          if (data.total > 0) {
            data.data.forEach(res => { 
              this.newPTrend1.push(Math.round(res.new_patients));
              this.newPTrendLabels1.push(res.clinic_name);
            });
          }
          if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
            this.showNPBar = true;
          }
          this.newPativentbr[0]['data'] = this.newPTrend1;

          if (data.total != null)
            this.newPatientsTotal = data.total;
          if (data.total_ta != null)
            this.newPatientsPrevTotal = data.total_ta;
          this.newPatientsGoal = data.goals;
          if (this.newPatientsTotal >= this.newPatientsPrevTotal)
            this.newPatientsTooltip = 'up';

          if (this.newPatientsTotal > this.newPatientsGoal)
            this.maxnewPatientsGoal = this.newPatientsTotal;
          else
            this.maxnewPatientsGoal = this.newPatientsGoal;
          if (this.maxnewPatientsGoal == 0)
            this.maxnewPatientsGoal = '';
        }
      }, error => {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.warningMessage = "Please Provide Valid Inputs!";
      }
      );
    }
  }

  public newAPativentbr: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3,
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
      ],
      shadowOffsetY: 2,
      shadowBlur: 3,
      // hoverBackgroundColor: 'rgba(0, 0, 0, 0.6)',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      pointBevelWidth: 2,
      pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
      pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: 'rgba(0, 0, 0, 0.3)',
      backgroundOverlayMode: 'multiply'
    }
  ];
  public newAPTrend1 = [];
  public newAPTrendLabels1 = [];
  public showAPBar: boolean = false;
  public fdActivePatientLoader: boolean = true;
  public fdActivePatients: any = 0;
  public fdActivePatientsTa: any = 0;
  public activePatientsTooltip: any = 'down';
  private fdActivePatient() {
    this.fdActivePatients = 0;
    this.fdActivePatientsTa = 0;
    this.fdActivePatientLoader = true;
    this.showAPBar = false;
    this.marketingService.fdActivePatient(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      this.fdActivePatients = 0;
      this.fdActivePatientsTa = 0;
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      if (data.message == 'success') {
        this.newAPativentbr[0]['data'] = [];
        this.newAPTrend1 = [];
        this.newAPTrendLabels1 = [];
        this.fdActivePatientLoader = false;
        data.data.forEach(res => { 
          this.newAPTrend1.push(Math.round(res.active_patients));
          this.newAPTrendLabels1.push(res.clinic_name);
        });
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showAPBar = true;
        }
        this.newAPativentbr[0]['data'] = this.newAPTrend1;

        this.fdActivePatients = data.total;
        this.fdActivePatientsTa = data.total_ta;
        this.activePatientsTooltip = 'down';
        if (this.fdActivePatients >= this.fdActivePatientsTa)
          this.activePatientsTooltip = 'up';
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );

  }

  public expenseData = [];
  public categories = [];
  public fdnewPatientsAcqLoader: any;
  public newAcqValuePrev = 0;
  public newAcqValueGoal: any = 0;
  public newAcqValueError: boolean = false;
  //Predictor Ratio :
  private fdnewPatientsAcq() {
    this.expenseData = [];
    this.categories = [];
    this.newAcqValueGoal = '';
    this.newAcqValuePrev = 0;
    this.expenseDataTrend1 = [];
    this.newAcqValue = 0;
    this.newAcqValueError = false;
    if (this.duration && this.connectedwith != '') {
      var user_id;
      var clinic_id;
      this.fdnewPatientsAcqLoader = true;

      this.marketingService.categoryExpenses(this.clinic_id, this.startDate, this.endDate, this.duration, this.connectedwith).subscribe((data) => {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        if (data.message == 'success') {
          this.newAcqValueError = false;
          this.fdnewPatientsAcqLoader = false;
          if (data.goals) {
            this.newAcqValueGoal = data.goals;
          }
          // checking if any new account name found in report then we are saving that one in existing accounts
          this.categories = [];
          this.expenseData = [];
          this.Accounts = this.Accounts.concat(data.data_expense_category_report);
          this.Accounts = this.Accounts.filter((item, index) => {
            return (this.Accounts.indexOf(item) == index)
          })
          this.Accounts = this.Accounts.filter(x => !this.selectedAccounts.includes(x));

          data.data.forEach((res, key) => {
            this.expenseData[res.meta_key] = res.expenses;
          });
          if (this.newPatientsPrevTotal > 0)
            this.newAcqValuePrev = Math.round(data.data_ta / this.newPatientsPrevTotal);
          if (this.selectedAccounts.length > 0)
            this.load_chart_acq();

        }
      }, error => {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.fdnewPatientsAcqLoader = false;
        this.newAcqValueError = true;
        this.warningMessage = "Please Provide Valid Inputs!";
      }
      );
    } else {
      this.xeroConnect = false;
      this.myobConnect = false;
    }
  }

  public currentText;

  // Filter By Date
  filterDate(duration) {
    this.isDisabled = true;
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_off').addClass('mat-button-toggle-checked');
    this.showTrend = false;
    $('.customRange').css('display', 'none');
    if (duration == 'w') {
      this.showGoals = false;
      this.goalCount = 1;
      this.trendText = 'Last Week';
      this.currentText = 'This Week';
      const now = new Date();
      if (now.getDay() == 0)
        var day = 7;
      else
        var day = now.getDay();

      var first = now.getDate() - day + 1;
      var last = first + 6;
      this.startDate = this.datePipe.transform(new Date(now.setDate(first)).toUTCString(), 'dd-MM-yyyy');
      var end = new Date();
      end.setFullYear(now.getFullYear());
      end.setMonth(now.getMonth() + 1);
      end.setDate(last);
      this.endDate = this.datePipe.transform(new Date(end).toUTCString(), 'dd-MM-yyyy');
      this.duration = 'w';
      this.loadDentist('all');
    }
    else if (duration == 'm') {
      this.showGoals = true;
      this.goalCount = 1;
      this.trendText = 'Last Month';
      this.currentText = 'This Month';


      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.duration = 'm';
      this.loadDentist('all');

    }
    else if (duration == 'lm') {
      this.showGoals = true;
      this.goalCount = 1;
      this.trendText = 'Previous Month';
      this.currentText = 'Last Month';

      const date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() - 1, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 0), 'dd-MM-yyyy');
      this.duration = 'lm';
      this.loadDentist('all');
    }
    else if (duration == 'q') {
      this.showGoals = false;
      this.goalCount = 3;
      this.trendText = 'Last Quarter';
      this.currentText = 'This Quarter';


      const now = new Date();
      var cmonth = now.getMonth() + 1;
      var cyear = now.getFullYear();
      if (cmonth >= 1 && cmonth <= 3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy')
        ;
      }
      else if (cmonth >= 4 && cmonth <= 6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'dd-MM-yyyy'); 
      }
      else if (cmonth >= 7 && cmonth <= 9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'dd-MM-yyyy'); 
      }
      else if (cmonth >= 10 && cmonth <= 12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 12, 0), 'dd-MM-yyyy');  
      }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.duration = 'q';
      this.loadDentist('all');

    }
    else if (duration == 'lq') {
      this.showGoals = false;
      this.goalCount = 3;
      this.trendText = 'Previous Quarter';
      this.currentText = 'Last Quarter';


      const now = new Date();
      var cmonth = now.getMonth() + 1;
      var cyear = now.getFullYear();

      if (cmonth >= 1 && cmonth <= 3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear() - 1, 9, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear() - 1, 12, 0), 'dd-MM-yyyy');
      }
      else if (cmonth >= 4 && cmonth <= 6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy');
      }
      else if (cmonth >= 7 && cmonth <= 9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'dd-MM-yyyy');
      }
      else if (cmonth >= 10 && cmonth <= 12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'dd-MM-yyyy');
      }
      this.duration = 'lq';
      this.loadDentist('all');

    }
    else if (duration == 'cytd') {
      this.showGoals = false;
      this.trendText = 'Last Year';
      this.currentText = 'This Year';
      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      var difMonths = new Date().getMonth() - new Date(date.getFullYear(), 0, 1).getMonth();
      this.goalCount = difMonths + 1;
      this.duration = 'cytd';
      this.loadDentist('all');
    } else if (duration == 'lcytd') {
      this.trendText = 'Previous Year';
      this.currentText = 'Last Year';
      this.duration = 'lcytd';
      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 0, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 11, 31), 'dd-MM-yyyy');
      this.goalCount = 12;
      this.loadDentist('all');
    }
    else if (duration == 'fytd') {
      this.showGoals = false;
      this.trendText = 'Last Financial Year';
      this.currentText = 'This Financial Year';
      var date = new Date();
      if ((date.getMonth() + 1) <= 6) {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 6, 1), 'dd-MM-yyyy');
      } else {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 6, 1), 'dd-MM-yyyy');
      }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

      if ((date.getMonth() + 1) <= 6) {
        this.goalCount = this.monthDiff(new Date(date.getFullYear() - 1, 6, 1), new Date());
      } else {
        this.goalCount = this.monthDiff(new Date(date.getFullYear(), 6, 1), new Date());
      }
      //var difMonths = new Date().getMonth() - new Date(date.getFullYear(), 6, 1).getMonth();
      //this.goalCount = Math.abs(difMonths + 1);
      this.duration = 'fytd';
      this.loadDentist('all');
    } else if (duration == 'lfytd') {
      this.showGoals = false;
      this.trendText = 'Previous Financial Year';
      this.currentText = 'Last Financial Year';
      this.duration = 'lfytd'
      this.goalCount = 12;
      var date = new Date();
      if ((date.getMonth() + 1) <= 6) {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
      } else {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 6, 1), 'dd-MM-yyyy');
      }
      if ((date.getMonth() + 1) <= 6) {
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');
      } else {
        this.endDate = this.datePipe.transform(new Date(date.getFullYear(), 5, 30), 'dd-MM-yyyy');
      }
      /*        this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
              this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');   */
      this.loadDentist('all');
    }
    else if (duration == 'custom') {
      this.trendText = '';
      this.duration = 'custom';
      this.currentText = '';
      let selectedDate = this.chartService.customSelectedDate$.value;
      this.startDate = this.datePipe.transform(selectedDate.startDate, 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(selectedDate.endDate, 'dd-MM-yyyy');
      var selectedMonth = this.datePipe.transform(selectedDate.startDate, 'M');
      var selectedYear = this.datePipe.transform(selectedDate.startDate, 'yyyy');
      var selectedStartDate = this.datePipe.transform(selectedDate.startDate, 'd');
      var selectedEndDate = this.datePipe.transform(selectedDate.endDate, 'd');
      var LastDay = new Date(parseInt(selectedYear), parseInt(selectedMonth) , 0).getDate();
      if(parseInt(selectedStartDate) == 1 && parseInt(selectedEndDate) == LastDay){
        this.showGoals = true;
      }else{
        this.showGoals = false;
      }
      this.loadDentist('all');
      // $('.customRange').css('display', 'block');
    }
    $('.filter').removeClass('active');
    $('.filter_' + duration).addClass("active");
    // $('.filter_custom').val(this.startDate+ " - "+this.endDate);


  }

  choosedDate(val) {
    val = (val.chosenLabel);
    var val = val.toString().split(' - ');
    this.startDate = this.datePipe.transform(val[0], 'dd-MM-yyyy');
    this.endDate = this.datePipe.transform(val[1], 'dd-MM-yyyy');
    this.duration = 'custom';
    // this.loadDentist('all');

    // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
    $('.customRange').css('display', 'none');

  }

  toggleFilter(val) {
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_' + val).addClass('mat-button-toggle-checked');
    $('.filter').removeClass('active');
    // this.activePatients = false;
    this.Apirequest = 0;
    var date = new Date();
    this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    if (val == 'current') {
      this.toggleChecked = true;
      this.trendValue = 'c';
      this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 1, date.getMonth(), 1), 'dd-MM-yyyy');

      this.toggleChangeProcess();
    }
    else if (val == 'historic') {
      this.toggleChecked = true;
      this.trendValue = 'h';
      this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 10, date.getMonth(), 1), 'dd-MM-yyyy');

      this.toggleChangeProcess();
    }
    else if (val == 'off') {
      // this.filterDate("m");
      $('.filter_m').addClass("active");
      this.showTrend = false;
    }

  }

  private getClinics() {
    this.headerService.getClinics().subscribe((res) => {
      if (res.message == 'success') {
        this.clinicsData = res.data;
      }
    }, error => { });
  }

  initiate_dentist() {
    var val = $('.internal_dentist').val();
    if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
      //this.loadDentist(val);
    }else{
      // this.loadDentist(val);
    }    
  }

  toggleChecked = false;
  trendValue = '';
  isDisabled = true;
  isChecked = true;
  mode = 'Internal';
  showTrend = false;
  toggleChangeProcess() {
    this.Apirequest = 4;
    this.showTrend = true;
    if (this.connectedwith != '' && this.connectedwith != 'none' && this.multipleClinicsSelected == false) {
      this.Apirequest = 5;
    }
    if(this.connectedwith != 'none')
      this.fdnewPatientsAcqTrend();

    this.mkNewPatientsByReferralTrend();
    //this.mkNewPatientsByReferralTrend();
    //this.mkRevenueByReferral();
    this.mkRevenueByReferralTrend();
    if(this.activePatients){
      this.mkNoActivePatientsTrend();
    }else{        
      this.mkNoNewPatientsTrend();
    }
    this.totalRevenueByReferral
    
    this.fdvisitsRatioTrend();



  }


  public visitsChartTrend: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3,
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
      ],
      shadowOffsetY: 2,
      shadowBlur: 3,
      // hoverBackgroundColor: 'rgba(0, 0, 0, 0.6)',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      pointBevelWidth: 2,
      pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
      pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: 'rgba(0, 0, 0, 0.3)',
      backgroundOverlayMode: 'multiply'
    }];
  public visitsChartTrend1 = [];
  public visitsChartTrendLabels = [];
  public visitsChartTrendLabels1 = [];
  public fdvisitsRatioTrendLoader: any;
  public totavisitTrendMulti: any[] = [
    { data: [], label: '' }];
  public showByclinic : boolean =false;
  public totalVisitMultiLabels =[];
  public totalVisitMultiLabels1 =[];
  private fdvisitsRatioTrend() {
    this.visitsChartTrendLabels1 = [];
    this.visitsChartTrendLabels = [];
    this.fdvisitsRatioTrendLoader = true;
    this.visitsChartTrend1 = [];
    var user_id;
    var clinic_id;
    this.showByclinic = false;
    this.totavisitTrendMulti =[];
    this.totalVisitMultiLabels =[];
    this.totalVisitMultiLabels1 =[];
    this.marketingService.mkTotalVisitsTrend(this.clinic_id, this.trendValue).subscribe((data) => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.visitsChartTrend1 = [];
      this.visitsChartTrendLabels = [];
      this.visitsChartTrendLabels1 = [];
      this.visitsChartTrend[0]['data'] = [];
      this.fdvisitsRatioTrendLoader = false;
      if (data.message == 'success') {
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showByclinic = true;
        }
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          data.data.sort((a, b)=> a.duration === b.duration ? 0 : a.duration > b.duration || -1);
          data.data.forEach(res => { 
            res.val.forEach((reslt, key) => {
              if (typeof (this.totavisitTrendMulti[key]) == 'undefined') {
                this.totavisitTrendMulti[key] = { data: [], label: '' };
              }
              if (typeof (this.totavisitTrendMulti[key]['data']) == 'undefined') {
                this.totavisitTrendMulti[key]['data'] = [];
              }
              
                this.totavisitTrendMulti[key]['data'].push(Math.round(reslt.num_visits));
                this.totavisitTrendMulti[key]['label'] = reslt.clinic_name;
                this.totavisitTrendMulti[key]['backgroundColor'] = this.doughnutChartColors[key];
                this.totavisitTrendMulti[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];
             }); 
             if (this.trendValue == 'c')
              this.totalVisitMultiLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
            else
              this.totalVisitMultiLabels1.push(res.duration);
          });
          this.totalVisitMultiLabels = this.totalVisitMultiLabels1;

        }else{
            data.data.forEach(res => {
              this.visitsChartTrend1.push(res.num_visits);
              if (this.trendValue == 'c')
                this.visitsChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              else
                this.visitsChartTrendLabels1.push(res.year);
            });
            this.visitsChartTrend[0]['data'] = this.visitsChartTrend1;
    
            this.visitsChartTrendLabels = this.visitsChartTrendLabels1;
        }
        
      }
    }, error => {
      this.Apirequest -= 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public newPatientsChartTrend: any[] =
    [
      {
        data: [],
        label: '',
        shadowOffsetX: 3,
        backgroundColor:
          [
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
            this.chartService.colors.odd
          ],
        shadowOffsetY: 2,
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        pointBevelWidth: 2,
        pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
        pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
        pointShadowOffsetX: 3,
        pointShadowOffsetY: 3,
        pointShadowBlur: 10,
        pointShadowColor: 'rgba(0, 0, 0, 0.3)',
        backgroundOverlayMode: 'multiply'
      }
    ];
  public activePatientsChartTrend: any[] =
    [
      {
        data: [],
        label: '',
        shadowOffsetX: 3,
        backgroundColor:
          [
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
            this.chartService.colors.odd
          ],
        shadowOffsetY: 2,
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        pointBevelWidth: 2,
        pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
        pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
        pointShadowOffsetX: 3,
        pointShadowOffsetY: 3,
        pointShadowBlur: 10,
        pointShadowColor: 'rgba(0, 0, 0, 0.3)',
        backgroundOverlayMode: 'multiply'
      }
    ];
  public newPatientsTrendMulti: any[] = [
    { data: [], label: '' }];  
  public showNPclinic : boolean =false;
  public newPatientsMultiLabels =[];
  public newPatientsMultiLabels1 =[];  
  public newPatientsChartTrend1 = [];
  public newPatientsChartTrendLabels = [];
  public newPatientsChartTrendLabels1 = [];
  public newPatientsChartTemp = [];
  private mkNoNewPatientsTrend() {
    this.newPatientsChartTrendLabels1 = [];
    this.newPatientsChartTrend1 = [];
    this.fdnewPatientsRatioLoader = true;
    // this.fdnewPatientsAcqLoader = true;
    this.marketingService.mkNoNewPatientsTrend(this.clinic_id, this.trendValue).subscribe((data) => {
      this.fdnewPatientsRatioLoader = false;
      this.newPatientsChartTrend1 = [];
      this.newPatientsChartTrendLabels1 = [];
      this.newPatientsChartTrendLabels = [];
      this.newPatientsChartTrend[0]['data'] = [];
      this.showNPclinic = false;
      this.newPatientsTrendMulti =[];
      this.newPatientsMultiLabels =[];
      this.newPatientsMultiLabels1 =[];
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      if (data.message == 'success') {
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showNPclinic = true;
            data.data.sort((a, b)=> a.duration === b.duration ? 0 : a.duration > b.duration || -1);
            data.data.forEach(res => { 
              res.val.forEach((reslt, key) => {
                if (typeof (this.newPatientsTrendMulti[key]) == 'undefined') {
                  this.newPatientsTrendMulti[key] = { data: [], label: '' };
                }
                if (typeof (this.newPatientsTrendMulti[key]['data']) == 'undefined') {
                  this.newPatientsTrendMulti[key]['data'] = [];
                }
                
                  this.newPatientsTrendMulti[key]['data'].push(Math.round(reslt.new_patients));
                  this.newPatientsTrendMulti[key]['label'] = reslt.clinic_name;
                  this.newPatientsTrendMulti[key]['backgroundColor'] = this.doughnutChartColors[key];
                  this.newPatientsTrendMulti[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];
              }); 
              if (this.trendValue == 'c')
                this.newPatientsMultiLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
              else
                this.newPatientsMultiLabels1.push(res.duration);
            });
            this.newPatientsMultiLabels = this.newPatientsMultiLabels1;
        }else{
          this.newPatientsChartTemp = data.data;
          data.data.forEach(res => {
            this.newPatientsChartTrend1.push(res.new_patients);
            if (this.trendValue == 'c')
              this.newPatientsChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.newPatientsChartTrendLabels1.push(res.year);
          });
          this.newPatientsChartTrend[0]['data'] = this.newPatientsChartTrend1;
          this.newPatientsChartTrendLabels = this.newPatientsChartTrendLabels1;
          // this.fdnewPatientsAcqTrend();
        }
      }
      this.fdnewPatientsRatioLoader = false;
      // this.fdnewPatientsAcqLoader = false;

    }, error => {
      this.Apirequest -= 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public activePatientsChartTrend1 = [];
  public activePatientsChartTrendLabels = [];
  public activePatientsChartTrendLabels1 = [];
  public activePatientsChartTemp = [];
  public newAPatientsTrendMulti: any[] = [
    { data: [], label: '' }];  
  public showAPclinic : boolean =false;
  public newAPatientsMultiLabels =[];
  public newAPatientsMultiLabels1 =[];
  private mkNoActivePatientsTrend() {
    this.activePatientsChartTrendLabels1 = [];
    this.activePatientsChartTrend1 = [];
    // this.fdnewPatientsRatioLoader = true;
    this.fdActivePatientLoader = true;
    this.showAPclinic = false;
      this.newAPatientsTrendMulti =[];
      this.newAPatientsMultiLabels =[];
      this.newAPatientsMultiLabels1 =[];
    this.marketingService.mkNoActivePatientsTrend(this.clinic_id, this.trendValue).subscribe((data) => {
      // this.fdnewPatientsRatioLoader = false;
      this.activePatientsChartTrend1 = [];
      this.activePatientsChartTrendLabels1 = [];
      this.activePatientsChartTrendLabels = [];
      this.activePatientsChartTrend[0]['data'] = [];
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      if (data.message == 'success') {
        
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showAPclinic = true;
          data.data.sort((a, b)=> a.duration === b.duration ? 0 : a.duration > b.duration || -1);
          data.data.forEach(res => { 
            res.val.forEach((reslt, key) => {
            if (typeof (this.newAPatientsTrendMulti[key]) == 'undefined') {
              this.newAPatientsTrendMulti[key] = { data: [], label: '' };
            }
            if (typeof (this.newAPatientsTrendMulti[key]['data']) == 'undefined') {
              this.newAPatientsTrendMulti[key]['data'] = [];
            }
            
              this.newAPatientsTrendMulti[key]['data'].push(Math.round(reslt.active_patients));
              this.newAPatientsTrendMulti[key]['label'] = reslt.clinic_name;
              this.newAPatientsTrendMulti[key]['backgroundColor'] = this.doughnutChartColors[key];
              this.newAPatientsTrendMulti[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];
            }); 
            if (this.trendValue == 'c')
            this.newAPatientsMultiLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
            else
            this.newAPatientsMultiLabels1.push(res.duration);
          });
          this.newAPatientsMultiLabels = this.newAPatientsMultiLabels1;
        }else{
          this.activePatientsChartTemp = data.data;
          data.data.forEach(res => {
            this.activePatientsChartTrend1.push(res.active_patients);
            if (this.trendValue == 'c')
              this.activePatientsChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.activePatientsChartTrendLabels1.push(res.year);
          });
          this.activePatientsChartTrend[0]['data'] = this.activePatientsChartTrend1;
          this.activePatientsChartTrendLabels = this.activePatientsChartTrendLabels1;
        // this.fdnewPatientsAcqTrend();
        }
        this.fdActivePatientLoader = false;
      }
        
      

    }, error => {
      this.Apirequest -= 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    cornerRadius: 60,
    curvature: 1,
    animation: {
      duration: 1500,
      easing: 'easeOutSine'
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: { display: true },
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          userCallback: (label, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return '$' + this.decimalPipe.transform(label);
            }
          },
        },
      }],
    },
    tooltips: {
      mode: 'x-axis',
      custom: function (tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
      callbacks: {
        label: (tooltipItems, data) => {
          return tooltipItems.xLabel + ": $" + this.decimalPipe.transform(tooltipItems.yLabel);
        },
        title: function () {
          return '';
        }

      }
    },
    legend: {
      position: 'top',
      onClick: function (e, legendItem) {
        var index = legendItem.datasetIndex;
        var ci = this.chart;
        if (index == 0) {
          ci.getDatasetMeta(1).hidden = true;
          ci.getDatasetMeta(index).hidden = false;
        }
        else if (index == 1) {
          ci.getDatasetMeta(0).hidden = true;
          ci.getDatasetMeta(index).hidden = false;
        }
        ci.update();
      },
    },
  };
  public expenseDataTrend: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3,
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
        this.chartService.colors.even
      ],
      shadowOffsetY: 2,
      shadowBlur: 3,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      pointBevelWidth: 2,
      pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
      pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: 'rgba(0, 0, 0, 0.3)',
      backgroundOverlayMode: 'multiply'
    }];
  public expenseDataTrend1 = [];
  public expenseDataTrendLabels1 = [];
  public expenseDataTrendLabels = [];
  public dataY: any = 0;
  //Predictor Ratio :
  private fdnewPatientsAcqTrend() {
    this.expenseData = [];
    this.categories = [];
    this.newAcqValueGoal = '';
    this.newAcqValuePrev = 0;
    this.expenseDataTrend1 = [];
    this.expenseDataTrendLabels1 = [];
    this.fdnewPatientsAcqLoader = true;
    this.newAcqValueError = false;
    if (this.duration && this.connectedwith != '') {
      var user_id;
      var clinic_id;
      this.marketingService.categoryExpensesTrend(this.clinic_id, this.trendValue, this.connectedwith).subscribe((data) => {
        this.fdnewPatientsAcqLoader = false;
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        if (data.message == 'success') {
          this.newAcqValueError = false;
          this.expenseDataTrend1 = [];
          this.expenseDataTrendLabels1 = [];
          this.newPatientsChartTemp.forEach((res, key) => {
            data.data.forEach((res1, key1) => {
              if (this.trendValue == 'c' && res1.duration == res.year_month) {
                let dataX: number = 0;
                this.dataY = 0;
                let percent: any = 0;
                if (res1.val != undefined) {
                  res1.val.forEach((res2, key2) => {
                    if (res2.meta_key != 'Total Operating Expenses')
                      this.dataY = parseInt(this.dataY) + parseInt(res2.expenses);
                  });
                }

                if (res.val != '') {
                  dataX = res.new_patients;
                }

                if (dataX != 0)
                  percent = this.dataY / dataX;

                this.expenseDataTrend1.push(Math.round(percent));
                this.expenseDataTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));

              } else if (this.trendValue == 'h' && res1.duration == res.year) {
                let dataX: number = 0;
                this.dataY = 0;
                let percent: any = 0;
                if (res1.val != undefined) {
                  res1.val.forEach((res2, key2) => {
                    if (res2.meta_key != 'Total Operating Expenses')
                      this.dataY = parseInt(this.dataY) + parseInt(res2.expenses);
                  });
                }

                if (res.val != '') {
                  dataX = res.new_patients;
                }

                if (dataX != 0)
                  percent = this.dataY / dataX;

                this.expenseDataTrend1.push(Math.round(percent));
                this.expenseDataTrendLabels1.push(res.year);
              }
            });

          });
          this.expenseDataTrend[0]['data'] = this.expenseDataTrend1;
          this.expenseDataTrendLabels = this.expenseDataTrendLabels1;
        }
      }, error => {
        this.Apirequest -= 1;
        this.enableDiabaleButton(this.Apirequest);
        this.newAcqValueError = true;
        this.warningMessage = "Please Provide Valid Inputs!";
      }
      );
    } else {
      this.xeroConnect = false;
      this.myobConnect = false;
    }
  }

  save_account() {
    var selectedAccounts = JSON.stringify(Object.assign({}, this.selectedAccounts));
    if (this.connectedwith == 'myob') {
      this.marketingService.mkSaveAcctMyob(this.clinic_id, escape(selectedAccounts)).subscribe((data) => {
        if (data.message == 'success') {
          this.load_chart_acq();
          this.fdnewPatientsAcq();
        }
      });
    } else if (this.connectedwith == 'xero') {
      this.marketingService.saveSelectedCategories(this.clinic_id, escape(selectedAccounts)).subscribe((data) => {
        if (data.message == 'success') {
          this.load_chart_acq();
          this.fdnewPatientsAcq();
        }
      });
    }


  }

  public newAcqValue: any = 0;
  public newAcqValueMax: any = 35;
  load_chart_acq() {
    var totalY = 0;
    this.selectedAccounts.forEach((res, key) => {
      if (this.expenseData[res])
        totalY = totalY + parseInt(this.expenseData[res]);
    });
    this.newAcqValue = 0;
    if (totalY != undefined && this.newPatientsTotal > 0)
      this.newAcqValue = (totalY / this.newPatientsTotal).toFixed(0);
    if (parseFloat(this.newAcqValueGoal) >= parseFloat(this.newAcqValue)) {
      this.newAcqValueMax = parseFloat(this.newAcqValueGoal);
    } else if (parseFloat(this.newAcqValueGoal) < parseFloat(this.newAcqValue)) {
      this.newAcqValueMax = parseFloat(this.newAcqValue);
    }
    $('.close_modal').click();
  }

  public changeLevel(val) {
    if (val == 'newPatient') {
      this.newPatientsTimeLabelsl2 = [];
      this.totalNewPatientsReferral = Math.round(this.mkNewPatientsByReferralAll.total);
      this.newPatientsReferral$.next(this.totalNewPatientsReferral);
      this.newPatientsTimeData1 = [];
      this.newPatientsTimeLabelsl2 = [];
      this.newPatientsTimeLabels1 = [];
      if (this.mkNewPatientsByReferralAll.data.patients_reftype.length > 0) {
        var i = 0;
        this.mkNewPatientsByReferralAll.data.patients_reftype.forEach(res => {
          if (res.patients_visits > 0) {
            if (i < 10) {
              this.newPatientsTimeData1.push(res.patients_visits);
              this.newPatientsTimeLabels1.push(res.reftype_name);
              i++;
            }
          }
        });
      }
      this.newPatientsTimeData = this.newPatientsTimeData1;
      this.newPatientsTimeLabels = this.newPatientsTimeLabels1;
      //   this.mkNewPatientsByReferral();
    } else if (val == 'revenue') {
      this.revenueReferralLabelsl2 = [];

      this.totalRevenueByReferral = this.decimalPipe.transform(Math.round(this.reffralAllData.total || 0));
      this.revenueByReferralCount$.next(Math.round(this.reffralAllData.total || 0));
      // this.pieChartOptions.elements.center.text = '$ ' + this.totalRevenueByReferral;
      if (this.revenueRefChart) {
        this.revenueRefChart.ngOnDestroy();
        this.revenueRefChart.chart = this.revenueRefChart.getChartBuilder(this.revenueRefChart.ctx);
      }
      this.revenueReferralData1 = [];
      this.revenueReferralLabelsl2 = [];
      this.revenueReferralLabels1 = [];
      if (this.reffralAllData.data.patients_reftype.length > 0) {
        var i = 0;
        this.reffralAllData.data.patients_reftype.forEach(res => {
          if (res.invoice_amount > 0) {
            if (i < 10) {
              this.revenueReferralData1.push(Math.round(res.invoice_amount));
              this.revenueReferralLabels1.push(res.reftype_name);
              i++;
            }
          }
        });
      }
      this.revenueReferralData = this.revenueReferralData1;
      this.revenueReferralLabels = this.revenueReferralLabels1;
      this.mkRevenueByReferralLoader = false;
    }
  }

  add_account(index) {
    if (!this.selectedAccounts.includes(this.Accounts[index]))
      this.selectedAccounts.push(this.Accounts[index]);
    this.Accounts.splice(index, 1);
  }
  remove_account(index) {
    if (!this.Accounts.includes(this.selectedAccounts[index]))
      this.Accounts.push(this.selectedAccounts[index]);
    this.selectedAccounts.splice(index, 1);
  }

  checkXeroStatus() {
    this.newAcqValueError = false;
    this.clinicSettingsService.checkXeroStatus(this.clinic_id).subscribe((res) => {
      if (res.message == 'success') {
        if (res.data.xero_connect == 1) {
          this.xeroConnect = true;
        } else {
          this.xeroConnect = false;
        }
      } else {
        this.xeroConnect = false;
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }
  checkMyobStatus() {
    this.newAcqValueError = false;
    this.clinicSettingsService.checkMyobStatus(this.clinic_id).subscribe((res) => {
      if (res.message == 'success') {
        if (res.data.myob_connect == 1) {
          this.myobConnect = true;
        } else {
          this.myobConnect = false;
        }
      } else {
        this.myobConnect = false;
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  getChartsTips() {
    this.chartstipsService.getCharts(4).subscribe((data) => {
      if (data.message == 'success') {
        this.charTips = data.data;
      }
    }, error => { });
  }


  public showAccountsButton: boolean = false;
  getRolesIndividual() {
    this.showAccountsButton = false;
    if (this._cookieService.get("user_type") == '2') {
      this.showAccountsButton = true;
    } else {
      this.rolesUsersService.getRolesIndividual().subscribe((res) => {
        if (res.message == 'success') {
          if (res.data.indexOf('profilesettings') >= 0) {
            this.showAccountsButton = true;
          }
        }
      });
    }

  }

  activePat() {
    if (this.activePatients == true) {
      this.activePatients = false;
      this.patientText = 'No. New Patients';     
      if(this.showTrend){
        this.mkNoNewPatientsTrend();
      }else{
        this.fdnewPatientsRatio();
      }      
    } else if (this.activePatients == false) {
      this.activePatients = true;
      this.patientText = 'No. Active Patients';     
      if(this.showTrend){
        this.mkNoActivePatientsTrend();
      }else{
        this.fdActivePatient();
      }     
    }
  }
}