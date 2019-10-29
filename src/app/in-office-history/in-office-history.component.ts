import { Component,OnInit,Inject, EventEmitter,Output, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { InOfficeHistoryService } from './in-office-history.service';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { DatePipe,formatDate } from '@angular/common';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { empty } from 'rxjs';
import { HeaderService } from '../layouts/full/header/header.service';
import { PatientInfoService } from '../patient-info/patient-info.service';

const data: any = [];
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})


export class DialogOverviewExampleDialogComponent {
  public totalAmount;
  public balanceamt;
  public monthlyweeklyamt;
  public durationval;

  constructor(
     public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
 
  save(data) {
         
    $('.form-control-dialog').each(function(){
    var likeElement = $(this).click();
  });
  console.log(data)
    if(data.plan_name != undefined && data.plan_description != undefined && data.total_amount != undefined && data.setup_fee != undefined && data.deposite_amount != undefined && data.balance_amount != undefined && data.payment_frequency != undefined && data.duration != undefined && data.monthly_weekly_payment != undefined && data.start_date != undefined && data.due_date != undefined){
        this.dialogRef.close(data);
     }
   }
    deposite_amount(depositeamount){
    this.totalAmount = $('#total_amount').val();
    this.balanceamt = this.totalAmount-depositeamount;       
    this.data.balance_amount = this.balanceamt;
    this.durationcal(this.durationval);

    }
    public durationcal(durationval){
    this.durationval= durationval;
      this.monthlyweeklyamt =this.balanceamt/this.durationval;
      this.data.monthly_weekly_payment= this.monthlyweeklyamt;
      // alert(this.monthlyweeklyamt);
    }
      
    onNoClick(): void {
      this.dialogRef.close();
    }
 }
 @Component({
  selector: 'app-invoice-details-dialog',
  templateUrl: './invoice-details.html',
})
export class InvoiceDetailsDialogComponent {
 
  constructor(
     public dialogRef2: MatDialogRef<InvoiceDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    onNoClick(): void {
      this.dialogRef2.close();
    }
 }


@Component({
  selector: 'app-formlayout',
  templateUrl: './in-office-history.component.html',
  styleUrls: ['./in-office-history.component.scss']
})
export class InOfficeHistoryComponent implements AfterViewInit {
  private readonly notifier: NotifierService;

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  public id:any ={};
  public imageURL:any;
  public contract_url:any;

  public form: FormGroup;
  options: FormGroup;
  private warningMessage: string;

  public patient_name;
  public patient_email;
  public plan_name;
  public plan_description;
  public clinic_id;
  public total_amount;
  public setup_fee;
  public deposite_amount;
  public balance_amount;
  public payment_frequency;
  public duration;
  public monthly_weekly_payment;
  public start_date;
  public due_date;
  public patientname;
  public patientemail;
  public inoffice_payment_id;
  public invoicedata;
  public invoiceId;
  public subscriptionId;
  public total_paid;

  temp = [...data];
  table;
  loadingIndicator = true;

  rows = [];
 
  constructor(notifierService: NotifierService,private headerService:HeaderService, private fb: FormBuilder,public dialog: MatDialog,  private inOfficeHistoryService: InOfficeHistoryService, private route: ActivatedRoute,private _cookieService: CookieService, private router: Router,breakpointObserver: BreakpointObserver) {
    this.notifier = notifierService;
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
    }

   openDialog(): void {
   
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
     width: '250px',
     data: {plan_name: this.plan_name ,plan_description: this.plan_description,clinic_id: this.clinic_id,total_amount:this.total_amount,setup_fee:this.setup_fee,deposite_amount:this.deposite_amount,balance_amount:this.balance_amount,payment_frequency:this.payment_frequency,duration:this.duration,monthly_weekly_payment:this.monthly_weekly_payment,start_date:this.start_date,due_date:this.due_date   }
 
    });
    
 

  dialogRef.afterClosed().subscribe(result => {
  
   this.inOfficeHistoryService.addPaymentPlans(this.patientname,this.patientemail, result.plan_name,result.plan_description,result.clinic_id,result.total_amount,result.setup_fee,result.deposite_amount,result.balance_amount,result.payment_frequency,result.duration,result.monthly_weekly_payment,result.start_date,result.due_date).subscribe((res) => {
   

   if(res.message == 'success'){
    
            this.notifier.notify( 'success', 'New Plan Added' ,'vertical');
            this.getInofficeMembersByID();
           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }
        );  
        });

  }
  
