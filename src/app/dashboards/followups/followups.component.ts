import * as $ from 'jquery';
import { Component, AfterViewInit, ViewEncapsulation , ViewChild,ElementRef } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ChartService } from '../chart.service';
import { FollowupsService } from './followups.service';
import { ChartstipsService } from '../../shared/chartstips.service';
@Component({
  templateUrl: './followups.component.html',
  styleUrls: ['./followups.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FollowupsComponent implements AfterViewInit {
  public trendText;
  public currentText;
  public goalCount = 1; 
  public startDate:any; 
  public endDate:any; 
  public duration:any; 
  public trendValue:any = ''; 
  public Apirequest:any = 0; 
  public showTrend:boolean = false; 
  public toggleChecked:boolean = false; 
  public barChartColors: Array<any>;
  public colors: any = [{backgroundColor: '#39acac'}, {backgroundColor: '#48daba'}];
  public colorScheme = {domain: ['#6edbba', '#abb3ff', '#b0fffa', '#ffb4b5', '#d7f8ef', '#fffdac', '#fef0b8', '#4ccfae']};
  public single = [];
  public arcWidth = 0.75;
  public foregroundColor= "#39acac";
  public backgroundColor = '#f4f0fa';
    private legendLabelOptions = {
    labels: {
      usePointStyle: true,
      padding: 20
    },
    onClick: function (e) {
      e.stopPropagation();
    }
  };

  public perUserData: any[] = [
    {data: [], label: 'Ticks'},
    {data: [], label: 'Post Op' },
    {data: [], label: 'Recall' },
    {data: [], label: 'Ftas' }
  ];
  public clinic_id:any;
    public stackedChartOptions: any = {
      hover: { 
        mode: null
    },
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
        legend: {
            display: true,
            position: 'top',
            ...this.legendLabelOptions,
         },
          tooltips: {
            mode: 'x-axis',
            custom: function(tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = true;
      },
  callbacks: {
     label: function(tooltipItems, data) { 
       if(tooltipItems.yLabel > 0 && data.datasets[tooltipItems.datasetIndex].label != ''){
        if(data.datasets[tooltipItems.datasetIndex].label.indexOf('DentistMode-') >= 0){
          return tooltipItems.label+": "+tooltipItems.yLabel;
        } else {
          return data.datasets[tooltipItems.datasetIndex].label+": "+tooltipItems.yLabel;          
        }
        
       }
     },
     title : function(tooltip, data){
      if( data.datasets[0].label.indexOf('DentistMode-') >= 0){
          var dentist = data.datasets[0].label.split('Mode-');
          return dentist[1];
      } else {
        return tooltip[0].label;
      }
     }
  }
}

  };


    public IPcolors = [
    { backgroundColor: '#6cd8ba' },
    { backgroundColor: '#b0fffa' },
    { backgroundColor: '#abb3ff' },
    { backgroundColor: '#feefb8' },
    { backgroundColor: '#ffb4b5' },
    { backgroundColor: '#fffcac' }
  ];

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
            return label;
            /*const names = this.splitName(label);
            if (names.length > 1) {
              return `${names[0][0]} ${names[1]}`
            } else return `${names[0]}`;*/
          }
        },
      }],
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          userCallback: (label, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return this.decimalPipe.transform(label);
            }

          },
        },
        gridLines: {}
      }],
    },
    tooltips: {
      mode: 'x-axis',
      bodyFontFamily: 'Gilroy-Regular',
      cornerRadius: 0,
      callbacks: {
        label: (tooltipItem) => {
          return this.splitName(tooltipItem.xLabel).join(' ') + ": " + this.decimalPipe.transform(tooltipItem.yLabel);
        },
        title: function () {
          return;
        }
      }
    }
  };

  public barChartOptions1: any = {
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
            return label;
            /*const names = this.splitName(label);
            if (names.length > 1) {
              return `${names[0][0]} ${names[1]}`
            } else return `${names[0]}`;*/
          }
        },
      }],
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          userCallback: (label, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return this.decimalPipe.transform(label)+'%';
            }

          },
        },
        gridLines: {}
      }],
    },
    tooltips: {
      mode: 'x-axis',
      bodyFontFamily: 'Gilroy-Regular',
      cornerRadius: 0,
      callbacks: {
        label: (tooltipItem) => {
          return this.splitName(tooltipItem.xLabel).join(' ') + ": " + this.decimalPipe.transform(tooltipItem.yLabel)+'%';
        },
        title: function () {
          return;
        }
      }
    }
  };


  constructor(
      private datePipe: DatePipe ,
      private chartService: ChartService,
      private decimalPipe: DecimalPipe,
      private followupsService: FollowupsService,
      public chartstipsService: ChartstipsService
    )
  {
   this.getChartsTips();
  }

  ngAfterViewInit(){
    $('#title').html('<span>Follow Ups</span>');
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
    });
    //
    /*$('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) );*/

  }
  splitName(name: string) {
    const regex = /\w+\s\w+(?=\s)|\w+/g;
    return name.toString().trim().match(regex);
  }

  async initiate_clinic() {
    var val = $('#currentClinic').attr('cid');
    if (val != undefined && val != 'all') {
      this.clinic_id = val;
      this.filterDate(this.chartService.duration$.value);
      $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) );
    }
  }

  pieTooltipText({ data, index}) {
    const labl = data.name.split("--");
    const label = labl[0];
    const val = data.value;
    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val"> ${val}%</span>
    `;
  }
  
  pieLabelText(labels) {
    const labl = labels.split("--");
    return labl[0];
  }  

  choosedDate(val) {
    val = (val.chosenLabel);
    var val= val.toString().split(' - ');
    this.startDate = this.datePipe.transform(val[0], 'dd-MM-yyyy');
    this.endDate = this.datePipe.transform(val[1], 'dd-MM-yyyy');
    this.duration = 'custom';
    $('.customRange').css('display','none');
  }

  formatDate(date) {
    if(date) {
      var dateArray = date.split("-")
      const d = new Date();
      d.setFullYear(+dateArray[2], (+dateArray[1]-1), +dateArray[0])
      const formattedDate = this.datePipe.transform(d, 'dd MMM yyyy');
      return formattedDate;
    } else return date;
  }

  filterDate(duration) {
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_off').addClass('mat-button-toggle-checked');
    $('.customRange').css('display','none');
    this.showTrend = false;
    if (duration == 'm') {
      this.goalCount = 1;
      this.trendText= 'Last Month';
      this.currentText= 'This Month';
      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.duration='m';
    }
    else if (duration == 'lm') 
    {
      this.goalCount = 1;
      this.trendText = 'Previous Month';
      this.currentText = 'Last Month';
      const date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() - 1, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 0), 'dd-MM-yyyy');
      this.duration='lm';
    }
    else if (duration == 'q')
    {
      this.goalCount = 3;
      this.trendText= 'Last Quarter';
      this.currentText= 'This Quarter';
      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
      } else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'dd-MM-yyyy');
      } else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'dd-MM-yyyy');
      } else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 1), 'dd-MM-yyyy');
      }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.duration='q';     
    } else if (duration == 'lq') {
      this.goalCount = 3;
      this.trendText= 'Previous Quarter';
      this.currentText= 'Last Quarter';
      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear() -1, 9, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear()-1, 12, 0), 'dd-MM-yyyy');
      } else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy'); 
      } else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'dd-MM-yyyy'); 
      } else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'dd-MM-yyyy');  
      }
        this.duration='lq';
    } else if (duration == 'cytd') {
      this.trendText= 'Last Year';
      this.currentText= 'This Year';
      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      var difMonths = new Date().getMonth() - new Date(date.getFullYear(), 0, 1).getMonth();
      this.goalCount = difMonths + 1;    
      this.duration='cytd';
    } else if (duration == 'lcytd') {
        this.trendText = 'Previous Year';
        this.currentText = 'Last Year';
        this.duration = 'lcytd';
        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() -1, 0, 1), 'dd-MM-yyyy');       
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() -1, 11, 31), 'dd-MM-yyyy');
        this.goalCount = 12;
    } else if (duration == 'fytd') {
      this.trendText= 'Last Financial Year';
      this.currentText= 'This Financial Year';
      var date = new Date();
      if ((date.getMonth() + 1) <= 6) {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear()-1, 6, 1), 'dd-MM-yyyy');
      } else {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 6, 1), 'dd-MM-yyyy');
      }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

      if ((date.getMonth() + 1) <= 6) {
        this.goalCount =this.monthDiff(new Date(date.getFullYear() -1, 6, 1), new Date());
      } else {
        this.goalCount =this.monthDiff(new Date(date.getFullYear(), 6, 1), new Date());
      }     
      this.duration='fytd';
    } else if (duration == 'lfytd') {
        this.trendText = 'Previous Financial Year';
        this.currentText = 'Last Financial Year';
        this.duration = 'lfytd'
        this.goalCount = 12;
        var date = new Date();
         if ((date.getMonth() + 1) <= 6) {
          this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
        } else {
          this.startDate = this.datePipe.transform(new Date(date.getFullYear() -1, 6, 1), 'dd-MM-yyyy');
        }
        if ((date.getMonth() + 1) <= 6) {          
         this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');
        } else {
          this.endDate = this.datePipe.transform(new Date(date.getFullYear(), 5, 30), 'dd-MM-yyyy');
        }
    /*    this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');       */
    } else if (duration == 'custom') {
      this.trendText= '';
      this.duration='custom';
      this.currentText= '';
      let selectedDate = this.chartService.customSelectedDate$.value;
      this.startDate = this.datePipe.transform(selectedDate.startDate, 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(selectedDate.endDate, 'dd-MM-yyyy');
      $('.customRange').css('display','block');
    }
    $('.filter').removeClass('active');
    $('.filter_'+duration).addClass("active");

    this.getFollowupsPerUser();
    this.getFollowupOutcome();
    this.getConversion();
    this.getConversionPerUser();
    this.getCompletionRate();
  }

  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  toggleFilter(val) {
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_'+val).addClass('mat-button-toggle-checked');
    $('.filter').removeClass('active');
    this.Apirequest = 0;
    var date = new Date();
    this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    if(val == 'current') {
     this.toggleChecked = true;
     this.trendValue = 'c';
     this.startDate = this.datePipe.transform(new Date(date.getFullYear()-1, date.getMonth(), 1), 'dd-MM-yyyy');
     this.showsTrend();
    } else if(val == 'historic') {
      this.toggleChecked = true;
      this.trendValue = 'h';
      this.startDate = this.datePipe.transform(new Date(date.getFullYear()-10, date.getMonth(), 1), 'dd-MM-yyyy');
      this.showsTrend();
    } else if(val == 'off') {
      this.showTrend = false;
    }
  }

  showsTrend() {
    this.Apirequest = 1;
    this.showTrend = true;  
    /***** Call Trend Function*********/
    /***** Call Trend Function*********/    
  }


  
  public perUserLabels:any = [];
  public perUserTotal:any = 10;
  public perUserPrev:any = 20;
  public perUserGoal:any = 10;
  public perUserStatus:any = 'up';
  public perUserLoader:boolean = false;
  
  public perUserData1:any = [];
  public perUserData2:any = [];
  public perUserData3:any = [];
  public perUserData4:any = [];
  

  getFollowupsPerUser(){
    this.perUserLoader = true;
    this.followupsService.getFollowupsPerUser(this.clinic_id, this.startDate, this.endDate,this.duration).subscribe((res) => {
      this.perUserData = [
        {data: [], label: 'Ticks'},
        {data: [], label: 'Post Op' },
        {data: [], label: 'Recall' },
        {data: [], label: 'Ftas' }
      ];
      this.perUserData1 = [];
      this.perUserData2 = [];
      this.perUserData3 = [];
      this.perUserData4 = [];
      this.perUserLoader = false;
      this.perUserLabels = [];
      if(res.message == 'success'){        
        var allData = [];
        res.data.forEach((response) => {
          this.perUserData1.push(response.num_ticks);
          this.perUserData2.push(response.num_postop);
          this.perUserData3.push(response.num_recall);
          this.perUserData4.push(response.num_ftas);
          this.perUserLabels.push(response.completed_by);
        });

        this.perUserData[0]['data'] = this.perUserData1;
        this.perUserData[1]['data'] = this.perUserData2;
        this.perUserData[2]['data'] = this.perUserData3;
        this.perUserData[3]['data'] = this.perUserData4;
        this.perUserTotal = res.total;
        this.perUserGoal = res.goal;
        this.perUserPrev = res.total_ta;
      }
    }, error => {
      
    });
  }
  public outcomeType:any = '1';
  public outcomePrev:any = 10;
  public outcomeGoal:any = 50;
  public outcomeTotal:any = 30;
  public outcomeStatus:any = 'up';
  public outcomeLoader:boolean = false;

   public singleTick = [];
   public singleRecall = [];
   public singleFta = [];
  getFollowupOutcome(){

     this.followupsService.getFollowupOutcome(this.clinic_id, this.startDate, this.endDate,this.duration).subscribe((res) => {
      this.outcomeLoader = false;
      this.singleTick = [];
      this.singleRecall = [];
      this.singleFta = [];
      if(res.message == 'success'){  
        this.outcomeTotal = res.total;
        this.outcomePrev = res.total_ta;
        this.outcomeGoal = res.goals;
        /****** Tick ******/
        if(typeof(res.data.ticks) != 'undefined')
        {
          res.data.ticks.forEach( (response) => {
            if(response.status){
              var temp = { name: response.status,value: response.status_percent};  
              this.singleTick.push(temp);
            }
          });          
        }        
        /****** Tick ******/
        /****** recalls ******/
        if(typeof(res.data.recalls) != 'undefined')
        {
          res.data.recalls.forEach( (response) => {
            if(response.status){
              var temp = { name: response.status,value: response.status_percent};  
              this.singleRecall.push(temp);  
            }
            
          });          
        }        
        /****** recalls ******/
        /****** ftas ******/
        if(typeof(res.data.ftas) != 'undefined')
        {
          res.data.ftas.forEach( (response) => {
            if(response.status){
              var temp = { name: response.status,value: response.status_percent};  
              this.singleFta.push(temp);
            }
          });          
        }        
        /****** ftas ******/


             
      }
    }, error => {
      
    });

  
  }

  public conversionPrev:any = 10;
  public conversionGoal:any = 50;
  public conversionTotal:any = 0;
  public conversionStatus:any = 'up';
  public numBooked:any = 0;    
  public totalNum:any = 0;    
  getConversion(){
     this.followupsService.getConversion(this.clinic_id, this.startDate, this.endDate,this.duration).subscribe((res) => {
      this.outcomeLoader = false;
      if(res.message == 'success'){  
          this.conversionTotal = res.data;         
      }
    }, error => {      
    });   
  }


  public conversionPerUserData: any[] = [];
  public conversionPerUserLabels:any = [];
  public conversionPerUserTotal:any = 10;
  public conversionPerUserPrev:any = 20;
  public conversionPerUserGoal:any = 10;
  public conversionPerUserStatus:any = 'up';
  getConversionPerUser(){

    this.followupsService.getConversionPerUser(this.clinic_id, this.startDate, this.endDate,this.duration).subscribe((res) => {
      this.outcomeLoader = false;
      if(res.message == 'success'){  
        this.conversionPerUserData[0]['data'] = [60,90,50,26];
        this.conversionPerUserLabels = ['One','Two','Three','Four'];
      }
    }, error => {
      
    });
    
  }

  public completionRateData: any[] = [];
  public completionRateLabels:any = [];
  public completionRateTotal:any = 10;
  public completionRatePrev:any = 20;
  public completionRateGoal:any = 10;
  public completionRateStatus:any = 'up';
  getCompletionRate(){
    this.followupsService.getCompletionRate(this.clinic_id, this.startDate, this.endDate,this.duration).subscribe((res) => {
      this.outcomeLoader = false;
      this.completionRateData[0]['data'] = [];
      this.completionRateLabels = [];
      if(res.message == 'success'){  
        var allCompletionRate = [];
        this.completionRateTotal = res.total;
        this.completionRatePrev = res.total_ta;
        this.completionRateGoal = res.goals;
        res.data.forEach( (response) => {
          if(parseInt(response.completion_rate) > 0){
            allCompletionRate.push(response.completion_rate);
            this.completionRateLabels.push(response.type);
          }
        });
        this.completionRateData[0]['data'] = allCompletionRate;
      }
    }, error => {
      
    });
    
  }

  public charTips:any = [];
  getChartsTips() {
    this.chartstipsService.getCharts(9).subscribe((data) => {
       if(data.message == 'success'){         
        this.charTips = data.data;
       }
    }, error => {});
  }

  followupOutcomeTab(number){
    this.outcomeType = number;
  }
}