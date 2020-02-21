import { Component, Inject ,EventEmitter,Output, ViewChild, AfterViewInit } from '@angular/core';
import { InOfficeService } from './in-office.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from 'angular-notifier';
import { empty } from 'rxjs';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import {MatChipsModule} from '@angular/material/chips';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
declare var require: any;
const data: any = [];
@Component({
  selector: 'app-dialog-overview-export-dialog',
  templateUrl: './dialog-overview-export.html',
})
 
export class DialogOverviewExportDialogComponent {
  public clinic_id:any ={};
  public formInvite: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data) {
        this.dialogRef.close(data);
    }
}


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
  providers: [DatePipe]
})

export class DialogOverviewExampleDialogComponent {
  public clinic_id:any ={};
  private warningMessage: string;
  public valplans;
  public totalAmount;
  public balanceamt;
  public monthlyweeklyamt;
  public durationval;
//  public deposit_amount;
//  public deposite_percentage;
  public minDate: any =  new Date();
  public setup_amount;
  public form: FormGroup;
isNaN: Function = Number.isNaN;
//  public patient_dob;
//  public patient_phone_no;
  public durationPaymentPlaceholder ="Number of Months.";
  public MonthlyWeeklyPlaceholder ="Monthly/Fortnightly Payment"
  constructor(private fb: FormBuilder,private datePipe: DatePipe,
    private inofficeService: InOfficeService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.minDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd');
       this.form = this.fb.group({
      patient_name: [null, Validators.compose([Validators.required])],
      patient_email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      patient_dob: [null, Validators.compose([Validators.required])],
      patient_phone_no: [
        null,
        Validators.compose([Validators.required,
        Validators.minLength(6),
        Validators.pattern("^[0-9]*$")])
      ],
      plan_description: [null, Validators.compose([Validators.required  ])],
      total_amount: [null, Validators.compose([Validators.required])],
      setup_fee: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required])],      
    });
    }
  /* To allow only numbers */
    numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
isNumber(value) {
  if(value != undefined)
    return Number.isNaN(value);
  else
    return true;
}

toTrunc(value,n){  
    return Math.floor(value*Math.pow(10,n))/(Math.pow(10,n));
}

  omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}

     save(data) {
      var patient_id;
      this.clinic_id = $('#currentClinicid').attr('cid');
      this.inofficeService.getemailvalidation(data.patient_email,this.clinic_id).subscribe((res) => {
        console.log(data);
          data.patient_id = res.id;
              if(data.patient_name != undefined && data.patient_email != undefined  && data.plan_description != undefined && data.total_amount != undefined && data.setup_fee != undefined && data.deposited_amount != undefined && data.balance_amount != undefined && data.payment_frequency != undefined && data.duration != undefined && data.monthly_weekly_payment != undefined ){
                this.dialogRef.close(data);
              }
            
      }, error => {
        this.warningMessage = "Please Provide Valid Inputs!";
        return false;
      }    
      );  
          $('.form-control-dialog').each(function(){
          var likeElement = $(this).click();
        });    
     }
  updateDurationLabel(paymentFrequency)
  {
    if(paymentFrequency=="MONTHLY")
    {
      this.durationPaymentPlaceholder="Number of Months.";
      this.MonthlyWeeklyPlaceholder ="Monthly Payment";
    }else{
      this.durationPaymentPlaceholder="Number of weeks.";
      this.MonthlyWeeklyPlaceholder ="Weekly Payment";
    }
  }
  deposite_amount(depositepercentage){
        if(parseInt(depositepercentage) >100)
       {
         alert("Percentage should not be greater than 100 .");
         this.data.deposit_amount ='';
         this.data.balance_amount ='';
         return false;
       }
      this.totalAmount = $('#total_amount').val();
      this.setup_amount = $('#setup_amount').val();
      /* For Deposit Amount */
      const finalAmount = parseInt(this.totalAmount) + parseInt(this.setup_amount);
      const depositAmount = depositepercentage/100 * finalAmount;
      this.data.deposited_amount = depositAmount;
      /* For Balance Amount */
      this.balanceamt = (parseInt(this.totalAmount)+parseInt(this.setup_amount))-depositAmount;       
      this.data.balance_amount = this.balanceamt;
      this.data.total_payable = finalAmount;
      this.durationcal(this.durationval);
      
      }
