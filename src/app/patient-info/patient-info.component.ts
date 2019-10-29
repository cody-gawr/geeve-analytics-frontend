import { Component,OnInit,Inject, EventEmitter,Output, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { PatientInfoService } from './patient-info.service';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { DatePipe,formatDate } from '@angular/common';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { empty } from 'rxjs';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})


export class DialogOverviewExampleDialogComponent {

  constructor(
     public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    onNoClick(): void {
    this.dialogRef.close();
  }
  @Output() public sittingsUpdate: EventEmitter<any> = new EventEmitter();
  @Output() public getSittings: EventEmitter<any> = new EventEmitter();
  @Output() public deletesittingid: EventEmitter<any> = new EventEmitter();
  statusupdate(sittingIndex,event){
    
    if(event.checked==true){
      event.checked ='ACTIVE';
    }else{
      event.checked==false
      event.checked ='INACTIVE';
    }

   var settingstatus = event.checked;
    // console.log(settingstatus);

    this.sittingsUpdate.emit({settingstatus:settingstatus, sittingIndex: sittingIndex},);
  }
  totalsittings(gettotalsittings){

    console.log(gettotalsittings);
    this.getSittings.emit(gettotalsittings);
  }

  deleterow(deleteindex){
    // console.log(deleteindex);
   this.deletesittingid.emit(deleteindex);
  }

 }

const data: any = [];
@Component({
  selector: 'app-formlayout',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  private readonly notifier: NotifierService;

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
  public treatmentdata;
  private warningMessage: string;
  public treatmentName :any={};
  public totalsitting :any={};
  public sitting_id :any= {};
  public sitting_status :any={};
  public performed_date :any={};
  sittings=[];
  public clinic_id:any={};
  public user_id:any={};
  public memberplanid:any={};
  public invoice_date:any={};
  public benefit_patient_id: any={};
  public benefit_planid: any={};
  public patientid:any={};
  public membertreatmentid:any={};
  public payment_plan_name:any ={};
  public mainpatientname;
  rows = [];
  benefit =[];
  payment=[];
  editing ={};
 

  constructor(notifierService: NotifierService,private fb: FormBuilder,public dialog: MatDialog,  private patientInfoService: PatientInfoService, private route: ActivatedRoute,private _cookieService: CookieService, private router: Router,breakpointObserver: BreakpointObserver) {
    this.notifier = notifierService;
    }

   openDialog(treatmentIndex,): void {
    this.getBenefitsUsed();
    this.treatmentName = this.benefit[treatmentIndex]['treatmentName'];
    this.totalsitting= this.benefit[treatmentIndex]['patients_sittings'];
    if(this.benefit[treatmentIndex]['sittinginfo'])
    this.sittings= this.benefit[treatmentIndex]['sittinginfo'];

    this.memberplanid = this.benefit[treatmentIndex]['member_plan_id'];
    this.patientid = this.benefit[treatmentIndex]['patient_id'];
    this.membertreatmentid = this.benefit[treatmentIndex]['member_treatment_id'];
    
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
     width: '250px',
      data: { treatmentName: this.treatmentName, totalsitting: this.totalsitting, sitting_status: this.sitting_status , sitting_id: this.sitting_id ,sittings: this.sittings ,memberplanid: this.memberplanid}
      });
    
    const sub1 = dialogRef.componentInstance.getSittings.subscribe((gettotalsittings) => {
      //  console.log(gettotalsittings)
      // console.log(this.sittings)
      // console.log(gettotalsittings);
    
      var sittingscount = this.sittings.length;

       if(sittingscount==0){
        for (let index = 0; index < gettotalsittings; index++) {
          this.sittings[index]= {id:"",patient_id:this.id, sitting_status: "" };
           } 
      }else{
           for (let index = sittingscount; index < gettotalsittings; index++) {
            this.sittings[index]= {id:"",patient_id:this.id, sitting_status: "" };
            } 
       }
       });

       const sub2 = dialogRef.componentInstance.deletesittingid.subscribe((deleteindex) => {
        // var ar = this.sittings;
        // delete ar[deleteindex];
        // this.sittings.shift(deleteindex);
        
        // console.log(ar);

        var my_array = this.sittings;
        var start_index = deleteindex
        var number_of_elements_to_remove = deleteindex;
        var removed_elements = my_array.splice(start_index, number_of_elements_to_remove);
        this.totalsitting = this.sittings.length;

         $("#totalsittings").val(this.totalsitting);
        console.log(this.totalsitting)
        console.log(removed_elements);
        console.log(my_array);
        
        });

        
    const sub = dialogRef.componentInstance.sittingsUpdate.subscribe((settingstatus,sittingsIndex) => {
      this.getBenefitsUsed();   
      this.benefit_patient_id = this.benefit[treatmentIndex]['patient_id'];
      this.benefit_planid = this.benefit[treatmentIndex]['member_plan_id'];
      this.sitting_id = this.benefit[treatmentIndex]['sittinginfo'][settingstatus['sittingIndex']]['id'];
      this.sitting_status = settingstatus['settingstatus'];
      this.performed_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');


     //  console.log(this.sitting_id);
     // console.log( treatmentIndex);
     // console.log(this.sitting_status);
     // console.log(settingstatus['sittingIndex']);
     

      this.patientInfoService.updateSittingStatus(this.benefit_patient_id, this.benefit_planid,this.sitting_id,this.sitting_status,this.performed_date).subscribe((res) => {
        if(res.message == 'success'){
          this.getBenefitsUsed();
          this.notifier.notify( 'success', 'Sittings Updated' ,'vertical');
               }
      });
      });

    dialogRef.afterClosed().subscribe(result => {
      // var sitting =JSON.stringify(this.sittings);
      var sittingUpdated ={};
      for (let index = 0; index < this.sittings.length; index++) {
        var element = this.sittings[index];
        var temp = {};
        temp['sitting_id'] = element['id'];
        temp['patient_id'] = element['patient_id'];
        temp['sitting_status'] = element['sitting_status'];
        temp['performed_date'] = element['performed_date'];

        sittingUpdated[index] = temp;
    }
    var sittingUpdatedString =JSON.stringify(sittingUpdated); 
    console.log(sittingUpdatedString);

       var totalsiting =this.sittings.length;
      this.getBenefitsUsed();
      this.patientInfoService.addBenefits(this.id, this.memberplanid,this.membertreatmentid,totalsiting,sittingUpdatedString).subscribe((res) => {
        this.getBenefitsUsed();
            if(res.message == 'success'){
              console.log(res);
               this.notifier.notify( 'success', 'Sittings Updated' ,'vertical');
                }
      }, error => {
        this.warningMessage = "Please Provide Valid Inputs!";
      }
      );
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
   
  getSubPatients() {

    this.patientInfoService.getSubPatients(this.id).subscribe((res) => {
  
       if(res.message == 'success'){

         console.log(res.data);
        var patientArray ={};
        patientArray['sub_patients_name'] = res.data[0]['patient_name'];
        patientArray['sub_patients_age'] = res.data[0]['patient_age'];
        patientArray['sub_patients_gender'] = res.data[0]['patient_gender'];
        patientArray['sub_patients_amount'] = res.data[0]['member_plan']['totalAmount'];

        this.rows = res.data[0]['sub_patients'];
        var sub_patient_length = this.rows.length;
        this.rows[sub_patient_length] = patientArray;
        this.patient_amount=res.data[0]['total_amount'];
        this.total_subpatient=res.data[0]['sub_patients'].length;
        this.member_plan_id= res.data[0]['member_plan_id'];
        this.plan_name=res.data[0]['member_plan']['planName'];
        this.clinic_id=res.data[0]['clinic_id'];
        this.user_id=res.data[0]['user_id'];
        this.mainpatientname = res.data[0]['patient_name'];
        this.getBenefitsUsed();
        this.getPaymentHistory();
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
  getPaymentHistory() {

    this.patientInfoService.getPaymentHistory(this.id,this.member_plan_id,this.user_id,this.clinic_id).subscribe((res) => {
  
       if(res.message == 'success'){
        this.payment = res.data;
        this.payment_plan_name=res.data[0]['member_plan']['planName'];
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
      $('.ajax-loader').show();      

        this.patientInfoService.updatePatients(this.id,this.member_plan_id,this.imageURL).subscribe((res) => {
      $('.ajax-loader').hide();      
      
        // console.log(this.imageURL);
          if(res.message == 'success'){
            this.notifier.notify( 'success', 'Document Uploaded' ,'vertical');
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
      $('.ajax-loader').show();      

      let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    this.patientInfoService.contractUpload(formData).subscribe((res) => {
      $('.ajax-loader').hide();      

        if(res.message == 'success'){
        this.imageURL= res.data;
          }
        });
      }
  }
  getBenefitsUsed(){

    this.patientInfoService.getBenefitsUsed(this.id,this.member_plan_id).subscribe((res) => {
  
      if(res.message == 'success'){
        this.benefit = res.data;
       
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
  public deleteBenefitsUsed(row) {
    if(confirm("Are you sure to delete this plan?")) {
       if(this.benefit[row]['patients_benefits_id']) {
         this.patientInfoService.deleteBenefitsUsed(this.benefit[row]['patients_benefits_id']).subscribe((res) => {
          if(res.message == 'success'){
   
           this.notifier.notify( 'success', 'Plan Removed' ,'vertical');
             this.getBenefitsUsed();
          }
       }, error => {
         this.warningMessage = "Please Provide Valid Inputs!";
       }    
       );
       }
       else {
         this.getBenefitsUsed();
         this.rows.splice(row, 1);
       this.rows = [...this.rows];
       }
     }
}

}