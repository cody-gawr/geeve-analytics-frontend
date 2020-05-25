import { Component, Inject ,EventEmitter,Output, ViewChild, AfterViewInit } from '@angular/core';
import { InOfficeService } from './in-office.service';
import { ClinicService } from '../clinic/clinic.service';
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
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { environment } from "../../environments/environment";
import { HeaderService } from '../layouts/full/header/header.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { ToastrService } from 'ngx-toastr';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

declare var require: any;
const data: any = [];
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
     dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-overview-export-dialog',
  templateUrl: './dialog-overview-export.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
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
   providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class DialogOverviewExampleDialogComponent {
  private readonly notifier: NotifierService;
  public clinic_id:any ={};
  private warningMessage: string;
  public valplans;
  public totalAmount;
  public balanceamt;
  public monthlyweeklyamt;
  public durationval;
  public selectedIndex =0;
  public contractTabDisable =true;
//  public deposit_amount;
//  public deposite_percentage;
  public minDate: any =  new Date();
  public setup_amount;
  public form: FormGroup;
  public contractsave =true;
  isNaN: Function = Number.isNaN;
  public contractURL:any;
//  public patient_dob;
//  public patient_phone_no;
  public durationPaymentPlaceholder ="Number of Months.";
  public MonthlyWeeklyPlaceholder ="Monthly/Fortnightly Payment";

public dob_date;
public dob_month;
public dob_year;
public dates =['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
public months=[
{key:'01',value:"January"},{key:'02',value:"February"},{key:'03',value:"March"},
{key:'04',value:"April"},{key:'05',value:"May"},{key:'06',value:"June"},
{key:'07',value:"July"},{key:'08',value:"August"},{key:'09',value:"September"},
{key:'10',value:"October"},{key:'11',value:"November"},{key:'12',value:"December"}
];
public max_days =31;
public years:any = [];
public token_id;
public token;
public downloadcontractURL:any;
  private apiUrl = environment.apiUrl;
  constructor(private toastr: ToastrService,private _cookieService: CookieService,notifierService: NotifierService,private fb: FormBuilder,private datePipe: DatePipe,
    private inofficeService: InOfficeService,
    private clinicService: ClinicService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        this.notifier = notifierService;
        let cid =$('#currentClinicid').attr('cid');
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        this.token_id = this._cookieService.get("childid");
        else
        this.token_id= this._cookieService.get("userid");

        this.downloadcontractURL=this.apiUrl +"/Clinics/getDefaultContract?user_id="+this._cookieService.get("userid")+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id+"&clinicid="+cid;



      this.minDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd');
      this.form = this.fb.group({
      patient_name: [null, Validators.compose([Validators.required])],
      patient_email: [null, Validators.compose([Validators.required, CustomValidators.email])],
   //   patient_dob: [null, Validators.compose([Validators.required])],
      dob_date: [null, Validators.compose([Validators.required])],
      dob_month: [null, Validators.compose([Validators.required])],
      dob_year: [null, Validators.compose([Validators.required])],
      patient_phone_no: ['', [Validators.required, Validators.minLength(8)]],
      plan_description: [null, Validators.compose([Validators.required  ])],
      total_amount: [null, Validators.compose([Validators.required])],
      setup_fee: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required])],      
    });
      var start_year =new Date().getFullYear();
       for (var i = start_year; i > start_year - 100; i--) {
         this.years.push(i);
      }
      data.dob_date ="";
      data.dob_month ="";
      data.dob_year ="";
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
isDecimal(value) {
 if(typeof value != 'undefined')
  {
    if(String(value).includes("."))
    return true;
  }
}
public invalid_dob = false;
checkDob(data,control) {
data.patient_dob = data.dob_year+"-"+data.dob_month+"-"+data.dob_date;
var input = data.patient_dob;
var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  if(!pattern.test(input) || input.slice(input.length - 4)<'1990') {
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

}
updateDates(date){
  let newDate =date < 10 ? "0"+date : date ;
  return newDate.toString();

}

getDaysInMonth(year: number, month: number) {
  return 32 - new Date(year, month - 1, 32).getDate();
}



toTrunc(value,n){ 
console.log("ff"); 
  console.log(Math.floor(value*Math.pow(10,n))/(Math.pow(10,n)));
    return Math.floor(value*Math.pow(10,n))/(Math.pow(10,n));
}

  omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k==45); 
}


