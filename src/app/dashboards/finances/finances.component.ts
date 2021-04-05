import * as $ from 'jquery';
import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit , ViewChild,ElementRef } from '@angular/core';
import { FinancesService } from './finances.service';
import { DentistService } from '../../dentist/dentist.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router} from "@angular/router";
import { HeaderService } from '../../layouts/full/header/header.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppHeaderrightComponent } from '../../layouts/full/headerright/headerright.component';
import { CookieService } from "ngx-cookie";
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { map, takeUntil } from 'rxjs/operators';
import { ChartService } from '../chart.service';
import { ClinicSettingsService } from '../../clinic-settings/clinic-settings.service';
// import { ClinicSettingsService } from '../../clinic-settings/clinic-settings.service';

export interface Dentist { 
  providerId: string;
  name: string;
}

@Component({
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})

export class FinancesComponent implements AfterViewInit {
    @ViewChild("myCanvas") canvas: ElementRef;
    @ViewChild("myCanvas2") canvas2: ElementRef;

  lineChartColors;
  doughnutChartColors ;
  stackedChartColors;
  stackedChartColorsBar;
  stackedChartColorsBar1;
  public xeroConnect: boolean = false;
  ProdByClinicianColors = [
    { backgroundColor: '#6edbba' },
    { backgroundColor: '#fffcac' },  
    { backgroundColor: '#ffb4c5' },  
    { backgroundColor: '#feefb8' },  
    { backgroundColor: '#d7f8ef' },  
    { backgroundColor: '#b0fffb' },  
    { backgroundColor: '#b0ffga' },  
    { backgroundColor: '#abb3ff' },
    { backgroundColor: '#b0fffa' },
    { backgroundColor: '#ffb4b5' },
    { backgroundColor: '#d7f8ef' },
    { backgroundColor: '#fffdac' },
    { backgroundColor: '#feg0b8' },
    { backgroundColor: '#4cdfae' }  ,
    { backgroundColor: '#6edcba' },
    { backgroundColor: '#ffdcac' },  
    { backgroundColor: '#ffa4c5' },  
    { backgroundColor: '#fecfb8' },  
    { backgroundColor: '#d7d8ef' },  
    { backgroundColor: '#b0dffb' },  
    { backgroundColor: '#b0faga' },     
    { backgroundColor: '#c0fbga' },     
    { backgroundColor: '#b0facb' },     
    { backgroundColor: '#c0ecdb' },     
    { backgroundColor: '#c0ecef' },     
  ]
  preoceedureChartColors;
  subtitle: string;
   public clinic_id:any ={};
   public dentistCount:any ={};
   public netProfitIcon:string ='';
   public netProfitProductionIcon:string ='';
   public netProfitPmsIcon:string ='';

   public netProfitVal:any= 0;
   public netProfitProductionVal:any =0;
   public netProfitPmsVal:any =0;
   public duration='m';
   public predictedChartColors;
   public trendText;
   colorScheme = {
    domain: ['#6edbba', '#abb3ff', '#b0fffa', '#ffb4b5', '#d7f8ef', '#fffdac', '#fef0b8', '#4ccfae']
   };
single = [
];
 dateData: any[];
  dateDataWithRange: any[];
  range = false;
  // options
  gradient = false;
  showLegend = false;
  tooltipDisabled = false;
  innerPadding = 0;
  autoScale = true;
  timeline = false;
  barPadding = 8;
  groupPadding = 0;
  roundDomains = false;
  maxRadius = 20;
  minRadius = 8;
  view = '';
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.65;
  rangeFillOpacity = 0.75;
  pluginObservable$: Observable<PluginServiceGlobalRegistrationAndOptions[]>;
  totalDiscountPluginObservable$: Observable<PluginServiceGlobalRegistrationAndOptions[]>;
  currentOverduePluginObservable$: Observable<PluginServiceGlobalRegistrationAndOptions[]>;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public percentOfProductionCount$ = new BehaviorSubject<number>(99);
  public percentOfTotalDiscount$ = new BehaviorSubject<number>(0);
  public percentOfCurrentOverdue$ = new BehaviorSubject<number>(0);
  chartData1 = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels1 = ['January', 'February', 'Mars', 'April'];
  profitChartTitles = ['Production', 'Net Profit', 'Net Profit %'];
  constructor(
    private toastr: ToastrService,
    private financesService: FinancesService, 
    private dentistService: DentistService, 
    private datePipe: DatePipe, 
    private route: ActivatedRoute,  
    private headerService: HeaderService,
    private _cookieService: CookieService, 
    private router: Router,
    private clinicSettingsService: ClinicSettingsService,
    private chartService: ChartService){
    }

  private warningMessage: string;
   initiate_clinic() {
    var val = $('#currentClinic').attr('cid');
    if(val != undefined && val !='all') {
      this.clinic_id = val;
      this.checkXeroStatus();
      this.getDentists();
      this.filterDate(this.chartService.duration$.value);
   }
  }

