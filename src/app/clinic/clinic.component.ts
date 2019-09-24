import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { ClinicService } from './clinic.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})


export class DialogOverviewExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
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
const data: any = require('assets/company.json');
@Component({
  selector: 'app-table-filter',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements AfterViewInit {
  name: string;
  address: string;
  contact_name: string;
  fileInput: any ;


  ngAfterViewInit() {
    this.getClinics();
    $('.header_filters').removeClass('hide_header'); 
    $('.header_filters').removeClass('flex_direct_mar'); 
    
        $('#title').html('Clinics');
        //$('.header_filters').hide();
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('hide_header');
  }
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'sr' }, { name: 'clinicName' }, { name: 'address' }, { name: 'contactName' }, { name: 'created' }];

  @ViewChild(ClinicComponent) table: ClinicComponent;
  constructor(private clinicService: ClinicService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router) {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
  private warningMessage: string;



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { name: this.name, address: this.address, contact_name: this.contact_name }
    });
    dialogRef.afterClosed().subscribe(result => {
  this.clinicService.addClinic(result.name, result.address, result.contact_name).subscribe((res) => {
       if(res.message == 'success'){
        alert('Clinic Added');
          this.getClinics();
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
    });
  }




  private getClinics() {
    console.log(this.rows);
  this.clinicService.getClinics().subscribe((res) => {
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
  private deleteClinic(row) {
           if(confirm("Are you sure to delete Clinic?")) {
    if(this.rows[row]['id']) {
  this.clinicService.deleteClinic(this.rows[row]['id']).subscribe((res) => {
       if(res.message == 'success'){
        alert('Clinic Removed');
          this.getClinics();
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
  addDentist() {
    console.log(this.rows);
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

    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.clinicService.updateClinic(this.rows[rowIndex]['id'], this.rows[rowIndex][cell],cell).subscribe((res) => {
       if(res.message == 'success'){
        alert('Clinic Details Updated');
          this.getClinics();
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
