import { Component, Inject, AfterViewInit } from '@angular/core';
import { PlansService } from './plans.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
declare var require: any;
const data: any = require('assets/company.json');
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})


export class DialogOverviewExampleDialogComponent {
   public clinic_id:any ={};
  form: FormGroup;
  plan:string;
  constructor(
     fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = fb.group({
                    plan: [this.plan, [Validators.required, Validators.maxLength(5)]]
                });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
   save(data) {
    $('.form-control').click();
     const {value, valid} = this.form;
    if(data.allowedClinics != undefined && data.amount != undefined  && data.description != undefined && data.plan != undefined && data.allowedClinics != '' && data.amount != ''  && data.description != '' && data.plan != ''  ){
        this.dialogRef.close(data);
      }
    }
    close() {
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

  ngAfterViewInit() {
    this.getPlans();
        $('#title').html('Plans');
        $('.header_filters').addClass('hide_header'); 
  }
  editing = {};
  rows = [];
  temp = [...data];
  table;
  loadingIndicator = true;
  reorderable = true;
public plan;
public allowedClinics;
public description;
public amount;
public discount;
  columns = [{ prop: 'sr' }, { name: 'plan' }, { name: 'allowedClinics' }, { name: 'description' }, { name: 'amount' }, { name: 'discount' }];

  constructor(private plansService: PlansService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router) {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
  private warningMessage: string;

    openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '750px',
      panelClass: 'add_members',
      data: { plan: this.plan, allowedClinics: this.allowedClinics, description: this.description, amount: this.amount, discount: this.discount }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
     this.plansService.addPlans(result.plan, result.allowedClinics, result.description,result.amount, result.discount).subscribe((res) => {
           if(res.status == 200){
            alert('Plan Created Successfully!');  
            this.getPlans();
           }
        }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
   }
    });
  }

  private getPlans() {
  this.plansService.getPlans().subscribe((res) => {
       if(res.status == 200){
        this.rows = res.body.data;
        this.temp = [...res.body.data];        
        this.table = data;
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
                 if(res.status == 200){
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
  addDentist() {
    var temp ={};
    temp['providerId'] ='Enter Provider Id';
    temp['name'] ='Enter Name';
    var length = this.rows.length;
    this.editing[length + '-providerId'] = true;
    this.editing[length + '-name'] = true;
    
    this.rows.push(temp);
    this.table =data;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.plan.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  // updateValue(event, cell, rowIndex) {
  //   this.editing[rowIndex + '-' + cell] = false;
  //   if(event.target.value == '')
  //     alert('Value cannot be empty!');
  //   else {
  //   this.rows[rowIndex][cell] = event.target.value;
  //   this.plansService.updatePlan(this.rows[rowIndex]['id'], this.rows[rowIndex][cell],cell).subscribe((res) => {
  //      if(res.status == 200){
  //       alert('Plan Updated');
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

  }
    updatePlan(row): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '750px',
      data: { plan: this.rows[row]['plan'], allowedClinics: this.rows[row]['allowedClinics'], description: this.rows[row]['description'], amount: this.rows[row]['amount'], discount: this.rows[row]['discount'] }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
     this.plansService.updatePlan(this.rows[row]['id'], result.plan, result.allowedClinics, result.description,result.amount).subscribe((res) => {
           if(res.status == 200){
            alert('Plan Updated Successfully!');  
            this.getPlans();
           }
        }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
   }
    });
  }


}
