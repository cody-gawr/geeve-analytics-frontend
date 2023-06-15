 import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { DentistService } from './dentist.service';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})
export class DialogOverviewExampleDialogComponent {
   public clinic_id:any ={};
  // public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  // this.form = this.fb.group({
  //     provider_id: [null, Validators.compose([Validators.required])],
  //     dentist_name: [null, Validators.compose([Validators.required])]
  //   });

    save(data) {
    $('.mat-form-control').click();
    if(data.provider_id != undefined && data.dentist_name != undefined  ){
        this.dialogRef.close(data);
      }
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
declare var require: any;
const data: any =[];
@Component({
  selector: 'app-table-filter',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.scss']
})
export class DentistComponent implements AfterViewInit {
  provider_id: string;
  dentist_name: string;
   public clinic_id:any ={};
   initiate_clinic() {
    var val = $('#currentClinic').attr('cid');
    this.clinic_id = val;
  this.getDentists();
  }
  ngAfterViewInit() {
    $('.header_filters').removeClass('hide_header'); 
    $('.header_filters').removeClass('flex_direct_mar'); 
    
     this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
      
      this.initiate_clinic();

          $('.external_clinic').show();
        //$('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
        $('#title').html('Dentist');
     });
  
  }
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'sr' },{ prop: 'providerId' }, { name: 'name' }, { name: 'Action' }];

  @ViewChild(DentistComponent) table: DentistComponent;
  constructor(private dentistService: DentistService, public dialog: MatDialog, private route: ActivatedRoute,private _cookieService: CookieService, private router: Router,private toastr: ToastrService) {
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
       width: '400px',
      data: { dentist_name: this.dentist_name, provider_id: this.provider_id }
    });

    dialogRef.afterClosed().subscribe(result => {
  this.dentistService.addDentists(result.provider_id, result.dentist_name,this.clinic_id).subscribe((res) => {
       if(res.status == 200){
        this.toastr.success('Dentist Added');
          this.getDentists();
              $('.external_clinic').show();
        //$('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
    });
  }

  private getDentists() {
  this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
       if(res.status == 200){
        this.rows = res.body.data;
    this.temp = [...res.body.data];
        
this.table = data;
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
  private deleteDentists(row) {
       Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Dentist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value){
         $('.ajax-loader').show();
    if(this.rows[row]['providerId']) {
  this.dentistService.deleteDentists(this.rows[row]['providerId']).subscribe((res) => {
       if(res.status == 200){
         $('.ajax-loader').hide();
         this.toastr.success('Dentist Removed');
          this.getDentists();
       }  
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
    }
    else {
      $('.ajax-loader').hide();
      this.toastr.error('Something went wrong. Please try again.');
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
       if(res.status == 200){
         this.toastr.success('Dentist Updated');
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
