import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "angular2-cookie/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public errorLogin = false;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService,private _cookieService: CookieService) {}

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }
  onSubmit() {
          this.errorLogin  =false;

  this.loginService.login(this.form.value.uname, this.form.value.password).subscribe((res) => {
       console.log(res);
       if(res.message == 'success'){
        var datares = [];
        datares['username'] = res.data.data.username;
        datares['email'] = res.data.data.email;
        datares['token'] = res.data.data.token;        
        datares['userid'] = res.data.data.id;        

        this._cookieService.put("username", datares['username']);
        this._cookieService.put("email", datares['email']);
        this._cookieService.put("token", datares['token']);
        this._cookieService.put("userid", datares['userid']);

        this.router.navigate(['/dashboards/cliniciananalysis/1']);
       }
       else if(res.message == 'error'){
          this.errorLogin  =true;
       }
    }, error => {
    }    
    );

  }
}
