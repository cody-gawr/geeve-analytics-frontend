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
    phone_number: number;
    patient_name: string;
    mobile: any;
    provider_id: number;
    appt_date: string;
    appt_start: string;
    total_remains: number;
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
            const apptId = `${this.data.clinic_id}:${this.data.provider_id}:${this.data.patient_id}:${this.data.appt_date}T${this.data.appt_start}`;
            this._morningHuddleService.sendReviewMsg(this.data.clinic_id, 
                this.data.patient_id, this.review_msg.value, this.phoneNumber.value).subscribe(res => {
                    this.isWaitingResponse = false;
                    if(res.status == 200){
                        const s = sessionStorage.getItem('sids');
                        const sids = s?s.split(','):[];
                        sids.push(res.body.sid);
                        sessionStorage.setItem(
                            'sids',
                            sids.join(',')
                        );
                        sessionStorage.setItem(
                            res.body.sid,
                            res.body.status
                        );
                        sessionStorage.setItem(
                            apptId, res.body.sid
                        )
                        //sessionStorage.setItem(this.phoneNumber.value, appId);
                        this._toastrService.success('Sent Message Sucessfully!');
                        this.dialogRef.close({status: true, num_sms: Math.ceil(this.review_msg.value.length/160)});
                    }
                }, err => {
                    this.isWaitingResponse = false;
                    this._toastrService.error(err.message || 'Unknow Issue');
                })
        }
    }

    // keyPress(event: any) {
    //     const pattern = /^(\+614)|(04)[0-9\s]*$/;
    //     let inputChar = String.fromCharCode(event.charCode);
    //     if ((event.keyCode != 8 && !pattern.test(inputChar))) {
    //       event.preventDefault();
    //     }
    //     const val = event.target.value.replaceAll(/\s/g, '');
    //     console.log(val)
    //     if(this.phoneCountryCode == '+614' && val.length > 8){
    //         event.preventDefault();
    //     }
    //     if(this.phoneCountryCode == '04' && val.length > 7){
    //         event.preventDefault();
    //     }
    // }

    onChangeReviewMsg(){
        const msg = _.find(this.msgTemplates, it => it.id == this.selectedReviewMsg);
        let renderedMsg = msg.msg_template.replace('[Patient Name]', this.data.patient_name);
        renderedMsg = renderedMsg.replace('[Clinic Name]', this.clinic.clinicName);
        renderedMsg = renderedMsg.replace('[Facebook Link]', this.facebookId);
        renderedMsg = renderedMsg.replace('[Google Link]', this.googleId);
        this.review_msg.setValue(renderedMsg);
    }
}