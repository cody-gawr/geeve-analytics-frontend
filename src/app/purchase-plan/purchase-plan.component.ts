import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { PurchasePlanService } from './purchase-plan.service';
import { LoginService } from '../login/login.service';
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { EventEmitter , Output, Input,Inject} from '@angular/core';
import {ChangeDetectorRef} from '@angular/core';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { Http} from '@angular/http';
import { StripeInstance, StripeFactoryService } from "ngx-stripe";
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialogComponent {
   public clinic_id:any ={}; 
   show_dentist = false;
  public minDate: any =  new Date("1900-01-01");
  public maxDate: any = new Date();

  form:FormGroup;
  public dob_date;
public dob_month;
public dob_year;
public dates =['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
public months =[
{key:'01',value:"January"},{key:'02',value:"February"},{key:'03',value:"March"},
{key:'04',value:"April"},{key:'05',value:"May"},{key:'06',value:"June"},
{key:'07',value:"July"},{key:'08',value:"August"},{key:'09',value:"September"},
{key:'10',value:"October"},{key:'11',value:"November"},{key:'12',value:"December"}
];
public max_days =31;
public years:any = [];
public dob_larger_pop_error="";
  constructor(private fb: FormBuilder,private PurchasePlanService: PurchasePlanService,
        public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     var start_year =new Date().getFullYear();
     for (var i = start_year; i > start_year - 100; i--) {
      this. years.push(i);
     }
      data.dob_date='';
     data.dob_month='';
     data.dob_year='';
    this.form = this.fb.group({
      subPatientDob: [
        null
       // Validators.compose([Validators.required])
      ],
      subPatientName: [
        null,
        Validators.compose([Validators.required])
      ],
      dob_date: [
        null,
        Validators.compose([Validators.required])
      ],
      dob_month: [
        null,
        Validators.compose([Validators.required])
      ],
      dob_year: [
        null,
        Validators.compose([Validators.required])
      ],
      subPatientGender: [
        null,
        Validators.compose([Validators.required])
      ],
    });

   
  }

public invalid_dob = false;
checkDob(data,control) {
data.subPatientDob =  data.dob_year+"-"+data.dob_month+"-"+data.dob_date;
var input = data.subPatientDob;
var pattern =/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
  if(!pattern.test(input) || input.substring(0, 4)<'1900') {
  this.invalid_dob = true;
  }
  else {
  this.invalid_dob=false;  
  }

 if(control=='month' || control=='year'){
   this.max_days = this.getDaysInMonth(data.dob_year,data.dob_month);
   let a = Array(this.max_days).fill(0).map((i,idx) => idx +1);
   this.dates =a.map(this.updateDates);
   if(data.dob_month=="02" && data.dob_date > a.length){
     this.form.controls['dob_date'].setValue(a.length); 
   }
   
 }

 if(data.dob_year!="" && data.dob_month!="" && data.dob_date!=""){

   this.compareDateWithToday(data.dob_year,data.dob_month,data.dob_date);
}

}

compareDateWithToday(year,month,date){
 let mi = month.split('');
  if(mi[0]==='0'){
    month = Number(mi[1]) - 1;  month = "0"+month;
  }else{
    month = month -1;;
  }
  let selectedDate = new Date(year, month, date);  let Today = new Date();

   if(selectedDate > Today){
         //select current date and month with message
      let currentMonth :any = Today.getMonth().toString();
      if(currentMonth.length==1){
        currentMonth =Today.getMonth() + 1;
        currentMonth = "0"+currentMonth;
      }
     this.data.dob_date = Today.getDate();
     this.data.dob_month = currentMonth;
     this.data.dob_year = Today.getFullYear();

     //show message
     this.dob_larger_pop_error ="Dob cannot be greater than today's date .";
    
   }else{
     this.dob_larger_pop_error = "";
   }

}








updateDates(date){
  let newDate =date < 10 ? "0"+date : date ;
  return newDate.toString();

}
getDaysInMonth(year: number, month: number) {
  return 32 - new Date(year, month - 1, 32).getDate();
}

  private warningMessage: string;
  omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k==45); 
}
  save(data) {
   $('.form-control-dialog').each(function(){
      var likeElement = $(this).click();
   });
  if($.trim(data.subPatientName) != undefined  && $.trim(data.subPatientDob) != '' && data.subPatientGender != undefined){   
              var temp=[];
              var countPatient = data.patientData.length-1;
             temp['name'] =data.subPatientName;
             temp['dob'] = data.subPatientDob;
             temp['gender'] = data.subPatientGender;
             temp['discount'] = data.discount;
             if(countPatient<3)
             temp['amount'] =  data.patientData[0]['amount'] - (data.discount/100)*data.patientData[0]['amount'];
             else
             temp['amount'] =  data.patientData[countPatient]['amount'];
             data.patientData.push(temp);
             console.log(data, temp);
             data.totalAmountPatients = data.totalAmountPatients +  temp['amount'];
             this.dialogRef.close(data);          
  }else{
    return false;
   }
 }

