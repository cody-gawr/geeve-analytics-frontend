import { BehaviorSubject } from 'rxjs';
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ReviewMsgTemplateObject } from '../clinic-settings.component';
import { ClinicSettingsService } from '../clinic-settings.service';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

export interface DialogData {
  element?: ReviewMsgTemplateObject;
  clinic_id: number;
}

@Component({
  selector: 'review-msg-template-dialog',
  templateUrl: 'review-msg-template-dialog.component.html',
  styleUrls: ['./review-msg-template-dialog.component.scss'],
})
export class ReviewMsgTemplateDialog {
  private typeSubject = new BehaviorSubject<string>('review');
  public type$ = this.typeSubject.asObservable();
  public name = new UntypedFormControl('', [Validators.required]);
  public msgTemplate = new UntypedFormControl('', [Validators.required]);
  public type = new UntypedFormControl('review', [Validators.required]);
  public isWaitingResponse: boolean = false;
  public placeholders: string[] = [];
  public message: string = '';

  @ViewChild('textareaMsgTemplate') textareaMsgTemplate!: ElementRef<HTMLElement>;
  @ViewChild('keyClinicName') clinicNameElem: ElementRef<HTMLElement>;
  @ViewChild('keyPatientName') patientNameElem: ElementRef<HTMLElement>;
  // @ViewChild('keyFacebookLink') facebookLinklem: ElementRef<HTMLElement>
  @ViewChild('keyGoogleLink') googleLinkElem: ElementRef<HTMLElement>;

  constructor(
    public dialogRef: MatDialogRef<ReviewMsgTemplateDialog>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private toastr: ToastrService,
    private clinicService: ClinicSettingsService,
  ) {
    if (this.dialogData.element) {
      this.name = new UntypedFormControl(this.dialogData.element.name, [Validators.required]);
      this.type = new UntypedFormControl(this.dialogData.element.type, [Validators.required]);
      this.msgTemplate = new UntypedFormControl(this.dialogData.element.msg_template, [
        Validators.required,
      ]);
    }
    this.type$.subscribe(v => {
      if (v === 'review') {
        this.placeholders = ['Clinic Name', 'Patient Name', 'Google Link'];
      } else {
        this.placeholders = ['Clinic Name', 'Patient Name'];
      }
    });
    this.type.valueChanges.subscribe(v => this.typeSubject.next(v));
  }

  ngOnInit() {}

  onDragChip(event: any) {
    // var dataToCopy = event.target.innerText;
    // event.dataTransfer.setData('Text', `[${dataToCopy}]`);
    // return true;
  }

  ngAfterViewInit() {
    // this.clinicNameElem.nativeElement.ondragstart = this.onDragChip;
    // this.patientNameElem.nativeElement.ondragstart = this.onDragChip;
    // // this.facebookLinklem.nativeElement.ondragstart = this.onDragChip;
    // this.googleLinkElem.nativeElement.ondragstart = this.onDragChip;
  }

  onNoClick(): void {
    this.dialogRef.close({ status: false });
  }

  onPlaceholderDrop(event: CdkDragDrop<string[]>) {
    console.log({ event });
    // const placeholder = event.item.data;
    // const textareaEl = <HTMLTextAreaElement>this.textareaMsgTemplate.nativeElement;
    // const start = textareaEl.selectionStart || 0;
    // const end = textareaEl.selectionEnd || 0;
    // console.log({ start, end, placeholder });
    // // Insert placeholder at current cursor position
    // this.message = this.message.slice(0, start) + `{{${placeholder}}}` + this.message.slice(end);
    // console.log({ message: this.message });
    // // Restore cursor position after update
    // setTimeout(() => {
    //   textareaEl.focus();
    //   const cursorPosition = start + placeholder.length + 4; // 4 for '{{' and '}}'
    //   textareaEl.selectionStart = textareaEl.selectionEnd = cursorPosition;
    // }, 0);
  }

  get isValid() {
    return this.name.valid && this.msgTemplate.valid;
  }

  async onSubmitClick(e: SubmitEvent) {
    e.preventDefault();
    if (this.isValid) {
      this.isWaitingResponse = true;
      if (this.dialogData.element) {
        this.clinicService
          .updateReviewMsgTemplate(
            this.dialogData.element.id,
            this.dialogData.clinic_id,
            this.name.value,
            this.msgTemplate.value,
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
            this.dialogData.clinic_id,
            this.name.value,
            this.msgTemplate.value,
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
