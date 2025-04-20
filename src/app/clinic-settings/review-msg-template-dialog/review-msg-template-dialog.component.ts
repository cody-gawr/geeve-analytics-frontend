import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ReviewMsgTemplateObject } from '../clinic-settings.component';
import { ClinicSettingsService } from '../clinic-settings.service';

export interface DialogData {
  element?: ReviewMsgTemplateObject;
  clinic_id: number;
}

@Component({
  selector: 'review-msg-template-dialog',
  templateUrl: 'review-msg-template-dialog.component.html',
})
export class ReviewMsgTemplateDialog {
  name = new UntypedFormControl('', [Validators.required]);
  msg_template = new UntypedFormControl('', [Validators.required]);
  type = new UntypedFormControl('review', [Validators.required]);
  isWaitingResponse = false;
  @ViewChild('keyClinicName') clinicNameElem: ElementRef<HTMLElement>;
  @ViewChild('keyPatientName') patientNameElem: ElementRef<HTMLElement>;
  // @ViewChild('keyFacebookLink') facebookLinklem: ElementRef<HTMLElement>
  @ViewChild('keyGoogleLink') googleLinkElem: ElementRef<HTMLElement>;

  constructor(
    public dialogRef: MatDialogRef<ReviewMsgTemplateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private toastr: ToastrService,
    private clinicService: ClinicSettingsService,
  ) {
    if (data.element) {
      this.name = new UntypedFormControl(data.element.name, [Validators.required]);
      this.type = new UntypedFormControl(data.element.type, [Validators.required]);
      this.msg_template = new UntypedFormControl(data.element.msg_template, [Validators.required]);
    }
  }

  onDragChip(event: any) {
    var dataToCopy = event.target.innerText;
    event.dataTransfer.setData('Text', `[${dataToCopy}]`);
    return true;
  }

  ngAfterViewInit() {
    this.clinicNameElem.nativeElement.ondragstart = this.onDragChip;
    this.patientNameElem.nativeElement.ondragstart = this.onDragChip;
    // this.facebookLinklem.nativeElement.ondragstart = this.onDragChip;
    this.googleLinkElem.nativeElement.ondragstart = this.onDragChip;
  }

  onNoClick(): void {
    this.dialogRef.close({ status: false });
  }

  get isValid() {
    return this.name.valid && this.msg_template.valid;
  }

  async onSubmitClick(e: SubmitEvent) {
    e.preventDefault();
    if (this.isValid) {
      this.isWaitingResponse = true;
      if (this.data.element) {
        this.clinicService
          .updateReviewMsgTemplate(
            this.data.element.id,
            this.data.clinic_id,
            this.name.value,
            this.msg_template.value,
            this.type.value,
          )
          .subscribe({
            next: v => {
              this.toastr.success('Updated a template successfully!');
              this.dialogRef.close({ status: true });
            },
            error: e => {
              this.isWaitingResponse = false;
              this.toastr.error(e.message);
            },
            complete: () => {
              this.isWaitingResponse = false;
            },
          });
      } else
        this.clinicService
          .addReviewMsgTemplate(
            this.data.clinic_id,
            this.name.value,
            this.msg_template.value,
            this.type.value,
          )
          .subscribe({
            next: v => {
              this.toastr.success('Added new template successfully!');
              this.dialogRef.close({ status: true });
            },
            error: e => {
              this.isWaitingResponse = false;
              this.toastr.error(e.message);
            },
            complete: () => {
              this.isWaitingResponse = false;
            },
          });
    }
  }
}