next(data){
  this.selectedIndex =1;
   this.contractTabDisable = false;
}
saveData(data){

  this.save(data,'yes');

}
uploadlater(data){

  this.save(data,'');
}

save(data,contractresult) {
      var patient_id;
      this.clinic_id = $('#currentClinicid').attr('cid');
      this.inofficeService.getemailvalidation(data.patient_email,this.clinic_id).subscribe((res) => {
          data.patient_id = res.id;

          if(data.patient_name != undefined && data.patient_email != undefined  && data.plan_description != undefined && data.total_amount != undefined && data.setup_fee != undefined && data.deposited_amount != undefined && data.balance_amount != undefined && data.payment_frequency != undefined && data.duration != undefined && data.monthly_weekly_payment != undefined){
              //  this.dialogRef.close(data);
           $('.ajax-loader').show(); 
           var patient_dob = this.datePipe.transform(data.patient_dob, 'yyyy-MM-dd');
           this.inofficeService.addPaymentPlans(data.patient_name, data.patient_email,patient_dob,data.patient_phone_no, data.plan_name,data.plan_description,data.clinic_id,data.total_amount,data.setup_fee,data.deposite_percentage,data.deposited_amount,data.balance_amount,data.payment_frequency,data.duration,data.monthly_weekly_payment,data.start_date,data.patient_id).subscribe((res) => {
           $('.ajax-loader').hide();    
           if(res.message == 'success'){
            data.inoffice_id = res.data.inoffice_id;
             this.saveSignedContract(data,contractresult);
            
            }  else if(res.status == '401'){
             // this._cookieService.put("username",'');
              //this._cookieService.put("email", '');
              //this._cookieService.put("token", '');
              //this._cookieService.put("userid", '');
              //this.router.navigateByUrl('/login');
           }
        }, error => {
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
        }
        ); 
   }
            
      }, error => {
           $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
        return false;
      }    
      );  
          $('.form-control-dialog').each(function(){
          var likeElement = $(this).click();
        });    
     } 

