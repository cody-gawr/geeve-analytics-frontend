import { ClinicSettingsService } from '@/app/clinic-settings/clinic-settings.service';
import _ from 'lodash';
import { CampaignElement } from '@/newapp/campaigns/create-campaign/create-campaign.component';
import { CampaignService } from '@/newapp/campaigns/services/campaign.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

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
  selector: 'app-start-campaign-dialog',
  templateUrl: './start-campaign-dialog.component.html',
  styleUrls: ['./start-campaign-dialog.component.scss'],
})
export class StartCampaignDialogComponent implements OnInit {
  sms_text = new UntypedFormControl('', [Validators.required]);
  phoneNumber = new FormControl<string>('');
  msgTemplates = [];
  selectedTmpMsg = '';
  availableMsgLength = 10;
  loadingData = true;
  numTotalMessage = 0;
  numMessage = 0;
  composedTextForFirstPatient = '';
  remainCredits = 0;
  usedCredits = 0;
  costPerSMS = 0;
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(
    public dialogRef: MatDialogRef<StartCampaignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clinicSettingService: ClinicSettingsService,
    private campaignService: CampaignService,
  ) {}

  ngOnInit(): void {
    if (this.data.patients.length === 1 && this.data.resend) {
      this.phoneNumber.setValue(this.data.patients[0].mobile);
    } else {
      this.phoneNumber.setValue('');
    }

    this.sms_text.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.numTotalMessage = this.data.patients
        .map(p => Math.ceil(this.composeText(value, p)?.length / 160))
        .reduce((acc, curr) => acc + curr, 0);
      this.numMessage = Math.ceil(value?.length / 160);
      this.composedTextForFirstPatient = this.composeText(value, this.data.patients[0]);
    });

    this.clinicSettingService.getReviewMsgTemplateList(this.data.clinicId).subscribe(v2 => {
      if (v2.data) {
        this.msgTemplates = v2.data.filter(d => d.type === 'campaign');
        if (this.msgTemplates.length > 0) {
          if (!this.selectedTmpMsg && !this.data.sms_text)
            this.selectedTmpMsg = this.msgTemplates[0].id;
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

      if (this.data.sms_text) this.sms_text.setValue(this.data.sms_text);
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
      this.dialogRef.close({
        status: true,
        sms_text: this.sms_text.value,
        phone_number: this.phoneNumber.value,
      });
    }
  }

  composeText(smsText: string, patient: TPatient) {
    let renderedMsg = smsText.replaceAll('[Patient Name]', patient.patient_name?.split(' ')[0]);
    renderedMsg = renderedMsg.replaceAll('[Clinic Name]', this.data.clinicName);

    return renderedMsg;
  }

  onChangeReviewMsg() {
    const msg = _.find(this.msgTemplates, it => it.id == this.selectedTmpMsg);
    if (msg) {
      this.sms_text.setValue(msg.msg_template);
    }
  }

  disabledSubmit() {
    return (
      (!this.isValid && this.loadingData) ||
      !this.numTotalMessage ||
      this.remainCredits < this.numTotalMessage
    );
  }

  openTopUp() {
    this.dialogRef.close({ status: false, cost: this.costPerSMS });
  }
}
