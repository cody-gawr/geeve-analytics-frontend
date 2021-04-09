import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MorningHuddleService } from './morning-huddle.service';
import { CookieService } from "ngx-cookie";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

import { HeaderService } from '../../layouts/full/header/header.service';
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
export class MorningHuddleComponent implements OnInit,OnDestroy {
  selectedTab = 0;
  morningHuddleTabs = [
    'Dentist Performance',
    'Patient Schedule',
    'Front Desk',
    'Reminders',
    'Followups'
  ];
	 public id:any = '';
  	public clinic_id:any = '';
  	public user_type:any = '';
    public production:any = '';
    public recallRate:any = '';
    public treatmentRate:any = '';
    public previousDays:any = 1;


    public schedulePatieltd:any = 0;
    public schedulePatielDate:any = '';
    public scheduleNewPatieltd:any = 0;
    public schedulehours:any = 0;
    public unSchedulehours:any = 0;
    public noShow:any = 0;
    public appointmentCardsTemp:any = [];
    public appointmentCards = new MatTableDataSource();
    public dentistList = new MatTableDataSource([]);

    
    public reAppointment:any = 0;
    public reAppointmentdate:any = '';
    public unscheduledPatients:any = 0;
    public unscheduledValue:any = 0;
    public todayPatients:any = 0;
    public todayPatientsDate:any = '';
    public todayUnscheduledHours:any = 0;
    public todayUnscheduledBal:any = 0;
    public todayPostopCalls:any = 0;
   
    public remindersRecallsOverdue:any = [];
    public remindersRecallsOverdueDate:any = '';
    public treatmentOutstanding:any = [];
    public outstandingBalances:any = [];
    public followupsUnscheduledPatients:any = [];
    public followupsUnscheduledPatientsDate:any = '';
    public followupPostOpCalls:any = [];
    public clinicDentists:any = [];
    public currentDentist:any = 0;
    public currentDentistSchedule:any = 0;
    
    public dentistListLoading:boolean = false;


    


  displayedColumns: string[] = ['name', 'production', 'recall', 'treatment'];
  displayedColumns1: string[] = ['start', 'name', 'dentist',];
  displayedColumns2: string[] = ['start', 'name', 'code'];
  displayedColumns3: string[] = ['start', 'name', 'outstanding'];
  displayedColumns4: string[] = ['name', 'phone', 'code','status'];
  displayedColumns5: string[] = ['name', 'phone', 'code','status'];
  displayedColumns6: string[] = ['start','dentist','name', 'card'];
  
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private morningHuddleService: MorningHuddleService, private _cookieService: CookieService, private headerService: HeaderService,private router: Router,private toastr: ToastrService) { 
  }
 ngOnInit(){
    $('#currentDentist').attr('did','all');
    this.user_type = this._cookieService.get("user_type");

     //this.initiate_clinic();
 }
ngAfterViewInit(): void {
    this.dentistList.paginator = this.paginator;
    $('.dentist_dropdown').parent().hide(); // added
    $('.sa_heading_bar').addClass("filter_single"); // added
  }
