import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
  import { UpdateCardService } from './update-card.service';
import { LoginService } from '../login/login.service';
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Http} from '@angular/http';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { environment } from "../../environments/environment";
import {ChangeDetectorRef} from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.scss']
})
export class UpdateCardComponent implements OnInit {
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
      color: '#FF0000',
      ':focus': {
        color: '#FF0000',
      },
      '::placeholder': {
        color: '#FF0000',
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
      color: '#FF0000',
      ':focus': {
        color: '#FF0000',
      },
      '::placeholder': {
        color: '#FF0000',
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
      color: '#FF0000',
      ':focus': {
        color: '#FF0000',
      },
      '::placeholder': {
        color: '#FF0000',
      },
    },
  };

   stripeTest: FormGroup;
  public form: FormGroup;
  public errorLogin = false;
  public plans =[];
  public plan_id;
  public id;
  public amount;
 
  public user_id;
  public stripe_plan_id;
  public planName;
  public successMessage;
  rows = [];
  public patient_amount : any;
  public member_plan_id:any;
  public total_subpatient:any;
  public contract_url:any;
  public plan_name:any;
  public warningMessage;
  public discount;
  public patient_id;
  public plan_description;
  public total_amount;
  public balance_amount;
  public monthly_weekly_payment;
  public duration;
  public payment_frequency;
  public cardNumber;
  public cardExpiry;
  public cardCvc;
  private homeUrl = environment.homeUrl;
 public DefaultLogo;
  public clinic_logo:any = '';
  public subscription_id;
          elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };
   public elements;
   public card;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private updateCardService: UpdateCardService,private _cookieService: CookieService, private route: ActivatedRoute, private stripeService: StripeService, private http : Http, private ref: ChangeDetectorRef,private toastr: ToastrService) {
    this.DefaultLogo=this.homeUrl+"/assets/img/logo.png";
  }

   ngOnInit() {
  //  this.stripeService.setKey('pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc');
            this.stripeTest = this.fb.group({
            name: ['', [Validators.required]]
            });

           
     this.route.params.subscribe(params => {
       this.string = this.route.snapshot.paramMap.get("subscr");
    this.id='';
    this.checkValidString();
   //   this.subscription_id = this.route.snapshot.paramMap.get("subscr");
    });
  }
public string;
public loading=true;
  checkValidString() {
  this.loading = true;
  $('.ajax-loader').show();
this.updateCardService.checkValidString(this.string).subscribe((res) => {  
  if(res && res.message == 'success'){
    this.subscription_id= res.data['id'];
    this.plan_type = res.data['type'];
     this.getCardDetails();      

    this.loading = false;
    $('.ajax-loader').hide();
  }
  else{
    this.toastr.success('Invalid Link.');
    $('.ajax-loader').hide();
 this.router.navigate(['/login']);
  }
});
}

  public last4;
  public invoice_id;
  public pending_amount;
  public updateCardRetryPayment;
  public customer;
  public plan_type;
  public stripe_account_id;
  getCardDetails() {
      this.updateCardService.getCardDetails(this.subscription_id,this.plan_type).subscribe((res) => {
          this.stripeService.setKey('pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc', { stripeAccount: res.stripe_account_id});     
          this.getStripe();

        this.last4 = res.last4;
        this.customer = res.customer;
        this.stripe_account_id= res.stripe_account_id;
        this.clinic_logo = res.clinic_logo;
         if(this.clinic_logo == 'undefined')
            this.clinic_logo="../assets/img/logo.png";
        this.invoice_id =res.payment[0]['invoice_id'];
        
        //this.invoice_id='3223324234234234324234';
        if(this.plan_type == 'payment plan')
        this.pending_amount= res.payment[0]['total_paid'];
        else
        this.pending_amount= res.payment[0]['amount'];

      }, error => {
      });
  }

  getStripe(){
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
  }

  retryPayment() {
      $('.ajax-loader').show();
      this.updateCardService.retryPayment(this.subscription_id,this.plan_type).subscribe((res) => {
             $('.ajax-loader').hide();
             if(res.message == 'success'){
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
public token;
public cardUpdated= false;
 //  buy() {
 //    this.cardUpdated=false;
 //    const name = this.stripeTest.get('name').value;
 //      $('.ajax-loader').show();
 //    this.updateCardService.updateCardRetryPayment(this.token, this.subscription_id,this.plan_type).subscribe((res) => {
 //      $('.ajax-loader').hide();
 // this.cardNumber.clear();
 //                      this.cardCvc.clear();
 //                      this.cardExpiry.clear();
 //           if(res.message == 'success'){
 //            this.cardUpdated= true;
 //             // Swal.fire(
 //             //      '',
 //             //      res.data,
 //             //      'success'
 //             //    )
 //           }
 //           else if(res.message == 'error'){
 //             this.cardNumber.clear();
 //                      this.cardCvc.clear();
 //                      this.cardExpiry.clear();
 //              Swal.fire(
 //                  '',
 //                  'Some issue with your card, Please try again!',
 //                  'error'
 //                )
 //           }
 //          }, error => {
 //             $('.ajax-loader').hide();
 // this.cardNumber.clear();
 //                      this.cardCvc.clear();
 //                      this.cardExpiry.clear();
 //                       Swal.fire(
 //                  '',
 //                  'Some issue with your card, Please try again!',
 //                  'error'
 //                )
 //          });
 //    } else {
 //      console.log("Error comes ");
 //    }
 //    });
 //    }


 setupIntent() {
    this.cardUpdated=false;
        this.stripeService
    .createToken(this.cardNumber, { name })
    .subscribe(obj => {
    if (obj.token) {
    const name = this.stripeTest.get('name').value;
      $('.ajax-loader').show();
    this.updateCardService.createSetupIntent(this.customer, this.stripe_account_id).subscribe((res) => {
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
                    console.log(result);
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
  this.updateCardService.updateCustomerCard(this.customer, this.stripe_account_id).subscribe((res) => {
              if(res.message == 'success'){
                if(this.invoice_id) {
                        this.retryPayment();
                      }
                 $('.ajax-loader').hide();
                         this.cardUpdated= true;
              }           
   });
}
        isDecimal(value) {
           if(typeof value != 'undefined')
            {
              if(String(value).includes("."))
              return true;
            }
      }
}
