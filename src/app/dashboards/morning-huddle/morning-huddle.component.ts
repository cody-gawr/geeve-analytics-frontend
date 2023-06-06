import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
  ViewChildren,
  QueryList
} from '@angular/core';
import { MorningHuddleService } from './morning-huddle.service';
import { ClinicianAnalysisService } from '../cliniciananalysis/cliniciananalysis.service';
import { CookieService } from 'ngx-cookie';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTabGroup } from '@angular/material/tabs';
import { AppConstants } from '../../app.constants';
import { DaterangepickerComponent } from 'ngx-daterangepicker-material';
import { ChartstipsService } from '../../shared/chartstips.service';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
// import { forkJoin } from 'rxjs';

export interface PeriodicElement {
  name: string;
  production: string;
  recall: string;
  treatment: string;
  patientname: string;
  dentist: string;
  start: string;
  outstanding: string;
  phone: string;
  xrays: string;
  noshows: string;
  newpatient: string;
  card: string;
  status: number;
}

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog
} from '@angular/material/dialog';
import { loadStripe } from '@stripe/stripe-js';
import { StripePaymentDialog } from '../../shared/stripe-payment-modal/stripe-payment-modal.component';
import { SendReviewDialog } from './send-review-dialog/send-review-dialog.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as _ from 'lodash';
import { LocalStorageService } from '../../shared/local-storage.service';
import { TermsConditionsDialog } from './terms-conditions-dialog/terms-conditions-dialog.component';
@Component({
  selector: 'notes-add-dialog',
  templateUrl: './add-notes.html',
  encapsulation: ViewEncapsulation.None
})
export class DialogOverviewExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService,
    private router: Router,
    private morningHuddleService: MorningHuddleService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data) {
    if (data.notes == '' || data.old == data.notes) {
      return false;
    }

    this.morningHuddleService
      .notes(
        data.notes,
        data.patientId,
        data.date,
        data.clinic_id,
        data.followup_date,
        data.type
      )
      .subscribe({
          next: (res) => {
            if (res.status == 200) {
              this.dialogRef.close();
            } else if (res.status == 401) {
              this.handleUnAuthorization();
            }
          },
          error: (error) => {
            this.handleUnAuthorization();
          }
      });
  }

  handleUnAuthorization() {
    this._cookieService.put('username', '');
    this._cookieService.put('email', '');
    this._cookieService.put('userid', '');
    this.router.navigateByUrl('/login');
  }
}

