import {
  AfterViewInit,
  Inject,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CustomisationsService } from "./customisations.service";
import { BaseComponent } from "../base/base.component";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ClinicSettingsService } from "../clinic-settings.service";
import { ClinicianAnalysisService } from "../../dashboards/cliniciananalysis/cliniciananalysis.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-customisations-settings",
  templateUrl: "./customisations.component.html",
  styleUrls: ["./customisations.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomisationsComponent
  extends BaseComponent
  implements AfterViewInit
{
  clinic_id$ = new BehaviorSubject<any>(null);

  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }
  public form: FormGroup;
  
  public xrayMonths: number = 24; //default value
  public opgMonths: number = 60; //default value
  public recallCode1: any;
  public recallCode2: any;
  public recallCode3: any;

  constructor(
    private _cookieService: CookieService,
    private customisationsService: CustomisationsService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    super();
    // console.log('test ',this.clinic_id$.value)
    // console.log('test ',this.clinic_id$)
  }

  ngOnInit() {
    this.form = this.fb.group({ 
      recall_codes1: [null, Validators.compose([Validators.required])],
      recall_codes2: [null],
      recall_codes3: [null],
      xray_months: [null, Validators.compose([Validators.required])],
      opg_months: [null, Validators.compose([Validators.required])],
    });
    this.getCustomiseSettings();
  }

  ngAfterViewInit() {}

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

      console.log("this.newAttribute", this.newAttribute);
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

  getCustomiseSettings() {
    this.customisationsService
      .getCustomiseSettings(this.clinic_id$.value)
      .subscribe(
        (res) => {
          $(".ajax-loader").hide();
          if (res.message == "success") {
            if (res.data) {
              this.recallCode1 = res.data.recall_code1;              
              this.recallCode2 = res.data.recall_code2;              
              this.recallCode3 = res.data.recall_code3;              
              this.xrayMonths = res.data.xray_months;
              this.opgMonths = res.data.opg_months;
            }
          }
        },
        (error) => {
          console.log("error", error);
          $(".ajax-loader").hide();
        }
      );
  }

  onSubmit() {    
    $(".ajax-loader").show();
    let data = {
      clinic_id: Number(this.clinic_id$.value),
      xray_months: this.form.value.xray_months,
      opg_months: this.form.value.opg_months,
      recall_code1: this.form.value.recall_codes1,
      recall_code2: this.form.value.recall_codes2,
      recall_code3: this.form.value.recall_codes3
    };

    this.customisationsService.updateCustomiseSettings(data).subscribe(
      (res) => {
        $(".ajax-loader").hide();
        if (res.message == "success") {
          if (res.data) {
            this.xrayMonths = data.xray_months;
            this.opgMonths = data.opg_months;
          }
          if (res.message == "success") {
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
}
