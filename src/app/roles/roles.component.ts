import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RolesService } from './roles.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { AppConstants } from '../app.constants';
@Component({
  selector: 'app-formlayout',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public form: UntypedFormGroup;

  public clinic_id: any = {};

  private warningMessage: string;
  public id: any = {};
  public clinicName: any = 0;
  public contactName = 0;
  // public chartData: any[] = [];
  public address: any = {};
  public practice_size: any = {};
  options: UntypedFormGroup;
  public xero_link;
  public xeroConnect = false;
  public xeroOrganization = '';
  public email;
  constructor(
    private _cookieService: CookieService,
    private fb: UntypedFormBuilder,
    private rolesService: RolesService,
    private route: ActivatedRoute,
    public constants: AppConstants
  ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = this.route.snapshot.paramMap.get('id');
      this.displayName = this._cookieService.get('display_name');
      this.email = this._cookieService.get('email');
      //  this.getprofileSettings();
      $('#title').html('Profile Settings');
      $('.header_filters').hide();
      // this.checkXeroStatus();
    });

    this.form = this.fb.group({
      currentPassword: [null, Validators.compose([Validators.required])],
      newPassword: [null, Validators.compose([Validators.required])],
      repeatPassword: [null, Validators.compose([Validators.required])],
    });
  }

  // Sufix and prefix
  hide = true;

  getprofileSettings() {
    this.rolesService.getprofileSettings(this.id).subscribe(
      res => {
        if (res.status == 200) {
          this.displayName = res.body.data[0].displayName;
          this.email = res.body.data[0].email;
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }

  public displayName;
  public display_name;

  onSubmitBasic() {
    this.displayName = $('#displayName').val();
    this.email = $('#email').val();
    this.rolesService
      .updateprofileSettings(this.displayName, this.email)
      .subscribe(
        res => {
          if (res.status == 200) {
            let opts = this.constants.cookieOpt as CookieOptions;
            this._cookieService.put('display_name', this.displayName, opts);
            this.display_name = this.displayName;
            alert('Profile Settings Updated');
          }
        },
        error => {
          this.warningMessage = 'Please Provide Valid Inputs!';
        }
      );
  }

  public errorLogin = false;
  public errortext = '';
  public successLogin = false;
  public successtext = '';

  public currentPassword;
  public newPassword;
  public repeatPassword;
  onSubmitPassword() {
    this.errorLogin = false;
    this.errortext = '';
    this.successLogin = false;
    this.successtext = '';
    this.currentPassword = this.form.value.currentPassword;
    this.newPassword = this.form.value.newPassword;
    this.repeatPassword = this.form.value.repeatPassword;
    if (this.newPassword == this.repeatPassword) {
      this.rolesService
        .updatePassword(this.currentPassword, this.newPassword)
        .subscribe(
          res => {
            if (res.status == 200) {
              this.successLogin = true;
              this.successtext = res.body.data;
            } else {
              this.errorLogin = true;
              this.errortext = res.body.data;
            }
          },
          error => {
            this.errorLogin = true;
            this.errortext = 'Please Provide Valid Inputs!';
          }
        );
    } else {
      this.errorLogin = true;
      this.errortext = "Password doesn't Match!";
    }
  }
}
