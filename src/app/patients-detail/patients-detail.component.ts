import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { PatientsDetailService } from './patients-detail.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { EventEmitter , Output, Input} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
import { CustomValidators } from 'ng2-validation';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
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
  styleUrls: ['./patients-detail.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
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
  styleUrls: ['./patients-detail.component.scss']
})
 
export class DialogOverviewExampleDialogComponent {
  public clinic_id:any ={};
  public formInvite: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formInvite = this.fb.group({
      invite_member_name: [null, Validators.compose([Validators.required])],
      invite_member_email: [null, Validators.compose([Validators.required, CustomValidators.email])]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  //
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

  @Output() public emailval: EventEmitter<any> = new EventEmitter();

  @Output() public onAdd: EventEmitter<any> = new EventEmitter();

  public fileToUpload;
 
  uploadImage(files: FileList) {
    this.fileToUpload = files.item(0);
    this.onAdd.emit(this.fileToUpload);
  }

  save(data) {
    if(data.invite_member_name != undefined && data.invite_member_email != undefined ){
        this.dialogRef.close(data);
      }
    }
  file: File;
  onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
  }
}

@Component({
  selector: 'app-update-patient-dialog',
  templateUrl: './update-patient.html',
  styleUrls: ['./patients-detail.component.scss'],
})
export class UpdatePatientDialogComponent {
  constructor( public dialogUpdateRef: MatDialogRef<UpdatePatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    update(data) {
  
      if(data.patient_name != undefined && data.patient_address != undefined  && data.patient_dob != undefined && data.patient_age != undefined && data.patient_gender != undefined && data.patient_phone_no != undefined && data.patient_home_phno != undefined){
          this.dialogUpdateRef.close(data);
       }
     }
    
    onNoClick(): void {
    this.dialogUpdateRef.close();
  }
}

declare var require: any;
const data: any = [];
@Component({
  selector: 'app-table-filter',
  templateUrl: './patients-detail.component.html',
  styleUrls: ['./patients-detail.component.scss']
})
export class PatientsDetailComponent implements AfterViewInit {
  private readonly notifier: NotifierService;
  public id:any ={};
  public planname;
  invite_member_name: string;
  invite_member_email: string;
  membersplan:any={};
  fileInput: any ;
  patient_status:any;
  member_plan_id :any;
  clinic_id: any;
  public clinic_name:any ={};
  public patientdob;
   public end_date ;
  public start_date; 
 
   minDate = new Date('1990-01-01');
   maxDate = new Date();
  ngAfterViewInit() {
      this.initiate_clinic();
      this.getPlans();
    $('#title').html('Patients Listing');
        $('.header_filters').removeClass('hide_header');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
        $('.sa_heading_bar').show();     
  }

  initiate_clinic(){  
    this.clinic_id = $('#currentClinicid').attr('cid');
  if(this.clinic_id != "undefined")
   { this.getPatients();
    this.getClinicSettings();
   }
  else{
        $('.header_filters').addClass('hide_header');
        $('.external_clinic').hide();
    }
  }

