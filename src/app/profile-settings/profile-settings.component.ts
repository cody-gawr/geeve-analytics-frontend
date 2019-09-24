import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ProfileSettingsService } from './profile-settings.service';
import { ActivatedRoute } from "@angular/router";
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";

@Component({
  selector: 'app-formlayout',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
   public form: FormGroup;

   public clinic_id:any ={};

          private warningMessage: string;
          public id:any ={};
          public clinicName:any =0;
          public contactName =0;
          // public chartData: any[] = [];
          public address:any = {};
          public practice_size:any ={};
          options: FormGroup;
          public xero_link;
          public xeroConnect = false;
          public xeroOrganization='';
          public email;
  constructor(private _cookieService: CookieService, private fb: FormBuilder,  private profileSettingsService: ProfileSettingsService, private route: ActivatedRoute) {
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
    //  this.getprofileSettings();
          $('#title').html('Profile Settings');
      $('.header_filters').addClass('hide_header'); 
         // this.checkXeroStatus();
     });
  

      this.form = this.fb.group({
      currentPassword: [null, Validators.compose([Validators.required])],
      newPassword: [null, Validators.compose([Validators.required])],
      repeatPassword: [null, Validators.compose([Validators.required])]      
    });
  }

  // Sufix and prefix
  hide = true;


  getprofileSettings() {
  this.profileSettingsService.getprofileSettings(this.id).subscribe((res) => {
       if(res.message == 'success'){
        this.displayName = res.data[0].displayName;
        this.email = res.data[0].email;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }

public displayName;
public display_name;
public imageURL:any;
  onSubmitBasic() {
  this.displayName = $("#displayName").val();
  this.email = $("#email").val();
  this.imageURL = $("#imageURL").val();

   this.profileSettingsService.updateprofileSettings(this.displayName, this.email, this.imageURL).subscribe((res) => {
       if(res.message == 'success'){
        let opts: CookieOptionsArgs = {
            expires: new Date('2030-07-19')
        };
        this._cookieService.put("display_name", this.displayName, opts);
        this._cookieService.put("user_image", this.imageURL, opts);
        this.display_name = this.displayName;
        alert('Profile Settings Updated');
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
    console.log(this.fileToUpload);
    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.profileSettingsService.logoUpload(formData).subscribe((res) => {
      if(res.message == 'success'){
        this.imageURL= res.data;
      }
    });
  }




}
