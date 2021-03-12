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
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService,private _cookieService: CookieService) {

  if(this._cookieService.get("userid")){
   this.router.navigate(['/dashboards/healthscreen']);
  }

  }

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
        datares['clinicid'] = res.data.data.clinic_id;      
        datares['parentid'] = res.data.data.parent_id;   
        datares['user_type'] = res.data.data.user_type;       
        datares['user_image'] = res.data.data.user_image;        
        datares['stepper_status'] = res.data.data.stepper_status;        
        datares['login_status'] = res.data.data.status;        
        datares['display_name'] = res.data.data.display_name;  
        datares['dentistid'] = res.data.data.dentist_id;        

        let opts: CookieOptionsArgs = {
            expires: new Date('2030-07-19')
        };
        var nextStep = (parseInt(res.data.data.stepper_status) + 1).toString();
        this._cookieService.put("stepper", nextStep , opts);
        this._cookieService.put("userid", '', opts);
        this._cookieService.put("childid", '', opts);
        this._cookieService.put("dentistid", '', opts);

        this._cookieService.put("username", datares['username'], opts);
        this._cookieService.put("email", datares['email'], opts);
        this._cookieService.put("token", datares['token'], opts);
        this._cookieService.put("user_type", datares['user_type'], opts);
       
        this._cookieService.put("login_status", datares['login_status'], opts);
        this._cookieService.put("display_name", datares['display_name'], opts);
        this._cookieService.put("user_image", datares['user_image'], opts);
        
        this._cookieService.put("userid", datares['userid'], opts);
        var self = this;
        if(datares['parent_stepper'] != 'no' && parseInt(datares['parent_stepper']) < 6 ){
          this.router.navigate(['/setup']);
        } else if(parseInt(datares['stepper_status']) < 6 && datares['user_type'] == '2'){
          this.router.navigate(['/setup']);
        } else {
            if(datares['login_status'] == '5') {
              this.router.navigate(['/profile-settings']);
            } else if(datares['user_type'] == '1') {
              this.router.navigate(['/users']);
            } else if(datares['user_type'] == '2') {
               this.router.navigate(['/dashboards/healthscreen']);
            } else{
               this._cookieService.put("userid", datares['parentid'], opts);
               this._cookieService.put("childid", datares['userid'], opts);
                this._cookieService.put("clinicid", datares['clinicid'], opts);
 this._cookieService.put("dentist_toggle", 'false', opts);
               if(datares['user_type'] == '4')
               this.router.navigate(['/dashboards/cliniciananalysis']);
                else
               this.router.navigate(['/profile-settings']);
            }
        }    
      } else if(res.message == 'error'){
          this.errorLogin  =true;
       }
    }, error => {
       this.errorLogin  =true;
    }    
    );

  }
}