@Component({
  selector: 'status-dialog',
  templateUrl: './status.html',
  encapsulation: ViewEncapsulation.None
})
export class StatusDialogMHComponent {
  public nextDate: any = '';
  public nextCustomFollowup: boolean = false;
  public nextFollowupHave: boolean = false;
  @ViewChild(DaterangepickerComponent, { static: false })
  datePicker: DaterangepickerComponent;
  constructor(
    public dialogRef: MatDialogRef<StatusDialogMHComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService,
    private router: Router,
    private morningHuddle: MorningHuddleService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  updateNextfollowUp(data) {
    this.morningHuddle
      .updateStatus(
        'Wants another follow-up',
        data.pid,
        data.cid,
        data.type,
        data.original_appt_date,
        data.followup_date
      )
      .subscribe((update: any) => {
        this.onNoClick();
        if (update.status) {
          this.morningHuddle
            .cloneRecord(
              data.pid,
              data.cid,
              data.type,
              data.followup_date,
              this.nextDate,
              data.original_appt_date
            )
            .subscribe((update) => {
              if(update.message === 'already'){
                
              }
            });
        }
      });
  }

  updateNext(event) {
    this.nextDate = event.chosenLabel;
  }
  showCalender(event) {
    this.nextCustomFollowup = true;
    this.nextFollowupHave = false;
  }

  updateNextReached(data, event) {
    this.nextCustomFollowup = false;
    this.nextFollowupHave = false;
    this.morningHuddle
      .updateStatus(
        data.event,
        data.pid,
        data.cid,
        data.type,
        data.original_appt_date,
        data.followup_date
      )
      .subscribe((update: any) => {
        if (update.status && event != 'no') {
          this.morningHuddle
            .cloneRecord(
              data.pid,
              data.cid,
              data.type,
              data.followup_date,
              this.nextDate,
              data.original_appt_date,
              event
            )
            .subscribe((clone) => {
              if (clone.message === 'already') {
                this.nextDate = clone.$getRecord.followup_date;
                this.nextFollowupHave = true;
              } else {
                this.onNoClick();
              }
            });
        } else {
          this.onNoClick();
        }
      });
  }

  handleUnAuthorization() {
    this._cookieService.put('username', '');
    this._cookieService.put('email', '');
    this._cookieService.put('userid', '');
    this.router.navigateByUrl('/login');
  }
}

@Component({
  selector: 'app-morning-huddle',
  templateUrl: './morning-huddle.component.html',
  styleUrls: ['./morning-huddle.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MorningHuddleComponent implements OnInit, OnDestroy {
  selectedTab = 0;
  morningHuddleTabs = [
    'Dentist Performance',
    'Dentist Schedule',
    'Front Desk Reminders',
    'Front Desk Followups',
    'Daily Tasks'
  ];
  public homeUrl = environment.homeUrl;
  //public apiUrl = environment.apiUrl;
  public id: any = '';
  public clinic_id: any = '';
  public user_type: any = '';
  public dentistid: any = null;
  public production: any = '';
  public recallRate: any = '';
  public treatmentRate: any = '';
  public previousDays: any = '';

  public unscheduledPatientsDays: any = '';
  public postOpCallsDays: any = '';
  public followupsPostopCallsDate: any = '';
  public schedulePatientDate: any = '';
  public productionDate: any = '';
  public scheduleNewPatient: any = 0;
  public schedulehours: any = 0;
  public unSchedulehours: any = 0;
  public noShow: any = 0;
  public appointmentCardsTemp: any = [];
  public appointmentCards = new MatTableDataSource();
  public appointmentCardsLoading: boolean = true;
  public dentistList: any = new MatTableDataSource([]);
  public dentistListTemp: any = [];

  public futureDateOP: any = '';
  public futureDateOR: any = '';
  public futureDateTH: any = '';
  public futureDateTF: any = '';
  public futureDateDT: any = '';
  public futureDateEL: any = '';

  public reAppointment: any = 0;
  public reAppointmentdate: any = '';
  public unscheduledPatients: any = 0;
  //public unscheduledValue:any = 0;
  public todayPatients: any = 0;
  public todayPatientsDate: any = '';
  public todayUnscheduledHours: any = 0;
  public todayChairUtilisationRate: any = 0;
  public todayUnscheduledBal: any = 0;
  public todayPostopCalls: any = 0;

  public remindersRecallsOverdue: any = [];
  public remindersRecallsOverdueDate: any = '';
  public treatmentOutstanding: any = [];
  public outstandingBalances: any = [];
  public followupsUnscheduledPatients: any = [];
  public followupsUnscheduledRecalls: any = [];
  public followupsUnscheduledPatientsDate: any = '';
  public followupPostOpCalls: any = [];
  public followupPostOpCallsInComp: any = [];
  public followupOverDueRecall: any = [];
  public followupOverDueRecallInCMP: any = [];
  public followupsOverDueRecallDate: any = '';
  public followupsTickFollowupsDate: any = '';
  public TickFollowupsDays: any = '';
  public OverDueRecallDays: any = '';
  public followupTickFollowups: any = [];
  public followupTickFollowupsInCMP: any = [];
  public endOfDaysTasks: any = [];
  public endOfDaysTasksInComp = new MatTableDataSource([]);
  public endOfDaysTasksComp: any = [];
  public endOfDaysTasksDate: any = '';
  public endTaksLoading: boolean = true;
  public showComplete: boolean = false;
  public clinicDentists: any = [];
  public currentDentist: any = 0;
  public currentDentistSchedule: any = 0;

  public dentistListLoading: boolean = false;
  public postopCallsPostOp: boolean = false;
  public showCompleteOverdue: boolean = false;
  public showCompleteTick: boolean = false;
  public endTaksLoadingLoading: boolean = true;
  public poLoadingLoading: boolean = true;
  public recallLoadingLoading: boolean = true;

  public dentistperformanceLoader: boolean = true;
  public dentistrecallRateLoader: boolean = true;
  public dentistTreatmentRateLoader: boolean = true;
  public appointmentCardsLoaders: boolean = true;
  public scheduleNewPatientsLoader: boolean = true;
  public schedulehoursLoader: boolean = true;
  public unschedulehoursLoader: boolean = true;
  public remindersRecallsOverdueLoader: boolean = true;
  public todayUnscheduledHoursLoader: boolean = true;
  public todayUnscheduledBalLoader: boolean = true;
  public lquipmentList = new MatTableDataSource([]);
  public lquipmentListAm: any = [];
  public showELPm: boolean = false;
  public equipmentListLoading: boolean = true;
  public amButton: boolean = true;
  public pmButton: boolean = true;
  public dailyTabSettLod: boolean = false;
  public charTips: any = [];
  public dentist_id: any = '';
  public nextBussinessDay: any;
  public userPlan: any = '';
  public apiSuccessCount: any = 0;

  public isEnablePO: boolean = false;
  public isEnableOR: boolean = false;
  public isEnableTH: boolean = false;
  public isEnableFT: boolean = false;
  public isEnableUT: boolean = false;
  public autoCall: any;
  public showStatusCode: boolean = false;
  public showXrayOverdue: boolean = false;
  public OPGOverdue: boolean = false;
  public OverdueRecalls: boolean = false;
  public LabNeeded: boolean = false;
  public selectDentist = 0;

  public get isExactOrCore(): boolean {
    return this.localStorageService.isEachClinicPmsExactOrCore(this.clinic_id);
  }

  public get isExact(): boolean {
    return this.localStorageService.isEachClinicExact(this.clinic_id)
  }

  displayedColumns: string[] = ['name', 'production', 'recall', 'treatment'];
  displayedColumns1: string[] = ['start', 'name', 'dentist'];
  displayedColumns2: string[] = ['start', 'name', 'code'];
  displayedColumns3: string[] = ['start', 'name', 'outstanding'];
  displayedColumns4: string[] = ['name', 'phone', 'code', 'status'];
  displayedColumns5: string[] = [
    'name',
    'phone',
    'code',
    'dentist',
    'date',
    'status'
  ];
  displayedColumns6: string[] = ['start', 'dentist', 'name', 'card'];
  displayedColumns7: string[] = [
    'name',
    'phone',
    'code',
    'provider',
    'note',
    'book',
    'status'
  ];
  displayedColumns8: string[] = [
    'name',
    'phone',
    'code',
    'dentist',
    'note',
    'book',
    'status'
  ];
  displayedColumns9: string[] = ['name', 'completed_by', 'status'];
  displayedColumns10: string[] = ['equip_item', 'quantity', 'am', 'pm'];
  //displayedColumns11: string[] = ['start', 'dentist', 'name', 'statuscode', 'card', 'rebooked'];
  get displayedColumns11() {
    if (this.isSMSEnabled) {
      return [
        'start',
        'dentist',
        'name',
        'statuscode',
        'card',
        'sendReview',
        'rebooked'
      ];
    } else {
      return ['start', 'dentist', 'name', 'statuscode', 'card', 'rebooked'];
    }
  }
  displayedColumns12: string[] = [
    'start',
    'dentist',
    'name',
    'statuscode',
    'card',
    'rebooked'
  ];
  public postOPCallChips: any = [
    { name: 'Test 1', color: 'red', text: 'Test One' },
    { name: 'Test 2', color: 'green', text: 'Test Two' },
    { name: 'Test 3', color: 'blue', text: 'Test Three' }
  ];
  selected: any;
  // minDate: any;
  // maxDate: any;

  timezone: string = '+1000';
  remainCredits = 0;
  costPerSMS = 0.0;
  isSMSEnabled = false;
  isAcceptedSMSTerms = false;
  // @ViewChild('sort1') sort1: MatSort;
  sortList: QueryList<MatSort>;
  creditStatusTimer = null;
  @ViewChildren('sort1') set matSort(ms: QueryList<MatSort>) {
    this.sortList = ms;
    this.endOfDaysTasksInComp.sort = this.sortList.toArray()[0];
  }
  @ViewChild('sort2') sort2: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private datepipe: DatePipe,
    private localStorageService: LocalStorageService,
    private morningHuddleService: MorningHuddleService,
    private _cookieService: CookieService,
    //private headerService: HeaderService,
    private router: Router,
    private toastr: ToastrService,
    public constants: AppConstants,
    public dialog: MatDialog,
    public chartstipsService: ChartstipsService,
    public clinicianAnalysisService: ClinicianAnalysisService
  ) {
    // this.getChartsTips();
    this.selected = { start: moment() };
    // this.minDate = moment().subtract(7, 'days');
    // this.maxDate = moment().add(7, 'days');

    const q = new URL(window.location as any);
    q.searchParams.delete('payment_intent');
    q.searchParams.delete('payment_intent_client_secret');
    q.searchParams.delete('redirect_status');
    window.history.pushState({}, '', q);
  }

  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.matTabGroup.realignInkBar(); // align material tab green shaded color to first tab (on screen resize)
  }

  ngOnInit() {
    //console.log(this.homeUrl + "assets/js/jquery.min.js");
    /*this.dataSource1.sort = this.sort1;
    this.dataSource2.sort = this.sort2;*/
    const q = new URLSearchParams(window.location.search);
    const tabIndex = parseInt(q.get('tab') ?? '0');
    this.changeTab(tabIndex);
    const clientSecret = q.get('payment_intent_client_secret');
    if (clientSecret) this.checkPaymentStatus(clientSecret);
    $('#currentDentist').attr('did', 'all');
    this.user_type = this._cookieService.get('user_type');
    this.userPlan = this._cookieService.get('user_plan');
    if (
      this._cookieService.get('dentistid') &&
      this._cookieService.get('dentistid') != '' &&
      this.user_type == '4'
    ) {
      this.dentistid = this._cookieService.get('dentistid');
    }

    // align material tab green shaded color to first tab (on initial load - needs delay to ensure mat tab is available)
    setTimeout(() => {
      this.matTabGroup.realignInkBar();
    }, 500);

    var self = this;
    this.autoCall = setInterval(function () {
      self.refreshDataAuto();
    }, 1000 * 300);

  }

  updateCreditStatus() {
    const remindersData = this.remindersRecallsOverdue.map((r) => {
      return {
        appoint_id: r.appoint_id,
        phone_number: r.mobile,
        patient_id: r.patient_id
      };
    });
    this.morningHuddleService
      .getCreditStatus(
        this.clinic_id,
        remindersData,
        this.previousDays.split('T')[0]
      )
      .subscribe((res) => {
        if (res.status) {
          this.remainCredits = res.data.remain_credits;
          this.costPerSMS = res.data.cost_per_sms;
          const statusList = res.data.sms_status_list;
          this.remindersRecallsOverdue = _.merge(
            this.remindersRecallsOverdue,
            statusList
          );
          this.remindersRecallsOverdueTemp = _.merge(
            this.remindersRecallsOverdueTemp,
            statusList
          );
        }
      });
  }

  ngAfterViewInit(): void {
    // this.endOfDaysTasksInComp.sort = this.sort1;
    // this.lquipmentList.sort = this.sort2;
    this.dentistList.paginator = this.paginator;
    //$('.dentist_dropdown').parent().hide(); // added
    $('.sa_heading_bar').addClass('filter_single'); // added
  }

  ngOnDestroy() {
    //$('.dentist_dropdown').parent().show(); // added
    $('.sa_heading_bar').removeClass('filter_single'); // added
    clearInterval(this.autoCall);
    if(this.creditStatusTimer) clearInterval(this.creditStatusTimer);
  }

  initiate_clinic() {
    this.selectDentist = 0;
    this.user_type = this._cookieService.get('user_type');
    $('.external_clinic').show();
    //$('.dentist_dropdown').hide();
    $('.header_filters').addClass('flex_direct_mar');
    $('.header_filters').removeClass('hide_header');
    var val = $('#currentClinic').attr('cid');
    if (val != undefined && val != 'all') {
      this.clinic_id = val;
      $('#title').html('Morning Huddle');
      if (this.previousDays == '') {
        this.previousDays = this.datepipe
          .transform(new Date(), 'yyyy-MM-dd 00:00:00')
          .replace(/\s/, 'T');
      }
      this.dailyTabSettLod = false;
      if(this.creditStatusTimer) clearInterval(this.creditStatusTimer);
      this.clinicianAnalysisService
        .getClinicFollowUpSettings(this.clinic_id)
        .subscribe({
          next: (v) => {
            // if (res.status == 200) {
            this.isEnablePO = v.data.post_op_enable == 1 ? true : false;
            this.isEnableOR = v.data.recall_enable == 1 ? true : false;
            this.isEnableTH = v.data.tick_enable == 1 ? true : false;
            this.isEnableFT = v.data.fta_enable == 1 ? true : false;
            this.isEnableUT = v.data.uta_enable == 1 ? true : false;
            this.isEnabletasks = v.data.daily_task_enable == 1 ? true : false;
            this.isEnableEquipList =
              v.data.equip_list_enable == 1 ? true : false;
            if (v.data.sms_enabled != undefined)
              this.isSMSEnabled =
                !!v.data.sms_enabled && parseInt(this.user_type) != 4 && parseInt(this.user_type) != 7;
            if (v.data.accepted_sms_terms != undefined)
              this.isAcceptedSMSTerms = !!v.data.accepted_sms_terms;
            if(this.isSMSEnabled){
              // this.updateCreditStatus();
              this.creditStatusTimer = setInterval(() => {
                this.updateCreditStatus();
              }, 30000);
            }
            //}
          },
          error: (e) => {
            console.error(e);
          }
        });

      this.dentist_id = this._cookieService.get('dentistid');
      if (this.user_type != '5') {
        /***** Tab 1 ***/
        this.getDentistPerformance();
        this.getRecallRate();
        this.getTreatmentRate();
        if (this.user_type != '4') {
          this.getDentistList();
        }
        /***** Tab 1 ***/
        /***** Tab 2 ***/
        //this.getSchedulePatients(null);
        this.getAppointmentCards(null);
      }
      if (this.user_type != '4') {
        /***** Tab 2 ***/
        /***** Tab 3 ***/
        this.getTodayUnscheduledHours();
        /***** Tab 3 ***/
        /***** Tab 4 ***/
        this.getReminders();
        //this.getFollowupsUnscheduledPatients();
        this.getFollowupPostOpCalls();
        this.getOverdueRecalls();
        this.getTickFollowups();
        this.getFtaFollowups();
        this.getUtaFollowups();
        this.getFollowupScripts();
        /***** Tab 4 ***/
      }

      if (this.user_type != '4') {
        // this.getEndOfDays();
        this.getEquipmentList();
      }
      this.getChartsTips();
    }
    this.getEndOfDays();
  }

  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }

