import { Component, Inject ,EventEmitter,Output, ViewChild, AfterViewInit } from '@angular/core';
import { InOfficeService } from './in-office.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroupDirective,  NgForm,  Validators} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { empty } from 'rxjs';

declare var require: any;
const data: any = [];

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})

export class DialogOverviewExampleDialogComponent {


  public clinic_id:any ={};
  private warningMessage: string;
  public valplans;
  public totalAmount;
  public balanceamt;
  public monthlyweeklyamt;
  public durationval;
  constructor(
    
    private inofficeService: InOfficeService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}


     save(data) {
      this.clinic_id = $('#currentClinicid').attr('cid');

      this.inofficeService.getemailvalidation(data.patient_email,this.clinic_id).subscribe((res) => {
    
        if(res.message == 'error'){
        this.valplans=res.data['message'];
        $('#email').focus();
        return false;

//            $('#email').first().focus();

            }else{
              if(data.patient_name != undefined && data.patient_email != undefined  && data.plan_name != undefined && data.plan_description != undefined && data.total_amount != undefined && data.setup_fee != undefined && data.deposite_amount != undefined && data.balance_amount != undefined && data.payment_frequency != undefined && data.duration != undefined && data.monthly_weekly_payment != undefined && data.start_date != undefined && data.due_date != undefined){
                this.dialogRef.close(data);
              }
            }
      }, error => {
        this.warningMessage = "Please Provide Valid Inputs!";
        return false;
      }    
      ); 
      
          $('.form-control-dialog').each(function(){
          var likeElement = $(this).click();
        });
       // console.log(data)
     
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
        this.data.monthly_weekly_payment= this.monthlyweeklyamt.toFixed(2);
        // alert(this.monthlyweeklyamt);
      }

      email = new FormControl('', [Validators.required, Validators.email]);

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
    // console.log(data);
  
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

  ngAfterViewInit() {
    this.initiate_clinic();
        $('#title').html('In-Office Payment Plan');
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
  public setup_fee;
  public deposite_amount;
  public balance_amount;
  public payment_frequency;
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
 
  constructor(notifierService: NotifierService,private inofficeService: InOfficeService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router) {
    this.notifier = notifierService;
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
  private warningMessage: string;

  initiate_clinic(){  
    this.clinic_id = $('#currentClinicid').attr('cid');
  if(this.clinic_id)
      this.getInofficeMembers();
    }
    
    
    private getInofficeMembers() {
    this.rows=[];
    this.inofficeService.getInofficeMembers(this.clinic_id).subscribe((res) => {
    
         if(res.message == 'success'){
          this.rows = res.data;
          // console.log(this.rows);

          this.temp = [...res.data];        
          this.table = data;
         }
      }, error => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }    
      );
  
    }

    openDialog(): void {
    
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { patient_name: this.patient_name, patient_email: this.patient_email, plan_name: this.plan_name ,plan_description: this.plan_description , clinic_id: this.clinic_id,total_amount:this.total_amount,setup_fee:this.setup_fee,deposite_amount:this.deposite_amount,balance_amount:this.balance_amount,payment_frequency:this.payment_frequency,duration:this.duration,monthly_weekly_payment:this.monthly_weekly_payment,start_date:this.start_date,due_date:this.due_date   }

    });
   
    dialogRef.afterClosed().subscribe(result => {
   this.inofficeService.addPaymentPlans(result.patient_name, result.patient_email, result.plan_name,result.plan_description,result.clinic_id,result.total_amount,result.setup_fee,result.deposite_amount,result.balance_amount,result.payment_frequency,result.duration,result.monthly_weekly_payment,result.start_date,result.due_date).subscribe((res) => {

   if(res.message == 'success'){
    
            this.notifier.notify( 'success', 'New Patient Added' ,'vertical');
            this.getInofficeMembers();
           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }
        );  
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
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        });  
        }
        });
      });
  }

  public deletePlan(row) {
           if(confirm("Are you sure to delete this plan?")) {
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
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

      // filter our data
    const temp = this.temp.filter(function(d) {    
      return d.patient_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }

  enableEditing(rowIndex, cell) {

    this.editing[rowIndex + '-' + cell] = true;
//console.log(this.editing);
  }

}
