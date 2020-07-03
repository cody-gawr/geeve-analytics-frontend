import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ClinicSettingsService } from './clinic-settings.service';
import { ActivatedRoute } from "@angular/router";
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import { Router, NavigationEnd, Event  } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-formlayout',
  templateUrl: './clinic-settings.component.html',
  styleUrls: ['./clinic-settings.component.scss']
})
export class ClinicSettingsComponent implements OnInit {
   public form: FormGroup;
   public errorLogin = false;
   public clinic_id:any ={};
        private readonly notifier: NotifierService;
          private warningMessage: string;
          public id:any ={};
          public clinicName:any =0;
          public contactName =0;
          // public chartData: any[] = [];
          public address:any = {};
          public post_op_calls:any = '';
          public practice_size:any ={};
          options: FormGroup;
          public xero_link;
          public xeroConnect = false;
          public xeroOrganization='';
          public workingDays:any = {sunday: false,monday: false,tuesday: false,wednesday: false,thursday: false,friday: false,saturday: false};       
  constructor(private toastr: ToastrService,notifierService: NotifierService,private _cookieService: CookieService, private fb: FormBuilder,  private clinicSettingsService: ClinicSettingsService, private route: ActivatedRoute,private router: Router) {
   this.notifier = notifierService;
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }
  ngOnInit() {
      this.route.params.subscribe(params => {
    this.id = this.route.snapshot.paramMap.get("id");
      this.getClinicSettings();
          $('#title').html('Clinic Settings');
         $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
        this.checkXeroStatus();

     });
    
     this.form = this.fb.group({
      clinicName: [null, Validators.compose([Validators.required])],
      contactName: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      practice_size: [null, Validators.compose([Validators.required])],
      // post_op_calls: [null, Validators.compose([Validators.required])]
    });
  }

  // For form validator
  email = new FormControl('', [Validators.required, Validators.email]);

  // Sufix and prefix
  hide = true;

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getClinicSettings() {
  this.clinicSettingsService.getClinicSettings(this.id).subscribe((res) => {

       if(res.message == 'success'){
        this.clinicName = res.data[0].clinicName;
        this.contactName = res.data[0].contactName;
        this.address = res.data[0].address;
        this.practice_size = res.data[0].practice_size;
        this.post_op_calls = res.data[0].post_op_calls;        
        this.workingDays = JSON.parse(res.data[0].days);        
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

  onSubmit() {
  this.clinicName = this.form.value.clinicName;
  this.contactName = this.form.value.contactName;
  this.address = this.form.value.address;
  this.practice_size = this.form.value.practice_size;
  this.post_op_calls = this.form.value.post_op_calls;
  let days = JSON.stringify(this.workingDays);
   this.clinicSettingsService.updateClinicSettings(this.id, this.clinicName,this.address,this.contactName, this.practice_size,days,this.post_op_calls ).subscribe((res) => {
       if(res.message == 'success'){
         this.toastr.success('Clinic Settings Updated' );
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

  getXeroLink(){
    this.clinicSettingsService.getXeroLink(this.id).subscribe((res) => {
       if(res.message == 'success'){
        this.xero_link = res.data;
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

  public openXero(){
      var success;
      console.log(this.xero_link);
      var win = window.open(this.xero_link, "MsgWindow", "width=400,height=400");
      var self = this;
     var timer = setInterval(function() { 
        if(win.closed) {
          self.checkXeroStatus();
          clearTimeout(timer);
        }
      }, 1000);
  }
  public checkXeroStatus(){
    this.clinicSettingsService.checkXeroStatus(this.id).subscribe((res) => {
       if(res.message == 'success'){
        if(res.data.xero_connect == 1) {
          this.xeroConnect = true;
          this.xeroOrganization = res.data.Name;
        }
        else {
          this.xeroConnect = false;
           this.xeroOrganization = '';          
          this.disconnectXero();
        }
       }
       else {
        this.xeroConnect = false;
           this.xeroOrganization = ''; 
          this.disconnectXero();
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });  
 }
 public disconnectXero() {
    this.clinicSettingsService.clearSession(this.id).subscribe((res) => {
       if(res.message == 'success'){
          this.xeroConnect = false;
          this.xeroOrganization = '';   
          this.getXeroLink();
       }
       else {
        this.xeroConnect = true;
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });   
 }

public toggle(event){
  if(event.source.name == 'sunday'){

    this.workingDays.sunday = event.checked;

  } else if(event.source.name == 'monday'){

    this.workingDays.monday = event.checked;

  } else if(event.source.name == 'tuesday'){

    this.workingDays.tuesday = event.checked;

  } else if(event.source.name == 'wednesday'){

    this.workingDays.wednesday = event.checked;

  } else if(event.source.name == 'thursday'){

    this.workingDays.thursday = event.checked;

  } else if(event.source.name == 'friday'){

    this.workingDays.friday = event.checked;

  } else if(event.source.name == 'saturday'){

    this.workingDays.saturday = event.checked;

  }
}

}
