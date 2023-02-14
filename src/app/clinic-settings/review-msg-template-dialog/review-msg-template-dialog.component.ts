import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from "ngx-toastr";
import {FormControl, Validators} from '@angular/forms';
import { ReviewMsgTemplateObject } from "../clinic-settings.component";
import { ClinicSettingsService } from "../clinic-settings.service";

export interface DialogData {
    element?: ReviewMsgTemplateObject;
    clinic_id: number;
}

@Component({
    selector: 'review-msg-template-dialog',
    templateUrl: 'review-msg-template-dialog.component.html'
})
export class ReviewMsgTemplateDialog {
    name = new FormControl('', [Validators.required]);
    msg_template = new FormControl('', [Validators.required]);
    constructor(
        public dialogRef: MatDialogRef<ReviewMsgTemplateDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private toastr: ToastrService,
        private clinicService: ClinicSettingsService 
    ) {
        if(data.element){
            this.name = new FormControl(data.element.name, [Validators.required]);
            this.msg_template = new FormControl(data.element.msg_template, [Validators.required]);
        }
    }
    
    onNoClick(): void {
        this.dialogRef.close({status: false});
    }

    async onSubmitClick(e:SubmitEvent) {
        e.preventDefault();
        if(this.data.element){
            this.clinicService.updateReviewMsgTemplate(this.data.element.id, this.data.clinic_id, this.name.value, this.msg_template.value).subscribe(res => {
                this.toastr.success('Updated a template successfully!')
                this.dialogRef.close({status: true});
            }, error => {
                this.toastr.error(error.message);
            });
        }else
        this.clinicService.addReviewMsgTemplate(
            this.data.clinic_id, this.name.value, this.msg_template.value).subscribe(res => {
            this.toastr.success('Added new template successfully!')
            this.dialogRef.close({status: true});
        }, error => {
            this.toastr.error(error.message);
        });
    }
}
