import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import {
  Component,
  Inject,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  Renderer2,
} from '@angular/core';
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
  styleUrls: ['./review-msg-template-dialog.component.scss'],
})
export class ReviewMsgTemplateDialog {
  private destroy = new Subject<void>();
  private destroy$ = this.destroy.asObservable();
  private typeSubject = new BehaviorSubject<string>('review');
  public type$ = this.typeSubject.asObservable();
  public name = new UntypedFormControl('', [Validators.required]);
  public msgTemplate = new UntypedFormControl('', [Validators.required]);
  public type = new UntypedFormControl('review', [Validators.required]);
  public isWaitingResponse: boolean = false;
  public placeholders: string[] = [];
  public messageCount: number = 0;
  private dragListeners: (() => void)[] = [];

  @ViewChild('textareaMsgTemplate') textareaMsgTemplate!: ElementRef<HTMLTextAreaElement>;
  @ViewChildren('draggableElem') elements!: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
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
  }

  ngOnInit() {
    this.type$.subscribe(v => {
      if (v === 'review') {
        this.placeholders = ['Clinic Name', 'Patient Name', 'Google Link'];
      } else {
        this.placeholders = ['Clinic Name', 'Patient Name'];
      }
    });
    this.type.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => this.typeSubject.next(v));
    this.msgTemplate.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      this.messageCount = Math.ceil(v.length / 160);
    });
  }

  ngAfterViewInit() {
    this.elements.changes.pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log({ res });
      this.attachDragListeners();
    });
    this.attachDragListeners();
  }

  ngOnDestroy() {
    this.dragListeners.forEach(disposeFn => disposeFn());
    this.destroy.next();
    this.destroy.complete();
  }

  // COMPONENT-TODO - Attach listener to each component
  private attachDragListeners() {
    // Remove previous listeners
    this.dragListeners.forEach(disposeFn => disposeFn());
    this.dragListeners = [];
    this.elements.forEach(el => {
      const dispose = this.renderer.listen(el.nativeElement, 'dragstart', (event: DragEvent) => {
        this.onDragChip(event);
      });
      this.dragListeners.push(dispose);
    });
  }

  onDragChip(event: DragEvent) {
    const textareaEl = this.textareaMsgTemplate.nativeElement;
    const placeholder = (<HTMLSpanElement>event.target).innerText;
    const start = textareaEl.selectionStart || 0;
    const end = textareaEl.selectionEnd || 0;
    const message = this.msgTemplate.value;
    this.msgTemplate.setValue(message.slice(0, start) + `[${placeholder}]` + message.slice(end));

    setTimeout(() => {
      textareaEl.focus();
      const cursorPosition = start + placeholder.length + 2; // 4 for '{{' and '}}'
      textareaEl.selectionStart = textareaEl.selectionEnd = cursorPosition;
    }, 0);
  }

  onNoClick(): void {
    this.dialogRef.close({ status: false });
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
          .pipe(takeUntil(this.destroy$))
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
          .pipe(takeUntil(this.destroy$))
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
