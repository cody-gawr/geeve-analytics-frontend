import { Component,OnInit, AfterViewInit,Inject  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ProfileSettingsService } from './profile-settings.service';
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import { NotifierService } from 'angular-notifier';
import { Router, NavigationEnd, Event  } from '@angular/router';
import { StripeInstance, StripeFactoryService } from "ngx-stripe";
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from '../layouts/full/header/header.service';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html'
})

export class DialogOverviewExampleDialogComponent {
  public contractURL:any;
  constructor(private fb: FormBuilder, private profileSettingsService: ProfileSettingsService,private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.contractURL="";
      }

  save(data) {
          if(data.patient_name != undefined){
           $('.ajax-loader').show(); 
           this.profileSettingsService.contractUpload(this.contractURL).subscribe((res) => {
           $('.ajax-loader').hide();    
           if(res.message == 'success'){
            this.contractURL = res.data;
            }  else if(res.status == '401'){
             // this._cookieService.put("username",'');
             // this._cookieService.put("email", '');
              //this._cookieService.put("token", '');
              //this._cookieService.put("userid", '');
              //this.router.navigateByUrl('/login');
           }
        }, error => {
         // this.warningMessage = "Please Provide Valid Inputs!";
        }
        ); 
    
     }
}

  onSubmit() {
    if(this.contractURL == undefined || this.contractURL==""){
      alert("Please Upload file");
      return false;
    }else{
      $('.ajax-loader').show();      
      this.profileSettingsService.updateContract(this.contractURL).subscribe((res) => {
      $('.ajax-loader').hide();      
          if(res.message == 'success'){
             this.dialogRef.close();
            }
             else if(res.status == '401'){
            /*  this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login'); */
           }
           }, error => {
        //  this.warningMessage = "Please Provide Valid Inputs!";
            }   
           ); 
        }
      }

  public fileToUpload;
  uploadImage(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    const extension = this.fileToUpload.name.split('.')[1].toLowerCase();
    if(extension !== "pdf"){
      alert('Please Upload PDF file');
      return null;
    }else
    {
      $('.ajax-loader').show();  
      let formData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.profileSettingsService.contractUpload(formData).subscribe((res) => {
        $('.ajax-loader').hide();
        if(res.message == 'success'){
           this.contractURL= res.data;
          }
        }); 
      }
  }
}






