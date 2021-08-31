import { Component, HostListener, OnDestroy, OnInit,ViewChild,ViewEncapsulation,Inject } from '@angular/core';
import { MorningHuddleService } from './morning-huddle.service';
import { ClinicianAnalysisService } from '../cliniciananalysis/cliniciananalysis.service';
import { CookieService } from "ngx-cookie";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { HeaderService } from '../../layouts/full/header/header.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ITooltipData } from '../../shared/tooltip/tooltip.directive';
import { AppConstants } from '../../app.constants';
import { NgxDaterangepickerMd, DaterangepickerComponent } from 'ngx-daterangepicker-material';
import { ChartstipsService } from '../../shared/chartstips.service';
import {MatSort} from '@angular/material/sort';
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

import { MAT_DIALOG_DATA,MatDialogRef,MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'notes-add-dialog',
  templateUrl: './add-notes.html',
  encapsulation: ViewEncapsulation.None
})


export class DialogOverviewExampleDialogComponent { 
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _cookieService: CookieService, private router: Router,private morningHuddleService: MorningHuddleService,) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data){  
    if( data.notes == '' || data.old == data.notes){
      return false;
    }

    this.morningHuddleService.notes(data.notes,data.patientId, data.date,data.clinic_id, data.followup_date, data.type).subscribe((res) => {
      if (res.message == 'success') {
        this.dialogRef.close();
      } else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }
  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
    this._cookieService.put("token", '');
    this._cookieService.put("userid", '');
    this.router.navigateByUrl('/login');
  }

}



@Component({
  selector: 'status-dialog',
  templateUrl: './status.html',
  encapsulation: ViewEncapsulation.None
})

export class StatusDialogMHComponent { 
  public nextDate:any = '';
  public nextCustomFollowup:boolean = false;
  public nextFollowupHave:boolean = false;
  @ViewChild(DaterangepickerComponent, { static: false }) datePicker: DaterangepickerComponent;
  constructor(public dialogRef: MatDialogRef<StatusDialogMHComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _cookieService: CookieService, private router: Router,private morningHuddle: MorningHuddleService) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  updateNextfollowUp(data){   
     this.morningHuddle.updateStatus('Wants another follow-up',data.pid,data.cid,data.type,data.original_appt_date,data.followup_date).subscribe((update:any) => {
      this.onNoClick();
      if(update.status){
         this.morningHuddle.cloneRecord(data.pid,data.cid,data.type,data.followup_date,this.nextDate,data.original_appt_date).subscribe((update:any) => {
        });  
      }
        
     }); 
  }

  updateNext(event){
    this.nextDate = event.chosenLabel;
  }
    showCalender(event){
    this.nextCustomFollowup = true;
     this.nextFollowupHave = false;
  }

