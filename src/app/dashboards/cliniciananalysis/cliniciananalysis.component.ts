import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { ClinicianAnalysisService } from './cliniciananalysis.service';
import { DentistService } from '../../dentist/dentist.service';
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
  templateUrl: './cliniciananalysis.component.html'
})
export class ClinicianAnalysisComponent implements AfterViewInit {
  subtitle: string;
   public id:any ={};
   public clinic_id:any ={};
   public UrlSegment:any ={};
   public dentistCount:any ={};
  
  constructor(private cliniciananalysisService: ClinicianAnalysisService, private dentistService: DentistService, private route: ActivatedRoute){/*
    route.url.subscribe((s:UrlSegment[]) => { console.log("url", s); }); */
 
  }
  private warningMessage: string;

  ngAfterViewInit() {   this.route.params.subscribe(params => {
      this.clinic_id = this.route.snapshot.paramMap.get("id");
      this.getDentists();
    this.loadDentist('all');

    }); 
    //this.recallChartTreatment();
  }
  dentists: Dentist[] = [
   { providerId: 'all', name: 'All Dentists' },
  ];
    public barChartColors: Array<any> = [
    { backgroundColor: '#18a689' },
    { backgroundColor: '#CACACA' }
  ];
    public barChartType = 'bar';
  public barChartLegend = true;

  //labels
  public barChartLabels: string[] = [];
    public pieChartLabels: string[] = ['ddfs'];
  public planChartLabels: string[] = [];
  public recallChartLabels: string[] = [];
  public treatmentChartLabels: string[] = [];  
  public barChartLabels1: string[] = [];
  public planChartLabels1: string[] = [];
  public recallChartLabels1: string[] = [];
  public treatmentChartLabels1: string[] = [];
  public doughnutChartLabels: string[] =  [];
  public doughnutChartLabels1: string[] = [];
  public doughnutChartType:string = 'doughnut';

  //data
  public barChartData: any[] = [
    {data: [], label: 'Dentist Production'}
  ];
  public pieChartData: any[] = [
    {data: [10], label: 'Dentist Production'}
  ];
  public planChartData: any[] = [
    {data: [], label: 'Treatment Plan Average Cost- Proposed Fees'},
    {data: [], label: 'Treatment Plan Average Cost - Completed Fees',hidden: true}

  ];
  public recallChartData: any[] = [
    {data: [50,30,20], label: 'Recall Rate'},
    {data: [50,30,20], label: 'Rebook Rate'}  
  ];  
  public treatmentChartData: any[] = [
    {data: [50,30,20], label: 'Recall Rate'},
    {data: [50,30,20], label: 'Rebook Rate'}  
  ];  
  public doughnutChartData: number[] = [350, 450, 100];
  public selectedDentist: string;
  public barChartData1: any[] = [];
  public planChartData1: any[] = [];
  public planChartData2: any[] = [];  
  public recallChartData1: any[] = [];    
  public treatmentChartData1: any[] = [];
  public doughnutChartData1: number[] = [];   

  //Total  
  public productionTotal = 0;
  public productionTotalAverage = 0;
  public productionGoal = 0;
  public planTotal = 0;
  public planTotalAverage = 0;
  public planTotalGoal = 0;

  public recallTotal = 0;
  public recallTotalAverage = 0;
  public treatmentTotal = 0;
  public treatmentTotalAverage = 0;  
  public doughnutTotal = 0;
  public doughnutTotalAverage = 0;  
  public doughnutGoals = 0;  

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public gaugeType = "arch";
  public  gaugeValue = '';
  public  gaugeLabel = "";
  public  gaugeThick = "20";
  public  foregroundColor= "#18a689";
  public  cap= "round";
  public  size = "300"

  public  gaugeValueTreatment = 0;
  public  gaugeLabelTreatment = "";

  public  gaugeValuePatients = 0;
  public  gaugeLabelPatients = "";

