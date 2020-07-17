import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { DefaultersService } from './defaulters.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroupDirective,  NgForm,  Validators} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { empty } from 'rxjs';
import { HeaderService } from '../layouts/full/header/header.service';
import { ToastrService } from 'ngx-toastr';
declare var require: any;
const data: any = [];

@Component({
  selector: 'app-table-filter',
  templateUrl: './defaulters.component.html',
  styleUrls: ['./defaulters.component.scss']
})
export class DefaultersComponent implements AfterViewInit {
  private readonly notifier: NotifierService;
  name: string;
  address: string;
  contact_name: string;
  fileInput: any ;
  clinic_id: any;
  public selectedtreat;

  treat = new FormControl();
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
     // this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );

  }
  ngAfterViewInit() {
    this.checkPermission('defaulters');
       // this.initiate_clinic();
        $('#title').html('Defaulters');

        $('.sa_heading_bar').show();  
  }

  editing = {};
  rows = [];
 
  temp = [...data];
  table;
  loadingIndicator = true;
  reorderable = true;

  public patient_name;
  public planLength;
  public totalAmount;
  public description;
  public discount;
  public treatmentdata;
  public memberplan_id;

  constructor(private toastr: ToastrService,notifierService: NotifierService,private defaultersService: DefaultersService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router,  private headerService: HeaderService) {
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
  if(this.clinic_id != "undefined"){
           $('.header_filters').removeClass('hide_header');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
      this.getDefaultersMembers();
  }
    else{
        $('.header_filters').addClass('hide_header');
        $('.external_clinic').hide();
    }
  }
    
  goBack() {
      window.history.back();
  }

private getDefaultersMembers() {
  this.rows=[];
  this.defaultersService.getDefaultersMembers(this.clinic_id).subscribe((res) => {  
        if(res.message == 'success'){
        this.rows = res.data;
        // console.log(this.rows);
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

  private sendDefaultersemail(rowIndex) {
    var defaulter_name =  this.rows[rowIndex]['patient_name'];
    var defaulter_email = this.rows[rowIndex]['patient_email'];
    var defaulter_id = this.rows[rowIndex]['id'];
    var defaulter_type = this.rows[rowIndex]['plan_type'];
    var defaulter_plan_id = '';
  $('.ajax-loader').show(); 
    this.defaultersService.sendDefaultersemail(defaulter_id,defaulter_name,defaulter_email,defaulter_type,defaulter_plan_id).subscribe((res) => {
      $('.ajax-loader').hide(); 
          if(res.message == 'success'){
            this.toastr.success('Payment Reminder Send .');
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
  }

}
