import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ClinicSettingsService } from './clinic-settings.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from '../app.constants';
import { environment } from '../../environments/environment';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ReviewMsgTemplateDialog } from './review-msg-template-dialog/review-msg-template-dialog.component';
import { LocalStorageService } from '../shared/local-storage.service';
import Swal from 'sweetalert2';
import { IClinic } from '../clinic';
import { forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { StripePaymentDialog } from '../shared/stripe-payment-modal/stripe-payment-modal.component';

export interface ReviewMsgTemplateObject {
  id?: number;
  name: string;
  msg_template: string;
  type: string;
}

@Component({
  selector: 'app-formlayout',
  templateUrl: './clinic-settings.component.html',
  styleUrls: ['./clinic-settings.component.scss'],
})
/**
 *Clinic Setting main Component
 *AUTHOR - Teq Mavens
 */
export class ClinicSettingsComponent implements OnInit {
  public apiUrl = environment.apiUrl;
  public fileToUpload;
  public form: UntypedFormGroup;
  public errorLogin = false;
  public clinic_id: any = {};
  private warningMessage: string;
  public id: any = {};
  public selectedClinicData: IClinic;
  public clinicName: any = 0;
  public contactName = 0;
  public ftaUta: any = '';
  public postOpCallsMh: any = 1;
  public unscheduledPatientsMh: any = 0;
  public recallWeeks: any = 0;
  public referralWeeks: any = 0;
  public tickDays: any = 0;
  public ftaFollowupDays: any = 0;
  public utaFollowupDays: any = 0;
  public ftaFollowupDaysLater: any = 0;
  public utaFollowupDaysLater: any = 0;

  public ftaUtaStatus: boolean = true;
  public ftaUtaItem: boolean = false;

  public facebook: string = '';
  public twitter: string = '';
  public linkedin: string = '';
  public instagram: string = '';
  public logo: any = '';

  // public chartData: any[] = [];
  public address: any = {};
  public timezone: any = '';
  public post_op_calls: any = '';
  public subtracted_accounts: any = '';
  public practice_size: any = {};
  options: UntypedFormGroup;
  public xero_link;
  public myob_link;
  public xeroConnect = false;
  public xeroOrganization = '';
  public myobConnect = false;
  public myobOrganization = '';
  public equipmentList: boolean = true;
  public dailyTasks: boolean = true;
  public compareMode: boolean = true;

  public postOpEnable: boolean = true;
  public tickEnable: boolean = true;
  public recallEnable: boolean = true;
  public ftaEnable: boolean = true;
  public userPlan: any = 'lite';
  public utaEnable: boolean = true;
  public internalReferralEnable: boolean = true;
  public userType;
  public workingDays: any = {
    sunday: false,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
  };

  displayedColumns = ['name', 'msg_template', 'type', 'action'];
  reviewMsgTemplates = [];
  isSMSEnabled = false;

  public get isExactOrCore(): boolean {
    return this.localStorageService.isEachClinicPmsExactOrCore(this.id);
  }
  public get isExact(): boolean {
    return this.localStorageService.isEachClinicExact(this.id);
  }
  public get isExactOrPraktikaOrCore(): boolean {
    return this.localStorageService.isEachClinicExactOrCoreOrPraktika(this.id);
  }
  public get isD4w(): boolean {
    return this.localStorageService.isEachClinicPmsD4w(this.id);
  }
  remainCredits = 0;
  costPerSMS = 0.0;
  constructor(
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private _cookieService: CookieService,
    private fb: UntypedFormBuilder,
    private clinicSettingsService: ClinicSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    public constants: AppConstants,
    public dialog: MatDialog,
  ) {
    this.userType = this._cookieService.get('user_type');
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

    if (this.apiUrl.includes('test') || this.apiUrl.includes('staging-')) {
      this.form = this.fb.group({
        clinicName: [
          null,
          Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
        ],
        contactName: [null],
        address: [null],
        timezone: [null],
        post_op_calls: [null],
        subtracted_accounts: [null],
        fta_uta: [null],
        post_op_calls_days: [null, Validators.compose([Validators.required])],
        recall_weeks: [null, Validators.compose([Validators.required])],
        tick_days: [null, Validators.compose([Validators.required])],
        fta_followup_days: [null, Validators.compose([Validators.required])],
        uta_followup_days: [null],
        fta_followup_days_later: [null, Validators.compose([Validators.required])],
        uta_followup_days_later: [null],
        referral_weeks: [null, Validators.compose([Validators.required])],
      });
    } else {
      this.form = this.fb.group({
        clinicName: [null, Validators.compose([Validators.required])],
        contactName: [null],
        address: [null],
        timezone: [null],
        post_op_calls: [null],
        subtracted_accounts: [null],
        fta_uta: [null],
        post_op_calls_days: [null, Validators.compose([Validators.required])],
        recall_weeks: [null, Validators.compose([Validators.required])],
        tick_days: [null, Validators.compose([Validators.required])],
        fta_followup_days: [null, Validators.compose([Validators.required])],
        // uta_followup_days: this.isExactOrPraktikaOrCore
        //   ? null
        //   : [null, Validators.compose([Validators.required])],
        uta_followup_days: [null],
        fta_followup_days_later: [null, Validators.compose([Validators.required])],
        // uta_followup_days_later: this.isExactOrPraktikaOrCore
        //   ? null
        //   : [null, Validators.compose([Validators.required])],
        uta_followup_days_later: [null],
      });
    }

    this.userPlan = this._cookieService.get('user_plan');

    this.route.params.subscribe(params => {
      this.id = this.route.snapshot.paramMap.get('id');
      this.selectedClinicData = this.localStorageService.getClinicData(this.id);
      this.getClinicSettings();
      this.getClinicFollowUPSettings();

      this.checkXeroStatus();
      this.checkMyobStatus();

      this.clinicSettingsService.getCreditData(this.id).subscribe(v => {
        this.remainCredits = v.data.remain_credits;
        this.costPerSMS = v.data.cost_per_sms;
      });
    });
  }

  ngAfterViewInit() {
    $('#title').html('Clinic Settings');
    $('.external_clinic').show();
    //$('.dentist_dropdown').hide();
    $('.header_filters').addClass('flex_direct_mar');
  }

  //initilaize component
  ngOnInit() {}

  // For form validator
  email = new UntypedFormControl('', [Validators.required, Validators.email]);

  // Sufix and prefix
  //hide = true;
  openTopUpCredits() {
    const stripePaymentDialog = this.dialog.open(StripePaymentDialog, {
      data: { costPerSMS: this.costPerSMS, clinic_id: this.id },
    });
  }

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  //get setting for teh selcted clinic
  getClinicSettings() {
    this.clinicSettingsService.getClinicSettings(this.id).subscribe({
      next: v => {
        //if (res.status == 200) {
        this.clinicSettingsService.setClinicData(v.httpRes);
        this.clinicName = v.data[0].clinicName;
        this.contactName = v.data[0].contactName;
        this.address = v.data[0].address;
        this.practice_size = v.data[0].practice_size;
        this.subtracted_accounts =
          v.data[0].net_profit_exclusions === 'null' ? '' : v.data[0].net_profit_exclusions;
        this.ftaUta = v.data[0].fta_uta;
        this.timezone = v.data[0].timezone;
        this.equipmentList = v.data[0].equip_list_enable == 1 ? true : false;
        this.dailyTasks = v.data[0].daily_task_enable == 1 ? true : false;
        this.compareMode = v.data[0].compare_mode == 1 ? true : false;

        if (this.ftaUta == '') this.ftaUta = 'status';

        if (v.data[0].days != null && v.data[0].days != 0) {
          this.workingDays = JSON.parse(v.data[0].days);
        }
      },
      error: error => {
        if (error.status == 401) {
          this._cookieService.removeAll();
          this.router.navigateByUrl('/login');
        }
        // this.warningMessage = "Please Provide Valid Inputs!";
      },
    });
  }

  getClinicFollowUPSettings() {
    this.clinicSettingsService.getClinicFollowUPSettings(this.id).subscribe({
      next: v => {
        this.clinicSettingsService.setClincsSetting(v.httpRes);
        this.postOpEnable = v.data.post_op_enable == 1 ? true : false;
        this.tickEnable = v.data.tick_enable == 1 ? true : false;
        this.recallEnable = v.data.recall_enable == 1 ? true : false;
        this.ftaEnable = v.data.fta_enable == 1 ? true : false;
        this.utaEnable = v.data.uta_enable == 1 ? true : false;
        this.internalReferralEnable = v.data.referral_enable == 1 ? true : false;
        this.ftaFollowupDays = v.data.fta_followup_days;
        this.utaFollowupDays = v.data.uta_followup_days;
        this.ftaFollowupDaysLater = v.data.fta_days_later;
        this.utaFollowupDaysLater = v.data.uta_days_later;
        this.postOpCallsMh = v.data.post_op_days;
        this.post_op_calls = v.data.post_op_calls;
        this.tickDays = v.data.tick_days;
        this.recallWeeks = v.data.recall_weeks;
        this.referralWeeks = v.data.referral_weeks;
        this.isSMSEnabled =
          !!v.data.sms_enabled && parseInt(this.userType) != 4 && parseInt(this.userType) != 7;
        if (this.isSMSEnabled) {
          this.getReviewMsgTemplates();
          this.getSocialLinks();
        }
      },
      error: error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
    });
  }

  getFollowUpSettings() {
    this.clinicSettingsService.getFollowUpSettings(this.id).subscribe({
      next: res => {
        if (res.status == 200) {
          if (res.body.data) {
            this.ftaFollowupDays = res.body.data.fta_followup_days;
            this.utaFollowupDays = res.body.data.uta_followup_days;
            this.ftaFollowupDaysLater = res.body.data.fta_days_later;
            this.utaFollowupDaysLater = res.body.data.uta_days_later;
            this.postOpCallsMh = res.body.data.post_op_days;
            this.post_op_calls = res.body.data.post_op_calls;
            this.tickDays = res.body.data.tick_days;
            this.recallWeeks = res.body.data.recall_weeks;
            this.referralWeeks = res.body.data.referral_weeks;
          }
        }
      },
      error: error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
    });
  }
  saveBaseSettings() {
    this.clinicName = this.form.value.clinicName;
    this.address = this.form.value.address;
    this.contactName = this.form.value.contactName;
    let days = JSON.stringify(this.workingDays);
    this.subtracted_accounts = this.form.value.subtracted_accounts;
    this.ftaUta = this.form.value.fta_uta;
    this.timezone = this.form.value.timezone;

    return this.clinicSettingsService.updateClinicSettings(
      this.id,
      this.clinicName,
      this.address,
      this.contactName,
      days,
      this.ftaUta,
      this.timezone,
      this.subtracted_accounts,
      this.compareMode,
    );
  }

  onSaveBaseSettings() {
    $('.ajax-loader').show();
    this.saveBaseSettings().subscribe({
      next: res => {
        if (res.status == 200) {
          this.toastr.success('Clinic Settings Updated');
        }
      },
      error: (error: HttpErrorResponse) => {
        $('.ajax-loader').hide();
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
      complete: () => {
        $('.ajax-loader').hide();
      },
    });
  }

  saveExtraSettings() {
    this.post_op_calls = this.form.value.post_op_calls;
    this.postOpCallsMh = this.form.value.post_op_calls_days;
    this.recallWeeks = this.form.value.recall_weeks;
    if (this.apiUrl.includes('test') || this.apiUrl.includes('staging-')) {
      this.referralWeeks = this.form.value.referral_weeks;
    } else {
      this.referralWeeks = 0;
    }
    this.tickDays = this.form.value.tick_days;
    this.ftaFollowupDays = this.form.value.fta_followup_days;
    this.utaFollowupDays = this.form.value.uta_followup_days;
    this.ftaFollowupDaysLater = this.form.value.fta_followup_days_later;
    this.utaFollowupDaysLater = this.form.value.uta_followup_days_later;

    return this.clinicSettingsService.updateFollowUpSettings(
      this.id,
      this.post_op_calls,
      this.tickDays,
      this.postOpCallsMh,
      this.recallWeeks,
      this.ftaFollowupDays,
      this.utaFollowupDays,
      this.utaFollowupDaysLater,
      this.ftaFollowupDaysLater,
      this.referralWeeks,
      this.compareMode,
    );
  }

  onSaveExtraSettings() {
    $('.ajax-loader').show();
    this.saveExtraSettings().subscribe({
      next: res => {
        if (res.status == 200) {
          this.toastr.success('Clinic Settings Updated');
        }
      },
      error: (error: HttpErrorResponse) => {
        $('.ajax-loader').hide();
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
      complete: () => {
        $('.ajax-loader').hide();
      },
    });
  }
  //save clinic settings
  onSubmit(onlyClinicUpdate = false) {
    $('.ajax-loader').show();
    let sources;
    if (onlyClinicUpdate) {
      sources = forkJoin([this.saveBaseSettings()]);
    } else {
      sources = forkJoin([this.saveBaseSettings(), this.saveExtraSettings()]);
    }

    sources.subscribe({
      next: ([r1, r2 = null]) => {
        if (r1 && r1.status == 200) {
          this.toastr.success('Clinic Base Settings Updated');
        }

        if (r2 && r2.status == 200) {
          this.toastr.success('Clinic Extra Settings Updated');
        }
      },
      error: ([e1, e2 = null]: HttpErrorResponse[]) => {
        $('.ajax-loader').hide();
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
      complete: () => {
        $('.ajax-loader').hide();
      },
    });
  }
  //get xero authorization link
  getXeroLink() {
    this.clinicSettingsService.getXeroLink(this.id).subscribe(
      res => {
        if (res.status == 200) {
          this.xero_link = res.body.data?.url;
        } else if (res.status == 401) {
          this._cookieService.put('username', '');
          this._cookieService.put('email', '');
          this._cookieService.put('userid', '');
          this.router.navigateByUrl('/login');
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
    );
  }
  //get myob authorization link
  getMyobLink() {
    this.clinicSettingsService.getMyobLink(this.id).subscribe(
      res => {
        if (res.status == 200) {
          console.log(`gtt: in getmyoblink, res.body: ${JSON.stringify(res.body)}`);
          this.myob_link = res.body.data;
        } else if (res.status == '401') {
          this._cookieService.put('username', '');
          this._cookieService.put('email', '');
          this._cookieService.put('userid', '');
          this.router.navigateByUrl('/login');
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
    );
  }
  //create xero connection model
  public openXero() {
    var success;

    var win = window.open(this.xero_link, 'MsgWindow', 'width=400,height=400');
    var self = this;
    var timer = setInterval(function () {
      if (win.closed) {
        self.checkXeroStatus();
        clearTimeout(timer);
      }
    }, 1000);
  }
  //create myob connection model
  public openMyob() {
    var success;
    console.log(`in openmyob, myob link: ${this.myob_link}`);
    var win = window.open(this.myob_link, 'MsgWindow', 'width=400,height=400');
    var self = this;
    var timer = setInterval(function () {
      if (win.closed) {
        self.checkMyobStatus();
        clearTimeout(timer);
      }
    }, 1000);
  }
  //check status of xero connection
  public checkXeroStatus() {
    this.clinicSettingsService.checkXeroStatus(this.id).subscribe({
      next: res => {
        if (res.body.success) {
          if (!res.body.data.error && res.body.data.tenantId) {
            this.xeroConnect = true;
            this.xeroOrganization = res.body.data.tenantName;
          } else {
            this.xeroConnect = false;
            this.xeroOrganization = '';
            this.getXeroLink();
            //this.disconnectXero();
          }
        } else {
          this.xeroConnect = false;
          this.xeroOrganization = '';
          this.getXeroLink();
          //this.disconnectXero();
        }
      },
      error: error => {
        this.getXeroLink();
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
    });
  }
  //check status of myob connection
  public checkMyobStatus() {
    this.clinicSettingsService.checkMyobStatus(this.id).subscribe(
      res => {
        if (res.body.message != 'error') {
          if (res.body.data.connectedWith == 'myob') {
            this.myobConnect = true;
            this.myobOrganization = res.body.data.name;
            //alert(this.myobOrganization);
          } else {
            this.myobConnect = false;
            this.myobOrganization = '';
            this.getMyobLink();
            //this.disconnectMyob();
          }
        } else {
          this.getMyobLink();
          this.myobConnect = false;
          this.myobOrganization = '';
          //this.disconnectMyob();
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
    );
  }
  //disconnect xero connection
  public disconnectXero() {
    this.clinicSettingsService.clearSession(this.id).subscribe({
      next: res => {
        if (res.status == 200) {
          this.xeroConnect = false;
          this.xeroOrganization = '';
          this.getXeroLink();
        } else {
          this.xeroConnect = true;
        }
      },
      error: error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
    });
  }
  //disconnect myob connection
  public disconnectMyob() {
    console.log(`in disconnect myob`);

    this.clinicSettingsService.clearSessionMyob(this.id).subscribe(
      res => {
        if (res.status == 200) {
          this.myobConnect = false;
          this.myobOrganization = '';
          this.getMyobLink();
        } else {
          this.myobConnect = true;
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
    );
  }
  public toggle(event) {
    if (event.source.name == 'sunday') {
      this.workingDays.sunday = event.checked;
    } else if (event.source.name == 'monday') {
      this.workingDays.monday = event.checked;
    } else if (event.source.name == 'tuesday') {
      this.workingDays.tuesday = event.checked;
    } else if (event.source.name == 'wednesday') {
      this.workingDays.wednesday = event.checked;
    } else if (event.source.name == 'thursday') {
      this.workingDays.thursday = event.checked;
    } else if (event.source.name == 'friday') {
      this.workingDays.friday = event.checked;
    } else if (event.source.name == 'saturday') {
      this.workingDays.saturday = event.checked;
    }
    this.onSaveBaseSettings();
  }

  public toggleMH(event, type) {
    if (type == 'Equipment') {
      this.equipmentList = event.checked;
    } else if (type == 'Daily') {
      this.dailyTasks = event.checked;
    } else if (type == 'CompareMode') {
      this.compareMode = event.checked;
    }
    this.onSaveExtraSettings();
  }

  toggleFlw(event, type) {
    let column = '';
    if (type == 'postOp') {
      this.postOpEnable = event.checked;
      column = 'post_op_enable';
    } else if (type == 'tick') {
      this.tickEnable = event.checked;
      column = 'tick_enable';
    } else if (type == 'recall') {
      this.recallEnable = event.checked;
      column = 'recall_enable';
    } else if (type == 'fta') {
      this.ftaEnable = event.checked;
      column = 'fta_enable';
    } else if (type == 'uta') {
      this.utaEnable = event.checked;
      column = 'uta_enable';
    } else if (type == 'internalReferral') {
      this.internalReferralEnable = event.checked;
      column = 'referral_enable';
    }
    var active = event.checked == true ? 1 : 0;
    this.clinicSettingsService.updatePartialClinicSetting(this.id, active, column).subscribe({
      next: res => {
        if (res.status == 200) {
          this.toastr.success('Followups Settings Updated');
        }
      },
      error: error => {},
    });
  }

  openMsgTemplateDialog(element: ReviewMsgTemplateObject = null) {
    const reviewMsgTempDialog = this.dialog.open(ReviewMsgTemplateDialog, {
      data: { element, clinic_id: this.id },
    });

    reviewMsgTempDialog.afterClosed().subscribe(result => {
      if (result.status) {
        this.getReviewMsgTemplates();
      }
    });
  }

  removeMsgTemplate(element: ReviewMsgTemplateObject) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this template?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.value) {
        this.clinicSettingsService.removeReviewMsgTemplate(element.id, this.id).subscribe({
          next: result => {
            this.toastr.success('Removed a template successfuly!');
            this.getReviewMsgTemplates();
          },
          error: error => {
            this.toastr.error(error.message);
          },
        });
      }
    });
  }

  private getReviewMsgTemplates() {
    this.reviewMsgTemplates = [];
    this.clinicSettingsService.getReviewMsgTemplateList(this.id).subscribe({
      next: v => {
        // if (res.status == 200) {
        if (v.data) {
          this.reviewMsgTemplates = v.data;
        }
        // } else if (res.status == 401) {
        //   this._cookieService.put('username', '');
        //   this._cookieService.put('email', '');
        //   this._cookieService.put('userid', '');
        //   this.router.navigateByUrl('/login');
        // }
      },
      error: error => {
        this.toastr.error(error.message);
      },
    });
  }

  facebookId = new UntypedFormControl('', Validators.required);
  googleId = new UntypedFormControl('', Validators.required);
  googleAuthUrl = '';
  googleConnected = false;

  getSocialLinks() {
    this.clinicSettingsService.getSocialLinks(this.id).subscribe({
      next: v => {
        if (v.data) {
          this.facebookId = new UntypedFormControl(v.data.facebook_id, Validators.required);
          this.googleId = new UntypedFormControl(v.data.google_id, Validators.required);
        }
        this.googleConnected = v.googleConnected;
      },
      error: e => {
        this.toastr.error(e.message);
      },
    });
  }

  linkGoogle() {
    this.clinicSettingsService.getGoogleAuthUrl(this.id).subscribe(
      result => {
        if (result.body.data) window.open(result.body.data);
        else {
          this.toastr.warning('Already Connected');
          this.googleConnected = true;
        }
      },
      error => {
        this.toastr.error(error.message);
      },
    );
  }

  saveSocialLinks() {
    this.clinicSettingsService
      .updateSocialLinks(this.id, this.facebookId.value, this.googleId.value)
      .subscribe(
        result => {
          this.facebookId = new UntypedFormControl(
            result.body.data.facebook_id,
            Validators.required,
          );
          this.googleId = new UntypedFormControl(result.body.data.google_id, Validators.required);
          this.toastr.success('Saved social infomation successfully!');
        },
        error => {
          this.toastr.error(error.message);
        },
      );
  }
}
