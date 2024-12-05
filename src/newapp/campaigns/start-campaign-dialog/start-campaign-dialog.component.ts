import { ClinicSettingsService } from '@/app/clinic-settings/clinic-settings.service';
import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import _ from 'lodash';
import { CampaignElement } from '../create-campaign/create-campaign.component';

export interface DialogData {
  patient_id: number;
  patient_name: string;
  sms_text: string;
  // numPatients: number;
  patients: CampaignElement[]
  clinicId: number;
  clinicName: string;
  remain_credits: number;
  isDraft: boolean;
  campaignId: number;
}

@Component({
  selector: 'start-campaign-dialog',
  templateUrl: 'start-campaign-dialog.component.html',
  styleUrls: ['start-campaign-dialog.component.scss'],
})
export class StartCampaignDialog {
  sms_text = new UntypedFormControl('', [Validators.required]);
  msgTemplates = [];
  selectedTmpMsg = "";
  availableMsgLength = 10;
  loadingData = true;

  constructor(
    public dialogRef: MatDialogRef<StartCampaignDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clinicSettingService: ClinicSettingsService,
  ) {
    if(data.sms_text) this.sms_text.setValue(data.sms_text);

    this.clinicSettingService.getReviewMsgTemplateList(this.data.clinicId).subscribe((v2) => {

      if (v2.data) {
        this.msgTemplates = v2.data.filter(d => d.type === 'campaign');
        if (this.msgTemplates.length > 0) {
          // this.selectedTmpMsg = this.msgTemplates[0].id;
          this.onChangeReviewMsg();
        }
      }

      this.loadingData = false;
    });
    this.availableMsgLength = data.remain_credits < 5 ? data.remain_credits * 160 : 800;
  }

  // get numOfMessages() {
  //   return Math.ceil(this.sms_text.value.length / 160);
  // }

  get numTotalMessage() {
    return this.data.patients.map(
      p => Math.ceil(this.composeText(this.sms_text.value, p)?.length / 160)).reduce((acc, curr) => acc + curr, 0);
  }

  onNoClick(): void {
    this.dialogRef.close({ status: false });
  }

  get isValid() {
    return this.sms_text.valid;
  }

  onSubmitClick(event: any): void {
    if (this.isValid) {
      this.dialogRef.close({ status: true, sms_text: this.sms_text.value });
      // this._morningHuddleService
      //   .sendReviewMsg(
      //     this.data.clinic_id,
      //     this.data.patient_id,
      //     this.sms_text.value,
      //     this.phoneNumber.value,
      //     this.data.appoint_id
      //   )
      //   .subscribe({
      //     next: res => {
      //       this.isWaitingResponse = false;
      //       this.dialogRef.close({
      //         status: res.status,
      //         num_sms: Math.ceil(this.sms_text.value.length / 160),
      //       });
      //     },
      //     error: err => {
      //       this.isWaitingResponse = false;
      //       this._toastrService.error(
      //         (err.error && err.error.message) || err.message
      //       );
      //     },
      //     complete: () => {
      //       this._toastrService.success('Sent Message Sucessfully!');
      //     },
      //   });

    }
  }

  composeText(smsText: string, patient: CampaignElement){
    let renderedMsg = smsText.replaceAll(
      '[Patient Name]',
      patient.patient_name
    );
    renderedMsg = renderedMsg.replaceAll(
      '[Clinic Name]',
      this.data.clinicName
    );

    return renderedMsg;
  }

  onChangeReviewMsg() {
    const msg = _.find(
      this.msgTemplates,
      it => it.id == this.selectedTmpMsg
    );
    if(msg){
      this.sms_text.setValue(msg.msg_template);
    }
    

    // let renderedMsg = msg.msg_template.replaceAll(
    //   '[Patient Name]',
    //   this.data.patient_name
    // );
    // renderedMsg = renderedMsg.replaceAll(
    //   '[Clinic Name]',
    //   this.data.clinicName
    // );

    // this.sms_text.setValue(renderedMsg);
  }
}
