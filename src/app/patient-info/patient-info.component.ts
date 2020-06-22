import { Component,OnInit,Inject, EventEmitter,Output, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { PatientInfoService } from './patient-info.service';
import { DefaultersService } from '../defaulters/defaulters.service';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { DatePipe,formatDate } from '@angular/common';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { empty } from 'rxjs';
import Swal from 'sweetalert2';
import {MatChipsModule} from '@angular/material/chips';

import { ToastrService } from 'ngx-toastr';

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
public dob_date;
public dob_month;
public dob_year;
public dates =['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
months =[
{key:'01',value:"January"},{key:'02',value:"February"},{key:'03',value:"March"},
{key:'04',value:"April"},{key:'05',value:"May"},{key:'06',value:"June"},
{key:'07',value:"July"},{key:'08',value:"August"},{key:'09',value:"September"},
{key:'10',value:"October"},{key:'11',value:"November"},{key:'12',value:"December"}
];
public years:any = [];
public preventative_frequency;
public preventative_count;
public patientLog;
public user_type = this._cookieService.get("user_type");
public max_days =31;
public dob_larger_error="";
  constructor(private toastr: ToastrService,notifierService: NotifierService,private defaultersService: DefaultersService,private fb: FormBuilder,public dialog: MatDialog,  private patientInfoService: PatientInfoService, private route: ActivatedRoute,private _cookieService: CookieService, private router: Router,breakpointObserver: BreakpointObserver,private datePipe: DatePipe) {
    this.notifier = notifierService;
    var start_year =new Date().getFullYear();
     for (var i = start_year; i > start_year - 100; i--) {
      this. years.push(i);
     }
     this.dob_date='';
     this.dob_month='';
     this.dob_year='';
     this.patient_dob = this.dob_year+"-"+this.dob_month+"-"+this.dob_date;
    }
   goBack() {
      window.history.back();
   }

   openDialog(): void {
    this.patientLog =  this.patientsAppointmentData[0].id+"_"+this.patientsAppointmentData[0].sub_patients_type;
  if(this.patientsAppointmentData.length ==1){
    this.patientInfoService.log_appointment(this.patient_id,this.member_plan_id,this.patientLog).subscribe((res) => {   
     if(res.message == 'success'){
       this.toastr.success('Appointment Logged .');
       this.getAppointments();
     }
     else if(res.status == '401' || res.message == 'error'){
      this._cookieService.removeAll();
     this.router.navigateByUrl('/login');
               }
    }, error => {
        $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    });
  
  }else{

   const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
     width: '250px',
      data: { patientsAppointmentData: this.patientsAppointmentData,patientLog:this.patientLog},
        panelClass: 'full-screen'
      });
      dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
      if(result.patientLog) {
        this.patientInfoService.log_appointment(this.patient_id,this.member_plan_id,result.patientLog).subscribe((res) => {   
            if(res.message =='success'){
                this.toastr.success('Appointment Logged .');
                this.getAppointments();
                 }
                  else if(res.status == '401'){
                 this._cookieService.removeAll();
                  this.router.navigateByUrl('/login');
               }
            }, error => {
                 $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
  }

  ngOnInit() {   
    this.id = this.route.snapshot.paramMap.get("id");
    this.getSubPatients();
    this.getPatientContract();
    $('.header_filters').addClass('hide_header');
      this.route.params.subscribe(params =>  {
        $('#title').html('Membership Details');
     });
         this.formPatient = this.fb.group({
          patient_name: [null, Validators.compose([Validators.required])],
        patient_email: [null, Validators.compose([Validators.required])],
          patient_address: [null],
          dob_date: [null],
          dob_month: [null],
          dob_year: [null],
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
            this.toastr.success( 'Patient Deleted');
            this.router.navigate(['/members']);
           }
        }, error => {
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
        }    
        );
        }
      }
    });
  } 

