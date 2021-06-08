import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ProfileSettingsService } from './profile-settings.service';
import { ActivatedRoute } from "@angular/router";
import { CookieService, CookieOptions } from "ngx-cookie";
import { Router  } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { CustomValidators } from 'ng2-validation';
import {
  StripeElementsOptions
} from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { RolesUsersService } from '../roles-users/roles-users.service';

const passwordValidation = new FormControl('', [Validators.required, Validators.minLength(10)]);
const confirmPasswordValidation = new FormControl('', CustomValidators.equalTo(passwordValidation));

@Component({
  selector: 'app-formlayout',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
   elementsOptions: StripeElementsOptions = {
    };
    elements;
    card;

  public cardStyle = {
    base: {
      color: '#fff',
      fontWeight: 400,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      padding:'10px',

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
   stripeTest: FormGroup;
   public form: FormGroup;
  public cardNumber;
  public cardExpiry;
  public cardCvc;
  old_password_error;
  confirm_password_error;
   public clinic_id:any ={};

          private warningMessage: string;
          public id:any ={};
          public clinicName:any =0;
          public contactName =0;
          // public chartData: any[] = [];
          public address:any = {};
          public practice_size:any ={};
          options: FormGroup;
          public xero_link;
          public xeroConnect = false;
          public xeroOrganization='';
          public email;
  constructor(private _cookieService: CookieService, private fb: FormBuilder,  private profileSettingsService: ProfileSettingsService, private route: ActivatedRoute,private stripeService: StripeService, private router: Router,private toastr: ToastrService,private rolesUsersService: RolesUsersService) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }
    
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = this.route.snapshot.paramMap.get("id");
        this.displayName = this._cookieService.get("display_name");
        this.email = this._cookieService.get("email");  
        this.imageURL = this._cookieService.get("user_image");   
        if( this._cookieService.get("user_type") != '2')     
          this.getRoles();
          this.getPaymentDetails();
          this.stripeService.setKey('pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc');
          this.stripeTest = this.fb.group({
            name: ['', [Validators.required]]
          });

        //  this.getprofileSettings();
        $('#title').html('Profile Settings');
        $('.header_filters').addClass('hide_header'); 
      // this.checkXeroStatus();
      });
      this.form = this.fb.group({
        currentPassword: [null, Validators.compose([Validators.required])],
        newPassword: passwordValidation,
        repeatPassword: confirmPasswordValidation      
      });
      this.formSettings = this.fb.group({
        email: [null, Validators.compose([Validators.required])],
        displayName: [null, Validators.compose([Validators.required])],
      });
    }


    ngAfterViewInit(){
      this.stripeService.elements(this.elementsOptions).subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.cardNumber = this.elements.create('cardNumber', {
            style: this.cardStyle
          });
        this.cardExpiry = this.elements.create('cardExpiry', {
          style: this.expStyle
        });
        this.cardCvc = this.elements.create('cardCvc', {
          style: this.cvcStyle
        });
        this.cardNumber.mount('#example3-card-number');
        this.cardExpiry.mount('#example3-card-expiry');
        this.cardCvc.mount('#example3-card-cvc');   
        }
      });
    }


  public permisions='';
  public showCard = true;
getRoles() {      
   this.rolesUsersService.getRoles().subscribe((res) => {
       if(res.message == 'success'){ 
         res.data.forEach(result => {
          if(result.role_id == this._cookieService.get("user_type"))
            this.permisions =result.permisions;
         });
    if(this.permisions,(this.permisions.split(",")).indexOf("profilesettings")<0)
      this.showCard= false;
       }
    }, error => {
    });
  }
  // Sufix and prefix
  hide = true;
public customer_id;
  public last_invoic_id;
   buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
    .createToken(this.cardNumber, { name })
    .subscribe(obj => {
    if (obj.token) {
 this.token = obj.token.id;
      $('.ajax-loader').show();
    this.profileSettingsService.updateCardRetryPayment(this.token, this.customer_id,this.last_invoic_id).subscribe((res) => {
      $('.ajax-loader').hide();
           if(res.message == 'success'){
            this.getPaymentDetails();
            if(res.data == 'Payment Generated Successfully!') {
             Swal.fire(
                  '',
                  'Payment Generated Succesfully!',
                  'success'
                )
            }
            else if(res.data == 'Card Updated Successfully!') {
                Swal.fire(
                  '',
                  'Card Updated Successfully!',
                  'success'
                )
            }
           }
           else if(res.message == 'error'){
              Swal.fire(
                  '',
                  'Some issue with your card, Please try again!',
                  'error'
                )
           }
          }, error => {
          });
    } else {
      console.log("Error comes ");
    }
    });
    }


  retryPayment() {
      $('.ajax-loader').show();
      this.profileSettingsService.retryPayment(this.customer_id,this.last_invoic_id).subscribe((res) => {
             $('.ajax-loader').hide();
             if(res.message == 'success'){
            this.getPaymentDetails();              
              Swal.fire(
                  '',
                  'Payment Generated Succesfully!',
                  'success'
                )
             }
             else if(res.message == 'error'){
                Swal.fire(
                  '',
                  'Your card is declined, Please change your card Details.',
                  'error'
                )
             }
            }, error => {
     });
  }
