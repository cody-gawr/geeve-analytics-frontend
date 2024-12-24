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
  numTotalMessage = 0;
  numMessage = 0;
  composedTextForFirstPatient = ""
  constructor(
    public dialogRef: MatDialogRef<StartCampaignDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clinicSettingService: ClinicSettingsService,
  ) {
    

    this.clinicSettingService.getReviewMsgTemplateList(this.data.clinicId).subscribe((v2) => {

      if (v2.data) {
        this.msgTemplates = v2.data.filter(d => d.type === 'campaign');
        if (this.msgTemplates.length > 0) {
          if(!this.selectedTmpMsg) this.selectedTmpMsg = this.msgTemplates[0].id;
          this.onChangeReviewMsg();
        }
      }

      this.loadingData = false;
    });
    this.availableMsgLength = data.remain_credits < 5 ? data.remain_credits * 160 : 800;
    this.sms_text.valueChanges.subscribe(value => {
      this.numTotalMessage = this.data.patients.map(
        p => Math.ceil(this.composeText(value, p)?.length / 160)).reduce((acc, curr) => acc + curr, 0);
      this.numMessage = Math.ceil(value?.length / 160);
      this.composedTextForFirstPatient = this.composeText(value, data.patients[0]);
    });

    if(data.sms_text) this.sms_text.setValue(data.sms_text);
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
  }

  disabledSubmit() {
    return (!this.isValid && this.loadingData) || !this.numTotalMessage || ((this.data.remain_credits < this.numTotalMessage) && !this.data.isDraft)
  }
}
