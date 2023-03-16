import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as _ from "lodash";
import { ToastrService } from "ngx-toastr";
import { ClinicSettingsService } from "../../../clinic-settings/clinic-settings.service";
import { HeaderService } from "../../../layouts/full/header/header.service";
import { MorningHuddleService } from "../morning-huddle.service";

export interface DialogData {
    clinic_id?: number;
    patient_id: number;
    patient_name: string;
    mobile: any;
    total_remains: number;
    appoint_id: string;
}

@Component({
    selector: 'send-review-dialog',
    templateUrl: 'send-review-dialog.component.html',
    styleUrls:['send-review-dialog.component.scss']
})
export class SendReviewDialog {
    review_msg = new FormControl('', [Validators.required]);
    phoneNumber = new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+614?|04|614)[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}[\s]?\d{1}$/)
    ]
    );

    msgTemplates = [];
    selectedReviewMsg = null;
    facebookId = '';
    googleId = '';
    clinicName = '';
    clinic = null;
    math = Math;
    isWaitingResponse = false;
    availableMsgLength = 10;

    constructor(
        public dialogRef: MatDialogRef<SendReviewDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private clinicSettingService: ClinicSettingsService,
        private _headerService: HeaderService,
        private _morningHuddleService: MorningHuddleService,
        private _toastrService: ToastrService
    ){
        this.phoneNumber.setValue(this.data.mobile);
        this.clinic = _.find(this._headerService.clinics, c => c.id == this.data.clinic_id);
        this.clinicSettingService.getReviewMsgTemplateList(this.data.clinic_id).subscribe((res) => {
            if (res.status == 200) {
              if (res.body.data) {
                this.msgTemplates = res.body.data;
              }
            }
          }, error => {
            console.error(error.message);
        });

        this.clinicSettingService.getSocialLinks(this.data.clinic_id).subscribe(
            result => {
              if(result.body.data){
                this.facebookId = result.body.data.facebook_id;
                this.googleId = result.body.data.google_id;
              }
            },
            error => {
              console.error(error.message);
            }
        );

        this.availableMsgLength = data.total_remains < 5? data.total_remains * 160: 800;
    }

    getPhoneErrors() {
        if(!this.phoneNumber.invalid) return '';
        // if(this.phoneNumber.hasError('phoneNumber614')) return "The length of digits should be 9 in case including +614";
        // if(this.phoneNumber.hasError('phoneNumber04')) return "The length of digits should be 8 in case including 04";
        return 'Invalid Phone Number';
    }

    onNoClick(): void {
        if(!this.isWaitingResponse) this.dialogRef.close({status: false});
    }

    get isValid() {
        return this.phoneNumber.valid && this.review_msg.valid;
    }

    onSubmitClick(event: any): void {
        if(this.isValid){
            this.isWaitingResponse = true;
            this._morningHuddleService.sendReviewMsg(
                this.data.clinic_id, 
                this.data.patient_id, 
                this.review_msg.value, 
                this.phoneNumber.value,
                this.data.appoint_id,
            ).subscribe({
                next: (res) => {
                    this.isWaitingResponse = false;
                    this.dialogRef.close({
                        status: res.status,
                        num_sms: Math.ceil(this.review_msg.value.length/160),
                    });
                },
                error: (err) => {
                    this.isWaitingResponse = false;
                    this._toastrService.error(err.message || 'Unknow Issue');
                },
                complete: ()=> {this._toastrService.success('Sent Message Sucessfully!');}
            });
        }
    }

    onChangeReviewMsg(){
        const msg = _.find(this.msgTemplates, it => it.id == this.selectedReviewMsg);
        let renderedMsg = msg.msg_template.replace('[Patient Name]', this.data.patient_name);
        renderedMsg = renderedMsg.replace('[Clinic Name]', this.clinic.clinicName);
        renderedMsg = renderedMsg.replace('[Facebook Link]', this.facebookId);
        renderedMsg = renderedMsg.replace('[Google Link]', this.googleId);
        this.review_msg.setValue(renderedMsg);
    }
}