  updateNextReached(data, event) {
     this.nextCustomFollowup = false;
     this.nextFollowupHave = false;
     this.morningHuddle.updateStatus(data.event,data.pid,data.cid,data.type,data.original_appt_date, data.followup_date).subscribe((update:any) => {
      if(update.status && event != 'no')
      {
        this.morningHuddle.cloneRecord(data.pid,data.cid,data.type,data.followup_date,this.nextDate,data.original_appt_date,event).subscribe((clone:any) => {
            if(clone.message  == 'already'){
              this.nextDate = clone.$getRecord.followup_date;
              this.nextFollowupHave = true;
            } else {
              this.onNoClick();
            }
        }); 
      }       else {
        this.onNoClick();
      } 
    }); 
  }

  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
    this._cookieService.put("token", '');
    this._cookieService.put("userid", '');
    this.router.navigateByUrl('/login');
  }

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
    public appointmentCardsLoading:boolean = true;
    public dentistList:any = new MatTableDataSource([]);
    dentistListTemp:any = [];
    
    public futureDateOP :any = '';
    public futureDateOR :any = '';
    public futureDateTH :any = '';
    public futureDateTF :any = '';
    public futureDateDT :any = '';
    public futureDateEL :any = '';

    public reAppointment:any = 0;
    public reAppointmentdate:any = '';
    public unscheduledPatients:any = 0;
    //public unscheduledValue:any = 0;
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
    public endOfDaysTasksInComp  =   new MatTableDataSource([]);
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
    
    public dentistperformanceLoader:boolean = true;
    public dentistrecallRateLoader:boolean = true;
    public dentistTreatmentRateLoader:boolean = true;
    public appointmentCardsLoaders:boolean = true;
    public scheduleNewPatientsLoader:boolean = true;
    public schedulehoursLoader:boolean = true;
    public unschedulehoursLoader:boolean = true;
    public remindersRecallsOverdueLoader:boolean = true;
    public todayUnscheduledHoursLoader:boolean = true;
    public todayUnscheduledBalLoader:boolean = true;
    public lquipmentList =  new MatTableDataSource([]);
    public lquipmentListAm:any =  [];
    public showELPm:boolean =  false;
    public equipmentListLoading:boolean =  true;
    public amButton:boolean =  true;
    public pmButton:boolean =  true;
    public dailyTabSettLod:boolean =  false;
    public charTips:any = [];
    public dentist_id:any = '';
    public nextBussinessDay:any;
    public userPlan:any = '';


    public isEnablePO: boolean = false;
    public isEnableOR: boolean = false;
    public isEnableTH: boolean = false;
    public isEnableFT: boolean = false;

  displayedColumns: string[] = ['name', 'production', 'recall', 'treatment'];
  displayedColumns1: string[] = ['start', 'name', 'dentist',];
  displayedColumns2: string[] = ['start', 'name', 'code'];
  displayedColumns3: string[] = ['start', 'name', 'outstanding'];
  displayedColumns4: string[] = ['name', 'phone', 'code','status'];
  displayedColumns5: string[] = ['name', 'phone','code','date','status'];
  displayedColumns6: string[] = ['start','dentist','name', 'card'];
  displayedColumns7: string[] = ['name', 'phone', 'code','note','book','status'];
  displayedColumns8: string[] = ['name', 'phone', 'code','note','book','status',];
  displayedColumns9: string[] = ['task_name','completed_by', 'status'];
  displayedColumns10: string[] = ['equip_item', 'quantity','am','pm'];

  timezone: string = '+1000';
  
  @ViewChild('sort1') sort1: MatSort;
 @ViewChild('sort2') sort2: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private datepipe: DatePipe, 
    private morningHuddleService: MorningHuddleService, 
    private _cookieService: CookieService, 
    private headerService: HeaderService,
    private router: Router,
    private toastr: ToastrService,
    public constants: AppConstants,
    public dialog: MatDialog,
    public chartstipsService: ChartstipsService,
    public clinicianAnalysisService: ClinicianAnalysisService
    ) { 
    this.getChartsTips();
 }

  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.matTabGroup.realignInkBar(); // align material tab green shaded color to first tab (on screen resize)
  }

 ngOnInit(){
    
    /*this.dataSource1.sort = this.sort1;
    this.dataSource2.sort = this.sort2;*/
    $('#currentDentist').attr('did','all');
    this.user_type = this._cookieService.get("user_type");
    this.userPlan = this._cookieService.get("user_plan");
    if(this._cookieService.get("dentistid") && this._cookieService.get("dentistid") != '' && this.user_type == '4'){
        this.dentistid = this._cookieService.get("dentistid");
    }
    
    // align material tab green shaded color to first tab (on initial load - needs delay to ensure mat tab is available)
    setTimeout(() => {
      this.matTabGroup.realignInkBar();
    }, 500);    

    var self = this;
    let autoCall =  setInterval( function()
    {
       self.refreshDataAuto();
    }, 1000 * 60);    
 }
