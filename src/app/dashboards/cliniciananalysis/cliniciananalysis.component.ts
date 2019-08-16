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
import { ActivatedRoute, Router } from "@angular/router";
import 'chartjs-plugin-style';
import { HeaderService } from '../../layouts/full/header/header.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppHeaderrightComponent } from '../../layouts/full/headerright/headerright.component';
import { CookieService } from "angular2-cookie/core";
import { BaseChartDirective } from 'ng2-charts';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
export interface Dentist {
  providerId: string;
  name: string;
}
declare var Chart: any; 
@Component({
  templateUrl: './cliniciananalysis.component.html'
})
export class ClinicianAnalysisComponent implements AfterViewInit {
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

  constructor(private cliniciananalysisService: ClinicianAnalysisService, private dentistService: DentistService, private datePipe: DatePipe, private route: ActivatedRoute,  private headerService: HeaderService,private _cookieService: CookieService, private router: Router){
  }
  private warningMessage: string;
  ngAfterViewInit() {   
    this.route.params.subscribe(params => {
      this.clinic_id = this.route.snapshot.paramMap.get("id");
      this.getDentists();
 //   $('.external_dentist').val('all');
    $('#title').html('Clinician Analysis');
      $('.external_clinic').show();
        $('.dentist_dropdown').show();
        $('.header_filters').removeClass('flex_direct_mar');
         if($('body').find('span#currentDentist').length > 0){
             var did= $('body').find('span#currentDentist').attr('did');
             $('.external_dentist').val(did);
          }
          else {
             $('.external_dentist').val('all');
          }
        this.filterDate('cytd');

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
  //this.canvas = (<HTMLElement>document.getElementById('#'))

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
      doughnutGradient.addColorStop(0, 'rgba(104, 255, 249, 1)');
      doughnutGradient.addColorStop(1, 'rgba(28, 164, 159, 1)');
      let doughnutGradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
      doughnutGradient2.addColorStop(1, '#4FC1D1');
      doughnutGradient2.addColorStop(0,  '#BFE8EE');
      this.doughnutChartColors = [{backgroundColor: [doughnutGradient,doughnutGradient2, '#dadada']}];

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
  public recallValue= '';
  public recallLabel = "";
  public recallGoal = 0;
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
public dentistVal= 'all';
 private loadDentist(newValue) {
  if(newValue == 'all') {
      this.dentistVal='all';
      this.showTrend= false;
      this.buildChartNopatients();
      this.buildChart();
      this.buildChartTreatment();
      this.recallPrebook();
      this.treatmentPlanRate();
      (<HTMLElement>document.querySelector('.dentistProductionSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.dentistProduction')).style.display = 'block';
      (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'block';
      (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.noPatients')).style.display = 'block';
      (<HTMLElement>document.querySelector('.recallPrebookSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.recallPrebook')).style.display = 'block';
      (<HTMLElement>document.querySelector('.treatmentPlanRateSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.treatmentPlanRate')).style.display = 'block';
  }
  else {
    this.dentistVal = newValue;
      this.showTrend= true;
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
      this.recallPrebookDentist();
       (<HTMLElement>document.querySelector('.recallPrebookSingle')).style.display = 'block';
      (<HTMLElement>document.querySelector('.recallPrebook')).style.display = 'none';
      this.treatmentPlanRateDentist();
       (<HTMLElement>document.querySelector('.treatmentPlanRateSingle')).style.display = 'block';
      (<HTMLElement>document.querySelector('.treatmentPlanRate')).style.display = 'none';
    }
  }

  public planCompletedTotal;
  public planCompletedTotalTrend;
  changeTreatmentCost(val) {
    $('.treatmentPlan .treatment_cost .sa_tab_btn').removeClass('active');
    $('.treatmentPlan .tcmain'+val).addClass('active');
    this.planTotalTooltip = 'down';
    this.tcmain =val;
    if(val == '1'){
      this.planTotalAverage = this.planAllTotal;
      this.planTotalPrev = this.planAllTotalTrend;
    }
    else {
      this.planTotalAverage = this.planCompletedTotal;
      this.planTotalPrev = this.planCompletedTotalTrend;
    }
    if(this.planTotalAverage>=this.planTotalPrev)
        this.planTotalTooltip = 'up';
    if(this.goalchecked == 'average') {
      this.barChartOptionsTC.annotation.annotations[0].value =this.planTotalAverage;
    }
    if(this.goalchecked == 'goal') {
      this.barChartOptionsTC.annotation.annotations[0].value =this.planTotalGoal;
    }
  }

  changeTreatmentCostSingle(val) {
    $('.treatmentPlanSingle .treatment_cost .sa_tab_btn').removeClass('active');
    $('.treatmentPlanSingle .tcmain'+val).addClass('active');
    this.tcmain =val;
    if(val == '1'){
      this.gaugeValueTreatment = this.gaugeValueTreatmentP;
    }
    else {
      this.gaugeValueTreatment = this.gaugeValueTreatmentC;
    }
        //   this.predictedMax = Math.max(...this.predictedChartData[0]['data']);

  } 

  public productionTooltip='down';
  public productionTotalPrev;
  public barChartOptionsDP:any =this.barChartOptions;

  //Dentist Production Chart
  private buildChart() {

    this.barChartData1 =[];
    this.barChartLabels1 =[];
    this.productionTotal =0;
    this.cliniciananalysisService.DentistProduction(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.productionTooltip = 'down';
        data.data.forEach(res => {
           this.barChartData1.push(res.total);
           var name = res.name;
           if(res.name != null) {
             name = res.name.split(')');
            if(name.length >0 && name[1] != '')
            {
              name = name[1].split(',');
              if(name.length>0)
                name =name[1]+ " "+ name[0];
            }
           this.barChartLabels1.push(name);
         }
           else
           this.barChartLabels1.push(res.firstname);

           if(res.total != null)
           this.productionTotal = this.productionTotal + parseInt(res.total);
        });
         this.barChartData[0]['data'] = this.barChartData1;
         this.barChartLabels = this.barChartLabels1;
         this.productionTotalAverage =Math.floor(data.total_average);
         this.productionTotalPrev =data.total_ta;
         this.productionGoal = data.goals;
         if(this.productionTotalAverage>=this.productionTotalPrev)
          this.productionTooltip = 'up';
          this.barChartOptionsDP.annotation =[];
          if(this.goalchecked == 'average') {
           this.barChartOptionsDP.annotation = {annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
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
       else if(this.goalchecked == 'goal') {
           this.barChartOptionsDP.annotation = {annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.productionGoal,
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


  //Individual Dentist Production Chart
  private buildChartDentist() {
          this.barChartOptionsDP.annotation = [];
  this.cliniciananalysisService.DentistProductionSingle(this.selectedDentist, this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success' ){
         this.gaugeValue = '0';
        if(data.data != null ) {
          this.gaugeValue = data.data.total;
          this.gaugeLabel = data.data.name;
          var name = data.data.name;
          if(name != null) {
             name = name.split(')');
            if(name.length >0 && name[1] != '')
            {
              name = name[1].split(',');
              if(name.length>0)
                name =name[1]+ " "+ name[0];
            }
           this.gaugeLabel = name;
         }
           else
           this.gaugeLabel =  data.data.firstname;
          this.productionTotal = data.data.total;
          this.productionGoal = data.goals;
          console.log(this.gaugeValue);
          console.log(this.dentistProductionTrendLabels);

        }

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!"; 
    }
    );
  }


  public recallChartData: any[] = [
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
  public recallChartAverage;
  public recallChartGoal;
  public recallChartAveragePrev;
public recallChartTooltip = 'down';
private recallPrebook() {

    this.recallChartData1 =[];
    this.recallChartLabels1 =[];
    this.productionTotal =0;
    this.cliniciananalysisService.RecallPrebook(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.productionTooltip = 'down';
        data.data.forEach(res => {
           this.recallChartData1.push(Math.abs(res.percent).toFixed(1));
           this.recallChartLabels1.push(res.provider);
        });
         this.recallChartData[0]['data'] = this.recallChartData1;
         this.recallChartLabels = this.recallChartLabels1;
         this.recallChartAverage =Math.abs(data.total).toFixed(1);
         this.recallChartAveragePrev =data.total_ta;
         this.recallChartGoal = data.goals;
         if(this.recallChartAverage>=this.recallChartAveragePrev)
          this.recallChartTooltip = 'up';
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  //Individual Dentist Production Chart
  private recallPrebookDentist() {
  this.cliniciananalysisService.RecallPrebookSingle(this.selectedDentist, this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success' ){
         this.recallValue = '0';
        if(data.data.length > 0 ) {
          this.recallValue = data.data[0].percent;
          this.recallLabel = data.data[0].provider;
          this.recallGoal = data.goals;
        }
        console.log(this.recallValue);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!"; 
    }
    );
  }



  public treatmentChartData: any[] = [
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
  public treatmentChartAverage;
  public treatmentChartGoal;
  public treatmentChartAveragePrev;
  public treatmentChartTooltip = 'down';
  private treatmentPlanRate() {
    this.treatmentChartData1 =[];
    this.treatmentChartLabels1 =[];
    this.productionTotal =0;
    this.cliniciananalysisService.TreatmentPlanRate(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.productionTooltip = 'down';
        data.data.forEach(res => {
           this.treatmentChartData1.push(Math.abs(res.percent).toFixed(2));
             var name = res.provider;
           if(res.provider != null) {
              name = res.provider.split(',');
              if(name.length>0)
                name =name[1]+ " "+ name[0];
           this.treatmentChartLabels1.push(name);
         }
           else
           this.treatmentChartLabels1.push(res.provider);
        });
         this.treatmentChartData[0]['data'] = this.treatmentChartData1;
         this.treatmentChartLabels = this.treatmentChartLabels1;
         this.treatmentChartAverage =Math.abs(data.total).toFixed(2);
         this.treatmentChartAveragePrev =data.total_ta;
         this.treatmentChartGoal = data.goals;
         if(this.treatmentChartAverage>=this.treatmentChartAveragePrev)
          this.treatmentChartTooltip = 'up';
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  //Individual Dentist Production Chart
  private treatmentPlanRateDentist() {
  this.cliniciananalysisService.TreatmentPlanRateSingle(this.selectedDentist, this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success' ){
         this.treatmentPlanValue = '0';
        if(data.data.length > 0 ) {
          this.treatmentPlanValue = Math.abs(data.data[0].percent).toFixed(2);
          this.treatmentPlanLabel = data.data[0].provider;
           var name = data.data[0].provider;
           if(data.data[0].provider != null) {
              name = data.data[0].provider.split(',');
              if(name.length>0)
                name =name[1]+ " "+ name[0];
          this.treatmentPlanLabel = name;
         }
           else
          this.treatmentPlanLabel = data.data[0].provider;
          this.treatmentPlanGoal = data.goals;
        }
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!"; 
    }
    );
  }

  public tcmain;
  public planTotalTooltip='down';
  public planTotalPrev;
  public planAllTotal=0;
  public planAllTotalTrend =0;
  public planChartLabels2 =[];
  public barChartOptionsTC:any =this.barChartOptions;
//Treatment Plan Average Cost
  private buildChartTreatment() {
    $('.treatment_cost .sa_tab_btn').removeClass('active');
    $('.tcmain1').addClass('active');
    this.tcmain=1;
    this.planChartData1 =[];
    this.planChartData2 =[];
    this.planChartLabels1 = [];
    this.planChartLabels2 = [];
    this.planTotal =0;
    this.cliniciananalysisService.TreatmentPlan(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.planTotalTooltip = 'down';
        data.data.plan_fee_all.forEach(res => {
           this.planChartData1.push(Math.abs(res.average_cost_all).toFixed(1));
           this.planChartLabels1.push(res.provider);
 });
           this.planAllTotal =  data.total_all;
           this.planAllTotalTrend =  data.total_ta_all;


        data.data.plan_fee_completed.forEach(res => {
           this.planChartData2.push(Math.abs(res.average_cost_completed).toFixed(1));
           this.planChartLabels2.push(res.provider);
        });
           this.planCompletedTotal = data.total_completed;
           this.planCompletedTotalTrend = data.total_ta_completed;


       this.planChartDataP[0]['data'] = this.planChartData1;
        this.planChartDataC[0]['data'] = this.planChartData2;
     //  this.planChartData[1]['data'] = this.planChartData2;
       this.planChartDataP[0]['label'] = 'Proposed Fees';
       this.planChartDataC[0]['label'] = 'Completed Fees';

       this.planChartLabels = this.planChartLabels1;
       this.planTotalAverage = this.planAllTotal;
       this.planTotalGoal = data.goals;
       this.planTotalPrev =this.planAllTotalTrend;
       if(this.planTotalAverage>=this.planTotalPrev)
        this.planTotalTooltip = 'up';
      var index =0;
      this.barChartOptionsTC.annotation =[];
          if(this.goalchecked == 'average') {
           this.barChartOptionsTC.annotation = {annotations: [{
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
       else if(this.goalchecked == 'goal') {
           this.barChartOptionsTC.annotation = {annotations: [{
              type: 'line',
              drawTime: 'afterDatasetsDraw',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.planTotalGoal,
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
    });
  }

  public gaugeValueTreatmentP:any=0;
  public gaugeValueTreatmentC:any=0;
//Individual Treatment Plan Average Cost
  private buildChartTreatmentDentist() {
      $('.treatmentPlanSingle .treatment_cost .sa_tab_btn').removeClass('active');
    $('.treatmentPlanSingle .tcmain1').addClass('active');
  this.cliniciananalysisService.TreatmentPlanDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.gaugeValueTreatmentP= 0;
          this.gaugeValueTreatmentC = 0;
        this.gaugeValueTreatment =0;
        if(data.data != null) {
          if(data.data.plan_fee_completed.average_cost_completed != undefined)
          this.gaugeValueTreatmentC= Math.abs(data.data.plan_fee_completed.average_cost_completed).toFixed(1);
          if(data.data.plan_fee_all.average_cost_all != undefined)
          this.gaugeValueTreatmentP = Math.abs(data.data.plan_fee_all.average_cost_all).toFixed(1);
          this.gaugeLabelTreatment = data.data.plan_fee_all.provider;
          this.planTotal = data.data.total_all;
          this.planTotalAverage = this.planTotal;
        }
        else {
          this.gaugeValueTreatmentP= 0;
          this.gaugeValueTreatmentC = 0;
          this.gaugeLabelTreatment = "";
          this.planTotal = 0;
          this.planTotalAverage = 0;
        }
          this.gaugeValueTreatment =this.gaugeValueTreatmentP;      
          this.planTotalGoal = data.goals;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

//Recall Prebook Rate
  private recallChartTreatment() {
  this.cliniciananalysisService.RecallPrebook(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
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

  public doughnutTotalTooltip='down';
  public doughnutTotalPrev=0;
  private buildChartNopatients() {
     this.doughnutChartData1 =[];
           this.doughnutChartLabels1 =[];
           this.doughnutTotal = 0;
  this.cliniciananalysisService.NoPatients(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
         this.doughnutTotalTooltip = 'down';
        data.data.forEach(res => {
           this.doughnutChartData1.push(parseInt(res.treat_item));
           this.doughnutChartLabels1.push(res.provider);
           this.doughnutTotal = this.doughnutTotal + parseInt(res.treat_item);
        });
         this.doughnutChartData = this.doughnutChartData1;
         this.doughnutChartLabels = this.doughnutChartLabels1;
         this.doughnutTotalAverage = data.total;
         this.doughnutTotalPrev =  data.total_ta;
         this.doughnutGoals = data.goals;
        if(this.doughnutTotalAverage>=this.doughnutTotalPrev)
        this.doughnutTotalTooltip = 'up';
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  private buildChartNopatientsDentist() {
  this.cliniciananalysisService.NoPatientsDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
         if(data.data != null) {
        this.gaugeValuePatients = data.data.treat_item;
          this.gaugeLabelPatients = data.data.provider;
          this.doughnutTotal = data.data.treat_item;
          this.doughnutTotalAverage = this.doughnutTotal;
          this.doughnutTotalPrev = data.total_ta;
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
           else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }    
        );

  } 
 // Filter By Date
  filterDate(duration) {
    $('.customRange').css('display','none');
    this.showTrendChart= false;
    var dentistVal;
    if($('.internal_dentist').val())
      dentistVal =$('.internal_dentist').val();
    else
      dentistVal = $('.external_dentist').val();
    this.duration =duration;
    if(duration == 'w') {
      this.trendText= 'Last Week';
      const now = new Date();
       var first = now.getDate() - now.getDay();
       var last = first +6; 
      this.startDate = this.datePipe.transform(new Date(now.setDate(first)).toUTCString(), 'yyyy-MM-dd');
        var end = new Date();
        end.setFullYear(now.getFullYear());
        end.setMonth(now.getMonth()+1);
        end.setDate(last);
        this.endDate =this.datePipe.transform(new Date(end).toUTCString(), 'yyyy-MM-dd');
        this.loadDentist(dentistVal);
    }
    else if (duration == 'm') {
        this.trendText= 'Last Month';
      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'yyyy-MM-dd');
    this.loadDentist(dentistVal);
   
    }
    else if (duration == 'q') {
      this.trendText= 'Last Quarter';
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
      else if(cmonth >=10 && cmonth <=12) {1
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 12, 0), 'yyyy-MM-dd');  }
    this.loadDentist(dentistVal);
    
    }
    else if (duration == 'lq') {
      this.trendText= 'Previous Quarter';
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
    this.loadDentist(dentistVal);   
    }
    else if (duration == 'cytd') {
      this.trendText= 'Last Year';
     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.loadDentist(dentistVal);
    }
     else if (duration == 'fytd') {
       this.trendText= 'Last Financial Year';
     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 3, 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

      this.loadDentist(dentistVal);
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
     this.showTrendChart = true;
     this.trendValue = 'c';
     this.toggleChangeProcess();
    }
    else if(val == 'historic') {
       this.toggleChecked = true;
       this.trendValue = 'h';
       this.showTrendChart = true;
       this.toggleChangeProcess();
    }
    else if(val == 'off') {
       this.filterDate('cytd');
       this.toggleChecked = false;
       this.showTrendChart = false;
    }
}
  toggleChecked = false;
  trendValue ='';
  isDisabled =true;
  isChecked =true;

public dentistProdTrend: any[]  = [
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
  public dentistProductionTrend1=[];
  public dentistProductionTrendLabels =[];
  public dentistProductionTrendLabels1 =[];
  private dentistProductionTrend() {
  this.dentistProductionTrendLabels1=[];
  this.dentistProductionTrend1= [];
    var user_id;
    var clinic_id;
    this.cliniciananalysisService.caDentistProtectionTrend(this.selectedDentist, this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
                data.data.forEach(res => {  
                     this.dentistProductionTrend1.push(res.val.total);
                   if(this.trendValue == 'c')
                   this.dentistProductionTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.dentistProductionTrendLabels1.push(res.duration);
                 });
                 this.dentistProdTrend[0]['data'] = this.dentistProductionTrend1;
                 this.dentistProductionTrendLabels =this.dentistProductionTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


public treatPlanTrend: any[]  = [
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
  public treatmentPlanTrend1=[];
  public treatmentPlanTrendLabels =[];
  public treatmentPlanTrendLabels1 =[];
  private treatmentPlanTrend() {
  this.treatmentPlanTrendLabels1=[];
  this.treatmentPlanTrend1= [];
    var user_id;
    var clinic_id;
    this.cliniciananalysisService.caTreatmentPlanAverageCostTrend(this.selectedDentist, this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
                data.data.forEach(res => {  
                     this.treatmentPlanTrend1.push(res.val.average_cost);
                   if(this.trendValue == 'c')
                   this.treatmentPlanTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.treatmentPlanTrendLabels1.push(res.duration);
                 });
                 this.treatPlanTrend[0]['data'] = this.treatmentPlanTrend1;

                 this.treatmentPlanTrendLabels =this.treatmentPlanTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

public patientComplaintTrend: any[]  = [
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
  public patientComplaintsTrend1=[];
  public patientComplaintsTrendLabels =[];
  public patientComplaintsTrendLabels1 =[];
  private patientComplaintsTrend() {
  this.patientComplaintsTrendLabels1=[];
  this.patientComplaintsTrend1= [];
    var user_id;
    var clinic_id;
    this.cliniciananalysisService.caNumberPatientComplaintsTrend(this.selectedDentist, this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
                data.data.forEach(res => {  
                     this.patientComplaintsTrend1.push(res.val.treat_item);
                   if(this.trendValue == 'c')
                   this.patientComplaintsTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                   else
                   this.patientComplaintsTrendLabels1.push(res.duration);                  
                 });
                 this.patientComplaintTrend[0]['data'] = this.patientComplaintsTrend1;

                 this.patientComplaintsTrendLabels =this.patientComplaintsTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

  toggleChangeProcess(){
      if(this.toggleChecked){
      $('.filter').removeClass('active');
      this.dentistProductionTrend();
      this.treatmentPlanTrend();
      this.patientComplaintsTrend();
     }
  }
  goalToggle(val) {
    this.goalchecked = val;
    this.buildChart();
    this.buildChartTreatment();   
  }
}
