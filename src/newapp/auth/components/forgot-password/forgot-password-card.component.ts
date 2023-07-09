import { ControlsOf } from '../../../models';
import { ForgotPassword } from '../../../models/auth';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-forgot-password-card',
  templateUrl: './forgot-password-card.component.html',
  styleUrls: ['../login-card/login-card.component.scss']
})
export class ForgotPasswordCardComponent implements OnInit {
  formGroup: FormGroup<ControlsOf<ForgotPassword>>;

  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      })
    });
  }

  getErrorMessage = (formControlName: string): string => {
    switch (formControlName) {
      case 'email':
        return 'The email is required or incorrect.';
      default:
        return 'The field is required.';
    }
  };

  ngOnInit() {}

  forgot = (): void => {};
}
