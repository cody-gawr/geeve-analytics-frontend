import { Component, Inject ,EventEmitter,Output, ViewChild, AfterViewInit } from '@angular/core';
import { SetupService } from './setup.service';
import { CookieService } from "ngx-cookie";
import { ActivatedRoute, Router } from "@angular/router";
import { ClinicService } from '../clinic/clinic.service';
import { RolesUsersService } from '../roles-users/roles-users.service';
import { PlansService } from '../plans/plans.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from "@angular/common";
import { environment } from "../../environments/environment";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


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
  public phone_no;
  public clinicEmail;
  public address;

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
  constructor(private _formBuilder: FormBuilder,private clinicService: ClinicService, private setupService: SetupService, private _cookieService: CookieService, private router: Router, private route: ActivatedRoute,private rolesUsersService: RolesUsersService,private toastr: ToastrService,private plansService: PlansService, private _location: Location){
    
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



  ngOnInit() {
    let currentStep = parseInt(this._cookieService.get("stepper"))
    if(currentStep > 6){
      this.router.navigateByUrl('/login');
    }

    this.firstFormGroup = this._formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      phone_no: [null, Validators.compose([Validators.required])],
      clinicEmail: [null, Validators.compose([Validators.required, CustomValidators.email])],
      address: [null, Validators.compose([Validators.required])],  
      displayName: [null, Validators.compose([Validators.required])],  

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



 private getClinics() {
    this.rows=[];
    this.clinicService.getClinics().subscribe((res) => {
       if(res.message == "success"){
          this.rows = res.data;
          if(res.data.length > 0) {
            this.clinic_id = res.data[0]['id'];
            if(this.clinic_id){
              //this.getClinicSettings();
              this.checkXeroStatus(false);
            }            
          }          
          if(this._cookieService.get("stepper"))
          { 
              this.refreshTabs();
              //this.getPlans();
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
  this.step5Completed=false;
  this.step5editable=true;
  this.step6Completed=false;
  this.step6editable=true;

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
  if(selectedIndex == 4) {
    this.checkRepotrs();
  }

 if(selectedIndex >= 5) {
    this.step5Completed=true;
    this.step5editable=false;

  }
  if(selectedIndex >= 6) {
    this.step6Completed=true;
    this.step6editable=false;

  }
  this.selectedIndex = selectedIndex;

}
   getXeroLink(){
    this.setupService.getXeroLink(this.clinic_id).subscribe((res) => {
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
      var win = window.open(this.xero_link, "MsgWindow", "width=1000,height=800");
      var self = this;
     var timer = setInterval(function() { 
        if(win.closed) {
          self.checkXeroStatus(true);
          clearTimeout(timer);
        }
      }, 1000);
  }
  public checkXeroStatus(close){
    this.setupService.checkXeroStatus(this.clinic_id).subscribe((res) => {
       if(res.message == 'success'){

        if(res.data.xero_connect == 1) {
          this.xeroConnect = true;
          this.xeroOrganization = res.data.Name;
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
 public disconnectXero() {
  
    this.setupService.clearSession(this.clinic_id).subscribe((res) => {
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



  saveclinic(stepper) {
    let name     =this.firstFormGroup.controls.name.value;
    let phone_no =this.firstFormGroup.controls.phone_no.value;
    let clinicEmail =this.firstFormGroup.controls.clinicEmail.value;
    let address  =this.firstFormGroup.controls.address.value;
    let displayName  =this.firstFormGroup.controls.displayName.value;
    let days = JSON.stringify(this.workingDays);
    console.log(this.workingDays);
  /*  let facebook =this.firstFormGroup.controls.facebook.value;
    let twitter  =this.firstFormGroup.controls.twitter.value;
    let linkedin =this.firstFormGroup.controls.linkedin.value;
    let instagram =this.firstFormGroup.controls.instagram.value;
*/
      $('.ajax-loader').show();
       this.setupService.addClinic(name,address,phone_no,clinicEmail,displayName,days ).subscribe((res) => {
       $('.ajax-loader').hide();
        if(res.message == 'success'){
          this.clinic_id = res.data.id;
          this.getXeroLink();  

          //this.getClinicSettings();
          this.stepVal = 1;
       this.updateStepperStatus(); 
       //this.getClinic(); 
       //this.toastr.success('Clinic Added.');
       }else if(res.status == '401'){
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

abc(data) {
  console.log(data);
}
checkUserEmail(display_name, email, user_type) { 
 this.rolesUsersService.checkUserEmail(email).subscribe((res) => {
           if(res.message == 'success'){
            let length = 10;
            var randomPassword  = '';
            var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              randomPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
           if(res.data <=0)
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

  this.rolesUsersService.addRoleUser(display_name, email, user_type, password,clinic_id,dentist_id).subscribe((res) => {
      $('.ajax-loader').hide();      
             //this.toastr.success('User Added');


    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }
  updateStepperStatus() {
      this.setupService.updateStepperStatus().subscribe((res) => {
       $('.ajax-loader').hide();
        if(res.message == 'success'){
          if(this.stepVal < 6 ) {
          var stepper1 = parseInt(this.stepVal) + 1;
           this._cookieService.put("stepper", stepper1.toString());
            this.refreshTabs();

            
          } else {
             this._cookieService.put("stepper", "7");
             this.router.navigateByUrl('/dashboards/cliniciananalysis');
          }
           // console.log(this._cookieService.get("stepper"));
           // this.ClickNext('step'+this._cookieService.get("stepper"),stepper);
       }else if(res.status == '401'){
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






  uploadImage(files: FileList) {  
    this.fileToUpload = files.item(0);
      /* First check for file type then check for size .*/
   if(this.fileToUpload.type=='image/png' || this.fileToUpload.type=='image/jpg' || this.fileToUpload.type=='image/jpeg')
    {
     $('.ajax-loader').show();
      let formData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
      this.setupService.logoUpload(formData).subscribe((res) => {
      $('.ajax-loader').hide();
        if(res.message == 'success'){
          this.imageURL= res.data;
         // this.toastr.success('Logo Uploaded.');

        }
        else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
              this.router.navigateByUrl('/login');
           }
      });
    }else{
        alert("Invalid image. Allowed file types are jpg, jpeg and png only .");
        return false;
    }
    if(this.fileToUpload.size/1024/1024 > 2) //10000 bytes means 10 kb
    {
         alert("Header image should not be greater than 4 MB .");
         return false;
    }

   // this.onAdd.emit(this.fileToUpload);
  }
  saveStripe() {
    this.stepVal = 2;
    this.updateStepperStatus(); 
  }
  saveInvites() {
    this.stepVal = 3;
    var i=0;
    this.inviteFormGroup.value.itemRows.forEach(res => {
       this.checkUserEmail(res.display_name, res.email, res.user_type)
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
    this.stepVal = 4;
    this.updateStepperStatus(); 
  }

  downloadPMS(){
    var winP = window.open(this.apiUrl+'/users/userGetPMS?token='+this._cookieService.get("token")+'&token_id='+ this._cookieService.get("userid")+'&clinic_id='+this.clinic_id, "_blank");      
    this.stepVal = 4;
    this.updateStepperStatus(); 
  }
  downloadPMSAgain(){
     this.stepVal = 3;
     var stepper1 = parseInt(this.stepVal);
    this._cookieService.put("stepper", stepper1.toString());
     this.updateStepperStatus(); 
     setTimeout(function(){
        $('mat-vertical-stepper').find('div.mat-step:eq(3)').find('mat-step-header').addClass('honey').click();
     },1000);
  }
  finish(){
     this.stepVal = 6;
     this.updateStepperStatus(); 
  }

  checkRepotrs(){   
     var selfO = this;
     selfO.setupService.checkReportsStatus(selfO.clinic_id).subscribe((res) => {
          let urlActive = this._location.path();
          this.reportsStatusInfo = true;
          if(res.message == 'noStart')
          {           
            selfO.reportsStatus = [];
            if(urlActive == '/setup'){
              setTimeout(function(){
                selfO.checkRepotrs();
              }, 10000);
            }
            
          } else if(res.message == 'Pending') {
            selfO.reportsStatus = res.data;
            if(urlActive == '/setup'){
              setTimeout(function(){
                selfO.checkRepotrs();
              }, 10000);
            }
          } else if(res.message == 'Completed') {            
            selfO.stepVal = 5;
            selfO.updateStepperStatus(); 
          }
      }, error => {
          this.toastr.error('Some Error Occur. Please try later.');
          selfO._cookieService.put("username",'');
          selfO._cookieService.put("email", '');
          selfO._cookieService.put("token", '');
          selfO._cookieService.put("userid", '');
          selfO.router.navigateByUrl('/login');
      }    
    ); 

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
