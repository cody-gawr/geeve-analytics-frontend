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
import Swal from 'sweetalert2';
import {MatChipsModule} from '@angular/material/chips';
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
  log_appointment(data) {
        this.dialogRef.close(data);      
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
  public formPatient: FormGroup;
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
  public patient_status;
  public created;
  public totalAmount;
  public planLength;
  rows = [];
  rowsAppointments =[];
  benefit =[];
  payment=[];
  editing ={};
 public patient_id;
public patient_address;
public patientdob;
public patient_age;
public patient_gender;
public patient_phone_no;
public patient_home_phno;
public patient_name;
public patient_dob;
public preventative_frequency;
public preventative_count;
public patientLog;
public user_type = this._cookieService.get("user_type");
  constructor(notifierService: NotifierService,private fb: FormBuilder,public dialog: MatDialog,  private patientInfoService: PatientInfoService, private route: ActivatedRoute,private _cookieService: CookieService, private router: Router,breakpointObserver: BreakpointObserver,private datePipe: DatePipe) {
    this.notifier = notifierService;
    }
   goBack() {
      window.history.back();
   }

   openDialog(): void {
    this.patientLog =  this.patientsAppointmentData[0].id+"_"+this.patientsAppointmentData[0].sub_patients_type;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
     width: '250px',
      data: { patientsAppointmentData: this.patientsAppointmentData,patientLog:this.patientLog},
        panelClass: 'full-screen'
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
      if(result.patientLog) {
        this.patientInfoService.log_appointment(this.patient_id,this.member_plan_id,result.patientLog).subscribe((res) => {   
            if(res.message == 'success'){
                this.notifier.notify( 'success', 'Appointment Logged' ,'vertical');
                this.getAppointments();
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
            });
      }
      else{
        Swal.fire(
          '',
          'Please select Patient name',
          'error'
        )
      }           
    }
    });
  }

  ngOnInit() {   
    this.id = this.route.snapshot.paramMap.get("id");
    this.getSubPatients();
    this.getPatientContract();
      this.route.params.subscribe(params =>  {
        $('#title').html('Patient Plan Detail');
     });
         this.formPatient = this.fb.group({
          patient_name: [null, Validators.compose([Validators.required])],
          patient_address: [null, Validators.compose([Validators.required])],
          patient_dob: [null, Validators.compose([Validators.required])],
          patient_gender: [null, Validators.compose([Validators.required])],
          patient_phone_no: [null, Validators.compose([Validators.required])],
        });    
      }