  formatDate(date) {
    if(date) {
      var dateArray = date.split("-")
      const d = new Date();
      d.setFullYear(+dateArray[2], (+dateArray[1]-1), +dateArray[0])
      const formattedDate = this.datePipe.transform(d, 'dd MMM yyyy');
      return formattedDate;
    } else return date;
  }

  
  ngAfterViewInit() {
    //plugin for Percentage of Production by Clinician chart
    this.pluginObservable$ = this.percentOfProductionCount$.pipe(
      takeUntil(this.destroyed$),
      map((productionCount) => {
        return this.chartService.beforeDrawChart(productionCount)
      })
    );

    //plugin for Total Discounts chart
    this.totalDiscountPluginObservable$ = this.percentOfTotalDiscount$.pipe(
      takeUntil(this.destroyed$),
      map((discountCount) => {
        return this.chartService.beforeDrawChart(discountCount, true)
      })
    )

    //plugin for Current Overdue chart
    this.currentOverduePluginObservable$ = this.percentOfCurrentOverdue$.pipe(
      takeUntil(this.destroyed$),
      map((overDueCount) => {
        return this.chartService.beforeDrawChart(overDueCount, true)
      })
    )

    $('#currentDentist').attr('did','all');
    this.route.params.subscribe(params => {
      $('.external_clinic').show();
      $('.dentist_dropdown').hide();
      $('.header_filters').removeClass('hide_header');
      $('.header_filters').addClass('flex_direct_mar');
      $('.external_clinic').show();
      $('.external_dentist').show();
      $('#title').html('<span>Finances</span>  <span class="page-title-date">' + this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) + '</span>');
      $(document).on('click', function(e) {
        if ($(document.activeElement).attr('id') == 'sa_datepicker') {
          $('.customRange').show();
        } else if ($(document.activeElement).attr('id') == 'customRange') {
          $('.customRange').show();
        }  else {
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

    this.doughnutChartColors = [{backgroundColor: ['#17a2a6','#82edd8','#2C7294','#3c7cb7','#175088','#1fd6b1','#09b391','#168F7F']}];

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
    let stackedGradient6 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    stackedGradient6.addColorStop(1, 'rgba(22, 82, 141, 0.4)');
    stackedGradient6.addColorStop(0,  'rgba(12, 209,169,0.4)');
    this.stackedChartColorsBar = [
    {
      backgroundColor: stackedGradient6,
      hoverBorderWidth: 2,
      hoverBorderColor: '#1CA49F',
      borderColor: '#1CA49F'
    }];
    let stackedGradient7 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    stackedGradient7.addColorStop(1, 'rgba(94, 232,205,0.8)');
    stackedGradient7.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
    this.stackedChartColorsBar1 = [
    {
      backgroundColor: stackedGradient7,
      hoverBorderWidth: 2,
      hoverBorderColor: '#1CA49F',
      borderColor: '#1CA49F'
    }];
    let proceedureGradient = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
    proceedureGradient.addColorStop(0, 'rgba(22, 82, 141, 0.8)');
    proceedureGradient.addColorStop(1, 'rgba(12, 209,169,0.9)');
    let proceedureGradient1 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    proceedureGradient1.addColorStop(1, 'rgba(12, 209,169,0.8)');
    proceedureGradient1.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
    let proceedureGradient2 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    proceedureGradient2.addColorStop(1, 'rgba(59, 227,193,0.8');
    proceedureGradient2.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
    let proceedureGradient3 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    proceedureGradient3.addColorStop(1, 'rgba(94, 232,205,0.8)');
    proceedureGradient3.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
    let proceedureGradient4 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
    proceedureGradient4.addColorStop(1, 'rgba(148, 240,221,0.8)');
    proceedureGradient4.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
    let proceedureGradient5 = this.canvas2.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
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
  public lineChartOptions: any = { responsive: true };

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
                      let currency = label < 0 ? label.toString().split('-').join('') : label.toString();
                      currency = currency.split(/(?=(?:...)*$)/).join(',');
                      return `${label < 0 ? '- $' : '$'}${currency}`;
                    }
                },
            }, 
            }],
        },legend: {
            display: true
         },
          tooltips: {
            mode: 'x-axis',
            enabled: false,
            custom: function(tooltip) {
            if (!tooltip) return;
            var tooltipEl = document.getElementById('chartjs-tooltip');
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.style.backgroundColor = "#FFFFFF";
              tooltipEl.style.borderColor = "#B2BABB";
              tooltipEl.style.borderWidth = "thin";
              tooltipEl.style.borderStyle = "solid";
              tooltipEl.style.zIndex = "999999";
              tooltipEl.style.backgroundColor = "#000000";
              tooltipEl.style.color = "#FFFFFF";
              document.body.appendChild(tooltipEl);
            }
            if (tooltip.opacity === 0) {
              tooltipEl.style.opacity = "0";
              return;
            } else {
              tooltipEl.style.opacity = "0.8";
            }

             tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltip.yAlign) {
              tooltipEl.classList.add(tooltip.yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }

              function getBody(bodyItem) {
              return bodyItem.lines;
            }
            if (tooltip.body) {
              var titleLines = tooltip.title || [];
              var bodyLines = tooltip.body.map(getBody);
              var innerHtml = '<table><thead>';             
              innerHtml += '</thead><tbody>';
              titleLines.forEach(function (title) {
                innerHtml += '<tr><th style="text-align: left;">' + title + '</th></tr>';
              });
                 bodyLines.forEach(function (body, i) {
                if(!body[0].includes("$0")){
                  innerHtml += '<tr><td style="padding: 0px">'+body[0]+'</td></tr>';
                  }                
              });
              innerHtml += '</tbody></table>';
              tooltipEl.innerHTML = innerHtml;
              //tableRoot.innerHTML = innerHtml;
            }       
        // disable displaying the color box;
            var position = this._chart.canvas.getBoundingClientRect();
            // Display, position, and set styles for font
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = ((position.left + window.pageXOffset + tooltip.caretX) - 20) + 'px';
            tooltipEl.style.top = ((position.top + window.pageYOffset + tooltip.caretY) - 30) + 'px';
            tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
            tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
            tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
            tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
            tooltipEl.style.pointerEvents = 'none';
            tooltip.displayColors = false;
      },
  callbacks: {
     label: function(tooltipItems, data) { 
        let currency = tooltipItems.yLabel.toString();
        currency = currency.split('-').join('').split(/(?=(?:...)*$)/).join(',');
        return data.datasets[tooltipItems.datasetIndex].label + `: ${tooltipItems.yLabel < 0 ? '- $' : '$'}${currency}`;;
     },
     
  }
}
  };


  public labelBarOptionsTC: any = {
    pointHoverBackgroundColor: 'none',
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      xAxes: [{
        stacked: false,
        barPercentage: 0.4,
        gridLines: {
          color: "transparent",
        }
      }],
      yAxes: [{
        stacked: false,
        gridLines: {
          color: "transparent",
        },
        ticks: {
          suggestedMin: 0,
          userCallback: function (label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency = label < 0 ? label.toString().split('-').join('') : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              return `${label < 0 ? '- $' : '$'}${currency}`;
            }
          },
          autoSkip: false
        },
      }],
    },
    legend: {
      display: true
    },
    tooltips: {
      mode: 'x-axis',
      callbacks: {
        label: function (tooltipItems, data) {
          let currency = data['datasets'][0]['data'][tooltipItems['index']].toString();
          // Convert the number to a string and split the string every 3 characters from the end and join comma separator
          currency = currency.split(/(?=(?:...)*$)/).join(',');
          return "$ " + currency;
        },
      }
    }
  };

    public labelBarOptions: any = {
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
            stacked:false,
            ticks: {
                autoSkip: false
            }
            }],
          yAxes: [{ 
            stacked:false,
            ticks: {
              callback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                       let currency = label<0 ? label.toString().split('-').join('') : label.toString();
                      //  if (currency.length > 3) {
                      //    currency = currency.substring(0, 1) + 'K'
                      //  } else{
                          currency = currency.split(/(?=(?:...)*$)/).join(',');
                      //  }
                      
                       return `${label<0 ? '- $' : '$'}${currency}`;
                     }
                 },
            }, 
            }],
        },legend: {
            display: true
         },
          tooltips: {
            mode: 'x-axis',
             custom: function(tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
  callbacks: {
     label: function(tooltipItems, data) { 
        let currency = tooltipItems.yLabel;
        currency = currency.toString().split('-').join('').split(/(?=(?:...)*$)/).join(',');
        return tooltipItems.xLabel + `: ${tooltipItems.yLabel < 0 ? '- $' : '$'}${currency}`;
     },
       title: function(tooltipItem, data) {
          return;
        }
  }
}
  };
  
