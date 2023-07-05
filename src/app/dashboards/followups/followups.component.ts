import * as $ from 'jquery';
import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ChartService } from '../chart.service';
import { FollowupsService } from './followups.service';
import { ChartstipsService } from '../../shared/chartstips.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ChartOptions } from 'chart.js';
@Component({
  templateUrl: './followups.component.html',
  styleUrls: ['./followups.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FollowupsComponent implements AfterViewInit {
  public trendText;
  public currentText;
  public goalCount = 1;
  public startDate: any;
  public endDate: any;
  public duration: any;
  public trendValue: any = '';
  public Apirequest: any = 0;
  public showTrend: boolean = false;
  public toggleChecked: boolean = false;
  public showGoals: boolean = false;
  public barChartColors: Array<any>;
  public colors: any = [
    { backgroundColor: '#39acac' },
    { backgroundColor: '#48daba' }
  ];
  public colorScheme = {
    domain: [
      '#6edbba',
      '#abb3ff',
      '#b0fffa',
      '#ffb4b5',
      '#d7f8ef',
      '#fffdac',
      '#fef0b8',
      '#4ccfae'
    ]
  };
  public single = [];
  public arcWidth = 0.75;
  public foregroundColor = '#39acac';
  public backgroundColor = '#f4f0fa';
  public user_type: string = '';
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
    { data: [], label: 'Ticks' },
    { data: [], label: 'Post Op' },
    { data: [], label: 'Recall' },
    { data: [], label: 'Ftas' }
  ];
  public clinic_id: any;
  public stackedChartOptions: ChartOptions = {
    hover: {
      mode: null
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7
      }
    },
    // curvature: 1,
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      x: 
        {
          stacked: true,
          ticks: {
            autoSkip: false
          }
        }
      ,
      y: 
        {
          stacked: true,
          ticks: {
            callback: function (label: number, index, labels) {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return label;
              }
            }
          }
        }
      
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        ...this.legendLabelOptions
      },
      tooltip: {
        mode: 'x',
        callbacks: {
          label: function (tooltipItems) {
            if (
              parseInt(tooltipItems.formattedValue) > 0 &&
              tooltipItems.dataset.label != ''
            ) {
              if (
                tooltipItems.dataset.label.indexOf(
                  'DentistMode-'
                ) >= 0
              ) {
                return tooltipItems.label + ': ' + tooltipItems.formattedValue;
              } else {
                return (
                  tooltipItems.dataset.label +
                  ': ' +
                  tooltipItems.formattedValue
                );
              }
            }
          },
          title: function (tooltip) {
            let total = 0;
            tooltip.forEach((val) => {
              total = total + parseInt(val.formattedValue);
            });
            if (tooltip[0].dataset.label.indexOf('DentistMode-') >= 0) {
              var dentist = tooltip[0].dataset.label.split('Mode-');
              return dentist[1] + ':' + total;
            } else {
              return tooltip[0].label + ': ' + total;
            }
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

  public barChartOptions: ChartOptions<'bar'> = {
    // borderRadius: 50,
    hover: { mode: null },
    // scaleShowVerticalLines: false,
    // cornerRadius: 60,
    // curvature: 1,
    animation: {
      duration: 1500,
      easing: 'easeOutSine'
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: 
        {
          grid: {
            display: true
          },
          ticks: {
            autoSkip: false,
          }
        }
      ,
      y: 
        {
          suggestedMin: 0,
          ticks: {
            
            callback: (label: number, index, labels) => {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return this.decimalPipe.transform(label);
              }
            }
          },
        }
      
    },
    plugins: {
      tooltip: {
        mode: 'x',
        bodyFont: {
          family: 'Gilroy-Regular'
        },
        cornerRadius: 0,
        callbacks: {
          label: (tooltipItem) => {
            return (
              this.splitName(tooltipItem.label).join(' ') +
              ': ' +
              this.decimalPipe.transform(tooltipItem.formattedValue)
            );
          },
          title: function () {
            return '';
          }
        }
      }
    },

  };

  public barChartOptions1: ChartOptions<'bar'> = {
    // borderRadius: 50,
    hover: { mode: null },
    // scaleShowVerticalLines: false,
    // cornerRadius: 60,
    // curvature: 1,
    animation: {
      duration: 1500,
      easing: 'easeOutSine'
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: 
        {
          grid: {
            display: true
          },
          ticks: {
            autoSkip: false,
          }
        }
      ,
      y: 
        {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            callback: (label: number, index, labels) => {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return this.decimalPipe.transform(label) + '%';
              }
            }
          },
        }
      
    },
    plugins: {
      tooltip: {
        mode: 'x',
        bodyFont: {
          family: 'Gilroy-Regular'
        },
        cornerRadius: 0,
        callbacks: {
          label: (tooltipItem) => {
            return (
              this.splitName(tooltipItem.label).join(' ') +
              ': ' +
              this.decimalPipe.transform(tooltipItem.formattedValue) +
              '%'
            );
          },
          title: function () {
            return '';
          }
        }
      }
    },
  };

  constructor(
    private datePipe: DatePipe,
    private chartService: ChartService,
    private decimalPipe: DecimalPipe,
    private followupsService: FollowupsService,
    public chartstipsService: ChartstipsService,
    public router: Router,
    private _cookieService: CookieService
  ) {
    this.user_type = this._cookieService.get('user_type');
    // this.getChartsTips();
  }

  ngAfterViewInit() {
    $('#title').html('<span>Follow Ups</span>');
    $(document).on('click', function (e) {
      if ($(document.activeElement).attr('id') == 'sa_datepicker') {
        $('.customRange').show();
      } else if ($(document.activeElement).attr('id') == 'customRange') {
        $('.customRange').show();
      } else {
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
      $('#sa_datepicker').val(
        this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate)
      );
      this.getChartsTips();
    }
  }

  pieTooltipText({ data, index }) {
    const labl = data.name.split('--');
    const label = labl[0].charAt(0).toUpperCase() + labl[0].slice(1);
    const val = data.value;
    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val"> ${val}%</span>
    `;
  }

  pieLabelText(labels) {
    const labl = labels.split('--');
    return labl[0].charAt(0).toUpperCase() + labl[0].slice(1);
  }

  choosedDate(val) {
    val = val.chosenLabel;
    var val = val.toString().split(' - ');
    this.startDate = this.datePipe.transform(val[0], 'dd-MM-yyyy');
    this.endDate = this.datePipe.transform(val[1], 'dd-MM-yyyy');
    this.duration = 'custom';
    $('.customRange').css('display', 'none');
  }

  formatDate(date) {
    if (date) {
      var dateArray = date.split('-');
      const d = new Date();
      d.setFullYear(+dateArray[2], +dateArray[1] - 1, +dateArray[0]);
      const formattedDate = this.datePipe.transform(d, 'dd MMM yyyy');
      return formattedDate;
    } else return date;
  }

  filterDate(duration) {
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_off').addClass('mat-button-toggle-checked');
    $('.customRange').css('display', 'none');
    this.showTrend = false;
    if (duration == 'm') {
      this.showGoals = true;
      this.goalCount = 1;
      this.trendText = 'Last Month';
      this.currentText = 'This Month';
      var date = new Date();
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth(), 1),
        'dd-MM-yyyy'
      );
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.duration = 'm';
    } else if (duration == 'lm') {
      this.showGoals = true;
      this.goalCount = 1;
      this.trendText = 'Previous Month';
      this.currentText = 'Last Month';
      const date = new Date();
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth() - 1, 1),
        'dd-MM-yyyy'
      );
      this.endDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth(), 0),
        'dd-MM-yyyy'
      );
      this.duration = 'lm';
    } else if (duration == 'q') {
      this.showGoals = false;
      this.goalCount = 3;
      this.trendText = 'Last Quarter';
      this.currentText = 'This Quarter';
      const now = new Date();
      var cmonth = now.getMonth() + 1;
      var cyear = now.getFullYear();
      if (cmonth >= 1 && cmonth <= 3) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 0, 1),
          'dd-MM-yyyy'
        );
      } else if (cmonth >= 4 && cmonth <= 6) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 3, 1),
          'dd-MM-yyyy'
        );
      } else if (cmonth >= 7 && cmonth <= 9) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 6, 1),
          'dd-MM-yyyy'
        );
      } else if (cmonth >= 10 && cmonth <= 12) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 9, 1),
          'dd-MM-yyyy'
        );
      }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.duration = 'q';
    } else if (duration == 'lq') {
      this.showGoals = false;
      this.goalCount = 3;
      this.trendText = 'Previous Quarter';
      this.currentText = 'Last Quarter';
      const now = new Date();
      var cmonth = now.getMonth() + 1;
      var cyear = now.getFullYear();
      if (cmonth >= 1 && cmonth <= 3) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear() - 1, 9, 1),
          'dd-MM-yyyy'
        );
        this.endDate = this.datePipe.transform(
          new Date(now.getFullYear() - 1, 12, 0),
          'dd-MM-yyyy'
        );
      } else if (cmonth >= 4 && cmonth <= 6) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 0, 1),
          'dd-MM-yyyy'
        );
        this.endDate = this.datePipe.transform(
          new Date(now.getFullYear(), 3, 0),
          'dd-MM-yyyy'
        );
      } else if (cmonth >= 7 && cmonth <= 9) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 3, 1),
          'dd-MM-yyyy'
        );
        this.endDate = this.datePipe.transform(
          new Date(now.getFullYear(), 6, 0),
          'dd-MM-yyyy'
        );
      } else if (cmonth >= 10 && cmonth <= 12) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 6, 1),
          'dd-MM-yyyy'
        );
        this.endDate = this.datePipe.transform(
          new Date(now.getFullYear(), 9, 0),
          'dd-MM-yyyy'
        );
      }
      this.duration = 'lq';
    } else if (duration == 'cytd') {
      this.showGoals = false;
      this.trendText = 'Last Year';
      this.currentText = 'This Year';
      var date = new Date();
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear(), 0, 1),
        'dd-MM-yyyy'
      );
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      var difMonths =
        new Date().getMonth() - new Date(date.getFullYear(), 0, 1).getMonth();
      this.goalCount = difMonths + 1;
      this.duration = 'cytd';
    } else if (duration == 'lcytd') {
      this.showGoals = false;
      this.trendText = 'Previous Year';
      this.currentText = 'Last Year';
      this.duration = 'lcytd';
      var date = new Date();
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear() - 1, 0, 1),
        'dd-MM-yyyy'
      );
      this.endDate = this.datePipe.transform(
        new Date(date.getFullYear() - 1, 11, 31),
        'dd-MM-yyyy'
      );
      this.goalCount = 12;
    } else if (duration == 'fytd') {
      this.showGoals = false;
      this.trendText = 'Last Financial Year';
      this.currentText = 'This Financial Year';
      var date = new Date();
      if (date.getMonth() + 1 <= 6) {
        this.startDate = this.datePipe.transform(
          new Date(date.getFullYear() - 1, 6, 1),
          'dd-MM-yyyy'
        );
      } else {
        this.startDate = this.datePipe.transform(
          new Date(date.getFullYear(), 6, 1),
          'dd-MM-yyyy'
        );
      }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

      if (date.getMonth() + 1 <= 6) {
        this.goalCount = this.monthDiff(
          new Date(date.getFullYear() - 1, 6, 1),
          new Date()
        );
      } else {
        this.goalCount = this.monthDiff(
          new Date(date.getFullYear(), 6, 1),
          new Date()
        );
      }
      this.duration = 'fytd';
    } else if (duration == 'lfytd') {
      this.showGoals = false;
      this.trendText = 'Previous Financial Year';
      this.currentText = 'Last Financial Year';
      this.duration = 'lfytd';
      this.goalCount = 12;
      var date = new Date();
      if (date.getMonth() + 1 <= 6) {
        this.startDate = this.datePipe.transform(
          new Date(date.getFullYear() - 2, 6, 1),
          'dd-MM-yyyy'
        );
      } else {
        this.startDate = this.datePipe.transform(
          new Date(date.getFullYear() - 1, 6, 1),
          'dd-MM-yyyy'
        );
      }
      if (date.getMonth() + 1 <= 6) {
        this.endDate = this.datePipe.transform(
          new Date(date.getFullYear() - 1, 5, 30),
          'dd-MM-yyyy'
        );
      } else {
        this.endDate = this.datePipe.transform(
          new Date(date.getFullYear(), 5, 30),
          'dd-MM-yyyy'
        );
      }
      /*    this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');       */
    } else if (duration == 'custom') {
      this.trendText = '';
      this.duration = 'custom';
      this.currentText = '';
      let selectedDate = this.chartService.customSelectedDate$.value;
      this.startDate = this.datePipe.transform(
        selectedDate.startDate,
        'dd-MM-yyyy'
      );
      this.endDate = this.datePipe.transform(
        selectedDate.endDate,
        'dd-MM-yyyy'
      );
      var selectedMonth = this.datePipe.transform(selectedDate.startDate, 'M');
      var selectedYear = this.datePipe.transform(
        selectedDate.startDate,
        'yyyy'
      );
      var selectedStartDate = this.datePipe.transform(
        selectedDate.startDate,
        'd'
      );
      var selectedEndDate = this.datePipe.transform(selectedDate.endDate, 'd');
      var LastDay = new Date(
        parseInt(selectedYear),
        parseInt(selectedMonth),
        0
      ).getDate();
      if (
        parseInt(selectedStartDate) == 1 &&
        parseInt(selectedEndDate) == LastDay
      ) {
        this.showGoals = true;
      } else {
        this.showGoals = false;
      }
      // $('.customRange').css('display','block');
    }
    $('.filter').removeClass('active');
    $('.filter_' + duration).addClass('active');
    $('#sa_datepicker').val(
      this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate)
    );
    this.getConversion();
    this.getCompletionRate();
    this.getFollowupOutcome();
    this.getConversionPerUser();
    this.getFollowupsPerUser();
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
    $('.target_' + val).addClass('mat-button-toggle-checked');
    $('.filter').removeClass('active');
    this.Apirequest = 0;
    var date = new Date();
    this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    if (val == 'current') {
      this.toggleChecked = true;
      this.trendValue = 'c';
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear() - 1, date.getMonth(), 1),
        'dd-MM-yyyy'
      );
      this.showsTrend();
    } else if (val == 'historic') {
      this.toggleChecked = true;
      this.trendValue = 'h';
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear() - 10, date.getMonth(), 1),
        'dd-MM-yyyy'
      );
      this.showsTrend();
    } else if (val == 'off') {
      this.showTrend = false;
    }
  }

  showsTrend() {
    this.Apirequest = 1;
    this.showTrend = true;
    /***** Call Trend Function*********/
    /***** Call Trend Function*********/
  }

  public perUserLabels: any = [];
  public perUserTotal: any = 10;
  public perUserPrev: any = 20;
  //public perUserGoal:any = 0;
  public perUserStatus: any = 'up';
  public perUserLoader: boolean = false;

  public perUserData1: any = [];
  public perUserData2: any = [];
  public perUserData3: any = [];
  public perUserData4: any = [];
  public perUserData5: any = [];

  getFollowupsPerUser() {
    this.perUserLoader = true;
    this.followupsService
      .getFollowupsPerUser(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration
      )
      .subscribe(
        (res) => {
          this.perUserData = [
            { data: [], label: 'Ticks' },
            { data: [], label: 'Post Op' },
            { data: [], label: 'Recall' },
            { data: [], label: 'Ftas' },
            { data: [], label: 'Utas' }
          ];
          this.perUserData1 = [];
          this.perUserData2 = [];
          this.perUserData3 = [];
          this.perUserData4 = [];
          this.perUserData5 = [];
          this.perUserLoader = false;
          this.perUserLabels = [];
          this.perUserTotal = 0;
          this.perUserPrev = 0;
          if (res.status == 200) {
            var allData = [];
            res.body.data.forEach((response) => {
              this.perUserData1.push(response.num_ticks);
              this.perUserData2.push(response.num_postop);
              this.perUserData3.push(response.num_recall);
              this.perUserData4.push(response.num_ftas);
              this.perUserData5.push(response.num_utas);
              this.perUserLabels.push(response.completed_by);
            });
            this.perUserData[0]['data'] = this.perUserData1;
            this.perUserData[1]['data'] = this.perUserData2;
            this.perUserData[2]['data'] = this.perUserData3;
            this.perUserData[3]['data'] = this.perUserData4;
            this.perUserData[4]['data'] = this.perUserData5;
            this.perUserTotal = res.body.total;
            this.perUserPrev = res.body.total_ta;
            this.perUserStatus = 'up';
            if (this.perUserPrev > this.perUserTotal) {
              this.perUserStatus = 'down';
            }
          }
        },
        (error) => {
          this.perUserLoader = false;
          this.handleUnAuthorization();
        }
      );
  }
  public outcomeType: any = '1';
  public outcomePrev: any = 0;
  public outcomeTotal: any = 0;
  public outcomeStatus: any = 'up';
  public outcomeLoader: boolean = false;
  public singleTick = [];
  public singleRecall = [];
  public singleFta = [];
  public singleUta = [];

  getFollowupOutcome() {
    this.outcomeLoader = true;
    this.followupsService
      .getFollowupOutcome(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration
      )
      .subscribe(
        (res) => {
          this.outcomeLoader = false;
          this.singleTick = [];
          this.singleRecall = [];
          this.singleFta = [];
          this.singleUta = [];
          this.outcomeTotal = 0;
          this.outcomePrev = 0;
          if (res.status == 200) {
            this.outcomeTotal = res.body.total;
            this.outcomePrev = res.body.total_ta;
            /****** Tick ******/
            if (typeof res.body.data.ticks != 'undefined') {
              res.body.data.ticks.forEach((response) => {
                if (response.status) {
                  var temp = {
                    name: response.status,
                    value: response.status_percent
                  };
                  this.singleTick.push(temp);
                }
              });
            }
            /****** Tick ******/
            /****** recalls ******/
            if (typeof res.body.data.recalls != 'undefined') {
              res.body.data.recalls.forEach((response) => {
                if (response.status) {
                  var temp = {
                    name: response.status,
                    value: response.status_percent
                  };
                  this.singleRecall.push(temp);
                }
              });
            }
            /****** recalls ******/
            /****** ftas ******/
            if (typeof res.body.data.utas != 'undefined') {
              res.body.data.utas.forEach((response) => {
                if (
                  response.status &&
                  response.status_percent > 0 &&
                  response.status_percent != null
                ) {
                  var temp = {
                    name: response.status,
                    value: response.status_percent
                  };
                  this.singleUta.push(temp);
                }
              });
            }
            if (typeof res.body.data.ftas != 'undefined') {
              res.body.data.ftas.forEach((response) => {
                if (response.status) {
                  var temp = {
                    name: response.status,
                    value: response.status_percent
                  };
                  this.singleFta.push(temp);
                }
              });
            }
            /****** ftas ******/
            this.outcomeStatus = 'up';
            if (this.outcomeTotal < this.outcomePrev) {
              this.outcomeStatus = 'down';
            }
          }
        },
        (error) => {
          this.outcomeLoader = false;
          this.handleUnAuthorization();
        }
      );
  }

  public conversionData: any[] = [];
  public conversionLabels: any = [];
  public conversionTotal: number = 0;
  public conversionGoal: number = 0;
  public conversionPrev: number = 0;
  public conversionStatus: any = 'up';
  public conversionLoader: boolean = true;

  getConversion() {
    this.conversionLoader = true;
    this.followupsService
      .getConversion(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration
      )
      .subscribe(
        (res) => {
          this.conversionData = [{ data: [] }];
          this.conversionLabels = [];
          this.conversionLoader = false;
          if (res.status == 200) {
            var allConversionFtas = [];
            res.body.data.forEach((data) => {
              allConversionFtas.push(Math.round(data.booked_percent));
              this.conversionLabels.push(data.type);
            });
            this.conversionData[0]['data'] = allConversionFtas;
            this.conversionTotal = res.body.total;
            this.conversionPrev = res.body.total_ta;
            this.conversionGoal = res.goals;
          }
          this.conversionStatus = 'up';
          if (this.conversionTotal < this.conversionPrev) {
            this.conversionStatus = 'down';
          }
        },
        (error) => {
          this.conversionLoader = false;
          this.handleUnAuthorization();
        }
      );
  }

  public conversionPerUserDataFta: any[] = [];
  public conversionPerUserLabelsFta: any = [];
  public conversionPerUserTotalFta: number = 0;
  public conversionPerUserPrevFta: number = 0;

  public conversionPerUserDataUta: any[] = [];
  public conversionPerUserLabelsUta: any = [];
  public conversionPerUserTotalUta: number = 0;
  public conversionPerUserPrevUta: number = 0;

  public conversionPerUserDataRecalls: any[] = [];
  public conversionPerUserLabelsRecalls: any = [];
  public conversionPerUserTotalRecalls: number = 0;
  public conversionPerUserPrevRecalls: number = 0;
  public conversionPerUserDataTicks: any[] = [];
  public conversionPerUserLabelsTicks: any = [];
  public conversionPerUserTotalTicks: number = 0;
  public conversionPerUserPrevTicks: number = 0;
  public conversionPerUserStatusTicks: any = 'up';
  public conversionPerUserStatusRecalls: any = 'up';
  public conversionPerUserStatusFta: any = 'up';
  public conversionPerUserStatusUta: any = 'up';
  public conversionPerUserLoader: boolean = true;
  public conversionPerType: string = '1';

  getConversionPerUser() {
    this.conversionPerUserLoader = true;
    this.followupsService
      .getConversionPerUser(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration
      )
      .subscribe(
        (res) => {
          this.conversionPerUserLoader = false;
          this.conversionPerUserDataFta = [{ data: [] }];
          this.conversionPerUserDataUta = [{ data: [] }];
          this.conversionPerUserDataRecalls = [{ data: [] }];
          this.conversionPerUserDataTicks = [{ data: [] }];

          this.conversionPerUserLabelsFta = [];
          this.conversionPerUserLabelsUta = [];
          this.conversionPerUserLabelsRecalls = [];
          this.conversionPerUserLabelsTicks = [];

          this.conversionPerUserTotalFta = 0;
          this.conversionPerUserTotalUta = 0;
          this.conversionPerUserTotalRecalls = 0;
          this.conversionPerUserTotalTicks = 0;

          this.conversionPerUserPrevTicks = 0;
          this.conversionPerUserPrevRecalls = 0;
          this.conversionPerUserPrevFta = 0;
          this.conversionPerUserPrevUta = 0;

          if (res.status == 200) {
            this.conversionPerUserTotalFta = res.body.total_fta;
            this.conversionPerUserTotalUta = res.body.total_uta;
            this.conversionPerUserTotalRecalls = res.body.total_recall;
            this.conversionPerUserTotalTicks = res.body.total_tick;

            this.conversionPerUserPrevTicks = res.body.total_ta_tick;
            this.conversionPerUserPrevRecalls = res.body.total_ta_recall;
            this.conversionPerUserPrevFta = res.body.total_ta_fta;
            this.conversionPerUserPrevUta = res.body.total_ta_uta;

            if (typeof res.body.data.ftas != 'undefined') {
              var allConversionFtas = [];
              res.body.data.ftas.forEach((fta) => {
                allConversionFtas.push(Math.round(fta.booked_percent));
                this.conversionPerUserLabelsFta.push(fta.completed_by);
              });
              this.conversionPerUserDataFta[0]['data'] = allConversionFtas;
            }

            if (typeof res.body.data.utas != 'undefined') {
              var allConversionUtas = [];
              res.body.data.utas.forEach((fta) => {
                allConversionUtas.push(Math.round(fta.booked_percent));
                this.conversionPerUserLabelsUta.push(fta.completed_by);
              });
              this.conversionPerUserDataUta[0]['data'] = allConversionUtas;
            }

            if (typeof res.body.data.recalls != 'undefined') {
              var allConversionrecalls = [];
              res.body.data.recalls.forEach((recalls) => {
                allConversionrecalls.push(Math.round(recalls.booked_percent));
                this.conversionPerUserLabelsRecalls.push(recalls.completed_by);
              });
              this.conversionPerUserDataRecalls[0]['data'] =
                allConversionrecalls;
            }
            if (typeof res.body.data.ticks != 'undefined') {
              var allConversionticks = [];
              res.body.data.ticks.forEach((ticks) => {
                allConversionticks.push(Math.round(ticks.booked_percent));
                this.conversionPerUserLabelsTicks.push(ticks.completed_by);
              });
              this.conversionPerUserDataTicks[0]['data'] = allConversionticks;
            }

            this.conversionPerUserStatusTicks = 'up';
            if (
              this.conversionPerUserTotalTicks < this.conversionPerUserPrevTicks
            ) {
              this.conversionPerUserStatusTicks = 'down';
            }
            this.conversionPerUserStatusRecalls = 'up';
            if (
              this.conversionPerUserTotalRecalls <
              this.conversionPerUserPrevRecalls
            ) {
              this.conversionPerUserStatusRecalls = 'down';
            }
            this.conversionPerUserStatusFta = 'up';
            if (
              this.conversionPerUserTotalFta < this.conversionPerUserPrevFta
            ) {
              this.conversionPerUserStatusFta = 'down';
            }
            this.conversionPerUserStatusUta = 'up';
            if (
              this.conversionPerUserTotalUta < this.conversionPerUserPrevUta
            ) {
              this.conversionPerUserStatusUta = 'down';
            }
            /*var allConversionPerUse = [];
        res.body.data.forEach( (response) => {
           allConversionPerUse.push(response.percentage);
            this.conversionPerUserLabels.push(response.user_name);
        });
        this.conversionPerUserData[0]['data'] = allConversionPerUse;       */
          }
        },
        (error) => {
          this.conversionPerUserLoader = false;
          this.handleUnAuthorization();
        }
      );
  }

  public completionRateData: any = [{ data: [] }];
  public completionRateLabels: any = [];
  public completionRateTotal: number = 0;
  public completionRatePrev: number = 0;
  public completionRateGoal: number = 0;
  public completionRateStatus: any = 'up';
  public completionRateLoader: boolean = true;
  getCompletionRate() {
    this.completionRateLoader = true;
    this.followupsService
      .getCompletionRate(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration
      )
      .subscribe(
        (res) => {
          this.completionRateLoader = false;
          this.completionRateData = [{ data: [] }];
          this.completionRateLabels = [];
          this.completionRateGoal = 0;
          this.completionRateTotal = 0;
          this.completionRatePrev = 0;
          if (res.status == 200) {
            var allCompletionRate = [];
            this.completionRateTotal = res.body.total;
            this.completionRatePrev = res.body.total_ta;
            this.completionRateGoal = res.goals;
            res.body.data.forEach((response) => {
              if (
                parseInt(response.completion_rate) >= 0 &&
                parseInt(response.num_total) > 0
              ) {
                allCompletionRate.push(response.completion_rate);
                this.completionRateLabels.push(response.type);
              }
            });
            this.completionRateData[0]['data'] = allCompletionRate;

            this.completionRateStatus = 'up';
            if (this.completionRateTotal < this.completionRatePrev) {
              this.completionRateStatus = 'down';
            }
          }
        },
        (error) => {
          this.completionRateLoader = false;
          this.handleUnAuthorization();
        }
      );
  }

  public charTips: any = [];
  getChartsTips() {
    this.chartstipsService.getCharts(9, this.clinic_id).subscribe(
      {
        next: (res) => {
          this.charTips = res.data;
        },
        error: (error) => {}
      }
    );
  }

  followupOutcomeTab(number) {
    this.outcomeType = number;
  }
  /*followupConversionTab(number){
    this.conversionType = number;
  }*/
  followupConversionPerTab(number) {
    this.conversionPerType = number;
  }

  handleUnAuthorization() {
    if (this.user_type != '7') {
      this._cookieService.put('username', '');
      this._cookieService.put('email', '');
      this._cookieService.put('userid', '');
      this.router.navigateByUrl('/login');
    }
  }
}