public subscription_id='';
   getPaymentDetails() {
  this.profileSettingsService.getPaymentDetails().subscribe((res) => {
       if(res.message == 'success'){
        this.last_invoic_id = res.data.lastinvoiceid;
        this.customer_id = res.data.customer_id; 
          this.subscription_id = res.data.subscr_id; 
         if(this.subscription_id)
          this.getCardDetails();
        if(!this.last_invoic_id){
          let opts  = { expires: new Date('2030-07-19') } as CookieOptions;
        this._cookieService.put("login_status", '1', opts);
        }
       }
        else if(res.status == '401'){
            this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }
public last4;
  getprofileSettings() {
  this.profileSettingsService.getprofileSettings(this.id).subscribe((res) => {
       if(res.message == 'success'){
        this.displayName = res.data[0].displayName;
        this.email = res.data[0].email;

       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }
getCardDetails() {
      this.profileSettingsService.getCardDetails(this.customer_id).subscribe((res) => {
        this.last4 = res.last4;
      }, error => {
      });
  }



   setupIntent() {
        this.stripeService
    .createToken(this.cardNumber, { name })
    .subscribe(obj => {
    if (obj.token) {
    const name = this.stripeTest.get('name').value;
      $('.ajax-loader').show();
    this.profileSettingsService.createSetupIntent(this.customer_id).subscribe((res) => {
      if(res.message == 'success'){
             this.stripeService.confirmCardSetup(res.data.client_secret,{
                    payment_method: {
                      card: this.cardNumber,
                      billing_details: {
                        name: 'dsf',

                      },
                    },
                  })
                   .subscribe((result) => {
                        this.cardNumber.clear();
                      this.cardCvc.clear();
                      this.cardExpiry.clear();
                    if(result.setupIntent && result.setupIntent.status == 'succeeded'){                      
                      this.updateCustomerCard();
                    }
                    else{
                        $('.ajax-loader').hide();
                            this.cardNumber.clear();
                            this.cardCvc.clear();
                            this.cardExpiry.clear();
                    Swal.fire(
                        '',
                        'Some issue with your card, Please try again!',
                        'error'
                      )
                    }
                  });
        }
      });
    } else {
      console.log("Error comes ");
    }
    });
    } 
updateCustomerCard(){
  this.profileSettingsService.updateCustomerCard(this.customer_id).subscribe((res) => {
              if(res.message == 'success'){
                 $('.ajax-loader').hide();
                  Swal.fire(
                        '',
                        'Card Updated Successfully!',
                        'success'
                      )
              }           
   });
}

public displayName;
public display_name;
public imageURL:any;
  onSubmitBasic() {
  this.displayName = $("#displayName").val();
  this.email = $("#email").val();
  this.imageURL = $("#imageURL").val();
             $('.ajax-loader').show();
   var image ='';          
   if(this.imageURL){
    var imageObj = this.imageURL.split('/profile_');
    image = 'profile_'+imageObj[1];
   }          
   this.profileSettingsService.updateprofileSettings(this.displayName, this.email, image).subscribe((res) => {
             $('.ajax-loader').hide();

       if(res.message == 'success'){
        let opts = { expires: new Date('2030-07-19')} as CookieOptions;
        this._cookieService.put("display_name", this.displayName, opts);
        this._cookieService.put("user_image", this.imageURL, opts);
        this.display_name = this.displayName;
         if(this.imageURL) {
        $(".suer_image_sidebar img").attr('src' , this.imageURL);
        this._cookieService.put("user_image", this.imageURL, opts);
      }
        $(".suer_text_sidebar").html(this.display_name.toUpperCase());
         this.toastr.success('Profile Settings Updated .');  
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  } 

public errorLogin = false;
  public errortext ="";
  public successLogin =false;
  public successtext ="";
  public formSettings: FormGroup;
public currentPassword;
public newPassword;
public repeatPassword;
public changePasswordError:any = {'required': false,'minlength': false,'pattern': false,'crequired': false};
 onSubmitPassword() {
this.changePasswordError = {'required': false,'minlength': false,'pattern': false,'crequired': false};
 if(this.form.controls['newPassword'].hasError('required')){
      this.changePasswordError.required = true;     
      return false;      
  }
  if(this.form.controls['newPassword'].hasError('minlength')){
      this.changePasswordError.minlength = true;     
      return false;      
  }
  if(this.form.controls['newPassword'].hasError('pattern')){
      this.changePasswordError.pattern = true;     
      return false;      
  }
  if(this.form.controls['repeatPassword'].hasError('crequired')){
      this.changePasswordError.crequired = true;     
      return false;      
  }
  this.errorLogin = false;
  this.errortext ="";
  this.successLogin = false;
  this.successtext ="";
  this.currentPassword = this.form.value.currentPassword;
  this.newPassword = this.form.value.newPassword;
  this.repeatPassword = this.form.value.repeatPassword;
  if(this.newPassword == this.repeatPassword) {
       this.profileSettingsService.updatePassword(this.currentPassword, this.newPassword).subscribe((res) => {
           if(res.message == 'success'){
            this.toastr.success(res.data);
            this.form.reset();
           }
           else{
              this.toastr.error(res.data);
            }
        }, error => {
          this.toastr.error('Please Provide Valid Inputs!');
        }    
        );
     }
     else {
      this.errorLogin = true;
       this.toastr.error("Password and Confirm Password doesn't Match!");
     }
  } 
public fileToUpload;
 uploadImage(files: FileList) {
             $('.ajax-loader').show();
    this.fileToUpload = files.item(0);
    if(this.fileToUpload.size <2097152) {
    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.profileSettingsService.logoUpload(formData).subscribe((res) => {
             $('.ajax-loader').hide();

      if(res.message == 'success'){
        this.imageURL= res.data;
        $(".suer_image_sidebar img").attr('src' , this.imageURL);
      }
    });
    }
    else{
       $('.ajax-loader').hide();
      this.toastr.error('Image Size should be less than 2 MB');

    }
  }




}
