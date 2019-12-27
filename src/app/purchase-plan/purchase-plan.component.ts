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
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})


export class DialogOverviewExampleDialogComponent {
   public clinic_id:any ={}; 
   show_dentist = false;

  constructor(private PurchasePlanService: PurchasePlanService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  private warningMessage: string;

  save(data) {
   $('.form-control-dialog').each(function(){
      var likeElement = $(this).click();
   });
  if($.trim(data.subPatientName) != undefined  && $.trim(data.subPatientDob) != '' && data.subPatientGender != undefined ){   var temp=[];
              var countPatient = data.patientData.length-1;
             temp['name'] =data.subPatientName;
             temp['dob'] = data.subPatientDob;
             temp['gender'] = data.subPatientGender;
             temp['discount'] = data.discount;
             if(countPatient<3)
             temp['amount'] =  data.patientData[countPatient]['amount'] - Math.floor((data.discount/100)*data.patientData[countPatient]['amount']);
              else
             temp['amount'] =  data.patientData[countPatient]['amount'];
             data.patientData.push(temp);
             data.totalAmountPatients = data.totalAmountPatients +  temp['amount'];
             this.dialogRef.close(data);          
  }else{
    return false;
   }
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
 
  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'es'
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
  public selectedIndex =0 ;
  public patientData =[];
  public countPatientData = 0;
  public tabActive1= false;
  public tabActive2 = false;
  public subPatientName;
  public subPatientDob;
  public subPatientGender;
public totalAmountPatients =0;
public email;
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private PurchasePlanService: PurchasePlanService,private _cookieService: CookieService, private route: ActivatedRoute, public dialog: MatDialog, private ref: ChangeDetectorRef, private stripeService: StripeService) {}

   ngOnInit() {

     this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });


     this.route.params.subscribe(params => {
      this.plan_id = this.route.snapshot.paramMap.get("id");
       var data =this.plan_id.split("&");
        this.plan_id = data[0];
        if(data[1]) {
        this.email = data[1];
        this.patient_email=this.email;
        }
    });
     this.getPlanDetail();
    this.getSubPatients();
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
        null,
        Validators.compose([Validators.required])
      ],
      termsCond: [
         null,
        Validators.compose([Validators.requiredTrue])
      ],patient_phone_no: [
        null,
        Validators.compose([Validators.required,
        Validators.pattern("^[0-9]*$")])
      ]
    });
    this.formStripe = this.fb.group({
      cardNumber: [
        null
        // Validators.compose([Validators.required])
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


buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
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
  }

  changeTab(index){
             this.selectedIndex =index;

  }
  paymentStripe(){
    this.selectedIndex =2;
    this.tabActive2 = true;
  }
  public message;
 public  cardNumber;
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
   this.PurchasePlanService.addPatient(this.form.value.patient_email,this.form.value.patient_name,this.form.value.patient_phone_no,this.clinic_id,this.user_id,this.plan_id,this.totalAmountPatients).subscribe((res) => {
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
              });
        this.message = `Success! Card token ${response.card.id}.`;
      } else {
        this.message = response.error.message;
      }
    });
  
  }

  createSubscription(token) {
    this.stripe_plan_id =  this.planName.replace('',' ');
      this.PurchasePlanService.createSubscription(token,this.stripe_plan_id,this.patient_id, this.totalAmountPatients, this.plan_id, this.user_id,this.form.value.patient_name,this.form.value.patient_email).subscribe((res) => {
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

  public clinic_logo;

  getPlanDetail() {
    this.PurchasePlanService.getPlanDetail(this.plan_id).subscribe((res) => {
       if(res.message == 'success'){
          this.user_id = res.data[0].user_id;
          this.clinic_id = res.data[0].clinic_id;
          this.user_id = res.data[0].user_id;
          this.termsText = res.data[0].clinic.terms;
          this.planName = res.data[0].planName;
          this.discount = res.data[0].discount;
          this.amount = res.data[0].totalAmount;
          this.clinic_logo = res.data[0].clinic.logo;
          this.ref.detectChanges();
        }
        }, error => {
    });
  }
  deletesubPatient(id){
    var tempArray= [];
    var totalAmount =0;
    var countPatient = this.patientData.length;
     this.patientData.splice(id, 1);
     var i=0;
     this.patientData.forEach(res => {
      var temp=[];
          temp=res;
            if(countPatient<3 && countPatient>0)
             temp['amount'] = res['amount'] - Math.floor((this.discount/100)*this.patientData[i-1]['amount']);
              else
             temp['amount'] =  res['amount'];
             tempArray.push(temp);
             totalAmount = totalAmount + temp['amount'];
             i++;
 });
     this.patientData = tempArray;
     this.totalAmountPatients = totalAmount;
          
  }

  onSubmit() {
    $('.ajax-loader').show();
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
             temp['dob'] = this.form.value.patient_dob;
             temp['amount'] = this.amount;
             this.totalAmountPatients = this.amount;
             this.patientData.push(temp);
             this.patientData = [...this.patientData];
             this.countPatientData = this.patientData.length;
             if(this.countPatientData>0)
              this.tabActive1 = true;
            }
           else if(res.message == 'error'){
             $('.ajax-loader').hide();
              this.errorLogin  =true;
              this.errorLoginText  ='Email already Exists!';
           }
        }, error => {
    });
  }

   openaddDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { subPatientName: this.subPatientName, subPatientDob: this.subPatientDob, subPatientGender: this.subPatientGender,patientData:this.patientData,discount:this.discount,totalAmountPatients:this.totalAmountPatients}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }


  updatePatients(status) { 
      $('.ajax-loader').show(); 
    this.PurchasePlanService.updatePatients(this.totalAmountPatients,status, this.patient_id,this.form.value.patient_email).subscribe((res) => {
      $('.ajax-loader').hide();      
       if(res.message == 'success'){
             $('.ajax-loader').hide(); 
             window.location.href = '/thank-you/'+this.clinic_id; 
            // this.router.navigate(['/thank-you']);
       }
       else if(res.message == 'error'){
            $('.ajax-loader').hide();
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
           this.PurchasePlanService.createSubscription(token,this.stripe_plan_id,this.id, this.patient_amount, this.member_plan_id, this.user_id,this.patient_name,this.patient_email).subscribe((res) => {
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