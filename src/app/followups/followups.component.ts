import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
} from '@angular/core';
import { FollowupsService } from './followups.service';
import { ClinicianAnalysisService } from '../dashboards/cliniciananalysis/cliniciananalysis.service';
import { CookieService } from 'ngx-cookie';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe, JsonPipe } from '@angular/common';
import { HeaderService } from '../layouts/full/header/header.service';
import { MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { AppConstants } from '../app.constants';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
  MatLegacyDialog as MatDialog,
} from '@angular/material/legacy-dialog';
import { NgxDaterangepickerMd, DaterangepickerComponent } from 'ngx-daterangepicker-material';
import { ChartstipsService } from '../shared/chartstips.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { LocalStorageService } from '../shared/local-storage.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CONSULTANT, USER_MASTER } from '@/newapp/constants';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';

@Component({
  selector: 'export-data-dialog',
  templateUrl: './export-data.html',
  encapsulation: ViewEncapsulation.None,
})
export class ExportDataDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ExportDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService,
    private followupsService: FollowupsService,
    private datePipe: DatePipe,
  ) {}

  public loader = false;

  onNoClick(): void {
    this.dialogRef.close();
  }

  exportData(data) {
    let endRaw = moment(data.end_date.end);
    let startRaw = moment(data.start_date.start);

    let endDate = this.datePipe.transform(endRaw.toDate(), 'yyyy-MM-dd');
    let startDate = this.datePipe.transform(startRaw.toDate(), 'yyyy-MM-dd');
    let clinic_id = data.clinic_id;
    let followuptype = data.followtype;
    let showcompleted = data.show_completed ? 1 : 0;
    let filetype = data.type;
    let filename = '';
    if (filetype == 'csv') {
      filename = followuptype + '_' + startDate + '_' + endDate + '.csv';
    } else if (filetype == 'pdf') {
      filename = followuptype + '_' + startDate + '_' + endDate + '.pdf';
    }
    this.loader = true;
    this.followupsService
      .checkExportFollowUpData(clinic_id, startDate, endDate, showcompleted, followuptype)
      .subscribe(
        res => {
          if (res.status == 200) {
            this.followupsService
              .exportFollowUp(
                clinic_id,
                startDate,
                endDate,
                showcompleted,
                filetype,
                followuptype,
                filename,
              )
              .subscribe(
                (data: File) => {
                  const csvName = filename;
                  let ftype = '';
                  if (filetype == 'csv') {
                    ftype = 'text/csv';
                  } else if (filetype == 'pdf') {
                    ftype = 'application/pdf';
                  }
                  const blob = new Blob([data], { type: ftype }); //data is response from BE.
                  //Chrome & Firefox
                  const a = document.createElement('a');
                  const url = window.URL.createObjectURL(blob);
                  a.href = url;
                  a.download = csvName;
                  a.click();
                  window.URL.revokeObjectURL(url);
                  a.remove();
                  this.dialogRef.close();
                  this.toastr.success('File exported successfully!');
                  this.followupsService.deletefiles(filename, filetype).subscribe(
                    res => {},
                    error => {
                      console.log('error', error);
                    },
                  );
                },
                error => {
                  console.log('error', error);
                },
              );
          } else if (res.status == '204') {
            this.toastr.info(res.body.message);
            this.loader = false;
            return;
          }
        },
        error => {
          console.log('error', error);
        },
      );
  }

  handleUnAuthorization() {
    this._cookieService.put('username', '');
    this._cookieService.put('email', '');
    this._cookieService.put('userid', '');
    this.router.navigateByUrl('/login');
  }
}