toTrunc(value,n){  
    return Math.floor(value*Math.pow(10,n))/(Math.pow(10,n));
}

  onNoClick(): void {
    this.dialogRef.close();
  }
    @Output() public onDentist: EventEmitter<any> = new EventEmitter();
    public selected_id;

    loadDentist(val) {
      if(val == '4')
        this.show_dentist = true;
    }
} 

@Component({
  selector: 'app-purchase-plan',
  templateUrl: './purchase-plan.component.html',
  styleUrls: ['./purchase-plan.component.scss']
})
export class PurchasePlanComponent implements OnInit {
 elements: Elements;
  card: StripeElement;
public cardNumber;
public cardExpiry;
public cardCvc;
  // optional parameters
  elementsOptions: ElementsOptions = {
  };
 
  stripeTest: FormGroup;
  public form: FormGroup;
  public formStripe: FormGroup;
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
  public errorLoginText = '';
  public successLogin = false;
  public successLoginText = '';
  public clinic_id;
  public plan_amount;
  public selectedIndex =0;
  public patientData =[];
  public countPatientData = 0;
  public tabActive1= false;
  public tabActive2 = false;
  public subPatientName;
  public subPatientDob;
  public subPatientGender;
  public totalAmountPatients =0;
  public email;
  public minDate: any =  new Date("1900-01-01");
  public maxDate: any = new Date();
  public name;
  public patient_dob;
public dob_date;
public dob_month;
public dob_year;
public dates =['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
public months =[
{key:'01',value:"January"},{key:'02',value:"February"},{key:'03',value:"March"},
{key:'04',value:"April"},{key:'05',value:"May"},{key:'06',value:"June"},
{key:'07',value:"July"},{key:'08',value:"August"},{key:'09',value:"Sept"},
{key:'10',value:"October"},{key:'11',value:"November"},{key:'12',value:"December"}
];
public years:any = [];
public max_days =31;
public dob_larger_error="";
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private PurchasePlanService: PurchasePlanService,private _cookieService: CookieService, private route: ActivatedRoute, public dialog: MatDialog, private ref: ChangeDetectorRef, private stripeService: StripeService, private http : Http,private stripeSerivce: StripeService) {
    var start_year =new Date().getFullYear();
     for (var i = start_year; i > start_year - 100; i--) {
      this.years.push(i);
     }
     this.dob_date='';
     this.dob_month='';
     this.dob_year='';
     this.patient_dob = this.dob_year+"-"+this.dob_month+"-"+this.dob_date;


  }
  omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k==45); 
}
isDecimal(value) {
 if(typeof value != 'undefined')
  {
    if(String(value).includes("."))
    return true;
  }
}
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
  public act =false;

   ngOnInit() {    
      $('.ajax-loader').show();
    this.stripeService.setKey('pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc');
  this.PurchasePlanService.getPublishableKey().subscribe((res) => {
 //   this.stripeService.setKey(res.key);
       
       }, error => {
    });
           this.form = this.fb.group({
      patient_email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      patient_name: [
        null,
        Validators.compose([Validators.required])
      ],
      patient_dob: [
        null
     //  Validators.compose([Validators.required])
      ],
      termsCond: [
         null,
        Validators.compose([Validators.requiredTrue])
      ],patient_phone_no: [
        null,
        Validators.compose([Validators.required,
        Validators.minLength(8),
        Validators.pattern("^[0-9]*$")])
      ],
      dob_date: [null,Validators.compose([Validators.required])],
      dob_month: [null,Validators.compose([Validators.required])],
      dob_year: [null,Validators.compose([Validators.required]) ],
    });
     this.route.params.subscribe(params => {
      this.plan_id = atob(this.route.snapshot.paramMap.get("id"));
       var data =this.plan_id.split("&");
        this.plan_id = data[0];
        if(data[1]) {
        this.email = data[1];
        this.patient_email=this.email;
        }
        if(data[2]) {
        this.name = data[2];
        this.patient_name=this.name;
        }
    });
     this.getPlanDetail();
    this.getSubPatients();
    
    this.formStripe = this.fb.group({
      cardNumber: [
        null
      ],
      expiryMonth: [
        null,
        Validators.compose([Validators.required])
      ],
      expiryYear: [
        null,
        Validators.compose([Validators.required])
      ],
      cvc: [
        null,
        Validators.compose([Validators.required])
      ]
    });
  }

  getStripe(){
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
           //  this.card = this.elements.create('card', {
           //  style: {
           // base: {
           //     iconColor: '#424242',
           //     color: '#424242',
           //     lineHeight: '40px',
           //     fontWeight: 400,
           //     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
           //     fontSize: '18px',
           //     '::placeholder': {
           //         color: '#424242'
           //     }
           //    }
           //  }
           //  });
           // this.card.mount('#card-element');

            }
            });
  }

    buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
    .createToken(this.cardNumber, { name })
    .subscribe(obj => {
    if (obj.token) {
    $('.ajax-loader').show(); 
    this.token = obj.token.id;
   this.PurchasePlanService.addPatient(this.form.value.patient_email,this.form.value.patient_name,this.patient_dob,this.form.value.patient_phone_no,this.clinic_id,this.user_id,this.plan_id,this.totalAmountPatients).subscribe((res) => {
                    this.errorLogin = false;
                    this.errorLoginText = '';
                    this.successLogin = false;
                    this.successLoginText = '';
                     if(res.message == 'success'){
                      this.cardNumber.clear();
                      this.cardCvc.clear();
                      this.cardExpiry.clear();
                      this.patient_id = res.data.id;
                      if( this.patientData.length>1) {
                        var i=0;
                          this.patientData.forEach(res => {
                            if(i>0) {
                              this.PurchasePlanService.addSubPatients(res.name,res.dob,res.gender,res.amount,this.patient_id).subscribe((res) => {
                                   if(res.message == 'success'){
                                    //this.form.reset();
                                    if(i == this.patientData.length)
                                      this.createSubscription(this.token);
                                   }
                                   else if(res.message == 'error'){
                                  $('.ajax-loader').hide(); 
                                      this.errorLogin  =true;
                                   }
                                }, error => {
                                });
                             }
                              i++;
                          });
                          }
                          else {
                            this.createSubscription(this.token);
                          }
                      }
                     else if(res.message == 'error'){
                                  $('.ajax-loader').hide();
                                  this.cardNumber.clear();
                      this.cardCvc.clear();
                      this.cardExpiry.clear(); 
                        this.errorLogin  =true;
                        this.errorLoginText  =res.data;
                     }
                  }, error => {
              });
        //this.message = 'Success! Card token ${response.card.id}.`;
    } else {
      
    // Error creating the token
    console.log("Error comes ");
    }
    });
    }

  public termsText='sdfs';

  public visible=true;
  loadTerms() {
    this.visible=false;
    this.termsText = this.termsText;
    this.ref.detectChanges();  
  }

   loadForm() {
    this.visible=true;
    this.ref.detectChanges(); 
  }

  changeTab(index){
 //  $(".loader").show();
    this.selectedIndex =index;
     this.ref.detectChanges();

     
  }

  paymentStripe(){
    this.selectedIndex = 2;
    this.tabActive2 = true;
    $(".mat-tab-label-active").siblings('.mat-tab-label').click();
     var self = this;
     setTimeout(function(){
      self.getStripe();
     },500);  
       this.cardNumber.focus();
  }

  toTrunc(value,n){  
    return Math.floor(value*Math.pow(10,n))/(Math.pow(10,n));
}

  public message;
  public expiryMonth;
  public expiryYear;
  public cvc;
  public patient_id;
   getToken() {
    this.message = 'Loading...';
    $('.ajax-loader').show();
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        this.token = response.id;
   this.PurchasePlanService.addPatient(this.form.value.patient_email,this.form.value.patient_name,this.form.value.patient_dob,this.form.value.patient_phone_no,this.clinic_id,this.user_id,this.plan_id,this.totalAmountPatients).subscribe((res) => {
                    this.errorLogin = false;
                    this.errorLoginText = '';
                    this.successLogin = false;
                    this.successLoginText = '';
                     if(res.message == 'success'){
                      this.patient_id = res.data.id;
                      if( this.patientData.length>1) {
                        var i=0;
                          this.patientData.forEach(res => {
                            if(i>0) {
                              this.PurchasePlanService.addSubPatients(res.name,res.dob,res.gender,res.amount,this.patient_id).subscribe((res) => {
                                   if(res.message == 'success'){
                                    //this.form.reset();
                                    if(i == this.patientData.length)
                                      this.createSubscription(this.token);
                                   }
                                   else if(res.message == 'error'){
                                  $('.ajax-loader').hide(); 
                                      this.errorLogin  =true;
                                   }
                                }, error => {
                                });
                             }
                              i++;
                          });
                          }
                          else {
                            this.createSubscription(this.token);
                          }
                      }
                     else if(res.message == 'error'){
                                  $('.ajax-loader').hide(); 
                        this.errorLogin  =true;
                        this.errorLoginText  =res.data;
                     }
                  }, error => {
                       $('.ajax-loader').hide(); 
              });
        this.message = `Success! Card token ${response.card.id}.`;
      } else {
        this.message = response.error.message;
      }
    });  
  }

  createSubscription(token) {
    this.stripe_plan_id =  this.planName.replace('',' ');
      this.PurchasePlanService.createSubscription(token,this.stripe_plan_id,this.patient_id, this.totalAmountPatients, this.plan_id, this.user_id,this.form.value.patient_name,this.form.value.patient_email,this.clinic_id,this.planLength).subscribe((res) => {
           if(res.message == 'success'){
              this.updatePatients('ACTIVE');
           }
           else if(res.message == 'error'){
              this.errorLogin  =true;
           }
          }, error => {
      $('.ajax-loader').hide();
      });
  }
  
