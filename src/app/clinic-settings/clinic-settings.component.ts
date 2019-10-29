import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ClinicSettingsService } from './clinic-settings.service';
import { ActivatedRoute } from "@angular/router";
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import { NotifierService } from 'angular-notifier';
import {forwardRef, Input, ViewChild, ElementRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
@Component({
  selector: 'app-formlayout',
  templateUrl: './clinic-settings.component.html',
  styleUrls: ['./clinic-settings.component.scss']
})



export class ClinicSettingsComponent implements OnInit {


afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "1",
    uploadAPI:  {
      url:"http://localhost/jeevemembers/server/Practices/uploadSliderImages",
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


  private warningMessage: string;
  public id:any ={};
  public clinicName:any =0;
  public contactName =0;
  public phoneNo:any ={};
  public publishable_key:any ={};
  public secret_key:any={};
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


  // public practice_size:any ={};
  options: FormGroup;
  constructor(notifierService: NotifierService,private _cookieService: CookieService, private fb: FormBuilder,  private clinicSettingsService: ClinicSettingsService, private route: ActivatedRoute) {
    this.notifier = notifierService;
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
      http://localhost/jeevemembers/server/Clinics/getClinicInfo?token=8ea56ecf9b5e77ca4cde3c70474c1218&user_id=40&clinic_id=32 (GET)
      $('#title').html('Clinic Settings');
       $('.header_filters').addClass('hide_header');
       

     });
    
     this.form = this.fb.group({
      clinicName: [null, Validators.compose([Validators.required])],
      contactName: [null, Validators.compose([Validators.required])],
      phoneNo: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      publishable_key: [null, Validators.compose([Validators.required])],
      secret_key: [null, Validators.compose([Validators.required])],
      // practice_size: [null, Validators.compose([Validators.required])]
    

    });

     this.formLanding = this.fb.group({
      headerTitle: [null, Validators.compose([Validators.required])],
      headerDescription: [null, Validators.compose([Validators.required])],
      facebook: [null, Validators.compose([Validators.required])],
      twitter: [null, Validators.compose([Validators.required])],
      linkedin: [null, Validators.compose([Validators.required])],
      instagram: [null, Validators.compose([Validators.required])],

    });


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
  
  getClinicSettings() {
  this.clinicSettingsService.getClinicSettings(this.id).subscribe((res) => {
       if(res.message == 'success'){
        this.clinicName = res.data[0].clinicName;
        this.contactName = res.data[0].contactName;
        this.address = res.data[0].address;
        this.phoneNo = res.data[0].phoneNo;
        this.publishable_key = res.data[0].publishable_key;
        this.secret_key = res.data[0].secret_key;
         // console.log(res);
        // this.practice_size = res.data[0].practice_size;
        this.imageURL = res.data[0].logo;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }
  getClinicLandingPageSettings() {

    this.clinicSettingsService.getClinicLandingPageSettings(this.id).subscribe((res) => {

     if(res.message == 'success'){
        if(res.data[0].header_info!=null){
         const headingSettings=JSON.parse(res.data[0].header_info);
         this.headerTitle = headingSettings.headerTitle;
         this.headerDescription = headingSettings.headerDescription;
         this.headerImageURL = headingSettings.image;
        }
        if(res.data[0].social_info!=null){
         const socialSettings=JSON.parse(res.data[0].social_info);
         this.facebook =socialSettings.facebook;
         this.twitter  =socialSettings.twitter;
         this.linkedin =socialSettings.linkedin;
         this.instagram =socialSettings.instagram;
        }
        if(res.data[0].slider_info!=null){
         const sliderImagesData=res.data[0].slider_info;
         this.sliderImages =JSON.parse(sliderImagesData);
         }

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
      $('.ajax-loader').show();

  // this.practice_size = this.form.value.practice_size;

   this.clinicSettingsService.updateClinicSettings(this.id, this.clinicName,this.address,this.contactName,this.phoneNo,this.publishable_key,this.secret_key,this.imageURL).subscribe((res) => {
      $('.ajax-loader').hide();
    
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Clinic Settings Updated' ,'vertical');
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }

  onSettingsSubmit() {

 /* alert(this.formLanding.value.headerTitle);
  if(this.formLanding.value.headerTitle=="")
  {
    return false;
  } */
  this.header_info ={};
  this.header_info.headerTitle=this.formLanding.value.headerTitle;
  this.header_info.headerDescription=this.formLanding.value.headerDescription;
  this.header_info.image = this.headerImageURL;
  this.social_info ={};
  this.social_info.facebook = this.formLanding.value.facebook;
  this.social_info.twitter  = this.formLanding.value.twitter;
  this.social_info.linkedin = this.formLanding.value.linkedin;
  this.social_info.instagram = this.formLanding.value.instagram;


  this.clinicSettingsService.updateLandingPageSettings(this.id,JSON.stringify(this.header_info),JSON.stringify(this.social_info)).subscribe((res) => {
       if(res.message == 'success'){
        this.notifier.notify( 'success', 'Clinic Settings Updated' ,'vertical');
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    ); 
  }

 saveSliderImages(){
 this.clinicSettingsService.updateSliderImagesSettings(this.id,JSON.stringify(this.sliderImages)).subscribe((res) => {
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
     console.log(this.sliderImages);
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
      console.log(this.sliderImages.length);
      if(this.sliderImages.length==1){
         alert("This image can't be deleted as atleast one image is required .")
         return false; 
       }
       
       this.clinicSettingsService.removeSliderImage(this.id,keyUrl,index).subscribe((res) => {
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



}
