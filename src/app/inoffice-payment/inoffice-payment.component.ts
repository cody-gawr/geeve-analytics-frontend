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
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "@nomadreservations/ngx-stripe";
import { LoginService } from '../login/login.service';
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-inoffice-payment',
  templateUrl: './inoffice-payment.component.html',
  styleUrls: ['./inoffice-payment.component.scss']
})
export class InofficePaymentComponent implements OnInit {
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
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private inofficePaymentService: InofficePaymentService,private _cookieService: CookieService, private route: ActivatedRoute) {}

   ngOnInit() {
     this.route.params.subscribe(params => {
      this.id = this.route.snapshot.paramMap.get("id");
    });
    this.getInofficePlanDetails();
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
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }
  public clinic_id;
getClinic(patient_id) {
      this.inofficePaymentService.getClinic(patient_id).subscribe((res) => {  
       if(res.message == 'success'){
        this.clinic_id= res.data[0]['clinic_id'];
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
      $('.ajax-loader').show();
    this.inofficePaymentService.updatePatients(this.patient_amount,status, this.id).subscribe((res) => {
      $('.ajax-loader').hide();      
       if(res.message == 'success'){
        
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
        console.log(token);
      $('.ajax-loader').show();
           this.inofficePaymentService.createInofficeSubscription(token,this.plan_name,this.monthly_weekly_payment,this.duration,this.id,this.patient_id).subscribe((res) => {
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

 // getPlans() {
 //  this.errorLogin  =false;
 //  this.loginService.getPlans().subscribe((res) => {
 //       if(res.message == 'success'){
 //        res.data.forEach((res,key) => {                                                  
 //          var temp= {plan:'',allowedClinics:'',description:'',amount:'',discount:'',id:''};
 //          if(res.id== this.plan_id) {
 //            this.amount =                                                                                                      res.amount;
 //            this.stripe_plan_id = res.stripe_plan_id;
 //            this.planName = res.plan;
 //          }
 //          temp.id =res.id;          
 //          temp.plan =res.plan;
 //          temp.allowedClinics =res.allowedClinics;  
 //          temp.description =res.description;  
 //          temp.amount =res.amount;  
 //          temp.discount =res.discount; 
 //          this.plans.push(temp);
 //        });
 //       }
 //       else if(res.message == 'error'){
 //          this.errorLogin  =true;
 //       }
 //    }, error => {
 //    }    
 //    );
 //  }
 //  get_amount() {
 //    let id:any =  $('#plans').val();
 //    this.amount= this.plans[id].amount;
 //    this.stripe_plan_id = this.plans[id].stripe_plan_id;
 //  }

}