public planLength;
  public clinic_logo;
  getPlanDetail() {
    this.PurchasePlanService.getPlanDetail(this.plan_id).subscribe((res) => {
       if(res.message == 'success'){
          this.user_id = res.data[0].user_id;
          this.clinic_id = res.data[0].clinic_id;
          this.user_id = res.data[0].user_id;
          this.termsText = res.data[0].clinic.terms;
          this.planName = res.data[0].planName;
          this.planLength = res.data[0].planLength;
          this.discount = res.data[0].discount;
          this.amount = res.data[0].totalAmount;
          this.clinic_logo = res.data[0].clinic.logo;
          if(this.clinic_logo == 'undefined')
            this.clinic_logo="../assets/img/logo.png";
          this.ref.detectChanges();
        }
        }, error => {
    });
  }

public invalid_dob = false;

checkDob(control) {
this.patient_dob = this.form.value.dob_year+"-"+this.form.value.dob_month+"-"+this.form.value.dob_date;
var input = this.patient_dob;
var pattern =/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
  if(!pattern.test(input) || input.substring(0, 4)<'1900') {
  this.invalid_dob = true;
  }
  else {
  this.invalid_dob=false;  
  }
 if(control=='month' || control=='year'){
   this.max_days = this.getDaysInMonth(this.form.value.dob_year,this.form.value.dob_month);
   let a = Array(this.max_days).fill(0).map((i,idx) => idx +1)
   this.dates =a.map(this.updateDates);
   if(this.form.value.dob_month=="02" && this.form.value.dob_date > a.length){
     this.form.controls['dob_date'].setValue(a.length); 
  }
   
 }

 if(this.form.value.dob_year!="" && this.form.value.dob_month!="" && this.form.value.dob_date!=""){

   this.compareDateWithToday(this.form.value.dob_year,this.form.value.dob_month,this.form.value.dob_date);
}


}

