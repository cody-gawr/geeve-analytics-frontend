import { ClinicSettingsService } from '@/app/clinic-settings/clinic-settings.service';
import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import _ from 'lodash';
import { CampaignElement } from '../create-campaign/create-campaign.component';
import { CampaignService, ICampaignMessage } from '../services/campaign.service';
type TPatient = Pick<CampaignElement, 'patient_name' | 'mobile'>;
export interface DialogData {
  resend?: boolean;
  sms_text: string;
  patients: TPatient[];
  clinicId: number;
  clinicName: string;
  campaignId: number;
}

@Component({
  selector: 'start-campaign-dialog',
  templateUrl: 'start-campaign-dialog.component.html',
  styleUrls: ['start-campaign-dialog.component.scss'],
})
export class StartCampaignDialog {
  sms_text = new UntypedFormControl('', [Validators.required]);
  phoneNumber = new FormControl<string>('');
  msgTemplates = [];
  selectedTmpMsg = "";
  availableMsgLength = 10;
  loadingData = true;
  numTotalMessage = 0;
  numMessage = 0;
  composedTextForFirstPatient = "";
  remainCredits = 0;
  usedCredits = 0;
  costPerSMS = 0;

  constructor(
    public dialogRef: MatDialogRef<StartCampaignDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clinicSettingService: ClinicSettingsService,
    private campaignService: CampaignService,
  ) {
    if(data.patients.length === 1 && data.resend){
      this.phoneNumber.setValue(data.patients[0].mobile);
    }else{
      this.phoneNumber.setValue('');
    }
    this.clinicSettingService.getReviewMsgTemplateList(this.data.clinicId).subscribe((v2) => {

      if (v2.data) {
        this.msgTemplates = v2.data.filter(d => d.type === 'campaign');
        if (this.msgTemplates.length > 0) {
          if(!this.selectedTmpMsg && !data.sms_text) this.selectedTmpMsg = this.msgTemplates[0].id;
          this.onChangeReviewMsg();
        }
      }

      this.loadingData = false;
    });
  
    this.campaignService.getCreditData(this.data.clinicId).subscribe(result => {
      this.remainCredits = result.data.remain_credits;
      this.usedCredits = result.data.used_credits;
      this.costPerSMS = result.data.cost_per_sms;

      this.availableMsgLength = this.remainCredits < 5 ? this.remainCredits * 160 : 800;
      this.sms_text.valueChanges.subscribe(value => {
        this.numTotalMessage = this.data.patients.map(
          p => Math.ceil(this.composeText(value, p)?.length / 160)).reduce((acc, curr) => acc + curr, 0);
        this.numMessage = Math.ceil(value?.length / 160);
        this.composedTextForFirstPatient = this.composeText(value, data.patients[0]);
      });
  
      if(data.sms_text) this.sms_text.setValue(data.sms_text);
    });
  }

  onNoClick(): void {
    this.dialogRef.close({ status: false });
  }

  get isValid() {
    return this.sms_text.valid;
  }

  onSubmitClick(event: any): void {
    if (this.isValid) {
      this.dialogRef.close({ status: true, sms_text: this.sms_text.value, phone_number: this.phoneNumber.value });
    }
  }

  composeText(smsText: string, patient: TPatient){
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
    return (!this.isValid && this.loadingData) || !this.numTotalMessage || (this.remainCredits < this.numTotalMessage)
  }
}