public labelBarPercentOptions: any = {
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
              userCallback: function(item) {
                  return item+ "%";
                },
            }, 
            }],
        },legend: {
            display: true
         },
  tooltips: {
    mode: 'x-axis',
      custom: function(tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
      callbacks: {
        // use label callback to return the desired label
        label: function(tooltipItem, data) {
          return tooltipItem.xLabel + ": " + tooltipItem.yLabel+"%";
        },
        // remove title
        title: function(tooltipItem, data) {
          return;
        }
      }
    },
  };


    public labelBarPercentOptionsStacked: any = {
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
              userCallback: function(item) {
                  return item+ "%";
                },
            }, 
            }],
        },legend: {
            display: true
         },
     tooltips: {
            mode: 'x-axis',
            enabled: false,
            custom: function(tooltip) {
            if (!tooltip) return;
            var tooltipEl = document.getElementById('chartjs-tooltip');
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.style.backgroundColor = "#FFFFFF";
              tooltipEl.style.borderColor = "#B2BABB";
              tooltipEl.style.borderWidth = "thin";
              tooltipEl.style.borderStyle = "solid";
              tooltipEl.style.zIndex = "999999";
              tooltipEl.style.backgroundColor = "#000000";
              tooltipEl.style.color = "#FFFFFF";
              document.body.appendChild(tooltipEl);
            }
            if (tooltip.opacity === 0) {
              tooltipEl.style.opacity = "0";
              return;
            } else {
              tooltipEl.style.opacity = "0.8";
            }

             tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltip.yAlign) {
              tooltipEl.classList.add(tooltip.yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }

              function getBody(bodyItem) {
              return bodyItem.lines;
            }
            if (tooltip.body) {
              var titleLines = tooltip.title || [];
              var bodyLines = tooltip.body.map(getBody);
              var innerHtml = '<table><thead>';             
              innerHtml += '</thead><tbody>';
              titleLines.forEach(function (title) {
                innerHtml += '<tr><th style="text-align: left;">' + title + '</th></tr>';
              });
                 bodyLines.forEach(function (body, i) {
                if(!body[0].includes("0%")){
                  innerHtml += '<tr><td style="padding: 0px">'+body[0]+'</td></tr>';
                  }                
              });
              innerHtml += '</tbody></table>';
              tooltipEl.innerHTML = innerHtml;
              //tableRoot.innerHTML = innerHtml;
            }       
        // disable displaying the color box;
            var position = this._chart.canvas.getBoundingClientRect();
            // Display, position, and set styles for font
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = ((position.left + window.pageXOffset + tooltip.caretX) - 20) + 'px';
            tooltipEl.style.top = ((position.top + window.pageYOffset + tooltip.caretY) - 30) + 'px';
            tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
            tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
            tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
            tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
            tooltipEl.style.pointerEvents = 'none';
            tooltip.displayColors = false;
      },
  callbacks: {
     label: function(tooltipItems, data) { 
           return data.datasets[tooltipItems.datasetIndex].label+": "+tooltipItems.yLabel+"%";
     },
     
  }
}
  };

  public pieChartOptions: any = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20
        },
        onClick : (event: MouseEvent) => {
            event.stopPropagation();
        }
      },
      elements: {
        center: {
          text: '',
          // sidePadding: 60
        }
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return data['labels'][tooltipItem['index']] + ": " + data['datasets'][0]['data'][tooltipItem['index']] + "%";
          }
        }
      },
  };
  

      public pieChartOptions2: any = {
    responsive: true,
    maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'right',
          labels: {
            usePointStyle: true,
            padding: 20
          },
          onClick: (event: MouseEvent) => {
            event.stopPropagation();
          }
        },
              tooltips: {
  callbacks: {
        label: function(tooltipItem, data,index) { 
          let currency = data['datasets'][0]['data'][tooltipItem['index']].toString();      
          // Convert the number to a string and split the string every 3 characters from the end and join comma separator
          currency = currency.split(/(?=(?:...)*$)/).join(',');          
          return data['labels'][tooltipItem['index']] +": $"+currency;
        } 
  }
}
  };
  public pieChartOptions1: any = {
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
        duration: 1500,
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
               suggestedMin:0
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
                ci.getDatasetMeta(1).hidden = true;
                ci.getDatasetMeta(2).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          }
          else if(index== 1) {
                (<HTMLElement>document.querySelector('.predicted1')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted2')).style.display = 'flex';
                (<HTMLElement>document.querySelector('.predicted3')).style.display = 'none';
                ci.getDatasetMeta(0).hidden = true;
                ci.getDatasetMeta(2).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          } 
          else if(index== 2) {
                (<HTMLElement>document.querySelector('.predicted1')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted2')).style.display = 'none';
                (<HTMLElement>document.querySelector('.predicted3')).style.display = 'flex';
                ci.getDatasetMeta(0).hidden = true;
                ci.getDatasetMeta(1).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          }
          ci.update();
        },
      }     
    };

  public proceedureChartOptions: any = {
    scaleShowVerticalLines: false,
           responsive: true,
    maintainAspectRatio: false,
    barThickness: 10,
        animation: {
          duration: 1500,
          easing: 'easeOutSine'
        },
        scales: {
          xAxes: [{ 
            ticks: {
                  autoSkip: false
              }
            }],
          yAxes: [{  
            ticks: {
            }, 
        }],
      },
      legend: {
        position: 'top',
      },
      tooltips: {
        mode: 'x-axis',
  callbacks: {
    label: function(tooltipItems, data) { 
      return data.datasets[tooltipItems.datasetIndex].label+": $"+tooltipItems.yLabel;
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
  public stackedChartType = 'bar';
  public stackedChartTypeHorizontal = 'horizontalBar';
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
    public lineChartType = 'line';
  public stackedChartData: any[] = [
    {data: [], label: 'Crowns',  shadowOffsetX: 3,
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
    {data: [], label: 'Splints ' ,  shadowOffsetX: 3,
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
    {data: [], label: 'Root Canals' ,  shadowOffsetX: 3,
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
    {data: [], label: 'Perio Charts' ,  shadowOffsetX: 3,
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
    {data: [], label: 'Surgical Extractions' ,  shadowOffsetX: 3,
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
            backgroundOverlayMode: 'multiply'}  ];

  public stackedChartData1: any[] = [];
  public stackedChartData2: any[] = [];
  public stackedChartData3: any[] = [];
  public stackedChartData4: any[] = [];
  public stackedChartData5: any[] = [];

  public predictedChartData: any[] = [
    {data: [], label: 'Crown to Large Filling',  shadowOffsetX: 3,
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
    {data: [], label: 'Extraction to RCT',hidden: true,  shadowOffsetX: 3,
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
    {data: [], label: 'RCT Conversion',hidden: true,  shadowOffsetX: 3,
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

  public pieChartTotal = 0;

  // Pie
  public pieChartLabels: string[] = [
  ];
  public pieChartData: number[] = [];
  public pieChartType = 'doughnut';
  public pieChartDatares: number[] = [];

  public pieChartLabelsres: string[] = [
  ];

  public productionChartTotal = 0;

  // production
  public productionChartLabels: string[] = [
  ];
  public productionChartData: number[] = [];
  public productionChartType = 'doughnut';
  public productionChartDatares: number[] = [];

  public productionChartLabelsres: string[] = [
  ];
   public totalDiscountChartTotal = 0;

  // totalDiscount
  public totalDiscountChartLabels: string[] = [
  ];
  public totalDiscountChartData: number[] = [];
  public totalDiscountChartType = 'doughnut';
  public totalDiscountChartDatares: number[] = [];

  public totalDiscountChartLabelsres: string[] = [
  ];

   public totalOverdueAccount = 0;

  public totalOverdueAccountLabels: string[] = [
  ];
  public totalOverdueAccountData: number[] = [];
  public totalOverdueAccountres: number[] = [];

  public totalOverdueAccountLabelsres: string[] = [];

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
    
  }

  public chartHovered(e: any): void {
    
  }
  public  gaugeType = "arch";
  public  gaugeValue = '';
  public  totalProductionLabel = "";
  public  gaugeThick = "20";
  public  foregroundColor= "#4ccfae";
  public  foregroundColor2= "#4ccfae";
  public  backgroundColor = '#f4f0fa';
  public  cap= "round";
  public  size = "250"
  public  totalProductionVal:any = 10;
  public  gaugeValuePredicted1 = 0;
  public  gaugeValuePredicted = 0;

  public  gaugeValuePredicted2 = 0;

  public  gaugeValuePredicted3 = 0;
  public  gaugeLabelPredicted = "";
  public predictedDentistTotal = 0;
  public gaugePrependText ='$';
  public startDate ='';
  public endDate = '';
  public collectionAppend ='%';

  public  collectionPercentage = 0;
  public  productionVal = 0;

  public  collectionVal = 0;



  

  loadDentist(newValue) {

    $('#title').html('<span>Finances</span> <span class="page-title-date">' + this.formatDate(this.startDate)  + ' - ' + this.formatDate(this.endDate) +'</span>');
  if(newValue == 'all') {
    $(".trend_toggle").hide();
    this.finTotalProduction();

    //this.netProfit();
   // this.netProfitPercent();
    this.netProfitPms();
    this.categoryExpenses();
    this.finProductionByClinician();
    this.finTotalDiscounts();
    this.finOverdueAccounts();

   // this.finCollection();
    this.finProductionPerVisit();
/*
    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'block';

    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'block';*/
  }
  else {
    $(".trendToggle").show();
    this.selectedDentist = newValue;
 //   this.buildChartDentist();
    (<HTMLElement>document.querySelector('.itemsPredictorSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.itemsPredictor')).style.display = 'none';

  //  this.buildChartPredictorDentist();
    (<HTMLElement>document.querySelector('.ratioPredictorSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.ratioPredictor')).style.display = 'none';

 //   this.buildChartProceedureDentist();
    (<HTMLElement>document.querySelector('.revenueProceedureSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.revenueProceedure')).style.display = 'none';
 //   this.buildChartReferralDentist();
/*    this.buildChartTreatmentDentist();
    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'none';

    this.buildChartNopatientsDentist();
    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'none';*/
  }

  }

public netProfitTrendIcon;
public netProfitTrendTotal;
  //netProfit
  private netProfit() {

    var user_id;
    var clinic_id;
           this.netProfitTrendIcon = "down";
           this.netProfitTrendTotal=0;
  this.financesService.NetProfit(this.clinic_id,this.startDate,this.endDate, this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.netProfitVal = data.data.total_net_profit;   
        this.netProfitTrendTotal=data.data.total_net_profit_ta;  
        if(this.netProfitVal>=0)
        this.netProfitIcon = "";
        else
        this.netProfitIcon = "-";
             
        this.netProfitVal = this.netProfitVal; 
        // console.log(this.netProfitVal,this.netProfitTrendTotal);
      if(this.netProfitVal>=this.netProfitTrendTotal)
            this.netProfitTrendIcon = "up"; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  public netProfitProductionTrendIcon;
 public  netProfitProductionTrendTotal;
    //netProfit
  private netProfitPercent() {

    var user_id;
    var clinic_id;
    this.netProfitProductionTrendIcon = "down";
           this.netProfitProductionTrendTotal=0;
  this.financesService.NetProfitPercent(this.clinic_id,this.startDate,this.endDate, this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.netProfitProductionVal = data.data;  
        this.netProfitProductionTrendTotal=data.data_ta;  

        if(this.netProfitProductionVal>=0)
        this.netProfitProductionIcon = "";
        else
        this.netProfitProductionIcon = "-";
        this.netProfitProductionVal =data.data;    
        if(this.netProfitProductionVal>=this.netProfitProductionTrendTotal)
            this.netProfitProductionTrendIcon = "up"; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

public netProfitPmsTrendIcon;
public netProfitPmsTrendTotal;
    //netProfit
  private netProfitPms() {

    var user_id;
    var clinic_id;
 this.netProfitPmsTrendIcon = "down";
           this.netProfitPmsTrendTotal=0;
           this.netProfitProductionTrendIcon = "down";
           this.netProfitProductionTrendTotal=0;
               var clinic_id;
           this.netProfitTrendIcon = "down";
           this.netProfitTrendTotal=0;
  this.financesService.NetProfitPms(this.clinic_id,this.startDate,this.endDate, this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.netProfitPmsVal = Math.round(data.data.net_profit_pms); 
        this.netProfitPmsTrendTotal=Math.round(data.data_ta.net_profit_pms);  

        if(this.netProfitPmsVal>=0)
        this.netProfitPmsIcon = "";
        else
        this.netProfitPmsIcon = "-";
        this.netProfitPmsVal = Math.round(data.data.net_profit_pms);
         if(this.netProfitPmsVal>=this.netProfitPmsTrendTotal)
            this.netProfitPmsTrendIcon = "up";      

       this.netProfitVal = Math.round(data.data.net_profit);   
        this.netProfitTrendTotal=Math.round(data.data_ta.net_profit);  
        if(this.netProfitVal>=0)
        this.netProfitIcon = "";
        else
        this.netProfitIcon = "-";
             
        this.netProfitVal = Math.round(this.netProfitVal); 
      if(this.netProfitVal>=this.netProfitTrendTotal)
            this.netProfitTrendIcon = "up";     

        this.netProfitProductionVal = Math.round(data.data.net_profit_production);  
        this.netProfitProductionTrendTotal=Math.round(data.data_ta.net_profit_production);  

        if(this.netProfitProductionVal>=0)
        this.netProfitProductionIcon = "";
        else
        this.netProfitProductionIcon = "-";
        if(this.netProfitProductionVal>=this.netProfitProductionTrendTotal)
            this.netProfitProductionTrendIcon = "up";       
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }
 pieTooltipText({ data }) {
    const label = data.name;
    const val = data.value;

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val"> ${val}%</span>
    `;
  }
    public expensescChartTrendIcon;
  public expensescChartTrendTotal;
  public pieChartDataPercentres;
public categoryExpensesLoader:any;

      //expenses
  private categoryExpenses() {
        this.categoryExpensesLoader = true;
        var user_id;
        var clinic_id;
           this.expensescChartTrendIcon = "down";
           this.expensescChartTrendTotal=0;
  this.financesService.categoryExpenses(this.clinic_id,this.startDate,this.endDate, this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.categoryExpensesLoader = false;        
        this.pieChartLabels = [];
        this.pieChartLabelsres=[];
        this.single =[];
         this.pieChartDatares = [];
         this.pieChartDataPercentres =[];
          data.data.forEach((res,key) => {
          var temp= {name:'',value:1};
          temp.name =res.meta_key;
          temp.value =res.expenses;  

          this.single.push(temp);
          this.single[key].value =Math.round(res.expenses_percent);  

           this.pieChartDatares.push(Math.round(res.expenses));

           this.pieChartDataPercentres.push(Math.round(res.expenses_percent));
           this.pieChartLabelsres.push(res.meta_key);
           this.pieChartTotal = this.pieChartTotal + parseInt(res.expenses);
 });
        this.expensescChartTrendTotal = data.data_ta;
        if(Math.round(this.pieChartTotal)>=Math.round(this.expensescChartTrendTotal))
            this.expensescChartTrendIcon = "up";  
       this.pieChartData = this.pieChartDatares;
       this.pieChartLabels = this.pieChartLabelsres;
       
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  public productionChartTrendIcon;
  public productionChartTrendTotal;
  //finProductionByClinician
  public finProductionByClinicianLoader:any;
  private finProductionByClinician() {
    var user_id;
    var clinic_id;
    this.productionChartDatares= [];
    this.finProductionByClinicianLoader = true;       
    this.productionChartTotal = 0;
    this.productionChartLabels = [];
  this.financesService.finProductionByClinician(this.clinic_id,this.startDate,this.endDate, this.duration).subscribe((data) => {
    this.productionChartLabelsres =[];
           this.productionChartTotal = 0;
           this.productionChartTrendIcon = "down";
           this.productionChartTrendTotal=0;
       if(data.message == 'success'){
    this.finProductionByClinicianLoader = false;       

    this.productionChartDatares = [];
        data.data.forEach(res => {
          if(res.prod_per_clinician>0) {
           this.productionChartDatares.push(Math.round(res.prod_per_clinician));
           this.productionChartLabelsres.push(res.provider_name);
           this.productionChartTotal = this.productionChartTotal + parseInt(res.prod_per_clinician);
         }
    });
           this.productionChartTrendTotal = data.total_ta;
        if(Math.round(this.productionChartTotal)>=Math.round(this.productionChartTrendTotal))
            this.productionChartTrendIcon = "up";  
       if(this.productionChartDatares.every((item) => item == 0)) this.productionChartDatares =[];
       this.productionChartData = this.productionChartDatares;
       this.productionChartLabels = this.productionChartLabelsres;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }
  public totalDiscountChartTrendIcon = "down";
  public totalDiscountChartTrendTotal;
  public finTotalDiscountsLoader:any;

    //finProductionByClinician
  private finTotalDiscounts() {
    var user_id;
    var clinic_id;
    this.totalDiscountChartLabels =[];
    this.totalDiscountChartData = [];
    this.finTotalDiscountsLoader = true;    
  this.financesService.finTotalDiscounts(this.clinic_id,this.startDate,this.endDate, this.duration).subscribe((data) => {
     this.totalDiscountChartDatares =[];
           this.totalDiscountChartLabelsres =[];
           this.totalDiscountChartTotal = 0;
           this.totalDiscountChartTrendIcon = "down";
           this.totalDiscountChartTrendTotal=0;
       if(data.message == 'success'){
          this.finTotalDiscountsLoader = false;
          this.totalDiscountChartDatares = [];
          this.totalDiscountChartTotal = 0;
          data.data.forEach(res => {
            if(res.total!=0) {
              this.totalDiscountChartDatares.push(Math.round(res.discounts)); 
              var name = '';
              if(res.provider_name != '' && res.provider_name != null){
                name = res.provider_name;
              } 
              this.totalDiscountChartLabelsres.push(name);           
          }
        });
          this.totalDiscountChartTotal = Math.round(data.total);
          this.percentOfTotalDiscount$.next(this.totalDiscountChartTotal);
           if(data.total_ta)
            this.totalDiscountChartTrendTotal = Math.round(data.total_ta);
          else
            this.totalDiscountChartTrendTotal=0;

           if(Math.round(this.totalDiscountChartTotal)>=Math.round(this.totalDiscountChartTrendTotal))
            this.totalDiscountChartTrendIcon = "up";
            if(this.totalDiscountChartDatares.every((item) => item == 0)) this.totalDiscountChartDatares = []
       this.totalDiscountChartData = this.totalDiscountChartDatares;
       this.totalDiscountChartLabels = this.totalDiscountChartLabelsres;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }
    public totalProductionTrendIcon;
    public totalProductionTrendVal;
  public totalProductionCollection1: any[] = [
    { 
      data: [], 
      label: '',
      backgroundColor: [],
      hoverBackgroundColor: []
    }
  ];
public totalProductionCollectionLabel1 =[];
  public finTotalProductionLoader:any;

    //finTotalProduction
  private finTotalProduction() {
    this.finTotalProductionLoader = true;
    this.totalProductionTrendIcon = "down";
    this.totalProductionTrendVal=0;
    this.totalProductionCollectionLabel1=[];
    var user_id;
    var clinic_id;
  this.financesService.finTotalProduction(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
     this.finCollection();
       if(data.message == 'success'){

        this.finTotalProductionLoader = false;
        this.totalProductionCollection1[0]['data'] =[];
        
        if(data.total)
          this.totalProductionVal = Math.round(data.total); 
        else
          this.totalProductionVal = 0; 

        if(data.data[0].provider_name)    
          this.totalProductionLabel = data.data[0].provider_name;    
        else
         this.totalProductionLabel ='';    

        if(data.total_ta)
         this.totalProductionTrendVal = Math.round(data.total_ta);  
        else    
         this.totalProductionTrendVal = 0;  

          this.totalProductionCollection1[0]['data'].push(this.totalProductionVal);
                   
        if(Math.round(this.totalProductionVal)>=Math.round(this.totalProductionTrendVal))
            this.totalProductionTrendIcon = "up";  
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }


  //validate if input is decimal
isDecimal(value) {
 if(typeof value != 'undefined')
  {
    if(String(value).includes("."))
    return true;
  }
}


  public collectionPercentageC;
 public collectionTrendIcon;
  public collectionTrendVal;
  public totalProductionCollectionMax;
  public finCollectionLoader:any;

      //Collection
  private finCollection() {
    var user_id;
    var clinic_id;
    this.finCollectionLoader = true;
        this.collectionTrendIcon = "down";
           this.collectionTrendVal=0;
  this.financesService.finCollection(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.finCollectionLoader = false;
        this.collectionVal =0;
        this.collectionVal = (data.total)? Math.round(data.total) : 0;      
        this.collectionPercentage = (data.total_average)? Math.round(data.total_average) : 0; 
        this.collectionTrendVal = (data.total_ta)?  Math.round(data.total_ta) : 0;    

        this.totalProductionCollection1[0]['data'].push(this.collectionVal);
        this.totalProductionCollectionLabel1 = ['Total Production','Collection'];
        this.totalProductionCollection1[0]['hoverBackgroundColor'] = ['#ffb4b5', '#4ccfae'];
        this.totalProductionCollection1[0]['backgroundColor'] = ['#ffb4b5', '#4ccfae']; //as label are static we can add background color for that particular column as static
           this.totalProductionCollectionMax = Math.max(...this.totalProductionCollection1[0]['data']);
           if(this.totalProductionVal)
           this.collectionPercentageC=Math.round((this.collectionVal/this.totalProductionVal)*100);
          else
           this.collectionPercentageC=0;

        if(Math.round(this.collectionVal)>=Math.round(this.collectionTrendVal))
            this.collectionTrendIcon = "up";
         //console.log(this.totalProductionCollection1);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  public productionTrendIcon;
  public productionTrendVal;
  public finProductionPerVisitLoader:any;

  private finProductionPerVisit() {
    this.finProductionPerVisitLoader = true;
    this.productionVal = 0;  

    var user_id;
    var clinic_id;
        this.productionTrendIcon = "down";
           this.productionTrendVal=0;
  this.financesService.finProductionPerVisit(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.finProductionPerVisitLoader = false;
        this.productionVal = Math.round(data.total);  
        this.productionTrendVal = Math.round( data.total_ta);  
        if(Math.round(this.productionVal)>=Math.round(this.productionTrendVal))
            this.productionTrendIcon = "up";            
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  public totalOverdueTrendAccount;
  public totalOverdueTrendIcon;
  public totalOverdueAccountDataMax;
  public finOverdueAccountsLoader:any;

          //finOverdueAccounts
  private finOverdueAccounts() {
    var user_id;
    var clinic_id;
    this.finOverdueAccountsLoader = true;
    this.financesService.finOverdueAccounts(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
    this.finOverdueAccountsLoader = false;

        this.totalOverdueAccountLabels=[];
             this.totalOverdueAccountres =[];
     this.totalOverdueAccountLabelsres = [];
        data.data.forEach(res => {
          if(res.overdue > 0) {
           this.totalOverdueAccountres.push(Math.round(res.overdue));
           this.totalOverdueAccountLabelsres.push(res.label);
         }
                  });
           this.totalOverdueAccount = data.total;
         this.percentOfCurrentOverdue$.next(data.total);
       this.totalOverdueAccountData = this.totalOverdueAccountres;
       this.totalOverdueAccountLabels = this.totalOverdueAccountLabelsres; 
       this.totalOverdueAccountDataMax = Math.max(...this.totalOverdueAccountData);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!"; 
    }
    );
  }

public currentText;

filterDate(duration) {
     $('.customRange').css('display','none');
     if(this.toggleChecked) 
     $('.target_off').click();
     this.toggleChecked =false;

    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_off').addClass('mat-button-toggle-checked');
  //   $('.trend_arrow').hide();
    if(duration == 'w') {
       this.duration='w';
      this.trendText= 'Last Week';
      this.currentText= 'This Week';

        const now = new Date();
        if(now.getDay()==0)
          var day = 7;
        else
          var day = now.getDay();

       var first = now.getDate() - day +1;
       var last = first + 6; 
       var sd =new Date(now.setDate(first));

       this.startDate = this.datePipe.transform(sd.toUTCString(), 'dd-MM-yyyy');
       var end = now.setDate(sd.getDate()+6);
       this.endDate =this.datePipe.transform(new Date(end).toUTCString(), 'dd-MM-yyyy');
        this.loadDentist('all');
    }
    else if (duration == 'm') {
   this.duration='m';
      this.trendText= 'Last Month';
      this.currentText= 'This Month';

      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
            this.loadDentist('all');
    }
    else if (duration == 'lm') {
      this.trendText = 'Previous Month';
      this.currentText = 'Last Month';

      const date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() - 1, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 0), 'dd-MM-yyyy');
      this.duration = 'lm';
      this.loadDentist('all');
    }
    else if (duration == 'q') {
        this.duration='q';
      this.trendText= 'Last Quarter';
      this.currentText= 'This Quarter';

      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy')
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
      this.loadDentist('all');
    }
    else if (duration == 'lq') {
        this.duration='lq';
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
            this.loadDentist('all');
   
    }
    else if (duration == 'cytd') {
      this.trendText= 'Last Year';
      this.currentText= 'This Year';

      this.duration='cytd';
     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.loadDentist('all');
    }
     else if (duration == 'fytd') {
      this.duration='fytd';
      this.trendText= 'Last Financial Year';
      this.currentText= 'This Financial Year';
      
     var date = new Date();
      if ((date.getMonth() + 1) <= 6) {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear()-1, 6, 1), 'dd-MM-yyyy');
        } else {
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 6, 1), 'dd-MM-yyyy');
    }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.loadDentist('all');
    }
     else if (duration == 'custom') {
      this.trendText= '';
      this.currentText= '';
     $('.customRange').css('display','block');
    }
    $('.filter').removeClass('active');
    $('.filter_'+duration).addClass("active");
      // $('.filter_custom').val(this.startDate+ " - "+this.endDate);

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
    if(val =='1') {
       this.gaugeValuePredicted= this.gaugeValuePredicted1*100;
           this.predictedDentistTotal = this.gaugeValuePredicted1;

     }
    else if(val =='2'){
       this.gaugeValuePredicted= this.gaugeValuePredicted2*100;
           this.predictedDentistTotal = this.gaugeValuePredicted2;

     }
    else if(val =='3') {
       this.gaugeValuePredicted= this.gaugeValuePredicted3*100;  
           this.predictedDentistTotal = this.gaugeValuePredicted3;

     }
  } 
  ytd_load(val) {
    alert(this.datePipe.transform(val, 'dd-MM-yyyy'));
  }
choosedDate(val) {
    val = (val.chosenLabel);
    var val= val.toString().split(' - ');
      
     var date2:any= new Date(val[1]);
     var date1:any= new Date(val[0]);
      var diffTime:any =Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
if(diffTime<=365){
this.startDate = this.datePipe.transform(val[0], 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(val[1], 'dd-MM-yyyy');
      this.loadDentist('all');      
      // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
     $('.customRange').css('display','none');
   }
   else {
            Swal.fire({
      text: 'Please select date range within 365 Days',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then((result) => {
    });
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
toggleFilter(val) {
  $('.target_filter').removeClass('mat-button-toggle-checked');
  $('.target_' + val).addClass('mat-button-toggle-checked');
  $('.filter').removeClass('active');
  var date = new Date();
  this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  if (val == 'current') {
    this.toggleChecked = true;
    this.trendValue = 'c';
    this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 1, date.getMonth(), 1), 'dd-MM-yyyy');

    this.toggleChangeProcess();
    this.displayProfit(1);
  }
  else if (val == 'historic') {
    this.toggleChecked = true;
    this.trendValue = 'h';
    this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 10, date.getMonth(), 1), 'dd-MM-yyyy');

    this.toggleChangeProcess();
    this.displayProfit(1);
  }
  else if (val == 'off') {
    this.filterDate('m');
    $('.trendMode').hide();
    $('.nonTrendMode').css('display', 'block');
  }

  //  $('.target_filter').removeClass('mat-button-toggle-checked');
  //   $('.target_'+val).addClass('mat-button-toggle-checked');
  //   $('.filter').removeClass('active');
  //   if(val == 'current') {
  //    this.toggleChecked = true;
  //    this.trendValue = 'c';
  //    this.toggleChangeProcess();
  //    this.displayProfit(1);
  //   }
  //   else if(val == 'historic') {
  //      this.toggleChecked = true;
  //      this.trendValue = 'h';
  //      this.toggleChangeProcess();
  //    this.displayProfit(1);

  //   }
  //   else if(val == 'off') {
  //       this.filterDate('m');
  //         $('.trendMode').hide();
  //   $('.nonTrendMode').css('display','block');
  //   }
     $('.expenses_card').removeClass('active');

}
flipcard(div){
 if( $('.'+div).hasClass('active'))
  $('.'+div).removeClass('active');
else
  $('.'+div).addClass('active');
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
  toggleChanged(){
    if(this.toggleChecked == true) {
      this.isDisabled = false;
     this.trendValue = 'c';
      this.isChecked = true;
     this.toggleChangeProcess();
    }
    else if(this.toggleChecked == false) {
      this.isDisabled = true;
  //    this.showTrend =false;

    }
  }
  onChange(mrChange) {
   this.trendValue = mrChange.value;
     this.toggleChangeProcess();
  } 
public totalProductionCollection: any[] = [
    {data: [], label: 'Total Production'},{data: [], label: 'Collection'}];
public totalProductionCollectionLabel =[];
public netProfitDisplayVal;
toggleChangeProcess(){
    if(this.toggleChecked){
    $('.filter').removeClass('active');
    $('.trendMode').css('display','block');
    $('.nonTrendMode').hide();
    this.finNetProfitPMSTrend();
    
    this.finProductionByClinicianTrend();
    this.finTotalDiscountsTrend();
  //  this.finOverdueAccountsTrend();
    this.finTotalProductionTrend();
    this.finCollectionTrend();
    this.finProductionPerVisitTrend();
  //  this.finNetProfitTrend();
   // this.finNetProfitPercentTrend();
    //this.finExpensesByCategoryTrend();
    this.netProfitDisplayVal ='1';
/*    this.totalProductionCollection[0]['data'] = this.totalProductionChartTrend1;
    this.totalProductionCollection[1]['data'] = this.collectionChartTrend1;
    this.totalProductionCollectionLabel = this.totalProductionChartTrendLabels1;*/
    // alert('sdf');
    //  $(".profit2").hide();
    //   $(".profit1").css('display','flex');
   }
}


public productionChartTrend: any[]  = [
    {data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''}];
public productionChartTrendLabels =[];
public productionChartTrendLabels1 =[];
  public finProductionByClinicianTrendLoader:any;

private finProductionByClinicianTrend() {
  this.finProductionByClinicianTrendLoader = true;
  this.productionChartTrendLabels=[];
  this.productionChartTrendLabels1=[];
  this.productionChartTrend =[];
    var user_id;
    var clinic_id;
    this.financesService.finProductionByClinicianTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
          this.finProductionByClinicianTrendLoader = false;
                data.data.forEach(res => {                   
                   res.val.forEach((result,key) => {
                      if(typeof(this.productionChartTrend[key]) == 'undefined'){
                        this.productionChartTrend[key] = { data: [],label: '' };
                      }
                      if(typeof(this.productionChartTrend[key]['data']) == 'undefined'){
                        this.productionChartTrend[key]['data'] = [];
                      }
                     this.productionChartTrend[key]['data'].push(Math.round(parseInt(result.prod_per_clinician)));
                     this.productionChartTrend[key]['label'] = result.provider_name;
                    
                   });
                  if(this.trendValue == 'c')
                    this.productionChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                  else
                   this.productionChartTrendLabels1.push(res.duration);                  
                 });
                 this.productionChartTrendLabels =this.productionChartTrendLabels1; 
                      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


  public discountsChartTrend: any[]  = [
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
    public discountsChartTrend1=[];
public discountsChartTrendLabels =[];
public discountsChartTrendLabels1 =[];
  public finTotalDiscountsTrendLoader:any;

private finTotalDiscountsTrend() {
  this.discountsChartTrendLabels=[];
  this.discountsChartTrendLabels1=[];
  this.discountsChartTrend1=[];
  this.finTotalDiscountsTrendLoader = true;
    var user_id;
    var clinic_id;
    this.financesService.finTotalDiscountsTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
         this.finTotalDiscountsTrendLoader = false;        
                data.data.forEach(res => {  
                     this.discountsChartTrend1.push(Math.round(res.discounts));
                   if(this.trendValue == 'c')
                   this.discountsChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                    else
                   this.discountsChartTrendLabels1.push(res.year);
                  
                 });
                 if(this.discountsChartTrend1.every((item) => item == 0)) this.discountsChartTrend1 = [];
                 this.discountsChartTrend[0]['data'] = this.discountsChartTrend1;

                 this.discountsChartTrendLabels =this.discountsChartTrendLabels1; 
                 //console.log(this.discountsChartTrendLabels);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

   public overdueChartTrend: any[]  = [
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
    public overdueChartTrend1=[];
  public overdueChartTrendLabels =[];
  public overdueChartTrendLabels1 =[];
  public finOverdueAccountsTrendLoader:any;

  private finOverdueAccountsTrend() {
  this.finOverdueAccountsTrendLoader = true;
  this.overdueChartTrendLabels1=[];
  this.overdueChartTrendLabels=[];
  this.overdueChartTrend1=[];
    var user_id;
    var clinic_id;
    this.financesService.finOverdueAccountsTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
            this.finOverdueAccountsTrendLoader = false;
                data.data.forEach(res => {  
                     this.overdueChartTrend1.push(Math.round(res.val.total));
                   if(this.trendValue == 'c')
                   this.overdueChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.overdueChartTrendLabels1.push(res.duration);
                  
                 });
                 this.overdueChartTrend[0]['data'] = this.overdueChartTrend1;

                 this.overdueChartTrendLabels =this.overdueChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


  public totalProductionChartTrend: any[]  = [
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
  public totalProductionChartTrend1=[];
  public totalProductionChartTrendLabels =[];
  public totalProductionChartTrendLabels1 =[];
  public finTotalProductionTrendLoader:any;

  private finTotalProductionTrend() {
    this.finTotalProductionTrendLoader = true;
  this.totalProductionChartTrendLabels1=[];
  this.totalProductionChartTrend1=[];
    var user_id;
    var clinic_id;
    this.financesService.finTotalProductionTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
          this.finTotalProductionTrendLoader = false;
          this.netProfitPercentChartTrend = [];
                this.netProfitPercentChartTrendLabels = []; 
                data.data.forEach(res => {  
                     this.totalProductionChartTrend1.push(Math.round(res.production));
                     this.netProfitPercentChartTrend1.push(Math.round(res.production));
                   if(this.trendValue == 'c'){
                    this.totalProductionChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                    this.netProfitChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                  } else{
                   this.totalProductionChartTrendLabels1.push(res.year);
                    this.netProfitChartTrendLabels1.push(res.year);
                  }
                  
                 });
                this.netProfitPercentChartTrend[0]['data'] = this.netProfitPercentChartTrend1;
                this.netProfitPercentChartTrendLabels =this.netProfitPercentChartTrendLabels1; 
              
              //console.log(this.totalProductionCollectionLabel);
                 //this.totalProductionChartTrend[0]['data'] = this.totalProductionChartTrend1;

                // this.totalProductionChartTrendLabels =this.totalProductionChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


  public collectionChartTrend: any[]  = [
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
  public collectionChartTrend1=[];
  public collectionChartTrendLabels =[];
  public collectionChartTrendLabels1 =[];
  public finCollectionTrendLoader:any;

  private finCollectionTrend() {
    this.finCollectionTrendLoader = true;
  this.collectionChartTrendLabels1=[];
  this.collectionChartTrend1=[];
    var user_id;
    var clinic_id;
    this.financesService.finCollectionTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
          this.finCollectionTrendLoader = false;        
                data.data.forEach(res => {  
                     this.collectionChartTrend1.push(Math.round(res.collection));
                   if(this.trendValue == 'c')
                   this.collectionChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                    else
                   this.collectionChartTrendLabels1.push(res.year);
                  
                 });
                  this.totalProductionCollection[0]['data'] =  this.totalProductionChartTrend1;
                this.totalProductionCollection[1]['data'] =   this.collectionChartTrend1;
                this.totalProductionCollectionLabel = this.totalProductionChartTrendLabels1;

                
               //  this.collectionChartTrend[0]['data'] = this.collectionChartTrend1;

               //  this.collectionChartTrendLabels =this.collectionChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }
 

  public productionVisitChartTrend: any[]  = [
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
  public productionVisitChartTrend1=[];
  public productionVisitChartTrendLabels =[];
  public productionVisitChartTrendLabels1 =[];
  public finProductionPerVisitTrendLoader:any;

  private finProductionPerVisitTrend() {
  this.finProductionPerVisitTrendLoader = true;
  this.productionVisitChartTrendLabels1=[];
  this.productionVisitChartTrendLabels=[];
  this.productionVisitChartTrend1=[];
    var user_id;
    var clinic_id;
    this.financesService.finProductionPerVisitTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
          this.finProductionPerVisitTrendLoader = false;        
                data.data.forEach(res => {  
                  this.productionVisitChartTrend1.push(Math.round(res.production));
                  if(this.trendValue == 'c')
                    this.productionVisitChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                  else
                    this.productionVisitChartTrendLabels1.push(res.year);
                  
                 });
                 this.productionVisitChartTrend[0]['data'] = this.productionVisitChartTrend1;

                 this.productionVisitChartTrendLabels =this.productionVisitChartTrendLabels1;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }



  public netProfitChartTrend: any[]  = [
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
  public netProfitChartTrend1=[];
  public netProfitChartTrendLabels =[];
  public netProfitChartTrendLabels1 =[];
  public finNetProfitTrendLoader:any;

  private finNetProfitTrend() {
  this.netProfitChartTrendLabels1=[];
  this.netProfitChartTrendLabels=[];
  this.netProfitChartTrend1= [];
  this.finNetProfitTrendLoader = true;
    var user_id;
    var clinic_id;
    this.financesService.finNetProfitTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
    this.finNetProfitTrendLoader = false;
                data.data.forEach(res => {  
                     this.netProfitChartTrend1.push(Math.round(res.val));
                   if(this.trendValue == 'c')
                   this.netProfitChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.netProfitChartTrendLabels1.push(this.datePipe.transform(res.duration, 'y'));
                  
                 });
                 this.netProfitChartTrend[0]['data'] = this.netProfitChartTrend1;

                 this.netProfitChartTrendLabels =this.netProfitChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

  public netProfitPercentChartTrend: any[]  = [
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
  public netProfitPercentChartTrend1=[];
  public netProfitPercentChartTrendLabels =[];
  public netProfitPercentChartTrendLabels1 =[];
  public finNetProfitPercentTrendLoader:any;

  private finNetProfitPercentTrend() {
  this.netProfitPercentChartTrendLabels1=[];
  this.netProfitPercentChartTrendLabels=[];

  this.netProfitPercentChartTrend1= [];
  this.finNetProfitPercentTrendLoader = true;
    var user_id;
    var clinic_id;
    this.financesService.finNetProfitPercentTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
  this.finNetProfitPercentTrendLoader = false;

                data.data.forEach(res => {  
                     this.netProfitPercentChartTrend1.push(Math.round(res.val));
                   if(this.trendValue == 'c')
                   this.netProfitPercentChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.netProfitPercentChartTrendLabels1.push(res.duration);
                  
                 });
                 this.netProfitPercentChartTrend[0]['data'] = this.netProfitPercentChartTrend1;

                 this.netProfitPercentChartTrendLabels =this.netProfitPercentChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


    public netProfitPmsChartTrend: any[]  = [
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
  public netProfitPmsChartTrend1=[];
  public netProfitPmsChartTrendLabels =[];
  public netProfitPmsChartTrendLabels1 =[];
  public finNetProfitPMSTrendLoader:any;

  public checkXeroStatus(){
    this.clinicSettingsService.checkXeroStatus(this.clinic_id).subscribe((res) => {
      console.log('res', res)
       if(res.message == 'success'){
        if(res.data.xero_connect == 1) {
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
 }


trendxero=false;
  private finNetProfitPMSTrend() {
      this.netProfitChartTrendLabels1=[];
  this.netProfitChartTrendLabels=[];
  this.netProfitChartTrend1= [];
  this.finNetProfitTrendLoader = true;
    this.finNetProfitPMSTrendLoader = true;
  this.netProfitPmsChartTrendLabels1=[];
  this.netProfitPmsChartTrend1= [];
   this.netProfitPercentChartTrendLabels1=[];
  this.netProfitPercentChartTrendLabels=[];
 
  this.netProfitPercentChartTrend1= [];
  this.finNetProfitPercentTrendLoader = true;
    var user_id;
    var clinic_id;
     this.expensesChartTrendLabels=[];
    
this.trendxero=true;
  this.expensesChartTrend =[
    {data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''}];

    this.financesService.finNetProfitPMSTrend(this.clinic_id,this.trendValue).subscribe((data) => {
this.trendxero=false;

       if(data.message == 'success'){
         this.netProfitChartTrendLabels1=[];
  this.netProfitChartTrendLabels=[];
  this.netProfitChartTrend1= [];
        this.netProfitPmsChartTrendLabels1=[];
  this.netProfitPmsChartTrend1= [];
  this.netProfitPercentChartTrendLabels1=[];
  this.netProfitPercentChartTrendLabels=[];
 
  this.netProfitPercentChartTrend1= [];
         this.expensesChartTrendLabels1=[];
          this.expensesChartTrend =[];

    this.finNetProfitPMSTrendLoader = false;
        this.finNetProfitTrendLoader = false;
          this.finNetProfitPercentTrendLoader = false;
          console.log('data.data', data.data)
              if(data.data.net_profit)
                data.data.net_profit.forEach(res => {  
                  // console.log(res.val.net);
                     if (res.val.net != null)
                     this.netProfitChartTrend1.push(Math.round(res.val.net));
                     else
                     this.netProfitChartTrend1.push(0);
                     if(res.val.production) 
                     this.netProfitPercentChartTrend1.push(Math.round(res.val.production));
                     else
                     this.netProfitPercentChartTrend1.push(0);       
                    if(res.val.pms)
                     this.netProfitPmsChartTrend1.push(Math.round(res.val.pms));
                   else
                     this.netProfitPmsChartTrend1.push(0);

                   if(this.trendValue == 'c'){
                   this.netProfitChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                   this.netProfitPercentChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));                    
                   this.netProfitPmsChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
             //      this.expensesChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));

                 }
                 else {
                   this.netProfitChartTrendLabels1.push(res.duration);
                   this.netProfitPercentChartTrendLabels1.push(res.duration);                    
                   this.netProfitPmsChartTrendLabels1.push(res.duration);
                   //this.expensesChartTrendLabels1.push(this.datePipe.transform(res.duration, 'y'));

                 }
                  
                 });
                 this.netProfitChartTrend[0]['data'] = this.netProfitChartTrend1;
                 this.netProfitChartTrendLabels =this.netProfitChartTrendLabels1; 
            
                // this.netProfitPercentChartTrend[0]['data'] = this.netProfitPercentChartTrend1;

                 //this.netProfitPercentChartTrendLabels =this.netProfitPercentChartTrendLabels1; 
                 this.netProfitPmsChartTrend[0]['data'] = this.netProfitPmsChartTrend1;

                 this.netProfitPmsChartTrendLabels =this.netProfitPmsChartTrendLabels1;
                 data.data.expenses.forEach((result,key) => {  
                    if(result.meta_key != 'Total Operating Expenses') {
                      let tempO:any = [];
                      result.expenses.forEach((res) => {  
                        tempO.push(Math.round(res));
                      });                      
                      let temp = {data: [],label: '' };
                      temp.data = tempO;
                      temp.label = result.meta_key;
          this.expensesChartTrend.push(temp);
                     // this.expensesChartTrend[key]['data'] = tempO;
                     // this.expensesChartTrend[key]['label'] = result.meta_key;           

                   }
                 }); 
                 this.expensesChartTrendLabels = data.data.duration; 

                 console.log('this.expensesChartTrend',  this.expensesChartTrend);
                 console.log('this.expensesChartTrendLabels',  this.expensesChartTrendLabels);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


public expensesChartTrend: any[]  = [
    {data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''}];
public expensesChartTrendLabels =[];
public expensesChartTrendLabels1 =[];

private finExpensesByCategoryTrend() {
  this.expensesChartTrendLabels1=[];
    var user_id;
    var clinic_id;
     this.expensesChartTrendLabels=[];
  this.expensesChartTrend =[
    {data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''},{data: [], label: ''}];
    this.financesService.finExpensesByCategoryTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
                data.data.forEach(res => {  
                   res.val.expense.forEach((result,key) => {
                     this.expensesChartTrend[key]['data'].push(Math.round(result.expenses));
                     this.expensesChartTrend[key]['label'] = result.meta_key;
                   });
                   if(this.trendValue == 'c')
                   this.expensesChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.expensesChartTrendLabels1.push(res.duration);
                  
                 });
                 this.expensesChartTrendLabels =this.expensesChartTrendLabels1; 
                 console.log('this.expensesChartTrendLabels', this.expensesChartTrendLabels)
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

  displayProfit(val) {
    $(".net_profit").hide();
    $(".profit"+val).show();
    $('.profit_btn').removeClass('active');
    $(".netProfit"+val).addClass('active');
    this.netProfitDisplayVal = val;
  }

}
