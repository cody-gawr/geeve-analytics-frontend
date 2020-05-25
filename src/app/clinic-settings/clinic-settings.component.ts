import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ClinicSettingsService } from './clinic-settings.service';
import { ActivatedRoute } from "@angular/router";
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import { Router, NavigationEnd, Event  } from '@angular/router';
import { NotifierService } from 'angular-notifier';
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
          public practice_size:any ={};
          options: FormGroup;
          public xero_link;
          public xeroConnect = false;
          public xeroOrganization='';
  constructor(notifierService: NotifierService,private _cookieService: CookieService, private fb: FormBuilder,  private clinicSettingsService: ClinicSettingsService, private route: ActivatedRoute,private router: Router) {
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
      practice_size: [null, Validators.compose([Validators.required])]
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
   this.clinicSettingsService.updateClinicSettings(this.id, this.clinicName,this.address,this.contactName, this.practice_size ).subscribe((res) => {
       if(res.message == 'success'){
          this.notifier.notify( 'success', 'Clinic Settings Updated' ,'vertical');
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
}
