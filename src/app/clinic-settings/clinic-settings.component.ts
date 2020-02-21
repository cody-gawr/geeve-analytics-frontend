import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ClinicSettingsService } from './clinic-settings.service';
import { ActivatedRoute } from "@angular/router";
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import { NotifierService } from 'angular-notifier';
import {forwardRef, Input, ViewChild, ElementRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { environment } from "../../environments/environment";
import { Router, NavigationEnd, Event  } from '@angular/router';
@Component({
  selector: 'app-formlayout',
  templateUrl: './clinic-settings.component.html',
  styleUrls: ['./clinic-settings.component.scss']
})



export class ClinicSettingsComponent implements OnInit {
 private apiUrl = environment.apiUrl;
public connectedStripe=false;
 public formTerms: FormGroup;
afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "1",
    uploadAPI:  {
      url:this.apiUrl+"/Practices/uploadSliderImages",
    },
    theme: "dragNDrop",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
    }     
};

   private readonly notifier: NotifierService;
   public form: FormGroup;
   public formLanding: FormGroup;
   public errorLogin = false;
   public clinic_id:any ={};
   private homeUrl = environment.homeUrl;

  private warningMessage: string;
  public id:any ={};
  public clinicName:any =0;
  public contactName =0;
  public phoneNo:any ={};
  public publishable_key:any ='';
  public secret_key:any='';
  public logo;
  public imageURL:any;
  // public chartData: any[] = [];
  public address:any = {};

  public headerTitle:string;
  public headerDescription:string;
  public headerImageURL:any;
  public header_info:any ={};

  public facebook:string;
  public twitter:string;
  public linkedin:string;
  public instagram:string;
  public social_info:any ={};
  public sliderImages = [];
  public clinicTagLine:any;
  public DefaultLogo :any;
  public DefaultHeaderImage :any;
  public urlPattern=/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  // public practice_size:any ={};
  options: FormGroup;
  constructor(notifierService: NotifierService,private _cookieService: CookieService, private fb: FormBuilder,  private clinicSettingsService: ClinicSettingsService, private route: ActivatedRoute,private router: Router) {
    this.notifier = notifierService;
    this.DefaultLogo=this.homeUrl+"/assets/img/logo.png";
    this.DefaultHeaderImage=this.homeUrl+"/assets/img/headimage.jpg";
    
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }
  ngOnInit() {
      this.route.params.subscribe(params => {
      this.id = this.route.snapshot.paramMap.get("id");
      this.getClinicSettings();
      this.getClinicLandingPageSettings();
      this.getStripeAuthorization();
      $('#title').html('Clinic Settings');
      $('.header_filters').addClass('hide_header');
       

     });
    
     this.form = this.fb.group({
      clinicName: [null, Validators.compose([Validators.required])],
      phoneNo: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      clinicEmail: [null, Validators.compose([Validators.required])],      
    });

     this.formLanding = this.fb.group({
      headerTitle: [null, Validators.compose([Validators.required])],
      headerDescription: [null, Validators.compose([Validators.required])],
      facebook: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      twitter: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      linkedin: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      instagram: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      // clinicTagLine :[null, Validators.compose([Validators.required])]

    });

  this.formTerms = new FormGroup({
       terms: new FormControl()
    });
  }
  goBack() {
      window.history.back();
  }
  // For form validator
  email = new FormControl('', [Validators.required, Validators.email]);


  // Sufix and prefix
  hide = true;

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  connectStripe() {
      var win = window.open(this.linkStripe, "MsgWindow", "width=600,height=600");
      var self = this;
      var timer = setInterval(function() { 
        if(win.closed) {
            self.getClinicSettings();
            clearTimeout(timer);            
        }
      }, 1000);
  }
disconnectStripe() {
    this.clinicSettingsService.disconnectStripe(this.id).subscribe((res) => {
       if(res.message == 'success'){
       this.connectedStripe=false;
       } 
    }, error => {
      this.errortext = "Please Provide Valid Inputs!";
    });
}
public terms;
public errorTermstext;
public successTermstext;
public errortext;
onSubmitTerms() {
  this.errorTermstext ="";
  this.successTermstext ="";
  this.terms =this.formTerms.value.terms;
  this.clinicSettingsService.updateTerms(this.id, this.terms).subscribe((res) => {
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Content Updated successfully' ,'vertical');
       }                                              
       else{
          this.errorTermstext = res.data;
        }
    }, error => {
      this.errortext = "Please Provide Valid Inputs!";
    });
  } 
