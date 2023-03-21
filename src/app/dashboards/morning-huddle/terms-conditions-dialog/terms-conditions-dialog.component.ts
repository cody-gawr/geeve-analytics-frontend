import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClinicSettingsService } from '../../../clinic-settings/clinic-settings.service';

export interface DialogData {
    clinic_id: number;
}

@Component({
    selector: 'terms-conditions-dialog',
    templateUrl: 'terms-conditions-dialog.component.html',
    styleUrls: ['terms-conditions-dialog.component.scss']
})
export class TermsConditionsDialog {
    isAccepted=false;
    isLoading = false;
    constructor(
        public dialogRef: MatDialogRef<TermsConditionsDialog>,
        private clinicSettingService: ClinicSettingsService,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ){}
    submitBtn(event:any){
        this.isLoading = true;
        this.clinicSettingService.updateReviewSettings(this.data.clinic_id, {accepted_sms_terms: true}).subscribe(
            {
                next: v => {
                    if(v.status){
                        this.dialogRef.close(true);
                    }
                    this.isLoading = false;
                },
                error: e => {
                    console.error(e.message);
                    this.isLoading = false;
                }
            }
        );
    }
}