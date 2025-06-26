import { NotesDialogData } from '@/newapp/models/conversion-tracker/notes-dialog.model';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss'],
})
export class NotesDialogComponent implements OnInit, OnDestroy {
  notesControl = new FormControl(null, {
    validators: [Validators.required, Validators.maxLength(50)],
  });

  readonly errorMessages = {
    required: 'Code is required.',
    maxlength: 'Code is up to 50 characters.',
  };

  constructor(
    public dialogRef: MatDialogRef<NotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotesDialogData,
  ) {}

  get title() {
    return this.data.mode == 'Create' ? 'Add Notes' : 'Edit Notes';
  }

  ngOnInit() {
    if (!!this.data.notes) {
      this.notesControl.setValue(this.data.notes);
    }
  }

  ngOnDestroy(): void {}

  getCodeError(ctrl: FormControl) {
    const key = Object.keys(this.errorMessages).find(err => ctrl.hasError(err));

    // if we found one, return its message; otherwise empty string
    return key ? this.errorMessages[key] : '';
  }

  onSaveChanges() {
    if (this.notesControl.valid) {
      this.dialogRef.close({
        notes: this.notesControl.value,
      });
    } else {
      this.notesControl.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