@Component({
  selector: 'notes-add-dialog',
  templateUrl: './add-notes.html',
  encapsulation: ViewEncapsulation.None,
})
export class FollowupsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FollowupsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService,
    private router: Router,
    private followupsService: FollowupsService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data) {
    if (data.notes == '' || data.old == data.notes) {
      return false;
    }

    this.followupsService
      .notes(
        data.notes,
        data.patientId,
        data.date,
        data.clinic_id,
        data.followup_date,
        data.type,
        data.treatItem,
      )
      .subscribe(
        res => {
          if (res.status == 200) {
            this.dialogRef.close();
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        error => {
          console.log('error', error);
        },
      );
    return true;
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
  encapsulation: ViewEncapsulation.None,
})
export class StatusDialogComponent {
  public nextDate: any = '';
  public nextCustomFollowup: boolean = false;
  public nextFollowupHave: boolean = false;
  @ViewChild(DaterangepickerComponent, { static: false })
  datePicker: DaterangepickerComponent;

  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService,
    private router: Router,
    private followupsService: FollowupsService,
  ) {}
  onNoClick(): void {
    this.nextCustomFollowup = false;
    this.dialogRef.close();
  }
  save(data) {
    if (data.notes == '' || data.old == data.notes) {
      return false;
    }
    this.followupsService
      .notes(data.notes, data.patientId, data.date, data.clinic_id, data.followup_date, data.type)
      .subscribe(
        res => {
          if (res.status == 200) {
            this.dialogRef.close();
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        error => {
          console.log('error', error);
        },
      );
    return true;
  }
  updateNext(event) {
    this.nextDate = event.chosenLabel;
  }

  showCalender(event) {
    this.nextCustomFollowup = true;
    this.nextFollowupHave = false;
  }
  updateNextfollowUp(data) {
    this.followupsService
      .updateStatus(
        'Wants another follow-up',
        data.pid,
        data.cid,
        data.type,
        data.original_appt_date,
        data.followup_date,
        data.treatItem,
      )
      .subscribe((update: any) => {
        this.onNoClick();
        if (update.status) {
          this.followupsService
            .cloneRecord(
              data.pid,
              data.cid,
              data.type,
              data.followup_date,
              this.nextDate,
              data.original_appt_date,
              data.treatItem,
            )
            .subscribe(update => {
              if (update.message === 'already') {
              }
            });
        }
      });
  }
  updateNextReached(data, event) {
    this.nextCustomFollowup = false;
    this.nextFollowupHave = false;
    this.followupsService
      .updateStatus(
        data.event,
        data.pid,
        data.cid,
        data.type,
        data.original_appt_date,
        data.followup_date,
      )
      .subscribe((update: any) => {
        if (update.status && event != 'no') {
          this.followupsService
            .cloneRecord(
              data.pid,
              data.cid,
              data.type,
              data.followup_date,
              this.nextDate,
              data.original_appt_date,
              data.treatItem,
              event,
            )
            .subscribe(clone => {
              if (clone.message == 'already') {
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
  templateUrl: './followups.component.html',
  styleUrls: ['./followups.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FollowupsComponent implements OnInit, OnDestroy {
  public destroy = new Subject<void>();
  private destroy$ = this.destroy.asObservable();
  public selectedTab = 0;
  public overdueRecallsSearchControl = new FormControl('');
  public tickSearchControl = new FormControl('');
  public postOpCallsSearchControl = new FormControl('');
  public ftaSearchControl = new FormControl('');
  public utaSearchControl = new FormControl('');

  public id: any = '';
  public apiUrl = environment.apiUrl;
  public clinic_id: any = '';
  public user_type: any = '';
  public dentistid: any = null;
  public production: any = '';
  public recallRate: any = '';
  public treatmentRate: any = '';
  public previousDays: any = '';

  public postOpCallsDays: any = '';
  public followupsPostopCallsDate: any = '';

  public dentistList = new MatTableDataSource([]);
  dentistListTemp: any = [];

  public followupPostOpCalls: any[] = [];
  public followupPostOpCallsInComp: any[] = [];
  public followupOverDueRecall: any[] = [];
  public internalReferrals: any[] = [];
  public followupOverDueRecallInCMP: any[] = [];
  public internalReferralRecallInCMP: any[] = [];
  public followupsOverDueRecallDate: any = '';
  public followupsTickFollowupsDate: any = '';
  public TickFollowupsDays: any = '';
  public OverDueRecallDays: any = '';
  public followupTickFollowups: any[] = [];
  public followupTickFollowupsInCMP: any[] = [];
  public ftaFollowupsInComp: any = [];

  public endOfDaysTasks: any[] = [];
  public endOfDaysTasksInComp: any[] = [];
  public endOfDaysTasksComp: any[] = [];
  public endOfDaysTasksDate: any = '';
  public endTaksLoading: boolean = true;
  public showComplete: boolean = false;
  public clinicDentists: any[] = [];
  public currentDentist: any = 0;
  public currentDentistSchedule: any = 0;

  public dentistListLoading: boolean = false;
  public postopCallsPostOp: boolean = false;
  public showCompleteOverdue: boolean = false;
  public showCompleteReferrals: boolean = false;
  public showCompleteTick: boolean = false;
  public endTaksLoadingLoading: boolean = true;
  public poLoadingLoading: boolean = true;
  public recallLoadingLoading: boolean = true;
  public selectedMonthYear: any = '';
  public showDwDateArrow: boolean = true;
  public showUpDateArrow: boolean = true;

  public charTips: any = [];

  public selectedMonth: string = new Date().getMonth().toString();
  public selectedYear: string = new Date().getFullYear().toString();

  public pageSize: number = 20;
  public IRLoadingLoading: boolean = false;

  public orTablePages: number[] = [];
  public currentORPage: number = 1;
  public thikTablePages: number[] = [];
  public currentThickPage: number = 1;
  public opTablePages: number[] = [];
  public irTablePages: any = [];
  public currentOpPage: number = 1;
  public nextBussinessDay: any;
  public isEnablePO: boolean = false;
  public isEnableOR: boolean = false;
  public isEnableTH: boolean = false;
  public isEnableFT: boolean = false;
  public isEnableUT: boolean = false;
  public autoCall: any;

  displayedColumns1: string[] = [
    'name',
    'phone',
    'code',
    'dentist',
    'date',
    'followup_date',
    'status',
  ];
  displayedColumns2: string[] = [
    'name',
    'phone',
    'code',
    'note',
    'followup_date',
    'book',
    'status',
  ];
  displayedColumns3: string[] = [
    'name',
    'phone',
    'code',
    'dentist',
    'note',
    'followup_date',
    'book',
    'status',
  ];
  displayedColumns4: string[] = [
    'name',
    'phone',
    'referral',
    'treatment',
    'provider',
    'status',
    'followup_date',
    'notes',
    'complete',
  ];
  timezone: string = '+1000';
  months: any = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public get isExactOrCore(): boolean {
    return this.localStorageService.isEachClinicPmsExactOrCore(this.clinic_id);
  }
  public get isExactOrCoreOrPraktika(): boolean {
    return this.localStorageService.isEachClinicExactOrCoreOrPraktika(this.clinic_id);
  }

  public get isEveryFilteredTickFollowupComplete(): boolean {
    return this.followupTickFollowupsInCMP.every(tickFollowup => tickFollowup.is_complete == 1);
  }

  public get isEveryTickFollowupComplete(): boolean {
    return (
      this.followupTickFollowups.length > 0 &&
      this.followupTickFollowups.every(tickFollowup => tickFollowup.is_complete == 1)
    );
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private datepipe: DatePipe,
    private localStorageService: LocalStorageService,
    private followupsService: FollowupsService,
    private _cookieService: CookieService,
    private headerService: HeaderService,
    private router: Router,
    private toastr: ToastrService,
    public constants: AppConstants,
    public dialog: MatDialog,
    public chartstipsService: ChartstipsService,
    public clinicianAnalysisService: ClinicianAnalysisService,
    private layoutFacade: LayoutFacade,
  ) {
    // this.getChartsTips();
  }

  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.matTabGroup.realignInkBar(); // align material tab green shaded color to first tab (on screen resize)
  }

  ngOnInit() {
    $('.header_filters').removeClass('hide_header');
    $('#currentDentist').attr('did', 'all');
    this.user_type = this._cookieService.get('user_type');
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

    this.selectedMonthYear = this.datepipe
      .transform(new Date(), 'yyyy-MM-dd 00:00:00')
      .replace(/\s/, 'T');

    var self = this;
    this.autoCall = setInterval(function () {
      self.refreshDataAuto();
    }, 1000 * 60);

    this.overdueRecallsSearchControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(keyword => {
        this.followupOverDueRecallInCMP = this.filterFollowups(
          this.followupOverDueRecall,
          keyword,
          this.showCompleteOverdue,
        );

        this.setPaginationButtons(this.followupOverDueRecallInCMP, 'OR');
        this.followupOverDueRecallInCMP = this.setPaginationData(
          this.followupOverDueRecallInCMP,
          'OR',
        );
      });

    this.tickSearchControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(keyword => {
        this.followupTickFollowupsInCMP = this.filterFollowups(
          this.followupTickFollowups,
          keyword,
          this.showCompleteTick,
        );

        this.setPaginationButtons(this.followupTickFollowupsInCMP, 'TH');
        this.followupTickFollowupsInCMP = this.setPaginationData(
          this.followupTickFollowupsInCMP,
          'TH',
        );
      });

    this.postOpCallsSearchControl.valueChanges
      .pipe(debounceTime(200), takeUntil(this.destroy$))
      .subscribe(keyword => {
        this.followupPostOpCallsInComp = this.filterFollowups(
          this.followupPostOpCalls,
          keyword,
          this.postopCallsPostOp,
        );

        this.setPaginationButtons(this.followupPostOpCallsInComp, 'OP');
        this.followupPostOpCallsInComp = this.setPaginationData(
          this.followupPostOpCallsInComp,
          'OP',
        );
      });

    this.ftaSearchControl.valueChanges
      .pipe(debounceTime(200), takeUntil(this.destroy$))
      .subscribe(keyword => {
        this.followupFtaFollowupsInCMP = this.filterFollowups(
          this.followupFtaFollowups,
          keyword,
          this.showCompleteFta,
        );

        this.setPaginationButtons(this.followupFtaFollowupsInCMP, 'FT');
        this.followupFtaFollowupsInCMP = this.setPaginationData(
          this.followupFtaFollowupsInCMP,
          'FT',
        );
      });

    this.utaSearchControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(keyword => {
        this.followupUtaFollowupsInCMP = this.filterFollowups(
          this.followupUtaFollowups,
          keyword,
          this.showCompleteFta,
        );

        this.setPaginationButtons(this.followupUtaFollowupsInCMP, 'UT');
        this.followupUtaFollowupsInCMP = this.setPaginationData(
          this.followupUtaFollowupsInCMP,
          'UT',
        );
      });

    this.layoutFacade.toggleClinicSelection(this.hasPermission);
  }
  ngAfterViewInit(): void {
    this.dentistList.paginator = this.paginator;
    //$('.dentist_dropdown').parent().hide(); // added
    $('.sa_heading_bar').addClass('filter_single'); // added
  }
  ngOnDestroy() {
    //$('.dentist_dropdown').parent().show(); // added
    $('.sa_heading_bar').removeClass('filter_single'); // added
    clearInterval(this.autoCall);
    this.destroy.next();
    this.destroy.complete();
  }

  initiate_clinic() {
    this.user_type = this._cookieService.get('user_type');
    var val = $('#currentClinic').attr('cid');
    if (val != undefined && val != 'all') {
      this.clinic_id = val;

      this.clinicianAnalysisService.getClinicFollowUpSettings(this.clinic_id).subscribe(data => {
        //if (data.status == 200) {
        this.isEnablePO = data.data.post_op_enable == 1;
        this.isEnableOR = data.data.recall_enable == 1;
        this.isEnableTH = data.data.tick_enable == 1;
        this.isEnableFT = data.data.fta_enable == 1;
        this.isEnableUT = data.data.uta_enable == 1;
        //}
      });
      $('#title').html('Follow Ups');

      this.selectedMonth = this.datepipe.transform(this.selectedMonthYear, 'M');
      this.selectedYear = this.datepipe.transform(this.selectedMonthYear, 'yyyy');

      this.getChartsTips();

      this.getFollowupScripts();
      this.getFollowupPostOpCalls();
      this.getOverdueRecalls();
      this.getinternalReferrals();
      this.getTickFollowups();
      this.getFtaFollowups();
      this.getUtaFollowups();
    }
  }

  get hasPermission(): boolean {
    const userType = parseInt(this._cookieService.get('user_type'), 10);
    return (
      [USER_MASTER, CONSULTANT].indexOf(userType) >= 0 ||
      (this._cookieService.get('permissions') || '').indexOf('followups') >= 0
    );
  }

  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }
  onTabChanged(event) {}

  refreshPerformanceTab() {
    this.selectedMonth = this.datepipe.transform(this.selectedMonthYear, 'M');
    this.selectedYear = this.datepipe.transform(this.selectedMonthYear, 'yyyy');
    this.getFollowupScripts();
    this.getFollowupPostOpCalls();
    this.getOverdueRecalls();
    this.getinternalReferrals();
    this.getTickFollowups();
    this.getFtaFollowups();
    this.getUtaFollowups();
  }

  public postOpCallsScrps: any = [];
  public overdueRecallsScrps: any = [];
  public tickFollowupsScrps: any = [];
  public ftaFollowupsScrps: any = [];
  public utaFollowupsScrps: any = [];
  public intrFollowupsScrps: any = [];
  /* Get Followups scripts **/
  getFollowupScripts() {
    this.followupsService.getScripts(this.clinic_id).subscribe((res: any) => {
      this.postOpCallsScrps = [];
      this.overdueRecallsScrps = [];
      this.tickFollowupsScrps = [];
      this.ftaFollowupsScrps = [];
      this.utaFollowupsScrps = [];
      this.intrFollowupsScrps = [];
      if (res.status && res.status == 200) {
        res.body.data.forEach(script => {
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
    });
  }

  getFollowupPostOpCalls() {
    this.poLoadingLoading = true;
    this.followupsService
      .followupPostOpCalls(this.clinic_id, this.selectedMonth, this.selectedYear)
      .subscribe((res: any) => {
        this.followupPostOpCallsInComp = [];
        this.poLoadingLoading = false;
        if (res.status == 200) {
          this.nextBussinessDay = res.body.next_day;
          if (res.body.data == '204') {
          } else {
            this.followupPostOpCalls = res.body.data;
            if (this.postopCallsPostOp == true) {
              this.followupPostOpCallsInComp = this.followupPostOpCalls;
            } else {
              this.followupPostOpCallsInComp = this.followupPostOpCalls.filter(
                p => p.is_complete != true,
              );
            }
            if (
              this.followupPostOpCallsInComp.length <=
                this.pageSize * this.currentOpPage - this.pageSize &&
              this.currentOpPage != 1
            ) {
              this.currentOpPage = this.currentOpPage - 1;
            }
            this.setPaginationButtons(this.followupPostOpCallsInComp, 'OP');
            this.followupPostOpCallsInComp = this.setPaginationData(
              this.followupPostOpCallsInComp,
              'OP',
            );

            this.followupsPostopCallsDate = res.body.data.date;
            this.postOpCallsDays = res.body.previous;
          }
        }
      });
  }

  getOverdueRecalls(evn = '') {
    if (evn != 'close') {
      this.recallLoadingLoading = true;
    }
    this.followupsService
      .followupOverdueRecalls(this.clinic_id, this.selectedMonth, this.selectedYear)
      .subscribe((res: any) => {
        this.followupOverDueRecallInCMP = [];
        this.recallLoadingLoading = false;
        if (res.status == 200) {
          this.nextBussinessDay = res.body.next_day;
          this.followupsOverDueRecallDate = res.body.data.date;
          if (res.body.data == '204') {
          } else {
            this.followupOverDueRecall = res.body.data;
            if (this.showCompleteOverdue) {
              this.followupOverDueRecallInCMP = this.followupOverDueRecall;
            } else {
              this.followupOverDueRecallInCMP = this.followupOverDueRecall.filter(
                p => !p.is_complete,
              );
            }
            if (
              this.followupOverDueRecallInCMP.length <=
                this.pageSize * this.currentORPage - this.pageSize &&
              this.currentORPage != 1
            ) {
              this.currentORPage = this.currentORPage - 1;
            }
            this.setPaginationButtons(this.followupOverDueRecallInCMP, 'OR');
            this.followupOverDueRecallInCMP = this.setPaginationData(
              this.followupOverDueRecallInCMP,
              'OR',
            );
            this.OverDueRecallDays = res.body.previous;
          }
        }
      });
  }

  public currentIRPage: number = 1;
  getinternalReferrals(evn = '') {
    if (evn != 'close') {
      this.IRLoadingLoading = true;
    }
    this.followupsService
      .internalReferrals(this.clinic_id, this.selectedMonth, this.selectedYear)
      .subscribe((res: any) => {
        this.internalReferralRecallInCMP = [];
        // this.recallLoadingLoading = false;

        if (res.status == 200) {
          this.IRLoadingLoading = false;
          this.nextBussinessDay = res.body.next_day;
          this.internalReferrals = res.body.data;
          if (this.showCompleteReferrals == true) {
            this.internalReferralRecallInCMP = this.internalReferrals;
          } else {
            this.internalReferralRecallInCMP = this.internalReferrals.filter(
              p => p.is_complete != true,
            );
          }

          if (
            this.internalReferralRecallInCMP.length <=
              this.pageSize * this.currentIRPage - this.pageSize &&
            this.currentIRPage != 1
          ) {
            this.currentIRPage = this.currentIRPage - 1;
          }
          this.setPaginationButtons(this.internalReferralRecallInCMP, 'IR');
          this.internalReferralRecallInCMP = this.setPaginationData(
            this.internalReferralRecallInCMP,
            'IR',
          );
        }
      });
  }

  public tipDoneCode = {};
  public tipFutureDate = {};

  getTickFollowups(evn = '') {
    if (evn != 'close') {
      this.endTaksLoadingLoading = true;
    }
    this.followupsService
      .followupTickFollowups(this.clinic_id, this.selectedMonth, this.selectedYear)
      .subscribe((res: any) => {
        this.followupTickFollowupsInCMP = [];
        this.endTaksLoadingLoading = false;
        if (res.status == 200) {
          this.nextBussinessDay = res.body.next_day;
          if (res.body.data == '204') {
          } else {
            this.followupTickFollowups = res.body.data;
            if (this.showCompleteTick) {
              this.followupTickFollowupsInCMP = this.followupTickFollowups;
            } else {
              this.followupTickFollowupsInCMP = this.followupTickFollowups.filter(
                p => !p.is_complete,
              );
            }
            if (
              this.followupTickFollowupsInCMP.length <=
                this.pageSize * this.currentThickPage - this.pageSize &&
              this.currentThickPage != 1
            ) {
              this.currentThickPage = this.currentThickPage - 1;
            }
            this.setPaginationButtons(this.followupTickFollowupsInCMP, 'TH');
            this.followupTickFollowupsInCMP = this.setPaginationData(
              this.followupTickFollowupsInCMP,
              'TH',
            );
            this.followupTickFollowupsInCMP.forEach(tool => {
              this.tipDoneCode[tool.patient_id] = {
                title: 'Outstanding Treatments',
                info: tool.code,
              };
              var date = this.datepipe.transform(tool.future_appt_date, 'MMM d, y');
              this.tipFutureDate[tool.patient_id] = {
                title: 'Future Appointment',
                info: date,
              };
            });

            this.followupsTickFollowupsDate = res.body.data.date;
            this.TickFollowupsDays = res.body.previous;
          }
        }
      });
  }

  public followupFtaFollowups: any = [];
  public followupFtaFollowupsInCMP: any = [];
  public ftaTaksLoadingLoading: boolean = false;
  public showCompleteFta: boolean = false;
  public tipFtaDoneCode: any = {};
  public tipFtaFutureDate: any = {};
  public ftTablePages: any = [];
  public currentFTPage: number = 1;

  getFtaFollowups(evn = '') {
    if (evn != 'close') {
      this.ftaTaksLoadingLoading = true;
    }
    this.followupsService
      .followupFtaFollowups(this.clinic_id, this.selectedMonth, this.selectedYear)
      .subscribe((res: any) => {
        this.followupFtaFollowupsInCMP = [];
        this.ftaTaksLoadingLoading = false;
        if (res.status == 200) {
          this.nextBussinessDay = res.body.next_day;
          if (res.body.data == '204') {
          } else {
            this.followupFtaFollowups = res.body.data;
            if (this.showCompleteFta == true) {
              this.followupFtaFollowupsInCMP = this.followupFtaFollowups;
            } else {
              this.followupFtaFollowupsInCMP = this.followupFtaFollowups.filter(
                p => p.is_complete != true,
              );
            }
            if (
              this.followupFtaFollowupsInCMP.length <=
                this.pageSize * this.currentFTPage - this.pageSize &&
              this.currentFTPage != 1
            ) {
              this.currentFTPage = this.currentFTPage - 1;
            }
            this.setPaginationButtons(this.followupFtaFollowupsInCMP, 'FT');
            this.followupFtaFollowupsInCMP = this.setPaginationData(
              this.followupFtaFollowupsInCMP,
              'FT',
            );
            this.followupFtaFollowups.forEach(tool => {
              this.tipFtaDoneCode[tool.patient_id] = {
                title: 'Outstanding Treatments',
                info: tool.code,
              };
              var date = this.datepipe.transform(tool.future_appt_date, 'MMM d, y');
              this.tipFtaFutureDate[tool.patient_id] = {
                title: 'Future Appointment',
                info: date,
              };
            });
          }
        }
      });
  }

  public followupUtaFollowups: any = [];
  public followupUtaFollowupsInCMP: any = [];
  public utaTaksLoadingLoading: boolean = false;
  public showCompleteUta: boolean = false;
  public tipUtaDoneCode: any = {};
  public tipUtaFutureDate: any = {};
  public utTablePages: any = [];
  public currentUTPage: number = 1;

  getUtaFollowups(evn = '') {
    if (evn != 'close') {
      this.utaTaksLoadingLoading = true;
    }
    this.followupsService
      .followupUtaFollowups(this.clinic_id, this.selectedMonth, this.selectedYear)
      .subscribe((res: any) => {
        this.followupUtaFollowupsInCMP = [];
        this.utaTaksLoadingLoading = false;
        if (res.status == 200) {
          this.nextBussinessDay = res.body.next_day;
          if (res.body.data == '204') {
          } else {
            this.followupUtaFollowups = res.body.data;
            if (this.showCompleteUta == true) {
              this.followupUtaFollowupsInCMP = this.followupUtaFollowups;
            } else {
              this.followupUtaFollowupsInCMP = this.followupUtaFollowups.filter(
                p => p.is_complete != true,
              );
            }
            if (
              this.followupUtaFollowupsInCMP.length <=
                this.pageSize * this.currentUTPage - this.pageSize &&
              this.currentUTPage != 1
            ) {
              this.currentUTPage = this.currentUTPage - 1;
            }
            this.setPaginationButtons(this.followupUtaFollowupsInCMP, 'UT');
            this.followupUtaFollowupsInCMP = this.setPaginationData(
              this.followupUtaFollowupsInCMP,
              'UT',
            );
            this.followupUtaFollowups.forEach(tool => {
              this.tipUtaDoneCode[tool.patient_id] = {
                title: 'Outstanding Treatments',
                info: tool.code,
              };
              var date = this.datepipe.transform(tool.future_appt_date, 'MMM d, y');
              this.tipUtaFutureDate[tool.patient_id] = {
                title: 'Future Appointment',
                info: date,
              };
            });
          }
        }
      });
  }

  //toggleUpdate($event,element.patient_id,element.original_appt_date,element.patients.clinic_id,'Post op Calls')
  toggleUpdate(event, pid, date, fdate, cid, type, status = 'default', treatItem = '') {
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
    } else if (type == 'internal-referrals') {
      this.IRLoadingLoading = true;
    }
    this.followupsService
      .updateFollowUpStatus(event.checked, pid, cid, type, date, fdate, treatItem)
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
        } else if (type == 'internal-referrals') {
          this.getinternalReferrals();
        }
      });
    return true;
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
    nextBussinessDay,
    treatItem = '',
  ) {
    if (
      event == 'Wants another follow-up' ||
      event == "Can't be reached" ||
      event == "Can't be reached - left voicemail"
    ) {
      let width = '450px';
      if (event == "Can't be reached" || event == "Can't be reached - left voicemail")
        width = '650px';
      const dialogRef = this.dialog.open(StatusDialogComponent, {
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
          nextBussinessDay,
          treatItem,
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (type == 'tick-follower') {
          this.getTickFollowups('close');
        } else if (type == 'fta-follower') {
          this.getFtaFollowups('close');
        } else if (type == 'uta-follower') {
          this.getUtaFollowups('close');
        } else if (type == 'internal-referrals') {
          this.getinternalReferrals('close');
        } else {
          this.getOverdueRecalls('close');
        }
      });
    } else {
      this.followupsService
        .updateStatus(event, pid, cid, type, date, followup_date, treatItem)
        .subscribe((update: any) => {
          if (type == 'tick-follower') {
            this.getTickFollowups('close');
          } else if (type == 'fta-follower') {
            this.getFtaFollowups('close');
          } else if (type == 'uta-follower') {
            this.getUtaFollowups('close');
          } else if (type == 'internal-referrals') {
            this.getinternalReferrals('close');
          } else {
            this.getOverdueRecalls('close');
          }
        });
    }
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

  updateToComplete(event) {
    this.showComplete = event.checked;
    if (event.checked == true) {
      this.endOfDaysTasksInComp = this.endOfDaysTasks;
    } else {
      this.endOfDaysTasksInComp = this.endOfDaysTasks.filter(p => p.is_complete != 1);
    }
  }

  updateToCompleteOP(event) {
    this.postopCallsPostOp = event.checked;
    this.followupPostOpCallsInComp = this.filterFollowups(
      this.followupPostOpCalls,
      this.postOpCallsSearchControl.value,
      this.postopCallsPostOp,
    );

    this.currentOpPage = 1;
    this.setPaginationButtons(this.followupPostOpCallsInComp, 'OP');
    this.followupPostOpCallsInComp = this.setPaginationData(this.followupPostOpCallsInComp, 'OP');
  }

  private filterFollowups(followups: any[], keyword: string, isComplete: boolean): any[] {
    let filteredFollowups: any[] = followups;
    if (!isComplete) {
      filteredFollowups = followups.filter(p => !p.is_complete);
    }

    if (keyword != '') {
      filteredFollowups = filteredFollowups.filter((tickFollowup: any) => {
        return (
          tickFollowup.patients.firstname.toLowerCase().includes(keyword.toLowerCase()) ||
          tickFollowup.patients.surname.toLowerCase().includes(keyword.toLowerCase()) ||
          `${tickFollowup.patients.firstname} ${tickFollowup.patients.surname}`
            .toLowerCase()
            .includes(keyword.toLowerCase())
        );
      });
    }

    return filteredFollowups;
  }

  updateToCompleteOR(event) {
    this.showCompleteOverdue = event.checked;
    this.followupOverDueRecallInCMP = this.filterFollowups(
      this.followupOverDueRecall,
      this.overdueRecallsSearchControl.value,
      this.showCompleteOverdue,
    );

    this.currentORPage = 1;
    this.setPaginationButtons(this.followupOverDueRecallInCMP, 'OR');
    this.followupOverDueRecallInCMP = this.setPaginationData(this.followupOverDueRecallInCMP, 'OR');
  }

  updateToCompleteTF(event: MatCheckboxChange) {
    this.showCompleteTick = event.checked;
    this.followupTickFollowupsInCMP = this.filterFollowups(
      this.followupTickFollowups,
      this.tickSearchControl.value,
      this.showCompleteTick,
    );
    this.currentThickPage = 1;
    this.setPaginationButtons(this.followupTickFollowupsInCMP, 'TH');
    this.followupTickFollowupsInCMP = this.setPaginationData(this.followupTickFollowupsInCMP, 'TH');
  }

  updateToCompleteFT(event) {
    this.showCompleteFta = event.checked;
    this.filterFollowups(
      this.followupFtaFollowups,
      this.ftaSearchControl.value,
      this.showCompleteFta,
    );

    this.currentFTPage = 1;
    this.setPaginationButtons(this.followupFtaFollowupsInCMP, 'FT');
    this.followupFtaFollowupsInCMP = this.setPaginationData(this.followupFtaFollowupsInCMP, 'FT');
  }

  updateToCompleteUT(event) {
    this.showCompleteUta = event.checked;

    this.followupUtaFollowupsInCMP = this.filterFollowups(
      this.followupUtaFollowups,
      this.utaSearchControl.value,
      this.showCompleteUta,
    );
    this.currentUTPage = 1;
    this.setPaginationButtons(this.followupUtaFollowupsInCMP, 'UT');
    this.followupUtaFollowupsInCMP = this.setPaginationData(this.followupUtaFollowupsInCMP, 'UT');
  }

  updateToCompleteIR(event) {
    this.showCompleteReferrals = event.checked;
    if (event.checked == true) {
      this.internalReferralRecallInCMP = this.internalReferrals;
    } else {
      this.internalReferralRecallInCMP = this.internalReferrals.filter(p => p.is_complete != true);
    }
    this.currentIRPage = 1;
    this.setPaginationButtons(this.internalReferralRecallInCMP, 'IR');
    this.internalReferralRecallInCMP = this.setPaginationData(
      this.internalReferralRecallInCMP,
      'IR',
    );
  }

  exportreport(type = 'overdue_recalls'): void {
    let selected = {
      startDate: null,
      endRaw: null,
    };
    var selmonth: number = parseInt(this.datepipe.transform(this.selectedMonthYear, 'M'));
    var selyear: number = parseInt(this.datepipe.transform(this.selectedMonthYear, 'yyyy'));
    var selctedEndDate = this.datepipe.transform(new Date(selyear, selmonth, 0), 'yyyy-MM-dd');
    var selctedStartDate = this.datepipe.transform(this.selectedMonthYear, 'yyyy-MM-dd');
    let start_date = { start: moment(selctedStartDate) };
    let end_date = { end: moment(selctedEndDate) };
    const dialogRef = this.dialog.open(ExportDataDialogComponent, {
      width: '500px',
      data: {
        clinic_id: this.clinic_id,
        range: selected,
        show_completed: false,
        type: 'csv',
        followtype: type,
        start_date: start_date,
        end_date: end_date,
      },
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  openNotes(notes, patient_id, original_appt_date, followup_date, type, treatItem = ''): void {
    const dialogRef = this.dialog.open(FollowupsDialogComponent, {
      width: '500px',
      data: {
        notes: notes,
        patientId: patient_id,
        date: original_appt_date,
        clinic_id: this.clinic_id,
        old: notes,
        followup_date: followup_date,
        type: type,
        treatItem: treatItem,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (type == 'tick-follower') {
        this.getTickFollowups('close');
      } else if (type == 'recall-overdue') {
        this.getOverdueRecalls('close');
      } else if (type == 'internal-referrals') {
        this.getinternalReferrals('close');
      } else if (type == 'uta-follower') {
        this.getUtaFollowups('close');
      } else {
        this.getFtaFollowups('close');
      }
    });
  }

  subtractYears(yearsToSubtract) {
    let todaysDate = new Date();
    let selectedDate = new Date();
    selectedDate.setFullYear(todaysDate.getFullYear() - yearsToSubtract);
    return selectedDate;
  }

  showPreviousYears(yearsToSubtract) {
    let todaysDate = new Date();
    var dd: any = todaysDate.getFullYear() - yearsToSubtract;
    if (parseInt(dd) >= 2021) {
      return true;
    } else {
      return false;
    }
  }

  setPaginationButtons(totalData, type) {
    if (type == 'OR') {
      this.orTablePages = [];
      const totalPages = Math.ceil(totalData.length / this.pageSize);
      if (totalPages > 1) {
        for (let i = 0; i < totalPages; i++) {
          this.orTablePages.push(i + 1);
        }
      }
    }
    if (type == 'TH') {
      this.thikTablePages = [];
      const totalPages = Math.ceil(totalData.length / this.pageSize);
      if (totalPages > 1) {
        for (let i = 0; i < totalPages; i++) {
          this.thikTablePages.push(i + 1);
        }
      }
    }
    if (type == 'OP') {
      this.opTablePages = [];
      const totalPages = Math.ceil(totalData.length / this.pageSize);
      if (totalPages > 1) {
        for (let i = 0; i < totalPages; i++) {
          this.opTablePages.push(i + 1);
        }
      }
    }
    if (type == 'FT') {
      this.ftTablePages = [];
      const totalPages = Math.ceil(totalData.length / this.pageSize);
      if (totalPages > 1) {
        for (let i = 0; i < totalPages; i++) {
          this.ftTablePages.push(i + 1);
        }
      }
    }
    if (type == 'UT') {
      this.utTablePages = [];
      const totalPages = Math.ceil(totalData.length / this.pageSize);
      if (totalPages > 1) {
        for (let i = 0; i < totalPages; i++) {
          this.utTablePages.push(i + 1);
        }
      }
    }
    if (type == 'IR') {
      this.irTablePages = [];
      const totalPages = Math.ceil(totalData.length / this.pageSize);
      if (totalPages > 1) {
        for (let i = 0; i < totalPages; i++) {
          this.irTablePages.push(i + 1);
        }
      }
    }
  }

  setPaginationData(totalData, type) {
    if (type == 'OR') {
      var startIndex: number = this.currentORPage * this.pageSize - this.pageSize;
    }
    if (type == 'TH') {
      var startIndex: number = this.currentThickPage * this.pageSize - this.pageSize;
    }
    if (type == 'OP') {
      var startIndex: number = this.currentOpPage * this.pageSize - this.pageSize;
    }
    if (type == 'FT') {
      var startIndex: number = this.currentFTPage * this.pageSize - this.pageSize;
    }
    if (type == 'UT') {
      var startIndex: number = this.currentUTPage * this.pageSize - this.pageSize;
    }
    if (type == 'IR') {
      var startIndex: number = this.currentIRPage * this.pageSize - this.pageSize;
    }
    var endIndex: any = startIndex + this.pageSize;
    var temp: any = [];
    totalData.forEach((data, key) => {
      if (parseInt(key) >= startIndex && parseInt(key) < endIndex) {
        temp.push(data);
      }
    });
    return temp;
  }

  handlePageChange(goPage: number, type) {
    if (type == 'OR') {
      this.currentORPage = goPage;
      if (this.showCompleteOverdue) {
        this.followupOverDueRecallInCMP = this.followupOverDueRecall;
      } else {
        this.followupOverDueRecallInCMP = this.followupOverDueRecall.filter(
          p => p.is_complete != true,
        );
      }
      this.followupOverDueRecallInCMP = this.setPaginationData(
        this.followupOverDueRecallInCMP,
        type,
      );
    }
    if (type == 'TH') {
      this.currentThickPage = goPage;
      if (this.showCompleteTick) {
        this.followupTickFollowupsInCMP = this.followupTickFollowups;
      } else {
        this.followupTickFollowupsInCMP = this.followupTickFollowups.filter(
          p => p.is_complete != true,
        );
      }
      this.followupTickFollowupsInCMP = this.setPaginationData(
        this.followupTickFollowupsInCMP,
        'TH',
      );
    }
    if (type == 'OP') {
      this.currentOpPage = goPage;
      if (this.postopCallsPostOp == true) {
        this.followupPostOpCallsInComp = this.followupPostOpCalls;
      } else {
        this.followupPostOpCallsInComp = this.followupPostOpCalls.filter(
          p => p.is_complete != true,
        );
      }
      this.followupPostOpCallsInComp = this.setPaginationData(this.followupPostOpCallsInComp, 'OP');
    }
    if (type == 'FT') {
      this.currentFTPage = goPage;
      if (this.showCompleteFta == true) {
        this.followupFtaFollowupsInCMP = this.followupFtaFollowups;
      } else {
        this.followupFtaFollowupsInCMP = this.followupFtaFollowups.filter(
          p => p.is_complete != true,
        );
      }
      this.followupFtaFollowupsInCMP = this.setPaginationData(this.followupFtaFollowupsInCMP, 'FT');
    }
    if (type == 'UT') {
      this.currentUTPage = goPage;
      if (this.showCompleteUta == true) {
        this.followupUtaFollowupsInCMP = this.followupUtaFollowups;
      } else {
        this.followupUtaFollowupsInCMP = this.followupUtaFollowups.filter(
          p => p.is_complete != true,
        );
      }
      this.followupUtaFollowupsInCMP = this.setPaginationData(this.followupUtaFollowupsInCMP, 'UT');
    }
    if (type == 'IR') {
      this.currentIRPage = goPage;
      if (this.showCompleteReferrals == true) {
        this.internalReferralRecallInCMP = this.internalReferrals;
      } else {
        this.internalReferralRecallInCMP = this.internalReferrals.filter(
          p => p.is_complete != true,
        );
      }
      this.internalReferralRecallInCMP = this.setPaginationData(
        this.internalReferralRecallInCMP,
        'IR',
      );
    }
  }

  setDate(type) {
    // let todaysDate = new Date('01' + this.selectedMonthYear);
    let todaysDate = new Date(this.selectedMonthYear);
    // let selectedDate = new Date('01' + this.selectedMonthYear);
    let selectedDate = new Date(this.selectedMonthYear);
    if (type == 'add') {
      selectedDate.setMonth(todaysDate.getMonth() + 1);
    } else {
      selectedDate.setMonth(todaysDate.getMonth() - 1);
    }
    this.selectedMonthYear = this.datepipe
      .transform(selectedDate, 'yyyy-MM-dd 00:00:00')
      .replace(/\s/, 'T');
    this.refreshPerformanceTab();
  }

  getChartsTips() {
    this.chartstipsService.getCharts(7, this.clinic_id).subscribe(
      data => {
        this.charTips = data.data;
      },
      error => {},
    );
  }

  formatHistory(history) {
    let html = '<table class="history">';
    let statusSpe = {
      'Did not want to book': 'Didn’t want to book',
      'Cant be reached': "Can't be reached",
      'Cant be reached - left': "Can't be reached - left voicemail",
    };
    history.forEach(tip => {
      let date = this.datepipe.transform(new Date(tip.followup_date), 'MMM dd, yyyy');
      if (typeof statusSpe[tip.status] != 'undefined') {
        html +=
          '<tr><td width="28%">' + date + ':</td><td> ' + statusSpe[tip.status] + '</td></tr>';
      } else {
        html += '<tr><td width="28%">' + date + ':</td><td> ' + tip.status + '</td></tr>';
      }
      if (tip.notes && tip.notes != '' && tip.notes != 'null') {
        html += '<tr><td  class="notes" width="28%">Notes:</td><td> ' + tip.notes + '</td></tr>';
      }
    });
    html += '</table>';
    return { title: 'Previous Followups', info: html };
  }

  historyPos(event) {
    let x = event.clientX;
    let y = parseInt(event.clientY);
    setTimeout(function () {
      let divLnt = $('.custom-tooltip').height() + 40;
      let divwd = $('.custom-tooltip').width() - 5;
      $('.custom-tooltip').css({ top: y - divLnt, left: x - divwd });
    }, 100);
  }

  historyPosChips(event, colour) {
    $('.custom-tooltip').css({ visibility: 'hidden', opacity: '1' });
    let x = event.clientX;
    let y = parseInt(event.clientY);
    setTimeout(function () {
      let textLength = $('.tooltip-info-text').text().length;
      if (textLength >= 100) {
        $('.custom-tooltip').css({ width: 650 });
      } else if (textLength >= 75) {
        $('.custom-tooltip').css({ width: 550 });
      }
      $('.tooltip-container').addClass('mat-' + colour);
      $('.custom-tooltip').css({
        top: y + 20,
        left: x - 200,
        visibility: 'visible',
        opacity: '1',
      });
    }, 100);
  }

  refreshDataAuto() {
    this.getFollowupPostOpCalls();
    this.getOverdueRecalls();
    this.getinternalReferrals();
    this.getTickFollowups();
    this.getFtaFollowups();
    this.getUtaFollowups();
  }
}
