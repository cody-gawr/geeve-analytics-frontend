import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { HealthScreenService } from './healthscreen.service';
// import { DentistService } from '../../dentist/dentist.service';

import { DatePipe } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../layouts/full/header/header.service';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
// import { ClinicSettingsService } from '../../clinic-settings/clinic-settings.service';
import { ChartstipsService } from '../../shared/chartstips.service';
import { AppConstants } from '../../app.constants';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../shared/local-storage.service';

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
  @ViewChild('myCanvas') canvas: ElementRef;
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
  public canvasWidth = '30';
  public needleValue = 65;
  public centralLabel = '';
  public name = 'Gauge chart';
  public bottomLabel = '65';
  public childid;
  public user_type;
  public finProductionPerVisitLoader: any;
  public finProductionPerVisit_dif: any = 0;
  public productionVal = 0;
  public productionPrev = 0;
  public health_screen_mtd: any;
  public mtdText = 'Month To Date';
  public mtdInnText = 'Last Month';
  public options: any = {
    hasNeedle: false,
    arcColors: ['rgba(166, 178, 255, 1)', 'rgba(166, 178, 255, 0.8)'],
    thick: 15,
    size: 251,
    cap: 'round'
  };
  public options1: any = {
    arcColors: ['#fff0bb', '#fffae7'],
    hasNeedle: false,
    needleUpdateSpeed: 1000,
    needleStartValue: 0
  };
  public optionsunscheduled = {
    hasNeedle: false,
    arcColors: ['rgba(255, 195, 194, 1)', 'rgba(255, 195, 194, 0.8)']
  };
  public selectedDentist;
  public dentists;
  public filter_val = 'c';
  xeroConnect: boolean = false;

  public prodpervisitstats: boolean = false;
  public totalvisitstats: boolean = false;
  public productionstats: boolean = false;
  public prebookedvisitchart: boolean = true;
  public chairutilrate: boolean = true;
  public unscheduledproduction: boolean = true;
  public hoursrateleaders: boolean = true;
  public refreralleaders: boolean = true;
  public charTips: any = [];
  public isAllClinic: boolean;
  private warningMessage: string;

  public get isExact(): boolean {
    return this.localStorageService.isEachClinicExact(this.clinic_id);
  }

  constructor(
    private localStorageService: LocalStorageService,
    private healthscreenService: HealthScreenService,
    // private dentistService: DentistService,
    private datePipe: DatePipe,
    // private route: ActivatedRoute,
    private headerService: HeaderService,
    private _cookieService: CookieService,
    // private router: Router,
    private toastr: ToastrService,
    // private clinicSettingsService: ClinicSettingsService,
    public constants: AppConstants,
    public chartstipsService: ChartstipsService
  ) {
    // this.getChartsTips();
    this.getAllClinics();
  }

  ngAfterViewInit() {
    // this.getCustomiseSettings();
    $('#currentDentist').attr('did', 'all');
    // this.initiate_clinic();
    //$('.external_dentist').hide();
    $('#title').html('Clinic Health');
    $('.external_clinic').show();
    //$('.dentist_dropdown').hide();
    //$('.dentist_dropdown').parent().hide(); // added
    $('.sa_heading_bar').addClass('filter_single'); // added
    $('.header_filters').removeClass('hide_header');
    $('.header_filters').addClass('flex_direct_mar');
    if ($('body').find('span#currentClinic').length > 0) {
      var cid = $('body').find('span#currentClinic').attr('cid');
      $('.external_clinic').val(cid);
    } else {
      $('.external_clinic').val('all');
    }
    this.clinic_id = cid;
    this.user_type = this._cookieService.get('user_type');
    //this.clinic_id = this._cookieService.get("clinic_id");
    if (this._cookieService.get('childid'))
      this.childid = this._cookieService.get('childid');
    $(document).on('click', function (e) {
      if ($(document.activeElement).attr('id') == 'sa_datepicker') {
        $('.customRange').show();
      } else if ($(document.activeElement).attr('id') == 'customRange') {
        $('.customRange').show();
      } else {
        $('.customRange').hide();
      }
    });
    // this.loadHealthScreen();
  }

  ngOnDestroy() {
    //$('.dentist_dropdown').parent().show(); // added
    $('.sa_heading_bar').removeClass('filter_single'); // added
  }

  public clinics = [];
  getAllClinics() {
    this.headerService.getClinic.subscribe((res) => {
      if (res.status == 200) {
        let temp = [];
        res.body.data.forEach((item) => {
          temp.push(item.id);
        });
        this.clinics = [...temp];
      }
    });
  }

  async initiate_clinic() {
    if (this.user_type != 7) {
      await this.getScreenMTD();
    }
    if (this.health_screen_mtd == 1) {
      this.mtdText = 'Month To Date';
      this.mtdInnText = 'Last Month';
    } else {
      this.mtdText = 'Last 30 days';
      this.mtdInnText = 'Previous 30 days';
    }
    var val = $('#currentClinic').attr('cid');
    if (val != undefined) {
      let opts = this.constants.cookieOpt;
      this._cookieService.put('clinic_id', val, opts);
      if (val == 'all') {
        this.clinic_id = this.clinics;
        this.isAllClinic = true;
      } else {
        this.clinic_id = val;
        this.isAllClinic = false;
      }
      // this.getCustomiseSettings();
      this.loadHealthScreen();
    }
  }

  getScreenMTD() {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.healthscreenService.getSetting().subscribe(
        (res) => {
          self.health_screen_mtd = res.body.data;
          resolve(true);
        },
        (error) => {
          self.health_screen_mtd = this._cookieService.get('health_screen_mtd');
          resolve(true);
        }
      );
    });
  }

  // getCustomiseSettings() {
  //   let clinic_id = this._cookieService.get("clinic_id");
  //   this.health_screen_mtd = 1;
  //   this.mtdText = 'Month To Date';
  //   this.mtdInnText = 'Last Month';
  //   if (clinic_id != 'all') {
  //     this.healthscreenService.getCustomiseSettings(clinic_id)
  //       .subscribe(
  //         (res) => {
  //           if (res.status == 200) {
  //             if (res.body.data) {
  //               this.health_screen_mtd = parseInt(res.body.data.health_screen_mtd);
  //               if (this.health_screen_mtd == 0) {
  //                 this.mtdText = 'Last 30 days';
  //                 this.mtdInnText = 'Previous 30 days';
  //               } else {
  //                 this.mtdText = 'Month To Date';
  //                 this.mtdInnText = 'Last Month';
  //               }
  //               this.loadHealthScreen();
  //             }
  //           }
  //         },
  //         (error) => {
  //           console.log("error", error);
  //           $(".ajax-loader").hide();
  //         }
  //       );
  //   }  else{
  //     this.loadHealthScreen();
  //   }
  // }
  getShortName(fullName: string) {
    return $.trim(fullName).charAt(0);
  }

  getShortNameLeader(fullName: string) {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  public loadHealthScreen() {
    this.getChartsTips();

    var date = new Date();
    if (this.health_screen_mtd == 0) {
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth(), date.getDate() - 29),
        'yyyy-MM-dd'
      );
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    } else {
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth(), 1),
        'yyyy-MM-dd'
      );
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    }

    // console.log("startDate:" + this.startDate + " -- End Date: " + this.endDate );
    // console.log("clinic Id: " + this.clinic_id);
    // console.log("this.health_screen_mtd: " + this.health_screen_mtd);

    this.prodpervisitstats = false;
    this.totalvisitstats = false;
    this.productionstats = false;
    this.prebookedvisitchart = false;
    this.chairutilrate = false;
    this.unscheduledproduction = false;
    this.hoursrateleaders = false;
    this.refreralleaders = false;

    if (this.user_type == 4) {
      if (Array.isArray(this.clinic_id) || this.clinic_id == 'all') {
        this.chGetProductionMCP();
        this.chGetHourlyRateMCP();
        this.chGetReappointRateMCP();
      } else {
        this.chGetDetistProdHorate();
        this.chGetDetistReappRate();
      }
    } else {
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
  public gaugePrependText = '$';
  public gaugeDuration = '25000';
  // events
  public chartClicked(e: any): void {}

  public chartHovered(e: any): void {}
  public gaugeType = 'semi';
  public gaugeValue = '';
  public gaugeLabel = '';
  public gaugeThick = '20';
  public foregroundColor = 'rgba(166, 178, 255, 1)';
  public foregroundColor1 = '#fff0bb';
  public foregroundColor2 = 'rgba(255, 195, 194, 1)';
  public backgroundColor = '#f4f0fa';
  public cap = 'round';
  public size = '250';

  public gaugeValueTreatment = 0;
  public gaugeLabelTreatment = '';

  public gaugeValuePatients = 0;
  public gaugeLabelPatients = '';

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

  public chTopCards() {
    // Production,Prod. Per Visit and Total Visits top Cards
    this.production_c = 0;
    this.production_c_avg = 0;
    this.production_dif = 0;
    this.visits_c = 0;
    this.visits_dif = 0;
    this.productionVal = 0;
    this.productionPrev = 0;
    this.healthscreenService
      .commonCall(this.clinic_id, this.startDate, this.endDate, 'chTopCards')
      .subscribe(
        (res) => {
          if (res.status == 200) {
            let today = new Date().getDate();
            let todayMinusOffdays = today - res.body.data.offdays_count;
            let avgDaysCount = 30 - res.body.data.offdays_count;
            // this.mtdText = data.body.data.mtdText;
            // this.mtdInnText = data.body.data.mtdInnText;
            this.productionstats = true;
            this.totalvisitstats = true;
            this.prodpervisitstats = true;
            this.finProductionPerVisitLoader = false;
            // check for all clinic
            if (Array.isArray(this.clinic_id) || this.clinic_id == 'all') {
              this.production_p = Math.round(res.body.data.production_ta);

              this.production_c = 0;
              let tooltip_p = '';
              res.body.data.production.forEach((val) => {
                this.production_c =
                  this.production_c + Math.round(val.production);
                tooltip_p +=
                  '<span class="text">' +
                  val.clinic_name +
                  ': $' +
                  Math.round(val.production) +
                  '</span>';
              });
              this.production_c_avg = Math.round(
                res.body.data.production_daily_avg
              );

              this.production_dif = Math.round(
                this.production_c - this.production_p
              );
              this.production_c_all = { title: '', info: tooltip_p };

              this.visits_p = Math.round(res.body.data.num_visit_ta);

              this.visits_c = 0;
              let tooltip_v = '';
              res.body.data.num_visit.forEach((val) => {
                this.visits_c = this.visits_c + Math.round(val.num_visit);
                tooltip_v +=
                  '<span class="text">' +
                  val.clinic_name +
                  ': ' +
                  Math.round(val.num_visit) +
                  '</span>';
              });
              this.visits_c_avg = Math.round(res.body.data.total_visits_avg);
              // this.visits_c_avg = Math.round(this.visits_c / today);
              this.visits_c_all = { title: '', info: tooltip_v };
              this.visits_dif = Math.round(this.visits_c - this.visits_p);

              this.productionPrev = Math.round(
                res.body.data.production_visit_ta
              );
              this.productionVal = 0;
              let tooltip_pv = '';
              this.productionVal = Math.round(
                this.production_c / this.visits_c
              );
              res.body.data.production_visit.forEach((val) => {
                tooltip_pv +=
                  '<span class="text">' +
                  val.clinic_name +
                  ': $' +
                  Math.round(val.production_visit) +
                  '</span>';
              });
              this.productionVal_all = { title: '', info: tooltip_pv };
              this.finProductionPerVisit_dif = Math.round(
                this.productionVal - this.productionPrev
              );
            } else {
              this.production_c = res.body.data.production;
              this.production_p = Math.round(res.body.data.production_ta);
              // this.production_c_avg = Math.round(data.body.data.production_daily_avg);
              if (this.health_screen_mtd == 0) {
                this.production_c_avg = Math.round(
                  this.production_c / avgDaysCount
                );
              } else {
                this.production_c_avg = Math.round(
                  this.production_c / todayMinusOffdays
                );
              }

              this.production_dif = Math.round(
                this.production_c - this.production_p
              );

              this.productionVal = res.body.data.production_visit
                ? res.body.data.production_visit
                : 0;
              this.productionPrev = Math.round(
                res.body.data.production_visit_ta
              );
              this.finProductionPerVisit_dif = Math.round(
                this.productionVal - this.productionPrev
              );

              this.visits_c = Math.round(res.body.data.num_visit);
              this.visits_p = Math.round(res.body.data.num_visit_ta);
              // this.visits_c_avg = Math.round(data.body.data.total_visits_avg);
              if (this.health_screen_mtd == 0) {
                this.visits_c_avg = Math.round(this.visits_c / avgDaysCount);
              } else {
                this.visits_c_avg = Math.round(
                  this.visits_c / todayMinusOffdays
                );
              }

              this.visits_dif = Math.round(this.visits_c - this.visits_p);
            }
          }
        },
        (error) => {
          $('.ajax-loader').hide();
          if (this.user_type != 7) {
            this.toastr.error(
              'There was an error retrieving your report data, please contact our support team.'
            );
          }
        }
      );
  }

  /*  public chProduction(){ // Production top Card
      this.production_c = 0;
      this.production_dif = 0;
      this.healthscreenService.commonCall(this.clinic_id,this.startDate,this.endDate,'chProduction').subscribe((data) => {
        if(data.status == 200){
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
        if(data.status == 200){
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
  public chGetProductionMCP() {
    // Total Vists top Card
    this.dentistProductionLoader = true;
    this.healthscreenService
      .commonCall(
        this.clinic_id,
        this.startDate,
        this.endDate,
        'chGetProductionMCP'
      )
      .subscribe(
        (res) => {
          this.dentistProductionLoader = false;
          if (res.status == 200 && res.body.data) {
            this.dentistProduction = Math.round(res.body.data[0].production);
            this.dentistProductionTa = Math.round(
              res.body.data_ta[0].production
            );
            this.dentistProductionDiff = Math.round(
              this.dentistProduction - this.dentistProductionTa
            );
          }
        },
        (error) => {
          $('.ajax-loader').hide();
          this.toastr.error(
            'There was an error retrieving your report data, please contact our support team.'
          );
        }
      );
  }

  public dentistHourlyRate: any = 0;
  public dentistHourlyRateTa: any = 0;
  public dentistHourlyRateDiff: any = 0;
  public dentistHourlyRateLoader: boolean = true;
  public chGetHourlyRateMCP() {
    // Total Vists top Card
    this.dentistHourlyRateLoader = true;
    this.healthscreenService
      .commonCall(
        this.clinic_id,
        this.startDate,
        this.endDate,
        'chGetHourlyRateMCP'
      )
      .subscribe(
        (res) => {
          this.dentistHourlyRateLoader = false;
          if (res.status == 200 && res.body.data) {
            this.dentistHourlyRate = Math.round(res.body.data[0].hourly_rate);
            this.dentistHourlyRateTa = Math.round(
              res.body.data_ta[0].hourly_rate
            );
            this.dentistHourlyRateDiff = Math.round(
              this.dentistHourlyRate - this.dentistHourlyRateTa
            );
          }
        },
        (error) => {
          $('.ajax-loader').hide();
          this.toastr.error(
            'There was an error retrieving your report data, please contact our support team.'
          );
        }
      );
  }

  public chGetDetistProdHorate() {
    // Total Vists top Card
    this.dentistHourlyRateLoader = true;
    this.dentistProductionLoader = true;
    this.healthscreenService
      .commonCall(
        this.clinic_id,
        this.startDate,
        this.endDate,
        'chGetProduHrRate'
      )
      .subscribe(
        (res) => {
          this.dentistHourlyRateLoader = false;
          this.dentistProductionLoader = false;
          if (res.status == 200 && res.body.data) {
            this.dentistProduction = Math.round(res.body.data.production);
            this.dentistProductionTa = Math.round(res.body.data.production_ta);
            this.dentistProductionDiff = Math.round(
              this.dentistProduction - this.dentistProductionTa
            );

            this.dentistHourlyRate = Math.round(res.body.data.hourly_rate);
            this.dentistHourlyRateTa = Math.round(res.body.data.hourly_rate_ta);
            this.dentistHourlyRateDiff = Math.round(
              this.dentistHourlyRate - this.dentistHourlyRateTa
            );
          }
        },
        (error) => {
          $('.ajax-loader').hide();
          this.toastr.error(
            'There was an error retrieving your report data, please contact our support team.'
          );
        }
      );
  }

  public chGetDetistReappRate() {
    // Total Vists top Card
    this.dentistReappointRateLoader = true;
    this.healthscreenService
      .commonCall(
        this.clinic_id,
        this.startDate,
        this.endDate,
        'chGetReappointmentRate'
      )
      .subscribe(
        (res) => {
          this.dentistReappointRateLoader = false;
          if (res.status == 200 && res.body.data) {
            this.dentistReappointRate = Math.round(
              res.body.data.reappoint_rate
            );
            this.dentistReappointRateTa = Math.round(
              res.body.data.reappoint_rate_ta
            );
            this.dentistReappointRateDiff = Math.round(
              this.dentistReappointRate - this.dentistReappointRateTa
            );
          }
        },
        (error) => {
          $('.ajax-loader').hide();
          this.toastr.error(
            'There was an error retrieving your report data, please contact our support team.'
          );
        }
      );
  }

  public dentistReappointRate: any = 0;
  public dentistReappointRateTa: any = 0;
  public dentistReappointRateDiff: any = 0;
  public dentistReappointRateLoader: boolean = true;
  public chGetReappointRateMCP() {
    // Total Vists top Card
    this.dentistReappointRateLoader = true;
    this.healthscreenService
      .commonCall(
        this.clinic_id,
        this.startDate,
        this.endDate,
        'chGetReappointRateMCP'
      )
      .subscribe(
        (res) => {
          this.dentistReappointRateLoader = false;
          if (res.status == 200 && res.body.data) {
            this.dentistReappointRate = Math.round(
              res.body.data[0].reappoint_rate
            );
            this.dentistReappointRateTa = Math.round(
              res.body.data_ta[0].reappoint_rate
            );
            this.dentistReappointRateDiff = Math.round(
              this.dentistReappointRate - this.dentistReappointRateTa
            );
          }
        },
        (error) => {
          $('.ajax-loader').hide();
          this.toastr.error(
            'There was an error retrieving your report data, please contact our support team.'
          );
        }
      );
  }

  /* functions for dentist login only */

  public chPrebookedVisits() {
    //Prebooked Visits graph in bottom
    var date = new Date();
    var startDate = this.datePipe.transform(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      'yyyy-MM-dd'
    );
    var endDate = this.datePipe.transform(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7),
      'yyyy-MM-dd'
    );
    this.visits_f = 0;
    this.healthscreenService
      .commonCall(this.clinic_id, startDate, endDate, 'chPrebookedVisits')
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.prebookedvisitchart = true;
            this.visits_f = res.body.data;
          }
        },
        (error) => {
          $('.ajax-loader').hide();
          if (this.user_type != '7') {
            this.toastr.error(
              'There was an error retrieving your report data, please contact our support team.'
            );
          }
        }
      );
  }

  public chUtilisationRate() {
    //Utilisation Rate graph in bottom
    var date = new Date();
    var startDate = this.datePipe.transform(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      'yyyy-MM-dd'
    );
    var endDate = this.datePipe.transform(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7),
      'yyyy-MM-dd'
    );
    this.utilisation_rate_f = 0;
    this.healthscreenService
      .commonCall(this.clinic_id, startDate, endDate, 'chUtilisationRate')
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.chairutilrate = true;
            this.utilisation_rate_f = Math.round(res.body.data);
          }
        },
        (error) => {
          $('.ajax-loader').hide();
          if (this.user_type != '7') {
            this.toastr.error(
              'There was an error retrieving your report data, please contact our support team.'
            );
          }
        }
      );
  }

  public chUnscheduledProd() {
    //Unscheduled Production graph in bottom
    var date = new Date();
    var startDate = this.datePipe.transform(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      'yyyy-MM-dd'
    );
    var endDate = this.datePipe.transform(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7),
      'yyyy-MM-dd'
    );
    this.unscheduled_production_f = 0;
    this.healthscreenService
      .commonCall(this.clinic_id, startDate, endDate, 'chUnscheduledProd')
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.unscheduledproduction = true;
            let value =
              res.body.data >= 1000 ? res.body.data / 1000 : res.body.data;
            this.unscheduled_production_f = Math.round(value);
          }
        },
        (error) => {
          $('.ajax-loader').hide();
          if (this.user_type != '7') {
            this.toastr.error(
              'There was an error retrieving your report data, please contact our support team.'
            );
          }
        }
      );
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
    this.healthscreenService
      .hourlyRateChart(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.user_type,
        this.childid
      )
      .subscribe(
        (res) => {
          this.hourlyRateChartData = [];
          if (res.status == 200) {
            this.hourlyRateChartData = res.body.data;
            this.hoursrateleaders = true;
          }
        },
        (error) => {
          this.warningMessage = 'Please Provide Valid Inputs!';
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

    this.healthscreenService
      .mkNewPatientsByReferral(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration
      )
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.newPatientsTimeData = res.body.data;
            this.refreralleaders = true;
          }
        },
        (error) => {
          this.warningMessage = 'Please Provide Valid Inputs!';
        }
      );
  }
  getChartsTips() {
    this.chartstipsService.getCharts(6, this.clinic_id).subscribe(
      {
        next: (res) => {
          this.charTips = res.data;
        },
        error: (error) => {}
      }

    );
  }
}