isDecimal(value) {
 if(typeof value != 'undefined')
  {
    if(String(value).includes("."))
    return true;
  }
}

    private deletePatients() {
     Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete member?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
    if(this.id) {
      this.patientInfoService.deletePatients(this.id,this.clinic_id).subscribe((res) => {
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Patient Removed' ,'vertical');
        this.router.navigate(['/patients-detail']);
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
    }
  }
});
  } 
  getSubPatients() {
    this.patientInfoService.getSubPatients(this.id).subscribe((res) => {  
       if(res.message == 'success'){
        var patientArray ={};
        patientArray['id'] = res.data[0]['id'];           
        patientArray['sub_patients_name'] = res.data[0]['patient_name'];
        patientArray['sub_patients_dob'] = res.data[0]['patient_dob'];
        patientArray['sub_patients_gender'] = res.data[0]['patient_gender'];
        patientArray['sub_patients_type'] = 'main';
        patientArray['sub_patients_amount'] = res.data[0]['member_plan']['totalAmount'];
        this.rows =[];
        res.data[0]['sub_patients'].forEach(res => {
          var temp ={'sub_patients_type':''};
          temp = res;
          temp.sub_patients_type = 'sub';
          this.rows.push(temp);
        });
        var sub_patient_length = this.rows.length;
        this.rows[sub_patient_length] = patientArray;
        this.patient_id=res.data[0]['id'];
        this.patient_name=res.data[0]['patient_name'];
        this.patient_address=res.data[0]['patient_address'];
        if(this.patient_address == 'NULL')
          this.patient_address ='';
        this.patient_dob = this.datePipe.transform(res.data[0]['patient_dob'],'yyyy-MM-dd');
        this.patient_age=res.data[0]['patient_age'];
        this.patient_gender=res.data[0]['patient_gender'];
        this.patient_phone_no=res.data[0]['patient_phone_no'];
        this.patient_home_phno=res.data[0]['patient_home_phno'];
        this.patient_status=res.data[0]['patient_status'];
        this.patient_amount=res.data[0]['total_amount'];
        this.patient_status=res.data[0]['patient_status'];
        this.preventative_frequency= res.data[0]['preventative_frequency'];
        this.created=res.data[0]['created'];
        this.totalAmount=res.data[0]['plan_cost'];
        this.total_subpatient=res.data[0]['sub_patients'].length;
        this.member_plan_id= res.data[0]['member_plan_id'];
        this.plan_name=res.data[0]['member_plan']['planName'];
        this.planLength=res.data[0]['planLength'];
        this.clinic_id=res.data[0]['clinic_id'];
        this.user_id=res.data[0]['user_id'];
        this.mainpatientname = res.data[0]['patient_name'];
        this.getPaymentHistory();
        this.getAppointments();
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
public patientsAppointmentData =[];
  getAppointments() {    
       this.patientInfoService.getAppointments(this.patient_id,this.member_plan_id).subscribe((res) => {
       this.patientsAppointmentData==[];   
         if(res.message == 'success'){
              this.rowsAppointments = res.data;
              var temp=[];
               this.rowsAppointments.forEach((appt,indexappt) => {
                  this.rows.forEach((res,indexres) => {
                    if(appt.sub_patient_id == res.id)
                      appt.patient_name = res.sub_patients_name;   
                 });
                    temp.push(appt);        
               });
              this.rowsAppointments=temp;
             }
             else{
              this.rowsAppointments = [];
             }
          this.patientsAppointmentData=Object.assign([],this.rows);   
          this.getAppointmentsCount();

        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        });
  }
  public patientsAppointmentCount =[];  
    getAppointmentsCount() {    
       this.patientInfoService.getAppointmentsCount(this.patient_id,this.member_plan_id).subscribe((res) => {   
             if(res.message == 'success'){               
             res.data.forEach(res => {
              if(res.count>= this.preventative_frequency){
                  this.patientsAppointmentData.forEach((data,index,object)=>{
                    if(res.patient_id == data.id  && res.patient_type == data.sub_patients_type){
                    this.patientsAppointmentData.splice(index,1);
                    }
                  })
              }
             });
             }
             else{
              this.rowsAppointments = [];
             } 
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        });
    }


  deleteAppointment(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete the logged Appointment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
            this.patientInfoService.deleteAppointment(id).subscribe((res) => {   
            if(res.message == 'success'){
              this.notifier.notify( 'success', 'Appointment Removed' ,'vertical');          
            }
           this.getAppointments();
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        });
      } 
    })
  }

  onSubmitPatientDetails() {
    if(this.formPatient.valid) {
        this.patientInfoService.updatePatientsDetails(this.patient_name,this.patient_address,this.patient_dob,this.patient_age,this.patient_gender,this.patient_phone_no,this.patient_home_phno,this.patient_status,this.patient_id).subscribe((res) => {   
         if(res.message == 'success'){
                this.notifier.notify( 'success', 'Patient Details Updated' ,'vertical');
              }
            }, error => {
              this.warningMessage = "Please Provide Valid Inputs!";
            });
    }
  }

public start_date;
public renew_date;
public next_date;
  getPaymentHistory() {
    this.patientInfoService.getPaymentHistory(this.id,this.member_plan_id,this.user_id,this.clinic_id).subscribe((res) => {
       if(res.message == 'success'){
        this.payment = res.data;
        if(res.data[0]) {
          this.payment_plan_name=res.data[0]['member_plan']['planName'];
          this.start_date=new Date(res.data[0]['invoice_date']);
          this.renew_date=this.datePipe.transform(new Date(this.start_date.getFullYear()+1,this.start_date.getMonth(),this.start_date.getDate()), 'dd-MM-y');
          this.next_date=this.datePipe.transform(new Date(this.start_date.getFullYear(),this.start_date.getMonth()+1,this.start_date.getDate()), 'dd-MM-y');
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
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }

  log_appointment() {
    this.patientLog = this.rows[0]['id']+"_"+this.rows[0]['sub_patients_type'];
    if(this.patientLog) {
    this.patientInfoService.log_appointment(this.patient_id,this.member_plan_id,this.patientLog).subscribe((res) => {   
        if(res.message == 'success'){
              this.notifier.notify( 'success', 'Appointment Logged' ,'vertical');
              this.getAppointments();
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
        });
  }
  else{
    Swal.fire(
      '',
      'Please select Patient name',
      'error'
    )
  }
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
          if(res.message == 'success'){
            this.notifier.notify( 'success', 'Document Uploaded' ,'vertical');
               this.getPatientContract();
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
      }

  public fileToUpload;
  uploadImage(files: FileList) {
    this.fileToUpload = files.item(0);
    const extension = this.fileToUpload.name.split('.')[1].toLowerCase();
    if(extension !== "pdf"){
      alert('Please Upload PDF file');
      return null;
    } else
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
         //    this.getBenefitsUsed();
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
}