assignVal(val1,type) {
  if(type == 'PERCENT')
    this.data.deposite_percentage=val1;
  else if(type=='DOLLAR')
  this.data.deposit_amount =val1;
this.calculate_outstanding(val1,type);
}

calculate_outstanding(val,type) {
  this.totalAmount = $('#total_amount').val();
  this.setup_amount = $('#setup_amount').val();
  const finalAmount = parseInt(this.totalAmount) + parseInt(this.setup_amount);
  var amountDeduction=0;
  if(type == 'PERCENT'){
    amountDeduction =val/100*finalAmount;

    this.data.deposited_amount =this.toTrunc(amountDeduction,2);
  }
  else if(type=='DOLLAR')
      amountDeduction =  val;
      this.balanceamt =  finalAmount- amountDeduction;       
      this.data.balance_amount = this.balanceamt;
      this.data.total_payable = finalAmount;
      this.durationcal(this.durationval);
}

  updatePercentageByAmount(amountDeposited,total_amount){
    if(parseInt(amountDeposited) > parseInt(total_amount)){
      alert("Amount deposited cannot be greater than total amount .");
      this.data.deposit_amount ='';
      this.data.balance_amount ='';
      return false;
    }
      this.totalAmount = $('#total_amount').val();
      this.setup_amount = $('#setup_amount').val();
      /* For Deposit Amount */
      const finalAmount = parseInt(this.totalAmount) + parseInt(this.setup_amount);
      const depositPercentage = amountDeposited/finalAmount*100;

      this.data.deposite_percentage =this.toTrunc(depositPercentage,2);
      /* For Balance Amount */ 
      this.balanceamt = (parseInt(this.totalAmount)+parseInt(this.setup_amount))-amountDeposited;       
      this.data.balance_amount = this.balanceamt;
      this.durationcal(this.durationval);
  }

  public durationcal(durationval){
    this.durationval=$('#duration').val();
        this.monthlyweeklyamt =this.balanceamt/this.durationval;
        this.data.monthly_weekly_payment= this.toTrunc(this.monthlyweeklyamt,2);
      }

      email = new FormControl('', [Validators.required, Validators.email]);
      patient_name = new FormControl('', [Validators.required]);
      patient_dob = new FormControl('', [Validators.required]);
      patient_phone_no = new FormControl('', [Validators.required,
        Validators.minLength(6)]);
      plan_name = new FormControl('', [Validators.required]);
      plan_description = new FormControl('', [Validators.required]);
      total_amount = new FormControl('', [Validators.required]);
      setup_fee = new FormControl('', [Validators.required]);
      deposite_percentage = new FormControl('', [Validators.required]);
      deposit_amount = new FormControl('', [Validators.required]);
      balance_amount = new FormControl('', [Validators.required]);
      duration = new FormControl('', [Validators.required]);
      getErrorMessage() {
        return this.email.hasError('required')
          ? 'You must enter a value'
          : this.email.hasError('email')
            ? 'Not a valid email'
            : '';
        }

      onNoClick(): void {
        this.dialogRef.close();
      }

}
@Component({
  selector: 'app-update-in-office-dialog',
  templateUrl: './update-in-office.html',
})
export class UpdateInOfficeDialogComponent {
  constructor(private inofficeService: InOfficeService,
    public dialogUpdateRef: MatDialogRef<UpdateInOfficeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    update(data) {
         
      $('.form-control-dialog').each(function(){
      var likeElement = $(this).click();
    });
  
      if(data.patient_name != undefined && data.patient_address != undefined  && data.patient_dob != undefined && data.patient_age != undefined && data.patient_gender != undefined && data.patient_phone_no != undefined && data.patient_home_phno != undefined){
          this.dialogUpdateRef.close(data);
       }
     }
    
    onNoClick(): void {
    this.dialogUpdateRef.close();
  }
}

@Component({
  selector: 'app-table-filter',
  templateUrl: './in-office.component.html',
  styleUrls: ['./in-office.component.scss']
})
export class InOfficeComponent implements AfterViewInit {
  private readonly notifier: NotifierService;
  name: string;
  address: string;
  contact_name: string;
  fileInput: any ;
  clinic_id: any;
  treat = new FormControl();
public StatusSelected ='';

