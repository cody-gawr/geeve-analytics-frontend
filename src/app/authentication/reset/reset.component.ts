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
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private route: ActivatedRoute,private toastr: ToastrService) {}
  ngOnInit() {
    this.form = this.fb.group({ 
      password: [null, Validators.compose([Validators.required, Validators.minLength(10),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
      cpassword: [null, Validators.compose([Validators.required])]
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
}
