import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;
  public errorLogin = false;
  public errorLoginText = '';
  public successLogin = false;
  public successLoginText = '';
  public recaptchasts:any = '';
  public capchaError:boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ]
    });
  } 

  onSubmit() {
    if(this.recaptchasts == '')
    {
      this.capchaError = true;
      return false;
    }            
    $('.ajax-loader').show();
      this.loginService.checkEmail(this.form.value.email,this.recaptchasts).subscribe((res) => {
          this.recaptchasts = '';
         $('.ajax-loader').hide();
          this.errorLogin = false;
          this.errorLoginText = '';
          this.successLogin = false;
          this.successLoginText = '';
           if(res.message == 'success'){
              this.successLogin  =true;
              this.successLoginText  =res.data;
            }
           else if(res.message == 'error'){
              this.errorLogin  =true;
              this.errorLoginText  =res.data;
           }
        }, error => {
    });
  //  this.router.navigate(['/login']);
  }

  resolved(captchaResponse: string) {
    this.recaptchasts = captchaResponse;
    this.capchaError = false;
  }
}