public stripe_account_id;
public user_id;
public clinicEmail;

  getClinicSettings() {
    $('.ajax-loader').show(); 
  this.clinicSettingsService.getClinicSettings(this.id).subscribe((res) => {
    $('.ajax-loader').hide(); 
       if(res.message == 'success'){
        this.clinic_id = res.data[0].id;
        this.user_id = res.data[0].user_id;
        this.clinicName = res.data[0].clinicName;
        this.contactName = res.data[0].contactName;
        this.clinicEmail = res.data[0].clinicEmail;
        this.address = res.data[0].address;
        this.phoneNo = res.data[0].phoneNo;
        this.stripe_account_id = res.data[0].stripe_account_id;
        if(this.stripe_account_id)
          this.connectedStripe = true;
        if(res.data[0].logo!=""){
          this.imageURL = res.data[0].logo;  
        }else{
           this.imageURL = this.DefaultLogo ; //Default Logo
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
  getClinicLandingPageSettings() {
     
    this.clinicSettingsService.getClinicLandingPageSettings(this.id).subscribe((res) => {
      console.log(res);

     if(res.message == 'success'){
        if(res.data.header_info!=null){
         const headingSettings=JSON.parse(res.data.header_info);
         this.headerTitle = headingSettings.headerTitle;
         this.headerDescription = headingSettings.headerDescription;
         if(headingSettings.image!=""){
            this.headerImageURL = headingSettings.image;
         }else{
           this.headerImageURL = this.DefaultHeaderImage; //Default Header Image 
         }        
        }
        else{
          this.headerTitle ='Wanna Checkup Your Smiling Teeth';
          this.headerDescription = 'The phrasal sequence of the Lorem Ipsum text is now so widespread and commonplace that many DTP programmes can generate dummy text using the starting sequence. The phrasal sequence of the Lorem Ipsum text is now so widespread and commonplace that many DTP programmes can generate dummy text using the starting sequence';
        }
        if(res.data.social_info!=null){
         const socialSettings=JSON.parse(res.data.social_info);
         this.facebook =socialSettings.facebook;
         this.twitter  =socialSettings.twitter;
         this.linkedin =socialSettings.linkedin;
         this.instagram =socialSettings.instagram;
         this.terms= res.data.terms;
        }
        if(res.data.slider_info!=null){
          const sliderImagesData=res.data.slider_info;
          this.sliderImages =JSON.parse(sliderImagesData);
         }
         this.clinicTagLine =res.data.clinicTagLine;
        
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

  onSubmit() {
  this.clinicName = this.form.value.clinicName;
  this.contactName = this.form.value.contactName;
  this.address = this.form.value.address;
  this.phoneNo = this.form.value.phoneNo;
  this.clinicEmail = this.form.value.clinicEmail;

  $('.ajax-loader').show();
   this.clinicSettingsService.updateClinicSettings(this.id, this.clinicName,this.address,this.contactName,this.phoneNo,this.clinicEmail,this.imageURL).subscribe((res) => {
      $('.ajax-loader').hide();
    
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Clinic Settings Updated' ,'vertical');
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

  onSettingsSubmit() {
  $('.ajax-loader').show();   
  this.header_info ={};
  this.header_info.headerTitle=this.formLanding.value.headerTitle;
  this.header_info.headerDescription=this.formLanding.value.headerDescription;
  this.header_info.image = this.headerImageURL;
  this.social_info ={};
  this.social_info.facebook = this.formLanding.value.facebook;
  this.social_info.twitter  = this.formLanding.value.twitter;
  this.social_info.linkedin = this.formLanding.value.linkedin;
  this.social_info.instagram = this.formLanding.value.instagram;
  this.clinicTagLine = this.formLanding.value.clinicTagLine;
 
  this.clinicSettingsService.updateLandingPageSettings(this.id,JSON.stringify(this.header_info),JSON.stringify(this.social_info),this.clinicTagLine).subscribe((res) => {
    $('.ajax-loader').hide(); 
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Clinic Settings Updated' ,'vertical');
        this.getClinicLandingPageSettings();
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

 saveSliderImages(){
  $('.ajax-loader').show(); 
 this.clinicSettingsService.updateSliderImagesSettings(this.id,JSON.stringify(this.sliderImages)).subscribe((res) => {
  $('.ajax-loader').hide(); 
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Clinic Settings Updated' ,'vertical');
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    ); 

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
         alert("Logo image should not be greater than 2 MB .");
         return false;
    }

    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.clinicSettingsService.logoUpload(formData).subscribe((res) => {
      if(res.message == 'success'){
        this.imageURL= res.data;
       }
    });
  }

 public landingfileToUpload;
 uploadLandingPageImage(files: FileList) {
    this.landingfileToUpload = files.item(0);

      /* First check for file type then check for size .*/
   if(this.landingfileToUpload.type=='image/png' || this.landingfileToUpload.type=='image/jpg' || this.landingfileToUpload.type=='image/jpeg') //10000 bytes means 10 kb
    {
        
    }else{
        alert("Invalid image. Allowed file types are jpg, jpeg and png only .");
        return false;
    }

    if(this.landingfileToUpload.size/1024/1024 > 4) //10000 bytes means 10 kb
    {
         alert("Header image should not be greater than 4 MB .");
         return false;
    }

    let formData = new FormData();
    formData.append('file', this.landingfileToUpload, this.landingfileToUpload.name);
    this.clinicSettingsService.landingImageUpload(formData).subscribe((res) => {
      if(res.message == 'success'){
        this.headerImageURL= res.data;
       }
    });
  }

/*After Successfully Uploading files, Handle response*/
SliderImagesUpload(files:any)
{ 
  const responseStatus =files.status;
  if(responseStatus==200)
  {
    var finalResp =JSON.parse(files.response);
    /*Save In Db under slider_info */
    if(finalResp.data)
    {
     if(this.sliderImages==null)
     {
       this.sliderImages= finalResp.data;
     }else{
       this.sliderImages =this.sliderImages.concat(finalResp.data); 
     }     
    }
  }

}
removeSliderImage(keyUrl,index){

    if(confirm("Are you sure you want to remove this image from slider ?"))
    {
      if(this.sliderImages.length==1){
         alert("This image can't be deleted as atleast one image is required to run the slider.")
         return false; 
       }
        $('.ajax-loader').show(); 
       this.clinicSettingsService.removeSliderImage(this.id,keyUrl,index).subscribe((res) => {
         $('.ajax-loader').hide(); 
        this.getClinicLandingPageSettings();
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Removed Slider Image' ,'vertical');        
       }
     }, error => {
       this.warningMessage = "Please Provide Valid Inputs!";
      }    
     );

    }else{
      
      return false;
    } 
}

public linkStripe;
getStripeAuthorization(){ 
 this.clinicSettingsService.getStripeAuthorization(this.id).subscribe((res) => {
       if(res.message == 'success'){
        this.linkStripe = res.data;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    ); 

 }

}