compareDateWithToday(year,month,date){
 let mi = month.split('');
  if(mi[0]==='0'){
    month = Number(mi[1]) - 1;  month = "0"+month;
  }else{
    month = month -1;;
  }
  let selectedDate = new Date(year, month, date);  let Today = new Date();

   if(selectedDate > Today){
         //select current date and month with message
      let currentMonth :any = Today.getMonth().toString();
      if(currentMonth.length==1){
        currentMonth =Today.getMonth() + 1;
        currentMonth = "0"+currentMonth;
      }
     this.dob_date = Today.getDate();
     this.dob_month = currentMonth;
     this.dob_year = Today.getFullYear();

     //show message
     this.dob_larger_error ="Dob cannot be greater than today's date .";
    
   }else{
      this.dob_larger_error = "";
   }

}

updateDates(date){
  let newDate =date < 10 ? "0"+date : date ;
  return newDate.toString();

}
getDaysInMonth(year: number, month: number) {
  return 32 - new Date(year, month - 1, 32).getDate();
}


  deletesubPatient(id){
    var tempArray= [];
    var totalAmount =0;
    this.patientData.splice(id, 1);
    var countPatient = this.patientData.length;
     var i=0;
     this.patientData.forEach(res => {
     var temp=[];
          temp=res;
          console.log(this.discount);
            if((i<3) && (i>0) ) 
             temp['amount'] = this.patientData[0]['amount'] - (this.discount/100)*this.patientData[0]['amount'];
            else
             temp['amount'] =  res['amount'];
             tempArray.push(temp);
             totalAmount = totalAmount + this.toTrunc(temp['amount'],2);
             i++;
 });
     this.patientData = tempArray;
     this.totalAmountPatients = this.toTrunc(totalAmount,2);
  }

  onSubmit() {
    if(!this.invalid_dob){
    $('.ajax-loader').show();
    this.patientData=[];
    this.PurchasePlanService.checkPatientEmailExists(this.form.value.patient_email,this.clinic_id,this.user_id).subscribe((res) => {
          this.errorLogin = false;
          this.errorLoginText = '';
          this.successLogin = false;
          this.successLoginText = '';
           if(res.message == 'success'){ 
            $('.ajax-loader').hide();
             this.selectedIndex =1;
             var temp=[];
             temp['name'] =this.form.value.patient_name;
             temp['dob'] =  this.form.value.dob_year+"-"+this.form.value.dob_month+"-"+this.form.value.dob_date;
             temp['amount'] = this.amount;
             this.totalAmountPatients = this.toTrunc(this.amount,2);
             this.patientData.push(temp);
             this.patientData = [...this.patientData];
             this.countPatientData = this.patientData.length;
             if(this.countPatientData>0)
              this.tabActive1 = true;
            $(".mat-tab-label-active").siblings('.mat-tab-label').click();
             this.ref.detectChanges();
            }
           else if(res.message == 'error'){
           $('.ajax-loader').hide();
              this.errorLogin  =true;
              this.errorLoginText  ='Email already Exists!';
           }
        }, error => {
    });
  }
  }

   openaddDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '120px',
       panelClass: 'add_members',
      data: { subPatientName: this.subPatientName, subPatientDob: this.subPatientDob, subPatientGender: this.subPatientGender,patientData:this.patientData,discount:this.discount,totalAmountPatients:this.totalAmountPatients}
    });
    dialogRef.afterClosed().subscribe(result => {
       if(result != undefined) {
        this.patientData = result.patientData;
        this.patientData = [...this.patientData];
        this.totalAmountPatients = result.totalAmountPatients;
      }
    });
  }
  
  getSubPatients() {
    this.PurchasePlanService.getSubPatients(this.id).subscribe((res) => {  
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
    }, error => {
         $('.ajax-loader').hide(); 
       
    });
  }


  updatePatients(status) { 
      $('.ajax-loader').show(); 
    this.PurchasePlanService.updatePatients(this.totalAmountPatients,status, this.patient_id,this.form.value.patient_email).subscribe((res) => {   
       if(res.message == 'success'){         
          $('.ajax-loader').hide(); 
          window.location.href = '/thank-you/'+this.clinic_id+'/'+this.patient_id; 
       }
       else if(res.message == 'error'){
          $('.ajax-loader').hide();
          this.errorLogin  =true;
       }
    }, error => {
       $('.ajax-loader').hide();
    });
  }

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc',
      locale: 'auto',
      token: token => {
           this.PurchasePlanService.createSubscription(token,this.stripe_plan_id,this.id, this.patient_amount, this.member_plan_id, this.user_id,this.patient_name,this.patient_email,this.clinic_id,this.planLength).subscribe((res) => {
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


}