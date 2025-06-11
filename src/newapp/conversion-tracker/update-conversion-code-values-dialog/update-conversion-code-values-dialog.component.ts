import { DialogData } from '@/app/shared/stripe-payment-modal/stripe-payment-modal.component';
import { ActiveTreatmentStatus, TreatmentStatus } from '@/newapp/enums/treatment-status.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { enumEntries } from '@/newapp/shared/helpers';

@Component({
  selector: 'app-update-conversion-code-values-dialog',
  templateUrl: './update-conversion-code-values-dialog.component.html',
  styleUrls: ['./update-conversion-code-values-dialog.component.scss'],
})
export class UpdateConversionCodeValuesDialogComponent implements OnInit {
  // Typed Reactive FormGroup using NonNullableFormBuilder
  conversionCodeValueForm: FormGroup<{
    typeControl: FormControl<ActiveTreatmentStatus>;
    codeControl: FormControl<string>;
  }>;

  readonly types: ActiveTreatmentStatus[] = [
    TreatmentStatus.InTreatment,
    TreatmentStatus.Completed,
  ];

  readonly typeOptions = enumEntries(TreatmentStatus).filter(s =>
    [TreatmentStatus.InTreatment, TreatmentStatus.Completed].includes(<TreatmentStatus>s.value),
  );

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateConversionCodeValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.conversionCodeValueForm = this.fb.group({
      typeControl: this.fb.control<ActiveTreatmentStatus>(TreatmentStatus.InTreatment, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      codeControl: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(15)],
      }),
    });
  }

  get typeConrol() {
    return this.conversionCodeValueForm.controls.typeControl;
  }

  get codeControl() {
    return this.conversionCodeValueForm.controls.codeControl;
  }

  ngOnInit() {
    console.log({
      data: this.typeOptions,
    });
  }
}
