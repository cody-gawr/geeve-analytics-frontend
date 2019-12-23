import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit, Pipe, PipeTransform, ViewChild, ElementRef  } from '@angular/core';
import { DashboardsService } from './dashboards.service';
import * as frLocale from 'date-fns/locale/fr';
import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import 'chartjs-plugin-style';
import { HeaderService } from '../layouts/full/header/header.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppHeaderrightComponent } from '../layouts/full/headerright/headerright.component';
import { CookieService } from "angular2-cookie/core";
import { BaseChartDirective } from 'ng2-charts';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { NgxSmartModalService } from 'ngx-smart-modal';
export interface Dentist {
  providerId: string;
  name: string;
}
declare var Chart: any; 


// for date picker
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};




@Component({
  templateUrl: './dashboards.component.html',
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})




export class DashboardsComponent implements AfterViewInit {
   @ViewChild("myCanvas") canvas: ElementRef;
@ViewChild(BaseChartDirective) chart: BaseChartDirective;
  lineChartColors;
  subtitle: string;
  public id:any ={};
  public clinic_id:any ={};
  public UrlSegment:any ={};
  public dentistCount:any ={};
  public doughnutChartColors=[];
  public startDate ='';
  public endDate = '';
  public duration='';
  public trendText;
  public showTrend=false;
  public showTrendChart=false;
  public goalchecked= 'off';
  public averagechecked= false;
  public childid:string='';
  public user_type:string='';
  public totalMembers;
public newMembersThisMonth=0;
public totalFees=0;
public totalFeesThisMonth=0;
public conversionRateActive=0;
public conversionRateInactive=0;

public totalPlans=0;
public newPlansThisMonth=0;
public totalFeesInoffice=0;
public totalFeesInofficeMonth=0;
public totalPlansOverdue=0;
public conversionPercentage  =0; 
public mlist :any;
public selectedMonthYear : string;


constructor(private dashboardsService: DashboardsService, private datePipe: DatePipe, private route: ActivatedRoute,  private headerService: HeaderService,private _cookieService: CookieService, private router: Router,public ngxSmartModalService: NgxSmartModalService ){
 const myDate = new Date();
 console.log("const called");
 const monthname =this.getMonthName(myDate.getMonth());
 this.selectedMonthYear = monthname+" "+(myDate.getFullYear().toString()).slice();
}
  private warningMessage: string;

 //For date picker
   date = new FormControl(moment());
   date2 = new FormControl(moment());

 getMonthName(monthno){
   this.mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
     return this.mlist[monthno];
};

  // chosenMonthHandler(normalizedYear: Moment) {
  //   const ctrlValue = this.date.value;
  //   ctrlValue.year(normalizedYear.year());
  //   this.date.setValue(ctrlValue);
  // }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedMonth.year());
    ctrlValue.month(normalizedMonth.month())
    const monthname =this.getMonthName(normalizedMonth.month());
    this.selectedMonthYear = monthname+" "+(normalizedMonth.year().toString()).slice(-2);
    console.log(this.selectedMonthYear);
    const selectedyear = normalizedMonth.year();
    const selectedmonth = normalizedMonth.month() + 1;

    const finalStartDate = selectedyear+"-"+selectedmonth+"-"+"01";
    const finalEndDate = selectedyear+"-"+selectedmonth+"-"+"30";

