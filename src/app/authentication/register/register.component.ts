import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginService } from '../../login/login.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
    public errorLogin = false;
  public errorLoginText = '';
  public successLogin = false;
  public successLoginText = '';
   public id:any ={};
   public plan_id;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private route: ActivatedRoute) {}

  ngOnInit() {
     this.route.params.subscribe(params => {
      this.plan_id = this.route.snapshot.paramMap.get("id");
    });
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  onSubmit() {
    // this.loginService.checkEmailExists(this.form.value.email).subscribe((res) => {
    //       this.errorLogin = false;
    //       this.errorLoginText = '';
    //       this.successLogin = false;
    //       this.successLoginText = '';
    //        if(res.message == 'success'){
    //                this.loginService.addUser(this.form.value.email,this.form.value.password,'2',this.plan_id).subscribe((res) => {
    //                 this.errorLogin = false;
    //                 this.errorLoginText = '';
    //                 this.successLogin = false;
    //                 this.successLoginText = '';
    //                  if(res.message == 'success'){
    //                       this.successLogin  =true;
    //                       alert('Please confirm your mail and complete the payment!');
    //                   }
    //                  else if(res.message == 'error'){
    //                     this.errorLogin  =true;
    //                     this.errorLoginText  =res.data;
    //                  }
    //               }, error => {
    //           });
    //         }
    //        else if(res.message == 'error'){
    //           this.errorLogin  =true;
    //           this.errorLoginText  ='Email already Exists!';
    //        }
    //     }, error => {
    // });
  }
}
