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

  public huddles: any = {
    case_1: false,
    case_2: false,
    case_3: true,
    case_4: false,
    case_5: false,
    case_6: true,
    case_7: false,
  };

  public dashboard: any = {
    dash_1: false,
    dash_2: false,
    dash_3: false,
    dash_4: true,
    dash_5: false,
    dash_6: false,
    dash_7: true,
  };

  public recallCodes: string = "R,r"; //default value
  public xrayMonths: number = 24; //default value
  public opgMonths: number = 60; //default value

  constructor(
    private _cookieService: CookieService,
    private customisationsService: CustomisationsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    super();
    // console.log('test ',this.clinic_id$.value)
    // console.log('test ',this.clinic_id$)
  }
  ngOnInit() {
    this.form = this.fb.group({
      recall_codes: [null, Validators.compose([Validators.required])],
      xray_months: [null, Validators.compose([Validators.required])],
      opg_months: [null, Validators.compose([Validators.required])],
    });
    this.getCustomiseSettings();
  }

  ngAfterViewInit() {}

  getCustomiseSettings() {
    this.customisationsService
      .getCustomiseSettings(this.clinic_id$.value)
      .subscribe(
        (res) => {
          $(".ajax-loader").hide();
          if (res.message == "success") {
            if (res.data) {
              this.recallCodes = res.data.recall_codes;
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

  public toggleHuddle(event) {
    if (event.source.name == "case_1") {
      this.huddles.case_1 = event.checked;
    } else if (event.source.name == "case_2") {
      this.huddles.case_2 = event.checked;
    } else if (event.source.name == "case_3") {
      this.huddles.case_3 = event.checked;
    } else if (event.source.name == "case_4") {
      this.huddles.case_4 = event.checked;
    } else if (event.source.name == "case_5") {
      this.huddles.case_5 = event.checked;
    } else if (event.source.name == "case_6") {
      this.huddles.case_6 = event.checked;
    } else if (event.source.name == "case_7") {
      this.huddles.case_7 = event.checked;
    }
    let huddles = this.huddles;
    console.log("huddles", huddles);
    let data = { huddles: huddles };
    this.customisationsService.updateCustomiseSettings(data).subscribe(
      (res) => {},
      (error) => {}
    );
  }
  public toggleDashboard(event) {
    if (event.source.name == "dash_1") {
      this.dashboard.dash_1 = event.checked;
    } else if (event.source.name == "dash_2") {
      this.dashboard.dash_2 = event.checked;
    } else if (event.source.name == "dash_3") {
      this.dashboard.dash_3 = event.checked;
    } else if (event.source.name == "dash_4") {
      this.dashboard.dash_4 = event.checked;
    } else if (event.source.name == "dash_5") {
      this.dashboard.dash_5 = event.checked;
    } else if (event.source.name == "dash_6") {
      this.dashboard.dash_6 = event.checked;
    } else if (event.source.name == "dash_7") {
      this.dashboard.dash_7 = event.checked;
    }

    let dashboard = this.dashboard;
    console.log("dashboard", dashboard);
    let data = { dashboard: dashboard };
    this.customisationsService.updateCustomiseSettings(data).subscribe(
      (res) => {},
      (error) => {}
    );
  }

  onSubmit() {
    $(".ajax-loader").show();

    let data = {
      clinic_id: Number(this.clinic_id$.value),
      xray_months: this.form.value.xray_months,
      opg_months: this.form.value.opg_months,
      recall_codes: this.form.value.recall_codes,
    };

    this.customisationsService.updateCustomiseSettings(data).subscribe(
      (res) => {
        $(".ajax-loader").hide();
        if (res.message == "success") {
          if (res.data) {
            this.recallCodes = res.data.recall_codes;
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
    // console.log("huddles", huddles);
    // console.log("dashboard", dashboard);
  }
  //
}
