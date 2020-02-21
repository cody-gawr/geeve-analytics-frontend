import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { ClinicService } from './clinic.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventEmitter , Output, Input} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
import { CustomValidators } from 'ng2-validation';
import { FormControl, FormGroupDirective,  NgForm,  Validators,FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})

export class DialogOverviewExampleDialogComponent {
  public form: FormGroup;
  public urlPattern=/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  constructor( private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      phone_no: [null, Validators.compose([Validators.required])],
      clinicEmail: [null, Validators.compose([Validators.required, CustomValidators.email])],
      address: [null, Validators.compose([Validators.required])],  
       facebook: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      twitter: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      linkedin: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      instagram: [null, Validators.compose([Validators.pattern(this.urlPattern)])]    
    });
  }

  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  //
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  @Output() public onAdd: EventEmitter<any> = new EventEmitter();

  public fileToUpload;
 
  uploadImage(files: FileList) {     
    this.fileToUpload = files.item(0);

      /* First check for file type then check for size .*/
   if(this.fileToUpload.type=='image/png' || this.fileToUpload.type=='image/jpg' || this.fileToUpload.type=='image/jpeg')
    {
        
    }else{
        alert("Invalid image. Allowed file types are jpg, jpeg and png only .");
        return false;
    }

    if(this.fileToUpload.size/1024/1024 > 2) //10000 bytes means 10 kb
    {
         alert("Header image should not be greater than 4 MB .");
         return false;
    }

    this.onAdd.emit(this.fileToUpload);
  }

   save(data) {
    if(data.name != undefined && data.address != undefined && data.phone_no != undefined){
        this.dialogRef.close(data);
      }
    }

  file: File;
  onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
      //  this.filedata =this.file;
    }
}
declare var require: any;
const data: any = require('assets/company.json');
@Component({
  selector: 'app-table-filter',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements AfterViewInit {
  private readonly notifier: NotifierService;
  name: string;
  address: string;
  contact_name: string;
  phone_no: number;
  publishable_key: string;
  secret_key: string;
  clinic_logo: string;
  user_id:any;
  fileInput: any;


  ngAfterViewInit() {
    this.getUserDetails();

    this.getClinics();
        $('#title').html('Clinics');
        //$('.header_filters').hide();
        $('.header_filters').addClass('hide_header');
        $('.sa_heading_bar').show();

        // this.notifier.notify( 'success', 'You are awesome! I mean it!' ,'vertical');
  }
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;
  facebook ='http://facebook.com/';
  twitter ='http://twitter.com/';
  linkedin='http://linkedin.com/';
  instagram='http://instagram.com/';
  clinicEmail;
  columns = [{ prop: 'sr' }, { name: 'clinicName' }, { name: 'address' }, { name: 'contactName' }, { name: 'created' }];

  @ViewChild(ClinicComponent) table: ClinicComponent;
  constructor(notifierService: NotifierService, private clinicService: ClinicService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router) {
      this.notifier = notifierService;
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
  private warningMessage: string;
  public disabled = false;

  public imageURL:any;

  goBack() {
      window.history.back();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { name: this.name, address: this.address, contact_name: this.contact_name ,phone_no: this.phone_no,clinicEmail: this.clinicEmail, facebook: this.facebook, twitter: this.twitter ,linkedin: this.linkedin,instagram:this.instagram}
    });
    
    const sub = dialogRef.componentInstance.onAdd.subscribe((val) => {
      $('.ajax-loader').show();
      let formData = new FormData();
      formData.append('file', val, val.name);
      this.clinicService.logoUpload(formData).subscribe((res) => {
      $('.ajax-loader').hide();
        if(res.message == 'success'){
          this.imageURL= res.data;
          this.notifier.notify( 'success', 'Logo Uploaded' ,'vertical');
        }
         else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
      });
      });
     
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      $('.ajax-loader').show();
  this.clinicService.addClinic(result.name, result.address, result.contact_name,result.phone_no,result.facebook, result.twitter, result.linkedin,result.instagram,result.clinicEmail, this.imageURL).subscribe((res) => {
      $('.ajax-loader').hide();
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Clinic Added' ,'vertical');
                this.getClinics();
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
public clinicscount=0;
public createdClinicsCount=0;
  private getClinics() {
    this.rows=[];
    this.clinicService.getClinics().subscribe((res) => {
       if(res.message == 'success'){
          this.rows = res.data;
          if(res.data.length >0) {
          this.user_id= res.data[0]['user_id'];
          this.clinicscount= res.data[0]['Users'].clinics_count;
          this.createdClinicsCount = res.data.length;
          this.temp = [...res.data];        
          this.table = data;
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


  private getUserDetails() {
    this.rows=[];
    this.clinicService.getUserDetails().subscribe((res) => {
       if(res.message == 'success'){
          if(res.data) {
          this.clinicscount= res.data.clinics_count;
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

  private deleteClinic(row) {
     Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Clinic?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value){
    if(this.rows[row]['id']) {
  this.clinicService.deleteClinic(this.rows[row]['id']).subscribe((res) => {
       if(res.message == 'success'){
         this.notifier.notify( 'success', 'Clinic Removed' ,'vertical');
          this.getClinics();
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
    else {
      this.rows.splice(row, 1);
    this.rows = [...this.rows];

    }
    }
   })
  }

  addDentist() {
    var temp ={};
    temp['providerId'] ='Enter Provider Id';
    temp['name'] ='Enter Name';
    var length = this.rows.length;
    this.editing[length + '-providerId'] = true;
    this.editing[length + '-name'] = true;
    this.rows.push(temp);
    this.table =data;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.clinicName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  updateValue(event, cell, rowIndex) {
      $('.ajax-loader').show();

    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.clinicService.updateClinic(this.rows[rowIndex]['id'], this.rows[rowIndex][cell],cell).subscribe((res) => {
      $('.ajax-loader').hide();
      
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Clinic Updated' ,'vertical');
          this.getClinics();
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
    this.rows = [...this.rows];

  }

  enableEditing(rowIndex, cell) {
    this.editing[rowIndex + '-' + cell] = true;

  }

}
