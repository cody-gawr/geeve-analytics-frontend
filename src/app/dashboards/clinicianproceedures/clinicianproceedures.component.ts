import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit  } from '@angular/core';
import { ClinicianProceeduresService } from './clinicianproceedures.service';
import { DentistService } from '../../dentist/dentist.service';

import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  templateUrl: './clinicianproceedures.component.html'
})
export class ClinicianProceeduresComponent implements AfterViewInit {
  subtitle: string;
   public clinic_id:any ={};
   public dentistCount:any ={};
  
  constructor(private clinicianproceeduresService: ClinicianProceeduresService, private dentistService: DentistService, private datePipe: DatePipe, private route: ActivatedRoute){
 
  }
  private warningMessage: string;

  ngAfterViewInit() {

 
 this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
    this.loadDentist('all');
        this.getDentists(); 

     });
  }

  dentists: Dentist[] = [
   { providerId: 'all', name: 'All Dentists' },
  ];
    public stackedChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10,
    scales: {
          xAxes: [{ 
            stacked: true, 
            gridLines: { display: false },
            ticks: {
    autoSkip: false
}
            }],
          yAxes: [{ 
            stacked: true, 
            ticks: {
             // callback: function(value) { return numberWithCommas(value); },
            }, 
            }],
        }
  };
    public pieChartOptions: any = {
   legend: {
            display: false
         }
  };
   public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10,
        scales: {
          xAxes: [{ 
            gridLines: { display: false },
            ticks: {
                  autoSkip: false
              }
            }],
          yAxes: [{  
            ticks: {
             // callback: function(value) { return numberWithCommas(value); },
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
    public selectedDentist: string;
  public predicted1: boolean = true;
  public predicted2: boolean = false;
  public predicted3: boolean = false;
  public showInternal: boolean = true;
  public showExternal: boolean = false;
  public showCombined: boolean = false;
  public stackedChartColors: Array<any> = [
    { backgroundColor: '#18a689' },
    { backgroundColor: '#B9DBE6' },
    { backgroundColor: '#5F818A' },
    { backgroundColor: '#36585E' },
    { backgroundColor: '#2F4852' },

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
    {data: [], label: 'Splints '},
    {data: [], label: 'Root Canals'},
    {data: [], label: 'Perio Charts'},
    {data: [], label: 'Surgical Extractions'}  ];

  public stackedChartData1: any[] = [];
  public stackedChartData2: any[] = [];
  public stackedChartData3: any[] = [];
  public stackedChartData4: any[] = [];
  public stackedChartData5: any[] = [];

  public predictedChartData: any[] = [
    {data: [], label: 'Crown to Large Filling'},
    {data: [], label: 'Extraction to RCT',hidden: true},
    {data: [], label: 'RCT Conversion',hidden: true},

    ];

  public predictedChartData1: any[] = [];  
  public predictedChartData2: any[] = [];  
  public predictedChartData3: any[] = [];  

  public proceedureChartType = 'horizontalBar';

  public proceedureChartData: any[] = [
    {data: [], label: 'Total Revenue of Clinician Per Procedure'}
    ];
  public proceedureDentistChartData: any[] = [
    {data: [], label: 'Total Revenue of Clinician Per Procedure'}
    ];
  public proceedureChartData1: any[] = []; 
 

  //Total  
  public predictedTotal1 = 0;
  public predictedTotal2 = 0;
  public predictedTotal3 = 0;

  public predictedTotalAverage1 = 0;
  public predictedTotalAverage2 = 0;
  public predictedTotalAverage3 = 0;

  public pieChartInternalTotal = 0;
  public pieChartExternalTotal = 0;
  public pieChartCombinedTotal = 0;

  // Pie
  public pieChartLabels: string[] = [
  ];
  public pieChartData1: number[] = [];
  public pieChartData2: number[] = [];
  public pieChartData3: number[] = [];

  public pieChartType = 'pie';
  public pieChartDatares1: number[] = [];
  public pieChartDatares2: number[] = [];
  public pieChartDatares3: number[] = [];

  public pieChartLabelsres: string[] = [
  ];

  public itemPredictedChartData: any[] = [
    {data: [10,1,5], label: 'Items Predictor Analysis '}

    ];
        
  public itemPredictedChartData1: any[] = [];  

  public itemPredictedChartLabels: string[] = [];

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
  public  foregroundColor= "#18a689";
  public  cap= "round";
  public  size = "300"
  public  gaugeValuePredicted = 0;
  public  gaugeValuePredicted1 = 0;

  public  gaugeValuePredicted2 = 0;

  public  gaugeValuePredicted3 = 0;
  public  gaugeLabelPredicted = "";
  public predictedDentistTotal = 0;

  public startDate ='';
  public endDate = '';
 private loadDentist(newValue) {
  if(newValue == 'all') {
   // this.filterDate('w')
    this.buildChartPredictor();
    this.buildChart();
    this.buildChartProceedure();
    this.buildChartReferral();
    (<HTMLElement>document.querySelector('.itemsPredictorSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.itemsPredictor')).style.display = 'block';

    (<HTMLElement>document.querySelector('.ratioPredictorSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.ratioPredictor')).style.display = 'block';    

        (<HTMLElement>document.querySelector('.revenueProceedureSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.revenueProceedure')).style.display = 'block';
/*
    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'block';

    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'block';*/
  }
  else {
    this.selectedDentist = newValue;
    this.buildChartDentist();
    (<HTMLElement>document.querySelector('.itemsPredictorSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.itemsPredictor')).style.display = 'none';

    this.buildChartPredictorDentist();
    (<HTMLElement>document.querySelector('.ratioPredictorSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.ratioPredictor')).style.display = 'none';

    this.buildChartProceedureDentist();
    (<HTMLElement>document.querySelector('.revenueProceedureSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.revenueProceedure')).style.display = 'none';
    this.buildChartReferralDentist();
/*    this.buildChartTreatmentDentist();
    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'none';

    this.buildChartNopatientsDentist();
    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'none';*/
  }

  }

  //Items Predictor Analysis 
  private buildChart() {
    var user_id;
    var clinic_id;
       this.stackedChartData = [
    {data: [], label: 'Crowns'},
    {data: [], label: 'Splints '},
    {data: [], label: 'Root Canals'},
    {data: [], label: 'Perio Charts'},
    {data: [], label: 'Surgical Extractions'}  ];

  this.stackedChartData1 = [];
  this.stackedChartData2 = [];
  this.stackedChartData3 = [];
  this.stackedChartData4 = [];
  this.stackedChartData5 = [];
  this.stackedChartLabels1 =[];
  this.stackedChartLabels =[];
console.log(this.stackedChartLabels);
  this.clinicianproceeduresService.ItemsPredictorAnalysis(this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
        if(data.data.length <=0) {

        }else {
        data.data.forEach(res => {
           this.stackedChartData1.push(res.crowns);
           this.stackedChartData2.push(res.splints);
           this.stackedChartData3.push(res.root_canals);
           this.stackedChartData4.push(res.perio);
           this.stackedChartData5.push(res.surgical_extractions);
           this.stackedChartLabels1.push(res.provider);
       //    this.productionTotal = this.productionTotal + parseInt(res.total);
         });
      
       this.stackedChartData[0]['data'] = this.stackedChartData1;
       this.stackedChartData[1]['data'] = this.stackedChartData2;
       this.stackedChartData[2]['data'] = this.stackedChartData3;
       this.stackedChartData[3]['data'] = this.stackedChartData4;
       this.stackedChartData[4]['data'] = this.stackedChartData5;

       this.stackedChartLabels = this.stackedChartLabels1;
       //this.productionTotalAverage = this.productionTotal/this.barChartData1.length;
     }
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  //Items Predictor Analysis Single
  private buildChartDentist() {
    var user_id;
    var clinic_id;
  this.clinicianproceeduresService.ItemsPredictorAnalysisDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
          this.itemPredictedChartData1 = [];
          this.itemPredictedChartData1.push(data.data[0].crowns);
          this.itemPredictedChartData1.push(data.data[0].splints);
          this.itemPredictedChartData1.push(data.data[0].root_canals);
          this.itemPredictedChartData1.push(data.data[0].perio);
          this.itemPredictedChartData1.push(data.data[0].surgical_extractions);

       this.itemPredictedChartData[0]['data'] = this.itemPredictedChartData1;
       this.itemPredictedChartData[0]['label'] = data.data[0].provider;
       this.itemPredictedChartLabels= ['Crowns','Splints','Root Canals','Perio','Surgical Extractions'];

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

//Predictor Ratio :
  private buildChartPredictor() {
    this.predictedChartData1 =[];
           this.predictedChartData2 =[];
           this.predictedChartData3 =[];
           this.predictedChartLabels1=[];
           this.predictedChartData[0]['data'] = [];
       this.predictedChartData[1]['data'] = [];
       this.predictedChartData[2]['data'] = [];
       var user_id;
    var clinic_id;
  this.clinicianproceeduresService.PredictorRatio(this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
        data.data.forEach(res => {
           this.predictedChartData1.push(res.ratio1);
           this.predictedChartData2.push(res.ratio2);
           this.predictedChartData3.push(res.ratio3);
           this.predictedChartLabels1.push(res.provider);
           this.predictedTotal1 = this.predictedTotal1 + parseInt(res.ratio1);
           this.predictedTotal2 = this.predictedTotal2 + parseInt(res.ratio2);
           this.predictedTotal3 = this.predictedTotal3 + parseInt(res.ratio3);

 });
       this.predictedChartData[0]['data'] = this.predictedChartData1;
       this.predictedChartData[1]['data'] = this.predictedChartData2;
       this.predictedChartData[2]['data'] = this.predictedChartData3;

       this.predictedTotalAverage1 = this.predictedTotal1/this.predictedChartData1.length;
       this.predictedTotalAverage2 = this.predictedTotal2/this.predictedChartData2.length;
       this.predictedTotalAverage3 = this.predictedTotal3/this.predictedChartData3.length;

       this.predictedChartLabels = this.predictedChartLabels1;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }
  //Predictor Ratio :
  private buildChartPredictorDentist() {
       var user_id;
    var clinic_id;
  this.clinicianproceeduresService.PredictorRatioDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
           this.gaugeValuePredicted1 = data.data[0].ratio1;
           this.gaugeValuePredicted2 = data.data[0].ratio2;
           this.gaugeValuePredicted3 = data.data[0].ratio3;
           this.gaugeLabelPredicted = data.data[0].provider;
           this.predictedDentistTotal = data.data[0].ratio1;
           this.gaugeValuePredicted= this.gaugeValuePredicted1*100;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

//Total Revenue of Clinician Per Procedure
  private buildChartProceedure() {
        var user_id;
    var clinic_id;
     this.proceedureChartData1 =[];
           this.proceedureChartLabels1 = [];
  this.clinicianproceeduresService.ClinicianProceedure( this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
        data.data.forEach(res => {
           this.proceedureChartData1.push(res.total);
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
  private buildChartProceedureDentist() {
        var user_id;
    var clinic_id;
    this.proceedureChartData1 = [];
           this.proceedureChartLabels1 = [];
  this.clinicianproceeduresService.ClinicianProceedureDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
        data.data.forEach(res => {
           this.proceedureChartData1.push(res.total);
           this.proceedureChartLabels1.push(res.treat_item);
       //    this.productionTotal = this.productionTotal + parseInt(res.total);
 });
       this.proceedureDentistChartData[0]['data'] = this.proceedureChartData1;
       this.proceedureDentistChartLabels = this.proceedureChartLabels1;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  //Referral to Other Clinicians Internal / External
  private buildChartReferral() {
        var user_id;
    var clinic_id;
    this.pieChartInternalTotal = 0;
           this.pieChartExternalTotal = 0;
           this.pieChartCombinedTotal =0;
  this.clinicianproceeduresService.ClinicianReferral(this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
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
     this.pieChartInternalTotal = 0;
           this.pieChartExternalTotal = 0;
           this.pieChartCombinedTotal =0;
  this.clinicianproceeduresService.ClinicianReferralDentist(this.selectedDentist, this.clinic_id,this.startDate,this.endDate).subscribe((data) => {
       if(data.message == 'success'){
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
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

   changePieReferral(chart){
    this.showInternal =false;
    this.showExternal = false;
    this.showCombined = false;
    if(chart == 'Internal') 
      this.showInternal = true;
    else if(chart == 'External')
      this. showExternal =true;
    else if(chart == 'Combined')
      this.showCombined = true;
  }

  // Filter By Date
  filterDate(duration) {
    if(duration == 'w') {
      const now = new Date();
       var first = now.getDate() - now.getDay();
       var last = first +6; 
       this.startDate = this.datePipe.transform(new Date(now.setDate(first)).toUTCString(), 'yyyy-MM-dd');
       this.endDate = this.datePipe.transform(new Date(now.setDate(last)).toUTCString(), 'yyyy-MM-dd');
       var dates = startDate + "," +endDate; 
    }
    else if (duration == 'm') {
      var date = new Date();
      var startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
      var endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'yyyy-MM-dd');
    }

  }
  // Get Dentist
    getDentists() {
      this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
           if(res.message == 'success'){
              this.dentists= res.data;
              this.dentistCount= res.data.length;

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
 
}
