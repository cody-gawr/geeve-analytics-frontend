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
   public id:any ={};
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.form = this.fb.group({ 
      password: [null, Validators.compose([Validators.required])],
      cpassword: [null, Validators.compose([Validators.required])]
    });
          this.route.params.subscribe(params => {
    this.id = this.route.snapshot.paramMap.get("id");
     });
  }

  onSubmit() {
      this.loginService.resetPassword(this.form.value.password,this.id).subscribe((res) => {
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
}
