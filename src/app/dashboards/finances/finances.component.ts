import * as $ from 'jquery';
import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FinancesService } from './finances.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../layouts/full/header/header.service';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
// import { PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { map, takeUntil } from 'rxjs/operators';
import { ChartService } from '../chart.service';
import { ClinicSettingsService } from '../../clinic-settings/clinic-settings.service';
import { AppConstants } from '../../app.constants';
import { ChartstipsService } from '../../shared/chartstips.service';
import { environment } from '../../../environments/environment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as _ from 'lodash';
import {
  ChartDataset,
  ChartOptions,
  LegendOptions,
  TooltipItem,
  Plugin,
} from 'chart.js';
import * as moment from 'moment';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { formatXTooltipLabel } from '../../util';
import { JeeveLineFillOptions } from '../../shared/chart-options';
export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FinancesComponent implements AfterViewInit {
  @ViewChild('myCanvas') canvas: ElementRef;
  @ViewChild('myCanvas2') canvas2: ElementRef;

  lineChartColors;
  doughnutChartColors;
  stackedChartColors;
  stackedChartColorsBar;
  public xeroConnect: boolean = true;
  public myobConnect: boolean = true;
  public netprofitstats: boolean = true;
  public netprofitpercentstats: boolean = true;
  public productionstats: boolean = true;
  public expensestrendstats: boolean = true;
  public connectedwith: any;
  public charTips: any = [];
  public Apirequest = 8;
  public multipleClinicsSelected: boolean = false;
  public selectedData = [];
  public unSelectedData = [];
  public upperLimit = 20;
  public lowerLimit = 1;
  public user_type: string = '';
  public isCompleteMonth: boolean = true;
  public queryWhEnabled = 0;

  public pieChartColors = [
    {
      backgroundColor: [
        // '#6edbbb',
        // '#b0fffa',
        // '#abb3ff',
        // '#ffb4b5',
        // '#fffcac',
        // '#D7F8EF',
        // '#FEEFB8'
        '#6edbbb',
        '#b0fffa',
        '#abb3ff',
        '#ffb4b5',
        '#fffcac',
        '#FFE4E4',
        '#FFD578',
        '#54D2FF',
        '#E58DD7',
        '#A9AABC',
        '#F2ECFF',
        '#5689C9',
        '#F9F871',
      ],
    },
  ];

  preoceedureChartColors;
  subtitle: string;
  public clinic_id: any = {};
  public dentistCount: any = {};
  public netProfitIcon: string = '';
  public netProfitProductionIcon: string = '';
  public netProfitPmsIcon: string = '';
  public barChartType = 'bar';
  public barChartLegend = false;
  public netProfitVal: any = 0;
  public netProfitProductionVal: any = 0;
  public netProfitPmsVal: any = 0;
  public duration = 'm';
  public predictedChartColors;
  public trendText;
  public apiUrl = environment.apiUrl;
  colorScheme = {
    domain: [
      '#6edbba',
      '#abb3ff',
      '#b0fffa',
      '#ffb4b5',
      '#d7f8ef',
      '#fffdac',
      '#fef0b8',
      '#4ccfae',
    ],
  };
  single = [];
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
  arcWidth = 0.75;
  rangeFillOpacity = 0.75;
  pluginObservable$: Observable<Plugin[]>;
  totalDiscountPluginObservable$: Observable<Plugin[]>;
  currentOverduePluginObservable$: Observable<Plugin[]>;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public percentOfProductionCount$ = new BehaviorSubject<number>(99);
  public percentOfTotalDiscount$ = new BehaviorSubject<number>(0);
  public percentOfCurrentOverdue$ = new BehaviorSubject<number>(0);
  chartData1 = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels1 = ['January', 'February', 'Mars', 'April'];
  profitChartTitles = [
    'Production',
    'Net Profit',
    'Net Profit %',
    'Collection',
  ];
  barChartColors = [
    { backgroundColor: '#39acac' },
    { backgroundColor: '#48daba' },
  ];
  public isVisibleAccountGraphs: boolean = false;
  public maxLegendLabelLimit = 10;
  // public get isExact(): boolean {
  //   return this.localStorageService.isEachClinicExact(this.clinic_id);
  // }
  constructor(
    // private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private financesService: FinancesService,
    // private dentistService: DentistService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private _cookieService: CookieService,
    private router: Router,
    private clinicSettingsService: ClinicSettingsService,
    private chartService: ChartService,
    public constants: AppConstants,
    public ngxModalService: NgxSmartModalService,
    public chartstipsService: ChartstipsService,
    private decimalPipe: DecimalPipe
  ) {
    this.router.routerState.root.queryParams.subscribe(val => {
      if (val && val.wh) {
        this.queryWhEnabled = val.wh;
      }
    });
    this.user_type = this._cookieService.get('user_type');
    this.connectedwith = this._cookieService.get('a_connect');
    this.isVisibleAccountGraphs = this.connectedwith == 'none' ? false : true;
    // this.getChartsTips();
    this.getAllClinics();
  }

  public stackLegendGenerator: _DeepPartialObject<LegendOptions<any>> = {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: chart => {
        let labels = [];
        let bg_color = {};
        chart.data.datasets.forEach(item => {
          item.data.forEach((val: number) => {
            if (val > 0) {
              labels.push(item.label);
              bg_color[item.label] = item.backgroundColor;
            }
          });
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, this.maxLegendLabelLimit);
        return labels.map(item => ({
          text: item,
          strokeStyle: bg_color[item],
          fillStyle: bg_color[item],
        }));
      },
    },
    // onClick: (event: MouseEvent, legendItem: LegendItem) => {}
  };
  private warningMessage: string;
  async initiate_clinic() {
    var val = $('#currentClinic').attr('cid');
    // this.clinic_id = val;
    if (val != undefined && val != '') {
      if (val == 'all') {
        this.clinic_id = this.clinics;
      } else {
        this.clinic_id = val;
      }
      if (val.indexOf(',') == -1 && val != 'all') {
        this.multipleClinicsSelected = false;
        this.clinic_id = val;
        await this.clinicGetAccountingPlatform();
        this.isVisibleAccountGraphs =
          this.connectedwith == 'none' ? false : true;
        if (this.connectedwith == 'myob') {
          this.xeroConnect = false;
          this.checkMyobStatus();
        } else if (this.connectedwith == 'xero') {
          this.myobConnect = false;
          this.checkXeroStatus();
        } else {
          this.xeroConnect = false;
          this.myobConnect = false;
        }
      } else {
        await this.clinicGetAccountingPlatform(); // gtt added to resolve issue in prod not firing this request for multi clinic
        this.isVisibleAccountGraphs = true;
        this.multipleClinicsSelected = true;
        // this.filterDate(this.chartService.duration$.value);
      }
      this.filterDate(this.chartService.duration$.value);
      this.getChartsTips();
    } else {
      this.multipleClinicsSelected = true;
    }
  }

  public clinics = [];
  getAllClinics() {
    this.headerService.getClinic.subscribe(res => {
      if (res.status == 200) {
        let temp = [];
        res.body.data.forEach(item => {
          temp.push(item.id);
        });
        this.clinics = [...temp];
      }
    });
  }

  clinicGetAccountingPlatform() {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.clinicSettingsService
        .clinicGetAccountingPlatform(self.clinic_id)
        .subscribe(
          res => {
            if (res.status == 200) {
              if (res.body.data != '') {
                self.connectedwith = res.body.data;
                resolve(true);
              } else {
                self.connectedwith = '';
                resolve(true);
              }
            } else {
              self.connectedwith = '';
              resolve(true);
            }
          },
          error => {
            self.warningMessage = 'Please Provide Valid Inputs!';
            resolve(true);
          }
        );
    });
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

  ngAfterViewInit() {
    //plugin for Percentage of Production by Clinician chart
    this.pluginObservable$ = this.percentOfProductionCount$.pipe(
      takeUntil(this.destroyed$),
      map(productionCount => {
        return this.chartService.beforeDrawChart(productionCount);
      })
    );

    //plugin for Total Discounts chart
    this.totalDiscountPluginObservable$ = this.percentOfTotalDiscount$.pipe(
      takeUntil(this.destroyed$),
      map(discountCount => {
        return this.chartService.beforeDrawChart(discountCount, true);
      })
    );

    //plugin for Current Overdue chart
    this.currentOverduePluginObservable$ = this.percentOfCurrentOverdue$.pipe(
      takeUntil(this.destroyed$),
      map(overDueCount => {
        return this.chartService.beforeDrawChart(overDueCount, true);
      })
    );

    $('#currentDentist').attr('did', 'all');
    this.route.params.subscribe(params => {
      $('.external_clinic').show();
      //$('.dentist_dropdown').hide();
      $('.header_filters').removeClass('hide_header');
      $('.header_filters').addClass('flex_direct_mar');
      $('.external_clinic').show();
      //$('.external_dentist').show();
      $('#title').html('<span>Finances</span>');
      $('#sa_datepicker').val(
        this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate)
      );
      $(document).on('click', function (e) {
        if ($(document.activeElement).attr('id') == 'sa_datepicker') {
          $('.customRange').show();
        } else if ($(document.activeElement).attr('id') == 'customRange') {
          $('.customRange').show();
        } else {
          $('.customRange').hide();
        }
      });
    });
    let gradient = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#17a2a6');
    gradient.addColorStop(1, '#17a2a6');
    let gradient1 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    gradient1.addColorStop(1, '#82edd8');
    gradient1.addColorStop(0, '#82edd8');
    let gradient2 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    gradient2.addColorStop(1, '#2C7294');
    gradient2.addColorStop(0, '#2C7294');
    let gradient3 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    gradient3.addColorStop(1, '#3c7cb7');
    gradient3.addColorStop(0, '#3c7cb7');
    let gradient4 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    gradient4.addColorStop(1, '#175088');
    gradient4.addColorStop(0, '#175088');
    let gradient5 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    gradient5.addColorStop(1, '#1fd6b1');
    gradient5.addColorStop(0, '#1fd6b1');
    let gradient6 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    gradient6.addColorStop(1, '#09b391');
    gradient6.addColorStop(0, '#09b391');
    let gradient7 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    gradient7.addColorStop(1, '#168F7F');
    gradient7.addColorStop(0, '#168F7F');

    // this.doughnutChartColors = [{backgroundColor: ['#17a2a6','#82edd8','#2C7294','#3c7cb7','#175088','#1fd6b1','#09b391','#168F7F']}];
    this.doughnutChartColors = [
      '#6cd8ba',
      '#b0fffa',
      '#abb3ff',
      '#feefb8',
      '#91ADEA',
      '#ffb4b5',
      '#F2C6C6',
      '#FDC6C0',
      '#FEEEE1',
      '#FFDD99',
      '#A8DDDD',
      '#F4F4A0',
      '#C3DDFF',
      '#9FDBDB',
      '#CCFDCC',
      '#B1F2EC',
      '#D7ECF3',
      '#C8CDF0',
      '#F7C4F5',
      '#BBEBFA',
      '#D7ECF3',
      '#BBE7FF',
      '#9BD0F5',
      '#36A2EB',
      '#FF6384',
      '#fe7b85',
      '#87ada9',
      '#386087',
      '#54D2FF',
      '#E58DD7',
    ];
    let stackedGradient = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 400);
    stackedGradient.addColorStop(0, '#168F7F');
    stackedGradient.addColorStop(1, '#168F7F');
    let stackedGradient1 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    stackedGradient1.addColorStop(1, '#1fd6b1');
    stackedGradient1.addColorStop(0, '#1fd6b1');
    let stackedGradient2 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    stackedGradient2.addColorStop(1, '#09b391');
    stackedGradient2.addColorStop(0, '#09b391');
    let stackedGradient3 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    stackedGradient3.addColorStop(1, '#82EDD8');
    stackedGradient3.addColorStop(0, '#82EDD8');
    let stackedGradient4 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    stackedGradient4.addColorStop(1, '#17A2A6');
    stackedGradient4.addColorStop(0, '#17A2A6');
    let stackedGradient5 = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    stackedGradient5.addColorStop(1, 'rgba(22, 82, 141, 1)');
    stackedGradient5.addColorStop(0, 'rgba(12, 209,169,1)');

    this.stackedChartColors = [
      {
        backgroundColor: stackedGradient,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(255,255,255,0.6)',
      },
      {
        backgroundColor: stackedGradient1,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(255,255,255,0.6)',
      },
      {
        backgroundColor: stackedGradient2,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(255,255,255,0.6)',
      },
      {
        backgroundColor: stackedGradient3,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(255,255,255,0.6)',
      },
      {
        backgroundColor: stackedGradient4,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(255,255,255,0.6)',
      },
      {
        backgroundColor: stackedGradient5,
        hoverBorderWidth: 2,
        hoverBorderColor: 'rgba(255,255,255,0.6)',
      },
    ];
    let stackedGradient6 = this.canvas2.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    stackedGradient6.addColorStop(1, 'rgba(22, 82, 141, 0.4)');
    stackedGradient6.addColorStop(0, 'rgba(12, 209,169,0.4)');
    this.stackedChartColorsBar = [
      {
        backgroundColor: stackedGradient6,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: '#1CA49F',
      },
    ];
    let stackedGradient7 = this.canvas2.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    stackedGradient7.addColorStop(1, 'rgba(94, 232,205,0.8)');
    stackedGradient7.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    let proceedureGradient = this.canvas2.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 400);
    proceedureGradient.addColorStop(0, 'rgba(22, 82, 141, 0.8)');
    proceedureGradient.addColorStop(1, 'rgba(12, 209,169,0.9)');
    let proceedureGradient1 = this.canvas2.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    proceedureGradient1.addColorStop(1, 'rgba(12, 209,169,0.8)');
    proceedureGradient1.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    let proceedureGradient2 = this.canvas2.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    proceedureGradient2.addColorStop(1, 'rgba(59, 227,193,0.8');
    proceedureGradient2.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    let proceedureGradient3 = this.canvas2.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    proceedureGradient3.addColorStop(1, 'rgba(94, 232,205,0.8)');
    proceedureGradient3.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    let proceedureGradient4 = this.canvas2.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    proceedureGradient4.addColorStop(1, 'rgba(148, 240,221,0.8)');
    proceedureGradient4.addColorStop(0, 'rgba(22, 82, 141, 0.9)');
    let proceedureGradient5 = this.canvas2.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 100);
    proceedureGradient5.addColorStop(1, 'rgba(201, 247,238,0.8)');
    proceedureGradient5.addColorStop(0, 'rgba(22, 82, 141, 0.9)');

    this.preoceedureChartColors = [
      {
        backgroundColor: proceedureGradient,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(25,179,148,0.7)',
      },
      {
        backgroundColor: proceedureGradient1,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(25,179,148,0.7)',
      },
      {
        backgroundColor: proceedureGradient2,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(25,179,148,0.7)',
      },
      {
        backgroundColor: proceedureGradient3,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(25,179,148,0.7)',
      },
      {
        backgroundColor: proceedureGradient4,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
        borderColor: 'rgba(25,179,148,0.7)',
      },
      {
        backgroundColor: proceedureGradient5,
        hoverBorderWidth: 2,
        hoverBorderColor: '#1CA49F',
      },
    ];
    //this.filterDate(this.chartService.duration$.value);
  }

  splitName(name: string) {
    const regex = /\w+\s\w+(?=\s)|\w+/g;
    return name.toString().trim().match(regex);
  }
  public barChartOptionsTrend: ChartOptions = {
    // scaleShowVerticalLines: false,
    // cornerRadius: 60,
    hover: { mode: null },
    // curvature: 1,
    animation: {
      duration: 1500,
      easing: 'easeOutSine',
    },
    responsive: true,
    maintainAspectRatio: false,
    // scaleStartValue: 0,
    scales: {
      x: {
        grid: {
          display: true,
          offset: true,
        },
        ticks: {
          autoSkip: false,
        },
        display: false,
        offset: true,
        stacked: true,
      },
      y: {
        suggestedMin: 0,
        min: 0,
        beginAtZero: true,
        ticks: {
          callback: (label: number, index, labels) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return '$' + this.decimalPipe.transform(label);
            }
            return '';
          },
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          // use label callback to return the desired label
          label: tooltipItem => {
            const v = tooltipItem.parsed.y;
            let Tlable = tooltipItem.dataset.label;
            if (Tlable != '') {
              Tlable = Tlable + ': ';
            }
            //let ylable = Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;
            let ylable = tooltipItem.parsed._custom
              ? +(
                  tooltipItem.parsed._custom.max +
                  tooltipItem.parsed._custom.min
                ) / 2
              : v;
            if (ylable == 0 && Tlable == 'Target: ') {
              //return  Tlable + this.splitName(tooltipItem.xLabel).join(' ');
              return '';
            } else {
              return (
                Tlable +
                this.splitName(tooltipItem.label).join(' ') +
                ': $' +
                ylable
              );
            }
          },
          // remove title
          title: function (tooltipItem) {
            return '';
          },
        },
      },
      legend: {
        position: 'top',
        onClick: function (e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart;
          if (index == 0) {
            ci.getDatasetMeta(1).hidden = true;
            ci.getDatasetMeta(index).hidden = false;
          } else if (index == 1) {
            ci.getDatasetMeta(0).hidden = true;
            ci.getDatasetMeta(index).hidden = false;
          }
          ci.update();
        },
      },
    },
  };
  public date = new Date();
  public lineChartOptions: any = { responsive: true };

  dentists: Dentist[] = [{ providerId: 'all', name: 'All Dentists' }];
  public stackedChartOptions: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency =
                label < 0
                  ? label.toString().split('-').join('')
                  : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              return `${label < 0 ? '- $' : '$'}${currency}`;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        // enabled: false,
        // external: function (t) {
        //   const tooltip = t.tooltip;
        //   if (!tooltip) return;
        //   var tooltipEl = document.getElementById('chartjs-tooltip');
        //   if (!tooltipEl) {
        //     tooltipEl = document.createElement('div');
        //     tooltipEl.id = 'chartjs-tooltip';
        //     tooltipEl.style.backgroundColor = '#FFFFFF';
        //     tooltipEl.style.borderColor = '#B2BABB';
        //     tooltipEl.style.borderWidth = 'thin';
        //     tooltipEl.style.borderStyle = 'solid';
        //     tooltipEl.style.zIndex = '999999';
        //     tooltipEl.style.backgroundColor = '#000000';
        //     tooltipEl.style.color = '#FFFFFF';
        //     document.body.appendChild(tooltipEl);
        //   }
        //   if (tooltip.opacity === 0) {
        //     tooltipEl.style.opacity = '0';
        //     return;
        //   } else {
        //     tooltipEl.style.opacity = '0.8';
        //   }

        //   tooltipEl.classList.remove('above', 'below', 'no-transform');
        //   if (tooltip.yAlign) {
        //     tooltipEl.classList.add(tooltip.yAlign);
        //   } else {
        //     tooltipEl.classList.add('no-transform');
        //   }

        //   function getBody(bodyItem) {
        //     return bodyItem.lines;
        //   }
        //   if (tooltip.body) {
        //     var titleLines = tooltip.title || [];
        //     var bodyLines = tooltip.body.map(getBody);
        //     var labelColorscustom = tooltip.labelColors;
        //     var innerHtml = '<table><thead>';
        //     innerHtml += '</thead><tbody>';

        //     let total: any = 0;
        //     bodyLines.forEach(function (body, i) {
        //       if (!body[0].includes('$0')) {
        //         var singleval = body[0].split(':');
        //         if (singleval[1].includes('-')) {
        //           var temp = singleval[1].split('$');
        //           var amount = '0';
        //           if(temp.length > 1 ){
        //             amount = temp[1].replace(/,/g, '');
        //           }

        //           total -= parseFloat(amount);
        //         } else {
        //           var temp = singleval[1].split('$');
        //           var amount = '0';
        //           if(temp.length > 1){
        //             amount = temp[1].replace(/,/g, '');
        //           }
        //           total += parseFloat(amount);
        //         }
        //       }
        //     });
        //     total = Math.round(total);
        //     if (total != 0) {
        //       var num_parts = total.toString().split('.');
        //       num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        //       total = num_parts.join('.');
        //     }
        //     titleLines.forEach(function (title) {
        //       innerHtml +=
        //         '<tr><th colspan="2" style="text-align: left;">' +
        //         title +
        //         ': $' +
        //         total +
        //         '</th></tr>';
        //     });
        //     bodyLines.forEach(function (body, i) {
        //       if (!body[0].includes('$0')) {
        //         var body_custom = body[0];
        //         body_custom = body_custom.split(':');
        //         const lastIndex = body_custom.length - 1;
        //         if (body_custom[lastIndex].includes('-')) {
        //           var temp_ = body_custom[lastIndex].split('$');
        //           temp_[1] = Math.round(temp_.length > 1? temp_[1].replace(/,/g, ''): 0);
        //           temp_[1] = temp_[1].toString();
        //           temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
        //           body_custom[lastIndex] = temp_.join('$');
        //         } else {
        //           var temp_ = body_custom[lastIndex].split('$');
        //           temp_[1] = Math.round(temp_.length > 1?temp_[1].replace(/,/g, ''):0);
        //           temp_[1] = temp_[1].toString();
        //           temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
        //           body_custom[lastIndex] = temp_.join('$');
        //         }

        //         body[0] = body_custom.join(':');
        //         innerHtml +=
        //           '<tr><td class="td-custom-tooltip-color"><span class="custom-tooltip-color" style="background:' +
        //           labelColorscustom[i].backgroundColor +
        //           '"></span></td><td style="padding: 0px">' +
        //           body[0] +
        //           '</td></tr>';
        //       }
        //     });
        //     innerHtml += '</tbody></table>';
        //     tooltipEl.innerHTML = innerHtml;
        //     //tableRoot.innerHTML = innerHtml;
        //   }
        //   // disable displaying the color box;
        //   var position = t.chart.canvas.getBoundingClientRect();
        //   // Display, position, and set styles for font
        //   tooltipEl.style.position = 'fixed';
        //   tooltipEl.style.left =
        //     position.left + window.pageXOffset + tooltip.caretX - 130 + 'px';
        //   tooltipEl.style.top =
        //     position.top + window.pageYOffset + tooltip.caretY - 70 + 'px';
        //   // tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        //   // tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        //   // tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        //   // tooltipEl.style.padding =
        //   //   tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        //   tooltipEl.style.pointerEvents = 'none';
        // },
        // displayColors: false,
        callbacks: {
          label: function (tooltipItems) {
            return `${tooltipItems.dataset.label}: $${tooltipItems.formattedValue}`;
          },
          title: tooltipItems => {
            return `${tooltipItems[0].label}: $${this.decimalPipe.transform(
              _.sumBy(tooltipItems, t => t.parsed.y)
            )}`;
          },
        },
      },
    },
  };

  public stackedChartOptionsDiscount: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency =
                label < 0
                  ? label.toString().split('-').join('')
                  : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              return `${label < 0 ? '- $' : '$'}${currency}`;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      legend: this.stackLegendGenerator,
      tooltip: {
        mode: 'x',
        callbacks: {
          label: function (tooltipItems) {
            return `${tooltipItems.dataset.label}: $${tooltipItems.formattedValue}`;
          },
          title: tooltipItems => {
            return `${tooltipItems[0].label}: $${this.decimalPipe.transform(
              _.sumBy(tooltipItems, t => t.parsed.y)
            )}`;
          },
        },
      },
    },
  };

  public labelBarOptionsMultiTC: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
      line: JeeveLineFillOptions,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (label: string | number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(label));
          },
        },
      },
    },
    plugins: {
      legend: this.stackLegendGenerator,
      tooltip: {
        mode: 'x',
        // enabled: false,
        // external: function (tooltipChart) {
        //   const tooltip = tooltipChart.tooltip;
        //   if (!tooltip) return;
        //   var tooltipEl = document.getElementById('chartjs-tooltip');
        //   if (!tooltipEl) {
        //     tooltipEl = document.createElement('div');
        //     tooltipEl.id = 'chartjs-tooltip';
        //     tooltipEl.style.backgroundColor = '#FFFFFF';
        //     tooltipEl.style.borderColor = '#B2BABB';
        //     tooltipEl.style.borderWidth = 'thin';
        //     tooltipEl.style.borderStyle = 'solid';
        //     tooltipEl.style.zIndex = '999999';
        //     tooltipEl.style.backgroundColor = '#000000';
        //     tooltipEl.style.color = '#FFFFFF';
        //     document.body.appendChild(tooltipEl);
        //   }
        //   if (tooltip.opacity === 0) {
        //     tooltipEl.style.opacity = '0';
        //     return;
        //   } else {
        //     tooltipEl.style.opacity = '0.8';
        //   }

        //   tooltipEl.classList.remove('above', 'below', 'no-transform');
        //   if (tooltip.yAlign) {
        //     tooltipEl.classList.add(tooltip.yAlign);
        //   } else {
        //     tooltipEl.classList.add('no-transform');
        //   }

        //   function getBody(bodyItem) {
        //     return bodyItem.lines;
        //   }
        //   if (tooltip.body) {
        //     var titleLines = tooltip.title || [];
        //     var bodyLines = tooltip.body.map(getBody);
        //     var labelColorscustom = tooltip.labelColors;
        //     var innerHtml = '<table><thead>';
        //     innerHtml += '</thead><tbody>';

        //     let total: any = 0;
        //     bodyLines.forEach(function (body, i) {
        //       if (!body[0].includes('$0')) {
        //         var singleval = body[0].split(':');
        //         if (singleval[1].includes('-')) {
        //           var temp = singleval[1].split('$');
        //           var amount = temp[1]?.replace(/,/g, '');
        //           total -= parseFloat(amount??'0');
        //         } else {
        //           var temp = singleval[1].split('$');
        //           var amount = temp[1]?.replace(/,/g, '');
        //           total += parseFloat(amount??'0');
        //         }
        //       }
        //     });
        //     total = Math.round(total);
        //     if (total != 0) {
        //       var num_parts = total.toString().split('.');
        //       num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        //       total = num_parts.join('.');
        //     }
        //     titleLines.forEach(function (title) {
        //       innerHtml +=
        //         '<tr><th colspan="2" style="text-align: left;">' +
        //         title +
        //         ': $' +
        //         total +
        //         '</th></tr>';
        //     });
        //     bodyLines.forEach(function (body, i) {
        //       if (!body[0].includes('$0')) {
        //         var body_custom = body[0];
        //         body_custom = body_custom.split(':');
        //         const lastIndex = body_custom.length - 1;
        //         if (body_custom[lastIndex].includes('-')) {
        //           var temp_ = body_custom[lastIndex].split('$');
        //           temp_[1] = Math.round(temp_.length > 1?temp_[1].replace(/,/g, ''):0);
        //           temp_[1] = temp_[1].toString();
        //           temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
        //           body_custom[lastIndex] = temp_.join('$');
        //         } else {
        //           var temp_ = body_custom[lastIndex].split('$');
        //           temp_[1] = Math.round(temp_.length > 1?temp_[1].replace(/,/g, ''):0);
        //           temp_[1] = temp_[1].toString();
        //           temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
        //           body_custom[lastIndex] = temp_.join('$');
        //         }

        //         body[0] = body_custom.join(':');
        //         innerHtml +=
        //           '<tr><td class="td-custom-tooltip-color"><span class="custom-tooltip-color" style="background:' +
        //           labelColorscustom[i].backgroundColor +
        //           '"></span></td><td style="padding: 0px">' +
        //           body[0] +
        //           '</td></tr>';
        //       }
        //     });
        //     innerHtml += '</tbody></table>';
        //     tooltipEl.innerHTML = innerHtml;
        //     //tableRoot.innerHTML = innerHtml;
        //   }
        //   // disable displaying the color box;
        //   var position = tooltipChart.chart.canvas.getBoundingClientRect();
        //   // Display, position, and set styles for font
        //   tooltipEl.style.position = 'fixed';
        //   tooltipEl.style.left =
        //     position.left + window.pageXOffset + tooltip.caretX - 130 + 'px';
        //   tooltipEl.style.top =
        //     position.top + window.pageYOffset + tooltip.caretY - 70 + 'px';
        //   // tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        //   // tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        //   // tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        //   // tooltipEl.style.padding =
        //   //   tooltip.yPadding + 'px ' + tooltip. + 'px';
        //   tooltipEl.style.pointerEvents = 'none';
        // },
        // displayColors: false,
        callbacks: {
          label: function (tooltipItems) {
            return `${tooltipItems.dataset.label}: $${tooltipItems.formattedValue}`;
          },
          title: tooltipItems => {
            const val = _.sumBy(tooltipItems, t => t.parsed.y);
            return `${tooltipItems[0].label}: $${this.decimalPipe.transform(
              val
            )}`;
          },
        },
      },
    },
  };

  public labelBarOptionsMultiPercentage: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
      line: JeeveLineFillOptions,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: (label: string | number) => {
            return `${Number(label)}%`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: (ctx, options) => {
          const tooltip = ctx.tooltip;
          if (!tooltip) return true;
          // disable displaying the color box;
          return false;
        },
        mode: 'x',
        callbacks: {
          label: tooltipItem => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}%`;
          },
          title: () => '',
        },
      },
    },
  };

  public labelBarOptionsTC: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        grid: {
          color: 'transparent',
        },
        stacked: false,
      },
      y: {
        stacked: false,
        grid: {
          color: 'transparent',
        },
        suggestedMin: 0,
        ticks: {
          callback: function (label: string | number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            return `${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(label))}`;
          },
          autoSkip: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        callbacks: {
          label: function (tooltipItems) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(tooltipItems.parsed.y);
          },
        },
      },
    },
  };

  public labelBarOptions: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: false,
        ticks: {
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency =
                label < 0
                  ? label.toString().split('-').join('')
                  : label.toString();
              //  if (currency.length > 3) {
              //    currency = currency.substring(0, 1) + 'K'
              //  } else{
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              //  }

              return `${label < 0 ? '- $' : '$'}${currency}`;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: tooltipItem => formatXTooltipLabel(tooltipItem),
          title: () => '',
        },
      },
    },
  };

  public labelBarOptionsSingleValue: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
      line: JeeveLineFillOptions,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: false,
        ticks: {
          callback: function (label, index, labels) {
            return `${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(label))}`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          label: (tooltipItems: TooltipItem<any>) => {
            let label = tooltipItems.label;
            return `${label} : ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(tooltipItems.parsed.y))}`;
          },
          title: () => '',
        },
      },
    },
  };

  public netProfitTrendMultiChartOptions: ChartOptions = {
    ...this.labelBarOptionsSingleValue,
    plugins: {
      tooltip: {
        mode: 'x',
        callbacks: {
          label: tooltipItems => {
            const label = tooltipItems.dataset.label;
            return `${label} : ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(tooltipItems.parsed.y)}`;
          },
          title: () => '',
        },
      },
    },
  };

  /************ Net Profit Percentage trend *************/
  public labelBarOptionsSingleValue1: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
      line: JeeveLineFillOptions,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: (label: string | number) => {
            return `${Number(label)}%`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          label: function (tooltipItems) {
            return `${tooltipItems.label} : ${tooltipItems.formattedValue}%`;
          },
          title: () => '',
        },
      },
    },
  };
  /************ Net Profit Percentage trend *************/

  public labelBarPercentOptions: any = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,

        ticks: {
          userCallback: function (item) {
            return item + '%';
          },
        },
      },
    },
    legend: {
      display: true,
    },
    tooltips: {
      mode: 'x-axis',
      custom: function (tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem, data) {
          return tooltipItem.xLabel + ': ' + tooltipItem.yLabel + '%';
        },
      },
    },
  };

  public labelBarPercentOptionsStacked: ChartOptions = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (item) {
            return item + '%';
          },
        },
      },
    },
    plugins: {
      legend: this.stackLegendGenerator,
      tooltip: {
        mode: 'x',
        callbacks: {
          label: function (tooltipItems) {
            const yValue = Math.round(tooltipItems.parsed.y);
            if (yValue > 0) {
              return `${tooltipItems.dataset.label}: ${yValue}%`;
            } else {
              return '';
            }
          },
          title: tooltipItems => tooltipItems[0].label,
        },
      },
    },
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
        onClick(e) {
          e.native.stopPropagation();
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return (
              tooltipItem.label +
              ': ' +
              tooltipItem.dataset.data[tooltipItem.dataIndex] +
              '%'
            );
          },
        },
      },
    },

    elements: {
      // center: {
      //   text: ''
      //   // sidePadding: 60
      // }
    },
  };

  public pieChartOptions2: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
        onClick: event => {
          event.native.stopPropagation();
        },
      },
      tooltip: {
        callbacks: {
          label: tooltipItem => formatXTooltipLabel(tooltipItem),
          title: () => '',
        },
      },
    },
  };
  public pieChartOptions1: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };
  public barChartOptions: ChartOptions<'bar'> = {
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeOutSine',
    },
    // barThickness: 10,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        suggestedMin: 0,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        onClick: function (e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart;
          if (index == 0) {
            (<HTMLElement>document.querySelector('.predicted1')).style.display =
              'flex';
            (<HTMLElement>document.querySelector('.predicted2')).style.display =
              'none';
            (<HTMLElement>document.querySelector('.predicted3')).style.display =
              'none';
            ci.getDatasetMeta(1).hidden = true;
            ci.getDatasetMeta(2).hidden = true;
            ci.getDatasetMeta(index).hidden = false;
          } else if (index == 1) {
            (<HTMLElement>document.querySelector('.predicted1')).style.display =
              'none';
            (<HTMLElement>document.querySelector('.predicted2')).style.display =
              'flex';
            (<HTMLElement>document.querySelector('.predicted3')).style.display =
              'none';
            ci.getDatasetMeta(0).hidden = true;
            ci.getDatasetMeta(2).hidden = true;
            ci.getDatasetMeta(index).hidden = false;
          } else if (index == 2) {
            (<HTMLElement>document.querySelector('.predicted1')).style.display =
              'none';
            (<HTMLElement>document.querySelector('.predicted2')).style.display =
              'none';
            (<HTMLElement>document.querySelector('.predicted3')).style.display =
              'flex';
            ci.getDatasetMeta(0).hidden = true;
            ci.getDatasetMeta(1).hidden = true;
            ci.getDatasetMeta(index).hidden = false;
          }
          ci.update();
        },
      },
    },
  };

  public proceedureChartOptions: ChartOptions<'bar'> = {
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
    animation: {
      duration: 1500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        ticks: {},
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'x',
        callbacks: {
          label: tooltipItems =>
            `${tooltipItems.dataset.label}: $${tooltipItems.formattedValue}`,
        },
      },
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
  // public stackedChartTypeHorizontal = 'bar';
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
    {
      data: [],
      label: 'Crowns',
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
      backgroundOverlayMode: 'multiply',
    },
    {
      data: [],
      label: 'Splints ',
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
      backgroundOverlayMode: 'multiply',
    },
    {
      data: [],
      label: 'Root Canals',
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
      backgroundOverlayMode: 'multiply',
    },
    {
      data: [],
      label: 'Perio Charts',
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
      backgroundOverlayMode: 'multiply',
    },
    {
      data: [],
      label: 'Surgical Extractions',
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
      backgroundOverlayMode: 'multiply',
    },
  ];

  public stackedChartData1: any[] = [];
  public stackedChartData2: any[] = [];
  public stackedChartData3: any[] = [];
  public stackedChartData4: any[] = [];
  public stackedChartData5: any[] = [];

  public predictedChartData: any[] = [
    {
      data: [],
      label: 'Indirect to Large Direct Fillings',
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
      backgroundOverlayMode: 'multiply',
    },
    {
      data: [],
      label: 'Extraction to RCT',
      hidden: true,
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
      backgroundOverlayMode: 'multiply',
    },
    {
      data: [],
      label: 'RCT Conversion',
      hidden: true,
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
      backgroundOverlayMode: 'multiply',
    },
  ];

  public predictedChartData1: any[] = [];
  public predictedChartData2: any[] = [];
  public predictedChartData3: any[] = [];

  // public proceedureChartType = 'bar';

  public proceedureChartData: any[] = [
    {
      data: [],
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
      backgroundOverlayMode: 'multiply',
    },
  ];
  public proceedureDentistChartData: any[] = [
    {
      data: [],
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
      backgroundOverlayMode: 'multiply',
    },
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
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'doughnut';
  public pieChartDatares: number[] = [];

  public pieChartLabelsres: string[] = [];

  public productionChartTotal = 0;

  // production
  public productionChartLabels: string[] = [];
  public productionChartData: number[] = [];
  public productionChartType = 'doughnut';
  public productionChartDatares: number[] = [];

  public productionChartLabelsres: string[] = [];
  public totalDiscountChartTotal = 0;

  // totalDiscount
  public totalDiscountChartLabels: string[] = [];
  public totalDiscountChartData: number[] = [];
  public totalDiscountChartType = 'doughnut';
  public totalDiscountChartDatares: number[] = [];

  public totalDiscountChartLabelsres: string[] = [];

  public totalOverdueAccount = 0;

  public totalOverdueAccountLabels: string[] = [];
  public totalOverdueAccountData: number[] = [];
  public totalOverdueAccountres: number[] = [];

  public totalOverdueAccountLabelsres: string[] = [];

  public expenseMultiChartData: ChartDataset[] = [];
  public expenseMultiChartLabels: string[] = [];

  public itemPredictedChartData: any[] = [
    {
      data: [10, 1, 5],
      label: 'Items Predictor Analysis ',
      shadowOffsetX: 3,
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
      backgroundOverlayMode: 'multiply',
    },
  ];

  public itemPredictedChartData1: any[] = [];

  public itemPredictedChartLabels: string[] = [];

  // events
  public chartClicked(e: any): void {}

  public chartHovered(e: any): void {}
  public gaugeType = 'arch';
  public gaugeValue = '';
  public totalProductionLabel = '';
  public gaugeThick = '20';
  public foregroundColor = '#4ccfae';
  public foregroundColor2 = '#4ccfae';
  public backgroundColor = '#f4f0fa';
  public cap = 'round';
  public size = '250';
  public totalProductionVal: any = 10;
  public gaugeValuePredicted1 = 0;
  public gaugeValuePredicted = 0;

  public gaugeValuePredicted2 = 0;

  public gaugeValuePredicted3 = 0;
  public gaugeLabelPredicted = '';
  public predictedDentistTotal = 0;
  public gaugePrependText = '$';
  public startDate = '';
  public endDate = '';
  public collectionAppend = '%';

  public collectionPercentage = 0;
  public productionVal = 0;

  public collectionVal = 0;

  loadDentist(newValue) {
    $('.sa_tabs_data button').prop('disabled', true);
    this.Apirequest = 5;

    $('#title').html('<span>Finances</span>');
    $('#sa_datepicker').val(
      this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate)
    );
    if (newValue == 'all') {
      $('.trend_toggle').hide();
      this.finTotalProduction();

      //this.netProfit();
      // this.netProfitPercent();

      this.netprofitstats = false;
      this.netprofitpercentstats = false;
      if (
        this.connectedwith != '' &&
        this.connectedwith != 'none' &&
        this.connectedwith != undefined
      ) {
        this.Apirequest = 8;
        this.productionstats = false;
        this.netProfitPms();
        this.netProfitPercentage();
        this.categoryExpenses();
      }

      this.finProductionByClinician();
      this.finProductionPerVisit();
      this.finTotalDiscounts();
      // this.finOverdueAccounts();

      // this.finCollection();
      /*
          (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'none';
          (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'block';
      
          (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'none';
          (<HTMLElement>document.querySelector('.noPatients')).style.display = 'block';*/
    } else {
      $('.trendToggle').show();
      this.selectedDentist = newValue;
      //   this.buildChartDentist();
      (<HTMLElement>(
        document.querySelector('.itemsPredictorSingle')
      )).style.display = 'block';
      (<HTMLElement>document.querySelector('.itemsPredictor')).style.display =
        'none';

      //  this.buildChartPredictorDentist();
      (<HTMLElement>(
        document.querySelector('.ratioPredictorSingle')
      )).style.display = 'block';
      (<HTMLElement>document.querySelector('.ratioPredictor')).style.display =
        'none';

      //   this.buildChartProceedureDentist();
      (<HTMLElement>(
        document.querySelector('.revenueProceedureSingle')
      )).style.display = 'block';
      (<HTMLElement>(
        document.querySelector('.revenueProceedure')
      )).style.display = 'none';
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

  public netProfitProductionTrendIcon;
  public netProfitProductionTrendTotal;

  public netProfitPmsTrendIcon;
  public netProfitPmsTrendTotal;
  public netprofitstatsError: boolean = false;

  private netProfitPms() {
    this.netProfitTrendTotal = 0;
    this.netprofitstatsError = false;
    this.financesService
      .NetProfitPms(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.connectedwith,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (res.status == 200) {
            this.netprofitstats = true;
            this.netProfitVal = Math.round(res.body.data);
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.netprofitstatsError = true;
          this.netprofitstats = true;
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  // Added by Hanney Sharma on 07-04-2021 for Net Profit %
  public netprofitPerError: boolean = false;
  private netProfitPercentage() {
    this.netProfitPmsVal = 0;
    this.netprofitPerError = false;
    this.financesService
      .netProfitPercentage(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.connectedwith,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (res.status == 200) {
            this.netprofitpercentstats = true;
            this.netProfitPmsVal = Math.round(res.body.data);
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.netprofitpercentstats = true;
          this.netprofitPerError = true;
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  pieTooltipText({ data, index }) {
    const labl = data.name.split('--');
    const label = labl[0];
    const exp = Math.round(labl[1])
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const val = data.value;
    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val"> ${val}% ($${exp})</span>
    `;
  }

  pieLabelText(labels) {
    const labl = labels.split('--');
    return labl[0];
  }

  public expensescChartTrendIcon;
  public expensescChartTrendTotal;
  public pieChartDataPercentres;
  public categoryExpensesLoader: boolean = false;
  public categoryExpensesError: boolean = false;
  //expenses
  private categoryExpenses() {
    this.categoryExpensesLoader = true;
    this.categoryExpensesError = false;
    this.expensescChartTrendIcon = 'down';
    this.expensescChartTrendTotal = 0;
    this.pieChartLabels = [];
    this.pieChartLabelsres = [];
    this.single = [];
    this.selectedData = [];
    this.unSelectedData = [];
    this.pieChartDatares = [];
    this.pieChartDataPercentres = [];
    this.expenseMultiChartData = [];
    this.expenseMultiChartLabels = [];
    this.financesService
      .categoryExpenses(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.connectedwith,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (res.status == 200) {
            this.categoryExpensesLoader = false;
            if (this.multipleClinicsSelected) {
              const production: number = res.body.production;

              Object.entries(
                _.chain(res.body.data).groupBy('account_name').value()
              ).forEach(([accountName, items], index) => {
                this.expenseMultiChartData.push({
                  data: _.chain(items)
                    .orderBy('clinic_id', 'asc')
                    .value()
                    .map(
                      item =>
                        _.round((item.expense / production) * 100 * 10) / 10
                    ),
                  label: accountName,
                  backgroundColor: this.doughnutChartColors[index],
                  hoverBackgroundColor: this.doughnutChartColors[index],
                });
              });
              this.expenseMultiChartLabels = _.chain(res.body.data)
                .uniqBy(item => item.clinic_name)
                .value()
                .map(item => item.clinic_name);
            } else {
              res.body.data.forEach((item: any) => {
                this.single.push({
                  name: `${item.account_name}--${item.expense}`,
                  value:
                    _.round((item.expense / res.body.production) * 100 * 10) /
                    10,
                });

                this.pieChartDatares.push(Math.round(item.expense));
                this.pieChartDataPercentres.push(
                  _.round((item.expense / res.body.production) * 100 * 10) / 10
                );
                this.pieChartLabelsres.push(item.account_name);
                this.pieChartTotal += item.expense;
              });
            }
            this.selectedDataFilter();
            this.unSelectedDataFilter();
            this.expensescChartTrendTotal = res.data_ta;
            if (
              Math.round(this.pieChartTotal) >=
              Math.round(this.expensescChartTrendTotal)
            ) {
              this.expensescChartTrendIcon = 'up';
            }
            this.pieChartData = this.pieChartDatares;
            this.pieChartLabels = this.pieChartLabelsres;
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.categoryExpensesError = true;
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public productionChartTrendIcon;
  public productionChartTrendTotal;
  //finProductionByClinician
  public finProductionByClinicianError: any;
  public finProductionByClinicianLoader: any;
  public showClinicByclinic: boolean = false;
  private finProductionByClinician() {
    this.productionChartDatares = [];
    this.finProductionByClinicianLoader = true;
    this.finProductionByClinicianError = false;
    this.productionChartTotal = 0;
    this.productionChartLabels = [];
    this.showClinicByclinic = false;
    this.financesService
      .finProductionByClinician(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.productionChartLabelsres = [];
          this.productionChartTotal = 0;
          this.productionChartTrendIcon = 'down';
          this.productionChartTrendTotal = 0;
          if (res.status == 200) {
            if (
              this.clinic_id.indexOf(',') >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.showClinicByclinic = true;
              res.body.data.sort(
                (a: any, b: any) =>
                  b.production_per_clinic - a.production_per_clinic
              );
            } else {
              res.body.data.sort(
                (a: any, b: any) => b.prod_per_clinician - a.prod_per_clinician
              );
            }
            this.finProductionByClinicianLoader = false;
            this.productionChartDatares = [];
            var totalPer = 0;
            if (res.body.data) {
              res.body.data.forEach(val => {
                if (this.showClinicByclinic) {
                  if (parseInt(val.production_per_clinic) > 0) {
                    totalPer =
                      (Math.round(val.production_per_clinic) * 100) /
                      res.body.total;
                    this.productionChartDatares.push(Math.round(totalPer));
                    this.productionChartLabelsres.push(val.clinic_name);
                    this.productionChartTotal =
                      this.productionChartTotal + Math.round(totalPer);
                  }
                } else {
                  if (parseInt(val.prod_per_clinician) > 0) {
                    this.productionChartDatares.push(
                      Math.round(val.prod_per_clinician)
                    );
                    this.productionChartLabelsres.push(val.provider_name);
                    this.productionChartTotal =
                      this.productionChartTotal +
                      parseInt(val.prod_per_clinician);
                  }
                }
              });
            }
            this.productionChartTrendTotal = res.body.total_ta;
            if (
              Math.round(this.productionChartTotal) >=
              Math.round(this.productionChartTrendTotal)
            )
              this.productionChartTrendIcon = 'up';
            if (this.productionChartDatares.every(item => item == 0))
              this.productionChartDatares = [];
            this.productionChartData = this.productionChartDatares;
            this.productionChartLabels = this.productionChartLabelsres;
          }
        },
        error: error => {
          this.finProductionByClinicianError = true;
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (this.user_type != '7') {
            this.toastr.error(
              'There was an error retrieving your report data, please contact our support team.'
            );
            this.warningMessage = 'Please Provide Valid Inputs!';
          }
        },
      });
  }
  public totalDiscountChartTrendIcon = 'down';
  public totalDiscountChartTrendTotal;
  public finTotalDiscountsLoader: any;
  public clinicsName: any;
  public clinicsids: any;
  public totalDiscountChartLabelsClinics: any;
  public totalDiscountChartClinicsData: any;
  public totalDiscountChartClinicsData1: any;
  public showClinicBar: boolean = false;
  //finProductionByClinician
  private finTotalDiscounts() {
    this.totalDiscountChartLabels = [];
    this.totalDiscountChartLabelsClinics = [];
    this.totalDiscountChartData = [];
    this.totalDiscountChartClinicsData = [];
    this.totalDiscountChartClinicsData1 = [];
    this.showClinicBar = false;
    this.finTotalDiscountsLoader = true;
    this.financesService
      .finTotalDiscounts(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.totalDiscountChartDatares = [];
          this.totalDiscountChartLabelsres = [];
          this.totalDiscountChartLabelsClinics = [];
          this.clinicsName = [];
          this.clinicsids = [];
          this.totalDiscountChartTotal = 0;
          this.totalDiscountChartTrendIcon = 'down';
          this.totalDiscountChartTrendTotal = 0;
          if (res.status == 200) {
            if (
              this.clinic_id.indexOf(',') >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.showClinicBar = true;
            } else {
              this.showClinicBar = false;
            }
            this.totalDiscountChartClinicsData = [];
            this.totalDiscountChartClinicsData1 = [];
            this.clinicsName = [];
            this.clinicsids = [];
            this.finTotalDiscountsLoader = false;
            this.totalDiscountChartDatares = [];
            this.totalDiscountChartTotal = 0;
            if (res.body.data == null || res.body.data.length <= 0) {
              this.finTotalDiscountsLoader = false;
              return;
            }
            res.body.data.sort((a, b) => b.discounts - a.discounts);
            res.body.data.forEach(res => {
              if (res.total != 0) {
                this.clinicsName.push(res.clinic_name);
                this.clinicsids.push(res.clinic_id);
                this.totalDiscountChartDatares.push(Math.round(res.discounts));
                var name = '';
                if (res.provider_name != '' && res.provider_name != null) {
                  name = res.provider_name;
                }
                this.totalDiscountChartLabelsres.push(name);
              }
            });
            this.clinicsName = [...new Set(this.clinicsName)];
            this.clinicsids = [...new Set(this.clinicsids)];
            this.totalDiscountChartLabelsClinics = this.clinicsName;
            const sumOfId = (id: any) =>
              res.body.data
                .filter(i => i.clinic_id === id)
                .reduce((a, b) => a + Math.round(b.discounts), 0);
            this.clinicsids.forEach(element => {
              this.totalDiscountChartClinicsData1.push(sumOfId(element));
            });
            this.totalDiscountChartClinicsData =
              this.totalDiscountChartClinicsData1;

            this.totalDiscountChartTotal = Math.round(res.body.total);
            this.percentOfTotalDiscount$.next(this.totalDiscountChartTotal);
            if (res.body.total_ta)
              this.totalDiscountChartTrendTotal = Math.round(res.body.total_ta);
            else this.totalDiscountChartTrendTotal = 0;

            if (
              Math.round(this.totalDiscountChartTotal) >=
              Math.round(this.totalDiscountChartTrendTotal)
            )
              this.totalDiscountChartTrendIcon = 'up';
            if (this.totalDiscountChartDatares.every(item => item == 0))
              this.totalDiscountChartDatares = [];
            this.totalDiscountChartData = this.totalDiscountChartDatares;
            this.totalDiscountChartLabels = this.totalDiscountChartLabelsres;
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }
  public totalProductionTrendIcon;
  public totalProductionTrendVal;
  public isAllClinic: boolean;
  public totalProductionCollection1: any[] = [
    {
      data: [],
      label: '',
      backgroundColor: [],
      hoverBackgroundColor: [],
    },
  ];
  public totalProductionCollectionLabel1 = [];
  public finTotalProductionLoader: any;
  //finTotalProduction
  private finTotalProduction() {
    this.finTotalProductionLoader = true;
    this.totalProductionTrendIcon = 'down';
    this.totalProductionTrendVal = 0;
    this.netProfitProductionVal = 0;
    this.financesService
      .finTotalProduction(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.queryWhEnabled
      )
      .subscribe(
        res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.totalProductionCollection1 = [
            {
              data: [],
              label: '',
              backgroundColor: [],
              hoverBackgroundColor: [],
            },
          ];
          if (res.status == 200) {
            this.productionstats = true;
            this.finTotalProductionLoader = false;
            this.totalProductionVal = res.body.total
              ? Math.round(res.body.total)
              : 0;
            this.netProfitProductionVal = res.body.total
              ? Math.round(res.body.total)
              : 0;
            this.totalProductionTrendVal = res.body.total_ta
              ? Math.round(res.body.total_ta)
              : 0;
            if (
              this.clinic_id.indexOf(',') >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.isAllClinic = true;
              const productions: any[] = [];

              res.body.data.forEach((item: any, idx: number) => {
                productions.push({
                  data: [Math.round(item.production)],
                  label: item.clinic_name,
                  backgroundColor: this.doughnutChartColors[idx],
                  hoverBackgroundColor: this.doughnutChartColors[idx],
                });
              });
              this.totalProductionCollection1 = productions;
            } else {
              this.isAllClinic = false;
              this.totalProductionCollection1[0]['data'] = [];
              this.totalProductionLabel = res.body.data[0]
                ? res.body.data[0].provider_name
                : '';

              this.totalProductionCollection1[0]['data'].push(
                this.totalProductionVal
              );

              if (
                Math.round(this.totalProductionVal) >=
                Math.round(this.totalProductionTrendVal)
              )
                this.totalProductionTrendIcon = 'up';
            }

            this.finCollection();
          }
        },
        error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        }
      );
  }

  //validate if input is decimal
  isDecimal(value: any) {
    if (typeof value != 'undefined') {
      if (String(value).includes('.')) return true;
    }
    return false;
  }

  public collectionPercentageC;
  public collectionTrendIcon;
  public collectionTrendVal;
  public totalProductionCollectionMax;
  public finCollectionLoader: boolean = true;

  //Collection
  private finCollection() {
    this.finCollectionLoader = true;
    this.collectionTrendIcon = 'down';
    this.collectionTrendVal = 0;
    this.financesService
      .finCollection(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (res.status == 200) {
            this.finCollectionLoader = false;
            this.collectionVal = 0;
            this.collectionVal = res.body.total
              ? Math.round(res.body.total)
              : 0;
            this.collectionPercentage = res.body.total_average
              ? Math.round(res.body.total_average)
              : 0;
            this.collectionTrendVal = res.body.total_ta
              ? Math.round(res.body.total_ta)
              : 0;

            if (
              this.clinic_id.indexOf(',') >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.isAllClinic = true;
              this.totalProductionCollection1 =
                this.totalProductionCollection1.map(item => {
                  const collectionItem = (<any[]>res.body.data).find(
                    ele => ele.clinic_name == item.label
                  );
                  return {
                    ...item,
                    data: !!collectionItem
                      ? [...item.data, Math.round(collectionItem.collection)]
                      : item.data,
                  };
                });

              this.totalProductionCollectionLabel1 = [
                'Production',
                'Collection',
              ];
            } else {
              this.isAllClinic = false;
              this.totalProductionCollection1[0]['data'].push(
                this.collectionVal
              );
              this.totalProductionCollectionLabel1 = [
                'Production',
                'Collection',
              ];
              this.totalProductionCollection1[0]['hoverBackgroundColor'] = [
                '#ffb4b5',
                '#4ccfae',
              ];
              this.totalProductionCollection1[0]['backgroundColor'] = [
                '#ffb4b5',
                '#4ccfae',
              ]; //as label are static we can add background color for that particular column as static
            }
            this.totalProductionCollectionMax = Math.max(
              ...this.totalProductionCollection1[0]['data']
            );
            if (this.totalProductionVal)
              this.collectionPercentageC = Math.round(
                (this.collectionVal / this.totalProductionVal) * 100
              );
            else this.collectionPercentageC = 0;

            if (
              Math.round(this.collectionVal) >=
              Math.round(this.collectionTrendVal)
            )
              this.collectionTrendIcon = 'up';
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public ProdPerVisit: any[] = [
    {
      data: [],
      label: '',
      shadowOffsetX: 3,
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
    },
  ];
  public productionTrendIcon;
  public showBar: boolean = false;
  public productionTrendVal;
  public finProductionPerVisitLoader: boolean = true;
  public ProductionTrend1 = [];
  public ProductionTrendLabels1 = [];
  private finProductionPerVisit() {
    this.showBar = false;
    this.finProductionPerVisitLoader = true;
    this.productionVal = 0;
    this.ProductionTrend1 = [];
    this.ProductionTrendLabels1 = [];
    this.productionTrendIcon = 'down';
    this.productionTrendVal = 0;
    this.financesService
      .finProductionPerVisit(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (res.status == 200) {
            this.ProdPerVisit[0]['data'] = [];
            this.ProductionTrend1 = [];
            this.ProductionTrendLabels1 = [];
            if (res.body.total > 0) {
              res.body.data.forEach(res => {
                this.ProductionTrend1.push(Math.round(res.prod_per_visit));
                this.ProductionTrendLabels1.push(res.clinic_name);
              });
            }
            if (
              this.clinic_id.indexOf(',') >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.showBar = true;
            }
            this.ProdPerVisit[0]['data'] = this.ProductionTrend1;
            this.finProductionPerVisitLoader = false;
            this.productionVal = Math.round(res.body.total);
            this.productionTrendVal = Math.round(res.body.total_ta);
            if (
              Math.round(this.productionVal) >=
              Math.round(this.productionTrendVal)
            )
              this.productionTrendIcon = 'up';
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public totalOverdueTrendAccount;
  public totalOverdueTrendIcon;
  public totalOverdueAccountDataMax;
  public finOverdueAccountsLoader: any;

  //finOverdueAccounts
  private finOverdueAccounts() {
    this.finOverdueAccountsLoader = true;
    this.financesService
      .finOverdueAccounts(
        this.clinic_id,
        this.startDate,
        this.endDate,
        this.duration,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          if (res.status == 200) {
            this.finOverdueAccountsLoader = false;

            this.totalOverdueAccountLabels = [];
            this.totalOverdueAccountres = [];
            this.totalOverdueAccountLabelsres = [];
            res.body.data.forEach(res => {
              if (res.overdue > 0) {
                this.totalOverdueAccountres.push(Math.round(res.overdue));
                this.totalOverdueAccountLabelsres.push(res.label);
              }
            });
            this.totalOverdueAccount = res.body.total;
            this.percentOfCurrentOverdue$.next(res.body.total);
            this.totalOverdueAccountData = this.totalOverdueAccountres;
            this.totalOverdueAccountLabels = this.totalOverdueAccountLabelsres;
            this.totalOverdueAccountDataMax = Math.max(
              ...this.totalOverdueAccountData
            );
          }
        },
        error: error => {
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public currentText;

  filterDate(duration) {
    $('.customRange').css('display', 'none');
    if (this.toggleChecked)
      // $('.target_off').click();
      this.toggleChecked = false;
    this.isCompleteMonth = true;
    $('.trendMode').hide();
    $('.nonTrendMode').css('display', 'block');
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_off').addClass('mat-button-toggle-checked');
    //   $('.trend_arrow').hide();
    if (duration == 'w') {
      this.duration = 'w';
      this.trendText = 'Last Week';
      this.currentText = 'This Week';

      const now = new Date();
      if (now.getDay() == 0) var day = 7;
      else var day = now.getDay();

      var first = now.getDate() - day + 1;
      var last = first + 6;
      var sd = new Date(now.setDate(first));

      this.startDate = this.datePipe.transform(sd.toUTCString(), 'dd-MM-yyyy');
      var end = now.setDate(sd.getDate() + 6);
      this.endDate = this.datePipe.transform(
        new Date(end).toUTCString(),
        'dd-MM-yyyy'
      );
      this.loadDentist('all');
    } else if (duration == 'm') {
      this.duration = 'm';
      this.trendText = 'Last Month';
      this.currentText = 'This Month';

      var date = new Date();
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth(), 1),
        'dd-MM-yyyy'
      );
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.loadDentist('all');
    } else if (duration == 'lm') {
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
      this.loadDentist('all');
    } else if (duration == 'q') {
      this.duration = 'q';
      this.trendText = 'Last Quarter';
      this.currentText = 'This Quarter';

      const now = new Date();
      var cmonth = now.getMonth() + 1;
      if (cmonth >= 1 && cmonth <= 3) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 0, 1),
          'dd-MM-yyyy'
        );
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy')
      } else if (cmonth >= 4 && cmonth <= 6) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 3, 1),
          'dd-MM-yyyy'
        );
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'dd-MM-yyyy');
      } else if (cmonth >= 7 && cmonth <= 9) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 6, 1),
          'dd-MM-yyyy'
        );
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'dd-MM-yyyy');
      } else if (cmonth >= 10 && cmonth <= 12) {
        this.startDate = this.datePipe.transform(
          new Date(now.getFullYear(), 9, 1),
          'dd-MM-yyyy'
        );
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 12, 0), 'dd-MM-yyyy');
      }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.loadDentist('all');
    } else if (duration == 'lq') {
      this.duration = 'lq';
      this.trendText = 'Previous Quarter';
      this.currentText = 'Last Quarter';

      const now = new Date();
      var cmonth = now.getMonth() + 1;

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
      this.loadDentist('all');
    } else if (duration == 'cytd') {
      this.trendText = 'Last Year';
      this.currentText = 'This Year';

      this.duration = 'cytd';
      var date = new Date();
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear(), 0, 1),
        'dd-MM-yyyy'
      );
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.loadDentist('all');
    } else if (duration == 'lcytd') {
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
      this.loadDentist('all');
    } else if (duration == 'fytd') {
      this.duration = 'fytd';
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
      this.loadDentist('all');
    } else if (duration == 'lfytd') {
      this.trendText = 'Previous Financial Year';
      this.currentText = 'Last Financial Year';
      this.duration = 'lfytd';
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
      /* this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
       this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');       */
      this.loadDentist('all');
    } else if (duration == 'custom') {
      this.trendText = '';
      this.currentText = '';
      this.duration = 'custom';
      // $('.customRange').css('display', 'block');
      //let selectedDate = this.chartService.customSelectedDate$.value;
      let selectedDate = null;
      if (selectedDate == null) {
        let newAppLayoutData: any = localStorage.getItem('layout');
        if (newAppLayoutData) {
          newAppLayoutData = JSON.parse(newAppLayoutData);
          if (newAppLayoutData.dateRange) {
            selectedDate = {
              startDate: moment(newAppLayoutData.dateRange.start).format(
                'YYYY-MM-DD'
              ),
              endDate: moment(newAppLayoutData.dateRange.end).format(
                'YYYY-MM-DD'
              ),
            };
          }
        }
      }
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
        this.isCompleteMonth = true;
      } else {
        this.isCompleteMonth = false;
      }
      this.loadDentist('all');
    }
    $('.filter').removeClass('active');
    $('.filter_' + duration).addClass('active');
    // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
  }

  // Get Dentist
  // getDentists() {
  //   this.dentistService.getDentists(this.clinic_id).subscribe(
  //     (res) => {
  //       if (res.status == 200) {
  //         this.dentists = res.body.data;
  //         this.dentistCount = res.body.data.length;
  //       } else if (res.status == 401) {
  //         this._cookieService.put('username', '');
  //         this._cookieService.put('email', '');
  //         this._cookieService.put('userid', '');
  //         this.router.navigateByUrl('/login');
  //       }
  //     },
  //     (error) => {
  //       this.warningMessage = 'Please Provide Valid Inputs!';
  //     }
  //   );
  // }
  changeDentistPredictor(val) {
    if (val == '1') {
      this.gaugeValuePredicted = this.gaugeValuePredicted1 * 100;
      this.predictedDentistTotal = this.gaugeValuePredicted1;
    } else if (val == '2') {
      this.gaugeValuePredicted = this.gaugeValuePredicted2 * 100;
      this.predictedDentistTotal = this.gaugeValuePredicted2;
    } else if (val == '3') {
      this.gaugeValuePredicted = this.gaugeValuePredicted3 * 100;
      this.predictedDentistTotal = this.gaugeValuePredicted3;
    }
  }
  ytd_load(val) {
    alert(this.datePipe.transform(val, 'dd-MM-yyyy'));
  }
  async choosedDate(val) {
    val = val.chosenLabel;
    var val = val.toString().split(' - ');

    var date2: any = new Date(val[1]);
    var date1: any = new Date(val[0]);
    var diffTime: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    if (diffTime <= 365) {
      this.startDate = this.datePipe.transform(val[0], 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(val[1], 'dd-MM-yyyy');
      this.duration = 'custom';

      // this.loadDentist('all');
      // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
      $('.customRange').css('display', 'none');
    } else {
      await Swal.fire({
        text: 'Please select date range within 365 Days',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
    }
  }
  myDateParser(dateStr: string): string {
    // 2018-01-01T12:12:12.123456; - converting valid date format like this

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20);

    let validDate = date;
    return validDate;
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

      this.toggleChangeProcess();
      this.displayProfit(1);
    } else if (val == 'historic') {
      this.toggleChecked = true;
      this.trendValue = 'h';
      this.startDate = this.datePipe.transform(
        new Date(date.getFullYear() - 10, date.getMonth(), 1),
        'dd-MM-yyyy'
      );

      this.toggleChangeProcess();
      this.displayProfit(1);
    } else if (val == 'off') {
      this.filterDate('m');
      $('.trendMode').hide();
      $('.nonTrendMode').css('display', 'block');
    }
    $('.expenses_card').removeClass('active');
  }
  flipcard(div: string) {
    if ($('.' + div).hasClass('active')) $('.' + div).removeClass('active');
    else $('.' + div).addClass('active');
  }
  initiate_dentist() {
    var val = $('.internal_dentist').val();
    //this.loadDentist(val);
  }

  toggleChecked = false;
  trendValue = '';
  isDisabled = true;
  isChecked = true;
  mode = 'Internal';
  toggleChanged() {
    if (this.toggleChecked == true) {
      this.isDisabled = false;
      this.trendValue = 'c';
      this.isChecked = true;
      this.toggleChangeProcess();
    } else if (this.toggleChecked == false) {
      this.isDisabled = true;
      //    this.showTrend =false;
    }
  }
  onChange(mrChange) {
    this.trendValue = mrChange.value;

    this.toggleChangeProcess();
  }
  public totalProductionCollection: any[] = [
    { data: [], label: 'Production' },
    { data: [], label: 'Collection' },
  ];
  public totalProductionCollectionLabel = [];
  public netProfitDisplayVal;

  toggleChangeProcess() {
    this.Apirequest = 5;
    if (this.toggleChecked) {
      $('.filter').removeClass('active');
      $('.trendMode').css('display', 'block');
      $('.nonTrendMode').hide();

      this.finTotalProductionTrend();
      if (
        this.connectedwith != '' &&
        this.connectedwith != 'none' &&
        this.connectedwith != undefined
      ) {
        this.Apirequest = 8;
        this.expensestrendstats = false;
        this.finNetProfitPMSTrend();
        this.finNetProfitPMSPercentTrend();
        this.finExpensesByCategoryTrend();
      }

      this.finProductionPerVisitTrend();
      this.finTotalDiscountsTrend();
      this.finProductionByClinicianTrend();
      this.netProfitDisplayVal = '1';
    }
  }

  public productionChartTrend: any[] = [
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
  ];
  public productionChartTrendLabels = [];
  public productionChartTrendLabels1 = [];
  public finProductionByClinicianTrendLoader: any;
  public finProductionByClinicianTrendError: any;
  public showClinic: boolean = false;
  private finProductionByClinicianTrend() {
    this.finProductionByClinicianTrendLoader = true;
    this.finProductionByClinicianTrendError = false;
    this.productionChartTrendLabels = [];
    this.productionChartTrendLabels1 = [];
    this.productionChartTrend = [];
    this.financesService
      .finProductionByClinicianTrend(
        this.clinic_id,
        this.trendValue,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.showClinic = false;
          this.finProductionByClinicianTrendLoader = false;
          if (res.status == 200) {
            res.body.data.sort((a, b) =>
              a.duration === b.duration ? 0 : a.duration > b.duration || -1
            );
            res.body.data.forEach(res => {
              const sumProd = res.val.reduce(
                (accumulator, current) =>
                  accumulator + Number(current['production']),
                0
              );
              res.val.forEach((result, key) => {
                if (typeof this.productionChartTrend[key] == 'undefined') {
                  this.productionChartTrend[key] = { data: [], label: '' };
                }
                if (
                  typeof this.productionChartTrend[key]['data'] == 'undefined'
                ) {
                  this.productionChartTrend[key]['data'] = [];
                }
                if (this.clinic_id.indexOf(',') >= 0) {
                  this.showClinic = true;
                  var total = Math.trunc(result.production);
                  if (
                    result.production > 0 &&
                    result.production.toString().includes('.')
                  ) {
                    var num_parts = result.production.split('.');
                    num_parts[1] = num_parts[1].charAt(0);
                    total = num_parts.join('.');
                  }
                  this.productionChartTrend[key]['data'].push(
                    (total / sumProd) * 100
                  );
                  this.productionChartTrend[key]['label'] = result.clinic_name;
                } else {
                  if (Array.isArray(this.clinic_id)) {
                    this.showClinic = true;
                    var total1 = Math.trunc(result.production);
                    if (
                      result.production > 0 &&
                      result.production.toString().includes('.')
                    ) {
                      var num_parts = result.production.split('.');
                      num_parts[1] = num_parts[1].charAt(0);
                      total1 = num_parts.join('.');
                    }
                    this.productionChartTrend[key]['data'].push(
                      (total1 / sumProd) * 100
                    );
                    this.productionChartTrend[key]['label'] =
                      result.clinic_name;
                  } else {
                    this.showClinic = false;
                    var total2 = result.prod_per_clinician;
                    if (
                      result.prod_per_clinician > 0 &&
                      result.prod_per_clinician.toString().includes('.')
                    ) {
                      var num_parts = result.prod_per_clinician.split('.');
                      num_parts[1] = num_parts[1].charAt(0);
                      total2 = num_parts.join('.');
                    }
                    this.productionChartTrend[key]['data'].push(
                      parseFloat(total2)
                    );
                    this.productionChartTrend[key]['label'] =
                      result.provider_name;
                  }
                }
                this.productionChartTrend[key]['backgroundColor'] =
                  this.doughnutChartColors[key];
                this.productionChartTrend[key]['hoverBackgroundColor'] =
                  this.doughnutChartColors[key];
              });
              if (this.trendValue == 'c')
                this.productionChartTrendLabels1.push(
                  this.datePipe.transform(res.duration, 'MMM y')
                );
              else this.productionChartTrendLabels1.push(res.duration);
            });
            this.productionChartTrendLabels = this.productionChartTrendLabels1;
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.finProductionByClinicianTrendError = true;
          this.toastr.error(
            'There was an error retrieving your report data, please contact our support team.'
          );
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public discountsChartTrend: any[] = [
    {
      data: [],
      label: '',
      shadowOffsetX: 3,
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
      backgroundOverlayMode: 'multiply',
    },
  ];
  public discountsChartTrendMulti: any[] = [{ data: [], label: '' }];
  public discountsChartTrend1 = [];
  public discountsChartTrendLabels = [];
  public discountsChartTrendLabels1 = [];
  public discountsChartTrendMultiLabels = [];
  public discountsChartTrendMultiLabels1 = [];
  public finTotalDiscountsTrendLoader: any;
  public showByclinic: boolean = false;

  private finTotalDiscountsTrend() {
    this.discountsChartTrendLabels = [];
    this.discountsChartTrendLabels1 = [];
    this.discountsChartTrendMultiLabels = [];
    this.discountsChartTrendMultiLabels1 = [];
    this.discountsChartTrend1 = [];
    this.finTotalDiscountsTrendLoader = true;
    this.showByclinic = false;
    this.discountsChartTrendMulti = [];
    this.financesService
      .finTotalDiscountsTrend(
        this.clinic_id,
        this.trendValue,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (res.status == 200) {
            if (res.body.data == null || res.body.data.length <= 0) {
              this.finTotalDiscountsTrendLoader = false;
              return;
            }

            if (
              this.clinic_id.indexOf(',') >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.showByclinic = true;
            }
            this.finTotalDiscountsTrendLoader = false;
            if (
              this.clinic_id.indexOf(',') >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.discountsChartTrendMulti = [];
              Object.entries(
                _.chain(res.body.data).groupBy('clinic_id').value()
              ).forEach(([, items], index) => {
                const data: number[] = (<any>items).map(item =>
                  Math.round(parseInt(item.discounts))
                );
                const label = items[0].clinic_name;
                const backgroundColor = this.doughnutChartColors[index];
                this.discountsChartTrendMulti.push({
                  data,
                  label,
                  backgroundColor,
                  hoverBackgroundColor: backgroundColor,
                });

                if (index == 0) {
                  this.discountsChartTrendMultiLabels1 =
                    this.trendValue == 'c'
                      ? (<any>items).map(item =>
                          this.datePipe.transform(item.year_month, 'MMM y')
                        )
                      : (<any>items).map(item => item.year);
                }
              });

              this.discountsChartTrendMultiLabels =
                this.discountsChartTrendMultiLabels1;
            } else {
              res.body.data.forEach(res => {
                this.discountsChartTrend1.push(Math.round(res.discounts));
                if (this.trendValue == 'c')
                  this.discountsChartTrendLabels1.push(
                    this.datePipe.transform(res.year_month, 'MMM y')
                  );
                else this.discountsChartTrendLabels1.push(res.year);
              });
              if (this.discountsChartTrend1.every(item => item == 0))
                this.discountsChartTrend1 = [];
              this.discountsChartTrend[0]['data'] = this.discountsChartTrend1;
              this.discountsChartTrendLabels = this.discountsChartTrendLabels1;
            }
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public overdueChartTrend: any[] = [
    {
      data: [],
      label: '',
      shadowOffsetX: 3,
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
      backgroundOverlayMode: 'multiply',
    },
  ];
  public overdueChartTrend1 = [];
  public overdueChartTrendLabels = [];
  public overdueChartTrendLabels1 = [];
  public finOverdueAccountsTrendLoader: any;

  private finOverdueAccountsTrend() {
    this.finOverdueAccountsTrendLoader = true;
    this.overdueChartTrendLabels1 = [];
    this.overdueChartTrendLabels = [];
    this.overdueChartTrend1 = [];
    this.financesService
      .finOverdueAccountsTrend(
        this.clinic_id,
        this.trendValue,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (res.status == 200) {
            this.finOverdueAccountsTrendLoader = false;
            res.body.data.forEach(res => {
              this.overdueChartTrend1.push(Math.round(res.val.total));
              if (this.trendValue == 'c')
                this.overdueChartTrendLabels1.push(
                  this.datePipe.transform(res.duration, 'MMM y')
                );
              else this.overdueChartTrendLabels1.push(res.duration);
            });
            this.overdueChartTrend[0]['data'] = this.overdueChartTrend1;

            this.overdueChartTrendLabels = this.overdueChartTrendLabels1;
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public totalProductionChartTrend: any[] = [
    {
      data: [],
      label: '',
      shadowOffsetX: 3,
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
      backgroundOverlayMode: 'multiply',
    },
  ];
  public netProfitPercentChartTrendMulti: any[] = [
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
  ];

  public totalProductionChartTrendMulti: any[] = [
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
  ];

  public netProfitPmsChartTrendMulti: any[] = [
    { data: [], label: '' },
    { data: [], label: '' },
  ];

  public netProfitPmsPercentChartTrendMulti: any[] = [
    { data: [], label: '' },
    { data: [], label: '' },
  ];

  public totalProductionChartTrend1 = [];
  public totalProductionChartTrendLabels = [];
  public totalProductionChartTrendLabels1 = [];
  public finTotalProductionTrendLoader: any;
  public PMonthRange;
  public PYearRange;
  public cName;
  public cids;
  public totalProductionChartTrendLabelsMulti = [];
  public showProdByclinic: boolean = false;

  public get isSingleNetProfitTrendChartVisible(): boolean {
    return (
      (this.xeroConnect || this.myobConnect) &&
      !this.multipleClinicsSelected &&
      this.netProfitDisplayVal == 2 &&
      this.netProfitPercentChartTrendLabels.length > 0
    );
  }

  public get isMultipleNetProfitTrendChartVisible(): boolean {
    return (
      (this.xeroConnect || this.myobConnect) &&
      this.multipleClinicsSelected &&
      this.netProfitDisplayVal == 2 &&
      this.netProfitPercentChartTrendLabels.length > 0
    );
  }

  public get isMultipleNetProfitPercentTrendChartVisible(): boolean {
    return (
      (this.xeroConnect || this.myobConnect) &&
      this.multipleClinicsSelected &&
      this.netProfitDisplayVal == 3 &&
      this.netProfitPercentChartTrendLabels.length > 0
    );
  }

  public get hasNoSingleOrMultipleNetProfitPercentChartTrend(): boolean {
    return (
      (this.xeroConnect || this.myobConnect) &&
      this.netProfitDisplayVal == 2 &&
      !this.finNetProfitPercentTrendLoader &&
      this.netProfitPercentChartTrendLabels.length == 0
    );
  }

  public get isXeroOrMyobDisconnected(): boolean {
    return (
      !(this.xeroConnect || this.myobConnect) &&
      this.netProfitDisplayVal == 2 &&
      !this.multipleClinicsSelected
    );
  }

  private finTotalProductionTrend() {
    this.finTotalProductionTrendLoader = true;
    this.finNetProfitTrendLoader = true;
    this.totalProductionChartTrendLabels1 = [];
    this.totalProductionChartTrend1 = [];
    this.showProdByclinic = false;
    this.financesService
      .finTotalProductionTrend(
        this.clinic_id,
        this.trendValue,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.totalProductionChartTrendLabels1 = [];
          this.PMonthRange = [];
          this.PYearRange = [];
          this.cName = [];
          this.cids = [];
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (res.status == 200) {
            if (
              this.clinic_id.indexOf(',') >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.showProdByclinic = true;
            }
            this.finTotalProductionTrendLoader = false;
            this.finNetProfitTrendLoader = false;
            res.body.data.sort((a, b) => a.year - b.year);
            res.body.data.forEach(item => {
              this.PMonthRange.push(item.year_month);
              this.PYearRange.push(item.year);
              this.cName.push(item.clinic_name);
              this.cids.push(item.clinic_id);
            });
            const sumClinics = (range: any) =>
              res.body.data
                .filter(i => i.year_month === range)
                .reduce((a, b) => a + Math.round(b.production), 0);
            const sumClinics1 = (range: any) =>
              res.body.data
                .filter(i => i.year === range)
                .reduce((a, b) => a + Math.round(b.production), 0);
            this.cName = [...new Set(this.cName)];
            this.cids = [...new Set(this.cids)];
            this.PMonthRange = [...new Set(this.PMonthRange)];
            this.PYearRange = [...new Set(this.PYearRange)];
            if (this.trendValue == 'c') {
              this.PMonthRange.forEach(ele => {
                this.totalProductionChartTrend1.push(sumClinics(ele));
                this.totalProductionChartTrendLabels1.push(
                  this.datePipe.transform(ele, 'MMM y')
                );
              });
            } else {
              this.PYearRange.forEach(ele => {
                this.totalProductionChartTrend1.push(sumClinics1(ele));
                this.totalProductionChartTrendLabels1.push(ele);
              });
            }

            this.totalProductionChartTrend[0]['data'] =
              this.totalProductionChartTrend1;
            this.totalProductionChartTrendLabels =
              this.totalProductionChartTrendLabels1;
            this.finCollectionTrend();

            if (
              this.clinic_id.indexOf(',') >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.totalProductionChartTrendMulti = [];
              Object.entries(
                _.chain(res.body.data).groupBy('clinic_id').value()
              ).forEach(([, items], index) => {
                const data: number[] = (<any>items).map(item =>
                  Math.round(parseInt(item.production))
                );
                const label = items[0].clinic_name;
                const backgroundColor = this.doughnutChartColors[index];
                this.totalProductionChartTrendMulti.push({
                  data,
                  label,
                  backgroundColor,
                  hoverBackgroundColor: backgroundColor,
                });
              });

              this.totalProductionChartTrendLabelsMulti =
                this.totalProductionChartTrendLabels1;
            }
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public collectionChartTrend: any[] = [
    {
      data: [],
      label: '',
      shadowOffsetX: 3,
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
      backgroundOverlayMode: 'multiply',
    },
  ];
  public collectionChartTrend1 = [];
  public collectionChartTrendLabels = [];
  public collectionChartTrendLabels1 = [];
  public collectionChartTrendMultiData: any[] = [];
  public collectionChartTrendMultiLabels = [];
  public finCollectionTrendLoader: boolean;
  public CMonthRange;
  public CYearRange;
  private finCollectionTrend() {
    this.finCollectionTrendLoader = true;
    this.collectionChartTrendLabels1 = [];
    this.collectionChartTrend1 = [];

    this.financesService
      .finCollectionTrend(this.clinic_id, this.trendValue, this.queryWhEnabled)
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.CMonthRange = [];
          this.CYearRange = [];
          this.collectionChartTrendMultiData = [];
          if (res.status == 200) {
            this.finCollectionTrendLoader = false;
            if (
              this.clinic_id.indexOf(',') >= 0 ||
              Array.isArray(this.clinic_id)
            ) {
              this.collectionChartTrendMultiData = [];
              Object.entries(
                _.chain(res.body.data).groupBy('clinic_id').value()
              ).forEach(([, items], index) => {
                const data: number[] = (<any>items).map(item =>
                  Math.round(parseInt(item.collection))
                );
                const label = items[0].clinic_name;
                const backgroundColor = this.doughnutChartColors[index];
                this.collectionChartTrendMultiData.push({
                  data,
                  label,
                  backgroundColor,
                  hoverBackgroundColor: backgroundColor,
                });
              });
              this.isAllClinic = true;
              // res.body.data_combined.sort((a, b) =>
              //   a.duration === b.duration ? 0 : a.duration > b.duration || -1
              // );
              // res.body.data_combined.forEach((res) => {
              //   res.val.forEach((result, key) => {
              //     if (
              //       typeof this.collectionChartTrendMultiData[key] ==
              //       'undefined'
              //     ) {
              //       this.collectionChartTrendMultiData[key] = {
              //         data: [],
              //         label: '',
              //       };
              //     }
              //     if (
              //       typeof this.collectionChartTrendMultiData[key]['data'] ==
              //       'undefined'
              //     ) {
              //       this.collectionChartTrendMultiData[key]['data'] = [];
              //     }
              //     this.collectionChartTrendMultiData[key]['data'].push(
              //       Math.round(result.collection)
              //     );
              //     this.collectionChartTrendMultiData[key]['label'] =
              //       result.clinic_name;
              //     this.collectionChartTrendMultiData[key]['backgroundColor'] =
              //       this.doughnutChartColors[key];
              //     this.collectionChartTrendMultiData[key][
              //       'hoverBackgroundColor'
              //     ] = this.doughnutChartColors[key];
              //   });
              // });
            } else {
              this.isAllClinic = false;
            }
            res.body.data.sort((a, b) => a.year - b.year);
            res.body.data.forEach(res => {
              this.CMonthRange.push(res.year_month);
              this.CYearRange.push(res.year);
              // this.collectionChartTrend1.push(Math.round(res.collection));
              // if (this.trendValue == 'c')
              //   this.collectionChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              // else
              //   this.collectionChartTrendLabels1.push(res.year);
            });
            const CsumClinics = (range: any) =>
              res.body.data
                .filter(i => i.year_month === range)
                .reduce((a, b) => a + Math.round(b.collection), 0);
            const CsumClinics1 = (range: any) =>
              res.body.data
                .filter(i => i.year === range)
                .reduce((a, b) => a + Math.round(b.collection), 0);

            this.CMonthRange = [...new Set(this.CMonthRange)];
            this.CYearRange = [...new Set(this.CYearRange)];
            if (this.trendValue == 'c') {
              this.CMonthRange.forEach(ele => {
                this.collectionChartTrend1.push(CsumClinics(ele));
                this.collectionChartTrendLabels1.push(
                  this.datePipe.transform(ele, 'MMM y')
                );
              });
            } else {
              this.CYearRange.forEach(ele => {
                this.collectionChartTrend1.push(CsumClinics1(ele));
                this.collectionChartTrendLabels1.push(ele);
              });
            }

            this.totalProductionCollection[0]['data'] =
              this.totalProductionChartTrend1;
            this.totalProductionCollection[1]['data'] =
              this.collectionChartTrend1;
            this.totalProductionCollectionLabel =
              this.totalProductionChartTrendLabels1;
            this.collectionChartTrendMultiLabels =
              this.collectionChartTrendLabels1;

            this.collectionChartTrend[0]['data'] = this.collectionChartTrend1;
            this.collectionChartTrendLabels = this.collectionChartTrendLabels1;
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public productionVisitChartTrend: any[] = [
    {
      data: [],
      label: '',
      shadowOffsetX: 3,
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
      backgroundOverlayMode: 'multiply',
    },
  ];
  public productionVisitChartTrend1 = [];
  public productionVisitChartTrendLabels = [];
  public productionVisitChartTrendLabels1 = [];
  public finProductionPerVisitTrendLoader: any;
  public VMonthRange;
  public VYearRange;
  public clinicIds;
  private finProductionPerVisitTrend() {
    this.finProductionPerVisitTrendLoader = true;
    this.productionVisitChartTrendLabels1 = [];
    this.productionVisitChartTrendLabels = [];
    this.productionVisitChartTrend1 = [];
    var user_id;
    var clinic_id;
    this.VMonthRange = [];
    this.VYearRange = [];
    this.clinicIds = [];
    this.financesService
      .finProductionPerVisitTrend(
        this.clinic_id,
        this.trendValue,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.productionVisitChartTrendLabels = [];
          this.productionVisitChartTrendLabels1 = [];
          this.finProductionPerVisitTrendLoader = false;
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (res.body.data && res.status == 200) {
            res.body.data.sort((a, b) =>
              a.year_month === b.year_month
                ? 0
                : a.year_month > b.year_month || -1
            );
            res.body.data.forEach(res => {
              this.VMonthRange.push(res.year_month);
              this.VYearRange.push(res.year);
              this.clinicIds.push(res.clinic_id);
              // this.productionVisitChartTrend1.push(Math.round(res.production));
              // if (this.trendValue == 'c')
              //   this.productionVisitChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              // else
              //   this.productionVisitChartTrendLabels1.push(res.year);
            });

            const vsumClinics = (range: any) =>
              res.body.data
                .filter(i => i.year_month === range)
                .reduce((a, b) => a + Math.round(b.production), 0);
            const vsumClinicsVisits = (range: any) =>
              res.body.data
                .filter(i => i.year_month === range)
                .reduce((a, b) => a + Math.round(b.num_visits), 0);
            const vsumClinics1 = (range: any) =>
              res.body.data
                .filter(i => i.year === range)
                .reduce((a, b) => a + Math.round(b.production), 0);
            const vsumClinics1Visits = (range: any) =>
              res.body.data
                .filter(i => i.year === range)
                .reduce((a, b) => a + Math.round(b.num_visits), 0);

            this.VMonthRange = [...new Set(this.VMonthRange)];
            this.VYearRange = [...new Set(this.VYearRange)];
            this.clinicIds = [...new Set(this.clinicIds)];
            if (this.trendValue == 'c') {
              this.VMonthRange.forEach(ele => {
                this.productionVisitChartTrend1.push(
                  Math.round(vsumClinics(ele) / vsumClinicsVisits(ele))
                );
                this.productionVisitChartTrendLabels1.push(
                  this.datePipe.transform(ele, 'MMM y')
                );
              });
            } else {
              this.VYearRange.forEach(ele => {
                this.productionVisitChartTrend1.push(
                  Math.round(vsumClinics1(ele) / vsumClinics1Visits(ele))
                );
                this.productionVisitChartTrendLabels1.push(ele);
              });
            }
            this.productionVisitChartTrend[0]['data'] =
              this.productionVisitChartTrend1;

            this.productionVisitChartTrendLabels =
              this.productionVisitChartTrendLabels1;
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public netProfitChartTrend: any[] = [
    {
      data: [],
      label: '',
      shadowOffsetX: 3,
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
      backgroundOverlayMode: 'multiply',
    },
  ];
  public netProfitChartTrend1 = [];
  public netProfitChartTrendLabels = [];
  public netProfitChartTrendLabels1 = [];
  public finNetProfitTrendLoader: any;

  public netProfitPercentChartTrend: any[] = [
    {
      data: [],
      label: '',
      shadowOffsetX: 3,
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
      backgroundOverlayMode: 'multiply',
    },
  ];
  public netProfitPercentChartTrend1 = [];
  public netProfitPercentChartTrendLabels = [];
  public netProfitPercentChartTrendLabels1 = [];
  public finNetProfitPercentTrendLoader: boolean;

  public netProfitPmsChartTrend: any[] = [
    {
      data: [],
      label: '',
      shadowOffsetX: 3,
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
      backgroundOverlayMode: 'multiply',
    },
  ];
  public netProfitPmsChartTrend1 = [];
  public netProfitPmsChartTrendLabels = [];
  public netProfitPmsChartTrendLabels1 = [];
  public finNetProfitPMSTrendLoader: any;

  public checkXeroStatus() {
    this.clinicSettingsService.checkXeroStatus(this.clinic_id).subscribe(
      res => {
        if (res.body.message != 'error') {
          if (res.body.data.xero_connect == 1) {
            this.xeroConnect = true;
          } else {
            this.xeroConnect = false;
          }
        } else {
          this.xeroConnect = false;
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }

  checkMyobStatus() {
    this.clinicSettingsService.checkMyobStatus(this.clinic_id).subscribe(
      res => {
        if (res.body.message != 'error') {
          if (res.body.data.myob_connect == 1) {
            this.myobConnect = true;
          } else {
            this.myobConnect = false;
          }
        } else {
          this.myobConnect = false;
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }

  public trendxero = false;
  private finNetProfitPMSTrend() {
    this.netProfitChartTrend1 = [];
    let labels: string[] = [];
    this.netProfitPmsChartTrendLabels = [];
    this.trendxero = true;
    this.financesService
      .finNetProfitPMSTrend(
        this.clinic_id,
        this.trendValue,
        this.connectedwith,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.trendxero = false;
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);

          if (res.status == 200) {
            if (res.body.data) {
              if (this.multipleClinicsSelected) {
                this.netProfitPmsChartTrendMulti = [];
                const datasets: any[] = [];
                const totalData: number[] = [];

                Object.entries(
                  _.chain(res.body.data)
                    .groupBy(this.trendValue == 'c' ? 'year_month' : 'year')
                    .value()
                ).forEach(([duration, items], index) => {
                  totalData.push(
                    _.sumBy(items, item => Number(item.net_profit) || 0)
                  );
                  labels.push(duration);
                });
                datasets.push({
                  label: 'Total',
                  data: totalData,
                });

                Object.entries(
                  _.chain(res.body.data).groupBy('clinic_id').value()
                ).forEach(([, items], index) => {
                  const data: number[] = (<any>items).map(item =>
                    Math.round(parseInt(item.net_profit) || 0)
                  );
                  const label = items[0].clinic_name;
                  datasets.push({
                    data,
                    label,
                    backgroundColor: '#ffffff00',
                    borderColor: '#ffffff00',
                    radius: 0,
                    hoverRadius: 0,
                    pointStyle: false,
                  });
                });

                this.netProfitPmsChartTrendMulti = datasets;
              } else {
                res.body.data.forEach(item => {
                  this.netProfitChartTrend1.push(
                    Math.round(item.net_profit || 0)
                  );

                  labels.push(
                    this.trendValue == 'c'
                      ? this.datePipe.transform(item.year_month, 'MMM y')
                      : item.year
                  );
                });
                this.netProfitChartTrend[0]['data'] = this.netProfitChartTrend1;
              }
            }
            this.netProfitPmsChartTrendLabels = labels;
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  // Added by Hanney Sharma on 09-04-2021 for net profit %

  private finNetProfitPMSPercentTrend() {
    this.netProfitPercentChartTrendLabels = [];
    this.trendxero = true;
    this.financesService
      .finNetProfitPMSPercentTrend(
        this.clinic_id,
        this.trendValue,
        this.connectedwith,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.trendxero = false;
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.netProfitPmsPercentChartTrendMulti = [];
          let labels: string[] = [];

          if (res.status == 200) {
            if (res.body.data) {
              const data: number[] = [];
              if (this.multipleClinicsSelected) {
                Object.entries(
                  _.chain(res.body.data)
                    .groupBy(this.trendValue == 'c' ? 'year_month' : 'year')
                    .value()
                ).forEach(([duration, items]) => {
                  data.push(
                    _.round(
                      (_.chain(items)
                        .sumBy(item => Number(item.net_profit) || 0)
                        .value() /
                        _.chain(items)
                          .sumBy(item => Number(item.collection) || 0)
                          .value() || 0) * 100,
                      0
                    )
                  );
                  labels.push(
                    this.trendValue == 'c'
                      ? this.datePipe.transform(duration, 'MMM y')
                      : duration
                  );
                });
              } else {
                res.body.data.forEach((item: any) => {
                  data.push(_.round(item.net_profit_percent ?? 0));
                  labels.push(
                    this.trendValue == 'c'
                      ? this.datePipe.transform(item.year_month, 'MMM y')
                      : item.year
                  );
                });
              }
              this.netProfitPercentChartTrend[0]['data'] = data;
              this.netProfitPercentChartTrendLabels = labels;
            }
          }
        },
        error: _ => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public expensesChartTrend: ChartDataset[] = [];
  public expensesChartTrendLabels = [];
  public expensesChartTrendError: boolean = false;

  private finExpensesByCategoryTrend() {
    this.expensesChartTrendLabels = [];
    this.expensesChartTrend = [];
    this.expensesChartTrendError = false;
    this.financesService
      .finExpensesByCategoryTrend(
        this.clinic_id,
        this.trendValue,
        this.connectedwith,
        this.queryWhEnabled
      )
      .subscribe({
        next: res => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          if (res.status == 200) {
            this.expensestrendstats = true;
            const durations: string[] = res.body.durations;
            Object.entries(
              _.chain(res.body.data).groupBy('account_name').value()
            ).forEach(([accountName, items], index) => {
              const dataByDuration: { duration: string; expense: number }[] =
                _.chain(items)
                  .groupBy(this.trendValue == 'c' ? 'year_month' : 'year')
                  .map((eles: any[], duration) => {
                    return {
                      duration,
                      expense: _.chain(eles)
                        .sumBy(ele => ele.expense)
                        .value(),
                    };
                  })
                  .value();
              this.expensesChartTrend.push({
                data: durations.map(d => {
                  const data = dataByDuration.find(e => e.duration === d);
                  return !!data ? Math.round(data.expense) : 0;
                }),
                label: accountName,
                backgroundColor: this.doughnutChartColors[index],
                hoverBackgroundColor: this.doughnutChartColors[index],
              });
            });
            this.expensesChartTrendLabels =
              this.trendValue == 'c'
                ? durations.map((d: string) =>
                    moment(d, 'YYYY-MM').format('MMM YYYY')
                  )
                : durations;
          }
        },
        error: error => {
          this.Apirequest = this.Apirequest - 1;
          this.enableDiabaleButton(this.Apirequest);
          this.expensesChartTrendError = true;
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  displayProfit(val) {
    $('.net_profit').hide();
    $('.profit' + val).show();
    $('.profit_btn').removeClass('active');
    $('.netProfit' + val).addClass('active');
    this.netProfitDisplayVal = val;
  }

  thousands_separators(num) {
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  }

  getChartsTips() {
    this.chartstipsService.getCharts(5, this.clinic_id).subscribe(
      res => {
        this.charTips = res.data;
      },
      error => {}
    );
  }
  enableDiabaleButton(val) {
    if (val <= 0) {
      $('.sa_tabs_data button').prop('disabled', false);
    } else {
      $('.sa_tabs_data button').prop('disabled', true);
    }
  }

  // ------------------------------------------------------
  selectedDataFilter() {
    const length = this.single.length > 15 ? 15 : this.single.length;

    for (let i = 0; i < length; i++) {
      this.selectedData.push(this.single[i]);
    }
  }

  unSelectedDataFilter() {
    for (let i = 15; i < this.single.length; i++) {
      this.unSelectedData.push(this.single[i]);
    }
  }

  removeFromSelected(index) {
    if (this.selectedData.length <= this.lowerLimit) {
      Swal.fire({
        icon: 'error',
        title: 'Oops....',
        text:
          'Minimum ' +
          this.lowerLimit +
          ' expense account will remain selected',
      });
    } else {
      this.unSelectedData.push(this.selectedData[index]);
      this.selectedData.splice(index, 1);
    }
  }
  addToSelected(index) {
    if (this.selectedData.length >= this.upperLimit) {
      Swal.fire({
        icon: 'error',
        title: 'Oops....',
        text:
          'You can select a maximum of ' +
          this.upperLimit +
          ' expense accounts at a time',
      });
    } else {
      this.selectedData.push(this.unSelectedData[index]);
      this.unSelectedData.splice(index, 1);
    }
  }

  refreshFinanceChart() {
    Object.assign(this, { selectedData: [...this.selectedData] });
    $('.close_modal').click();
  }
}
