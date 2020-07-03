import * as $ from 'jquery';
import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit , ViewChild,ElementRef } from '@angular/core';
import { FrontDeskService } from './frontdesk.service';
import { DentistService } from '../../dentist/dentist.service';

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
import { HeaderService } from '../../layouts/full/header/header.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppHeaderrightComponent } from '../../layouts/full/headerright/headerright.component';
import { CookieService } from "angular2-cookie/core";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrService } from 'ngx-toastr';
export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  templateUrl: './frontdesk.component.html'
})
export class FrontDeskComponent implements AfterViewInit {
    @ViewChild("myCanvas") canvas: ElementRef;
  lineChartColors;
  doughnutChartColors;
  predictedChartColors;
  preoceedureChartColors;
  subtitle: string;
   public clinic_id:any ={};
   public dentistCount:any ={};
    public clinicsData:any[] = [];
  public trendText;
  constructor(private toastr: ToastrService,private frontdeskService: FrontDeskService, private dentistService: DentistService, private datePipe: DatePipe, private route: ActivatedRoute,  private headerService: HeaderService,private _cookieService: CookieService, private router: Router){
  }
  private warningMessage: string; 
 private myTemplate: any = "";
     private checkPermission(role) { 
  this.headerService.checkPermission(role).subscribe((res) => {
       if(res.message == 'success'){
       }
        else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
    }, error => {
     //    $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    }    
    );

  }
    initiate_clinic() {
    var val = $('#currentClinic').attr('cid');
      if(val != undefined && val !='all') {
    this.clinic_id = val;
   // this.getDentists();
     this.filterDate('cytd');
   }
  }
  ngAfterViewInit() {
     this.checkPermission('dashboard3');
 this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
     //    this.filterDate('cytd');
        this.getClinics();
      this.initiate_clinic();
        
   $('#title').html('Front Desk '+this.datePipe.transform(this.startDate, 'MMM d yyyy')+'-'+this.datePipe.transform(this.endDate, 'MMM d yyyy')+'');
        
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
        $('.header_filters').removeClass('hide_header');
        $('#title').html('Front Desk');
        $('.external_clinic').show();
        $('.external_dentist').show();
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
     });

 let predictedGradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
predictedGradient.addColorStop(0, 'rgba(12, 209,169,0.8)');
predictedGradient.addColorStop(1, 'rgba(22, 82, 141, 0.9)');
let predictedGradient1 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
predictedGradient1.addColorStop(1, 'rgba(12, 209,169,0.9)');
predictedGradient1.addColorStop(0,  'rgba(22, 82, 141, 0.6)');
let predictedGradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
predictedGradient2.addColorStop(1, 'rgba(59, 227,193,4)');
predictedGradient2.addColorStop(0,  'rgba(22, 82, 141, 9)');
let predictedGradient3 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
predictedGradient3.addColorStop(1, 'rgba(94, 232,205,0.7)');
predictedGradient3.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let predictedGradient4 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
predictedGradient4.addColorStop(1, 'rgba(148, 240,221,0.8)');
predictedGradient4.addColorStop(0,  'rgba(22, 82, 141, 0.8)');
let predictedGradient5 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
predictedGradient5.addColorStop(1, 'rgba(201, 247,238,0.8)');
predictedGradient5.addColorStop(0,  'rgba(22, 82, 141, 0.9)');

this.predictedChartColors = [
  {
    backgroundColor: predictedGradient,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(25,179,148,0.7)'
  },
   {
    backgroundColor: predictedGradient1,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(25,179,148,0.7)'

  },
  {
    backgroundColor: predictedGradient2,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(25,179,148,0.7)'

  },
   {
    backgroundColor: predictedGradient3,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(25,179,148,0.7)'

  },
  {
    backgroundColor: predictedGradient4,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(25,179,148,0.7)'

  },
   {
    backgroundColor: predictedGradient5,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F'
  }
];


  }

  public date =new Date();
    public stackedChartOptions: any = {
      elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle:'rectRounded',
        hoverBorderWidth:7
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
      fill:false,
    scales: {
          xAxes: [{ 
            stacked:true,
            ticks: {
                autoSkip: false
            }
            }],
          yAxes: [{ 
            stacked:true,
            ticks: {
              userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label+"%";
                     }
                 },
            },
            }],
        },
                tooltips: {
  callbacks: {
     label: function(tooltipItems, data) { 
                      return data.datasets[tooltipItems.datasetIndex].label+": "+tooltipItems.yLabel+ "%";
     },
     
  }
},
  legend: {
            display: true
         }
  };