    this.startDate = this.datePipe.transform(finalStartDate, 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(finalEndDate, 'yyyy-MM-dd');
     
    this.loadAnalytics();      
    $('.filter_custom').val(this.startDate+ " - "+this.endDate);

    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  demo() {
    alert('sdf');
  }

  ngAfterViewInit() {   
    this.route.params.subscribe(params => {
      this.clinic_id = this.route.snapshot.paramMap.get("id");
        $('.header_filters').addClass('hide_header');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
        $('.sa_heading_bar').hide();       
        $('#title').html('');
        $(".demo").click(function(){
             $('.mat-calendar-period-button').attr('disabled','true');
          alert("The paragraph was clicked.");
        });
         $('.mat-datepicker-toggle').on('click', function(e) {
             $('.mat-calendar-period-button').attr('disabled','true');
          });
       $(document).on('click', function(e) {
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
    this.loadAnalytics();
    }); 

let gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(22, 82, 141, 0.8)');
gradient.addColorStop(1, 'rgba(12, 209,169,0.9)');
let gradient1 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
gradient1.addColorStop(1, 'rgba(12, 209,169,0.8)');
gradient1.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let gradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
gradient2.addColorStop(1, 'rgba(59, 227,193,0.8');
gradient2.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let gradient3 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
gradient3.addColorStop(1, 'rgba(94, 232,205,0.8)');
gradient3.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let gradient4 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
gradient4.addColorStop(1, 'rgba(148, 240,221,0.8)');
gradient4.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let gradient5 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
gradient5.addColorStop(1, 'rgba(201, 247,238,0.8)');
gradient5.addColorStop(0,  'rgba(22, 82, 141, 0.9)');



this.lineChartColors = [
  {
    backgroundColor: gradient,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F'
  },
   {
    backgroundColor: gradient2,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F'
  }
];
      let doughnutGradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
      doughnutGradient.addColorStop(0, '#00A289');
      doughnutGradient.addColorStop(1, 'rgba(28, 164, 159, 1)');
      let doughnutGradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
      doughnutGradient2.addColorStop(1, '#003858');
      doughnutGradient2.addColorStop(0,  '#BFE8EE');
      this.doughnutChartColors = [{backgroundColor: [doughnutGradient,doughnutGradient2]}];

    //this.recallChartTreatment();
  }
  dentists: Dentist[] = [
   { providerId: 'all', name: 'All Dentists' },
  ];
    public barChartColors: Array<any> = [
    { backgroundColor: [] }
  ];
    public barChartType = 'bar';
  public barChartLegend = false;
    public gradient = 'bar';
    public barChartBorder ="#1CA49F";

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
  public doughnutChartLabels: string[] =  [];
  public doughnutChartLabels1: string[] = [];

  public newPatientChartLabels: string[] =  [];
  public newPatientChartLabels1: string[] = [];
  public doughnutChartType:string = 'doughnut';
  public hourlyRateChartLabels: string[] = []; 
  public hourlyRatePreChartLabels1: string[] = [];

  //data
  public barChartData: any[] = [
    {data: [],  shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.5)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.5)',
            backgroundOverlayMode: 'multiply'}
  ];
  public pieChartData: any[] = [
    {data: [10], label: 'Dentist Production'}
  ];
    public planChartData: any[] = [
    {data: [], label: 'Proposed Fees',  shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.5)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.5)',
            backgroundOverlayMode: 'multiply'},
  ];
  public planChartDataP: any[] = [
    {data: [], label: 'Proposed Fees',  shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.5)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.5)',
            backgroundOverlayMode: 'multiply'},
  ];
    public planChartDataC: any[] = [
    {data: [], label: 'Completed Fees',  shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.5)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.5)',
            backgroundOverlayMode: 'multiply'},
  ];
  public doughnutDataset ={  shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.5)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.5)',
            backgroundOverlayMode: 'multiply'};
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
  public gaugeDuration ='2500';
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public gaugeType = "arch";
  public  gaugeValue = '';
  public  gaugeLabel = "";
  public  gaugeThick = "20";
  public  foregroundColor= "rgba(0, 150, 136,0.7)";
  public  cap= "round";
  public  size = "300"

  public  gaugeValueTreatment = 0;
  public  gaugeLabelTreatment = "";

  public  gaugeValuePatients = 0;
  public  gaugeLabelPatients = "";

  public  newPatientValuePatients = 0;
  public  newPatientLabelPatients = "";
  public recallValue:any;
  public recallLabel = "";
  public recallGoal = 0;
    public treatmentPreValue= '';
  public treatmentPreLabel = "";
  public treatmentPreGoal = 0;
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
              userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return '$'+label;
                     }
                 },
            }, 
            }],
        },
        tooltips: {
  callbacks: {
     label: function(tooltipItems, data) { 
              if(data.datasets[tooltipItems.datasetIndex].label != undefined)
                return data.datasets[tooltipItems.datasetIndex].label+": $"+tooltipItems.yLabel;
              else
                return "$"+tooltipItems.yLabel;
     },
  }
},
         legend: {
        position: 'top',
        onClick: function(e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart; 
          if(index ==0)
          {
                ci.getDatasetMeta(1).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          }
          else if(index== 1) {
                ci.getDatasetMeta(0).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          } 
          ci.update();
        },
      }  , 
  };
  public barChartOptionsPercent: any = {
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
                 beginAtZero:true,
              userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label+ ' %';
                     }

                 },
            }, 
            }],
        },
        tooltips: {
  callbacks: {
     label: function(tooltipItems, data) { 
              if(data.datasets[tooltipItems.datasetIndex].label != undefined)
                return data.datasets[tooltipItems.datasetIndex].label+": "+tooltipItems.yLabel+"%";
              else
                return tooltipItems.yLabel+"%";
     },
     
  }
},
         legend: {
        position: 'top',
        onClick: function(e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart; 
          if(index ==0)
          {
                ci.getDatasetMeta(1).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          }
          else if(index== 1) {
                ci.getDatasetMeta(0).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          } 
          ci.update();
        },
      }  , 
  };


  public barChartOptionstrend: any = {
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
              userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label;
                     }
                 },
            }, 
            }],
        },
        tooltips: {
          callbacks: {
             label: function(tooltipItems, data) { 
                      if(data.datasets[tooltipItems.datasetIndex].label != undefined)
                        return data.datasets[tooltipItems.datasetIndex].label+": "+tooltipItems.yLabel;
                      else
                        return tooltipItems.yLabel;
             },
          }
        },
         legend: {
        position: 'top',
        onClick: function(e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart; 
          if(index ==0)
          {
                ci.getDatasetMeta(1).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          }
          else if(index== 1) {
                ci.getDatasetMeta(0).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          } 
          ci.update();
        },
      }        
  };
  public doughnutChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 2000,
        easing: 'easeOutSine'
      },
      legend: {
            display: true,
            position:'right'
         }
  };

     

  public conversionRateData=[];
  public conversionRateLabels=['Accepted','Pending'];
  public loadAnalytics() {
    this.totalFeesThisMonth = 0;
   this.dashboardsService.loadAnalytics(this.startDate,this.endDate).subscribe((data) => {
      if(data.message == 'success'){
        if(data.data.totalMembers != null)
        this.totalMembers = data.data.totalMembers;

        if(data.data.newMembersThisMonth != null)  
        this.newMembersThisMonth = data.data.newMembersThisMonth;

        if(data.data.totalFees.total != null)
        this.totalFees = data.data.totalFees.total;

        if(data.data.totalFeesThisMonth.total != null)
        this.totalFeesThisMonth = data.data.totalFeesThisMonth.total;

        if(data.data.conversionRate != null) {
        this.conversionRateActive = data.data.conversionRate.active;
        this.conversionRateInactive = data.data.conversionRate.inactive;
        this.conversionPercentage = this.conversionRateActive / (this.conversionRateActive + this.conversionRateInactive) * 100;
        if(isNaN(this.conversionPercentage)){
          this.conversionPercentage =0;
        }
        
        this.conversionRateData= [this.conversionRateActive,this.conversionRateInactive];
        this.conversionRateLabels=['Accepted','Pending'];
      }

        if(data.data.totalPlans != null)
        this.totalPlans = data.data.totalPlans;

        if(data.data.newPlansThisMonth != null)
        this.newPlansThisMonth = data.data.newPlansThisMonth;

        if(data.data.totalFeesInoffice.total != null)
        this.totalFeesInoffice = data.data.totalFeesInoffice.total;

        if(data.data.totalFeesInofficeMonth.total != null)
        this.totalFeesInofficeMonth = data.data.totalFeesInofficeMonth.total;

        if(data.data.totalPlansOverdue != null)
        this.totalPlansOverdue = data.data.totalPlansOverdue;

      }
   });
  }
    choosedDate(val) {
     
    val = (val.chosenLabel);
     console.log(val);
    var val= val.toString().split(' - ');
      this.startDate = this.datePipe.transform(val[0], 'yyyy-MM-dd');
      console.log(this.startDate);
      this.endDate = this.datePipe.transform(val[1], 'yyyy-MM-dd');
      this.loadAnalytics();      
      $('.filter_custom').val(this.startDate+ " - "+this.endDate);
     $('.customRange').css('display','none');
}

  public productionTooltip='down';
  public productionTotalPrev;
  public barChartOptionsDP:any =this.barChartOptions;
  public buildChartLoader:any;
  public dentistKey;
  public DPcolors:any;
  //Dentist Production Chart
  // private buildChart() {
  //   this.buildChartLoader =true;
  //   this.barChartData1 =[];
  //   this.barChartLabels1 =[];
  //   this.productionTotal =0;
  //   this.barChartLabels = [];

  //   this.dashboardsService.DentistProduction(this.clinic_id,this.startDate,this.endDate,this.duration,this.user_type,this.childid).subscribe((data) => {
  //      if(data.message == 'success'){
  //       this.buildChartLoader =false;
  //       this.productionTooltip = 'down';
  //       var i=0;
  //       data.data.forEach(res => {
  //          this.barChartData1.push(res.total);
  //          var name = res.name;
  //          if(res.name != null && res.name !='Anonymous') {
  //            name = res.name.split(')');
  //           if(name.length >0 && name[1] != '')
  //           {
  //             name = name[1].split(',');
  //             if(name.length>0)
  //               name =name[1]+ " "+ name[0];
  //           }
  //          this.barChartLabels1.push(name);
  //          this.dentistKey = i;
  //        }
  //          else
  //          this.barChartLabels1.push(res.firstname);

  //          if(res.total != null)
  //          this.productionTotal = this.productionTotal + parseInt(res.total);
  //        i++;
  //       });

  //       if(this.user_type == '4' && this.childid != '') {
  //       this.barChartColors[0].backgroundColor[this.dentistKey] = 'red';
  //       this.DPcolors= this.barChartColors;
  //     }
  //     else
  //       this.DPcolors= this.lineChartColors;


  //        this.barChartData[0]['data'] = this.barChartData1;
  //        this.barChartLabels = this.barChartLabels1;
  //        this.productionTotalAverage =Math.floor(data.total_average);
  //        this.productionTotalPrev =data.total_ta;
  //        this.productionGoal = data.goals;
  //        if(this.productionTotalAverage>=this.productionTotalPrev)
  //         this.productionTooltip = 'up';
  //         this.barChartOptionsDP.annotation =[];
  //         if(this.goalchecked == 'average') {
  //          this.barChartOptionsDP.annotation = {annotations: [{
  //             type: 'line',
  //             drawTime: 'afterDatasetsDraw',
  //             mode: 'horizontal',
  //             scaleID: 'y-axis-0',
  //             value: this.productionTotalAverage,
  //             borderColor: '#0e3459',
  //             borderWidth: 2,
  //             borderDash: [2, 2],
  //             borderDashOffset: 0,
  //         },
  //        ]
  //       }
  //      }
  //      else if(this.goalchecked == 'goal') {
  //          this.barChartOptionsDP.annotation = {annotations: [{
  //             type: 'line',
  //             drawTime: 'afterDatasetsDraw',
  //             mode: 'horizontal',
  //             scaleID: 'y-axis-0',
  //             value: this.productionGoal,
  //             borderColor: 'red',
  //             borderWidth: 2,
  //             borderDash: [2, 2],
  //             borderDashOffset: 0,
  //         },
  //        ]
  //       }
  //      }

  //      }
  //   }, error => {
  //     this.warningMessage = "Please Provide Valid Inputs!";
  //   }
  //   );
  //        }
}