ngOnDestroy() {
  $('.dentist_dropdown').parent().show(); // added
  $('.sa_heading_bar').removeClass("filter_single"); // added
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
    this.getSchedulePatients(null);
    this.getScheduleNewPatients(null);
    this.getScheduleHours(null);
    this.getUnscheduleHours(null);
    this.getAppointmentCards(null);
    /***** Tab 2 ***/
    
    /***** Tab 2 ***/

    /***** Tab 3 ***/

    this.getReAppointment();
    this.getUnscheduledPatients();
    this.getUnscheduledValues();
    this.getTodayPatients();
    this.getTodayUnscheduledHours();
    this.getTodayUnscheduledBal();
    this.getNoShow();
    this.getTodayPostopCalls();
    /***** Tab 3 ***/
    
    /***** Tab 4 ***/
    this.getReminders();
    /***** Tab 4 ***/
    /***** Tab 5 ***/
    this.getFollowupsUnscheduledPatients();
    this.getFollowupPostOpCalls();
    /***** Tab 5 ***/
    }
  }

  
  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }

  onTabChanged(event){
   // console.log(event.tab.textLabel,'((((((((((((((');
  }

  refreshPerformanceTab(event){
    this.previousDays = event;
    /*******Tab 1 *******/
    this.getDentistPerformance();
    this.getRecallRate();
    this.getTreatmentRate();
    this.getDentistList();
    /*******Tab 1 *******/

    /*******Tab 2 *******/
    if(this.currentDentist == 0){
        this.currentDentist = null;
    }
    this.getSchedulePatients(this.currentDentist);
    this.getScheduleNewPatients(this.currentDentist);
    this.getScheduleHours(this.currentDentist);
    this.getUnscheduleHours(this.currentDentist);
    this.getAppointmentCards(this.currentDentist);
    /*******Tab 2 *******/

    /*******Tab 3 *******/
    this.getReAppointment();
    this.getUnscheduledPatients();
    this.getUnscheduledValues();
    this.getTodayPatients();
    this.getTodayUnscheduledHours();
    this.getTodayUnscheduledBal();
    this.getNoShow();
    this.getTodayPostopCalls();
    /*******Tab 3 *******/
    /*******Tab 4 *******/
     this.getReminders();
    /*******Tab 4 *******/
    
    /*******Tab 5 *******/
    this.getFollowupsUnscheduledPatients();
    this.getFollowupPostOpCalls();
    /*******Tab 5 *******/
  }

  refreshScheduleTab(event){
  /*  $('.temP').remove();
    if(event == 0){
      this.currentDentist = 'null';
      $('.DentistListSecRow').find("tr").removeClass('hide');
    } else {
     
      $('.DentistListSecRow table tbody').find("tr").addClass('hide');
      $('.DentistListSecRow table tbody').find("td[id='"+event+"']").parent().removeClass('hide');
    }
    
    if($('.DentistListSecRow table tbody').find("td[id='"+event+"']").length == 0 && event != 0){
        $('.DentistListSecRow table tbody').append('<tr class="temP"><td align="center" colspan="4"> No Data found</td></tr>');
    }
    */
    this.currentDentist = event;
    this.getSchedulePatients(this.currentDentist);
    this.getScheduleNewPatients(this.currentDentist);
    this.getScheduleHours(this.currentDentist);
    this.getUnscheduleHours(this.currentDentist);
    //this.getAppointmentCards(this.currentDentist);
    if(this.currentDentist != 0){
      var temp = [];
      this.appointmentCardsTemp.forEach(val => {
        if(val.provider_id == this.currentDentist){
          temp.push(val);
        }
      });
      this.appointmentCards.data = temp;   
    } else {
      this.appointmentCards.data = this.appointmentCardsTemp;   
    }    
  }

  /***** Tab 4 ***/
   getReminders(){
    this.morningHuddleService.getReminders( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.remindersRecallsOverdue = production.data;     
        this.remindersRecallsOverdueDate = production.date;     
      }
    }); 
  } 



  getFollowupsUnscheduledPatients(){
    this.morningHuddleService.getFollowupsUnscheduledPatients( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        production.data.map((item) => {
          const phoneNumber  = item.phone_home ? item.phone_home : ( item.phone_work ? item.phone_work : item.mobile);
          if(phoneNumber) {
            let str = phoneNumber.split(" ").join("");
            if (phoneNumber.substring(0, 2) == '04') {
              item.phoneNumber = [str.slice(0, 4), str.slice(4, 7), str.slice(7)].join(' ')
            } else {
              item.phoneNumber = phoneNumber;
            }
          }
        })
        this.followupsUnscheduledPatients = production.data;     
        this.followupsUnscheduledPatientsDate = production.date;     
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
        this.reAppointment = production.data.reappointment;     
        this.reAppointmentdate = production.data.date;     
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
        this.todayPatients = production.data.patient;
        this.todayPatientsDate = production.data.date;
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


  getNoShow(){
    this.morningHuddleService.getNoShow( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.noShow = production.data;       
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
   getSchedulePatients(dentist){
    this.morningHuddleService.getPatients( this.clinic_id,dentist,this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.schedulePatieltd = production.data.patient;
        this.schedulePatielDate = production.data.date;
      }
    }); 
  }
   getScheduleNewPatients(dentist){
    this.morningHuddleService.getNewPatients( this.clinic_id, dentist,this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.scheduleNewPatieltd = production.data;
      }
    }); 
  }

   getScheduleHours(dentist){
    this.morningHuddleService.getScheduleHours( this.clinic_id,  dentist, this.previousDays, this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.schedulehours = production.data;
      }
    }); 
  }
   getUnscheduleHours(dentist){
    this.morningHuddleService.getUnscheduleHours( this.clinic_id, dentist, this.previousDays, this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.unSchedulehours = production.data;
      }
    }); 
  }

  

   getAppointmentCards(dentist){
    this.morningHuddleService.getAppointmentCards( this.clinic_id,dentist,this.previousDays,this.user_type ).subscribe((production:any) => {
      if(production.status == true) {
        this.clinicDentists = [];
        this.appointmentCards.data = production.data; 
        this.appointmentCardsTemp = production.data; 
        production.data.forEach(val => {
          // check for duplicate values        
          var isExsist = this.clinicDentists.filter(function (person) { return person.provider_id == val.provider_id });
          if(isExsist.length <= 0){
            var temp = {'provider_id' : val.provider_id, 'provider_name' : val.provider_name};
            this.clinicDentists.push(temp);  
          }          
        });               
        this.clinicDentists.sort(function (x, y) {
            let a = x.provider_name.toUpperCase(),
            b = y.provider_name.toUpperCase();
            return a == b ? 0 : a > b ? 1 : -1;
        });
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
    let difference: any = Math.abs(a - b);
    difference = difference>0 ? difference : (difference.toString().split('-').join());
    return difference; 
  }


  getFirstLetter(str){
    if(str.toLowerCase().indexOf("dr ") == 0){
      str = str.slice(3);
    }
    var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
    return matches.join('')
  }
  
  toggleUpdate(event,pid,cid,uid,type) {    
    this.morningHuddleService.updateFollowUpStatus(event.checked,pid,cid,uid,type, this.previousDays).subscribe((update:any) => {
      console.log(update,'***'); 
    });
  }

  endTime(app_date, start, duration){
    var date = app_date + " "+start;
    var currentDate = new Date(date);
    return  new Date(currentDate.getTime() + duration*60000);
  }

  subtractDays(daysToSubtract) {
    let todaysDate = new Date();
    let selectedDate = new Date();
    selectedDate.setDate(todaysDate.getDate()-daysToSubtract)
    // console.log(`Todays date: ${todaysDate}`)
    // console.log(`Selected date: ${selectedDate}`)
    return selectedDate;
  }

}