  invoiceDialog(): void {
   
    this.inOfficeHistoryService.getInofficeMembersPlanInvoices(this.id,this.inoffice_payment_id).subscribe(updateres => {
    this.invoicedata = updateres.data[0]['inoffice_payments_invoices'];
    console.log(this.invoicedata);
    const dialogRef2 = this.dialog.open(InvoiceDetailsDialogComponent, {
    width: '250px',
  
    data: {invoicedata: this.invoicedata ,}
    });
    
     });
  }
  ngAfterViewInit() {
   
    this.id = this.route.snapshot.paramMap.get("id");
    this.getClinicPatientsbyId()
    // this.getInofficeMembersByID();
    $('.header_filters').removeClass('hide_header'); 
    $('nb.header_filters').removeClass('flex_direct_mar'); 
    $('.header_filters').addClass('hide_header');
      this.route.params.subscribe(params =>  {
        // this.getClinicGoals();
        $('#title').html('In-office Payment Plans');
     });
    this.form = this.fb.group({
    });
     }

  
  //  initiate_clinic(){  
  //     this.clinic_id = $('#currentClinicid').attr('cid');
  //   if(this.clinic_id)
  //   this.getInofficeMembersByID();
  //     }

    
    getInofficeMembersByID(){
    
     this.inOfficeHistoryService.getInofficeMembersByID(this.id,this.clinic_id).subscribe((res) => {
  
      if(res.message == 'success'){
        this.rows = res.data;
        this.patientname = res.data[0]['patient_name'];
        this.patientemail = res.data[0]['patient_email'];
        this.inoffice_payment_id = res.data[0]['inoffice_paymentID'];
          // console.log(this.rows);
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

  getPatientContract(){
      this.inOfficeHistoryService.getPatientContract(this.id).subscribe((res) => {
          if(res.message == 'success'){
         this.contract_url = res.data['contract_upload'];
          }
        
         else if(res.status == '401'){
               this._cookieService.put("token", '');
               this._cookieService.put("userid", '');
                this.router.navigateByUrl('/login');
            }
     }, error => {
       this.warningMessage = "Please Provide Valid Inputs!";
     }    
     );
    }
    getClinicPatientsbyId(){
      
      this.inOfficeHistoryService.getClinicPatientsbyId(this.id).subscribe((res) => {
         if(res.message == 'success'){
         this.clinic_id = res.data[0]['clinic_id'];
         this.getInofficeMembersByID();
            }
        
         else if(res.status == '401'){
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
    if(this.imageURL == undefined){
      alert("Please Upload file");
    
    }else{
      $('.ajax-loader').show();      

        this.inOfficeHistoryService.updatePatients(this.id,this.imageURL).subscribe((res) => {
      $('.ajax-loader').hide();      

        // console.log(this.imageURL);
          if(res.message == 'success'){
            this.notifier.notify( 'success', 'Document Uploaded' ,'vertical');
               this.getPatientContract();
            }
           }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
            }   
           );
        }
      }
  public fileToUpload;
  uploadImage(files: FileList) {
    this.fileToUpload = files.item(0);
    const extension = this.fileToUpload.name.split('.')[1].toLowerCase();
    if(extension !== "pdf"){
      alert('Please Upload PDF file');
      
      return null;
    }else
    {
      $('.ajax-loader').show();      

      let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    this.inOfficeHistoryService.contractUpload(formData).subscribe((res) => {
      $('.ajax-loader').hide();      

        if(res.message == 'success'){
        this.imageURL= res.data;
          }
        });
      }
  }

  public deleteInofficeMembersPlan(row) {
    if(confirm("Are you sure to delete this plan?")) {
       if(this.rows[row]['patientID']) {
         this.inOfficeHistoryService.deleteInofficeMembersPlan(this.rows[row]['patientID'],this.rows[row]['inoffice_paymentID']).subscribe((res) => {
          if(res.message == 'success'){
            this.getInofficeMembersByID();
           this.notifier.notify( 'success', 'Plan Removed' ,'vertical');
             
          }
       }, error => {
         this.warningMessage = "Please Provide Valid Inputs!";
       }    
       );
       }
       else {
        
         this.rows.splice(row, 1);
       this.rows = [...this.rows];
       }
     }
}

}