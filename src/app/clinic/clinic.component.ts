import { Component, Inject, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ClinicService } from './clinic.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from './../layouts/full/header/header.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import { SetupService } from '../setup/setup.service';
import { identifierName } from '@angular/compiler';
import { newArray } from '@angular/compiler/src/util';
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
  public isConnectedCore :boolean = false;
  public showConnectButton : boolean = false;
  public urlPattern=/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(/\S/)])],
      address: [null, Validators.compose([Validators.required,Validators.pattern(/\S/) ])],
      //   patient_dob: [null, Validators.compose([Validators.required])],
      contact_name: [null, Validators.compose([Validators.required, Validators.pattern(/\S/)])],
      pms: [null, Validators.compose([Validators.required])],
      coreURL: [null, '']
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
    $('.form-control-dialog').each(function () {
      var likeElement = $(this).click();
    });
  }

  file: File;
  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    //  this.filedata =this.file;
  }
  connectToCore(){
    this.isConnectedCore = true;
  }
  selectPMS(data){
    this.showConnectButton = (data == 'core') ? true : false;
    if(this.showConnectButton){
      this.form.get('coreURL').setValidators([Validators.required, Validators.pattern(this.urlPattern)]);
    }else{
      this.form.get('coreURL').clearValidators();
      this.form.get('coreURL').updateValueAndValidity();
    }
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
  styleUrls: ['./clinic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/**
  *Main Clinic Component
  *AUTHOR - Teq Mavens
  */
export class ClinicComponent implements AfterViewInit {
  name: string;
  address: string;
  contact_name: string;
  pms: string;
  coreURL: string;
  public userPlan: any = '';
  public user_type: any = '';
  fileInput: any;
  public availabeLocations;
  public clinicName;

  //initialize component
  ngAfterViewInit() {
    this.getUserDetails();
    this.getClinics();
    this.userPlan = this._cookieService.get("user_plan");
    this.user_type = this._cookieService.get("user_type");
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
  constructor(private toastr: ToastrService, private clinicService: ClinicService, public dialog: MatDialog, private _cookieService: CookieService, private router: Router, private headerService: HeaderService, private setupService : SetupService) {

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
      data: { name: this.name, address: this.address, contact_name: this.contact_name, pms: this.pms, coreURL: this.coreURL }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){

        this.clinicName = result.name;

        if(result.coreURL == undefined)
            result.coreURL = "";

        var coreURL = "";
        if(result.pms == 'core'){
          let url : string = result.coreURL;
          let https = 'https';
          if(url.includes(https)){
            coreURL = url;
          }else{
            coreURL = "https://"+url;
          }
        }
        
        this.clinicService.addClinic(result.name, result.address, result.contact_name, result.pms, coreURL).subscribe((res) => {
          if (res.message == 'success') {
            if(res.data.pms == 'core'){
              let id = res.data.id;  
              this.getConnectCoreLink(id);
            }else{
              this.toastr.success('Clinic Added!');
            }
            this.getClinics();
          } else {
            this.toastr.error(res.data);
          }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }
        );
      }
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
  public clinicscount = 0;
  public createdClinicsCount = 0;
  private getClinics() {
    this.clinicService.getClinics().subscribe((res) => {
      if (res.message == 'success') {
        this.rows = res.data;
        if (res.data.length > 0) {
          this.temp = [...res.data];
          this.clinicscount = res.data[0]['user'].clinics_count;
          this.createdClinicsCount = res.total;
          this.table = data;
        }
      } else if (res.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
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
    this.rows = [];
    this.clinicService.getUserDetails().subscribe((res) => {
      if (res.message == 'success') {
        if (res.data) {
          this.clinicscount = res.data.clinics_count;
        }
      }
      else if (res.status == '401') {
        this._cookieService.put("username", '');
        this._cookieService.put("email", '');
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
      if (result.value) {
        $('.ajax-loader').show();
        if (this.rows[row]['id']) {
          this.clinicService.deleteClinic(this.rows[row]['id']).subscribe((res) => {
            $('.ajax-loader').hide();
            if (res.message == 'success') {
              this.toastr.success('Clinic Removed!');
              this.getClinics();
            }
            else if (res.status == '401') {
              this._cookieService.put("username", '');
              this._cookieService.put("email", '');
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
    var temp = {};
    temp['providerId'] = 'Enter Provider Id';
    temp['name'] = 'Enter Name';
    var length = this.rows.length;
    this.editing[length + '-providerId'] = true;
    this.editing[length + '-name'] = true;

    this.rows.push(temp);
    this.table = data;
  }
  //fileter data
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
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
    this.clinicService.updateClinic(this.rows[rowIndex]['id'], this.rows[rowIndex][cell], cell).subscribe((res) => {
      if (res.message == 'success') {
        this.toastr.success('Clinic Details Updated!');
        this.getClinics();
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    this.rows = [...this.rows];

  }

  enableEditing(rowIndex, cell) {
    //this.editing[rowIndex + '-' + cell] = true;

  }

  navigateMan(id) {
    if (id) {

    }
  }

  onActivate(event) {
    if (event.type == 'click') {
      if (event.row) {
        this.router.navigate(['/clinic-settings', event.row.id])
      }
    }
  }

  private getConnectCoreLink(id){
    this.setupService.getConnectCoreLink(id).subscribe((res) => {
       if(res.message == 'success'){
         let connectToCoreLink = res.data;
         this.connectToCore(connectToCoreLink,id);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
  }
  private connectToCore(link,id){ 
    var win = window.open(link, "MsgWindow", "width=1000,height=800");
    var self = this;
   var timer = setInterval(function() { 
      if(win.closed) {
        self.checkCoreStatus(id);
        clearTimeout(timer);
      }
    }, 1000);
  }

  private checkCoreStatus(id){
    this.setupService.checkCoreStatus(id).subscribe((res) => {
       if(res.message == 'success'){
         if(res.data.refresh_token && res.data.token)
            this.getClinicLocation(id);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });  
  }
  
  private getClinicLocation(id){
    this.setupService.getClinicLocation(id).subscribe(res=>{
      if(res.message == 'success'){
        this.availabeLocations = [...res.data];
        this.checkMappedLocations();
        this.openLocationDialog(id);
      }
    })
  }

openLocationDialog(id): void {
    const dialogRef = this.dialog.open(DialogLocationDialogComponent, {
      width: '600px',
      data: { location: this.availabeLocations, display_name : this.clinicName }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        let location_id = result;
        this.setupService.saveClinicLocation(id,location_id).subscribe(res=>{
          if(res.message == 'success'){
            this.toastr.success('Clinic Added!');
          }
        })
      }
    });
  }

  private checkMappedLocations(){
    this.clinicService.checkMappedLocations().subscribe(res=>{
      if(res.message == "success"){
        this.availabeLocations.filter(location=>{
            res.data.forEach(ele => {
              if(location.Identifier == ele.location_id){
                location.DisplayName += "(has)";
              }
            });
        })
      }  
    })
  }

}


@Component({
  selector: 'dialog-location',
  templateUrl: './dialog-location.html'
})

export class DialogLocationDialogComponent{
  public selectedLocation : any = null;
  constructor(public dialogRef: MatDialogRef<DialogLocationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) 
  {
    dialogRef.disableClose = true;
  }
  onNoClick(){
    this.dialogRef.close();
  }
  save(data) {
    this.dialogRef.close(data);
  }
  selectLocationChange(e){
    this.selectedLocation = e;
  }
  checkUserSelection(location){
    let has :string = location.DisplayName +="";
    return has.includes("(has)");
  }
}
