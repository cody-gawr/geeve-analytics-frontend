import { Component, OnInit,ViewChild } from '@angular/core';
import { MorningHuddleService } from './morning-huddle.service';
import { CookieService } from "angular2-cookie/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  production: string;
  recall: string;
  treatment: string;

  patientname: string;
  dentist : string;
  start: string;
  outstanding: string;
  phone: string;
  xrays: string;
  noshows: string;
  newpatient: string;
  card: string;  
  status: string;  
}



@Component({
  selector: 'app-morning-huddle',
  templateUrl: './morning-huddle.component.html',
  styleUrls: ['./morning-huddle.component.css']
})
export class MorningHuddleComponent implements OnInit {
	 public id:any = '';
  	public clinic_id:any = '';
  	public user_type:any = '';
    public production:any = '';
    public recallRate:any = '';
    public treatmentRate:any = '';
    public previousDays:any = 1;


    public schedulePatieltd:any = 0;
    public scheduleNewPatieltd:any = 0;
    public schedulehours:any = 0;
    public unSchedulehours:any = 0;
    //public appointmentCards:any = [];
    public appointmentCards = new MatTableDataSource();
    public dentistList = new MatTableDataSource([]);

    
    public reAppointment:any = 0;
    public unscheduledPatients:any = 0;
    public unscheduledValue:any = 0;
    public todayPatients:any = 0;
    public todayUnscheduledHours:any = 0;
    public todayUnscheduledBal:any = 0;
    public todayPostopCalls:any = 0;
   
    public remindersRecallsOverdue:any = [];
    public treatmentOutstanding:any = [];
    public outstandingBalances:any = [];
    public followupsUnscheduledPatients:any = [];
    public followupPostOpCalls:any = [];
    public clinicDentists:any = [];
    public currentDentist:any = 1;
    
    public dentistListLoading:boolean = false;


    


  displayedColumns: string[] = ['name', 'production', 'recall', 'treatment'];
  displayedColumns1: string[] = ['name', 'dentist', 'start'];
  displayedColumns2: string[] = ['name', 'start', 'code'];
  displayedColumns3: string[] = ['name', 'start', 'outstanding'];
  displayedColumns4: string[] = ['name', 'phone', 'code','status'];
  displayedColumns5: string[] = ['name', 'phone', 'code','status'];
  displayedColumns6: string[] = ['start','dentist','name', 'card'];
  
 @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private morningHuddleService: MorningHuddleService, private _cookieService: CookieService) { 
  }
 ngOnInit(){
    this.user_type = this._cookieService.get("user_type");
     this.initiate_clinic();
 }
ngAfterViewInit(): void {
    this.dentistList.paginator = this.paginator;
  }
