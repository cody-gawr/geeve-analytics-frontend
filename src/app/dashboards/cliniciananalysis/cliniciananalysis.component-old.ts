import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit, Pipe, PipeTransform, ViewChild, ElementRef  } from '@angular/core';
import { ClinicianAnalysisService } from './cliniciananalysis.service';
import { DentistService } from '../../dentist/dentist.service';

import * as frLocale from 'date-fns/locale/fr';
import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import 'chartjs-plugin-style';
import { HeaderService } from '../../layouts/full/header/header.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppHeaderrightComponent } from '../../layouts/full/headerright/headerright.component';
export interface Dentist {
  providerId: string;
  name: string;
}
declare var Chart: any; 
@Component({
  templateUrl: './cliniciananalysis.component.html'
})
export class ClinicianAnalysisComponentold implements AfterViewInit {
   @ViewChild("myCanvas") canvas: ElementRef;

  lineChartColors;
  subtitle: string;
  public id:any ={};
  public clinic_id:any ={};
  public UrlSegment:any ={};
  public dentistCount:any ={};
  public doughnutChartColors=[];
  public startDate ='';
  public endDate = '';
  
  constructor(private cliniciananalysisService: ClinicianAnalysisService, private dentistService: DentistService, private datePipe: DatePipe, private route: ActivatedRoute,  private headerService: HeaderService){
  }
  private warningMessage: string;
  ngAfterViewInit() {   this.route.params.subscribe(params => {
      this.filterDate('m');
      this.clinic_id = this.route.snapshot.paramMap.get("id");
      this.getDentists();
    this.loadDentist('all');
    $('.external_dentist').val('all');
    $('#title').html('Clinician Analysis');

    var ctx = this.canvas.nativeElement.getContext("2d");
    Chart.types.Bar.extend({
    name: "BarAlt",
    initialize: function (data) {
        Chart.types.Bar.prototype.initialize.apply(this, arguments);
        
        if (this.options.curvature !== undefined && this.options.curvature <= 1) {
            var rectangleDraw = this.datasets[0].bars[0].draw;
            var self = this;
            var radius = this.datasets[0].bars[0].width * this.options.curvature * 0.2;
            
            // override the rectangle draw with ours
            this.datasets.forEach(function (dataset) {
                dataset.bars.forEach(function (bar) {
                    bar.draw = function () {
                        // draw the original bar a little down (so that our curve brings it to its original position)
                        var y = bar.y;
                        // the min is required so animation does not start from below the axes
                        bar.y = Math.min(bar.y + radius, self.scale.endPoint - 1);
                        // adjust the bar radius depending on how much of a curve we can draw
                        var barRadius = (bar.y - y);
                        rectangleDraw.apply(bar, arguments);
                        
                        // draw a rounded rectangle on top
                        Chart.helpers.drawRoundedRectangle(self.chart.ctx, bar.x - bar.width / 2, bar.y - barRadius + 1, bar.width, bar.height, barRadius);
                        ctx.fill();
                        
                        // restore the y value
                        bar.y = y;
                    }
                })
            })
        }
    }
});


    }); 
  //this.canvas = (<HTMLElement>document.getElementById('#'))
  let gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(104, 255, 249, 1)');
gradient.addColorStop(1, 'rgba(28, 164, 159, 1)');
let gradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
gradient2.addColorStop(1, '#4FC1D1');
gradient2.addColorStop(0,  '#BFE8EE');
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
 this.doughnutChartColors = [{backgroundColor: [gradient,gradient2, '#dadada']}];

    //this.recallChartTreatment();
  }
  dentists: Dentist[] = [
   { providerId: 'all', name: 'All Dentists' },
  ];
    public barChartColors: Array<any> = [
    { backgroundColor: '#5CB25D' },
    { backgroundColor: '#5CB25D' },
    { backgroundColor: '#33A5F5' },
    { backgroundColor: '#5CB25D' },
    { backgroundColor: '#C53D43' },
    { backgroundColor: '#FDBD56' }
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
  public treatmentChartLabels: string[] = [];  
  public barChartLabels1: string[] = [];
  public planChartLabels1: string[] = [];
  public recallChartLabels1: string[] = [];
  public treatmentChartLabels1: string[] = [];
  public doughnutChartLabels: string[] =  [];
  public doughnutChartLabels1: string[] = [];
  public doughnutChartType:string = 'doughnut';

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
    {data: [], label: 'Completed Fees',hidden: true,  shadowOffsetX: 3,
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
  public recallChartData: any[] = [
    {data: [50,30,20], label: 'Recall Rate'},
    {data: [50,30,20], label: 'Rebook Rate'}  
  ];  
  public treatmentChartData: any[] = [
    {data: [50,30,20], label: 'Recall Rate'},
    {data: [50,30,20], label: 'Rebook Rate'}  
  ];  
  public doughnutChartData: number[] = [350, 450, 100];
  public selectedDentist: string;
  public barChartData1: any[] = [];
  public planChartData1: any[] = [];
  public planChartData2: any[] = [];  
  public recallChartData1: any[] = [];    
  public treatmentChartData1: any[] = [];
  public doughnutChartData1: number[] = [];   

  //Total  
  public productionTotal = 0;
  public productionTotalAverage = 0;
  public productionGoal = 0;
  public planTotal = 0;
  public planTotalAverage = 0;
  public planTotalGoal = 0;

  public recallTotal = 0;
  public recallTotalAverage = 0;
  public treatmentTotal = 0;
  public treatmentTotalAverage = 0;  
  public doughnutTotal = 0;
  public doughnutTotalAverage = 0;  
  public doughnutGoals = 0;  
  public gaugePrependText = "$";
  public gaugeDuration ='25000';
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
              userCallback: function(item) {
                  return '$' + item;
                },
            }, 
            }],
        },
        tooltips: {
  callbacks: {
     label: function(tooltipItems, data) { 
                      return data.datasets[tooltipItems.datasetIndex].label+": $"+tooltipItems.yLabel;
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
  };
 private loadDentist(newValue) {
  if(newValue == 'all') {
    this.buildChartNopatients();
    
    this.buildChart();
    this.buildChartTreatment();
    (<HTMLElement>document.querySelector('.dentistProductionSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.dentistProduction')).style.display = 'block';

    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'block';

    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'block';
  }
  else {
    this.selectedDentist = newValue;
    this.buildChartDentist();
    (<HTMLElement>document.querySelector('.dentistProductionSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.dentistProduction')).style.display = 'none';

    this.buildChartTreatmentDentist();
    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'none';

    this.buildChartNopatientsDentist();
    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'none';
  }

  }

  //Dentist Production Chart
  private buildChart() {

    this.barChartData1 =[];
    this.barChartLabels1 =[];
    this.productionTotal =0;
    this.cliniciananalysisService.DentistProduction(this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
        data.data.forEach(res => {
           this.barChartData1.push(res.total);
           this.barChartLabels1.push(res.name);
           if(res.total != null)
           this.productionTotal = this.productionTotal + parseInt(res.total);
 });
       this.barChartData[0]['data'] = this.barChartData1;
       this.barChartLabels = this.barChartLabels1;
       this.productionTotalAverage = this.productionTotal/this.barChartData1.length;
       this.productionGoal = data.goals;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  //Individual Dentist Production Chart
  private buildChartDentist() {
  this.cliniciananalysisService.DentistProductionSingle(this.selectedDentist, this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
          this.gaugeValue = data.data.total;
          this.gaugeLabel = data.data.name;
          this.productionTotal = data.data.total;

       this.productionGoal = data.goals;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

//Treatment Plan Average Cost
  private buildChartTreatment() {
    this.planChartData1 =[];
    this.planChartData2 =[];
    this.planChartLabels1 = [];
    this.planTotal =0;
    this.cliniciananalysisService.TreatmentPlan(this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
        data.data.forEach(res => {
           this.planChartData1.push(res.total_all);
           this.planChartData2.push(res.total_completed);
           this.planChartLabels1.push(res.provider);
           this.planTotal = this.planTotal + parseInt(res.total_completed);
 });
       this.planChartData[0]['data'] = this.planChartData1;
       this.planChartData[1]['data'] = this.planChartData2;

       this.planChartLabels = this.planChartLabels1;
       this.planTotalAverage = this.planTotal/this.planChartData1.length;
       this.planTotalGoal = data.goals;

       } 
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

//Individual Treatment Plan Average Cost
  private buildChartTreatmentDentist() {
  this.cliniciananalysisService.TreatmentPlanDentist(this.selectedDentist, this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
        if(data.data != null) {
        this.gaugeValueTreatment = data.data.total_all;
          this.gaugeLabelTreatment = data.data.provider;
          this.planTotal = data.data.total_all;
          this.planTotalAverage = this.planTotal;
        }
        else {
          this.gaugeValueTreatment = 0;
          this.gaugeLabelTreatment = "";
          this.planTotal = 0;
          this.planTotalAverage = 0;
        }
       this.planTotalGoal = data.goals;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

//Recall Prebook Rate
  private recallChartTreatment() {
  this.cliniciananalysisService.RecallPrebook(this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
        data.data.forEach(res => { 
           this.planChartData1.push(parseInt(res.average_cost));
           this.planChartLabels1.push(res.provider);
           this.planTotal = this.planTotal + parseInt(res.average_cost);
 });
       this.planChartData[0]['data'] = this.planChartData1;
       this.planChartLabels = this.planChartLabels1;
       this.planTotalAverage = this.planTotal/this.planChartData1.length;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }  

  private buildChartNopatients() {
     this.doughnutChartData1 =[];
           this.doughnutChartLabels1 =[];
           this.doughnutTotal = 0;
  this.cliniciananalysisService.NoPatients(this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
        data.data.forEach(res => {
           this.doughnutChartData1.push(parseInt(res.treat_item));
           this.doughnutChartLabels1.push(res.provider);
           this.doughnutTotal = this.doughnutTotal + parseInt(res.treat_item);
 });
       this.doughnutChartData = this.doughnutChartData1;
       this.doughnutChartLabels = this.doughnutChartLabels1;
       this.doughnutTotalAverage = this.doughnutTotal/this.doughnutChartData1.length;
       this.doughnutGoals = data.goals;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }


  private buildChartNopatientsDentist() {
  this.cliniciananalysisService.NoPatientsDentist(this.selectedDentist, this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
         if(data.data != null) {
        this.gaugeValuePatients = data.data.treat_item;
          this.gaugeLabelPatients = data.data.provider;
          this.doughnutTotal = data.data.treat_item;
          this.doughnutTotalAverage = this.doughnutTotal;
        }
        else {
          this.gaugeValuePatients = 0;
          this.gaugeLabelPatients = "";
          this.doughnutTotal = 0;
          this.doughnutTotalAverage = 0;

        }
       this.doughnutGoals = data.goals;
        
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!"; 
    }
    );
  } 

  // Get Dentist
    private getDentists() {
      this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
           if(res.message == 'success'){
              this.dentists= res.data;
              this.dentistCount= res.data.length;

           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }    
        );

  } 
 // Filter By Date
  filterDate(duration) {
     $('.customRange').css('display','none');

    if(duration == 'w') {
      const now = new Date();
       var first = now.getDate() - now.getDay();
       var last = first +6; 
       this.startDate = this.datePipe.transform(new Date(now.setDate(first)).toUTCString(), 'yyyy-MM-dd');
       this.endDate = this.datePipe.transform(new Date(now.setDate(last)).toUTCString(), 'yyyy-MM-dd');
    this.loadDentist('all');


    }
    else if (duration == 'm') {
      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'yyyy-MM-dd');
    this.loadDentist('all');
   
    }
    else if (duration == 'q') {
      const now = new Date();
      var cmonth = now.getMonth();
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
      else if(cmonth >=10 && cmonth <=12) {1
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 12, 0), 'yyyy-MM-dd');  }
    this.loadDentist('all');
    
    }
    else if (duration == 'lq') {
      const now = new Date();
      var cmonth = now.getMonth();
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
    this.loadDentist('all');
   
    }
    else if (duration == 'cytd') {
     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.loadDentist('all');
    }
     else if (duration == 'fytd') {
     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 3, 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

      this.loadDentist('all');
    }
     else if (duration == 'custom') {
     $('.customRange').css('display','block');
    }
    $('.filter').removeClass('active');
    $('.filter_'+duration).addClass("active");
      $('.filter_custom').val(this.startDate+ " - "+this.endDate);

  }
    initiate_dentist() {
    var val = $('.internal_dentist').val();
    this.loadDentist(val);
  }
}
