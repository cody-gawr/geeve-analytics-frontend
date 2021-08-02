import * as $ from 'jquery';
import { Component, AfterViewInit, ViewEncapsulation , ViewChild,ElementRef } from '@angular/core';
import { FrontDeskService } from './frontdesk.service';
import { DentistService } from '../../dentist/dentist.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderService } from '../../layouts/full/header/header.service';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';
import { ChartService } from '../chart.service';
import { ITooltipData } from '../../shared/tooltip/tooltip.directive';
import { AppConstants } from '../../app.constants';
import { ChartstipsService } from '../../shared/chartstips.service';
export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  templateUrl: './frontdesk.component.html',
  styleUrls: ['./frontdesk.component.scss'],
   encapsulation: ViewEncapsulation.None
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
  public charTips:any = [];
  public showTopVlaues: boolean = false;
  public showUtiTable: boolean = false;

  chartData1 = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels1 = ['January', 'February', 'Mars', 'April'];
  constructor(
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
    public chartstipsService: ChartstipsService
    ){
     this.getChartsTips();
  }
  private warningMessage: string; 
 private myTemplate: any = "";
 public Apirequest =0;


    initiate_clinic() {
    var val = $('#currentClinic').attr('cid');
      if(val != undefined && val !='all') {
    this.clinic_id = val;
   // this.getDentists();
   this.filterDate(this.chartService.duration$.value);
   }
  }

  formatDate(date) {
    if(date) {
      var dateArray = date.split("-");
      const d = new Date();
      d.setFullYear(+dateArray[2], (+dateArray[1]-1), +dateArray[0]);
      const formattedDate = this.datePipe.transform(d, 'dd MMM yyyy');
      return formattedDate;
    } else return date;
  }

  ngAfterViewInit() {
      $('#currentDentist').attr('did','all');
 this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
     //    this.filterDate('cytd');
        this.getClinics();
     // this.initiate_clinic();
        
      $('#title').html('<span>Front Desk</span>'); 
          $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) );

        
        $('.external_clinic').show();
        //$('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
        $('.header_filters').removeClass('hide_header');
        $('#title').html('<span>Front Desk</span> <span class="page-title-date">'+ this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) +'</span>'); 
        $('.external_clinic').show();
        //$('.external_dentist').show();
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

    this.filterDate(this.chartService.duration$.value);
  }

  public date =new Date();
    public stackedChartOptions: any = {
    //   elements: {
    //   point: {
    //     radius: 5,
    //     hoverRadius: 7,
    //     pointStyle:'rectRounded',
    //     hoverBorderWidth:7
    //   },
    // },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
      animation: {
        duration: 500,
        easing: 'easeOutSine'
      },
      fill:false,
    scales: {
          xAxes: [{ 
            // stacked:true,
            ticks: {
                autoSkip: false
            }
            }],
          yAxes: [{ 
            // stacked:true,
            ticks: {
              min:0,
              max:100,
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
                  mode: 'x-axis',
                        custom: function(tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
  callbacks: {
     label: function(tooltipItems, data) { 

      let total = tooltipItems.yLabel > 100 ? 100 : tooltipItems.yLabel;
        return tooltipItems.xLabel+": "+ total + "%";
     },
     title: function() {
       return "";
     }
     
  }
},
  legend: {
            display: true
         }
  };



  public stackedChartOptionsUti: any = {

    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
      animation: {
        duration: 1,
        easing: 'linear'
      },
      fill:false,
    scales: {
      xAxes: [{ 
        ticks: {
          autoSkip: false,
          callback: function (value, index, values) {
            if(value.indexOf('--') >= 0){
              let lbl = value.split('--');
              value = lbl[0];
            }
            return value;
          }
        }
      }],
          yAxes: [{ 
            // stacked:true,
            ticks: {
              min:0,
              max:100,
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
          mode: 'x-axis',
          custom: function(tooltip) {
            if (!tooltip) return;
              tooltip.displayColors = false;
            },
            callbacks: {
              label: function(tooltipItems, data) { 
                let total = tooltipItems.yLabel > 100 ? 100 : tooltipItems.yLabel;    
                if(tooltipItems.xLabel.indexOf('--') >= 0){
                  let lbl = tooltipItems.xLabel.split('--');
                  tooltipItems.xLabel = lbl[0];
                }        
                return tooltipItems.xLabel+": "+ total + '%';
              },
              afterLabel: function(tooltipItems, data) {
                let hour = 0;
                let phour = 0;
                if(tooltipItems.label.indexOf('--') >= 0){
                  let lbl = tooltipItems.label.split('--');                
                  hour = lbl[1];
                  phour = lbl[2];
                } 
               return ['',"Scheduled Hours: "+phour,"Clinical Hours: "+hour];
              },
              title: function() {
                return "";
            }
          }
        },
        legend: {
            display: true
         }
      };
public stackedChartOptionsUti1: any = {

    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
      animation: {
       duration: 1,
      easing: 'linear',
      onComplete: function () 
      {
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
              let dataDisplay = `${dataK}%`;
              ctx.font = Chart.helpers.fontString(11, 'normal','Gilroy-Bold');
              ctx.fillText(dataDisplay, bar._model.x, bar._model.y - 5);

              function shortenLargeNumber(num, digits) {
                var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
                    decimal;
            
                for(var i=units.length-1; i>=0; i--) {
                    decimal = Math.pow(1000, i+1);
            
                    if(num <= -decimal || num >= decimal) {
                        return +(num / decimal).toFixed(digits) + units[i];
                    }
                }
            
                return num;
            }
          });
        });
      }
      },
      fill:false,
    scales: {
      xAxes: [{ 
        ticks: {
          autoSkip: false,
          callback: function (value, index, values) {
            if(value.indexOf('--') >= 0){
              let lbl = value.split('--');
              value = lbl[0];
            }
            return value;
          }
        }
      }],
          yAxes: [{ 
            // stacked:true,
            ticks: {
              min:0,
              max:100,
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
          enabled : false
        },
        legend: {
            display: true
         }
      };

public stackedChartOptionsUtiDP = this.stackedChartOptionsUti;
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
                      custom: function(tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
  callbacks: {
    label: function(tooltipItems, data) { 
      return tooltipItems.xLabel+": "+tooltipItems.yLabel+ "%";
   },
   title: function() {
     return "";
   }
     
  }
},
  legend: {
            display: true
         }
};

public numOfTicksChartOptionsticks: any = {
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
                  custom: function(tooltip) {
    if (!tooltip) return;
    // disable displaying the color box;
    tooltip.displayColors = false;
  },
callbacks: {
label: function(tooltipItems, data) { 
  return tooltipItems.xLabel+": "+ tooltipItems.yLabel;
},
title: function() {
 return "";
}
 
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
public selectedDentist;
public dentists;
public duration='';
public utilityratemessage: boolean = false;
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
  public foregroundColor = "#4ccfae";
  public backgroundColor = '#f4f0fa';
  public  cap= "round";
  public  size = "250"
  public gaugeAppendText ='%';
  public startDate ='';
  public endDate = '';
  public DateDiffernce = '';
  public selectedValToggle ='off';
    myDateParser(dateStr : string) : string {
    // 2018-01-01T12:12:12.123456; - converting valid date format like this

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)

    let validDate = date;
    return validDate
  }
 loadDentist(newValue) {
   $('#title').html('<span>Front Desk</span>'); 
       $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) );

    if(newValue == 'all') {
      this.fdWorkTimeAnalysis();
      
      this.fdFtaRatio();
      this.fdUtaRatio();
      this.fdNumberOfTicks();
      this.fdRecallPrebookRate();
      this.fdtreatmentPrebookRate();
    }
  }

  public workTimeData = [
    {
      data: [], 
      label: '',
      backgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ],
      hoverBackgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ]
    }
  ];
  public workTimeLabels = [];
  
  public workTimeLabels1 = [];
  public workTimeData1 = [];
  public workTimeTotal;
  public prevWorkTimeTotal;
  public workTimeGoal;
  public prevWorkTimeTooltip ='down';
  public goalchecked='off';
    public stackedChartOptionssWT:any =this.stackedChartOptions;
public fdWorkTimeAnalysisLoader:boolean;
public fdUtiData:any = [];

  //Items Predictor Analysis 
  private fdWorkTimeAnalysis() {
    var user_id;
    var clinic_id;
    this.fdWorkTimeAnalysisLoader = true;
    this.workTimeLabels= [];
    if(this.DateDiffernce > '365'){
      this.utilityratemessage = true;
      this.fdWorkTimeAnalysisLoader = false;
    }else{
      this.utilityratemessage = false;
  this.clinic_id && this.frontdeskService.fdWorkTimeAnalysis(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
      this.fdUtiData = [];
    if(data.message == 'success'){
      this.fdWorkTimeAnalysisLoader = false;
      this.workTimeData1 =[];
      this.workTimeLabels1 =[];
      this.prevWorkTimeTooltip = 'down';
     if(data.data.length >0) {
        data.data.forEach(res => {
          if(res.util_rate > 0) {
            var temp =  {
            'name':  res.app_book_name, 
            'scheduled_hours':  res.planned_hour, 
            'clinican_hours':  res.worked_hour, 
            'util_rate':  Math.round(res.util_rate * 100), 
            };
            this.fdUtiData.push(temp);
            this.workTimeData1.push(Math.round(res.util_rate * 100));
            this.workTimeLabels1.push(res.app_book_name+'--'+res.worked_hour+'--'+res.planned_hour); 
          }
        });
     }
        this.workTimeData[0]['data'] = this.workTimeData1;
         this.workTimeLabels= this.workTimeLabels1;
         this.workTimeTotal = Math.round(data.total);
         this.prevWorkTimeTotal =  Math.round(data.total_ta);
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
  }

public ftaTotal;
public ftaPrevTotal;
public ftaTooltip='up';
public ftaGoal;
public maxftaGoal:any=0;

public fdFtaRatioLoader:any;

//Predictor Ratio :
  private fdFtaRatio() {
     if(this.duration){
      this.fdFtaRatioLoader = true;
    this.ftaTotal = 0;

       var user_id;
       var clinic_id;
  this.clinic_id && this.frontdeskService.fdFtaRatio(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
    this.ftaTotal = 0;
          this.ftaPrevTotal = 0;
       if(data.message == 'success'){
        this.fdFtaRatioLoader = false;
          if(data.total>100)
            data.total =100;
          if(data.total_ta>100)
            data.total_ta =100;
          this.ftaTotal = Math.round(data.total * 10) / 10;
          this.ftaPrevTotal = Math.round(data.total_ta * 10) / 10;
          this.ftaGoal = data.goals;
          if(this.ftaTotal> this.ftaGoal)
            this.maxftaGoal = this.ftaTotal;
          else
            this.maxftaGoal = this.ftaGoal;
          if(this.maxftaGoal ==0)
            this.maxftaGoal ='';
          if(this.ftaTotal>=this.ftaPrevTotal)
            this.ftaTooltip = 'down';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }


public utaTotal;
public utaPrevTotal;
public utaTooltip='up';
public utaGoal;
public fdUtaRatioLoader:boolean;
public maxutaGoal:any=0;
//Predictor Ratio :
  private fdUtaRatio() {
     if(this.duration){
      this.fdUtaRatioLoader = true;
     this.utaTotal = 0;

       var user_id;
       var clinic_id;
  this.clinic_id && this.frontdeskService.fdUtaRatio(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
     this.utaTotal = 0;
          this.utaPrevTotal = 0;
       if(data.message == 'success'){
        this.fdUtaRatioLoader = false;
          if(data.total>100)
            data.total =100;
          if(data.total_ta>100)
            data.data_ta =100;
          this.utaTotal = Math.round(data.total * 10) / 10;
          this.utaPrevTotal = Math.round(data.total_ta * 10) / 10;
          this.utaGoal = data.goals;
 if(this.utaTotal> this.utaGoal)
            this.maxutaGoal = this.utaTotal;
          else
            this.maxutaGoal = this.utaGoal;
          if(this.maxutaGoal ==0)
            this.maxutaGoal ='';
          if(this.utaTotal>=this.utaPrevTotal)
            this.utaTooltip = 'down';
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
public fdNumberOfTicksLoader:boolean;

//Predictor Ratio :
  private fdNumberOfTicks() {
     if(this.duration){
      this.fdNumberOfTicksLoader = true;
          this.ticksPrevTotal = 0;

       var user_id;
       var clinic_id;
    this.clinic_id &&  this.frontdeskService.fdNumberOfTicks(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.fdNumberOfTicksLoader = false;
        this.ticksPrevTotal = 0;
        this.ticksTotal = 0;
        if(data.data.length > 0)
          this.ticksTotal = Math.round(data.total);
          this.ticksPrevTotal = Math.round(data.total_ta);
          if(this.ticksTotal >= this.ticksPrevTotal)
            this.ticksTooltip = 'up';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public recallPrebookTotal;
public recallPrebookGoal=0;
public recallPrebookPrevTotal;
public recallPrebookTooltip='down';
public fdRecallPrebookRateLoader:boolean;
public maxrecallPrebookGoal:any=0;

//Predictor Ratio :
  private fdRecallPrebookRate() {
     if(this.duration){
      this.fdRecallPrebookRateLoader = true;
      this.recallPrebookTotal =0;
       var user_id;
       var clinic_id;
     this.clinic_id && this.frontdeskService.fdRecallPrebookRate(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.fdRecallPrebookRateLoader = false;
          this.recallPrebookPrevTotal = 0;
          this.recallPrebookGoal= data.goals;
          this.recallPrebookTotal = 0;
          this.recallPrebookTotal = Math.round(data.total);
          this.recallPrebookPrevTotal = Math.round(data.total_ta);
          if(this.recallPrebookTotal>=this.recallPrebookPrevTotal)
            this.recallPrebookTooltip = 'up';
          this.maxrecallPrebookGoal = this.recallPrebookGoal;          
          if(this.maxrecallPrebookGoal <= 0)
            this.maxrecallPrebookGoal = this.recallPrebookTotal;
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public treatmentPrebookTotal;
public treatmentPrebookGoal=0;

public treatmentPrebookPrevTotal;
public treatmentPrebookTooltip='down';
public fdtreatmentPrebookRateLoader: boolean;
public maxtreatmentPrebookGoal:any=0;
//Predictor Ratio :
  private fdtreatmentPrebookRate() {
     if(this.duration){
      this.fdtreatmentPrebookRateLoader = true;
        this.treatmentPrebookTotal = 0;

       var user_id;
       var clinic_id;
     this.clinic_id && this.frontdeskService.fdReappointRate(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.fdtreatmentPrebookRateLoader = false;
          this.treatmentPrebookPrevTotal = 0;
        this.treatmentPrebookTotal = 0;
        this.treatmentPrebookGoal= data.goals;
          this.treatmentPrebookTotal = Math.round(data.total);
          this.treatmentPrebookPrevTotal = Math.round(data.total_ta);
          if(this.treatmentPrebookTotal>=this.treatmentPrebookPrevTotal)
            this.treatmentPrebookTooltip = 'up';
          if(this.treatmentPrebookTotal> this.treatmentPrebookGoal)
            this.maxtreatmentPrebookGoal = this.treatmentPrebookTotal;
          else
            this.maxtreatmentPrebookGoal = this.treatmentPrebookGoal;
          if(this.maxtreatmentPrebookGoal ==0)
            this.maxtreatmentPrebookGoal ='';
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
       if(now.getDay()==0)
          var day = 7;
        else
          var day = now.getDay();

       var first = now.getDate() - day +1;
       var last = first + 6; 
       this.startDate = this.datePipe.transform(new Date(now.setDate(first)).toUTCString(), 'dd-MM-yyyy');
       var end = new Date();
        end.setFullYear(now.getFullYear());
        end.setMonth(now.getMonth()+1);
        end.setDate(last);
       this.endDate =this.datePipe.transform(new Date(end).toUTCString(), 'dd-MM-yyyy');
       this.duration='w';
       this.DateDiffernce='';
        this.loadDentist('all');
    }
    else if (duration == 'm') {
      this.trendText= 'Last Month';
      this.currentText= 'This Month';

      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
        this.duration='m';
        this.DateDiffernce='';
            this.loadDentist('all');
    }
    else if (duration == 'lm') {
      this.duration = 'lm';
      this.trendText = 'Previous Month';
      this.currentText = 'Last Month';

      const date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() - 1, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 0), 'dd-MM-yyyy');
      this.DateDiffernce='';
      this.loadDentist('all');
    }
    else if (duration == 'q') {
      this.trendText= 'Last Quarter';
      this.currentText= 'This Quarter';

      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy')
        ;
      }
      else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'dd-MM-yyyy'); 
      }
      else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'dd-MM-yyyy'); 
      }
      else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 12, 0), 'dd-MM-yyyy');  
      }
      this.duration='q';
      this.DateDiffernce='';
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.loadDentist('all');
    }
    else if (duration == 'lq') {
      this.trendText= 'Previous Quarter';
      this.currentText= 'Last Quarter';

      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
     
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear() -1, 9, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear()-1, 12, 0), 'dd-MM-yyyy');
      }
      else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy'); }
      else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'dd-MM-yyyy'); }
      else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'dd-MM-yyyy');  }
        this.duration='lq';
        this.DateDiffernce='';
            this.loadDentist('all');
   
    }
    else if (duration == 'cytd') {
      this.trendText = 'Last Year';
      this.currentText = 'This Year';
      this.duration = 'cytd';
      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.DateDiffernce='';
      this.loadDentist('all');
    }
    else if (duration == 'lcytd') {
        this.trendText = 'Previous Year';
        this.currentText = 'Last Year';
        this.duration = 'lcytd';
        var date = new Date();
         this.startDate = this.datePipe.transform(new Date(date.getFullYear() -1, 0, 1), 'dd-MM-yyyy');       
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() -1, 11, 31), 'dd-MM-yyyy');
        this.DateDiffernce='';
        this.loadDentist('all');
      }
    else if (duration == 'fytd') {
      this.duration = 'fytd';
      this.trendText = 'Last Financial Year';
      this.currentText = 'This Financial Year';

      var date = new Date();
      if ((date.getMonth() + 1) <= 6) {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 6, 1), 'dd-MM-yyyy');
      } else {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 6, 1), 'dd-MM-yyyy');
      }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.DateDiffernce='';
      this.loadDentist('all');
    }
     else if (duration == 'lfytd') {
        this.trendText = 'Previous Financial Year';
        this.currentText = 'Last Financial Year';
        this.duration = 'lfytd'
        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');       
        this.DateDiffernce='';
        this.loadDentist('all');
      }
     else if (duration == 'custom') {
      this.trendText= '';
      this.currentText= '';
        this.duration='custom';
     $('.customRange').css('display','block');
     let selectedDate = this.chartService.customSelectedDate$.value;
     this.startDate = this.datePipe.transform(selectedDate.startDate, 'dd-MM-yyyy');
     this.endDate = this.datePipe.transform(selectedDate.endDate, 'dd-MM-yyyy');

     var date1:any= new Date(selectedDate.startDate);
     var date2:any= new Date(selectedDate.endDate);
     var diffTime:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
     if(diffTime > 365){
      this.DateDiffernce = diffTime;
     }else{
      this.DateDiffernce = '';
     }

     this.loadDentist("all");
    }
    $('.filter').removeClass('active');
    $('.filter_'+duration).addClass("active");
      // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
      

  }

