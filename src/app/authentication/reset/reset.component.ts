import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginService } from '../../login/login.service';
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


const passwordValidation = new FormControl('', [Validators.required, Validators.minLength(10)]);
const confirmPasswordValidation = new FormControl('', CustomValidators.equalTo(passwordValidation));
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  public form: FormGroup;
  public errorLogin = false;
  public errorLoginText = '';
  public successLogin = false;
  public successLoginText = '';
  public isPasswordSet = false;
  public id:any ={};
  public erros:any = {minLength: false, pattern: false, confirm: false};
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private route: ActivatedRoute,private toastr: ToastrService) {}
  ngOnInit() {
    this.form = this.fb.group({ 
      password: passwordValidation,
      cpassword: confirmPasswordValidation
    });
          this.route.params.subscribe(params => {
                this.string = this.route.snapshot.paramMap.get("id");
 this.id='';
    this.checkValidString();
     });
  }
public loading = true;
public string;
  checkValidString() {
  this.loading = true;
  $('.ajax-loader').show();
this.loginService.checkValidString(this.string).subscribe((res) => {  
  if(res && res.message == 'success'){
    this.id= res.data;
    this.loading = false;
    $('.ajax-loader').hide();
  }
  else{
    this.toastr.success('Invalid Link.');
    $('.ajax-loader').hide();
 this.router.navigate(['/login']);
  }
});
}
onSubmit() {
    this.erros = {required: false, minLength: false, pattern: false, confirm: false,cpassword:false};
    if(this.form.controls['password'].hasError('pattern')){
      this.erros.pattern = true;     
      return false;      
    }
    if(this.form.controls['password'].hasError('minlength')){
      this.erros.minLength = true;
      return false;
    }
    if(this.form.controls['password'].hasError('required')){
      this.erros.required = true;
      return false;
    }
    if(this.form.controls['password'].hasError('required')){
      this.erros.required = true;
      return false;
    }
    if(this.form.controls['cpassword'].hasError('required')){
      this.erros.cpassword = true;
      return false;
    }
    if(this.form.value.password != this.form.value.cpassword) {
      this.erros.confirm = true;
      return false;
    }

    
    if(this.id) {
    if(this.form.value.password == this.form.value.cpassword) {
      var timeStamp = Math.floor(Date.now() / 1000);
      var data = encodeURIComponent(window.btoa(this.id+"+"+timeStamp));
      this.loginService.resetPassword(this.form.value.password,data).subscribe((res) => {
          this.errorLogin = false;
          this.errorLoginText = '';
          this.successLogin = false;
          this.successLoginText = '';
           if(res.message == 'success'){
              this.successLogin  =true;
              this.isPasswordSet =true;
              this.successLoginText  =res.data;
            }
           else if(res.message == 'error'){
              this.errorLogin  =true;
              this.errorLoginText  =res.data;
           }
        }, error => {
    });
      }
  }
  else
  {
     this.toastr.success('Invalid Link.');
     this.router.navigate(['/login']);
  }
  //  this.router.navigate(['/login']);
  }
  setDefaultError(){
    this.erros = {required: false, minLength: false, pattern: false, confirm: false,cpassword:false};
  }
}
