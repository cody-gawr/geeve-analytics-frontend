import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { ClinicService } from './clinic.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from "ngx-cookie";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from './../layouts/full/header/header.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})
/**
  *Update Clinic
  *AUTHOR - Teq Mavens
  */

export class DialogOverviewExampleDialogComponent {
  public form: FormGroup;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

     this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
   //   patient_dob: [null, Validators.compose([Validators.required])],
      contact_name: [null, Validators.compose([Validators.required])]   
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public clinic_id;
  save(data) {
      var patient_id;
      this.clinic_id = $('#currentClinicid').attr('cid');
                this.dialogRef.close(data);
          $('.form-control-dialog').each(function(){
          var likeElement = $(this).click();
        });    
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



@Component({
  selector: 'app-dialog-overview-limit-example-dialog',
  templateUrl: './dialog-overview-limit-example.html',
})
/**
  *Get count of clinic limmits
  *AUTHOR - Teq Mavens
  */
export class DialogOverviewExampleLimitDialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
   onNoClick(): void {
    this.dialogRef.close();
  }
}

declare var require: any;
const data: any = require('assets/company.json');
@Component({
  selector: 'app-table-filter',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
/**
  *Main Clinic Component
  *AUTHOR - Teq Mavens
  */
export class ClinicComponent implements AfterViewInit {
  name: string;
  address: string;
  contact_name: string;
  fileInput: any;
//initialize component
  ngAfterViewInit() {
    this.getUserDetails();
    this.getClinics();
    $('.header_filters').removeClass('hide_header');
    $('.header_filters').removeClass('flex_direct_mar');
    

    $('#title').html('Clinics');
    //$('.header_filters').hide();
    $('.external_clinic').show();
    //$('.dentist_dropdown').hide();
    $('.header_filters').addClass('hide_header');
  }
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'sr' }, { name: 'clinicName' }, { name: 'address' }, { name: 'contactName' }, { name: 'created' }];

  @ViewChild(ClinicComponent) table: ClinicComponent;
  constructor(private toastr: ToastrService,private clinicService: ClinicService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router,private headerService: HeaderService) {

    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
  private warningMessage: string;
//open add clinic modal
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '400px', 
      data: { name: this.name, address: this.address, contact_name: this.contact_name }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.clinicService.addClinic(result.name, result.address, result.contact_name).subscribe((res) => {
        if(res.message == 'success'){
          this.toastr.success('Clinic Added!' );
          this.getClinics();
        }
      }, error => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }
      );
    });
  }
  //open clinic limit dialog
  openLimitDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleLimitDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  //get list of clinics
  public clinicscount=0;
  public createdClinicsCount=0;
  private getClinics() {
    this.clinicService.getClinics().subscribe((res) => {
      if(res.message == 'success'){
        this.rows = res.data;
        if(res.data.length>0) {
          this.temp = [...res.data];
          this.clinicscount= res.data[0]['Users'].clinics_count;
          this.createdClinicsCount = res.data.length;
          this.table = data;
        }
      } else if(res.status == '401'){
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
  //get count of clinics allowed
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
  //delete clinic
  deleteClinic(row) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Clinic?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value){
        $('.ajax-loader').show();
        if(this.rows[row]['id']) {
          this.clinicService.deleteClinic(this.rows[row]['id']).subscribe((res) => {
            $('.ajax-loader').hide();
            if(res.message == 'success'){
              this.toastr.success('Clinic Removed!' );
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
            $('.ajax-loader').hide();
            this.warningMessage = "Please Provide Valid Inputs!";
          }
          );
        }
        else {
          this.rows.splice(row, 1);
          this.rows = [...this.rows];

        }
      } else {
        $('.ajax-loader').hide();
      }
    })
  }
  //craete dentist for clinic
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
  //fileter data
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

    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.clinicService.updateClinic(this.rows[rowIndex]['id'], this.rows[rowIndex][cell],cell).subscribe((res) => {
      if(res.message == 'success'){
        this.toastr.success('Clinic Details Updated!' );
        this.getClinics();
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
