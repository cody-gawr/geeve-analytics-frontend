import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ThankYouService } from './thank-you.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Http} from '@angular/http';
@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  public form: FormGroup;
  public errorLogin = false;
  public plans =[];
  public plan_id;
  public id;
  public memberPlanId;
  public patientId;
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
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  message: string;
  constructor( private http : Http,private fb: FormBuilder, private router: Router,private _cookieService: CookieService, private route: ActivatedRoute,  private ThankYouService: ThankYouService) {}

   ngOnInit() {
     this.route.params.subscribe(params => {
      this.id = this.route.snapshot.paramMap.get("id");
      this.memberPlanId = this.route.snapshot.paramMap.get("memberPlanId");
      this.patientId = this.route.snapshot.paramMap.get("patientId");
      this.getClinicInfo();
    });

    this.form = this.fb.group({
        name: [null, Validators.compose([Validators.required])],
        dob: [null, Validators.compose([Validators.required])],
        gender: [null, Validators.compose([Validators.required])]
    });
  }
  public clinicName;
  public getClinicInfo(){
    this.ThankYouService.getClinicSettings(this.id,this.patientId).subscribe((res) => {
     if(res.status =='401'){
           window.location.href = '/authentication/404'; 

     }else{
        if(res.message == 'success'){
          this.clinicName= res.data[0].clinicName;
        }

     }
    });
  }

}