choosedDate(val) {
    val = (val.chosenLabel);
    var val= val.toString().split(' - ');
    // calculating date differnce
     var date2:any= new Date(val[1]);
     var date1:any= new Date(val[0]);
     var diffTime:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
     if(diffTime > 365){
      this.DateDiffernce = diffTime;
     }else{
      this.DateDiffernce = '';
     }
      this.startDate = this.datePipe.transform(val[0], 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(val[1], 'dd-MM-yyyy');
      this.duration = 'custom';
      this.loadDentist('all');
      
      // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
     $('.customRange').css('display','none');
}
toggleFilter(val) {
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_'+val).addClass('mat-button-toggle-checked');
    $('.filter').removeClass('active');
    this.Apirequest = 0;
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
  showTrend: boolean = false;
toggleChangeProcess(){
  this.Apirequest = 6;
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
  public fdFtaRatioTrendLoader:boolean;
  private fdFtaRatioTrend() {
    this.fdFtaRatioTrendLoader =true;
  this.ftaChartTrendLabels=[];
  
  this.ftaChartTrendLabels1=[];
  this.ftaChartTrend1=[];
    var user_id;
    var clinic_id;
   this.clinic_id && this.frontdeskService.fdFtaRatioTrend(this.clinic_id,this.trendValue).subscribe((data) => {
      this.ftaChartTrendLabels1=[];
  this.ftaChartTrend1=[];
  this.Apirequest = this.Apirequest -1;
       if(data.message == 'success'){
        this.fdFtaRatioTrendLoader =false;
                data.data.forEach(res => {  
                  if(res.val>100)
                    res.val =100;
                     this.ftaChartTrend1.push(Math.round(res.fta_ratio * 10) /10);
                   if(this.trendValue == 'c')
                   this.ftaChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                    else
                   this.ftaChartTrendLabels1.push(res.year);
                  
                 });
                 this.ftaChartTrend[0]['data'] = this.ftaChartTrend1;
                 this.ftaChartTrendLabels =this.ftaChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

  public wtaChartTrend: any[]  = [
    {data: [], label: '',  
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
            backgroundOverlayMode: 'multiply'}];
    public wtaChartTrend1=[];
  public wtaChartTrendLabels =[];
  public wtaChartTrendLabels1 =[];
  public fdwtaRatioTrendLoader:boolean;
  
  private fdwtaRatioTrend() {
    this.fdwtaRatioTrendLoader =true;
  this.wtaChartTrendLabels=[];
 
  this.wtaChartTrendLabels1=[];
  this.wtaChartTrend1=[];
    var user_id;
    var clinic_id;
    if(this.trendValue == 'h' ){ // utilisation rate showing messageif more than 12 months
      this.utilityratemessage = true;
      this.Apirequest = this.Apirequest -1;
      this.fdwtaRatioTrendLoader =false;
    }else{
      this.utilityratemessage = false;
    this.clinic_id && this.frontdeskService.fdWorkTimeAnalysisTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       this.wtaChartTrendLabels1=[];
    this.wtaChartTrend1=[];
    this.Apirequest = this.Apirequest -1;
       if(data.message == 'success'){
        this.fdwtaRatioTrendLoader =false;
                data.data.forEach(res => {  
                     this.wtaChartTrend1.push(Math.round(res.util_rate * 100));
                   if(this.trendValue == 'c')
                   this.wtaChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y')+'--'+res.worked_hour+'--'+res.planned_hour);
                    else
                   this.wtaChartTrendLabels1.push(res.year+'--'+res.worked_hour+'--'+res.planned_hour);
                  
                 });
                 this.wtaChartTrend[0]['data'] = this.wtaChartTrend1;

                 this.wtaChartTrendLabels =this.wtaChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }
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
  public fdUtaRatioTrendLoader:boolean;

  private fdUtaRatioTrend() {
    this.fdUtaRatioTrendLoader = true;
  this.utaChartTrendLabels1=[];
  this.utaChartTrendLabels=[];

  this.utaChartTrend1=[];
    var user_id;
    var clinic_id;
   this.clinic_id && this.frontdeskService.fdUtaRatioTrend(this.clinic_id,this.trendValue).subscribe((data) => {
      this.utaChartTrendLabels1=[];
  this.utaChartTrend1=[];
  this.Apirequest = this.Apirequest -1;
       if(data.message == 'success'){
        this.fdUtaRatioTrendLoader = false;
                data.data.forEach(res => {  
                  if(res.val>100)
                    res.val =100;
                     this.utaChartTrend1.push(Math.round(res.uta_ratio * 10) /10 );
                   if(this.trendValue == 'c')
                   this.utaChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                    else
                   this.utaChartTrendLabels1.push(res.year);
                  
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
  public fdNumberOfTicksTrendLoader:boolean;

  private fdNumberOfTicksTrend() {
    this.fdNumberOfTicksTrendLoader = true;
  this.tickChartTrendLabels=[];
  this.tickChartTrendLabels1=[];
  this.tickChartTrend1=[];
    var user_id;
    var clinic_id;
   this.clinic_id && this.frontdeskService.fdNumberOfTicksTrend(this.clinic_id,this.trendValue).subscribe((data) => {
      this.tickChartTrendLabels1=[];
  this.tickChartTrend1=[];
  this.Apirequest = this.Apirequest -1;
       if(data.message == 'success'){
        this.fdNumberOfTicksTrendLoader = false;
                data.data.forEach(res => {  
                     this.tickChartTrend1.push(res.num_ticks);
                   if(this.trendValue == 'c')
                   this.tickChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                    else
                   this.tickChartTrendLabels1.push(res.year);
                  
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
  public fdRecallPrebookRateTrendLoader:boolean;

  private fdRecallPrebookRateTrend() {
    this.fdRecallPrebookRateTrendLoader = true;
  this.recallPrebookChartTrendLabels=[];

  this.recallPrebookChartTrendLabels1=[];
  this.recallPrebookChartTrend1=[];
    var user_id;
    var clinic_id;
   this.clinic_id && this.frontdeskService.frontdeskdRecallPrebookRateTrend(this.clinic_id,this.trendValue).subscribe((data) => {
    this.Apirequest = this.Apirequest -1;  
    if(data.message == 'success'){
          this.fdRecallPrebookRateTrendLoader = false;
          this.recallPrebookChartTrendLabels1=[];
          this.recallPrebookChartTrend1=[];
          data.data.forEach(res => {  
            this.recallPrebookChartTrend1.push(Math.round(res.recall_percent));
             if(this.trendValue == 'c')
                    this.recallPrebookChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                    else
                   this.recallPrebookChartTrendLabels1.push(res.year);
                  
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
  public fdTreatmentPrebookRateTrendLoader:boolean = false;

  private fdTreatmentPrebookRateTrend() {
    this.fdTreatmentPrebookRateTrendLoader = true;
  this.treatmentPrebookChartTrendLabels1=[];
  this.treatmentPrebookChartTrendLabels=[];

  this.treatmentPrebookChartTrend1=[];
    var user_id;
    var clinic_id;
   this.clinic_id && this.frontdeskService.fdReappointRateTrend(this.clinic_id,this.trendValue).subscribe((data) => {
    this.Apirequest = this.Apirequest -1;   
    if(data.message == 'success'){
        this.fdTreatmentPrebookRateTrendLoader = false;
          this.treatmentPrebookChartTrendLabels1=[];
          this.treatmentPrebookChartTrend1=[];
                data.data.forEach(res => {  
                     this.treatmentPrebookChartTrend1.push(Math.round(res.reappoint_rate));
                   if(this.trendValue == 'c')
                   this.treatmentPrebookChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                    else
                   this.treatmentPrebookChartTrendLabels1.push(res.year);
                  
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

    getChartsTips() {
      this.chartstipsService.getCharts(3).subscribe((data) => {
        if(data.message == 'success')
        {         
          this.charTips = data.data;
        }
      }, error => {});
    }

    setTopValues(){
      if(this.showTopVlaues == false){
        this.showTopVlaues = true;
        this.stackedChartOptionsUtiDP = this.stackedChartOptionsUti1;
      } else {
        this.showTopVlaues = false;
        this.stackedChartOptionsUtiDP = this.stackedChartOptionsUti;
      }
    }
    showTable(val){
      this.showUtiTable = val;
    }
  }
