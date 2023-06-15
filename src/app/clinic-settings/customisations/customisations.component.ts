import {
  AfterViewInit,
  Inject,
  Component,
  Input,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { CustomisationsService } from "./customisations.service";
import { BaseComponent } from "../base/base.component";
import { environment } from "../../../environments/environment";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ClinicSettingsService } from "../clinic-settings.service";
import { AppConstants } from "../../app.constants";
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { HeaderService } from "../../layouts/full/header/header.service";

@Component({
  selector: 'app-dialog-setColors-dialog',
  templateUrl: './dialog-setColors.html',
  encapsulation: ViewEncapsulation.None
})

export class DialogSetColorsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogSetColorsDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private _cookieService: CookieService, 
    private CustomisationsService: CustomisationsService, 
    private router: Router
  ) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data) {
    if (data.status_code == '') {
      return false;
    }
  
    this.CustomisationsService.addStatusColors(data.clinic_id,data.status_code, data.bgcolour, data.colour ).subscribe((res) => {
      if (res.status == 200) {
        this.CustomisationsService.getStatusCodeList(data.clinic_id).subscribe((res) => {
          if (res.status == 200) {
            this.dialogRef.componentInstance.data.status_code = "";
            this.dialogRef.componentInstance.data.bgcolour = "";
            this.dialogRef.componentInstance.data.colour = "";
            this.dialogRef.componentInstance.data.statusCodeList = res.body.data;
          }
        });
        //this.dialogRef.close();
      } else if (res.status == 401) {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }

  removeItem(i) {
    
    let data = this.dialogRef.componentInstance.data.statusCodeList[i];
    if (data) {
      this.CustomisationsService.deleteStatusCode(data.clinic_id,data.status_code).subscribe((res) => {
        if (res.status == 200) {
          this.dialogRef.componentInstance.data.statusCodeList.splice(i, 1);
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
    }
  }

  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
    this._cookieService.put("userid", '');
    this.router.navigateByUrl('/login');
  }
}

@Component({
  selector: "app-customisations-settings",
  templateUrl: "./customisations.component.html",
  styleUrls: ["./customisations.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomisationsComponent
  extends BaseComponent
  implements AfterViewInit {
  clinic_id$ = new BehaviorSubject<any>(null);
  clinic_pms$ = new BehaviorSubject<string>(null);

  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }
  @Input() set clinicPMS(value: string) {
    this.clinic_pms$.next(value);
  }
  public form: UntypedFormGroup;
  public apiUrl = environment.apiUrl;

  public xrayMonths: number = 24; //default value
  public opgMonths: number = 60; //default value
  public recallCode1: any;
  public recallCode2: any;
  public recallCode3: any;
  public labCode1: any;
  public labCode2: any;
  public newPatients: any = 0;
  //public health_screen_mtd: any = 0;
  public recall_rate_default: any = 1;
  public hourly_rate_appt_hours: any = 1;
  public lab_code1: any = '';
  public lab_code2: any = '';
  public lab_needed_enable: boolean = true;
  public recall_overdue_enable: boolean = true;
  public xray_overdue_enable: boolean = true;
  public status_codes_enable: boolean = true;
  public opg_overdue_enable: boolean = true;
  public numberOfRecords = 20;
  public visibleMaxBarSetting: boolean = true;
  constructor(
    private _cookieService: CookieService,
    private customisationsService: CustomisationsService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public constants: AppConstants,
    private clinicSettingsService: ClinicSettingsService,
    private headerService: HeaderService
  ) {
    super();

    this.form = this.fb.group({
      recall_codes1: [null],
      recall_codes2: [null],
      recall_codes3: [null],
      lab_code1: [null],
      lab_code2: [null],
      xray_months: [null, Validators.compose([Validators.required])],
      opg_months: [null, Validators.compose([Validators.required])],
      new_patients: [null],
      //health_screen_mtd: [null],
      recall_rate_default: [null],
      hourly_rate_appt_hours: [null],
      disc_code_1: null,
      disc_code_2: null,
      disc_code_3: null,
      max_chart_bars: this.visibleMaxBarSetting?null: [null, Validators.compose([Validators.required])],
    });

  }

  ngOnInit() {
    this.getCustomiseSettings();
    this.getclinicHuddleNotifications();
    this.setVisibilityOfMaxBar();
  }

  get isPMSExact() {
    return this.clinic_pms$.value == 'exact';
  }

  ngAfterViewInit() { }

  /********Recall codes code */
  fieldArray = [
    {
      name: "Default Name 1",
    },
    {
      name: "Default Name 2",
    },
  ];
  newAttribute: any = {};

  firstField = true;
  firstFieldName = "First Item name";
  isEditItems: boolean;

  addFieldValue(index) {
    if (this.fieldArray.length <= 2) {
      // if (index == 0) {
      //   this.newAttribute = { recall_code1: "" };
      // }
      // if (index == 1) {
      //   this.newAttribute = { recall_code2: "" };
      // }
      // if (index == 2) {
      //   this.newAttribute = { recall_code3: "" };
      // }
      this.newAttribute = { name: "" };

     
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
    } else {
    }
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  onEditCloseItems() {
    this.isEditItems = !this.isEditItems;
  }
  /********Recall codes code End */

  public toggleMH(event, type) {

    if (type == "recall_overdue_enable") {
      this.recall_overdue_enable = event.checked;
    } else if (type == "lab_needed_enable") {
      this.lab_needed_enable = event.checked;
    } else if (type == "opg_overdue_enable") {
      this.opg_overdue_enable = event.checked;
    } else if (type == "xray_overdue_enable") {
      this.xray_overdue_enable = event.checked;
    }else if (type == "status_codes_enable") {
      this.status_codes_enable = event.checked;
    }
    let val = (event.checked) ? 1 : 0
    this.manageOverdue(type, val);
  }

  manageOverdue(type, value) {
    $(".ajax-loader").show();
    let data = {
      clinic_id: Number(this.clinic_id$.value),
      type: type,
      value: value
    };
    this.customisationsService.clinicHuddleNotificationsSave(data).subscribe(
      (res) => {
        $(".ajax-loader").hide();
        if (res.status == 200) {
          if (res.status == 200) {
            this.toastr.success("Clinic Customisations Updated");
          } else if (res.status == "401") {
            this.handleUnAuthorization();
          }
        }
      },
      (error) => {
        console.log("error", error);
        this.toastr.error(error);
        $(".ajax-loader").hide();
      }
    );
    // console.log("huddles", huddles);
    // console.log("dashboard", dashboard);
  }

  setVisibilityOfMaxBar(){
    this.headerService.getClinic.subscribe(res => {
      this.visibleMaxBarSetting = res.body.data.length > 1;
    });
  }

  getclinicHuddleNotifications() {
    this.customisationsService
      .getclinicHuddleNotifications(this.clinic_id$.value)
      .subscribe(
        (res) => {
          $(".ajax-loader").hide();
          if (res.status == 200) {
            if (res.body.data) {
              this.recall_overdue_enable = (res.body.data.recall_overdue_enable) ? true : false;
              this.lab_needed_enable = (res.body.data.lab_needed_enable) ? true : false;
              this.opg_overdue_enable = (res.body.data.opg_overdue_enable) ? true : false;
              this.xray_overdue_enable = (res.body.data.xray_overdue_enable) ? true : false;
              this.status_codes_enable = (res.body.data.status_codes_enable) ? true : false;
            }
          }
        },
        (error) => {
          console.log("error", error);
          $(".ajax-loader").hide();
        }
      );
  }

  getCustomiseSettings() {
    this.clinicSettingsService.getClincsSetting.subscribe({
     next: res=>{
      $(".ajax-loader").hide();
        if (res.status) {
          if (res.body.data) {
            this.recallCode1 = res.body.data.recall_code1;
            this.recallCode2 = res.body.data.recall_code2;
            this.recallCode3 = res.body.data.recall_code3;

            this.form.controls['disc_code_1'].setValue(res.body.data.disc_code_1);
            this.form.controls['disc_code_2'].setValue(res.body.data.disc_code_2);
            this.form.controls['disc_code_3'].setValue(res.body.data.disc_code_3);

            this.labCode1 = res.body.data.lab_code1;
            this.labCode2 = res.body.data.lab_code2;
            this.xrayMonths = res.body.data.xray_months;
            this.opgMonths = res.body.data.opg_months;
            this.newPatients = res.body.data.new_patients_main;
            // this.health_screen_mtd = res.body.data.health_screen_mtd;
            this.recall_rate_default = res.body.data.recall_rate_default;
            this.hourly_rate_appt_hours = res.body.data.hourly_rate_appt_hours;
            this.lab_code1 = res.body.data.lab_code1;
            this.lab_code2 = res.body.data.lab_code2;
            this.numberOfRecords = res.body.data.max_chart_bars;
          }
        }
      },
      error:(error) => {
        console.log("error", error);
        $(".ajax-loader").hide();
      }
    });
    // this.customisationsService.getCustomiseSettings(this.clinic_id$.value).subscribe(
    //     (res) => {
    //       $(".ajax-loader").hide();
    //       if (res.status == 200) {
    //         if (res.body.data) {
    //           this.recallCode1 = res.body.data.recall_code1;
    //           this.recallCode2 = res.body.data.recall_code2;
    //           this.recallCode3 = res.body.data.recall_code3;
    //           this.labCode1 = res.body.data.lab_code1;
    //           this.labCode2 = res.body.data.lab_code2;
    //           this.xrayMonths = res.body.data.xray_months;
    //           this.opgMonths = res.body.data.opg_months;
    //           this.newPatients = res.body.data.new_patients_main;
    //          // this.health_screen_mtd = res.body.data.health_screen_mtd;
    //           this.recall_rate_default = res.body.data.recall_rate_default;
    //           this.hourly_rate_appt_hours = res.body.data.hourly_rate_appt_hours;
    //           this.lab_code1 = res.body.data.lab_code1;
    //           this.lab_code2 = res.body.data.lab_code2;
    //         }
    //       }
    //     },
    //     (error) => {
    //       console.log("error", error);
    //       $(".ajax-loader").hide();
    //     }
    //   );
  }

  onSubmit() {
    $(".ajax-loader").show();
    if(this.apiUrl.includes('test')){
      this.recall_rate_default = this.form.value.recall_rate_default;
    }else{
      this.recall_rate_default = 1;
    }
    let data = {
      clinic_id: Number(this.clinic_id$.value),
      xray_months: this.form.value.xray_months,
      opg_months: this.form.value.opg_months,
      recall_code1: this.form.value.recall_codes1,
      recall_code2: this.form.value.recall_codes2,
      recall_code3: this.form.value.recall_codes3,
      disc_code_1: this.form.value.disc_code_1,
      disc_code_2: this.form.value.disc_code_2,
      disc_code_3: this.form.value.disc_code_3,
      new_patients: this.form.value.new_patients,
     // health_screen_mtd: this.form.value.health_screen_mtd,
      recall_rate_default: this.recall_rate_default,
      hourly_rate_appt_hours: this.form.value.hourly_rate_appt_hours,
      lab_code1: this.form.value.lab_code1,
      lab_code2: this.form.value.lab_code2,
      max_chart_bars: this.form.value.max_chart_bars
    };

    

    this.customisationsService.updateCustomiseSettings(data).subscribe(
      (res) => {
        $(".ajax-loader").hide();
        if (res.status == 200) {
          if (res.body.data) {
            this.xrayMonths = data.xray_months;
            this.opgMonths = data.opg_months;
          }
          if (res.status == 200) {
            this.toastr.success("Clinic Customisations Updated");
          } else if (res.status == "401") {
            this.handleUnAuthorization();
          }
        }
      },
      (error) => {
        console.log("error", error);
        this.toastr.error(error);
        $(".ajax-loader").hide();
      }
    );
    // console.log("huddles", huddles);
    // console.log("dashboard", dashboard);
  }

  //
  handleUnAuthorization() {
    this._cookieService.put("username", "");
    this._cookieService.put("email", "");
    this._cookieService.put("userid", "");
    this.router.navigateByUrl("/login");
  }

  openDialog(status_code = '', colour = '', bgcolour = ''): void {
      this.customisationsService.getStatusCodeList(this.clinic_id$.value).subscribe((res) => {
        if (res.status == 200) {
          const dialogRef = this.dialog.open(DialogSetColorsDialogComponent, {
            width: '500px',
            data: {clinic_id: this.clinic_id$.value,statusCodeList: res.body.data ,status_code:status_code,colour:colour,bgcolour:bgcolour}
          });
          dialogRef.afterClosed().subscribe(result => {
           
          });
        }
        else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
  }
}
