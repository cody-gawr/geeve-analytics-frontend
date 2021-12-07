import { Component, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HealthScreenService } from './healthscreen.service';
import { DentistService } from '../../dentist/dentist.service';

import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderService } from '../../layouts/full/header/header.service';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { ClinicSettingsService } from '../../clinic-settings/clinic-settings.service';
import { ITooltipData } from '../../shared/tooltip/tooltip.directive';
import { ChartstipsService } from '../../shared/chartstips.service';
import { AppConstants } from '../../app.constants';
import { environment } from "../../../environments/environment";


export interface Dentist {
  providerId: string;
  name: string;
}
declare var Chart: any;
@Component({
  selector: 'healthscreen',
  templateUrl: './healthscreen.component.html',
  styleUrls: ['./healthscreen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HealthScreenComponent implements AfterViewInit, OnDestroy {
  @ViewChild("myCanvas") canvas: ElementRef;
  mockupColors = ['#6edbbb', '#ffd32d', '#abb3ff', '#b0fffa', '#ffb4b5'];
  lineChartColors;
  subtitle: string;
  public apiUrl = environment.apiUrl;
  public id: any = {};
  public clinic_id: any = {};
  public UrlSegment: any = {};
  public dentistCount: any = {};
  public doughnutChartColors = [];
  public startDate = '';
  public endDate = '';
  public duration = '';
  public trendText;
  public showTrend = false;
  public showTrendChart = false;
  public canvasWidth = 300
  public needleValue = 65
  public centralLabel = ''
  public name = 'Gauge chart'
  public bottomLabel = '65';
  public childid;
  public user_type;
  public finProductionPerVisitLoader: any;
  public finProductionPerVisit_dif: any = 0;
  public productionVal = 0;
  public productionPrev = 0;
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
    arcColors: ['rgba(255, 195, 194, 1)', 'rgba(255, 195, 194, 0.8)'],
  }
  public selectedDentist;
  public dentists;
  public filter_val = 'c';
  xeroConnect: boolean = false;


  public prodpervisitstats: boolean = true;
  public totalvisitstats: boolean = true;
  public productionstats: boolean = true;
  public prebookedvisitchart: boolean = true;
  public chairutilrate: boolean = true;
  public unscheduledproduction: boolean = true;
  public hoursrateleaders: boolean = true;
  public refreralleaders: boolean = true;
  public charTips: any = [];


  constructor(
    private healthscreenService: HealthScreenService,
    private dentistService: DentistService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private _cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService,
    private clinicSettingsService: ClinicSettingsService,
    public constants: AppConstants,
    public chartstipsService: ChartstipsService
  ) {
    this.getChartsTips();
  }
  private warningMessage: string;
  ngAfterViewInit() {
    $('#currentDentist').attr('did', 'all');
    //this.initiate_clinic();
    //$('.external_dentist').hide();
    $('#title').html('Clinic Health');
    $('.external_clinic').show();
    //$('.dentist_dropdown').hide();
    //$('.dentist_dropdown').parent().hide(); // added
    $('.sa_heading_bar').addClass("filter_single"); // added
    $('.header_filters').removeClass('hide_header');
    $('.header_filters').addClass('flex_direct_mar');
    if ($('body').find('span#currentClinic').length > 0) {
      var cid = $('body').find('span#currentClinic').attr('cid');
      $('.external_clinic').val(cid);
    } else {
      $('.external_clinic').val('all');
    }
    this.clinic_id = cid;
    this.user_type = this._cookieService.get("user_type");
    if (this._cookieService.get("childid"))
      this.childid = this._cookieService.get("childid");
    $(document).on('click', function (e) {
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
    //$('.dentist_dropdown').parent().show(); // added
    $('.sa_heading_bar').removeClass("filter_single"); // added
  }

  initiate_clinic() {
    var val = $('#currentClinic').attr('cid');
    if (val != undefined) {
      this.clinic_id = val;
      this.loadHealthScreen();
      //this.checkXeroStatus();

      //$('.external_dentist').hide();
    }
  }

  getShortName(fullName: string) {
    return $.trim(fullName).charAt(0);
  }

  getShortNameLeader(fullName: string) {
    return fullName.split(' ').map(n => n[0]).join('');
  }

  public loadHealthScreen() {
    var date = new Date();
    this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.prodpervisitstats = false;
    this.totalvisitstats = false;
    this.productionstats = false;
    this.prebookedvisitchart = false;
    this.chairutilrate = false;
    this.unscheduledproduction = false;
    this.hoursrateleaders = false;
    this.refreralleaders = false;

    if (this.user_type == 4) {
      if (this.clinic_id == 'all') {
        this.chGetProductionMCP();
        this.chGetHourlyRateMCP();
        this.chGetReappointRateMCP();
      } else {
        this.chGetDetistProdHorate();
        this.chGetDetistReappRate();
      }


    } else {
      // this.chProduction();
      //this.chTotalVisits();
      //this.finProductionPerVisit();  
      this.chTopCards();
      this.chPrebookedVisits();
      this.chUtilisationRate();
      this.chUnscheduledProd();
      this.hourlyRateChart();
      this.mkNewPatientsByReferral();
    }


  }
  public doughnutTotal = 0;
  public doughnutTotalAverage = 0;
  public doughnutGoals = 0;
  public gaugePrependText = "$";
  public gaugeDuration = '25000';
  // events
  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }
  public gaugeType = "arch";
  public gaugeValue = '';
  public gaugeLabel = "";
  public gaugeThick = "20";
  public foregroundColor = "rgba(0, 150, 136,0.7)";
  public cap = "round";
  public size = "300";

  public gaugeValueTreatment = 0;
  public gaugeLabelTreatment = "";

  public gaugeValuePatients = 0;
  public gaugeLabelPatients = "";

  public productionTooltip = 'down';
  public productionTotalPrev;
  public production_c;
  public production_c_avg;
  public profit_c;
  public visits_c;
  public visits_c_avg;
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


  /* Added by Hanney Sharma*/
  // Functions to get the data for the Production, Total Visits, Pre-booked Visits, Chair Utilisation Rate, Unscheduled Production
  // Start Block

  public production_c_all: any = {};
  public productionVal_all: any = [];
  public visits_c_all: any = [];


  public chTopCards() { // Production,Prod. Per Visit and Total Visits top Cards
    this.production_c = 0;
    this.production_c_avg = 0;
    this.production_dif = 0;
    this.visits_c = 0;
    this.visits_dif = 0;
    this.productionVal = 0;
    this.productionPrev = 0;
    this.healthscreenService.commonCall(this.clinic_id, this.startDate, this.endDate, 'chTopCards').subscribe((data) => {
      if (data.message == 'success') {
        let today = new Date().getDate()
        this.productionstats = true;
        this.totalvisitstats = true;
        this.prodpervisitstats = true;
        this.finProductionPerVisitLoader = false;
        // check for all clinic 
        if (this.clinic_id == 'all') {
          this.production_p = Math.round(data.data.production_ta);
          this.production_c_avg = Math.round(data.data.production_ta / today);
          this.production_c = 0;
          let tooltip_p = '';
          data.data.production.forEach((val) => {
            this.production_c = this.production_c + Math.round(val.production);
            tooltip_p += '<span class="text">' + val.clinic_name + ': $' + Math.round(val.production) + '</span>';
          });
          this.production_dif = Math.round(this.production_c - this.production_p);
          this.production_c_all = { 'title': '', 'info': tooltip_p };

          this.visits_p = Math.round(data.data.num_visit_ta);
          this.visits_c_avg = Math.round(data.data.num_visit_ta / today);
          this.visits_c = 0;
          let tooltip_v = '';
          data.data.num_visit.forEach((val) => {
            this.visits_c = this.visits_c + Math.round(val.num_visit);
            tooltip_v += '<span class="text">' + val.clinic_name + ': ' + Math.round(val.num_visit) + '</span>';
          });
          this.visits_c_all = { 'title': '', 'info': tooltip_v };
          this.visits_dif = Math.round(this.visits_c - this.visits_p);


          this.productionPrev = Math.round(data.data.production_visit_ta);
          this.productionVal = 0;
          let tooltip_pv = '';
          this.productionVal = Math.round(this.production_c / this.visits_c);
          data.data.production_visit.forEach((val) => {
            tooltip_pv += '<span class="text">' + val.clinic_name + ': $' + Math.round(val.production_visit) + '</span>';
          });
          this.productionVal_all = { 'title': '', 'info': tooltip_pv };
          this.finProductionPerVisit_dif = Math.round(this.productionVal - this.productionPrev);
        } else {
          this.production_c = data.data.production;
          this.production_p = Math.round(data.data.production_ta);
          this.production_c_avg = Math.round(data.data.production_ta / today);
          this.production_dif = Math.round(this.production_c - this.production_p);

          this.productionVal = (data.data.production_visit) ? data.data.production_visit : 0;
          this.productionPrev = Math.round(data.data.production_visit_ta);
          this.finProductionPerVisit_dif = Math.round(this.productionVal - this.productionPrev);

          this.visits_c = Math.round(data.data.num_visit);
          this.visits_p = Math.round(data.data.num_visit_ta);
          this.visits_c_avg = Math.round(data.data.num_visit_ta / today);
          this.visits_dif = Math.round(this.visits_c - this.visits_p);
        }
      }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    });
  }


  /*  public chProduction(){ // Production top Card
      this.production_c = 0;
      this.production_dif = 0;
      this.healthscreenService.commonCall(this.clinic_id,this.startDate,this.endDate,'chProduction').subscribe((data) => {
        if(data.message == 'success'){
          this.productionstats = true;
          this.production_c = data.total;
          this.production_p = Math.round(data.total_ta);
          this.production_dif = Math.round(data.total - data.total_ta);
        }        
      }, error => {
        $('.ajax-loader').hide();
        this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      }); 
    }*/

  /*  public chTotalVisits(){ // Total Vists top Card
      this.visits_c = 0;
      this.visits_dif = 0;
      this.healthscreenService.commonCall(this.clinic_id,this.startDate,this.endDate,'chTotalVisits').subscribe((data) => {
        if(data.message == 'success'){
          this.totalvisitstats = true;
          this.visits_c = data.total;
          this.visits_p = data.total_ta;
          this.visits_dif = Math.round(data.total - data.total_ta);
        }        
      }, error => {
        $('.ajax-loader').hide();
        this.toastr.error('There was an error retrieving your report data, please contact our support team.');
      }); 
    }*/


  /* functions for dentist login only */
  public dentistProduction: any = 0;
  public dentistProductionTa: any = 0;
  public dentistProductionDiff: any = 0;
  public dentistProductionLoader: boolean = true;
  public chGetProductionMCP() { // Total Vists top Card
    this.dentistProductionLoader = true;
    this.healthscreenService.commonCall(this.clinic_id, this.startDate, this.endDate, 'chGetProductionMCP').subscribe((data) => {
      this.dentistProductionLoader = false;
      if (data.message == 'success' && data.data) {
        this.dentistProduction = Math.round(data.data[0].production);
        this.dentistProductionTa = Math.round(data.data_ta[0].production);
        this.dentistProductionDiff = Math.round(this.dentistProduction - this.dentistProductionTa);
      }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    });
  }

  public dentistHourlyRate: any = 0;
  public dentistHourlyRateTa: any = 0;
  public dentistHourlyRateDiff: any = 0;
  public dentistHourlyRateLoader: boolean = true;
  public chGetHourlyRateMCP() { // Total Vists top Card
    this.dentistHourlyRateLoader = true;
    this.healthscreenService.commonCall(this.clinic_id, this.startDate, this.endDate, 'chGetHourlyRateMCP').subscribe((data) => {
      this.dentistHourlyRateLoader = false;
      if (data.message == 'success' && data.data) {
        this.dentistHourlyRate = Math.round(data.data[0].hourly_rate);
        this.dentistHourlyRateTa = Math.round(data.data_ta[0].hourly_rate);
        this.dentistHourlyRateDiff = Math.round(this.dentistHourlyRate - this.dentistHourlyRateTa);
      }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    });
  }


  public chGetDetistProdHorate() { // Total Vists top Card
    this.dentistHourlyRateLoader = true;
    this.dentistProductionLoader = true;
    this.healthscreenService.commonCall(this.clinic_id, this.startDate, this.endDate, 'chGetProduHrRate').subscribe((data) => {
      this.dentistHourlyRateLoader = false;
      this.dentistProductionLoader = false;
      if (data.message == 'success' && data.data) {
        this.dentistProduction = Math.round(data.data.production);
        this.dentistProductionTa = Math.round(data.data.production_ta);
        this.dentistProductionDiff = Math.round(this.dentistProduction - this.dentistProductionTa);

        this.dentistHourlyRate = Math.round(data.data.hourly_rate);
        this.dentistHourlyRateTa = Math.round(data.data.hourly_rate_ta);
        this.dentistHourlyRateDiff = Math.round(this.dentistHourlyRate - this.dentistHourlyRateTa);
      }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    });
  }

  public chGetDetistReappRate() { // Total Vists top Card
    this.dentistReappointRateLoader = true;
    this.healthscreenService.commonCall(this.clinic_id, this.startDate, this.endDate, 'chGetReappointmentRate').subscribe((data) => {
      this.dentistReappointRateLoader = false;
      if (data.message == 'success' && data.data) {
        this.dentistReappointRate = Math.round(data.data.reappoint_rate);
        this.dentistReappointRateTa = Math.round(data.data.reappoint_rate_ta);
        this.dentistReappointRateDiff = Math.round(this.dentistReappointRate - this.dentistReappointRateTa);
      }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    });
  }

  public dentistReappointRate: any = 0;
  public dentistReappointRateTa: any = 0;
  public dentistReappointRateDiff: any = 0;
  public dentistReappointRateLoader: boolean = true;
  public chGetReappointRateMCP() { // Total Vists top Card
    this.dentistReappointRateLoader = true;
    this.healthscreenService.commonCall(this.clinic_id, this.startDate, this.endDate, 'chGetReappointRateMCP').subscribe((data) => {
      this.dentistReappointRateLoader = false;
      if (data.message == 'success' && data.data) {
        this.dentistReappointRate = Math.round(data.data[0].reappoint_rate);
        this.dentistReappointRateTa = Math.round(data.data_ta[0].reappoint_rate);
        this.dentistReappointRateDiff = Math.round(this.dentistReappointRate - this.dentistReappointRateTa);
      }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    });
  }

  /* functions for dentist login only */


  public chPrebookedVisits() { //Prebooked Visits graph in bottom
    var date = new Date();
    var startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), 'yyyy-MM-dd');
    var endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7), 'yyyy-MM-dd');
    this.visits_f = 0;
    this.healthscreenService.commonCall(this.clinic_id, startDate, endDate, 'chPrebookedVisits').subscribe((data) => {
      if (data.message == 'success') {
        this.prebookedvisitchart = true;
        this.visits_f = data.data;
      }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    });
  }

  public chUtilisationRate() { //Utilisation Rate graph in bottom
    var date = new Date();
    var startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), 'yyyy-MM-dd');
    var endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7), 'yyyy-MM-dd');
    this.utilisation_rate_f = 0;
    this.healthscreenService.commonCall(this.clinic_id, startDate, endDate, 'chUtilisationRate').subscribe((data) => {
      if (data.message == 'success') {
        this.chairutilrate = true;
        this.utilisation_rate_f = Math.round(data.data);
      }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    });
  }

  public chUnscheduledProd() { //Unscheduled Production graph in bottom
    var date = new Date();
    var startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), 'yyyy-MM-dd');
    var endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7), 'yyyy-MM-dd');
    this.unscheduled_production_f = 0;
    this.healthscreenService.commonCall(this.clinic_id, startDate, endDate, 'chUnscheduledProd').subscribe((data) => {
      if (data.message == 'success') {
        this.unscheduledproduction = true;
        this.unscheduled_production_f = data.data;
      }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('There was an error retrieving your report data, please contact our support team.');
    });
  }

  // End Block




  public hourlyRateChartLoader;
  public hourlyRateChartData = [];
  public hourlyRateChartLabels1;
  public productionTotal;
  public hourlyRateChartLabels;
  public hourlyRateChartClinic;
  public hourlyRateChartInitials = [];
  public maxHourlyRate = 0;
  public hourlyRateColors = [];
  private hourlyRateChart() {
    this.hourlyRateChartLoader = true;
    this.hourlyRateChartLabels = [];
    this.hourlyRateChartInitials = [];
    this.hourlyRateChartClinic = [];
    this.hourlyRateChartData = [];
    this.maxHourlyRate = 0;
    let colorCount = 0;
    this.healthscreenService.hourlyRateChart(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data) => {
      this.hourlyRateChartData = [];
      if (data.message == 'success') {
        this.hourlyRateChartData = data.data;
        this.hoursrateleaders = true;

      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public filterDate(val) {
    this.filter_val = val;
    $('.sa_filter_span.filter').removeClass('active');
    $('.filter_' + val).addClass('active');
  }

  public newPatientsTimeData: number[] = [];
  public newPatientsTimeLabels = [];
  public newPatientsTimeLabels1 = [];
  public newPatientsTimeData1: number[] = [];
  public newPatientsTimeColors = [];
  public newPatientsTimeLabelsl2 = [];
  public mkNewPatientsByReferralLoader: any;
  public maxNewPatients = 0;
  public newPatientsTimeClinic = [];
  //Items Predictor Analysis 
  private mkNewPatientsByReferral() {
    this.mkNewPatientsByReferralLoader = true;
    this.newPatientsTimeLabels = [];
    this.newPatientsTimeData = [];
    this.newPatientsTimeClinic = [];
    var user_id;
    var clinic_id;
    this.healthscreenService.mkNewPatientsByReferral(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
      if (data.message == 'success') {
        this.newPatientsTimeData = data.data;
        this.refreralleaders = true;
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }
  getChartsTips() {
    this.chartstipsService.getCharts(6).subscribe((data) => {
      if (data.message == 'success') {
        this.charTips = data.data;
      }
    }, error => { });
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

  /*  private finProductionPerVisit() {
      this.finProductionPerVisitLoader = true;
      this.productionVal = 0;  
      this.productionPrev = 0;
      var user_id;
      var clinic_id;
      this.healthscreenService.finProductionPerVisit(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
         if(data.message == 'success'){
          this.prodpervisitstats = true;
          this.finProductionPerVisitLoader = false;
          this.productionVal = Math.round(data.total);
          this.productionPrev = Math.round(data.total_ta);  
          this.finProductionPerVisit_dif = Math.round(data.total - data.total_ta);
        }
      }, error => {
        this.warningMessage = "Please Provide Valid Inputs!";
   
      });
    }*/

}
