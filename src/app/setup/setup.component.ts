import { Component, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { SetupService } from './setup.service';
import { CookieService } from "ngx-cookie";
import { ActivatedRoute, Router } from "@angular/router";
import { ClinicService } from '../clinic/clinic.service';
import { RolesUsersService } from '../roles-users/roles-users.service';
import { PlansService } from '../plans/plans.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from "@angular/common";
import { environment } from "../../environments/environment";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { core } from '@angular/compiler';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements AfterViewInit {


  @ViewChild('stepper') stepper;
  private apiUrl = environment.apiUrl;
  public form: FormGroup;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  inviteFormGroup: FormGroup;
  private warningMessage: string;
  public disabled = false;
  public imageURL:any = '';  
  public xero_link;
  public xeroConnect = false;
  public xeroOrganization='';
  public myob_link;
  public myobConnect = false;
  public myobOrganization='';
  public selectedIndex:any;
  facebook ='http://facebook.com/';
  twitter ='http://twitter.com/';
  linkedin='http://linkedin.com/';
  instagram='http://instagram.com/';
  loadingIndicator = true;
  id:any;
  clinic_id:any;
  stepVal:any = 0;
  public displayName;
  public name;
  public pms;
  public phone_no;
  public clinicEmail;
  public address;
  public connectToCoreLink;

  public urlPattern=/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  public connectedStripe=true;
  public preventative_plan_selected;
  public treatment_inclusions_selected;
  public treatment_exclusions_selected;
  public preventative_plan:any;
  public treatment_inclusions;
  public treatment_exclusions;
  public dropdownSettings;
  public userRows= 2;
  public rows:any = [];
  public fileToUpload;
  public showCorePractice : boolean ;

  public LocationData;
  public pmsValue = "";
usersArray = new Array(this.userRows);
  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  //
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) ||k ==45); 
  }
   numberOnly(event): boolean {
   const charCode = (event.which) ? event.which : event.keyCode;
   if (charCode > 32 && (charCode < 48 || charCode > 57)) {
     return false;
   }
   return true;
  }
  ngAfterViewInit() {
    $('.external_clinic').hide();
    $('.header_filters').hide();
   
         this.preventative_plan = [
         {"id":1,"itemName":"Exam"},
          {"id":2,"itemName":"Fluoride"},
          {"id":3,"itemName":"Clean"},
          {"id":4,"itemName":"Intraoral Xrays"},
          {"id":5,"itemName":"Photos"},
          {"id":6,"itemName":"Cancer Check"},
          {"id":7,"itemName":"Opgs"},
          {"id":8,"itemName":"Cone Beams"},
          {"id":9,"itemName":"Fissure Sealants"}
        ];
        this.treatment_inclusions = [
            {"id":1,"itemName":"Fillings"},
            {"id":2,"itemName":"Extractions"},
            {"id":3,"itemName":"Wisdom teeth removal"},
            {"id":4,"itemName":"Orthodontics"},
            {"id":6,"itemName":"Intraoral Xrays"},
            {"id":7,"itemName":"Opgs"},
            {"id":8,"itemName":"Cbct"},
            {"id":9,"itemName":"Fissure Sealants"},
            {"id":10,"itemName":"Stainless Steel Crowns"},
            {"id":10,"itemName":"Crowns"},
            {"id":11,"itemName":"Bridges"},
            {"id":12,"itemName":"Porcelain Veneers"},
            {"id":13,"itemName":"Composite Veneers"},
            {"id":14,"itemName":"Periodontal Treatment"},
            {"id":15,"itemName":"Root Canal Treatment"},
            {"id":16,"itemName":"Implants"},
            {"id":17,"itemName":"Dentures"},
            {"id":18,"itemName":"Occlusal Splints"},
                 {"id":19,"itemName":"Any Treatment referred to a Specialist"},
            {"id":20,"itemName":"Any Treatment performed under General Anaesthetic"},
            {"id":21,"itemName":"Any Treatment performed under IV Sedation"}
        ];
        this.preventative_plan_selected =[
          {"id":1,"itemName":"Exam"},
          {"id":2,"itemName":"Fluoride"},
          {"id":3,"itemName":"Clean"}
        ];
        this.treatment_inclusions_selected=[
          {"id":1,"itemName":"Fillings"},
            {"id":2,"itemName":"Extractions"},
            {"id":3,"itemName":"Wisdom teeth removal"},
            {"id":4,"itemName":"Orthodontics"},
            {"id":6,"itemName":"Intraoral Xrays"},
            {"id":7,"itemName":"Opgs"},
            {"id":8,"itemName":"Cbct"},
            {"id":9,"itemName":"Fissure Sealants"},
            {"id":10,"itemName":"Stainless Steel Crowns"},
            {"id":10,"itemName":"Crowns"},
            {"id":11,"itemName":"Bridges"},
            {"id":12,"itemName":"Porcelain Veneers"},
            {"id":13,"itemName":"Composite Veneers"},
            {"id":14,"itemName":"Periodontal Treatment"},
            {"id":15,"itemName":"Root Canal Treatment"},
            {"id":16,"itemName":"Implants"},
            {"id":17,"itemName":"Dentures"},
            {"id":18,"itemName":"Occlusal Splints"}
        ];
        this.treatment_exclusions_selected=[
             {"id":19,"itemName":"Any Treatment referred to a Specialist"},
            {"id":20,"itemName":"Any Treatment performed under General Anaesthetic"},
            {"id":21,"itemName":"Any Treatment performed under IV Sedation"}
        ];
        this.treatment_exclusions = [
                                {"id":1,"itemName":"Any Treatment referred to a Specialist"},
                                {"id":2,"itemName":"Any Treatment performed under General Anaesthetic"},
                                {"id":3,"itemName":"Any Treatment performed under IV Sedation"}
                            ];                            
        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Treatements",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: true,
                                  classes:"myclass custom-class"
                                }; 
    this.getClinics();
    //this.checkXeroStatus(false);
  }