initiate_clinic() {
    $('.external_clinic').show();
    $('.dentist_dropdown').hide();
    $('.header_filters').addClass('flex_direct_mar');
    $('.header_filters').removeClass('hide_header');



    var val = $('#currentClinic').attr('cid');
   if(val != undefined && val !='all') {
      this.clinic_id = val;
      
     $('#title').html('Morning Huddle');
    /***** Tab 1 ***/
    this.getDentistPerformance();
    this.getRecallRate();
    this.getTreatmentRate();
    this.getDentistList();
    /***** Tab 1 ***/


    this.morningHuddleService.getDentists(this.clinic_id).subscribe((dentist:any) =>{ 
      if(dentist.status == 200 && dentist.data){
        this.clinicDentists = dentist.data;
        this.currentDentist = dentist.data[0].providerid;        
        this.getSchedulePatients();
        this.getScheduleNewPatients();
        this.getScheduleHours();
        this.getUnscheduleHours();
        this.getAppointmentCards();
      }
    });
    /***** Tab 2 ***/
    
    /***** Tab 2 ***/

    /***** Tab 3 ***/

    this.getReAppointment();
    this.getUnscheduledPatients();
    this.getUnscheduledValues();
    this.getTodayPatients();
    this.getTodayUnscheduledHours();
    this.getTodayUnscheduledBal();
    this.getTodayPostopCalls();
    /***** Tab 3 ***/
    
    /***** Tab 4 ***/
    this.getReminders();
    this.getRemindersTreatmentOutstanding();
    this.getRemindersOutstandingBalances();
    this.getFollowupsUnscheduledPatients();
    this.getFollowupPostOpCalls();
    /***** Tab 4 ***/
    }
  }


  onTabChanged(event){
   // console.log(event.tab.textLabel,'((((((((((((((');
  }

  refreshPerformanceTab(event){
    this.previousDays = event;
    this.getDentistPerformance();
    this.getRecallRate();
    this.getTreatmentRate();
    this.getDentistList();
  }
  refreshScheduleTab(event){
    this.currentDentist = event;
    this.getSchedulePatients();
    this.getScheduleNewPatients();
    this.getScheduleHours();
    this.getUnscheduleHours();
    this.getAppointmentCards();
  }
  frontDeskTab(event){
    this.previousDays = event;
    this.getSchedulePatients();
    this.getScheduleNewPatients();
    this.getScheduleHours();
    this.getUnscheduleHours();
    this.getAppointmentCards();
  }

  /***** Tab 4 ***/
   getReminders(){
    this.morningHuddleService.getReminders( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.remindersRecallsOverdue = production.data;     
      }
    }); 
  } 

  getRemindersTreatmentOutstanding(){
    this.morningHuddleService.getRemindersTreatmentOutstanding( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.treatmentOutstanding = production.data;     
      }
    }); 
  }


  getRemindersOutstandingBalances(){
    this.morningHuddleService.getRemindersOutstandingBalances( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.outstandingBalances = production.data;     
      }
    }); 
  } 

  getFollowupsUnscheduledPatients(){
    this.morningHuddleService.getFollowupsUnscheduledPatients( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.followupsUnscheduledPatients = production.data;     
      }
    }); 
  } 

  getFollowupPostOpCalls(){
    this.morningHuddleService.followupPostOpCalls( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.followupPostOpCalls = production.data;     
      }
    }); 
  } 
  
  /***** Tab 4 ***/
  
  /***** Tab 3 ***/
   getReAppointment(){
    this.morningHuddleService.getReAppointment( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.reAppointment = production.data;     
      }
    }); 
  } 

  getUnscheduledPatients(){
    this.morningHuddleService.getUnscheduledPatients( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.unscheduledPatients = production.data;
      }
    }); 
  }

  getUnscheduledValues(){
    this.morningHuddleService.getUnscheduledValues( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.unscheduledValue = production.data;
      }
    }); 
  }

   getTodayPatients(){
    this.morningHuddleService.getTodayPatients( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.todayPatients = production.data;
      }
    }); 
  }

   getTodayUnscheduledHours(){
    this.morningHuddleService.getTodayUnscheduledHours( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.todayUnscheduledHours = production.data;

    
      }
    }); 
  }
   getTodayUnscheduledBal(){
    this.morningHuddleService.getTodayUnscheduledBal( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.todayUnscheduledBal = production.data;       
      }
    }); 
  }
  
   getTodayPostopCalls(){
    this.morningHuddleService.getTodayPostopCalls( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.todayPostopCalls = production.data;
      }
    }); 
  }


  /***** Tab 3 ***/  
  
/***** Tab 2 ***/
   getSchedulePatients(){
    this.morningHuddleService.getPatients( this.clinic_id,this.currentDentist,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.schedulePatieltd = production.data;
      }
    }); 
  }
   getScheduleNewPatients(){
    this.morningHuddleService.getNewPatients( this.clinic_id, this.currentDentist,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.scheduleNewPatieltd = production.data;
      }
    }); 
  }

   getScheduleHours(){
    this.morningHuddleService.getScheduleHours( this.clinic_id,  this.currentDentist,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.schedulehours = production.data;
      }
    }); 
  }
   getUnscheduleHours(){
    this.morningHuddleService.getUnscheduleHours( this.clinic_id, this.currentDentist,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.unSchedulehours = production.data;
      }
    }); 
  }

   getAppointmentCards(){
    this.morningHuddleService.getAppointmentCards( this.clinic_id,this.currentDentist, this.previousDays,  this.user_type ).subscribe((production:any) => {
      if(production.status == true) {
        this.appointmentCards.data = production.data;
      }
    }); 
  }


/***** Tab 2 ***/

/***** Tab 1 ***/
  getDentistPerformance(){
  	this.morningHuddleService.dentistProduction( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
  		if(production.status == true) {
        this.production = production.data;
  		}
  	});	
  }


  getRecallRate(){
  	this.morningHuddleService.recallRate( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((recallRate:any) => {
  		if(recallRate.status == true){
        this.recallRate = recallRate.data;
  		}
  	});	
  }

  getTreatmentRate(){
    this.morningHuddleService.rebookTreatmentRate( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((treatmentRate:any) => {
      if(treatmentRate.status == true){
         this.treatmentRate = treatmentRate.data;
      }
    }); 
  }


 getDentistList(){
    this.morningHuddleService.dentistList( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((list:any) => {
      if(list.status == true){

        this.dentistList.data = list.data;
        this.dentistListLoading = true;
      }
    }); 
  }


  getdifference (a, b) { 
    return Math.abs(a - b); 
  }


  getFirstLetter(str){
    if(str.toLowerCase().indexOf("dr ") == 0){
      str = str.slice(3);
    }
    var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
    return matches.join('')
  }
  
  toggleUpdate(event,pid,cid,uid,type) {    
    this.morningHuddleService.updateFollowUpStatus(event.checked,pid,cid,uid,type).subscribe((update:any) => {
      console.log(update,'***');
    });
  }

}


