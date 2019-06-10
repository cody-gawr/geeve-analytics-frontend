import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ClinicSettingsService } from './clinic-settings.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-formlayout',
  templateUrl: './clinic-settings.component.html',
  styleUrls: ['./clinic-settings.component.scss']
})
export class ClinicSettingsComponent implements OnInit {
   public form: FormGroup;
   public errorLogin = false;
   public clinic_id:any ={};

          private warningMessage: string;
  
          public id:any ={};

          public clinicName:any =0;
          public contactName =0;
          // public chartData: any[] = [];
          public address:any = {};
          public practice_size:any ={};

  options: FormGroup;

  constructor(private fb: FormBuilder,  private clinicSettingsService: ClinicSettingsService, private route: ActivatedRoute) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }
  ngOnInit() {
      this.route.params.subscribe(params => {
    this.id = this.route.snapshot.paramMap.get("id");
      this.getClinicSettings();
     });
    
     this.form = this.fb.group({
      clinicName: [null, Validators.compose([Validators.required])],
      contactName: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      practice_size: [null, Validators.compose([Validators.required])]

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
  this.clinicSettingsService.getClinicSettings('23',this.id).subscribe((res) => {
    console.log(res);
       if(res.message == 'success'){
        this.clinicName = res.data[0].clinicName;
        this.contactName = res.data[0].contactName;
        this.address = res.data[0].address;
        this.practice_size = res.data[0].practice_size;

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
  this.practice_size = this.form.value.practice_size;
   this.clinicSettingsService.updateClinicSettings(this.id, this.clinicName,this.contactName,  this.address,this.practice_size ).subscribe((res) => {
    console.log(res);
       if(res.message == 'success'){
        alert('Clinic Settings Updated');
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );


  } 
}
