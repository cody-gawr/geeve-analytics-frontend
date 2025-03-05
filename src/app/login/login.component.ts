import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { AppConstants } from '../app.constants';
import { environment } from '../../environments/environment';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { RolesUsersService } from '../roles-users/roles-users.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import camelcaseKeys from 'camelcase-keys';
import { ClinicService } from '../clinic/clinic.service';
import { updateUserData } from '../util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: UntypedFormGroup;
  public errorLogin = false;
  public errorforAttmp = false;
  public errorForm = { email: false, password: false, otp: false };
  public apiUrl = environment.apiUrl;
  public clinic_id;
  public userType;
  IsCheckingAuth = true;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private loginService: LoginService,
    private _cookieService: CookieService,
    private rolesUsersService: RolesUsersService,
    public constants: AppConstants,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private clinicService: ClinicService
  ) {
    router.routerState.root.queryParams.subscribe(val => {
      if (this._cookieService.get('is_logged_in') === 'YES') {
        if(val.switchClinicId){
          this.clinic_id = parseInt(val.switchClinicId);
          clinicService.listClinics('jeeve_pay', true).subscribe({
            next: (res2) => {
              let isUnsubscribed = false, clinic;
              if(res2?.body?.data){
                clinic = res2.body.data.find(d => d.id === this.clinic_id);
                if(clinic){
                  isUnsubscribed = !clinic.has_analytics_subscription || clinic.no_access;
                }
              }
              if(isUnsubscribed){
                localStorage.setItem('unsubscribed_clinic', JSON.stringify(clinic));
                return this.goTo('/newapp/dashboard/unsubscribed');
              }else{
                return this.getRolesIndividual();
              }
            },
            error: err => {
              this.getRolesIndividual();
            },
          });
        }
        this.getRolesIndividual();
      } else {
        this.showLoginForm();
      }
    });

  }

  showLoginForm() {
    this.dialog.closeAll();
    this.IsCheckingAuth = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      uname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      otp: ['']
    });
  }

  goTo(defaultUrl: string) {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || defaultUrl;
    // this.router.navigateByUrl(returnUrl);
    window.location.href = returnUrl;
  }

  mfaEnabled = false;
  errorOTP = false;

  onSubmit() {
    this.errorForm = { email: false, password: false, otp: false };
    if (this.form.controls['uname'].hasError('required')) {
      this.errorForm.email = true;
    }
    if (this.form.controls['password'].hasError('required')) {
      this.errorForm.password = true;
    }

    if(!this.form.value.otp && this.mfaEnabled){
      this.errorForm.otp = true;
    }

    if(this.errorForm.email || this.errorForm.password || this.errorForm.otp) return;

    this.errorLogin = false;
    this.errorforAttmp = false;
    this.errorOTP = false;

    this.loginService
      .login(this.form.value.uname.trim(), this.form.value.password, this.form.value.otp)
      .subscribe({
        next: res => {
          this._cookieService.removeAll();
          if (res.status == 200) {
            if(res.body.data.mfa_enabled && !res.body.data.data){
              this.mfaEnabled = true;
              return;
            }
            if(!res.body.data.data.user_type){
              this.goTo('/newapp/dashboard/unsubscribed');
              return;
            }

            var datares = [];
            updateUserData(res.body.data.data);
            datares['username'] = res.body.data.data.username;
            datares['email'] = res.body.data.data.email;
            datares['token'] = res.body.data.data.token;
            datares['userid'] = res.body.data.data.id;
            datares['clinicid'] = res.body.data.data.clinic_id;
            datares['parentid'] = res.body.data.data.parent_id;
            datares['user_type'] = res.body.data.data.user_type;
            /*datares['user_image'] = res.body.data.data.user_image;        */
            datares['stepper_status'] = parseInt(res.body.data.data.stepper_status);
            datares['login_status'] = res.body.data.data.status;
            datares['display_name'] = res.body.data.data.display_name;
            datares['dentistid'] = res.body.data.data.dentist_id;
            datares['mfa_enabled'] = res.body.data.data.mfa_enabled;
            datares['features_dismissed'] =
              res.body.data.data.features_dismissed;
            datares['health_screen_mtd'] = res.body.data.data.health_screen_mtd;
            datares['max_chart_bars'] = res.body.data.data.max_chart_bars;
            let opts = this.constants.cookieOpt as CookieOptions;

            var nextStep = (
              datares['stepper_status'] + 1
            ).toString();

            this._cookieService.put('stepper', nextStep, opts);
            this._cookieService.put('userid', '', opts);

            //this._cookieService.put('multiClinicEnabled', res.body.data.data.multi_clinic_enabled, opts);
            this._cookieService.put(
              'dash1_multi',
              res.body.data.data.dash1_multi,
              opts
            );
            this._cookieService.put('mfa_enabled', datares['mfa_enabled']);
            this._cookieService.put(
              'dash2_multi',
              res.body.data.data.dash2_multi,
              opts
            );
            this._cookieService.put(
              'dash3_multi',
              res.body.data.data.dash3_multi,
              opts
            );
            this._cookieService.put(
              'dash4_multi',
              res.body.data.data.dash4_multi,
              opts
            );
            this._cookieService.put(
              'dash5_multi',
              res.body.data.data.dash5_multi,
              opts
            );

            this._cookieService.put('childid', '', opts);
            this._cookieService.put('dentistid', '', opts);
            this._cookieService.put('userid', datares['userid'], opts);
            //this._cookieService.put("token", datares['token'], opts);
            this._cookieService.put('username', datares['username'], opts);
            this._cookieService.put('email', datares['email'], opts);
            this._cookieService.put('user_type', datares['user_type'], opts);

            this._cookieService.put(
              'login_status',
              datares['login_status'],
              opts
            );

            this._cookieService.put(
              'display_name',
              datares['display_name'],
              opts
            );

            this._cookieService.put(
              'features_dismissed',
              datares['features_dismissed'],
              opts
            );

            this._cookieService.put(
              'health_screen_mtd',
              datares['health_screen_mtd'],
              opts
            );

            this._cookieService.put(
              'max_chart_bars',
              datares['max_chart_bars'],
              opts
            );

            /*this._cookieService.put("user_image", datares['user_image'], opts);        */
            if (datares['user_type'] != '2' && datares['user_type'] != '7') {
              this._cookieService.put('userid', datares['parentid'], opts);
              this._cookieService.put('childid', datares['userid'], opts);
              this._cookieService.put('clinicid', datares['clinicid'], opts);
              this._cookieService.put('dentist_toggle', 'false', opts);
            }

            if (datares['stepper_status'] < 4 && datares['stepper_status'] > 0) {
              this.goTo('/setup');
            } else if (datares['user_type'] == '2') {
              this.goTo('/setup');
            } else {
              this.clinic_id = this._cookieService.get('clinic_id');
              if (datares['user_type'] == '7') {
                if (
                  this.clinic_id != null &&
                  typeof this.clinic_id != 'undefined'
                ) {
                  this.getRoles();
                } else {
                  this.rolesUsersService.getClinics().subscribe(res => {
                    if (res.status == 200) {
                      this.clinic_id = res.body.data[0]['id'];
                      this.getRoles();
                    }
                  });
                }
              } else {
                this.getRoles();
              }
            }
          } else if (res.body.message == 'error') {
            this.errorLogin = true;
          }
        },
        error: error => {
          console.log(error)
          if (error.status == 429) {
            this.errorforAttmp = true;
          } else if(error.error?.mfa_failed) {
            this.errorOTP = true;
          }
          else {
            this.errorLogin = true;
          }
        },
      });
  }
  
  redirectingPagesByRoles(res: any){
    if(!res.type){
      this.goTo('/newapp/dashboard/unsubscribed');
      return;
    }
    const user_type = res.type.toString();
    this._cookieService.put(
      'user_type',
      res.type + '',
      this.constants.cookieOpt
    );
    this._cookieService.put(
      'user_plan',
      res.plan,
      this.constants.cookieOpt
    );

    var permision = res.data;
    if (permision != '' && user_type != '2' && user_type != '7') {
      if (permision.indexOf('healthscreen') >= 0) {
        return this.goTo('/dashboards/healthscreen');
      } else if (permision.indexOf('dashboard1') >= 0) {
        return this.goTo('/newapp/dashboard/cliniciananalysis');
      } else if (permision.indexOf('dashboard2') >= 0) {
        return this.goTo('/newapp/dashboard/clinicianproceedures');
      } else if (permision.indexOf('dashboard3') >= 0) {
        return this.goTo('/newapp/dashboard/frontdesk');
      } else if (permision.indexOf('dashboard4') >= 0) {
        return this.goTo('/newapp/dashboard/marketing');
      } else if (permision.indexOf('dashboard5') >= 0) {
        return this.goTo('/newapp/dashboard/finances');
      } else if (permision.indexOf('morninghuddle') >= 0) {
        return this.goTo('/morning-huddle');
      } else if (permision.indexOf('lostopportunity') >= 0) {
        return this.goTo('/lost-opportunity');
      } else {
        return this.goTo('/profile-settings');
      }
  } else if (user_type == '2' || user_type == '7') {
      return this.goTo('/dashboards/healthscreen');
    } else {
      return this.goTo('/profile-settings');
    }
  }

  getRolesIndividual() {
    
    this.rolesUsersService.getRolesIndividual(this.clinic_id).subscribe({
      next: res => {
        this.redirectingPagesByRoles(res);
        // this.showLoginForm();
      },
      error: err => {
        this.showLoginForm();
      },
    });
  }

  getRoles() {
    this.userType = this._cookieService.get('user_type');
    var permision = [];
    this.rolesUsersService.getRoles().subscribe({
      next: res => {
        
          res.data.forEach(dt => {
            if (this.userType == dt['role_id']) {
              permision = dt['permisions'];
            }
          });
          
          if (permision?.length > 0 && this.userType != '7') {
            if (permision.indexOf('healthscreen') >= 0) {
              this.goTo('/dashboards/healthscreen');
            } else if (permision.indexOf('dashboard1') >= 0) {
              this.goTo('/newapp/dashboard/cliniciananalysis');
            } else if (permision.indexOf('dashboard2') >= 0) {
              this.goTo('/newapp/dashboard/clinicianproceedures');
            } else if (permision.indexOf('dashboard3') >= 0) {
              this.goTo('/newapp/dashboard/frontdesk');
            } else if (permision.indexOf('dashboard4') >= 0) {
              this.goTo('/newapp/dashboard/marketing');
            } else if (permision.indexOf('dashboard5') >= 0) {
              this.goTo('/newapp/dashboard/finances');
            } else if (permision.indexOf('morninghuddle') >= 0) {
              this.goTo('/morning-huddle');
            } else if (permision.indexOf('lostopportunity') >= 0) {
              this.goTo('/lost-opportunity');
            } else {
              this.goTo('/profile-settings');
            }
          } else if (this.userType == '7') {
            this.goTo('/dashboards/healthscreen');
          } else {
            this.goTo('/profile-settings');
          }
        
      },
      error: err => {
        this.showLoginForm();
      },
    });
  }
}
