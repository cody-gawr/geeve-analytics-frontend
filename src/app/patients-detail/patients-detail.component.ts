import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { PatientsDetailService } from './patients-detail.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter , Output, Input} from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})


export class DialogOverviewExampleDialogComponent {
  public clinic_id:any ={};

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
       this.emailval.emit(this.email);
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email');
     
  }

  @Output() public emailval: EventEmitter<any> = new EventEmitter();

  @Output() public onAdd: EventEmitter<any> = new EventEmitter();

  public fileToUpload;
 
  uploadImage(files: FileList) {
     
    this.fileToUpload = files.item(0);
    this.onAdd.emit(this.fileToUpload);
  }

  save(data) {
    $('.form-control-dialog').each(function(){
    var likeElement = $(this).click();
  });
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
})
export class UpdatePatientDialogComponent {


  constructor( public dialogUpdateRef: MatDialogRef<UpdatePatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    update(data) {
         
      $('.form-control-dialog').each(function(){
      var likeElement = $(this).click();
    });
    console.log(data);
  
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
  ngAfterViewInit() {
    this.getPlans();
    this.getPatients();

    $('#title').html('Patients Listing');
    $('.header_filters').addClass('hide_header');
 //   this.getClinincname();
 
        
  }
  editing = {};
  rows = [];

  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'id' }, { name: 'planName' }, { name: 'member_plan_id' }, { name: 'patient_address' }, { name: 'patient_age' }, { name: 'patient_dob' }, { name: 'patient_email' }, { name: 'patient_gender' }, { name: 'patient_home_phno' }, { name: 'patient_name' }, { name: 'patient_phone_no' }, { name: 'patient_status' }];

  @ViewChild(PatientsDetailComponent) table: PatientsDetailComponent;
  constructor(notifierService: NotifierService,private patientsdetailService: PatientsDetailService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router ,private route: ActivatedRoute,private datePipe: DatePipe) {
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
      width: '250px',
      data: {invite_member_name: this.invite_member_name, address: this.invite_member_email }

    });
    
   
  dialogRef.afterClosed().subscribe(result => {
    if(result != undefined) {
  $('.ajax-loader').show();
    this.clinic_id = $('#currentClinicid').attr('cid');
    this.patientsdetailService.inviteMember(this.clinic_id,result.invite_member_name, result.invite_member_email).subscribe((res) => {
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
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }
        );  
        });
      });
  }
  private getPatients() {
 
    this.patientsdetailService.getPatients().subscribe((res) => {
      if(res.message == 'success'){
        this.rows = res.data;
        this.planname = res.data[0]['planName'];
        
        this.temp = [...res.data];    
        // console.log(this.temp )
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
        
   
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }   
    );
  }

  private deletePatients(row) {
           if(confirm("Are you sure to delete Patient?")) {
    if(this.rows[row]['id']) {
      this.patientsdetailService.deletePatients(this.rows[row]['id']).subscribe((res) => {
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Patient Removed' ,'vertical');
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
      }, error => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }    
      );
  
    }
 
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.patient_name.toLowerCase().indexOf(val) !== -1 || d.patient_gender.toLowerCase().indexOf(val) !== -1 || d.patient_email.toLowerCase().indexOf(val) !== -1 || !val;
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
    console.log('UPDATED!', this.rows[rowIndex][cell]);

  }

  enableEditing(rowIndex, cell) {
    this.editing[rowIndex + '-' + cell] = true;

  }
  

}