@Component({
  selector: 'app-formlayout',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
      elementsOptions: ElementsOptions = {
    };
    elements: Elements;
    card: StripeElement;

  public cardStyle = {
    base: {
      color: '#fff',
      fontWeight: 400,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      padding:'10px',

      ':focus': {
        color: '#fff',
      },

      '::placeholder': {
        color: '#698aaa',
      },

      ':focus::placeholder': {
        color: '#698aaa',
      },
    },
    invalid: {
      color: '#FF0000',
      ':focus': {
        color: '#FF0000',
      },
      '::placeholder': {
        color: '#fff',
      },
    },
  };


  public expStyle = {
    base: {
      color: '#fff',
      fontWeight: 400,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#fff',
      },

      '::placeholder': {
        color: '#698aaa',
      },

      ':focus::placeholder': {
        color: '#698aaa',
      },
    },
    invalid: {
      color: '#FF0000',
      ':focus': {
        color: '#FF0000',
      },
      '::placeholder': {
        color: '#FF0000',
      },
    },
  };

public cvcStyle = {
    base: {
      color: '#fff',
      fontWeight: 400,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#fff',
      },

      '::placeholder': {
        color: '#698aaa',
      },

      ':focus::placeholder': {
        color: '#698aaa',
      },
    },
    invalid: {
      color: '#FF0000',
      ':focus': {
        color: '#FF0000',
      },
      '::placeholder': {
        color: '#FF0000',
      },
    },
  };
 public token;
   stripeTest: FormGroup;
  private readonly notifier: NotifierService;
   public form: FormGroup;
  public cardNumber;
  public cardExpiry;
  public cardCvc;
   public formSettings: FormGroup;
   public formTerms: FormGroup;
   public clinic_id:any ={};
   public subscription_id;
          private warningMessage: string;
          public id:any ={};
          public clinicName:any =0;
          public contactName =0;
          public description;
            
          // public chartData: any[] = [];
     //      public address:any = {};
          
          public practice_size:any ={};
          options: FormGroup;
          public xero_link;
          public xeroConnect = false;
          public xeroOrganization='';
          public email;
          public user_image;
          public imageURL:any;
          public urlPattern=/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  constructor(private toastr: ToastrService,notifierService: NotifierService,private _cookieService: CookieService, private fb: FormBuilder,  private profileSettingsService: ProfileSettingsService,public dialog: MatDialog, private route: ActivatedRoute, private router: Router,private stripeService: StripeService,private headerService: HeaderService) {
    this.notifier = notifierService;
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }


  private checkPermission(role) { 
  this.headerService.checkPermission(role).subscribe((res) => {
       if(res.message == 'success'){
       }
        else if(res.status == '401'){
               localStorage.setItem('prpermissionmessage','Sorry! You are not authorized to access this section . Please contact clinic owner .') ;
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
    }, error => {
     // this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );

  }


  ngOnInit() {
    this.route.params.subscribe(params => {
    this.id = this.route.snapshot.paramMap.get("id");
    this.displayName = this._cookieService.get("display_name");
    this.email = this._cookieService.get("email");
    this.imageURL = this._cookieService.get("user_image");
 //   this.getprofileSettings();
    this.getPaymentDetails();
this.stripeService.setKey('pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc');
            this.stripeTest = this.fb.group({
            name: ['', [Validators.required]]
            });
            this.stripeService.elements(this.elementsOptions)
            .subscribe(elements => {
            this.elements = elements;
            // Only mount the element the first time
            if (!this.card) {
              this.cardNumber = this.elements.create('cardNumber', {
            style: this.cardStyle
          });
          this.cardExpiry = this.elements.create('cardExpiry', {
            style: this.expStyle
          });

            this.cardCvc = this.elements.create('cardCvc', {
            style: this.cvcStyle
          });

             this.cardNumber.mount('#example3-card-number');
             this.cardExpiry.mount('#example3-card-expiry');
             this.cardCvc.mount('#example3-card-cvc');   
            }
            });
    $('#title').html('Profile');
    $('.header_filters').addClass('hide_header');
        $('.sa_heading_bar').show();
         
         // this.checkXeroStatus();
     });
  

      this.form = this.fb.group({
      currentPassword: [null, Validators.compose([Validators.required])],
      newPassword: [null, Validators.compose([Validators.required, Validators.minLength(10),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
      repeatPassword: [null, Validators.compose([Validators.required])]      
    });


     this.formSettings = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      displayName: [null, Validators.compose([Validators.required])],
      // Website: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      // PhoneNo: [null, Validators.compose([Validators.required])],
      // Address: [null, Validators.compose([Validators.required])],
      // Specialties: [null, Validators.compose([Validators.required])],
      // practiceDesc: [null, Validators.compose([Validators.required])]   

    });
  this.formTerms = new FormGroup({
       terms: new FormControl()
    });
   this.checkPermission('settings');
  }
  public last4;
  getCardDetails() {
      this.profileSettingsService.getCardDetails(this.customer_id).subscribe((res) => {
        this.last4 = res.last4;
      }, error => {
      });
  }
  public customer_id;
  public last_invoic_id;
   buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
    .createToken(this.cardNumber, { name })
    .subscribe(obj => {
    if (obj.token) {
 this.token = obj.token.id;
      $('.ajax-loader').show();
    this.profileSettingsService.updateCardRetryPayment(this.token, this.customer_id,this.last_invoic_id).subscribe((res) => {
      $('.ajax-loader').hide();

           if(res.message == 'success'){
            this.getPaymentDetails();
            if(res.data == 'Payment Generated Successfully!') {
             Swal.fire(
                  '',
                  'Payment Generated Succesfully!',
                  'success'
                )
            }
            else if(res.data == 'Card Updated Successfully!') {
                Swal.fire(
                  '',
                  'Card Updated Successfully!',
                  'success'
                )
            }
           }
           else if(res.message == 'error'){
              Swal.fire(
                  '',
                  'Some issue with your card, Please try again!',
                  'error'
                )
           }
          }, error => {
          });
    } else {
      console.log("Error comes ");
    }
    });
    }

  // Sufix and prefix
  hide = true;
  getprofileSettings() {
  this.profileSettingsService.getprofileSettings().subscribe((res) => {
       if(res.message == 'success'){
        this.PhoneNo = res.data[0].phone_no;
        this.description = res.data[0].description;
        this.Address = res.data[0].address;
        this.Gender = res.data[0].gender;
        this.Specialties = res.data[0].specialties;
        this.Education = res.data[0].education;
        this.practiceDesc = res.data[0].practice_desc;
        this.Website = res.data[0].website;
        this.terms = res.data[0].terms;
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

  retryPayment() {
      $('.ajax-loader').show();
      this.profileSettingsService.retryPayment(this.customer_id,this.last_invoic_id).subscribe((res) => {
             $('.ajax-loader').hide();
             if(res.message == 'success'){
            this.getPaymentDetails();              
              Swal.fire(
                  '',
                  'Payment Generated Succesfully!',
                  'success'
                )
             }
             else if(res.message == 'error'){
                Swal.fire(
                  '',
                  'Your card is declined, Please change your card Details.',
                  'error'
                )
             }
            }, error => {
     });
  }

   getPaymentDetails() {
  this.profileSettingsService.getPaymentDetails().subscribe((res) => {
       if(res.message == 'success'){
        this.last_invoic_id = res.data.lastinvoiceid;
       // alert(res.data.lastinvoiceid);
        this.customer_id = res.data.customer_id; 
        this.subscription_id = res.data.subscr_id; 
        if(this.subscription_id)
          this.getCardDetails();
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

public displayName;
public display_name;

public PhoneNo;
public phone_no;


public Address;
public address;

public Gender;
public gender;

public Specialties;
public specialties;


public Education;
public education;

public practiceDesc;
public practice_desc;

public Website;
public website;

// public publishableKey;
// public publishable_key;

// public secretKey;
// public secret_key;
  goBack() {
      window.history.back();
  }

  onSubmitBasic() {
  this.displayName = $("#displayName").val();
  this.email = $("#email").val();
  this.imageURL = $("#imageURL").val();
      $('.ajax-loader').show();      

   this.profileSettingsService.updateprofileSettings(this.displayName, this.description, this.email,this.PhoneNo,this.Address,this.Gender,this.Specialties,this.Education,this.practiceDesc,this.Website,this.imageURL).subscribe((res) => {
      $('.ajax-loader').hide();      
       
       if(res.message == 'success'){
        let opts: CookieOptionsArgs = {
            expires: new Date('2030-07-19')
        };
        this._cookieService.put("display_name", this.displayName, opts);
        this._cookieService.put("email", this.email, opts);
        this.display_name = this.displayName;
        this.phone_no = this.PhoneNo;
        this.address = this.Address;
        this.gender = this.Gender;
        this.specialties = this.Specialties;
        this.education = this.Education;
        this.practice_desc = this.practiceDesc;
        this.website = this.Website;
        if(this.imageURL) {
        $(".suer_image_sidebar img").attr('src' , this.imageURL);
        this._cookieService.put("user_image", this.imageURL, opts);
      }
        $(".suer_text_sidebar").html(this.display_name.toUpperCase());
       // this.notifier.notify( 'success', 'Profile Settings Updated' ,'vertical');
         this.toastr.success('Profile Settings Updated .');   
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

  public errorLogin = false;
  public old_password_error = false;
  public errortext ="";
  public successLogin =false;
  public successtext ="";

public currentPassword;
public newPassword;
public repeatPassword;

public confirm_password_error = false;
public confirm_password_text = "";


onSubmitPassword() {
  this.errorLogin = false;
  this.errortext ="";
  this.successLogin = false;
  this.successtext ="";
  this.currentPassword = this.form.value.currentPassword;
  this.newPassword = this.form.value.newPassword;
  this.repeatPassword = this.form.value.repeatPassword;
  if(this.newPassword == this.repeatPassword) {
   this.profileSettingsService.updatePassword(this.currentPassword, this.newPassword).subscribe((res) => {
       if(res.message == 'success'){
        this.successLogin = true;
        this.confirm_password_error =false;
        this.confirm_password_text = "";
        this.old_password_error =false;
        this.toastr.success('Password changed successfully .');  
       }
       else{
        if(res.field=="old_password"){
          this.old_password_error = true;     
          this.confirm_password_error = false;
        }else if(res.field=="confirm_password"){
           this.old_password_error = false;
           this.confirm_password_error = true;
           this.confirm_password_text ="Password and confirm password should be same .";

        }else{
           this.errorLogin = true;
           this.errortext = res.data;
        }
        
        }
    }, error => {
      this.errorLogin = true;
      this.errortext = "Please Provide Valid Inputs!";
    }    
    );
 }
 else {
   this.confirm_password_error = true;
   this.confirm_password_text ="Password and confirm password should be same .";
 }
} 
  
public fileToUpload;
 uploadImage(files: FileList) {
    this.fileToUpload = files.item(0);

      /* First check for file type then check for size .*/
   if(this.fileToUpload.type=='image/png' || this.fileToUpload.type=='image/jpg' || this.fileToUpload.type=='image/jpeg') //10000 bytes means 10 kb
    {
        
    }else{
        alert("Invalid image. Allowed file types are jpg, jpeg and png only .");
        return false;
    }

    if(this.fileToUpload.size/1024/1024 > 2) //10000 bytes means 10 kb
    {
         alert("Header image should not be greater than 2 MB .");
         return false;
    }


    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
      $('.ajax-loader').show();      

    this.profileSettingsService.logoUpload(formData).subscribe((res) => {
      $('.ajax-loader').hide();      
      if(res.message == 'success'){ 
        this.imageURL= res.data;

      }
    });
  }

public terms;
public errorTermstext;
public successTermstext;
onSubmitTerms() {
  this.errorLogin = false;
  this.errorTermstext ="";
  this.successLogin = false;
  this.successTermstext ="";
  this.terms =this.formTerms.value.terms;
  this.profileSettingsService.updateTerms(this.terms).subscribe((res) => {
       if(res.message == 'success'){
        this.successTermstext = res.data;
       }                                              
       else{
          this.errorTermstext = res.data;
        }
    }, error => {
      this.errorLogin = true;
      this.errortext = "Please Provide Valid Inputs!";
    }    
    );

  }




openDialog(): void {   
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {abc:'abc'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.toastr.success('Contract updated successfully .');
  //  this.notifier.notify( 'success', 'Contract updated successfully' ,'vertical');    
     if(result) { 

     }
    

  });
  }
 

}
