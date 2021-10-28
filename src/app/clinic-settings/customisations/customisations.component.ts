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

  public recallCodes: any = {}; //default value
  public xrayMonths: number = 24; //default value
  public opgMonths: number = 60; //default value
  public recallCodesCount: any = 3;
  public recallError: boolean = false;

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
      //recall_codes: [null, Validators.compose([Validators.required])],
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
              //this.recallCodes = res.data.recall_codes;
              if(res.data.recall_code1){
                this.recallCodes[1] = res.data.recall_code1;
              }
              if(res.data.recall_code2){
                this.recallCodes[2] = res.data.recall_code2;
              }
              if(res.data.recall_code3){
                this.recallCodes[3] = res.data.recall_code3;
              } 
              let objKey = Object.keys(this.recallCodes);
              this.recallCodesCount = objKey.length;
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
    this.recallError = false;
    if(typeof(this.recallCodes[1]) != 'undefined' && this.recallCodes[1].trim() == ''){
      this.recallError = true;
      return false;
    } else if(typeof(this.recallCodes[2]) != 'undefined' && this.recallCodes[2].trim() == ''){
      this.recallError = true;
      return false;
    } else  if(typeof(this.recallCodes[3]) != 'undefined' && this.recallCodes[3].trim() == ''){
      this.recallError = true;
      return false;
    }
    $(".ajax-loader").show();
    let data = {
      clinic_id: Number(this.clinic_id$.value),
      xray_months: this.form.value.xray_months,
      opg_months: this.form.value.opg_months,
      recall_code1: (typeof(this.recallCodes[1]) != 'undefined')? this.recallCodes[1] : '',
      recall_code2: (typeof(this.recallCodes[2]) != 'undefined')? this.recallCodes[2] : '',
      recall_code3: (typeof(this.recallCodes[3]) != 'undefined')? this.recallCodes[3] : '',
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
  updateValue(value,key){
    this.recallCodes[key] = value;
  }
  hideError(){
    if(this.recallError){
      this.recallError = false;
    }
  }

  recallCodesRemove(key){
    this.recallCodesCount = Object.keys(this.recallCodes).length;
    if(this.recallCodesCount > 1){
      delete this.recallCodes[key];
      this.recallCodesCount = this.recallCodesCount -1;
    }
  }
  recallCodesAdd(){
    let objKey = Object.keys(this.recallCodes);
    this.recallCodesCount = objKey.length;
    if(this.recallCodesCount < 3){
      this.recallCodesCount = this.recallCodesCount +1;  
      if(typeof(this.recallCodes[1]) == 'undefined'){
        this.recallCodes[1] = '';
        return true;
      }
      if(typeof(this.recallCodes[2]) == 'undefined'){
        this.recallCodes[2] = '';
        return true;
      }if(typeof(this.recallCodes[3]) == 'undefined'){
        this.recallCodes[3] = '';
        return true;
      }    
    }
    
  }


}