public invalid_dob = false;
checkDob(control) {
this.patient_dob = this.dob_year+"-"+this.dob_month+"-"+this.dob_date;
var input = this.patient_dob;
var pattern =/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
  if(!pattern.test(input) || input.substring(0, 4)<'1990') {
  this.invalid_dob = true;
  }else {
  this.invalid_dob=false;  
  }

  if(control=='month' || control=='year'){
   this.max_days = this.getDaysInMonth(this.dob_year,this.dob_month);
   let a = Array(this.max_days).fill(0).map((i,idx) => idx +1);
   this.dates =a.map(this.updateDates);
   if(this.dob_month=="02" && this.dob_date > a.length){
     this.form.controls['dob_date'].setValue(a.length); 
   }
   
 }

 if(this.dob_year!="" && this.dob_month!="" && this.dob_date!=""){
    this.compareDateWithToday(this.dob_year,this.dob_month,this.dob_date);
 }
}

updateDates(date){
  let newDate =date < 10 ? "0"+date : date ;
  return newDate.toString();

}
getDaysInMonth(year: number, month: number) {
  return 32 - new Date(year, month - 1, 32).getDate();
}


compareDateWithToday(year,month,date){
 let mi = month.split('');
  if(mi[0]==='0'){
    month = Number(mi[1]) - 1;  month = "0"+month;
  }else{
    month = month -1;;
  }
  let selectedDate = new Date(year, month, date);  let Today = new Date();

   if(selectedDate > Today){
         //select current date and month with message
      let currentMonth :any = Today.getMonth().toString();
      if(currentMonth.length==1){
        currentMonth =Today.getMonth() + 1;
        currentMonth = "0"+currentMonth;
      }
     this.dob_date = Today.getDate();
     this.dob_month = currentMonth;
     this.dob_year = Today.getFullYear();

     //show message
     this.dob_larger_error ="Dob cannot be greater than today's date .";
    
   }else{
     this.dob_larger_error = "";
   }

}



 private cancelSubscription() {
     Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Cancel Subscription?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
    if(this.id) {
      this.patientInfoService.cancelSubscription(this.id,this.clinic_id).subscribe((res) => {
           if(res.message == 'success'){
            this.toastr.success('Membership Cancelled .');
            this.router.navigate(['/members']);
           }
        }, error => {
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
        }    
        );
        }
      }
    });
  } 
  public patient_email;
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
        this.patient_email=res.data[0]['patient_email'];
        this.patient_address=res.data[0]['patient_address'];
        if(this.patient_address == 'NULL')
        this.patient_address ='';
        this.patient_dob = this.datePipe.transform(res.data[0]['patient_dob'],'yyyy-MM-dd');
        var dobsplit = this.patient_dob.split("-");

        this.dob_date=dobsplit[2].replace('"','');
        this.dob_month=dobsplit[1];
        this.dob_year=dobsplit[0].replace('"','');
        this.checkDob('month');
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
        this.total_subpatient=this.rows.length;
        this.member_plan_id= res.data[0]['member_plan_id'];
        this.plan_name=res.data[0]['member_plan']['planName'];
        this.planLength=res.data[0]['planLength'];
        this.clinic_id=res.data[0]['clinic_id'];
        this.user_id=res.data[0]['user_id'];
        this.mainpatientname = res.data[0]['patient_name'];
        this.getPaymentHistory();
        this.getAppointments();
       }
        else if(res.status == '401' || res.message == 'error'){
               this._cookieService.removeAll();
               this.router.navigateByUrl('/login');
        }
    }, error => {
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
            $('.ajax-loader').show();
            this.patientInfoService.deleteAppointment(id).subscribe((res) => {   
            if(res.message=='success'){
              $('.ajax-loader').hide();
              this.toastr.success('Appointment Removed .');
              this.getAppointments(); return false;         
            }
           
        }, error => {
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
        });
      } 
    })
  }

  onSubmitPatientDetails() {
    if(this.formPatient.valid && !this.invalid_dob) {
            $('.ajax-loader').show();

        this.patientInfoService.updatePatientsDetails(this.patient_name,this.patient_address,this.patient_dob,this.patient_age,this.patient_gender,this.patient_phone_no,this.patient_home_phno,this.patient_status,this.patient_email,this.patient_id).subscribe((res) => {   
            $('.ajax-loader').hide();

         if(res.message == 'success'){
               this.toastr.success('Patient Details Updated');
              }
            }, error => {
                 $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
          if(this.planLength == 'MONTHLY') {
            this.renew_date=this.datePipe.transform(new Date(this.start_date.getFullYear()+1,this.start_date.getMonth(),this.start_date.getDate()), 'dd-MM-y');
            this.next_date=this.datePipe.transform(new Date(this.start_date.getFullYear(),this.start_date.getMonth()+1,this.start_date.getDate()), 'dd-MM-y');
          }
          else if(this.planLength == 'YEARLY'){
            this.renew_date=this.datePipe.transform(new Date(this.start_date.getFullYear()+1,this.start_date.getMonth(),this.start_date.getDate()), 'dd-MM-y');
            this.next_date=this.datePipe.transform(new Date(this.start_date.getFullYear()+1,this.start_date.getMonth(),this.start_date.getDate()), 'dd-MM-y');
          }
         }
        }
        else if(res.status == '401'  || res.message == 'error'){
              this._cookieService.removeAll();
              this.router.navigateByUrl('/login');
           }
    }, error => {
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    }    
    );
  }

  log_appointment() {
    this.patientLog = this.rows[0]['id']+"_"+this.rows[0]['sub_patients_type'];
    if(this.patientLog) {
     $('.ajax-loader').show();
    this.patientInfoService.log_appointment(this.patient_id,this.member_plan_id,this.patientLog).subscribe((res) => {   
        if(res.message == 'success'){
          $('.ajax-loader').hide();
           this.toastr.success('Appointment Logged .');
           this.getAppointments();
          }
          else if(res.status == '401'  || res.message == 'error'){
            this._cookieService.removeAll();
           this.router.navigateByUrl('/login');
          }
        }, error => {
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
         else if(res.status == '401'  || res.message == 'error'){
               this._cookieService.removeAll();
                this.router.navigateByUrl('/login');
            }
     }, error => {
          $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
            this.toastr.success( 'Document Uploaded');
               this.getPatientContract();
            }
            else if(res.status == '401' || res.message == 'error'){
               this._cookieService.removeAll();
               this.router.navigateByUrl('/login');
           }
           }, error => {
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
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
       else if(res.status == '401' || res.message == 'error'){
             this._cookieService.removeAll();
              this.router.navigateByUrl('/login');
          }
   }, error => {
        $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
   }    
   );
  }

  public deleteBenefitsUsed(row) {
    if(confirm("Are you sure to delete this plan?")) {
       if(this.benefit[row]['patients_benefits_id']) {
         this.patientInfoService.deleteBenefitsUsed(this.benefit[row]['patients_benefits_id']).subscribe((res) => {
          if(res.message == 'success'){

           //this.notifier.notify( 'success', 'Plan Removed' ,'vertical');
           this.toastr.success('Plan Removed.');
         //    this.getBenefitsUsed();
          }
       }, error => {
            $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
       }    
       );
       }
       else {
         this.rows.splice(row, 1);
         this.rows = [...this.rows];
       }
     }
}

private sendDefaultersemail(defaulter_name, defaulter_email,defaulter_id) {
$('.ajax-loader').show();  
    this.defaultersService.sendDefaultersemail(defaulter_id,defaulter_name,defaulter_email,'manual',this.member_plan_id).subscribe((res) => {
          $('.ajax-loader').hide();  
          if(res.message == 'success'){
            this.toastr.success('Update Card Link Sent.');
          }
           else if(res.status == '401' || res.message == 'error'){
              this._cookieService.removeAll();
              this.router.navigateByUrl('/login');
           }
      }, error => {
           $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
      }    
      );
    }


}