ngAfterViewInit(): void {
  this.endOfDaysTasksInComp.sort = this.sort1; 
  this.lquipmentList.sort = this.sort2; 
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
    this.dailyTabSettLod = false;
    this.clinicianAnalysisService.getClinics( this.clinic_id, 'DailyTaskEnable,EquipListEnable,PostOpEnable,RecallEnable,TickEnable,FtaEnable' ).subscribe((data:any) => {
      this.dailyTabSettLod = true;
      if(data.message == 'success'){
        this.isEnabletasks = (data.data.daily_task_enable == 1)? true : false;
        this.isEnableEquipList = (data.data.equip_list_enable == 1)? true : false;
        this.isEnablePO = (data.data.post_op_enable == 1)? true : false;
        this.isEnableOR = (data.data.recall_enable == 1)? true : false;
        this.isEnableTH = (data.data.tick_enable == 1)? true : false;
        this.isEnableFT = (data.data.fta_enable == 1)? true : false;
      }
    }); 

    this.dentist_id = this._cookieService.get("dentistid");
    if(this.user_type != '5'){
      /***** Tab 1 ***/
      this.getDentistPerformance();
      this.getRecallRate();
      this.getTreatmentRate();
      if(this.user_type != '4'){
        this.getDentistList();
      }
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
      //this.getUnscheduledValues();
      this.getTodayUnscheduledHours();
      //this.getChairUtilisationRate();
      this.getTodayUnscheduledBal();
      //this.getNoShow();
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
      this.getFtaFollowups();
      /***** Tab 4 ***/     
      }

      if(this.user_type != '4'){
        this.getEndOfDays();
        this.getEquipmentList();
      }
    }
  }

  
  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }

  onTabChanged(event){
  }

  refreshPerformanceTab(){
    /*******Tab 2 *******/
    if(this.currentDentist == 0){
        this.currentDentist = null;
    }
    if(this.user_type != '5'){
      this.getDentistPerformance();
      this.getRecallRate();
      this.getTreatmentRate();
      if(this.user_type != '4'){
        this.getDentistList();
      }
      this.getAppointmentCards(null);
    }
    if(this.user_type != '4')
    {
      this.getScheduleNewPatients(null);
      this.getScheduleHours(null);
      this.getUnscheduleHours(null);
      this.getTodayUnscheduledHours();
      this.getTodayUnscheduledBal();
      this.getReminders();
      this.getFollowupPostOpCalls();
      this.getOverdueRecalls();
      this.getTickFollowups();
      this.getFtaFollowups();
    }
    if(this.user_type != '4'){
      this.getEndOfDays();
      this.getEquipmentList();
    }
  }

  refreshScheduleTab(event){
    this.appointmentCardsLoaders = true;
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
    if(this.currentDentist != 0) {
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
    this.appointmentCardsLoaders = false;
  }

  /***** Tab 4 ***/
  public remindersTotal:any = 0;
   getReminders(){
    this.remindersRecallsOverdueLoader = true;
    this.morningHuddleService.getReminders( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      this.remindersRecallsOverdueLoader = false;
      if(production.status == true) {
        this.remindersTotal = production.total;
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
    this.poLoadingLoading = true;
    this.futureDateOP = '';
    this.morningHuddleService.followupPostOpCalls( this.clinic_id, this.previousDays,  this.postOpCallsDays ).subscribe((production:any) => {
        var diffTime:any = this.getDataDiffrences();
        if(diffTime < 0){
          this.futureDateOP =  this.datepipe.transform( this.previousDays, 'yyyy-MM-dd');
        }
        this.poLoadingLoading = false;
      if(production.message == 'success') {
        this.nextBussinessDay = production.next_day;
        this.followupsPostopCallsDate = production.date;     
        if(production.data == '204'){

        } else {
          this.followupPostOpCalls = production.data;   
          if(this.postopCallsPostOp == true){  
            this.followupPostOpCallsInComp = this.followupPostOpCalls;
          } else {            
            this.followupPostOpCallsInComp = this.followupPostOpCalls.filter(p => p.is_complete != true);      
          }         
        }
        
        //this.postOpCallsDays = production.previous;     
      }
    }); 
  } 

  getOverdueRecalls(evn = ''){
     if(evn != 'close'){
      this.recallLoadingLoading = true;
    }
    this.futureDateOR = '';
    this.morningHuddleService.followupOverdueRecalls( this.clinic_id, this.previousDays,  this.postOpCallsDays ).subscribe((production:any) => {
        var diffTime:any = this.getDataDiffrences();
        if(diffTime < 0){
          this.futureDateOR =  this.datepipe.transform( this.previousDays, 'yyyy-MM-dd');
        }
        this.recallLoadingLoading = false;

      if(production.message == 'success') {
        this.nextBussinessDay = production.next_day;
        if(production.data == '204'){
        } else {
          this.followupOverDueRecall = production.data;     
          if(this.showCompleteOverdue == true){  
            this.followupOverDueRecallInCMP = this.followupOverDueRecall;
          } else {            
            this.followupOverDueRecallInCMP = this.followupOverDueRecall.filter(p => p.is_complete != true);      
          }
        }
       

        this.followupsOverDueRecallDate = production.date;     
       //this.OverDueRecallDays = production.previous;     
      }
    }); 
  } 

   public tipDoneCode = {}; 
   public tipFutureDate = {}; 
  getTickFollowups(evn = ''){
     if(evn != 'close'){
     this.endTaksLoadingLoading = true;
    }
     this.futureDateTH = '';
    this.morningHuddleService.followupTickFollowups( this.clinic_id, this.previousDays,  this.postOpCallsDays ).subscribe((production:any) => {
        var diffTime:any = this.getDataDiffrences();
        if(diffTime < 0){
          this.futureDateTH =  this.datepipe.transform( this.previousDays, 'yyyy-MM-dd');
        }
        this.endTaksLoadingLoading = false;
      if(production.message == 'success') {
        this.nextBussinessDay = production.next_day;
        this.followupsTickFollowupsDate = production.date;
        if(production.data == '204'){

        } else {
          this.followupTickFollowups = production.data;     
          if(this.showCompleteTick ==  true){  
            this.followupTickFollowupsInCMP = this.followupTickFollowups;
          } else {
            this.followupTickFollowupsInCMP = this.followupTickFollowups.filter(p => p.is_complete != true);      
          }

          this.followupTickFollowupsInCMP.forEach((tool) => {
              this.tipDoneCode[tool.patient_id] = { 
                title: 'Outstanding Treatments', 
                info: tool.code
              };
               var date = this.datepipe.transform(tool.future_appt_date, 'MMM d, y');
              this.tipFutureDate[tool.patient_id] = { 
                title: 'Future Appointment', 
                info: date
              };
          });   
        }    
        //this.TickFollowupsDays = production.previous;     
      }
    }); 
  } 




  public followupFtaFollowups:any = [];
  public followupFtaFollowupsInCMP:any = [];
  public ftaTaksLoadingLoading:boolean = false;
  public showCompleteFta:boolean = false;
  public tipFtaDoneCode:any = {};
  public tipFtaFutureDate:any={};

  getFtaFollowups(evn = ''){
    if(evn != 'close'){
     this.ftaTaksLoadingLoading = true;
    }
    this.morningHuddleService.followupFtaFollowups( this.clinic_id, this.previousDays,  this.postOpCallsDays).subscribe((production:any) => {
        this.ftaTaksLoadingLoading = false;
        this.futureDateTF = '';
      if(production.message == 'success') {
        var diffTime:any = this.getDataDiffrences();
        if(diffTime < 0){
          this.futureDateTF =  this.datepipe.transform( this.previousDays, 'yyyy-MM-dd');
        }
        this.nextBussinessDay = production.next_day;        
        this.followupsTickFollowupsDate = production.date;  
        if( production.data == '204'){

        } else {
          this.followupFtaFollowups = production.data;     
          if(this.showCompleteFta ==  true){  
            this.followupFtaFollowupsInCMP = this.followupFtaFollowups;
          } else {
            this.followupFtaFollowupsInCMP = this.followupFtaFollowups.filter(p => p.is_complete != true);      
          }   
          this.followupFtaFollowups.forEach((tool) => {
              this.tipFtaDoneCode[tool.patient_id] = { 
                title: 'Outstanding Treatments', 
                info: tool.code
              };
               var date = this.datepipe.transform(tool.future_appt_date, 'MMM d, y');
              this.tipFtaFutureDate[tool.patient_id] = { 
                title: 'Future Appointment', 
                info: date
              };
          });
        }     
           
       }
    }); 
  } 

  public isEnabletasks:boolean = false;
  getEndOfDays(){
    this.endTaksLoading = true;
    this.futureDateDT = '';
    this.morningHuddleService.getEndOfDays( this.clinic_id, this.previousDays).subscribe((production:any) => {
        var diffTime:any = this.getDataDiffrences();
        if(diffTime < 0){
          this.futureDateDT =  this.datepipe.transform( this.previousDays, 'yyyy-MM-dd');
        }
      this.endTaksLoading = false;
      if(production.message == 'success') {
        if( production.data == '204' ){
          //this.isEnabletasks = false;
        }
        else 
        {
          //this.isEnabletasks = true;
          this.endOfDaysTasks = production.data;  
          this.endOfDaysTasksDate = production.date;
          if(this.showComplete == true) {
            this.endOfDaysTasksInComp.data = this.endOfDaysTasks;
          } else {
            this.endOfDaysTasksInComp.data = this.endOfDaysTasks.filter(p => p.is_complete != 1);      
          }  
        }        
      }
    }); 
  } 

  public isEnableEquipList: boolean = false;
  getEquipmentList() {
    this.equipmentListLoading = true;
    this.futureDateEL = '';
    this.morningHuddleService.getEquipmentList( this.clinic_id, this.previousDays).subscribe((production:any) => {
      var diffTime:any = this.getDataDiffrences();
      if(diffTime < 0){
       this.futureDateEL =  this.datepipe.transform( this.previousDays, 'yyyy-MM-dd');
      }
      this.equipmentListLoading = false;
    //  this.lquipmentList.data = [];
       this.amButton = true;
        this.pmButton = true;
      if(production.message == 'success') {
        if( production.data == '204' )
        {
          //this.isEnableEquipList = false;
        }
        else 
        {
            //this.isEnableEquipList = true;
          this.lquipmentList.data = production.data;       
          var i=0;
          production.data.forEach((list) => {
            
            if(this.amButton == true && list.am_complete == 1 ){
              this.amButton = false;
            }
            if(this.pmButton == true && list.pm_complete == 1){
              this.pmButton = false;
            }
            var temp = {'am' : list.equip_qty_am, 'pm' : list.equip_qty_pm};
            if(typeof(this.lquipmentListAm[list.id]) == 'undefined'){
              this.lquipmentListAm[list.id] = [];
            }
            this.lquipmentListAm[list.id] = temp;          
          });

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

  /*getUnscheduledValues(){
    this.morningHuddleService.getUnscheduledValues( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.unscheduledValue = production.data;
      }
    }); 
  }*/

   /*getTodayPatients(){
    this.morningHuddleService.getTodayPatients( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.todayPatients = production.data.patient;
        this.todayPatientsDate = production.data.date;
      }
    }); 
  }*/

   getTodayUnscheduledHours(){
    this.todayUnscheduledHoursLoader =  true;
    this.morningHuddleService.getTodayUnscheduledHours( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      this.todayUnscheduledHoursLoader =  false;
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
    this.todayUnscheduledBalLoader = true;
    this.morningHuddleService.getTodayUnscheduledBal( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      this.todayUnscheduledBalLoader = false;
      if(production.status == true) {
        this.todayUnscheduledBal = production.data;       
      }
    }); 
  }  


  /*getNoShow(){
    this.morningHuddleService.getNoShow( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
      if(production.status == true) {
        this.noShow = production.data;       
      }
    }); 
  }*/
  
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
    this.scheduleNewPatientsLoader = true;
    this.scheduleNewPatieltd = 0;
    this.morningHuddleService.getNewPatients( this.clinic_id, dentist,this.previousDays,  this.user_type  ).subscribe((production:any) => {
      this.scheduleNewPatientsLoader = false;
      if(production.status == true) {
        this.scheduleNewPatieltd = production.data.patient;
        this.schedulePatielDate = production.data.date;
      }
    }); 
  }

   getScheduleHours(dentist){
    this.schedulehoursLoader = true;
    this.morningHuddleService.getScheduleHours( this.clinic_id,  dentist, this.previousDays, this.user_type  ).subscribe((production:any) => {
      this.schedulehoursLoader = false;
      if(production.status == true) {
        this.schedulehours = production.data;
      }
    }); 
  }
   getUnscheduleHours(dentist){
    this.unschedulehoursLoader = true;
    this.morningHuddleService.getUnscheduleHours( this.clinic_id, dentist, this.previousDays, this.user_type  ).subscribe((production:any) => {
      this.unschedulehoursLoader = false;
      if(production.status == true) {
        this.unSchedulehours = production.data;
      }
    }); 
  }

  
   public clinicTotal:any = 0;
   getAppointmentCards(dentist){
    this.appointmentCardsLoaders = true;
    this.appointmentCards = new MatTableDataSource();
    this.morningHuddleService.getAppointmentCards( this.clinic_id,dentist,this.previousDays,this.user_type ).subscribe((production:any) => {
      this.appointmentCardsLoaders = false;
      this.clinicDentists = [];
      this.currentDentistSchedule = (this.currentDentist)? this.currentDentist : 0;
      this.appointmentCardsTemp = []; 
      this.appointmentCards = new MatTableDataSource();
      if(production.status == true) {
       this.clinicTotal = production.total;
        this.appointmentCardsTemp = production.data; 
        if(this.user_type == '4'){         
          this.dentistid = this._cookieService.get("dentistid");
          this.refreshScheduleTab(this.dentistid);
        } else {
          if(this.currentDentist != 0 && this.currentDentist) {
            var temp = [];
            this.appointmentCardsTemp.forEach(val => {
              if(val.provider_id == this.currentDentist){
                temp.push(val);
              }
            });
            this.appointmentCards.data = temp;   
          } else {
            this.appointmentCards.data = production.data;
          }


          // this.appointmentCards.data = production.data; 
        }
        production.data.forEach(val => {
          // check for duplicate values        
          var isExsist = this.clinicDentists.filter(function (person) { return person.provider_id == val.provider_id });
          if(isExsist.length <= 0){
            var nm = (val.jeeve_name != '' && val.jeeve_name)? val.jeeve_name : val.provider_name;
            var temp = {'provider_id' : val.provider_id, 'provider_name' : nm};
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
   async getDentistPerformance(){
    this.dentistperformanceLoader = true;
  	this.morningHuddleService.dentistProduction( this.clinic_id, this.previousDays, this.user_type,this.dentist_id  ).subscribe((production:any) => {
      this.dentistperformanceLoader = false;
  		if(production.status == true) {
        this.production = production.data;
  		}
  	});	
  }


  async getRecallRate(){
    this.dentistrecallRateLoader = true;    
  	this.morningHuddleService.recallRate( this.clinic_id, this.previousDays,  this.user_type, this.dentist_id  ).subscribe((recallRate:any) => {
      this.dentistrecallRateLoader = false;
  		if(recallRate.status == true){
        this.recallRate = recallRate.data;
  		}
  	});	
  }

  async getTreatmentRate(){
     this.dentistTreatmentRateLoader = true;    
    this.morningHuddleService.reappointRate( this.clinic_id, this.previousDays,  this.user_type, this.dentist_id  ).subscribe((treatmentRate:any) => {
      this.dentistTreatmentRateLoader = false;    
      if(treatmentRate.status == true){
         this.treatmentRate = treatmentRate.data;
      }
    }); 
  }


async getDentistList(){
  this.dentistListLoading = false;
  this.dentistList = new MatTableDataSource([]);
    this.morningHuddleService.dentistList( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((list:any) => {
      this.dentistListLoading = true;
      if(list.status == true){
        this.dentistList.data = list.data;
        this.dentistListTemp = list.data;
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
  toggleUpdate(event,pid,date,followup_date, cid,type,status='default') {    
      if( !status || status == '' || status == 'null')
      {
        event.source.checked = false;
        this.toastr.error('Please update status first to mark complete.');
        return false;
      }
      if(type == 'post-op-calls'){
          this.poLoadingLoading = true;
      } else if(type == 'recall-overdue'){
        this.recallLoadingLoading = true;
      } else if(type == 'tick-follower'){
        this.endTaksLoadingLoading = true;
      }
    this.morningHuddleService.updateFollowUpStatus(event.checked,pid,cid,type, date,followup_date).subscribe((update:any) => {
      if(type == 'post-op-calls'){
        this.getFollowupPostOpCalls();
      } else if(type == 'recall-overdue'){
        this.getOverdueRecalls();
      } else if(type == 'tick-follower'){
        this.getTickFollowups();
      } else if(type == 'fta-follower'){
        this.getFtaFollowups();
      }
    });      
  }


    updateStatus(event,pid,date,cid,firstname,surname,original_appt_date,followup_date,type,nextBussinessDay) {
     if( event == 'Wants another follow-up' || event == "Can't be reached" || event ==  "Can't be reached - left voicemail" )
      {
        let width = '450px';
       if(event == "Can't be reached" || event == "Can't be reached - left voicemail")
          width = '650px';     

      const dialogRef = this.dialog.open(StatusDialogMHComponent, {
        width: width,
        data: {event,firstname,surname,pid,cid,type,original_appt_date,followup_date,nextBussinessDay}
      });
      dialogRef.afterClosed().subscribe(result => {    
           if(type == 'tick-follower'){
          this.getTickFollowups('close');  
        } else if(type == 'fta-follower'){
          this.getFtaFollowups('close');  
        } else {
         this.getOverdueRecalls('close');
       }
      
      });
    } else {
      this.morningHuddleService.updateStatus(event,pid,cid,type, date,followup_date).subscribe((update:any) => {
        if(type == 'tick-follower'){
          this.getTickFollowups('close');  
        } else if(type == 'fta-follower'){
          this.getFtaFollowups('close');  
        } else {
         this.getOverdueRecalls('close');
       }
      }); 
    }    
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
    return selectedDate;
  }
  addDays(daysToAdd) {
    let todaysDate = new Date();
    let selectedDate = new Date();
    selectedDate.setDate(todaysDate.getDate() + daysToAdd)
    return selectedDate;
  }


  formatPhoneNumber(phone){
    if(phone){
      if(phone.startsWith('04')){
        phone = phone.replace(/ /g, '');
        var onePart = phone.substr(0, 4);
        var twoPart = phone.substr(4, 3);
        var threePart = phone.substr(7, 3);
        return onePart + ' '+ twoPart+ ' '+threePart;
      } else {
        return phone;
      }
    } else {
        return 'N/A';
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
      this.endOfDaysTasksInComp.data = this.endOfDaysTasks;
    } else {
      this.endOfDaysTasksInComp.data = this.endOfDaysTasks.filter(p => p.is_complete != 1);      
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
  updateToCompleteFT(event){
    this.showCompleteFta = event.checked;
    if(event.checked ==  true){  
      this.followupFtaFollowupsInCMP = this.followupFtaFollowups;
    } else {
      this.followupFtaFollowupsInCMP = this.followupFtaFollowups.filter(p => p.is_complete != true);      
    }
  }


  openNotes(notes,patient_id,original_appt_date,followup_date, type): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '500px',
      data: {notes:notes, patientId:patient_id, date:original_appt_date,clinic_id: this.clinic_id, old:notes,followup_date: followup_date,type: type}
    });
    dialogRef.afterClosed().subscribe(result => {    
      if( type == 'tick-follower'){
        this.getTickFollowups('close');
      } else if(type == 'recall-overdue') {
        this.getOverdueRecalls('close');
      } else if(type == 'fta-follower') {
        this.getFtaFollowups('close');
      }

    });
    
  }
/*
  showAMPm(event){
    this.showELPm = false;
    if(event.checked ==  true){  
      this.showELPm = true;
    } 
  }*/

  saveQuantity(time){
    var data = [];
    this.lquipmentListAm.forEach((value, id) => {
      if(time == 'am'){
        var temp = {'id': id,'value' : value.am,'type' : time }; 
      } else {
        var temp = {'id': id,'value' : value.pm,'type' : time }; 
      }
      data.push(temp);
    });

    if(data){
      var dataJson = JSON.stringify(data);
      this.equipmentListLoading = true;
      this.morningHuddleService.updateEquimentList(dataJson,this.clinic_id,this.previousDays).subscribe((update:any) => {
        this.getEndOfDays();
        this.getEquipmentList();
      });    
    }
  }

  listUpdate(type,id){  
    if(type == 'am' && (this.lquipmentListAm[id].am < 0 || this.lquipmentListAm[id].am == null ) ){
      this.lquipmentListAm[id].am = 0;
    } else if(type == 'pm' && this.lquipmentListAm[id].pm < 0 || this.lquipmentListAm[id].pm == null){
      this.lquipmentListAm[id].pm = 0;
    } 
  }

  public showUpDateArrow:boolean = true;
  public showDwDateArrow:boolean = true;
  setDate(type){
    let todaysDate = new Date(this.previousDays);
    let selectedDate = new Date(this.previousDays);
    if(type == 'add'){
      selectedDate.setDate(todaysDate.getDate() + 1);
    } else {
      selectedDate.setDate(todaysDate.getDate() - 1);
    }
    this.previousDays =  this.datepipe.transform(selectedDate, 'yyyy-MM-dd');
    this.refreshPerformanceTab();

    var diffTime:any = this.getDataDiffrences();
    this. showUpDateArrow = true;
    this. showDwDateArrow = true;
    if((parseInt(diffTime) <= -7 ) && type == 'add'){
      this. showUpDateArrow = false;
    }
    if(parseInt(diffTime) >= 7 && type == 'subtract'){
      this. showDwDateArrow = false;
    }    
  }

  getDataDiffrences(){ // Function to get days diffrence from selected date
    var currentdate:any = new Date();
    var day   = currentdate.getDate();
    var month = currentdate.getMonth(); //months from 1-12
    var year  = currentdate.getFullYear();
    var date2:any= new Date(year,month, day);
    var setDate:any= new Date(this.previousDays);
    var day1   = setDate.getDate();
    var month1 = setDate.getMonth(); //months from 1-12
    var year1  = setDate.getFullYear();
    var date1:any= new Date(year1,month1, day1);
    var diffTime:any =Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    
    return diffTime;
  }

  getChartsTips() {
    this.chartstipsService.getCharts(7).subscribe((data) => {
       if(data.message == 'success'){         
        this.charTips = data.data;
       }
    }, error => {});
  }

  formatHistory(history)
  {
     let html ='<table class="history">';
      let statusSpe= {'Did not want to book':'Didn’t want to book','Cant be reached': 'Can\'t be reached', 'Cant be reached - left':'Can\'t be reached - left voicemail'};
      history.forEach( (tip) => {
        let date = this.datepipe.transform(new Date(tip.followup_date), 'MMM dd, yyyy');
        if(typeof( statusSpe[tip.status]) != 'undefined'){
            html += '<tr><td width="28%">'+date+':</td><td> '+statusSpe[tip.status]+'</td></tr>';
        } else {
            html += '<tr><td width="28%">'+date+':</td><td> '+tip.status+'</td></tr>';
        }
        if(tip.notes && tip.notes !='null' && tip.notes !=''){
            html += '<tr><td  class="notes" width="28%">Notes:</td><td> '+tip.notes+'</td></tr>';
        }
      });
      html +='</table>';
      return { title: 'Previous Followups', info : html };
  }

  historyPos(event)
  {
    let x=event.clientX;
    let y= parseFloat(event.clientY);
    setTimeout( function(){
      let divLnt = $('.custom-tooltip').height() +40;
      let divwd = $('.custom-tooltip').width() - 10;
      $('.custom-tooltip').css({'top': ( y - divLnt), 'left' : (x - divwd ) } );
    },100);
  }


  refreshDataAuto()
  {
    if(this.currentDentist == 0){
        this.currentDentist = null;
    }
    this.getScheduleNewPatients(this.currentDentist);
    this.getScheduleHours(this.currentDentist);
    this.getUnscheduleHours(this.currentDentist);
    this.getAppointmentCards(this.currentDentist);
  }

}




