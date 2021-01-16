import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ClinicianAnalysisService } from './cliniciananalysis.service';
import { DentistService } from '../../dentist/dentist.service';
import { FrontDeskService } from '../frontdesk/frontdesk.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import 'chartjs-plugin-style';
import { HeaderService } from '../../layouts/full/header/header.service';
import { CookieService } from "angular2-cookie/core";
import { BaseChartDirective, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { ChartService } from '../chart.service';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
export interface Dentist {
  providerId: string;
  name: string;
}
@Component({
  templateUrl: './cliniciananalysis.component.html',
  styleUrls: ['./cliniciananalysis.component.scss']
})
/**
  *Clinician analysis graph Dashboard
  *AUTHOR - Teq Mavens
  */
export class ClinicianAnalysisComponent implements AfterViewInit {

  @ViewChild("myCanvas") canvas: ElementRef;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  lineChartColors;
  subtitle: string;
  public id: any = {};
  public clinic_id: any = {};
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
  public childid: string = '';
  public user_type: string = '';
  public flag = false;
  private _routerSub = Subscription.EMPTY;
  newPatientPluginObservable$: Observable<PluginServiceGlobalRegistrationAndOptions[]>;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  newPatientTotalAverage$ = new BehaviorSubject<number>(0);

  chartData1 = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels1 = ['January', 'February', 'Mars', 'April'];
  private dentistProductionLabelsByIndex = [];
  private treatmentPlanProposedProvidersByInx = [];

  constructor(
    private cliniciananalysisService: ClinicianAnalysisService,
    private dentistService: DentistService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private _cookieService: CookieService,
    private router: Router,
    public ngxSmartModalService: NgxSmartModalService,
    private frontdeskService: FrontDeskService,
    private toastr: ToastrService,
    private decimalPipe: DecimalPipe,
    private chartService: ChartService
  ) {
    this._routerSub = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((value) => {
        this.user_type = this._cookieService.get("user_type");
        if (this._cookieService.get("childid"))
          this.childid = this._cookieService.get("childid");
      });
  }
  /**
  *Check If logged in user is eligible to access this page.
  *AUTHOR - Teq Mavens
  */
  private warningMessage: string;
  private checkPermission(role) {
    this.headerService.checkPermission(role).subscribe((res) => {

      if (res.message == 'success') {
      }
      else if (res.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
        this._cookieService.put("token", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      //    $('.ajax-loader').hide(); 
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    }
    );
  }

  private getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //initialize component
  ngAfterViewInit() {
    this.newPatientPluginObservable$ = this.newPatientTotalAverage$.pipe(
      takeUntil(this.destroyed$),
      map((count) => {
        return this.chartService.beforeDrawChart(count)
      })
    );

    $('#currentDentist').attr('did', 'all');

    // this.clinic_id = this.route.snapshot.paramMap.get("id");
    //  this.getDentists();
    // this.changeLoginStatus();
    this.checkPermission('dashboard1');
    this.initiate_clinic();
    this.user_type = this._cookieService.get("user_type");
    if (this._cookieService.get("childid"))
      this.childid = this._cookieService.get("childid");
    //   $('.external_dentist').val('all');
    $('#title').html('<span> Clinician Analysis </span> <span class="page-title-date">' + this.myDateParser(this.startDate) + '-' + this.myDateParser(this.endDate) + '</span>');
    $('.external_clinic').show();
    $('.dentist_dropdown').show();
    $('.header_filters').removeClass('flex_direct_mar');
    $('.header_filters').removeClass('hide_header');
    if (this.childid != '') {
      $('.dentist_dropdown').hide();
      $('.header_filters').addClass('flex_direct_mar');
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

    //this.canvas = (<HTMLElement>document.getElementById('#'))

    // let gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0,0,0,400);
    // gradient.addColorStop(0, 'rgba(22, 82, 141, 0.8)');
    // gradient.addColorStop(1, 'rgba(12, 209,169,0.9)');
    // let gradient1 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    // gradient1.addColorStop(1, 'rgba(12, 209,169,0.8)');
    // gradient1.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    // let gradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    // gradient2.addColorStop(1, 'rgba(59, 227,193,0.8');
    // gradient2.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    // let gradient3 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    // gradient3.addColorStop(1, 'rgba(94, 232,205,0.8)');
    // gradient3.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    // let gradient4 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    // gradient4.addColorStop(1, 'rgba(148, 240,221,0.8)');
    // gradient4.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    // let gradient5 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    // gradient5.addColorStop(1, 'rgba(201, 247,238,0.8)');
    // gradient5.addColorStop(0, 'rgba(22, 82, 141, 0.9)');


    // this.lineChartColors = [
    //   {
    //     backgroundColor: gradient1,
    //     hoverBorderWidth: 2,
    //     hoverBorderColor: '#1CA49F'
    //   },
    //   {
    //     backgroundColor: gradient2,
    //     hoverBorderWidth: 2,
    //     hoverBorderColor: '#1CA49F'
    //   }
    // ];

    // let doughnutGradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    // doughnutGradient.addColorStop(0, 'rgba(104, 255, 249, 1)');
    // doughnutGradient.addColorStop(1, 'rgba(28, 164, 159, 1)');
    // let doughnutGradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    // doughnutGradient2.addColorStop(1, '#4FC1D1');
    // doughnutGradient2.addColorStop(0, '#BFE8EE');
    this.doughnutChartColors = [
      {
        backgroundColor: [
          '#6cd8ba',
          '#b0fffa',
          '#abb3ff',
          '#feefb8',
          '#ffb4b5',
          '#fffcac',
          '#d7f8ef'
        ]
      }];
  }

  //Load Clinic Data
  initiate_clinic() {
    var val = $('#currentClinic').attr('cid');
    if (val != undefined && val != 'all') {
      this.clinic_id = val;
      this.getDentists();
      this.filterDate('m');
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
  /*  public recallChartData: any[] = [
      {data: [50,30,20], label: 'Recall Rate'},
      {data: [50,30,20], label: 'Rebook Rate'}  
    ];  */
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
  public gaugeLabelTreatment = "";

  public gaugeValuePatients = 0;
  public gaugeLabelPatients = "";

  public newPatientValuePatients: string = '0 New Patients';
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
            return `${names[0][0]} ${names[1]}`;
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
            return `${names[0][0]} ${names[1]}`;
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
        padding: 20
      },
      onClick: function (e) {
        e.stopPropagation();
      }
    },
    elements: {
      center: {
        text: '',
        // sidePadding: 60
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
    this.cliniciananalysisService.changeLoginStatus().subscribe((data) => {
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
  if(newValue =='')
    newValue='all';
  $('#title').html('<span> Clinician Analysis </span> <span class="page-title-date">' + this.myDateParser(this.startDate) + '-' + this.myDateParser(this.endDate) + '</span>');
  //this.getAccountingDentist();
  //this.getStatusDentist();
  this.changePrebookRate('recall');
   if( this._cookieService.get("childid"))
         this.childid = this._cookieService.get("childid");
  if(newValue == 'all') {
      this.dentistVal='all';
      this.showTrend= false;
      this.toggleChecked= false;
      this.showTrendChart=false;
      this.buildChart();
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
    this.cliniciananalysisService.getAccountingDentist(this.clinic_id).subscribe((data) => {
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
    this.cliniciananalysisService.getStatusDentist(this.clinic_id).subscribe((data) => {
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
    this.cliniciananalysisService.saveDentistMapping(myJsonString, this.clinic_id).subscribe((res) => {
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
    if (val == '1') {
      if (this.toggleChecked)
        this.treatPlanTrend[0]['data'] = this.treatmentPlanTrend1;
      else {
        this.gaugeValueTreatment = Math.floor(this.gaugeValueTreatmentP);
        this.planTotalPrev = this.planAllTotalTrend;
        this.planTotal = this.planTotalAll;
      }
    }
    else {
      if (this.toggleChecked)
        this.treatPlanTrend[0]['data'] = this.treatmentPlanTrend2;
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
  public buildChartLoader: any;
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
    this.cliniciananalysisService.DentistProduction(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data) => {
      this.barChartData1 = [];
      this.barChartLabels1 = [];
      this.barChartLabels = [];
      this.productionTotal = 0;
      console.log('data.data', data.data);
      if (data.message == 'success') {
        this.buildChartLoader = false;
        this.productionTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.total > 0) {
            this.barChartData1.push(Math.round(res.total));
            var name = res.name;
            if (res.name != null && res.name != 'Anonymous') {
              this.barChartLabels1.push(res.name);
              this.dentistKey = i;
            }
            else {
              this.barChartLabels1.push(res.firstname);
            }

            if (res.total != null)
              this.productionTotal = this.productionTotal + parseFloat(res.total);
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
        ];
        this.barChartData[0].backgroundColor = colors;
         this.barChartLabels = this.barChartLabels1;
         this.productionTotalAverage =Math.round(data.total_average);
         this.productionTotalPrev =Math.round(data.total_ta);
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

  public buildChartDentistLoader: any;
  public maxProductionGoal: any = 0;
  //Individual Dentist Production Chart
  private buildChartDentist() {
    this.buildChartDentistLoader = true;
    this.gaugeLabel = '';
    this.productionTooltip = 'down';
    this.cliniciananalysisService.DentistProductionSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      //this.barChartOptionsDP.annotation = [];
      this.productionTotal = 0;
       this.productionTotalPrev = 0;
       this.productionTotalAverage=0;
       this.maxProductionGoal=0;
       if(data.message == 'success' ){
        this.buildChartDentistLoader =false;
         this.gaugeValue = 0;
        if(data.data != null ) {
          if(data.data.total)
          this.gaugeValue = Math.round(data.data.total);
          this.gaugeLabel = data.data.name;
          var name = data.data.name;
          if(name != null) {
           this.gaugeLabel = name;
         }
           else
           this.gaugeLabel =  data.data.firstname;
           if(data.data.total)
          this.productionTotal = Math.round(data.data.total);
         }
          this.productionTotalPrev = Math.round(data.total_ta);
          this.productionTotalAverage= Math.round(data.total_average);
          this.productionGoal = data.goals;

          if (this.productionTotal > this.productionTotalPrev){
            this.productionTooltip = 'up';
          }

        if(this.gaugeValue > this.productionGoal)
          this.maxProductionGoal= this.gaugeValue;
        else
          this.maxProductionGoal = this.productionGoal;
        if (this.maxProductionGoal == 0)
          this.maxProductionGoal = '';
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
  public recallPrebookLoader: any;
  public rpKey: any;
  public RPcolors: any;
  private recallPrebook() {
    this.recallPrebookLoader = true;
    this.recallChartData1 = [];
    this.recallChartLabels1 = [];
    this.recallChartLabels = [];
    this.barChartOptionsRP.annotation = [];

    this.cliniciananalysisService.RecallPrebook(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data) => {
      this.recallChartData1 = [];
      this.recallChartLabels1 = [];

      this.recallChartLabels = [];
      this.barChartOptionsRP.annotation = [];
      if (data.message == 'success') {
        this.recallPrebookLoader = false;

        this.recallChartTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.percent > 0) {
            if (res.provider != null) {
              this.recallChartData1.push(Math.round(res.percent));
              this.recallChartLabels1.push(res.provider);
              if (res.provider != 'Anonymous')
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
        else
          this.RPcolors = this.lineChartColors;

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
  public recallPrebookDentistLoader: any;
  public maxrecallGoal: any = 0;
  //Individual Dentist Production Chart
  private recallPrebookDentist() {
    this.recallPrebookDentistLoader = true;
    this.recallValue = 0;
    this.recallChartTooltip = 'down';
    this.recallLabel = '';
    this.cliniciananalysisService.RecallPrebookSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      this.maxrecallGoal = 0;

      if (data.message == 'success') {
        this.recallPrebookDentistLoader = false;
        this.recallValue = '0';
        if (data.data.length > 0) {
          this.recallValue = Math.round(data.data[0].percent);
          this.recallLabel = data.data[0].provider;

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
  public treatmentPrebookLoader: any;
  public tpKey: any;
  public TPcolors: any;
  //All dentist Treatment Prebook Chart
  private treatmentPrePrebook() {

    this.treatmentPrebookLoader = true;
    this.treatmentPreChartData1 = [];
    this.treatmentPreChartLabels1 = [];

    this.treatmentPreChartLabels = [];
    this.barChartOptionsTPB.annotation = [];

    this.cliniciananalysisService.treatmentPrePrebook(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data) => {
      this.treatmentPreChartData1 = [];
      this.treatmentPreChartLabels1 = [];

      this.treatmentPreChartLabels = [];
      this.barChartOptionsTPB.annotation = [];
      if (data.message == 'success') {
        this.treatmentPrebookLoader = false;
        this.treatmentPreChartTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.percent > 0) {
            if (res.provider != null) {
              this.treatmentPreChartData1.push(Math.round(res.percent));
              this.treatmentPreChartLabels1.push(res.provider);
              if (res.provider != 'Anonymous')
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
          this.TPcolors = this.lineChartColors;
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
  public treatmentPrebookDentistLoader: any;

  //Individual Treatment Prebook Chart
  private treatmentPrePrebookDentist() {
    this.treatmentPrebookDentistLoader = true;
    this.treatmentPreValue = '0';
    this.treatmentPreLabel = '';
    this.cliniciananalysisService.treatmentPrePrebookSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      if (data.message == 'success') {
        this.treatmentPrebookDentistLoader = false;
        if (data.data.length > 0) {
          this.treatmentPreValue = Math.round(data.data[0].percent);
          this.treatmentPreLabel = data.data[0].provider;
          this.treatmentPreGoal = data.goals;
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
  public treatmentPlanRateLoader: any;
  public TPRKey: any;
  public TPRcolors: any;
  //Treatment pLAn Rate chart for all dentists
  private treatmentPlanRate() {
    this.treatmentPlanRateLoader = true;
    this.treatmentChartData1 = [];
    this.treatmentChartLabels1 = [];

    this.treatmentChartLabels = [];
    this.barChartOptionsTP.annotation = []

    this.cliniciananalysisService.TreatmentPlanRate(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data) => {
      this.treatmentChartData1 = [];
      this.treatmentChartLabels1 = [];

      this.treatmentChartLabels = [];
      this.barChartOptionsTP.annotation = []
      if (data.message == 'success') {
        this.treatmentPlanRateLoader = false;
        this.treatmentChartTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.percent) {
            this.treatmentChartData1.push(Math.round(res.percent));
            var name = res.provider;
            if (res.provider != null && res.provider != 'Anonymous') {
              name = res.provider.split(',');
              /*if(name.length>0)
                name =name[1]+ " "+ name[0];*/
              this.treatmentChartLabels1.push(name);
              this.TPRKey = i;
            }
            else
              this.treatmentChartLabels1.push(res.provider);
            i++;
          }
        });
        this.treatmentChartData[0]['data'] = this.treatmentChartData1;
        this.treatmentChartLabels = this.treatmentChartLabels1;
        this.treatmentChartAverage = Math.round(data.total);
        this.treatmentChartAveragePrev = Math.round(data.total_ta);
        this.treatmentChartGoal = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            { backgroundColor: [] }
          ];
          this.barChartColors[0].backgroundColor[this.TPRKey] = '#1CA49F';
          this.TPRcolors = this.barChartColors;
        }
        else
          this.TPRcolors = this.lineChartColors;
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
    this.cliniciananalysisService.TreatmentPlanRateSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      if (data.message == 'success') {
        this.treatmentPlanRateDentistLoader = false;
        this.treatmentPlanValue = '0';
        if (data.data.length > 0) {
          this.treatmentPlanValue = Math.round(data.data[0].percent);
          this.treatmentPlanLabel = data.data[0].provider;
        }
        this.treatmentPlanGoal = Math.round(data.goals);
        this.treatmentChartAveragePrev = Math.round(data.total_ta);
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
            return `${names[0][0]} ${names[1]}`;
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
  public buildChartTreatmentLoader: any;
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
    this.cliniciananalysisService.TreatmentPlan(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data) => {
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
          if (res.average_cost_all > 0) {
            if (res.provider != null) {
              this.planChartData1.push(Math.round(res.average_cost_all));
              this.planChartLabels1.push(res.provider);
              this.treatmentPlanProposedProvidersByInx.push(res.provider);
              if (res.provider != 'Anonymous')
                this.tpacAKey = ia;
              ia++;
            }
          }
        });
        this.planAllTotal = Math.round(data.total_all);
        this.planAllTotalTrend = Math.round(data.total_ta_all);

        var ic = 0;
        data.data.plan_fee_completed.forEach(res => {
          if (res.average_cost_completed) {
            this.planChartData2.push(Math.round(res.average_cost_completed));
            this.planChartLabels2.push(res.provider);
            this.treatmentPlanProposedProvidersByInx.push(res.provider);
            if (res.provider != 'Anonymous')
              this.tpacCKey = ic;
            ic++;
          }
        });
        this.planCompletedTotal = Math.round(data.total_completed);
        this.planCompletedTotalTrend = Math.round(data.total_ta_completed);


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
  public buildChartTreatmentDentistLoader: any;

  //Individual Treatment Plan Average Cost
  private buildChartTreatmentDentist() {
    $('.treatmentPlanSingle .treatment_cost .sa_tab_btn').removeClass('active');
    $('.treatmentPlanSingle .tcmain1').addClass('active');
    this.buildChartTreatmentDentistLoader = true;


    this.cliniciananalysisService.TreatmentPlanDentist(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      this.gaugeValueTreatment = 0;
      if (data.message == 'success') {
        this.buildChartTreatmentDentistLoader = false;
        this.gaugeValueTreatmentP = 0;
        this.gaugeValueTreatmentC = 0;
        this.gaugeValueTreatment = 0;
        if (data.data != null) {
          if (data.data.plan_fee_completed[0] && data.data.plan_fee_completed[0].average_cost_completed != undefined)
            this.gaugeValueTreatmentC = Math.round(data.data.plan_fee_completed[0].average_cost_completed);
          if (data.data.plan_fee_all[0] && data.data.plan_fee_all[0].average_cost_all != undefined)
            this.gaugeValueTreatmentP = Math.round(data.data.plan_fee_all[0].average_cost_all);
          this.gaugeLabelTreatment = (data.data.plan_fee_all[0] && data.data.plan_fee_all[0].provider || "");
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
    this.cliniciananalysisService.RecallPrebook(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
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
  public buildChartNopatientsLoader: any;
  public npKey: any;
  public npColors: any;
  public doughnutChartColors1: any;
  //No of patient Complaints chart for all dentists
  private buildChartNopatients() {
    this.buildChartNopatientsLoader = true;
    this.doughnutTotalPrev = 0;
    this.doughnutTotalAverage = 0;
    this.cliniciananalysisService.NoPatients(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data) => {
      this.doughnutChartData1 = [];
      this.doughnutChartLabels1 = [];
      this.doughnutTotal = 0;
      this.doughnutChartLabels = [];
      if (data.message == 'success') {
        this.buildChartNopatientsLoader = false;
        this.doughnutTotalTooltip = 'up';
        var i = 0;
        data.data.forEach(res => {
          if (res.provider != null && res.treat_item > 0) {
            this.doughnutChartData1.push(Math.round(res.treat_item));
            this.doughnutChartLabels1.push(res.provider);
            this.doughnutTotal = this.doughnutTotal + parseInt(res.treat_item);
            if (res.provider != 'Anonymous')
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

  public buildChartNopatientsDentistLoader: any;
  public maxdoughnutGoals: any = 0;
  //Indvidual No pf patients complaint chart
  private buildChartNopatientsDentist() {
    this.buildChartNopatientsDentistLoader = true;
    this.gaugeLabelPatients = '';
    this.cliniciananalysisService.NoPatientsDentist(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      this.doughnutTotal = 0;
      this.maxdoughnutGoals = 0;
      if (data.message == 'success') {
        this.doughnutTotalTooltip = 'up';
        this.buildChartNopatientsDentistLoader = false;
        if (data.data != null) {
          this.gaugeValuePatients = data.data.treat_item;
          this.gaugeLabelPatients = data.data.provider;
          this.doughnutTotal = data.data.treat_item;

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

    this.cliniciananalysisService.NewPatients(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data) => {
      if (data.message == 'success') {
        this.buildChartNewpatientsLoader = false;
        this.newPatientTotalTooltip = 'down';
        var i = 0;
        console.log('\n data : ', data);

        data.data.forEach(res => {
          console.log('\n res : ', res);

          if (res.getX) {
            this.newPatientChartData1.push(parseInt(res.getX));
            this.newPatientChartLabels1.push(res.provider);
            if (res.provider != 'Anonymous')
              this.newpKey = i;
            i++;
          }
        });

        console.log('\n this.newPatientChartData1 : ', this.newPatientChartData1);
        console.log('\n this.newPatDientChartLabels : ', this.newPatientChartLabels1);
        this.newPatientChartData = this.newPatientChartData1;
        this.newPatientChartLabels = this.newPatientChartLabels1;

        this.newPatientTotalAverage = data.total;
        this.newPatientTotalAverage$.next(data.total);
        // this.doughnutChartOptions.elements.center.text = this.newPatientTotalAverage;
        this.newPatientTotalPrev = data.total_ta;
        this.newPatientGoals = data.goals;
        if (this.user_type == '4' && this.childid != '') {
          this.doughnutChartColors2 = [{ backgroundColor: [] }];

          this.doughnutChartColors2[0].backgroundColor[this.newpKey] = '#1CA49F';
          this.newpColors = this.doughnutChartColors2;
        }
        else
          this.newpColors = this.doughnutChartColors;
        if (this.newPatientTotalAverage >= this.newPatientTotalPrev)
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

    this.cliniciananalysisService.NewPatientsDentist(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      if (data.message == 'success') {
        this.buildChartNewpatientsDentistLoader = false;
        if (data.data != null && data.data[0] && data.data[0].getX != undefined) {
          this.newPatientValuePatients = data.data[0].getX + ' New Patients';
          this.newPatientLabelPatients = data.data[0].provider;
          if (data.data[0].percent)
            this.newPatientPercent = Math.round(data.data[0].percent);
          this.newPatientTotalAverage = Math.round(data.total);
          this.newPatientTotalAverage$.next(this.newPatientTotalAverage);
          this.newPatientTotalPrev = Math.round(data.total_ta);
        }
        else {
          this.newPatientValuePatients = 0 + ' New Patients';
          this.newPatientLabelPatients = "";
          this.newPatientTotalPrev = 0;
          this.newPatientTotalAverage = 0;
          this.newPatientTotalAverage$.next(0);
        }
        // this.doughnutChartOptions.elements.center.text = this.newPatientTotalAverage;
        this.newPatientGoals = data.goals;
        if (this.newPatientPercent > this.newPatientGoals)
          this.maxnewPatientGoal = this.newPatientPercent;
        else
          this.maxnewPatientGoal = this.newPatientGoals;

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
    this.cliniciananalysisService.hourlyRateChart(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data) => {
      this.hourlyRateChartData1 = [];
      this.hourlyRateChartLabels1 = [];

      this.hourlyRateChartLabels = [];
      this.barChartOptionsHR.annotation = [];
      if (data.message == 'success') {
        this.hourlyRateChartLoader = false;
        this.hourlyRateChartTooltip = 'down';
        var i = 0;
        data.data.forEach(res => {
          if (res.hourlyRate) {

            this.hourlyRateChartData1.push(Math.round(res.hourlyRate));

            if (res.provider != null && res.provider != 'Anonymous') {
              if (res.provider.includes(',')) {
                let namet: any = res.provider.split(',');
                var name: any = namet[1] + " " + namet[0];
              } else {
                var name: any = res.provider;
              }
              this.hourlyRateChartLabels1.push(name);
              this.hrKey = i;
            }
            else
              this.hourlyRateChartLabels1.push(res.provider);
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
          this.HRcolors = this.lineChartColors;

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
    this.cliniciananalysisService.hourlyRateSingle(this.selectedDentist, this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      this.hourlyValue = '0';
      if (data.message == 'success') {
        this.hourlyRateDentistLoader = false;
        this.hourlyValue = '0';
        if (data.data.length > 0) {
          this.hourlyValue = Math.round(data.data[0].hourlyRate);
          var name = data.data[0].provider;
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
        console.log(this.startDate + " " + this.endDate);

        this.loadDentist(dentistVal);

      }
      else if (duration == 'lm') {
        this.goalCount = 1;

        this.trendText = 'Previous Month';
        this.currentText = 'Last Month';

        const date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() - 1, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 0), 'dd-MM-yyyy');
        console.log(this.startDate + " " + this.endDate);

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
          1
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
        console.log(this.startDate);

        this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
        var difMonths = new Date().getMonth() - new Date(date.getFullYear(), 0, 1).getMonth();
        this.goalCount = difMonths + 1;
        this.loadDentist(dentistVal);
      }
      else if (duration == 'fytd') {
        this.trendText = 'Last Financial Year';
        this.currentText = 'This Financial Year';

        var date = new Date();
        if ((date.getMonth() + 1) <= 3) {
          this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 6, 1), 'dd-MM-yyyy');
        } else {
          this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 6, 1), 'dd-MM-yyyy');
        }

        this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
        var difMonths = new Date().getMonth() - new Date(date.getFullYear(), 6, 1).getMonth();
        this.goalCount = Math.abs(difMonths + 1);
        this.loadDentist(dentistVal);
      }
      else if (duration == 'custom') {
        this.trendText = '';
        this.currentText = '';
        $('.customRange').css('display', 'block');
        this.loadDentist(dentistVal);
      }
      $('.filter').removeClass('active');
      $('.filter_' + duration).addClass("active");
      // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
    }
  }
  //Load Individual dentits Chart
  initiate_dentist() {
    var val = $('.internal_dentist').val();
    this.loadDentist(val);
  }
  choosedDate(val) {
    val = (val.chosenLabel);
    var val = val.toString().split(' - ');
    this.startDate = this.datePipe.transform(val[0], 'dd-MM-yyyy');
    this.endDate = this.datePipe.transform(val[1], 'dd-MM-yyyy');
    this.filterDate('custom');
    // $('.filter_custom').val(this.startDate + " - " + this.endDate);
    $('.customRange').css('display', 'none');
  }

  toggleFilter(val) {
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_' + val).addClass('mat-button-toggle-checked');
    $('.filter').removeClass('active');
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
  public dentistProductionTrend1 = [];
  public dentistProductionTrendLabels = [];
  public dentistProductionTrendLabels1 = [];
  public dentistProductionTrendLoader: any;
  //Trend mode for dentist Production
  private dentistProductionTrend() {
    this.dentistProductionTrendLoader = true;


    var user_id;
    var clinic_id;
    this.cliniciananalysisService.caDentistProtectionTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data) => {
      this.dentistProductionTrendLabels1 = [];
      this.dentistProductionTrend1 = [];
      this.dentistProductionTrendLabels = [];
      this.dentistProductionTrendLabels = [];
      if (data.message == 'success') {
        this.dentistProductionTrendLoader = false;
        data.data.forEach(res => {
          this.dentistProductionTrend1.push(Math.round(res.val.total));
          if (this.trendValue == 'c')
            this.dentistProductionTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
          else
            this.dentistProductionTrendLabels1.push(res.duration);
        });
        this.dentistProdTrend[0]['data'] = this.dentistProductionTrend1;
        this.dentistProductionTrendLabels = this.dentistProductionTrendLabels1;
        if (this.dentistProductionTrendLabels.length <= 0) {
          this.gaugeValue = '0';
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
    this.cliniciananalysisService.caTreatmentPlanAverageCostTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data) => {
      this.treatmentPlanTrendLabels1 = [];
      this.treatmentPlanTrendLabels = [];

      this.treatmentPlanTrend1 = [];
      this.treatmentPlanTrend2 = [];

      if (data.message == 'success') {
        this.treatmentPlanTrendLoader = false;
        if (data.data) {
          data.data.forEach(res => {
            if (res.val.average_cost)
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
          });
        }
        this.treatPlanTrend[0]['data'] = this.treatmentPlanTrend1;
        this.treatmentPlanTrendLabels = this.treatmentPlanTrendLabels1;

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
  public patientComplaintsTrendLoader: any;
  //Trend mode for Pateint Complaints chart
  private patientComplaintsTrend() {
    this.patientComplaintsTrendLoader = true;

    var user_id;
    var clinic_id;
    this.cliniciananalysisService.caNumberPatientComplaintsTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data) => {
      this.patientComplaintsTrendLabels1 = [];
      this.patientComplaintsTrendLabels = [];

      this.patientComplaintsTrend1 = [];
      if (data.message == 'success') {
        this.patientComplaintsTrendLoader = false;
        if (data.data) {
          data.data.forEach(res => {
            this.patientComplaintsTrend1.push(res.val.treat_item);
            if (this.trendValue == 'c')
              this.patientComplaintsTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
            else
              this.patientComplaintsTrendLabels1.push(res.duration);
          });
        }
        this.patientComplaintTrend[0]['data'] = this.patientComplaintsTrend1;

        this.patientComplaintsTrendLabels = this.patientComplaintsTrendLabels1;
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
  public fdRecallPrebookRateTrendLoader: any;
  //Recall Prebook Rate Chart trend mode
  private fdRecallPrebookRateTrend() {
    this.fdRecallPrebookRateTrendLoader = true;
    this.recallPrebookChartTrendLabels = [];

    var user_id;
    var clinic_id;
    this.frontdeskService.fdRecallPrebookRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data) => {
      if (data.message == 'success') {
        this.fdRecallPrebookRateTrendLoader = false;
        this.recallPrebookChartTrendLabels1 = [];
        this.recallPrebookChartTrend1 = [];
        data.data.forEach(res => {
          this.recallPrebookChartTrend1.push(Math.round(res.percent));
          if (this.trendValue == 'c')
            this.recallPrebookChartTrendLabels1.push(this.datePipe.transform(res.treat_date, 'MMM y'));
          else
            this.recallPrebookChartTrendLabels1.push(res.treat_date);

        });
        this.recallPrebookChartTrend[0]['data'] = this.recallPrebookChartTrend1;

        this.recallPrebookChartTrendLabels = this.recallPrebookChartTrendLabels1;
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
    this.frontdeskService.fdTreatmentPrebookRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data) => {
      if (data.message == 'success') {
        this.fdTreatmentPrebookRateTrendLoader = false;
        this.treatmentPrebookChartTrendLabels1 = [];
        this.treatmentPrebookChartTrend1 = [];
        data.data.forEach(res => {
          this.treatmentPrebookChartTrend1.push(Math.round(res.percent));
          if (this.trendValue == 'c')
            this.treatmentPrebookChartTrendLabels1.push(this.datePipe.transform(res.treat_date, 'MMM y'));
          else
            this.treatmentPrebookChartTrendLabels1.push(res.treat_date);

        });
        this.treatmentPrebookChartTrend[0]['data'] = this.treatmentPrebookChartTrend1;

        this.treatmentPrebookChartTrendLabels = this.treatmentPrebookChartTrendLabels1;
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
    this.cliniciananalysisService.cahourlyRateRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data) => {
      this.hourlyRateChartTrendLabels = [];
      if (data.message == 'success') {
        this.fdhourlyRateRateTrendLoader = false;
        this.hourlyRateChartTrendLabels1 = [];
        this.hourlyRateChartTrend1 = [];
        data.data.forEach(res => {
          if (res.val) {
            this.hourlyRateChartTrend1.push(Math.round(res.val.hourlyRate));
            if (this.trendValue == 'c')
              this.hourlyRateChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
            else
              this.hourlyRateChartTrendLabels1.push(res.duration);
          }
        });
        this.hourlyRateChartTrend[0]['data'] = this.hourlyRateChartTrend1;
        this.hourlyRateChartTrendLabels = this.hourlyRateChartTrendLabels1;
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
    this.cliniciananalysisService.canewPatientsRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data) => {
      if (data != null && data.message == 'success') {
        this.fdnewPatientsRateTrendLoader = false;
        this.newPatientsChartTrendLabels1 = [];
        this.newPatientsChartTrend1 = [];
        data.data.forEach(res => {
          if (res.val)
            this.newPatientsChartTrend1.push(Math.round(res.val.getX));
          else
            this.newPatientsChartTrend1.push(0);

          if (this.trendValue == 'c')
            this.newPatientsChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
          else
            this.newPatientsChartTrendLabels1.push(res.duration);

        });
        this.newPatientsChartTrend[0]['data'] = this.newPatientsChartTrend1;

        this.newPatientsChartTrendLabels = this.newPatientsChartTrendLabels1;
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
    this.cliniciananalysisService.catreatmentPlanRateTrend(this.selectedDentist, this.clinic_id, this.trendValue).subscribe((data) => {
      if (data.message == 'success') {
        this.fdtreatmentPlanRateTrendLoader = false;
        this.treatmentPlanChartTrendLabels1 = [];
        this.treatmentPlanChartTrend1 = [];
        if (data.data) {
          data.data.forEach(res => {
            if (res.val) {
              this.treatmentPlanChartTrend1.push(Math.round(res.val.percent));
              if (this.trendValue == 'c')
                this.treatmentPlanChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
              else
                this.treatmentPlanChartTrendLabels1.push(res.duration);
            }
          });
        }
        this.treatmentPlanChartTrend[0]['data'] = this.treatmentPlanChartTrend1;

        this.treatmentPlanChartTrendLabels = this.treatmentPlanChartTrendLabels1;
      }
    }, error => {
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      this.warningMessage = "Please Provide Valid Inputs!";

    });
  }

  toggleChangeProcess() {
    if (this.toggleChecked) {
      $('.filter').removeClass('active');
      this.dentistProductionTrend();
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
}
