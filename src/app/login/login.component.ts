import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService, CookieOptions } from "ngx-cookie";
import { AppConstants } from '../app.constants';
import { environment } from "../../environments/environment";
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from './login.service';
import { RolesUsersService } from '../roles-users/roles-users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public errorLogin = false;
  public errorforAttmp = false;
  public errorForm = {'email' : false, 'password' : false};
  public apiUrl = environment.apiUrl;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService,private _cookieService: CookieService, private rolesUsersService: RolesUsersService,public constants: AppConstants) {
  if(this._cookieService.get("userid")){
     var permision = '';
     var user_type = this._cookieService.get("user_type");
        this.rolesUsersService.getRolesIndividual().subscribe((res) => {
          if(res.message == 'success'){ 
            permision = res.data;
            if(permision != '' && user_type != '2'){
              if(permision.indexOf('healthscreen') >= 0){
                  this.router.navigate(['/dashboards/healthscreen']);
              } else if(permision.indexOf('dashboard1') >= 0){
                this.router.navigate(['/dashboards/cliniciananalysis']);
              } else if(permision.indexOf('dashboard2') >= 0){
                  this.router.navigate(['/dashboards/clinicianproceedures']);
              } else if(permision.indexOf('dashboard3') >= 0 ){
                  this.router.navigate(['/dashboards/frontdesk']);
              } else if(permision.indexOf('dashboard4') >= 0 ){
                 this.router.navigate(['/dashboards/marketing']);
              } else if(permision.indexOf('dashboard5') >= 0 ){
                  this.router.navigate(['/dashboards/finances']);
              } else if(permision.indexOf('morninghuddle') >= 0){
                  this.router.navigate(['/morning-huddle']);
              } else if(permision.indexOf('lostopportunity') >= 0 ){
                  this.router.navigate(['/lost-opportunity']);
              } else {
                 this.router.navigate(['/profile-settings']);
              }
            } else  if(user_type == '2'){
              this.router.navigate(['/dashboards/healthscreen']);
            } else {
              this.router.navigate(['/profile-settings']);
            }
          }      
        });
  }

  }

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }
onSubmit() {
  this.errorForm = {'email' : false, 'password' : false};
  if(this.form.controls['uname'].hasError('required')){
      this.errorForm.email = true;
  }
  if(this.form.controls['password'].hasError('required')){
      this.errorForm.password = true;
  }

  this.errorLogin  =false;
  this.errorforAttmp  =false;
  this.loginService.login(this.form.value.uname.trim(), this.form.value.password).subscribe((res) => 
  {
    this._cookieService.removeAll({ 'path': '/' });
    if(res.message == 'success')
    {        
      var datares = [];
      datares['username'] = res.data.data.username;
      datares['email'] = res.data.data.email;
      datares['token'] = res.data.data.token;        
      datares['userid'] = res.data.data.id;      
      datares['clinicid'] = res.data.data.clinic_id;      
      datares['parentid'] = res.data.data.parent_id;   
      datares['user_type'] = res.data.data.user_type;       
      /*datares['user_image'] = res.data.data.user_image;        */
      datares['stepper_status'] = res.data.data.stepper_status;        
      datares['login_status'] = res.data.data.status;        
      datares['display_name'] = res.data.data.display_name;  
      datares['dentistid'] = res.data.data.dentist_id;        
      let opts = this.constants.cookieOpt as CookieOptions;
      var nextStep = (parseInt(res.data.data.stepper_status) + 1).toString();
      this._cookieService.put("stepper", nextStep , opts);
      this._cookieService.put("userid", '', opts);
      this._cookieService.put("childid", '', opts);
      this._cookieService.put("dentistid", '', opts);
      this._cookieService.put("userid", datares['userid'], opts);
      //this._cookieService.put("token", datares['token'], opts);
      this._cookieService.put("username", datares['username'], opts);
      this._cookieService.put("email", datares['email'], opts);
      this._cookieService.put("user_type", datares['user_type'], opts);
      this._cookieService.put("login_status", datares['login_status'], opts);
      this._cookieService.put("display_name", datares['display_name'], opts);
      /*this._cookieService.put("user_image", datares['user_image'], opts);        */
      if(datares['user_type'] != '2') {
        this._cookieService.put("userid", datares['parentid'], opts);
        this._cookieService.put("childid", datares['userid'], opts);
        this._cookieService.put("clinicid", datares['clinicid'], opts);
        this._cookieService.put("dentist_toggle", 'false', opts);
      }
      var self = this;
      if(datares['parent_stepper'] != 'no' && parseInt(datares['parent_stepper']) < 6 ) {
        this.router.navigate(['/setup']);
      } else if(parseInt(datares['stepper_status']) < 6 && datares['user_type'] == '2') {
        this.router.navigate(['/setup']);
      } else  if(datares['user_type'] == '2') {
          this.router.navigate(['/dashboards/healthscreen']);
      } else {       
        var permision = '';
        this.rolesUsersService.getRoles().subscribe((res) => {
          if(res.message == 'success'){ 
            res.data.forEach((dt) => {
              if(datares['user_type'] == dt['role_id']){
                permision = dt['permisions'];                
              }                
            });
            if(res.plan == 'lite'){
              this.router.navigate(['/dashboards/healthscreen']);
            } else if(permision != ''){                            
              if(permision.indexOf('healthscreen') >= 0){
                  this.router.navigate(['/dashboards/healthscreen']);
              } else if(permision.indexOf('dashboard1') >= 0){
                this.router.navigate(['/dashboards/cliniciananalysis']);
              } else if(permision.indexOf('dashboard2') >= 0){
                  this.router.navigate(['/dashboards/clinicianproceedures']);
              } else if(permision.indexOf('dashboard3') >= 0 ){
                  this.router.navigate(['/dashboards/frontdesk']);
              } else if(permision.indexOf('dashboard4') >= 0 ){
                 this.router.navigate(['/dashboards/marketing']);
              } else if(permision.indexOf('dashboard5') >= 0 ){
                  this.router.navigate(['/dashboards/finances']);
              } else if(permision.indexOf('morninghuddle') >= 0){
                  this.router.navigate(['/morning-huddle']);
              } else if(permision.indexOf('lostopportunity') >= 0 ){
                  this.router.navigate(['/lost-opportunity']);
              } else {
                 this.router.navigate(['/profile-settings']);
              }
            } else{
              this.router.navigate(['/profile-settings']);
            }
          }      
        });
      }    
    } else if(res.message == 'error'){
      this.errorLogin  =true;
    }
  }, (error) => {
    if(error.status == 429){
      this.errorforAttmp =true;
    } else {
      this.errorLogin  =true;
    }
  });
  }

}