  ngAfterViewInit() {
    this.initiate_clinic();
        $('#title').html('Payment Plans');
       
        $('.header_filters').removeClass('hide_header');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
  
  }
  editing = {};
  rows = [];
 
  temp = [...data];
  table;
  loadingIndicator = true;
  reorderable = true;
  public totalAmount;

  public patient_name;
  public patient_email;
  public plan_name;
  public plan_description;
  public total_amount;
  public setup_fee = 0;
  public deposite_amount;
  public balance_amount;
  public payment_frequency = 'MONTHLY';
  public depositType = 'PERCENT';
  public duration;
  public monthly_weekly_payment;
  public start_date;
  public due_date;
  public patient_address;
  public patient_dob ;
  public patient_age;
  public patient_gender;
  public patient_phone_no;
  public patient_home_phno;
  public patient_id;
 minDate = new Date('1990-01-01');
   maxDate = new Date();
  constructor(notifierService: NotifierService,private inofficeService: InOfficeService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router,private datePipe: DatePipe) {
    this.notifier = notifierService;
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  goBack() {
      window.history.back();
  }


  private warningMessage: string;
statusFilter() {
  const val =this.StatusSelected;
      // filter our data

    const temp = this.temp.filter(function(d) {    
      return d.patient_status.indexOf(val) == 0 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page

    this.table = data;
}
public connectedStripe =false;
public stripe_account_id;
 getClinicSettings() {
    $('.ajax-loader').show(); 
  this.inofficeService.getClinicSettings(this.clinic_id).subscribe((res) => {
    $('.ajax-loader').hide(); 
       if(res.message == 'success'){
        this.stripe_account_id = res.data[0].stripe_account_id;
        if(this.stripe_account_id)
          this.connectedStripe = true;        
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


  initiate_clinic(){  
    this.clinic_id = $('#currentClinicid').attr('cid');
    if(this.clinic_id!= "undefined")
     { this.getClinicSettings();
      this.getInofficeMembers();
    }
    else{
            $('.header_filters').addClass('hide_header');
        $('.external_clinic').hide();
    }
    }
    
    private getInofficeMembers() {
    this.rows=[];
    this.inofficeService.getInofficeMembers(this.clinic_id).subscribe((res) => {    
         if(res.message == 'success'){
          this.rows = res.data;
          this.temp = [...res.data];        
          this.table = data;
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

    openDialog(): void {   
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { patient_name: this.patient_name, patient_email: this.patient_email, plan_name: this.plan_name ,plan_description: this.plan_description , clinic_id: this.clinic_id,total_amount:this.total_amount,setup_fee:this.setup_fee,deposite_amount:this.deposite_amount,balance_amount:this.balance_amount,payment_frequency:this.payment_frequency,depositType:this.depositType,duration:this.duration,monthly_weekly_payment:this.monthly_weekly_payment,start_date:this.start_date  }
     , panelClass: 'addinoffice-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      $('.ajax-loader').show(); 

     this.inofficeService.addPaymentPlans(result.patient_name, result.patient_email,result.patient_dob,result.patient_phone_no, result.plan_name,result.plan_description,result.clinic_id,result.total_amount,result.setup_fee,result.deposite_percentage,result.deposited_amount,result.balance_amount,result.payment_frequency,result.duration,result.monthly_weekly_payment,result.start_date,result.patient_id).subscribe((res) => {
        $('.ajax-loader').hide();    
        if(res.message == 'success'){
            this.notifier.notify( 'success', 'Payment Plan Added' ,'vertical');
            this.getInofficeMembers();
           }  else if(res.status == '401'){
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
      });
  }

  openUpdateDialog(patientid): void {
    this.inofficeService.getInofficeMembersByID(patientid,this.clinic_id).subscribe(updateres => {
    const dialogUpdateRef = this.dialog.open(UpdateInOfficeDialogComponent, {
     width: '250px',
     data: {patient_name: updateres.data[0].patient_name ,patient_address: updateres.data[0].patient_address,patient_dob: updateres.data[0].patient_dob,patient_age:updateres.data[0].patient_age,patient_gender:updateres.data[0].patient_gender,patient_phone_no:updateres.data[0].patient_phone_no,patient_home_phno:updateres.data[0].patient_home_phno,patient_id:patientid}
     });    

  dialogUpdateRef.afterClosed().subscribe(result => {
    if(result) {
      $('.ajax-loader').show();     
    this.inofficeService.updatePatientsDetails(result.patient_name,result.patient_address,result.patient_dob,result.patient_age,result.patient_gender,result.patient_phone_no,result.patient_home_phno,result.patient_id).subscribe((res) => {   
      $('.ajax-loader').hide();      
       if(res.message == 'success'){    
            this.notifier.notify( 'success', 'Patient Updated' ,'vertical');
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
        });  
        }
        });
      });
  }

   openExportDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExportDialogComponent, {
      width: '400px',
      data: {start_date: this.start_date, end_date: this.end_date,minDate: this.minDate, maxDate: this.maxDate },
      panelClass: 'full-screen'
    });
  dialogRef.afterClosed().subscribe(result => {
      if(result.start_date == undefined || result.end_date ==undefined){

          Swal.fire('', 'Please select Date Range', 'error');
      }
      else if(this.start_date>this.end_date){
          Swal.fire('', 'Please select valid Dates', 'error');
      }
       else {
         result.start_date = this.datePipe.transform(result.start_date, 'yyyy-MM-dd');
         result                                                                                                                                                                                                                                                                     .end_date = this.datePipe.transform(result.end_date, 'yyyy-MM-dd');
     
         this.inofficeService.getexportData(this.clinic_id,result.start_date,result.end_date).subscribe((res) => {     
         if(res.message == 'success'){
            var data = res.data;
            if(data.length >0){
             this.exportPayments(data);  
            }else{
              Swal.fire('', 'No data found to export!', 'error')
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
    });
  }

  public deletePlan(row) {
           Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Plan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value){
              if(this.rows[row]['id']) {
                this.inofficeService.deletePlan(this.rows[row]['id'],this.clinic_id).subscribe((res) => {
                 if(res.message == 'success'){
                  this.notifier.notify( 'success', 'Plan Removed' ,'vertical');
                    this.getInofficeMembers();
                 }
              }, error => {
                this.warningMessage = "Please Provide Valid Inputs!";
              }    
              );
              }
              else {
                this.getInofficeMembers();
                this.rows.splice(row, 1);
                this.rows = [...this.rows];
              }
            }
});
}

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {    
      return d.patient_name.toLowerCase().indexOf(val) !== -1 || !val;
    }); 
    this.rows = temp;
    this.table = data;
  }

  enableEditing(rowIndex, cell) {
    this.editing[rowIndex + '-' + cell] = true;
  }
  public end_date;

 getUserPaymentData(){
  if(this.start_date == undefined || this.end_date ==undefined){

          Swal.fire('', 'Please select Date Range', 'error');
      }
      else if(this.start_date>this.end_date){
          Swal.fire('', 'Please select valid Dates', 'error');
      }
       else {
         this.start_date = this.datePipe.transform(this.start_date, 'yyyy-MM-dd');
         this.end_date = this.datePipe.transform(this.end_date, 'yyyy-MM-dd');
        this.inofficeService.getexportData(this.clinic_id,this.start_date,this.end_date).subscribe((res) => {    
         if(res.message == 'success'){
            var data = res.data;
            if(data.length >0){
             this.exportPayments(data);  
            }else{
              Swal.fire('', 'No data found to export!', 'error');
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
  }

  exportPayments(data){
    var options = { 
     fieldSeparator: ',',
     quoteStrings: '"',
     decimalseparator: '.',
     showLabels: true, 
     showTitle: false,
     title: 'Export Payments',
     useBom: true,
     noDownload: false,
     headers: ["Date","Plan Amount","Payment Status","Patient Name","Patient Email","DOB","Plan/Membership","Stripe Cust ID"]
   };
    new Angular5Csv(data, 'In Office Payments',options);
  }

}
