import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { PatientsDetailService } from './patients-detail.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter , Output, Input} from '@angular/core';
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
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
        this.emailval.emit(this.email);
  }

  @Output() public emailval: EventEmitter<any> = new EventEmitter();

  @Output() public onAdd: EventEmitter<any> = new EventEmitter();

  public fileToUpload;
 
  uploadImage(files: FileList) {
     
    this.fileToUpload = files.item(0);
    this.onAdd.emit(this.fileToUpload);
  }


  file: File;
  onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
        console.log(this.file);
      //  this.filedata =this.file;
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
  public id:any ={};
  invite_member_name: string;
  invite_member_email: string;
  membersplan:any={};
  fileInput: any ;
  patient_status:any;
  member_plan_id :any;
  clinic_id: any;
  public clinic_name:any ={};

  ngAfterViewInit() {

    this.id = this.route.snapshot.paramMap.get("id");
    
    this.getPlans();
    this.getPatients();

        $('#title').html('Patients Listing');
        //$('.header_filters').hide();
             $('.header_filters').addClass('hide_header');
    this.getClinincname();
 
        
  }
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'id' }, { name: 'planName' }, { name: 'member_plan_id' }, { name: 'patient_address' }, { name: 'patient_age' }, { name: 'patient_dob' }, { name: 'patient_email' }, { name: 'patient_gender' }, { name: 'patient_home_phno' }, { name: 'patient_name' }, { name: 'patient_phone_no' }, { name: 'patient_status' }];

  @ViewChild(PatientsDetailComponent) table: PatientsDetailComponent;
  constructor(private patientsdetailService: PatientsDetailService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router ,private route: ActivatedRoute) {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }


  private warningMessage: string;

  public imageURL:any;
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {invite_member_name: this.invite_member_name, address: this.invite_member_email }

    });
    
   
  dialogRef.afterClosed().subscribe(result => {
  
    this.clinic_id = $('#currentClinicid').attr('cid');
    this.patientsdetailService.inviteMember(this.clinic_id,result.invite_member_name, result.invite_member_email).subscribe((res) => {
    if(res.message == 'success'){
        alert('Member has been Invited');
          this.getPatients();
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    });
  }

  private getPatients() {
 
    this.patientsdetailService.getPatients(this.id).subscribe((res) => {
      if(res.message == 'success'){
        this.rows = res.data;
        // console.log(this.rows );
    
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
           }
   
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }   
    );
  }

  private getClinincname() {
 
    this.patientsdetailService.getClinincname(this.id).subscribe((res) => {
       if(res.message == 'success'){
        this.clinic_name = res.data[0]['clinic']['clinicName'];
        $('#title').html('Patients Listing - '+ this.clinic_name);
    
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

  private deletePatients(row) {
           if(confirm("Are you sure to delete Patient?")) {
    if(this.rows[row]['id']) {
      this.patientsdetailService.deletePatients(this.rows[row]['id']).subscribe((res) => {
       if(res.message == 'success'){
        alert('Patient Removed');
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
      return d.patient_name.toLowerCase().indexOf(val) !== -1 || !val;
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
        alert('patient Updated');
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
