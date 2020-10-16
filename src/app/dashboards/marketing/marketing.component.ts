import * as $ from 'jquery';
import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit , ViewChild,ElementRef } from '@angular/core';
import { MarketingService } from './marketing.service';
import { FinancesService } from '../finances/finances.service';
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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api'; 
import { NgxSmartModalService } from 'ngx-smart-modal';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';/**/
export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  templateUrl: './marketing.component.html'
})
export class MarketingComponent implements AfterViewInit {
    @ViewChild("myCanvas") canvas2: ElementRef;
  closeResult: string;
  lineChartColors;
  predictedChartColors;
  preoceedureChartColors;
  subtitle: string;
  public clinic_id:any ={};
  public dentistCount:any ={};
  public clinicsData:any[] = [];
  public trendText;
  public filteredCountriesMultiple: any[];
  public selectedCategories:any[] =[];
  constructor(private toastr: ToastrService,private marketingService: MarketingService, private financesService: FinancesService, private dentistService: DentistService, private datePipe: DatePipe, private route: ActivatedRoute,  private headerService: HeaderService,private _cookieService: CookieService, private router: Router,public ngxSmartModalService: NgxSmartModalService){
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
     this.filterDate('cytd');
   }
  }
  ngAfterViewInit() {
      this.checkPermission('dashboard4');
 this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
       //  this.filterDate('cytd');
        this.getClinics();
      this.initiate_clinic();
        
       $('#title').html('Marketing');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').removeClass('hide_header');
        $('.header_filters').addClass('flex_direct_mar');
  $('#title').html('Marketing '+this.datePipe.transform(this.startDate, 'MMM d yyyy')+'-'+this.datePipe.transform(this.endDate, 'MMM d yyyy')+'');
        
        // $('.external_clinic').show();
        // $('.external_dentist').show();
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
  }

  public date =new Date();
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
              
            }, 
            }],
        },legend: {
            display: true
         }
  };

  public stackedChartColors: Array<any> = [
    { backgroundColor: '#07BEB8' },
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
  // events
 public chartClicked(e: any,labels): void {
  if (e.active.length > 0) {
    const chart = e.active[0]._chart;
    const activePoints = chart.getElementAtEvent(e.event);
    if ( activePoints.length > 0) {
      // get the internal index of slice in pie chart
      const clickedElementIndex = activePoints[0]._index;
      const label = chart.data.labels[clickedElementIndex];
      // get value by index
      const value = chart.data.datasets[0].data[clickedElementIndex];
      if(labels === 'newPatients') {
      this.drilldownNewPatients(label);
    }
      else if(labels == 'revenue'){
      this.drilldownRevenueReferral(label);
    }
    }
  }
}

 filterCountryMultiple(event) {
        let query = event.query;
            this.filteredCountriesMultiple = this.filterCountry(query, this.categories);
    }
  filterCountry(query, categories: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < categories.length; i++) {
            let category = categories[i];
            if(category.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(category);
            }
        }
        return filtered;
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
  public gaugePrependText ='$';
  public startDate ='';
  public endDate = '';
  public selectedValToggle ='off';
  public selectedDentist;
  public dentists;
  public pieChartType = 'doughnut';
    public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
            display: true,
            position:'right'
         }
  };
  loadDentist(newValue) {
  $('#title').html('Marketing '+this.datePipe.transform(this.startDate, 'MMM d yyyy')+'-'+this.datePipe.transform(this.endDate, 'MMM d yyyy')+'');

    if(newValue == 'all') {
      this.fdnewPatientsRatio();
      this.mkNewPatientsByReferral();
      this.fdvisitsRatio();
      this.mkRevenueByReferral();
      this.fdnewPatientsAcq();
      //this.fdWorkTimeAnalysis();
    }
  }

  public newPatientsTimeData: number[] = [];
  public newPatientsTimeLabels = [];  
  public newPatientsTimeLabels1 = [];
  public newPatientsTimeData1 : number[] = [];
   public newPatientsTimeLabelsl2 = [];  
