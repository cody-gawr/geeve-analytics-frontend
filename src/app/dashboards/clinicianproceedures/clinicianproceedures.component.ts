import * as $ from 'jquery';
import { Component, AfterViewInit, ViewEncapsulation , ViewChild,ElementRef, OnDestroy } from '@angular/core';
import { ClinicianProceeduresService } from './clinicianproceedures.service';
import { DentistService } from '../../dentist/dentist.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router , NavigationEnd, Event } from "@angular/router";
import { HeaderService } from '../../layouts/full/header/header.service';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { ChartService } from '../chart.service';
import { AppConstants } from '../../app.constants';
import { ChartstipsService } from '../../shared/chartstips.service';
import { environment } from "../../../environments/environment";
import { DomSanitizer } from '@angular/platform-browser';
export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  templateUrl: './clinicianproceedures.component.html',
  styleUrls: ['./clinicianproceedures.component.scss'],
  encapsulation: ViewEncapsulation.None
})
  /**
  *Clinician Proceedure Graph Dashboard
  *AUTHOR - Teq Mavens
  */
export class ClinicianProceeduresComponent implements AfterViewInit, OnDestroy {
    @ViewChild("myCanvas") canvas: ElementRef;
  lineChartColors;
  doughnutChartColors;
  predictedChartColors;
  preoceedureChartColors;

    public procedureAnalysisVisibility:string = 'General';
    public dentistMode:boolean = false;
    subtitle: string;
    public clinic_id:any ={};
    public dentistCount:any ={};
    public clinicsData:any[] = [];
    public multiclinic:boolean = false;
    public user_type;
    public childid='';
    public trendText;
    public Apirequest =0;
    public charTips:any = [];
    public showPaTable: boolean = false;
    public userPlan:any = '';
    public apiUrl = environment.apiUrl;
    private _routerSub = Subscription.EMPTY;
    chartData1 = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels1 = ['January', 'February', 'Mars', 'April'];
  private legendLabelOptions = {
    labels: {
      usePointStyle: true,
      padding: 20
    },
    onClick: function (e) {
      e.stopPropagation();
    }
  };
  constructor(
    private toastr: ToastrService,
    private clinicianproceeduresService: ClinicianProceeduresService, 
    private dentistService: DentistService, 
    private datePipe: DatePipe, 
    private route: ActivatedRoute, 
    private headerService: HeaderService,
    private _cookieService: CookieService, 
    private router: Router,
    private numPipe: DecimalPipe,
    private chartService: ChartService,
    public constants: AppConstants,
    public chartstipsService: ChartstipsService,
    private sanitized: DomSanitizer
  ){
    this.getChartsTips();
    this._routerSub = this.router.events
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd){
          this.user_type = this._cookieService.get("user_type");          
          if( this._cookieService.get("dentistid")){
            this.childid = this._cookieService.get("dentistid");
            $('.internal_dentist').val('all');
            $('.external_dentist').val('all');
              
          }
        }
    });
    this.getAllClinics();
  }

  public clinics = [];
  getAllClinics(){
    this.headerService.getClinic.subscribe(res=>{
      if(res.status == '200'){
        let temp = [];
        res.data.forEach(item=>{
          temp.push(item.id);
        });
        this.clinics = [...temp];
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('.topbar-strip').removeClass('responsive-top');
  }
  private warningMessage: string;
  private myTemplate: any = "";
  /**
  *Check If logged in user is eligible to access this page.
  *AUTHOR - Teq Mavens
  */


  //Load Clinic Data
  initiate_clinic() {
    $('.internal_dentist').val('all');
    $('.external_dentist').val('all');
    this.userPlan =  this._cookieService.get("user_plan"); 
    if(this.userPlan == 'lite')
    {
       this.router.navigateByUrl('/login');
    }
    var val = $('#currentClinic').attr('cid');
     if(val != undefined ) {
        if(val == 'all'){
          this.clinic_id = this.clinics;
        }else{
          this.clinic_id = val;
        }
        if( this._cookieService.get("dentistid")) {
            this.childid = this._cookieService.get("childid");
            this.dentistid = this._cookieService.get("dentistid");
          } 
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          // this.getDentists();
          this.multiclinic = true;
        }else{
          this.multiclinic = false;
          this.getDentists();
        }  
        this.filterDate(this.chartService.duration$.value);
     }
  }
  myDateParser(dateStr : string) : string {
    // 2018-01-01T12:12:12.123456; - converting valid date format like this

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)

    let validDate = date;
    return validDate
  }

  formatDate(date) {
    if (date) {
      var dateArray = date.split("-")
      const d = new Date();
      d.setFullYear(+dateArray[2], (+dateArray[1]-1), +dateArray[0])
      const formattedDate = this.datePipe.transform(d, 'dd MMM yyyy');
      return formattedDate;
    } else return date;
  }

  //Initialize compoenent
  ngAfterViewInit() {
      $('#currentDentist').attr('did','all');
    
 this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
    this.user_type = this._cookieService.get("user_type");
     //   this.getDentists(); 
     // this.initiate_clinic();
        
           if( this._cookieService.get("dentistid")) {
             this.childid = this._cookieService.get("childid");
             this.dentistid = this._cookieService.get("dentistid");
           }
          if($('body').find('span#currentDentist').length > 0){
             var did= $('body').find('span#currentDentist').attr('did');
             $('.external_dentist').val(did);
          }
          else {
             $('.external_dentist').val('all');
          }        
        //this.filterDate('cytd');
        // this.getClinics();
        //$('.dentist_dropdown').show();
        $('.header_filters').removeClass('flex_direct_mar');
        $('.header_filters').removeClass('hide_header');
        $('#title').html('<span>Clinician Procedures & Referrals</span>');        
        $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) );
        $('.external_clinic').show();
        //$('.external_dentist').show();
        if(this.childid != ''){
          //$('.dentist_dropdown').hide();
          //$('.header_filters').addClass('flex_direct_mar'); 
        }
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

        $('.topbar-strip').addClass('responsive-top');
     });
 
      let gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#17a2a6');
      gradient.addColorStop(1, '#17a2a6');
      let gradient1 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
      gradient1.addColorStop(1, '#82edd8');
      gradient1.addColorStop(0,  '#82edd8');
      let gradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
      gradient2.addColorStop(1, '#2C7294');
      gradient2.addColorStop(0,  '#2C7294');
      let gradient3 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
      gradient3.addColorStop(1, '#3c7cb7');
      gradient3.addColorStop(0,  '#3c7cb7');
      let gradient4 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
      gradient4.addColorStop(1, '#175088');
      gradient4.addColorStop(0,  '#175088');
      let gradient5 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
      gradient5.addColorStop(1, '#1fd6b1');
      gradient5.addColorStop(0,  '#1fd6b1');
      let gradient6 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
      gradient6.addColorStop(1, '#09b391');
      gradient6.addColorStop(0,  '#09b391');
      let gradient7 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
      gradient7.addColorStop(1, '#168F7F');
      gradient7.addColorStop(0,  '#168F7F');

this.doughnutChartColors = [{backgroundColor: [
  '#6cd8ba',
  '#b0fffa',
  '#abb3ff',
  '#feefb8',
  '#ffb4b5',
  '#fffcac',
  '#d7f8ef'
]}];
this.lineChartColors = [
  {
    backgroundColor: gradient,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F'
  },
   {
    backgroundColor: gradient1,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F'
  },
  {
    backgroundColor: gradient2,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F'
  },
   {
    backgroundColor: gradient3,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F'
  },
  {
    backgroundColor: gradient4,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F'
  },
   {
    backgroundColor: gradient5,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F'
  }
];


let stackedGradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
stackedGradient.addColorStop(0, '#168F7F');
stackedGradient.addColorStop(1, '#168F7F');
let stackedGradient1 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
stackedGradient1.addColorStop(1, '#1fd6b1');
stackedGradient1.addColorStop(0,  '#1fd6b1');
let stackedGradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
stackedGradient2.addColorStop(1, '#09b391');
stackedGradient2.addColorStop(0,  '#09b391');
let stackedGradient3 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
stackedGradient3.addColorStop(1, '#82EDD8');
stackedGradient3.addColorStop(0,  '#82EDD8');
let stackedGradient4 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
stackedGradient4.addColorStop(1, '#17A2A6');
stackedGradient4.addColorStop(0,  '#17A2A6');
let stackedGradient5 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
stackedGradient5.addColorStop(1, 'rgba(22, 82, 141, 1)');
stackedGradient5.addColorStop(0,  'rgba(12, 209,169,1)');


this.stackedChartColors = [
  {
    backgroundColor: stackedGradient,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(255,255,255,0.6)'
  },
   {
    backgroundColor: stackedGradient1,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(255,255,255,0.6)'

  },
  {
    backgroundColor: stackedGradient2,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(255,255,255,0.6)'

  },
   {
    backgroundColor: stackedGradient3,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(255,255,255,0.6)'

  },
  {
    backgroundColor: stackedGradient4,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(255,255,255,0.6)'

  },
   {
    backgroundColor: stackedGradient5,
    hoverBorderWidth: 2,
    hoverBorderColor: 'rgba(255,255,255,0.6)'
  }
];


 let doughnutGradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
doughnutGradient.addColorStop(0, '#19b394');
doughnutGradient.addColorStop(1, 'rgba(22, 82, 141, 0.6)');
let doughnutGradient1 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
doughnutGradient1.addColorStop(1, '#29e0bc');
doughnutGradient1.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let doughnutGradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
doughnutGradient2.addColorStop(1, '#3be3c1');
doughnutGradient2.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let doughnutGradient3 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
doughnutGradient3.addColorStop(1, '#5ee8cd');
doughnutGradient3.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let doughnutGradient4 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
doughnutGradient4.addColorStop(1, '#94f0dd');
doughnutGradient4.addColorStop(0,  'rgba(22, 82, 141, 0.8)');
let doughnutGradient5 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
doughnutGradient5.addColorStop(1, '#c9f7ee');
doughnutGradient5.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
//this.doughnutChartColors = [{backgroundColor: ['#19b394', '#29e0bc', '#3be3c1','#19b394', '#29e0bc', '#3be3c1']}];


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

let proceedureGradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
proceedureGradient.addColorStop(0, 'rgba(22, 82, 141, 0.8)');
proceedureGradient.addColorStop(1, 'rgba(12, 209,169,0.9)');
let proceedureGradient1 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
proceedureGradient1.addColorStop(1, 'rgba(12, 209,169,0.8)');
proceedureGradient1.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let proceedureGradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
proceedureGradient2.addColorStop(1, 'rgba(59, 227,193,0.8');
proceedureGradient2.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let proceedureGradient3 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
proceedureGradient3.addColorStop(1, 'rgba(94, 232,205,0.8)');
proceedureGradient3.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let proceedureGradient4 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
proceedureGradient4.addColorStop(1, 'rgba(148, 240,221,0.8)');
proceedureGradient4.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let proceedureGradient5 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
proceedureGradient5.addColorStop(1, 'rgba(201, 247,238,0.8)');
proceedureGradient5.addColorStop(0,  'rgba(22, 82, 141, 0.9)');

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

  public date =new Date();

  dentists: Dentist[] = [
   { providerId: 'all', name: 'All Dentists' },
  ];
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
  public stackedChartOptionsmulti: any = {
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

   public lineChartColors1: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(25,118,210,0.1)',
      borderColor: 'rgba(25,118,210,1)',
      pointBackgroundColor: 'rgba(25,118,210,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(25,118,210,0.5)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(38,218,210,0.1)',
      borderColor: 'rgba(38,218,210,1)',
      pointBackgroundColor: 'rgba(38,218,210,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(38,218,210,0.5)'
    }
  ];
    public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
            display: true,
            position:'right',
            ...this.legendLabelOptions
    }
  };
   public barChartOptions: any = {
    scaleShowVerticalLines: false,
           responsive: true,
    maintainAspectRatio: false,
      animation: {
        duration: 500,
        easing: 'easeOutSine'
      },
    barThickness: 10,
        scales: {
          xAxes: [{ 
            ticks: {
                  autoSkip: false
              }
            }],
          yAxes: [{  
            ticks: {
             suggestedMin:0,
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
        position: 'top',
        onClick: function(e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart; 
          if(index ==0)
          {
                (<HTMLElement>document.querySelector('.predicted1')).style.display = 'flex';
                (<HTMLElement>document.querySelector('.predicted2')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted3')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted1Tool')).style.display = 'inline-block';
                (<HTMLElement>document.querySelector('.predicted2Tool')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted3Tool')).style.display = 'none';

                ci.getDatasetMeta(1).hidden = true;
                ci.getDatasetMeta(2).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
                this.predictedPreviousAverage=this.predictedPreviousAverage1;
                this.predictedTotalAverageTooltip=this.predictedTotalAverageTooltip1;


          }
          else if(index== 1) {
            (<HTMLElement>document.querySelector('.predicted1')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted2')).style.display = 'flex';

                (<HTMLElement>document.querySelector('.predicted3')).style.display = 'none';
                  (<HTMLElement>document.querySelector('.predicted1Tool')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted2Tool')).style.display = 'inline-block';
                (<HTMLElement>document.querySelector('.predicted3Tool')).style.display = 'none';
                ci.getDatasetMeta(0).hidden = true;
                ci.getDatasetMeta(2).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
                this.predictedPreviousAverage=this.predictedPreviousAverage2;
                this.predictedTotalAverageTooltip=this.predictedTotalAverageTooltip2;
          } 
          else if(index== 2) {
            (<HTMLElement>document.querySelector('.predicted1')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted2')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted3')).style.display = 'flex';
                (<HTMLElement>document.querySelector('.predicted1Tool')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted2Tool')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted3Tool')).style.display = 'inline-block';

                ci.getDatasetMeta(0).hidden = true;
                ci.getDatasetMeta(1).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
                this.predictedPreviousAverage=this.predictedPreviousAverage3;
                this.predictedTotalAverageTooltip=this.predictedTotalAverageTooltip3;

          }
          ci.update();
        },
      }     
          };
  public lineChartType = 'bar';

  public proceedureChartOptions: any = {
    hover: {mode: null},
    scaleShowVerticalLines: false,
           responsive: true,
    maintainAspectRatio: false,
    barThickness: 10,
      animation: {
        duration: 1,
        easing: 'linear'
      },
        scales: {
          xAxes: [{ 
            ticks: {
                userCallback: (label, index, labels) => {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return '$' + this.numPipe.transform(label);
                     }
                 },
              callback: function(value) {
                    return value;//truncate
                },
                  autoSkip: false
              }
            }],
          yAxes: [{  
            ticks: {
              beginAtZero:true,
             callback: function(value) {
                    if(value.length>20)
                    return value.substr(0,20)+"....";//truncate
                    else
                    return value;//truncate

                }
            }, 
            }],
        },
         legend: {
        position: 'top',
        onClick: function (e) {
          e.stopPropagation();
        }
      },
      tooltips: {
  enabled: true,
        callbacks: {
            title: function(tooltipItems, data) {
                var idx = tooltipItems[0].index;
                // return data.labels[idx];//do something with title
                return '';
            },
            label: (tooltipItems, data) => {
                //var idx = tooltipItems.index;
                //return data.labels[idx] + ' €';
                return tooltipItems.yLabel + ': $'+ this.numPipe.transform(tooltipItems.xLabel);
            }
        }
},        
  };

/************ for top values on graph *******/
  public proceedureChartOptions1: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    showTooltips: false,
    maintainAspectRatio: false,
    barThickness: 10,
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
              let num = dataset.data[index];
              let dataK = shortenLargeNumber(num, 1);
              let dataDisplay = `$${dataK}`;
              ctx.font = Chart.helpers.fontString(11, 'normal','Gilroy-Bold');
              ctx.fillText(dataDisplay, bar._model.x + 20, bar._model.y + 5 );

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
    scales: {
      xAxes: [{ 
        beginAtZero:true,
        min: 0,
        max: 10000,
        ticks: {
          userCallback: (label, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return '$' + this.numPipe.transform(label);
            }
          },
          callback: function(value) {
            return value;//truncate
          },
          autoSkip: false
        }
      }],
      yAxes: [{  
        ticks: {
        
          callback: function(value) {
            if(value.length>20)
              return value.substr(0,20)+"....";//truncate
            else
              return value;//truncate
          }
        }
      }]
    },
    legend: {
      position: 'top',
      onClick: function (e) {
        e.stopPropagation();
      }
    },
    tooltips: {
      enabled: false    
    }
  };

