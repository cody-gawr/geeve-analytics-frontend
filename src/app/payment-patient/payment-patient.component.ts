import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { PaymentPatientService } from './payment-patient.service';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "@nomadreservations/ngx-stripe";
import { LoginService } from '../login/login.service';
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-payment-patient',
  templateUrl: './payment-patient.component.html',
  styleUrls: ['./payment-patient.component.scss']
})
export class PaymentPatientComponent implements OnInit {
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
  public patient_name;
  public patient_email;
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private paymentPatientService: PaymentPatientService,private _cookieService: CookieService, private route: ActivatedRoute) {}

   ngOnInit() {
     this.route.params.subscribe(params => {
      this.id = this.route.snapshot.paramMap.get("id");
    });
    this.getSubPatients();
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      dob: [null, Validators.compose([Validators.required])],
      gender: [null, Validators.compose([Validators.required])]
    });
  }

  getSubPatients() {
    this.paymentPatientService.getSubPatients(this.id).subscribe((res) => {  
       if(res.message == 'success'){
        this.rows = res.data[0]['sub_patients'];
        var patientArray ={};
        patientArray['sub_patients_name'] = res.data[0]['patient_name'];
        patientArray['sub_patients_dob'] = res.data[0]['patient_dob'];
        patientArray['sub_patients_gender'] = res.data[0]['patient_gender'];
        patientArray['sub_patients_amount'] = res.data[0]['member_plan']['totalAmount'];
        this.total_subpatient=res.data[0]['sub_patients'].length;
        this.rows = res.data[0]['sub_patients'];
        var sub_patient_length = this.rows.length;
        this.rows[sub_patient_length] = patientArray;
        this.patient_amount=res.data[0]['total_amount'];
        this.patient_name=res.data[0]['patient_name'];
        this.patient_email=res.data[0]['patient_email'];
        this.discount = res.data[0]['member_plan']['discount']; 
        this.member_plan_id= res.data[0]['member_plan_id'];
        this.plan_name=res.data[0]['member_plan']['planName'];
        this.user_id=res.data[0]['user_id'];
        this.stripe_plan_id =  this.plan_name.replace('',' ');
        }
        else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email",'');
              this._cookieService.put("token",'');
              this._cookieService.put("userid",'');
        }
        else {
        var patientArray ={};
        patientArray['sub_patients_name'] = res.data[0]['patient_name'];
        patientArray['sub_patients_dob'] = res.data[0]['patient_dob'];
        patientArray['sub_patients_gender'] = res.data[0]['patient_gender'];
        patientArray['sub_patients_amount'] = res.data[0]['member_plan']['totalAmount'];   
            var sub_patient_length = this.rows.length;
        this.rows[sub_patient_length] = patientArray;
        }
        console.log(this.rows);
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

onSubmit() {
  this.errorLogin  =false;
  var count_patient = this.rows.length;
  if(this.rows.length>1)
    var patient_amount = this.rows[count_patient -2]['sub_patients_amount'];
  else
    var patient_amount = this.rows[0]['sub_patients_amount'];
  if(count_patient < 4)
    patient_amount = patient_amount - Math.floor((this.discount/100)*patient_amount);
    this.patient_amount =this.patient_amount+ patient_amount;
      $('.ajax-loader').show();      
    this.paymentPatientService.addSubPatients(this.form.value.name,this.form.value.dob,this.form.value.gender,patient_amount,this.id).subscribe((res) => {
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

    this.paymentPatientService.updatePatients(this.patient_amount,status, this.id).subscribe((res) => {
      $('.ajax-loader').hide();      
       if(res.message == 'success'){
        this.getSubPatients();
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
           this.paymentPatientService.createSubscription(token,this.stripe_plan_id,this.id, this.patient_amount, this.member_plan_id, this.user_id,this.patient_name,this.patient_email).subscribe((res) => {
           if(res.message == 'success'){
              this.updatePatients('ACTIVE');

            alert('Payment Completed Successfully, Your Subscription is active now!');  
             this.router.navigate(['/']);
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
 //            this.amount = res.amount;
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