public mkNewPatientsByReferralLoader:any;

  //Items Predictor Analysis 
  private mkNewPatientsByReferral() {
    this.mkNewPatientsByReferralLoader = true;
    this.newPatientsTimeLabels =[];
    var user_id;
    var clinic_id;
  this.marketingService.mkNewPatientsByReferral(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
    this.mkNewPatientsByReferralLoader = false;
            this.newPatientsTimeData1 =[];
            this.newPatientsTimeLabelsl2 =[];
            this.newPatientsTimeLabels1 =[];
            if(data.data.patients_reftype.length >0) {
              var i=0;
             data.data.patients_reftype.forEach(res => {
               if(i<10) {
               this.newPatientsTimeData1.push(res.patients_visits);
               this.newPatientsTimeLabels1.push(res.reftype_code);
                i++;
              }
             });
        }
         this.newPatientsTimeData = this.newPatientsTimeData1;
         this.newPatientsTimeLabels= this.newPatientsTimeLabels1;
         
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

    private drilldownNewPatients(label) {
      
    var user_id;
    var clinic_id;
  this.marketingService.mkNewPatientsByReferral(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
            this.newPatientsTimeData1 =[];
            this.newPatientsTimeLabels1 =[];
            this.newPatientsTimeData = [];
            this.newPatientsTimeLabels= [];
            this.newPatientsTimeLabelsl2 =[];

            if(data.data.patients_refname[label].length >0) {
               var i=0;
             data.data.patients_refname[label].forEach(res => {
              if(i<10) {
               this.newPatientsTimeData1.push(res.patients_visits);
               this.newPatientsTimeLabels1.push(res.referral_name);
                i++;
              }
             });
        }
         this.newPatientsTimeData = this.newPatientsTimeData1;
         this.newPatientsTimeLabelsl2= this.newPatientsTimeLabels1;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

  public revenueReferralData: number[] = [];
  public revenueReferralLabels = [];  
  public revenueReferralLabels1 = [];
  public revenueReferralData1 : number[] = [];
   public revenueReferralLabelsl2 = [];  
public mkRevenueByReferralLoader:any;

  //Items Predictor Analysis 
  private mkRevenueByReferral() {
    this.mkRevenueByReferralLoader = true;
    var user_id;
    var clinic_id;
  this.marketingService.mkRevenueByReferral(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.mkRevenueByReferralLoader = false;
            this.revenueReferralData1 =[];
            this.revenueReferralLabelsl2 =[];
            this.revenueReferralLabels1 =[];
            if(data.data.patients_reftype.length >0) {
               var i=0;
             data.data.patients_reftype.forEach(res => {
               if(i<10) {
               this.revenueReferralData1.push(Math.floor(res.total));
               this.revenueReferralLabels1.push(res.reftype_code);
                i++;
              }
             });
        }
         this.revenueReferralData = this.revenueReferralData1;
         this.revenueReferralLabels= this.revenueReferralLabels1;
         
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

    private drilldownRevenueReferral(label) {
    var user_id;
    var clinic_id;
  this.marketingService.mkRevenueByReferral(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
            this.revenueReferralData1 =[];
            this.revenueReferralLabels1 =[];
            this.revenueReferralData = [];
            this.revenueReferralLabels= [];
            this.revenueReferralLabelsl2 =[];

            if(data.data.patients_refname[label].length >0) {
               var i=0;
             data.data.patients_refname[label].forEach(res => {
                if(i<10) {
               this.revenueReferralData1.push(res.total);
               this.revenueReferralLabels1.push(res.referral_name);
                  i++;
              }
             });
        }
         this.revenueReferralData = this.revenueReferralData1;
         this.revenueReferralLabelsl2= this.revenueReferralLabels1;
         

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }

public visitsTotal;
public visitsPrevTotal;
public visitsTooltip='down';
public visitsGoal;
public fdvisitsRatioLoader:any;

//Predictor Ratio :
  private fdvisitsRatio() {
     if(this.duration){
    this.visitsTotal = 0;      
      this.fdvisitsRatioLoader = true;
       var user_id;
       var clinic_id;
  this.marketingService.fdvisitsRatio(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
    this.visitsTotal = 0;
          this.visitsPrevTotal = 0;
       if(data.message == 'success'){
        this.fdvisitsRatioLoader = false;
          this.visitsTotal = data.total;
          this.visitsPrevTotal = data.total_ta;
          this.visitsGoal = data.goals;
          if(this.visitsTotal>=this.visitsPrevTotal)
            this.visitsTooltip = 'up';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }


public newPatientsTotal =0;
public newPatientsPrevTotal =0;
public newPatientsTooltip='down';
public newPatientsGoal;
public fdnewPatientsRatioLoader:any;

//Predictor Ratio :
  private fdnewPatientsRatio() {
     if(this.duration){
      this.fdnewPatientsRatioLoader = true;
      this.newPatientsTotal = 0;
       var user_id;
       var clinic_id;
  this.marketingService.fdnewPatientsRatio(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
          this.newPatientsTotal = 0;
          this.newPatientsPrevTotal = 0;
       if(data.message == 'success'){
        this.fdnewPatientsRatioLoader = false;
          if(data.total != null)
          this.newPatientsTotal = data.total;
          if(data.total_ta != null)
          this.newPatientsPrevTotal = data.total_ta;
          this.newPatientsGoal = data.goals;
          if(this.newPatientsTotal>=this.newPatientsPrevTotal)
            this.newPatientsTooltip = 'up';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public expenseData=[];
public categories=[];
public fdnewPatientsAcqLoader:any;

//Predictor Ratio :
  private fdnewPatientsAcq() {
     if(this.duration){
       var user_id;
       var clinic_id;
       this.fdnewPatientsAcqLoader = true;
       this.financesService.categoryExpenses(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
          if(data.message == 'success'){
       this.fdnewPatientsAcqLoader = false;
            this.categories=[];
            this.expenseData=[];
             data.data.forEach((res,key) => {
              this.expenseData[res.meta_key] = res.expenses;
              this.categories.push(res.meta_key);
             });
             console.log(this.selectedCategories.length);
              if(this.selectedCategories.length>0) 
                this.load_chart_acq();
              //  this.selectedCategories = this.categories;
              // console.log(this.selectedCategories);
              
           }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public currentText;

  // Filter By Date
  filterDate(duration) {
    this.isDisabled = true;
     $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_off').addClass('mat-button-toggle-checked');
    this.showTrend= false;
     $('.customRange').css('display','none');
    if(duration == 'w') {
      this.trendText= 'Last Week';
      this.currentText= 'This Week';
      const now = new Date();
       var first = now.getDate() - now.getDay();
       var last = first + 6; 
       this.startDate = this.datePipe.transform(new Date(now.setDate(first)).toUTCString(), 'yyyy-MM-dd');
       var end = new Date();
        end.setFullYear(now.getFullYear());
        end.setMonth(now.getMonth()+1);
        end.setDate(last);
       this.endDate =this.datePipe.transform(new Date(end).toUTCString(), 'yyyy-MM-dd');
       this.duration='w';
        this.loadDentist('all');
    }
    else if (duration == 'm') {
      this.trendText= 'Last Month';
      this.currentText= 'This Month';


      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'yyyy-MM-dd');
            this.loadDentist('all');
        this.duration='m';
    }
    else if (duration == 'q') {
      this.trendText= 'Last Quarter';
      this.currentText= 'This Quarter';


      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'yyyy-MM-dd');
      }
      else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'yyyy-MM-dd'); }
      else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'yyyy-MM-dd'); }
      else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 12, 0), 'yyyy-MM-dd');  }
        this.duration='q';
            this.loadDentist('all');
    
    }
    else if (duration == 'lq') {
      this.trendText= 'Previous Quarter';
      this.currentText= 'Last Quarter';


      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
     
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear() -1, 9, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear()-1, 12, 0), 'yyyy-MM-dd');
      }
      else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'yyyy-MM-dd'); }
      else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'yyyy-MM-dd'); }
      else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'yyyy-MM-dd');  }
        this.duration='lq';
            this.loadDentist('all');
   
    }
    else if (duration == 'cytd') {
      this.trendText= 'Last Year';
      this.currentText= 'This Year';


     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.duration='cytd';
      this.loadDentist('all');
    }
     else if (duration == 'fytd') {
      this.trendText= 'Last Financial Year';
      this.currentText= 'This Financial Year';


     var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 3, 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.duration='fytd';
      this.loadDentist('all');
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
choosedDate(val) {
    val = (val.chosenLabel);
    var val= val.toString().split(' - ');
      
     var date2:any= new Date(val[1]);
     var date1:any= new Date(val[0]);
      var diffTime:any =Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
if(diffTime<=365){
 this.startDate = this.datePipe.transform(val[0], 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(val[1], 'yyyy-MM-dd');
      this.loadDentist('all');      
      $('.filter_custom').val(this.startDate+ " - "+this.endDate);
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

toggleFilter(val) {
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_'+val).addClass('mat-button-toggle-checked');
    $('.filter').removeClass('active');
    var date = new Date();
    this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    if(val == 'current') {
     this.toggleChecked = true;
     this.trendValue = 'c';
    this.startDate = this.datePipe.transform(new Date(date.getFullYear()-1, date.getMonth(), 1), 'yyyy-MM-dd');

     this.toggleChangeProcess();
    }
    else if(val == 'historic') {
       this.toggleChecked = true;
       this.trendValue = 'h';
    this.startDate = this.datePipe.transform(new Date(date.getFullYear()-10, date.getMonth(), 1), 'yyyy-MM-dd');

       this.toggleChangeProcess();
    }
    else if(val == 'off') {
      this.showTrend = false;
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
  showTrend= false;
toggleChangeProcess(){
      this.showTrend = true;
            this.mkNoNewPatientsTrend();
      this.fdvisitsRatioTrend();

      this.mkRevenueByReferral();
      this.mkNewPatientsByReferral();
   

}


 public visitsChartTrend: any[]  = [
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
    public visitsChartTrend1=[];
  public visitsChartTrendLabels =[];
  public visitsChartTrendLabels1 =[];
public fdvisitsRatioTrendLoader:any;

  private fdvisitsRatioTrend() {
  this.visitsChartTrendLabels1=[];
  this.visitsChartTrendLabels=[];
  this.fdvisitsRatioTrendLoader = true;

  this.visitsChartTrend1=[];
    var user_id;
    var clinic_id;
    this.marketingService.mkTotalVisitsTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
                this.fdvisitsRatioTrendLoader = false;
                data.data.forEach(res => {  
                     this.visitsChartTrend1.push(res.val);
                   if(this.trendValue == 'c')
                   this.visitsChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.visitsChartTrendLabels1.push(res.duration);
                 });
                 this.visitsChartTrend[0]['data'] = this.visitsChartTrend1;

                 this.visitsChartTrendLabels =this.visitsChartTrendLabels1; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!"; 
    });
  }

 public newPatientsChartTrend: any[]  = [
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
    public newPatientsChartTrend1=[];
  public newPatientsChartTrendLabels =[];
  public newPatientsChartTrendLabels1 =[];
      public newPatientsChartTemp=[];
  private mkNoNewPatientsTrend() {
  this.newPatientsChartTrendLabels1=[];
  this.newPatientsChartTrend1=[];
    var user_id;
    var clinic_id;
    this.marketingService.mkNoNewPatientsTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       if(data.message == 'success'){
        this.newPatientsChartTemp = data.data;
                data.data.forEach(res => {  
                     this.newPatientsChartTrend1.push(res.val);
                   if(this.trendValue == 'c')
                   this.newPatientsChartTrendLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
                    else
                   this.newPatientsChartTrendLabels1.push(res.duration);
                  
                 });
                 this.newPatientsChartTrend[0]['data'] = this.newPatientsChartTrend1;

                 this.newPatientsChartTrendLabels =this.newPatientsChartTrendLabels1;
                    this.fdnewPatientsAcqTrend();
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

public barChartOptions: any = {
    scaleShowVerticalLines: false,
    cornerRadius: 60,
    curvature: 1,
    animation: {
        duration: 1500,
        easing: 'easeOutSine'
      },
       responsive: true,
    maintainAspectRatio: false,
        scales: {
          xAxes: [{ 
            gridLines: { display: true },
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
                         return '$'+label;
                     }

                 },
            }, 
            }],
        },
        tooltips: {
  callbacks: {
     label: function(tooltipItems, data) { 
              if(data.datasets[tooltipItems.datasetIndex].label != undefined)
                return data.datasets[tooltipItems.datasetIndex].label+": $"+tooltipItems.yLabel;
              else
                return "$"+tooltipItems.yLabel;
     },
     
  }
},
         legend: {
        position: 'top',
        onClick: function(e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart; 
          if(index ==0)
          {
                ci.getDatasetMeta(1).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          }
          else if(index== 1) {
                ci.getDatasetMeta(0).hidden = true;
                ci.getDatasetMeta(index).hidden = false;
          } 
          ci.update();
        },
      }  , 
  };
 public expenseDataTrend: any[]  = [
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
public expenseDataTrend1=[];
public expenseDataTrendLabels1=[];
public expenseDataTrendLabels=[];
//Predictor Ratio :
  private fdnewPatientsAcqTrend() {
     if(this.duration){
       var user_id;
       var clinic_id;
       this.financesService.finExpensesByCategoryMktTrend(this.clinic_id,this.trendValue).subscribe((data) => {
          if(data.message == 'success'){

            this.expenseDataTrend1=[];
            this.expenseDataTrendLabels1=[];
            console.log( this.selectedCategories);
           this.newPatientsChartTemp.forEach((res,key) => {
             data.data.forEach((res1,key1) => {
                if(res1.duration == res.duration) {
                  var dataX=0;
                  var dataY=0;
                  var percent =0;
                  if(res1.val.expenses != undefined) {
                    dataY=res1.val.expenses;
                  }
                  if(res.val != '') {
                    dataX = res.val;
                  }
                  if(dataX != 0) 
                    percent = dataY/dataX;
                  this.expenseDataTrend1.push(percent.toFixed(1));
                  this.expenseDataTrendLabels1.push(res.duration);
                }
             });    
             });   
              this.expenseDataTrend[0]['data'] = this.expenseDataTrend1;
              this.expenseDataTrendLabels =this.expenseDataTrendLabels1;
           }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

  public newAcqValue:any=0;
load_chart_acq() {
  var totalY=0;                                             
    this.selectedCategories.forEach((res,key) => {
      if(this.expenseData[res])
      totalY = totalY+parseInt(this.expenseData[res]);
    });
  console.log(totalY);
this.newAcqValue = 0;
    if(totalY != undefined && this.newPatientsTotal>0)
    this.newAcqValue = (totalY/this.newPatientsTotal).toFixed(0);
    $('.close_modal').click();
}

  public changeLevel(val) {
    if(val == 'newPatient') 
      this.mkNewPatientsByReferral();
  else if(val == 'revenue')
      this.mkRevenueByReferral();
  }
  add_category(index) {
    if(!this.selectedCategories.includes(this.categories[index]))
    this.selectedCategories.push(this.categories[index]);
    this.categories.splice(index, 1);
  }
  remove_category(index) {
    if(!this.categories.includes(this.selectedCategories[index]))
    this.categories.push(this.selectedCategories[index]);
    this.selectedCategories.splice(index, 1);
  }
  }
