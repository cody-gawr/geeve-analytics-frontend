import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { ProfileSettingsService } from '../profile-settings.service';
import { environment } from '@/environments/environment';

@Component({
  selector: 'otp-confirm-dialog',
  templateUrl: 'otp-confirm-dialog.component.html',
  styleUrls: ['otp-confirm-dialog.component.scss'],
})
export class OtpConfirmDialog {
  private readonly otpFormGroup: FormGroup;
  public imageUrl = '';
  public formSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OtpConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService,
    private authService: ProfileSettingsService,
  ) {
    this.otpFormGroup = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });
    if (this.data?.MfaEnabled) {
      this.imageUrl = '';
    } else {
      this.imageUrl = environment.baseApiUrl + '/v1/common/generateQR';
    }
  }

  get OtpFormGroup(): FormGroup {
    return this.otpFormGroup;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.imageUrl) {
      this.enable2FA();
    } else {
      this.disable2FA();
    }
  }

  private clearForm(): void {
    this.otpFormGroup.reset();
    Object.keys(this.otpFormGroup.controls).forEach(key => {
      this.otpFormGroup.controls[key].setErrors(null);
    });
  }

  private setErrors(errors: any): void {
    Object.keys(errors).forEach(key => {
      this.otpFormGroup.controls[key].setErrors({ invalid: true });
    });
  }

  enable2FA() {
    const { otp } = this.otpFormGroup.getRawValue();
    this.authService.verifyCode(otp).subscribe({
      next: (res: any) => {
        const result = res.body;
        if (result.status) {
          this.imageUrl = '';
          this.toastrService.success(result?.message || 'OTP verified!');
          this.dialogRef.close(true);
        } else {
          this.toastrService.error(result?.message || 'Invalid Code!');
          this.setErrors({ otp: 'Invalid Code!' });
        }
      },
      error: error => {
        console.log('Error', error);
        this.toastrService.error(error?.error?.message || 'Invalid Code!');
        this.setErrors({ otp: 'Invalid Code!' });
      },
    });
  }

  disable2FA() {
    const { otp } = this.otpFormGroup.getRawValue();
    this.authService.verifyCode(otp, true).subscribe({
      next: (res: any) => {
        const result = res.body;
        if (!result.status) {
          this.toastrService.error(result?.message || 'Invalid Code!');
          this.setErrors({ otp: 'Invalid Code!' });
        } else {
          this.dialogRef.close(false);
        }
      },
      error: error => {
        console.log('Error', error);
        this.toastrService.error(error?.error?.message || 'Invalid Code!');
        this.setErrors({ otp: 'Invalid Code!' });
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
