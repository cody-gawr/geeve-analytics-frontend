import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ClinicianAnalysisService } from './cliniciananalysis.service';
import { DentistService } from '../../dentist/dentist.service';
import { FrontDeskService } from '../frontdesk/frontdesk.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { HeaderService } from '../../layouts/full/header/header.service';
import { CookieService } from "ngx-cookie";
import { Chart } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { BaseChartDirective, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { ChartService } from '../chart.service';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TooltipLayoutComponent } from '../../shared/tooltip/tooltip-layout.component';
import { AppConstants } from '../../app.constants';
import { ChartstipsService } from '../../shared/chartstips.service';
import { environment } from "../../../environments/environment";


export interface Dentist {
  providerId: string;
  name: string;
}
@Component({
  templateUrl: './cliniciananalysis.component.html',
  styleUrls: ['./cliniciananalysis.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/**
  *Clinician analysis graph Dashboard
  *AUTHOR - Teq Mavens
  */
export class ClinicianAnalysisComponent implements AfterViewInit, OnDestroy {
  TooltipLayout = TooltipLayoutComponent;
  @ViewChild("myCanvas") canvas: ElementRef;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


  lineChartColors;
  subtitle: string;
  public id: any = {};
  public clinic_id: any;
  public UrlSegment: any = {};
  public dentistCount: any = {};
  public doughnutChartColors = [];
  public startDate = '';
  public endDate = '';
  public duration = '';
  public trendText;
  public showTrend = false;
  public showWeekTrend: boolean = false;
  public showTrendChart = false;
  public goalchecked = 'off';
  public averagechecked = false;
  public averageToggle = false;
  public childid: string = '';
  public user_type: string = '';
  public apiUrl = environment.apiUrl;
  public showGoals: boolean = false;

  public proCollShow: number = 1;
  public hrCollShow: number = 1;
  public proSelectShow: any = 'production_all';
  public hrSelectShow: any = "hr_all";
  public charTips: any = [];
  public userPlan: any = 'lite';
  public numberOfRecords:number = 50;

  public flag = false;
  private _routerSub = Subscription.EMPTY;
  newPatientPluginObservable$: Observable<PluginServiceGlobalRegistrationAndOptions[]>;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  newPatientTotal$ = new BehaviorSubject<number>(0);

  chartData1 = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels1 = ['January', 'February', 'Mars', 'April'];
  private dentistProductionLabelsByIndex = [];
  private treatmentPlanProposedProvidersByInx = [];
  private showCompare: boolean = false;
  public Apirequest = 0;
  constructor(
    private cliniciananalysisService: ClinicianAnalysisService,
    private dentistService: DentistService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private _cookieService: CookieService,
    private router: Router,
    private frontdeskService: FrontDeskService,
    private toastr: ToastrService,
    private decimalPipe: DecimalPipe,
    private chartService: ChartService,
    public constants: AppConstants,
    public chartstipsService: ChartstipsService
  ) {
    this.getChartsTips();
    this._routerSub = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((value) => {
        // this.initiate_clinic();
        this.user_type = this._cookieService.get("user_type");
        if (this._cookieService.get("childid"))
          this.childid = this._cookieService.get("dentistid");
      });
    this.user_type = this._cookieService.get("user_type");
  }

  ngOnDestroy(): void {
    $('.multi-clinic-dis').removeClass("disablePointer"); 
    $('.multi-clinic-pro').removeClass("disablePointerProgress");
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('.topbar-strip').removeClass('responsive-top');
  }
  /**
  *Check If logged in user is eligible to access this page.
  *AUTHOR - Teq Mavens
  */
  private warningMessage: string;


  private getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

  //initialize component
  ngAfterViewInit() {
    this.userPlan = this._cookieService.get("user_plan");
    this.newPatientPluginObservable$ = this.newPatientTotal$.pipe(
      takeUntil(this.destroyed$),
      map((count) => {
        return this.chartService.beforeDrawChart(count)
      })
    );

    //this.initiate_clinic();
    this.user_type = this._cookieService.get("user_type");
    if (this._cookieService.get("dentistid"))
      this.childid = this._cookieService.get("dentistid");

    //   $('.external_dentist').val('all');
    $('#title').html('<span> Clinician Analysis </span>');
    $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate));

    $('.external_clinic').show();
    //$('.dentist_dropdown').show();
    //$('.dentist_dropdown').removeClass('hide');
    $('.header_filters').removeClass('flex_direct_mar');
    $('.header_filters').removeClass('hide_header');
    if (this.childid != '') {
      //$('.dentist_dropdown').hide();
      //$('.header_filters').addClass('flex_direct_mar');
    }
    if ($('body').find('span#currentDentist').length > 0) {
      var did = $('body').find('span#currentDentist').attr('did');
      $('.external_dentist').val(did);
    }
    else {
      $('.external_dentist').val('all');
    }
    //  this.filterDate('cytd');

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

    $('.topbar-strip').addClass('responsive-top');
    this.doughnutChartColors = [
      {
        backgroundColor: [
          '#6edbbb', '#b0fffa', '#abb3ff', '#ffb4b5', '#fffcac', '#FFE4E4', '#FFD578', '#54D2FF', '#E58DD7', '#A9AABC', '#F2ECFF', '#5689C9', '#F9F871'
        ]
      }];

    this.filterDate(this.chartService.duration$.value);
  }

  ngOnInit() {
    let namedChartAnnotation = ChartAnnotation;
    namedChartAnnotation["id"] = "annotation";
    Chart.pluginService.register(namedChartAnnotation);
    if (this._cookieService.get("dentist_toggle") === 'true') {
      this.averageToggle = true;
      this.showTrend = false;
    }
  }

  //Load Clinic Data
  initiate_clinic() {
    //$('.internal_dentist').val('all');
    //$('.external_dentist').val('all');

    var val = $('#currentClinic').attr('cid');
    this.showWeekTrend = false;
    if (this._cookieService.get("dentistid")) {
      this.childid = this._cookieService.get("dentistid");
      this.selectedDentist = this._cookieService.get("dentistid");
    }
    if (val != undefined) {
      this.clinic_id = val;

      if (this.user_type == '4') {
        this.getClinic();
      }
      
      if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
      // this.getDentists();
      }else{
        this.getDentists();
      }
      this.filterDate(this.chartService.duration$.value);
    }

  }

  public compareModeEnable: boolean = false;
  /********** Get the clinic information ***********/
  getClinic() {
    this.cliniciananalysisService.getClinics(this.clinic_id, 'CompareMode').subscribe((data: any) => {
      if (data.data) {
        this.compareModeEnable = (data.data.compare_mode == 1) ? true : false;
      }
    }, error => { });
  }

  /**************************************************/



  splitName(name: string) {
    const regex = /\w+\s\w+(?=\s)|\w+/g;
    return name.toString().trim().match(regex);
    

  }

  dentists: Dentist[] = [
    { providerId: 'all', name: 'All Dentists' },
  ];
  public barChartColors: Array<any>;
  public barChartColorsDent: Array<any>;
  public barChartColorsOht: Array<any>;
  public barChartColors1: Array<any>;
  public barChartColors1Dent: Array<any>;
  public barChartColors1Oht: Array<any>;
  public barChartColors2: Array<any>;
  public barChartColors2Dent: Array<any>;
  public barChartColors2Oht: Array<any>;
  public barChartType = 'bar';
  public barChartLegend = false;
  public gradient = 'bar';
  public barChartBorder = "#1CA49F";
  public barChartColorsHrDent: Array<any>;
  public barChartColorsHrOht: Array<any>;
  

  //labels
  public barChartLabels: string[] = [];
  public pieChartLabels: string[] = ['ddfs'];
  public planChartLabels: string[] = [];
  public recallChartLabels: string[] = [];
  public treatmentPreChartLabels: string[] = [];
  public treatmentChartLabels: string[] = [];
  public barChartLabels1: string[] = [];
  public planChartLabels1: string[] = [];
  public recallChartLabels1: string[] = [];
  public treatmentPreChartLabels1: string[] = [];
  public treatmentChartLabels1: string[] = [];
  public doughnutChartLabels: string[] = [];
  public doughnutChartLabels1: string[] = [];

  public newPatientChartLabels: string[] = [];
  public newPatientChartLabels1: string[] = [];
  public doughnutChartType: string = 'doughnut';
  public hourlyRateChartLabels: string[] = [];
  public hourlyRatePreChartLabels1: string[] = [];

  //data
  public barChartData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
    }
  ];
  public pieChartData: any[] = [
    { data: [10], label: 'Dentist Production' }
  ];

  public planChartDataP: any[] = [
    {
      ...this.chartService.baseChartData,
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even
      ],
      data: [],
      label: ''
    }
  ];
  public planChartDataC: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
      label: '',
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even
      ]
    }
  ];
  public doughnutDataset = {
    ...this.chartService.baseChartData
  };
  public doughnutChartData: number[] = [350, 450, 100];
  public selectedDentist: string;
  public barChartData1: any[] = [];
  public planChartData1: any[] = [];
  public planChartData2: any[] = [];
  public recallChartData1: any[] = [];
  public treatmentPreChartData1: any[] = [];
  public treatmentChartData1: any[] = [];
  public hourlyRateChartData1: any[] = [];
  public doughnutChartData1: number[] = [];
  public newPatientChartData: number[] = [350, 450, 100];
  public newPatientChartData1: number[] = [];
  //Total  
  public productionTotal = 0;
  public productionTotalAverage = 0;
  public productionGoal = 0;
  public collectionTotalGoal = 0;
  public planTotal = 0;
  public planTotalAverage = 0;
  public planTotalGoal = 0;

  public recallTotal = 0;
  public recallTotalAverage = 0;
  public treatmentPreTotal = 0;
  public treatmentPreTotalAverage = 0;
  public treatmentTotal = 0;
  public treatmentTotalAverage = 0;
  public doughnutTotal = 0;
  public doughnutTotalAverage = 0;
  public doughnutGoals = 0;
  public newPatientTotal = 0;
  public newPatientTotalAverage = 0;
  public newPatientGoals = 0;
  public gaugePrependText = "$";
  public gaugeAppendText = "%";
  public gaugeDuration = '2500';
  // events
  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }
  public gaugeType = "arch";
  public gaugeValue: any = 0;
  public gaugeLabel = "";
  public gaugeThick = "20";
  public foregroundColor = "#4ccfae";
  public backgroundColor = '#f4f0fa';
  public cap = "round";
  public size = "300"

  public gaugeValueTreatment = 0;
  public treatmentPlanAverageCostTab = '1';

  public gaugeLabelTreatment = "";

  public gaugeValuePatients = 0;
  public gaugeLabelPatients = "";

  public newPatientValuePatients: number = 0;
  public newPatientLabelPatients = "";
  public recallValue: any;
  public recallLabel = "";
  public recallGoal = 0;
  public treatmentPreValue: any = '';
  public treatmentPreLabel = "";
  public treatmentPreGoal = 0;
  public barChartOptions: any = {
    borderRadius: 50,
    hover: { mode: null },
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
        gridLines: {
          display: true
        },
        ticks: {
          autoSkip: false,
          userCallback: (label: string) => {
            if(label != ''){
              const names = this.splitName(label);
              // if (names.length > 1) {
              //   return `${names[0][0]} ${names[1]}`
              // } else return `${names[0]}`;
              if (names.length == 3) {
                return `${names[0]}`
              } else if (names.length == 2){
                return `${names[0][0]} ${names[1]}`
              } else {
                return `${names[0]}`;
              }
            }            
          }
        },
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
        gridLines: {
          // color: '#fbfbfc'
        }
      }],
    },
    tooltips: {
      mode: 'x-axis',
      bodyFontFamily: 'Gilroy-Regular',
      cornerRadius: 0,
      // backgroundColor: '#fff',
      // titleFontColor: '#000',
      // bodyFontColor: '#000',
      // borderColor: '#000',
      callbacks: {
        label: (tooltipItem) => {
          if(tooltipItem.xLabel != ''){
          //  return this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
            return tooltipItem.xLabel + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
          }
        },
        // remove title
        title: function () {
          return;
        }
      }
    },
    // legend: {
    //   position: 'top',
    //   onClick: function (e, legendItem) {
    //     var index = legendItem.datasetIndex;
    //     var ci = this.chart;
    //     if (index == 0) {
    //       ci.getDatasetMeta(1).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     else if (index == 1) {
    //       ci.getDatasetMeta(0).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     ci.update();
    //   },
    // },
  };
  public barChartOptions2: any = {
    borderRadius: 50,
    hover: { mode: null },
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
        gridLines: {
          display: true
        },
        ticks: {
          autoSkip: false,
          userCallback: (label: string) => {
            if(label != ''){
              const names = this.splitName(label);
              // if (names.length > 1) {
              //   return `${names[0][0]} ${names[1]}`
              // } else return `${names[0]}`;
              if (names.length == 3) {
                return `${names[0]}`
              } else if (names.length == 2){
                return `${names[0][0]} ${names[1]}`
              } else {
                return `${names[0]}`;
              }
            }            
          }
        },
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
        gridLines: {
          // color: '#fbfbfc'
        }
      }],
    },
    tooltips: {
      mode: 'x-axis',
      bodyFontFamily: 'Gilroy-Regular',
      cornerRadius: 0,
      // backgroundColor: '#fff',
      // titleFontColor: '#000',
      // bodyFontColor: '#000',
      // borderColor: '#000',
      callbacks: {
        label: (tooltipItem) => {
          if(tooltipItem.xLabel != ''){
          //  return this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
            return tooltipItem.xLabel + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
          }
        },
        // remove title
        title: function () {
          return;
        }
      }
    },
    // legend: {
    //   position: 'top',
    //   onClick: function (e, legendItem) {
    //     var index = legendItem.datasetIndex;
    //     var ci = this.chart;
    //     if (index == 0) {
    //       ci.getDatasetMeta(1).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     else if (index == 1) {
    //       ci.getDatasetMeta(0).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     ci.update();
    //   },
    // },
  };
  public barChartOptions3: any = {
    borderRadius: 50,
    hover: { mode: null },
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
        gridLines: {
          display: true
        },
        ticks: {
          autoSkip: false,
          userCallback: (label: string) => {
            if(label != ''){
              const names = this.splitName(label);
              // if (names.length > 1) {
              //   return `${names[0][0]} ${names[1]}`
              // } else return `${names[0]}`;
              if (names.length == 3) {
                return `${names[0]}`
              } else if (names.length == 2){
                return `${names[0][0]} ${names[1]}`
              } else {
                return `${names[0]}`;
              }
            }            
          }
        },
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
        gridLines: {
          // color: '#fbfbfc'
        }
      }],
    },
    tooltips: {
      mode: 'x-axis',
      bodyFontFamily: 'Gilroy-Regular',
      cornerRadius: 0,
      // backgroundColor: '#fff',
      // titleFontColor: '#000',
      // bodyFontColor: '#000',
      // borderColor: '#000',
      callbacks: {
        label: (tooltipItem) => {
          if(tooltipItem.xLabel != ''){
          //  return this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
            return tooltipItem.xLabel + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
          }
        },
        // remove title
        title: function () {
          return;
        }
      }
    },
    // legend: {
    //   position: 'top',
    //   onClick: function (e, legendItem) {
    //     var index = legendItem.datasetIndex;
    //     var ci = this.chart;
    //     if (index == 0) {
    //       ci.getDatasetMeta(1).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     else if (index == 1) {
    //       ci.getDatasetMeta(0).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     ci.update();
    //   },
    // },
  };
  public barChartOptions4: any = {
    borderRadius: 50,
    hover: { mode: null },
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
        gridLines: {
          display: true
        },
        ticks: {
          autoSkip: false,
          userCallback: (label: string) => {
            if(label != ''){
              const names = this.splitName(label);
              // if (names.length > 1) {
              //   return `${names[0][0]} ${names[1]}`
              // } else return `${names[0]}`;
              if (names.length == 3) {
                return `${names[0]}`
              } else if (names.length == 2){
                return `${names[0][0]} ${names[1]}`
              } else {
                return `${names[0]}`;
              }
            }            
          }
        },
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
        gridLines: {
          // color: '#fbfbfc'
        }
      }],
    },
    tooltips: {
      mode: 'x-axis',
      bodyFontFamily: 'Gilroy-Regular',
      cornerRadius: 0,
      // backgroundColor: '#fff',
      // titleFontColor: '#000',
      // bodyFontColor: '#000',
      // borderColor: '#000',
      callbacks: {
        label: (tooltipItem) => {
          if(tooltipItem.xLabel != ''){
          //  return this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
            return tooltipItem.xLabel + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
          }
        },
        // remove title
        title: function () {
          return;
        }
      }
    },
    // legend: {
    //   position: 'top',
    //   onClick: function (e, legendItem) {
    //     var index = legendItem.datasetIndex;
    //     var ci = this.chart;
    //     if (index == 0) {
    //       ci.getDatasetMeta(1).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     else if (index == 1) {
    //       ci.getDatasetMeta(0).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     ci.update();
    //   },
    // },
  };
  public barChartOptions5: any = {
    borderRadius: 50,
    hover: { mode: null },
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
        gridLines: {
          display: true
        },
        ticks: {
          autoSkip: false,
          userCallback: (label: string) => {
            if(label != ''){
              const names = this.splitName(label);
              // if (names.length > 1) {
              //   return `${names[0][0]} ${names[1]}`
              // } else return `${names[0]}`;
              if (names.length == 3) {
                return `${names[0]}`
              } else if (names.length == 2){
                return `${names[0][0]} ${names[1]}`
              } else {
                return `${names[0]}`;
              }
            }            
          }
        },
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
        gridLines: {
          // color: '#fbfbfc'
        }
      }],
    },
    tooltips: {
      mode: 'x-axis',
      bodyFontFamily: 'Gilroy-Regular',
      cornerRadius: 0,
      // backgroundColor: '#fff',
      // titleFontColor: '#000',
      // bodyFontColor: '#000',
      // borderColor: '#000',
      callbacks: {
        label: (tooltipItem) => {
          if(tooltipItem.xLabel != ''){
          //  return this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
            return tooltipItem.xLabel + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
          }
        },
        // remove title
        title: function () {
          return;
        }
      }
    },
    // legend: {
    //   position: 'top',
    //   onClick: function (e, legendItem) {
    //     var index = legendItem.datasetIndex;
    //     var ci = this.chart;
    //     if (index == 0) {
    //       ci.getDatasetMeta(1).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     else if (index == 1) {
    //       ci.getDatasetMeta(0).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     ci.update();
    //   },
    // },
  };
  public barChartOptions6: any = {
    borderRadius: 50,
    hover: { mode: null },
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
        gridLines: {
          display: true
        },
        ticks: {
          autoSkip: false,
          userCallback: (label: string) => {
            if(label != ''){
              const names = this.splitName(label);
              // if (names.length > 1) {
              //   return `${names[0][0]} ${names[1]}`
              // } else return `${names[0]}`;
              if (names.length == 3) {
                return `${names[0]}`
              } else if (names.length == 2){
                return `${names[0][0]} ${names[1]}`
              } else {
                return `${names[0]}`;
              }
            }            
          }
        },
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
        gridLines: {
          // color: '#fbfbfc'
        }
      }],
    },
    tooltips: {
      mode: 'x-axis',
      bodyFontFamily: 'Gilroy-Regular',
      cornerRadius: 0,
      // backgroundColor: '#fff',
      // titleFontColor: '#000',
      // bodyFontColor: '#000',
      // borderColor: '#000',
      callbacks: {
        label: (tooltipItem) => {
          if(tooltipItem.xLabel != ''){
          //  return this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
            return tooltipItem.xLabel + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
          }
        },
        // remove title
        title: function () {
          return;
        }
      }
    },
    // legend: {
    //   position: 'top',
    //   onClick: function (e, legendItem) {
    //     var index = legendItem.datasetIndex;
    //     var ci = this.chart;
    //     if (index == 0) {
    //       ci.getDatasetMeta(1).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     else if (index == 1) {
    //       ci.getDatasetMeta(0).hidden = true;
    //       ci.getDatasetMeta(index).hidden = false;
    //     }
    //     ci.update();
    //   },
    // },
  };


  public barChartOptions1: any = {
    borderRadius: 50,
    hover: { mode: null },
    scaleShowVerticalLines: false,
    cornerRadius: 60,
    curvature: 1,
    animation:
    {
      duration: 1,
      easing: 'linear',
      onComplete: function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.textBaseline = 'bottom';
        // Loop through each data in the datasets
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            // var data = "$"+dataset.data[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let num = dataset.data[index];
            // let dataK = Math.abs(num) > 999 ? Math.sign(num)*(Math.round(Math.abs(num)/100)/10) + 'k' : Math.sign(num)*Math.abs(num);
            let dataK = shortenLargeNumber(num, 1);
            let dataDisplay = `$${dataK}`;
            ctx.font = Chart.helpers.fontString(11, 'normal', 'Gilroy-Bold');
            ctx.fillText(dataDisplay, bar._model.x, bar._model.y - 10);

            function shortenLargeNumber(num, digits) {
              var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
                decimal;

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
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales:
    {
      xAxes: [{
        gridLines:
        {
          display: true
        },
        ticks: {
          autoSkip: false,
          userCallback: (label: string) => {
            const names = this.splitName(label);
            if (names.length > 1) {
              return `${names[0][0]} ${names[1]}`
            } else
              return `${names[0]}`;
          }
        }
      }],
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          max: 10000,
          userCallback: (label, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return '$' + this.decimalPipe.transform(label);
            }
          }
        },
        gridLines: {}
      }]
    },
    tooltips: {
      enabled: false
    },
  };



  public barChartOptionsTrend: any = {
    scaleShowVerticalLines: false,
    cornerRadius: 60,
    hover: { mode: null },
    curvature: 1,
    animation: {
      duration: 1500,
      easing: 'easeOutSine'
    },
    responsive: true,
    maintainAspectRatio: false,
    scaleStartValue : 0,
    scales: {
      xAxes: [{
       stacked: true,

      },
      {
          gridLines: { 
            display: true , 
            offsetGridLines: true
          },
          ticks: {
            autoSkip: false,
          },
          display: false,
          offset: true,
          stacked: true,
        }
    ],
      yAxes: [{
       suggestedMin: 0,
        ticks: {
          min:0,
          beginAtZero: true,
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
        // use label callback to return the desired label
        label: (tooltipItem, data) => {
          if (tooltipItem.xLabel.includes('WE ')) {
            return tooltipItem.xLabel + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
          } 
          var Targetlable = '';       
          const v = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          let Tlable = data.datasets[tooltipItem.datasetIndex].label;
          if(Tlable !=''){
            Tlable = Tlable + ": "
            Targetlable = Tlable
          }
         let ylable =  Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;  
         var tlab = 0; 
         if(typeof data.datasets[1] === 'undefined') {
          }
          else {
            const tval  = data.datasets[1].data[tooltipItem.index];
            if(Array.isArray(tval)){
              tlab =  Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
              if(tlab == 0){
                Tlable = '';
              }
             }
          }  
         if(tlab == 0 && Targetlable =='Target: '){
            //return  Tlable + this.splitName(tooltipItem.xLabel).join(' ');
         }else{
            return  Tlable + this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(ylable);
         }
        },
        // remove title
        title: function (tooltipItem, data) {
          return;
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

  public barChartOptionsPercent: any = {
    scaleShowVerticalLines: false,
    cornerRadius: 60,
    hover: { mode: null },
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
          autoSkip: false,
          userCallback: (label: any) => {
            const names = typeof label === "string" ? this.splitName(label) : this.splitName(label[0]);
            // if (names.length > 1) {
            //   return `${names[0][0]} ${names[1]}`
            // } else return `${names[0]}`;
             if (names.length == 3) {
                return `${names[0]}`
              } else if (names.length == 2){
                return `${names[0][0]} ${names[1]}`
              } else {
                return `${names[0]}`;
              }
          }
        }
      }],
      yAxes: [{
        suggestedMin: 0,
        // suggestedMax:100,
        ticks: {
          beginAtZero: true,
          max: 100,
          userCallback: function (label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label + ' %';
            }

          },
        },
      }],
    },
    elements: {
      line: {
        fill: false
      }
    },
    tooltips: {
      mode: 'x-axis',
      custom: function (tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        //tooltip.displayColors = false;
      },
      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem, data) {
          return tooltipItem.xLabel + ": " + tooltipItem.yLabel + "%";
        },
        // remove title
        title: function (tooltipItem, data) {
          return;
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

  public barChartOptionsPercentTrend: any = {
    scaleShowVerticalLines: false,
    cornerRadius: 60,
    hover: { mode: null },
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
        },
        stacked:true,
      }],
      yAxes: [{
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          beginAtZero: true,
          max: 100,
          userCallback: function (label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label + ' %';
            }

          },
        },
      }],
    },
    elements: {
      line: {
        fill: false
      }
    },
    tooltips: {
      mode: 'x-axis',
      custom: function (tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem, data) {
          var Targetlable = '';  
          const v = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          let Tlable = data.datasets[tooltipItem.datasetIndex].label;
          if(Tlable !=''){
            Tlable = Tlable + ": "
            Targetlable = Tlable
          }
         let ylable =  Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;
         var tlab = 0; 
         if(typeof data.datasets[1] === 'undefined') {
          }
          else {
            const tval  = data.datasets[1].data[tooltipItem.index];
            if(Array.isArray(tval)){
              tlab =  Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
              if(tlab == 0){
                Tlable = '';
              }
             }
          } 
         if(tlab == 0 && Targetlable =='Target: '){
         }else{
          return Tlable + tooltipItem.xLabel + ": " + ylable + "%";
         }
          
        },
        // remove title
        title: function (tooltipItem, data) {
          return;
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


  public barChartOptionstrend: any = {
    scaleShowVerticalLines: false,
    cornerRadius: 60,
    hover: { mode: null },
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
        },
        stacked: true,
      }],
      yAxes: [{
        suggestedMin: 0,
        ticks: {
          beginAtZero: true,
          userCallback: function (label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
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
        // use label callback to return the desired label
        label: function (tooltipItem, data) {
          var Targetlable = '';   
          const v = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          let Tlable = data.datasets[tooltipItem.datasetIndex].label;
          if(Tlable !=''){
            Tlable = Tlable + ": "
            Targetlable = Tlable
          }
         let ylable =  Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;
         var tlab = 0; 
         if(typeof data.datasets[1] === 'undefined') {
          }
          else {
            const tval  = data.datasets[1].data[tooltipItem.index];
            if(Array.isArray(tval)){
              tlab =  Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
              if(tlab == 0){
                Tlable = '';
              }
             }
          }
         if(tlab == 0 && Targetlable =='Target: '){
         }else{
            return Tlable + tooltipItem.xLabel + ": " + ylable;
         }
        },
        // remove title
        title: function (tooltipItem, data) {
          return;
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
    }
  };
  public doughnutChartOptions: any = {
    scaleShowVerticalLines: false,
    borderWidth: 0,
    responsive: true,
    hover: { mode: null },
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutSine'
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 5,
        generateLabels: function(chart) {
          var data = chart.data;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map(function(label, i) {
              var meta = chart.getDatasetMeta(0);
              var ds = data.datasets[0];              
              var arc = meta.data[i];
              var custom = arc && arc.custom || {};
              const regex = /\w+\s\w+(?=\s)|\w+/g;
              var names = label.toString().trim().match(regex);
              var labls ='';
              if (names.length == 3) {
                labls = `${names[0]}`
              } else if (names.length == 2){
                labls = `${names[0][0]} ${names[1]}`
              } else {
                labls = `${names[0]}`;
              }return { 
                text: labls,
                fillStyle: ds.backgroundColor[i],
                strokeStyle: "#fff",
                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                index: i
              };
            });
          }
          return [];
        }
      },
      onClick: function (e) {
        e.stopPropagation();
      }
    },
    elements: {
      center: {
        text: '',
        sidePadding: 40,
        minFontSize: 15
      }
    }
  };
  public doughnutChartOptionsPercent: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    hover: { mode: null },
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutSine'
    },
    legend: {
      display: true,
      position: 'right',
      onClick: function (e) {
        e.stopPropagation();
      }
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data['labels'][tooltipItem['index']] + ": " + data['datasets'][0]['data'][tooltipItem['index']] + "%";
        }
      }
    }
  };
  //check status of login
  public dentistVal = 'all';
  changeLoginStatus() {
    this.cliniciananalysisService.changeLoginStatus().subscribe((data: any) => {
      if (data.message == 'success') {
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }
  myDateParser(dateStr: string): string {
    // 2018-01-01T12:12:12.123456; - converting valid date format like this

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)

    let validDate = date;

    return validDate
  }

  //Load Dentist Data
  loadDentist(newValue) {
    $('.sa_tabs_data button').prop('disabled',true); 
    if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
      this.Apirequest = 8;
      $('.multi-clinic-dis').addClass("disablePointer");
      $('.multi-clinic-pro').addClass("disablePointerProgress");
    }else{
      this.Apirequest = 8;
    }    
    if (this._cookieService.get("user_type") == '4') {
      if (this._cookieService.get("dentist_toggle") === 'false'){
        newValue =this._cookieService.get("dentistid");
      }else{
        newValue = 'all';
      }
    }

    if (newValue == '') {
      return false;
    }


    $('#title').html('<span> Clinician Analysis </span>');
    $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate));
    this.changePrebookRate('recall');
    if (this._cookieService.get("dentistid"))
      this.childid = this._cookieService.get("dentistid");
    if (newValue == 'all') {
      this.dentistVal = 'all';
      this.showTrend = false;
      this.toggleChecked = false;
      this.showTrendChart = false;
      if(this.user_type != '4'){
        if (this.proSelectShow == "production_all") {
          this.buildChart();
        } else if (this.proSelectShow == "production_dentists") {
         this.buildChartDentists();
        }else if (this.proSelectShow == "production_oht") {
         this.buildChartOht();
        }else if (this.proSelectShow == "collection_all") {
          this.collectionChart();
         }else if (this.proSelectShow == "collection_dentists") {
          this.collectionChartDentists();
         }else if (this.proSelectShow == "collection_oht") {
          this.collectionChartOht();
         }else if (this.proSelectShow == "collection_exp_all") {
          this.collectionExpChart();
         }else if (this.proSelectShow == "collection_exp_dentists") {
          this.collectionExpChartDentists();
         }else if (this.proSelectShow == "collection_exp_oht") {
          this.collectionExpChartOht();
         }

         if(this.hrSelectShow == "hr_all"){ 
          this.hourlyRateChart();
        }else if(this.hrSelectShow == "hr_dentists"){
          this.hourlyRateChartDesntists();
        }else if(this.hrSelectShow == "hr_oht"){
          this.hourlyRateChartOht();
        }else if(this.hrSelectShow == "hr_collection_all"){
          this.collectionHourlyRate();
        }else if(this.hrSelectShow == "hr_collection_dentists"){
          this.collectionHourlyRateDentist();
        }else if(this.hrSelectShow == "hr_collection_oht"){
          this.collectionHourlyRateOht();
        }else if(this.hrSelectShow == "hr_collection_exp_all"){
          this.collectionExpHourlyRate();
        }else if(this.hrSelectShow == "hr_collection_exp_dentists"){
          this.collectionExpHourlyRateDentist();
        }else if(this.hrSelectShow == "hr_collection_exp_oht"){
          this.collectionExpHourlyRateOht();
        }
      }
      if(this.user_type == '4'){
        this.buildChart();
        this.collectionChart();
        this.collectionExpChart();
        this.hourlyRateChart();
        this.collectionHourlyRate();
        this.collectionExpHourlyRate();
      }
      this.buildChartNewpatients();
      this.buildChartTreatment();
      this.treatmentPlanRate();
      this.recallPrebook();
      this.buildChartNopatients();
      this.treatmentPrePrebook();
      (<HTMLElement>document.querySelector('.dentistProductionSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.dentistProduction')).style.display = 'block';
      (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'block';
      (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.noPatients')).style.display = 'block';
      (<HTMLElement>document.querySelector('.newPatientsSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.newPatients')).style.display = 'block';
      (<HTMLElement>document.querySelector('.recallPrebookSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.recallPrebook')).style.display = 'block';
      (<HTMLElement>document.querySelector('.treatmentPlanRateSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.treatmentPlanRate')).style.display = 'block';
      (<HTMLElement>document.querySelector('.hourlyRateSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.hourlyRate')).style.display = 'block';
      this.changeTreatmentCost('1');
    } else {
      this.dentistVal = newValue;
      this.showTrend = true;
      this.selectedDentist = newValue;
      if(this.user_type != '4'){
        if(this.proCollShow == 1){
          this.dentistProductionTrend('w');
        }else if(this.proCollShow == 2 ){
          this.dentistCollectionTrend('w');
        }else if(this.proCollShow == 3){
          this.dentistCollectionExpTrend('w');
        }
      }
      if(this.user_type == '4'){
        this.dentistProductionTrend('w');
        this.dentistCollectionTrend('w');
        this.dentistCollectionExpTrend('w');
      }
      if (this.toggleChecked) {
        this.toggleChangeProcess();
        this.showTrendChart = true;

      } else {
        this.showTrendChart = false;
        if(this.user_type != '4'){
          if(this.proCollShow == 1){
            this.buildChartDentist();
          }else if(this.proCollShow == 2){
            this.collectionDentist();
          }else if(this.proCollShow == 3){
            this.collectionExpDentist();
          }

          if(this.hrCollShow == 1){
            this.hourlyRateDentist();
          }else if(this.hrCollShow == 2){
            this.collectionHourlyRateSingle();
          }else if(this.hrCollShow == 3){
            this.collectionExpHourlyRateSingle();
          } 
        }              
        if(this.user_type == '4'){
          this.buildChartDentist();
          this.collectionDentist();
          this.collectionExpDentist();
          this.hourlyRateDentist();
          this.collectionHourlyRateSingle();
          this.collectionExpHourlyRateSingle();
        }
        (<HTMLElement>document.querySelector('.dentistProductionSingle')).style.display = 'block';
        (<HTMLElement>document.querySelector('.dentistProduction')).style.display = 'none';
        this.buildChartTreatmentDentist();
        (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'block';
        (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'none';
        this.buildChartNopatientsDentist();
        this.buildChartNewpatientsDentist();

        (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'block';
        (<HTMLElement>document.querySelector('.noPatients')).style.display = 'none';
        this.recallPrebookDentist();
        this.treatmentPrePrebookDentist();
        (<HTMLElement>document.querySelector('.recallPrebookSingle')).style.display = 'block';
        (<HTMLElement>document.querySelector('.recallPrebook')).style.display = 'none';
        (<HTMLElement>document.querySelector('.treatmentPlanRateSingle')).style.display = 'block';
        (<HTMLElement>document.querySelector('.treatmentPlanRate')).style.display = 'none';
        (<HTMLElement>document.querySelector('.newPatientsSingle')).style.display = 'block';
        (<HTMLElement>document.querySelector('.newPatients')).style.display = 'none';

       
        
        this.treatmentPlanRateDentist();

        (<HTMLElement>document.querySelector('.hourlyRateSingle')).style.display = 'block';
        (<HTMLElement>document.querySelector('.hourlyRate')).style.display = 'none';
      }
      this.changeTreatmentCostSingle('1');

    }
  }
  public accountingDentist: any = [];
  //Get provider details
  private getAccountingDentist() {
    this.accountingDentist = [];
    this.cliniciananalysisService.getAccountingDentist(this.clinic_id).subscribe((data: any) => {
      if (data.message == 'success') {
        data.data.forEach(res => {
          var temp = [];
          temp['provider_id'] = res.provider_id;
          temp['name'] = res.name;
          this.accountingDentist.push(temp);
        });
      }
      else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }
  public statusDentist: any = [];
  public final_map: any = {};

  //Get status of dentist for modal of hourly rate chart
  private getStatusDentist() {
    this.statusDentist = [];
    this.cliniciananalysisService.getStatusDentist(this.clinic_id).subscribe((data: any) => {
      if (data.message == 'success') {
        data.data.forEach(res => {
          var temp = [];
          temp['book_desc'] = res.app_book_description;
          temp['provider_id'] = res.provider_id;

          this.statusDentist.push(temp);
        });
      }
      else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    }
    );
  }
  //Save hourly rate chart mapping
  save_mapping() {
    var i = 0;
    this.accountingDentist.forEach(res => {
      var id = res.provider_id;

      if ($("#dentistMap_" + id).val() != '') {
        var temp = {};
        temp['id'] = id;
        temp['book_desc'] = $("#dentistMap_" + id).val();
        this.final_map[i] = JSON.stringify(temp);
        i++;
      }
    });
    var myJsonString = JSON.stringify(this.final_map);
    this.clinic_id && this.cliniciananalysisService.saveDentistMapping(myJsonString, this.clinic_id).subscribe((res) => {
      if (res.data.message == 'success') {
        alert('Mapping Saved!');
        $('.nsm-dialog-btn-close').click();
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


  //Activate average /Goal line on Treatment Cost Chart
  public planCompletedTotal;
  public planCompletedTotalTrend;
  changeTreatmentCost(val) {
    $('.treatmentPlan .treatment_cost .sa_tab_btn').removeClass('active');
    $('.treatmentPlan .tcmain' + val).addClass('active');
    this.planTotalTooltip = 'down';
    this.tcmain = val;
    if (val == '1') {
      this.planTotalAverage = this.planAllTotal;
      this.planTotalPrev = this.planAllTotalTrend;
    }
    else {
      this.planTotalAverage = this.planCompletedTotal;
      this.planTotalPrev = this.planCompletedTotalTrend;
    }
    if (this.planTotalAverage >= this.planTotalPrev)
      this.planTotalTooltip = 'up';
    if (this.goalchecked == 'average') {
      if (this.barChartOptionsTC.annotation.annotations)
        this.barChartOptionsTC.annotation.annotations[0].value = this.planTotalAverage;
    }
    if (this.goalchecked == 'goal') {
      if (this.barChartOptionsTC.annotation.annotations)
        this.barChartOptionsTC.annotation.annotations[0].value = this.planTotalGoal;
    }

  }
  //Load Individual dentist Chart
  changeTreatmentCostSingle(val) {
    $('.treatmentPlanSingle .treatment_cost .sa_tab_btn').removeClass('active');
    $('.treatmentPlanSingle .tcmain' + val).addClass('active');
    this.tcmain = val;
    this.treatmentPlanAverageCostTab = val;
    if (val == '1') {
      if (this.toggleChecked) {
        if (this.treatmentPlanTrend1.every((value) => value == 0)) this.treatmentPlanTrend1 = [];
        this.treatPlanTrend[0]['data'] = this.treatmentPlanTrend1;
      }
      else {
        this.gaugeValueTreatment = Math.floor(this.gaugeValueTreatmentP);
        this.planTotalPrev = this.planAllTotalTrend;
        this.planTotal = this.planTotalAll;
      }
    }
    else {
      if (this.toggleChecked) {
        if (this.treatmentPlanTrend2.every((value) => value == 0)) this.treatmentPlanTrend2 = [];
        this.treatPlanTrend[0]['data'] = this.treatmentPlanTrend2;
      }
      else {
        this.gaugeValueTreatment = Math.floor(this.gaugeValueTreatmentC);
        this.planTotalPrev = this.planCompletedTotalTrend;
        this.planTotal = this.planTotalCompleted;

      }
    }
    if (this.gaugeValueTreatment > this.planTotalGoal)
      this.maxplanTotalGoal = this.gaugeValueTreatment;
    else
      this.maxplanTotalGoal = this.planTotalGoal;
    if (this.maxplanTotalGoal == 0)
      this.maxplanTotalGoal = '';
  }

  public productionTooltip = 'down';
  public productionTotalPrev;
  public barChartOptionsDP: any = this.barChartOptions2;
  public barChartOptionsDP1: any = this.barChartOptions;
  public barChartOptionsDP2: any = this.barChartOptions;
  public barChartOptionsDP3: any = this.barChartOptions;
  public barChartOptionsDP4: any = this.barChartOptions2;
  public barChartOptionsDP5: any = this.barChartOptions2;
  public barChartOptionsDP6: any = this.barChartOptions3;
  public barChartOptionsDP7: any = this.barChartOptions3;
  public barChartOptionsDP8: any = this.barChartOptions3;
  public barChartOptionsHR: any = this.barChartOptions4;
  public barChartOptionsHR1: any = this.barChartOptions5;
  public barChartOptionsHR2: any = this.barChartOptions6;
  public buildChartLoader: boolean = true;
  public dentistKey;
  public DPcolors: any;
  public DPcolorsDent: any;
  public DPcolorsOht: any;
  public DPcolors1: any;
  public DPcolors1Dent: any;
  public DPcolors1Oht: any;
  public DPcolors2: any;
  public DPcolors2Dent: any;
  public DPcolors2Oht: any;
  //Dentist Production Chart for all Dentist
  public dentistProductiontbl :any = [];
  public showprodAllTbl:boolean = false;
  private buildChart() {
    this.buildChartLoader = true;
    this.barChartData1 = [];
    this.barChartLabels1 = [];
    this.productionTotal = 0;
    this.barChartLabels = [];
    this.barChartOptionsDP.annotation = [];
    this.clinic_id && this.cliniciananalysisService.DentistProduction(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.barChartData1 = [];
      this.barChartLabels1 = [];
      this.barChartLabels = [];
      this.productionTotal = 0;
      this.dentistProductiontbl =[];
      if (data.message == 'success') {
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          this.showGoals = false;
        }        
        this.dentistKey ='';
        this.barChartData[0]['data'] =[];
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.buildChartLoader = false;
        this.productionTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.production - b.production).reverse();
        }
        this.dentistProductiontbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.dentistProductiontbl = data.data;
        //   this.showprodAllTbl = true;
        // }else{
        //   this.showprodAllTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          // if (res.production > 0) {
            this.barChartData1.push(Math.round(res.production));
            var name = res.provider_name;
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.barChartLabels1.push(pName);
              this.dentistKey = i;
            } else {
              this.barChartLabels1.push(pName);
            }
            i++;
          // }
        });
        /********** Add Space to top of graph ****/
        let maxY = Math.max(...this.barChartData1);
        if (maxY < 1000) {
          this.barChartOptions1.scales.yAxes[0].ticks.max = (Math.ceil(maxY / 100) * 100);
          if ((maxY + 50) >= this.barChartOptions1.scales.yAxes[0].ticks.max) {
            this.barChartOptions1.scales.yAxes[0].ticks.max = this.barChartOptions1.scales.yAxes[0].ticks.max + 100;
          }
        } else if (maxY < 10000) {
          this.barChartOptions1.scales.yAxes[0].ticks.max = (Math.ceil(maxY / 1000) * 1000);
          if ((maxY + 500) >= this.barChartOptions1.scales.yAxes[0].ticks.max) {
            this.barChartOptions1.scales.yAxes[0].ticks.max = this.barChartOptions1.scales.yAxes[0].ticks.max + 1000;
          }
        } else if (maxY < 100000) {
          this.barChartOptions1.scales.yAxes[0].ticks.max = (Math.ceil(maxY / 10000) * 10000);
          if ((maxY + 5000) >= this.barChartOptions1.scales.yAxes[0].ticks.max) {
            this.barChartOptions1.scales.yAxes[0].ticks.max = this.barChartOptions1.scales.yAxes[0].ticks.max + 10000;
          }
        } else if (maxY < 1000000) {
          this.barChartOptions1.scales.yAxes[0].ticks.max = (Math.ceil(maxY / 100000) * 100000);
          if ((maxY + 50000) >= this.barChartOptions1.scales.yAxes[0].ticks.max) {
            this.barChartOptions1.scales.yAxes[0].ticks.max = this.barChartOptions1.scales.yAxes[0].ticks.max + 100000;
          }
        } else if (maxY < 5000000) {
          this.barChartOptions1.scales.yAxes[0].ticks.max = (Math.ceil(maxY / 1000000) * 1000000);
          if ((maxY + 500000) >= this.barChartOptions1.scales.yAxes[0].ticks.max) {
            this.barChartOptions1.scales.yAxes[0].ticks.max = this.barChartOptions1.scales.yAxes[0].ticks.max + 1000000;
          }
        } else if (maxY > 5000000) {
          this.barChartOptions1.scales.yAxes[0].ticks.max = (Math.ceil(maxY / 1000000) * 1000000);
          if ((maxY + 500000) >= this.barChartOptions1.scales.yAxes[0].ticks.max) {
            this.barChartOptions1.scales.yAxes[0].ticks.max = this.barChartOptions1.scales.yAxes[0].ticks.max + 1000000;
          }
        }
        /********** Add Space to top of graph ****/
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            {
              backgroundColor: [],
              hoverBorderColor: '#000'
            }
          ];
          this.barChartColors[0].backgroundColor[this.dentistKey] = '#1CA49F';
          this.DPcolors = this.barChartColors;
        }
        else
          this.DPcolors = this.lineChartColors;
        this.barChartData[0]['data'] = this.barChartData1;
        const colors = [
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd
        ]; // this is static array for colors of bars

        let dynamicColors = [];
        this.barChartLabels1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars

        this.barChartData[0].backgroundColor = dynamicColors;
        this.barChartLabels = this.barChartLabels1;
        this.productionTotal = Math.round(data.total);
        this.productionTotalAverage = Math.round(data.total_average);
        this.productionTotalPrev = Math.round(data.total_ta);
        this.productionGoal = data.goals;

        if (this.productionTotal >= this.productionTotalPrev)
          this.productionTooltip = 'up';
        this.barChartOptionsDP.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsDP.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.productionTotalAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {

          this.barChartOptionsDP.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.productionGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            }]
          }

        }
        else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }


    );
  }

  public productionDentists1Tooltip = 'down';
  public productionDentistsTotalPrev;
  public productionDentistsTotal;
  public barChartDentistsData1;
  public barChartDentistsLabels1;
  public barChartDentistLabels;
  public productionDentistTotalAverage;
  public buildChartDentistsLoader: boolean = true;
  public barChartDataDentists: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
    }
  ];
  public dentistKey1;
  public dentistProductionDentisttbl:any=[];
  public showprodDentAllTbl:boolean =false;
  private buildChartDentists() {
    this.buildChartDentistsLoader = true;
    this.barChartDentistsData1 = [];
    this.barChartDentistsLabels1 = [];
    this.productionDentistsTotal = 0;
    this.barChartDentistLabels = [];
    this.barChartOptionsDP2.annotation = [];
    this.clinic_id && this.cliniciananalysisService.DentistProductionDentist(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.barChartDentistsData1 = [];
      this.barChartDentistsLabels1 = [];
      this.barChartDentistLabels = [];
      this.productionDentistsTotal = 0;
      this.dentistProductionDentisttbl =[];
      if (data.message == 'success') {
        this.dentistKey1 ='';
        this.barChartDataDentists[0]['data'] =[];
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.buildChartDentistsLoader = false;
        this.productionDentists1Tooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.production - b.production).reverse();
        }
        this.dentistProductionDentisttbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.dentistProductionDentisttbl = data.data;
        //   this.showprodDentAllTbl = true;
        // }else{
        //   this.showprodDentAllTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          // if (res.production > 0) {
            this.barChartDentistsData1.push(Math.round(res.production));
            var name = res.provider_name;
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.barChartDentistsLabels1.push(pName);
              this.dentistKey1 = i;
            } else {
              this.barChartDentistsLabels1.push(pName);
            }
            i++;
          // }
        });
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColorsDent = [
            {
              backgroundColor: [],
              hoverBorderColor: '#000'
            }
          ];
          this.barChartColorsDent[0].backgroundColor[this.dentistKey1] = '#1CA49F';
          this.DPcolorsDent = this.barChartColorsDent;
        }
        else
          this.DPcolorsDent = this.lineChartColors;
        this.barChartDataDentists[0]['data'] = this.barChartDentistsData1;
        const colors = [
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd
        ]; // this is static array for colors of bars

        let dynamicColors = [];
        this.barChartDentistsLabels1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars

        this.barChartDataDentists[0].backgroundColor = dynamicColors;
        this.barChartDentistLabels = this.barChartDentistsLabels1;
        this.productionDentistsTotal = Math.round(data.total);
        this.productionDentistTotalAverage = Math.round(data.total_average);
        this.productionDentistsTotalPrev = Math.round(data.total_ta);
        this.productionGoal = data.goals;

        if (this.productionDentistsTotal >= this.productionDentistsTotalPrev)
          this.productionDentists1Tooltip = 'up';
        this.barChartOptionsDP2.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsDP2.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.productionDentistTotalAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {

          this.barChartOptionsDP2.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.productionGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            }]
          }

        }
        else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }


    );
  }

  public productionOhtTooltip = 'down';
  public productionOhtTotalPrev;
  public productionOhtTotal;
  public barChartOhtData1;
  public barChartOhtLabels1;
  public barChartOhtLabels;
  public productionOhtTotalAverage;
  public buildChartOhtLoader: boolean = true;
  public barChartDataOht: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
    }
  ];
  public dentistKey2;
  public dentistProductionOhttbl:any=[];
  public showprodOhtAllTbl:boolean =false;
  private buildChartOht() {
    this.buildChartOhtLoader = true;
    this.barChartOhtData1 = [];
    this.barChartOhtLabels1 = [];
    this.productionOhtTotal = 0;
    this.barChartOhtLabels = [];
    this.barChartOptionsDP3.annotation = [];
    this.clinic_id && this.cliniciananalysisService.DentistProductionOht(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.barChartOhtData1 = [];
      this.barChartOhtLabels1 = [];
      this.barChartOhtLabels = [];
      this.productionOhtTotal = 0;
      this.dentistProductionOhttbl = [];
      if (data.message == 'success') {
        this.dentistKey2='';
        this.barChartDataOht[0]['data'] =[];
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.buildChartOhtLoader = false;
        this.productionOhtTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.production - b.production).reverse();
        }
        this.dentistProductionOhttbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.dentistProductionOhttbl = data.data;
        //   this.showprodOhtAllTbl = true;
        // }else{
        //   this.showprodOhtAllTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          // if (res.production > 0) {
            this.barChartOhtData1.push(Math.round(res.production));
            var name = res.provider_name;
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.barChartOhtLabels1.push(pName);
              this.dentistKey2 = i;
            } else {
              this.barChartOhtLabels1.push(pName);
            }
            i++;
          // }
        });
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColorsOht = [
            {
              backgroundColor: [],
              hoverBorderColor: '#000'
            }
          ];
          this.barChartColorsOht[0].backgroundColor[this.dentistKey2] = '#1CA49F';
          this.DPcolorsOht = this.barChartColorsOht;
        }
        else
          this.DPcolorsOht = this.lineChartColors;
        this.barChartDataOht[0]['data'] = this.barChartOhtData1;
        const colors = [
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd
        ]; // this is static array for colors of bars

        let dynamicColors = [];
        this.barChartOhtLabels1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars

        this.barChartDataOht[0].backgroundColor = dynamicColors;
        this.barChartOhtLabels = this.barChartOhtLabels1;
        this.productionOhtTotal = Math.round(data.total);
        this.productionOhtTotalAverage = Math.round(data.total_average);
        this.productionOhtTotalPrev = Math.round(data.total_ta);
        this.productionGoal = data.goals;

        if (this.productionOhtTotal >= this.productionOhtTotalPrev)
          this.productionOhtTooltip = 'up';
        this.barChartOptionsDP3.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsDP3.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.productionOhtTotalAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {

          this.barChartOptionsDP3.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.productionGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            }]
          }

        }
        else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }


    );
  }





  public collectionLoader: boolean = true;
  public collectionData1: any = [];
  public collectionLabels1: any = [];
  public collectionTotal: any = 0;
  public collectionLabels: any = [];
  public collectionData: any[] = [{
    ...this.chartService.baseChartData,
    data: [],
  }
  ];
  public collectionTotalAverage: any = 0;
  public collectionTotalPrev: any = 0;
  // public collectionTotalGoal: any = 0;
  public collectionTooltip: string = '';  
  public dentistCollectiontbl:any =[];
  public showCollAllTbl :boolean =false;
  private collectionChart() {
    this.collectionLoader = true;
    this.collectionData1 = [];
    this.collectionLabels1 = [];
    this.collectionTotal = 0;
    this.collectionTotalGoal = 0;
    this.collectionLabels = [];
    this.barChartOptionsDP.annotation = [];
    this.clinic_id && this.cliniciananalysisService.DentistCollection(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collectionData1 = [];
      this.collectionLabels1 = [];
      this.collectionLabels = [];
      this.collectionTotal = 0;
      this.collectionTotalGoal = 0;
      this.collectionData[0]['data']=[];
      this.dentistCollectiontbl =[];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collectionLoader = false;
        this.collectionTooltip = 'down';
        var i = 0;
        var selectedDen: any = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.collection - b.collection).reverse();
        }
        this.dentistCollectiontbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.dentistCollectiontbl = data.data;
        //   this.showCollAllTbl = true;
        // }else{
        //   this.showCollAllTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {

          // if (res.collection > 0) {
            this.collectionData1.push(Math.round(res.collection));
            var name = res.provider_name;
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinicName;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.collectionLabels1.push(pName);
              selectedDen = i;
            } else {
              this.collectionLabels1.push(pName);
            }
            i++;
          // }
        });

        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors1 = [
            {
              backgroundColor: [],
              hoverBorderColor: '#000'
            }
          ];
          this.barChartColors1[0].backgroundColor[selectedDen] = '#1CA49F';
          this.DPcolors1 = this.barChartColors1;
        } else {
          this.DPcolors1 = this.lineChartColors;
        }


        this.collectionData[0]['data'] = this.collectionData1;
        const colors = [
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd
        ]; // this is static array for colors of bars

        let dynamicColors = [];
        this.collectionLabels1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars


        this.collectionData[0].backgroundColor = dynamicColors;
        this.collectionLabels = this.collectionLabels1;
        this.collectionTotal = Math.round(data.total);
        this.collectionTotalAverage = Math.round(data.total_average);
        this.collectionTotalPrev = Math.round(data.total_ta);
        this.collectionTotalGoal = data.goals;

        if (this.collectionTotal >= this.collectionTotalPrev)
          this.collectionTooltip = 'up';
        this.barChartOptionsDP.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsDP.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionTotalAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {

          this.barChartOptionsDP.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionTotalGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            }]
          }

        }
        else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }


    );
  }


  public collectionDentistsLoader: boolean = true;
  public collectionDentistsData1: any = [];
  public collectionDentistsLabels1: any = [];
  public collectionDentistsTotal: any = 0;
  public collectionDentistsLabels: any = [];
  public collectionDentistsData: any[] = [{
    ...this.chartService.baseChartData,
    data: [],
  }
  ];
  public collectionDentistsTotalAverage: any = 0;
  public collectionDentistsTotalPrev: any = 0;
  public collectionDentistsTotalGoal: any = 0;
  public collectionDentistsTooltip: string = '';
  public dentistCollectionDenttbl : any =[];
  public showCollDentTbl:boolean = false;
  private collectionChartDentists() {
    this.collectionDentistsLoader = true;
    this.collectionDentistsData1 = [];
    this.collectionDentistsLabels1 = [];
    this.collectionDentistsTotal = 0;
    this.collectionDentistsLabels = [];
    this.barChartOptionsDP4.annotation = [];
    this.clinic_id && this.cliniciananalysisService.DentistCollectionDentists(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collectionDentistsData1 = [];
      this.collectionDentistsLabels1 = [];
      this.collectionDentistsLabels = [];
      this.collectionDentistsTotal = 0;
      this.dentistCollectionDenttbl =[];
      this.collectionDentistsData[0]['data'] =[];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collectionDentistsLoader = false;
        this.collectionDentistsTooltip = 'down';
        var i = 0;
        var selectedDen: any = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.collection - b.collection).reverse();
        }
        this.dentistCollectionDenttbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.dentistCollectionDenttbl = data.data;
        //   this.showCollDentTbl = true;
        // }else{
        //   this.showCollDentTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {

          // if (res.collection > 0) {
            this.collectionDentistsData1.push(Math.round(res.collection));
            var name = res.provider_name;
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinicName;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.collectionDentistsLabels1.push(pName);
              selectedDen = i;
            } else {
              this.collectionDentistsLabels1.push(pName);
            }
            i++;
          // }
        });

        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors1Dent = [
            {
              backgroundColor: [],
              hoverBorderColor: '#000'
            }
          ];
          this.barChartColors1Dent[0].backgroundColor[selectedDen] = '#1CA49F';
          this.DPcolors1Dent = this.barChartColors1Dent;
        } else {
          this.DPcolors1Dent = this.lineChartColors;
        }


        this.collectionDentistsData[0]['data'] = this.collectionDentistsData1;
        const colors = [
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd
        ]; // this is static array for colors of bars

        let dynamicColors = [];
        this.collectionDentistsLabels1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars


        this.collectionDentistsData[0].backgroundColor = dynamicColors;
        this.collectionDentistsLabels = this.collectionDentistsLabels1;
        this.collectionDentistsTotal = Math.round(data.total);
        this.collectionDentistsTotalAverage = Math.round(data.total_average);
        this.collectionDentistsTotalPrev = Math.round(data.total_ta);
        this.collectionDentistsTotalGoal = data.goals;

        if (this.collectionDentistsTotal >= this.collectionDentistsTotalPrev)
          this.collectionDentistsTooltip = 'up';
        this.barChartOptionsDP4.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsDP4.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionDentistsTotalAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {

          this.barChartOptionsDP4.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.productionGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            }]
          }

        }
        else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }


    );
  }

  public collectionOhtLoader: boolean = true;
  public collectionOhtData1: any = [];
  public collectionOhtLabels1: any = [];
  public collectionOhtTotal: any = 0;
  public collectionOhtLabels: any = [];
  public collectionOhtData: any[] = [{
    ...this.chartService.baseChartData,
    data: [],
  }
  ];
  public collectionOhtTotalAverage: any = 0;
  public collectionOhtTotalPrev: any = 0;
  public collectionOhtTotalGoal: any = 0;
  public collectionOhtTooltip: string = '';
  public dentistCollectionOhttbl : any =[];
  public showCollOhtTbl: boolean =false;
  private collectionChartOht() {
    this.collectionOhtLoader = true;
    this.collectionOhtData1 = [];
    this.collectionOhtLabels1 = [];
    this.collectionOhtTotal = 0;
    this.collectionOhtLabels = [];
    this.barChartOptionsDP5.annotation = [];
    this.clinic_id && this.cliniciananalysisService.DentistCollectionOht(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collectionOhtData1 = [];
      this.collectionOhtLabels1 = [];
      this.collectionOhtLabels = [];
      this.collectionOhtTotal = 0;
      this.dentistCollectionOhttbl = [];
      this.collectionOhtData[0]['data']=[];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collectionOhtLoader = false;
        this.collectionOhtTooltip = 'down';
        var i = 0;
        var selectedDen: any = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.collection - b.collection).reverse();
        }
        this.dentistCollectionOhttbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.dentistCollectionOhttbl = data.data;
        //   this.showCollOhtTbl = true;
        // }else{
        //   this.showCollOhtTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {

          // if (res.collection > 0) {
            this.collectionOhtData1.push(Math.round(res.collection));
            var name = res.provider_name;
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinicName;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.collectionOhtLabels1.push(pName);
              selectedDen = i;
            } else {
              this.collectionOhtLabels1.push(pName);
            }
            i++;
          // }
        });

        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors1Oht = [
            {
              backgroundColor: [],
              hoverBorderColor: '#000'
            }
          ];
          this.barChartColors1Oht[0].backgroundColor[selectedDen] = '#1CA49F';
          this.DPcolors1Oht = this.barChartColors1Oht;
        } else {
          this.DPcolors1Oht = this.lineChartColors;
        }


        this.collectionOhtData[0]['data'] = this.collectionOhtData1;
        const colors = [
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd
        ]; // this is static array for colors of bars

        let dynamicColors = [];
        this.collectionOhtLabels1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars


        this.collectionOhtData[0].backgroundColor = dynamicColors;
        this.collectionOhtLabels = this.collectionOhtLabels1;
        this.collectionOhtTotal = Math.round(data.total);
        this.collectionOhtTotalAverage = Math.round(data.total_average);
        this.collectionOhtTotalPrev = Math.round(data.total_ta);
        this.collectionOhtTotalGoal = data.goals;

        if (this.collectionOhtTotal >= this.collectionOhtTotalPrev)
          this.collectionOhtTooltip = 'up';
        this.barChartOptionsDP5.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsDP5.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionOhtTotalAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {

          this.barChartOptionsDP5.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.productionGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            }]
          }

        }
        else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }


    );
  }

  public collectionExpLoader: boolean = true;
  public collectionExpData1: any = [];
  public collectionExpTotalPrev: any = 0;
  public collectionTotalExpGoal =0;
  public collectionExpTooltip: string = '';
  public collectionLabelsExp1: any = [];
  public collectionLabelsExp: any = [];
  public collectionExpData: any[] = [{
    ...this.chartService.baseChartData,
    data: [],
  }
  ];
  public collectionExpTotal: any = 0;
  public dentistCollectionExptbl :any =[];
  public showCollExpTbl :boolean =false;
  private collectionExpChart() {
    this.collectionExpLoader = true;
    this.collectionExpData1 = [];
    this.collectionLabelsExp1 = [];
    this.collectionExpTotal = 0;
    this.collectionLabelsExp = [];
    this.barChartOptionsDP6.annotation = [];
    this.clinic_id && this.cliniciananalysisService.DentistCollectionExp(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collectionExpData1 = [];
      this.collectionLabelsExp1 = [];
      this.collectionLabelsExp = [];
      this.collectionExpTotal = 0;
      this.dentistCollectionExptbl =[];
      this.collectionExpData[0]['data']=[];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collectionExpLoader = false;
        this.collectionExpTooltip = 'down';
        var i = 0;
        var selectedDen: any = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.collection - b.collection).reverse();
        }
        this.dentistCollectionExptbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.dentistCollectionExptbl = data.data;
        //   this.showCollExpTbl = true;
        // }else{
        //   this.showCollExpTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {

          // if (res.collection > 0) {
            this.collectionExpData1.push(Math.round(res.collection));
            var name = res.provider_name;
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinicName;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.collectionLabelsExp1.push(pName);
              selectedDen = i;
            } else {
              this.collectionLabelsExp1.push(pName);
            }
            i++;
          // }
        });

        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors2 = [
            {
              backgroundColor: [],
              hoverBorderColor: '#000'
            }
          ];
          this.barChartColors2[0].backgroundColor[selectedDen] = '#1CA49F';
          this.DPcolors2 = this.barChartColors2;
        } else {
          this.DPcolors2 = this.lineChartColors;
        }


        this.collectionExpData[0]['data'] = this.collectionExpData1;
        const colors = [
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd
        ]; // this is static array for colors of bars

        let dynamicColors = [];
        this.collectionLabelsExp1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars


        this.collectionExpData[0].backgroundColor = dynamicColors;
        this.collectionLabelsExp = this.collectionLabelsExp1;
        this.collectionExpTotal = Math.round(data.total);
        this.collectionTotalAverage = Math.round(data.total_average);
        this.collectionExpTotalPrev = Math.round(data.total_ta);
        this.collectionTotalExpGoal = data.goals;

        if (this.collectionExpTotal >= this.collectionExpTotalPrev)
          this.collectionExpTooltip = 'up';
        this.barChartOptionsDP6.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsDP6.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionTotalAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {

          this.barChartOptionsDP6.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionTotalExpGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            }]
          }

        }
        else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }


    );
  }


  public collectionExpDentistsLoader: boolean = true;
  public collectionExpDentistsData1: any = [];
  public collectionExpDentistsTotalPrev: any = 0;
  public collectionExpDentistsTooltip: string = '';
  public collectionLabelsDentistsExp1: any = [];
  public collectionLabelsDentistsExp: any = [];
  public collectionExpDentistsData: any[] = [{
    ...this.chartService.baseChartData,
    data: [],
  }
  ];
  public collectionExpDentistsTotal: any = 0;
  public collectionTotalExpDentistsAverage:any= 0;
  public dentistCollectionExpDenttbl: any =[];
  public showCollExpDentTbl:boolean =false;
  private collectionExpChartDentists() {
    this.collectionExpDentistsLoader = true;
    this.collectionExpDentistsData1 = [];
    this.collectionLabelsDentistsExp1 = [];
    this.collectionExpDentistsTotal = 0;
    this.collectionLabelsDentistsExp = [];
    this.barChartOptionsDP7.annotation = [];
    this.clinic_id && this.cliniciananalysisService.DentistCollectionExpDentists(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collectionExpDentistsData1 = [];
      this.collectionLabelsDentistsExp1 = [];
      this.collectionLabelsDentistsExp = [];
      this.collectionExpDentistsTotal = 0;
      this.dentistCollectionExpDenttbl =[];
      this.collectionExpDentistsData[0]['data']=[];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collectionExpDentistsLoader = false;
        this.collectionExpDentistsTooltip = 'down';
        var i = 0;
        var selectedDen: any = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.collection - b.collection).reverse();
        }
        this.dentistCollectionExpDenttbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.dentistCollectionExpDenttbl = data.data;
        //   this.showCollExpDentTbl = true;
        // }else{
        //   this.showCollExpDentTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {

          // if (res.collection > 0) {
            this.collectionExpDentistsData1.push(Math.round(res.collection));
            var name = res.provider_name;
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinicName;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.collectionLabelsDentistsExp1.push(pName);
              selectedDen = i;
            } else {
              this.collectionLabelsDentistsExp1.push(pName);
            }
            i++;
          // }
        });

        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors2Dent = [
            {
              backgroundColor: [],
              hoverBorderColor: '#000'
            }
          ];
          this.barChartColors2Dent[0].backgroundColor[selectedDen] = '#1CA49F';
          this.DPcolors2Dent = this.barChartColors2Dent;
        } else {
          this.DPcolors2Dent = this.lineChartColors;
        }


        this.collectionExpDentistsData[0]['data'] = this.collectionExpDentistsData1;
        const colors = [
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd
        ]; // this is static array for colors of bars

        let dynamicColors = [];
        this.collectionLabelsDentistsExp1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars


        this.collectionExpDentistsData[0].backgroundColor = dynamicColors;
        this.collectionLabelsDentistsExp = this.collectionLabelsDentistsExp1;
        this.collectionExpDentistsTotal = Math.round(data.total);
        this.collectionTotalExpDentistsAverage = Math.round(data.total_average);
        this.collectionExpDentistsTotalPrev = Math.round(data.total_ta);
        this.collectionTotalExpGoal = data.goals;

        if (this.collectionExpDentistsTotal >= this.collectionExpDentistsTotalPrev)
          this.collectionExpDentistsTooltip = 'up';
        this.barChartOptionsDP7.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsDP7.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionTotalExpDentistsAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {

          this.barChartOptionsDP7.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionTotalExpGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            }]
          }

        }
        else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }


    );
  }


  public collectionExpOhtLoader: boolean = true;
  public collectionExpOhtData1: any = [];
  public collectionExpOhtTotalPrev: any = 0;
  public collectionExpOhtTooltip: string = '';
  public collectionLabelsOhtExp1: any = [];
  public collectionLabelsOhtExp: any = [];
  public collectionExpOhtData: any[] = [{
    ...this.chartService.baseChartData,
    data: [],
  }
  ];
  public collectionExpOhtTotal: any = 0;
  public collectionTotalExpOhtAverage:any= 0;
  public dentistCollectionExpOhttbl:any =[];
  public showCollExpOhtTbl:boolean = false
  private collectionExpChartOht() {
    this.collectionExpOhtLoader = true;
    this.collectionExpOhtData1 = [];
    this.collectionLabelsOhtExp1 = [];
    this.collectionExpOhtTotal = 0;
    this.collectionLabelsOhtExp = [];
    this.barChartOptionsDP8.annotation = [];
    this.clinic_id && this.cliniciananalysisService.DentistCollectionExpOht(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collectionExpOhtData1 = [];
      this.collectionLabelsOhtExp1 = [];
      this.collectionLabelsOhtExp = [];
      this.collectionExpOhtTotal = 0;
      this.dentistCollectionExpOhttbl =[];
      this.collectionExpOhtData[0]['data']=[];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collectionExpOhtLoader = false;
        this.collectionExpOhtTooltip = 'down';
        var i = 0;
        var selectedDen: any = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.collection - b.collection).reverse();
        }
        this.dentistCollectionExpOhttbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.dentistCollectionExpOhttbl = data.data;
        //   this.showCollExpOhtTbl = true;
        // }else{
        //   this.showCollExpOhtTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {

          // if (res.collection > 0) {
            this.collectionExpOhtData1.push(Math.round(res.collection));
            var name = res.provider_name;
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinicName;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.collectionLabelsOhtExp1.push(pName);
              selectedDen = i;
            } else {
              this.collectionLabelsOhtExp1.push(pName);
            }
            i++;
          // }
        });

        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors2Oht = [
            {
              backgroundColor: [],
              hoverBorderColor: '#000'
            }
          ];
          this.barChartColors2Oht[0].backgroundColor[selectedDen] = '#1CA49F';
          this.DPcolors2Oht = this.barChartColors2Oht;
        } else {
          this.DPcolors2Oht = this.lineChartColors;
        }


        this.collectionExpOhtData[0]['data'] = this.collectionExpOhtData1;
        const colors = [
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd,
          this.chartService.colors.even,
          this.chartService.colors.odd
        ]; // this is static array for colors of bars

        let dynamicColors = [];
        this.collectionLabelsOhtExp1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars


        this.collectionExpOhtData[0].backgroundColor = dynamicColors;
        this.collectionLabelsOhtExp = this.collectionLabelsOhtExp1;
        this.collectionExpOhtTotal = Math.round(data.total);
        this.collectionTotalExpOhtAverage = Math.round(data.total_average);
        this.collectionExpOhtTotalPrev = Math.round(data.total_ta);
        this.collectionTotalGoal = data.goals;

        if (this.collectionExpOhtTotal >= this.collectionExpOhtTotalPrev)
          this.collectionExpOhtTooltip = 'up';
        this.barChartOptionsDP8.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsDP8.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionTotalExpOhtAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {

          this.barChartOptionsDP8.annotation = {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.productionGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            }]
          }

        }
        else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }


    );
  }





  public buildChartDentistLoader: boolean;
  public maxProductionGoal: any = 0;
  //Individual Dentist Production Chart
  private buildChartDentist() {
    this.buildChartDentistLoader = true;
    this.gaugeLabel = '';
    this.productionTooltip = 'down';
    this.clinic_id && this.cliniciananalysisService.DentistProductionSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.productionTotal = 0;
      this.productionTotalPrev = 0;
      this.productionTotalAverage = 0;
      this.maxProductionGoal = 0;
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.buildChartDentistLoader = false;
        this.gaugeValue = 0;
        if (data.data != null) {
          data.data.forEach((res) => {
            if (res.production)
              this.gaugeValue = Math.round(res.production);

            this.gaugeLabel = res.provider_name;
            this.gaugeLabel = res.provider_name;
          });
          this.productionTotal = Math.round(data.total);
          this.productionTotalPrev = Math.round(data.total_ta);
          this.productionTotalAverage = Math.round(data.total_average);
          this.productionGoal = data.goals;
          if (this.productionTotal > this.productionTotalPrev) {
            this.productionTooltip = 'up';
          }
          if (this.gaugeValue > this.productionGoal)
            this.maxProductionGoal = this.gaugeValue;
          else
            this.maxProductionGoal = this.productionGoal;

          if (this.maxProductionGoal == 0)
            this.maxProductionGoal = '';
        }
      } else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public buildChartsingleDentistLoader: boolean;
  public maxProductionSingleDentistGoal: any = 0;
  public gaugeSingleDentistLabel: any = '';
  public gaugeSingleDentistValue: any = 0;
  public productionSingleDentistTotal: any = 0;
  public productionSingleDentistTotalPrev: any = 0;
  public productionSingleDentistGoal: any = 0;
  //Individual Dentist Production Chart
  private buildChartSingleDentist() {
    this.buildChartsingleDentistLoader = true;
    this.gaugeSingleDentistLabel = '';
    this.productionTooltip = 'down';
    this.clinic_id && this.cliniciananalysisService.DentistProductionDentistSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.productionSingleDentistTotal = 0;
      this.productionSingleDentistTotalPrev = 0;
      this.productionTotalAverage = 0;
      this.maxProductionSingleDentistGoal = 0;
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.buildChartsingleDentistLoader = false;
        this.gaugeSingleDentistValue = 0;
        if (data.data != null) {
          data.data.forEach((res) => {
            if (res.production)
              this.gaugeSingleDentistValue = Math.round(res.production);

            this.gaugeSingleDentistLabel = res.provider_name;
            this.gaugeSingleDentistLabel = res.provider_name;
          });
          this.productionSingleDentistTotal = Math.round(data.total);
          this.productionSingleDentistTotalPrev = Math.round(data.total_ta);
          this.productionTotalAverage = Math.round(data.total_average);
          this.productionSingleDentistGoal = data.goals;
          if (this.productionSingleDentistTotal > this.productionSingleDentistTotalPrev) {
            this.productionTooltip = 'up';
          }
          if (this.gaugeSingleDentistValue > this.productionSingleDentistGoal)
            this.maxProductionSingleDentistGoal = this.gaugeSingleDentistValue;
          else
            this.maxProductionSingleDentistGoal = this.productionSingleDentistGoal;

          if (this.maxProductionSingleDentistGoal == 0)
            this.maxProductionSingleDentistGoal = '';
        }
      } else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public buildChartsingleOhtLoader: boolean;
  public maxProductionSingleOhtGoal: any = 0;
  public gaugeSingleOhtLabel: any = '';
  public gaugeSingleOhtValue: any = 0;
  public productionSingleOhtTotal: any = 0;
  public productionSingleOhtTotalPrev: any = 0;
  public productionSingleOhtGoal: any = 0;
  //Individual Dentist Production Chart
  private buildChartSingleOht() {
    this.buildChartsingleOhtLoader = true;
    this.gaugeSingleOhtLabel = '';
    this.productionTooltip = 'down';
    this.clinic_id && this.cliniciananalysisService.DentistProductionOhtSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.productionSingleOhtTotal = 0;
      this.productionSingleOhtTotalPrev = 0;
      this.productionTotalAverage = 0;
      this.maxProductionSingleOhtGoal = 0;
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.buildChartsingleOhtLoader = false;
        this.gaugeSingleOhtValue = 0;
        if (data.data != null) {
          data.data.forEach((res) => {
            if (res.production)
              this.gaugeSingleOhtValue = Math.round(res.production);

            this.gaugeSingleOhtLabel = res.provider_name;
            this.gaugeSingleOhtLabel = res.provider_name;
          });
          this.productionSingleOhtTotal = Math.round(data.total);
          this.productionSingleOhtTotalPrev = Math.round(data.total_ta);
          this.productionTotalAverage = Math.round(data.total_average);
          this.productionSingleOhtGoal = data.goals;
          if (this.productionSingleOhtTotal > this.productionSingleOhtTotalPrev) {
            this.productionTooltip = 'up';
          }
          if (this.gaugeSingleOhtValue > this.productionSingleOhtGoal)
            this.maxProductionSingleOhtGoal = this.gaugeSingleOhtValue;
          else
            this.maxProductionSingleOhtGoal = this.productionSingleOhtGoal;

          if (this.maxProductionSingleOhtGoal == 0)
            this.maxProductionSingleOhtGoal = '';
        }
      } else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  // Dentist collection data
  public collectionDentistLoader: boolean = true;
  public gaugeCollectionLabel: any = '';
  public gaugeCollectionValue: any = 0;
  public collectionDentistTotal: any = 0;
  public collectionDentistTotalPrev: any = 0;
  // public dentistCollectionGoal: any = 0;
  public maxCollectionGoal: any = 0;


  private collectionDentist() {
    this.collectionDentistLoader = true;
    this.gaugeCollectionLabel = '';
    this.collectionTooltip = 'down';
    this.clinic_id && this.cliniciananalysisService.DentistCollectionSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.collectionDentistTotal = 0;
      this.collectionDentistTotalPrev = 0;
      this.productionTotalAverage = 0;
      this.maxCollectionGoal = 0;
      this.gaugeCollectionValue = 0;
      this.collectionTotalGoal = 0;
      this.collectionDentistLoader = false;
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        if (data.data != null) {
          data.data.forEach((res) => {
            if (res.collection)
              this.gaugeCollectionValue = Math.round(res.collection);

            this.gaugeCollectionLabel = res.provider_name;
          });
          this.collectionDentistTotal = Math.round(data.total);
          this.collectionDentistTotalPrev = Math.round(data.total_ta);
          this.productionTotalAverage = Math.round(data.total_average);
          this.collectionTotalGoal = data.goals;
          if (this.productionTotal > this.productionTotalPrev) {
            this.collectionTooltip = 'up';
          }
          if (this.gaugeCollectionValue > this.collectionTotalGoal)
            this.maxCollectionGoal = this.gaugeValue;
          else
            this.maxCollectionGoal = this.collectionTotalGoal;

          if (this.maxCollectionGoal == 0)
            this.maxCollectionGoal = '';
        }
      } else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public collectionSingleDentistLoader: boolean = true;
  public gaugeCollectionSingleDentistLabel: any = '';
  public gaugeCollectionSingleDentistValue: any = 0;
  public collectionSingleDentistTotal: any = 0;
  public collectionSingleDentistTotalPrev: any = 0;
  public dentistCollectionSingleDentistGoal: any = 0;
  public maxCollectionSingleDentistGoal: any = 0;


  private collectionSingleDentist() {
    this.collectionSingleDentistLoader = true;
    this.gaugeCollectionSingleDentistLabel = '';
    this.collectionTooltip = 'down';
    this.clinic_id && this.cliniciananalysisService.DentistCollectionDentistsSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.collectionSingleDentistTotal = 0;
      this.collectionSingleDentistTotalPrev = 0;
      this.productionTotalAverage = 0;
      this.maxCollectionSingleDentistGoal = 0;
      this.gaugeCollectionSingleDentistValue = 0;
      this.collectionSingleDentistLoader = false;
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        if (data.data != null) {
          data.data.forEach((res) => {
            if (res.collection)
              this.gaugeCollectionSingleDentistValue = Math.round(res.collection);

            this.gaugeCollectionSingleDentistLabel = res.provider_name;
          });
          this.collectionSingleDentistTotal = Math.round(data.total);
          this.collectionSingleDentistTotalPrev = Math.round(data.total_ta);
          this.productionTotalAverage = Math.round(data.total_average);
          this.dentistCollectionSingleDentistGoal = data.goals;
          if (this.productionTotal > this.productionTotalPrev) {
            this.collectionTooltip = 'up';
          }
          if (this.gaugeCollectionSingleDentistValue > this.dentistCollectionSingleDentistGoal)
            this.maxCollectionSingleDentistGoal = this.gaugeValue;
          else
            this.maxCollectionSingleDentistGoal = this.dentistCollectionSingleDentistGoal;

          if (this.maxCollectionSingleDentistGoal == 0)
            this.maxCollectionSingleDentistGoal = '';
        }
      } else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public collectionSingleOhtLoader: boolean = true;
  public gaugeCollectionSingleOhtLabel: any = '';
  public gaugeCollectionSingleOhtValue: any = 0;
  public collectionSingleOhtTotal: any = 0;
  public collectionSingleOhtTotalPrev: any = 0;
  public dentistCollectionSingleOhtGoal: any = 0;
  public maxCollectionSingleOhtGoal: any = 0;


  private collectionSingleOht() {
    this.collectionSingleOhtLoader = true;
    this.gaugeCollectionSingleOhtLabel = '';
    this.collectionTooltip = 'down';
    this.clinic_id && this.cliniciananalysisService.DentistCollectionOhtSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.collectionSingleOhtTotal = 0;
      this.collectionSingleOhtTotalPrev = 0;
      this.productionTotalAverage = 0;
      this.maxCollectionSingleOhtGoal = 0;
      this.gaugeCollectionSingleOhtValue = 0;
      this.collectionSingleOhtLoader = false;
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        if (data.data != null) {
          data.data.forEach((res) => {
            if (res.collection)
              this.gaugeCollectionSingleOhtValue = Math.round(res.collection);

            this.gaugeCollectionSingleOhtLabel = res.provider_name;
          });
          this.collectionSingleOhtTotal = Math.round(data.total);
          this.collectionSingleOhtTotalPrev = Math.round(data.total_ta);
          this.productionTotalAverage = Math.round(data.total_average);
          this.dentistCollectionSingleOhtGoal = data.goals;
          if (this.productionTotal > this.productionTotalPrev) {
            this.collectionTooltip = 'up';
          }
          if (this.gaugeCollectionSingleOhtValue > this.dentistCollectionSingleOhtGoal)
            this.maxCollectionSingleOhtGoal = this.gaugeValue;
          else
            this.maxCollectionSingleOhtGoal = this.dentistCollectionSingleOhtGoal;

          if (this.maxCollectionSingleOhtGoal == 0)
            this.maxCollectionSingleOhtGoal = '';
        }
      } else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

    // Dentist collection exp data
    public collectionExpDentistLoader: boolean = true;
    public gaugeCollectionExpLabel: any = '';
    public gaugeCollectionExpValue: any = 0;
    public collectionExpDentistTotal: any = 0;
    public collectionExpDentistTotalPrev: any = 0;
    public dentistCollectionExpGoal: any = 0;
    public maxCollectionExpGoal: any = 0;
  
  
    private collectionExpDentist() {
      this.collectionExpDentistLoader = true;
      this.gaugeCollectionExpLabel = '';
      this.collectionTooltip = 'down';
      this.clinic_id && this.cliniciananalysisService.DentistCollectionExpSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
        this.collectionExpDentistTotal = 0;
        this.collectionExpDentistTotalPrev = 0;
        this.productionTotalAverage = 0;
        this.maxCollectionExpGoal = 0;
        this.gaugeCollectionExpValue = 0;
        this.collectionExpDentistLoader = false;
        if (data.message == 'success') {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (data.data != null) {
            data.data.forEach((res) => {
              if (res.collection)
                this.gaugeCollectionExpValue = Math.round(res.collection);
  
              this.gaugeCollectionExpLabel = res.provider_name;
            });
            this.collectionExpDentistTotal = Math.round(data.total);
            this.collectionExpDentistTotalPrev = Math.round(data.total_ta);
            this.productionTotalAverage = Math.round(data.total_average);
            this.dentistCollectionExpGoal = data.goals;
            if (this.productionTotal > this.productionTotalPrev) {
              this.collectionTooltip = 'up';
            }
            if (this.gaugeCollectionExpValue > this.dentistCollectionExpGoal)
              this.maxCollectionExpGoal = this.gaugeValue;
            else
              this.maxCollectionExpGoal = this.dentistCollectionExpGoal;
  
            if (this.maxCollectionExpGoal == 0)
              this.maxCollectionExpGoal = '';
          }
        } else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }, error => {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.toastr.error('There was an error retrieving your report data, please contact our support team.');
        this.warningMessage = "Please Provide Valid Inputs!";
      });
    }

    public collectionExpSingleDentistLoader: boolean = true;
    public gaugeCollectionExpSingleDentistLabel: any = '';
    public gaugeCollectionExpSingleDentistValue: any = 0;
    public collectionExpSingleDentistTotal: any = 0;
    public collectionExpSingleDentistTotalPrev: any = 0;
    public dentistCollectionExpSingleDentistGoal: any = 0;
    public maxCollectionExpSingleDentistGoal: any = 0;
  
  
    private collectionExpSingleDentist() {
      this.collectionExpSingleDentistLoader = true;
      this.gaugeCollectionExpSingleDentistLabel = '';
      this.collectionTooltip = 'down';
      this.clinic_id && this.cliniciananalysisService.DentistCollectionExpDentistsSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
        this.collectionExpSingleDentistTotal = 0;
        this.collectionExpSingleDentistTotalPrev = 0;
        this.productionTotalAverage = 0;
        this.maxCollectionExpSingleDentistGoal = 0;
        this.gaugeCollectionExpSingleDentistValue = 0;
        this.collectionExpSingleDentistLoader = false;
        if (data.message == 'success') {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (data.data != null) {
            data.data.forEach((res) => {
              if (res.collection)
                this.gaugeCollectionExpSingleDentistValue = Math.round(res.collection);
  
              this.gaugeCollectionExpSingleDentistLabel = res.provider_name;
            });
            this.collectionExpSingleDentistTotal = Math.round(data.total);
            this.collectionExpSingleDentistTotalPrev = Math.round(data.total_ta);
            this.productionTotalAverage = Math.round(data.total_average);
            this.dentistCollectionExpSingleDentistGoal = data.goals;
            if (this.productionTotal > this.productionTotalPrev) {
              this.collectionTooltip = 'up';
            }
            if (this.gaugeCollectionExpSingleDentistValue > this.dentistCollectionExpSingleDentistGoal)
              this.maxCollectionExpSingleDentistGoal = this.gaugeValue;
            else
              this.maxCollectionExpSingleDentistGoal = this.dentistCollectionExpSingleDentistGoal;
  
            if (this.maxCollectionExpSingleDentistGoal == 0)
              this.maxCollectionExpSingleDentistGoal = '';
          }
        } else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }, error => {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.toastr.error('There was an error retrieving your report data, please contact our support team.');
        this.warningMessage = "Please Provide Valid Inputs!";
      });
    }

    public collectionExpSingleOhtLoader: boolean = true;
    public gaugeCollectionExpSingleOhtLabel: any = '';
    public gaugeCollectionExpSingleOhtValue: any = 0;
    public collectionExpSingleOhtTotal: any = 0;
    public collectionExpSingleOhtTotalPrev: any = 0;
    public dentistCollectionExpSingleOhtGoal: any = 0;
    public maxCollectionExpSingleOhtGoal: any = 0;
  
  
    private collectionExpSingleOht() {
      this.collectionExpSingleOhtLoader = true;
      this.gaugeCollectionExpSingleOhtLabel = '';
      this.collectionTooltip = 'down';
      this.clinic_id && this.cliniciananalysisService.DentistCollectionExpOhtSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
        this.collectionExpSingleOhtTotal = 0;
        this.collectionExpSingleOhtTotalPrev = 0;
        this.productionTotalAverage = 0;
        this.maxCollectionExpSingleOhtGoal = 0;
        this.gaugeCollectionExpSingleOhtValue = 0;
        this.collectionExpSingleOhtLoader = false;
        if (data.message == 'success') {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (data.data != null) {
            data.data.forEach((res) => {
              if (res.collection)
                this.gaugeCollectionExpSingleOhtValue = Math.round(res.collection);
  
              this.gaugeCollectionExpSingleOhtLabel = res.provider_name;
            });
            this.collectionExpSingleOhtTotal = Math.round(data.total);
            this.collectionExpSingleOhtTotalPrev = Math.round(data.total_ta);
            this.productionTotalAverage = Math.round(data.total_average);
            this.dentistCollectionExpSingleOhtGoal = data.goals;
            if (this.productionTotal > this.productionTotalPrev) {
              this.collectionTooltip = 'up';
            }
            if (this.gaugeCollectionExpSingleOhtValue > this.dentistCollectionExpSingleOhtGoal)
              this.maxCollectionExpSingleOhtGoal = this.gaugeValue;
            else
              this.maxCollectionExpSingleOhtGoal = this.dentistCollectionExpSingleOhtGoal;
  
            if (this.maxCollectionExpSingleOhtGoal == 0)
              this.maxCollectionExpSingleOhtGoal = '';
          }
        } else if (data.status == '401') {
          this._cookieService.put("username", '');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }, error => {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.toastr.error('There was an error retrieving your report data, please contact our support team.');
        this.warningMessage = "Please Provide Valid Inputs!";
      });
    }

  public recallChartData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd
      ]
    }
  ];
  public recallChartAverage;
  public recallChartGoal;
  public recallChartAveragePrev;
  public recallChartTooltip = 'down';
  public barChartOptionsRP: any = this.barChartOptionsPercent;
  public recallPrebookLoader: boolean;
  public rpKey: any;
  public RPcolors: any;
  public recalltbl :any =[];
  public showrecallTbl:boolean =false;
  private recallPrebook() {
    this.recallPrebookLoader = true;
    this.recallChartData1 = [];
    this.recallChartLabels1 = [];
    this.recallChartLabels = [];
    this.barChartOptionsRP.annotation = [];

    this.clinic_id && this.cliniciananalysisService.RecallPrebook(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.recallChartData1 = [];
      this.recallChartLabels1 = [];

      this.recallChartLabels = [];
      this.barChartOptionsRP.annotation = [];
      this.recalltbl =[];
      this.recallChartData[0]['data']=[];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.recallPrebookLoader = false;

        this.recallChartTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.recall_percent - b.recall_percent).reverse();
        }
        this.recalltbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.recalltbl = data.data;
        //   this.showrecallTbl = true;
        // }else{
        //   this.showrecallTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.recall_percent >= 0) {
            if (res.provider_name != null) {
              var pName ='';
              if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                  pName = res.provider_name + " - " + res.clinic_name;
                }else{
                  pName = res.provider_name;
                }
              this.recallChartData1.push(Math.round(res.recall_percent));
              this.recallChartLabels1.push(pName);
              if (res.provider_name != 'Anonymous')
                this.rpKey = i;
              i++;
            }
          }
        });
        this.recallChartData[0]['data'] = this.recallChartData1;
        this.recallChartLabels = this.recallChartLabels1;
        this.recallChartAverage = Math.round(data.total);
        this.recallChartAveragePrev = Math.round(data.total_ta);
        this.recallChartGoal = data.goals;

        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            { backgroundColor: [] }
          ];
          this.barChartColors[0].backgroundColor[this.rpKey] = '#1CA49F';
          this.RPcolors = this.barChartColors;
        }
        else {
          this.RPcolors = this.lineChartColors;
          let dynamicColors = [];
          this.recallChartLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.recallChartData[0].backgroundColor = dynamicColors;
        }
        if (this.recallChartAverage >= this.recallChartAveragePrev)
          this.recallChartTooltip = 'up';
        this.barChartOptionsRP.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsRP.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.recallChartAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsRP.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.recallChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }
  public recallPrebookDentistLoader: boolean;
  public maxrecallGoal: any = 0;
  //Individual Dentist Production Chart
  private recallPrebookDentist() {
    this.recallPrebookDentistLoader = true;
    this.recallValue = 0;
    this.recallChartTooltip = 'down';
    this.recallLabel = '';
    this.clinic_id && this.cliniciananalysisService.RecallPrebookSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.maxrecallGoal = 0;

      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.recallPrebookDentistLoader = false;
        this.recallValue = '0';
        if (data.data.length > 0) {
          this.recallValue = Math.round(data.data[0].recall_percent);
          this.recallLabel = data.data[0].provider_name;

        }
        this.recallChartAveragePrev = data.total_ta;
        this.recallGoal = data.goals;
        this.recallChartAverage = data.total;
        if (this.recallValue > this.recallGoal)
          this.maxrecallGoal = this.recallValue;
        else
          this.maxrecallGoal = this.recallGoal;

        if (this.maxrecallGoal == 0)
          this.maxrecallGoal = '';
        if (this.recallValue >= this.recallChartAveragePrev)
          this.recallChartTooltip = 'up';
      }
      else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public treatmentPreChartData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd
      ]
    }
  ];
  public treatmentPreChartAverage;
  public treatmentPreChartGoal;
  public treatmentPreChartAveragePrev;
  public treatmentPreChartTooltip = 'down';
  public barChartOptionsTPB: any = this.barChartOptionsPercent;
  public prebook = 'recall';
  public treatmentPrebookLoader: boolean;
  public tpKey: any;
  public TPcolors: any;
  //All dentist Treatment Prebook Chart
  public reappointtbl:any =[];
  public showreappointTbl:boolean =false;
  private treatmentPrePrebook() {

    this.treatmentPrebookLoader = true;
    this.treatmentPreChartData1 = [];
    this.treatmentPreChartLabels1 = [];

    this.treatmentPreChartLabels = [];
    this.barChartOptionsTPB.annotation = [];

    this.clinic_id && this.cliniciananalysisService.caReappointRate(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.treatmentPreChartData1 = [];
      this.treatmentPreChartLabels1 = [];
      this.reappointtbl =[];
      this.treatmentPreChartLabels = [];
      this.barChartOptionsTPB.annotation = [];
      this.treatmentPreChartData[0]['data']=[];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.treatmentPrebookLoader = false;
        this.treatmentPreChartTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.reappoint_rate - b.reappoint_rate).reverse();
        }
        this.reappointtbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.reappointtbl = data.data;
        //   this.showreappointTbl = true;
        // }else{
        //   this.showreappointTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.reappoint_rate >= 0) {
            if (res.provider_name != null) {
              var pName ='';
              if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                  pName = res.provider_name + " - " + res.clinic_name;
                }else{
                  pName = res.provider_name;
                }
              this.treatmentPreChartData1.push(Math.round(res.reappoint_rate));
              this.treatmentPreChartLabels1.push(pName);
              if (res.provider_name != 'Anonymous')
                this.tpKey = i;
              i++;
            }
          }
        });
        this.treatmentPreChartData[0]['data'] = this.treatmentPreChartData1;
        this.treatmentPreChartLabels = this.treatmentPreChartLabels1;
        this.treatmentPreChartAverage = Math.round(data.total);
        this.treatmentPreChartAveragePrev = Math.round(data.total_ta);
        this.treatmentPreChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            { backgroundColor: [] }
          ];
          this.barChartColors[0].backgroundColor[this.tpKey] = '#1CA49F';
          this.TPcolors = this.barChartColors;
        }
        else {
          this.TPcolors = this.lineChartColors;

          let dynamicColors = [];
          this.treatmentPreChartLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.treatmentPreChartData[0].backgroundColor = dynamicColors;
        }
        if (this.treatmentPreChartAverage >= this.treatmentPreChartAveragePrev)
          this.treatmentPreChartTooltip = 'up';

        if (this.goalchecked == 'average') {
          this.barChartOptionsTPB.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.treatmentPreChartAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsTPB.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.treatmentPreChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    }
    );
  }
  public treatmentPrebookDentistLoader: boolean;

  //Individual Treatment Prebook Chart
  public prePrebookMax: any = 0;
  private treatmentPrePrebookDentist() {
    this.treatmentPrebookDentistLoader = true;
    this.treatmentPreValue = '0';
    this.treatmentPreLabel = '';
    this.clinic_id && this.cliniciananalysisService.caReappointRateSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.treatmentPrebookDentistLoader = false;
        this.treatmentPreGoal = data.goals;
        if (data.data.length > 0) {
          this.treatmentPreValue = Math.round(data.data[0].reappoint_rate);
          this.treatmentPreLabel = data.data[0].provider_name;
        }
        this.prePrebookMax = data.goals;
        if (this.treatmentPreValue > this.prePrebookMax)
          this.prePrebookMax = this.treatmentPreValue;


        this.treatmentPreChartAveragePrev = data.total_ta;
        this.treatmentPreGoal = data.goals;

      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


  public treatmentChartData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd
      ]
    }
  ];
  public treatmentChartAverage;
  public treatmentChartGoal;
  public treatmentChartAveragePrev;
  public treatmentChartTooltip = 'down';
  public barChartOptionsTP: any = this.barChartOptionsPercent;
  public treatmentPlanRateLoader: boolean;
  public TPRKey: any;
  public TPRcolors: any;
  //Treatment pLAn Rate chart for all dentists
  public tprtbl:any=[];
  public showpTprTbl:boolean=false;
  private treatmentPlanRate() {
    this.treatmentPlanRateLoader = true;
    this.treatmentChartData1 = [];
    this.treatmentChartLabels1 = [];

    this.treatmentChartLabels = [];
    this.barChartOptionsTP.annotation = []

    this.clinic_id && this.cliniciananalysisService.TreatmentPlanRate(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.treatmentChartData1 = [];
      this.treatmentChartLabels1 = [];
      this.tprtbl=[];
      this.treatmentChartLabels = [];
      this.barChartOptionsTP.annotation = [];
      this.treatmentChartData[0]['data'] =[];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.treatmentPlanRateLoader = false;
        this.treatmentChartTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.treatment_per_plan_percentage - b.treatment_per_plan_percentage).reverse();
        }
        this.tprtbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.tprtbl = data.data;
        //   this.showpTprTbl = true;
        // }else{
        //   this.showpTprTbl = false;
        // }	
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.treatment_per_plan_percentage) {
            this.treatmentChartData1.push(Math.round(res.treatment_per_plan_percentage));
            var name = res.provider_name;
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.treatmentChartLabels1.push(pName);
              this.TPRKey = i;
            }
            else
              this.treatmentChartLabels1.push(pName);
            i++;
          }
        });
        this.treatmentChartData[0]['data'] = this.treatmentChartData1;
        this.treatmentChartLabels = this.treatmentChartLabels1;
        this.treatmentChartAverage = Math.round(data.total);
        this.treatmentChartAveragePrev = (data.total_ta) ? Math.round(data.total_ta) : 0;
        this.treatmentChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            { backgroundColor: [] }
          ];
          this.barChartColors[0].backgroundColor[this.TPRKey] = '#1CA49F';
          this.TPRcolors = this.barChartColors;
        }
        else {
          this.TPRcolors = this.lineChartColors;

          let dynamicColors = [];
          this.treatmentChartLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.treatmentChartData[0].backgroundColor = dynamicColors;
        }
        if (this.treatmentChartAverage >= this.treatmentChartAveragePrev)
          this.treatmentChartTooltip = 'up';

        ;
        if (this.goalchecked == 'average') {
          this.barChartOptionsTP.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.treatmentChartAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsTP.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.treatmentChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public treatmentPlanValue: any = 0;
  public treatmentPlanLabel = '';
  public treatmentPlanGoal;
  public treatmentPlanRateDentistLoader: any;
  public maxtreatmentPlanGoal: any = 0;

  //Individual Treatment plan rate chart
  private treatmentPlanRateDentist() {
    this.treatmentPlanRateDentistLoader = true;
    this.treatmentPlanValue = '0';
    this.treatmentPlanLabel = '';
    this.treatmentChartAveragePrev = 0;
    this.treatmentChartTooltip = 'down';
    this.clinic_id && this.cliniciananalysisService.TreatmentPlanRateSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      if (data && data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.treatmentPlanRateDentistLoader = false;
        this.treatmentPlanValue = '0';
        if (data.data.length > 0) {
          this.treatmentPlanValue = Math.round(data.data[0].treatment_per_plan_percentage);
          this.treatmentPlanLabel = data.data[0].provider_name;
        }
        this.treatmentPlanGoal = Math.round(data.goals);
        this.treatmentChartAveragePrev = (data.total_ta) ? Math.round(data.total_ta) : 0;
        this.treatmentChartAverage = Math.round(data.total);
        if (this.treatmentChartAverage >= this.treatmentChartAveragePrev)
          this.treatmentChartTooltip = 'up';
        if (this.treatmentPlanValue > this.treatmentPlanGoal)
          this.maxtreatmentPlanGoal = this.treatmentPlanValue;
        else
          this.maxtreatmentPlanGoal = this.treatmentPlanGoal;
        if (this.maxtreatmentPlanGoal == 0)
          this.maxtreatmentPlanGoal = '';
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public tcmain;
  public planTotalTooltip = 'down';
  public planTotalPrev;
  public planAllTotal = 0;
  public planAllTotalTrend = 0;
  public planChartLabels2 = [];
  public barChartOptionsTC: any = {
    borderRadius: 50,
    hover: { mode: null },
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
        ticks: {
          autoSkip: false,
          userCallback: (label: string) => {
            const names = this.splitName(label);
            // if (names.length > 1) {
            //   return `${names[0][0]} ${names[1]}`
            // } else return `${names[0]}`;
            if (names.length == 3) {
              return `${names[0]}`
            } else if (names.length == 2){
              return `${names[0][0]} ${names[1]}`
            } else {
              return `${names[0]}`;
            }
          }
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
        }
      }],
    },
    tooltips: {
      mode: 'x-axis',
      bodyFontFamily: 'Gilroy-Regular',
      cornerRadius: 0,
      // backgroundColor: '#fff',
      // titleFontColor: '#000',
      // bodyFontColor: '#000',
      // borderColor: '#000',
      callbacks: {
        label: (tooltipItem) => {
          // return this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
          return tooltipItem.xLabel + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
        },
        // remove title
        title: function () {
          return;
        }
      }
    }
  };
  public buildChartTreatmentLoader: boolean = false;
  public TPACAcolors: any;
  public TPACCcolors: any;
  public tpacAKey;
  public tpacCKey;


  //Treatment Plan Average Cost for all dentist
  public planChartCtbl:any=[];
  public planChartPtbl:any=[];
  public showplanChartCTbl :boolean = false;
  public showplanChartPTbl:boolean = false;
  private buildChartTreatment() {
    this.buildChartTreatmentLoader = true;
    $('.treatment_cost .sa_tab_btn').removeClass('active');
    $('.tcmain1').addClass('active');
    this.tcmain = 1;
    this.planChartData1 = [];
    this.planChartData2 = [];
    this.planChartLabels1 = [];
    this.planChartLabels2 = [];
    this.planTotal = 0;
    this.planChartLabels = [];
    this.barChartOptionsTC.annotation = [];
    this.clinic_id && this.cliniciananalysisService.TreatmentPlan(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.tcmain = 1;
      this.planChartData1 = [];
      this.planChartData2 = [];
      this.planChartLabels1 = [];
      this.planChartLabels2 = [];
      this.planTotal = 0;
      this.planChartLabels = [];
      this.planChartDataP[0]['data'] =[];
      this.planChartDataC[0]['data'] = [];
      this.barChartOptionsTC.annotation = [];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.buildChartTreatmentLoader = false;
        this.planTotalTooltip = 'down';
        var ia = 0;
        this.treatmentPlanProposedProvidersByInx = [];
        this.planChartCtbl = [];
        this.planChartPtbl = [];
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data['plan_fee_all'].sort((a, b)=> a.average_fees - b.average_fees).reverse();
          data.data['plan_fee_completed'].sort((a, b)=> a.average_fees - b.average_fees).reverse();
        }
        this.planChartPtbl = data.data['plan_fee_all'];
        // if(data.data.plan_fee_all.length >= this.numberOfRecords){
        //   this.planChartPtbl = data.data['plan_fee_all'];
        //   this.showplanChartPTbl = true;
        // }else{
        //   this.showplanChartPTbl = false;
        // }
        if (data.data.plan_fee_all.length > this.numberOfRecords) data.data.plan_fee_all = data.data.plan_fee_all.slice(0, this.numberOfRecords);
        data.data.plan_fee_all.forEach(res => {
          if (res.average_fees > 0) {
            if (res.provider_name != null) {
              var pName ='';
              if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                  pName = res.provider_name + " - " + res.clinic_name;
                }else{
                  pName = res.provider_name;
                }
              this.planChartData1.push(Math.round(res.average_fees));
              this.planChartLabels1.push(pName);
              this.treatmentPlanProposedProvidersByInx.push(pName);
              if (res.provider_name != 'Anonymous')
                this.tpacAKey = ia;
              ia++;
            }
          }
        });
        this.planAllTotal = Math.round(data.total_all);
        this.planAllTotalTrend = Math.round(data.total_ta_all);
       
        var ic = 0;
        this.planChartCtbl = data.data['plan_fee_completed'];
        // if(data.data.plan_fee_completed.length >= this.numberOfRecords){
        //   this.planChartCtbl = data.data['plan_fee_completed'];
        //   this.showplanChartCTbl = true;
        // }else{
        //   this.showplanChartCTbl = false;
        // }
        if (data.data.plan_fee_completed.length > this.numberOfRecords) data.data.plan_fee_completed = data.data.plan_fee_completed.slice(0, this.numberOfRecords);
        data.data.plan_fee_completed.forEach(res => {
          if (res.average_fees) {
             var prName ='';
              if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                  prName = res.provider_name + " - " + res.clinic_name;
                }else{
                  prName = res.provider_name;
                }
            this.planChartData2.push(Math.round(res.average_fees));
            this.planChartLabels2.push(prName);
            this.treatmentPlanProposedProvidersByInx.push(prName);
            if (res.provider_name != 'Anonymous')
              this.tpacCKey = ic;
            ic++;
          }
        });
        this.planCompletedTotal = Math.round(data.total_completed);
        this.planCompletedTotalTrend = Math.round(data.total_ta_completed);
        let dynamicColors = [];
        this.planChartLabels1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.planChartDataP[0].backgroundColor = dynamicColors;

        this.planChartDataP[0]['data'] = this.planChartData1;
        this.planChartDataC[0]['data'] = this.planChartData2;
        this.planChartDataP[0]['label'] = '';
        this.planChartDataC[0]['label'] = '';
        this.planChartLabels = this.planChartLabels1;
        this.planTotalAverage = this.planAllTotal;
        this.planTotalGoal = data.goals;
        this.planTotalPrev = this.planAllTotalTrend;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            { backgroundColor: [] }
          ];
          this.barChartColors[0].backgroundColor[this.tpacAKey] = '#1CA49F';
          this.TPACAcolors = this.barChartColors;
          this.barChartColors = [
            { backgroundColor: [] }
          ];
          this.barChartColors[0].backgroundColor[this.tpacCKey] = '#1CA49F';
          this.TPACCcolors = this.barChartColors;

        }
        else {
          this.TPACAcolors = this.lineChartColors;
          this.TPACCcolors = this.lineChartColors;
          let dynamicColors1 = [];
          this.planChartLabels1.forEach((label, labelIndex) => {
            dynamicColors1.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.planChartDataP[0].backgroundColor = dynamicColors1;

          let dynamicColors2 = [];
          this.planChartLabels2.forEach((label, labelIndex) => {
            dynamicColors2.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.planChartDataC[0].backgroundColor = dynamicColors2;

        }
        if (this.planTotalAverage >= this.planTotalPrev)
          this.planTotalTooltip = 'up';
        var index = 0;
        this.barChartOptionsTC.annotation = [];
        if (this.goalchecked == 'average') {
          this.barChartOptionsTC.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.planTotalAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsTC.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.planTotalGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public gaugeValueTreatmentP: any = 0;
  public gaugeValueTreatmentC: any = 0;
  public maxplanTotalGoal: any = 0;
  public buildChartTreatmentDentistLoader: boolean;

  //Individual Treatment Plan Average Cost
  private buildChartTreatmentDentist() {
    $('.treatmentPlanSingle .treatment_cost .sa_tab_btn').removeClass('active');
    $('.treatmentPlanSingle .tcmain1').addClass('active');
    this.buildChartTreatmentDentistLoader = true;


    this.clinic_id && this.cliniciananalysisService.TreatmentPlanDentist(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.gaugeValueTreatment = 0;
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.buildChartTreatmentDentistLoader = false;
        this.gaugeValueTreatmentP = 0;
        this.gaugeValueTreatmentC = 0;
        this.gaugeValueTreatment = 0;
        if (data.data != null) {
          if (data.data.plan_fee_completed[0] && data.data.plan_fee_completed[0].average_fees != undefined)
            this.gaugeValueTreatmentC = Math.round(data.data.plan_fee_completed[0].average_fees);
          if (data.data.plan_fee_all[0] && data.data.plan_fee_all[0].average_fees != undefined)
            this.gaugeValueTreatmentP = Math.round(data.data.plan_fee_all[0].average_fees);
          if (data.data.plan_fee_all[0] && data.data.plan_fee_all[0].provider_name != undefined)
            this.gaugeLabelTreatment = data.data.plan_fee_all[0].provider_name;
          this.planTotalAll = Math.round(data.total_all);
          this.planTotalCompleted = Math.round(data.total_completed);
          this.planTotal = this.planTotalAll;
          this.planCompletedTotalTrend = Math.round(data.total_ta_completed);
          this.planAllTotalTrend = Math.round(data.total_ta_all);
          this.planTotalPrev = this.planAllTotalTrend;
        }
        else {
          this.gaugeValueTreatmentP = 0;
          this.gaugeValueTreatmentC = 0;
          this.gaugeLabelTreatment = "";
          this.planTotal = 0;
          this.planTotalAverage = 0;
          this.planCompletedTotalTrend = 0;
          this.planAllTotalTrend = 0;
          this.planTotalPrev = this.planAllTotalTrend;
          this.planTotalAll = 0;
          this.planTotalCompleted = 0;
        }
        this.gaugeValueTreatment = this.gaugeValueTreatmentP;
        this.planTotalGoal = data.goals;
        if (this.gaugeValueTreatment > this.planTotalGoal)
          this.maxplanTotalGoal = this.gaugeValueTreatment;
        else
          this.maxplanTotalGoal = this.planTotalGoal;
        if (this.maxplanTotalGoal == 0)
          this.maxplanTotalGoal = '';

      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  //Recall Chart Rate for all dentists

  private recallChartTreatment() {
    this.planTotal = 0;
    this.clinic_id && this.cliniciananalysisService.RecallPrebook(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.planTotal = 0;
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        data.data.forEach(res => {
          if (res.average_cost) {
            this.planChartData1.push(Math.round(res.average_cost));
            this.planChartLabels1.push(res.provider);
            this.planTotal = this.planTotal + parseInt(res.average_cost);
          }
        });
        this.planChartLabels = this.planChartLabels1;
        this.planTotalAverage = this.planTotal / this.planChartData1.length;

      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public doughnutTotalTooltip = 'up';
  public doughnutTotalPrev = 0;
  public buildChartNopatientsLoader: boolean;
  public npKey: any;
  public npColors: any;
  public doughnutChartColors1: any;
  //No of patient Complaints chart for all dentists
  public patientCtbl:any =[];
  public showpatientCtblTbl:boolean =false;
  private buildChartNopatients() {
    this.buildChartNopatientsLoader = true;
    this.doughnutTotalPrev = 0;
    this.doughnutTotalAverage = 0;
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    this.clinic_id && this.cliniciananalysisService.NoPatients(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.doughnutChartData1 = [];
      this.doughnutChartLabels1 = [];
      this.doughnutTotal = 0;
      this.patientCtbl=[];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.buildChartNopatientsLoader = false;
        this.doughnutTotalTooltip = 'up';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.num_complaints - b.num_complaints).reverse();
        }
        this.patientCtbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.patientCtbl = data.data;
        //   this.showpatientCtblTbl = true;
        // }else{
        //   this.showpatientCtblTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.provider_name != null && res.num_complaints > 0) {
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            this.doughnutChartData1.push(Math.round(res.num_complaints));
            this.doughnutChartLabels1.push(pName);
            this.doughnutTotal = this.doughnutTotal + parseInt(res.num_complaints);
            if (res.provider_name != 'Anonymous')
              this.npKey = i;
            i++;
          }
        });
        this.doughnutChartData = this.doughnutChartData1;
        this.doughnutChartLabels = this.doughnutChartLabels1;
        this.doughnutTotalAverage = data.total;
        this.doughnutTotalPrev = data.total_ta;
        this.doughnutGoals = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.doughnutChartColors1 = [{ backgroundColor: [] }];

          this.doughnutChartColors1[0].backgroundColor[this.npKey] = '#1CA49F';
          this.npColors = this.doughnutChartColors1;
        }
        else
          this.npColors = this.doughnutChartColors;
        if (this.doughnutTotalAverage >= this.doughnutTotalPrev)
          this.doughnutTotalTooltip = 'down';
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public buildChartNopatientsDentistLoader: boolean;
  public maxdoughnutGoals: any = 0;
  //Indvidual No pf patients complaint chart
  private buildChartNopatientsDentist() {
    this.buildChartNopatientsDentistLoader = true;
    this.gaugeLabelPatients = '';
    this.clinic_id && this.cliniciananalysisService.NoPatientsDentist(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.doughnutTotal = 0;
      this.maxdoughnutGoals = 0;
      if (data && data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.doughnutTotalTooltip = 'up';
        this.buildChartNopatientsDentistLoader = false;
        if (data.data[0]) {
          this.gaugeValuePatients = data.data[0].num_complaints;
          this.gaugeLabelPatients = data.data[0].provider_name;
          this.doughnutTotal = data.total;
          this.doughnutTotalPrev = data.total_ta;
        }
        else {
          this.gaugeValuePatients = 0;
          this.gaugeLabelPatients = "";
          this.doughnutTotal = 0;
          this.doughnutTotalAverage = 0;
        }
        this.doughnutTotalAverage = data.total;
        this.doughnutTotalPrev = data.total_ta;
        if (this.doughnutTotalAverage >= this.doughnutTotalPrev)
          this.doughnutTotalTooltip = 'down';
        this.doughnutGoals = data.goals;
        if (this.gaugeValuePatients > this.doughnutGoals)
          this.maxdoughnutGoals = this.gaugeValuePatients;
        else
          this.maxdoughnutGoals = this.doughnutGoals;
        if (this.maxdoughnutGoals == 0)
          this.maxdoughnutGoals = '';
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


  public newPatientTotalTooltip = 'down';
  public newPatientTotalPrev = 0;
  public buildChartNewpatientsLoader: any;
  public newPatientsDataMax;
  public newpKey: any;
  public newpColors: any;
  public doughnutChartColors2: any;
  public legendSettings = {
    visible: false,
    position: top,
    labels: {
      usePointStyle: true
    }
  }
  //New Patients Chart for all dentist
  public newPatienttbl :any =[];
  public shownewPatientTbl :boolean =false;
  private buildChartNewpatients() {
    this.newPatientChartData1 = [];
    this.newPatientChartLabels1 = [];
    this.newPatientTotal = 0;
    this.buildChartNewpatientsLoader = true;
    this.newPatientChartLabels = [];
    this.newPatientsDataMax = 0;
    this.newPatienttbl =[];
    this.newPatientChartData=[];
    this.clinic_id && this.cliniciananalysisService.NewPatients(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      if (data && data.message == 'success') {
        this.newpKey = '';
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.buildChartNewpatientsLoader = false;
        this.newPatientTotalTooltip = 'down';
        var i = 0;
        this.newPatientChartLabels1 = []; // reset on api call
        this.newPatientChartData1 = []; // reset on api call
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.new_patients - b.new_patients).reverse();
        }
        this.newPatienttbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.shownewPatientTbl = true;
        // }else{
        //   this.shownewPatientTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.new_patients) {
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            this.newPatientChartData1.push(parseInt(res.new_patients));
            this.newPatientChartLabels1.push(pName);
            if (res.provider_name != 'Anonymous')
              this.newpKey = i;
            i++;
          }
        });

        this.newPatientChartData = this.newPatientChartData1;
        this.newPatientChartLabels = this.newPatientChartLabels1;

        this.newPatientTotal = data.total;
        this.newPatientTotal$.next(data.total);
        //this.doughnutChartOptions.elements.center.text = this.newPatientTotal;
        this.newPatientTotalPrev = data.total_ta;
        this.newPatientGoals = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.doughnutChartColors2 = [{ backgroundColor: [] }];

          this.doughnutChartColors2[0].backgroundColor[this.newpKey] = '#1CA49F';
          this.newpColors = this.doughnutChartColors2;
        }
        else
          this.newpColors = this.doughnutChartColors;
        if (this.newPatientTotal >= this.newPatientTotalPrev)
          this.newPatientTotalTooltip = 'up';
        this.newPatientsDataMax = Math.max(...this.newPatientChartData);
      }
    }, error => {
       this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public newPatientPercent = 0;
  public maxnewPatientGoal: any = 0;
  public buildChartNewpatientsDentistLoader: any;
  //New Patients chart for individual dentist
  private buildChartNewpatientsDentist() {
    this.buildChartNewpatientsDentistLoader = true;
    this.newPatientPercent = 0;

    this.clinic_id && this.cliniciananalysisService.NewPatientsDentist(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      if (data && data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.buildChartNewpatientsDentistLoader = false;
        this.newPatientGoals = data.goals;
        if (data.data != null && data.data[0]) {
          this.newPatientValuePatients = data.data[0].new_patients;
          this.newPatientLabelPatients = data.data[0].provider_name;
          this.newPatientTotal = Math.round(data.total);
          // this.newPatientTotalAverage = data.total_average;
          this.newPatientTotalPrev = Math.round(data.total_ta);
        } else {
          this.newPatientValuePatients = 0;
          this.newPatientLabelPatients = "";
          this.newPatientTotalPrev = 0;
          // this.newPatientTotalAverage = 0;
          // this.newPatientTotalAverage = data.total_average;
        }
        //this.doughnutChartOptions.elements.center.text = this.newPatientValuePatients;
        this.maxnewPatientGoal = data.goals;
        if (this.maxnewPatientGoal == 0)
          this.maxnewPatientGoal = '';
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public hourlyRateChartData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd
      ]
    }
  ];
  public hourlyRateChartLabels1 = [];
  public hourlyRateChartAverage;
  public hourlyRateChartGoal;
  public hourlyRateChartAveragePrev;
  public hourlyRateChartTooltip = 'down'; 
  public hourlyRateChartLoader: boolean = true;
  public hrKey: any;
  public HRcolors: any;
  public HRcolorsDent: any;
  public HRcolorsOht: any;
  //All dentist Hourly ratechart
  public hourlyRatetbl:any =[];
  public showHrTbl :boolean =false;
  private hourlyRateChart() {
    this.hourlyRateChartLoader = true;
    this.hourlyRateChartData1 = [];
    this.hourlyRateChartLabels1 = [];

    this.hourlyRateChartLabels = [];
    this.barChartOptionsHR.annotation = [];
    this.clinic_id && this.cliniciananalysisService.hourlyRateChart(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.hourlyRateChartData1 = [];
      this.hourlyRateChartLabels1 = [];
      this.hourlyRateChartLabels = [];
      this.barChartOptionsHR.annotation = [];
      this.hourlyRatetbl = [];
      this.hourlyRateChartData[0]['data']=[];
      if (data.message == 'success') {
        this.hrKey ='';
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.hourlyRateChartLoader = false;
        this.hourlyRateChartTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.hourly_rate - b.hourly_rate).reverse();
        }
        this.hourlyRatetbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.hourlyRatetbl = data.data;
        //   this.showHrTbl = true;
        // }else{
        //   this.showHrTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.hourly_rate > 0) {
            this.hourlyRateChartData1.push(Math.round(res.hourly_rate));
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              if (res.provider_name.includes(',')) {
                let namet: any = res.provider_name.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider_name;
              }
              this.hourlyRateChartLabels1.push(pName);
              this.hrKey = i;
            }
            else
              this.hourlyRateChartLabels1.push(pName);
            i++;
          }

        });

        this.hourlyRateChartData[0]['data'] = this.hourlyRateChartData1;
        this.hourlyRateChartLabels = this.hourlyRateChartLabels1;
        this.hourlyRateChartAverage = Math.round(data.total);
        this.hourlyRateChartAveragePrev = Math.round(data.total_ta);
        this.hourlyRateChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            { backgroundColor: [] }
          ];
          this.barChartColors[0].backgroundColor[this.hrKey] = '#1CA49F';
          this.HRcolors = this.barChartColors;
        }
        else {
          this.HRcolors = this.lineChartColors;
          let dynamicColors = [];
          this.hourlyRateChartLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.hourlyRateChartData[0].backgroundColor = dynamicColors;
        }

        if (this.hourlyRateChartAverage >= this.hourlyRateChartAveragePrev)
          this.hourlyRateChartTooltip = 'up';


        if (this.goalchecked == 'average') {
          this.barChartOptionsHR.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.hourlyRateChartAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsHR.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.hourlyRateChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public hourlyRateChartDentistsData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
    }
  ];
  public hourlyRateChartDesntistsData1: any[] = [];
  public hourlyRateChartDesntistsLabels1 = [];
  public hourlyRateChartDesntistsAverage;
  public hourlyRateChartDesntistsAveragePrev;
  public hourlyRateChartDesntistsTooltip = 'down';
  public hourlyRateChartDentistsLoader: boolean = true;
  public hourlyRateChartDesntistsLabels :any;
  //All dentist Hourly ratechart
  public hourlyRateDenttbl :any =[];
  public showHrDentTbl:boolean =false;
  private hourlyRateChartDesntists() {
    this.hourlyRateChartDentistsLoader = true;
    this.hourlyRateChartDesntistsData1 = [];
    this.hourlyRateChartDesntistsLabels1 = [];

    this.hourlyRateChartDesntistsLabels = [];
    this.barChartOptionsHR1.annotation = [];
    this.clinic_id && this.cliniciananalysisService.hourlyRateChartDesntists(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.hourlyRateChartDesntistsData1 = [];
      this.hourlyRateChartDesntistsLabels1 = [];

      this.hourlyRateChartDesntistsLabels = [];
      this.barChartOptionsHR1.annotation = [];
      this.hourlyRateDenttbl =[];
      this.hourlyRateChartDentistsData[0]['data'] =[];
      if (data.message == 'success') {
        this.hrKey ='';
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.hourlyRateChartDentistsLoader = false;
        this.hourlyRateChartDesntistsTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.hourly_rate - b.hourly_rate).reverse();
        }
        this.hourlyRateDenttbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.hourlyRateDenttbl = data.data;
        //   this.showHrDentTbl = true;
        // }else{
        //   this.showHrDentTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.hourly_rate > 0) {
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            this.hourlyRateChartDesntistsData1.push(Math.round(res.hourly_rate));
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              if (res.provider_name.includes(',')) {
                let namet: any = res.provider_name.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider_name;
              }
              this.hourlyRateChartDesntistsLabels1.push(pName);
              this.hrKey = i;
            }
            else
              this.hourlyRateChartDesntistsLabels1.push(pName);
            i++;
          }

        });

        this.hourlyRateChartDentistsData[0]['data'] = this.hourlyRateChartDesntistsData1;
        this.hourlyRateChartDesntistsLabels = this.hourlyRateChartDesntistsLabels1;
        this.hourlyRateChartDesntistsAverage = Math.round(data.total);
        this.hourlyRateChartDesntistsAveragePrev = Math.round(data.total_ta);
        this.hourlyRateChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColorsHrDent = [
            { backgroundColor: [] }
          ];
          this.barChartColorsHrDent[0].backgroundColor[this.hrKey] = '#1CA49F';
          this.HRcolorsDent = this.barChartColorsHrDent;
        }
        else {
          this.HRcolorsDent = this.lineChartColors;
          let dynamicColors = [];
          this.hourlyRateChartDesntistsLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.hourlyRateChartDentistsData[0].backgroundColor = dynamicColors;
        }

        if (this.hourlyRateChartDesntistsAverage >= this.hourlyRateChartDesntistsAveragePrev)
          this.hourlyRateChartDesntistsTooltip = 'up';


        if (this.goalchecked == 'average') {
          this.barChartOptionsHR1.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.hourlyRateChartDesntistsAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsHR1.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.hourlyRateChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


  public hourlyRateChartOhtData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
    }
  ];
  public hourlyRateChartOhtLabels1 = [];
  public hourlyRateChartOhtAverage;
  public hourlyRateChartOhtAveragePrev;
  public hourlyRateChartOhtTooltip = 'down';
  public hourlyRateChartOhtLoader: boolean = true;
  public hourlyRateChartOhtData1: any[] = [];
  public hourlyRateChartOhtLabels:any;
  //All dentist Hourly ratechart
  public hourlyRateOhttbl:any =[];
  public showHrOhtTbl:boolean =false;
  private hourlyRateChartOht() {
    this.hourlyRateChartOhtLoader = true;
    this.hourlyRateChartOhtData1 = [];
    this.hourlyRateChartOhtLabels1 = [];

    this.hourlyRateChartOhtLabels = [];
    this.barChartOptionsHR2.annotation = [];
    this.clinic_id && this.cliniciananalysisService.hourlyRateChartOht(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.hourlyRateChartOhtData1 = [];
      this.hourlyRateChartOhtLabels1 = [];
      this.hourlyRateOhttbl =[];
      this.hourlyRateChartOhtLabels = [];
      this.barChartOptionsHR2.annotation = [];
      this.hourlyRateChartOhtData[0]['data']=[];
      this.hourlyRateChartOhtAverage =0;
      if (data.message == 'success') {
        this.hrKey ='';
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.hourlyRateChartOhtLoader = false;
        this.hourlyRateChartOhtTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.hourly_rate - b.hourly_rate).reverse();
        }
        this.hourlyRateOhttbl = data.data;
        // if(data.data.length >= this.numberOfRecords){
        //   this.hourlyRateOhttbl = data.data;
        //   this.showHrOhtTbl = true;
        // }else{
        //   this.showHrOhtTbl = false;
        // }
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.hourly_rate > 0) {
            this.hourlyRateChartOhtData1.push(Math.round(res.hourly_rate));
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              if (res.provider_name.includes(',')) {
                let namet: any = res.provider_name.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider_name;
              }
              this.hourlyRateChartOhtLabels1.push(pName);
              this.hrKey = i;
            }
            else
              this.hourlyRateChartOhtLabels1.push(pName);
            i++;
          }

        });

        this.hourlyRateChartOhtData[0]['data'] = this.hourlyRateChartOhtData1;
        this.hourlyRateChartOhtLabels = this.hourlyRateChartOhtLabels1;
        this.hourlyRateChartOhtAverage = Math.round(data.total);
        this.hourlyRateChartOhtAveragePrev = Math.round(data.total_ta);
        this.hourlyRateChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColorsHrOht = [
            { backgroundColor: [] }
          ];
          this.barChartColorsHrOht[0].backgroundColor[this.hrKey] = '#1CA49F';
          this.HRcolorsOht = this.barChartColorsHrOht;
        }
        else {
          this.HRcolorsOht = this.lineChartColors;
          let dynamicColors = [];
          this.hourlyRateChartOhtLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.hourlyRateChartOhtData[0].backgroundColor = dynamicColors;
        }

        if (this.hourlyRateChartOhtAverage >= this.hourlyRateChartOhtAveragePrev)
          this.hourlyRateChartOhtTooltip = 'up';


        if (this.goalchecked == 'average') {
          this.barChartOptionsHR2.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.hourlyRateChartOhtAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsHR2.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.hourlyRateChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


  public hourlyValue: any = 0;
  public hourlyLabel = '';
  public hourlyGoal;
  public hourlyRateDentistLoader: any;
  public maxhourlyGoal: any = 0;
  //Individual Dentist Hourly Rate chart
  private hourlyRateDentist() {
    this.hourlyRateDentistLoader = true;
    this.hourlyRateChartAveragePrev = 0;
    this.hourlyRateChartAverage = 0;
    this.hourlyRateChartTooltip = 'down';
    this.hourlyLabel = '';
    this.clinic_id && this.cliniciananalysisService.hourlyRateSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.hourlyValue = '0';
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.hourlyRateDentistLoader = false;
        this.hourlyValue = '0';
        if (data.data.length > 0) {
          this.hourlyValue = Math.round(data.data[0].hourly_rate);
          var name = data.data[0].provider_name;
          if (name != null && name != '') {
            name = name.split(')');
            if (name.length > 0 && name[1] != undefined) {
              name = name[1].split(',');
              if (name.length > 0)
                name = name[1] + " " + name[0];
            }
            this.hourlyLabel = name;
          }
          else
            this.hourlyLabel = data.data[0].provider;

        }
        this.hourlyGoal = data.goals;
        this.hourlyRateChartAveragePrev = data.total_ta;
        this.hourlyRateChartAverage = data.total;
        if (this.hourlyValue >= this.hourlyRateChartAveragePrev)
          this.hourlyRateChartTooltip = 'up';
        if (this.hourlyValue > this.hourlyGoal)
          this.maxhourlyGoal = this.hourlyValue;
        else
          this.maxhourlyGoal = this.hourlyGoal;

        if (this.maxhourlyGoal == 0)
          this.maxhourlyGoal = '';
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public collhourlyValue: any = 0;
  public collhourlyLabel = '';
  public collhourlyGoal;
  public collhourlyRateDentistLoader: any;
  public collmaxhourlyGoal: any = 0;
  public collhourlyRateChartAveragePrev: any = 0;
  //Individual Dentist Hourly Rate chart
  private collectionHourlyRateSingle() {
    this.collhourlyRateDentistLoader = true;
    this.collhourlyRateChartAveragePrev = 0;
    this.hourlyRateChartAverage = 0;
    this.hourlyRateChartTooltip = 'down';
    this.collhourlyLabel = '';
    this.clinic_id && this.cliniciananalysisService.collectionHourlyRateSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.collhourlyValue = '0';
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.collhourlyRateDentistLoader = false;
        this.collhourlyValue = '0';
        if (data.data.length > 0) {
          this.collhourlyValue = Math.round(data.data[0].hourly_rate);
          var name = data.data[0].provider_name;
          if (name != null && name != '') {
            name = name.split(')');
            if (name.length > 0 && name[1] != undefined) {
              name = name[1].split(',');
              if (name.length > 0)
                name = name[1] + " " + name[0];
            }
            this.collhourlyLabel = name;
          }
          else
            this.collhourlyLabel = data.data[0].provider;

        }
        this.collhourlyGoal = data.goals;
        this.collhourlyRateChartAveragePrev = data.total_ta;
        this.hourlyRateChartAverage = data.total;
        if (this.collhourlyValue >= this.collhourlyRateChartAveragePrev)
          this.hourlyRateChartTooltip = 'up';
        if (this.collhourlyValue > this.collhourlyGoal)
          this.collmaxhourlyGoal = this.collhourlyValue;
        else
          this.collmaxhourlyGoal = this.collhourlyGoal;

        if (this.collmaxhourlyGoal == 0)
          this.collmaxhourlyGoal = '';
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public collExphourlyValue: any = 0;
  public collExphourlyLabel = '';
  public collExphourlyGoal;
  public collExphourlyRateDentistLoader: any;
  public collExpmaxhourlyGoal: any = 0;
  public collExphourlyRateChartAveragePrevs: any = 0;
  //Individual Dentist Hourly Rate chart
  private collectionExpHourlyRateSingle() { 
    this.collExphourlyRateDentistLoader = true;
    this.collExphourlyRateChartAveragePrevs = 0;
    this.hourlyRateChartAverage = 0;
    this.hourlyRateChartTooltip = 'down';
    this.collExphourlyLabel = '';
    this.clinic_id && this.cliniciananalysisService.collectionExpHourlyRateSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.collExphourlyValue = '0';
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.collExphourlyRateDentistLoader = false;
        this.collExphourlyValue = '0';
        if (data.data.length > 0) {
          this.collExphourlyValue = Math.round(data.data[0].hourly_rate);
          var name = data.data[0].provider_name;
          if (name != null && name != '') {
            name = name.split(')');
            if (name.length > 0 && name[1] != undefined) {
              name = name[1].split(',');
              if (name.length > 0)
                name = name[1] + " " + name[0];
            }
            this.collExphourlyLabel = name;
          }
          else
            this.collExphourlyLabel = data.data[0].provider;

        }
        this.collExphourlyGoal = data.goals;
        this.collExphourlyRateChartAveragePrevs = data.total_ta;
        this.hourlyRateChartAverage = data.total;
        if (this.collExphourlyValue >= this.collExphourlyRateChartAveragePrevs)
          this.hourlyRateChartTooltip = 'up';
        if (this.collExphourlyValue > this.collExphourlyGoal)
          this.collExpmaxhourlyGoal = this.collExphourlyValue;
        else
          this.collExpmaxhourlyGoal = this.collExphourlyGoal;

        if (this.collExpmaxhourlyGoal == 0)
          this.collExpmaxhourlyGoal = '';
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public hourlyValueSingleDentists: any = 0;
  public hourlyLabelSingleDentists = '';
  public hourlyGoalSingleDentists;
  public hourlyRateSingleDentistsLoader: any;
  public maxhourlyGoalSingleDentists: any = 0;
  //Individual Dentist Hourly Rate chart
  private hourlyRateSingleDentists() {
    this.hourlyRateSingleDentistsLoader = true;
    this.hourlyRateChartAveragePrev = 0;
    this.hourlyRateChartAverage = 0;
    this.hourlyRateChartTooltip = 'down';
    this.hourlyLabelSingleDentists = '';
    this.clinic_id && this.cliniciananalysisService.hourlyRateDentistsSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.hourlyValueSingleDentists = '0';
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.hourlyRateSingleDentistsLoader = false;
        this.hourlyValueSingleDentists = '0';
        if (data.data.length > 0) {
          this.hourlyValueSingleDentists = Math.round(data.data[0].hourly_rate);
          var name = data.data[0].provider_name;
          if (name != null && name != '') {
            name = name.split(')');
            if (name.length > 0 && name[1] != undefined) {
              name = name[1].split(',');
              if (name.length > 0)
                name = name[1] + " " + name[0];
            }
            this.hourlyLabelSingleDentists = name;
          }
          else
            this.hourlyLabelSingleDentists = data.data[0].provider;

        }
        this.hourlyGoalSingleDentists = data.goals;
        this.hourlyRateChartAveragePrev = data.total_ta;
        this.hourlyRateChartAverage = data.total;
        if (this.hourlyValueSingleDentists >= this.hourlyRateChartAveragePrev)
          this.hourlyRateChartTooltip = 'up';
        if (this.hourlyValueSingleDentists > this.hourlyGoalSingleDentists)
          this.maxhourlyGoalSingleDentists = this.hourlyValueSingleDentists;
        else
          this.maxhourlyGoalSingleDentists = this.hourlyGoalSingleDentists;

        if (this.maxhourlyGoalSingleDentists == 0)
          this.maxhourlyGoalSingleDentists = '';
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


  public hourlyValueSingleOht: any = 0;
  public hourlyLabelSingleOht = '';
  public hourlyGoalSingleOht;
  public hourlyRateSingleOhtLoader: any;
  public maxhourlyGoalSingleOht: any = 0;
  //Individual Dentist Hourly Rate chart
  private hourlyRateSingleOht() {
    this.hourlyRateSingleOhtLoader = true;
    this.hourlyRateChartAveragePrev = 0;
    this.hourlyRateChartAverage = 0;
    this.hourlyRateChartTooltip = 'down';
    this.hourlyLabelSingleOht = '';
    this.clinic_id && this.cliniciananalysisService.hourlyRateOhtSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      this.hourlyValueSingleOht = '0';
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.hourlyRateSingleOhtLoader = false;
        this.hourlyValueSingleOht = '0';
        if (data.data.length > 0) {
          this.hourlyValueSingleOht = Math.round(data.data[0].hourly_rate);
          var name = data.data[0].provider_name;
          if (name != null && name != '') {
            name = name.split(')');
            if (name.length > 0 && name[1] != undefined) {
              name = name[1].split(',');
              if (name.length > 0)
                name = name[1] + " " + name[0];
            }
            this.hourlyLabelSingleOht = name;
          }
          else
            this.hourlyLabelSingleOht = data.data[0].provider;

        }
        this.hourlyGoalSingleOht = data.goals;
        this.hourlyRateChartAveragePrev = data.total_ta;
        this.hourlyRateChartAverage = data.total;
        if (this.hourlyValueSingleOht >= this.hourlyRateChartAveragePrev)
          this.hourlyRateChartTooltip = 'up';
        if (this.hourlyValueSingleOht > this.hourlyGoalSingleOht)
          this.maxhourlyGoalSingleOht = this.hourlyValueSingleOht;
        else
          this.maxhourlyGoalSingleOht = this.hourlyGoalSingleOht;

        if (this.maxhourlyGoalSingleOht == 0)
          this.maxhourlyGoalSingleOht = '';
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public collectionhourlyRateChartData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd
      ]
    }
  ];
  public collectionhourlyRateChartLabels1 = [];
  public collectionhourlyRateChartAverage;
  public collectionhourlyRateChartGoal;
  public collectionhourlyRateChartAveragePrev;
  public collhourlyRateChartTooltip = 'down'; 
  public collhourlyRateChartLoader: boolean = true;
  public collhourlyRateChartData1: any[] = [];
  public chrKey: any;
  public cHRcolors: any;
  public showCollHrTbl:boolean = false;
  public collhourlyRateChartLabels:any =[];
  //All dentist Hourly ratechart
  public collhourlyRatetbl:any =[];
  private collectionHourlyRate() {
    this.collhourlyRateChartLoader = true;
    this.collhourlyRateChartData1 = [];
    this.collectionhourlyRateChartLabels1 = [];

    this.collhourlyRateChartLabels = [];
    this.barChartOptionsHR.annotation = [];
    this.clinic_id && this.cliniciananalysisService.collectionHourlyRate(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collhourlyRateChartData1 = [];
      this.collectionhourlyRateChartLabels1 = [];
      this.collhourlyRateChartLabels = [];
      this.barChartOptionsHR.annotation = [];
      this.collhourlyRatetbl = [];
      this.collectionhourlyRateChartData[0]['data']=[];
      if (data.message == 'success') {
        this.chrKey ='';
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collhourlyRateChartLoader = false;
        this.collhourlyRateChartTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.hourly_rate - b.hourly_rate).reverse();
        }
        this.collhourlyRatetbl = data.data;
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.hourly_rate > 0) {
            this.collhourlyRateChartData1.push(Math.round(res.hourly_rate));
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              if (res.provider_name.includes(',')) {
                let namet: any = res.provider_name.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider_name;
              }
              this.collectionhourlyRateChartLabels1.push(pName);
              this.chrKey = i;
            }
            else
              this.collectionhourlyRateChartLabels1.push(pName);
            i++;
          }

        });

        this.collectionhourlyRateChartData[0]['data'] = this.collhourlyRateChartData1;
        this.collhourlyRateChartLabels = this.collectionhourlyRateChartLabels1;
        this.collectionhourlyRateChartAverage = Math.round(data.total);
        this.collectionhourlyRateChartAveragePrev = Math.round(data.total_ta);
        this.collectionhourlyRateChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            { backgroundColor: [] }
          ];
          this.barChartColors[0].backgroundColor[this.chrKey] = '#1CA49F';
          this.cHRcolors = this.barChartColors;
        }
        else {
          this.cHRcolors = this.lineChartColors;
          let dynamicColors = [];
          this.collhourlyRateChartLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.collectionhourlyRateChartData[0].backgroundColor = dynamicColors;
        }

        if (this.collectionhourlyRateChartAverage >= this.collectionhourlyRateChartAveragePrev)
          this.collhourlyRateChartTooltip = 'up';


        if (this.goalchecked == 'average') {
          this.barChartOptionsHR.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionhourlyRateChartAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsHR.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collectionhourlyRateChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public collhourlyRateChartDentistsData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
    }
  ];
  public collhourlyRateChartDesntistsData1: any[] = [];
  public collhourlyRateChartDesntistsLabels1 = [];
  public collhourlyRateChartDesntistsAverage;
  public collhourlyRateChartDesntistsAveragePrev;
  public collhourlyRateChartDesntistsTooltip = 'down';
  public collhourlyRateChartDentistsLoader: boolean = true;
  public collhourlyRateChartDesntistsLabels :any;
  public showCollHrDentTbl:boolean = false;
  //All dentist Hourly ratechart
  public collhourlyRateDenttbl :any =[];
  private collectionHourlyRateDentist() {
    this.collhourlyRateChartDentistsLoader = true;
    this.collhourlyRateChartDesntistsData1 = [];
    this.collhourlyRateChartDesntistsLabels1 = [];

    this.collhourlyRateChartDesntistsLabels = [];
    this.barChartOptionsHR1.annotation = [];
    this.clinic_id && this.cliniciananalysisService.collectionHourlyRateDentist(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collhourlyRateChartDesntistsData1 = [];
      this.collhourlyRateChartDesntistsLabels1 = [];

      this.collhourlyRateChartDesntistsLabels = [];
      this.barChartOptionsHR1.annotation = [];
      this.collhourlyRateDenttbl =[];
      this.collhourlyRateChartDentistsData[0]['data'] =[];
      if (data.message == 'success') {
        this.hrKey ='';
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collhourlyRateChartDentistsLoader = false;
        this.collhourlyRateChartDesntistsTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.hourly_rate - b.hourly_rate).reverse();
        }
        this.collhourlyRateDenttbl = data.data;
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.hourly_rate > 0) {
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            this.collhourlyRateChartDesntistsData1.push(Math.round(res.hourly_rate));
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              if (res.provider_name.includes(',')) {
                let namet: any = res.provider_name.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider_name;
              }
              this.collhourlyRateChartDesntistsLabels1.push(pName);
              this.hrKey = i;
            }
            else
              this.collhourlyRateChartDesntistsLabels1.push(pName);
            i++;
          }

        });

        this.collhourlyRateChartDentistsData[0]['data'] = this.collhourlyRateChartDesntistsData1;
        this.collhourlyRateChartDesntistsLabels = this.collhourlyRateChartDesntistsLabels1;
        this.collhourlyRateChartDesntistsAverage = Math.round(data.total);
        this.collhourlyRateChartDesntistsAveragePrev = Math.round(data.total_ta);
        this.hourlyRateChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColorsHrDent = [
            { backgroundColor: [] }
          ];
          this.barChartColorsHrDent[0].backgroundColor[this.hrKey] = '#1CA49F';
          this.HRcolorsDent = this.barChartColorsHrDent;
        }
        else {
          this.HRcolorsDent = this.lineChartColors;
          let dynamicColors = [];
          this.collhourlyRateChartDesntistsLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.collhourlyRateChartDentistsData[0].backgroundColor = dynamicColors;
        }

        if (this.collhourlyRateChartDesntistsAverage >= this.collhourlyRateChartDesntistsAveragePrev)
          this.collhourlyRateChartDesntistsTooltip = 'up';


        if (this.goalchecked == 'average') {
          this.barChartOptionsHR1.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collhourlyRateChartDesntistsAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsHR1.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.hourlyRateChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public collhourlyRateChartOhtData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
    }
  ];
  public collhourlyRateChartOhtLabels1 = [];
  public collhourlyRateChartOhtAverage;
  public collhourlyRateChartOhtAveragePrev;
  public collhourlyRateChartOhtTooltip = 'down';
  public collhourlyRateChartOhtLoader: boolean = true;
  public collhourlyRateChartOhtData1: any[] = [];
  public collhourlyRateChartOhtLabels:any;
  public showCollHrOhtTbl:boolean = false;
  //All dentist Hourly ratechart
  public collhourlyRateOhttbl:any =[];
  private collectionHourlyRateOht() {
    this.collhourlyRateChartOhtLoader = true;
    this.collhourlyRateChartOhtData1 = [];
    this.collhourlyRateChartOhtLabels1 = [];

    this.collhourlyRateChartOhtLabels = [];
    this.barChartOptionsHR2.annotation = [];
    this.clinic_id && this.cliniciananalysisService.collectionHourlyRateOht(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collhourlyRateChartOhtData1 = [];
      this.collhourlyRateChartOhtLabels1 = [];
      this.collhourlyRateOhttbl =[];
      this.collhourlyRateChartOhtLabels = [];
      this.barChartOptionsHR2.annotation = [];
      this.collhourlyRateChartOhtData[0]['data']=[];
      this.collhourlyRateChartOhtAverage =0;
      if (data.message == 'success') {
        this.hrKey ='';
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collhourlyRateChartOhtLoader = false;
        this.collhourlyRateChartOhtTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.hourly_rate - b.hourly_rate).reverse();
        }
        this.collhourlyRateOhttbl = data.data;
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.hourly_rate > 0) {
            this.collhourlyRateChartOhtData1.push(Math.round(res.hourly_rate));
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              if (res.provider_name.includes(',')) {
                let namet: any = res.provider_name.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider_name;
              }
              this.collhourlyRateChartOhtLabels1.push(pName);
              this.hrKey = i;
            }
            else
              this.collhourlyRateChartOhtLabels1.push(pName);
            i++;
          }

        });

        this.collhourlyRateChartOhtData[0]['data'] = this.collhourlyRateChartOhtData1;
        this.collhourlyRateChartOhtLabels = this.collhourlyRateChartOhtLabels1;
        this.collhourlyRateChartOhtAverage = Math.round(data.total);
        this.collhourlyRateChartOhtAveragePrev = Math.round(data.total_ta);
        this.hourlyRateChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColorsHrOht = [
            { backgroundColor: [] }
          ];
          this.barChartColorsHrOht[0].backgroundColor[this.hrKey] = '#1CA49F';
          this.HRcolorsOht = this.barChartColorsHrOht;
        }
        else {
          this.HRcolorsOht = this.lineChartColors;
          let dynamicColors = [];
          this.collhourlyRateChartOhtLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.collhourlyRateChartOhtData[0].backgroundColor = dynamicColors;
        }

        if (this.collhourlyRateChartOhtAverage >= this.collhourlyRateChartOhtAveragePrev)
          this.collhourlyRateChartOhtTooltip = 'up';


        if (this.goalchecked == 'average') {
          this.barChartOptionsHR2.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collhourlyRateChartOhtAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsHR2.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.hourlyRateChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


  public collExphourlyRateChartData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
      backgroundColor: [
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd,
        this.chartService.colors.even,
        this.chartService.colors.odd
      ]
    }
  ];
  public collExphourlyRateChartLabels1 = [];
  public collExphourlyRateChartAverage;
  public collExphourlyRateChartGoal;
  public collExphourlyRateChartAveragePrev;
  public collExphourlyRateChartTooltip = 'down'; 
  public collExphourlyRateChartLoader: boolean = true;
  public collExphrKey: any;
  public collExpHRcolors: any;
  public showCollexpHrTbl:boolean = false;
  public collExphourlyRateChartData1: any[] = [];
  public collExphourlyRateChartLabels: any =[];
  //All dentist Hourly ratechart
  public collExphourlyRatetbl:any =[];
  private collectionExpHourlyRate() {
    this.collExphourlyRateChartLoader = true;
    this.collExphourlyRateChartData1 = [];
    this.collExphourlyRateChartLabels1 = [];

    this.collExphourlyRateChartLabels = [];
    this.barChartOptionsHR.annotation = [];
    this.clinic_id && this.cliniciananalysisService.collectionExpHourlyRate(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collExphourlyRateChartData1 = [];
      this.collExphourlyRateChartLabels1 = [];
      this.collExphourlyRateChartLabels = [];
      this.barChartOptionsHR.annotation = [];
      this.collExphourlyRatetbl = [];
      this.collExphourlyRateChartData[0]['data']=[];
      if (data.message == 'success') {
        this.collExphrKey ='';
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collExphourlyRateChartLoader = false;
        this.collExphourlyRateChartTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.hourly_rate - b.hourly_rate).reverse();
        }
        this.collExphourlyRatetbl = data.data;
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.hourly_rate > 0) {
            this.collExphourlyRateChartData1.push(Math.round(res.hourly_rate));
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              if (res.provider_name.includes(',')) {
                let namet: any = res.provider_name.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider_name;
              }
              this.collExphourlyRateChartLabels1.push(pName);
              this.collExphrKey = i;
            }
            else
              this.collExphourlyRateChartLabels1.push(pName);
            i++;
          }

        });

        this.collExphourlyRateChartData[0]['data'] = this.collExphourlyRateChartData1;
        this.collExphourlyRateChartLabels = this.collExphourlyRateChartLabels1;
        this.collExphourlyRateChartAverage = Math.round(data.total);
        this.collExphourlyRateChartAveragePrev = Math.round(data.total_ta);
        this.collExphourlyRateChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            { backgroundColor: [] }
          ];
          this.barChartColors[0].backgroundColor[this.collExphrKey] = '#1CA49F';
          this.collExpHRcolors = this.barChartColors;
        }
        else {
          this.collExpHRcolors = this.lineChartColors;
          let dynamicColors = [];
          this.collExphourlyRateChartLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.collExphourlyRateChartData[0].backgroundColor = dynamicColors;
        }

        if (this.collExphourlyRateChartAverage >= this.collExphourlyRateChartAveragePrev)
          this.collExphourlyRateChartTooltip = 'up';


        if (this.goalchecked == 'average') {
          this.barChartOptionsHR.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collExphourlyRateChartAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsHR.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collExphourlyRateChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public collExphourlyRateChartDentistsData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
    }
  ];
  public collExphourlyRateChartDesntistsData1: any[] = [];
  public collExphourlyRateChartDesntistsLabels1 = [];
  public collExphourlyRateChartDesntistsAverage;
  public collExphourlyRateChartDesntistsAveragePrev;
  public collExphourlyRateChartDesntistsTooltip = 'down';
  public collExphourlyRateChartDentistsLoader: boolean = true;
  public collExphourlyRateChartDesntistsLabels :any;
  public showCollexpHrDentTbl:boolean = false;
  //All dentist Hourly ratechart
  public collExphourlyRateDenttbl :any =[];
  private collectionExpHourlyRateDentist() {
    this.collExphourlyRateChartDentistsLoader = true;
    this.collExphourlyRateChartDesntistsData1 = [];
    this.collExphourlyRateChartDesntistsLabels1 = [];

    this.collExphourlyRateChartDesntistsLabels = [];
    this.barChartOptionsHR1.annotation = [];
    this.clinic_id && this.cliniciananalysisService.collectionExpHourlyRateDentist(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collExphourlyRateChartDesntistsData1 = [];
      this.collExphourlyRateChartDesntistsLabels1 = [];

      this.collExphourlyRateChartDesntistsLabels = [];
      this.barChartOptionsHR1.annotation = [];
      this.collExphourlyRateDenttbl =[];
      this.collExphourlyRateChartDentistsData[0]['data'] =[];
      if (data.message == 'success') {
        this.hrKey ='';
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collExphourlyRateChartDentistsLoader = false;
        this.collExphourlyRateChartDesntistsTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.hourly_rate - b.hourly_rate).reverse();
        }
        this.collExphourlyRateDenttbl = data.data;
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.hourly_rate > 0) {
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            this.collExphourlyRateChartDesntistsData1.push(Math.round(res.hourly_rate));
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              if (res.provider_name.includes(',')) {
                let namet: any = res.provider_name.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider_name;
              }
              this.collExphourlyRateChartDesntistsLabels1.push(pName);
              this.hrKey = i;
            }
            else
              this.collExphourlyRateChartDesntistsLabels1.push(pName);
            i++;
          }

        });

        this.collExphourlyRateChartDentistsData[0]['data'] = this.collExphourlyRateChartDesntistsData1;
        this.collExphourlyRateChartDesntistsLabels = this.collExphourlyRateChartDesntistsLabels1;
        this.collExphourlyRateChartDesntistsAverage = Math.round(data.total);
        this.collExphourlyRateChartDesntistsAveragePrev = Math.round(data.total_ta);
        this.hourlyRateChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColorsHrDent = [
            { backgroundColor: [] }
          ];
          this.barChartColorsHrDent[0].backgroundColor[this.hrKey] = '#1CA49F';
          this.HRcolorsDent = this.barChartColorsHrDent;
        }
        else {
          this.HRcolorsDent = this.lineChartColors;
          let dynamicColors = [];
          this.collExphourlyRateChartDesntistsLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.collExphourlyRateChartDentistsData[0].backgroundColor = dynamicColors;
        }

        if (this.collExphourlyRateChartDesntistsAverage >= this.collExphourlyRateChartDesntistsAveragePrev)
          this.collExphourlyRateChartDesntistsTooltip = 'up';


        if (this.goalchecked == 'average') {
          this.barChartOptionsHR1.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collExphourlyRateChartDesntistsAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsHR1.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.hourlyRateChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public collExphourlyRateChartOhtData: any[] = [
    {
      ...this.chartService.baseChartData,
      data: [],
    }
  ];
  public collExphourlyRateChartOhtLabels1 = [];
  public collExphourlyRateChartOhtAverage;
  public collExphourlyRateChartOhtAveragePrev;
  public collExphourlyRateChartOhtTooltip = 'down';
  public collExphourlyRateChartOhtLoader: boolean = true;
  public collExphourlyRateChartOhtData1: any[] = [];
  public collExphourlyRateChartOhtLabels:any;
  //All dentist Hourly ratechart
  public showCollexpHrOhtTbl:boolean = false;
  public collExphourlyRateOhttbl:any =[];
  private collectionExpHourlyRateOht() {
    this.collExphourlyRateChartOhtLoader = true;
    this.collExphourlyRateChartOhtData1 = [];
    this.collExphourlyRateChartOhtLabels1 = [];

    this.collExphourlyRateChartOhtLabels = [];
    this.barChartOptionsHR2.annotation = [];
    this.clinic_id && this.cliniciananalysisService.collectionExpHourlyRateOht(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collExphourlyRateChartOhtData1 = [];
      this.collExphourlyRateChartOhtLabels1 = [];
      this.collExphourlyRateOhttbl =[];
      this.collExphourlyRateChartOhtLabels = [];
      this.barChartOptionsHR2.annotation = [];
      this.collExphourlyRateChartOhtData[0]['data']=[];
      this.collExphourlyRateChartOhtAverage =0;
      if (data.message == 'success') {
        this.hrKey ='';
        this.Apirequest = this.Apirequest - 1;
        this.enableDiabaleButton(this.Apirequest);
        this.collExphourlyRateChartOhtLoader = false;
        this.collExphourlyRateChartOhtTooltip = 'down';
        var i = 0;
        if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
          data.data.sort((a, b)=> a.hourly_rate - b.hourly_rate).reverse();
        }
        this.collExphourlyRateOhttbl = data.data;
        if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {
          if (res.hourly_rate > 0) {
            this.collExphourlyRateChartOhtData1.push(Math.round(res.hourly_rate));
            var pName ='';
            if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
                pName = res.provider_name + " - " + res.clinic_name;
              }else{
                pName = res.provider_name;
              }
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              if (res.provider_name.includes(',')) {
                let namet: any = res.provider_name.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider_name;
              }
              this.collExphourlyRateChartOhtLabels1.push(pName);
              this.hrKey = i;
            }
            else
              this.collExphourlyRateChartOhtLabels1.push(pName);
            i++;
          }

        });

        this.collExphourlyRateChartOhtData[0]['data'] = this.collExphourlyRateChartOhtData1;
        this.collExphourlyRateChartOhtLabels = this.collExphourlyRateChartOhtLabels1;
        this.collExphourlyRateChartOhtAverage = Math.round(data.total);
        this.collExphourlyRateChartOhtAveragePrev = Math.round(data.total_ta);
        this.hourlyRateChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColorsHrOht = [
            { backgroundColor: [] }
          ];
          this.barChartColorsHrOht[0].backgroundColor[this.hrKey] = '#1CA49F';
          this.HRcolorsOht = this.barChartColorsHrOht;
        }
        else {
          this.HRcolorsOht = this.lineChartColors;
          let dynamicColors = [];
          this.collExphourlyRateChartOhtLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.collExphourlyRateChartOhtData[0].backgroundColor = dynamicColors;
        }

        if (this.collExphourlyRateChartOhtAverage >= this.collExphourlyRateChartOhtAveragePrev)
          this.collExphourlyRateChartOhtTooltip = 'up';


        if (this.goalchecked == 'average') {
          this.barChartOptionsHR2.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.collExphourlyRateChartOhtAverage,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
        else if (this.goalchecked == 'goal') {
          this.barChartOptionsHR2.annotation = {
            annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.hourlyRateChartGoal * this.goalCount,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            },
            ]
          }
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  // Get Dentist
  private getDentists() {
    this.dentists =[];
    this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
      this.selectedDentist = 'all';
      if (this._cookieService.get("clinic_dentist")) {
          var dentistVal1 = this._cookieService.get("clinic_dentist").split('_');
          this.selectedDentist = dentistVal1[1];
      } 
      if (res.message == 'success') {
        this.dentists = res.data;
        this.dentistCount = res.data.length;
      } else if (res.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public currentText;
  public goalCount = 1;
  public planTotalAll = 0;
  public planTotalCompleted = 0;
  // Filter By Date
  filterDate(duration) {
      this.showWeekTrend = false;
    this.showTrendChart = false;
    this.toggleChecked = false;
    if (this.clinic_id != undefined) {
      $('.customRange').css('display', 'none');
      this.showTrendChart = false;
      var dentistVal;

      if ($('.internal_dentist').val())
        dentistVal = $('.internal_dentist').val();
      else
        dentistVal = $('.external_dentist').val();
      if (dentistVal == '') {
        if (this._cookieService.get("clinic_dentist")) {
          var dentistVal1 = this._cookieService.get("clinic_dentist").split('_');
          dentistVal = dentistVal1[1];
        }

      }
      this.duration = duration;
      if (duration == 'w') {
        this.goalCount = 1;
        this.showGoals = false;
        this.duration = 'w';
        this.trendText = 'Last Week';
        this.currentText = 'This Week';

        const now = new Date();
        if (now.getDay() == 0)
          var day = 7;
        else
          var day = now.getDay();

        var first = now.getDate() - day + 1;
        var last = first + 6;
        var sd = new Date(now.setDate(first));

        this.startDate = this.datePipe.transform(sd.toUTCString(), 'dd-MM-yyyy');
        var end = now.setDate(sd.getDate() + 6);
        this.endDate = this.datePipe.transform(new Date(end).toUTCString(), 'dd-MM-yyyy');
        this.loadDentist(dentistVal);
      }
      else if (duration == 'm') {
        this.goalCount = 1;
        this.showGoals = true;
        this.trendText = 'Last Month';
        this.currentText = 'This Month';

        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
        this.loadDentist(dentistVal);

      }
      else if (duration == 'lm') {
        this.goalCount = 1;
        this.showGoals = true;
        this.trendText = 'Previous Month';
        this.currentText = 'Last Month';

        const date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() - 1, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 0), 'dd-MM-yyyy');

        this.loadDentist(dentistVal);

      }
      else if (duration == 'q') {
        this.goalCount = 3;
        this.showGoals = false;
        this.trendText = 'Last Quarter';
        this.currentText = 'This Quarter';

        const now = new Date();
        var cmonth = now.getMonth() + 1;
        var cyear = now.getFullYear();

        if (cmonth >= 1 && cmonth <= 3) {
          this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
          // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy');
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
        this.loadDentist(dentistVal);

      }
      else if (duration == 'lq') {
        this.goalCount = 3;
        this.showGoals = false;
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
        this.loadDentist(dentistVal);
      }
      else if (duration == 'cytd') {
        this.trendText = 'Last Year';
        this.currentText = 'This Year';
        this.showGoals = false;
        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
        var difMonths = new Date().getMonth() - new Date(date.getFullYear(), 0, 1).getMonth();
        this.goalCount = difMonths + 1;
        this.loadDentist(dentistVal);
      }
      else if (duration == 'lcytd') {
        this.trendText = 'Previous Year';
        this.currentText = 'Last Year';
        this.showGoals = false;
        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 0, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 11, 31), 'dd-MM-yyyy');
        this.goalCount = 12;
        this.loadDentist(dentistVal);
      }
      else if (duration == 'fytd') {
        this.trendText = 'Last Financial Year';
        this.currentText = 'This Financial Year';
        this.showGoals = false;
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
        this.loadDentist(dentistVal);
      }
      else if (duration == 'lfytd') {
        this.trendText = 'Previous Financial Year';
        this.currentText = 'Last Financial Year';
        this.showGoals = false;
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
        /*this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');*/
        /*this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');*/
        this.goalCount = 12;
        this.loadDentist(dentistVal);
      }
      else if (duration == 'custom') {
        this.trendText = '';
        this.currentText = '';
        $('.customRange').css('display', 'block');
        let selectedDate = this.chartService.customSelectedDate$.value;
        this.startDate = this.datePipe.transform(selectedDate.startDate, 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(selectedDate.endDate, 'dd-MM-yyyy');
        var selectedMonth = this.datePipe.transform(selectedDate.startDate, 'M');
        var selectedYear = this.datePipe.transform(selectedDate.startDate, 'yyyy');
        var selectedStartDate = this.datePipe.transform(selectedDate.startDate, 'd');
        var selectedEndDate = this.datePipe.transform(selectedDate.endDate, 'd');
        var LastDay = new Date(parseInt(selectedYear), parseInt(selectedMonth) , 0).getDate();
        if(parseInt(selectedStartDate) == 1 && parseInt(selectedEndDate) == LastDay){
          this.goalCount = 1;
          this.showGoals = true;
        }else{
          this.showGoals = false;
        }
        this.loadDentist(dentistVal);
      }
      $('.filter').removeClass('active');
      $('.filter_' + duration).addClass("active");
      // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
    }
  }
  //Load Individual dentits Chartc
  initiate_dentist() {
    var val = $('#currentDentist').attr('did');
    // var val = $('.internal_dentist').val();
    if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
      //this.loadDentist(val);
    }else{
      this.loadDentist(val);
    }
  
  }
  choosedDate(val) {
    val = (val.chosenLabel);
    var val = val.toString().split(' - ');
    this.startDate = this.datePipe.transform(val[0], 'dd-MM-yyyy');
    this.endDate = this.datePipe.transform(val[1], 'dd-MM-yyyy');
    this.filterDate('custom');
    $('.page-title-date').val(this.startDate + " - " + this.endDate);
    $('.customRange').css('display', 'none');


  }

  toggleFilter(val) {
    if (this._cookieService.get("clinic_dentist")) {
          var dentistVal1 = this._cookieService.get("clinic_dentist").split('_');
          this.selectedDentist = dentistVal1[1];
      }
      if (this._cookieService.get("dentistid") && this.user_type == '4') { 
        this.selectedDentist = this._cookieService.get("dentistid");
        }
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_' + val).addClass('mat-button-toggle-checked');
    $('.filter').removeClass('active');
    this.Apirequest = 0;
    this.showWeekTrend = false
    if (val == 'current') {
      this.toggleChecked = true;
      this.showTrendChart = true;
      this.trendValue = 'c';
      this.toggleChangeProcess();
    }
    else if (val == 'historic') {
      this.toggleChecked = true;
      this.trendValue = 'h';
      this.showTrendChart = true;
      this.toggleChangeProcess();
    }
    else if (val == 'off') {
      this.filterDate('m');
      this.toggleChecked = false;
      this.showTrendChart = false;
    }
  }
  toggleChecked = false;
  trendValue = '';
  isDisabled = true;
  isChecked = true;

 
  public targetData = [];
  public dentistProdTrend: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3,
  //   xAxisID: "x-axis-actual",
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
      order: 2,
    },
    { 
      data: [], label: '',
   //  xAxisID: "x-axis-target",
      backgroundColor: 'rgba(255, 0, 128, 1)',
      order: 1,
      minHeight: 5,
    }
  ];
  public dentistColTrend: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3,order: 2,
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
    }, { 
      data: [], label: '',
      backgroundColor: 'rgba(255, 0, 128, 1)',
      order: 1,
    }];

    public dentistColExpTrend: any[] = [
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

  public dentistProductionWeeklyTrend = [];
  public dentistProductionWeeklyTrendLabels = [];
  public dentistProductionTrend1 = [];
  public dentistProductionTrendLabels = [];
  public dentistProductionTrendLabels1 = [];
  public dentistProductionTrendLoader: boolean;
  //Trend mode for dentist Production
  private dentistProductionTrend(mode = null) {
    this.dentistProductionTrendLoader = true;
    var user_id;
    var clinic_id;
    if (!mode) {
      mode = this.trendValue
    }

    this.clinic_id && this.cliniciananalysisService.caDentistProtectionTrend(this.selectedDentist, this.clinic_id, mode).subscribe((data: any) => {
      this.dentistProductionTrendLabels1 = [];
      this.dentistProductionTrend1 = [];
      this.dentistProductionTrendLabels = [];
      this.dentistProductionTrendLabels = [];
      this.dentistProductionWeeklyTrend = [];
      this.dentistProductionWeeklyTrendLabels = [];
      let dynamicColors = [];
      this.targetData=[];
      if (data && data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);

        if (data.data.total > 0) {
          data.data.data.forEach(res => {
            // if (res.production > 0) {
              this.dentistProductionTrend1.push(Math.round(res.production));
              if(res.goals == -1 || res.goals == null || res.goals == ''){
                this.targetData.push(null);
              }else{
                this.targetData.push(res.goals);    
              }       
              if (mode == 'c') {                            
                this.dentistProductionTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              } else if (mode == 'w') {
                this.dentistProductionTrendLabels1.push('WE ' + this.datePipe.transform(res.week_end, 'y-MM-dd'));
              }
              else {
                this.dentistProductionTrendLabels1.push(res.year);
              }
            // }
          });
          if (this.dentistProductionTrend1.every((value) => value == 0)) this.dentistProductionTrend1 = [];
          this.dentistProdTrend[0]['data'] = this.dentistProductionTrend1;
          let maxVal = Math.max(...this.dentistProductionTrend1);
          var subVal = 1;
          if(maxVal >= 20001){
            subVal = 200;
          }else if(maxVal > 5000 && maxVal < 20000){
            subVal = 100;
          }else if(maxVal > 3000 && maxVal < 5000){
            subVal = 50;
          }else if(maxVal > 2000 && maxVal < 3000){
            subVal = 10;
          }else if(maxVal > 100 && maxVal < 2000){
            subVal = 1;
          }else if(maxVal > 51 && maxVal < 100){
            subVal = 0.2;
          }else if(maxVal <= 50){
            subVal = 0.1;
          }

          var mappedtargetData = [];
          this.targetData.map(function (v){
            if(v == null ){
              mappedtargetData.push([v - 0, v + 0]);
            }else{
              mappedtargetData.push([v - subVal, v + subVal]);
            }
          });
          if(mode == 'c'){
            this.dentistProdTrend[0]['label'] = 'Actual';
            this.dentistProdTrend[1]['label'] = 'Target';
           this.dentistProdTrend[1]['data'] =  mappedtargetData;//this.targetData.map(v => [v - subVal, v + subVal]);
          }else{
            this.dentistProdTrend[0]['label'] = '';
            this.dentistProdTrend[1]['label'] = '';
            this.dentistProdTrend[1]['data'] =  [];
          }
         

          this.dentistProductionTrendLabels1.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.dentistProdTrend[0].backgroundColor = dynamicColors;

          this.dentistProductionTrendLabels = this.dentistProductionTrendLabels1;
          if (this.dentistProductionTrendLabels.length <= 0) {
            this.gaugeValue = '0';
          }
          if (mode == 'w') {
            this.dentistProductionWeeklyTrend =  data.data.data;
            this.dentistProductionWeeklyTrendLabels = this.dentistProductionTrendLabels;
          }
        } else {
          this.dentistProductionTrendLabels = [];
        }
        this.dentistProductionTrendLoader = false;
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public dentistProdDentistsTrend: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3
      
    }];
  public dentistProductionWeeklyDentistsTrend = [];
  public dentistProductionWeeklyTrendDentistsLabels = [];
  public dentistProductionDentistsTrend1 = [];
  public dentistProductionTrendDentistsLabels = [];
  public dentistProductionTrendDentistsLabels1 = [];
  public dentistProductionTrendDentistsLoader: boolean;
  //Trend mode for dentist Production
  private dentistProductionDentistsTrend(mode = null) {
    this.dentistProductionTrendDentistsLoader = true;
    var user_id;
    var clinic_id;
    if (!mode) {
      mode = this.trendValue
    }

    this.clinic_id && this.cliniciananalysisService.caDentistProtectionDentistsTrend(this.selectedDentist, this.clinic_id, mode).subscribe((data: any) => {
      this.dentistProductionTrendDentistsLabels1 = [];
      this.dentistProductionDentistsTrend1 = [];
      this.dentistProductionTrendDentistsLabels = [];
      this.dentistProductionTrendDentistsLabels = [];
      this.dentistProductionWeeklyDentistsTrend = [];
      this.dentistProductionWeeklyTrendDentistsLabels = [];
      let dynamicColors = [];
      if (data && data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);

        if (data.data.total > 0) {
          data.data.data.forEach(res => {
            // if (res.production > 0) {
              this.dentistProductionDentistsTrend1.push(Math.round(res.production));
              if (mode == 'c') {
                this.dentistProductionTrendDentistsLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              } else if (mode == 'w') {
                this.dentistProductionTrendDentistsLabels1.push('WE ' + this.datePipe.transform(res.week_end, 'y-MM-dd'));
              }
              else {
                this.dentistProductionTrendDentistsLabels1.push(res.year);
              }
            // }
          });
          if (this.dentistProductionDentistsTrend1.every((value) => value == 0)) this.dentistProductionDentistsTrend1 = [];
          this.dentistProdDentistsTrend[0]['data'] = this.dentistProductionDentistsTrend1;

          this.dentistProductionTrendDentistsLabels1.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.dentistProdDentistsTrend[0].backgroundColor = dynamicColors;

          this.dentistProductionTrendDentistsLabels = this.dentistProductionTrendDentistsLabels1;
          if (this.dentistProductionTrendDentistsLabels.length <= 0) {
            this.gaugeValue = '0';
          }
          if (mode == 'w') {
            this.dentistProductionWeeklyDentistsTrend =  data.data.data;
            this.dentistProductionWeeklyTrendDentistsLabels = this.dentistProductionTrendDentistsLabels;
          }
        } else {
          this.dentistProductionTrendDentistsLabels = [];
        }
        this.dentistProductionTrendDentistsLoader = false;
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public dentistProdOhtTrend: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3
      
    }];
  public dentistProductionWeeklyOhtTrend = [];
  public dentistProductionWeeklyTrendOhtLabels = [];
  public dentistProductionOhtTrend1 = [];
  public dentistProductionTrendOhtLabels = [];
  public dentistProductionTrendOhtLabels1 = [];
  public dentistProductionTrendOhtLoader: boolean;
  //Trend mode for dentist Production
  private dentistProductionOhtTrend(mode = null) {
    this.dentistProductionTrendOhtLoader = true;
    var user_id;
    var clinic_id;
    if (!mode) {
      mode = this.trendValue
    }

    this.clinic_id && this.cliniciananalysisService.caDentistProtectionOhtTrend(this.selectedDentist, this.clinic_id, mode).subscribe((data: any) => {
      this.dentistProductionTrendOhtLabels1 = [];
      this.dentistProductionOhtTrend1 = [];
      this.dentistProductionTrendOhtLabels = [];
      this.dentistProductionTrendOhtLabels = [];
      this.dentistProductionWeeklyOhtTrend = [];
      this.dentistProductionWeeklyTrendOhtLabels = [];
      let dynamicColors = [];
      if (data && data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);

        if (data.data.total > 0) {
          data.data.data.forEach(res => {
            // if (res.production > 0) {
              this.dentistProductionOhtTrend1.push(Math.round(res.production));
              if (mode == 'c') {
                this.dentistProductionTrendOhtLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              } else if (mode == 'w') {
                this.dentistProductionTrendOhtLabels1.push('WE ' + this.datePipe.transform(res.week_end, 'y-MM-dd'));
              }
              else {
                this.dentistProductionTrendOhtLabels1.push(res.year);
              }
            // }
          });
          if (this.dentistProductionOhtTrend1.every((value) => value == 0)) this.dentistProductionOhtTrend1 = [];
          this.dentistProdOhtTrend[0]['data'] = this.dentistProductionOhtTrend1;

          this.dentistProductionTrendOhtLabels1.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.dentistProdOhtTrend[0].backgroundColor = dynamicColors;

          this.dentistProductionTrendOhtLabels = this.dentistProductionTrendOhtLabels1;
          if (this.dentistProductionTrendOhtLabels.length <= 0) {
            this.gaugeValue = '0';
          }
          if (mode == 'w') {
            this.dentistProductionWeeklyOhtTrend =  data.data.data;
            this.dentistProductionWeeklyTrendOhtLabels = this.dentistProductionTrendOhtLabels;
          }
        } else {
          this.dentistProductionTrendOhtLabels = [];
        }
        this.dentistProductionTrendOhtLoader = false;
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  // Collection Trend mode 
  public dentistCollectionTrend1: any = [];
  public dentistCollectionWeeklyTrend1: any = [];
  public dentistCollectionTrendLabels: any = [];
  public dentistCollectionWeeklyTrendLabels: any = [];
  public dentistCollectionTrendLoader: boolean = true;
  public dentistColleTrendLabels1: any = [];
  public dentistColleWeeklyTrendLabels1: any = [];
  public collectiontargetData = [];

  private dentistCollectionTrend(mode = null) {
    let activeMode = this.trendValue;
    if (mode) {
      activeMode = mode;
    }
    this.dentistCollectionTrendLoader = true;
    this.clinic_id && this.cliniciananalysisService.caDentistCollectionTrend(this.selectedDentist, this.clinic_id, activeMode).subscribe((data: any) => {
      this.dentistColleTrendLabels1 = [];
      this.dentistColleWeeklyTrendLabels1 = [];
      this.dentistCollectionTrend1 = [];
      this.dentistCollectionWeeklyTrend1 = [];
      this.dentistCollectionTrendLabels = [];
      this.dentistCollectionWeeklyTrendLabels = [];
      this.collectiontargetData=[];

      let dynamicColors = [];
      if (data && data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        if (data.data) {
          data.data.forEach(res => {
            // if (res.collection > 0) {
              this.dentistCollectionTrend1.push(Math.round(res.collection));
              if(res.goals == -1 || res.goals == null || res.goals == ''){
                this.collectiontargetData.push(null);
              }else{
                this.collectiontargetData.push(res.goals); 
              }  
              if (activeMode == 'c') {
                this.dentistColleTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              } else if (activeMode == 'w') {
                this.dentistColleTrendLabels1.push('WE ' + this.datePipe.transform(res.week_end, 'y-MM-dd'));
              } else {
                this.dentistColleTrendLabels1.push(res.year);
              }
            // }
          });
          if (this.dentistCollectionTrend1.every((value) => value == 0)) this.dentistCollectionTrend1 = [];
          this.dentistColTrend[0]['data'] = this.dentistCollectionTrend1;

          let maxVal = Math.max(...this.dentistCollectionTrend1);
            var subVal = 1;
            if(maxVal >= 20001){
              subVal = 200;
            }else if(maxVal > 5000 && maxVal < 20000){
              subVal = 100;
            }else if(maxVal > 3000 && maxVal < 5000){
              subVal = 50;
            }else if(maxVal > 2000 && maxVal < 3000){
              subVal = 10;
            }else if(maxVal > 100 && maxVal < 2000){
              subVal = 1;
            }else if(maxVal > 51 && maxVal < 100){
              subVal = 0.2;
            }else if(maxVal <= 50){
              subVal = 0.1;
            }
            var mappedcollectiontargetData = [];
            this.collectiontargetData.map(function (v){
              if(v == null ){
                mappedcollectiontargetData.push([v - 0, v + 0]);
              }else{
                mappedcollectiontargetData.push([v - subVal, v + subVal]);
              }
            });
          if(activeMode == 'c'){
            this.dentistColTrend[0]['label'] = 'Actual';
            this.dentistColTrend[1]['label'] = 'Target';
            this.dentistColTrend[1]['data'] =  mappedcollectiontargetData;//this.collectiontargetData.map(v => [v - subVal, v + subVal]);
          }else{
            this.dentistColTrend[0]['label'] = '';
            this.dentistColTrend[1]['label'] = '';
            this.dentistColTrend[1]['data'] =  [];
          }

          this.dentistColleTrendLabels1.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.dentistColTrend[0].backgroundColor = dynamicColors;
          this.dentistCollectionTrendLabels = this.dentistColleTrendLabels1;
          if (activeMode == 'w') {
            this.dentistCollectionWeeklyTrend1 = data.data;
            this.dentistCollectionWeeklyTrendLabels = this.dentistColleTrendLabels1;
          }
        } else {
          this.dentistCollectionTrendLabels = [];
        }
        this.dentistCollectionTrendLoader = false;
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public dentistColDentistsTrend: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3
    }];
  public dentistCollectionDentistsTrend1: any = [];
  public dentistCollectionWeeklyDentistsTrend1: any = [];
  public dentistCollectionDentistsTrendLabels: any = [];
  public dentistCollectionWeeklyDentistsTrendLabels: any = [];
  public dentistCollectionDentistsTrendLoader: boolean = true;
  public dentistColleTrendDentistsLabels1: any = [];
  public dentistColleWeeklyTrendDentistsLabels1: any = [];

  private dentistCollectionDentistsTrend(mode = null) {
    let activeMode = this.trendValue;
    if (mode) {
      activeMode = mode;
    }
    this.dentistCollectionDentistsTrendLoader = true;
    this.clinic_id && this.cliniciananalysisService.caDentistCollectionDentistsTrend(this.selectedDentist, this.clinic_id, activeMode).subscribe((data: any) => {
      this.dentistColleTrendDentistsLabels1 = [];
      this.dentistColleWeeklyTrendDentistsLabels1 = [];
      this.dentistCollectionDentistsTrend1 = [];
      this.dentistCollectionWeeklyDentistsTrend1 = [];
      this.dentistCollectionDentistsTrendLabels = [];
      this.dentistCollectionWeeklyDentistsTrendLabels = [];

      let dynamicColors = [];
      if (data && data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        if (data.data) {
          data.data.forEach(res => {
            // if (res.collection > 0) {
              this.dentistCollectionDentistsTrend1.push(Math.round(res.collection));
              if (activeMode == 'c') {
                this.dentistColleTrendDentistsLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              } else if (activeMode == 'w') {
                this.dentistColleTrendDentistsLabels1.push('WE ' + this.datePipe.transform(res.week_end, 'y-MM-dd'));
              } else {
                this.dentistColleTrendDentistsLabels1.push(res.year);
              }
            // }
          });
          if (this.dentistCollectionDentistsTrend1.every((value) => value == 0)) this.dentistCollectionDentistsTrend1 = [];
          this.dentistColDentistsTrend[0]['data'] = this.dentistCollectionDentistsTrend1;

          this.dentistColleTrendDentistsLabels1.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.dentistColDentistsTrend[0].backgroundColor = dynamicColors;
          this.dentistCollectionDentistsTrendLabels = this.dentistColleTrendDentistsLabels1;
          if (activeMode == 'w') {
            this.dentistCollectionWeeklyDentistsTrend1 = data.data;
            this.dentistCollectionWeeklyDentistsTrendLabels = this.dentistColleTrendDentistsLabels1;
          }
        } else {
          this.dentistCollectionDentistsTrendLabels = [];
        }
        this.dentistCollectionDentistsTrendLoader = false;
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public dentistColOhtTrend: any[] = [
    {
      data: [], label: '', shadowOffsetX: 3
    }];
  public dentistCollectionOhtTrend1: any = [];
  public dentistCollectionWeeklyOhtTrend1: any = [];
  public dentistCollectionOhtTrendLabels: any = [];
  public dentistCollectionWeeklyOhtTrendLabels: any = [];
  public dentistCollectionOhtTrendLoader: boolean = true;
  public dentistColleTrendOhtLabels1: any = [];
  public dentistColleWeeklyTrendOhtLabels1: any = [];

  private dentistCollectionOhtTrend(mode = null) {
    let activeMode = this.trendValue;
    if (mode) {
      activeMode = mode;
    }
    this.dentistCollectionOhtTrendLoader = true;
    this.clinic_id && this.cliniciananalysisService.caDentistCollectionOhtTrend(this.selectedDentist, this.clinic_id, activeMode).subscribe((data: any) => {
      this.dentistColleTrendOhtLabels1 = [];
      this.dentistColleWeeklyTrendOhtLabels1 = [];
      this.dentistCollectionOhtTrend1 = [];
      this.dentistCollectionWeeklyOhtTrend1 = [];
      this.dentistCollectionOhtTrendLabels = [];
      this.dentistCollectionWeeklyOhtTrendLabels = [];

      let dynamicColors = [];
      if (data && data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        if (data.data) {
          data.data.forEach(res => {
            // if (res.collection > 0) {
              this.dentistCollectionOhtTrend1.push(Math.round(res.collection));
              if (activeMode == 'c') {
                this.dentistColleTrendOhtLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              } else if (activeMode == 'w') {
                this.dentistColleTrendOhtLabels1.push('WE ' + this.datePipe.transform(res.week_end, 'y-MM-dd'));
              } else {
                this.dentistColleTrendOhtLabels1.push(res.year);
              }
            // }
          });
          if (this.dentistCollectionOhtTrend1.every((value) => value == 0)) this.dentistCollectionOhtTrend1 = [];
          this.dentistColOhtTrend[0]['data'] = this.dentistCollectionOhtTrend1;

          this.dentistColleTrendOhtLabels1.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.dentistColOhtTrend[0].backgroundColor = dynamicColors;
          this.dentistCollectionOhtTrendLabels = this.dentistColleTrendOhtLabels1;
          if (activeMode == 'w') {
            this.dentistCollectionWeeklyOhtTrend1 = data.data;
            this.dentistCollectionWeeklyOhtTrendLabels = this.dentistColleTrendOhtLabels1;
          }
        } else {
          this.dentistCollectionOhtTrendLabels = [];
        }
        this.dentistCollectionOhtTrendLoader = false;
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

 // Collection Exp Trend mode 
 public dentistCollectionExpTrend1: any = [];
 public dentistCollectionExpWeeklyTrend1: any = [];
 public dentistCollectionExpTrendLabels: any = [];
 public dentistCollectionExpWeeklyTrendLabels: any = [];
 public dentistCollectionExpTrendLoader: boolean = true;
 public dentistColleExpTrendLabels1: any = [];
 public dentistColleExpWeeklyTrendLabels1: any = [];

 private dentistCollectionExpTrend(mode = null) {
   let activeMode = this.trendValue;
   if (mode) {
     activeMode = mode;
   }
   this.dentistCollectionExpTrendLoader = true;
   this.clinic_id && this.cliniciananalysisService.caDentistCollectionExpTrend(this.selectedDentist, this.clinic_id, activeMode).subscribe((data: any) => {
     this.dentistColleExpTrendLabels1 = [];
     this.dentistColleExpWeeklyTrendLabels1 = [];
     this.dentistCollectionExpTrend1 = [];
     this.dentistCollectionExpWeeklyTrend1 = [];
     this.dentistCollectionExpTrendLabels = [];
     this.dentistCollectionExpWeeklyTrendLabels = [];

     let dynamicColors = [];
     if (data && data.message == 'success') {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
       if (data.data) {
         data.data.forEach(res => {
           // if (res.collection > 0) {
             this.dentistCollectionExpTrend1.push(Math.round(res.collection));
             if (activeMode == 'c') {
               this.dentistColleExpTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
             } else if (activeMode == 'w') {
               this.dentistColleExpTrendLabels1.push('WE ' + this.datePipe.transform(res.week_end, 'y-MM-dd'));
             } else {
               this.dentistColleExpTrendLabels1.push(res.year);
             }
           // }
         });
         if (this.dentistCollectionExpTrend1.every((value) => value == 0)) this.dentistCollectionExpTrend1 = [];
         this.dentistColExpTrend[0]['data'] = this.dentistCollectionExpTrend1;

         this.dentistColleExpTrendLabels1.forEach((label, labelIndex) => {
           dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
         }); // This is dynamic array for colors of bars        
         this.dentistColExpTrend[0].backgroundColor = dynamicColors;
         this.dentistCollectionExpTrendLabels = this.dentistColleExpTrendLabels1;
         if (activeMode == 'w') {
           this.dentistCollectionExpWeeklyTrend1 = data.data;
           this.dentistCollectionExpWeeklyTrendLabels = this.dentistColleExpTrendLabels1;
         }
       } else {
         this.dentistCollectionExpTrendLabels = [];
       }
       this.dentistCollectionExpTrendLoader = false;
     }
   }, error => {
    this.Apirequest = this.Apirequest - 1;
    this.enableDiabaleButton(this.Apirequest);
     this.toastr.error('There was an error retrieving your report data, please contact our support team.');
     this.warningMessage = "Please Provide Valid Inputs!";

   });
 }

 public dentistColExpDentistsTrend: any[] = [
  {
    data: [], label: '', shadowOffsetX: 3
  }];
 public dentistCollectionExpDentistsTrend1: any = [];
 public dentistCollectionExpWeeklyDentistsTrend1: any = [];
 public dentistCollectionExpDentistsTrendLabels: any = [];
 public dentistCollectionExpWeeklyDentistsTrendLabels: any = [];
 public dentistCollectionExpDentistsTrendLoader: boolean = true;
 public dentistColleExpDentistsTrendLabels1: any = [];
 public dentistColleExpWeeklyDentistsTrendLabels1: any = [];

 private dentistCollectionExpDentistsTrend(mode = null) {
   let activeMode = this.trendValue;
   if (mode) {
     activeMode = mode;
   }
   this.dentistCollectionExpDentistsTrendLoader = true;
   this.clinic_id && this.cliniciananalysisService.caDentistCollectionExpDentistsTrend(this.selectedDentist, this.clinic_id, activeMode).subscribe((data: any) => {
     this.dentistColleExpDentistsTrendLabels1 = [];
     this.dentistColleExpWeeklyDentistsTrendLabels1 = [];
     this.dentistCollectionExpDentistsTrend1 = [];
     this.dentistCollectionExpWeeklyDentistsTrend1 = [];
     this.dentistCollectionExpDentistsTrendLabels = [];
     this.dentistCollectionExpWeeklyDentistsTrendLabels = [];

     let dynamicColors = [];
     if (data && data.message == 'success') {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
       if (data.data) {
         data.data.forEach(res => {
           // if (res.collection > 0) {
             this.dentistCollectionExpDentistsTrend1.push(Math.round(res.collection));
             if (activeMode == 'c') {
               this.dentistColleExpDentistsTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
             } else if (activeMode == 'w') {
               this.dentistColleExpDentistsTrendLabels1.push('WE ' + this.datePipe.transform(res.week_end, 'y-MM-dd'));
             } else {
               this.dentistColleExpDentistsTrendLabels1.push(res.year);
             }
           // }
         });
         if (this.dentistCollectionExpDentistsTrend1.every((value) => value == 0)) this.dentistCollectionExpDentistsTrend1 = [];
         this.dentistColExpDentistsTrend[0]['data'] = this.dentistCollectionExpDentistsTrend1;

         this.dentistColleExpDentistsTrendLabels1.forEach((label, labelIndex) => {
           dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
         }); // This is dynamic array for colors of bars        
         this.dentistColExpDentistsTrend[0].backgroundColor = dynamicColors;
         this.dentistCollectionExpDentistsTrendLabels = this.dentistColleExpDentistsTrendLabels1;
         if (activeMode == 'w') {
           this.dentistCollectionExpWeeklyDentistsTrend1 = data.data;
           this.dentistCollectionExpWeeklyDentistsTrendLabels = this.dentistColleExpDentistsTrendLabels1;
         }
       } else {
         this.dentistCollectionExpDentistsTrendLabels = [];
       }
       this.dentistCollectionExpDentistsTrendLoader = false;
     }
   }, error => {
    this.Apirequest = this.Apirequest - 1;
    this.enableDiabaleButton(this.Apirequest);
     this.toastr.error('There was an error retrieving your report data, please contact our support team.');
     this.warningMessage = "Please Provide Valid Inputs!";

   });
 }

 public dentistColExpOhtTrend: any[] = [
  {
    data: [], label: '', shadowOffsetX: 3
  }];
 public dentistCollectionExpOhtTrend1: any = [];
 public dentistCollectionExpWeeklyOhtTrend1: any = [];
 public dentistCollectionExpOhtTrendLabels: any = [];
 public dentistCollectionExpWeeklyOhtTrendLabels: any = [];
 public dentistCollectionExpOhtTrendLoader: boolean = true;
 public dentistColleExpOhtTrendLabels1: any = [];
 public dentistColleExpWeeklyOhtTrendLabels1: any = [];

 private dentistCollectionExpOhtTrend(mode = null) {
   let activeMode = this.trendValue;
   if (mode) {
     activeMode = mode;
   }
   this.dentistCollectionExpOhtTrendLoader = true;
   this.clinic_id && this.cliniciananalysisService.caDentistCollectionExpOhtTrend(this.selectedDentist, this.clinic_id, activeMode).subscribe((data: any) => {
     this.dentistColleExpOhtTrendLabels1 = [];
     this.dentistColleExpWeeklyOhtTrendLabels1 = [];
     this.dentistCollectionExpOhtTrend1 = [];
     this.dentistCollectionExpWeeklyOhtTrend1 = [];
     this.dentistCollectionExpOhtTrendLabels = [];
     this.dentistCollectionExpWeeklyOhtTrendLabels = [];

     let dynamicColors = [];
     if (data && data.message == 'success') {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
       if (data.data) {
         data.data.forEach(res => {
           // if (res.collection > 0) {
             this.dentistCollectionExpOhtTrend1.push(Math.round(res.collection));
             if (activeMode == 'c') {
               this.dentistColleExpOhtTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
             } else if (activeMode == 'w') {
               this.dentistColleExpOhtTrendLabels1.push('WE ' + this.datePipe.transform(res.week_end, 'y-MM-dd'));
             } else {
               this.dentistColleExpOhtTrendLabels1.push(res.year);
             }
           // }
         });
         if (this.dentistCollectionExpOhtTrend1.every((value) => value == 0)) this.dentistCollectionExpOhtTrend1 = [];
         this.dentistColExpOhtTrend[0]['data'] = this.dentistCollectionExpOhtTrend1;

         this.dentistColleExpOhtTrendLabels1.forEach((label, labelIndex) => {
           dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
         }); // This is dynamic array for colors of bars        
         this.dentistColExpOhtTrend[0].backgroundColor = dynamicColors;
         this.dentistCollectionExpOhtTrendLabels = this.dentistColleExpOhtTrendLabels1;
         if (activeMode == 'w') {
           this.dentistCollectionExpWeeklyOhtTrend1 = data.data;
           this.dentistCollectionExpWeeklyOhtTrendLabels = this.dentistColleExpOhtTrendLabels1;
         }
       } else {
         this.dentistCollectionExpOhtTrendLabels = [];
       }
       this.dentistCollectionExpOhtTrendLoader = false;
     }
   }, error => {
    this.Apirequest = this.Apirequest - 1;
    this.enableDiabaleButton(this.Apirequest);
     this.toastr.error('There was an error retrieving your report data, please contact our support team.');
     this.warningMessage = "Please Provide Valid Inputs!";

   });
 }

  public treatPlanTrend: any[] = [
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
  public treatmentPlanTrend1 = [];
  public treatmentPlanTrend2 = [];
  public treatmentPlanTrendLabels = [];
  public treatmentPlanTrendLabels1 = [];
  public treatmentPlanTrendLoader: any;
  //Trend mode for Treatment PLan Chart
  private treatmentPlanTrend() {
    this.treatmentPlanTrendLoader = true;
    var user_id;
    var clinic_id;
    this.clinic_id && this.cliniciananalysisService.caTreatmentPlanAverageCostTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.treatmentPlanTrendLabels1 = [];
      this.treatmentPlanTrendLabels = [];

      this.treatmentPlanTrend1 = [];
      this.treatmentPlanTrend2 = [];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.treatmentPlanTrendLoader = false;
        if (data.data) {
          if (data.data.plan_fee_all) {
            data.data.plan_fee_all.forEach(res => {
              if (res.average_fees >= 0) {
                if (res.average_fees)
                  this.treatmentPlanTrend1.push(Math.round(res.average_fees));
                else
                  this.treatmentPlanTrend1.push(0);
              }
              if (this.trendValue == 'c')
                this.treatmentPlanTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              else
                this.treatmentPlanTrendLabels1.push(res.year);
            });
          }

          if (data.data.plan_fee_completed) {
            data.data.plan_fee_completed.forEach(res => {
              if (res.average_fees >= 0) {
                if (res.average_fees)
                  this.treatmentPlanTrend2.push(Math.round(res.average_fees));
                else
                  this.treatmentPlanTrend2.push(0);
              }
              /* if (this.trendValue == 'c')
                   this.treatmentPlanTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                 else
                   this.treatmentPlanTrendLabels1.push(res.year);*/
            });
          }


          /*   data.data.forEach(res => {
               if (res.val.total_fee_all)
                 this.treatmentPlanTrend1.push(Math.round(res.val.average_cost));
               else
                 this.treatmentPlanTrend1.push(0);
               if (res.val.total_completed)
                 this.treatmentPlanTrend2.push(Math.round(res.val.total_completed / res.val.total_plans));
               else
                 this.treatmentPlanTrend2.push(0);
   
               if (this.trendValue == 'c')
                 this.treatmentPlanTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
               else
                 this.treatmentPlanTrendLabels1.push(res.duration);
             });*/


        }
        if (this.treatmentPlanTrend1.every((value) => value == 0)) this.treatmentPlanTrend1 = [];
        this.treatPlanTrend[0]['data'] = this.treatmentPlanTrend1;
        this.treatmentPlanTrendLabels = this.treatmentPlanTrendLabels1;

        let dynamicColors = [];
        this.treatmentPlanTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.treatPlanTrend[0].backgroundColor = dynamicColors;


        if (this.treatmentPlanTrendLabels.length <= 0) {
          this.gaugeValueTreatment = 0;
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public patientComplaintTrend: any[] = [
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
  public patientComplaintsTrend1 = [];
  public patientComplaintsTrendLabels = [];
  public patientComplaintsTrendLabels1 = [];
  public patientComplaintsTrendLoader: boolean;
  //Trend mode for Pateint Complaints chart
  private patientComplaintsTrend() {
    this.patientComplaintsTrendLoader = true;

    var user_id;
    var clinic_id;
    this.clinic_id && this.cliniciananalysisService.caNumberPatientComplaintsTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.patientComplaintsTrendLabels1 = [];
      this.patientComplaintsTrendLabels = [];
      this.patientComplaintsTrendLoader = false;
      this.patientComplaintsTrend1 = [];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        if (data.data) {
          data.data.forEach(res => {
            if (res.num_complaints)
              this.patientComplaintsTrend1.push(res.num_complaints);
            if (this.trendValue == 'c')
              this.patientComplaintsTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.patientComplaintsTrendLabels1.push(res.year);
          });
        }
        this.patientComplaintTrend[0]['data'] = this.patientComplaintsTrend1;


        this.patientComplaintsTrendLabels = this.patientComplaintsTrendLabels1;
        let dynamicColors = [];
        this.patientComplaintsTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.patientComplaintTrend[0].backgroundColor = dynamicColors;


        if (this.patientComplaintsTrendLabels.length <= 0) {
          this.gaugeValuePatients = 0;
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }



  public recallPrebookChartTrend: any[] = [
    {
      data: [],
      label: '',
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
        this.chartService.colors.even
      ],
      shadowOffsetX: 3,
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
    },
    { 
      data: [], label: '',
      shadowOffsetX: 3,
      backgroundColor: 'rgba(255, 0, 128, 1)',
      order: 1,
    }
  ];
  public recallPrebookChartTrend1 = [];
  public recallPrebookChartTrendLabels = [];
  public recallPrebookChartTrendLabels1 = [];
  public fdRecallPrebookRateTrendLoader: boolean;
  public fdRecallPrebookRatetargetData = [];
  //Recall Prebook Rate Chart trend mode
  private fdRecallPrebookRateTrend() {
    this.fdRecallPrebookRateTrendLoader = true;
    this.recallPrebookChartTrendLabels = [];
    this.fdRecallPrebookRatetargetData=[];
    var user_id;
    var clinic_id;
    this.cliniciananalysisService.cpRecallPrebookRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.fdRecallPrebookRateTrendLoader = false;
        this.recallPrebookChartTrendLabels1 = [];
        this.recallPrebookChartTrend1 = [];
        data.data.forEach(res => {
          this.recallPrebookChartTrend1.push(Math.round(res.recall_percent));
          if(res.goals == -1 || res.goals == null || res.goals == ''){
            this.fdRecallPrebookRatetargetData.push(null);
          }else{
            this.fdRecallPrebookRatetargetData.push(res.goals);    
          }
          if (this.trendValue == 'c')
            this.recallPrebookChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
          else
            this.recallPrebookChartTrendLabels1.push(res.year);

        });
       
          var mappedfdRecallPrebookRatetargetData = [];
          this.fdRecallPrebookRatetargetData.map(function (v){
            if(v == null ){
              mappedfdRecallPrebookRatetargetData.push([v - 0, v + 0]);
            }else{
              mappedfdRecallPrebookRatetargetData.push([v - 0.5, v + 0.5]);
            }
          });
          if(this.trendValue == 'c'){
            this.recallPrebookChartTrend[0]['label'] = 'Actual';
            this.recallPrebookChartTrend[1]['label'] = 'Target';
           this.recallPrebookChartTrend[1]['data'] =  mappedfdRecallPrebookRatetargetData;//this.targetData.map(v => [v - subVal, v + subVal]);
          }else{
            this.recallPrebookChartTrend[0]['label'] = '';
            this.recallPrebookChartTrend[1]['label'] = '';
            this.recallPrebookChartTrend[1]['data'] =  [];
          }	
        this.recallPrebookChartTrend[0]['data'] = this.recallPrebookChartTrend1;

        this.recallPrebookChartTrendLabels = this.recallPrebookChartTrendLabels1;
        let dynamicColors = [];
        this.recallPrebookChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.recallPrebookChartTrend[0].backgroundColor = dynamicColors;


      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }


  public treatmentPrebookChartTrend: any[] = [
    {
      data: [],
      label: '',
      order:2,
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
      shadowOffsetX: 3,
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
    },
    { 
      data: [], label: '',
      shadowOffsetX: 3,
      backgroundColor: 'rgba(255, 0, 128, 1)',
      order: 1,
    }
  ];
  public treatmentPrebookChartTrend1 = [];
  public treatmentPrebookChartTrendLabels = [];
  public treatmentPrebookChartTrendLabels1 = [];
  public fdTreatmentPrebookRateTrendLoader: any;
  public fdTreatmentPrebookRatetargetData = [];
  //Trend Mode for Treatment Prebook RAte
  private fdTreatmentPrebookRateTrend() {
    this.fdTreatmentPrebookRateTrendLoader = true;
    this.treatmentPrebookChartTrendLabels = [];
    this.fdTreatmentPrebookRatetargetData=[];
    var user_id;
    var clinic_id;
    this.cliniciananalysisService.caReappointRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
     
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.fdTreatmentPrebookRateTrendLoader = false;
        this.treatmentPrebookChartTrendLabels1 = [];
        this.treatmentPrebookChartTrend1 = [];
        data.data.forEach(res => {
          this.treatmentPrebookChartTrend1.push(Math.round(res.reappoint_rate));
          if(res.goals == -1 || res.goals == null || res.goals == ''){
            this.fdTreatmentPrebookRatetargetData.push(null);
          }else{
            this.fdTreatmentPrebookRatetargetData.push(res.goals);    
          }  
          if (this.trendValue == 'c')
            this.treatmentPrebookChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
          else
            this.treatmentPrebookChartTrendLabels1.push(res.year);

        });
        
          var mappedfdTreatmentPrebookRatetargetData = [];
          this.fdTreatmentPrebookRatetargetData.map(function (v){
            if(v == null ){
              mappedfdTreatmentPrebookRatetargetData.push([v - 0, v + 0]);
            }else{
              mappedfdTreatmentPrebookRatetargetData.push([v - 0.5, v + 0.5]);
            }
          });
          if(this.trendValue == 'c'){
            this.treatmentPrebookChartTrend[0]['label'] = 'Actual';
            this.treatmentPrebookChartTrend[1]['label'] = 'Target';
           this.treatmentPrebookChartTrend[1]['data'] =  mappedfdTreatmentPrebookRatetargetData;//this.targetData.map(v => [v - subVal, v + subVal]);
          }else{
            this.treatmentPrebookChartTrend[0]['label'] = '';
            this.treatmentPrebookChartTrend[1]['label'] = '';
            this.treatmentPrebookChartTrend[1]['data'] =  [];
          }			  
        this.treatmentPrebookChartTrend[0]['data'] = this.treatmentPrebookChartTrend1;

        this.treatmentPrebookChartTrendLabels = this.treatmentPrebookChartTrendLabels1;

        let dynamicColors = [];
        this.treatmentPrebookChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.treatmentPrebookChartTrend[0].backgroundColor = dynamicColors;

      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }



  public hourlyRateChartTrend: any[] = [
    {
      data: [], order:2,
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
      label: '', shadowOffsetX: 3,
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
    },{
      data: [], order:1, label: '', shadowOffsetX: 3,  backgroundColor: 'rgba(255, 0, 128, 1)',
    }
  ];
  public hourlyRateChartTrend1 = [];
  public hourlyRateChartTrendLabels = [];
  public hourlyRateChartTrendLabels1 = [];
  public fdhourlyRateRateTrendLoader: any;
  public hourlytargetData = [];
  //Trend Mode for Hourly Rate chart
  private fdhourlyRateRateTrend() {
    this.fdhourlyRateRateTrendLoader = true;
    var user_id;
    var clinic_id;
    this.hourlytargetData =[];
    this.clinic_id && this.cliniciananalysisService.cahourlyRateRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.hourlyRateChartTrendLabels = [];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.fdhourlyRateRateTrendLoader = false;
        this.hourlyRateChartTrendLabels1 = [];
        this.hourlyRateChartTrend1 = [];
        data.data.forEach(res => {
          if (res.hourly_rate >= 0) {
            this.hourlyRateChartTrend1.push(Math.round(res.hourly_rate));
            if(res.goals == -1 || res.goals == null || res.goals == ''){
              this.hourlytargetData.push(null);
            }else{
              this.hourlytargetData.push(res.goals); 
            }              
            if (this.trendValue == 'c')
              this.hourlyRateChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.hourlyRateChartTrendLabels1.push(res.year);
          }
        });

        let maxVal1 = Math.max(...this.hourlyRateChartTrend1);
          var subVal = 1;
          
          if(maxVal1 >=20000){
            subVal = 100;
          }else if(maxVal1 > 5000 && maxVal1 < 20000){
            subVal = 50;
          }else if(maxVal1 > 3000 && maxVal1 < 5000){
            subVal = 15;
          }else if(maxVal1 > 2000 && maxVal1 < 3000){
            subVal = 10;
          }else if(maxVal1 > 1000 && maxVal1 < 2000){
            subVal = 5;
          }else if(maxVal1 > 500 && maxVal1 < 1000){
            subVal = 3;
          }else if(maxVal1 > 100 && maxVal1 < 500){
            subVal = 1;
          }else if(maxVal1 > 51 && maxVal1 < 100){
            subVal = 0.2;
          }else if(maxVal1 <= 50){
            subVal = 0.1;
          }
         var mappedhourlytargetData = [];
          this.hourlytargetData.map(function (v){
            if(v == null ){
              mappedhourlytargetData.push([v - 0, v + 0]);
            }else{
              mappedhourlytargetData.push([v - subVal, v + subVal]);
            }
          });
        if(this.trendValue == 'c'){
          this.hourlyRateChartTrend[0]['label'] = 'Actual';
          this.hourlyRateChartTrend[1]['label'] = 'Target';
          this.hourlyRateChartTrend[1]['data'] =  mappedhourlytargetData; //this.hourlytargetData.map(v => [v - subVal, v + subVal]);
        }else{
          this.hourlyRateChartTrend[0]['label'] = '';
          this.hourlyRateChartTrend[1]['label'] = '';
          this.hourlyRateChartTrend[1]['data'] =  [];
        }
        this.hourlyRateChartTrend[0]['data'] = this.hourlyRateChartTrend1;
        this.hourlyRateChartTrendLabels = this.hourlyRateChartTrendLabels1;

        let dynamicColors = [];
        this.hourlyRateChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.hourlyRateChartTrend[0].backgroundColor = dynamicColors;
        if (this.hourlyRateChartTrendLabels.length <= 0) {
          this.hourlyValue = 0;
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public collhourlyRateChartTrend: any[] = [
    {
      data: [], order:2,
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
      label: '', shadowOffsetX: 3,
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
    },{
      data: [], order:1, label: '', shadowOffsetX: 3,  backgroundColor: 'rgba(255, 0, 128, 1)',
    }
  ];
  public collhourlyRateChartTrend1 = [];
  public collhourlyRateChartTrendLabels = [];
  public collhourlyRateChartTrendLabels1 = [];
  public collhourlyRateRateTrendLoader: any;
  public collhourlytargetData = [];
  //Trend Mode for Hourly Rate chart
  private collectionHourlyRateTrend() {
    this.collhourlyRateRateTrendLoader = true;
    var user_id;
    var clinic_id;
    this.collhourlytargetData =[];
    this.clinic_id && this.cliniciananalysisService.collectionHourlyRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.collhourlyRateChartTrendLabels = [];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.collhourlyRateRateTrendLoader = false;
        this.collhourlyRateChartTrendLabels1 = [];
        this.collhourlyRateChartTrend1 = [];
        data.data.forEach(res => {
          if (res.hourly_rate >= 0) {
            this.collhourlyRateChartTrend1.push(Math.round(res.hourly_rate));
            if(res.goals == -1 || res.goals == null || res.goals == ''){
              this.collhourlytargetData.push(null);
            }else{
              this.collhourlytargetData.push(res.goals); 
            }              
            if (this.trendValue == 'c')
              this.collhourlyRateChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.collhourlyRateChartTrendLabels1.push(res.year);
          }
        });

        let maxVal1 = Math.max(...this.collhourlyRateChartTrend1);
          var subVal = 1;
          
          if(maxVal1 >=20000){
            subVal = 100;
          }else if(maxVal1 > 5000 && maxVal1 < 20000){
            subVal = 50;
          }else if(maxVal1 > 3000 && maxVal1 < 5000){
            subVal = 15;
          }else if(maxVal1 > 2000 && maxVal1 < 3000){
            subVal = 10;
          }else if(maxVal1 > 1000 && maxVal1 < 2000){
            subVal = 5;
          }else if(maxVal1 > 500 && maxVal1 < 1000){
            subVal = 3;
          }else if(maxVal1 > 100 && maxVal1 < 500){
            subVal = 1;
          }else if(maxVal1 > 51 && maxVal1 < 100){
            subVal = 0.2;
          }else if(maxVal1 <= 50){
            subVal = 0.1;
          }
         var mappedhourlytargetData = [];
          this.collhourlytargetData.map(function (v){
            if(v == null ){
              mappedhourlytargetData.push([v - 0, v + 0]);
            }else{
              mappedhourlytargetData.push([v - subVal, v + subVal]);
            }
          });
        if(this.trendValue == 'c'){
          this.collhourlyRateChartTrend[0]['label'] = 'Actual';
          this.collhourlyRateChartTrend[1]['label'] = 'Target';
          this.collhourlyRateChartTrend[1]['data'] =  mappedhourlytargetData; //this.collhourlytargetData.map(v => [v - subVal, v + subVal]);
        }else{
          this.collhourlyRateChartTrend[0]['label'] = '';
          this.collhourlyRateChartTrend[1]['label'] = '';
          this.collhourlyRateChartTrend[1]['data'] =  [];
        }
        this.collhourlyRateChartTrend[0]['data'] = this.collhourlyRateChartTrend1;
        this.collhourlyRateChartTrendLabels = this.collhourlyRateChartTrendLabels1;

        let dynamicColors = [];
        this.collhourlyRateChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.collhourlyRateChartTrend[0].backgroundColor = dynamicColors;
        if (this.collhourlyRateChartTrendLabels.length <= 0) {
          this.hourlyValue = 0;
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public collExphourlyRateChartTrend: any[] = [
    {
      data: [], order:2,
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
      label: '', shadowOffsetX: 3,
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
    },{
      data: [], order:1, label: '', shadowOffsetX: 3,  backgroundColor: 'rgba(255, 0, 128, 1)',
    }
  ];
  public collExphourlyRateChartTrend1 = [];
  public collExphourlyRateChartTrendLabels = [];
  public collExphourlyRateChartTrendLabels1 = [];
  public collExphourlyRateRateTrendLoader: any;
  public collExphourlytargetData = [];
  //Trend Mode for Hourly Rate chart
  private collectionExpHourlyRateTrend() {
    this.collExphourlyRateRateTrendLoader = true;
    var user_id;
    var clinic_id;
    this.collExphourlytargetData =[];
    this.clinic_id && this.cliniciananalysisService.collectionExpHourlyRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.collExphourlyRateChartTrendLabels = [];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.collExphourlyRateRateTrendLoader = false;
        this.collExphourlyRateChartTrendLabels1 = [];
        this.collExphourlyRateChartTrend1 = [];
        data.data.forEach(res => {
          if (res.hourly_rate >= 0) {
            this.collExphourlyRateChartTrend1.push(Math.round(res.hourly_rate));
            if(res.goals == -1 || res.goals == null || res.goals == ''){
              this.collExphourlytargetData.push(null);
            }else{
              this.collExphourlytargetData.push(res.goals); 
            }              
            if (this.trendValue == 'c')
              this.collExphourlyRateChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.collExphourlyRateChartTrendLabels1.push(res.year);
          }
        });

        let maxVal1 = Math.max(...this.collExphourlyRateChartTrend1);
          var subVal = 1;
          
          if(maxVal1 >=20000){
            subVal = 100;
          }else if(maxVal1 > 5000 && maxVal1 < 20000){
            subVal = 50;
          }else if(maxVal1 > 3000 && maxVal1 < 5000){
            subVal = 15;
          }else if(maxVal1 > 2000 && maxVal1 < 3000){
            subVal = 10;
          }else if(maxVal1 > 1000 && maxVal1 < 2000){
            subVal = 5;
          }else if(maxVal1 > 500 && maxVal1 < 1000){
            subVal = 3;
          }else if(maxVal1 > 100 && maxVal1 < 500){
            subVal = 1;
          }else if(maxVal1 > 51 && maxVal1 < 100){
            subVal = 0.2;
          }else if(maxVal1 <= 50){
            subVal = 0.1;
          }
         var mappedhourlytargetData = [];
          this.collExphourlytargetData.map(function (v){
            if(v == null ){
              mappedhourlytargetData.push([v - 0, v + 0]);
            }else{
              mappedhourlytargetData.push([v - subVal, v + subVal]);
            }
          });
        if(this.trendValue == 'c'){
          this.collExphourlyRateChartTrend[0]['label'] = 'Actual';
          this.collExphourlyRateChartTrend[1]['label'] = 'Target';
          this.collExphourlyRateChartTrend[1]['data'] =  mappedhourlytargetData; //this.collExphourlytargetData.map(v => [v - subVal, v + subVal]);
        }else{
          this.collExphourlyRateChartTrend[0]['label'] = '';
          this.collExphourlyRateChartTrend[1]['label'] = '';
          this.collExphourlyRateChartTrend[1]['data'] =  [];
        }
        this.collExphourlyRateChartTrend[0]['data'] = this.collExphourlyRateChartTrend1;
        this.collExphourlyRateChartTrendLabels = this.collExphourlyRateChartTrendLabels1;

        let dynamicColors = [];
        this.collExphourlyRateChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.collExphourlyRateChartTrend[0].backgroundColor = dynamicColors;
        if (this.collExphourlyRateChartTrendLabels.length <= 0) {
          this.hourlyValue = 0;
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public hourlyRateChartDentistsTrend: any[] = [
    {
      data: [],
    }];
  public hourlyRateChartDentistsTrend1 = [];
  public hourlyRateChartDentistsTrendLabels = [];
  public hourlyRateChartDentistsTrendLabels1 = [];
  public fdhourlyRateRateDentistsTrendLoader: any;
  //Trend Mode for Hourly Rate chart
  private fdhourlyRateRateDentistsTrend() {
    this.fdhourlyRateRateDentistsTrendLoader = true;
    var user_id;
    var clinic_id;
    this.clinic_id && this.cliniciananalysisService.cahourlyRateChartDesntistsTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.hourlyRateChartDentistsTrendLabels = [];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.fdhourlyRateRateDentistsTrendLoader = false;
        this.hourlyRateChartDentistsTrendLabels1 = [];
        this.hourlyRateChartDentistsTrend1 = [];
        data.data.forEach(res => {
          if (res.hourly_rate >= 0) {
            this.hourlyRateChartDentistsTrend1.push(Math.round(res.hourly_rate));
            if (this.trendValue == 'c')
              this.hourlyRateChartDentistsTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.hourlyRateChartDentistsTrendLabels1.push(res.year);
          }
        });
        this.hourlyRateChartDentistsTrend[0]['data'] = this.hourlyRateChartDentistsTrend1;
        this.hourlyRateChartDentistsTrendLabels = this.hourlyRateChartDentistsTrendLabels1;

        let dynamicColors = [];
        this.hourlyRateChartDentistsTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.hourlyRateChartDentistsTrend[0].backgroundColor = dynamicColors;

        if (this.hourlyRateChartDentistsTrendLabels.length <= 0) {
          this.hourlyValue = 0;
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }


  public hourlyRateChartOhtTrend: any[] = [
    {
      data: [],
    }];
  public hourlyRateChartOhtTrend1 = [];
  public hourlyRateChartOhtTrendLabels = [];
  public hourlyRateChartOhtTrendLabels1 = [];
  public fdhourlyRateRateOhtTrendLoader: any;
  //Trend Mode for Hourly Rate chart
  private fdhourlyRateRateOhtTrend() {
    this.fdhourlyRateRateOhtTrendLoader = true;
    var user_id;
    var clinic_id;
    this.clinic_id && this.cliniciananalysisService.cahourlyRateChartOhtTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.hourlyRateChartOhtTrendLabels = [];
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.fdhourlyRateRateOhtTrendLoader = false;
        this.hourlyRateChartOhtTrendLabels1 = [];
        this.hourlyRateChartOhtTrend1 = [];
        data.data.forEach(res => {
          if (res.hourly_rate >= 0) {
            this.hourlyRateChartOhtTrend1.push(Math.round(res.hourly_rate));
            if (this.trendValue == 'c')
              this.hourlyRateChartOhtTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.hourlyRateChartOhtTrendLabels1.push(res.year);
          }
        });
        this.hourlyRateChartOhtTrend[0]['data'] = this.hourlyRateChartOhtTrend1;
        this.hourlyRateChartOhtTrendLabels = this.hourlyRateChartOhtTrendLabels1;

        let dynamicColors = [];
        this.hourlyRateChartOhtTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.hourlyRateChartOhtTrend[0].backgroundColor = dynamicColors;

        if (this.hourlyRateChartOhtTrendLabels.length <= 0) {
          this.hourlyValue = 0;
        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }


  public newPatientsChartTrend: any[] = [
    {
      data: [],
      label: '',
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
    },
    { 
      data: [], label: '',
      shadowOffsetX: 3,
      backgroundColor: 'rgba(255, 0, 128, 1)',
      order: 1,
    }
  ];
  public newPatientsChartTrend1 = [];
  public newPatientsChartTrendLabels = [];
  public newPatientsChartTrendLabels1 = [];
  public fdnewPatientsRateTrendLoader: any;
  public newPatientstargetData = [];
  //Trend Mode for New Patient 
  private fdnewPatientsRateTrend() {
    this.fdnewPatientsRateTrendLoader = true;
    this.newPatientsChartTrendLabels = [];
    this.newPatientstargetData=[];
    var user_id;
    var clinic_id;
    this.clinic_id && this.cliniciananalysisService.canewPatientsRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
     
      if (data != null && data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.fdnewPatientsRateTrendLoader = false;
        this.newPatientsChartTrendLabels1 = [];
        this.newPatientsChartTrend1 = [];
        data.data.forEach(res => {
          if (res.new_patients)
            this.newPatientsChartTrend1.push(Math.round(res.new_patients));
          else
            this.newPatientsChartTrend1.push(0);

          if(res.goals == -1 || res.goals == null || res.goals == ''){
            this.newPatientstargetData.push(null);
          }else{
            this.newPatientstargetData.push(res.goals);    
          }   
          if (this.trendValue == 'c')
            this.newPatientsChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
          else
            this.newPatientsChartTrendLabels1.push(res.year);

        });

        let maxVal = Math.max(...this.newPatientsChartTrend1);
          var subVal = 1;
          if(maxVal >= 5000){
            subVal = 100;
          }else if(maxVal > 3000 && maxVal < 5000){
            subVal = 50;
          }else if(maxVal > 2000 && maxVal < 3000){
            subVal = 10;
          }else if(maxVal > 100 && maxVal < 2000){
            subVal = 1;
          }else if(maxVal > 51 && maxVal < 100){
            subVal = 0.2;
          }else if(maxVal <= 50){
            subVal = 0.1;
          }

          var mappednewPatientstargetData = [];
          this.newPatientstargetData.map(function (v){
            if(v == null ){
              mappednewPatientstargetData.push([v - 0, v + 0]);
            }else{
              mappednewPatientstargetData.push([v - subVal, v + subVal]);
            }
          });
          if(this.trendValue == 'c'){
            this.newPatientsChartTrend[0]['label'] = 'Actual';
            this.newPatientsChartTrend[1]['label'] = 'Target';
           this.newPatientsChartTrend[1]['data'] =  mappednewPatientstargetData;//this.targetData.map(v => [v - subVal, v + subVal]);
          }else{
            this.newPatientsChartTrend[0]['label'] = '';
            this.newPatientsChartTrend[1]['label'] = '';
            this.newPatientsChartTrend[1]['data'] =  [];
          }			  

        this.newPatientsChartTrend[0]['data'] = this.newPatientsChartTrend1;

        this.newPatientsChartTrendLabels = this.newPatientsChartTrendLabels1;
        let dynamicColors = [];
        this.newPatientsChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.newPatientsChartTrend[0].backgroundColor = dynamicColors;

        if (this.newPatientsChartTrendLabels.length <= 0) {
          this.newPatientPercent = 0;

        }
      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public treatmentPlanChartTrend: any[] = [
    {
      data: [],
      label: '',
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
        this.chartService.colors.even
      ],
      shadowOffsetX: 3,
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
    },
    { 
      data: [], label: '',
      shadowOffsetX: 3,
      backgroundColor: 'rgba(255, 0, 128, 1)',
      order: 1,
    }
  ];
  public treatmentPlanChartTrend1 = [];
  public treatmentPlanChartTrendLabels = [];
  public treatmentPlanChartTrendLabels1 = [];
  public fdtreatmentPlanRateTrendLoader: any;
  public fdtreatmentPlanRatetargetData = [];
  //Trend Mode for Treatment plan Rate chart
  private fdtreatmentPlanRateTrend() {
    this.fdtreatmentPlanRateTrendLoader = true;
    this.treatmentPlanChartTrendLabels = [];
    this.fdtreatmentPlanRatetargetData =[];

    var user_id;
    var clinic_id;
    this.clinic_id && this.cliniciananalysisService.catreatmentPlanRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.fdtreatmentPlanRateTrendLoader = false;
      if (data.message == 'success') {
        this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
        this.treatmentPlanChartTrendLabels1 = [];
        this.treatmentPlanChartTrend1 = [];
        if (data.data) {
          data.data.forEach(res => {
            if (res.treatment_per_plan_percentage) {
              if (res.treatment_per_plan_percentage)
                this.treatmentPlanChartTrend1.push(Math.round(res.treatment_per_plan_percentage));
                if(res.goals == -1 || res.goals == null || res.goals == ''){
                  this.fdtreatmentPlanRatetargetData.push(null);
                }else{
                  this.fdtreatmentPlanRatetargetData.push(res.goals);    
                }    
              if (this.trendValue == 'c')
                this.treatmentPlanChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              else
                this.treatmentPlanChartTrendLabels1.push(res.year);
            }
          });
        }
        var sumpercantagevalue = this.treatmentPlanChartTrend1.reduce((acc, cur) => acc + cur, 0);
        if (sumpercantagevalue > 0) {

          this.treatmentPlanChartTrend[0]['data'] = this.treatmentPlanChartTrend1;
          this.treatmentPlanChartTrendLabels = this.treatmentPlanChartTrendLabels1;

          let dynamicColors = [];
          this.treatmentPlanChartTrendLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.treatmentPlanChartTrend[0].backgroundColor = dynamicColors;
          var mappedfdtreatmentPlanRatetargetData = [];
          this.fdtreatmentPlanRatetargetData.map(function (v){
            if(v == null ){
              mappedfdtreatmentPlanRatetargetData.push([v - 0, v + 0]);
            }else{
              mappedfdtreatmentPlanRatetargetData.push([v - 0.5, v + 0.5]);
            }
          });
          if(this.trendValue == 'c'){
            this.treatmentPlanChartTrend[0]['label'] = 'Actual';
            this.treatmentPlanChartTrend[1]['label'] = 'Target';
           this.treatmentPlanChartTrend[1]['data'] =  mappedfdtreatmentPlanRatetargetData;//this.targetData.map(v => [v - subVal, v + subVal]);
          }else{
            this.treatmentPlanChartTrend[0]['label'] = '';
            this.treatmentPlanChartTrend[1]['label'] = '';
            this.treatmentPlanChartTrend[1]['data'] =  [];
          } 
        } else {
          this.treatmentPlanChartTrendLabels = [];
        }

      }
    }, error => {
      this.Apirequest = this.Apirequest - 1;
      this.enableDiabaleButton(this.Apirequest);
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  setWeeklyTrend() {
    if (this.showWeekTrend) {
      this.showWeekTrend = false
    } else {
      this.showWeekTrend = true
      // this.showTrendChart = false
      // this.dentistProductionTrend('w');
    }
  }

  toggleChangeProcess() {
    if (this.toggleChecked) {
      this.Apirequest = 8;
      $('.filter').removeClass('active');
      // this.dentistProductionTrend();
     // this.dentistProductionDentistsTrend();
      // this.dentistProductionOhtTrend();
      // this.dentistCollectionTrend();
      // this.dentistCollectionDentistsTrend();
      // this.dentistCollectionOhtTrend();
      // this.dentistCollectionExpTrend();
      // this.dentistCollectionExpDentistsTrend();
      // this.dentistCollectionExpOhtTrend();
      if(this.user_type != '4'){
        if(this.proCollShow == 1){
          this.dentistProductionTrend();
        }else if(this.proCollShow == 2 ){
          this.dentistCollectionTrend();
        }else if(this.proCollShow == 3){
          this.dentistCollectionExpTrend();
        }

        if(this.hrCollShow == 1){
          this.fdhourlyRateRateTrend();
        }else if(this.hrCollShow == 2){
          this.collectionHourlyRateTrend();
        }else if(this.hrCollShow == 3){
          this.collectionExpHourlyRateTrend();
        }

      } 
      
      if(this.user_type == '4'){
        this.dentistProductionTrend();
        this.dentistCollectionTrend();
        this.dentistCollectionExpTrend();
        this.fdhourlyRateRateTrend();
        this.collectionHourlyRateTrend();
        this.collectionExpHourlyRateTrend();
      }
      this.fdnewPatientsRateTrend();
      this.treatmentPlanTrend();
      this.fdtreatmentPlanRateTrend();
      this.fdRecallPrebookRateTrend();
      this.patientComplaintsTrend();
     
      this.fdTreatmentPrebookRateTrend();
     
      
      // this.fdhourlyRateRateDentistsTrend();
     // this.fdhourlyRateRateOhtTrend();     
      
      this.changeTreatmentCostSingle('1');
      this.changePrebookRate('recall');
    }
  }

  public showAvg: boolean =false;
  goalToggle(val) {
    this.goalchecked = val;
    if(val == 'average'){
      this.showAvg = true;
      if(this.productionTotalAverage > 0 ){
        this.ChartsAvg(this.productionTotalAverage,this.barChartOptionsDP1);
      }
      if(this.productionDentistTotalAverage > 0){
        this.ChartsAvg(this.productionDentistTotalAverage,this.barChartOptionsDP2);
      }
      if(this.productionOhtTotalAverage > 0){
        this.ChartsAvg(this.productionOhtTotalAverage,this.barChartOptionsDP3);
      }
      if(this.collectionTotalAverage > 0){
        this.ChartsAvg(this.collectionTotalAverage,this.barChartOptionsDP);
      }
      if(this.collectionDentistsTotalAverage > 0){
        this.ChartsAvg(this.collectionDentistsTotalAverage,this.barChartOptionsDP4);
      }
      if(this.collectionOhtTotalAverage > 0){
        this.ChartsAvg(this.collectionOhtTotalAverage,this.barChartOptionsDP5);
      }
      if(this.collectionTotalAverage > 0){
        this.ChartsAvg(this.collectionTotalAverage,this.barChartOptionsDP6);
      }
      if(this.collectionTotalExpDentistsAverage > 0){
        this.ChartsAvg(this.collectionTotalExpDentistsAverage,this.barChartOptionsDP7);
      }
      if(this.collectionTotalExpOhtAverage > 0){
        this.ChartsAvg(this.collectionTotalExpOhtAverage,this.barChartOptionsDP8);
      }
      if(this.hourlyRateChartAverage > 0){
        this.ChartsAvg(this.hourlyRateChartAverage,this.barChartOptionsHR);
      }
      if(this.hourlyRateChartDesntistsAverage > 0){
        this.ChartsAvg(this.hourlyRateChartDesntistsAverage,this.barChartOptionsHR1);
      }
      if(this.hourlyRateChartOhtAverage > 0){
        this.ChartsAvg(this.hourlyRateChartOhtAverage,this.barChartOptionsHR2);
      }
      if(this.planTotalAverage > 0){
        this.ChartsAvg(this.planTotalAverage,this.barChartOptionsTC);
      }
      if(this.treatmentPreChartAverage > 0){
        this.ChartsAvg(this.treatmentPreChartAverage,this.barChartOptionsTPB);
      }
      if(this.recallChartAverage > 0){
        this.ChartsAvg(this.recallChartAverage,this.barChartOptionsRP);
      }
      if(this.treatmentChartAverage > 0){
        this.ChartsAvg(this.treatmentChartAverage,this.barChartOptionsTP);
      }
    
    }else{
      this.showAvg = false;
      this.ChartsAvgOff(this.productionTotalAverage,this.barChartOptionsDP1);
      this.ChartsAvgOff(this.productionDentistTotalAverage,this.barChartOptionsDP2);
      this.ChartsAvgOff(this.productionOhtTotalAverage,this.barChartOptionsDP3);
      this.ChartsAvgOff(this.collectionTotalAverage,this.barChartOptionsDP);
      this.ChartsAvgOff(this.collectionDentistsTotalAverage,this.barChartOptionsDP4);
      this.ChartsAvgOff(this.collectionOhtTotalAverage,this.barChartOptionsDP5);
      this.ChartsAvgOff(this.collectionTotalAverage,this.barChartOptionsDP6);
      this.ChartsAvgOff(this.collectionTotalExpDentistsAverage,this.barChartOptionsDP7);
      this.ChartsAvgOff(this.collectionTotalExpOhtAverage,this.barChartOptionsDP8);
      this.ChartsAvgOff(this.hourlyRateChartAverage,this.barChartOptionsHR);
      this.ChartsAvgOff(this.hourlyRateChartDesntistsAverage,this.barChartOptionsHR1);
      this.ChartsAvgOff(this.hourlyRateChartOhtAverage,this.barChartOptionsHR2);
      this.ChartsAvgOff(this.planTotalAverage,this.barChartOptionsTC);
      this.ChartsAvgOff(this.treatmentPreChartAverage,this.barChartOptionsTPB);
      this.ChartsAvgOff(this.recallChartAverage,this.barChartOptionsRP);
      this.ChartsAvgOff(this.treatmentChartAverage,this.barChartOptionsTP);
    }
    
  // this.buildChart();
  // this.buildChartDentists();
  // this.buildChartOht();
  // this.collectionChart();
  // this.collectionChartDentists();
  // this.collectionChartOht();
  // this.collectionExpChart();
  // this.collectionExpChartDentists();
  // this.collectionExpChartOht();
  // this.buildChartTreatment();
  // this.recallPrebook();
  // this.treatmentPrePrebook();
  // this.hourlyRateChart();
  // this.hourlyRateChartDesntists();
  // this.hourlyRateChartOht();
  // this.treatmentPlanRate();

  }
  
  private ChartsAvg(AvgVal,annota) {
    annota.annotation = {
     drawTime: 'afterDatasetsDraw',
      annotations: [{
       drawTime: 'afterDraw',
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: AvgVal,
        borderColor: '#0e3459',
        borderWidth: 2,
        borderDash: [2, 2],
        borderDashOffset: 0,
      },
      ]
    }
  }

  private ChartsAvgOff(AvgVal,annota) {
    annota.annotation = {
     drawTime: 'afterDatasetsDraw',
      annotations: [{
       drawTime: 'afterDraw',
        type: '',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: AvgVal,
        borderColor: '#0e3459',
        borderWidth: 2,
        borderDash: [2, 2],
        borderDashOffset: 0,
      },
      ]
    }
  }
  changePrebookRate(val) {
    if (val == 'recall' && this.goalchecked == 'average') {
      this.recallPrebook();
    } else if (val == 'treatment' && this.goalchecked == 'average') {
      this.treatmentPrePrebook();
    }
    $('.prebook_rate .sa_tab_btn').removeClass('active');
    this.prebook = val;
    $('.prebook_rate .pr_' + val).addClass('active');



  }

  getNameInitials(name: string) {
    const initials = name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
    return initials.join('');
  }

  toggleCompareFilter(val) {
    if ((this.averageToggle == true && val == 'on') || (this.averageToggle == false && val != 'on')) {
      return false;
    }
    $('.compare-button').click();
    if (val == 'on') {
      this.averageToggle = true;
      this.showTrend = false;
    } else {
      this.averageToggle = false;
      this.showTrend = true;
    }
  }

  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  changeProduction(val,dentType) {
    // if (parseInt(val) == 1 && this.goalchecked == 'average') {
    //   this.buildChart();
    // } else if (parseInt(val) == 2 && this.goalchecked == 'average') {
    //   this.collectionChart();
    // }else if (parseInt(val) == 3 && this.goalchecked == 'average') {
    //   this.collectionExpChart();
    // }
    if (parseInt(val) == 1 && dentType == "all"  && this.user_type != '4') {
      this.buildChart();
    } else if (parseInt(val) == 2 && dentType == "all"  && this.user_type != '4') {
      this.collectionChart();
    }else if (parseInt(val) == 3 && dentType == "all"  && this.user_type != '4') {
      this.collectionExpChart();
    }else if (parseInt(val) == 1 && dentType == "single"  && this.user_type != '4') {
      this.buildChartDentist();      
      if(this.toggleChecked){
        this.dentistProductionTrend();
      } else{
        this.dentistProductionTrend('w');
      }     
    }else if (parseInt(val) == 2 && dentType == "single"  && this.user_type != '4') {
      this.collectionDentist();      
      if(this.toggleChecked){
        this.dentistCollectionTrend();
      } else{
        this.dentistCollectionTrend('w');
      }     
    }else if (parseInt(val) == 3 && dentType == "single"  && this.user_type != '4') {
      this.collectionExpDentist();    
      if(this.toggleChecked){
        this.dentistCollectionExpTrend();
      } else{
        this.dentistCollectionExpTrend('w');
      }     
    }
    this.proCollShow = parseInt(val);
    if(parseInt(val) == 1){
      this.proSelectShow = "production_all";
    }else if(parseInt(val) == 2){
      this.proSelectShow = "collection_all";
    }else if(parseInt(val) == 3){ 
      this.proSelectShow ="collection_exp_all";
    }
  }  

  changeHrPro(val,dentType){
    if (parseInt(val) == 1 && dentType == "all" && this.user_type != '4') {
      this.hourlyRateChart();
    }else if(parseInt(val) == 2 && dentType == "all" && this.user_type != '4'){
      this.collectionHourlyRate();
    }else if(parseInt(val) == 3 && dentType == "all" && this.user_type != '4'){
      this.collectionExpHourlyRate();
    }else if(parseInt(val) == 1 && dentType == "single" && this.user_type != '4'){
      this.hourlyRateDentist();
      this.fdhourlyRateRateTrend();
    }else if(parseInt(val) == 2 && dentType == "single" && this.user_type != '4'){
      this.collectionHourlyRateSingle();
      this.collectionHourlyRateTrend();
    }else if(parseInt(val) == 3 && dentType == "single" && this.user_type != '4'){
      this.collectionExpHourlyRateSingle();
      this.collectionExpHourlyRateTrend();
    }
    this.hrCollShow = parseInt(val);
    if(parseInt(val) == 1){
      this.hrSelectShow = "hr_all";
    }else if(parseInt(val) == 2){
      this.hrSelectShow = "hr_collection_all";
    }else if(parseInt(val) == 3){ 
      this.hrSelectShow ="hr_collection_exp_all";
    }
  }

  getChartsTips() {
    this.chartstipsService.getCharts(1).subscribe((data) => {
      if (data.message == 'success') {
        this.charTips = data.data;
      }
    }, error => { });
  }


  public showTopVlaues = false;
  setTopValues() {
    if (this.showTopVlaues == false) {
      this.showTopVlaues = true;
      this.barChartOptionsDP1 = this.barChartOptions1;
    } else {
      this.showTopVlaues = false;
      this.barChartOptionsDP1 = this.barChartOptions;
      this.barChartOptionsDP1.animation.duration = 1;
    }
  }
  enableDiabaleButton(val) {
    if(val <= 0 ){
      $('.sa_tabs_data button').prop('disabled',false);
    }else{
      $('.sa_tabs_data button').prop('disabled',true);    
    }
    if(this.clinic_id.indexOf(',') >= 0 || this.clinic_id == 'all'){
      if(val <= 0 ){
        $('.multi-clinic-dis').removeClass("disablePointer");
        $('.multi-clinic-pro').removeClass("disablePointerProgress");
      }else{
        $('.multi-clinic-dis').addClass("disablePointer");
        $('.multi-clinic-pro').addClass("disablePointerProgress");
      }
    }else{
      $('.multi-clinic-dis').removeClass("disablePointer");
      $('.multi-clinic-pro').removeClass("disablePointerProgress");
    }
  }

  changeProSelect(val){
    if (val == "production_all") {
      this.buildChart();
    } else if (val == "production_dentists") {
     this.buildChartDentists();
    }else if (val == "production_oht") {
     this.buildChartOht();
    }else if (val == "collection_all") {
      this.collectionChart();
     }else if (val == "collection_dentists") {
      this.collectionChartDentists();
     }else if (val == "collection_oht") {
      this.collectionChartOht();
     }else if (val == "collection_exp_all") {
      this.collectionExpChart();
     }else if (val == "collection_exp_dentists") {
      this.collectionExpChartDentists();
     }else if (val == "collection_exp_oht") {
      this.collectionExpChartOht();
     }

     this.proSelectShow = val;
  }


  changeHourlyRateSelect(val){
    if(val == "hr_all"){
      this.hourlyRateChart();
    }else if(val == "hr_dentists"){
      this.hourlyRateChartDesntists();
    }else if(val == "hr_oht"){
      this.hourlyRateChartOht();
    }else if(val == "hr_collection_all"){
      this.collectionHourlyRate();
    }else if(val == "hr_collection_dentists"){
      this.collectionHourlyRateDentist();
    }else if(val == "hr_collection_oht"){
      this.collectionHourlyRateOht();
    }else if(val == "hr_collection_exp_all"){
      this.collectionExpHourlyRate();
    }else if(val == "hr_collection_exp_dentists"){
      this.collectionExpHourlyRateDentist();
    }else if(val == "hr_collection_exp_oht"){
      this.collectionExpHourlyRateOht();
    }
    this.hrSelectShow = val;
  }

  showNPTable(val){
    this.shownewPatientTbl = val;
  }
  showHrTable(val){
    if(this.hrSelectShow == "hr_all"){ 
      this.showHrTbl = val;
    }else if(this.hrSelectShow == "hr_dentists"){
      this.showHrDentTbl = val;
    }else if(this.hrSelectShow == "hr_oht"){
      this.showHrOhtTbl = val;
    }else if(this.hrSelectShow == "hr_collection_all"){
      this.showCollHrTbl = val;
    }else if(this.hrSelectShow == "hr_collection_dentists"){
      this.showCollHrDentTbl = val;
    }else if(this.hrSelectShow == "hr_collection_oht"){
      this.showCollHrOhtTbl = val;
    }else if(this.hrSelectShow == "hr_collection_exp_all"){
      this.showCollexpHrTbl = val;
    }else if(this.hrSelectShow == "hr_collection_exp_dentists"){
      this.showCollexpHrDentTbl = val;
    }else if(this.hrSelectShow == "hr_collection_exp_oht"){
      this.showCollexpHrOhtTbl = val;
    }    

  }

  showProdColTable(val){
    if(this.proSelectShow == "production_all" && this.proCollShow == 1){ 
      this.showprodAllTbl = val;
    }else if(this.proSelectShow == "production_dentists" && this.proCollShow == 1){
      this.showprodDentAllTbl = val;
    }else if(this.proSelectShow == "production_oht" && this.proCollShow == 1){
      this.showprodOhtAllTbl = val;
    }else if(this.proSelectShow == "collection_all" && this.proCollShow == 2){
      this.showCollAllTbl = val;
    }else if(this.proSelectShow == "collection_dentists" && this.proCollShow == 2){
      this.showCollDentTbl = val;
    }else if(this.proSelectShow == "collection_oht" && this.proCollShow == 2){
      this.showCollOhtTbl = val;
    }else if(this.proSelectShow == "collection_exp_all" && this.proCollShow == 3){
      this.showCollExpTbl = val;
    }else if(this.proSelectShow == "collection_exp_dentists" && this.proCollShow == 3){
      this.showCollExpDentTbl = val;
    }else if(this.proSelectShow == "collection_exp_oht" && this.proCollShow == 3){
      this.showCollExpOhtTbl = val;
    }               
  }

  showTpacTable(val){
    if(this.tcmain == 1){
      this.showplanChartPTbl = val;
    }else if(this.tcmain == 2){
      this.showplanChartCTbl = val;
    }    
  }

  showPrateTable(val){
    if(this.prebook == "recall"){
      this.showrecallTbl = val;
    }else if(this.prebook == "treatment"){
      this.showreappointTbl = val;
    }    
  }
  showPcomplaintsTable(val){
    this.showpatientCtblTbl = val;
  }
  showpTprTable(val){
    this.showpTprTbl = val;
  }

}

