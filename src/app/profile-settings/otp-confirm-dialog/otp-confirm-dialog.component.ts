import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';

import { ProfileSettingsService } from '../profile-settings.service';
import { NotificationService } from '@/newapp/shared/services/notification.service';

@Component({
  selector: 'otp-confirm-dialog',
  templateUrl: 'otp-confirm-dialog.component.html',
})
export class OtpConfirmDialog {
  verifyCode: string;
  isInvalid = false;
  constructor(
    public dialogRef: MatDialogRef<OtpConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifyService: NotificationService,
    private profileSettingsService: ProfileSettingsService,
  ) {

  }
  disable2FA() {
    if(this.verifyCode){
      this.profileSettingsService.verifyCode(this.verifyCode, true).subscribe({
        next: res => {
          const result = res.body;
          if(result.status){
            this.dialogRef.close(result.status);
          }else{
            this.isInvalid = true;
          }
        },
        error: error => {
          console.log('Error', error);
          this.notifyService.showError(error?.error?.message || 'Invalid Code!');
          this.isInvalid = true;
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