public stackedChartOptionsticks: any = {
      elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle:'rectRounded',
        hoverBorderWidth:7
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
      fill:false,
    scales: {
          xAxes: [{ 
            stacked:true,
            ticks: {
                autoSkip: false
            }
            }],
          yAxes: [{ 
            stacked:true,
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
                      return data.datasets[tooltipItems.datasetIndex].label+": "+tooltipItems.yLabel;
     },
     
  }
},
  legend: {
            display: true
         }
  };
  public stackedChartColors: Array<any> = [
    { backgroundColor: '#76F2E5' },
    { backgroundColor: '#6BE6EF' },
    { backgroundColor: '#68D8D6' },
    { backgroundColor: '#3DCCC7' },
    { backgroundColor: '#68FFF9' },
    { backgroundColor: '#07BEB8' }
  ];
  public stackedChartType = 'bar';
  public lineChartType = 'line';

  public stackedChartLegend = true;

  //labels
  public stackedChartLabels: string[] = [];  
  public stackedChartLabels1: string[] = [];

  //data
  public stackedChartData: any[] = [
    {data: [], label: 'Crowns'},
    {data: [], label: 'Splints ' },
    {data: [], label: 'Root Canals' },
    {data: [], label: 'Perio Charts' },
    {data: [], label: 'Surgical Extractions' }  ];

  public stackedChartData1: any[] = [];
  public stackedChartData2: any[] = [];
  public stackedChartData3: any[] = [];
  public stackedChartData4: any[] = [];
  public stackedChartData5: any[] = [];
  public duration='';
  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
   // console.log(e);
  }
  public  gaugeType = "arch";
  public  gaugeValue = '';
  public  gaugeLabel = "";
  public  gaugeThick = "20";
  public  foregroundColor= "rgba(0, 150, 136,0.7)";
  public  cap= "round";
  public  size = "250"
  public gaugeAppendText ='%';
  public startDate ='';
  public endDate = '';
  public selectedValToggle ='off';

 private loadDentist(newValue) {
   $('#title').html('Front Desk '+this.datePipe.transform(this.startDate, 'MMM d yyyy')+'-'+this.datePipe.transform(this.endDate, 'MMM d yyyy')+'');

    if(newValue == 'all') {
      this.fdFtaRatio();
      this.fdUtaRatio();
      this.fdNumberOfTicks();
      this.fdWorkTimeAnalysis();
      this.fdRecallPrebookRate();
      this.fdtreatmentPrebookRate();
    }
  }

  public workTimeData = [
    {data: [], label: ''}];
  public workTimeLabels = [];
  
  public workTimeLabels1 = [];
  public workTimeData1 = [];
  public workTimeTotal;
  public prevWorkTimeTotal;
  public workTimeGoal;
  public prevWorkTimeTooltip ='down';
  public goalchecked='off';
    public stackedChartOptionssWT:any =this.stackedChartOptions;
