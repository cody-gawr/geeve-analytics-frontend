import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy,ViewEncapsulation } from '@angular/core';
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
  public showTrendChart = false;
  public goalchecked = 'off';
  public averagechecked = false;
  public averageToggle = false;  
  public childid: string = '';
  public user_type: string = '';

  public proCollShow: number = 1;


  public flag = false;
  private _routerSub = Subscription.EMPTY;
  newPatientPluginObservable$: Observable<PluginServiceGlobalRegistrationAndOptions[]>;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  newPatientTotal$ = new BehaviorSubject<number>(0);

  chartData1 = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels1 = ['January', 'February', 'Mars', 'April'];
  private dentistProductionLabelsByIndex = [];
  private treatmentPlanProposedProvidersByInx = [];
  private showCompare:boolean = false;
  public Apirequest =0;
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
    public constants: AppConstants
  )  {
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
    if(date){
      var dateArray = date.split("-")
      const d = new Date();
      d.setFullYear(+dateArray[2], (+dateArray[1] - 1), +dateArray[0])
      const formattedDate = this.datePipe.transform(d, 'dd MMM yyyy');
      return formattedDate;
    } else return date;
  }

  //initialize component
  ngAfterViewInit() {
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
    $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) );

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
          '#6edbbb','#b0fffa','#abb3ff','#ffb4b5','#fffcac', '#FFE4E4', '#FFD578', '#54D2FF', '#E58DD7', '#A9AABC', '#F2ECFF', '#5689C9', '#F9F871'
        ]
      }];

    this.filterDate(this.chartService.duration$.value);
  }

  ngOnInit() {
    let namedChartAnnotation = ChartAnnotation;
    namedChartAnnotation["id"] = "annotation";
    Chart.pluginService.register( namedChartAnnotation);

    if(this._cookieService.get("dentist_toggle") === 'true'){
      this.averageToggle = true;
      this.showTrend = false;
    }
  }

  //Load Clinic Data
  initiate_clinic() {
    //$('.internal_dentist').val('all');
    //$('.external_dentist').val('all');
    var val = $('#currentClinic').attr('cid');
    if( this._cookieService.get("dentistid")){
         this.childid = this._cookieService.get("dentistid");
         this.selectedDentist = this._cookieService.get("dentistid");
     }
    if (val != undefined && val != 'all') {

      this.clinic_id = val;
      this.getDentists();
      this.filterDate(this.chartService.duration$.value);
    }
  }

  splitName(name: string) {
    const regex = /\w+\s\w+(?=\s)|\w+/g;
    return name.toString().trim().match(regex);
  }

  dentists: Dentist[] = [
    { providerId: 'all', name: 'All Dentists' },
  ];
  public barChartColors: Array<any>;
  public barChartType = 'bar';
  public barChartLegend = false;
  public gradient = 'bar';
  public barChartBorder = "#1CA49F";

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
    hover: {mode: null},
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
            const names = this.splitName(label);
            if (names.length > 1) {
              return `${names[0][0]} ${names[1]}`
            } else return `${names[0]}`;
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
          return this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
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

  public barChartOptionsTrend: any = {
    scaleShowVerticalLines: false,
    cornerRadius: 60,
    hover: {mode: null},
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
        }
      }],
      yAxes: [{
        suggestedMin: 0,
        ticks: {
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
          return this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
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
    hover: {mode: null},
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
            if (names.length > 1) {
              return `${names[0][0]} ${names[1]}`
            } else return `${names[0]}`;
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
    hover: {mode: null},
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


  public barChartOptionstrend: any = {
    scaleShowVerticalLines: false,
    cornerRadius: 60,
    hover: {mode: null},
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
          return tooltipItem.xLabel + ": " + tooltipItem.yLabel;
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
    hover: {mode: null},
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
        padding: 13
      },
      onClick: function (e) {
        e.stopPropagation();
      }
    },
    elements: {
      center: {
        text: '',
        sidePadding:40,
        minFontSize: 15
      }
    }
  };
  public doughnutChartOptionsPercent: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    hover: {mode: null},
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

  if(this._cookieService.get("user_type") == '4'){
    if(this._cookieService.get("dentist_toggle") === 'false')
      newValue = this.selectedDentist;
    else{
          newValue = 'all';
          
        }

  }

  if(newValue ==''){
    return false;
  }
   
   $('#title').html('<span> Clinician Analysis </span>');
    $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) );
  this.changePrebookRate('recall');
   if( this._cookieService.get("dentistid"))
         this.childid = this._cookieService.get("dentistid");
  if(newValue == 'all') {
      this.dentistVal='all';
      this.showTrend= false;
      this.toggleChecked= false;
      this.showTrendChart=false;
      this.buildChart();
      this.collectionChart()
      this.buildChartTreatment();
      this.buildChartNopatients();
      this.buildChartNewpatients();
      this.recallPrebook();
      this.treatmentPrePrebook();
      this.hourlyRateChart();
      this.treatmentPlanRate();
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
    }
    else {
      this.dentistVal = newValue;
      this.showTrend = true;
      this.selectedDentist = newValue;
      if (this.toggleChecked) {
        this.toggleChangeProcess();
        this.showTrendChart = true;

      }
      else {
        this.showTrendChart = false;
        //this.toggleFilter('off');
        this.buildChartDentist();
        this.collectionDentist();
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
        this.hourlyRateDentist();
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
        this._cookieService.put("token", '');
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
        this._cookieService.put("token", '');
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
        if(this.treatmentPlanTrend1.every((value) => value == 0)) this.treatmentPlanTrend1 = [];
        this.treatPlanTrend[0]['data'] = this.treatmentPlanTrend1;
      }
      else {
        this.gaugeValueTreatment = Math.floor(this.gaugeValueTreatmentP);
        this.planTotalPrev = this.planAllTotalTrend;
        this.planTotal = this.planTotalAll;
      }
    }
    else {
      if (this.toggleChecked){
        if(this.treatmentPlanTrend2.every((value) => value == 0)) this.treatmentPlanTrend2 = [];
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
  public barChartOptionsDP: any = this.barChartOptions;
  public buildChartLoader: boolean = false;
  public dentistKey;
  public DPcolors: any;
  //Dentist Production Chart for all Dentist
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
      if (data.message == 'success') {
        this.buildChartLoader = false;
        this.productionTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.production > 0) {
            this.barChartData1.push(Math.round(res.production));
            var name = res.provider_name;
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.barChartLabels1.push(res.provider_name);
              this.dentistKey = i;
            } else {
              this.barChartLabels1.push(res.provider_name);
            }            
            i++;
          }
        });

        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            {
              backgroundColor: [],
              hoverBorderColor: '#000'
            }
          ];
        this.barChartColors[0].backgroundColor[this.dentistKey] = '#119682';
        this.DPcolors= this.barChartColors;
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
          dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars
        
        this.barChartData[0].backgroundColor = dynamicColors;
         this.barChartLabels = this.barChartLabels1;
         this.productionTotal =  Math.round(data.total);    
         this.productionTotalAverage = Math.round(data.total_average);
         this.productionTotalPrev = Math.round(data.total_ta);
         this.productionGoal = data.goals; 
        
  if(this.productionTotal >= this.productionTotalPrev)
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
          this._cookieService.put("token", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }


    );
  }





  public collectionLoader:boolean = true;
  public collectionData1:any = [];
  public collectionLabels1:any = [];
  public collectionTotal:any = 0;
  public collectionLabels:any = [];
  public collectionData: any[] = [    {
      ...this.chartService.baseChartData,
      data: [],
    }
  ];
  public collectionTotalAverage:any = 0;
  public collectionTotalPrev:any = 0;
  public collectionTotalGoal:any = 0; 
  public collectionTooltip:string =''; 

 private collectionChart() {
    this.collectionLoader = true;
    this.collectionData1 = [];
    this.collectionLabels1 = [];
    this.collectionTotal = 0;
    this.collectionLabels = [];
    this.barChartOptionsDP.annotation = [];
   this.clinic_id && this.cliniciananalysisService.DentistCollection(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.collectionData1 = [];
      this.collectionLabels1 = [];
      this.collectionLabels = [];
      this.collectionTotal = 0;
      if (data.message == 'success') {
        this.collectionLoader = false;
        this.collectionTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.collection > 0) {
            this.collectionData1.push(Math.round(res.collection));
            var name = res.provider_name;
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.collectionLabels1.push(res.provider_name);
              this.dentistKey = i;
            } else {
              this.collectionLabels1.push(res.provider_name);
            }            
            i++;
          }
        });
      
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
          dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars

        
        this.collectionData[0].backgroundColor = dynamicColors;
         this.collectionLabels = this.collectionLabels1;
         this.collectionTotal =  Math.round(data.total);    
         this.collectionTotalAverage = Math.round(data.total_average);
         this.collectionTotalPrev = Math.round(data.total_ta);
         this.collectionTotalGoal = data.goals; 
        
  if(this.collectionTotal >= this.collectionTotalPrev)
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
          this._cookieService.put("token", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
      }
    }, error => {
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
  this.clinic_id && this.cliniciananalysisService.DentistProductionSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => 
    {
       this.productionTotal = 0;
       this.productionTotalPrev = 0;
       this.productionTotalAverage=0;
       this.maxProductionGoal=0;
       if(data.message == 'success' ){
          this.buildChartDentistLoader =false;
          this.gaugeValue = 0;
          if(data.data != null ) {
            data.data.forEach((res)=>{
              if(res.production)
                this.gaugeValue = Math.round(res.production);

              this.gaugeLabel = res.provider_name;
              this.gaugeLabel = res.provider_name;
          });       
          this.productionTotal = Math.round(data.total);
          this.productionTotalPrev = Math.round(data.total_ta);
          this.productionTotalAverage= Math.round(data.total_average);
          this.productionGoal = data.goals;
          if (this.productionTotal > this.productionTotalPrev){
            this.productionTooltip = 'up';
          }
          if(this.gaugeValue > this.productionGoal)
            this.maxProductionGoal = this.gaugeValue;
          else
            this.maxProductionGoal = this.productionGoal;

          if (this.maxProductionGoal == 0)
            this.maxProductionGoal = '';
         } 
      } else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("token", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

// Dentist collection data
  public collectionDentistLoader:boolean = true;
  public gaugeCollectionLabel:any = '';
  public gaugeCollectionValue:any = 0;
  public collectionDentistTotal:any = 0;
  public collectionDentistTotalPrev:any = 0;
  public dentistCollectionGoal:any = 0;
  public maxCollectionGoal:any = 0;


  private collectionDentist() {
    this.collectionDentistLoader = true;
    this.gaugeCollectionLabel = '';
    this.collectionTooltip = 'down';
  this.clinic_id && this.cliniciananalysisService.DentistCollectionSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => 
    {
      this.collectionDentistTotal = 0;
      this.collectionDentistTotalPrev = 0;
      this.productionTotalAverage=0;
      this.maxCollectionGoal=0;
      this.gaugeCollectionValue = 0;
      this.collectionDentistLoader =false;
       if(data.message == 'success' ){
          if(data.data != null ) {
            data.data.forEach((res)=>{
              if(res.collection)
                this.gaugeCollectionValue = Math.round(res.collection);

              this.gaugeCollectionLabel = res.provider_name;
          });       
          this.collectionDentistTotal = Math.round(data.total);
          this.collectionDentistTotalPrev = Math.round(data.total_ta);
          this.productionTotalAverage= Math.round(data.total_average);
          this.dentistCollectionGoal = data.goals;
          if (this.productionTotal > this.productionTotalPrev){
            this.collectionTooltip = 'up';
          }
          if(this.gaugeCollectionValue > this.dentistCollectionGoal)
            this.maxCollectionGoal = this.gaugeValue;
          else
            this.maxCollectionGoal = this.dentistCollectionGoal;

          if (this.maxCollectionGoal == 0)
            this.maxCollectionGoal = '';
         } 
      } else if (data.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("token", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
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
      if (data.message == 'success') {
        this.recallPrebookLoader = false;

        this.recallChartTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.recall_percent > 0) {
            if (res.provider_name != null) {
              this.recallChartData1.push(Math.round(res.recall_percent));
              this.recallChartLabels1.push(res.provider_name);
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
            dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
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
        this._cookieService.put("token", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
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
  public barChartOptionsTPB: any = this.barChartOptionstrend;
  public prebook = 'recall';
  public treatmentPrebookLoader: boolean;
  public tpKey: any;
  public TPcolors: any;
  //All dentist Treatment Prebook Chart
  private treatmentPrePrebook() {

    this.treatmentPrebookLoader = true;
    this.treatmentPreChartData1 = [];
    this.treatmentPreChartLabels1 = [];

    this.treatmentPreChartLabels = [];
    this.barChartOptionsTPB.annotation = [];

   this.clinic_id && this.cliniciananalysisService.caReappointRate(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.treatmentPreChartData1 = [];
      this.treatmentPreChartLabels1 = [];

      this.treatmentPreChartLabels = [];
      this.barChartOptionsTPB.annotation = [];
      if (data.message == 'success') {
        this.treatmentPrebookLoader = false;
        this.treatmentPreChartTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.reappoint_rate > 0) {
            if (res.provider_name != null) {
              this.treatmentPreChartData1.push(Math.round(res.reappoint_rate));
              this.treatmentPreChartLabels1.push(res.provider_name);
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
        else
        {  
          this.TPcolors = this.lineChartColors;

          let dynamicColors = [];
          this.treatmentPreChartLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
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
      this.warningMessage = "Please Provide Valid Inputs!";
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    }
    );
  }
  public treatmentPrebookDentistLoader: boolean;

  //Individual Treatment Prebook Chart
  private treatmentPrePrebookDentist() {
    this.treatmentPrebookDentistLoader = true;
    this.treatmentPreValue = '0';
    this.treatmentPreLabel = '';
   this.clinic_id && this.cliniciananalysisService.caReappointRateSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data: any) => {
      if (data.message == 'success') {
        this.treatmentPrebookDentistLoader = false;
        this.treatmentPreGoal = data.goals;
        if (data.data.length > 0) {
          this.treatmentPreValue = Math.round(data.data[0].reappoint_rate);
          this.treatmentPreLabel = data.data[0].provider_name;
          
        }
      }
    }, error => {
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
  private treatmentPlanRate() {
    this.treatmentPlanRateLoader = true;
    this.treatmentChartData1 = [];
    this.treatmentChartLabels1 = [];

    this.treatmentChartLabels = [];
    this.barChartOptionsTP.annotation = []

   this.clinic_id && this.cliniciananalysisService.TreatmentPlanRate(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.treatmentChartData1 = [];
      this.treatmentChartLabels1 = [];

      this.treatmentChartLabels = [];
      this.barChartOptionsTP.annotation = []
      if (data.message == 'success') {
        this.treatmentPlanRateLoader = false;
        this.treatmentChartTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.treatment_per_plan_percentage) {
            this.treatmentChartData1.push(Math.round(res.treatment_per_plan_percentage));
            var name = res.provider_name;
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              this.treatmentChartLabels1.push(name);
              this.TPRKey = i;
            }
            else
              this.treatmentChartLabels1.push(res.provider_name);
            i++;
          }
        });
        this.treatmentChartData[0]['data'] = this.treatmentChartData1;
        this.treatmentChartLabels = this.treatmentChartLabels1;
        this.treatmentChartAverage = Math.round(data.total);
        this.treatmentChartAveragePrev = (data.total_ta)? Math.round(data.total_ta) : 0;
        this.treatmentChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            { backgroundColor: [] }
          ];
          this.barChartColors[0].backgroundColor[this.TPRKey] = '#1CA49F';
          this.TPRcolors = this.barChartColors;
        }
        else
        {
          this.TPRcolors = this.lineChartColors;

          let dynamicColors = [];
          this.treatmentChartLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
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
        this.treatmentPlanRateDentistLoader = false;
        this.treatmentPlanValue = '0';
        if (data.data.length > 0) {
          this.treatmentPlanValue = Math.round(data.data[0].treatment_per_plan_percentage);
          this.treatmentPlanLabel = data.data[0].provider_name;
        }
        this.treatmentPlanGoal = Math.round(data.goals);
        this.treatmentChartAveragePrev =  (data.total_ta ) ? Math.round(data.total_ta) : 0;
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
    hover: {mode: null},
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
            if (names.length>1) {
              return `${names[0][0]} ${names[1]}`
            } else return `${names[0]}`;
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
          return this.splitName(tooltipItem.xLabel).join(' ') + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
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
      this.barChartOptionsTC.annotation = [];
      if (data.message == 'success') {
        this.buildChartTreatmentLoader = false;
        this.planTotalTooltip = 'down';
        var ia = 0;
        this.treatmentPlanProposedProvidersByInx = [];
        data.data.plan_fee_all.forEach(res => {
          if (res.average_fees > 0) {
            if (res.provider_name != null) {
              this.planChartData1.push(Math.round(res.average_fees));
              this.planChartLabels1.push(res.provider_name);
              this.treatmentPlanProposedProvidersByInx.push(res.provider_name);
              if (res.provider_name != 'Anonymous')
                this.tpacAKey = ia;
              ia++;
            }
          }
        });
        this.planAllTotal = Math.round(data.total_all);
        this.planAllTotalTrend = Math.round(data.total_ta_all);

        var ic = 0;
        data.data.plan_fee_completed.forEach(res => {
          if (res.average_fees) {
            this.planChartData2.push(Math.round(res.average_fees));
            this.planChartLabels2.push(res.provider_name);
            this.treatmentPlanProposedProvidersByInx.push(res.provider_name);
            if (res.provider_name != 'Anonymous')
              this.tpacCKey = ic;
            ic++;
          }
        });
        this.planCompletedTotal = Math.round(data.total_completed);
        this.planCompletedTotalTrend = Math.round(data.total_ta_completed);
        let dynamicColors = [];
        this.planChartLabels1.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
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
            dynamicColors1.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.planChartDataP[0].backgroundColor = dynamicColors1;
         
          let dynamicColors2 = [];
          this.planChartLabels2.forEach((label, labelIndex) => {
            dynamicColors2.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
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
        this.buildChartTreatmentDentistLoader = false;
        this.gaugeValueTreatmentP = 0;
        this.gaugeValueTreatmentC = 0;
        this.gaugeValueTreatment =0;
        if(data.data != null) {
          if(data.data.plan_fee_completed[0] && data.data.plan_fee_completed[0].average_fees != undefined)
          this.gaugeValueTreatmentC=Math.round(data.data.plan_fee_completed[0].average_fees);
          if(data.data.plan_fee_all[0] && data.data.plan_fee_all[0].average_fees != undefined)
          this.gaugeValueTreatmentP = Math.round(data.data.plan_fee_all[0].average_fees);
           if(data.data.plan_fee_all[0] && data.data.plan_fee_all[0].provider_name != undefined)
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
  private buildChartNopatients() {
    this.buildChartNopatientsLoader = true;
    this.doughnutTotalPrev = 0;
    this.doughnutTotalAverage = 0;
    this.clinic_id && this.cliniciananalysisService.NoPatients(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      this.doughnutChartData1 = [];
      this.doughnutChartLabels1 = [];
      this.doughnutTotal = 0;
      this.doughnutChartLabels = [];
      if (data.message == 'success') {
        this.buildChartNopatientsLoader = false;
        this.doughnutTotalTooltip = 'up';
        var i = 0;
        data.data.forEach(res => {
          if (res.provider_name != null && res.num_complaints > 0) {
            this.doughnutChartData1.push(Math.round(res.num_complaints));
            this.doughnutChartLabels1.push(res.provider_name);
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
  private buildChartNewpatients() {
    this.newPatientChartData1 = [];
    this.newPatientChartLabels1 = [];
    this.newPatientTotal = 0;
    this.buildChartNewpatientsLoader = true;
    this.newPatientChartLabels = [];
    this.newPatientsDataMax = 0;

    this.clinic_id && this.cliniciananalysisService.NewPatients(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
      if (data && data.message == 'success') {
        this.buildChartNewpatientsLoader = false;
        this.newPatientTotalTooltip = 'down';
        var i = 0;
        this.newPatientChartLabels1 = []; // reset on api call
        this.newPatientChartData1 = []; // reset on api call
        data.data.forEach(res => {
          if (res.new_patients) {
            this.newPatientChartData1.push(parseInt(res.new_patients));
            this.newPatientChartLabels1.push(res.provider_name);
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
  public barChartOptionsHR: any = this.barChartOptions;
  public hourlyRateChartLoader: any;
  public hrKey: any;
  public HRcolors: any;
  //All dentist Hourly ratechart
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
      if (data.message == 'success') {
        this.hourlyRateChartLoader = false;
        this.hourlyRateChartTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.hourly_rate > 0) {
            this.hourlyRateChartData1.push(Math.round(res.hourly_rate));
            if (res.provider_name != null && res.provider_name != 'Anonymous') {
              if (res.provider_name.includes(',')) {
                let namet: any = res.provider_name.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider_name;
              }
              this.hourlyRateChartLabels1.push(name);
              this.hrKey = i;
            }
            else
              this.hourlyRateChartLabels1.push(res.provider_name);
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
        else
        {  
          this.HRcolors = this.lineChartColors;
          let dynamicColors = [];
          this.hourlyRateChartLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
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
        this.hourlyRateDentistLoader = false;
        this.hourlyValue = '0';
        if (data.data.length > 0) {
          this.hourlyValue = Math.round(data.data[0].hourly_rate);
          var name = data.data[0].provider_name;
          if (name != null) {
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
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


  // Get Dentist
  private getDentists() {
    this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
      if (res.message == 'success') {
        this.dentists = res.data;
        this.dentistCount = res.data.length;

      }
      else if (res.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("token", '');
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
    
    this.showTrendChart = false;
    this.toggleChecked = false;
    if (this.clinic_id != undefined && this.clinic_id != 'all') {
      $('.customRange').css('display', 'none');
      this.showTrendChart = false;
      var dentistVal;
      if ($('.internal_dentist').val())
        dentistVal = $('.internal_dentist').val();
      else
        dentistVal = $('.external_dentist').val();
      this.duration = duration;
      if (duration == 'w') {
        this.goalCount = 1;
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

        this.trendText = 'Last Month';
        this.currentText = 'This Month';

        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
        this.loadDentist(dentistVal);

      }
      else if (duration == 'lm') {
        this.goalCount = 1;

        this.trendText = 'Previous Month';
        this.currentText = 'Last Month';

        const date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() - 1, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 0), 'dd-MM-yyyy');

        this.loadDentist(dentistVal);

      }
      else if (duration == 'q') {
        this.goalCount = 3;

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

        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() -1, 0, 1), 'dd-MM-yyyy');       
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() -1, 11, 31), 'dd-MM-yyyy');
        this.goalCount = 12;
        this.loadDentist(dentistVal);
      }
      else if (duration == 'fytd') {
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
          this.goalCount =this.monthDiff(new Date(date.getFullYear() -1, 6, 1), new Date());
        } else {
          this.goalCount =this.monthDiff(new Date(date.getFullYear(), 6, 1), new Date());
        } 
        //var difMonths = new Date().getMonth() - new Date(date.getFullYear(), 6, 1).getMonth();
        //this.goalCount = Math.abs(difMonths + 1);
        this.loadDentist(dentistVal);
      }
      else if (duration == 'lfytd') {
        this.trendText = 'Previous Financial Year';
        this.currentText = 'Last Financial Year';
        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');
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
    this.loadDentist(val);
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
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_' + val).addClass('mat-button-toggle-checked');
    $('.filter').removeClass('active');
    this.Apirequest = 0;
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
    else if(val == 'off') {
       this.filterDate('m');
       this.toggleChecked = false;
       this.showTrendChart = false;
    }
  }
  toggleChecked = false;
  trendValue = '';
  isDisabled = true;
  isChecked = true;

  public dentistProdTrend: any[] = [
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

    public dentistColTrend: any[] = [
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
  public dentistProductionTrend1 = [];
  public dentistProductionTrendLabels = [];
  public dentistProductionTrendLabels1 = [];
  public dentistProductionTrendLoader: boolean;
  //Trend mode for dentist Production
  private dentistProductionTrend() {
    this.dentistProductionTrendLoader = true;


    var user_id;
    var clinic_id;
    this.clinic_id && this.cliniciananalysisService.caDentistProtectionTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.dentistProductionTrendLabels1 = [];
      this.dentistProductionTrend1 = [];
      this.dentistProductionTrendLabels = [];
      this.dentistProductionTrendLabels = [];
      let dynamicColors = [];
      this.Apirequest = this.Apirequest -1;
      if (data && data.message == 'success') {
        this.dentistProductionTrendLoader = false;
        if(data.data.total > 0){
          data.data.data.forEach(res => {
            if(res.production)
              this.dentistProductionTrend1.push(Math.round(res.production));
            if (this.trendValue == 'c')
              this.dentistProductionTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.dentistProductionTrendLabels1.push(res.year);
          });
          if(this.dentistProductionTrend1.every((value) => value == 0)) this.dentistProductionTrend1 = [];
          this.dentistProdTrend[0]['data'] = this.dentistProductionTrend1;
          
          this.dentistProductionTrendLabels1.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.dentistProdTrend[0].backgroundColor = dynamicColors;
  
          this.dentistProductionTrendLabels = this.dentistProductionTrendLabels1;
          if (this.dentistProductionTrendLabels.length <= 0) {
            this.gaugeValue = '0';
          }
        }else{
          this.dentistProductionTrendLabels = [];
        }
        
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }
// Collection Trend mode 
  public dentistCollectionTrend1:any = [];
  public dentistCollectionTrendLabels:any = [];
  public dentistCollectionTrendLoader:boolean = true;
  public dentistColleTrendLabels1:any = [];

  private dentistCollectionTrend() {
    this.dentistCollectionTrendLoader = true;    
    this.clinic_id && this.cliniciananalysisService.caDentistCollectionTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.dentistColleTrendLabels1 = [];      
      this.dentistCollectionTrend1 = [];
      this.dentistCollectionTrendLabels = [];
      this.dentistCollectionTrendLoader = false;
      let dynamicColors = [];   
      if (data && data.message == 'success') {
        if(data.data){
          data.data.forEach(res => {
            if(res.collection)
              this.dentistCollectionTrend1.push(Math.round(res.collection));
            if (this.trendValue == 'c')
              this.dentistColleTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.dentistColleTrendLabels1.push(res.year);
          });
          if(this.dentistCollectionTrend1.every((value) => value == 0)) this.dentistCollectionTrend1 = [];
          this.dentistColTrend[0]['data'] = this.dentistCollectionTrend1;
          
          this.dentistColleTrendLabels1.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.dentistColTrend[0].backgroundColor = dynamicColors;
          this.dentistCollectionTrendLabels = this.dentistColleTrendLabels1;          
        }else{
          this.dentistCollectionTrendLabels = [];
        }        
      }
    }, error => {
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
      this.Apirequest = this.Apirequest -1;
      if (data.message == 'success') {
        this.treatmentPlanTrendLoader = false;
        if (data.data) {
          if(data.data.plan_fee_all){
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
        
      if(data.data.plan_fee_completed){
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
        if(this.treatmentPlanTrend1.every((value) => value == 0)) this.treatmentPlanTrend1 = [];
        this.treatPlanTrend[0]['data'] = this.treatmentPlanTrend1;
        this.treatmentPlanTrendLabels = this.treatmentPlanTrendLabels1;

        let dynamicColors = [];
          this.treatmentPlanTrendLabels.forEach((label, labelIndex) => {
            dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
          }); // This is dynamic array for colors of bars        
          this.treatPlanTrend[0].backgroundColor = dynamicColors;
         

        if (this.treatmentPlanTrendLabels.length <= 0) {
          this.gaugeValueTreatment = 0;
        }
      }
    }, error => {
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
      this.Apirequest = this.Apirequest -1;
      if (data.message == 'success') {
       
        if (data.data) {
          data.data.forEach(res => {
            if(res.num_complaints)
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
          dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.patientComplaintTrend[0].backgroundColor = dynamicColors;
       

        if (this.patientComplaintsTrendLabels.length <= 0) {
          this.gaugeValuePatients = 0;
        }
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }



  public recallPrebookChartTrend: any[] = [
    {
      data: [], 
      label: '', 
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
    }];
  public recallPrebookChartTrend1 = [];
  public recallPrebookChartTrendLabels = [];
  public recallPrebookChartTrendLabels1 = [];
  public fdRecallPrebookRateTrendLoader: boolean;
  //Recall Prebook Rate Chart trend mode
  private fdRecallPrebookRateTrend() {
    this.fdRecallPrebookRateTrendLoader = true;
    this.recallPrebookChartTrendLabels = [];

    var user_id;
    var clinic_id;
    this.cliniciananalysisService.cpRecallPrebookRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.Apirequest = this.Apirequest -1;
      if (data.message == 'success') {
        this.fdRecallPrebookRateTrendLoader = false;
        this.recallPrebookChartTrendLabels1 = [];
        this.recallPrebookChartTrend1 = [];
        data.data.forEach(res => {
          this.recallPrebookChartTrend1.push(Math.round(res.recall_percent));
          if (this.trendValue == 'c')
            this.recallPrebookChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
          else
            this.recallPrebookChartTrendLabels1.push(res.year);

        });
        this.recallPrebookChartTrend[0]['data'] = this.recallPrebookChartTrend1;

        this.recallPrebookChartTrendLabels = this.recallPrebookChartTrendLabels1;
        let dynamicColors = [];
        this.recallPrebookChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.recallPrebookChartTrend[0].backgroundColor = dynamicColors;
       

      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }


  public treatmentPrebookChartTrend: any[] = [
    {
      data: [], 
      label: '', 
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
    }];
  public treatmentPrebookChartTrend1 = [];
  public treatmentPrebookChartTrendLabels = [];
  public treatmentPrebookChartTrendLabels1 = [];
  public fdTreatmentPrebookRateTrendLoader: any;
  //Trend Mode for Treatment Prebook RAte
  private fdTreatmentPrebookRateTrend() {
    this.fdTreatmentPrebookRateTrendLoader = true;
    this.treatmentPrebookChartTrendLabels = [];

    var user_id;
    var clinic_id;
    this.cliniciananalysisService.caReappointRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.Apirequest = this.Apirequest -1;
      if (data.message == 'success') {
        this.fdTreatmentPrebookRateTrendLoader = false;
        this.treatmentPrebookChartTrendLabels1 = [];
        this.treatmentPrebookChartTrend1 = [];
        data.data.forEach(res => {
          this.treatmentPrebookChartTrend1.push(Math.round(res.reappoint_rate));
          if (this.trendValue == 'c')
            this.treatmentPrebookChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
          else
            this.treatmentPrebookChartTrendLabels1.push(res.year);

        });
        this.treatmentPrebookChartTrend[0]['data'] = this.treatmentPrebookChartTrend1;

        this.treatmentPrebookChartTrendLabels = this.treatmentPrebookChartTrendLabels1;

        let dynamicColors = [];
        this.treatmentPrebookChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.treatmentPrebookChartTrend[0].backgroundColor = dynamicColors;
        
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }



  public hourlyRateChartTrend: any[] = [
    {
      data: [], 
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
    }];
  public hourlyRateChartTrend1 = [];
  public hourlyRateChartTrendLabels = [];
  public hourlyRateChartTrendLabels1 = [];
  public fdhourlyRateRateTrendLoader: any;
  //Trend Mode for Hourly Rate chart
  private fdhourlyRateRateTrend() {
    this.fdhourlyRateRateTrendLoader = true;
    var user_id;
    var clinic_id;
    this.clinic_id && this.cliniciananalysisService.cahourlyRateRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.hourlyRateChartTrendLabels = [];
      this.Apirequest = this.Apirequest -1;
      if (data.message == 'success') {
        this.fdhourlyRateRateTrendLoader = false;
        this.hourlyRateChartTrendLabels1 = [];
        this.hourlyRateChartTrend1 = [];
        data.data.forEach(res => {
          if (res.hourly_rate >= 0) {
              this.hourlyRateChartTrend1.push(Math.round(res.hourly_rate));
            if (this.trendValue == 'c')
              this.hourlyRateChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
            else
              this.hourlyRateChartTrendLabels1.push(res.year);
          }
        });
        this.hourlyRateChartTrend[0]['data'] = this.hourlyRateChartTrend1;
        this.hourlyRateChartTrendLabels = this.hourlyRateChartTrendLabels1;

        let dynamicColors = [];
        this.hourlyRateChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.hourlyRateChartTrend[0].backgroundColor = dynamicColors;
       
        if (this.hourlyRateChartTrendLabels.length <= 0) {
          this.hourlyValue = 0;
        }
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }


  public newPatientsChartTrend: any[] = [
    {
      data: [], 
      label: '', 
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
  public newPatientsChartTrend1 = [];
  public newPatientsChartTrendLabels = [];
  public newPatientsChartTrendLabels1 = [];
  public fdnewPatientsRateTrendLoader: any;
  //Trend Mode for New Patient 
  private fdnewPatientsRateTrend() {
    this.fdnewPatientsRateTrendLoader = true;
    this.newPatientsChartTrendLabels = [];

    var user_id;
    var clinic_id;
    this.clinic_id && this.cliniciananalysisService.canewPatientsRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.Apirequest = this.Apirequest -1;
      if (data != null && data.message == 'success') {
        this.fdnewPatientsRateTrendLoader = false;
        this.newPatientsChartTrendLabels1 = [];
        this.newPatientsChartTrend1 = [];
        data.data.forEach(res => {
          if (res.new_patients)
            this.newPatientsChartTrend1.push(Math.round(res.new_patients));
          else
            this.newPatientsChartTrend1.push(0);

          if (this.trendValue == 'c')
            this.newPatientsChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
          else
            this.newPatientsChartTrendLabels1.push(res.year);

        });
        this.newPatientsChartTrend[0]['data'] = this.newPatientsChartTrend1;

        this.newPatientsChartTrendLabels = this.newPatientsChartTrendLabels1;
        let dynamicColors = [];
        this.newPatientsChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.newPatientsChartTrend[0].backgroundColor = dynamicColors;      

        if (this.newPatientsChartTrendLabels.length <= 0) {
          this.newPatientPercent = 0;

        }
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  public treatmentPlanChartTrend: any[] = [
    {
      data: [], 
      label: '', 
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
    }];
  public treatmentPlanChartTrend1 = [];
  public treatmentPlanChartTrendLabels = [];
  public treatmentPlanChartTrendLabels1 = [];
  public fdtreatmentPlanRateTrendLoader: any;
  //Trend Mode for Treatment plan Rate chart
  private fdtreatmentPlanRateTrend() {
    this.fdtreatmentPlanRateTrendLoader = true;
    this.treatmentPlanChartTrendLabels = [];

    var user_id;
    var clinic_id;
    this.clinic_id && this.cliniciananalysisService.catreatmentPlanRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data: any) => {
      this.fdtreatmentPlanRateTrendLoader = false;
      this.Apirequest = this.Apirequest -1;
      if (data.message == 'success') {
      
        this.treatmentPlanChartTrendLabels1 = [];
        this.treatmentPlanChartTrend1 = [];
        if (data.data) {
          data.data.forEach(res => {
            if (res.treatment_per_plan_percentage) {
              if(res.treatment_per_plan_percentage)
                this.treatmentPlanChartTrend1.push(Math.round(res.treatment_per_plan_percentage));
              if (this.trendValue == 'c')
                this.treatmentPlanChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              else
                this.treatmentPlanChartTrendLabels1.push(res.year);
            }
          });
        }
        var sumpercantagevalue = this.treatmentPlanChartTrend1.reduce((acc, cur) => acc + cur, 0);
        if(sumpercantagevalue > 0){
        
        this.treatmentPlanChartTrend[0]['data'] = this.treatmentPlanChartTrend1;

        this.treatmentPlanChartTrendLabels = this.treatmentPlanChartTrendLabels1;

        let dynamicColors = [];
        this.treatmentPlanChartTrendLabels.forEach((label, labelIndex) => {
          dynamicColors.push(labelIndex%2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
        }); // This is dynamic array for colors of bars        
        this.treatmentPlanChartTrend[0].backgroundColor = dynamicColors;
       }else{
        this.treatmentPlanChartTrendLabels = [];
       }

      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  toggleChangeProcess() {
    if (this.toggleChecked) {
      this.Apirequest = 8;
      $('.filter').removeClass('active');
      this.dentistProductionTrend();
      this.dentistCollectionTrend();      
      this.treatmentPlanTrend();
      this.patientComplaintsTrend();
      this.fdRecallPrebookRateTrend();
      this.fdTreatmentPrebookRateTrend();
      this.fdnewPatientsRateTrend();
      this.fdhourlyRateRateTrend();
      this.fdtreatmentPlanRateTrend();
      this.changeTreatmentCostSingle('1');
      this.changePrebookRate('recall');
    }
  }
  goalToggle(val) {
    this.goalchecked = val;
    this.buildChart();
    this.collectionChart();
    this.buildChartTreatment();
    this.recallPrebook();
    this.treatmentPrePrebook();
    this.hourlyRateChart();
    this.treatmentPlanRate();

  }
  changePrebookRate(val) {
    $('.prebook_rate .sa_tab_btn').removeClass('active');
    this.prebook = val;
    $('.prebook_rate .pr_' + val).addClass('active');
  }

  getNameInitials(name: string) {
    const initials = name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
    return initials.join('');
  }

  toggleCompareFilter(val){
      if( (this.averageToggle == true && val == 'on') || (this.averageToggle == false && val != 'on') ){
        return false;
      }
      $('.compare-button').click();
     if(val == 'on'){
      this.averageToggle = true;
      this.showTrend = false;
     }  else {
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

  changeProduction(val){
    this.proCollShow = parseInt(val);
  }
}

