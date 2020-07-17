import { Component,OnInit,Inject, EventEmitter,Output, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { PatientPaymentinfoService } from './patient-paymentinfo.service';
import { DefaultersService } from '../defaulters/defaulters.service';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { DatePipe,formatDate } from '@angular/common';
import { environment } from "../../environments/environment";
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { empty } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

const data: any = [];
@Component({
  selector: 'app-formlayout',
  templateUrl: './patient-paymentinfo.component.html',
  styleUrls: ['./patient-paymentinfo.component.scss']
})
export class PatientPaymentinfoComponent implements OnInit {
  private readonly notifier: NotifierService;
  public formPatient: FormGroup;
  public form: FormGroup;
  private apiUrl = environment.apiUrl;
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  public id:any ={};
  public imageURL:any;
  public imagepreviewURL:any;
  public patient_amount : any;
  public member_plan_id:any;
  public total_subpatient:any;
  public contract_url:any;
  public plan_name:any;
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

constructor(private toastr: ToastrService,notifierService: NotifierService, private defaultersService: DefaultersService, private fb: FormBuilder,public dialog: MatDialog,  private patientPaymentinfoService: PatientPaymentinfoService, private route: ActivatedRoute,private _cookieService: CookieService, private router: Router,breakpointObserver: BreakpointObserver,private datePipe: DatePipe) {
  this.notifier = notifierService;
   if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        this.token_id = this._cookieService.get("childid");
        else
        this.token_id= this._cookieService.get("userid");
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getInofficePlan();
    this.getPaymentHistory();
    this.getSubscriptionStripe();
   
    // $('.header_filters').removeClass('hide_header');
      this.route.params.subscribe(params =>  {
        $('#title').html('Patient Plan Detail');
     });

     this.formPatient = this.fb.group({
      patient_name: [null, Validators.compose([Validators.required])],
      patient_address: [Validators.compose([Validators.required])],
      patient_dob: [null, Validators.compose([Validators.required])],
      // patient_age: [null, Validators.compose([Validators.required])],
      patient_gender: [null, Validators.compose([Validators.required])],
      patient_phone_no: [null, Validators.compose([Validators.required])],
      patient_home_phno: [null, Validators.compose([Validators.required])],
      patient_status: [null, Validators.compose([Validators.required])]
    });

     this.form = this.fb.group({
     
    });
   }


public subscrData;
    private getSubscriptionStripe() {
      if(this.id) {
      this.patientPaymentinfoService.getSubscriptionStripe(this.id).subscribe((res) => {
           if(res.message == 'success'){
            this.subscrData = res.data.data;
            console.log(this.subscrData);
           }
        }, error => {
             $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
        }    
        );
        }
  }
isDecimal(value) {
 if(typeof value != 'undefined')
  {
    if(String(value).includes("."))
    return true;
  }
}
  onSubmit() {
    if(this.imagepreviewURL == undefined){
      Swal.fire("","Please upload file .");
    
    }else{
      $('.ajax-loader').show();      
        this.patientPaymentinfoService.updatePayment(this.id,this.imagepreviewURL).subscribe((res) => {
      $('.ajax-loader').hide();      
          if(res.message == 'success'){
              this.toastr.success('Document Uploaded .');
              this.getInofficePlan();
            }
             else if(res.status == '401'){
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
      public previewSignedContract;
  uploadImage(files: FileList) {
    this.fileToUpload = files.item(0);
    const extension = this.fileToUpload.name.split('.')[1].toLowerCase();
   if(extension.trim() == "pdf" || extension.trim() == "doc" || extension.trim() == "jpg" || extension.trim() == "jpeg" || extension.trim() == "png" ){
    if(this.fileToUpload.size/1024/1024 > 4) //10000 bytes means 10 kb
    {
         Swal.fire('File too large.','Document should not be greater than 4 MB..');
         return false;
    }

    $('.ajax-loader').show();  
    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('clinic_id', this.clinic_id);

    this.patientPaymentinfoService.contractUpload(formData).subscribe((res) => {
    $('.ajax-loader').hide();      

     if(res.message == 'success'){
        this.imagepreviewURL= res.data;
       // this.previewSignedContract = this.apiUrl +"/Clinics/getUploadedSignedContract?user_id="+this._cookieService.get("userid")+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id+"&code="+encodeURIComponent(window.btoa(this.imagepreviewURL));
        //$(".uploadsignedContract").hide();
        this.onSubmit();
      }
    });
    }else
    {
      Swal.fire('Invalid file type.','Allowed files are pdf, doc, jpg, jpeg and png only.');
      return null;

     }
  }

deleteSignedDocImage(){
  this.imagepreviewURL="";
  $(".contractFile").val('');
  $(".uploadsignedContract").show();
}

//public plan_name;
public plan_description;
public total_amount;
public setup_fee;
public deposite_amount;
public balance_amount;
public payment_frequency;
public monthly_weekly_payment;
public duration;
public start_date;
public due_date;
public uploadedSignedContract='';
public token_id;
public patient_email :any;

  getInofficePlan() {
  
    this.patientPaymentinfoService.getInofficePlan(this.id).subscribe((res) => {
       if(res.message == 'success'){
      
        this.patient_name=res.data[0]['patient']['patient_name'];
        this.patient_id=res.data[0]['patient']['id'];
        this.patient_email=res.data[0]['patient']['patient_email'];
        this.patient_status=res.data[0]['patient']['patient_status'];
        this.clinic_id=res.data[0]['patient']['clinic_id'];
        this.plan_name=res.data[0]['plan_name'];
        this.plan_description=res.data[0]['plan_description'];
        this.total_amount=res.data[0]['total_amount'];
        this.setup_fee = res.data[0]['setup_fee'];
        this.deposite_amount=res.data[0]['deposite_amount'];
        this.balance_amount=res.data[0]['balance_amount'];
        this.payment_frequency=res.data[0]['payment_frequency'];
        this.monthly_weekly_payment=res.data[0]['monthly_weekly_payment'];
        this.duration=res.data[0]['duration'];
        //this.start_date=res.data[0]['start_date'];
        this.start_date=res.data[0]['created'];
        this.due_date=res.data[0]['due_date'];  

        this.imageURL=res.data[0]['contract'];

        this.uploadedSignedContract = this.apiUrl +"/Clinics/getUploadedSignedContract?user_id="+this._cookieService.get("userid")+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id+"&code="+encodeURIComponent(window.btoa(this.imageURL));
        if(this.imageURL=="" || this.imageURL==null){
          //alert("here");
           this.getContract();
        }
        this.getPaymentHistory();
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

 getContract(){
      this.patientPaymentinfoService.getContract(this.id).subscribe((res) => { 
       $('.ajax-loader').hide();     
          if(res.message == 'success'){
              this.imageURL =res.contract;        
              this.uploadedSignedContract = this.apiUrl +"/Clinics/getUploadedSignedContract?user_id="+this._cookieService.get("userid")+"&token="+this._cookieService.get("token")+"&token_id="+this.token_id+"&code="+encodeURIComponent(window.btoa(this.imageURL));
          } else if(res.status == '401'){
             /* this._cookieService.put("username",'');
               this._cookieService.put("email", '');
               this._cookieService.put("token", '');
               this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login'); */
           } 
          }, error => {
           //      $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
          });
  }
  getPaymentHistory() {
    this.patientPaymentinfoService.getPaymentHistory(this.id).subscribe((res) => {
       if(res.message == 'success'){
        this.payment = res.data;
        // if(res.data)
        // this.payment_plan_name=res.data['member_plan']['planName'];
        }
        else if(res.status == '401'){
          this._cookieService.put("username",'');
          this._cookieService.put("email", '');
          this._cookieService.put("token", '');
          this._cookieService.put("userid", '');
          this.router.navigateByUrl('/login');
      }
    }, error => {
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    }    
    );
  }

private sendDefaultersemail(defaulter_name, defaulter_email,defaulter_patient_id,deafulter_plan_id) {
 $('.ajax-loader').show();     
    this.defaultersService.sendDefaultersemail(defaulter_patient_id,defaulter_name,defaulter_email,'inoffice',deafulter_plan_id).subscribe((res) => {
      console.log(res);
          if(res.message == 'success'){
 $('.ajax-loader').hide();     
             this.toastr.success('Update Card Link Sent.');
          }
           else if(res.status == '401'){
            $('.ajax-loader').hide();     
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