  onTabChanged(event) {
    const q = new URL(window.location as any);
    q.searchParams.set('tab', event.index);
    window.history.pushState({}, '', q);
  }

  refreshPerformanceTab() {
    /*******Tab 2 *******/
    if (this.currentDentist == 0) {
      this.currentDentist = null;
    }
    if (this.user_type != '5') {
      this.getDentistPerformance();
      this.getRecallRate();
      this.getTreatmentRate();
      if (this.user_type != '4') {
        this.getDentistList();
      }
      this.getAppointmentCards(null);
    }
    if (this.user_type != '4') {
      this.getTodayUnscheduledHours();
      this.getReminders();
      this.getFollowupPostOpCalls();
      this.getOverdueRecalls();
      this.getTickFollowups();
      this.getFtaFollowups();
      this.getUtaFollowups();
      this.getFollowupScripts();
    }
    if (this.user_type != '4') {
      // this.getEndOfDays();
      this.getEquipmentList();
    }
    this.getEndOfDays();
  }

  refreshScheduleTab(event) {
    this.appointmentCardsLoaders = true;
    this.scheduleNewPatientsLoader = true;
    this.currentDentistSchedule = event;
    this.currentDentist = event;

    if (this.currentDentist != 0) {
      var temp = [];
      this.appointmentCardsTemp.forEach((val) => {
        if (val.provider_id == this.currentDentist) {
          temp.push(val);
        }
      });
      this.appointmentCards.data = temp;
    } else {
      this.appointmentCards.data = this.appointmentCardsTemp;
    }
    this.scheduleNewPatient = this.appointmentCards.data.filter(
      (item: any) => item.is_new_patient == 'Yes'
    ).length;
    this.schedulehours = _.round(
      _.chain(this.appointmentCards.data)
        .sumBy((item: any) => parseInt(item.duration))
        .value() / 60,
      2
    );
    this.unSchedulehours = _.round(
      _.chain(this.appointmentCards.data)
        .sumBy((item: any) => parseInt(item.outstanding_item_value))
        .value(),
      0
    );
    this.appointmentCardsLoaders = false;
    this.scheduleNewPatientsLoader = false;
    this.schedulehoursLoader = false;
    this.unschedulehoursLoader = false;
  }

  public currentDentistReminder: any = 0;

  refreshReminderTab(event) {
    this.selectDentist = event;

    this.remindersRecallsOverdueLoader = true;
    this.todayUnscheduledBalLoader = true;
    this.currentDentistReminder = event;

    if (this.currentDentistReminder != 0) {
      var temp = [];
      this.remindersRecallsOverdueTemp.forEach((val) => {
        if (parseInt(val.provider_id) == this.currentDentistReminder) {
          temp.push(val);
        }
      });
      this.remindersRecallsOverdue = temp;
    } else {
      this.remindersRecallsOverdue = this.remindersRecallsOverdueTemp;
    }
    this.todayUnscheduledBal = _.round(
      _.chain(this.remindersRecallsOverdue)
        .sumBy((item: any) => parseInt(item.due_balance))
        .value()
    );
    this.scheduleNewPatient = this.remindersRecallsOverdue.filter(
      (item: any) => item.is_new_patient == 'Yes'
    ).length;
    this.remindersRecallsOverdueLoader = false;
    this.scheduleNewPatientsLoader = false;
    this.todayUnscheduledBalLoader = false;
  }

  /***** Tab 4 ***/
  public remindersTotal: any = 0;
  public clinicDentistsReminders: any = [];
  public remindersRecallsOverdueTemp: any = [];