public fdWorkTimeAnalysisLoader:any;

  //Items Predictor Analysis 
  private fdWorkTimeAnalysis() {
    var user_id;
    var clinic_id;
    this.fdWorkTimeAnalysisLoader = true;
    this.workTimeLabels= [];

  this.frontdeskService.fdWorkTimeAnalysis(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {

       if(data.message == 'success'){
        this.fdWorkTimeAnalysisLoader = false;
              this.workTimeData1 =[];
      this.workTimeLabels1 =[];
      this.prevWorkTimeTooltip = 'down';
        if(data.data.length >0) {
         data.data.forEach(res => {
           this.workTimeData1.push(Math.abs(res.wta).toFixed(1));
           this.workTimeLabels1.push(res.app_book_name);
         });
     }
        this.workTimeData[0]['data'] = this.workTimeData1;
         this.workTimeLabels= this.workTimeLabels1;
         this.workTimeTotal = Math.abs(data.total).toFixed(1);
         this.prevWorkTimeTotal =  Math.abs(data.total_ta).toFixed(1);
         this.workTimeGoal = data.goals;
         if(this.workTimeTotal>=this.prevWorkTimeTotal)
            this.prevWorkTimeTooltip = 'up';
      this.stackedChartOptionssWT.annotation =[];
          if(this.goalchecked == 'average') {
           this.stackedChartOptionssWT.annotation = {annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.workTimeTotal,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
          },
         ]
        }
       }
       else if(this.goalchecked == 'goal') {
           this.stackedChartOptionssWT.annotation = {annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.workTimeGoal,
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
 
    }
    );
  }

public ftaTotal;
public ftaPrevTotal;
public ftaTooltip='down';
public ftaGoal;
public fdFtaRatioLoader:any;

//Predictor Ratio :
  private fdFtaRatio() {
     if(this.duration){
      this.fdFtaRatioLoader = true;
    this.ftaTotal = 0;

       var user_id;
       var clinic_id;
  this.frontdeskService.fdFtaRatio(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
    this.ftaTotal = 0;
          this.ftaPrevTotal = 0;
       if(data.message == 'success'){
        this.fdFtaRatioLoader = false;
          this.ftaTotal = Math.abs(data.data).toFixed(1);
          this.ftaPrevTotal = Math.abs(data.data_ta).toFixed(1);
          this.ftaGoal = data.goals;

          if(this.ftaTotal>=this.ftaPrevTotal)
            this.ftaTooltip = 'up';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }


public utaTotal;
public utaPrevTotal;
public utaTooltip='down';
public utaGoal;
public fdUtaRatioLoader:any;
//Predictor Ratio :
  private fdUtaRatio() {
     if(this.duration){
      this.fdUtaRatioLoader = true;
     this.utaTotal = 0;

       var user_id;
       var clinic_id;
  this.frontdeskService.fdUtaRatio(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
     this.utaTotal = 0;
          this.utaPrevTotal = 0;
       if(data.message == 'success'){
        this.fdUtaRatioLoader = false;
          this.utaTotal = Math.abs(data.data).toFixed(1);
          this.utaPrevTotal = Math.abs(data.data_ta).toFixed(1);
          this.utaGoal = data.goals;

          if(this.utaTotal>=this.utaPrevTotal)
            this.utaTooltip = 'up';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public ticksTotal;
public ticksPrevTotal;
public ticksTooltip='down';
public fdNumberOfTicksLoader:any;

//Predictor Ratio :
  private fdNumberOfTicks() {
     if(this.duration){
      this.fdNumberOfTicksLoader = true;
          this.ticksPrevTotal = 0;

       var user_id;
       var clinic_id;
      this.frontdeskService.fdNumberOfTicks(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.fdNumberOfTicksLoader = false;
          this.ticksPrevTotal = 0;
        this.ticksTotal = 0;
        if(data.data.length > 0)
          this.ticksTotal = Math.abs(data.data[0].treat_item).toFixed(1);
          this.ticksPrevTotal = Math.abs(data.data_ta).toFixed(1);
          if(this.ticksTotal>=this.ticksPrevTotal)
            this.ticksTooltip = 'up';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public recallPrebookTotal;
public recallPrebookPrevTotal;
public recallPrebookTooltip='down';
public fdRecallPrebookRateLoader:any;

//Predictor Ratio :
  private fdRecallPrebookRate() {
     if(this.duration){
      this.fdRecallPrebookRateLoader = true;
      this.recallPrebookTotal =0;
       var user_id;
       var clinic_id;
      this.frontdeskService.fdRecallPrebookRate(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.fdRecallPrebookRateLoader = false;
          this.recallPrebookPrevTotal = 0;
        this.recallPrebookTotal = 0;
        if(data.data.length > 0) {
          if(data.data[0].percent >0)
          this.recallPrebookTotal = Math.abs(data.data[0].percent).toFixed(1);
        }
          this.recallPrebookPrevTotal = Math.abs(data.total_ta).toFixed(1);
          console.log(this.recallPrebookTotal);
          if(this.recallPrebookTotal>=this.recallPrebookPrevTotal)
            this.recallPrebookTooltip = 'up';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public treatmentPrebookTotal;
public treatmentPrebookPrevTotal;
public treatmentPrebookTooltip='down';
public fdtreatmentPrebookRateLoader:any;

//Predictor Ratio :
  private fdtreatmentPrebookRate() {
     if(this.duration){
      this.fdtreatmentPrebookRateLoader = true;
        this.treatmentPrebookTotal = 0;

       var user_id;
       var clinic_id;
      this.frontdeskService.fdTreatmentPrebookRate(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.fdtreatmentPrebookRateLoader = false;
          this.treatmentPrebookPrevTotal = 0;
        this.treatmentPrebookTotal = 0;
        if(data.data.length > 0)
          this.treatmentPrebookTotal = Math.abs(data.data[0].percent).toFixed(1);
          this.treatmentPrebookPrevTotal = Math.abs(data.total_ta).toFixed(1);
          if(this.treatmentPrebookTotal>=this.treatmentPrebookPrevTotal)
            this.treatmentPrebookTooltip = 'up';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public currentText;

  // Filter By Date
  filterDate(duration) {
    this.isDisabled = true;
     $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_off').addClass('mat-button-toggle-checked');
    this.showTrend= false;
     $('.customRange').css('display','none');
    if(duration == 'w') {
       this.trendText= 'Last Week';
      this.currentText= 'This Week';
      const now = new Date();
       var first = now.getDate() - now.getDay();
       var last = first + 6; 
       this.startDate = this.datePipe.transform(new Date(now.setDate(first)).toUTCString(), 'yyyy-MM-dd');
       var end = new Date();
        end.setFullYear(now.getFullYear());
        end.setMonth(now.getMonth()+1);
        end.setDate(last);
       this.endDate =this.datePipe.transform(new Date(end).toUTCString(), 'yyyy-MM-dd');
       this.duration='w';
        this.loadDentist('all');
    }
    else if (duration == 'm') {
      this.trendText= 'Last Month';
      this.currentText= 'This Month';

      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'yyyy-MM-dd');
            this.loadDentist('all');
        this.duration='m';
    }
    else if (duration == 'q') {
      this.trendText= 'Last Quarter';
      this.currentText= 'This Quarter';

      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'yyyy-MM-dd');
      }
      else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'yyyy-MM-dd'); }
      else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'yyyy-MM-dd'); }
      else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 12, 0), 'yyyy-MM-dd');  }
        this.duration='q';
        this.loadDentist('all');
    }
    else if (duration == 'lq') {
      this.trendText= 'Previous Quarter';
      this.currentText= 'Last Quarter';

      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
     
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear() -1, 9, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear()-1, 12, 0), 'yyyy-MM-dd');
      }
      else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'yyyy-MM-dd'); }
      else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'yyyy-MM-dd'); }
      else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'yyyy-MM-dd');  }
        this.duration='lq';
            this.loadDentist('all');
   
    }
    else if (duration == 'cytd') {
      this.trendText= 'Last Year';
      this.currentText= 'This Year';

     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.duration='cytd';
      this.loadDentist('all');
    }
     else if (duration == 'fytd') {
      this.trendText= 'Last Financial Year';
      this.currentText= 'This Financial Year';

     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 3, 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.duration='fytd';
      this.loadDentist('all');
    }
     else if (duration == 'custom') {
      this.trendText= '';
      this.currentText= '';
     $('.customRange').css('display','block');
    }
    $('.filter').removeClass('active');
    $('.filter_'+duration).addClass("active");
      $('.filter_custom').val(this.startDate+ " - "+this.endDate);
      

  }

