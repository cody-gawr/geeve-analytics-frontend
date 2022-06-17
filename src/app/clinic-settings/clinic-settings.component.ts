import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormControl, Validators } from "@angular/forms";
import { ClinicSettingsService } from "./clinic-settings.service";
import { ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ITooltipData } from "../shared/tooltip/tooltip.directive";
import { AppConstants } from "../app.constants";
import { environment } from "../../environments/environment";
import { validateBasis } from "@angular/flex-layout";
@Component({
  selector: "app-formlayout",
  templateUrl: "./clinic-settings.component.html",
  styleUrls: ["./clinic-settings.component.scss"],
})
/**
 *Clinic Setting main Component
 *AUTHOR - Teq Mavens
 */
export class ClinicSettingsComponent implements OnInit {
  public apiUrl = environment.apiUrl;
  public fileToUpload;
  public form: FormGroup;
  public errorLogin = false;
  public clinic_id: any = {};
  private warningMessage: string;
  public id: any = {};
  public clinicName: any = 0;
  public contactName = 0;
  public phoneNo = 0;
  public clinicEmail = "";
  public ftaUta: any = "";
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

  public facebook: string = "";
  public twitter: string = "";
  public linkedin: string = "";
  public instagram: string = "";
  public logo: any = "";

  // public chartData: any[] = [];
  public address: any = {};
  public timezone: any = "";
  public post_op_calls: any = "";
  public subtracted_accounts: any = "";
  public practice_size: any = {};
  options: FormGroup;
  public xero_link;
  public myob_link;
  public xeroConnect = false;
  public xeroOrganization = "";
  public myobConnect = false;
  public myobOrganization = "";
  public equipmentList: boolean = true;
  public dailyTasks: boolean = true;
  public compareMode: boolean = true;

  public postOpEnable: boolean = true;
  public tickEnable: boolean = true;
  public recallEnable: boolean = true;
  public ftaEnable: boolean = true;
  public userPlan: any = "lite";
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
  constructor(
    private toastr: ToastrService,
    private _cookieService: CookieService,
    private fb: FormBuilder,
    private clinicSettingsService: ClinicSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    public constants: AppConstants
  ) {
    this.userType = this._cookieService.get("user_type");
    this.options = fb.group({
      hideRequired: false,
      floatLabel: "auto",
    });
  }
  //initilaize component
  ngOnInit() {
    let regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    this.route.params.subscribe((params) => {
      this.id = this.route.snapshot.paramMap.get("id");
      this.getClinicSettings();
      this.getClinicFollowUPSettings();
      $("#title").html("Clinic Settings");
      $(".external_clinic").show();
      //$('.dentist_dropdown').hide();
      $(".header_filters").addClass("flex_direct_mar");
      this.checkXeroStatus();
      this.checkMyobStatus();
      this.getFollowUpSettings();
    });
    
    if(this.apiUrl.includes('test') || this.apiUrl.includes('staging-')){
      this.form = this.fb.group({
        clinicName: [null, Validators.compose([Validators.required])],
        contactName: [null],
        phoneNo: [null,[Validators.pattern(regex)]],
        clinicEmail: [null, [Validators.email,Validators.required]],
        address: [null],
        timezone: [null],
        // practice_size: [null, Validators.compose([Validators.required])],
        post_op_calls: [null],
        subtracted_accounts: [null],
        fta_uta: [null, Validators.compose([Validators.required])],
        post_op_calls_days: [null, Validators.compose([Validators.required])],
        recall_weeks: [null, Validators.compose([Validators.required])],
        tick_days: [null, Validators.compose([Validators.required])],
        fta_followup_days: [null, Validators.compose([Validators.required])],
        uta_followup_days: [null, Validators.compose([Validators.required])],
        fta_followup_days_later: [null, Validators.compose([Validators.required])],
        uta_followup_days_later: [null, Validators.compose([Validators.required])],
        referral_weeks: [null, Validators.compose([Validators.required])],
        // unscheduled_patients_days: [null, Validators.compose([Validators.required])],
        // facebook: [null],
        // twitter: [null],
        // linkedin: [null],
        // instagram: [null],
      });
    }else{
      this.form = this.fb.group({
        clinicName: [null, Validators.compose([Validators.required])],
        contactName: [null],
        phoneNo: [null],
        clinicEmail: [null, [Validators.email]],
        address: [null],
        timezone: [null],
        // practice_size: [null, Validators.compose([Validators.required])],
        post_op_calls: [null],
        subtracted_accounts: [null],
        fta_uta: [null, Validators.compose([Validators.required])],
        post_op_calls_days: [null, Validators.compose([Validators.required])],
        recall_weeks: [null, Validators.compose([Validators.required])],
        tick_days: [null, Validators.compose([Validators.required])],
        fta_followup_days: [null, Validators.compose([Validators.required])],
        uta_followup_days: [null, Validators.compose([Validators.required])],
        fta_followup_days_later: [null, Validators.compose([Validators.required])],
        uta_followup_days_later: [null, Validators.compose([Validators.required])],
      //  referral_weeks: [null, Validators.compose([Validators.required])],
        // unscheduled_patients_days: [null, Validators.compose([Validators.required])],
        // facebook: [null],
        // twitter: [null],
        // linkedin: [null],
        // instagram: [null],
      });
    }
    

    this.userPlan = this._cookieService.get("user_plan");
  }