saveSignedContract(data,contractresult){
  if(this.contractURL !="" && this.contractURL !=undefined && data.patient_id!= undefined && data.inoffice_id!= "" && contractresult.trim()=="yes"){
   data.contractURL = this.contractURL;
   this.dialogRef.close(data);  
  }else{
   this.dialogRef.close('uploadlater');  
    //this.notifier.notify( 'success', 'Payment Plan added successfully .' ,'vertical');
  }

}
deleteSignedDocImage(){
  this.contractURL="";
  this.signedFileType="";
  $(".contractFile").val('');
  $(".uploadsignedContract").show();
}

  updateDurationLabel(paymentFrequency)
  {
    if(paymentFrequency=="MONTHLY")
    {
      this.durationPaymentPlaceholder="Number of Months.";
      this.MonthlyWeeklyPlaceholder ="Monthly Payment";
    }else{
      this.durationPaymentPlaceholder="Number of fortnights.";
      this.MonthlyWeeklyPlaceholder ="Weekly Payment";
    }
  }
  deposite_amount(depositepercentage){
       if(parseFloat(depositepercentage) >100)
       {
         alert("Percentage should not be greater than 100 .");
         this.data.deposit_amount ='';
         this.data.balance_amount ='';
         return false;
       }
      this.totalAmount = $('#total_amount').val();
      this.setup_amount = $('#setup_amount').val();
      /* For Deposit Amount */
      const finalAmount = parseFloat(this.totalAmount) + parseFloat(this.setup_amount);

      const depositAmount = depositepercentage/100 * finalAmount;
      this.data.deposited_amount = this.toTrunc(depositAmount,2);
      /* For Balance Amount */
      this.balanceamt = (parseFloat(this.totalAmount)+parseFloat(this.setup_amount))-this.toTrunc(depositAmount,2);       
      this.data.balance_amount = this.balanceamt.toFixed(2).replace(".00", "");
      this.data.total_payable = finalAmount.toFixed(2).replace(".00", "");;
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
  const finalAmount = parseFloat(this.totalAmount) + parseFloat(this.setup_amount);
  var amountDeduction=0;
  if(type == 'PERCENT'){
      amountDeduction =val/100*finalAmount;
      this.data.deposited_amount =this.toTrunc(amountDeduction,2);
  }
  else if(type=='DOLLAR') {
      amountDeduction =  val;
      this.data.deposited_amount =this.toTrunc(amountDeduction,2);      
    }
      this.balanceamt =  finalAmount- this.data.deposited_amount;

      this.data.balance_amount = this.balanceamt.toFixed(2).replace(".00", "");
      this.data.total_payable = finalAmount.toFixed(2).replace(".00", "");;
      this.durationcal(this.durationval);
}

  updatePercentageByAmount(amountDeposited,total_amount){
    if(parseFloat(amountDeposited) > parseFloat(total_amount)){
      alert("Amount deposited cannot be greater than total amount .");
      this.data.deposit_amount ='';
      this.data.balance_amount ='';
      return false;
    }
      this.totalAmount = $('#total_amount').val();
      this.setup_amount = $('#setup_amount').val();
      /* For Deposit Amount */
      const finalAmount = parseFloat(this.totalAmount) + parseFloat(this.setup_amount);
      const depositPercentage = amountDeposited/finalAmount*100;

      this.data.deposite_percentage =this.toTrunc(depositPercentage,2);
      /* For Balance Amount */ 
      this.balanceamt = (parseFloat(this.totalAmount)+parseFloat(this.setup_amount))-amountDeposited;      
      this.data.balance_amount = this.balanceamt.toFixed(2).replace(".00", "");
      this.durationcal(this.durationval);
  }

  public durationcal(durationval){
        this.durationval=$('#duration').val();
        this.monthlyweeklyamt =this.balanceamt/this.durationval;
        let mwa = this.monthlyweeklyamt.toString();
      //  mwa = mwa.slice(0, (mwa.indexOf("."))+3); //With 3 exposing the hundredths place
        this.data.monthly_weekly_payment= Number(mwa);
      }

      email = new FormControl('', [Validators.required, Validators.email]);
      patient_name = new FormControl('', [Validators.required]);
      patient_dob = new FormControl('', [Validators.required]);
      patient_phone_no = new FormControl('', [Validators.required,Validators.minLength(6)]);
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



  onSubmit() {
    if(this.contractURL == undefined){
   
    }else{

        }
      }

  public fileToUpload;
  public signedFileType ="";
