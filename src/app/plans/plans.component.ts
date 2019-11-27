import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { PlansService } from './plans.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroupDirective,  NgForm,  Validators} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { empty } from 'rxjs';

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

  constructor(
    private plansService: PlansService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  save(data) {


      this.clinic_id = $('#currentClinicid').attr('cid');
  
      this.plansService.getPlannamevalidation(data.planName,this.clinic_id,data.planOrder).subscribe((res) => {
            if(res.message == 'error'){
                   this.valplans=res.data['message'];
                   //console.log(this.valplans)
                  //  console.log(data.planName);

                   //return true;
                   $('#email').focus();
                   return false;
                  }
                  else{
              if(data.planName != undefined && this.valplans != '' && data.treat != undefined  && data.planLength != undefined && data.totalAmount != undefined && data.discount != undefined && data.description != undefined && data.planOrder !=undefined){
                      this.dialogRef.close(data);
                    
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
    this.dialogRef.close();
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
  constructor( private plansService: PlansService,
    public dialogUpdateRef: MatDialogRef<UpdatePlanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {  }

    update(data) {
        
      this.clinic_id = $('#currentClinicid').attr('cid');

      this.plansService.getUpdateplanvalidation(data.planName,this.clinic_id,data.memberplan_id,data.planOrder).subscribe((res) => {
            if(res.message == 'error'){
                   this.valplans=res.data['message'];
                   //console.log(this.valplans)
                  //   console.log(data.planName);
                   //return true;
                  }
                  else{
              if(data.planName != undefined && this.valplans != '' && data.treat != undefined  && data.planLength != undefined && data.totalAmount != undefined && data.discount != undefined && data.description != undefined && data.planOrder !=undefined){
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
    console.log(this.valplans)
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

  treat = new FormControl();

  ngAfterViewInit() {
    this.initiate_clinic();
    this.getTreatments();

        $('#title').html('Members Plan');
        $('.header_filters').removeClass('hide_header');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
  
  }
  editing = {};
  rows = [];
 
  temp = [...data];
  table;
  loadingIndicator = true;
  reorderable = true;

  public planName;
  public planLength;
  public totalAmount;
  public description;
  public discount;
  public treatmentdata;
  public memberplan_id;
  public planOrder;
  public isFeatured;

  
  columns = [{ prop: 'id' }, { name: 'planName' }, { name: 'planLength' }, { name: 'totalAmount' }, { name: 'discount' }, { name: 'description' } ];

  constructor(notifierService: NotifierService,private plansService: PlansService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router) {
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
  if(this.clinic_id)
      this.getPlans();
    }
    goBack() {
      window.history.back();
}
  private getPlans() {
  this.rows=[];
  this.plansService.getPlans(this.clinic_id).subscribe((res) => {
        if(res.message == 'success'){
        this.rows = res.data;
        console.log(this.rows);
        this.temp = [...res.data];        
        this.table = data;
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }

    openDialog(): void {
      
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { planName: this.planName, planLength: this.planLength, totalAmount: this.totalAmount ,discount: this.discount , description: this.description,treatmentdata:this.treatmentdata,treat:this.treat,planOrder:this.planOrder  }    
    });

    dialogRef.afterClosed().subscribe(result => {
    var test = this.treat.value;
    var data1 = test.map(t=>t.id);
    var tretid = data1.join();
   
      $('.ajax-loader').show();      

   this.plansService.addPlans(result.planName,result.planOrder,result.planLength, result.totalAmount,result.discount,result.description,this.clinic_id,tretid,result.isFeatured).subscribe((res) => {
      $('.ajax-loader').hide();      
        
    if(res.message == 'success'){
           
            this.notifier.notify( 'success', 'New Plan Added' ,'vertical');
               this.getPlans();
           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }
        );  
        });
  }
  openUpdateDialog(rowIndex): void {
    
    this.memberplan_id =this.rows[rowIndex]['id'];
    this.selectedtreat = this.rows[rowIndex]['treatmentsID'];
    var settreatmentid = $.map((this.selectedtreat).split(','), function(value){
      return parseInt(value);
    });
   
    this.treat.setValue(settreatmentid);
  
    const dialogUpdateRef = this.dialog.open(UpdatePlanDialogComponent, {
     width: '250px',
     data: {planName: this.rows[rowIndex]['planName'],planOrder: this.rows[rowIndex]['planOrder'], planLength: this.rows[rowIndex]['planLength'], totalAmount: this.rows[rowIndex]['totalAmount'] ,discount: this.rows[rowIndex]['discount'] , description: this.rows[rowIndex]['description'],isFeatured:(this.rows[rowIndex]['isFeatured']=='true') ? true :false ,treatmentdata:this.treatmentdata,treat:this.treat,memberplan_id:this.memberplan_id}

    });
  

  dialogUpdateRef.afterClosed().subscribe(result => {
   
    var test = this.treat.value;
    var data1 = test.map(t=>t);
    var tretid = data1.join();
    this.plansService.updateUser(this.memberplan_id ,this.clinic_id,result.planName,result.planOrder,result.planLength, result.totalAmount,result.discount,tretid,result.description,result.isFeatured).subscribe((res) => {
   
   if(res.message == 'success'){
    this.getPlans()
            this.notifier.notify( 'success', 'Plan Updated' ,'vertical');
             }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }
        );  
        });
     
  }


  private getTreatments() {

    this.plansService.getTreatments().subscribe((res) => {
          if(res.message == 'success'){
           this.treatmentdata = res.data;
           this.treat;
             //  console.log(this.treatmentdata);
         }
      }, error => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }    
      );
  
    }

  public deletePlan(row) {
           if(confirm("Are you sure to delete this plan?")) {
              if(this.rows[row]['id']) {
                this.plansService.deletePlan(this.rows[row]['id']).subscribe((res) => {
                 if(res.message == 'success'){
          
                  this.notifier.notify( 'success', 'Plan Removed' ,'vertical');
                    this.getPlans();
                 }
              }, error => {
                this.warningMessage = "Please Provide Valid Inputs!";
              }    
              );
              }
              else {
                this.getPlans();
                this.rows.splice(row, 1);
              this.rows = [...this.rows];
              }
            }
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

  // updateValue(event, cell, rowIndex) {
  //   this.editing[rowIndex + '-' + cell] = false;
  //   if(event.target.value == '')

  //     this.notifier.notify( 'success', 'Value cannot be empty!' ,'vertical');
  //   else {
  //   this.rows[rowIndex][cell] = event.target.value;

  //   this.plansService.updateUser(this.rows[rowIndex]['id'], this.clinic_id,this.rows[rowIndex][cell],cell).subscribe((res) => {
  //     // console.log();
  //      if(res.message == 'success'){
         
  //       this.notifier.notify( 'success', 'Plan Updated' ,'vertical');
 
  //         this.getPlans();
  //      }
  //   }, error => {
  //     this.warningMessage = "Please Provide Valid Inputs!";
  //   }    
  //   );  
  //   this.rows = [...this.rows];
  // }
  // }

  enableEditing(rowIndex, cell) {

    this.editing[rowIndex + '-' + cell] = true;
//console.log(this.editing);
  }

}
