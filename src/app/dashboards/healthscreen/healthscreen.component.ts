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
import {OwlCarousel} from 'ngx-owl-carousel';
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
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: [ '<i class="fas-fa-chevron-left"></i>', '<i class="fas-fa-chevron-right></i>"' ],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     },
  //     940: {
  //       items: 1
  //     }
  //   },
  //   nav: true
  // };

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
  public bottomLabel = '65'
  public options_profit = {
      hasNeedle: true,
      needleColor: 'black',
      needleUpdateSpeed: 3000,
      arcColors: ['rgb(255,84,84)','rgb(239,214,19)','rgb(61,204,91)'],
      arcDelimiters: [],
      rangeLabel: ['0','500'],
      needleStartValue: 50,
  }
    public options_visits = {
      hasNeedle: true,
      needleColor: 'black',
      needleUpdateSpeed: 3000,
      arcColors: ['rgb(255,84,84)','rgb(239,214,19)','rgb(61,204,91)'],
      arcDelimiters: [],
      rangeLabel: ['0','100'],
      needleStartValue: 50,
  }
    public options_production = {
      hasNeedle: true,
      needleColor: 'black',
      needleUpdateSpeed: 3000,
      arcColors: ['rgb(255,84,84)','rgb(239,214,19)','rgb(61,204,91)'],
      arcDelimiters: [],
      rangeLabel: ['0','2000'],
      needleStartValue: 50,
  }
public options_utilisation = {
      hasNeedle: true,
      needleColor: 'black',
      needleUpdateSpeed: 3000,
      arcColors: ['rgb(255,84,84)','rgb(239,214,19)','rgb(61,204,91)'],
      arcDelimiters: [0,10],
      rangeLabel: ['0','100'],
      needleStartValue: 50,
  }
  public filter_val ='c';
  constructor(private healthscreenService: HealthScreenService, private dentistService: DentistService, private datePipe: DatePipe, private route: ActivatedRoute,  private headerService: HeaderService,private _cookieService: CookieService, private router: Router){   
  }
  private warningMessage: string;
  ngAfterViewInit() {   
    this.route.params.subscribe(params => {
      this.clinic_id = this.route.snapshot.paramMap.get("id");
 //   $('.external_dentist').val('all');
    $('#title').html('Health Check Screen');
       $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
         if($('body').find('span#currentDentist').length > 0){
             var did= $('body').find('span#currentDentist').attr('did');
             $('.external_dentist').val(did);
          }
          else {
             $('.external_dentist').val('all');
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
        this.healthCheckStats();
    }); 
  }
  //this.canvas = (<HTMLElement>document.getElementById('#'))
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
  public  size = "300"

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
  public utilisation_rate_f;0
  public unscheduled_production_f;
  public profit_g;
  public visits_g;
  public production_g;
  public utilisation_rate_f_g;

  //Dentist Production Chart
  private healthCheckStats() {  
    this.healthscreenService.healthCheckStats(this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
          this.production_c = data.data.production_c;
          console.log(this.options_production);
          this.profit_c = data.data.profit_c;
          this.visits_c = data.data.visits_c;
          this.production_p = data.data.production_p;
          this.profit_p = data.data.profit_p;
          this.visits_p = data.data.visits_p;
          this.visits_f = data.data.visits_f;
          this.utilisation_rate_f = data.data.utilisation_rate_f;
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
           this.options_utilisation.arcDelimiters[1] = this.utilisation_rate_f_g;
          this.options_utilisation.arcDelimiters[0] = Math.floor(this.utilisation_rate_f_g/2);
          console.log(this.options_profit);
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
}
