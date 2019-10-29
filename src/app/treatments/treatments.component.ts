import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { TreatmentsService } from './treatments.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatInputModule } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventEmitter , Output, Input} from '@angular/core';
import { DentistService } from '../dentist/dentist.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})


export class DialogOverviewExampleDialogComponent {
   public clinic_id:any ={}; 
   show_dentist = false;

  constructor(private treatmentsService: TreatmentsService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  private warningMessage: string;

  save(data) {

   $('.form-control-dialog').each(function(){
      var likeElement = $(this).click();
   });
  if(data.treatmentName != undefined && data.treatmentStatus != undefined ){
      this.treatmentsService.checkTreatmentName(data.treatmentName).subscribe((res) => {
       if($.trim(res.message)==$.trim('success') && $.trim(res.status)==$.trim('exist')){
         $(".treatNameError").text("");
         $(".treatNameError").text("Treatment name already exists .");
         $(".treatNameError").css("color","red");
         return false;
           
        }else{
          this.dialogRef.close(data);
        }
      }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });

  }else{
    return false;
   }
 }


  onNoClick(): void {
    this.dialogRef.close();
  }
    @Output() public onDentist: EventEmitter<any> = new EventEmitter();
    public selected_id;

    loadDentist(val) {
      if(val == '4')
        this.show_dentist = true;
    }
}

@Component({
  selector: 'app-overview-example-dialog',
  templateUrl: './update-dialog-overview-example.html',
})
//UpdateDialogOverviewExampleDialogComponent
export class UpdateDialogOverviewExampleDialogComponent {
   public clinic_id:any ={};
   constructor(private treatmentsService: TreatmentsService,
    public dialogRefUpdate: MatDialogRef<UpdateDialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  
  private warningMessage: string;

  updatesave(data) {
   $('.form-control-dialog').each(function(){
      var likeElement = $(this).click();
   });

   console.log(data);
  if(data.treatmentName != "" && data.treatmentStatus !="" && data.treatmentId!=""){
      this.treatmentsService.checkTreatmentNameForUpdate(data.treatmentName,data.treatmentId).subscribe((res) => {
       if($.trim(res.message)==$.trim('success') && $.trim(res.status)==$.trim('exist')){
         $(".treatNameError").text("");
         $(".treatNameError").text("Treatment name already exists .");
         $(".treatNameError").css("color","red");
         return false;
           
        }else{
          this.dialogRefUpdate.close(data);
        }
      }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });

  }else{
    return false;
   }
 }


  onNoClick(): void {
    this.dialogRefUpdate.close();
  }


   @Output() public onAdd: EventEmitter<any> = new EventEmitter();
   public selected_id;
    loadPermisions(val) {
      this.selected_id =val;
      this.onAdd.emit(val);
    }
}

declare var require: any;
const data: any = require('assets/company.json');
@Component({
  selector: 'app-table-filter',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent implements AfterViewInit {
  display_name: string;
  email: string;
  user_type='';
  fileInput: any ;
  notifier:any;
  public clinic_id;
  dentist_id = '';
password:string;
dentists:any=[];
  ngAfterViewInit() {
    $('.header_filters').removeClass('hide_header'); 
    $('.header_filters').removeClass('flex_direct_mar'); 
    
    this.getTreatments();

    this.clinic_id = this.route.snapshot.paramMap.get("id");
        $('#title').html('Treatments');
         $('.header_filters').addClass('hide_header');
  }
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'sr' }, { name: 'displayName' }, { name: 'email' }, { name: 'usertype' }, { name: 'created' }];

  @ViewChild(TreatmentsComponent) table: TreatmentsComponent;
  constructor(notifierService: NotifierService, private treatmentsService: TreatmentsService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router, private route: ActivatedRoute, private dentistService: DentistService) {
      this.notifier = notifierService;
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
      data: { display_name: 'test25'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
       if(result != undefined) {
        this.addTreatment(result.treatmentName,result.treatmentStatus);

      }
    });
  }


 openupdateDialog(rowIndex): void {

    if(this.rows[rowIndex]['id']) {
       this.treatmentsService.getTreatmentDetail(this.rows[rowIndex]['id']).subscribe((res) => {
          //this.data.treatmentName = res.treatmentName;         
        const dialogRefUpdate = this.dialog.open(UpdateDialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { display_name: 'test26',treatmentName: res.treatmentName,treatmentStatus: res.treatmentStatus,treatmentId: this.rows[rowIndex]['id']}
          });

           dialogRefUpdate.afterClosed().subscribe(result => {
             if(result != undefined) {
               this.updateTreatment(result.treatmentName,result.treatmentStatus,this.rows[rowIndex]['id']);
             }
          });

       }, error => {
         this.warningMessage = "Please Provide Valid Inputs!";
      }    
     );
    }else {
      this.rows.splice(rowIndex, 1);
      this.rows = [...this.rows];
    } 
    
  }


  addTreatment(treatmentName,treatmentStatus) {
  this.treatmentsService.addTreatment(treatmentName,treatmentStatus).subscribe((res) => {
       //if(res.message == 'success'){
        this.notifier.notify( 'success', 'Treatment Added' ,'vertical');
        this.getTreatments();
     //  }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }); 
  }
  updateTreatment(treatmentName,treatmentStatus,treatmentId) {
  this.treatmentsService.updateTreatment(treatmentName,treatmentStatus,treatmentId).subscribe((res) => {
       //if(res.message == 'success'){
        this.notifier.notify( 'success', 'Treatment Updated' ,'vertical');
        this.getTreatments();
       //  }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }); 
  }

  private getTreatments() {
  this.treatmentsService.getTreatments().subscribe((res) => {
       if(res.message == 'success'){
        this.rows = res.data;
        this.temp = [...res.data];        
        this.table = data;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public roles =[];
  public abc=true;
  public selectedRole: any[] = [];

  public selected_id:any;
  private deleteTreatment(row) {
    if(confirm("Are you sure to delete Treatment ?")) {

     if(this.rows[row]['id']) {
       this.treatmentsService.deleteTreatment(this.rows[row]['id']).subscribe((res) => {
        if(res.message == 'success'){
        this.notifier.notify( 'success', 'Treatment Removed' ,'vertical');
           this.getTreatments();
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
      return d.treatmentName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }

 /*updateValue(event, cell, rowIndex) {
  if((this.rows[rowIndex]['providerId']  == 'Enter Provider Id') || (this.rows[rowIndex]['name']  == 'Enter Name')) {
    this.editing[length + '-providerId'] = true;
    this.editing[length + '-name'] = true;
  }
  else {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.treatmentsService.updateRoleUser(this.rows[rowIndex]['id'], this.rows[rowIndex][cell],cell).subscribe((res) => {
       if(res.message == 'success'){
        alert('User Details Updated');
  
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
  } */

  enableEditing(rowIndex, cell) {
    this.editing[rowIndex + '-' + cell] = true;

  }

}
