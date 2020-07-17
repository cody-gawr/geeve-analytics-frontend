import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { PlansService } from './plans.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroupDirective,  NgForm,  Validators,FormBuilder, FormGroup} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { empty } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { first, take } from 'rxjs/operators';
import { CustomValidators } from 'ng2-validation';
import { HeaderService } from '../layouts/full/header/header.service';
declare var require: any;
const data: any = [];
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})

export class DialogOverviewExampleDialogComponent {
  public clinic_id:any ={};
  private warningMessage: string;
  public valplans;
  public planOrder;
  public form: FormGroup;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private plansService: PlansService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
     this.form = this.fb.group({
      planName: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      totalAmount: [null, Validators.compose([Validators.required])],
      preventative_discount: [null, Validators.compose([Validators.required])],
      preventative_frequency: [null, Validators.compose([Validators.required])],
      discount: [null, Validators.compose([Validators.required])]     
    });


      data.preventative_plan_selected =[
          {"id":1,"itemName":"Exam"},
          {"id":2,"itemName":"Fluoride"},
          {"id":3,"itemName":"Clean"}
        ];
        data.treatment_inclusions_selected=[
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
        data.treatment_exclusions_selected=[
             {"id":19,"itemName":"Any Treatment referred to a Specialist"},
            {"id":20,"itemName":"Any Treatment performed under General Anaesthetic"},
            {"id":21,"itemName":"Any Treatment performed under IV Sedation"}
        ];



  }
 omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  //
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
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
  save(data) {
    console.log(data);
      this.clinic_id = $('#currentClinicid').attr('cid');  
      this.plansService.getPlannamevalidation(data.planName,this.clinic_id).subscribe((res) => {
            if(res.message == 'error'){
                   this.valplans=res.data['message'];
                   $('#email').focus();
                   return false;
                  }
                  else{
              if(data.planName != undefined && this.valplans != ''  && data.planLength != undefined && data.totalAmount != undefined && data.discount != undefined && data.description != undefined){
                      this.dialogRef.close(data);
                    }
                  }
        }, error => {
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
          return false;
        }    
        ); 
      
    $('.form-control-dialog').each(function(){
      $(this).click();
    });

   } 

