import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit, Pipe, PipeTransform, ViewChild, ElementRef  } from '@angular/core';
import { HealthScreenService } from './healthscreen.service';
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
import { OwlOptions } from 'ngx-owl-carousel-o';
export interface Dentist {
  providerId: string;
  name: string;
}
declare var Chart: any; 
@Component({
  templateUrl: './healthscreen.component.html'
})
export class HealthScreenComponent implements AfterViewInit {
   @ViewChild("myCanvas") canvas: ElementRef;

customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };
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
  public canvasWidth = 300
  public needleValue = 65
  public centralLabel = ''
  public name = 'Gauge chart'
  public bottomLabel = '65';
  public childid;
  public user_type;
  public options = {
      hasNeedle: false,
      arcColors: ['rgba(0, 164, 137,0.8)','rgba(0, 164, 137,0.8)','rgba(0, 164, 137,0.8)'],
      thick: 15,
      foregroundColor: "#ff7586",   
      backgroundColor: "#e2e2e2",
      size: 251,
      cap: 'round',

    
  }
  public optionsunscheduled = {
      hasNeedle: false,
      arcColors: ['rgba(80,167,232)','rgba(0, 164, 137,0.7)','rgba(0, 164, 137,0.7)'],

  }
  public selectedDentist;
  public dentists;
  public filter_val ='c';
  constructor(private healthscreenService: HealthScreenService, private dentistService: DentistService, private datePipe: DatePipe, private route: ActivatedRoute,  private headerService: HeaderService,private _cookieService: CookieService, private router: Router){   
  }
  private warningMessage: string;
  ngAfterViewInit() {  
      this.initiate_clinic();

      
 //   $('.external_dentist').val('all');
    $('#title').html('Health Check Screen');
       $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').removeClass('hide_header');
        $('.header_filters').addClass('flex_direct_mar');
         if($('body').find('span#currentClinic').length > 0){
             var cid= $('body').find('span#currentClinic').attr('cid');
             $('.external_clinic').val(cid);
          }
          else {
             $('.external_clinic').val('all');
          }
          this.clinic_id = cid;
           this.user_type = this._cookieService.get("user_type");
      if( this._cookieService.get("childid"))
         this.childid = this._cookieService.get("childid");
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
       // this.loadHealthScreen();
    
  }
  initiate_clinic() {
    var val = $('#currentClinic').attr('cid');    
    if(val != undefined) {
    this.clinic_id = val;
    this.loadHealthScreen();
  }
  }
  public loadHealthScreen() {
       var date = new Date();
     this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth()-1, 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'yyyy-MM-dd');
         this.healthCheckStats();
        this.hourlyRateChart();
        this.mkNewPatientsByReferral();
  }
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
  public  gaugeType = "arch";
  public  gaugeValue = '';
  public  gaugeLabel = "";
  public  gaugeThick = "20";
  public  foregroundColor= "rgba(0, 150, 136,0.7)";
  public  cap= "round";
  public  size = "300";

  public  gaugeValueTreatment = 0;
  public  gaugeLabelTreatment = "";

  public  gaugeValuePatients = 0;
  public  gaugeLabelPatients = "";

  public productionTooltip='down';
  public productionTotalPrev;
  public production_c;
  public profit_c;
  public visits_c;
  public production_p;
  public profit_p;
  public visits_p;
  public visits_f;
  public utilisation_rate_f;
  public unscheduled_production_f;
  public profit_g;
  public visits_g;
  public production_g;
  public utilisation_rate_f_g;
  public production_dif;
  public profit_dif;
  public visits_dif;
  //Dentist Production Chart
  private healthCheckStats() {  
  $('.ajax-loader').show();

    this.healthscreenService.healthCheckStats(this.clinic_id).subscribe((data) => {
  $('.ajax-loader').hide();

       if(data.message == 'success'){
          this.production_c = data.data.production_c;
          this.profit_c = data.data.profit_c;
          this.visits_c = data.data.visits_c;
          this.production_p = data.data.production_p;
          this.profit_p = data.data.profit_p;
          this.visits_p = data.data.visits_p;
          this.visits_f = data.data.visits_f;
          this.utilisation_rate_f = Math.round(data.data.utilisation_rate_f);
          this.unscheduled_production_f = data.data.unscheduled_production_f;

          this.profit_g = data.data.profit_g;          
          this.visits_g = data.data.visits_g;          
          this.production_g = data.data.production_g;          
          this.utilisation_rate_f_g = data.data.utilisation_rate_f_g;          
         // this.options_profit.arcDelimiters[1] = this.profit_g;
          // this.options_profit.arcDelimiters[0] =Math.floor(this.profit_g/2);
          // this.options_visits.arcDelimiters[1] = this.visits_g;
          // this.options_visits.arcDelimiters[0] = Math.floor(this.visits_g/2);
         // this.options_production.arcDelimiters[1] = this.production_g;
         // this.options_production.arcDelimiters[0] = Math.floor(this.production_g/2);
         //  this.options_utilisation.arcDelimiters[1] = this.utilisation_rate_f_g;
        //  this.options_utilisation.arcDelimiters[0] = Math.floor(this.utilisation_rate_f_g/2);

          this.production_dif = Math.round(this.production_c - this.production_p);
          this.profit_dif =Math.round(this.profit_c - this.profit_p);
          this.visits_dif = Math.round(this.visits_c - this.visits_p);
          
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }
  public hourlyRateChartLoader;
public hourlyRateChartData =[];
public hourlyRateChartLabels1;
public productionTotal;
public hourlyRateChartLabels;
public hourlyRateChartClinic;
public hourlyRateChartInitials =[];
public maxHourlyRate =0 ;
 private hourlyRateChart() {
    this.hourlyRateChartLoader = true;
    this.hourlyRateChartLabels = [];
    this.hourlyRateChartInitials =[];
    this.hourlyRateChartClinic=[];
    this.hourlyRateChartData =[];
    this.maxHourlyRate=0;
    this.healthscreenService.hourlyRateChart(this.clinic_id,this.startDate,this.endDate,this.duration,this.user_type,this.childid).subscribe((data) => {
       if(data.message == 'success'){
         data.data.forEach(res => {
          this.hourlyRateChartData.push(Math.abs(res.hourlyRate).toFixed(1));
          var name = res.provider;
          var clinic = res.clinic;

          var initials = name.match(/\b\w/g) || [];
          initials = ((initials[initials.length-2] || '') + (initials.pop() || '')).toUpperCase();
           this.hourlyRateChartInitials.push(initials);
           this.hourlyRateChartLabels.push(name);
           this.hourlyRateChartClinic.push(clinic);

         });
         if(this.hourlyRateChartData.length >0)
         this.maxHourlyRate = Math.max(...this.hourlyRateChartData);

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public filterDate(val) { 
    this.filter_val =val;
    $('.sa_filter_span.filter').removeClass('active');
    $('.filter_'+val).addClass('active');
  }

    public newPatientsTimeData: number[] = [];
    public newPatientsTimeLabels = [];  
    public newPatientsTimeLabels1 = [];
    public newPatientsTimeData1 : number[] = [];
    public newPatientsTimeLabelsl2 = [];  
    public mkNewPatientsByReferralLoader:any;
public maxNewPatients =0;
public newPatientsTimeClinic=[];
  //Items Predictor Analysis 
    private mkNewPatientsByReferral() {
    this.mkNewPatientsByReferralLoader = true;
    this.newPatientsTimeLabels =[];
    this.newPatientsTimeData =[];
    this.newPatientsTimeClinic=[];
    var user_id;
    var clinic_id;
    this.healthscreenService.mkNewPatientsByReferral(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
         this.newPatientsTimeData =[];
            this.newPatientsTimeLabels =[];
            this.mkNewPatientsByReferralLoader = false;
            this.newPatientsTimeData1 =[];
            this.newPatientsTimeLabelsl2 =[];
            this.newPatientsTimeLabels1 =[];
            if(data.data.patients_reftype.length >0) {
              var i=0;
              if(this.clinic_id =='all')
                var limit=5;
              else
                var limit =3;
             data.data.patients_reftype.forEach(res => {
               if(i<limit) {
               this.newPatientsTimeData.push(res.patients_visits);
               this.newPatientsTimeLabels.push(res.reftype_name);
           this.newPatientsTimeClinic.push(res.clinic);
                i++;
              }
             });
        }
        if(this.newPatientsTimeData.length>0)
          this.maxNewPatients = Math.max(...this.newPatientsTimeData);
        else
           this.maxNewPatients = 0;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }



}