  public connectedStripe =false;
public stripe_account_id;
 getClinicSettings() {
    $('.ajax-loader').show(); 
  this.patientsdetailService.getClinicSettings(this.clinic_id).subscribe((res) => {
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


  // chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.date.value;
  //   ctrlValue.year(normalizedMonth.year());
  //   ctrlValue.month(normalizedMonth.month())
  //   const monthname =this.getMonthName(normalizedMonth.month());
  //   this.selectedMonthYear = monthname+" "+(normalizedMonth.year().toString()).slice(-2);
  //   console.log(this.selectedMonthYear);
  //   const selectedyear = normalizedMonth.year();
  //   const selectedmonth = normalizedMonth.month() + 1;

  //   const finalStartDate = selectedyear+"-"+selectedmonth+"-"+"01";
  //   const finalEndDate = selectedyear+"-"+selectedmonth+"-"+"30";

  //   this.startDate = this.datePipe.transform(finalStartDate, 'yyyy-MM-dd');
  //   this.endDate = this.datePipe.transform(finalEndDate, 'yyyy-MM-dd');
     
  //   this.loadAnalytics();      
  //   $('.filter_custom').val(this.startDate+ " - "+this.endDate);

  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  // }
    
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  columns = [{ prop: 'id' }, { name: 'planName' }, { name: 'member_plan_id' }, { name: 'patient_address' }, { name: 'patient_age' }, { name: 'patient_dob' }, { name: 'patient_email' }, { name: 'patient_gender' }, { name: 'patient_home_phno' }, { name: 'patient_name' }, { name: 'patient_phone_no' }, { name: 'patient_status' }];

  @ViewChild(PatientsDetailComponent) table: PatientsDetailComponent;
  constructor(notifierService: NotifierService,private  patientsdetailService: PatientsDetailService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router ,private route: ActivatedRoute,private datePipe: DatePipe) {
    this.notifier = notifierService;
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  private warningMessage: string;
  public imageURL:any;
  goBack() {
   window.history.back();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '400px',
      data: {invite_member_name: this.invite_member_name, address: this.invite_member_email },
      panelClass: 'full-screen'
    });
  dialogRef.afterClosed().subscribe(result => {
    if(result != undefined) {
  $('.ajax-loader').show();
    this.clinic_id = $('#currentClinicid').attr('cid');
    this.patientsdetailService.inviteMember(this.clinic_id,result.invite_member_name, result.invite_member_email,'new').subscribe((res) => {
      $('.ajax-loader').hide();
    if(res.message == 'success'){
        this.notifier.notify( 'success', 'Member has been Invited' ,'vertical');
          this.getPatients();
       }
       else{
        this.notifier.notify( 'success', res.data.message ,'vertical');
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
  }
    });
  }

  openExportDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExportDialogComponent, {
      width: '400px',
      data: {start_date: new Date(new Date().getFullYear(), 0, 1), end_date: new Date(),minDate: this.minDate, maxDate: this.maxDate },
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
     
        this.patientsdetailService.getexportData(this.clinic_id, result.start_date, result.end_date).subscribe((res) => {    
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


  openUpdateDialog(patientid): void {

    this.patientsdetailService.getInofficeMembersByID(patientid,this.clinic_id).subscribe(updateres => {
    this.patientdob = this.datePipe.transform(updateres.data[0].patient_dob , 'yyyy-MM-dd');

    const dialogUpdateRef = this.dialog.open(UpdatePatientDialogComponent, {
     width: '250px',
     data: {patient_name: updateres.data[0].patient_name ,patient_address: updateres.data[0].patient_address,patient_dob: this.patientdob,patient_age:updateres.data[0].patient_age,patient_gender:updateres.data[0].patient_gender,patient_phone_no:updateres.data[0].patient_phone_no,patient_home_phno:updateres.data[0].patient_home_phno,patient_status:updateres.data[0].patient_status,patient_id:patientid} 
     });
    

  dialogUpdateRef.afterClosed().subscribe(result => {

    this.patientsdetailService.updatePatientsDetails(result.patient_name,result.patient_address,result.patient_dob,result.patient_age,result.patient_gender,result.patient_phone_no,result.patient_home_phno,result.patient_status,result.patient_id).subscribe((res) => {
   
   if(res.message == 'success'){
    this.getPatients();
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
        }
        );  
        });
      });
  }

  private getPatients() {
    this.patientsdetailService.getPatients(this.clinic_id).subscribe((res) => {
      if(res.message == 'success'){
        this.rows = res.data;
        this.planname = res.data[0]['planName'];        
        this.temp = [...res.data];
        this.table = data;
       }    
        else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
             }else if(res.status == '400'){
              this.rows = [];
             } 
        this.getInviteMembers();
           
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public getInviteMembers() {
  this.patientsdetailService.getInviteMembers(this.clinic_id).subscribe((res) => {
      if(res.message == 'success'){
        var count = this.rows.length;
        res.data.forEach(res => {
          var temp=[];
          temp['invite_id'] = res.id;
          temp['patient_name'] = res.invite_member_name;
          temp['patient_email'] = res.invite_member_email;
          temp['patient_status'] = 'INACTIVE';
          this.rows.push(temp);
          this.rows = [...this.rows];
        this.temp = [...this.rows];

        });
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

delete_invite(id)
{
 Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Member?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value) {
  this.patientsdetailService.deleteInviteMembers(id).subscribe((res) => {
      if(res.message == 'success'){
        this.getPatients();
      }
    });
    }
  })
}

resend_invite(name,email)
{
  $('.ajax-loader').show();
    this.patientsdetailService.inviteMember(this.clinic_id,name, email,'resend').subscribe((res) => {
      if(res.message == 'success'){
      $('.ajax-loader').hide();
        this.notifier.notify( 'success', 'Invite Sent' ,'vertical');        
        this.getPatients();
      }
    });
}


private deletePatients(row) {
  if(confirm("Are you sure to delete Patient?")) {
    if(this.rows[row]['id']) {
      this.patientsdetailService.deletePatients(this.rows[row]['id']).subscribe((res) => {
       if(res.message == 'success'){
        this.notifier.notify('success', 'Patient Removed' ,'vertical');
            this.getPatients();
             }      
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
    }
    else {      
      this.rows.splice(row, 1);
    this.rows = [...this.rows];
    this.getPatients();
    }
  }
  }
 
  private getPlans() {
    this.patientsdetailService.getPlans().subscribe((res) => {
        if(res.message == 'success'){
           this.membersplan= res.data;
           this.clinic_id = $('#currentClinicid').attr('cid');
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
    public StatusSelected;
 statusFilter() {
  const val =this.StatusSelected;
    const temp = this.temp.filter(function(d) {    
      return d.patient_status.indexOf(val) == 0 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page

    this.table = data;
}

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log(d.additional_members);
      return d.patient_name.toLowerCase().indexOf(val) !== -1 || (d.additional_members != null && d.additional_members.toLowerCase().indexOf(val) !== -1) || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }

  updateValue(event, cell, rowIndex) {

    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;

    this.patientsdetailService.updatePatients(this.rows[rowIndex]['id'],this.rows[rowIndex]['member_plan_id'],this.rows[rowIndex]['patient_status']).subscribe((res) => {
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Patient Updated' ,'vertical');
          this.getPatients();
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
    this.rows = [...this.rows];
  }
  enableEditing(rowIndex, cell) {
    this.editing[rowIndex + '-' + cell] = true;
  }


   getexportData(){
    if(this.start_date == undefined || this.end_date ==undefined){

          Swal.fire('', 'Please select Date Range', 'error');
      }
      else if(this.start_date>this.end_date){
          Swal.fire('', 'Please select valid Dates', 'error');
      }
       else {
         this.start_date = this.datePipe.transform(this.start_date, 'yyyy-MM-dd');
         this.end_date = this.datePipe.transform(this.end_date, 'yyyy-MM-dd');
     
        this.patientsdetailService.getexportData(this.clinic_id, this.start_date, this.end_date).subscribe((res) => {    
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
     headers: ["Payment Date","Payment Amount","Payment Status","Patient Name","Patient Email","Patient DOB","Membership Plan","Stripe Cust ID"]
   };
    new Angular5Csv(data, 'Membership Plans',options);
  }
  

}
