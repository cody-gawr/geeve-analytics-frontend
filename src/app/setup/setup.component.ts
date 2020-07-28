import { Component, Inject ,EventEmitter,Output, ViewChild, AfterViewInit } from '@angular/core';
import { SetupService } from './setup.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from 'angular-notifier';
import { empty } from 'rxjs';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import {MatChipsModule} from '@angular/material/chips';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { ClinicService } from '../clinic/clinic.service';
import { PlansService } from '../plans/plans.service';
import { RolesUsersService } from '../roles-users/roles-users.service';
import { StepperHeaderService } from '../layouts/stepper/header/header.service';
import { ToastrService } from 'ngx-toastr';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { ClinicSettingsService } from '../clinic-settings/clinic-settings.service';
const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

declare var require: any;
const data: any = [];
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
     dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-update-plan-dialog',
  templateUrl: './update-plan.html',
})
export class UpdatePlanDialogComponent {
  public clinic_id:any ={};
  private warningMessage: string;
  public valplans;
  public memberid;
  public isFeatured :any;
   public form: FormGroup;
  constructor( private fb: FormBuilder,private plansService: PlansService,
    public dialogUpdateRef: MatDialogRef<UpdatePlanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
    this.form = this.fb.group({
      planName: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      totalAmount: [null, Validators.compose([Validators.required])],
      preventative_discount: [null, Validators.compose([Validators.required])],
      preventative_frequency: [null, Validators.compose([Validators.required])],
      discount: [null, Validators.compose([Validators.required])]     
    }); }
   onItemSelect(item:any,type,data){
      if(type=='inclusions'){  
        var index;
        data.treatment_exclusions_selected.some(function (elem, i) {
            return elem.id === item.id ? (index = i, true) : false;
        });
        data.treatment_exclusions_selected.splice(index, 1);
      }
      else {
      var index;
        data.treatment_inclusions_selected.some(function (elem, i) {
            return elem.id === item.id ? (index = i, true) : false;
        });
        data.treatment_inclusions_selected.splice(index, 1);
      }
    }

     omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  //
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
     numberOnly(event): boolean {
   const charCode = (event.which) ? event.which : event.keyCode;
   if (charCode > 32 && (charCode < 48 || charCode > 57)) {
     return false;
   }
   return true;
  }
      numberOnlyNum(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)  && charCode != 46) {
      return false;
    }
    return true;
  }
  
  OnItemDeSelect(item:any,type,data){
       if(type=='inclusions'){  
        var index;
        data.treatment_exclusions_selected.push(item);
      }
      else {
      var index;
        data.treatment_inclusions_selected.push(item);
      }
    }
    update(data) {
        
      this.clinic_id = data.clinic_id;

      this.plansService.getUpdateplanvalidation(data.planName,this.clinic_id,data.memberplan_id,data.planOrder).subscribe((res) => {
            if(res.message == 'error'){
                   this.valplans=res.data['message'];
                  }
                  else{
              if(data.planName != undefined && this.valplans != '' && data.planLength != undefined && data.totalAmount != undefined && data.discount != undefined && data.description != undefined && data.planOrder !=undefined){
                      this.dialogUpdateRef.close(data);                    
                    }
                  }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
          return false;
        }    
        ); 
      
    $('.form-control-dialog').each(function(){
      $(this).click();
    });
     }

   
    onNoClick(): void {
    this.dialogUpdateRef.close();
  }
}

