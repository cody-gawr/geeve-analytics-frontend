import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ProfileSettingsService } from './profile-settings.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { Router } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { CustomValidators } from 'ng2-validation';
import { AppConstants } from '../app.constants';
import { environment } from '../../environments/environment';
import { StripeElementsOptions } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { RolesUsersService } from '../roles-users/roles-users.service';
import { NotificationService } from '@/newapp/shared/services/notification.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { OtpConfirmDialog } from './otp-confirm-dialog/otp-confirm-dialog.component';
import { updateUserData } from '../util';

const passwordValidation = new UntypedFormControl('', [
  Validators.required,
  Validators.minLength(10),
]);
const confirmPasswordValidation = new UntypedFormControl(
  '',
  CustomValidators.equalTo(passwordValidation)
);

@Component({
  selector: 'app-formlayout',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileSettingsComponent implements OnInit {
  elementsOptions: StripeElementsOptions = {};
  elements;
  card;
  public apiUrl = environment.apiUrl;
  public cardStyle = {
    base: {
      color: '#fff',
      fontWeight: 400,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      padding: '10px',

      ':focus': {
        color: '#fff',
      },

      '::placeholder': {
        color: '#698aaa',
      },

      ':focus::placeholder': {
        color: '#698aaa',
      },
    },
    invalid: {
      color: '#fd0404',
      ':focus': {
        color: '#fd0404',
      },
      '::placeholder': {
        color: '#fd0404',
      },
    },
  };

  public expStyle = {
    base: {
      color: '#fff',
      fontWeight: 400,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#fff',
      },

      '::placeholder': {
        color: '#698aaa',
      },

      ':focus::placeholder': {
        color: '#698aaa',
      },
    },
    invalid: {
      color: '#fd0404',
      ':focus': {
        color: '#fd0404',
      },
      '::placeholder': {
        color: '#fd0404',
      },
    },
  };

  public cvcStyle = {
    base: {
      color: '#fff',
      fontWeight: 400,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#fff',
      },

      '::placeholder': {
        color: '#698aaa',
      },

      ':focus::placeholder': {
        color: '#698aaa',
      },
    },
    invalid: {
      color: '#fd0404',
      ':focus': {
        color: '#fd0404',
      },
      '::placeholder': {
        color: '#fd0404',
      },
    },
  };
  public token;
  stripeTest: UntypedFormGroup;
  public form: UntypedFormGroup;
  public cardNumber;
  public cardExpiry;
  public cardCvc;
  public userType;
  public mfaEnabled;
  old_password_error;
  confirm_password_error;
  public clinic_id: any = {};
  public selectedChartTip: string = '1';
  private warningMessage: string;
  public id: any = {};
  public clinicName: any = 0;
  public contactName = 0;
  public health_screen_mtd: any = 0;
  public max_chart_bars: number = 0;
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
    private profileSettingsService: ProfileSettingsService,
    private route: ActivatedRoute,
    private stripeService: StripeService,
    private router: Router,
    private toastr: ToastrService,
    private rolesUsersService: RolesUsersService,
    public constants: AppConstants,
    private notifyService: NotificationService,
    public dialog: MatDialog
  ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.userType = this._cookieService.get('user_type');
    this.mfaEnabled = this._cookieService.get('mfa_enabled') === 'true';
    this.health_screen_mtd = this._cookieService.get('health_screen_mtd');
    this.max_chart_bars = parseInt(this._cookieService.get('max_chart_bars') || '20');
    this.form = this.fb.group({
      currentPassword: [null, Validators.compose([Validators.required])],
      newPassword: passwordValidation,
      repeatPassword: confirmPasswordValidation,
    });
    this.formSettings = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      displayName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
        ]),
      ],
    });
    this.healthSettings = new UntypedFormGroup({
      health_screen_mtd: new UntypedFormControl(),
      max_chart_bars: new FormControl(this.max_chart_bars),
    });
  }

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    this.id = this.route.snapshot.paramMap.get('id');

    this.displayName = this._cookieService.get('display_name');
    this.email = this._cookieService.get('email');
    /*this.imageURL = this._cookieService.get("user_image");   */
    if (this.userType != '2') this.getRoles();
    else {
      this.showCard = true;
      this.getPaymentDetails();
    }

    this.getChartsTips();
    this.getStripeKey();

    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
    });
    // });
  }
  // imageData: any;
  onSubmit() {
    // this.formSubmitted = true;
    const ref = this.dialog.open(OtpConfirmDialog, {
        data: {
            MfaEnabled: this.mfaEnabled
        }
    });

    ref.afterClosed().subscribe({
        next: (res: any) => {
          if(res !== undefined){
            this.mfaEnabled = res;
            this._cookieService.put('mfa_enabled', res.toString());
          }
        }
    });
  }
  // enable2FA() {
  //   this.imageData = environment.commonApiUrl + '/generateQR';
  // }
  // disable2FA() {
  //   const ref = this.dialog.open(OtpConfirmDialog);
  //   ref.afterClosed().subscribe(result => {
  //     if(result){
  //       this.mfaEnabled = false;
  //       this.imageData = '';
  //       this._cookieService.put('mfa_enabled', 'false');
  //       this.notifyService.showSuccess('2FA has been removed succesfully!');
  //     }
  //   })
  // }
  // verifyCode: string;
  // verify2FA() {
  //   if(this.verifyCode){
  //     this.profileSettingsService.verifyCode(this.verifyCode).subscribe({
  //       next: res => {
  //         const result = res.body; 
  //         if(result.status){
  //           this._cookieService.put('mfa_enabled', 'true');
  //           this.mfaEnabled = true;
  //           this.imageURL = null;
  //           this.notifyService.showSuccess(result?.message || 'OTP verified!')
  //         }else{
  //           this._cookieService.put('mfa_enabled', 'false');
  //           this.mfaEnabled = false;
  //           this.notifyService.showError(result?.message || 'Invalid Code!')
  //         }
  //       },
  //       error: error => {
  //         console.log('Error', error);
  //         this._cookieService.put('mfa_enabled', 'false');
  //         this.mfaEnabled = false;
  //         this.notifyService.showError(error?.error?.message || 'Invalid Code!')
  //       }
  //     });
  //   }
  // }

  public stripePublicKey: any = '';
  getStripeKey() {
    // this.profileSettingsService.getStripeKey().subscribe((res) => {
    //   this.stripePublicKey = res.pKey;
    //   this.stripeService.setKey(this.stripePublicKey);
    //   this.getStripeForm();
    // }, error => {});
    this.stripeService.setKey(environment.stripeKey);
    this.getStripeForm();
  }

  getStripeForm() {
    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.cardNumber = this.elements.create('cardNumber', {
          style: this.cardStyle,
        });
        this.cardExpiry = this.elements.create('cardExpiry', {
          style: this.expStyle,
        });
        this.cardCvc = this.elements.create('cardCvc', {
          style: this.cvcStyle,
        });
        this.cardNumber.mount('#example3-card-number');
        this.cardExpiry.mount('#example3-card-expiry');
        this.cardCvc.mount('#example3-card-cvc');
      }
    });
  }

  ngAfterViewInit() {
    $('#title').html('Profile Settings');
    $('.header_filters').addClass('hide_header');
  }

  /* CHECK PERMISSIONS */
  // public permisions = '';
  public showCard = false;
  getRoles() {
    this.rolesUsersService.getRoles().subscribe({
      next: res => {
        let permisions = [];
          res.data.forEach(result => {
            if (result.role_id.toString() == this._cookieService.get('user_type'))
              permisions = result.permisions;
          });

          if (
            (permisions &&
            permisions.indexOf('profilesettings') >= 0 &&
              this.userType != '7')
          ) {
            this.showCard = true;
            this.getPaymentDetails();
          }
      },
      error: error => {},
    });
  }
  /* CHECK PERMISSIONS */
  // Sufix and prefix
  hide = true;
  public customer_id;
  public last_invoic_id;
  buy() {
    const name: any = this.stripeTest.get('name').value;
    this.stripeService.createToken(this.cardNumber, { name }).subscribe(obj => {
      if (obj.token) {
        this.token = obj.token.id;
        $('.ajax-loader').show();
        this.profileSettingsService
          .updateCardRetryPayment(
            this.token,
            this.customer_id,
            this.last_invoic_id
          )
          .subscribe(
            res => {
              $('.ajax-loader').hide();
              if (res.status == 200) {
                this.getPaymentDetails();
                if (res.body.data == 'Payment Generated Successfully!') {
                  Swal.fire('', 'Payment Generated Succesfully!', 'success');
                } else if (res.body.data == 'Card Updated Successfully!') {
                  Swal.fire('', 'Card Updated Successfully!', 'success');
                }
              } else if (res.body.message == 'error') {
                Swal.fire(
                  '',
                  'Some issue with your card, Please try again!',
                  'error'
                );
              }
            },
            error => {}
          );
      } else {
        console.log('Error comes ');
      }
    });
  }

  retryPayment() {
    $('.ajax-loader').show();
    this.profileSettingsService
      .retryPayment(this.customer_id, this.last_invoic_id)
      .subscribe(
        res => {
          $('.ajax-loader').hide();
          if (res.status == 200) {
            this.getPaymentDetails();
            Swal.fire('', 'Payment Generated Succesfully!', 'success');
          } else if (res.body.message == 'error') {
            Swal.fire(
              '',
              'Your card is declined, Please change your card Details.',
              'error'
            );
          }
        },
        error => {}
      );
  }
  public subscription_id = '';
  getPaymentDetails() {
    this.profileSettingsService.getPaymentDetails().subscribe(
      res => {
        if (res.status == 200) {
          this.last_invoic_id = res.body.data.lastinvoiceid;
          this.customer_id = res.body.data.customer_id;
          this.subscription_id = res.body.data.subscr_id;
          if (this.subscription_id) this.getCardDetails();
          if (!this.last_invoic_id) {
            let opts = this.constants.cookieOpt as CookieOptions;
            this._cookieService.put('login_status', '1', opts);
          }
        } else if (res.status == 401) {
          this._cookieService.put('username', '');
          this._cookieService.put('email', '');
          this._cookieService.put('userid', '');
          this.router.navigateByUrl('/login');
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }
  public last4;
  getprofileSettings() {
    this.profileSettingsService.getprofileSettings(this.id).subscribe({
      next: res => {
        if (res.status == 200) {
          this.displayName = res.body.data[0].displayName;
          this.email = res.body.data[0].email;
        }
      },
      error: error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      },
    });
  }
  getCardDetails() {
    this.profileSettingsService.getCardDetails(this.customer_id).subscribe(
      res => {
        this.last4 = res.last4;
      },
      error => {}
    );
  }

  setupIntent() {
    const name = this.stripeTest.get('name').value;
    this.stripeService.createToken(this.cardNumber, { name }).subscribe(obj => {
      if (obj.token) {
        $('.ajax-loader').show();
        this.profileSettingsService
          .createSetupIntent(this.customer_id)
          .subscribe(res => {
            if (res.status == 200) {
              this.stripeService
                .confirmCardSetup(res.body.data.client_secret, {
                  payment_method: {
                    card: this.cardNumber,
                    billing_details: {
                      name: 'dsf',
                    },
                  },
                })
                .subscribe(result => {
                  this.cardNumber.clear();
                  this.cardCvc.clear();
                  this.cardExpiry.clear();
                  if (
                    result.setupIntent &&
                    result.setupIntent.status == 'succeeded'
                  ) {
                    this.updateCustomerCard();
                  } else {
                    $('.ajax-loader').hide();
                    this.cardNumber.clear();
                    this.cardCvc.clear();
                    this.cardExpiry.clear();
                    Swal.fire(
                      '',
                      'There was an issue updating your card details - please contact Jeeve support',
                      'error'
                    );
                  }
                });
            } else if (res.body.message == 'error') {
              $('.ajax-loader').hide();
              this.cardNumber.clear();
              this.cardCvc.clear();
              this.cardExpiry.clear();
              Swal.fire(
                '',
                'There was an issue updating your card details - please contact Jeeve support',
                'error'
              );
            }
          });
      } else {
        console.log('Error comes ');
      }
    });
  }
  updateCustomerCard() {
    this.profileSettingsService
      .updateCustomerCard(this.customer_id)
      .subscribe(res => {
        if (res.status == 200) {
          this.getCardDetails();
          $('.ajax-loader').hide();
          Swal.fire('', 'Card Updated Successfully!', 'success');
        }
      });
  }

  public displayName;
  public display_name;
  public imageURL: any;
  onSubmitBasic() {
    this.displayName = $('#displayName').val();
    this.email = $('#email').val();
    this.imageURL = $('#imageURL').val();
    $('.ajax-loader').show();
    var image = '';
    if (this.imageURL) {
      var imageObj = this.imageURL.split('/profile_');
      image = 'profile_' + imageObj[1];
    }
    this.profileSettingsService
      .updateprofileSettings(this.displayName, this.email)
      .subscribe(
        res => {
          $('.ajax-loader').hide();
          if (res.status == 200) {
            let opts = this.constants.cookieOpt as CookieOptions;
            this.displayName = res.body.data.display_name;
            this._cookieService.put('display_name', this.displayName, opts);
            /*this._cookieService.put("user_image", this.imageURL, opts);*/
            if (this.imageURL) {
              $('.suer_image_sidebar img').attr('src', this.imageURL);
              /*this._cookieService.put("user_image", this.imageURL, opts);*/
            }
            $('.suer_text_sidebar').html(this.displayName.toUpperCase());
            this.toastr.success('Profile Settings Updated .');
          }
        },
        error => {
          this.warningMessage = 'Please Provide Valid Inputs!';
        }
      );
  }

  onSubmitHealthScreen() {
    this.health_screen_mtd = this.healthSettings.value.health_screen_mtd;
    this.max_chart_bars = this.healthSettings.value.max_chart_bars;
    this.profileSettingsService
      .updateprofileSettingsHealthScreen(this.health_screen_mtd, this.max_chart_bars)
      .subscribe({
        next: res => {
          if (res.status == 200) {
            this._cookieService.put(
              'health_screen_mtd',
              this.health_screen_mtd
            );
            
            this._cookieService.put(
              'max_chart_bars',
              this.max_chart_bars.toString()
            );

            updateUserData({
              healthScreenMtd: this.health_screen_mtd,
              maxChartBars: this.max_chart_bars
            });
            this.toastr.success('Profile Settings Updated .');
          }
        },
        error: error => {
          this.warningMessage = 'Please Provide Valid Inputs!';
        },
      });
  }

  public errorLogin = false;
  public errortext = '';
  public successLogin = false;
  public successtext = '';
  public formSettings: UntypedFormGroup;
  public healthSettings: UntypedFormGroup;
  public currentPassword;
  public newPassword;
  public repeatPassword;
  public changePasswordError: any = {
    required: false,
    minlength: false,
    pattern: false,
    crequired: false,
  };
  public currentPasswordError = { required: false };
  onSubmitPassword() {
    this.changePasswordError = {
      required: false,
      minlength: false,
      pattern: false,
      crequired: false,
    };
    this.currentPasswordError = { required: false };
    if (this.form.controls['currentPassword'].hasError('required')) {
      this.currentPasswordError.required = true;
      return false;
    }
    if (this.form.controls['newPassword'].hasError('required')) {
      this.changePasswordError.required = true;
      return false;
    }
    if (this.form.controls['newPassword'].hasError('minlength')) {
      this.changePasswordError.minlength = true;
      return false;
    }
    if (this.form.controls['newPassword'].hasError('pattern')) {
      this.changePasswordError.pattern = true;
      return false;
    }
    if (this.form.controls['repeatPassword'].hasError('crequired')) {
      this.changePasswordError.crequired = true;
      return false;
    }
    this.errorLogin = false;
    this.errortext = '';
    this.successLogin = false;
    this.successtext = '';
    this.currentPassword = this.form.value.currentPassword;
    this.newPassword = this.form.value.newPassword;
    this.repeatPassword = this.form.value.repeatPassword;
    if (this.newPassword == this.repeatPassword) {
      this.profileSettingsService
        .updatePassword(this.currentPassword, this.newPassword)
        .subscribe(
          res => {
            if (res.status == 200) {
              this.toastr.success(res.body.data);
              this.form.reset();
            } else {
              this.toastr.error(res.body.data);
            }
          },
          error => {
            this.toastr.error('Please Provide Valid Inputs!');
          }
        );
    } else {
      this.errorLogin = true;
      this.toastr.error("Password and Confirm Password doesn't Match!");
    }
    return true;
  }

  /******** GET CHARTS TIPS*****/
  public chartsTips: any = {};
  public dashboards: any = {};
  public chartsTipsLoader: boolean = true;
  getChartsTips() {
    this.chartsTipsLoader = true;
    this.profileSettingsService.getChartsTips().subscribe(
      resp => {
        this.chartsTipsLoader = false;
        if (resp.status == 200) {
          resp.body.data.forEach(tip => {
            if (typeof (this.dashboards[tip.dashboard_id] == 'undefined')) {
              this.dashboards[tip.dashboard_id] = tip.dashboard_name;

              /*if(tip.dashboard_name.indexOf('-') > 0){
                this.dashboards[tip.dashboard_id] = tip.dashboard_name.split('-')[1];
              } else {
                this.dashboards[tip.dashboard_id] = tip.dashboard_name;
              }*/
            }

            if (typeof this.chartsTips[tip.dashboard_id] == 'undefined') {
              this.chartsTips[tip.dashboard_id] = [];
            }
            var temp = {
              id: tip.id,
              chart_id: tip.chart_id,
              title: tip.title,
              tip_title: tip.tip_title ? tip.tip_title : tip.title,
              description: tip.tip_description
                ? tip.tip_description
                : tip.description,
              dashboard_id: tip.dashboard_id,
            };
            this.chartsTips[tip.dashboard_id].push(temp);
          });
        }
      },
      error => {}
    );
  }
  /******** GET CHARTS TIPS*****/

  /******** SAVE CHARTS TIPS*****/
  saveTips() {
    this.chartsTipsLoader = true;
    var tipsData: any = JSON.stringify(this.chartsTips);
    this.profileSettingsService.saveChartsTips(tipsData).subscribe(
      resp => {
        this.chartsTipsLoader = false;
        if (resp.status == 200) {
          Swal.fire('', 'Chart Tips have been updated successfully', 'success');
        }
      },
      error => {}
    );
  }
  /******** SAVE CHARTS TIPS*****/

  /********* Check Length****************/
  checkLenth(event, type) {
    let key = event.keyCode || event.which;
    if (event.target.value.length >= 50 && type == 'title') {
      if (key != 8) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    } else if (event.target.value.length >= 400 && type == 'discription') {
      if (key != 8) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
    return true;
  }
  /********* Check Length****************/
}