  getReminders(refsh = '') {
    if (refsh == '') {
      this.remindersRecallsOverdueLoader = true;
      this.scheduleNewPatientsLoader = true;
      this.todayUnscheduledBalLoader = true;
    }
    this.clinicDentistsReminders = [];

    this.morningHuddleService
      .getReminders(this.clinic_id, this.previousDays, this.user_type)
      .subscribe({
        next: (res) => {
          this.remindersRecallsOverdueLoader = false;
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            this.showXrayOverdue = false;
            this.OPGOverdue = false;
            this.OverdueRecalls = false;
            this.LabNeeded = false;
            this.showStatusCode = false;
            if (res.body.status_codes_enable == 1) {
              this.showStatusCode = true;
            }
            if (res.body.xray_overdue_enable == 1) {
              this.showXrayOverdue = true;
            }
            if (res.body.opg_overdue_enable == 1) {
              this.OPGOverdue = true;
            }
            if (res.body.recall_overdue_enable == 1) {
              this.OverdueRecalls = true;
            }
            if (res.body.lab_needed_enable == 1) {
              this.LabNeeded = true;
            }
            this.remindersTotal = res.body.total;
            if(this.isSMSEnabled){
              const remindersData = res.body.data.map((d) => {
                return {
                  appoint_id: d.appoint_id,
                  phone_number: d.mobile,
                  patient_id: d.patient_id
                };
              });
              this.morningHuddleService
              .getCreditStatus(
                this.clinic_id,
                remindersData,
                this.previousDays.split('T')[0]
              )
              .subscribe((v2) => {
                if (v2.status) {
                  this.remainCredits = v2.data.remain_credits;
                  this.costPerSMS = v2.data.cost_per_sms;
                  const statusList = v2.data.sms_status_list;

                  const reminderList = _.merge(res.body.data, statusList);
                  this.remindersRecallsOverdueTemp = reminderList;
                  this.remindersRecallsOverdue = reminderList;
                  this.remindersRecallsOverdueDate = this.datepipe
                    .transform(res.body.date, 'yyyy-MM-dd 00:00:00')
                    .replace(/\s/, 'T');
                  if (this.user_type == '4') {
                    this.dentistid = this._cookieService.get('dentistid');
                    this.refreshReminderTab(this.dentistid);
                  } else {
                    res.body.data.forEach((val) => {
                      var isExsist = this.clinicDentistsReminders.filter(
                        function (person) {
                          return person.provider_id == val.provider_id;
                        }
                      );
                      if (isExsist.length <= 0) {
                        var nm =
                          val.jeeve_name != '' && val.jeeve_name
                            ? val.jeeve_name
                            : val.provider_name;
                        var temp = {
                          provider_id: val.provider_id,
                          provider_name: nm
                        };
                        if (temp.provider_name != null)
                          this.clinicDentistsReminders.push(temp);
                      }
                    });
                    this.clinicDentistsReminders.sort(function (x, y) {
                      let a = x.provider_name.toUpperCase(),
                        b = y.provider_name.toUpperCase();
                      return a == b ? 0 : a > b ? 1 : -1;
                    });
                  }
                  this.refreshReminderTab(this.selectDentist);
                }
              });
            }else{
              this.remindersRecallsOverdueTemp = res.body.data;
              this.remindersRecallsOverdue = res.body.data;     
              this.remindersRecallsOverdueDate = this.datepipe.transform( res.body.date, 'yyyy-MM-dd 00:00:00').replace(/\s/, 'T');
              if(this.user_type == '4'){         
                this.dentistid = this._cookieService.get("dentistid");
                this.refreshReminderTab(this.dentistid);
              } else {
                res.body.data.forEach(val => {
                  var isExsist = this.clinicDentistsReminders.filter(function (person) { return person.provider_id == val.provider_id });
                  if(isExsist.length <= 0){
                    var nm = (val.jeeve_name != '' && val.jeeve_name)? val.jeeve_name : val.provider_name;
                    var temp = {'provider_id' : val.provider_id, 'provider_name' : nm};
                    if(temp.provider_name != null)
                      this.clinicDentistsReminders.push(temp);  
                  }          
                });               
                this.clinicDentistsReminders.sort(function (x, y) {
                    let a = x.provider_name.toUpperCase(),
                    b = y.provider_name.toUpperCase();
                    return a == b ? 0 : a > b ? 1 : -1;
                });  
              }
              this.refreshReminderTab(this.selectDentist);
            }
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        error: (e) => {
          this.handleUnAuthorization();
        }
      });
  }

  /*  getFollowupsUnscheduledPatients(){
    this.morningHuddleService.getFollowupsUnscheduledPatients( this.clinic_id, this.previousDays,  this.unscheduledPatientsDays  ).subscribe((res:any) => {
      if(res.status == 200) {
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

  getFollowupPostOpCalls() {
    this.poLoadingLoading = true;
    this.futureDateOP = '';
    this.morningHuddleService
      .followupPostOpCalls(
        this.clinic_id,
        this.previousDays,
        this.postOpCallsDays
      )
      .subscribe(
        {
          next: (res: any) => {
            this.followupPostOpCallsInComp = [];
            var diffTime: any = this.getDataDiffrences();
            if (diffTime < 0) {
              this.futureDateOP = this.datepipe
                .transform(this.previousDays, 'yyyy-MM-dd 00:00:00')
                .replace(/\s/, 'T');
            }
            this.poLoadingLoading = false;
            if (res.status == 200) {
              this.apiSuccessCount += 1;
              this.nextBussinessDay = res.body.next_day;
              this.followupsPostopCallsDate = res.body.data.date;
              if (res.body.data == '204') {
              } else {
                this.followupPostOpCalls = res.body.data;
                if (this.postopCallsPostOp == true) {
                  this.followupPostOpCallsInComp = this.followupPostOpCalls;
                } else {
                  this.followupPostOpCallsInComp =
                    this.followupPostOpCalls.filter((p) => p.is_complete != true);
                }
              }
  
              //this.postOpCallsDays = production.previous;
            } else if (res.status == 401) {
              this.handleUnAuthorization();
            }
          },
          error: (error) => {
            this.handleUnAuthorization();
          }
        }
      );
  }

  getOverdueRecalls(evn = '') {
    if (evn != 'close') {
      this.recallLoadingLoading = true;
    }
    this.futureDateOR = '';
    this.morningHuddleService
      .followupOverdueRecalls(
        this.clinic_id,
        this.previousDays,
        this.postOpCallsDays
      )
      .subscribe(
        {
          next: (res: any) => {
            this.followupOverDueRecallInCMP = [];
            var diffTime: any = this.getDataDiffrences();
            if (diffTime < 0) {
              this.futureDateOR = this.datepipe
                .transform(this.previousDays, 'yyyy-MM-dd 00:00:00')
                .replace(/\s/, 'T');
            }
            this.recallLoadingLoading = false;
  
            if (res.status == 200) {
              this.apiSuccessCount += 1;
              this.nextBussinessDay = res.body.next_day;
              if (res.body.data == '204') {
              } else {
                this.followupOverDueRecall = res.body.data;
                if (this.showCompleteOverdue == true) {
                  this.followupOverDueRecallInCMP = this.followupOverDueRecall;
                } else {
                  this.followupOverDueRecallInCMP =
                    this.followupOverDueRecall.filter(
                      (p) => p.is_complete != true
                    );
                }
              }
  
              this.followupsOverDueRecallDate = res.body.data.date;
              //this.OverDueRecallDays = production.previous;
            } else if (res.status == 401) {
              this.handleUnAuthorization();
            }
          },
          error: (error) => {
            this.handleUnAuthorization();
          }
        }

      );
  }

  public postOpCallsScrps: any = [];
  public overdueRecallsScrps: any = [];
  public tickFollowupsScrps: any = [];
  public ftaFollowupsScrps: any = [];
  public utaFollowupsScrps: any = [];
  public intrFollowupsScrps: any = [];
  /* Get Followups scripts **/
  getFollowupScripts() {
    this.morningHuddleService.getScripts(this.clinic_id).subscribe({
      next: (res: any) => {
        this.postOpCallsScrps = [];
        this.overdueRecallsScrps = [];
        this.tickFollowupsScrps = [];
        this.ftaFollowupsScrps = [];
        this.utaFollowupsScrps = [];
        this.intrFollowupsScrps = [];

        if (res.status && res.status == 200) {
          this.apiSuccessCount += 1;
          res.body.data.forEach((script) => {
            if (script.followup_type == 'Post Op') {
              this.postOpCallsScrps.push(script);
            } else if (script.followup_type == 'Overdue Recalls') {
              this.overdueRecallsScrps.push(script);
            } else if (script.followup_type == 'Ticks') {
              this.tickFollowupsScrps.push(script);
            } else if (script.followup_type == 'FTA') {
              this.ftaFollowupsScrps.push(script);
            } else if (script.followup_type == 'UTA') {
              this.utaFollowupsScrps.push(script);
            } else if (script.followup_type == 'Internal Referrals') {
              this.intrFollowupsScrps.push(script);
            }
          });
        }
      },
      error: (error) => {
        this.handleUnAuthorization();
      }
    });
  }

  public tipDoneCode = {};
  public tipFutureDate = {};

  getTickFollowups(evn = '') {
    if (evn != 'close') {
      this.endTaksLoadingLoading = true;
    }
    this.futureDateTH = '';
    this.morningHuddleService
      .followupTickFollowups(
        this.clinic_id,
        this.previousDays,
        this.postOpCallsDays
      )
      .subscribe((res: any) => {
        this.followupTickFollowupsInCMP = [];
        var diffTime: any = this.getDataDiffrences();
        if (diffTime < 0) {
          this.futureDateTH = this.datepipe
            .transform(this.previousDays, 'yyyy-MM-dd 00:00:00')
            .replace(/\s/, 'T');
        }
        this.endTaksLoadingLoading = false;
        if (res.status == 200) {
          this.apiSuccessCount += 1;
          this.nextBussinessDay = res.body.next_day;
          this.followupsTickFollowupsDate = res.body.data.date;
          if (res.body.data == '204') {
          } else {
            this.followupTickFollowups = res.body.data;
            if (this.showCompleteTick == true) {
              this.followupTickFollowupsInCMP = this.followupTickFollowups;
            } else {
              this.followupTickFollowupsInCMP =
                this.followupTickFollowups.filter((p) => p.is_complete != true);
            }

            this.followupTickFollowupsInCMP.forEach((tool) => {
              this.tipDoneCode[tool.patient_id] = {
                title: 'Outstanding Treatments',
                info: tool.code
              };
              var date = this.datepipe.transform(
                tool.future_appt_date,
                'MMM d, y'
              );
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

  public inrtFollowupsInCMP: any = [];
  public inrtFollowups: any = [];

  public followupFtaFollowups: any = [];
  public followupFtaFollowupsInCMP: any = [];
  public ftaTaksLoadingLoading: boolean = false;
  public showCompleteFta: boolean = false;
  public tipFtaDoneCode: any = {};
  public tipFtaFutureDate: any = {};

  getFtaFollowups(evn = '') {
    if (evn != 'close') {
      this.ftaTaksLoadingLoading = true;
    }
    this.morningHuddleService
      .followupFtaFollowups(
        this.clinic_id,
        this.previousDays,
        this.postOpCallsDays
      )
      .subscribe(
        (res: any) => {
          this.ftaTaksLoadingLoading = false;
          this.followupFtaFollowupsInCMP = [];
          this.futureDateTF = '';
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            var diffTime: any = this.getDataDiffrences();
            if (diffTime < 0) {
              this.futureDateTF = this.datepipe
                .transform(this.previousDays, 'yyyy-MM-dd 00:00:00')
                .replace(/\s/, 'T');
            }
            this.nextBussinessDay = res.body.next_day;
            this.followupsTickFollowupsDate = res.body.data.date;
            if (res.body.data == '204') {
            } else {
              this.followupFtaFollowups = res.body.data;
              if (this.showCompleteFta == true) {
                this.followupFtaFollowupsInCMP = this.followupFtaFollowups;
              } else {
                this.followupFtaFollowupsInCMP =
                  this.followupFtaFollowups.filter(
                    (p) => p.is_complete != true
                  );
              }
              this.followupFtaFollowups.forEach((tool) => {
                this.tipFtaDoneCode[tool.patient_id] = {
                  title: 'Outstanding Treatments',
                  info: tool.code
                };
                var date = this.datepipe.transform(
                  tool.future_appt_date,
                  'MMM d, y'
                );
                this.tipFtaFutureDate[tool.patient_id] = {
                  title: 'Future Appointment',
                  info: date
                };
              });
            }
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  public followupUtaFollowups: any[] = [];
  public followupUtaFollowupsInCMP: any[] = [];
  public utaTaksLoadingLoading: boolean = false;
  public showCompleteUta: boolean = false;
  public tipUtaDoneCode: any = {};
  public tipUtaFutureDate: any = {};

  getUtaFollowups(evn = '') {
    if (evn != 'close') {
      this.utaTaksLoadingLoading = true;
    }
    this.morningHuddleService
      .followupUtaFollowups(
        this.clinic_id,
        this.previousDays,
        this.postOpCallsDays
      )
      .subscribe(
        (res: any) => {
          this.utaTaksLoadingLoading = false;
          this.followupUtaFollowupsInCMP = [];
          this.futureDateTF = '';
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            var diffTime: any = this.getDataDiffrences();
            if (diffTime < 0) {
              this.futureDateTF = this.datepipe
                .transform(this.previousDays, 'yyyy-MM-dd 00:00:00')
                .replace(/\s/, 'T');
            }
            this.nextBussinessDay = res.body.next_day;
            this.followupsTickFollowupsDate = res.body.date;
            if (res.body.data == '204') {
            } else {
              this.followupUtaFollowups = res.body.data;
              if (this.showCompleteUta) {
                this.followupUtaFollowupsInCMP = this.followupUtaFollowups;
              } else {
                this.followupUtaFollowupsInCMP =
                  this.followupUtaFollowups.filter(
                    (p: any) => p.is_complete != 1
                  );
              }
              this.followupUtaFollowups.forEach((tool) => {
                this.tipUtaDoneCode[tool.patient_id] = {
                  title: 'Outstanding Treatments',
                  info: tool.code
                };
                var date = this.datepipe.transform(
                  tool.future_appt_date,
                  'MMM d, y'
                );
                this.tipUtaFutureDate[tool.patient_id] = {
                  title: 'Future Appointment',
                  info: date
                };
              });
            }
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  public isEnabletasks: boolean = false;
  public tasklistArray: any = [];

  getEndOfDays() {
    this.endTaksLoading = true;
    this.futureDateDT = '';
    this.tasklistArray = [];
    this.morningHuddleService
      .getEndOfDays(this.clinic_id, this.previousDays)
      .subscribe(
        (res: any) => {
          this.endOfDaysTasksInComp = new MatTableDataSource([]);
          var diffTime: any = this.getDataDiffrences();
          if (diffTime < 0) {
            this.futureDateDT = this.datepipe
              .transform(this.previousDays, 'yyyy-MM-dd 00:00:00')
              .replace(/\s/, 'T');
          }
          this.endTaksLoading = false;
          this.tasklistArray = [];
          this.endOfDaysTasksInComp.data = [];
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            if (res.body.data == '204') {
              //this.isEnabletasks = false;
            } else {
              //this.isEnabletasks = true;
              this.endOfDaysTasks = res.body.data;
              this.endOfDaysTasksDate = this.datepipe
                .transform(res.body.date, 'yyyy-MM-dd 00:00:00')
                .replace(/\s/, 'T');
              if (this.showComplete == true) {
                this.endOfDaysTasksInComp.data = this.endOfDaysTasks;
              } else {
                this.endOfDaysTasksInComp.data = this.endOfDaysTasks.filter(
                  (p) => p.is_complete != 1
                );
              }
              // this.endOfDaysTasksInComp.sort = this.sort1;
            }
            res.body.data.forEach((data) => {
              if (data.type == 'list') {
                this.tasklistArray.push(data);
              }
            });
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  getEndOfDaysUpdatelist() {
    this.endTaksLoading = true;
    this.futureDateDT = '';
    this.morningHuddleService
      .getEndOfDays(this.clinic_id, this.previousDays)
      .subscribe(
        (res: any) => {
          var diffTime: any = this.getDataDiffrences();
          if (diffTime < 0) {
            this.futureDateDT = this.datepipe
              .transform(this.previousDays, 'yyyy-MM-dd 00:00:00')
              .replace(/\s/, 'T');
          }
          this.endTaksLoading = false;
          if (res.status == 200) {
            this.endOfDaysTasks = [];
            this.endOfDaysTasksInComp.data = [];
            this.apiSuccessCount += 1;
            if (res.body.data == '204') {
              //this.isEnabletasks = false;
            } else {
              this.endOfDaysTasks = res.body.data;
              this.endOfDaysTasksDate = this.datepipe
                .transform(res.body.date, 'yyyy-MM-dd 00:00:00')
                .replace(/\s/, 'T');
              if (this.showComplete == true) {
                this.endOfDaysTasksInComp.data = this.endOfDaysTasks;
              } else {
                this.endOfDaysTasksInComp.data = this.endOfDaysTasks.filter(
                  (p) => p.is_complete != 1
                );
              }
              // this.endOfDaysTasksInComp.sort = this.sort1;
            }
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  public isEnableEquipList: boolean = false;

  getEquipmentList() {
    this.equipmentListLoading = true;
    this.futureDateEL = '';
    this.morningHuddleService
      .getEquipmentList(this.clinic_id, this.previousDays)
      .subscribe(
        (res: any) => {
          this.lquipmentList = new MatTableDataSource([]);
          var diffTime: any = this.getDataDiffrences();
          if (diffTime < 0) {
            this.futureDateEL = this.datepipe
              .transform(this.previousDays, 'yyyy-MM-dd 00:00:00')
              .replace(/\s/, 'T');
          }
          this.equipmentListLoading = false;
          //  this.lquipmentList.data = [];
          this.amButton = true;
          this.pmButton = true;
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            if (res.body.data == '204') {
              //this.isEnableEquipList = false;
            } else {
              //this.isEnableEquipList = true;
              this.lquipmentList.data = res.body.data;
              this.lquipmentList.sort = this.sort2;
              var i = 0;
              res.body.data.forEach((list) => {
                if (this.amButton == true && list.am_complete == 1) {
                  this.amButton = false;
                }
                if (this.pmButton == true && list.pm_complete == 1) {
                  this.pmButton = false;
                }
                var temp = { am: list.equip_qty_am, pm: list.equip_qty_pm };
                if (typeof this.lquipmentListAm[list.id] == 'undefined') {
                  this.lquipmentListAm[list.id] = [];
                }
                this.lquipmentListAm[list.id] = temp;
              });
            }
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  getTodayUnscheduledHours(refsh = '') {
    if (refsh == '') {
      this.todayUnscheduledHoursLoader = true;
    }
    this.morningHuddleService
      .getTodayUnscheduledHours(
        this.clinic_id,
        this.previousDays,
        this.user_type
      )
      .subscribe(
        (res: any) => {
          this.todayUnscheduledHoursLoader = false;
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            this.todayUnscheduledHours = res.body.data.hour;
            this.todayPatientsDate = res.body.data.date;
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  getChairUtilisationRate() {
    this.morningHuddleService
      .getChairUtilisationRate(
        this.clinic_id,
        this.previousDays,
        this.user_type
      )
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.todayChairUtilisationRate = Math.round(res.body.data);
        } else if (res.status == 401) {
          if (this.user_type != '7') {
            this._cookieService.put('username', '');
            this._cookieService.put('email', '');
            this._cookieService.put('userid', '');
            this.router.navigateByUrl('/login');
          }
        }
      });
  }
  getTodayUnscheduledBal(refsh = '') {
    if (refsh == '') {
      this.todayUnscheduledBalLoader = true;
    }
    this.morningHuddleService
      .getTodayUnscheduledBal(this.clinic_id, this.previousDays, this.user_type)
      .subscribe(
        (res: any) => {
          this.todayUnscheduledBalLoader = false;
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            this.todayUnscheduledBal = res.body.data;
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  /*getNoShow(){
    this.morningHuddleService.getNoShow( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((res:any) => {
      if(res.status == 200) {
        this.noShow = production.data;       
      }
    }); 
  }*/

  /*   getTodayPostopCalls(){
    this.morningHuddleService.getTodayPostopCalls( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((res:any) => {
      if(res.status == 200) {
        this.todayPostopCalls = production.data;
      }
    }); 
  }*/

  /***** Tab 3 ***/

  /***** Tab 2 ***/
  /*   getSchedulePatients(dentist){
    this.morningHuddleService.getPatients( this.clinic_id,dentist,this.previousDays,  this.user_type  ).subscribe((res:any) => {
      if(res.status == 200) {
        this.schedulePatieltd = production.data.patient;
        
      }
    }); 
  }*/

  public clinicTotal: any = 0;
  getAppointmentCards(dentist, refsh = '') {
    if (refsh == '') {
      this.appointmentCardsLoaders = true;
      this.schedulehoursLoader = true;
      this.scheduleNewPatientsLoader = true;
      this.unschedulehoursLoader = true;
      this.appointmentCards = new MatTableDataSource();
    }
    this.morningHuddleService
      .getAppointmentCards(
        this.clinic_id,
        dentist,
        this.previousDays,
        this.user_type
      )
      .subscribe(
        (res: any) => {
          this.clinicDentists = [];
          this.currentDentistSchedule = this.currentDentist
            ? this.currentDentist
            : 0;
          this.appointmentCardsTemp = [];
          if (refsh == '') {
            this.appointmentCards = new MatTableDataSource();
          }
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            this.showXrayOverdue = false;
            this.OPGOverdue = false;
            this.OverdueRecalls = false;
            this.LabNeeded = false;
            this.showStatusCode = false;
            if (res.status_codes_enable == 1) {
              this.showStatusCode = true;
            }
            if (res.body.xray_overdue_enable == 1) {
              this.showXrayOverdue = true;
            }
            if (res.body.opg_overdue_enable == 1) {
              this.OPGOverdue = true;
            }
            if (res.body.recall_overdue_enable == 1) {
              this.OverdueRecalls = true;
            }
            if (res.body.lab_needed_enable == 1) {
              this.LabNeeded = true;
            }
            this.clinicTotal = res.body.total;

            this.appointmentCardsTemp = res.body.data;

            if (this.user_type == '4') {
              this.dentistid = this._cookieService.get('dentistid');
              this.refreshScheduleTab(this.dentistid);
            } else {
              if (this.currentDentist != 0 && this.currentDentist) {
                this.appointmentCardsTemp = (<any[]>res.body.data).filter(
                  (item) => item.provider_id == this.currentDentist
                );
              }
              this.appointmentCards.data = this.appointmentCardsTemp;
              this.refreshScheduleTab(this.selectDentist);
              // this.appointmentCards.data = production.data;
            }
            res.body.data.forEach((val) => {
              // check for duplicate values
              var isExsist = this.clinicDentists.filter(function (person) {
                return person.provider_id == val.provider_id;
              });
              if (isExsist.length <= 0) {
                var nm =
                  val.jeeve_name != '' && val.jeeve_name
                    ? val.jeeve_name
                    : val.provider_name;
                var temp = { provider_id: val.provider_id, provider_name: nm };
                if (temp.provider_name != null) this.clinicDentists.push(temp);
              }
            });
            this.clinicDentists.sort(function (x, y) {
              let a = x.provider_name.toUpperCase(),
                b = y.provider_name.toUpperCase();
              return a == b ? 0 : a > b ? 1 : -1;
            });
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  /***** Tab 2 ***/

  /***** Tab 1 ***/
  async getDentistPerformance() {
    this.dentistperformanceLoader = true;
    this.morningHuddleService
      .dentistProduction(
        this.clinic_id,
        this.previousDays,
        this.user_type,
        this.dentist_id
      )
      .subscribe(
        (res: any) => {
          this.dentistperformanceLoader = false;
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            this.production = res.body.data;
            this.productionDate = this.datepipe
              .transform(this.production.date, 'yyyy-MM-dd 00:00:00')
              .replace(/\s/, 'T');
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  async getRecallRate() {
    this.dentistrecallRateLoader = true;
    this.morningHuddleService
      .recallRate(
        this.clinic_id,
        this.previousDays,
        this.user_type,
        this.dentist_id
      )
      .subscribe(
        (res: any) => {
          this.dentistrecallRateLoader = false;
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            this.recallRate = res.body.data;
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  async getTreatmentRate() {
    this.dentistTreatmentRateLoader = true;
    this.morningHuddleService
      .reappointRate(
        this.clinic_id,
        this.previousDays,
        this.user_type,
        this.dentist_id
      )
      .subscribe(
        (res: any) => {
          this.dentistTreatmentRateLoader = false;
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            this.treatmentRate = res.body.data;
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  async getDentistList() {
    this.dentistListLoading = false;
    this.dentistList = new MatTableDataSource([]);
    this.morningHuddleService
      .dentistList(this.clinic_id, this.previousDays, this.user_type)
      .subscribe(
        (res: any) => {
          this.dentistListLoading = true;
          if (res.status == 200) {
            this.apiSuccessCount += 1;
            this.dentistList.data = res.body.data;
            this.dentistListTemp = res.body.data;
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        (error) => {
          this.handleUnAuthorization();
        }
      );
  }

  getdifference(a, b) {
    let difference: any = Math.abs(a - b);
    difference =
      difference > 0 ? difference : difference.toString().split('-').join();
    return difference;
  }

  getFirstLetter(str) {
    if (str.toLowerCase().indexOf('dr ') == 0) {
      str = str.slice(3);
    }
    var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
    return matches.join('');
  }

  //toggleUpdate($event,element.patient_id,element.original_appt_date,element.patients.clinic_id,'Post op Calls')
  toggleUpdate(event, pid, date, followup_date, cid, type, status = 'default') {
    if (!status || status == '' || status == 'null') {
      event.source.checked = false;
      this.toastr.error('Please update status first to mark complete.');
      return false;
    }
    if (type == 'post-op-calls') {
      this.poLoadingLoading = true;
    } else if (type == 'recall-overdue') {
      this.recallLoadingLoading = true;
    } else if (type == 'tick-follower') {
      this.endTaksLoadingLoading = true;
    }
    this.morningHuddleService
      .updateFollowUpStatus(event.checked, pid, cid, type, date, followup_date)
      .subscribe((update: any) => {
        if (type == 'post-op-calls') {
          this.getFollowupPostOpCalls();
        } else if (type == 'recall-overdue') {
          this.getOverdueRecalls();
        } else if (type == 'tick-follower') {
          this.getTickFollowups();
        } else if (type == 'fta-follower') {
          this.getFtaFollowups();
        } else if (type == 'uta-follower') {
          this.getUtaFollowups();
        }
      });
  }

  updateStatus(
    event,
    pid,
    date,
    cid,
    firstname,
    surname,
    original_appt_date,
    followup_date,
    type,
    nextBussinessDay
  ) {
    if (
      event == 'Wants another follow-up' ||
      event == "Can't be reached" ||
      event == "Can't be reached - left voicemail"
    ) {
      let width = '450px';
      if (
        event == "Can't be reached" ||
        event == "Can't be reached - left voicemail"
      )
        width = '650px';

      const dialogRef = this.dialog.open(StatusDialogMHComponent, {
        width: width,
        data: {
          event,
          firstname,
          surname,
          pid,
          cid,
          type,
          original_appt_date,
          followup_date,
          nextBussinessDay
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (type == 'tick-follower') {
          this.getTickFollowups('close');
        } else if (type == 'fta-follower') {
          this.getFtaFollowups('close');
        } else if (type == 'Uta-follower') {
          this.getUtaFollowups('close');
        } else {
          this.getOverdueRecalls('close');
        }
      });
    } else {
      this.morningHuddleService
        .updateStatus(event, pid, cid, type, date, followup_date)
        .subscribe((update: any) => {
          if (type == 'tick-follower') {
            this.getTickFollowups('close');
          } else if (type == 'fta-follower') {
            this.getFtaFollowups('close');
          } else if (type == 'uta-follower') {
            this.getUtaFollowups('close');
          } else {
            this.getOverdueRecalls('close');
          }
        });
    }
  }

  endTime(app_date, start, duration) {
    var date = app_date + ' ' + start;
    var currentDate = new Date(date);
    return new Date(currentDate.getTime() + duration * 60000)
      .toUTCString()
      .replace(/,/g, '');
  }

  startDate(app_date) {
    return this.datepipe.transform(app_date, 'yyyy-MM-dd');
  }
  subtractDays(daysToSubtract) {
    let todaysDate = new Date();
    let selectedDate = new Date();
    selectedDate.setDate(todaysDate.getDate() - daysToSubtract);
    return selectedDate;
  }
  addDays(daysToAdd) {
    let todaysDate = new Date();
    let selectedDate = new Date();
    selectedDate.setDate(todaysDate.getDate() + daysToAdd);
    return selectedDate;
  }

  formatPhoneNumber(phone) {
    if (phone) {
      if (phone.startsWith('04')) {
        phone = phone.replace(/ /g, '');
        var onePart = phone.substr(0, 4);
        var twoPart = phone.substr(4, 3);
        var threePart = phone.substr(7, 3);
        return onePart + ' ' + twoPart + ' ' + threePart;
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

  updateTask(event, tid, thid, cid) {
    this.endTaksLoading = true;
    this.morningHuddleService
      .updateEndStatus(event.checked, tid, thid, cid, this.previousDays)
      .subscribe((update: any) => {
        // this.getEndOfDays();
        this.getEndOfDaysUpdatelist();
      });
  }

  updateToComplete(checked) {
    this.showComplete = checked;
    console.log(`ShowComplete = ${this.showComplete}`);
    if (checked) {
      this.endOfDaysTasksInComp.data = this.endOfDaysTasks;
    } else {
      this.endOfDaysTasksInComp.data = this.endOfDaysTasks.filter(
        (p) => p.is_complete != true
      );
    }
    // this.endOfDaysTasksInComp.sort = this.sort1;
  }

  updateToCompleteOP(event) {
    this.postopCallsPostOp = event.checked;
    if (event.checked) {
      this.followupPostOpCallsInComp = this.followupPostOpCalls;
    } else {
      this.followupPostOpCallsInComp = this.followupPostOpCalls.filter(
        (p) => p.is_complete != true
      );
    }
  }
  updateToCompleteOR(event) {
    this.showCompleteOverdue = event.checked;
    if (event.checked) {
      this.followupOverDueRecallInCMP = this.followupOverDueRecall;
    } else {
      this.followupOverDueRecallInCMP = this.followupOverDueRecall.filter(
        (p) => p.is_complete != true
      );
    }
  }
  updateToCompleteTF(event) {
    this.showCompleteTick = event.checked;
    if (event.checked) {
      this.followupTickFollowupsInCMP = this.followupTickFollowups;
    } else {
      this.followupTickFollowupsInCMP = this.followupTickFollowups.filter(
        (p) => p.is_complete != true
      );
    }
  }

  updateToCompleteFT(event: MatCheckboxChange) {
    console.log('updateToCompleteFT');
    this.showCompleteFta = event.checked;
    if (event.checked) {
      this.followupFtaFollowupsInCMP = this.followupFtaFollowups;
    } else {
      this.followupFtaFollowupsInCMP = this.followupFtaFollowups.filter(
        (p: any) => p.is_complete != 1
      );
    }
    console.log(this.followupFtaFollowupsInCMP);
  }

  updateToCompleteUT(event: MatCheckboxChange) {
    this.showCompleteUta = event.checked;
    if (event.checked) {
      this.followupUtaFollowupsInCMP = this.followupUtaFollowups;
    } else {
      this.followupUtaFollowupsInCMP = this.followupUtaFollowups.filter(
        (p: any) => p.is_complete != 1
      );
    }
  }

  openNotes(notes, patient_id, original_appt_date, followup_date, type): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '500px',
      data: {
        notes: notes,
        patientId: patient_id,
        date: original_appt_date,
        clinic_id: this.clinic_id,
        old: notes,
        followup_date: followup_date,
        type: type
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (type == 'tick-follower') {
        this.getTickFollowups('close');
      } else if (type == 'recall-overdue') {
        this.getOverdueRecalls('close');
      } else if (type == 'fta-follower') {
        this.getFtaFollowups('close');
      } else if (type == 'uta-follower') {
        this.getUtaFollowups('close');
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

  saveQuantity(time) {
    var data = [];
    this.lquipmentListAm.forEach((value, id) => {
      if (time == 'am') {
        var temp = { id: id, value: value.am, type: time };
      } else {
        var temp = { id: id, value: value.pm, type: time };
      }
      data.push(temp);
    });

    if (data) {
      var dataJson = JSON.stringify(data);
      this.equipmentListLoading = true;
      this.morningHuddleService
        .updateEquimentList(dataJson, this.clinic_id, this.previousDays)
        .subscribe((update: any) => {
          // this.getEndOfDays();
          // this.getEndOfDaysUpdatelist();
          this.getEquipmentList();
        });
    }
  }

  listUpdate(type, id) {
    if (
      type == 'am' &&
      (this.lquipmentListAm[id].am < 0 || this.lquipmentListAm[id].am == null)
    ) {
      this.lquipmentListAm[id].am = 0;
    } else if (
      (type == 'pm' && this.lquipmentListAm[id].pm < 0) ||
      this.lquipmentListAm[id].pm == null
    ) {
      this.lquipmentListAm[id].pm = 0;
    }
  }

  public showUpDateArrow: boolean = true;
  public showDwDateArrow: boolean = true;
  public showProcessingText: boolean = false;
  setDate(type) {
    this.apiSuccessCount = 0;
    this.showProcessingText = true;
    let todaysDate = new Date(this.previousDays);
    let selectedDate = new Date(this.previousDays);
    if (type == 'add') {
      selectedDate.setDate(todaysDate.getDate() + 1);
    } else {
      selectedDate.setDate(todaysDate.getDate() - 1);
    }
    this.previousDays = this.datepipe
      .transform(selectedDate, 'yyyy-MM-dd 00:00:00')
      .replace(/\s/, 'T');
    this.refreshPerformanceTab();

    var diffTime: any = this.getDataDiffrences();
    this.showUpDateArrow = true;
    this.showDwDateArrow = true;
    if (parseInt(diffTime) <= -7 && type == 'add') {
      this.showUpDateArrow = false;
    }
    if (parseInt(diffTime) >= 7 && type == 'subtract') {
      this.showDwDateArrow = false;
    }
  }
  public dateRangeFired: boolean = false;
  setDateChange(event) {
    if (typeof event.startDate !== 'undefined') {
      if (this.dateRangeFired) {
        this.dateRangeFired = false;
        return;
      }
      this.dateRangeFired = true;
      this.previousDays = this.datepipe.transform(
        event.startDate.toDate(),
        'yyyy-MM-dd'
      );
      this.refreshPerformanceTab();
    }
  }

  getDataDiffrences() {
    // Function to get days diffrence from selected date
    var currentdate: any = new Date();
    var day = currentdate.getDate();
    var month = currentdate.getMonth(); //months from 1-12
    var year = currentdate.getFullYear();
    var date2: any = new Date(year, month, day);
    var setDate: any = new Date(this.previousDays);
    var day1 = setDate.getDate();
    var month1 = setDate.getMonth(); //months from 1-12
    var year1 = setDate.getFullYear();
    var date1: any = new Date(year1, month1, day1);
    var diffTime: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

    return diffTime;
  }

  getChartsTips() {
    this.chartstipsService.getCharts(7, this.clinic_id).subscribe(
      (res) => {
          this.charTips = res.data;
      },
      (error) => {}
    );
  }

  formatHistory(history) {
    let html = '<table class="history">';
    let statusSpe = {
      'Did not want to book': 'Didn’t want to book',
      'Cant be reached': "Can't be reached",
      'Cant be reached - left': "Can't be reached - left voicemail"
    };
    history.forEach((tip) => {
      let date = this.datepipe.transform(
        new Date(tip.followup_date),
        'MMM dd, yyyy'
      );
      if (typeof statusSpe[tip.status] != 'undefined') {
        html +=
          '<tr><td width="28%">' +
          date +
          ':</td><td> ' +
          statusSpe[tip.status] +
          '</td></tr>';
      } else {
        html +=
          '<tr><td width="28%">' +
          date +
          ':</td><td> ' +
          tip.status +
          '</td></tr>';
      }
      if (tip.notes && tip.notes != 'null' && tip.notes != '') {
        html +=
          '<tr><td  class="notes" width="28%">Notes:</td><td> ' +
          tip.notes +
          '</td></tr>';
      }
    });
    html += '</table>';
    return { title: 'Previous Followups', info: html };
  }

  historyPos(event) {
    let x = event.clientX;
    let y = parseFloat(event.clientY);
    setTimeout(function () {
      let divLnt = $('.custom-tooltip').height() + 40;
      let divwd = $('.custom-tooltip').width() - 10;
      $('.custom-tooltip').css({ top: y - divLnt, left: x - divwd });
    }, 100);
  }

  refreshDataAuto() {
    if (this.currentDentist == 0) {
      this.currentDentist = null;
    }
    this.getAppointmentCards(this.currentDentist, 'refresh');

    this.getTodayUnscheduledHours('refresh');
    this.getReminders('refresh');
  }

  historyPosChips(event, colour, type = '') {
    $('.custom-tooltip').css({ visibility: 'hidden', opacity: '1' });
    let x = event.clientX;
    let y = parseInt(event.clientY);
    setTimeout(function () {
      $('.tooltip-container').addClass('mat-' + colour);
      let textLength = $('.tooltip-info-text').text().length;
      if (textLength >= 100) {
        $('.custom-tooltip').css({ width: 650 });
      } else if (textLength >= 75) {
        $('.custom-tooltip').css({ width: 550 });
      }
      if (type == 'fta') {
        let height = $('.custom-tooltip').height();
        $('.custom-tooltip').css({
          top: y - (height + 40),
          left: x - 200,
          visibility: 'visible',
          opacity: '1'
        });
      } else {
        $('.custom-tooltip').css({
          top: y + 20,
          left: x - 200,
          visibility: 'visible',
          opacity: '1'
        });
      }
    }, 100);
  }

  handleUnAuthorization() {
    if (this.user_type != '7') {
      this._cookieService.put('username', '');
      this._cookieService.put('email', '');
      this._cookieService.put('userid', '');
      this.router.navigateByUrl('/login');
    }
  }

  checkSuccessApi() {
    if (this.user_type == '2' && this.apiSuccessCount == 19) {
      this.showProcessingText = false;
      return false;
    } else if (this.user_type == '3' && this.apiSuccessCount == 19) {
      this.showProcessingText = false;
      return false;
    } else if (this.user_type == '4' && this.apiSuccessCount == 7) {
      this.showProcessingText = false;
      return false;
    } else if (this.user_type == '7' && this.apiSuccessCount == 7) {
      this.showProcessingText = false;
      return false;
    } else if (this.user_type == '5' && this.apiSuccessCount == 14) {
      this.showProcessingText = false;
      return false;
    } else if (this.user_type == '6' && this.apiSuccessCount == 19) {
      this.showProcessingText = false;
      return false;
    } else {
      this.showProcessingText = true;
      return true;
    }
  }

  openSendReviewBtnDialog(element) {
    if (!this.isAcceptedSMSTerms) {
      const dialog = this.dialog.open(TermsConditionsDialog, {
        data: { clinic_id: this.clinic_id }
      });
      dialog.afterClosed().subscribe((v) => {
        if (v) {
          this.isAcceptedSMSTerms = true;
          this.openSMSDialog(element);
        }
      });
    } else {
      this.openSMSDialog(element);
    }
  }

  openSMSDialog(element) {
    if (this.remainCredits <= 0) {
      this.dialog.open(StripePaymentDialog, {
        data: {
          costPerSMS: this.costPerSMS,
          notify_msg:
            'You have no credits remaining, please top-up your account to send more review invites.'
        }
      });
    } else {
      const sendReviewDialog = this.dialog.open(SendReviewDialog, {
        data: {
          patient_id: element.patient_id,
          clinic_id: this.clinic_id,
          patient_name: element.patient_name,
          mobile: element.mobile,
          appoint_id: element.appoint_id,
          total_remains: this.remainCredits,
          review_msg: element.review_msg,
          phone_number: element.phone_number
        }
      });
      sendReviewDialog.afterClosed().subscribe((result) => {
        if (result && result.status) {
          this.remainCredits = this.remainCredits - result.num_sms;
          if(this.remainCredits <= 10){
            this.toastr.warning(
              `${this.remainCredits} review credits remaining `+
              '- to add more ask your account owner to top up under '+
              'Settings -> Clinics -> Google Reviews');
          }
          element.sms_status = result.status;
          this.updateCreditStatus();
        }
      });
    }
  }

  async checkPaymentStatus(clientSecret: string) {
    const stripe = await loadStripe(environment.stripeKey);

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
      case 'succeeded':
        this.toastr.success(
          'Payment succeeded. If the number of Credits were not updated, Please retry refreshing page aftger few mins!'
        );
        break;
      case 'processing':
        this.toastr.success('Your payment is processing.');
        break;
      case 'requires_payment_method':
        this.toastr.error('Your payment was not successful, please try again.');
        break;
      default:
        this.toastr.error('Something went wrong.');
        break;
    }
  }

  printDentistScheduleTab() {
    var divToPrint = document.getElementById('mh-dentist-schedule-print');
    var linkElement = document.createElement('script');
    var linkElement1 = document.createElement('script');
    var newWin = window.open('', 'Print-Window');
    linkElement.setAttribute('type', 'text/javascript');
    linkElement.setAttribute('src', this.homeUrl + 'assets/js/jquery.min.js');
    newWin.document.getElementsByTagName('head')[0].appendChild(linkElement);
    linkElement1.setAttribute('type', 'text/javascript');
    linkElement1.setAttribute('src', this.homeUrl + 'assets/js/print.js');
    newWin.document.getElementsByTagName('head')[0].appendChild(linkElement1);
    newWin.document.open();
    newWin.document.write(
      '<html><head><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"><style>#p-bttom{opacity:0}.info-icon-container.mhRebook{display: none;}.DentistListSecRow.mh-table.patient_data-table_responsive {margin-top: 50px;} .DentistListSecRow .mat-row:nth-child(even) {background-color: #f5f5fb;}span.timeFTA {width: 55px;margin-left: 8px;font-size: 12px;text-align: center;border-radius: 1px;border: 1px solid #000000;box-shadow: 0px 1px 3px;padding: 1px 9px;display: inline-block;background: #e8b06b;color: #000000;} .icon {max-width: 80px;flex: 0 0 80px;height: 80px;text-align: center;border-radius: 100%;margin-right: 30px;} .icon span {line-height: 80px;font-size: 32px;} .icon.orange { background-color: #fff6ef;}.icon.red {background-color: #ffecec;}.icon.orange i{color: #f3a062;} .icon.red i{color: #f35d5e;}.icon i{line-height: 80px;font-size: 32px;}.fas {font-family: "Font Awesome 5 Free";font-weight: 900;} #mat-tab-content-0-1 .mh-table .mat-row:nth-child(even) .appointment {background-color: #fff !important;} #mat-tab-content-0-1 .appointment {width: -webkit-max-content;width: -moz-max-content;width: max-content;background-color: #f6f7f9;padding: 5px 10px;margin: 5px 5px;border-radius: 2px;font-size: 12px;float: left;}table.mat-table {border-spacing: 2px px;}mat-footer-cell.mat-footer-cell.cdk-footer-cell.cdk-column-isDataAvailable.mat-column-isDataAvailable.ng-star-inserted {display: none;}.mh-table th.mat-header-cell {font-weight: bold;text-align: left;}.morning-huddle-date {text-align: center;display: grid;margin-bottom: 50px;}.mh-fa-check.gray {color: #bfbfbf;}.mh-fa-check {color: green;}.fa-check {color: #18A689;font-size: 18px;margin-right: 10px;}.fa, .fas {font-weight: 900;}.mat-column-start {word-wrap: break-word !important; white-space: unset !important;flex: 0 0 175px !important;width: 160px !important;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;hyphens: auto;}.DentistListSecRow .appointment {width: -webkit-max-content;width: -moz-max-content;width: max-content;background-color: #f6f7f9; padding: 5px 10px;margin: 5px 5px;border-radius: 2px;font-size: 13px;float: left;}.fa, .fas, .far, .fal, .fab {-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;display: inline-block;font-style: normal; font-variant: normal; text-rendering: auto;line-height: 1;}.hide {display: none;}</style></head><body >' +
        divToPrint.innerHTML +
        '</body></html>'
    );
    newWin.document.close();
    setTimeout(function () {
      newWin.close();
    }, 2000);
  }

  printFrontDeskRemindersTab() {
    var divToPrint = document.getElementById('mh-front-desk-reminders-print');
    var linkElement = document.createElement('script');
    var linkElement1 = document.createElement('script');
    var newWin = window.open('', 'Print-Window');
    linkElement.setAttribute('type', 'text/javascript');
    linkElement.setAttribute('src', this.homeUrl + 'assets/js/jquery.min.js');
    newWin.document.getElementsByTagName('head')[0].appendChild(linkElement);
    linkElement1.setAttribute('type', 'text/javascript');
    linkElement1.setAttribute('src', this.homeUrl + 'assets/js/print.js');
    newWin.document.getElementsByTagName('head')[0].appendChild(linkElement1);
    newWin.document.open();
    newWin.document.write(
      '<html></head><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"><style>#p-bttom{opacity:0}.info-icon-container.mhRebook{display: none;}.DentistListSecRow.mh-table.patient_data-table_responsive {margin-top: 50px;} .DentistListSecRow .mat-row:nth-child(even) {background-color: #f5f5fb;}span.timeFTA {width: 55px;margin-left: 8px;font-size: 12px;text-align: center;border-radius: 1px;border: 1px solid #000000;box-shadow: 0px 1px 3px;padding: 1px 9px;display: inline-block;background: #e8b06b;color: #000000;} .icon {max-width: 80px;flex: 0 0 80px;height: 80px;text-align: center;border-radius: 100%;margin-right: 30px;} .icon span {line-height: 80px;font-size: 32px;} .icon.orange { background-color: #fff6ef;}.icon.red {background-color: #ffecec;}.icon.orange i{color: #f3a062;} .icon.red i{color: #f35d5e;}.icon i{line-height: 80px;font-size: 32px;}.fas {font-family: "Font Awesome 5 Free";font-weight: 900;} #mat-tab-content-0-1 .mh-table .mat-row:nth-child(even) .appointment {background-color: #fff !important;} #mat-tab-content-0-1 .appointment {width: -webkit-max-content;width: -moz-max-content;width: max-content;background-color: #f6f7f9;padding: 5px 10px;margin: 5px 5px;border-radius: 2px;font-size: 12px;float: left;}table.mat-table {border-spacing: 2px px;}mat-footer-cell.mat-footer-cell.cdk-footer-cell.cdk-column-isDataAvailable.mat-column-isDataAvailable.ng-star-inserted {display: none;}.mh-table th.mat-header-cell {font-weight: bold;text-align: left;}.morning-huddle-date {text-align: center;display: grid;margin-bottom: 50px;}.mh-fa-check.gray {color: #bfbfbf;}.mh-fa-check {color: green;}.fa-check {color: #18A689;font-size: 18px;margin-right: 10px;}.fa, .fas {font-weight: 900;}.mat-column-start {word-wrap: break-word !important; white-space: unset !important;flex: 0 0 175px !important;width: 160px !important;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;hyphens: auto;}.DentistListSecRow .appointment {width: -webkit-max-content;width: -moz-max-content;width: max-content;background-color: #f6f7f9; padding: 5px 10px;margin: 5px 5px;border-radius: 2px;font-size: 13px;float: left;}.hide {display: none;}</style></head><body >' +
        divToPrint.innerHTML +
        '</body></html>'
    );
    newWin.document.close();
    setTimeout(function () {
      newWin.close();
    }, 2000);
  }
}
