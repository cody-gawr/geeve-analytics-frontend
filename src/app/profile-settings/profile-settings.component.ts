import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ProfileSettingsService } from './profile-settings.service';
import { ActivatedRoute } from "@angular/router";
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-formlayout',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  private readonly notifier: NotifierService;
   public form: FormGroup;

   public formSettings: FormGroup;
   public formTerms: FormGroup;
   public clinic_id:any ={};

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

  constructor(notifierService: NotifierService,private _cookieService: CookieService, private fb: FormBuilder,  private profileSettingsService: ProfileSettingsService, private route: ActivatedRoute) {
    this.notifier = notifierService;
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
    this.id = this.route.snapshot.paramMap.get("id");
    this.displayName = this._cookieService.get("display_name");
    this.email = this._cookieService.get("email");
    this.imageURL = this._cookieService.get("user_image");
    this.getprofileSettings();

    $('#title').html('Profile Settings');
    $('.header_filters').addClass('hide_header');
        $('.sa_heading_bar').show();
         
         // this.checkXeroStatus();
     });
  

      this.form = this.fb.group({
      currentPassword: [null, Validators.compose([Validators.required])],
      newPassword: [null, Validators.compose([Validators.required])],
      repeatPassword: [null, Validators.compose([Validators.required])]      
    });


     this.formSettings = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      displayName: [null, Validators.compose([Validators.required])],
      Website: [null, Validators.compose([Validators.pattern(this.urlPattern)])],
      PhoneNo: [null, Validators.compose([Validators.required])],
      Address: [null, Validators.compose([Validators.required])],
      Specialties: [null, Validators.compose([Validators.required])],
      practiceDesc: [null, Validators.compose([Validators.required])]
    

    });
  this.formTerms = new FormGroup({
       terms: new FormControl()
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
        this._cookieService.put("user_image", this.imageURL, opts);
        this.display_name = this.displayName;
        this.phone_no = this.PhoneNo;
        this.address = this.Address;
        this.gender = this.Gender;
        this.specialties = this.Specialties;
        this.education = this.Education;
        this.practice_desc = this.practiceDesc;
        this.website = this.Website;
        // this.publishable_key = this.publishableKey;
        // this.secret_key = this.secretKey;
        this.notifier.notify( 'success', 'Profile Settings Updated' ,'vertical');
    
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  } 

public errorLogin = false;
  public errortext ="";
  public successLogin =false;
  public successtext ="";

public currentPassword;
public newPassword;
public repeatPassword;
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
        this.successtext = res.data;
       }
       else{
          this.errorLogin = true;     
          this.errortext = res.data;
        }
    }, error => {
      this.errorLogin = true;
      this.errortext = "Please Provide Valid Inputs!";
    }    
    );
 }
 else {
  this.errorLogin = true;
  this.errortext ="Password doesn't Match!";
 }
  } 
  
public fileToUpload;
 uploadImage(files: FileList) {
    this.fileToUpload = files.item(0);
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

}
