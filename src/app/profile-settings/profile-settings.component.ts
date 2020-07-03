import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ProfileSettingsService } from './profile-settings.service';
import { ActivatedRoute } from "@angular/router";
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import { Router, NavigationEnd, Event  } from '@angular/router';
import { StripeInstance, StripeFactoryService } from "ngx-stripe";
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-formlayout',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
   elementsOptions: ElementsOptions = {
    };
    elements: Elements;
    card: StripeElement;

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
  constructor(private _cookieService: CookieService, private fb: FormBuilder,  private profileSettingsService: ProfileSettingsService, private route: ActivatedRoute,private stripeService: StripeService, private router: Router,private toastr: ToastrService) {
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
        this.getPaymentDetails();

        this.stripeService.setKey('pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc');
            this.stripeTest = this.fb.group({
            name: ['', [Validators.required]]
            });
            this.stripeService.elements(this.elementsOptions)
            .subscribe(elements => {
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
    //  this.getprofileSettings();
          $('#title').html('Profile Settings');
      $('.header_filters').addClass('hide_header'); 
         // this.checkXeroStatus();
     });
  

      this.form = this.fb.group({
      currentPassword: [null, Validators.compose([Validators.required])],
      newPassword: [null, Validators.compose([Validators.required])],
      repeatPassword: [null, Validators.compose([Validators.required])]      
    });
         this.formSettings = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      displayName: [null, Validators.compose([Validators.required])],

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

   getPaymentDetails() {
  this.profileSettingsService.getPaymentDetails().subscribe((res) => {
       if(res.message == 'success'){
        this.last_invoic_id = res.data.lastinvoiceid;
        this.customer_id = res.data.customer_id; 
        if(!this.last_invoic_id){
          let opts: CookieOptionsArgs = {
            expires: new Date('2030-07-19')
        };
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

public displayName;
public display_name;
public imageURL:any;
  onSubmitBasic() {
  this.displayName = $("#displayName").val();
  this.email = $("#email").val();
  this.imageURL = $("#imageURL").val();
             $('.ajax-loader').show();

   this.profileSettingsService.updateprofileSettings(this.displayName, this.email, this.imageURL).subscribe((res) => {
             $('.ajax-loader').hide();

       if(res.message == 'success'){
        let opts: CookieOptionsArgs = {
            expires: new Date('2030-07-19')
        };
        this._cookieService.put("display_name", this.displayName, opts);
        this._cookieService.put("user_image", this.imageURL, opts);
        this.display_name = this.displayName;
         if(this.imageURL) {
        $(".suer_image_sidebar img").attr('src' , this.imageURL);
        this._cookieService.put("user_image", this.imageURL, opts);
      }
        $(".suer_text_sidebar").html(this.display_name.toUpperCase());
       // this.notifier.notify( 'success', 'Profile Settings Updated' ,'vertical');
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
 onSubmitPassword() {
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
        this.successLogin = true;
        this.successtext = res.data;
       }
       else{
          this.errorLogin = true;     
          this.errortext = res.data;
        }
    }, error => {
      this.errorLogin = true;
      this.errortext = "Please Provide Valid Inputs!";
    }    
    );
 }
 else {
  this.errorLogin = true;
  this.errortext ="Password doesn't Match!";
 }
  } 
public fileToUpload;
 uploadImage(files: FileList) {
             $('.ajax-loader').show();

    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.profileSettingsService.logoUpload(formData).subscribe((res) => {
             $('.ajax-loader').hide();

      if(res.message == 'success'){
        this.imageURL= res.data;
      }
    });
  }




}