choosedDate(val) {
    val = (val.chosenLabel);
    var val= val.toString().split(' - ');
      this.startDate = this.datePipe.transform(val[0], 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(val[1], 'yyyy-MM-dd');
      this.loadDentist('all');
      
      $('.filter_custom').val(this.startDate+ " - "+this.endDate);
     $('.customRange').css('display','none');
}
toggleFilter(val) {
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_'+val).addClass('mat-button-toggle-checked');
    $('.filter').removeClass('active');
    if(val == 'current') {
     this.toggleChecked = true;
     this.trendValue = 'c';
       this.stackedChartOptionssWT.annotation =[];
     this.toggleChangeProcess();
    }
    else if(val == 'historic') {
       this.toggleChecked = true;
       this.trendValue = 'h';
       this.stackedChartOptionssWT.annotation =[];
       this.toggleChangeProcess();
    }
    else if(val == 'off') {
      if(this.goalchecked=='average') {
    this.stackedChartOptionssWT.annotation = {annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.workTimeTotal,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
          },
         ]
        }
      }
      else if(this.goalchecked=='goal')  {
           this.stackedChartOptionssWT.annotation = {annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.workTimeGoal,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
          },
         ]
        }
      }

      this.showTrend = false;
    }
}
 private getClinics() { 
  this.headerService.getClinics().subscribe((res) => {
       if(res.message == 'success'){
        this.clinicsData = res.data;
       }
    }, error => {
     // this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );

  }
  initiate_dentist() {
    var val = $('.internal_dentist').val();
    this.loadDentist(val);
  }
  toggleChecked = false;
  trendValue ='';
  isDisabled =true;
  isChecked =true;
  mode='Internal';
  showTrend= false;
toggleChangeProcess(){
      this.showTrend = true;
      this.fdwtaRatioTrend();
      this.fdFtaRatioTrend();
      this.fdUtaRatioTrend();
      this.fdNumberOfTicksTrend();
      this.fdRecallPrebookRateTrend();
      this.fdTreatmentPrebookRateTrend();
}

 public ftaChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3,
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
            backgroundOverlayMode: 'multiply'}];
    public ftaChartTrend1=[];
  public ftaChartTrendLabels =[];
  public ftaChartTrendLabels1 =[];
  public fdFtaRatioTrendLoader:any;
  private fdFtaRatioTrend() {
    this.fdFtaRatioTrendLoader =true;
  this.ftaChartTrendLabels=[];
  
  this.ftaChartTrendLabels1=[];
  this.ftaChartTrend1=[];
    var user_id;
    var clinic_id;
    this.frontdeskService.fdFtaRatioTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
        this.fdFtaRatioTrendLoader =false;
                data.data.forEach(res => {  
                     this.ftaChartTrend1.push(res.val);
                   if(this.trendValue == 'c')
                   this.ftaChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.ftaChartTrendLabels1.push(res.duration);
                  
                 });
                 this.ftaChartTrend[0]['data'] = this.ftaChartTrend1;

                 this.ftaChartTrendLabels =this.ftaChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

  public wtaChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3,
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
            backgroundOverlayMode: 'multiply'}];
    public wtaChartTrend1=[];
  public wtaChartTrendLabels =[];
  public wtaChartTrendLabels1 =[];
  public fdwtaRatioTrendLoader:any;
  private fdwtaRatioTrend() {
    this.fdwtaRatioTrendLoader =true;
  this.wtaChartTrendLabels=[];
 
  this.wtaChartTrendLabels1=[];
  this.wtaChartTrend1=[];
    var user_id;
    var clinic_id;
    this.frontdeskService.fdWorkTimeAnalysisTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
        this.fdwtaRatioTrendLoader =false;
                data.data.forEach(res => {  
                     this.wtaChartTrend1.push(res.val);
                   if(this.trendValue == 'c')
                   this.wtaChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.wtaChartTrendLabels1.push(res.duration);
                  
                 });
                 this.wtaChartTrend[0]['data'] = this.wtaChartTrend1;

                 this.wtaChartTrendLabels =this.wtaChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


  public utaChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3,
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
            backgroundOverlayMode: 'multiply'}];
    public utaChartTrend1=[];
  public utaChartTrendLabels =[];
  public utaChartTrendLabels1 =[];
  public fdUtaRatioTrendLoader:any;

  private fdUtaRatioTrend() {
    this.fdUtaRatioTrendLoader = true;
  this.utaChartTrendLabels1=[];
  this.utaChartTrendLabels=[];

  this.utaChartTrend1=[];
    var user_id;
    var clinic_id;
    this.frontdeskService.fdUtaRatioTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
        this.fdUtaRatioTrendLoader = false;
                data.data.forEach(res => {  
                     this.utaChartTrend1.push(res.val);
                   if(this.trendValue == 'c')
                   this.utaChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.utaChartTrendLabels1.push(res.duration);
                  
                 });
                 this.utaChartTrend[0]['data'] = this.utaChartTrend1;

                 this.utaChartTrendLabels =this.utaChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

    public tickChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3,
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
            backgroundOverlayMode: 'multiply'}];
    public tickChartTrend1=[];
  public tickChartTrendLabels =[];
  public tickChartTrendLabels1 =[];
  public fdNumberOfTicksTrendLoader:any;

  private fdNumberOfTicksTrend() {
    this.fdNumberOfTicksTrendLoader = true;
  this.tickChartTrendLabels=[];
  this.tickChartTrendLabels1=[];
  this.tickChartTrend1=[];
    var user_id;
    var clinic_id;
    this.frontdeskService.fdNumberOfTicksTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
        this.fdNumberOfTicksTrendLoader = false;
                data.data.forEach(res => {  
                     this.tickChartTrend1.push(res.val);
                   if(this.trendValue == 'c')
                   this.tickChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.tickChartTrendLabels1.push(res.duration);
                  
                 });
                 this.tickChartTrend[0]['data'] = this.tickChartTrend1;

                 this.tickChartTrendLabels =this.tickChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


 public recallPrebookChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3,
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
            backgroundOverlayMode: 'multiply'}];
    public recallPrebookChartTrend1=[];
  public recallPrebookChartTrendLabels =[];
  public recallPrebookChartTrendLabels1 =[];
  public fdRecallPrebookRateTrendLoader:any;

  private fdRecallPrebookRateTrend() {
    this.fdRecallPrebookRateTrendLoader = true;
  this.recallPrebookChartTrendLabels=[];

  this.recallPrebookChartTrendLabels1=[];
  this.recallPrebookChartTrend1=[];
    var user_id;
    var clinic_id;
    this.frontdeskService.fdRecallPrebookRateTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
        this.fdRecallPrebookRateTrendLoader = false;
          this.recallPrebookChartTrendLabels1=[];
  this.recallPrebookChartTrend1=[];
                data.data.forEach(res => {  
                     this.recallPrebookChartTrend1.push(res.percent.toFixed(1));
                   if(this.trendValue == 'c')
                   this.recallPrebookChartTrendLabels1.push(this.datePipe.transform(res.treat_date, 'MMM y'));
                    else
                   this.recallPrebookChartTrendLabels1.push(res.treat_date);
                  
                 });
                 this.recallPrebookChartTrend[0]['data'] = this.recallPrebookChartTrend1;

                 this.recallPrebookChartTrendLabels =this.recallPrebookChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


 public treatmentPrebookChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3,
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
            backgroundOverlayMode: 'multiply'}];
    public treatmentPrebookChartTrend1=[];
  public treatmentPrebookChartTrendLabels =[];
  public treatmentPrebookChartTrendLabels1 =[];
  public fdTreatmentPrebookRateTrendLoader:any;

  private fdTreatmentPrebookRateTrend() {
    this.fdTreatmentPrebookRateTrendLoader = true;
  this.treatmentPrebookChartTrendLabels1=[];
  this.treatmentPrebookChartTrendLabels=[];

  this.treatmentPrebookChartTrend1=[];
    var user_id;
    var clinic_id;
    this.frontdeskService.fdTreatmentPrebookRateTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
        this.fdTreatmentPrebookRateTrendLoader = false;
          this.treatmentPrebookChartTrendLabels1=[];
          this.treatmentPrebookChartTrend1=[];
                data.data.forEach(res => {  
                     this.treatmentPrebookChartTrend1.push(res.percent.toFixed(1));
                   if(this.trendValue == 'c')
                   this.treatmentPrebookChartTrendLabels1.push(this.datePipe.transform(res.treat_date, 'MMM y'));
                    else
                   this.treatmentPrebookChartTrendLabels1.push(res.treat_date);
                  
                 });
                 this.treatmentPrebookChartTrend[0]['data'] = this.treatmentPrebookChartTrend1;

                 this.treatmentPrebookChartTrendLabels =this.treatmentPrebookChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }
  goalToggle(val) {
     this.goalchecked = val;
      this.fdWorkTimeAnalysis();  
    }
  }
