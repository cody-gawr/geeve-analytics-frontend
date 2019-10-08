import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { PlansService } from './plans.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroupDirective,  NgForm,  Validators} from '@angular/forms';


declare var require: any;
const data: any = [];
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})


export class DialogOverviewExampleDialogComponent {


  public clinic_id:any ={};

  constructor(
    
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  save(data) {
    $('.form-control-dialog').each(function(){
      $(this).click();
    });
    if(data.planName != undefined && data.treat != undefined  && data.planLength != undefined && data.totalAmount != undefined && data.discount != undefined && data.description != undefined){
        this.dialogRef.close(data);
      }
    }


  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-table-filter',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements AfterViewInit {
  
  name: string;
  address: string;
  contact_name: string;
  fileInput: any ;
  clinic_id: any;

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
  public valplans;
  public plannameval;

  columns = [{ prop: 'id' }, { name: 'planName' }, { name: 'planLength' }, { name: 'totalAmount' }, { name: 'discount' }, { name: 'description' } ];

  constructor(private plansService: PlansService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router) {
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
    
    
    private getPlans() {
     this.rows=[];
    this.plansService.getPlans(this.clinic_id).subscribe((res) => {
    
         if(res.message == 'success'){
          this.rows = res.data;
          // console.log(this.rows);

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
      data: { planName: this.planName, userNameerror : this.valplans, planLength: this.planLength, totalAmount: this.totalAmount ,discount: this.discount , description: this.description,treatmentdata:this.treatmentdata,treat:this.treat  }
     
    });

   

    dialogRef.afterClosed().subscribe(result => {
    var test = this.treat.value;
    var data1 = test.map(t=>t.id);
    var tretid = data1.join();
    this.plannameval = result.planName;
    
    this.getPlannamevalidation();

   this.plansService.addPlans(result.planName, result.planLength, result.totalAmount,result.discount,result.description,this.clinic_id,tretid).subscribe((res) => {
        
    if(res.message == 'success'){
            alert('New Plan Added');
               this.getPlans();
           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }    
        );  
        });

  }

  public getPlannamevalidation() {
    
    this.plansService.getPlannamevalidation(this.plannameval).subscribe((res) => {
   //   console.log(res.message)
          if(res.message == 'error'){
                 this.valplans=res.data['message'];
                 console.log(this.valplans)
               }
      }, error => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }    
      );
  
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

  private deletePlan(row) {
           if(confirm("Are you sure to delete this plan?")) {
              if(this.rows[row]['id']) {
                this.plansService.deletePlan(this.rows[row]['id']).subscribe((res) => {
                 if(res.message == 'success'){
                  alert('Plan Removed');
                    this.getPlans();
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
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
console.log(event.target.value);
      // filter our data
    const temp = this.temp.filter(function(d) {
    
      return d.planName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;

    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    if(event.target.value == '')
      alert('Value cannot be empty!');
    else {
    this.rows[rowIndex][cell] = event.target.value;

    this.plansService.updateUser(this.rows[rowIndex]['id'], this.clinic_id,this.rows[rowIndex][cell],cell).subscribe((res) => {
      // console.log();
       if(res.message == 'success'){
        alert('Plan Updated');
          this.getPlans();
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
    this.rows = [...this.rows];
  }
  }

  enableEditing(rowIndex, cell) {

    this.editing[rowIndex + '-' + cell] = true;
//console.log(this.editing);
  }

}