 private loadDentist(newValue) {
  if(newValue == 'all') {
    this.buildChartNopatients();
    
    this.buildChart();
    this.buildChartTreatment();
    (<HTMLElement>document.querySelector('.dentistProductionSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.dentistProduction')).style.display = 'block';

    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'block';

    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'none';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'block';
  }
  else {
    this.selectedDentist = newValue;
    this.buildChartDentist();
    (<HTMLElement>document.querySelector('.dentistProductionSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.dentistProduction')).style.display = 'none';

    this.buildChartTreatmentDentist();
    (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'none';

    this.buildChartNopatientsDentist();
    (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'block';
    (<HTMLElement>document.querySelector('.noPatients')).style.display = 'none';
  }

  }

  //Dentist Production Chart
  private buildChart() {

    this.barChartData1 =[];
    this.barChartLabels1 =[];
    this.productionTotal =0;
    this.cliniciananalysisService.DentistProduction(this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
        data.data.forEach(res => {
           this.barChartData1.push(res.total);
           this.barChartLabels1.push(res.name);
           if(res.total != null)
           this.productionTotal = this.productionTotal + parseInt(res.total);
 });
       this.barChartData[0]['data'] = this.barChartData1;
       this.barChartLabels = this.barChartLabels1;
       this.productionTotalAverage = this.productionTotal/this.barChartData1.length;
       this.productionGoal = data.goals;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

  //Individual Dentist Production Chart
  private buildChartDentist() {
  this.cliniciananalysisService.DentistProductionSingle(this.selectedDentist, this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
          this.gaugeValue = data.data.total;
          this.gaugeLabel = data.data.name;
          this.productionTotal = data.data.total;

       this.productionGoal = data.goals;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

//Treatment Plan Average Cost
  private buildChartTreatment() {
    this.planChartData1 =[];
    this.planChartData2 =[];
    this.planChartLabels1 = [];
    this.planTotal =0;
    this.cliniciananalysisService.TreatmentPlan(this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
        data.data.forEach(res => {
           this.planChartData1.push(res.total_all);
           this.planChartData2.push(res.total_completed);
           this.planChartLabels1.push(res.provider);
           this.planTotal = this.planTotal + parseInt(res.total_completed);
 });
       this.planChartData[0]['data'] = this.planChartData1;
       this.planChartData[1]['data'] = this.planChartData2;

       this.planChartLabels = this.planChartLabels1;
       this.planTotalAverage = this.planTotal/this.planChartData1.length;
       this.planTotalGoal = data.goals;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

//Individual Treatment Plan Average Cost
  private buildChartTreatmentDentist() {
  this.cliniciananalysisService.TreatmentPlanDentist(this.selectedDentist, this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
        if(data.data != null) {
        this.gaugeValueTreatment = data.data.total_all;
          this.gaugeLabelTreatment = data.data.provider;
          this.planTotal = data.data.total_all;
          this.planTotalAverage = this.planTotal;
        }
        else {
          this.gaugeValueTreatment = 0;
          this.gaugeLabelTreatment = "No Data for this Dentist";
          this.planTotal = 0;
          this.planTotalAverage = 0;
        }
       this.planTotalGoal = data.goals;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }

//Recall Prebook Rate
  private recallChartTreatment() {
  this.cliniciananalysisService.RecallPrebook(this.clinic_id).subscribe((data) => {
       if(data.message == 'success'){
        data.data.forEach(res => {
           this.planChartData1.push(parseInt(res.average_cost));
           this.planChartLabels1.push(res.provider);
           this.planTotal = this.planTotal + parseInt(res.average_cost);
 });
       this.planChartData[0]['data'] = this.planChartData1;
       this.planChartLabels = this.planChartLabels1;
       this.planTotalAverage = this.planTotal/this.planChartData1.length;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }  

  private buildChartNopatients() {
     this.doughnutChartData1 =[];
           this.doughnutChartLabels1 =[];
           this.doughnutTotal = 0;
  this.cliniciananalysisService.NoPatients(this.clinic_id).subscribe((data) => {
     console.log(this.doughnutChartLabels);
       if(data.message == 'success'){
        data.data.forEach(res => {
           this.doughnutChartData1.push(parseInt(res.treat_item));
           this.doughnutChartLabels1.push(res.provider);
           this.doughnutTotal = this.doughnutTotal + parseInt(res.treat_item);
 });
       this.doughnutChartData = this.doughnutChartData1;
       this.doughnutChartLabels = this.doughnutChartLabels1;
       this.doughnutTotalAverage = this.doughnutTotal/this.doughnutChartData1.length;
       this.doughnutGoals = data.goals;

       console.log(this.doughnutChartLabels1);
        console.log(this.doughnutChartLabels);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }


  private buildChartNopatientsDentist() {
  this.cliniciananalysisService.NoPatientsDentist(this.selectedDentist, this.clinic_id).subscribe((data) => {
     console.log(this.doughnutChartLabels);
       if(data.message == 'success'){
         if(data.data != null) {
        this.gaugeValuePatients = data.data.treat_item;
          this.gaugeLabelPatients = data.data.provider;
          this.doughnutTotal = data.data.treat_item;
          this.doughnutTotalAverage = this.doughnutTotal;
        }
        else {
          this.gaugeValuePatients = 0;
          this.gaugeLabelPatients = "No Data for this Dentist";
          this.doughnutTotal = 0;
          this.doughnutTotalAverage = 0;

        }
       this.doughnutGoals = data.goals;
        
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!"; 
    }
    );
  } 

  // Get Dentist
    private getDentists() {
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

}
