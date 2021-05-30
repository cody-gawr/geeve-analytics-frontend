import { Component, HostListener, OnDestroy, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { MorningHuddleService } from './morning-huddle.service';
import { CookieService } from "ngx-cookie";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { HeaderService } from '../../layouts/full/header/header.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ITooltipData } from '../../shared/tooltip/tooltip.directive';
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
  styleUrls: ['./morning-huddle.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MorningHuddleComponent implements OnInit,OnDestroy {
  selectedTab = 0;
  morningHuddleTabs = [
    'Dentist Performance',
    'Dentist Schedule',
    'Front Desk Reminders',
    'Front Desk Followups',
  ];
	 public id:any = '';
  	public clinic_id:any = '';
  	public user_type:any = '';
    public dentistid:any = null;
    public production:any = '';
    public recallRate:any = '';
    public treatmentRate:any = '';
    public previousDays:any = '';

    public unscheduledPatientsDays:any = '';
    public postOpCallsDays:any = '';
    public followupsPostopCallsDate:any = '';
    public schedulePatieltd:any = 0;
    public schedulePatielDate:any = '';
    public scheduleNewPatieltd:any = 0;
    public schedulehours:any = 0;
    public unSchedulehours:any = 0;
    public noShow:any = 0;
    public appointmentCardsTemp:any = [];
    public appointmentCards = new MatTableDataSource();
    public dentistList = new MatTableDataSource([]);
    dentistListTemp:any = [];
    
    public reAppointment:any = 0;
    public reAppointmentdate:any = '';
    public unscheduledPatients:any = 0;
    public unscheduledValue:any = 0;
    public todayPatients:any = 0;
    public todayPatientsDate:any = '';
    public todayUnscheduledHours:any = 0;
    public todayChairUtilisationRate:any = 0;
    public todayUnscheduledBal:any = 0;
    public todayPostopCalls:any = 0;
   
    public remindersRecallsOverdue:any = [];
    public remindersRecallsOverdueDate:any = '';
    public treatmentOutstanding:any = [];
    public outstandingBalances:any = [];
    public followupsUnscheduledPatients:any = [];
    public followupsUnscheduledRecalls:any = [];
    public followupsUnscheduledPatientsDate:any = '';
    public followupPostOpCalls:any = [];
    public followupPostOpCallsInComp:any = [];
    public followupOverDueRecall:any = [];
    public followupOverDueRecallInCMP:any = [];
    public followupsOverDueRecallDate:any = '';
    public followupsTickFollowupsDate:any = '';
    public TickFollowupsDays:any = '';
    public OverDueRecallDays:any = '';
    public followupTickFollowups:any = [];
    public followupTickFollowupsInCMP:any = [];
    public endOfDaysTasks:any = [];
    public endOfDaysTasksInComp:any = [];
    public endOfDaysTasksComp:any = [];
    public endOfDaysTasksDate:any = '';
    public endTaksLoading:boolean = true;
    public showComplete:boolean = false;
    public clinicDentists:any = [];
    public currentDentist:any = 0;
    public currentDentistSchedule:any = 0;
    
    public dentistListLoading:boolean = false;
    public postopCallsPostOp:boolean = false;
    public showCompleteOverdue:boolean = false;
    public showCompleteTick:boolean = false;
    public endTaksLoadingLoading:boolean = true;
    public poLoadingLoading:boolean = true;
    public recallLoadingLoading:boolean = true;

    tooltipDataPostOps: ITooltipData = {
      title: 'Post Op Calls',
      info: 'Post Op Calls are populated based on the number of "days before" you configure in the Settings menu. We also show any calls not completed in the two days prior to this.',
      direction: 'right'
   
    }; 

    tooltipDataRecalls: ITooltipData = {
      title: 'Overdue Recalls',
      info: 'Overdue recalls are populated based on the number of "weeks before" you configure in the Settings menu. This allows you to follow up on patients who have not attended a followup recall appointment 6-7 months later.',
      direction: 'right'
    }; 

    tooltipDataTicks: ITooltipData = {
      title: 'Tick Followups',
      info: 'Tick followups are populated based on the number of "days before" you configure in the Settings menu. Any patient who had a treatment recorded with the "TICK" code on this day will be shown here.',
      direction: 'right'
    }; 


  displayedColumns: string[] = ['name', 'production', 'recall', 'treatment'];
  displayedColumns1: string[] = ['start', 'name', 'dentist',];
  displayedColumns2: string[] = ['start', 'name', 'code'];
  displayedColumns3: string[] = ['start', 'name', 'outstanding'];
  displayedColumns4: string[] = ['name', 'phone', 'code','status'];
  displayedColumns5: string[] = ['name', 'phone','code','date','status'];
  displayedColumns6: string[] = ['start','dentist','name', 'card'];
  displayedColumns7: string[] = ['name', 'phone', 'code','note','status'];
  displayedColumns8: string[] = ['name', 'phone', 'code','note','status',];
  displayedColumns9: string[] = ['name', 'status',];

  timezone: string = '+1000';
  
 @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private datepipe: DatePipe, private morningHuddleService: MorningHuddleService, private _cookieService: CookieService, private headerService: HeaderService,private router: Router,private toastr: ToastrService) { 
  }

  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.matTabGroup.realignInkBar(); // align material tab green shaded color to first tab (on screen resize)
  }

 ngOnInit(){
    $('#currentDentist').attr('did','all');
    if(this._cookieService.get("dentistid") && this._cookieService.get("dentistid") != '' && this.user_type == '4'){
        this.dentistid = this._cookieService.get("dentistid");
    }
    this.user_type = this._cookieService.get("user_type");
    
    // align material tab green shaded color to first tab (on initial load - needs delay to ensure mat tab is available)
    setTimeout(() => {
      this.matTabGroup.realignInkBar();
    }, 500);    
    
 }