@Component({
  selector: 'app-table-filter',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements AfterViewInit {
  @ViewChild('stepper') stepper;
  private readonly notifier: NotifierService;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  inviteFormGroup: FormGroup;
  private warningMessage: string;
  public disabled = false;
  public imageURL:any;  
name:any;
phone_no:any;
planName:any;
totalAmount:any;
planLength:any;
preventative_frequency:any;
preventative_discount:any;
discount:any;

  public selectedIndex:any;
  facebook ='http://facebook.com/';
  twitter ='http://twitter.com/';
  linkedin='http://linkedin.com/';
  instagram='http://instagram.com/';
  loadingIndicator = true;

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
      numberOnlyNum(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)  && charCode != 46) {
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
                                if(!this._cookieService.get("stepper"))
          this.router.navigate(['/dashboards']);

  }
   minDate = new Date('1990-01-01');
   maxDate = new Date();
  constructor(private _formBuilder: FormBuilder, private clinicService: ClinicService,notifierService: NotifierService,private setupService: SetupService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router,private datePipe: DatePipe, private clinicSettingsService: ClinicSettingsService,private plansService: PlansService,private rolesUsersService: RolesUsersService, private headerService: StepperHeaderService,
    private toastr: ToastrService) {
    this.notifier = notifierService;
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
    this.getClinics();
  }

  public isCompleted = true;
  public clinicscount=0;
  public createdClinicsCount=0;

  public step1Completed= true;
  public step2Completed= true;
  public step3Completed= true;
  public step4Completed= true;
  public step5Completed= true;
  
  public step1editable= false;
  public step2editable= false;
  public step3editable= false;
  public step4editable= false;
  public step5editable= false;
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

 if(selectedIndex >= 5) {
    this.step5Completed=true;
    this.step5editable=false;
  }
  this.selectedIndex= selectedIndex;


  }
        logout() {
      this.headerService.logout(this._cookieService.get("userid")).subscribe((res) => {
       if(res.message == 'success'){
        this._cookieService.put("username",'');
        this._cookieService.put("email", '');
        this._cookieService.put("token", '');
        this._cookieService.put("userid", '');
        this._cookieService.put("childid", '');
        this.router.navigate(['/login']);
       }
    }, error => {
    }    
    );
  }
  private getClinics() {
    this.rows=[];
    this.clinicService.getClinics().subscribe((res) => {
       if(res.message == 'success'){
          this.rows = res.data;
        /*  if(res.data.length >1 || parseInt(this._cookieService.get("stepper"))>=5 ||parseInt(this._cookieService.get("stepper"))<=0) {
              this.router.navigateByUrl('/dashboards');            
          }
          else */
          if(res.data.length >0) {
          this.clinic_id= res.data[0]['id'];
           if(this.clinic_id)
            this.getClinicSettings();
        }
        if(this._cookieService.get("stepper"))
        { 
          this.refreshTabs();

     //   if(this.selectedIndex==2)
          this.getPlans();
     //   this.tabActive+this.selectedIndex = true;
        }
       }
        else if(res.status ==- '401'){
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
  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      phone_no: [null, Validators.compose([Validators.required])],
      clinicEmail: [null, Validators.compose([Validators.required, CustomValidators.email])],
      address: [null, Validators.compose([Validators.required])],  
      facebook: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      twitter: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      linkedin: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      instagram: [null, Validators.compose([Validators.pattern(this.urlPattern)])]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.inviteFormGroup = this._formBuilder.group({
       itemRows: this._formBuilder.array([this.initItemRows()])
    });

    if(this.clinic_id)
      this.getClinicSettings();
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

public memberplan_id;
    openUpdateDialog(id): void {
    this.memberplan_id =id;
    const dialogUpdateRef = this.dialog.open(UpdatePlanDialogComponent, {
     width: '250px',
     data: {planName: this.rows['planName'],planOrder: this.rows['planOrder'], planLength: this.rows['planLength'], totalAmount: this.rows['totalAmount'] ,discount: this.rows['discount'] , description: this.rows['description'],isFeatured:(this.rows['isFeatured']=='true') ? true :false ,treatmentdata:this.treatmentdata,treat:this.treat,memberplan_id:this.memberplan_id,preventative_plan_selected:JSON.parse(this.rows['preventative_plan']),preventative_frequency:this.rows['preventative_frequency'] , treatment_inclusions_selected:JSON.parse(this.rows['treatment_inclusions']),treatment_exclusions_selected:JSON.parse(this.rows['treatment_exclusions']),preventative_discount:this.rows['preventative_discount'], treatment_inclusions:this.treatment_inclusions,treatment_exclusions:this.treatment_exclusions,dropdownSettings:this.dropdownSettings,preventative_plan:this.preventative_plan,clinic_id:this.clinic_id}
    });  

  dialogUpdateRef.afterClosed().subscribe(result => {
   if(result) {
    this.plansService.updateUser(this.memberplan_id ,this.clinic_id,result.planName,result.planOrder,result.planLength, result.totalAmount,result.discount,result.description,result.isFeatured,'',JSON.stringify(result.preventative_plan_selected),result.preventative_frequency,JSON.stringify(result.treatment_inclusions_selected),JSON.stringify(result.treatment_exclusions_selected),result.preventative_discount,true,true,'').subscribe((res) => {
         if(res.message == 'success'){
            this.getPlans()
              //    this.toastr.success('Plan Updated.');

            //this.notifier.notify( 'success', 'Plan Updated' ,'vertical');
             }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }); 
        }         
        });
  }
  public treatmentdata;
  treat = new FormControl();
  public fileToUpload;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  uploadImage(files: FileList) {  
    this.fileToUpload = files.item(0);
      /* First check for file type then check for size .*/
   if(this.fileToUpload.type=='image/png' || this.fileToUpload.type=='image/jpg' || this.fileToUpload.type=='image/jpeg')
    {
     $('.ajax-loader').show();
      let formData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
      this.clinicService.logoUpload(formData).subscribe((res) => {
      $('.ajax-loader').hide();
        if(res.message == 'success'){
          this.imageURL= res.data;
                //  this.toastr.success('Logo Uploaded.');

         // this.notifier.notify( 'success', 'Logo Uploaded' ,'vertical');
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


   connectStripe() {
      var win = window.open(this.linkStripe, "MsgWindow", "width=600,height=600");
      var self = this;
      var timer = setInterval(function() { 
        if(win.closed) {
            self.getClinicSettings();
            clearTimeout(timer);            
        }
      }, 1000);
  }
  public errortext;
  rows:any;

  temp = [...data];
  table;
disconnectStripe() {
    this.clinicSettingsService.disconnectStripe(this.clinic_id).subscribe((res) => {
       if(res.message == 'success'){
       this.connectedStripe=false;
       } 
       else
        this.connectedStripe =true;
    }, error => {
      this.errortext = "Please Provide Valid Inputs!";
    }); 
}

private getPlans() {
    this.rows=[];
    this.plansService.getPlans(this.clinic_id).subscribe((res) => {
        if(res.message == 'success'){
          if(res.data.length <=0) {
              this.plansService.addPlans('Sample Plan',1,'MONTHLY', 100,10,'Sample Plan',this.clinic_id,'true',JSON.stringify(this.preventative_plan_selected),2,JSON.stringify(this.treatment_inclusions_selected),JSON.stringify(this.treatment_exclusions_selected),10).subscribe((res) => {
            $('.ajax-loader').hide();  
            if(res.message == 'success'){           
                 this.getPlans();
               }
            }, error => {
              this.warningMessage = "Please Provide Valid Inputs!";
            });  
          }
          else {
        this.rows = res.data[0];
            
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
    });
  }


public clinic_id;
public stripe_account_id;
public user_id;
public clinicEmail;
public Contract;
public token_id;
public clinicName;
public address;
public phoneNo;
public clinicContract;
public DefaultLogo;
public apiUrl;
public tabActive1= true;
public tabActive2= true;
public tabActive3= true;
public tabActive4= true;
public tabActive5= true;
public clinic_id_encoded;
public user_id_encoded;
  getClinicSettings() {  
    $('.ajax-loader').show(); 
  this.clinicSettingsService.getClinicSettings(this.clinic_id).subscribe((res) => {
    $('.ajax-loader').hide(); 
       if(res.message == 'success'){
        this.clinic_id = res.data[0].id;
        this.clinic_id_encoded = btoa(res.data[0].id);
        this.user_id = res.data[0].user_id;
        this.user_id_encoded = btoa(res.data[0].user_id);
        this.clinicName = res.data[0].clinicName;
        this.clinicEmail = res.data[0].clinicEmail;
        this.address = res.data[0].address;
        this.phoneNo = res.data[0].phoneNo;
        this.stripe_account_id = res.data[0].stripe_account_id;
        this.clinicContract = res.data[0].contract;
      
        this.Contract = this.apiUrl +"/Clinics/getUploadedSignedContract?user_id="+this._cookieService.get("userid")+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id+"&code="+encodeURIComponent(window.btoa(this.clinicContract));
        if(this.stripe_account_id)
          this.connectedStripe = true;
        else
          this.connectedStripe = false;

        if(res.data[0].logo!=""){
          this.imageURL = res.data[0].logo;  
        }else{
           this.imageURL = this.DefaultLogo ; //Default Logo
        }
        this.getStripeAuthorization();
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
   saveclinic(stepper) {
    let name     =this.firstFormGroup.controls.name.value;
    let phone_no =this.firstFormGroup.controls.phone_no.value;
    let clinicEmail =this.firstFormGroup.controls.clinicEmail.value;
    let address  =this.firstFormGroup.controls.address.value;
    let facebook =this.firstFormGroup.controls.facebook.value;
    let twitter  =this.firstFormGroup.controls.twitter.value;
    let linkedin =this.firstFormGroup.controls.linkedin.value;
    let instagram =this.firstFormGroup.controls.instagram.value;

      $('.ajax-loader').show();
       this.clinicService.addClinic(name,address,phone_no,facebook, twitter, linkedin,instagram,clinicEmail, this.imageURL).subscribe((res) => {
       $('.ajax-loader').hide();
        if(res.message == 'success'){
          this.clinic_id = res.data.id;
          this.getClinicSettings();
          this.stepVal = 1;
        this.updateStepperStatus();   
       //this.getClinic(); 
               //   this.toastr.success('Clinic Added.');

        // this.notifier.notify( 'success', 'Clinic Added' ,'vertical');
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
    public stepVal;
    saveStripe() {
          this.stepVal = "2";

        this.updateStepperStatus(); 
    }

    saveMemberPlan(){
          this.stepVal = 3;

      this.updateStepperStatus(); 
    }
      saveInvites(){
          this.stepVal = 4;
          var i=0;
          this.inviteFormGroup.value.itemRows.forEach(res => {
            this.checkUserEmail(res.display_name, res.email, res.user_type)
            i++;
          });
          if(i == this.inviteFormGroup.value.itemRows.length)
           this.updateStepperStatus(); 

    }
      finish(){
          this.stepVal = 5;

      this.updateStepperStatus(); 
    }

    updateStepperStatus() {
      this.clinicService.updateStepperStatus().subscribe((res) => {
       $('.ajax-loader').hide();
        if(res.message == 'success'){
          if(this.stepVal != 5 && this.stepVal != 0) {
          var stepper1 = parseInt(this.stepVal)+1;
           this._cookieService.put("stepper", stepper1.toString());
         //   this.selectedIndex = parseInt(this._cookieService.get("stepper"))-1;
            this.refreshTabs();
            if(this.selectedIndex==2)
              this.getPlans();
          }
          else
          {
             this._cookieService.put("stepper", "0");
              this.router.navigateByUrl('/dashboards');
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
    changetab() {
      this.tabActive1= false;
      this.tabActive2= false;
      this.tabActive3= false;
      this.tabActive4= false;
      this.tabActive5= false;
     // this.tabActive+this.selectedIndex = true;
    }
abc(data) {
  console.log(data);
}
  ClickNext(currentstep,stepper){
     var currentStepperDiv = "cdk-step-content-0-0";
     var nextStepperDiv = "cdk-step-content-0-1";
     if(currentstep=="step1"){
       currentStepperDiv = 'cdk-step-content-0-0';
       nextStepperDiv = "cdk-step-content-0-1";
     }else if(currentstep=="step2"){
        currentStepperDiv = "cdk-step-content-0-1";
        nextStepperDiv = "cdk-step-content-0-2";
     }else if(currentstep=="step3"){
         currentStepperDiv = "cdk-step-content-0-2";
         nextStepperDiv = "cdk-step-content-0-3";
     }else if(currentstep=="step4"){
         currentStepperDiv = "cdk-step-content-0-3";
         nextStepperDiv = "cdk-step-content-0-4";
     }else if(currentstep=="step5"){
         currentStepperDiv = "cdk-step-content-0-4";
         nextStepperDiv = "cdk-step-content-0-5";
     }

    if(nextStepperDiv != "cdk-step-content-0-4"){
          $("#"+currentStepperDiv).css('visibility','visible');

   /* $("#"+currentStepperDiv).animate({
      borderSpacing: -180
    }, {
      step: function(now, fx) {
        $(this).css('-webkit-transform', 'rotateY(' + now + 'deg)');
        $(this).css('-moz-transform', 'rotateY(' + now + 'deg)');
        $(this).css('transform', 'rotateY(' + now + 'deg)');
      },
      complete: function() {
        console.log("heree");
        $(this).hide();

        stepper.next(function(){
             $("#"+nextStepperDiv).removeAttr('style');
             $("#"+currentStepperDiv).css('visibility','visible');
             $("#"+nextStepperDiv).hide();
             setTimeout(this.slideDown(nextStepperDiv),1000);      
        });


      },
      duration: 'slow'
    }, 'swing'); */
                /*$next.animate({
    borderSpacing: -360
  }, {
    step: function(now, fx) {
      $(this).css('-webkit-transform', 'rotateY(' + now + 'deg)');
      $(this).css('-moz-transform', 'rotateY(' + now + 'deg)');
      $(this).css('transform', 'rotateY(' + now + 'deg)');
    },
    duration: 'slow'
  }, 'swing').show();*/

          $("#"+currentStepperDiv).slideUp(700,function(){
          
        
    }); 

    }
    
  }
  slideDown(nextStepperDiv){
     $("#"+nextStepperDiv).hide().slideDown(1000);
  }
public linkStripe;
getStripeAuthorization(){ 
 this.clinicSettingsService.getStripeAuthorization(this.clinic_id).subscribe((res) => {
       if(res.message == 'success'){
        this.linkStripe = res.data;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    ); 

 }
 checkUserEmail(display_name, email, user_type) {
 this.rolesUsersService.checkUserEmail(email).subscribe((res) => {
           if(res.message == 'success'){
           if(res.data <=0)
           this.add_user(display_name, email, user_type, 'jeeveanalytics',this.clinic_id,this.inviteFormGroup.value.dentist_id);
            else
             this.toastr.success('Email Already Exists!');

            //this.notifier.notify( 'success', 'Email Already Exists!' ,'vertical');
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
         //    this.toastr.success('User Added');

       //if(res.message == 'success'){
      //  this.notifier.notify( 'success', 'User Added' ,'vertical');
   //     this.getUsers();
     //  }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }
}
