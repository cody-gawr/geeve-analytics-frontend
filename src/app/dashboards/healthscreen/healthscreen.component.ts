import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit, Pipe, PipeTransform, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { HealthScreenService } from './healthscreen.service';
import { DentistService } from '../../dentist/dentist.service';

import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderService } from '../../layouts/full/header/header.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppHeaderrightComponent } from '../../layouts/full/headerright/headerright.component';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ClinicSettingsService } from '../../clinic-settings/clinic-settings.service';
export interface Dentist {
  providerId: string;
  name: string;
}
declare var Chart: any; 
@Component({
  templateUrl: './healthscreen.component.html',
  styleUrls: ['./healthscreen.component.scss']
})
export class HealthScreenComponent implements AfterViewInit, OnDestroy {
   @ViewChild("myCanvas") canvas: ElementRef;
  mockupColors = ['#6edbbb', '#ffd32d', '#abb3ff', '#b0fffa', '#ffb4b5'];
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
  public finProductionPerVisitLoader:any;
  public productionVal = 0;  
  public options: any = {
      hasNeedle: false,
      arcColors: ['rgba(166, 178, 255, 1)', 'rgba(166, 178, 255, 0.8)'],
      thick: 15,
      size: 251,
      cap: 'round',    
  };
  public options1: any = {
    arcColors: ['#fff0bb', '#fffae7'],
    hasNeedle: false,
    needleUpdateSpeed: 1000,
    needleStartValue: 0,
  }
  public optionsunscheduled = {
    hasNeedle: false,
    arcColors: ['rgba(255, 195, 194, 1)', 'rgba(255, 195, 194, 0.8)' ],
  }
  public selectedDentist;
  public dentists;
  public filter_val ='c';
  xeroConnect:boolean = false;
  constructor(private healthscreenService: HealthScreenService, private dentistService: DentistService, private datePipe: DatePipe, private route: ActivatedRoute,  private headerService: HeaderService,private _cookieService: CookieService, private router: Router,private toastr:ToastrService,
    private clinicSettingsService: ClinicSettingsService){   
  }
  private warningMessage: string;
  ngAfterViewInit() {  
    $('#currentDentist').attr('did','all');
    //this.initiate_clinic();
    //   $('.external_dentist').val('all');
    $('#title').html('Clinic Health');
    $('.external_clinic').show();
    $('.dentist_dropdown').hide();
    $('.dentist_dropdown').parent().hide(); // added
    $('.sa_heading_bar').addClass("filter_single"); // added
    $('.header_filters').removeClass('hide_header');
    $('.header_filters').addClass('flex_direct_mar');
    if($('body').find('span#currentClinic').length > 0){
      var cid= $('body').find('span#currentClinic').attr('cid');
      $('.external_clinic').val(cid);
    } else {
      $('.external_clinic').val('all');
    }
    this.clinic_id = cid;
    this.user_type = this._cookieService.get("user_type");
    if( this._cookieService.get("childid"))
      this.childid = this._cookieService.get("childid");
    $(document).on('click', function(e) {
      if ($(document.activeElement).attr('id') == 'sa_datepicker') {
        $('.customRange').show();
      } else if ($(document.activeElement).attr('id') == 'customRange') {
        $('.customRange').show();
      } else {
        $('.customRange').hide();
      }
    })
       // this.loadHealthScreen();    
  }


  ngOnDestroy() {
    $('.dentist_dropdown').parent().show(); // added
    $('.sa_heading_bar').removeClass("filter_single"); // added
  }

  initiate_clinic() {
    var val = $('#currentClinic').attr('cid');    
    if(val != undefined) {
    this.clinic_id = val;
    this.loadHealthScreen();
    //this.checkXeroStatus();
    this.finProductionPerVisit();
  }
  }

  getShortName(fullName: string) {
    return fullName.split(' ').map(n => n[0]).join('');
  }

  public loadHealthScreen() {
    var date = new Date();
    this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
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
    this.production_c = 0;
          this.profit_c = 0;
          this.visits_c =0;
          this.production_p = 0;
          this.profit_p = 0;
          this.visits_p = 0;
          this.visits_f = 0;
          this.utilisation_rate_f = 0;
          this.unscheduled_production_f = 0;

          this.profit_g = 0;       
          this.visits_g = 0;     
          this.production_g = 0;      
          this.utilisation_rate_f_g = 0;     
          this.production_dif =  0;  
          this.profit_dif = 0;  
          this.visits_dif =  0; 
    this.healthscreenService.healthCheckStats(this.clinic_id).subscribe((data) => {
  $('.ajax-loader').hide();
       

       if(data.message == 'success'){
          this.production_c = data.data.production_c;
          
          this.visits_c = data.data.visits_c;
          this.production_p = data.data.production_p;          
          this.visits_p = data.data.visits_p;
          this.visits_f = data.data.visits_f;
          this.utilisation_rate_f = Math.round(data.data.utilisation_rate_f) ;
          if(this.utilisation_rate_f){
          /*  this.options1 = {
              ...this.options1,
              arcDelimiters: [this.utilisation_rate_f]
            };*/
          }
          this.unscheduled_production_f = data.data.unscheduled_production_f;
          //this.visits_g = data.data.visits_g;          
          //this.production_g = data.data.production_g;          
          //this.utilisation_rate_f_g  = data.data.utilisation_rate_f_g;          
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
          if(data.data.profit_c == 'error') {
            if(this.clinic_id == 'all') {
              Swal.fire({
              title: "<i>Error Connection to Xero</i>", 
              html: "There was an error retrieving your xero data, please reconnect your xero account . Please go to clinic settings to connect your clinic.",  
              });    
            }
            else
            {
               Swal.fire({
              title: "<i>Error Connection to Xero</i>", 
              html: "There was an error retrieving your xero data, please reconnect your xero account . Please <a href='/clinic-settings/"+this.clinic_id+"'>click here</a> to connect",  
              }); 

            }
          }
       }
    }, error => {
      $('.ajax-loader').hide();
        this.toastr.error('There was an error retrieving your report data, please contact our support team.');
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
public hourlyRateColors = [];
 private hourlyRateChart() {
    this.hourlyRateChartLoader = true;
    this.hourlyRateChartLabels = [];
    this.hourlyRateChartInitials =[];
    this.hourlyRateChartClinic=[];
    this.hourlyRateChartData =[];
    this.maxHourlyRate=0;
    let colorCount = 0;
    this.healthscreenService.hourlyRateChart(this.clinic_id,this.startDate,this.endDate,this.duration,this.user_type,this.childid).subscribe((data) => {
      this.hourlyRateChartData =[];
       if(data.message == 'success'){
        this.hourlyRateChartData = data.data;        

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
  public newPatientsTimeColors = [];
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
         this.newPatientsTimeData = data.data;           
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }


/*  checkXeroStatus() {
    this.clinicSettingsService.checkXeroStatus(this.clinic_id).subscribe((res) => {
      console.log('res', res)
      if (res.message == 'success') {
        if (res.data.xero_connect == 1) {
          this.xeroConnect = true;
        }
        else {
          this.xeroConnect = false;
        }
      }
      else {
        this.xeroConnect = false;
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }*/

  private finProductionPerVisit() {
    this.finProductionPerVisitLoader = true;
    this.productionVal = 0;  
    var user_id;
    var clinic_id;
    this.healthscreenService.finProductionPerVisit(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.finProductionPerVisitLoader = false;
        this.productionVal = Math.round(data.total);  
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

}