public uploadedSignedContract='';
  uploadImage(files: FileList,data) {
    this.fileToUpload = files.item(0);
    const extension = this.fileToUpload.name.split('.')[1].toLowerCase();
    if(extension.trim() == "pdf" || extension.trim() == "doc" || extension.trim() == "jpg" || extension.trim() == "jpeg" || extension.trim() == "png" ){
    if(this.fileToUpload.size/1024/1024 > 4) //10000 bytes means 10 kb
    {
      $(".error_msg_file_type").children(".error_text").text("File too large. Document should not be greater than 4 MB.");
      $(".error_msg_file_type").show();
      $(".error_msg_file_type").fadeOut(10000);
         return false;
    }
      $(".error_msg_file_type").hide();
      $('.ajax-loader').show();  
      let formData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
      formData.append('clinic_id', data.clinic_id);
    this.inofficeService.contractUpload(formData).subscribe((res) => {
        $('.ajax-loader').hide();  
        if(res.message == 'success'){
          $(".uploadsignedContract").hide();
           this.contractURL= res.data;
           this.signedFileType = extension;
           this.contractsave = false;
           this.uploadedSignedContract = this.apiUrl +"/Clinics/getUploadedSignedContract?user_id="+this._cookieService.get("userid")+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id+"&code="+encodeURIComponent(window.btoa(res.data));
          }
        });     
    }
    else
    {
        $(".error_msg_file_type").children(".error_text").text("Invalid file type. Allowed files are pdf, doc, jpg, jpeg and png only. ");
      $(".error_msg_file_type").show();
      $(".error_msg_file_type").fadeOut(10000);
      return null; 
      }
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
isDecimal(value) {
 if(typeof value != 'undefined')
  {
    if(String(value).includes("."))
    return true;
  }
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
public user_type = this._cookieService.get("user_type");
  private checkPermission(role) { 
  this.headerService.checkPermission(role).subscribe((res) => {
       if(res.message == 'success'){
       }
        else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
    }, error => {
     //    $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    }    
    );

  }
  ngAfterViewInit() {
    this.checkPermission('paymentplans');
    this.initiate_clinic();
        $('#title').html('Payment Plans');

  
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
  constructor(private toastr: ToastrService,notifierService: NotifierService,private inofficeService: InOfficeService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router,private datePipe: DatePipe,  private headerService: HeaderService) {
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

isDecimal(value) {
  if(value.includes("."))
  return true;
}
  private warningMessage: string;
statusFilter() {
  const val =this.StatusSelected;
      // filter our data

    const temp = this.temp.filter(function(d) {    
      return d.payment_status.indexOf(val) == 0 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page

    this.table = data;
}
public connectedStripe =true;
public stripe_account_id;
 getClinicSettings() {
    $('.ajax-loader').show(); 
  this.inofficeService.getClinicSettings(this.clinic_id).subscribe((res) => {
    $('.ajax-loader').hide(); 
       if(res.message == 'success'){
        this.stripe_account_id = res.data[0].stripe_account_id;
        if(this.stripe_account_id)
          this.connectedStripe = true; 
        else
          this.connectedStripe = false;             
       }
        else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
    }, error => {
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    }    
    );
  }


  initiate_clinic(){  
    this.clinic_id = $('#currentClinicid').attr('cid');
    if(this.clinic_id!= "undefined")
     {
        $('.header_filters').removeClass('hide_header');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar'); 
        this.getClinicSettings();
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
           $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
      if(result=="uploadlater"){
         this.toastr.success('Payment Plan added successfully .');
         this.getInofficeMembers();
      }else{
        this.inofficeService.updateContract(result.inoffice_id, result.contractURL).subscribe((res) => {
           $('.ajax-loader').hide();    
           if(res.status == '200'){
              this.toastr.success('Payment Plan added successfully .');
              this.getInofficeMembers();
            }  else if(res.status == '401'){
               this._cookieService.removeAll();
              this.router.navigateByUrl('/login');
           }
        }, error => {
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
        }
        );
    }
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
            this.toastr.success('Patient Updated.');
          } else if(res.status == '401'){
               this._cookieService.removeAll();
              this.router.navigateByUrl('/login');
           }
        }, error => {
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
        });  
        }
        });
      });
  }

   openExportDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExportDialogComponent, {
      width: '400px',
      data: {start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1), end_date: new Date(),minDate: this.minDate, maxDate: this.maxDate },
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
         result.end_date = this.datePipe.transform(result.end_date, 'yyyy-MM-dd');
     
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
              this._cookieService.removeAll();
              this.router.navigateByUrl('/login');
           }
      }, error => {
           $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
            this.inofficeService.deletePlan(this.rows[row]['id'],this.clinic_id,this.rows[row]['inoffice_paymentID']).subscribe((res) => {
             if(res.message == 'success'){
               this.toastr.success('Plan Removed .');
               this.getInofficeMembers();
             }
          }, error => {
               $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
              this._cookieService.removeAll();
              this.router.navigateByUrl('/login');
           }
      }, error => {
           $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
    new Angular5Csv(data, 'Payments Plans',options);
  }
}
