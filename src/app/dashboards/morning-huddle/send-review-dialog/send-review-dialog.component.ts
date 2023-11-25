import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import {
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';
import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { ClinicSettingsService } from '../../../clinic-settings/clinic-settings.service';
import { HeaderService } from '../../../layouts/full/header/header.service';
import { MorningHuddleService } from '../morning-huddle.service';
import { forkJoin } from 'rxjs';

export interface DialogData {
  clinic_id?: number;
  patient_id: number;
  patient_name: string;
  mobile: any;
  total_remains: number;
  appoint_id: string;
  phone_number: string;
  review_msg: string;
}

@Component({
  selector: 'send-review-dialog',
  templateUrl: 'send-review-dialog.component.html',
  styleUrls: ['send-review-dialog.component.scss'],
})
export class SendReviewDialog {
  review_msg = new UntypedFormControl('', [Validators.required]);
  phoneNumber = new UntypedFormControl('', [
    Validators.required,
    Validators.pattern(
      /^(\+614?|04|614)[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}$/
    ),
  ]);

  msgTemplates = [];
  selectedReviewMsg = null;
  facebookId = '';
  googleId = '';
  clinicName = '';
  clinic = null;
  isWaitingResponse = false;
  availableMsgLength = 10;

  constructor(
    public dialogRef: MatDialogRef<SendReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clinicSettingService: ClinicSettingsService,
    private _headerService: HeaderService,
    private _morningHuddleService: MorningHuddleService,
    private _toastrService: ToastrService
  ) {
    this.phoneNumber.setValue(
      (this.data.mobile || data.phone_number || '').replace(/\s/g, '')
    );
    this.clinic = _.find(
      this._headerService.clinics,
      c => c.id == this.data.clinic_id
    );
    if (data.phone_number) {
      this.review_msg.setValue(data.review_msg);
    }

    const sources = forkJoin([
      this.clinicSettingService.getSocialLinks(this.data.clinic_id),
      this.clinicSettingService.getReviewMsgTemplateList(this.data.clinic_id),
    ]);

    sources.subscribe(([v1, v2]) => {
      if (v1.data) {
        this.facebookId = v1.data.facebook_id;
        this.googleId = v1.data.google_id;
      }

      if (v2.data) {
        this.msgTemplates = v2.data;
        if (this.msgTemplates.length > 0 && !data.phone_number) {
          this.selectedReviewMsg = this.msgTemplates[0].id;
          this.onChangeReviewMsg();
        }
      }
    });

    this.availableMsgLength =
      data.total_remains < 5 ? data.total_remains * 160 : 800;
  }

  get numOfMessages() {
    return Math.ceil(this.review_msg.value.length / 160);
  }

  getPhoneErrors() {
    if (!this.phoneNumber.invalid) return '';
    // if(this.phoneNumber.hasError('phoneNumber614')) return "The length of digits should be 9 in case including +614";
    // if(this.phoneNumber.hasError('phoneNumber04')) return "The length of digits should be 8 in case including 04";
    return 'Invalid Phone Number';
  }

  onNoClick(): void {
    if (!this.isWaitingResponse) this.dialogRef.close({ status: false });
  }

  get isValid() {
    return this.phoneNumber.valid && this.review_msg.valid;
  }

  onSubmitClick(event: any): void {
    if (this.isValid) {
      this.isWaitingResponse = true;
      this._morningHuddleService
        .sendReviewMsg(
          this.data.clinic_id,
          this.data.patient_id,
          this.review_msg.value,
          this.phoneNumber.value,
          this.data.appoint_id
        )
        .subscribe({
          next: res => {
            this.isWaitingResponse = false;
            this.dialogRef.close({
              status: res.status,
              num_sms: Math.ceil(this.review_msg.value.length / 160),
            });
          },
          error: err => {
            this.isWaitingResponse = false;
            this._toastrService.error(
              (err.error && err.error.message) || err.message
            );
          },
          complete: () => {
            this._toastrService.success('Sent Message Sucessfully!');
          },
        });
    }
  }

  onChangeReviewMsg() {
    const msg = _.find(
      this.msgTemplates,
      it => it.id == this.selectedReviewMsg
    );
    let renderedMsg = msg.msg_template.replaceAll(
      '[Patient Name]',
      this.data.patient_name
    );
    renderedMsg = renderedMsg.replaceAll(
      '[Clinic Name]',
      this.clinic.clinicName
    );
    if (this.facebookId) {
      renderedMsg = renderedMsg.replaceAll('[Facebook Link]', this.facebookId);
    }

    if (this.googleId) {
      renderedMsg = renderedMsg.replaceAll('[Google Link]', this.googleId);
    }

    this.review_msg.setValue(renderedMsg);
  }
}
