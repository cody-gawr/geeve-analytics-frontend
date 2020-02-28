import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
  import { InofficePaymentService } from './inoffice-payment.service';
import { LoginService } from '../login/login.service';
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { Http} from '@angular/http';
import { StripeInstance, StripeFactoryService } from "ngx-stripe";
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { environment } from "../../environments/environment";
import {ChangeDetectorRef} from '@angular/core';
@Component({
  selector: 'app-inoffice-payment',
  templateUrl: './inoffice-payment.component.html',
  styleUrls: ['./inoffice-payment.component.scss']
})
export class InofficePaymentComponent implements OnInit {
  public cardStyle = {
    base: {
      color: '#424242',
      fontWeight: 400,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      padding:'10px',

      ':focus': {
        color: '#424242',
      },

      '::placeholder': {
        color: '#9e9e9e',
      },

      ':focus::placeholder': {
        color: '#9e9e9e',
      },
    },
    invalid: {
      color: '#a94442',
      ':focus': {
        color: '#a94442',
      },
      '::placeholder': {
        color: '#9e9e9e',
      },
    },
  };


  public expStyle = {
    base: {
      color: '#424242',
      fontWeight: 400,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#424242',
      },

      '::placeholder': {
        color: '#9e9e9e',
      },

      ':focus::placeholder': {
        color: '#9e9e9e',
      },
    },
    invalid: {
      color: '#a94442',
      ':focus': {
        color: '#a94442',
      },
      '::placeholder': {
        color: '#9e9e9e',
      },
    },
  };

public cvcStyle = {
    base: {
      color: '#424242',
      fontWeight: 400,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#424242',
      },

      '::placeholder': {
        color: '#9e9e9e',
      },

      ':focus::placeholder': {
        color: '#9e9e9e',
      },
    },
    invalid: {
      color: '#a94442',
      ':focus': {
        color: '#a94442',
      },
      '::placeholder': {
        color: '#9e9e9e',
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
  public token;
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
  public clinic_logo;
    elementsOptions: ElementsOptions = {
    };
    elements: Elements;
    card: StripeElement;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private inofficePaymentService: InofficePaymentService,private _cookieService: CookieService, private route: ActivatedRoute, private stripeService: StripeService, private http : Http, private ref: ChangeDetectorRef) {
    this.DefaultLogo=this.homeUrl+"/assets/img/logo.png";
  }

   ngOnInit() {
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
            this.selectedIndex =0;;
            }
            });
     this.route.params.subscribe(params => {
      this.id = this.route.snapshot.paramMap.get("id");
    this.checkInvoiceStatus();      
    });
    this.getInofficePlanDetails();
  }

    buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
    .createToken(this.cardNumber, { name })
    .subscribe(obj => {
    if (obj) {
 this.token = obj.token.id;
      $('.ajax-loader').show();
    this.inofficePaymentService.createInofficeSubscription(this.token,this.plan_description,this.monthly_weekly_payment,this.duration,this.id,this.patient_id, this.clinic_id, this.payment_frequency, this.balance_amount).subscribe((res) => {
           if(res.message == 'success'){
              this.updatePatients('ACTIVE');
           }
           else if(res.message == 'error'){
              this.errorLogin  =true;
           }
          }, error => {
          });
    } else {
      console.log("Error comes ");
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
  getInofficePlanDetails() {
    this.inofficePaymentService.getInofficePlanDetails(this.id).subscribe((res) => {  
       if(res.message == 'success'){
        this.patient_id = res.data[0].patient_id;
        this.getClinic(this.patient_id);
        this.plan_name = res.data[0].plan_name;
        this.plan_description = res.data[0].plan_description;
        this.total_amount = res.data[0].total_amount;
        this.balance_amount = res.data[0].balance_amount;
        this.payment_frequency = res.data[0].payment_frequency;
        this.monthly_weekly_payment = res.data[0].monthly_weekly_payment;
        this.duration = res.data[0].duration;
        this.payment_frequency = res.data[0].payment_frequency;
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
  public clinic_id;


  checkInvoiceStatus() {
      this.inofficePaymentService.checkInvoiceStatus(this.id).subscribe((res) => {  
       if(res.message == 'success'){
          if(res.data[0]['status'] == 'ACTIVE')
             this.router.navigateByUrl('/login');            
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

getClinic(patient_id) {
      this.inofficePaymentService.getClinic(patient_id).subscribe((res) => {  
       if(res.message == 'success'){
          this.clinic_id= res.data[0]['clinic']['id'];
          this.clinic_logo= res.data[0]['clinic']['logo'];
          if(this.clinic_logo == "undefined")
            this.clinic_logo = this.DefaultLogo;
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
onSubmit() {
  this.errorLogin  =false;
  var count_patient = this.rows.length;
  if(this.rows.length>1)
    var patient_amount = this.rows[count_patient -2]['sub_patients_amount'];
  else
    var patient_amount = this.rows[0]['sub_patients_amount'];
  if(count_patient < 4)
    patient_amount = patient_amount - Math.floor(this.discount/patient_amount*100);
    this.patient_amount =this.patient_amount+ patient_amount;
      $('.ajax-loader').show();  
    this.inofficePaymentService.addSubPatients(this.form.value.name,this.form.value.age,this.form.value.gender,patient_amount,this.id).subscribe((res) => {
      $('.ajax-loader').hide();     
       if(res.message == 'success'){
        this.updatePatients('INACTIVE');
       }
       else if(res.message == 'error'){
          this.errorLogin  =true;
       }
    }, error => {
    });
  }

  updatePatients(status) { 
    this.inofficePaymentService.updatePatients(this.patient_amount,status, this.id).subscribe((res) => {
      $('.ajax-loader').hide();      
       if(res.message == 'success'){
              window.location.href = '/thank-you/'+this.clinic_id; 
       }
       else if(res.message == 'error'){
          this.errorLogin  =true;
       }
    }, error => {
    });
  }

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc',
      locale: 'auto',                                                                                                 
      token: token => {
      $('.ajax-loader').show();
           this.inofficePaymentService.createInofficeSubscription(token,this.plan_name,this.monthly_weekly_payment,this.duration,this.id,this.patient_id,this.clinic_id,this.payment_frequency, this.balance_amount).subscribe((res) => {
           $('.ajax-loader').hide();
           if(res.message == 'success'){
                this.updatePatients('ACTIVE');
              window.location.href = '/thank-you/'+this.clinic_id; 
           }
           else if(res.message == 'error'){
              this.errorLogin  =true;
           }
          }, error => {
          });
      }
     });
    handler.open({      
      name:  this.planName,
      amount: this.amount
    });
 
  }
public tabActive1= false;
public selectedIndex=1;
  startPayment() {
    if(!this.tabActive1)
    this.tabActive1= true;
    this.selectedIndex=this.selectedIndex +1;
     this.ref.detectChanges();
  }

}
