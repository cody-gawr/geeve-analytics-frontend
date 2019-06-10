import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { DentistService } from './dentist.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from "@angular/router";

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
declare var require: any;
const data: any = require('assets/company.json');
@Component({
  selector: 'app-table-filter',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.scss']
})
export class DentistComponent implements AfterViewInit {
  provider_id: string;
  dentist_name: string;
   public clinic_id:any ={};

  ngAfterViewInit() {
     this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
      this.getDentists();

     });
  
  }
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'sr' }, { name: 'name' }, { name: 'Action' }];

  @ViewChild(DentistComponent) table: DentistComponent;
  constructor(private dentistService: DentistService, public dialog: MatDialog, private route: ActivatedRoute) {
  this.clinic_id = this.route.snapshot.paramMap.get("id");

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
      data: { dentist_name: this.dentist_name, provider_id: this.provider_id }
    });

    dialogRef.afterClosed().subscribe(result => {
  this.dentistService.addDentists(result.provider_id, result.dentist_name,this.clinic_id).subscribe((res) => {
    console.log(res);
       if(res.message == 'success'){
        alert('Dentist Added');
          this.getDentists();
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
    });
  }

  private getDentists() {
    console.log(this.rows);
  this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
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
  private deleteDentists(row) {
     if(confirm("Are you sure to delete Dentist?")) {
    if(this.rows[row]['providerId']) {
  this.dentistService.deleteDentists(this.rows[row]['providerId']).subscribe((res) => {
       if(res.message == 'success'){
        alert('Dentist Removed');
          this.getDentists();
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

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  updateValue(event, cell, rowIndex) {
  if((this.rows[rowIndex]['providerId']  == 'Enter Provider Id') || (this.rows[rowIndex]['name']  == 'Enter Name')) {
    this.editing[length + '-providerId'] = true;
    this.editing[length + '-name'] = true;
  }
  else {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.dentistService.updateDentists(this.rows[rowIndex]['providerId'], this.rows[rowIndex][cell],this.clinic_id).subscribe((res) => {
       if(res.message == 'success'){
        alert('Dentist Updated');
          this.getDentists();
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
  }

  enableEditing(rowIndex, cell) {
    this.editing[rowIndex + '-' + cell] = true;

  }

}