ngAfterViewInit(): void {
    this.dentistList.paginator = this.paginator;
    //$('.dentist_dropdown').parent().hide(); // added
    $('.sa_heading_bar').addClass("filter_single"); // added   
  }
ngOnDestroy() {
  //$('.dentist_dropdown').parent().show(); // added
  $('.sa_heading_bar').removeClass("filter_single"); // added
}

initiate_clinic() {
  this.user_type = this._cookieService.get("user_type");
  $('.external_clinic').show();
  //$('.dentist_dropdown').hide();
  $('.header_filters').addClass('flex_direct_mar');
  $('.header_filters').removeClass('hide_header');
  var val = $('#currentClinic').attr('cid');
  if(val != undefined && val !='all') {
    this.clinic_id = val;
    $('#title').html('Morning Huddle');
    if(this.previousDays  == '')
    {
      this.previousDays = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    }

    if(this.user_type != '5'){
      /***** Tab 1 ***/
      this.getDentistPerformance();
      this.getRecallRate();
      this.getTreatmentRate();
      this.getDentistList();
      /***** Tab 1 ***/    
      /***** Tab 2 ***/
      //this.getSchedulePatients(null);
      this.getAppointmentCards(null);
    }
    if(this.user_type != '4'){
      this.getScheduleNewPatients(null);
      this.getScheduleHours(null);
      this.getUnscheduleHours(null);
    /***** Tab 2 ***/
      /***** Tab 3 ***/
      this.getUnscheduledValues();
      this.getTodayUnscheduledHours();
      this.getChairUtilisationRate();
      this.getTodayUnscheduledBal();
      this.getNoShow();
      //this.getUnscheduledPatients();
      //this.getTodayPatients();
      //this.getTodayPostopCalls();
      // this.getReAppointment();
      /***** Tab 3 ***/ 
      /***** Tab 4 ***/
      this.getReminders();
      //this.getFollowupsUnscheduledPatients();
      this.getFollowupPostOpCalls();
      this.getOverdueRecalls();
      this.getTickFollowups();
      /***** Tab 4 ***/     
      }

      if(this.user_type != '4'){
        this.getEndOfDays();
      }
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
    //this.getSchedulePatients(this.currentDentist);
    this.getScheduleNewPatients(this.currentDentist);
    this.getScheduleHours(this.currentDentist);
    this.getUnscheduleHours(this.currentDentist);
    this.getAppointmentCards(this.currentDentist);
    /*******Tab 2 *******/

    /*******Tab 3 *******/
    // this.getReAppointment();
    //this.getUnscheduledPatients();
    this.getUnscheduledValues();
    //this.getTodayPatients();
    this.getTodayUnscheduledHours();
    this.getChairUtilisationRate();
    this.getTodayUnscheduledBal();
    this.getNoShow();
    //this.getTodayPostopCalls();
    /*******Tab 3 *******/
    /*******Tab 4 *******/
     this.getReminders();
    /*******Tab 4 *******/
    
    /*******Tab 5 *******/
    //this.getFollowupsUnscheduledPatients();
    this.getFollowupPostOpCalls();
    this.getOverdueRecalls();
    this.getTickFollowups();
    /*******Tab 5 *******/
    if(this.user_type != '4'){
      this.getEndOfDays();
    }
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
    //this.getSchedulePatients(this.currentDentist);
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



/*  getFollowupsUnscheduledPatients(){
    this.morningHuddleService.getFollowupsUnscheduledPatients( this.clinic_id, this.previousDays,  this.unscheduledPatientsDays  ).subscribe((production:any) => {
      if(production.status == true) {
        this.unscheduledPatientsDays = production.days.unsched_days;
        production.data.map((item) => {
          const phoneNumber  = item.phone_number ? item.phone_number : ( item.phone_work ? item.phone_work : item.mobile);
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
        //this.followupsUnscheduledPatients = production.data.filter(p => p.code!="Recall Unscheduled");
        //this.followupsUnscheduledRecalls = production.data.filter(p => p.code==="Recall Unscheduled");        
        this.followupsUnscheduledPatientsDate = production.date;     
      }
    }); 
  } */

  getFollowupPostOpCalls(){
    this.morningHuddleService.followupPostOpCalls( this.clinic_id, this.previousDays,  this.postOpCallsDays ).subscribe((production:any) => {
        this.poLoadingLoading = false;
      if(production.message == 'success') {
        this.followupPostOpCalls = production.data;   
        if(this.postopCallsPostOp == true){  
            this.followupPostOpCallsInComp = this.followupPostOpCalls;
          } else {            
            this.followupPostOpCallsInComp = this.followupPostOpCalls.filter(p => p.is_complete != true);      
          }       
        this.followupsPostopCallsDate = production.date;     
        this.postOpCallsDays = production.previous;     
      }
    }); 
  } 

  getOverdueRecalls(){
    this.morningHuddleService.followupOverdueRecalls( this.clinic_id, this.previousDays,  this.postOpCallsDays ).subscribe((production:any) => {
        this.recallLoadingLoading = false;
      if(production.message == 'success') {
        this.followupOverDueRecall = production.data;     
        if(this.showCompleteOverdue == true){  
            this.followupOverDueRecallInCMP = this.followupOverDueRecall;
          } else {            
            this.followupOverDueRecallInCMP = this.followupOverDueRecall.filter(p => p.is_complete != true);      
          }

        this.followupsOverDueRecallDate = production.date;     
       this.OverDueRecallDays = production.previous;     
      }
    }); 
  } 

  getTickFollowups(){
    this.morningHuddleService.followupTickFollowups( this.clinic_id, this.previousDays,  this.postOpCallsDays ).subscribe((production:any) => {
        this.endTaksLoadingLoading = false;
      if(production.message == 'success') {
        this.followupTickFollowups = production.data;     
        if(this.showCompleteTick ==  true){  
          this.followupTickFollowupsInCMP = this.followupTickFollowups;
        } else {
          this.followupTickFollowupsInCMP = this.followupTickFollowups.filter(p => p.is_complete != true);      
        }
        this.followupsTickFollowupsDate = production.date;     
        this.TickFollowupsDays = production.previous;     
      }
    }); 
  } 

  getEndOfDays(){
    this.endTaksLoading = true;
    this.morningHuddleService.getEndOfDays( this.clinic_id, this.previousDays).subscribe((production:any) => {
      this.endTaksLoading = false;
      if(production.message == 'success') {
        this.endOfDaysTasks = production.data;  
        this.endOfDaysTasksDate = production.date;
        if(this.showComplete == true){
          this.endOfDaysTasksInComp = this.endOfDaysTasks;
        } else {
          this.endOfDaysTasksInComp = this.endOfDaysTasks.filter(p => p.history.is_complete != 1);      
        }
      }
    }); 
  } 
  
  /***** Tab 4 ***/
  
  /***** Tab 3 ***/
  //  getReAppointment(){
  //   this.morningHuddleService.getReAppointment( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
  //     if(production.status == true) {
  //       this.reAppointment = production.data.reappointment;     
  //       this.reAppointmentdate = production.data.date;     
  //     }
  //   }); 
  // } 

  /*getUnscheduledPatients(){
    this.morningHuddleService.getUnscheduledPatients( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.unscheduledPatients = production.data;
      }
    }); 
  }*/

  getUnscheduledValues(){
    this.morningHuddleService.getUnscheduledValues( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.unscheduledValue = production.data;
      }
    }); 
  }

   /*getTodayPatients(){
    this.morningHuddleService.getTodayPatients( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.todayPatients = production.data.patient;
        this.todayPatientsDate = production.data.date;
      }
    }); 
  }*/

   getTodayUnscheduledHours(){
    this.morningHuddleService.getTodayUnscheduledHours( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.todayUnscheduledHours = production.data.hour;
        this.todayPatientsDate = production.data.date;    
      }
    }); 
  }
   getChairUtilisationRate(){
    this.morningHuddleService.getChairUtilisationRate( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.message == 'success') {
        this.todayChairUtilisationRate =  Math.round(production.data);

    
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
  
/*   getTodayPostopCalls(){
    this.morningHuddleService.getTodayPostopCalls( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.todayPostopCalls = production.data;
      }
    }); 
  }*/


  /***** Tab 3 ***/  
  
/***** Tab 2 ***/
/*   getSchedulePatients(dentist){
    this.morningHuddleService.getPatients( this.clinic_id,dentist,this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.schedulePatieltd = production.data.patient;
        
      }
    }); 
  }*/
   getScheduleNewPatients(dentist){
    this.morningHuddleService.getNewPatients( this.clinic_id, dentist,this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.scheduleNewPatieltd = production.data.patient;
        this.schedulePatielDate = production.data.date;
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
        if(this.user_type == '4'){
          this.refreshScheduleTab(this.dentistid);
        }
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
    this.morningHuddleService.reappointRate( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((treatmentRate:any) => {
      if(treatmentRate.status == true){
         this.treatmentRate = treatmentRate.data;
      }
    }); 
  }


 getDentistList(){
    this.morningHuddleService.dentistList( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((list:any) => {
      if(list.status == true){

        this.dentistList.data = list.data;
        this.dentistListTemp = list.data;
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
  
  //toggleUpdate($event,element.patient_id,element.original_appt_date,element.patients.clinic_id,'Post op Calls')
  toggleUpdate(event,pid,date,cid,type) {    
      if(type == 'post-op-calls'){
          this.poLoadingLoading = true;
      } else if(type == 'recall-overdue'){
        this.recallLoadingLoading = true;
      } else if(type == 'tick-follower'){
        this.endTaksLoadingLoading = true;
      }
    this.morningHuddleService.updateFollowUpStatus(event.checked,pid,cid,type, date).subscribe((update:any) => {
      if(type == 'post-op-calls'){
        this.getFollowupPostOpCalls();
      } else if(type == 'recall-overdue'){
        this.getOverdueRecalls();
      } else if(type == 'tick-follower'){
        this.getTickFollowups();
      }
    });      
  }

  updateStatus(event,pid,date,cid,type) {    
    this.morningHuddleService.updateStatus(event,pid,cid,type, date).subscribe((update:any) => {
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


  formatPhoneNumber(phone){
    if(phone.startsWith('04')){
      phone = phone.replace(/ /g, '');
      var onePart = phone.substr(0, 4);
      var twoPart = phone.substr(4, 3);
      var threePart = phone.substr(7, 3);
      return onePart + ' '+ twoPart+ ' '+threePart;
    } else {
      return phone;
    }
  }
  /*refreshUnscheduledPatients(val){
    this.unscheduledPatientsDays = val;
    this.getFollowupsUnscheduledPatients();
  }*/
/*  refreshPostOpCalls(val){
    this.postOpCallsDays = val;
    this.getFollowupPostOpCalls();
  }*/

  updateTask(event,tid,thid,cid){    
    this.endTaksLoading = true;
    this.morningHuddleService.updateEndStatus(event.checked,tid,thid,cid,this.previousDays).subscribe((update:any) => {
      this.getEndOfDays();
    }); 
  }

  updateToComplete(event){
    this.showComplete = event.checked;
    if(event.checked ==  true){  
      this.endOfDaysTasksInComp = this.endOfDaysTasks;
    } else {
      this.endOfDaysTasksInComp = this.endOfDaysTasks.filter(p => p.history.is_complete != 1);      
    }
  }

  updateToCompleteOP(event){
    this.postopCallsPostOp = event.checked;
    if(event.checked ==  true){  
      this.followupPostOpCallsInComp = this.followupPostOpCalls;
    } else {      
      this.followupPostOpCallsInComp = this.followupPostOpCalls.filter(p => p.is_complete != true);      
    }
  }
  updateToCompleteOR(event){
    this.showCompleteOverdue = event.checked;
    if(event.checked ==  true){  
      this.followupOverDueRecallInCMP = this.followupOverDueRecall;
    } else {
      this.followupOverDueRecallInCMP = this.followupOverDueRecall.filter(p => p.is_complete != true);      
    }
  }
  updateToCompleteTF(event){
    this.showCompleteTick = event.checked;
    if(event.checked ==  true){  
      this.followupTickFollowupsInCMP = this.followupTickFollowups;
    } else {
          this.followupTickFollowupsInCMP = this.followupTickFollowups.filter(p => p.is_complete != true);      
    }
  }

}




