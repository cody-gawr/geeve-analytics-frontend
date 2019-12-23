import { Component, Inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { RegisterService } from './register.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {style, state, animate, transition, trigger} from '@angular/animations';
const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
      //  style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      // transition(':leave', [
      //   animate('400ms ease-in', style({transform: 'translateX(-100%)'}))
      // ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public errorLogin = false;
  public errorLoginText = '';
  public successLogin = false;
  public successLoginText = '';
  public id:any ={};
  public plan_id;
  public clinic_id;
  public user_id;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<RegisterComponent>,private fb: FormBuilder, private router: Router, private registerService: RegisterService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = this.fb.group({
      patient_email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      patient_name: [
        null,
        Validators.compose([Validators.required])
      ],
      terms: [
        null,
        Validators.compose([Validators.requiredTrue])
      ],patient_phone_no: [
        null,
        Validators.compose([Validators.required,
        Validators.pattern("^[0-9]*$")])
      ]
    });
    this.terms= this.defaults.terms.replace(/<(.|\n)*?>/g, '');

  }
  public terms;
  public warningMessage;

  public visible=true;
  loadTerms() {
    this.visible=false;
  }
   loadForm() {
    this.visible=true;
  }

  onSubmit() {
    $('.ajax-loader').show();
    this.registerService.checkPatientEmailExists(this.form.value.patient_email,this.defaults.clinic_id,this.defaults.user_id).subscribe((res) => {
          this.errorLogin = false;
          this.errorLoginText = '';
          this.successLogin = false;
          this.successLoginText = '';
           if(res.message == 'success'){
                   this.registerService.addPatient(this.form.value.patient_email,this.form.value.patient_name,this.form.value.patient_phone_no,this.defaults.clinic_id,this.defaults.user_id,this.defaults.plan_id,this.defaults.plan_amount).subscribe((res) => {
                  $('.ajax-loader').hide();
                    this.errorLogin = false;
                    this.errorLoginText = '';
                    this.successLogin = false;
                    this.successLoginText = '';
                     if(res.message == 'success'){
                          this.successLogin = true;
                           window.location.href = res.data.url;
                      }
                     else if(res.message == 'error'){
                        this.errorLogin  =true;
                        this.errorLoginText  =res.data;
                     }
                  }, error => {
              });
            }
           else if(res.message == 'error'){
             $('.ajax-loader').hide();
              this.errorLogin  =true;
              this.errorLoginText  ='Email already Exists!';
           }
        }, error => {
    });
  }
}
