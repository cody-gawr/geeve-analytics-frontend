import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { LoginService } from "../../login/login.service";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
})
export class ForgotComponent implements OnInit {
  public form: UntypedFormGroup;
  public errorLogin = false;
  public errorLoginText = "";
  public successLogin: boolean = false;
  public successLoginText = "";
  public recaptchasts: any = "";
  public capchaError: boolean = false;
  public showCaptcha: boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email]),
      ],
    });
  }

  onSubmit() {
    if (this.recaptchasts == "") {
      this.capchaError = true;
      return false;
    }
    this.showCaptcha = false;
    $(".ajax-loader").show();
    this.loginService
      .checkEmail(this.form.value.email, this.recaptchasts)
      .subscribe(
        (res) => {
          $(".ajax-loader").hide();
          this.showCaptcha = false;
          this.recaptchasts = "";
          this.errorLogin = false;
          this.errorLoginText = "";
          this.successLogin = false;
          this.successLoginText = "";
          if (res.status == 200) {
            this.successLogin = true;
            this.showCaptcha = false;
            this.successLoginText = res.body.data;
          } else if (res.body.message == "error") {
            this.errorLogin = true;
            this.errorLoginText = res.body.data;
          }
        },
        (error) => {
          this.showCaptcha = true;
        }
      );
    //  this.router.navigate(['/login']);
  }

  resolved(captchaResponse: string) {
    this.recaptchasts = captchaResponse;
    this.capchaError = false;
  }
}
