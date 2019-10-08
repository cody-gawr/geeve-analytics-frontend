import { Component,OnInit,Inject, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { PatientInfoService } from './patient-info.service';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'sam', age: 22, gender: 'MALE', action: '2' },
  { position: 2, name: 'ron', age: 23, gender: 'MALE', action: '3' },
  { position: 3, name: 'justin', age: 43, gender: 'MALE', action: '4' },
  { position: 4, name: 'thomas', age: 23, gender: 'MALE', action: '5' },
  { position: 5, name: 'timber', age: 10, gender: 'MALE', action: '5' },
  { position: 6, name: 'elesa', age: 12, gender: 'FEMALE', action: '5'        },

];
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})


export class DialogOverviewExampleDialogComponent {

  constructor(
    
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-formlayout',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  public id:any ={};
  public imageURL:any;
  public patient_amount : any;
  public member_plan_id:any;
  public total_subpatient:any;
  public contract_url:any;
  public plan_name:any;
  public form: FormGroup;
  options: FormGroup;
  public position;
  public name;
  public age;
  public gender;
  public discount;
  public treatmentdata;
  private warningMessage: string;

  constructor(private fb: FormBuilder,public dialog: MatDialog,  private patientInfoService: PatientInfoService, private route: ActivatedRoute,private _cookieService: CookieService, private router: Router,breakpointObserver: BreakpointObserver) {
  //  this.clinic_id = this.route.snapshot.paramMap.get("id");
  breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
    this.displayedColumns = result.matches ? 
        ['position', 'name', 'age', 'gender','action'] : 
        ['position', 'name', 'age', 'gender','action'];
  });
      this.options = fb.group({
        hideRequired: false,
        floatLabel: 'auto'
      });
  }

  
  displayedColumns = ['position', 'name', 'age', 'gender','action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  openDialog(): void {
      
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { position: this.position, name: this.name, age: this.age ,gender: this.gender }
     
    });

  }
  

  ngOnInit() {
    
    this.id = this.route.snapshot.paramMap.get("id");
    this.getSubPatients();
    this.getPatientContract();
    $('.header_filters').removeClass('hide_header'); 
    $('nb.header_filters').removeClass('flex_direct_mar'); 
      $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
      this.route.params.subscribe(params =>  {
    
       // this.getClinicGoals();
        $('#title').html('Patient Plan Detail');
     });

     this.form = this.fb.group({
     
    });
    
      }
      rows = [];
      // For form validator
      // email = new FormControl('', [Validators.required, Validators.email]);

      // // Sufix and prefix
      // hide = true;

      // getErrorMessage() {
      //   return this.email.hasError('required')
      //     ? 'You must enter a value'
      //     : this.email.hasError('email')
      //       ? 'Not a valid email'
      //       : '';
      // }

  getSubPatients() {

    this.patientInfoService.getSubPatients(this.id).subscribe((res) => {
  
       if(res.message == 'success'){
        this.rows = res.data[0]['sub_patients'];
        this.patient_amount=res.data[0]['total_amount'];
        this.total_subpatient=res.data[0]['sub_patients'].length;
       this.member_plan_id= res.data[0]['member_plan_id'];
       this.plan_name=res.data[0]['member_plan']['planName'];
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
  getPatientContract(){
      this.patientInfoService.getPatientContract(this.id).subscribe((res) => {
          if(res.message == 'success'){
         this.contract_url = res.data['contract_upload'];
          }
        
         else if(res.status == '401'){
               this._cookieService.put("token", '');
               this._cookieService.put("userid", '');
                this.router.navigateByUrl('/login');
            }
     }, error => {
       this.warningMessage = "Please Provide Valid Inputs!";
     }    
     );
    }
  onSubmit() {
    if(this.imageURL == undefined){
      alert("Please Upload file");
    
    }else{

        this.patientInfoService.updatePatients(this.id,this.member_plan_id,this.imageURL).subscribe((res) => {
        console.log(this.imageURL);
          if(res.message == 'success'){
          alert('Document Uploaded');
          this.getPatientContract();
            }
           }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
            }   
           );
        }
      }
      public fileToUpload;
      uploadImage(files: FileList) {
        this.fileToUpload = files.item(0);
        const extension = this.fileToUpload.name.split('.')[1].toLowerCase();
        if(extension !== "pdf"){
          alert('Please Upload PDF file');
          return null;
        }else
        {
          let formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);

        this.patientInfoService.contractUpload(formData).subscribe((res) => {
            if(res.message == 'success'){
            this.imageURL= res.data;
              }
            });
          }
      }
    }
    export interface Element {
      name: string;
      position: number;
      age: number;
      gender: string;
      action :any;
    }