/*  ngAfterViewChecked(){
    var winH = $(window).height();
    var divH = $('div.stepper_innner').height();
    var marginTop = ((winH - divH) /2 ) - 50 ;
    $('div.stepper_innner').css('margin-top',marginTop);
  }*/
  minDate = new Date('1990-01-01');
   maxDate = new Date();
  constructor(private _formBuilder: FormBuilder,private clinicService: ClinicService, private setupService: SetupService, private _cookieService: CookieService, private router: Router, private route: ActivatedRoute,private rolesUsersService: RolesUsersService,private toastr: ToastrService,private plansService: PlansService, private _location: Location,  public dialog: MatDialog){
    
  }


  public isCompleted = true;
  public clinicscount=0;
  public createdClinicsCount=0;

  public step1Completed= true;
  public step2Completed= true;
  public step3Completed= true;
  public step4Completed= true;
  public step5Completed= true;
  public step6Completed= true;
  
  public step1editable= false;
  public step2editable= false;
  public step3editable= false;
  public step4editable= false;
  public step5editable= false;
  public step6editable= false;
  public reportsStatus:any = [];
  public reportsStatusInfo:boolean = false;
   public workingDays:any = {sunday: false,monday: true,tuesday: true,wednesday: true,thursday: true,friday: true,saturday: true}; 
  public  PMS = [
    {id:1,pms_name:'D4w'},
    {id:2,pms_name:'Core Practice'}
  ];


  ngOnInit() {
    let currentStep = parseInt(this._cookieService.get("stepper"))
    if(currentStep > 5){
      this.router.navigateByUrl('/login');
    }

    this.firstFormGroup = this._formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      pms: [null, Validators.compose([Validators.required])],
      // phone_no: [null, Validators.compose([Validators.required])],
      // clinicEmail: [null, Validators.compose([Validators.required, CustomValidators.email])],
      // address: [null, Validators.compose([Validators.required])],  
      displayName: [null, Validators.compose([Validators.required])],  
      coreURL: [null, '']
     /* facebook: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      twitter: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      linkedin: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      instagram: [null, Validators.compose([Validators.pattern(this.urlPattern)])]*/
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.inviteFormGroup = this._formBuilder.group({
       itemRows: this._formBuilder.array([this.initItemRows()])
    });
    this.id = this._cookieService.get("userid");
  }

  changePmsSelection(val){
    this.pmsValue = val;
    this.showCorePractice = val == 'core' ? true : false;
    if(this.showCorePractice)
      this.firstFormGroup.get('coreURL').setValidators([Validators.required, Validators.pattern(this.urlPattern)]);
    else{
      this.firstFormGroup.get('coreURL').clearValidators();
      this.firstFormGroup.get('coreURL').updateValueAndValidity();
    }
  }

 private getClinics() {
    this.rows=[];
    this.clinicService.getClinics().subscribe((res) => {
       if(res.status == 200){
          this.rows = res.body.data;
          if(res.body.data.length > 0) {
            this.clinic_id = res.body.data[0]['id'];
            this.showCorePractice = res.body.data[0]['pms'] == 'core' ? true : false;
            if(this.clinic_id){
              //this.getClinicSettings();
              this.checkXeroStatus(false);
              this.checkMyobStatus(false);
              this.getConnectCoreLink();
            }            
          }          
          if(this._cookieService.get("stepper"))
          { 
              this.refreshTabs();
              //this.getPlans();
          }
       } else if(res.status == 401){
          this._cookieService.put("username",'');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );

  }

  public refreshTabs(){
  var selectedIndex = parseInt(this._cookieService.get("stepper"))-1;
  this.step1Completed=false;
  this.step1editable=true;
  this.step2Completed=false;
  this.step2editable=true;
  this.step3Completed=false;
  this.step3editable=true;
  this.step4Completed=false;
  this.step4editable=true;

  if(selectedIndex >= 1) {
    this.step1Completed=true;
    this.step1editable=false;
  }

  if(selectedIndex >= 2) {
      this.step2Completed=true;
      this.step2editable=false;
  }

  if(selectedIndex >= 3) {
      this.step3Completed=true;
      this.step3editable=false;
    }

  if(selectedIndex >= 4) {
      this.step4Completed=true;
      this.step4editable=false;
    }
  if(selectedIndex == 2 && this.showCorePractice) {
    this.coreSyncStatus();
  }
  if(selectedIndex == 2 && this.pmsValue == "d4w") {
    this.checkRepotrs();
  }
  if(selectedIndex == 2 && this.pmsValue == "exact") {
    this.checkExactRepotrs();
  }
  this.selectedIndex = selectedIndex;

}
   getXeroLink(){
    this.setupService.getXeroLink(this.clinic_id).subscribe((res) => {
       if(res.status == 200){
        this.xero_link = res.body.data;
       }
        else if(res.status == 401){
            this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
  }

  getConnectCoreLink(){
    // this.clinic_id = 186;
    this.setupService.getConnectCoreLink(this.clinic_id).subscribe((res) => {
       if(res.status == 200){
         this.connectToCoreLink = res.body.data;
       }
        else if(res.status == 401){
            this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
  }

  //get myob authorization link
  getMyobLink(){ 
    this.setupService.getMyobLink(this.clinic_id).subscribe((res) => {
       if(res.status == 200){
        this.myob_link = res.body.data;
       } else if(res.status == 401){
            this._cookieService.put("username",'');
              this._cookieService.put("email", '');
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
      var win = window.open(this.xero_link, "MsgWindow", "width=1000,height=800");
      var self = this;
     var timer = setInterval(function() { 
        if(win.closed) {
          self.checkXeroStatus(true);
          clearTimeout(timer);
        }
      }, 1000);
  }
  //create myob connection model
 public openMyob(){ 
  var success;

  var win = window.open(this.myob_link, "MsgWindow", "width=1000,height=800");
  var self = this;
 var timer = setInterval(function() { 
    if(win.closed) {
      self.checkMyobStatus(true);
      clearTimeout(timer);
    }
  }, 1000);
}
  public checkXeroStatus(close){
    this.setupService.checkXeroStatus(this.clinic_id).subscribe((res) => {
       if(res.body.message != 'error'){

        if(res.body.data.xero_connect == 1) {
          this.xeroConnect = true;
          this.xeroOrganization = res.body.data.Name;
          if(close){
            this.saveStripe();
          }
        } else {
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

  //check status of myob connection
  public checkMyobStatus(close){
    this.setupService.checkMyobStatus(this.clinic_id).subscribe((res) => {
       if(res.body.message != 'error'){
        if(res.body.data.myob_connect == 1) {
          this.myobConnect = true;
          this.myobOrganization = res.body.data.Name;
          if(close){
            this.saveStripe();
          }
        }
        else {
          this.myobConnect = false;
           this.myobOrganization = '';          
          this.disconnectMyob();
        }
       }
       else {
        this.myobConnect = false;
           this.myobOrganization = ''; 
          this.disconnectMyob();
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });  
  }
 public disconnectXero() {
  
    this.setupService.clearSession(this.clinic_id).subscribe((res) => {
       if(res.status == 200){
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
 //disconnect myob connection
 public disconnectMyob() { 
  this.setupService.clearSessionMyob(this.clinic_id).subscribe((res) => {
     if(res.status == 200){
        this.myobConnect = false;
        this.myobOrganization = '';   
        this.getMyobLink();
     }
     else {
      this.myobConnect = true;
    }
  }, error => {
    this.warningMessage = "Please Provide Valid Inputs!";
  });   
}


  saveclinic(stepper) {
    let name =this.firstFormGroup.controls.name.value;
    // let phone_no =this.firstFormGroup.controls.phone_no.value;
    // let clinicEmail =this.firstFormGroup.controls.clinicEmail.value;
    // let address  =this.firstFormGroup.controls.address.value;
    let displayName  =this.firstFormGroup.controls.displayName.value;
    let pms  =this.firstFormGroup.controls.pms.value;
    
    var coreURL = "";

    if(pms == 'core'){
      let url : string  =this.firstFormGroup.controls.coreURL.value;
      let https = 'https';
      if(url.includes(https)){
        coreURL = url;
      }else{
        coreURL = "https://"+url;
      }
    }

    let days = JSON.stringify(this.workingDays);   
  /*  let facebook =this.firstFormGroup.controls.facebook.value;
    let twitter  =this.firstFormGroup.controls.twitter.value;
    let linkedin =this.firstFormGroup.controls.linkedin.value;
    let instagram =this.firstFormGroup.controls.instagram.value;
*/
      $('.ajax-loader').show();
      // address,phone_no,clinicEmail,
       this.setupService.addClinic(name,displayName,days,pms,coreURL).subscribe((res) => {
       $('.ajax-loader').hide();
        if(res.status == 200){
          this.clinic_id = res.body.data.id;
          this._cookieService.put("display_name", displayName);
          if(res.body.data.pms == 'core'){
            this.getConnectCoreLink();
          }else{
            this.getXeroLink();
          }
          //this.getClinicSettings();
          this.stepVal = 1;
       this.updateStepperStatus(); 
       //this.getClinic(); 
       //this.toastr.success('Clinic Added.');
       }else if(res.status == 401){
         this._cookieService.put("username",'');
         this._cookieService.put("email", '');
         this._cookieService.put("userid", '');
         this.router.navigateByUrl('/login');
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
     //return false;
    }
   get formArr() {
    return this.inviteFormGroup.get('itemRows') as FormArray;
  }
   initItemRows() {
    return this._formBuilder.group({
      display_name: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.email]],
      user_type: ['', [Validators.required]]
    });
  }

  addNewRow() { 
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }



  checkUserEmail(display_name, email, user_type) { 
    this.rolesUsersService.checkUserEmail(email).subscribe((res) => {
      if(res.status == 200){
        let length = 10;
        var randomPassword  = '';
        var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          randomPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        if(res.body.data <=0)
          this.add_user(display_name, email, user_type, randomPassword,this.clinic_id,this.inviteFormGroup.value.dentist_id);
        else
          this.toastr.error('Email Already Exists!');
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }


  add_user(display_name, email, user_type, password,clinic_id,dentist_id) {
    if(dentist_id =='' || dentist_id == undefined)
      dentist_id ='';
    $('.ajax-loader').show();   
    this.rolesUsersService.addRoleUser(display_name, email, user_type,clinic_id, password,dentist_id).subscribe({
      next: (res) => {
        $('.ajax-loader').hide();
      }, 
      error:error => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }
    });
  }

  updateStepperStatus() {
      this.setupService.updateStepperStatus().subscribe((res) => {
        
       $('.ajax-loader').hide();
        if(res.status == 200){
          if(this.stepVal < 4 ) {
          var stepper1 = parseInt(this.stepVal) + 1;
           this._cookieService.put("stepper", stepper1.toString());
            this.refreshTabs();

            
          } else {
             this._cookieService.put("stepper", "4");
             this.router.navigateByUrl('/dashboards/cliniciananalysis');
          }
           // this.ClickNext('step'+this._cookieService.get("stepper"),stepper);
       }else if(res.status == 401){
         this._cookieService.put("username",'');
         this._cookieService.put("email", '');
         this._cookieService.put("userid", '');
         this.router.navigateByUrl('/login');
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
    }


  saveStripe() {
    this.stepVal = 2;
    this.updateStepperStatus(); 
  }

  saveInvites() {
    this.stepVal = 3;
    var i=0;
    this.inviteFormGroup.value.itemRows.forEach(res => {
      if(res.display_name != '' &&  res.email != ''){
        this.checkUserEmail(res.display_name, res.email, res.user_type);
      }
      i++;
    });
    if(i == this.inviteFormGroup.value.itemRows.length){
      this.updateStepperStatus(); 
    }
  }

  /*saveInvites(){
    this.stepVal = 3;
    this.updateStepperStatus(); 
  }*/
  skipDownloadSyncUtility() {
    this.stepVal = 3;
    this.updateStepperStatus(); 
  }

  connectToCore(){ 
    var win = window.open(this.connectToCoreLink, "MsgWindow", "width=1000,height=800");
    var self = this;
   var timer = setInterval(function() { 
      if(win.closed) {
        self.checkCoreStatus();
        // self.getClinicLocation(); //--
        clearTimeout(timer);
      }
    }, 1000);
  }
  public checkCoreStatus(){
    this.setupService.checkCoreStatus(this.clinic_id).subscribe((res) => {
       if(res.status == 200){
         if(res.body.data.refresh_token && res.body.data.token && res.body.data.core_user_id)
            this.getClinicLocation();
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });  
  }

  public coreSyncStatus(){
    this.setupService.checkCoreSyncStatus(this.clinic_id).subscribe((res) => {
      if(res.status == 200){
        if(res.body.data == 1){
            this.stepVal = 3;
            this.updateStepperStatus();
        }else{
          setTimeout(() => {
            this.coreSyncStatus();
          }, 10000);
        }
      }
   }, error => {
     this.warningMessage = "Please Provide Valid Inputs!";
   });  
  }

  downloadPMS(){
    this.setupService.getPMSLink().subscribe((res) => {
        var winP = window.open(this.apiUrl+res.body.data+this.clinic_id, "_blank");    
        this.stepVal = 2;
        this.updateStepperStatus();
      }, error => {
          this.toastr.error('Some Error Occur. Please try later.');
          this._cookieService.put("username",'');
          this._cookieService.put("email", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
      }    
    ); 
  }
  downloadPMSAgain(){
     this.stepVal = 1;
     var stepper1 = parseInt(this.stepVal);
    this._cookieService.put("stepper", stepper1.toString());
     this.updateStepperStatus(); 
     setTimeout(function(){
        $('mat-vertical-stepper').find('div.mat-step:eq(3)').find('mat-step-header').addClass('honey').click();
     },1000);
  }
  finish(){
     this.stepVal = 4;
     this.updateStepperStatus(); 
  }

  checkRepotrs(){   
     var selfO = this;
     selfO.setupService.checkReportsStatus(selfO.clinic_id).subscribe((res) => {

          let urlActive = this._location.path();
          this.reportsStatusInfo = true;
          if(res.body.message == 'noStart')
          {           
            selfO.reportsStatus = [];
            if(urlActive == '/setup'){
              setTimeout(function(){
                selfO.checkRepotrs();
              }, 10000);
            }
            
          } else if(res.body.message == 'Pending') {
            selfO.reportsStatus = res.body.data;
            if(urlActive == '/setup'){
              setTimeout(function(){
                selfO.checkRepotrs();
              }, 10000);
            }
          } else if(res.body.message == 'Completed') {            
            selfO.stepVal = 3;
            selfO.updateStepperStatus(); 
          }
      }, error => {
          this.toastr.error('Some Error Occur. Please try later.');
          selfO._cookieService.put("username",'');
          selfO._cookieService.put("email", '');
          selfO._cookieService.put("userid", '');
          selfO.router.navigateByUrl('/login');
      }    
    ); 

  }

  checkExactRepotrs(){   
    var selfO = this;
    selfO.setupService.checkExactRepotrStatus(selfO.clinic_id).subscribe((res) => {
        let urlActive = this._location.path();
        this.reportsStatusInfo = true;
        selfO.reportsStatus = [];
        if(res.status == 200){    
          if(res.body.data.length > 0){
            selfO.reportsStatus = res.body.data;
            selfO.stepVal = 3;
            selfO.updateStepperStatus(); 
          }else{
            if(urlActive == '/setup'){
              setTimeout(function(){
                selfO.checkExactRepotrs();
              }, 10000);
            }
          }
        }
    },(error) => {
         this.toastr.error('Some Error Occur. Please try later.');
         selfO._cookieService.put("username",'');
         selfO._cookieService.put("email", '');
         selfO._cookieService.put("userid", '');
         selfO.router.navigateByUrl('/login');
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

openLocationDialog(): void {
  const dialogRef = this.dialog.open(DialogLocationDialogComponent, {
    width: '600px',
    data: { location: this.LocationData, display_name : this.name}
  });
  dialogRef.afterClosed().subscribe(result => {

    if(result != undefined){
      let location_id = result;
      this.setupService.saveClinicLocation(this.clinic_id,location_id).subscribe(res=>{
        if(res.status == 200){
          this.stepVal = 2;
          this.updateStepperStatus();
        }
      })
    }
  });
}

getClinicLocation(){
  this.setupService.getClinicLocation(this.clinic_id).subscribe(res=>{
    if(res.status == 200){
      this.LocationData = [...res.body.data];
      this.openLocationDialog();
    }
  })
}

  skipPMSDownload(){
    this.stepVal = 3;
     this.updateStepperStatus(); 
  }

}

@Component({
  selector: 'dialog-location',
  templateUrl: './dialog-location.html'
})

export class DialogLocationDialogComponent{
  public selectedLocation : any = null;
  constructor(public dialogRef: MatDialogRef<DialogLocationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, setupService : SetupService) 
  {
    dialogRef.disableClose = true;
  }
  public selectLocation=new FormControl();

  onNoClick(){
    this.dialogRef.close();
  }
  save(data) {
    this.dialogRef.close(data);
  }

  selectLocationChange(e){
    this.selectedLocation = e;
  }

}
