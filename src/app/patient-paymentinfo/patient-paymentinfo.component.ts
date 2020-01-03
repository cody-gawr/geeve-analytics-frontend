import { Component,OnInit,Inject, EventEmitter,Output, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { PatientPaymentinfoService } from './patient-paymentinfo.service';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { DatePipe,formatDate } from '@angular/common';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { empty } from 'rxjs';
import Swal from 'sweetalert2';

const data: any = [];
@Component({
  selector: 'app-formlayout',
  templateUrl: './patient-paymentinfo.component.html',
  styleUrls: ['./patient-paymentinfo.component.scss']
})
export class PatientPaymentinfoComponent implements OnInit {
  private readonly notifier: NotifierService;
  public formPatient: FormGroup;
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  public id:any ={};
  public imageURL:any;
  public patient_amount : any;
  public member_plan_id:any;
  public total_subpatient:any;
  public contract_url:any;
  public plan_name:any;
  public form: FormGroup;
  options: FormGroup;
  public treatmentdata;
  private warningMessage: string;
  public treatmentName :any={};
  public totalsitting :any={};
  public sitting_id :any= {};
  public sitting_status :any={};
  public performed_date :any={};
  sittings=[];
  public clinic_id:any={};
  public user_id:any={};
  public memberplanid:any={};
  public invoice_date:any={};
  public benefit_patient_id: any={};
  public benefit_planid: any={};
  public patientid:any={};
  public membertreatmentid:any={};
  public payment_plan_name:any ={};
  public mainpatientname;
  public patient_status;
  public created;
  public totalAmount;
  public planLength;
  rows = [];
  rowsAppointments =[];
  benefit =[];
  payment=[];
  editing ={};
 public patient_id;
public patient_address;
public patientdob;
public patient_age;
public patient_gender;
public patient_phone_no;
public patient_home_phno;
public patient_name;
public patient_dob;
public preventative_frequency;
public preventative_count;

  constructor(notifierService: NotifierService,private fb: FormBuilder,public dialog: MatDialog,  private patientPaymentinfoService: PatientPaymentinfoService, private route: ActivatedRoute,private _cookieService: CookieService, private router: Router,breakpointObserver: BreakpointObserver,private datePipe: DatePipe) {
    this.notifier = notifierService;
    }
  
  ngOnInit() {
   
    this.id = this.route.snapshot.paramMap.get("id");
    this.getInofficePlan();
    this.getPaymentHistory();
   
    // $('.header_filters').removeClass('hide_header');
      this.route.params.subscribe(params =>  {
        $('#title').html('Patient Plan Detail');
     });

     this.formPatient = this.fb.group({
          patient_name: [null, Validators.compose([Validators.required])],
      patient_address: [Validators.compose([Validators.required])],
      patient_dob: [null, Validators.compose([Validators.required])],
       // patient_age: [null, Validators.compose([Validators.required])],
      patient_gender: [null, Validators.compose([Validators.required])],
      patient_phone_no: [null, Validators.compose([Validators.required])],
       patient_home_phno: [null, Validators.compose([Validators.required])],
      patient_status: [null, Validators.compose([Validators.required])]
    });
    
      }


//public plan_name;
public plan_description;
public total_amount;
public setup_fee;
public deposite_amount;
public balance_amount;
public payment_frequency;
public monthly_weekly_payment;
public duration;
public start_date;
  getInofficePlan() {

    this.patientPaymentinfoService.getInofficePlan(this.id).subscribe((res) => {
       if(res.message == 'success'){

        this.plan_name=res.data[0]['plan_name'];
        this.plan_description=res.data[0]['plan_description'];
        this.total_amount=res.data[0]['total_amount'];
        this.setup_fee = res.data[0]['setup_fee'];
        this.deposite_amount=res.data[0]['deposite_amount'];
        this.balance_amount=res.data[0]['balance_amount'];
        this.payment_frequency=res.data[0]['payment_frequency'];
        this.monthly_weekly_payment=res.data[0]['monthly_weekly_payment'];
        this.duration=res.data[0]['duration'];
        this.start_date=res.data[0]['start_date'];
        this.getPaymentHistory();
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

  getPaymentHistory() {
    this.patientPaymentinfoService.getPaymentHistory(this.id).subscribe((res) => {
       if(res.message == 'success'){
        this.payment = res.data;
        if(res.data[0])
        this.payment_plan_name=res.data[0]['member_plan']['planName'];
        }
        else if(res.status == '401'){
             this.payment = [];
           }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }

}