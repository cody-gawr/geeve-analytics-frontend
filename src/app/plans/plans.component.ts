import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { PlansService } from './plans.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";

declare var require: any;
const data: any = require('assets/company.json');
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
  columns = [{ prop: 'id' }, { name: 'plan' }, { name: 'allowedClinics' }, { name: 'description' }, { name: 'amount' }, { name: 'discount' }];

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
      width: '250px',
      data: { plan: this.plan, allowedClinics: this.allowedClinics, description: this.description, amount: this.amount, discount: this.discount }
    });
    dialogRef.afterClosed().subscribe(result => {
     this.plansService.addPlans(result.plan, result.allowedClinics, result.description,result.amount, result.discount).subscribe((res) => {
           if(res.message == 'success'){
            alert('Plan Created Successfully!');  
            this.getPlans();
           }
        }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
    });
  }

  private getPlans() {
  this.plansService.getPlans().subscribe((res) => {
       if(res.message == 'success'){
        this.rows = res.data;
        this.temp = [...res.data];        
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
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    if(event.target.value == '')
      alert('Value cannot be empty!');
    else {
    this.rows[rowIndex][cell] = event.target.value;
    this.plansService.updateUser(this.rows[rowIndex]['id'], this.rows[rowIndex][cell],cell).subscribe((res) => {
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

  }

}
