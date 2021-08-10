import { Component, HostListener, OnDestroy, OnInit,ViewChild,ViewEncapsulation,Inject } from '@angular/core';
import { FollowupsService } from './followups.service';
import { ClinicianAnalysisService } from '../dashboards/cliniciananalysis/cliniciananalysis.service';
import { CookieService } from "ngx-cookie";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { HeaderService } from '../layouts/full/header/header.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ITooltipData } from '../shared/tooltip/tooltip.directive';
import { AppConstants } from '../app.constants';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog } from '@angular/material/dialog';
import { NgxDaterangepickerMd, DaterangepickerComponent } from 'ngx-daterangepicker-material';
import { ChartstipsService } from '../shared/chartstips.service';

@Component({
  selector: 'notes-add-dialog',
  templateUrl: './add-notes.html',
  encapsulation: ViewEncapsulation.None
})

export class FollowupsDialogComponent { 

  constructor(public dialogRef: MatDialogRef<FollowupsDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _cookieService: CookieService, private router: Router,private followupsService: FollowupsService ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data){  
    if( data.notes == '' || data.old == data.notes){
      return false;
    }

    this.followupsService.notes(data.notes,data.patientId, data.date,data.clinic_id,data.followup_date,data.type).subscribe((res) => {
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

export class StatusDialogComponent { 
  public nextDate:any = '';
  public nextCustomFollowup:boolean = false;
  public nextFollowupHave:boolean = false;
  @ViewChild(DaterangepickerComponent, { static: false }) datePicker: DaterangepickerComponent;
  constructor(public dialogRef: MatDialogRef<StatusDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _cookieService: CookieService, private router: Router,private followupsService: FollowupsService) {}
  onNoClick(): void {
    this.nextCustomFollowup = false;
    this.dialogRef.close();
  }
  save(data) {  
    if( data.notes == '' || data.old == data.notes) {
      return false;
    }
    this.followupsService.notes(data.notes,data.patientId, data.date,data.clinic_id, data.followup_date, data.type).subscribe((res) => {
      if (res.message == 'success') {
        this.dialogRef.close();
      } else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }
  updateNext(event){
    this.nextDate = event.chosenLabel;
  }

  showCalender(event){
    this.nextCustomFollowup = true;
     this.nextFollowupHave = false;
  }
  updateNextfollowUp(data) {
     this.followupsService.updateStatus('Wants another follow-up',data.pid,data.cid,data.type,data.original_appt_date, data.followup_date).subscribe((update:any) => {
      this.onNoClick();
      if(update.status){
        this.followupsService.cloneRecord(data.pid,data.cid,data.type,data.followup_date,this.nextDate,data.original_appt_date).subscribe((update:any) => {
        }); 
      }        
     }); 
  }
  updateNextReached(data, event) {
     this.nextCustomFollowup = false;
     this.nextFollowupHave = false;
     this.followupsService.updateStatus(data.event,data.pid,data.cid,data.type,data.original_appt_date, data.followup_date).subscribe((update:any) => {
      if(update.status && event != 'no')
      {
        this.followupsService.cloneRecord(data.pid,data.cid,data.type,data.followup_date,this.nextDate,data.original_appt_date,event).subscribe((clone:any) => {
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
  templateUrl: './followups.component.html',
  styleUrls: ['./followups.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FollowupsComponent implements OnInit,OnDestroy {
    selectedTab = 0;
	  public id:any = '';
  	public clinic_id:any = '';
  	public user_type:any = '';
    public dentistid:any = null;
    public production:any = '';
    public recallRate:any = '';
    public treatmentRate:any = '';
    public previousDays:any = '';

    public postOpCallsDays:any = '';
    public followupsPostopCallsDate:any = '';

    public dentistList = new MatTableDataSource([]);
    dentistListTemp:any = [];
    
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
    public ftaFollowupsInComp:any = [];

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
    public selectedMonthYear:any ='';
    public showDwDateArrow:boolean = true;
    public showUpDateArrow:boolean = true;
    
    public charTips:any = [];

    public selectedMonth:string = new Date().getMonth().toString();
    public selectedYear:string = new Date().getFullYear().toString();


    public pageSize:number = 20;
    
    public orTablePages: number[] = [];
    public currentORPage:number = 1;
    public thikTablePages: number[] = [];
    public currentThickPage:number = 1;
    public opTablePages: number[] = [];
    public currentOpPage:number = 1;
    public nextBussinessDay:any; 
    public isEnablePO: boolean = false;
    public isEnableOR: boolean = false;
    public isEnableTH: boolean = false;
    public isEnableFT: boolean = false;

  displayedColumns1: string[] = ['name', 'phone','code','date','followup_date','status'];
  displayedColumns2: string[] = ['name', 'phone', 'code','note','followup_date','book','status'];
  displayedColumns3: string[] = ['name', 'phone', 'code','note','followup_date','book','status']; 
  timezone: string = '+1000';
  months:any = ['January','February','March','April','May','June','July','August','September','October','November','December'];
 @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private datepipe: DatePipe, 
    private followupsService: FollowupsService, 
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
    $('#currentDentist').attr('did','all');
    this.user_type = this._cookieService.get("user_type");
    if(this._cookieService.get("dentistid") && this._cookieService.get("dentistid") != '' && this.user_type == '4'){
        this.dentistid = this._cookieService.get("dentistid");
    }
    

    // align material tab green shaded color to first tab (on initial load - needs delay to ensure mat tab is available)
    setTimeout(() => {
      this.matTabGroup.realignInkBar();
    }, 500);    
    this.selectedMonthYear = this.datepipe.transform(new Date(), 'MMMM yyyy');    
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
  var val = $('#currentClinic').attr('cid');
  if(val != undefined && val !='all') {
    this.clinic_id = val;

    this.clinicianAnalysisService.getClinics( this.clinic_id, 'PostOpEnable,RecallEnable,TickEnable,FtaEnable' ).subscribe((data:any) => {
      if(data.message == 'success'){
        this.isEnablePO = (data.data.post_op_enable == 1)? true : false;
        this.isEnableOR = (data.data.recall_enable == 1)? true : false;
        this.isEnableTH = (data.data.tick_enable == 1)? true : false;
        this.isEnableFT = (data.data.fta_enable == 1)? true : false;
      }
    }); 
    $('#title').html('Follow Ups');  
    
    this.selectedMonth = this.datepipe.transform(this.selectedMonthYear, 'M');
    this.selectedYear = this.datepipe.transform(this.selectedMonthYear, 'yyyy');

    this.getFollowupPostOpCalls();
    this.getOverdueRecalls();
    this.getTickFollowups();  
    this.getFtaFollowups();  
    
    }
  }
  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }
  onTabChanged(event){
  
  }

  refreshPerformanceTab(){
    this.selectedMonth = this.datepipe.transform(this.selectedMonthYear, 'M');
    this.selectedYear = this.datepipe.transform(this.selectedMonthYear, 'yyyy');
    this.getFollowupPostOpCalls();
    this.getOverdueRecalls();
    this.getTickFollowups();
    this.getFtaFollowups();    
  }


  getFollowupPostOpCalls(){
    this.poLoadingLoading = true;
    this.followupsService.followupPostOpCalls( this.clinic_id, this.selectedMonth, this.selectedYear ).subscribe((production:any) => {
        this.poLoadingLoading = false;
      if(production.message == 'success') {
        this.nextBussinessDay = production.next_day;
        if(production.data == '204'){

        } else {
            this.followupPostOpCalls = production.data;   
            if(this.postopCallsPostOp == true){  
                this.followupPostOpCallsInComp = this.followupPostOpCalls;
              } else {            
                this.followupPostOpCallsInComp = this.followupPostOpCalls.filter(p => p.is_complete != true);      
              }
             if(this.followupPostOpCallsInComp.length <= ((this.pageSize * this.currentOpPage) - this.pageSize) && this.currentOpPage != 1 ){
              this.currentOpPage = this.currentOpPage -1;
            }       
            this.setPaginationButtons(this.followupPostOpCallsInComp,'OP');
            this.followupPostOpCallsInComp = this.setPaginationData(this.followupPostOpCallsInComp,'OP');
           
            this.followupsPostopCallsDate = production.date;     
            this.postOpCallsDays = production.previous;
        }            
      }
    }); 
  } 

  getOverdueRecalls(evn = ''){
    if(evn != 'close'){
      this.recallLoadingLoading = true;
    }
    this.followupsService.followupOverdueRecalls( this.clinic_id, this.selectedMonth, this.selectedYear ).subscribe((production:any) => {
        this.recallLoadingLoading = false;
      if(production.message == 'success') {
        this.nextBussinessDay = production.next_day;
        this.followupsOverDueRecallDate = production.date;     
         if(production.data == '204'){

        } else {
          this.followupOverDueRecall = production.data;             
          if(this.showCompleteOverdue == true){  
              this.followupOverDueRecallInCMP = this.followupOverDueRecall;
            } else {            
              this.followupOverDueRecallInCMP = this.followupOverDueRecall.filter(p => p.is_complete != true);      
            }
          if(this.followupOverDueRecallInCMP.length <= ((this.pageSize * this.currentORPage) - this.pageSize) && this.currentORPage != 1 ){
            this.currentORPage = this.currentORPage -1;
          } 
          this.setPaginationButtons(this.followupOverDueRecallInCMP,'OR');
          this.followupOverDueRecallInCMP = this.setPaginationData(this.followupOverDueRecallInCMP,'OR');
         this.OverDueRecallDays = production.previous;   
       }  
      }
    }); 
  } 

  public tipDoneCode = {}; 
  public tipFutureDate = {};
  getTickFollowups(evn = ''){
    if(evn != 'close'){
     this.endTaksLoadingLoading = true;
    }
    this.followupsService.followupTickFollowups( this.clinic_id, this.selectedMonth, this.selectedYear).subscribe((production:any) => {
        this.endTaksLoadingLoading = false;
      if(production.message == 'success') {
        this.nextBussinessDay = production.next_day;
        console.log('Next Working Day: ', this.nextBussinessDay);
        if(production.data == '204'){

        } else {
          this.followupTickFollowups = production.data;     
          if(this.showCompleteTick ==  true){  
            this.followupTickFollowupsInCMP = this.followupTickFollowups;
          } else {
            this.followupTickFollowupsInCMP = this.followupTickFollowups.filter(p => p.is_complete != true);      
          }
            if(this.followupTickFollowupsInCMP.length <= ((this.pageSize * this.currentThickPage) - this.pageSize) && this.currentThickPage != 1 ){
            this.currentThickPage = this.currentThickPage -1;
          } 
          this.setPaginationButtons(this.followupTickFollowupsInCMP,'TH');
          this.followupTickFollowupsInCMP = this.setPaginationData(this.followupTickFollowupsInCMP,'TH');
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
           
          this.followupsTickFollowupsDate = production.date;     
          this.TickFollowupsDays = production.previous;  
        }   
      }
    }); 
  } 


  public followupFtaFollowups:any = [];
  public followupFtaFollowupsInCMP:any = [];
  public ftaTaksLoadingLoading:boolean = false;
  public showCompleteFta:boolean = false;
  public tipFtaDoneCode:any = {};
  public tipFtaFutureDate:any={};
  public ftTablePages:any = [];
  public currentFTPage:number = 1;
  getFtaFollowups(evn = ''){
    if(evn != 'close'){
     this.ftaTaksLoadingLoading = true;
    }
    this.followupsService.followupFtaFollowups( this.clinic_id, this.selectedMonth, this.selectedYear).subscribe((production:any) => {
        this.ftaTaksLoadingLoading = false;
      if(production.message == 'success') {
        this.nextBussinessDay = production.next_day;  
        if(production.data == '204'){

        } else {      
          this.followupFtaFollowups = production.data;     
          if(this.showCompleteFta ==  true){  
            this.followupFtaFollowupsInCMP = this.followupFtaFollowups;
          } else {
            this.followupFtaFollowupsInCMP = this.followupFtaFollowups.filter(p => p.is_complete != true);      
          }
            if(this.followupFtaFollowupsInCMP.length <= ((this.pageSize * this.currentFTPage) - this.pageSize) && this.currentFTPage != 1 ){
            this.currentFTPage = this.currentFTPage -1;
          } 
          this.setPaginationButtons(this.followupFtaFollowupsInCMP,'FT');
          this.followupFtaFollowupsInCMP = this.setPaginationData(this.followupFtaFollowupsInCMP,'FT');
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


  
  
  //toggleUpdate($event,element.patient_id,element.original_appt_date,element.patients.clinic_id,'Post op Calls')
  toggleUpdate(event,pid,date,fdate,cid,type, status= 'default') {    
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
    this.followupsService.updateFollowUpStatus(event.checked,pid,cid,type, date,fdate).subscribe((update:any) => { 
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
      const dialogRef = this.dialog.open(StatusDialogComponent, {
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
      this.followupsService.updateStatus(event,pid,cid,type, date,followup_date).subscribe((update:any) => {
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




  updateToComplete(event){
    this.showComplete = event.checked;
    if(event.checked ==  true){  
      this.endOfDaysTasksInComp = this.endOfDaysTasks;
    } else {
      this.endOfDaysTasksInComp = this.endOfDaysTasks.filter(p => p.is_complete != 1);      
    }
  }

  updateToCompleteOP(event){
    this.postopCallsPostOp = event.checked;
    if(event.checked ==  true){  
      this.followupPostOpCallsInComp = this.followupPostOpCalls;
    } else {      
      this.followupPostOpCallsInComp = this.followupPostOpCalls.filter(p => p.is_complete != true);      
    }
    this.currentOpPage = 1;
    this.setPaginationButtons(this.followupPostOpCallsInComp,'OP');
    this.followupPostOpCallsInComp = this.setPaginationData(this.followupPostOpCallsInComp,'OP');
  }
  updateToCompleteOR(event){
    this.showCompleteOverdue = event.checked;
    if(event.checked ==  true){  
      this.followupOverDueRecallInCMP = this.followupOverDueRecall;
    } else {
      this.followupOverDueRecallInCMP = this.followupOverDueRecall.filter(p => p.is_complete != true);      
    }
    this.currentORPage = 1;
    this.setPaginationButtons(this.followupOverDueRecallInCMP,'OR');
    this.followupOverDueRecallInCMP = this.setPaginationData(this.followupOverDueRecallInCMP,'OR');
  }
  updateToCompleteTF(event){
    this.showCompleteTick = event.checked;
    if(event.checked ==  true){  
      this.followupTickFollowupsInCMP = this.followupTickFollowups;
    } else {
      this.followupTickFollowupsInCMP = this.followupTickFollowups.filter(p => p.is_complete != true);      
    }
    this.currentThickPage = 1;
    this.setPaginationButtons(this.followupTickFollowupsInCMP,'TH');
    this.followupTickFollowupsInCMP = this.setPaginationData(this.followupTickFollowupsInCMP,'TH');
  }

  updateToCompleteFT(event){
    this.showCompleteFta = event.checked;
    if(event.checked ==  true){  
      this.followupFtaFollowupsInCMP = this.followupFtaFollowups;
    } else {
      this.followupFtaFollowupsInCMP = this.followupFtaFollowups.filter(p => p.is_complete != true);      
    }
    this.currentFTPage = 1;
    this.setPaginationButtons(this.followupFtaFollowupsInCMP,'FT');
    this.followupFtaFollowupsInCMP = this.setPaginationData(this.followupFtaFollowupsInCMP,'FT');
  }


  openNotes(notes,patient_id,original_appt_date,followup_date,type): void {
    const dialogRef = this.dialog.open(FollowupsDialogComponent, {
      width: '500px',
      data: {notes:notes, patientId:patient_id, date:original_appt_date,clinic_id: this.clinic_id, old:notes, followup_date:followup_date,type:type}
    });
    dialogRef.afterClosed().subscribe(result => {    
      if(type == 'tick-follower'){
        this.getTickFollowups('close');
      } else {
        this.getFtaFollowups('close');        
      }      
    });    
  }

  subtractYears(yearsToSubtract) {
    let todaysDate = new Date();
    let selectedDate = new Date();
    selectedDate.setFullYear(todaysDate.getFullYear()-yearsToSubtract)
    return selectedDate;
  }

  showPreviousYears(yearsToSubtract) {
    let todaysDate = new Date();
    var dd:any = todaysDate.getFullYear() - yearsToSubtract;
    if(parseInt(dd) >= 2021){
      return true;
    } else {
      return false;
    }   
  }

  setPaginationButtons(totalData,type) {
    if(type == 'OR'){
        this.orTablePages = [];
        const totalPages = Math.ceil(totalData.length / this.pageSize);
        if(totalPages > 1){
          for (let i = 0; i < totalPages; i++) {
            this.orTablePages.push(i + 1);
          }
        }
        
    }
    if(type == 'TH'){      
        this.thikTablePages = [];
        const totalPages = Math.ceil(totalData.length / this.pageSize);
        if(totalPages > 1){
          for (let i = 0; i < totalPages; i++) {
            this.thikTablePages.push(i + 1);
          }
        }
    }  
    if(type == 'OP'){
        this.opTablePages = [];
        const totalPages = Math.ceil(totalData.length / this.pageSize);
        if(totalPages > 1){
          for (let i = 0; i < totalPages; i++) {
            this.opTablePages.push(i + 1);
          }
        }
    } 
    if(type == 'FT'){
        this.ftTablePages = [];
        const totalPages = Math.ceil(totalData.length / this.pageSize);
        if(totalPages > 1){
          for (let i = 0; i < totalPages; i++) {
            this.ftTablePages.push(i + 1);
          }
        }
    }    
  }

  setPaginationData(totalData, type) {
    if(type == 'OR'){
        var startIndex:number = (this.currentORPage *  this.pageSize) - this.pageSize;      
    } 
    if(type == 'TH'){
        var startIndex:number = (this.currentThickPage *  this.pageSize)- this.pageSize;      
    }
    if(type == 'OP'){
        var startIndex:number = (this.currentOpPage *  this.pageSize) - this.pageSize;      
    }
    if(type == 'FT'){
        var startIndex:number = (this.currentFTPage *  this.pageSize) - this.pageSize;      
    }    
    var endIndex:any = startIndex + this.pageSize;
    var temp:any =[];
    totalData.forEach((data,key) => {
        if(parseInt(key) >= startIndex && parseInt(key) < endIndex ){
            temp.push(data);
        }
    });
    return  temp;
  }



  handlePageChange(goPage: number, type) {
    if(type == 'OR'){
      this.currentORPage = goPage;
      if(this.showCompleteOverdue == true){  
        this.followupOverDueRecallInCMP = this.followupOverDueRecall;
      } else {            
        this.followupOverDueRecallInCMP = this.followupOverDueRecall.filter(p => p.is_complete != true);      
      }
      this.followupOverDueRecallInCMP = this.setPaginationData(this.followupOverDueRecallInCMP, type);
    }
    if(type == 'TH'){
      this.currentThickPage = goPage;
      if(this.showCompleteTick ==  true){  
          this.followupTickFollowupsInCMP = this.followupTickFollowups;
        } else {
          this.followupTickFollowupsInCMP = this.followupTickFollowups.filter(p => p.is_complete != true);      
        }
        this.followupTickFollowupsInCMP = this.setPaginationData(this.followupTickFollowupsInCMP,'TH');
    }
    if(type == 'OP'){
      this.currentOpPage = goPage;
      if(this.postopCallsPostOp == true){  
          this.followupPostOpCallsInComp = this.followupPostOpCalls;
        } else {            
          this.followupPostOpCallsInComp = this.followupPostOpCalls.filter(p => p.is_complete != true);      
        }             
      this.followupPostOpCallsInComp = this.setPaginationData(this.followupPostOpCallsInComp,'OP');
    }
    if(type == 'FT'){
      this.currentFTPage = goPage;
      if(this.showCompleteFta == true){  
          this.followupFtaFollowupsInCMP = this.followupFtaFollowups;
        } else {            
          this.followupFtaFollowupsInCMP = this.followupFtaFollowups.filter(p => p.is_complete != true);      
        }             
      this.followupFtaFollowupsInCMP = this.setPaginationData(this.followupFtaFollowupsInCMP,'FT');
    }
    
  }

    setDate(type){
      let todaysDate = new Date('01'+this.selectedMonthYear);
      let selectedDate = new Date('01'+this.selectedMonthYear);
      if(type == 'add'){
        selectedDate.setMonth(todaysDate.getMonth() + 1);
      } else {
        selectedDate.setMonth(todaysDate.getMonth() - 1);
      }
      this.selectedMonthYear =  this.datepipe.transform(selectedDate, 'MMMM yyyy');
      this.refreshPerformanceTab();        
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
      let html ='<table>';
      let statusSpe= {'Did not want to book':'Didn’t want to book','Cant be reached': 'Can\'t be reached', 'Cant be reached - left':'Can\'t be reached - left voicemail'};
      history.forEach( (tip) => {
        let date = this.datepipe.transform(new Date(tip.followup_date), 'MMM dd, yyyy');
        if(typeof( statusSpe[tip.status]) != 'undefined'){
            html += '<tr><td width="35%">'+date+':</td><td> '+statusSpe[tip.status]+'</td></tr>'
        } else {
            html += '<tr><td width="35%">'+date+':</td><td> '+tip.status+'</td></tr>'
        }
      });
      html +='</table>';
      return { title: 'Previous Followups', info : html };
  }

  historyPos(event)
  {
    let x=event.clientX;
    let y= parseInt(event.clientY);
    setTimeout( function(){
      let divLnt = $('.custom-tooltip').height() +40;
      let divwd = $('.custom-tooltip').width() - 5;
      $('.custom-tooltip').css({'top': ( y - divLnt), 'left' : (x - divwd ) } );
    },100);
  }
}