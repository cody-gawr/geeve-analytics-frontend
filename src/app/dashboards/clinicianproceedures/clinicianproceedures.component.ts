import * as $ from 'jquery';
import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit , ViewChild,ElementRef } from '@angular/core';
import { ClinicianProceeduresService } from './clinicianproceedures.service';
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
import { ToastrService } from 'ngx-toastr';
export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  templateUrl: './clinicianproceedures.component.html'
})
export class ClinicianProceeduresComponent implements AfterViewInit {
    @ViewChild("myCanvas") canvas: ElementRef;
  lineChartColors;
  doughnutChartColors;
  predictedChartColors;
  preoceedureChartColors;
  subtitle: string;
   public clinic_id:any ={};
   public dentistCount:any ={};
    public clinicsData:any[] = [];
    public user_type;
    public childid='';
  public trendText;
  constructor(private toastr: ToastrService,private clinicianproceeduresService: ClinicianProceeduresService, private dentistService: DentistService, private datePipe: DatePipe, private route: ActivatedRoute,  private headerService: HeaderService,private _cookieService: CookieService, private router: Router){
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
    this.getDentists();
     this.filterDate('cytd');
   }
  }
  myDateParser(dateStr : string) : string {
    // 2018-01-01T12:12:12.123456; - converting valid date format like this

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)

    let validDate = date;
    console.log(validDate)
    return validDate
  }
  ngAfterViewInit() {
       this.checkPermission('dashboard2');
 this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
    this.user_type = this._cookieService.get("user_type");
     //   this.getDentists(); 
      this.initiate_clinic();
        
           if( this._cookieService.get("childid")) {
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
        this.getClinics();
        $('.dentist_dropdown').show();
        $('.header_filters').removeClass('flex_direct_mar');
        $('.header_filters').removeClass('hide_header');
        $('#title').html('Clinician Procedures & Referrals ('+this.myDateParser(this.startDate)+'-'+this.myDateParser(this.endDate)+')');        
        $('.external_clinic').show();
        $('.external_dentist').show();
        if(this.childid != ''){
          $('.dentist_dropdown').hide();
          $('.header_filters').addClass('flex_direct_mar'); 
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

this.doughnutChartColors = [{backgroundColor: [gradient7,gradient6,gradient5,gradient4,gradient3,gradient2,gradient1,gradient]}];
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

  }

  public date =new Date();

  dentists: Dentist[] = [
   { providerId: 'all', name: 'All Dentists' },
  ];
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
        },legend: {
            display: true
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
            position:'right'
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
  public lineChartType = 'line';

  public proceedureChartOptions: any = {
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
            ticks: {
                userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return "$"+label;
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
                    return value.substr(0,20)+"....";//truncate
                }
            }, 
            }],
        },
         legend: {
        position: 'top',
      },
      tooltips: {
  enabled: true,
        mode: 'label',
        callbacks: {
            title: function(tooltipItems, data) {
                var idx = tooltipItems[0].index;
                return data.labels[idx];//do something with title
            },
            label: function(tooltipItems, data) {
                //var idx = tooltipItems.index;
                //return data.labels[idx] + ' €';
                return '$'+tooltipItems.xLabel;
            }
        }
},        
  };

  public selectedDentist: string;
  public predicted1: boolean = true;
  public predicted2: boolean = false;
  public predicted3: boolean = false;
  public showInternal: boolean = true;
  public showExternal: boolean = false;
  public showCombined: boolean = false;
  public stackedChartColors: Array<any> = [
    { backgroundColor: '#76F2E5' },
    { backgroundColor: '#6BE6EF' },
    { backgroundColor: '#68D8D6' },
    { backgroundColor: '#3DCCC7' },
    { backgroundColor: '#68FFF9' },
    { backgroundColor: '#07BEB8' }
  ];
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
    {data: [], label: 'Total Revenue of Clinician Per Procedure',  shadowOffsetX: 3,
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
  public pieChartData1: number[] = [];
  public pieChartData2: number[] = [];
  public pieChartData3: number[] = [];
  public pieChartType = 'doughnut';
  public pieChartDatares1: number[] = [];
  public pieChartDatares2: number[] = [];
  public pieChartDatares3: number[] = [];

  public pieChartLabelsres: string[] = [
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
 loadDentist(newValue) {  

  $('.ratioPredictorSingle .predictor_ratio .sa_tab_btn').removeClass('active');
  $('.pr1').addClass('active');
  $('.predictor_ratio_main').find('.sa_tab_btn').removeClass('active');
  $('.prmain1').addClass('active');
  $('#title').html('Clinician Procedures & Referrals  ('+this.myDateParser(this.startDate)+'-'+this.myDateParser(this.endDate)+')');
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
    this.buildChartPredictor();
    this.buildChart();
     (<HTMLElement>document.querySelector('.itemsPredictorSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.itemsPredictor')).style.display = 'block';
    (<HTMLElement>document.querySelector('.ratioPredictorSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.ratioPredictor')).style.display = 'block';    
    if(this.childid == '') {
      this.buildChartProceedure();
      this.buildChartReferral();
      $('.revenueProceedureSingle').hide();
      $('.revenueProceedure').show();
    }else {
        this.selectedDentist =  this.dentistid;
        this.buildChartProceedureDentist();
        this.buildChartReferralDentist();
         $('.revenueProceedureSingle').show();
         $('.revenueProceedure').hide();
    }
   
/*
    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'block';

    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'block';*/
  }
  else {
    $(".onofftoogle").show();
    $(".trend_arrow").hide();
    if(this.toggleChecked ) {
        this.toggleChangeProcess()
      }
      else {
    this.selectedDentist = newValue;
    this.buildChartDentist();
    if(!this.toggleChecked) {
        (<HTMLElement>document.querySelector('.itemsPredictorSingle')).style.display = 'block';
        (<HTMLElement>document.querySelector('.itemsPredictor')).style.display = 'none'; }

        this.buildChartPredictorDentist();
        (<HTMLElement>document.querySelector('.ratioPredictorSingle')).style.display = 'block';
        (<HTMLElement>document.querySelector('.ratioPredictor')).style.display = 'none';
        this.buildChartProceedureDentist();
         $('.revenueProceedureSingle').show();
         $('.revenueProceedure').hide();
        this.buildChartReferralDentist();
      }
/*    this.buildChartTreatmentDentist();
    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'none';
    this.buildChartNopatientsDentist();
    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'none';*/
  }
  }

  public stackedChartDataMax;
  public buildChartLoader:any;
  public ipKey;
  public IPcolors;
  public barChartColors;
  //Items Predictor Analysis 
  private buildChart() {
    this.buildChartLoader =true;
    var user_id;
    var clinic_id;
       this.stackedChartData = [
    {data: [], label: 'Crowns'},
    {data: [], label: 'Splints ' },
    {data: [], label: 'Root Canals' },
    {data: [], label: 'Perio Charts' },
    {data: [], label: 'Surgical Extractions' }  ];


  this.clinicianproceeduresService.ItemsPredictorAnalysis(this.clinic_id,this.startDate,this.endDate,this.user_type,this.childid).subscribe((data) => {
   
       if(data.message == 'success'){
        this.buildChartLoader =false;
          this.stackedChartData1 = [];
          this.stackedChartData2 = [];
          this.stackedChartData3 = [];
          this.stackedChartData4 = [];
          this.stackedChartData5 = [];
          this.stackedChartLabels1 =[];
          this.stackedChartLabels =[];
        if(data.data.length <=0) {

        }else {
          var i=0
        data.data.forEach(res => {
          if(res.provider != null){

          
             this.stackedChartData1.push(res.crowns);
             this.stackedChartData2.push(res.splints);
             this.stackedChartData3.push(res.root_canals);
             this.stackedChartData4.push(res.perio);
             this.stackedChartData5.push(res.surgical_extractions);
             this.stackedChartLabels1.push(res.provider);
             if(res.provider != 'Anonymous')
              this.ipKey =i;
             i++;
           }
       //    this.productionTotal = this.productionTotal + parseInt(res.total);
         });
       this.stackedChartData[0]['data'] = this.stackedChartData1;
       this.stackedChartData[1]['data'] = this.stackedChartData2;
       this.stackedChartData[2]['data'] = this.stackedChartData3;
       this.stackedChartData[3]['data'] = this.stackedChartData4;
       this.stackedChartData[4]['data'] = this.stackedChartData5;
       this.stackedChartLabels = this.stackedChartLabels1;
       console.log(this.stackedChartData);
         if(this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
            { backgroundColor: ['#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7','#B3B6B7'] },
            { backgroundColor: ['#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7','#A3A6A7'] },
            { backgroundColor: ['#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7','#D5D7D7'] },
            { backgroundColor: ['#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD','#B9BCBD'] },
            { backgroundColor: ['#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE','#DCDDDE'] }
          ];
        this.barChartColors[0].backgroundColor[this.ipKey] = '#1CA49F';
        this.barChartColors[1].backgroundColor[this.ipKey] = '#1fd6b1';
        this.barChartColors[2].backgroundColor[this.ipKey] = '#09b391';
        this.barChartColors[3].backgroundColor[this.ipKey] = '#82EDD8';
        this.barChartColors[4].backgroundColor[this.ipKey] = 'rgba(22, 82, 141, 1)';
        

        this.IPcolors= this.barChartColors;
      }
      else
        this.IPcolors= this.stackedChartColors;
      
       this.stackedChartDataMax = Math.max(...this.stackedChartData[0]['data'])+Math.max(...this.stackedChartData[1]['data'])+Math.max(...this.stackedChartData[2]['data'])+Math.max(...this.stackedChartData[3]['data'])+Math.max(...this.stackedChartData[4]['data']);
       //this.productionTotalAverage = this.productionTotal/this.barChartData1.length;
     }
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public itemPredictedChartDataMax;
  public buildChartDentistLoader:any;
  //Items Predictor Analysis Single
  private buildChartDentist() {
    this.buildChartDentistLoader = true;
    var user_id;
    var clinic_id;
  this.clinicianproceeduresService.ItemsPredictorAnalysisDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
        this.buildChartDentistLoader = false;
          this.itemPredictedChartData1 = [];
          this.itemPredictedChartData1.push(data.data[0].crowns);
          this.itemPredictedChartData1.push(data.data[0].splints);
          this.itemPredictedChartData1.push(data.data[0].root_canals);
          this.itemPredictedChartData1.push(data.data[0].perio);
          this.itemPredictedChartData1.push(data.data[0].surgical_extractions);
          this.itemPredictedChartData[0]['data'] = this.itemPredictedChartData1;
          this.itemPredictedChartData[0]['label'] = data.data[0].provider;
          this.itemPredictedChartLabels= ['Crowns','Splints','Root Canals','Perio','Surgical Extractions'];
          this.itemPredictedChartDataMax = Math.max(...this.itemPredictedChartData[0]['data'])
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

public predictedChartD:any[] =[];
public predictedChartL:any[] =[];
public predictedT=[];
public predictedTotal0;
public predictedTotal;
public predictedTP=[];
public predictedMax;
public buildChartPredictorLoader:any;
public prKey:any[] =[];
public PRcolors;
//Predictor Ratio :
  private buildChartPredictor() {

     if(this.duration){
      this.buildChartPredictorLoader = true;
       var user_id;
    var clinic_id;
  this.clinicianproceeduresService.PredictorRatio(this.clinic_id,this.startDate,this.endDate,this.duration,this.user_type,this.childid).subscribe((data) => {

       
        this.buildChartPredictorLoader = false;
        this.predictedChartData1 =[];
        this.predictedChartData2 =[];
        this.predictedChartData3 =[];
        this.predictedChartLabels1=[];
        this.predictedChartLabels = [];
        this.predictedChartData[0]['data'] = [];
        this.predictedChartD[0] = [];
        this.predictedChartD[1]= [];
        this.predictedChartD[2] = [];
        this.predictedT[0] = 0;
        this.predictedT[1]= 0;
        this.predictedT[2] = 0;

        this.predictedChartL[0] = [];
        this.predictedChartL[1]= [];
        this.predictedChartL[2] = [];
        this.predictedTotal0 = 0;
        this.predictedTotal1 = 0;
        this.predictedTotal2 =0;
        this.predictedPreviousTotal1 =0;
        this.predictedPreviousTotal2 =0;
        this.predictedPreviousTotal3 =0;
        this.predictedChartLabels1 =[];
        this.predictedPreviousAverage1=0;
        this.predictedPreviousAverage2=0;
        this.predictedPreviousAverage3=0;
        this.predictedTP[0] = 0;
        this.predictedTP[1]= 0;
        this.predictedTP[2] = 0;
        this.predictedMax = 0;
        var i=0;
      if(data.message == 'success'){
        data.data.forEach((res,key) => {
          var i=0;
             res.forEach((result) => {
              if(result.provider != null){
                this.predictedChartD[key].push(result.ratio);
                this.predictedChartL[key].push(result.provider);
                this.predictedT[key] = this.predictedT[key] + parseInt(result.ratio);
                this.predictedTP[key] = this.predictedTP[key] + parseInt(result.ratio_ta);
                if(result.provider != 'Anonymous')
                  this.prKey[key] =i;
                i++;
              }
             });
        });
         this.predictedTotalAverage1 = this.predictedT[0]/this.predictedChartD[0].length;
         this.predictedTotalAverage2 = this.predictedT[1]/this.predictedChartD[1].length;
         this.predictedTotalAverage3 = this.predictedT[2]/this.predictedChartD[2].length;
          this.predictedPreviousAverage1 = this.predictedTP[0]/this.predictedChartD[0].length;
         this.predictedPreviousAverage2 = this.predictedTP[1]/this.predictedChartD[1].length;
         this.predictedPreviousAverage3 = this.predictedTP[2]/this.predictedChartD[2].length;
         this.predictedChartData[0]['data'] = this.predictedChartD[0];
         this.predictedChartLabels = this.predictedChartL[0];
         this.predictedTotal =this.predictedT[0];
         if(this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
                { backgroundColor: [] }
              ];
            this.barChartColors[0].backgroundColor[this.prKey[0]] = '#1CA49F';
            this.PRcolors= this.barChartColors;
          }
          else
            this.PRcolors= this.predictedChartColors;

          if(this.predictedTotalAverage1>=this.predictedPreviousAverage1)
            this.predictedTotalAverageTooltip1 = 'up'
          if(this.predictedTotalAverage2>=this.predictedPreviousAverage2)
            this.predictedTotalAverageTooltip2 = 'up'
          if(this.predictedTotalAverage3>=this.predictedPreviousAverage3)
            this.predictedTotalAverageTooltip3 = 'up'
            this.predictedMax = Math.max(...this.predictedChartData[0]['data']);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
}
  }

  changeDentistPredictorMain(val) {
    $('.predictor_ratio_main .sa_tab_btn').removeClass('active');
    $('.prmain'+val).addClass('active');
    $('.predicted_main').hide();
    $('.predictedToolMain').hide();
    $('.predicted'+val+'Tool').show();
    $('.predicted_main.predicted'+val).css('display','flex');
    if(this.user_type == '4' && this.childid != '') {
          this.barChartColors = [
                { backgroundColor: [] }
              ];
            this.barChartColors[0].backgroundColor[this.prKey[val-1]] = '#1CA49F';
            this.PRcolors= this.barChartColors;
          }
          else
            this.PRcolors= this.predictedChartColors;
    if(val =='1') {
       this.predictedChartData[0]['data'] = this.predictedChartD[0];
         this.predictedChartLabels = this.predictedChartL[0];

     }
    else if(val =='2'){
     this.predictedChartData[0]['data'] = this.predictedChartD[1];
         this.predictedChartLabels = this.predictedChartL[1];

     }
    else if(val =='3') {
    this.predictedChartData[0]['data'] = this.predictedChartD[2];
         this.predictedChartLabels = this.predictedChartL[2];
     }
      this.predictedMax = Math.max(...this.predictedChartData[0]['data']);

  } 
public gaugeValuePredictedPrev1;
public gaugeValuePredictedPrev2;
public gaugeValuePredictedPrev3;
public buildChartPredictorDentistLoader:any;
  //Predictor Ratio :
  private buildChartPredictorDentist() {
    this.buildChartPredictorDentistLoader =true;
       var user_id;
    var clinic_id;
  this.clinicianproceeduresService.PredictorRatioDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate, this.duration).subscribe((data) => {
       if(data.message == 'success'){
        console.log(data);
          this.buildChartPredictorDentistLoader =false;
          if(data.data.ratio1[0]) {
           this.gaugeValuePredicted1 = data.data.ratio1[0].ratio;
           this.gaugeValuePredictedPrev1 = data.data.ratio1[0].ratio_ta;
           this.gaugeLabelPredicted = data.data.ratio1[0].provider;
         }
          if(data.data.ratio2[0]) {
           this.gaugeValuePredicted2 = data.data.ratio2[0].ratio;
           this.gaugeValuePredictedPrev2 = data.data.ratio2[0].ratio_ta;
         }
         if(data.data.ratio3[0]) {
           this.gaugeValuePredicted3 = data.data.ratio3[0].ratio;
           this.gaugeValuePredictedPrev3 = data.data.ratio3[0].ratio_ta;
         }

           this.predictedDentistTotal = this.gaugeValuePredicted1;
           this.predictedDentistPrevTotal = this.gaugeValuePredictedPrev1;

           this.gaugeValuePredicted= this.gaugeValuePredicted1;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

//Total Revenue of Clinician Per Procedure

public buildChartProceedureLoader:any;

  private buildChartProceedure() {
    this.buildChartProceedureLoader =true;
        var user_id;
    var clinic_id;
          
  this.clinicianproceeduresService.ClinicianProceedure( this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
    this.proceedureChartData1 =[];
           this.proceedureChartLabels1 = [];
       if(data.message == 'success'){
        this.buildChartProceedureLoader =false;
        data.data.forEach(res => {
           this.proceedureChartData1.push(Math.floor(res.total));
           this.proceedureChartLabels1.push(res.treat_item);
       //    this.productionTotal = this.productionTotal + parseInt(res.total);
        });
       this.proceedureChartData[0]['data'] = this.proceedureChartData1;
       this.proceedureChartLabels = this.proceedureChartLabels1;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


//Total Revenue of Clinician Per Procedure
public buildChartProceedureDentistLoader:any;

  private buildChartProceedureDentist() {
    this.buildChartProceedureDentistLoader =true;
        var user_id;
    var clinic_id;
    
  this.clinicianproceeduresService.ClinicianProceedureDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
        this.buildChartProceedureDentistLoader =false;
        this.proceedureChartData1 = [];
           this.proceedureChartLabels1 = [];
        data.data.forEach(res => {
           this.proceedureChartData1.push(Math.floor(res.total));
           this.proceedureChartLabels1.push(res.treat_item);
        });
       this.proceedureDentistChartData[0]['data'] = this.proceedureChartData1;
       this.proceedureDentistChartLabels = this.proceedureChartLabels1;
       console.log(this.proceedureDentistChartLabels);

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
    this.clinicianproceeduresService.ClinicianReferral(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
        this.pieChartInternalTotal = 0;
        this.pieChartExternalTotal = 0;
        this.pieChartCombinedTotal =0;
        this.pieChartInternalTotal = 0;
        this.pieChartExternalTotal =0;
        this.pieChartCombinedTotal = 0;

        this.pieChartInternalPrevTotal = 0;
        this.pieChartExternalPrevTotal = 0;
        this.pieChartCombinedPrevTotal = 0;
        this.pieChartInternalPrevTooltip = 'down';
        this.pieChartExternalPrevTooltip = 'down';
        this.pieChartCombinedPrevTooltip = 'down';
       if(data.message == 'success'){
           this.pieChartDatares1 = [];
           this.pieChartDatares2 = [];
           this.pieChartDatares3 = [];
           this.pieChartLabelsres = [];
           var i=0;
        data.data.forEach(res => {
           this.pieChartDatares1.push(res.i_count);
           this.pieChartDatares2.push(res.e_count);
           this.pieChartDatares3.push(res.total);
           this.pieChartLabelsres.push(res.label);
           this.pieChartInternalTotal = this.pieChartInternalTotal + parseInt(res.i_count);
           this.pieChartExternalTotal = this.pieChartExternalTotal + parseInt(res.e_count);
           this.pieChartCombinedTotal = this.pieChartCombinedTotal + parseInt(res.total);

           this.pieChartInternalPrevTotal = this.pieChartInternalPrevTotal + parseInt(res.i_count_ta);
           this.pieChartExternalPrevTotal = this.pieChartExternalPrevTotal + parseInt(res.e_count_ta);
           this.pieChartCombinedPrevTotal = this.pieChartCombinedPrevTotal + parseInt(res.total_ta);
           if(res.label != 'Anonymous')
            this.crKey= i;
            i++;
          });
        if(this.pieChartInternalTotal>=this.pieChartInternalPrevTotal)
          this.pieChartInternalPrevTooltip = 'up'
        if(this.pieChartExternalTotal>=this.pieChartExternalPrevTotal)
          this.pieChartExternalPrevTooltip = 'up'
        if(this.pieChartCombinedTotal>=this.pieChartCombinedPrevTotal)
           this.pieChartCombinedPrevTooltip = 'up'
         this.pieChartData1 = this.pieChartDatares1;
         this.pieChartData2 = this.pieChartDatares2;
         this.pieChartData3 = this.pieChartDatares3;
         this.pieChartLabels = this.pieChartLabelsres;
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
  private buildChartReferralDentist() {
        var user_id;
    var clinic_id;
    this.pieChartDataMax1=0;
this.pieChartDataMax2=0;
this.pieChartDataMax3=0;

  this.clinicianproceeduresService.ClinicianReferralDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
           this.pieChartInternalTotal = 0;
           this.pieChartExternalTotal = 0;
           this.pieChartCombinedTotal =0;
           this.pieChartDatares1 = [];
           this.pieChartDatares2 = [];
           this.pieChartDatares3 = [];
           this.pieChartLabelsres = [];
        data.data.forEach(res => {
           this.pieChartDatares1.push(res.i_count);
           this.pieChartDatares2.push(res.e_count);
           this.pieChartDatares3.push(res.total);
           this.pieChartLabelsres.push(res.label);
           this.pieChartInternalTotal = this.pieChartInternalTotal + parseInt(res.i_count);
           this.pieChartExternalTotal = this.pieChartExternalTotal + parseInt(res.e_count);
           this.pieChartCombinedTotal = this.pieChartCombinedTotal + parseInt(res.total);
 });

       this.pieChartData1 = this.pieChartDatares1;
       this.pieChartData2 = this.pieChartDatares2;
       this.pieChartData3 = this.pieChartDatares3;

       this.pieChartLabels = this.pieChartLabelsres;
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

   changePieReferral(chart){
    this.showInternal =false;
    this.showExternal = false;
    this.showCombined = false;
    
    $('.referral').hide();
    if(!this.toggleChecked){
    if(chart == 'Internal') {
      this.showInternal = true;
    $('.referral1Tool').show();

    }
    else if(chart == 'External') {
      this. showExternal =true;
      $('.referral2Tool').show();
    }
    else if(chart == 'Combined') {
      this.showCombined = true;
      $('.referral3Tool').show();
    }
  }
  else {
    this.mode=chart;
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
    $('.ratioPredictorSingle').show();
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
      
    if(duration == 'w') {
      this.trendText= 'Last Week';
      this.currentText= 'This Week';

      const now = new Date();
       var first = now.getDate() - now.getDay();
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


      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'dd-MM-yyyy');
            this.loadDentist(dentistVal);
   this.duration='m';
    }
    else if (duration == 'q') {
      this.trendText= 'Last Quarter';
      this.currentText= 'This Quarter';

      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy');
      }
      else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'dd-MM-yyyy'); }
      else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'dd-MM-yyyy'); }
      else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 12, 0), 'dd-MM-yyyy');  }
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
    }
     else if (duration == 'fytd') {
      this.trendText= 'Last Financial Year';
      this.currentText= 'This Financial Year';

     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 3, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.duration='fytd';
      this.loadDentist(dentistVal);
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

  // Get Dentist
    getDentists() {
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
  changeDentistPredictor(val){
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
     this.toggleChangeProcess();
     $('.pieChartDetails').hide();
     $('.revenue_proceedure').hide();
    }
    else if(val == 'historic') {
       this.toggleChecked = true;
       this.trendValue = 'h';
       this.toggleChangeProcess();
       $('.pieChartDetails').hide();
       $('.revenue_proceedure').hide();
    }
    else if(val == 'off') {
        this.changeDentistPredictor('1');
       this.changePieReferral('Combined');
        $('.pieChartDetails').show();
        this.toggleChecked = false;
        $('.filter_cytd').click();
        $('.trendRatio').hide();
    //    $('.predictorRatioDetails').show();
        $('.revenue_proceedure').show();
        //$('.singleRatio').show();
        $('#mat-radio-3').removeClass('mat-radio-checked');
        $('#mat-radio-2').addClass('mat-radio-checked');
        $('#mat-radio-2').click();
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

  // toggleChanged(){
  //   if(this.toggleChecked == true) {
  //       this.isDisabled = false;
  //       this.trendValue = 'c';
  //       this.isChecked = true;
  //      this.toggleChangeProcess();
  //      $('.pieChartDetails').hide();
  //      $('.revenue_proceedure').hide();
  //   }
  //   else if(this.toggleChecked == false) {
  //       this.isDisabled = true;
  //       this.changePieReferral('Combined');
  //       this.showTrend =false;
  //       $('.pieChartDetails').show();
  //       this.filterDate('cytd');
  //       this.isChecked = true;
  //       this.changeDentistPredictor('1');
  //       $('.trendRatio').hide();
  //       $('.predictorRatioDetails').show();
  //       $('.singleRatio').show();
  //       $('.revenue_proceedure').show();
  //       $('#mat-radio-3').removeClass('mat-radio-checked');
  //       $('#mat-radio-2').addClass('mat-radio-checked');
  //       $('#mat-radio-2').click();
  //   }
  // }
  // onChange(mrChange) {
  //  this.trendValue = mrChange.value;
  //    this.toggleChangeProcess();
  // } 

toggleChangeProcess(){
    if(this.toggleChecked){
    $('.filter').removeClass('active');
    this.predictorTrendSingle();
    this.mode='Internal';
    this.referralTrendSingle();
    this.predictorRatioTrendSingle();
    (<HTMLElement>document.querySelector('.itemsPredictorSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.itemsPredictor')).style.display = 'block';
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
      this.stackedChartLabels1 = [];
  this.clinicianproceeduresService.ItemsPredictorAnalysisTrendDentist(this.selectedDentist, this.clinic_id,this.trendValue).subscribe((data) => {
       this.stackedChartData1 =[];
      this.stackedChartData2 =[];
      this.stackedChartData3 =[];
      this.stackedChartData4 =[];
      this.stackedChartData5 =[] ;
      this.stackedChartLabels1 = [];
       if(data.message == 'success'){
         if(data.data.length <=0) {
                }else {
                data.data.forEach(res => {
                   this.stackedChartData1.push(res.val.crowns);
                   this.stackedChartData2.push(res.val.splints);
                   this.stackedChartData3.push(res.val.root_canals);
                   this.stackedChartData4.push(res.val.perio);
                   this.stackedChartData5.push(res.val.surgical_extractions);
                   if(this.trendValue == 'c')
                   this.stackedChartLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.stackedChartLabels1.push(res.duration);

                 });
               this.stackedChartData[0]['data'] = this.stackedChartData1;
               this.stackedChartData[1]['data'] = this.stackedChartData2;
               this.stackedChartData[2]['data'] = this.stackedChartData3;
               this.stackedChartData[3]['data'] = this.stackedChartData4;
               this.stackedChartData[4]['data'] = this.stackedChartData5;
               this.stackedChartLabels = this.stackedChartLabels1;
               this.stackedChartDataMax = Math.max(...this.stackedChartData[0]['data'])+Math.max(...this.stackedChartData[1]['data'])+Math.max(...this.stackedChartData[2]['data'])+Math.max(...this.stackedChartData[3]['data'])+Math.max(...this.stackedChartData[4]['data']);
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

  referralTrendSingle(){
      var user_id;
      var clinic_id;
    this.stackedChartTrendData = [
    {data: [], label: 'Oral Surgeon'},
    {data: [], label: 'Orthodontics' },
    {data: [], label: 'Prosthodontics' },
    {data: [], label: 'Endodontics' },
    {data: [], label: 'Paediatrics' },
    {data: [], label: 'Periodontics'},
    {data: [], label: 'Sleep Consult' },
    {data: [], label: 'Implants' }  ];
    
      this.showTrend =true;
      this.showInternal =false;
      this.showExternal =false;
      this.showCombined =false;
      this.stackedChartTrendLabels1=[];
      this.stackedChartTrendData1 =[];
      this.stackedChartTrendData2 =[];
      this.stackedChartTrendData3 =[];
      this.stackedChartTrendData4 =[];
      this.stackedChartTrendData5 =[];
      this.stackedChartTrendData6 =[];
      this.stackedChartTrendData7 =[];
      this.stackedChartTrendData8 =[];
  this.clinicianproceeduresService.ClinicianReferralTrendDentist(this.selectedDentist, this.clinic_id,this.trendValue).subscribe((data) => {
    this.showInternal =false;
      this.showExternal =false;
      this.showCombined =false;
      this.stackedChartTrendLabels1=[];
      this.stackedChartTrendData1 =[];
      this.stackedChartTrendData2 =[];
      this.stackedChartTrendData3 =[];
      this.stackedChartTrendData4 =[];
      this.stackedChartTrendData5 =[];
      this.stackedChartTrendData6 =[];
      this.stackedChartTrendData7 =[];
      this.stackedChartTrendData8 =[];
    if(this.mode== 'Internal') {
       if(data.message == 'success'){
         if(data.data.internal.length >0) {
                data.data.internal.forEach(res => {
                   this.stackedChartTrendData1.push(res.val[0].treat_item_count);
                   this.stackedChartTrendData2.push(res.val[1].treat_item_count);
                   this.stackedChartTrendData3.push(res.val[2].treat_item_count);
                   this.stackedChartTrendData4.push(res.val[3].treat_item_count);
                   this.stackedChartTrendData5.push(res.val[4].treat_item_count);
                   this.stackedChartTrendData6.push(res.val[5].treat_item_count);
                   this.stackedChartTrendData7.push(res.val[6].treat_item_count);
                   this.stackedChartTrendData8.push(res.val[7].treat_item_count);
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
               this.stackedChartTrendLabels = this.stackedChartTrendLabels1;
             }
           }
         }
         else if(this.mode== 'External') {
       if(data.message == 'success'){
         if(data.data.external.length >0) {
                data.data.external.forEach(res => {
                   this.stackedChartTrendData1.push(res.val[0].treat_item_count);
                   this.stackedChartTrendData2.push(res.val[1].treat_item_count);
                   this.stackedChartTrendData3.push(res.val[2].treat_item_count);
                   this.stackedChartTrendData4.push(res.val[3].treat_item_count);
                   this.stackedChartTrendData5.push(res.val[4].treat_item_count);
                   this.stackedChartTrendData6.push(res.val[5].treat_item_count);
                   this.stackedChartTrendData7.push(res.val[6].treat_item_count);
                   this.stackedChartTrendData8.push(res.val[7].treat_item_count);
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
               this.stackedChartTrendLabels = this.stackedChartTrendLabels1;
             }
           }
         }
         else if(this.mode== 'Combined') {
       if(data.message == 'success'){
         if(data.data.combined.length >0) {
                data.data.combined.forEach(res => {
                   this.stackedChartTrendData1.push(res.val[0].total);
                   this.stackedChartTrendData2.push(res.val[1].total);
                   this.stackedChartTrendData3.push(res.val[2].total);
                   this.stackedChartTrendData4.push(res.val[3].total);
                   this.stackedChartTrendData5.push(res.val[4].total);
                   this.stackedChartTrendData6.push(res.val[5].total);
                   this.stackedChartTrendData7.push(res.val[6].total);
                   this.stackedChartTrendData8.push(res.val[7].total);
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
               this.stackedChartTrendLabels = this.stackedChartTrendLabels1;
             }
           }
         }
         this.stackedChartTrendDataMax = Math.max(...this.stackedChartTrendData[0]['data'])+Math.max(...this.stackedChartTrendData[1]['data'])+Math.max(...this.stackedChartTrendData[2]['data'])+Math.max(...this.stackedChartTrendData[3]['data'])+Math.max(...this.stackedChartTrendData[4]['data'])+Math.max(...this.stackedChartTrendData[5]['data'])+Math.max(...this.stackedChartTrendData[6]['data'])+Math.max(...this.stackedChartTrendData[7]['data']);

         console.log(this.stackedChartTrendDataMax,'*****');
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }
    public ratioChartData1;
    public ratioChartData2;
    public ratioChartData3;
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
      this.ratioChartData1 =[];
      this.ratioChartData2 =[];
      this.ratioChartData3 =[];
      this.ratioChartLabels1=[];
  this.clinicianproceeduresService.CpPredictorRatioTrend(this.selectedDentist, this.clinic_id,this.trendValue).subscribe((data) => {
         this.ratioChartData1 =[];
      this.ratioChartData2 =[];
      this.ratioChartData3 =[];
      this.ratioChartLabels1=[];
       if(data.message == 'success'){
         if(data.data.length <=0) {
                }else {
                data.data.forEach(res => {
                   this.ratioChartData1.push(res.val.ratio1);
                   this.ratioChartData2.push(res.val.ratio2);
                   this.ratioChartData3.push(res.val.ratio3);
                   if(this.trendValue == 'c')
                   this.ratioChartLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.ratioChartLabels1.push(res.duration);
                 });
                if(this.ratio ==1)
               this.ratioChartData[0]['data'] = this.ratioChartData1;
               else if(this.ratio ==2)
               this.ratioChartData[0]['data'] = this.ratioChartData2;
               else if(this.ratio ==3)             
               this.ratioChartData[0]['data'] = this.ratioChartData3;
               this.ratioChartLabels = this.ratioChartLabels1;
               this.ratioChartDataMax = Math.max(...this.ratioChartData[0]['data']);
             }
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  }