/************ for top values on graph *******/
  
  public proceedureChartOptionsDP: any = this.proceedureChartOptions;
  public selectedDentist: string;
  public predicted1: boolean = true;
  public predicted2: boolean = false;
  public predicted3: boolean = false;
  public showInternal: boolean = true;
  public showExternal: boolean = false;
  public showCombined: boolean = false;
  public showTopVlaues: boolean = false;
  public stackedChartColors: Array<any> = [
    { backgroundColor: '#76F2E5' },
    { backgroundColor: '#6BE6EF' },
    { backgroundColor: '#68D8D6' },
    { backgroundColor: '#3DCCC7' },
    { backgroundColor: '#68FFF9' },
    { backgroundColor: '#07BEB8' }
  ];
  public ItemPredictorColors = [
    { backgroundColor: '#6cd8ba' },
    { backgroundColor: '#b0fffa' },
    { backgroundColor: '#abb3ff' },
    { backgroundColor: '#feefb8' },
    { backgroundColor: '#ffb4b5' },
    { backgroundColor: '#fffcac' }
  ];

  public ItemPredictorSpecialColors = [
    { backgroundColor: '#6cd8ba' },
    { backgroundColor: '#b0fffa' },
    { backgroundColor: '#abb3ff' },
    { backgroundColor: '#feefb8' },
    { backgroundColor: '#ffb4b5' },
    { backgroundColor: '#fffcac' },
    { backgroundColor: '#6cd8ba' },
    { backgroundColor: '#feefb8' },
  ];
  public predictorRatioColors = [
    {
      backgroundColor: '#119682'
    },
    {
      backgroundColor: '#1fd6b1'
    },
  ]
  public stackedChartType = 'bar';
  public stackedChartLegend = true;

  //labels
  public stackedChartLabels: string[] = [];  
  public stackedChartLabels1: string[] = [];

  public predictedChartLabels: string[] = [];
  public predictedChartLabels1: string[] = [];

  public proceedureChartLabels: string[] = [];
  public proceedureChartLabels1: string[] = [];
  public proceedureDentistChartLabels: string[] = [];
  //data
  public stackedChartData: any[] = [
    {data: [], label: 'Crowns & Onlays'},
    {data: [], label: 'Splints' },
    {data: [], label: 'Root Canals' },
    {data: [], label: 'Perio Charts' },
    {data: [], label: 'Surgical Extractions' },      
    {data: [], label: 'Stainless Steel Crowns'},  
    {data: [], label: 'Composite Veneers'},  
    {data: [], label: 'Implant Crowns'},  
    {data: [], label: 'Whitening'}
  ];

  public stackedChartDataItemSpecial: any[] = [
      {data: [], label: 'Implant Surg'},
        {data: [], label: 'Braces' },
        {data: [], label: 'Aligners' },
        {data: [], label: 'MAS' },
        {data: [], label: 'Perio Surg' }, 
        {data: [], label: 'Endo Re-treat' },  
        {data: [], label: 'Veneers (indirect)' } 
     ];

  public stackedChartData1: any[] = [];
  public stackedChartData2: any[] = [];
  public stackedChartData3: any[] = [];
  public stackedChartData4: any[] = [];
  public stackedChartData5: any[] = [];
  public stackedChartData6: any[] = [];
  public stackedChartData7: any[] = [];
  public stackedChartData8: any[] = [];
  public stackedChartData9: any[] = [];
  public duration='';
  public predictedChartData: any[] = [
    {data: [], label: '',  shadowOffsetX: 3,
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

  public predictedChartData1: any[] = [];  
  public predictedChartData2: any[] = [];  
  public predictedChartData3: any[] = [];  

  public proceedureChartType = 'horizontalBar';

  public proceedureChartData: any[] = [
    {data: [], label: 'Total Revenue of Clinician Per Procedure',  shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            backgroundColor: [
              '#119682',
              '#eeeef8',
              '#119682',
              '#eeeef8',
              '#119682',
              '#eeeef8',
              '#119682',
              '#eeeef8',
              '#119682',
              '#eeeef8',
            ],
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.5)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.5)',
            backgroundOverlayMode: 'multiply'}
    ];
  public proceedureDentistChartData: any[] = [
    { data: [],
      backgroundColor: [
        '#119682',
        '#eeeef8',
        '#119682',
        '#eeeef8',
        '#119682',
        '#eeeef8',
        '#119682',
        '#eeeef8',
        '#119682',
        '#eeeef8',
      ],
      
      label: 'Total Revenue of Clinician Per Procedure',  
      shadowOffsetX: 3,
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
  public proceedureChartData1: any[] = []; 
 

  //Total  
  public predictedTotal1 = 0;
  public predictedTotal2 = 0;
  public predictedTotal3 = 0;

  public predictedTotalAverage1 = 0;
  public predictedTotalAverage2 = 0;
  public predictedTotalAverage3 = 0;

 public predictedPreviousAverage1 = 0;
  public predictedPreviousAverage2 = 0;
  public predictedPreviousAverage3 = 0;

  public predictedPreviousTotal1 = 0;
  public predictedPreviousTotal2 = 0;
  public predictedPreviousTotal3 = 0;

  public pieChartInternalTotal = 0;
  public pieChartExternalTotal = 0;
  public pieChartCombinedTotal = 0;

  // Pie
  public pieChartLabels: string[] = [
  ];
   public pieChartLabels1: string[] = [
  ];
    public pieChartLabels2: string[] = [
  ];
    public pieChartLabels3: string[] = [
  ];
  public pieChartData1: number[] = [];
  public pieChartData2: number[] = [];
  public pieChartData3: number[] = [];
  public pieChartType = 'doughnut';
  public pieChartDatares1: number[] = [];
  public pieChartDatares2: number[] = [];
  public pieChartDatares3: number[] = [];
public pieChartLabelsres: string[] = [
  ];
  public pieChartLabelsres1: string[] = [
  ];
   public pieChartLabelsres2: string[] = [
  ]; public pieChartLabelsres3: string[] = [
  ];

    public predictedTotalAverageTooltip = 'down';

    public predictedTotalAverageTooltip1 = 'down';
    public predictedTotalAverageTooltip2 = 'down';
    public predictedTotalAverageTooltip3 = 'down';
    public predictedPreviousAverage = 0;
    public pieChartInternalPrevTotal=0;
    public pieChartInternalPrevTooltip='down';
    public pieChartExternalPrevTotal=0;
    public pieChartExternalPrevTooltip='down';
    public pieChartCombinedPrevTotal=0;
    public pieChartCombinedPrevTooltip='down';
        public predictedTotalTooltip1 = 'down';
    public predictedTotalTooltip2 = 'down';
    public predictedTotalTooltip3 = 'down';

  public itemPredictedChartData: any[] = [
    {data: [10,1,5], label: 'Items Predictor Analysis ',  shadowOffsetX: 3,
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
            backgroundOverlayMode: 'multiply'}

    ];  
public itemPredictedChartSpecailData: any[] = [
    {data: [10,1,5], label: 'Items Predictor Specail Analysis ',  shadowOffsetX: 3,
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
            backgroundOverlayMode: 'multiply'}

    ];
        
  public itemPredictedChartData1: any[] = [];  

  public itemPredictedChartLabels: string[] = [];

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
  public  gaugeValuePredicted = 0;
  public  gaugeValuePredicted1 = 0;

  public  gaugeValuePredicted2 = 0;

  public  gaugeValuePredicted3 = 0;
  public  gaugeLabelPredicted = "";
  public predictedDentistTotal = 0;
  public predictedDentistPrevTotal = 0;

  public gaugePrependText ='$';
  public gaugeAppendText ='%';

  public startDate ='';
  public endDate = '';
  public selectedValToggle ='off';
  public gaugeDuration ='2500';
  public dentistid ='';
  //lOad individula dentist Chart
 loadDentist(newValue) {  

if(this._cookieService.get("user_type") == '4'){
    $('.predicted_main').hide();
    $('.predicted1').show();
    // if(this._cookieService.get("dentist_toggle") === 'true'){
    //       newValue = this.dentistid;
          
    // }
    // else
    newValue = this.dentistid;
  }

  $('.ratioPredictorSingle .predictor_ratio .sa_tab_btn').removeClass('active');
  $('.pr1').addClass('active');
  $('.predictor_ratio_main').find('.sa_tab_btn').removeClass('active');
  $('.prmain1').addClass('active');
  $('#title').html('<span>Clinician Procedures & Referrals</span>');
  $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) );
  if(newValue == 'all') {
    $(".predicted1Tool").show();
    $(".referral1Tool").show();
    $(".onofftoogle").hide();
    if(this.toggleChecked ) {
    this.selectedValToggle ='off';
    $('.target_off').click();
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_off').addClass('mat-button-toggle-checked');
    this.toggleChecked =false;
    }
    this.changePieReferral('Combined');
    this.dentistMode = false;
     //(<HTMLElement>document.querySelector('.itemsPredictorSingle')).style.display = 'none';
    //(<HTMLElement>document.querySelector('.itemsPredictor')).style.display = 'block';
    (<HTMLElement>document.querySelector('.ratioPredictorSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.ratioPredictor')).style.display = 'block';

    //(<HTMLElement>document.querySelector('.itemsPredictorSpecialSingle')).style.display = 'none';
    //(<HTMLElement>document.querySelector('.itemsPredictorSpecial')).style.display = 'block';    
    if(this.procedureAnalysisVisibility == "General"){
      this.buildChart();
    }else if(this.procedureAnalysisVisibility == "Specialist"){
      this.predictorAnalysisSpecial();
    }
     
    if(this.childid == '') {           
      this.buildChartProceedure();
      this.buildChartReferral();
      $('.revenueProceedureSingle').hide();
      $('.revenueProceedure').show();
    } else {
      this.selectedDentist =  this.dentistid;
      this.buildChartReferralDentist();
      this.buildChartProceedureDentist();        
      $('.revenueProceedureSingle').show();
      $('.revenueProceedure').hide();
    }
    this.buildChartPredictor();

  } else {
    this.selectedDentist = newValue;
    $(".onofftoogle").show();
    $(".trend_arrow").hide();
    if(this.toggleChecked ) {
      this.toggleChangeProcess()
    } else {
      if( this.procedureAnalysisVisibility == "General"){
        this.buildChartDentist();
      }else if( this.procedureAnalysisVisibility == "Specialist"){
        this.procedureAnalysisSpecialDentist();
      }
      this.dentistMode = true;
      if(!this.toggleChecked) {
        /*(<HTMLElement>document.querySelector('.itemsPredictorSingle')).style.display = 'block';
        (<HTMLElement>document.querySelector('.itemsPredictor')).style.display = 'none'*/; 
      }
      /*(<HTMLElement>document.querySelector('.itemsPredictorSpecialSingle')).style.display = 'block';
      (<HTMLElement>document.querySelector('.itemsPredictorSpecial')).style.display = 'none';   */
      (<HTMLElement>document.querySelector('.ratioPredictorSingle')).style.display = 'none';
      (<HTMLElement>document.querySelector('.ratioPredictor')).style.display = 'block';        
      this.buildChartPredictorDentist();
      this.buildChartProceedureDentist();
      setTimeout(()=>{
        $('.revenueProceedureSingle').show();
        $('.revenueProceedure').hide();
      },0)
      this.buildChartReferralDentist();
      this.changeDentistPredictor('1');
    }
/*    this.buildChartTreatmentDentist();
    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'none';
    this.buildChartNopatientsDentist();
    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'none';*/
  }
  }

  public ItemsPredictorAnalysisGenMulti: any[] = [
    { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }];
  public showmulticlinicGenPredictor:boolean = false;
  public ItemsPredictorAnalysisGenLabels:any=[];
  public stackedChartDataMax;
  public buildChartLoader:boolean = false;
  public ipKey;
  public IPcolors;
  public barChartColors;
  public paGeneralData:any = [];
  //Items Predictor Analysis - All dentist Chart
  private buildChart() {
    this.buildChartLoader =true;
    var user_id;
    var clinic_id;
       this.stackedChartData = [
    {data: [], label: 'Crowns & Onlays'},
    {data: [], label: 'Splints' },
    {data: [], label: 'Root Canals' },
    {data: [], label: 'Perio Charts' },
    {data: [], label: 'Surgical Extractions' },
    {data: [], label: 'Stainless Steel Crowns'},  
    {data: [], label: 'Composite Veneers'},  
    {data: [], label: 'Implant Crowns'},  
    {data: [], label: 'Whitening'}
    ];


  this.clinic_id && this.clinicianproceeduresService.ItemsPredictorAnalysis(this.clinic_id,this.startDate,this.endDate,this.user_type,this.childid).subscribe((data) => {   
        this.buildChartLoader =false;
        this.ItemsPredictorAnalysisGenMulti = [];
        this.showmulticlinicGenPredictor = false;
        this.ItemsPredictorAnalysisGenLabels = [];
        this.stackedChartData1 = [];
        this.stackedChartData2 = [];
        this.stackedChartData3 = [];
        this.stackedChartData4 = [];
        this.stackedChartData5 = [];
        this.stackedChartData6 = [];
        this.stackedChartData7 = [];
        this.stackedChartData8 = [];
        this.stackedChartData9 = [];
        this.stackedChartLabels1 =[];
        this.stackedChartLabels =[];
        this.stackedChartDataMax = 0;
        this.paGeneralData = [];
       if(data.message == 'success'){ 
        if(data && data.data && data.data.length <=0) {

        }else {
          if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
            this.showmulticlinicGenPredictor = true;
            data.data.forEach(res => {
              res.proval.forEach((result, key) => {
                if (typeof (this.ItemsPredictorAnalysisGenMulti[key]) == 'undefined') {
                  this.ItemsPredictorAnalysisGenMulti[key] = { data: [], label: '' };
                }
                if (typeof (this.ItemsPredictorAnalysisGenMulti[key]['data']) == 'undefined') {
                  this.ItemsPredictorAnalysisGenMulti[key]['data'] = [];
                }
                var total = Math.trunc(result.total);                
                this.ItemsPredictorAnalysisGenMulti[key]['data'].push(total);
                this.ItemsPredictorAnalysisGenMulti[key]['label'] = result.desc;
               });
               this.ItemsPredictorAnalysisGenLabels.push(res.clinic_name);
            });
          }else{
                var i=0
          data && data.data && data.data.length && data.data.forEach(res => {
              if(res.provider_name != null){
                if( (parseInt(res.crowns) + parseInt(res.splints) + parseInt(res.rct) + parseInt(res.perio) + parseInt(res.extract)  + parseInt(res.ss_crowns)  + parseInt(res.comp_veneers)  + parseInt(res.imp_crowns) ) > 0){
              
                this.stackedChartData1.push(res.crowns);
                this.stackedChartData2.push(res.splints);
                this.stackedChartData3.push(res.rct);
                this.stackedChartData4.push(res.perio);
                this.stackedChartData5.push(res.extract);             
                this.stackedChartData6.push(res.ss_crowns);
                this.stackedChartData7.push(res.comp_veneers);
                this.stackedChartData8.push(res.imp_crowns);
                this.stackedChartData9.push(res.whitening);
                this.stackedChartLabels1.push(res.provider_name);
                if(res.provider_name != 'Anonymous')
                  this.ipKey =i;
                i++;
              }
              var temp =  {
                'name':  res.provider_name, 
                'Crowns_Onlays':  parseInt(res.crowns), 
                'Splints':  parseInt(res.splints), 
                'RCT':  parseInt(res.rct), 
                'Perio':  parseInt(res.perio), 
                'Surg_Ext':  parseInt(res.extract),
                'Imp_Crowns':  parseInt(res.imp_crowns), 
                'SS_Crowns':  parseInt(res.ss_crowns), 
                'Comp_Veneers':  parseInt(res.comp_veneers), 
                'Whitening': parseInt(res.whitening),
                };
                this.paGeneralData.push(temp);

              }
          //    this.productionTotal = this.productionTotal + parseInt(res.total);
            });
          this.stackedChartData[0]['data'] = this.stackedChartData1;
          this.stackedChartData[1]['data'] = this.stackedChartData2;
          this.stackedChartData[2]['data'] = this.stackedChartData3;
          this.stackedChartData[3]['data'] = this.stackedChartData4;
          this.stackedChartData[4]['data'] = this.stackedChartData5;
          this.stackedChartData[5]['data'] = this.stackedChartData6;
          this.stackedChartData[6]['data'] = this.stackedChartData7;
          this.stackedChartData[7]['data'] = this.stackedChartData8;
          this.stackedChartData[8]['data'] = this.stackedChartData9;
          this.stackedChartLabels = this.stackedChartLabels1;
          
            if(this.user_type == '4' && this.childid != '') {
              this.barChartColors = [
                { backgroundColor: ['#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7'] },
                { backgroundColor: ['#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7'] },
                { backgroundColor: ['#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7'] },
                { backgroundColor: ['#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD'] },
                { backgroundColor: ['#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE'] },
                { backgroundColor: ['#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7'] },
                { backgroundColor: ['#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7'] },
                { backgroundColor: ['#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE'] },
                { backgroundColor: ['#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE'] }
            ];
            this.barChartColors[0].backgroundColor[this.ipKey] = '#1CA49F';
            this.barChartColors[1].backgroundColor[this.ipKey] = '#1fd6b1';
            this.barChartColors[2].backgroundColor[this.ipKey] = '#09b391';
            this.barChartColors[3].backgroundColor[this.ipKey] = '#82EDD8';
            this.barChartColors[4].backgroundColor[this.ipKey] = 'rgba(22, 82, 141, 1)';
            this.barChartColors[6].backgroundColor[this.ipKey] = '#1fd6b1';
            this.barChartColors[5].backgroundColor[this.ipKey] = '#1CA49F';
            this.barChartColors[7].backgroundColor[this.ipKey] = '#09b391';
            this.barChartColors[8].backgroundColor[this.ipKey] = '#D5D7D7';
            

            this.IPcolors= this.barChartColors;
          }
          else
            this.IPcolors= this.ItemPredictorColors;
          
          this.stackedChartDataMax = Math.max(...this.stackedChartData[0]['data'])+Math.max(...this.stackedChartData[1]['data'])+Math.max(...this.stackedChartData[2]['data'])+Math.max(...this.stackedChartData[3]['data'])+Math.max(...this.stackedChartData[4]['data'])+Math.max(...this.stackedChartData[5]['data'])+Math.max(...this.stackedChartData[6]['data'])+Math.max(...this.stackedChartData[7]['data']);
          //this.productionTotalAverage = this.productionTotal/this.barChartData1.length;
          }

          
         }
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

/****** Item Predictor Specail *********/
  public ItemsPredictorAnalysisSpecialStatus:boolean = false;
  public predictorAnalysis1 = [];
  public predictorAnalysis2 = [];
  public predictorAnalysis3 = [];
  public predictorAnalysis4 = [];
  public predictorAnalysis5 = [];
  public predictorAnalysis6 = [];
  public predictorAnalysis7 = []; 
  public predictorAnalysisLablesSpe =[];
  public predictorAnalysisLablesTemp =[];
  public predictorAnalysisDataMax = 0;  
  public predictorAnalysisChartColors; 
  public paSpecialistlData:any = []; 
  public ItemsPredictorAnalysisMulti: any[] = [
    { data: [], label: '' }];
  public showmulticlinicItemsPredictor:boolean = false;
  public ItemsPredictorAnalysisLabels:any=[];
  public predictorAnalysisSpecialLoader: boolean = true;
  //Items Predictor Analysis special - All dentist Chart
  private predictorAnalysisSpecial() {
    this.ItemsPredictorAnalysisSpecialStatus =true;
    this.predictorAnalysisSpecialLoader = true;
    this.ItemsPredictorAnalysisMulti = [];
    this.showmulticlinicItemsPredictor = false;
    this.ItemsPredictorAnalysisLabels = [];
    this.stackedChartDataItemSpecial = [
      {data: [], label: 'Implant Surg'},
      {data: [], label: 'Braces' },
      {data: [], label: 'Aligners' },
      {data: [], label: 'MAS' },
      {data: [], label: 'Perio Surg' }, 
      {data: [], label: 'Endo Re-treat' },  
      {data: [], label: 'Veneers (indirect)' } 
        ];
  this.clinic_id && this.clinicianproceeduresService.ItemsPredictorAnalysisSpecial(this.clinic_id,this.startDate,this.endDate,this.user_type,this.childid).subscribe((data) => {   
        this.ItemsPredictorAnalysisSpecialStatus =false;
        this.predictorAnalysisSpecialLoader = false;
        this.predictorAnalysis1 = [];
        this.predictorAnalysis2 = [];
        this.predictorAnalysis3 = [];
        this.predictorAnalysis4 = [];
        this.predictorAnalysis5 = [];
        this.predictorAnalysis6 = [];
        this.predictorAnalysis7 = [];
        this.predictorAnalysisLablesSpe =[];
        this.predictorAnalysisLablesTemp =[];
        this.predictorAnalysisDataMax = 0;
        this.paSpecialistlData = [];
        this.ItemsPredictorAnalysisMulti = [];
        this.ItemsPredictorAnalysisLabels = [];
       if(data.message == 'success'){   
        if(data && data.data && data.data.length <= 0) {
        } else {
          if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
            this.showmulticlinicItemsPredictor = true;
            data.data.forEach(res => {
              res.proval.forEach((result, key) => {
                if (typeof (this.ItemsPredictorAnalysisMulti[key]) == 'undefined') {
                  this.ItemsPredictorAnalysisMulti[key] = { data: [], label: '' };
                }
                if (typeof (this.ItemsPredictorAnalysisMulti[key]['data']) == 'undefined') {
                  this.ItemsPredictorAnalysisMulti[key]['data'] = [];
                }
                var total = Math.trunc(result.total);
                if (result.production > 0 && result.production.toString().includes('.')) {
                  var num_parts = result.production.split(".");
                  num_parts[1] = num_parts[1].charAt(0);
                  total = num_parts.join(".");
                }
                this.ItemsPredictorAnalysisMulti[key]['data'].push(total);
                this.ItemsPredictorAnalysisMulti[key]['label'] = result.desc;
               });
               this.ItemsPredictorAnalysisLabels.push(res.clinic_name);
            });
          }else{
            var i=0
            var currentUser = 0;
            data && data.data && data.data.length && data.data.forEach(res => {            
              if(res.provider_name != null){
                if(parseInt(res.imp_surg) + parseInt(res.ortho_fix) + parseInt(res.sleep) + parseInt(res.ortho_align) + parseInt(res.perio_surg) + parseInt(res.veneers_ind)> 0){
  
                  this.predictorAnalysis1.push(res.imp_surg);
                  this.predictorAnalysis2.push(res.ortho_fix);
                  this.predictorAnalysis3.push(res.ortho_align);
                  this.predictorAnalysis4.push(res.sleep);
                  this.predictorAnalysis5.push(res.perio_surg);
                  this.predictorAnalysis6.push(res.endo_retreat);
                  this.predictorAnalysis7.push(res.veneers_ind);
  
                  this.predictorAnalysisLablesTemp.push(res.provider_name);
                  if(res.provider_name != 'Anonymous')
                      currentUser = i;
                      i++;
                  }
                  var temp =  {
                    'name':  res.provider_name, 
                    'Implant_Surg':  parseInt(res.imp_surg), 
                    'Braces':  parseInt(res.ortho_fix), 
                    'Aligners':  parseFloat(res.ortho_align), 
                    'MAS':  parseInt(res.sleep), 
                    'Perio_Surg':  parseInt(res.perio_surg), 
                    'Endo_Re_treat':  parseInt(res.endo_retreat), 
                    'Veneers_ind':  parseInt(res.veneers_ind), 
                    };
                    this.paSpecialistlData.push(temp);
                }
            });
            this.stackedChartDataItemSpecial[0]['data'] = this.predictorAnalysis1;
            this.stackedChartDataItemSpecial[1]['data'] = this.predictorAnalysis2;
            this.stackedChartDataItemSpecial[2]['data'] = this.predictorAnalysis3;
            this.stackedChartDataItemSpecial[3]['data'] = this.predictorAnalysis4;
            this.stackedChartDataItemSpecial[4]['data'] = this.predictorAnalysis5;
            this.stackedChartDataItemSpecial[5]['data'] = this.predictorAnalysis6;
            this.stackedChartDataItemSpecial[6]['data'] = this.predictorAnalysis7;
  
            this.predictorAnalysisLablesSpe = this.predictorAnalysisLablesTemp;
            if(this.user_type == '4' && this.childid != '') {
              this.predictorAnalysisChartColors = [
                { backgroundColor: ['#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7'] },
                { backgroundColor: ['#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7'] },
                { backgroundColor: ['#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7'] },
                { backgroundColor: ['#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD'] },
                { backgroundColor: ['#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE'] },
                { backgroundColor: ['#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7'] },
                { backgroundColor: ['#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7'] },
              ];
              this.predictorAnalysisChartColors[0].backgroundColor[currentUser] = '#1CA49F';
              this.predictorAnalysisChartColors[1].backgroundColor[currentUser] = '#1fd6b1';
              this.predictorAnalysisChartColors[2].backgroundColor[currentUser] = '#09b391';
              this.predictorAnalysisChartColors[3].backgroundColor[currentUser] = '#82EDD8';
              this.predictorAnalysisChartColors[4].backgroundColor[currentUser] = 'rgba(22, 82, 141, 1)';
              this.predictorAnalysisChartColors[5].backgroundColor[currentUser] = '#1Cb410';
              this.predictorAnalysisChartColors[6].backgroundColor[currentUser] = '#09c250';
            } else
              this.predictorAnalysisChartColors = this.ItemPredictorSpecialColors;
  
            this.predictorAnalysisDataMax = Math.max(...this.stackedChartDataItemSpecial[0]['data'])+Math.max(...this.stackedChartDataItemSpecial[1]['data'])+Math.max(...this.stackedChartDataItemSpecial[2]['data'])+Math.max(...this.stackedChartDataItemSpecial[3]['data'])+Math.max(...this.stackedChartDataItemSpecial[4]['data'])+Math.max(...this.stackedChartDataItemSpecial[5]['data'])+Math.max(...this.stackedChartDataItemSpecial[6]['data']);
            //this.productionTotalAverage = this.productionTotal/this.barChartData1.length;
          }          
        }
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

/****** Item Predictor Specail *********/









  public itemPredictedChartDataMax;
  public buildChartDentistLoader:any;
  //Items Predictor Analysis Single
  private buildChartDentist() {
    if(!this.clinic_id){
      return false;
    }
    this.buildChartDentistLoader = true;
    var user_id;
    var clinic_id;
  this.clinicianproceeduresService.ItemsPredictorAnalysisDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
        this.buildChartDentistLoader = false;
        this.itemPredictedChartDataMax = 0;
       if(data.message == 'success' && data.data && data.data.length){
          this.itemPredictedChartData1 = [];
           this.itemPredictedChartLabels=[];
          var temp=[];
          temp['Crowns'] = data.data[0].crowns;
          
          temp['Splints'] = data.data[0].splints;
         
          temp['Root Canals'] = data.data[0].rct;
         
          temp['Perio'] = data.data[0].perio;
         
          temp['Surgical Extractions'] = data.data[0].extract;
          temp['Stainless Steel Crowns'] = data.data[0].ss_crowns;
          temp['Composite Veneers'] = data.data[0].comp_veneers;
          temp['Implant Crowns'] = data.data[0].imp_crowns;
          temp['Whitening'] = data.data[0].whitening;
          var tupleArray=[];
   for (var key in temp) tupleArray.push([key, temp[key]]);
    tupleArray.sort(function (a, b) { return b[1] - a[1] });
      
      tupleArray.forEach((res,key) => {
        this.itemPredictedChartData1.push(res[1]);
        this.itemPredictedChartLabels.push(res[0]);
      });
          this.itemPredictedChartData[0]['data'] = this.itemPredictedChartData1;
          this.itemPredictedChartData[0]['label'] = 'DentistMode-'+data.data[0].provider_name;
          //this.itemPredictedChartLabels= ['Crowns','Splints','Root Canals','Perio','Surgical Extractions'];

          this.itemPredictedChartDataMax = Math.max(...this.itemPredictedChartData[0]['data']);         
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

/********Procedure Special Dentist Hanney**********/
  
  public procedureSpecialDataMax;
  public procedureSpecialDentistLoader:any;
  public procedureSpecialTemp:any;
  public procedureSpecialLabels:any;

  private procedureAnalysisSpecialDentist() {
    if(!this.clinic_id){
      return false;
    }
    this.procedureSpecialDentistLoader = true;
    this.clinicianproceeduresService.ItemsPredictorAnalysisSpecialistDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
      this.procedureSpecialDentistLoader = false;
      this.procedureSpecialDataMax = 0;
      if(data.message == 'success' && data.data && data.data.length) {
        this.procedureSpecialTemp = [];
        this.procedureSpecialLabels=[];
        var temp=[];
        temp['Implant Surg'] = data.data[0].imp_surg;
        temp['Braces'] = data.data[0].ortho_fix;
        temp['Aligners'] = data.data[0].ortho_align;
        temp['MAS'] = data.data[0].sleep;
        temp['Perio Surg'] = data.data[0].perio_surg;
        temp['Endo Re-treat'] = data.data[0].endo_retreat;
        temp['Veneers (indirect)'] = data.data[0].veneers_ind;
        var tupleArray=[];
        for (var key in temp) tupleArray.push([key, temp[key]]);
        tupleArray.sort(function (a, b) { return b[1] - a[1] });
        tupleArray.forEach((res,key) => {
          this.procedureSpecialTemp.push(res[1]);
          this.procedureSpecialLabels.push(res[0]);
        });
        this.itemPredictedChartSpecailData[0]['data'] = this.procedureSpecialTemp;
        this.itemPredictedChartSpecailData[0]['label'] = 'DentistMode-'+data.data[0].provider_name;
        this.procedureSpecialDataMax = Math.max(...this.itemPredictedChartData[0]['data']);         
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

/********Procedure Special**********/

public predictedMulti1: any[] = [
  { data: [], label: '' }, { data: [], label: '' }];
public predictedMulti2: any[] = [
{ data: [], label: '' }, { data: [], label: '' }];
public predictedMulti3: any[] = [
{ data: [], label: '' }, { data: [], label: '' }];  

public showmulticlinicPredictor:boolean = false;
public predictorLabels1:any=[];
public predictorLabels2:any=[];
public predictorLabels3:any=[];


public predictedChartD:any[] =[];
public predictedChartL:any[] =[];
public predictedT:any=[];
public predictedTotal0;
public predictedTotal;
public predictedTP:any=[];
public predictorRatioTab;
public buildChartPredictorLoader:boolean=false;
public prKey:any[] =[];
public PRcolors;
   public predictedstackedChartData = [
    {data: [], label: ''},
    {data: [], label: '' } ];

  public predictedstackedChartData1 = [{data: [], label: 'Indirect Restorations'},{data: [], label: 'Large Direct Restorations' } ];
  public predictedstackedChartData2 = [{data: [], label: 'RCT'},{data: [], label: 'Extractions' } ];
  public predictedstackedChartData3 = [{data: [], label: "RCT's Started" },{data: [], label: "RCT's Completed" } ];
  public predictedstackedChartLabels=[];
  public predictedstackedChartLabels1=[];
  public predictedstackedChartLabels2=[];
  public predictedstackedChartLabels3=[];
  public predictedstackedChartLabels1Avr = 0;
  public predictedstackedChartLabels2Avr = 0;
  public predictedstackedChartLabels3Avr = 0;  
  public predictedstackedChartLabels1AvrPre = 0;
  public predictedstackedChartLabels2AvrPre = 0;
  public predictedstackedChartLabels3AvrPre = 0;    
  public predictedstackedChartAvr:any = '0:0';    
  public ratio1 :any =0;
  public ratio2 :any =0;
  public ratio3 :any =0;
  public ratio4 :any =0;
  public ratio5 :any =0;
  public ratio6 :any =0;
  public multifulratio1:any;
  public multifulratio2:any;
  public multifulratio3:any;


  //Predictor Ratio :All Dentist
  private buildChartPredictor() {
    if(this.clinic_id == null || this.clinic_id == 'null')
      return true;
    this.buildChartPredictorLoader = true;
    this.clinicianproceeduresService.PredictorRatio(this.clinic_id,this.startDate,this.endDate,this.duration,this.user_type,this.childid).subscribe((data) => {
      this.buildChartPredictorLoader = false;
      this.predictedstackedChartData1 = [{data: [], label: 'Indirect Restorations'},{data: [], label: 'Large Direct Restorations' } ];
      this.predictedstackedChartData2 = [{data: [], label: 'RCT'},{data: [], label: 'Extractions' } ];
      this.predictedstackedChartData3 = [{data: [], label: "RCT's Started" },{data: [], label: "RCT's Completed" } ];
      this.predictedstackedChartLabels1 = [];
      this.predictedstackedChartLabels2 = [];
      this.predictedstackedChartLabels3 = [];
      this.predictedstackedChartLabels1Avr = 0;
      this.predictedstackedChartLabels2Avr = 0;
      this.predictedstackedChartLabels3Avr = 0;    
      this.predictedstackedChartLabels1AvrPre = 0;
      this.predictedstackedChartLabels2AvrPre = 0;
      this.predictedstackedChartLabels3AvrPre = 0; 

      this.predictedMulti1 = [];
      this.predictedMulti2 = [];
      this.predictedMulti3 = [];
      this.showmulticlinicPredictor = false;
      this.predictorLabels1 = [];
      this.predictorLabels2 = [];
      this.predictorLabels3 = [];
      this.multifulratio1 ='';
      this.multifulratio2 ='';
      this.multifulratio3 ='';
      this.ratio1 =0;
      this.ratio2 =0;
      this.ratio3 =0;
      this.ratio4 =0;
      this.ratio5 =0;
      this.ratio6 =0;

      if(data.message == 'success'){        
        this.predictedstackedChartLabels1AvrPre = data.total_ta[0];
        this.predictedstackedChartLabels2AvrPre = data.total_ta[1];
        this.predictedstackedChartLabels3AvrPre = data.total_ta[2]; 

        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showmulticlinicPredictor = true;
          data.data_crown_large.forEach(res => {
            res.proval.forEach((result, key) => {
              if (typeof (this.predictedMulti1[key]) == 'undefined') {
                this.predictedMulti1[key] = { data: [], label: '' };
              }
              if (typeof (this.predictedMulti1[key]['data']) == 'undefined') {
                this.predictedMulti1[key]['data'] = [];
              }
              var total = Math.trunc(result.total);                
              this.predictedMulti1[key]['data'].push(total);
              this.predictedMulti1[key]['label'] = result.desc;
              if(key == 0){
                this.ratio1 = this.ratio1 + total;
              }
              if(key == 1){
                this.ratio2 =  this.ratio2 + total;
              }
             });
             this.multifulratio1 = this.ratio1 +':'+ this.ratio2;
             this.predictorLabels1.push(res.clinic_name);
          });
          data.data_rct_ext.forEach(res => {
            res.proval.forEach((result, key) => {
              if (typeof (this.predictedMulti2[key]) == 'undefined') {
                this.predictedMulti2[key] = { data: [], label: '' };
              }
              if (typeof (this.predictedMulti2[key]['data']) == 'undefined') {
                this.predictedMulti2[key]['data'] = [];
              }
              var total = Math.trunc(result.total);                
              this.predictedMulti2[key]['data'].push(total);
              this.predictedMulti2[key]['label'] = result.desc;
              if(key == 0){
                this.ratio3 = this.ratio3 + total;
              }
              if(key == 1){
                this.ratio4 =  this.ratio4 + total;
              }
             });
             this.multifulratio2 = this.ratio3 +':'+ this.ratio4;
             this.predictorLabels2.push(res.clinic_name);
          });
          data.data_rctsta_comp.forEach(res => {
            res.proval.forEach((result, key) => {
              if (typeof (this.predictedMulti3[key]) == 'undefined') {
                this.predictedMulti3[key] = { data: [], label: '' };
              }
              if (typeof (this.predictedMulti3[key]['data']) == 'undefined') {
                this.predictedMulti3[key]['data'] = [];
              }
              var total = Math.trunc(result.total);                
              this.predictedMulti3[key]['data'].push(total);
              this.predictedMulti3[key]['label'] = result.desc;
              if(key == 0){
                this.ratio5 = this.ratio5 + total;
              }
              if(key == 1){
                this.ratio6 =  this.ratio6 + total;
              }
             });
             this.multifulratio3 = this.ratio5 +':'+ this.ratio6;
             this.predictorLabels3.push(res.clinic_name);
          });          
        }else{
          data.data.forEach((res,key) => {
            var provider = res.provider_name;
            if(!provider)
              provider = '';
            if(key == 0) {
              this.predictedstackedChartData1[0]['data'].push(parseInt(res.first_value));
              this.predictedstackedChartData1[1]['data'].push(parseInt(res.second_value));
              this.predictedstackedChartLabels1Avr = res.ratio;
              this.predictedstackedChartLabels1.push(provider);            
            } else if(key == 1) {
              this.predictedstackedChartData2[0]['data'].push(parseInt(res.first_value));
              this.predictedstackedChartData2[1]['data'].push(parseInt(res.second_value));
              this.predictedstackedChartLabels2Avr = res.ratio;
              this.predictedstackedChartLabels2.push(provider);
            } else if(key == 2) {
              this.predictedstackedChartData3[0]['data'].push(parseInt(res.first_value));
              this.predictedstackedChartData3[1]['data'].push(parseInt(res.second_value));
              this.predictedstackedChartLabels3Avr = res.ratio;
              this.predictedstackedChartLabels3.push(provider);
            } 
          });
          this.buildChartPredictorLoader = false;
        }	
        
        this.changeDentistPredictorMain('1')
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

    //Chnage predictor tab
    changeDentistPredictorMain(val) { 
      this.predictedstackedChartAvr = 0;
      this.predictorRatioTab = val;
      $('.predictor_ratio_main .sa_tab_btn').removeClass('active');
      $('.prmain'+val).addClass('active');
      $('.predicted_main').hide();
      $('.predictedToolMain').hide();
      $('.predicted'+val+'Tool').show();
      $('.predicted_main.predicted'+val).css('display','flex');
      if(this.user_type == '4' && this.childid != '') {
        this.barChartColors = [ { backgroundColor: [] } ];
        this.barChartColors[0].backgroundColor[this.prKey[val-1]] = '#1CA49F';
        this.PRcolors= this.barChartColors;
      } else
        this.PRcolors= this.predictedChartColors;
      if(val =='1') {     
        this.predictedstackedChartData = this.predictedstackedChartData1;
        this.predictedstackedChartLabels = this.predictedstackedChartLabels1;
        this.predictedstackedChartAvr = this.predictedstackedChartLabels1Avr;
      } else if(val =='2'){      
        this.predictedstackedChartData = this.predictedstackedChartData2;
        this.predictedstackedChartLabels = this.predictedstackedChartLabels2;
        this.predictedstackedChartAvr = this.predictedstackedChartLabels2Avr;
      } else if(val =='3') {
        this.predictedstackedChartData = this.predictedstackedChartData3;
        this.predictedstackedChartLabels = this.predictedstackedChartLabels3;
        this.predictedstackedChartAvr = this.predictedstackedChartLabels3Avr;
      }
    } 
public gaugeValuePredictedPrev1;
public gaugeValuePredictedPrev2;
public gaugeValuePredictedPrev3;
public buildChartPredictorDentistLoader:boolean = false;
public crowns:any=0; 
public crowns_ta :any=0; 
public large_fillings:any=0; 
public large_fillings_ta :any=0; 
public extractions:any=0; 
public extractions_ta :any=0; 
public root_canals:any=0; 
public root_canals_ta :any=0; 
public rct_completed:any=0; 
public rct_completed_ta:any=0; 
public rct_started :any=0; 
public rct_started_ta :any=0; 


public predictedstackedChartLoader: boolean = false;
 //Predictor Ratio :All Dentist
  private buildChartPredictorDentist() {
    if(!this.clinic_id){
      return false;
    }
    this.predictedstackedChartLoader = true;
    this.clinicianproceeduresService.PredictorRatioDentist(this.selectedDentist,this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
      this.predictedstackedChartLoader = false;
      this.predictedstackedChartData1 = [{data: [], label: 'Indirect Restorations'},{data: [], label: 'Large Direct Restorations' } ];
      this.predictedstackedChartData2 = [{data: [], label: 'RCT'},{data: [], label: 'Extractions' } ];
      this.predictedstackedChartData3 = [{data: [], label: "RCT's Started" },{data: [], label: "RCT's Completed" } ];
      this.predictedstackedChartLabels1 = [];
      this.predictedstackedChartLabels2 = [];
      this.predictedstackedChartLabels3 = [];
      this.predictedstackedChartLabels1Avr = 0;
      this.predictedstackedChartLabels2Avr = 0;
      this.predictedstackedChartLabels3Avr = 0;    
      if(data.message == 'success'){    
        this.predictedstackedChartLabels1AvrPre = data.total_ta[0];
        this.predictedstackedChartLabels2AvrPre = data.total_ta[1];
        this.predictedstackedChartLabels3AvrPre = data.total_ta[2];    
        data.data.forEach((res,key) => {
          var provider = res.provider_name;
          if(!provider)
            provider = '';
          if(key == 0) {
            this.predictedstackedChartData1[0]['data'].push(parseInt(res.first_value));
            this.predictedstackedChartData1[1]['data'].push(parseInt(res.second_value));
            this.predictedstackedChartLabels1Avr = res.ratio;
            this.predictedstackedChartLabels1.push(provider);            
          } else if(key == 1) {
            this.predictedstackedChartData2[0]['data'].push(parseInt(res.first_value));
            this.predictedstackedChartData2[1]['data'].push(parseInt(res.second_value));
            this.predictedstackedChartLabels2Avr = res.ratio;
            this.predictedstackedChartLabels2.push(provider);
          } else if(key == 2) {
            this.predictedstackedChartData3[0]['data'].push(parseInt(res.first_value));
            this.predictedstackedChartData3[1]['data'].push(parseInt(res.second_value));
            this.predictedstackedChartLabels3Avr = res.ratio;
            this.predictedstackedChartLabels3.push(provider);
          } 
        });
        this.predictorRatioTab = '1';
        this.predictedstackedChartData= this.predictedstackedChartData1;
        this.predictedstackedChartLabels= this.predictedstackedChartLabels1;
        this.predictedstackedChartAvr = this.predictedstackedChartLabels1Avr;
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }




//Total Revenue of Clinician Per Procedure

public buildChartProceedureLoader:any;

  private buildChartProceedure() {
    if(!this.clinic_id){
      return false;
    }
    this.buildChartProceedureLoader =true;          
    this.clinic_id && this.clinicianproceeduresService.ClinicianProceedure( this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
      if(data.message == 'success'){
        this.buildChartProceedureLoader =false;
        this.proceedureChartLabels1 = [];
        this.proceedureChartData1 =[];
        this.proceedureChartLabels =[];
        data.data.forEach(res => {
          if(res.total > 0 ) {
            this.proceedureChartData1.push(Math.round(res.total));
            if(res.item_name != null){
              this.proceedureChartLabels1.push(res.item_name);
            } else {
              this.proceedureChartLabels1.push(res.treat_code);
            }
           }
        });      
                /********** Add Space to top of graph ****/
        let maxY = Math.max(...this.proceedureChartData1);
        if(maxY < 100){
          this.proceedureChartOptions1.scales.xAxes[0].ticks.max = (Math.ceil(maxY/10)*10) + 4;          
        } else if(maxY < 1000){
          this.proceedureChartOptions1.scales.xAxes[0].ticks.max = (Math.ceil(maxY/100)*100) + 50;          
        } else if(maxY < 10000){
          this.proceedureChartOptions1.scales.xAxes[0].ticks.max = (Math.ceil(maxY/1000)*1000) + 500;          
        } else if(maxY < 100000){
          this.proceedureChartOptions1.scales.xAxes[0].ticks.max = (Math.ceil(maxY/10000)*10000) + 5000;          
        } else if(maxY < 500000){
          this.proceedureChartOptions1.scales.xAxes[0].ticks.max = (Math.ceil(maxY/10000) * 10000) + 5000;          
        } else if(maxY < 1000000){
          this.proceedureChartOptions1.scales.xAxes[0].ticks.max = (Math.ceil(maxY/100000)*100000) + 10000;          
        } else if(maxY > 1000000){
          this.proceedureChartOptions1.scales.xAxes[0].ticks.max = (Math.ceil(maxY/100000)*100000) + 100000;          
        }
        /********** Add Space to top of graph ****/
       this.proceedureChartData[0]['data'] = this.proceedureChartData1;
       this.proceedureChartLabels = this.proceedureChartLabels1; 
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


//Total Revenue of Clinician Per Procedure- all Dentist
public buildChartProceedureDentistLoader:any;

  private buildChartProceedureDentist() {
    this.buildChartProceedureDentistLoader =true;
   
  this.clinic_id && this.clinicianproceeduresService.ClinicianProceedureDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
    if (data.message == 'success' && data.data){
        this.buildChartProceedureDentistLoader =false;
        this.proceedureChartData1 = [];
        this.proceedureChartLabels1 = [];
         data.data.forEach(res => {
           this.proceedureChartData1.push(Math.round(res.total));
           if(res.item_name != null){
              this.proceedureChartLabels1.push(res.item_name);
            } else {
              this.proceedureChartLabels1.push(res.treat_code);
            }
        });
       this.proceedureDentistChartData[0]['data'] = this.proceedureChartData1;
       this.proceedureDentistChartLabels = this.proceedureChartLabels1;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

public pieChartDataMax1;
public pieChartDataMax2;
public pieChartDataMax3;
public crKey;
public CRcolors;
public doughnutChartColors1;
  //Referral to Other Clinicians Internal / External
  private buildChartReferral() {
        var user_id;
    var clinic_id;
      this.pieChartDatares1 = [];
           this.pieChartDatares2 = [];
           this.pieChartDatares3 = [];
           this.pieChartLabelsres1 = [];
           this.pieChartLabelsres2 = [];
           this.pieChartLabelsres = [];
          this.pieChartLabelsres3=[];
          this.clinicianReferralLoader = true;
    this.clinic_id && this.clinicianproceeduresService.ClinicianReferral(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
        this.clinicianReferralLoader = false;
        this.pieChartDatares1 = [];
        this.pieChartDatares2 = [];
        this.pieChartDatares3 = [];
        this.pieChartLabelsres1 = [];
        this.pieChartLabelsres2 = [];
        this.pieChartLabelsres3=[];

        this.pieChartInternalTotal = 0;
        this.pieChartExternalTotal = 0;
        this.pieChartCombinedTotal =0;
        this.pieChartInternalTotal = 0;
        this.pieChartExternalTotal =0;
        this.pieChartCombinedTotal = 0;
        this.pieChartDataMax1 = 0;
        this.pieChartDataMax2 = 0;
        this.pieChartDataMax3 = 0;
        this.pieChartInternalPrevTotal = 0;
        this.pieChartExternalPrevTotal = 0;
        this.pieChartCombinedPrevTotal = 0;
        this.pieChartInternalPrevTooltip = 'down';
        this.pieChartExternalPrevTooltip = 'down';
        this.pieChartCombinedPrevTooltip = 'down';
      if (data.message == 'success' && data.data && data.data.length) {
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          data.data.forEach(res => {
            res.val.forEach((result, key) => {
              if(result.internal > 0) {
                  this.pieChartDatares1.push(result.internal);
                  this.pieChartLabelsres1.push(result.treat_item_name);
                }
              if(result.external>0) {
                this.pieChartDatares2.push(result.external);
                this.pieChartLabelsres2.push(result.treat_item_name);
              } 
              if(result.total>0) {
                this.pieChartDatares3.push(result.total);
                this.pieChartLabelsres3.push(result.treat_item_name);
    
              }
              this.pieChartInternalTotal = this.pieChartInternalTotal + parseInt(result.internal);
              this.pieChartExternalTotal = this.pieChartExternalTotal + parseInt(result.external);
              this.pieChartCombinedTotal = this.pieChartCombinedTotal + parseInt(result.total);
            });
          });
        }else{
          var i=0;
          data.data.forEach(res => {
            if(res.internal > 0) {
            this.pieChartDatares1.push(res.internal);
            this.pieChartLabelsres1.push(res.treat_item_name);
            }
            if(res.external>0) {
            this.pieChartDatares2.push(res.external);
            this.pieChartLabelsres2.push(res.treat_item_name);
          }
          if(res.total>0) {
            this.pieChartDatares3.push(res.total);
            this.pieChartLabelsres3.push(res.treat_item_name);

          }
            this.pieChartInternalTotal = this.pieChartInternalTotal + parseInt(res.internal);
            this.pieChartExternalTotal = this.pieChartExternalTotal + parseInt(res.external);
            this.pieChartCombinedTotal = this.pieChartCombinedTotal + parseInt(res.total);
            if(res.label != 'Anonymous')
              this.crKey= i;
              i++;
            
          });

          this.pieChartInternalPrevTotal = this.pieChartInternalPrevTotal + parseInt(data.total_ta.internal);
          this.pieChartExternalPrevTotal = this.pieChartExternalPrevTotal + parseInt(data.total_ta.external);
          this.pieChartCombinedPrevTotal = this.pieChartCombinedPrevTotal + parseInt(data.total_ta.total);
        }
        
        if(this.pieChartInternalTotal>=this.pieChartInternalPrevTotal)
          this.pieChartInternalPrevTooltip = 'up'
        if(this.pieChartExternalTotal>=this.pieChartExternalPrevTotal)
          this.pieChartExternalPrevTooltip = 'up'
        if(this.pieChartCombinedTotal>=this.pieChartCombinedPrevTotal)
           this.pieChartCombinedPrevTooltip = 'up'

         this.pieChartData1 = this.pieChartDatares1;
         this.pieChartData2 = this.pieChartDatares2;
         this.pieChartData3 = this.pieChartDatares3;
         this.pieChartLabels1 = this.pieChartLabelsres1;
         this.pieChartLabels2 = this.pieChartLabelsres2;
         this.pieChartLabels3 = this.pieChartLabelsres3;

         this.pieChartDataMax1 = Math.max(...this.pieChartData1);
         this.pieChartDataMax2 = Math.max(...this.pieChartData2);
         this.pieChartDataMax3 = Math.max(...this.pieChartData3);
        if(this.user_type == '4' && this.childid != '') {
            this.doughnutChartColors1 = [{backgroundColor: []}];
            this.doughnutChartColors1[0].backgroundColor[this.crKey] = '#1CA49F';
            this.CRcolors= this.doughnutChartColors1;
        }
        else
        this.CRcolors= this.lineChartColors;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  //Referral to Other Clinicians Internal / External
  public clinicianReferralLoader: boolean = false;
  private buildChartReferralDentist() {
      var user_id;
      var clinic_id;
      this.pieChartLabelsres1 = [];
      this.pieChartLabelsres2 = [];
      this.pieChartLabelsres3=[];
      this.pieChartInternalPrevTotal = 0;
      this.pieChartExternalPrevTotal = 0;
      this.pieChartCombinedPrevTotal = 0;
      this.pieChartInternalPrevTooltip = 'down';
      this.pieChartExternalPrevTooltip = 'down';
      this.pieChartCombinedPrevTooltip = 'down';
      this.clinicianReferralLoader = true;
 this.clinic_id && this.clinicianproceeduresService.ClinicianReferralDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
      this.clinicianReferralLoader = false;
      this.pieChartLabelsres1 = [];
      this.pieChartLabelsres2 = [];
      this.pieChartLabelsres3=[];
      this.pieChartInternalTotal = 0;
      this.pieChartExternalTotal = 0;
      this.pieChartCombinedTotal =0;
      this.pieChartDatares1 = [];
      this.pieChartDatares2 = [];
      this.pieChartDatares3 = [];
      this.pieChartLabelsres = [];
      this.pieChartDataMax1 = 0;
      this.pieChartDataMax2 = 0;
      this.pieChartDataMax3 = 0;
       if(data.message == 'success' && data.data.length){
     
        data.data.forEach(res => {
          if(res.total>0) {
              if(res.internal>0) {
                 this.pieChartDatares1.push(res.internal);
                 this.pieChartLabelsres1.push(res.treat_item_name);
               }
               if(res.external>0) {
                 this.pieChartDatares2.push(res.external);
                 this.pieChartLabelsres2.push(res.treat_item_name);

               }
               if(res.total>0) {
                 this.pieChartDatares3.push(res.total);
                 this.pieChartLabelsres3.push(res.treat_item_name);

               }
               this.pieChartInternalTotal = this.pieChartInternalTotal + parseInt(res.internal);
               this.pieChartExternalTotal = this.pieChartExternalTotal + parseInt(res.external);
               this.pieChartCombinedTotal = this.pieChartCombinedTotal + parseInt(res.total);
            }
       });
      this.pieChartInternalPrevTotal = this.pieChartInternalPrevTotal + parseInt(data.total_ta.internal);
      this.pieChartExternalPrevTotal = this.pieChartExternalPrevTotal + parseInt(data.total_ta.external);
      this.pieChartCombinedPrevTotal = this.pieChartCombinedPrevTotal + parseInt(data.total_ta.total);

         if(this.pieChartInternalTotal>=this.pieChartInternalPrevTotal)
          this.pieChartInternalPrevTooltip = 'up'
        if(this.pieChartExternalTotal>=this.pieChartExternalPrevTotal)
          this.pieChartExternalPrevTooltip = 'up'
        if(this.pieChartCombinedTotal>=this.pieChartCombinedPrevTotal)
           this.pieChartCombinedPrevTooltip = 'up'

       this.pieChartData1 = this.pieChartDatares1;
       this.pieChartData2 = this.pieChartDatares2;
       this.pieChartData3 = this.pieChartDatares3;

       this.pieChartLabels1 = this.pieChartLabelsres1;
         this.pieChartLabels2 = this.pieChartLabelsres2;
         this.pieChartLabels3 = this.pieChartLabelsres3;
       this.pieChartDataMax1 = Math.max(...this.pieChartData1);
       this.pieChartDataMax2 = Math.max(...this.pieChartData2);
       this.pieChartDataMax3 = Math.max(...this.pieChartData3);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  this.changePieReferral('Combined');
  }
// Change Referral Chart Tabs
   changePieReferral(chart){
    this.showInternal = false;
    this.showExternal = false;
    this.showCombined = false;
    $('.referral').hide();
    if(!this.toggleChecked){
      if(chart == 'Internal') {
        this.showInternal = true;
      $('.referral1Tool').show();

      }
      else if(chart == 'External') {
        this.showExternal = true;
        $('.referral2Tool').show();
      }
      else if(chart == 'Combined') {
        this.showCombined = true;
        $('.referral3Tool').show();
      }
    }
  else {
      if(chart == 'Internal') {
      this.showInternal = true;
    }
    else if(chart == 'External') {
      this.showExternal = true;
    }
    else if(chart == 'Combined') {
      this.showCombined = true;
    }

    this.mode = chart;
    this.referralTrendSingle();
  }
    if($('.external_dentist').val() != 'all'){
      $('.trend_arrow').hide();
    }
    $(".referall_btn").removeClass('active');
    $("."+chart).addClass('active');
  }

public currentText;

  // Filter By Date
  filterDate(duration) {
    this.showTrend =false;
    this.isDisabled = true;
    this.toggleChecked = false
    this.showCombined =true;
    //$('.ratioPredictorSingle').show();
    //  $('.target_off').click();
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_off').addClass('mat-button-toggle-checked');
     $('.customRange').css('display','none');
     $('.trend_arrow').hide();
     var dentistVal;
     if($('.internal_dentist').val())
        dentistVal = $('.internal_dentist').val();
     else
        dentistVal = $('.external_dentist').val();
    if(dentistVal == '' || this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
      dentistVal = 'all';
    }

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
        this.loadDentist(dentistVal);
    }
    else if (duration == 'm') {
      this.trendText= 'Last Month';
      this.currentText= 'This Month';
      this.duration='m';


      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

      this.loadDentist(dentistVal);
    }
    else if (duration == 'lm') {
      this.duration = 'lm';
      this.trendText = 'Previous Month';
      this.currentText = 'Last Month';

      const date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() - 1, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 0), 'dd-MM-yyyy');
      this.loadDentist(dentistVal);
    }
    else if (duration == 'q') {
      this.trendText= 'Last Quarter';
      this.currentText= 'This Quarter';

      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy');
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
      
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.duration='q';
      this.loadDentist(dentistVal);
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
            this.loadDentist(dentistVal);
   
    }
    else if (duration == 'cytd') {
      this.trendText= 'Last Year';
      this.currentText= 'This Year';

     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.duration='cytd';
      this.loadDentist(dentistVal);
    } else if (duration == 'lcytd') {
        this.trendText = 'Previous Year';
        this.currentText = 'Last Year';

        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() -1, 0, 1), 'dd-MM-yyyy');       
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() -1, 11, 31), 'dd-MM-yyyy');
      this.duration='lcytd';
        this.loadDentist(dentistVal);
      }
     else if (duration == 'fytd') {
      this.trendText= 'Last Financial Year';
      this.currentText= 'This Financial Year';

     var date = new Date();
      if ((date.getMonth() + 1) <= 6) {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear()-1, 6, 1), 'dd-MM-yyyy');
        } else {
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 6, 1), 'dd-MM-yyyy');
    }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.duration='fytd';
      this.loadDentist(dentistVal);
    } else if (duration == 'lfytd') {
        this.trendText = 'Previous Financial Year';
        this.currentText = 'Last Financial Year';
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
       /* this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');*/
        this.duration='lfytd';
        this.loadDentist(dentistVal);
      }
     else if (duration == 'custom') {
      this.duration='custom';
       this.trendText= '';
      this.currentText= '';
      this.duration='custom';
     $('.customRange').css('display','block');
     let selectedDate = this.chartService.customSelectedDate$.value;
     this.startDate = this.datePipe.transform(selectedDate.startDate, 'dd-MM-yyyy');
     this.endDate = this.datePipe.transform(selectedDate.endDate, 'dd-MM-yyyy');
       this.loadDentist(dentistVal);
    }
    $('.filter').removeClass('active');
    $('.filter_'+duration).addClass("active");
      // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
      

  }

  // Get Dentist
    getDentists() {
      this.clinic_id && this.dentistService.currentDentistList.subscribe((res) => {
           if(res.message == 'success'){
              this.dentists= res.data;
              this.dentistCount= res.data.length;
           }
           else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');              
              this._cookieService.put("userid", '');
              this.router.navigateByUrl('/login');
           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }    
        );
  }
  //Load Individual Dentist Item Predictor tab
  changeDentistPredictor(val){
    this.predictorRatioTab = val;
     $('.predictedToolMain').hide();
    $('.predicted'+val+'Tool').show();
    $('.ratioPredictorSingle .predictor_ratio .sa_tab_btn').removeClass('active');
    $('.pr'+val).addClass('active');
    if(val =='1') {
       this.gaugeValuePredicted= this.gaugeValuePredicted1;
       this.predictedDentistTotal = this.gaugeValuePredicted1;
       this.predictedDentistPrevTotal = this.gaugeValuePredictedPrev1;
     }
    else if(val =='2'){
       this.gaugeValuePredicted= this.gaugeValuePredicted2;
       this.predictedDentistTotal = this.gaugeValuePredicted2;
       this.predictedDentistPrevTotal = this.gaugeValuePredictedPrev2;
     }
    else if(val =='3') {
       this.gaugeValuePredicted= this.gaugeValuePredicted3;  
       this.predictedDentistTotal = this.gaugeValuePredicted3;
       this.predictedDentistPrevTotal = this.gaugeValuePredictedPrev3;
     }
     if(this.toggleChecked == true) {
      this.ratio=val;
      this.predictorRatioTrendSingle();
     }
  } 
  ytd_load(val) {
    alert(this.datePipe.transform(val, 'dd-MM-yyyy'));
  }
choosedDate(val) {

    val = (val.chosenLabel);
    var val= val.toString().split(' - ');
      this.startDate = this.datePipe.transform(val[0], 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(val[1], 'dd-MM-yyyy');
      this.filterDate('custom');
      
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
     this.trendText=false;
     this.toggleChangeProcess();

     $('.pieChartDetails').hide();
     $('.revenue_proceedure').hide();
    }
    else if(val == 'historic') {
     this.trendText=false;
      
       this.toggleChecked = true;
       this.trendValue = 'h';
       this.toggleChangeProcess();
       $('.pieChartDetails').hide();
       $('.revenue_proceedure').hide();
    }
    else if(val == 'off') {
         
        //this.changeDentistPredictor('1');
       this.changePieReferral('Combined');
        $('.pieChartDetails').show();
        this.toggleChecked = false;
        $('.filter_m').click();
        $('.trendRatio').hide();
    //    $('.predictorRatioDetails').show();
        $('.revenue_proceedure').show();
        //$('.singleRatio').show();
        $('#mat-radio-3').removeClass('mat-radio-checked');
        $('#mat-radio-2').addClass('mat-radio-checked');
        $('#mat-radio-2').click();
           (<HTMLElement>document.querySelector('.ratioPredictorSingle')).style.display = 'none';
        (<HTMLElement>document.querySelector('.ratioPredictor')).style.display = 'block';
    }
}

//Get Clinics List of all clinics
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
//Load dentist Charts
  initiate_dentist() {
    var val = $('#currentDentist').attr('did');
    //var val = $('.internal_dentist').val();
    if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
      //this.loadDentist(val);
    }else{
      this.loadDentist(val);
    }
  }

  toggleChecked = false;
  trendValue ='';
  isDisabled =true;
  isChecked =true;
  mode='Internal';

toggleChangeProcess(){
  if(this.toggleChecked){
    this.Apirequest =3;
    $('.filter').removeClass('active');
    if(this.procedureAnalysisVisibility == "General"){
      this.predictorTrendSingle();
    }else if(this.procedureAnalysisVisibility == "Specialist"){
      this.predictorSpecialTrendSingle();
    }
    this.mode='Combined';
    this.changePieReferral('Combined');
    (<HTMLElement>document.querySelector('.ratioPredictorSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.ratioPredictor')).style.display = 'none';
    //  this.referralTrendSingle();
    this.predictorRatioTrendSingle();
    //(<HTMLElement>document.querySelector('.itemsPredictorSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.itemsPredictor')).style.display = 'block';
    //(<HTMLElement>document.querySelector('.itemsPredictorSpecialSingle')).style.display = 'none';
    // (<HTMLElement>document.querySelector('.itemsPredictorSpecial')).style.display = 'block';
  }
}
  predictorTrendSingle(){
      var user_id;
      var clinic_id;
      this.stackedChartData1 =[];
      this.stackedChartData2 =[];
      this.stackedChartData3 =[];
      this.stackedChartData4 =[];
      this.stackedChartData5 =[] ;
      this.stackedChartData6 =[] ;
      this.stackedChartData7 =[] ;
      this.stackedChartData8 =[] ;
      this.stackedChartLabels =[] ;      
      this.stackedChartLabels1 = [];
      this.buildChartDentistLoader = true;
      this.stackedChartData = [
      {data: [], label: 'Crowns & Onlays'},
      {data: [], label: 'Splints' },
      {data: [], label: 'Root Canals' },
      {data: [], label: 'Perio Charts' },
      {data: [], label: 'Surgical Extractions' },  
      {data: [], label: 'Stainless Steel Crowns'},  
      {data: [], label: 'Composite Veneers'},  
      {data: [], label: 'Implant Crowns'},
      {data: [], label: 'Whitening'}
    ];
    this.clinic_id && this.clinicianproceeduresService.ItemsPredictorAnalysisTrendDentist(this.selectedDentist, this.clinic_id,this.trendValue).subscribe((data) => {
       this.stackedChartData1 =[];
      this.stackedChartData2 =[];
      this.stackedChartData3 =[];
      this.stackedChartData4 =[];
      this.stackedChartData5 =[];
      this.stackedChartData6 =[];
      this.stackedChartData7 =[];
      this.stackedChartData8 =[];
      this.stackedChartData9 =[];
      this.stackedChartLabels1 = [];
      this.stackedChartDataMax = 0;
      this.buildChartDentistLoader = false;
      this.Apirequest = this.Apirequest -1;
       if(data.message == 'success' && data.data){
         if(data.data.length <=0) {
                }else {
                data.data.forEach(res => {
                   this.stackedChartData1.push(res.crowns);
                   this.stackedChartData2.push(res.splints);
                   this.stackedChartData3.push(res.rct);
                   this.stackedChartData4.push(res.perio);
                   this.stackedChartData5.push(res.extract);
                   this.stackedChartData6.push(res.ss_crowns);
                   this.stackedChartData7.push(res.comp_veneers);
                   this.stackedChartData8.push(res.imp_crowns);
                   this.stackedChartData9.push(res.whitening);
                   if(this.trendValue == 'c')
                   this.stackedChartLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                    else
                   this.stackedChartLabels1.push(res.year);

                 });
               this.stackedChartData[0]['data'] = this.stackedChartData1;
               this.stackedChartData[1]['data'] = this.stackedChartData2;
               this.stackedChartData[2]['data'] = this.stackedChartData3;
               this.stackedChartData[3]['data'] = this.stackedChartData4;
               this.stackedChartData[4]['data'] = this.stackedChartData5;
               this.stackedChartData[5]['data'] = this.stackedChartData6;
               this.stackedChartData[6]['data'] = this.stackedChartData7;
               this.stackedChartData[7]['data'] = this.stackedChartData8;
               this.stackedChartData[8]['data'] = this.stackedChartData9;
               this.stackedChartLabels = this.stackedChartLabels1;
               this.stackedChartDataMax = Math.max(...this.stackedChartData[0]['data'])+Math.max(...this.stackedChartData[1]['data'])+Math.max(...this.stackedChartData[2]['data'])+Math.max(...this.stackedChartData[3]['data'])+Math.max(...this.stackedChartData[4]['data'])+Math.max(...this.stackedChartData[5]['data'])+Math.max(...this.stackedChartData[6]['data'])+Math.max(...this.stackedChartData[7]['data']);
             }
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  public stackedChartDataSpecTrend1:any = [];
  public stackedChartDataSpecTrend2:any = [];
  public stackedChartDataSpecTrend3:any = [];
  public stackedChartDataSpecTrend4:any = [];
  public stackedChartDataSpecTrend5:any = [];
  public stackedChartDataSpecTrend6:any = [];
  public stackedChartDataSpecTrend7:any = [];
  public stackedChartLabelsSpecTrendTemp:any = [];
  public stackedChartLabelsSpecTrend:any = [];
  public stackedChartDataItemSpecialTrend = [
      {data: [], label: 'Implant Surg'},
      {data: [], label: 'Braces' },
      {data: [], label: 'Aligners' },
      {data: [], label: 'MAS' },
      {data: [], label: 'Perio Surg' }, 
      {data: [], label: 'Endo Re-treat' },  
      {data: [], label: 'Veneers (indirect)' } 
        ];
  public stackedChartSpecialDataMax:any = 0;
  public buildChartDentistSpecLoader:boolean = false;    
  predictorSpecialTrendSingle(){
      this.buildChartDentistSpecLoader = true;      

    this.clinic_id && this.clinicianproceeduresService.ItemsPredictorAnalysisSpecialTrendDentist(this.selectedDentist, this.clinic_id,this.trendValue).subscribe((data) => {
      this.stackedChartDataSpecTrend1 = [];
      this.stackedChartDataSpecTrend2 = [];
      this.stackedChartDataSpecTrend3 = [];
      this.stackedChartDataSpecTrend4 = [];
      this.stackedChartDataSpecTrend5 = [];
      this.stackedChartDataSpecTrend6 = [];
      this.stackedChartDataSpecTrend7 = [];
      this.stackedChartLabelsSpecTrend = [];
      this.stackedChartLabelsSpecTrendTemp = [];
      this.buildChartDentistSpecLoader = false;
      this.stackedChartSpecialDataMax = 0;
        this.stackedChartDataItemSpecialTrend = [
        {data: [], label: 'Implant Surg'},
        {data: [], label: 'Braces' },
        {data: [], label: 'Aligners' },
        {data: [], label: 'MAS' },
        {data: [], label: 'Perio Surg' }, 
        {data: [], label: 'Endo Re-treat' },  
        {data: [], label: 'Veneers (indirect)' } 
      ];
      this.Apirequest = this.Apirequest -1;
       if(data.message == 'success' && data.data){
         if(data.data.length <=0) {
                }else {
                data.data.forEach(res => {
                  this.stackedChartDataSpecTrend1.push(res.imp_surg);
                  this.stackedChartDataSpecTrend2.push(res.ortho_fix);
                  this.stackedChartDataSpecTrend3.push(res.ortho_align);
                  this.stackedChartDataSpecTrend4.push(res.sleep);
                  this.stackedChartDataSpecTrend5.push(res.perio_surg);
                  this.stackedChartDataSpecTrend6.push(res.endo_retreat);
                  this.stackedChartDataSpecTrend7.push(res.veneers_ind);
                   if(this.trendValue == 'c')
                   this.stackedChartLabelsSpecTrendTemp.push(this.datePipe.transform(res.year_month, 'MMM y'));
                    else
                   this.stackedChartLabelsSpecTrendTemp.push(res.year);

                 });
               this.stackedChartDataItemSpecialTrend[0]['data'] = this.stackedChartDataSpecTrend1;
               this.stackedChartDataItemSpecialTrend[1]['data'] = this.stackedChartDataSpecTrend2;
               this.stackedChartDataItemSpecialTrend[2]['data'] = this.stackedChartDataSpecTrend3;
               this.stackedChartDataItemSpecialTrend[3]['data'] = this.stackedChartDataSpecTrend4;
               this.stackedChartDataItemSpecialTrend[4]['data'] = this.stackedChartDataSpecTrend5;
               this.stackedChartDataItemSpecialTrend[5]['data'] = this.stackedChartDataSpecTrend6;
               this.stackedChartDataItemSpecialTrend[6]['data'] = this.stackedChartDataSpecTrend7;

               this.stackedChartLabelsSpecTrend = this.stackedChartLabelsSpecTrendTemp;
               this.stackedChartSpecialDataMax = Math.max(...this.stackedChartDataItemSpecialTrend[0]['data'])+Math.max(...this.stackedChartDataItemSpecialTrend[1]['data'])+Math.max(...this.stackedChartDataItemSpecialTrend[2]['data'])+Math.max(...this.stackedChartDataItemSpecialTrend[3]['data'])+Math.max(...this.stackedChartDataItemSpecialTrend[4]['data']);
             }
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }
   public stackedChartTrendData =[];
  public stackedChartTrendData1 =[];
 public stackedChartTrendData2 =[];
      public stackedChartTrendData3 =[];
      public stackedChartTrendData4 =[];
      public stackedChartTrendData5 =[];
      public stackedChartTrendLabels1 = [];
      public stackedChartTrendData6=[];
      public stackedChartTrendData7=[];
      public stackedChartTrendData8=[];
      public stackedChartTrendData9=[];
      public stackedChartTrendData10=[];
      public stackedChartTrendLabels=[];
      public showTrend =false;
      public stackedChartTrendDataMax;
// Load Predcitor chart - Individual Dentist 
  referralTrendSingle(){
      var user_id;
      var clinic_id;
    this.stackedChartTrendData = [
      {data: [], label: 'Oral Surgeon'},
      {data: [], label: 'Orthodontics' },
      {data: [], label: 'Prosthodontics'},
      {data: [], label: 'Endodontics'},
      {data: [], label: 'Paediatrics'},
      {data: [], label: 'Periodontics'},
      {data: [], label: 'Sleep Consult'},
      {data: [], label: 'Implants'}, 
      {data: [], label: 'Oral Medicine'}  
    ];
    
      this.showTrend =true;
      this.clinicianReferralLoader = true;
      // this.showInternal =false;
      // this.showExternal =false;
      // this.showCombined =false;
      this.stackedChartTrendLabels1=[];
      this.stackedChartTrendData1 =[];
      this.stackedChartTrendData2 =[];
      this.stackedChartTrendData3 =[];
      this.stackedChartTrendData4 =[];
      this.stackedChartTrendData5 =[];
      this.stackedChartTrendData6 =[];
      this.stackedChartTrendData7 =[];
      this.stackedChartTrendData8 =[];
      this.stackedChartTrendData9 =[];
   this.clinic_id && this.clinicianproceeduresService.ClinicianReferralTrendDentist(this.selectedDentist, this.clinic_id,this.trendValue).subscribe((data) => {
    this.Apirequest = this.Apirequest -1;
    // this.showInternal =false;
    //   this.showExternal =false;
    //   this.showCombined =false;
      this.clinicianReferralLoader = false;
      this.stackedChartTrendLabels1=[];
      this.stackedChartTrendData1 =[];
      this.stackedChartTrendData2 =[];
      this.stackedChartTrendData3 =[];
      this.stackedChartTrendData4 =[];
      this.stackedChartTrendData5 =[];
      this.stackedChartTrendData6 =[];
      this.stackedChartTrendData7 =[];
      this.stackedChartTrendData8 =[];
      this.stackedChartTrendData9 =[];
    if(this.mode == 'Internal') {
       if(data.message == 'success' && data.data){
         if(data.data.internal.length > 0) {
                data.data.internal.forEach(res => {
                   this.stackedChartTrendData1.push(res.val[0]);
                   this.stackedChartTrendData2.push(res.val[1]);
                   this.stackedChartTrendData3.push(res.val[2]);
                   this.stackedChartTrendData4.push(res.val[3]);
                   this.stackedChartTrendData5.push(res.val[4]);
                   this.stackedChartTrendData6.push(res.val[5]);
                   this.stackedChartTrendData7.push(res.val[6]);
                   this.stackedChartTrendData8.push(res.val[7]);
                   this.stackedChartTrendData9.push(res.val[8] == undefined ? 0 : res.val[8]);
                   if(this.trendValue == 'c')
                   this.stackedChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.stackedChartTrendLabels1.push(res.duration);
                 });
               this.stackedChartTrendData[0]['data'] = this.stackedChartTrendData1;
               this.stackedChartTrendData[1]['data'] = this.stackedChartTrendData2;
               this.stackedChartTrendData[2]['data'] = this.stackedChartTrendData3;
               this.stackedChartTrendData[3]['data'] = this.stackedChartTrendData4;
               this.stackedChartTrendData[4]['data'] = this.stackedChartTrendData5;
               this.stackedChartTrendData[5]['data'] = this.stackedChartTrendData6;
               this.stackedChartTrendData[6]['data'] = this.stackedChartTrendData7;
               this.stackedChartTrendData[7]['data'] = this.stackedChartTrendData8;
               this.stackedChartTrendData[8]['data'] = this.stackedChartTrendData9;
               this.stackedChartTrendLabels = this.stackedChartTrendLabels1;
             }
           }
         }
         else if(this.mode== 'External') {
       if(data.message == 'success'){
         if(data.data.external.length >0) { 
                data.data.external.forEach(res => {
                   this.stackedChartTrendData1.push(res.val[0]);
                   this.stackedChartTrendData2.push(res.val[1]);
                   this.stackedChartTrendData3.push(res.val[2]);
                   this.stackedChartTrendData4.push(res.val[3]);
                   this.stackedChartTrendData5.push(res.val[4]);
                   this.stackedChartTrendData6.push(res.val[5]);
                   this.stackedChartTrendData7.push(res.val[6]);
                   this.stackedChartTrendData8.push(res.val[7]);
                   this.stackedChartTrendData9.push(res.val[8]);
                  if(this.trendValue == 'c')
                   this.stackedChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.stackedChartTrendLabels1.push(res.duration);
                 });
               this.stackedChartTrendData[0]['data'] = this.stackedChartTrendData1;
               this.stackedChartTrendData[1]['data'] = this.stackedChartTrendData2;
               this.stackedChartTrendData[2]['data'] = this.stackedChartTrendData3;
               this.stackedChartTrendData[3]['data'] = this.stackedChartTrendData4;
               this.stackedChartTrendData[4]['data'] = this.stackedChartTrendData5;
               this.stackedChartTrendData[5]['data'] = this.stackedChartTrendData6;
               this.stackedChartTrendData[6]['data'] = this.stackedChartTrendData7;
               this.stackedChartTrendData[7]['data'] = this.stackedChartTrendData8;
               this.stackedChartTrendData[8]['data'] = this.stackedChartTrendData9;
               this.stackedChartTrendLabels = this.stackedChartTrendLabels1;
             }
           }
         }
         else if(this.mode== 'Combined') {
       if(data.message == 'success'){
         if(data.data.combined.length >0) {
                data.data.combined.forEach(res => {
                  if(typeof(res.val) != 'undefined'){
                   this.stackedChartTrendData1.push(res.val[0]);
                   this.stackedChartTrendData2.push(res.val[1]);
                   this.stackedChartTrendData3.push(res.val[2]);
                   this.stackedChartTrendData4.push(res.val[3]);
                   this.stackedChartTrendData5.push(res.val[4]);
                   this.stackedChartTrendData6.push(res.val[5]);
                   this.stackedChartTrendData7.push(res.val[6]);
                   this.stackedChartTrendData8.push(res.val[7]);
                   this.stackedChartTrendData9.push(res.val[8] == undefined ? 0 : res.val[8]);
                   }
                   if(this.trendValue == 'c')
                   this.stackedChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.stackedChartTrendLabels1.push(res.duration);
                 });
               this.stackedChartTrendData[0]['data'] = this.stackedChartTrendData1;
               this.stackedChartTrendData[1]['data'] = this.stackedChartTrendData2;
               this.stackedChartTrendData[2]['data'] = this.stackedChartTrendData3;
               this.stackedChartTrendData[3]['data'] = this.stackedChartTrendData4;
               this.stackedChartTrendData[4]['data'] = this.stackedChartTrendData5;
               this.stackedChartTrendData[5]['data'] = this.stackedChartTrendData6;
               this.stackedChartTrendData[6]['data'] = this.stackedChartTrendData7;
               this.stackedChartTrendData[7]['data'] = this.stackedChartTrendData8;
               this.stackedChartTrendData[8]['data'] = this.stackedChartTrendData9;
               this.stackedChartTrendLabels = this.stackedChartTrendLabels1;
             }
           }
         }
         this.stackedChartTrendDataMax = Math.max(...this.stackedChartTrendData[0]['data'])+Math.max(...this.stackedChartTrendData[1]['data'])+Math.max(...this.stackedChartTrendData[2]['data'])+Math.max(...this.stackedChartTrendData[3]['data'])+Math.max(...this.stackedChartTrendData[4]['data'])+Math.max(...this.stackedChartTrendData[5]['data'])+Math.max(...this.stackedChartTrendData[6]['data'])+Math.max(...this.stackedChartTrendData[7]['data'])+Math.max(...this.stackedChartTrendData[8]['data']);

       
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }
    public predictorRatioLoader: boolean = false;
    public ratioChartData1=[
    {data: [], label: 'Indirect Restorations'},
    {data: [], label: 'Large Direct Restorations' } ];
    public ratioChartData2=[
    {data: [], label: 'Indirect Restorations'},
    {data: [], label: 'Large Direct Restorations' } ];
    public ratioChartData3=[
    {data: [], label: 'Indirect Restorations'},
    {data: [], label: 'Large Direct Restorations' } ];
    public ratioChartLabels;
    public ratioChartLabels1 =[];
    public ratio =1;
    public ratioChartData: any[] = [
    {data: [10,1,5], label: 'Predictor Ratio',  shadowOffsetX: 3,
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
            backgroundOverlayMode: 'multiply'}

    ];

    public ratioChartDataMax;
  predictorRatioTrendSingle(){
  //  $('.singleRatio').hide();
    $('.trendRatio').show();
    //$('.predictorRatioDetails').hide();
      var user_id;
      var clinic_id;
      this.ratioChartData1 = [
    {data: [], label: 'Indirect Restorations'},
    {data: [], label: 'Large Direct Restorations' } ];
      this.ratioChartData2 = [
    {data: [], label: 'RCT'},
    {data: [], label: 'Extractions' } ];
      this.ratioChartData3 =[

    {data: [], label: "RCT's Started" },
    {data: [], label: "RCT's Completed" } ];
      this.predictorRatioLoader = true;
      this.ratioChartLabels1=[];
   this.clinic_id && this.clinicianproceeduresService.CpPredictorRatioTrend(this.selectedDentist, this.clinic_id,this.trendValue).subscribe((data) => {
      this.predictorRatioLoader = false;
      this.ratioChartLabels1=[];
      this.Apirequest = this.Apirequest -1;
       if(data.message == 'success' && data.data){
          if(data.data.length <=0) {
          } else {
            data.data.forEach(res => { 
              if(typeof(res.val) != 'undefined'){
                this.ratioChartData1[0]['data'].push(res.val.crown[0]);
                this.ratioChartData1[1]['data'].push(res.val.crown[1]);
              
              this.ratioChartData2[0]['data'].push(res.val.extraction[0]);
              this.ratioChartData2[1]['data'].push(res.val.extraction[1]);
            
              this.ratioChartData3[0]['data'].push(res.val.completed[0]);
              this.ratioChartData3[1]['data'].push(res.val.completed[1]);
            }
              
              if(this.trendValue == 'c')
                this.ratioChartLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
              else
                this.ratioChartLabels1.push(res.duration);
            });                 
             if(this.ratioChartData1[0]['data'].every((item) => item == 0 )) this.ratioChartData1[0]['data'] = [];
             if(this.ratioChartData1[1]['data'].every((item) => item == 0 )) this.ratioChartData1[1]['data'] = [];
             if(this.ratioChartData2[0]['data'].every((item) => item == 0 )) this.ratioChartData2[0]['data'] = [];
             if(this.ratioChartData2[1]['data'].every((item) => item == 0 )) this.ratioChartData2[1]['data'] = [];
             if(this.ratioChartData3[0]['data'].every((item) => item == 0 )) this.ratioChartData3[0]['data'] = [];
             if(this.ratioChartData3[1]['data'].every((item) => item == 0 )) this.ratioChartData3[1]['data'] = [];

            if(this.ratio ==1)
              this.ratioChartData = this.ratioChartData1;
            else if(this.ratio ==2)
              this.ratioChartData = this.ratioChartData2;
            else if(this.ratio ==3)             
             this.ratioChartData = this.ratioChartData3;
             this.ratioChartLabels = this.ratioChartLabels1;
             this.ratioChartDataMax = Math.max(...this.ratioChartData[0]['data']);
          }
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

    //Function to update the tabs for Procedure Analysis Tabs
    //Added by Hanney Shrma on 22-04-2021
    changeProcedureAnalysis(typeVisible)
    {
      if(typeVisible == "General"){
        if(this.dentistMode && this.showTrend == false){
          this.buildChartDentist();          
        }else if(this.dentistMode == false && this.showTrend == false){
          this.buildChart();
        }else if(this.dentistMode && this.showTrend){
          this.predictorTrendSingle();
        }
        
      }else if(typeVisible == "Specialist"){
        if(this.dentistMode && this.showTrend == false){
          this.procedureAnalysisSpecialDentist();
        }else if(this.dentistMode == false && this.showTrend == false){
          this.predictorAnalysisSpecial();
        }else if(this.dentistMode && this.showTrend){
          this.predictorSpecialTrendSingle();
        }
        
      }
      this.procedureAnalysisVisibility = typeVisible;
      return true;
    } 

    getChartsTips() {
      this.chartstipsService.getCharts(2).subscribe((data) => {
       if(data.message == 'success'){         
        this.charTips = data.data;
       }
    }, error => {});
  }

  setTopValues(){
    if(this.showTopVlaues == false){
      this.showTopVlaues = true;
      this.proceedureChartOptionsDP = this.proceedureChartOptions1;
    } else {
      this.showTopVlaues = false;
      this.proceedureChartOptionsDP = this.proceedureChartOptions;
    }
  }
  showTable(val){
    this.showPaTable = val;
  }

  generatePaGeneralTotal(palData)
  {    
    const Crowns_Onlays = palData.map(item => parseInt(item.Crowns_Onlays)).reduce((prev, curr) => prev + curr, 0);
    const Splints = palData.map(item => parseInt(item.Splints)).reduce((prev, curr) => prev + curr, 0);
    const RCT = palData.map(item => parseInt(item.RCT)).reduce((prev, curr) => prev + curr, 0);
    const Perio = palData.map(item => parseInt(item.Perio)).reduce((prev, curr) => prev + curr, 0);
    const Surg_Ext = palData.map(item => parseInt(item.Surg_Ext)).reduce((prev, curr) => prev + curr, 0);
    const Imp_Crowns = palData.map(item => parseInt(item.Imp_Crowns)).reduce((prev, curr) => prev + curr, 0);
    const SS_Crowns = palData.map(item => parseInt(item.SS_Crowns)).reduce((prev, curr) => prev + curr, 0);
    const Comp_Veneers = palData.map(item => parseInt(item.Comp_Veneers)).reduce((prev, curr) => prev + curr, 0);
    const Whitening = palData.map(item => parseInt(item.Whitening)).reduce((prev, curr) => prev + curr, 0);
    let html ='<td> Total </td>';
        html += '<td>' + Crowns_Onlays + '</td>';
        html += '<td>' + Splints + '</td>';
        html += '<td>' + RCT + '</td>';
        html += '<td>' + Perio + '</td>';
        html += '<td>' + Surg_Ext + '</td>';
        html += '<td>' + Imp_Crowns + '</td>';
        html += '<td>' + SS_Crowns + '</td>';
        html += '<td>' + Comp_Veneers + '</td>';
        html += '<td>' + Whitening + '</td>';
     return this.sanitized.bypassSecurityTrustHtml(html);
  }

  generatePaSpecialTotal(palData)
  {    
    const Implant_Surg = palData.map(item => parseInt(item.Implant_Surg)).reduce((prev, curr) => prev + curr, 0);
    const Braces = palData.map(item => parseInt(item.Braces)).reduce((prev, curr) => prev + curr, 0);
    const Aligners = palData.map(item => parseFloat(item.Aligners)).reduce((prev, curr) => prev + curr, 0);
    const MAS = palData.map(item => parseInt(item.MAS)).reduce((prev, curr) => prev + curr, 0);
    const Perio_Surg = palData.map(item => parseInt(item.Perio_Surg)).reduce((prev, curr) => prev + curr, 0);
    const Endo_Re_treat = palData.map(item => parseInt(item.Endo_Re_treat)).reduce((prev, curr) => prev + curr, 0);
    const Veneers_ind = palData.map(item => parseInt(item.Veneers_ind)).reduce((prev, curr) => prev + curr, 0);
    let html ='<td> Total </td>';
        html += '<td>' + Implant_Surg + '</td>';
        html += '<td>' + Braces + '</td>';
        html += '<td>' + Aligners + '</td>';
        html += '<td>' + MAS + '</td>';
        html += '<td>' + Perio_Surg + '</td>';
        html += '<td>' + Endo_Re_treat + '</td>';
        html += '<td>' + Veneers_ind + '</td>';
     return this.sanitized.bypassSecurityTrustHtml(html);
  }
}

