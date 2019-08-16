import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
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
       if(res.message == 'success'){
        var datares = [];
        datares['username'] = res.data.data.username;
        datares['email'] = res.data.data.email;
        datares['token'] = res.data.data.token;        
        datares['userid'] = res.data.data.id;      
        datares['user_type'] = res.data.data.user_type;        

        let opts: CookieOptionsArgs = {
            expires: new Date('2030-07-19')
        };
        this._cookieService.put("username", datares['username'], opts);
        this._cookieService.put("email", datares['email'], opts);
        this._cookieService.put("token", datares['token'], opts);
        this._cookieService.put("user_type", datares['user_type'], opts);
        this._cookieService.put("userid", datares['userid'], opts);
        if(datares['user_type'] == '1')
        this.router.navigate(['/users']);
        else if(datares['user_type'] == '2') 
        this.router.navigate(['/dashboards/cliniciananalysis/1']);

       }
       else if(res.message == 'error'){
          this.errorLogin  =true;
       }
    }, error => {
    }    
    );

  }
2}