  onNoClick(): void {
    this.dialogRef.close();
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
}


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
  constructor( private fb: FormBuilder,private plansService: PlansService,private toastr: ToastrService,
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
        
      this.clinic_id = $('#currentClinicid').attr('cid');

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
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements AfterViewInit {
  private readonly notifier: NotifierService;
  name: string;
  address: string;
  contact_name: string;
  fileInput: any ;
  clinic_id: any;
  public selectedtreat;
  dropdownList = [];
    dropdownSettings = {};
  treat = new FormControl();
  public preventative_plan_selected;
        public treatment_inclusions_selected;
        public treatment_exclusions_selected;
        public preventative_plan:any;
        public treatment_inclusions;
        public treatment_exclusions;
        public settings;

  private checkPermission(role) { 
  this.headerService.checkPermission(role).subscribe((res) => {
       if(res.message == 'success'){
       }
        else if(res.status == '401'){
               localStorage.setItem('prpermissionmessage','Sorry! You are not authorized to access this section . Please contact clinic owner .') ;
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
   this.checkPermission('settings');

  //  this.initiate_clinic();
   // this.getTreatments();
        $('#title').html('Membership Plans');
        
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
                                  selectAllText:'',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: true,
                                  classes:"myclass custom-class"
                                }; 
  }

  editing = {};
  rows = [];
 
  temp = [...data];
  table;
  loadingIndicator = true;
  reorderable = true;

  public planName;
  public planLength ="MONTHLY";
  public totalAmount;
  public description;
  public discount=10;
  public treatmentdata;
  public memberplan_id;
  public planOrder;
  public isFeatured;
  public preventative_frequency=2;
  public preventative_discount=10;

  columns = [{ prop: 'id' }, { name: 'planName' }, { name: 'planLength' }, { name: 'totalAmount' }, { name: 'discount' }, { name: 'description' } ];

  constructor(private toastr: ToastrService,notifierService: NotifierService,private plansService: PlansService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router,private headerService: HeaderService) {
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
    if(this.clinic_id!= "undefined") {
      this.getPlans();
      $('.header_filters').removeClass('hide_header');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
    }
    else{
        $('.header_filters').addClass('hide_header');
        $('.external_clinic').hide();
     }
    }
    goBack() {
      window.history.back();
    }

  isDecimal(value) {
    if(typeof value != 'undefined')
    {
      if(String(value).includes("."))
      return true;
    }
  }
public addPlanCount =0;
  private getPlans() {
if(this.clinic_id != undefined) {
    
    this.rows=[];
    this.plansService.getPlans(this.clinic_id).subscribe((res) => {
        if(res.message == 'success'){
   
        this.rows = res.data;
        this.temp = [...res.data];        
        this.table = data;
        
          if(this.rows.length <=0 && this.addPlanCount==0) {
           this.addPlanCount = this.addPlanCount + 1;
           this.plansService.addPlans('Sample Plan',1,'MONTHLY', 100,10,'',this.clinic_id,'true',JSON.stringify(this.preventative_plan_selected),2,JSON.stringify(this.treatment_inclusions_selected),JSON.stringify(this.treatment_exclusions_selected),10).pipe(take(1)).subscribe((res) => {
            $('.ajax-loader').hide();  
            if(res.message == 'success'){           
              // this.notifier.notify( 'success', 'New Plan Added' ,'vertical');
                //this.toastr.success('New Plan Added .');
                this.getPlans();
               }
            }, error => {
                 $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
            });  
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
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    });
  }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { planName: this.planName, planLength: this.planLength, totalAmount: this.totalAmount ,discount: this.discount , description: this.description,treatmentdata:this.treatmentdata,treat:this.treat,planOrder:this.planOrder,preventative_plan:this.preventative_plan,preventative_frequency:this.preventative_frequency , treatment_inclusions:this.treatment_inclusions,treatment_exclusions:this.treatment_exclusions,preventative_discount:this.preventative_discount,dropdownSettings:this.dropdownSettings,preventative_plan_selected:this.preventative_plan_selected,treatment_inclusions_selected:this.treatment_inclusions_selected, treatment_exclusions_selected:this.treatment_exclusions_selected }    
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      $('.ajax-loader').show();    
      this.plansService.addPlans(result.planName,result.planOrder,result.planLength, result.totalAmount,result.discount,result.description,this.clinic_id,result.isFeatured,JSON.stringify(result.preventative_plan_selected),result.preventative_frequency,JSON.stringify(result.treatment_inclusions_selected),JSON.stringify(result.treatment_exclusions_selected),result.preventative_discount).subscribe((res) => {
      $('.ajax-loader').hide();  
      if(res.message == 'success'){           
           this.toastr.success('New Plan Added .');
           this.getPlans();
         }
      }, error => {
           $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
      });  
      }
      });
  }
  public sendMail;
  public updatePlan
public changeType;
  openUpdateDialog(rowIndex): void {
    
    this.memberplan_id =this.rows[rowIndex]['id'];

    const dialogUpdateRef = this.dialog.open(UpdatePlanDialogComponent, {
     width: '250px',
     data: {planName: this.rows[rowIndex]['planName'],planOrder: this.rows[rowIndex]['planOrder'], planLength: this.rows[rowIndex]['planLength'], totalAmount: this.rows[rowIndex]['totalAmount'] ,discount: this.rows[rowIndex]['discount'] , description: this.rows[rowIndex]['description'],isFeatured:(this.rows[rowIndex]['isFeatured']=='true') ? true :false,hidden:(this.rows[rowIndex]['hidden']=='true') ? true :false ,treatmentdata:this.treatmentdata,treat:this.treat,memberplan_id:this.memberplan_id,preventative_plan_selected:JSON.parse(this.rows[rowIndex]['preventative_plan']),preventative_frequency:this.rows[rowIndex]['preventative_frequency'] , treatment_inclusions_selected:JSON.parse(this.rows[rowIndex]['treatment_inclusions']),treatment_exclusions_selected:JSON.parse(this.rows[rowIndex]['treatment_exclusions']),preventative_discount:this.rows[rowIndex]['preventative_discount'], treatment_inclusions:this.treatment_inclusions,treatment_exclusions:this.treatment_exclusions,dropdownSettings:this.dropdownSettings,preventative_plan:this.preventative_plan}
    });  

  dialogUpdateRef.afterClosed().subscribe(result => {
   if(result) {               

      this.sendMail = false;
      this.updatePlan= false;
      this.changeType ='';
      this.plansService.getPatientsonPlan(this.memberplan_id).subscribe((res) => {
         if(res.message == 'success'){
            if(res.data>0){
          if((this.rows[rowIndex]['treatment_inclusions'] != JSON.stringify(result.treatment_inclusions_selected))  || (this.rows[rowIndex]['treatment_exclusions'] != JSON.stringify(result.treatment_exclusions_selected)) || (this.rows[rowIndex]['preventative_discount'] != result.preventative_discount)){
                this.updatePlan= false;  
                 var self = this;          
               Swal.fire({
                  text: 'These Changes will be reflected on '+res.data+' patients who have subscribed to this plan.',
                  input: 'checkbox',
                  inputPlaceholder: 'Send Email Notification to Patients?',
                   showCloseButton: true,
                showCancelButton: true,
                }).then(function(data) {
                        if(data.value != undefined){
                        $('.ajax-loader').show(); 

                  if (data.value) {
                     self.sendMail = true;
                     self.changeType = 'details';
                  } else if (data.value === 0) {
                      self.sendMail = false;
                     self.changeType = '';
                  }  
                  self.updatePlanMain(result);      }           
                })              
          }
          else if((this.rows[rowIndex]['totalAmount'] != result.totalAmount ) || (this.rows[rowIndex]['discount'] != result.discount)){
              this.updatePlan= true;
          var self = this;          
               Swal.fire({
                  text: 'These Changes will update costs for '+res.data+' patients who have subscribed to this plan.',
                  input: 'checkbox',
                  inputPlaceholder: 'Send Email Notification to Patients?',
                   showCloseButton: true,
                showCancelButton: true,
                }).then(function(data) {
                     if(data.value != undefined){
                        $('.ajax-loader').show(); 
                  if (data.value) {
                     self.sendMail = true;
                     self.changeType = 'cost';                     
                  } else if (data.value === 0) {
                      self.sendMail = false;
                     self.changeType = '';
                  }  
               self.updatePlanMain(result);      
             }
                })
          }
          else {
          this.updatePlanMain(result);      
          }
        }
        else {
                $('.ajax-loader').show(); 
         this.updatePlanMain(result);      
       }
       }
        }, error => {
             $('.ajax-loader').hide(); 
            this.toastr.error('Some Error Occured, Please try Again.');
        }); 
        }         
    });
  }

  updatePlanMain(result) {
     this.plansService.updateUser(this.memberplan_id ,this.clinic_id,result.planName,result.planOrder,result.planLength, result.totalAmount,result.discount,result.description,result.isFeatured,result.hidden,JSON.stringify(result.preventative_plan_selected),result.preventative_frequency,JSON.stringify(result.treatment_inclusions_selected),JSON.stringify(result.treatment_exclusions_selected),result.preventative_discount,this.sendMail,this.updatePlan, this.changeType).subscribe((res) => {
                     if(res.message == 'success'){
                      $('.ajax-loader').hide(); 
                        this.getPlans()
                        this.toastr.success('Plan Updated.');
                      }
                    }, error => {
                         $('.ajax-loader').hide(); 
                    this.toastr.error('Some Error Occured, Please try Again.');
                    }); 
  }

  private getTreatments() {
    this.plansService.getTreatments().subscribe((res) => {
          if(res.message == 'success'){
           this.treatmentdata = res.data;
           this.treat;
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
        this.toastr.error('Some Error Occured, Please try Again.');
      }    
      );
    }

  public deletePlan(row) {
            Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Plan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value){
              if(this.rows[row]['id']) {
                this.plansService.deletePlan(this.rows[row]['id']).subscribe((res) => {
                 if(res.message == 'success'){
                             //this.notifier.notify( 'success', 'Plan Removed' ,'vertical');
                   this.toastr.success('Plan Removed .');
                   this.getPlans();
                 }
                 else if (res.message=='patient_exist'){
                    Swal.fire({
              text: 'There are active Members associated with this plan. Please use hide plan option.'
            })
                 }
              }, error => {
                   $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
              }    
              );
              }
              else {
                this.getPlans();
                this.rows.splice(row, 1);
              this.rows = [...this.rows];
              }
            }
          });
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
      // filter our data
    const temp = this.temp.filter(function(d) {
    
    return d.planName.toLowerCase().indexOf(val) !== -1 || d.treatments.toLowerCase().indexOf(val) !== -1 || d.planLength.toLowerCase().indexOf(val) !== -1 || d.description.toLowerCase().indexOf(val) !== -1 || !val;
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