  // For form validator
  email = new FormControl("", [Validators.required, Validators.email]);

  // Sufix and prefix
  hide = true;

  getErrorMessage() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
        ? "Not a valid email"
        : "";
  }
  //get setting for teh selcted clinic
  getClinicSettings() {
    this.clinicSettingsService.getClinicSettings(this.id).subscribe(
      (res) => {
        if (res.message == "success") {
          this.clinicSettingsService.setClinicData(res.data[0]);
          this.clinicName = res.data[0].clinicName;
          this.contactName = res.data[0].contactName;
          this.address = res.data[0].address;
          this.practice_size = res.data[0].practice_size;
          this.subtracted_accounts = res.data[0].net_profit_exclusions;
          this.phoneNo = res.data[0].phoneNo;
          this.clinicEmail = res.data[0].clinicEmail;
          this.ftaUta = res.data[0].fta_uta;
          this.timezone = res.data[0].timezone;
          this.equipmentList =
            res.data[0].equip_list_enable == 1 ? true : false;
          this.dailyTasks = res.data[0].daily_task_enable == 1 ? true : false;
          this.compareMode = res.data[0].compare_mode == 1 ? true : false;

          // this.postOpCallsMh = res.data[0].post_op_days;
          // this.post_op_calls = res.data[0].post_op_calls;
          // this.tickDays = res.data[0].tick_days;
          // this.recallWeeks = res.data[0].recall_weeks;
          // this.ftaFollowupDays = res.data[0].fta_followup_days;
          // this.postOpEnable = res.data[0].post_op_enable == 1 ? true : false;
          // this.tickEnable = res.data[0].tick_enable == 1 ? true : false;
          // this.recallEnable = res.data[0].recall_enable == 1 ? true : false;
          // this.ftaEnable = res.data[0].fta_enable == 1 ? true : false;
          // this.utaEnable = res.data[0].uta_enable == 1 ? true : false;

          if (this.ftaUta == "") this.ftaUta = "status";

          if (res.data[0].days != null && res.data[0].days != 0) {
            this.workingDays = JSON.parse(res.data[0].days);
          }
        } else if (res.status == "401") {
          this._cookieService.put("username", "");
          this._cookieService.put("email", "");
          this._cookieService.put("userid", "");
          this.router.navigateByUrl("/login");
        }
      },
      (error) => {
        if (error.status == 401) {
          this._cookieService.removeAll();
          this.router.navigateByUrl("/login");
        }
       // this.warningMessage = "Please Provide Valid Inputs!";
      }
    );
  }

  getClinicFollowUPSettings() {
    this.clinicSettingsService.getClinicFollowUPSettings(this.id).subscribe(
      (res) => {

        
        if (res.message == "success") {
          this.postOpEnable = res.data.post_op_enable == 1 ? true : false;
          this.tickEnable = res.data.tick_enable == 1 ? true : false;
          this.recallEnable = res.data.recall_enable == 1 ? true : false;
          this.ftaEnable = res.data.fta_enable == 1 ? true : false;
          this.utaEnable = res.data.uta_enable == 1 ? true : false;
          this.internalReferralEnable = res.data.referral_enable == 1 ? true : false;
        }
      },
      (error) => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }
    );
  }

  getFollowUpSettings() {
    this.clinicSettingsService
      .getFollowUpSettings(this.id)
      .subscribe(
        (res) => {
          if (res.message == "success") {
            if (res.data) {
              this.ftaFollowupDays = res.data.fta_followup_days;
              this.utaFollowupDays = res.data.uta_followup_days;
              this.ftaFollowupDaysLater = res.data.fta_days_later;
              this.utaFollowupDaysLater = res.data.uta_days_later;
              this.postOpCallsMh = res.data.post_op_days;
              this.post_op_calls = res.data.post_op_calls;
              this.tickDays = res.data.tick_days;
              this.recallWeeks = res.data.recall_weeks;
              this.referralWeeks = res.data.referral_weeks;
            }
          }
        },
        (error) => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }
      );
  }
  //save clinic settings
  onSubmit() {
    $(".ajax-loader").show();
    this.clinicName = this.form.value.clinicName;
    this.address = this.form.value.address;
    this.contactName = this.form.value.contactName;
    let days = JSON.stringify(this.workingDays);
    this.post_op_calls = this.form.value.post_op_calls;
    this.subtracted_accounts = this.form.value.subtracted_accounts;
    this.phoneNo = this.form.value.phoneNo;
    this.clinicEmail = this.form.value.clinicEmail;
    this.ftaUta = this.form.value.fta_uta;
    this.postOpCallsMh = this.form.value.post_op_calls_days;
    this.recallWeeks = this.form.value.recall_weeks;
    if(this.apiUrl.includes('test') || this.apiUrl.includes('staging-')){
      this.referralWeeks = this.form.value.referral_weeks;
    }else{
      this.referralWeeks = 0;
    }
    this.tickDays = this.form.value.tick_days;
    this.ftaFollowupDays = this.form.value.fta_followup_days;
    this.utaFollowupDays = this.form.value.uta_followup_days;
    this.ftaFollowupDaysLater = this.form.value.fta_followup_days_later;
    this.utaFollowupDaysLater = this.form.value.uta_followup_days_later;
    this.timezone = this.form.value.timezone;

    this.clinicSettingsService
      .updateClinicSettings(
        this.id,
        this.clinicName,
        this.address,
        this.contactName,
        days,        
        this.phoneNo,
        this.clinicEmail,
        this.ftaUta,        
        this.timezone,
        this.subtracted_accounts,
        this.equipmentList,
        this.dailyTasks,
        this.compareMode
      )
      .subscribe(
        (res) => {
          $(".ajax-loader").hide();
          if (res.message == "success") {
            this.toastr.success("Clinic Settings Updated");
          } else if (res.status == "401") {
            this._cookieService.put("username", "");
            this._cookieService.put("email", "");
            this._cookieService.put("userid", "");
            this.router.navigateByUrl("/login");
          }
        },
        (error) => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }
      );

    this.clinicSettingsService
      .updateFollowUpSettings(
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
      )
      .subscribe(
        (res) => {
          $(".ajax-loader").hide();
          if (res.message == "success") {
            this.toastr.success("Clinic Settings Updated");
          } else if (res.status == "401") {
            this._cookieService.put("username", "");
            this._cookieService.put("email", "");
            this._cookieService.put("userid", "");
            this.router.navigateByUrl("/login");
          }
        },
        (error) => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }
      );
  }
  //get xero authorization link
  getXeroLink() {
    this.clinicSettingsService.getXeroLink(this.id).subscribe(
      (res) => {
        if (res.message == "success") {
          this.xero_link = res.data;
        } else if (res.status == "401") {
          this._cookieService.put("username", "");
          this._cookieService.put("email", "");
          this._cookieService.put("userid", "");
          this.router.navigateByUrl("/login");
        }
      },
      (error) => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }
    );
  }
  //get myob authorization link
  getMyobLink() {
    this.clinicSettingsService.getMyobLink(this.id).subscribe(
      (res) => {
        if (res.message == "success") {
          this.myob_link = res.data;
        } else if (res.status == "401") {
          this._cookieService.put("username", "");
          this._cookieService.put("email", "");
          this._cookieService.put("userid", "");
          this.router.navigateByUrl("/login");
        }
      },
      (error) => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }
    );
  }
  //create xero connection model
  public openXero() {
    var success;

    var win = window.open(this.xero_link, "MsgWindow", "width=400,height=400");
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

    var win = window.open(this.myob_link, "MsgWindow", "width=400,height=400");
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
    this.clinicSettingsService.checkXeroStatus(this.id).subscribe(
      (res) => {
        if (res.message == "success") {
          if (res.data.xero_connect == 1) {
            this.xeroConnect = true;
            this.xeroOrganization = res.data.Name;
          } else {
            this.xeroConnect = false;
            this.xeroOrganization = "";
            this.getXeroLink();
            //this.disconnectXero();
          }
        } else {
          this.xeroConnect = false;
          this.xeroOrganization = "";
          this.getXeroLink();
          //this.disconnectXero();
        }
      },
      (error) => {
        this.getXeroLink();
        this.warningMessage = "Please Provide Valid Inputs!";
      }
    );
  }
  //check status of myob connection
  public checkMyobStatus() {
    this.clinicSettingsService.checkMyobStatus(this.id).subscribe(
      (res) => {
        if (res.message == "success") {
          if (res.data.myob_connect == 1) {
            this.myobConnect = true;
            this.myobOrganization = res.data.Name;
            //alert(this.myobOrganization);
          } else {
            this.myobConnect = false;
            this.myobOrganization = "";
            this.getMyobLink();
            //this.disconnectMyob();
          }
        } else {
          this.getMyobLink();
          this.myobConnect = false;
          this.myobOrganization = "";
          //this.disconnectMyob();
        }
      },
      (error) => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }
    );
  }
  //disconnect xero connection
  public disconnectXero() {
    this.clinicSettingsService.clearSession(this.id).subscribe(
      (res) => {
        if (res.message == "success") {
          this.xeroConnect = false;
          this.xeroOrganization = "";
          this.getXeroLink();
        } else {
          this.xeroConnect = true;
        }
      },
      (error) => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }
    );
  }
  //disconnect myob connection
  public disconnectMyob() {
    this.clinicSettingsService.clearSessionMyob(this.id).subscribe(
      (res) => {
        if (res.message == "success") {
          this.myobConnect = false;
          this.myobOrganization = "";
          this.getMyobLink();
        } else {
          this.myobConnect = true;
        }
      },
      (error) => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }
    );
  }
  public toggle(event) {
    if (event.source.name == "sunday") {
      this.workingDays.sunday = event.checked;
    } else if (event.source.name == "monday") {
      this.workingDays.monday = event.checked;
    } else if (event.source.name == "tuesday") {
      this.workingDays.tuesday = event.checked;
    } else if (event.source.name == "wednesday") {
      this.workingDays.wednesday = event.checked;
    } else if (event.source.name == "thursday") {
      this.workingDays.thursday = event.checked;
    } else if (event.source.name == "friday") {
      this.workingDays.friday = event.checked;
    } else if (event.source.name == "saturday") {
      this.workingDays.saturday = event.checked;
    }
    this.onSubmit();
  }

  public toggleMH(event, type) {
    if (type == "Equipment") {
      this.equipmentList = event.checked;
    } else if (type == "Daily") {
      this.dailyTasks = event.checked;
    } else if (type == "CompareMode") {
      this.compareMode = event.checked;
    }
    this.onSubmit();
  }

  toggleFlw(event, type) {
    let column = "";
    if (type == "postOp") {
      this.postOpEnable = event.checked;
      column = "post_op_enable";
    } else if (type == "tick") {
      this.tickEnable = event.checked;
      column = "tick_enable";
    } else if (type == "recall") {
      this.recallEnable = event.checked;
      column = "recall_enable";
    } else if (type == "fta") {
      this.ftaEnable = event.checked;
      column = "fta_enable";
    } else if (type == "uta") {
      this.utaEnable = event.checked;
      column = "uta_enable";
    }else if (type == "internalReferral") {
      this.internalReferralEnable = event.checked;
      column = "referral_enable";
    }
    var active = event.checked == true ? 1 : 0;
    this.clinicSettingsService
      .updatePartialClinicSetting(this.id, active, column)
      .subscribe(
        (res) => {
          if (res.message == "success") {
            this.toastr.success("Followups Settings Updated");
          }
        },
        (error) => { }
      );
  }
}
