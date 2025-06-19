import { ActiveTreatmentStatus, TreatmentStatus } from '@/newapp/enums/treatment-status.enum';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { enumEntries } from '@/newapp/shared/helpers';
import { ConversionCodeDialogData, ConversionCodeValue } from '@/newapp/models/conversion-tracker';
import { MatChipInputEvent } from '@angular/material/chips';
import { ConversionTrackerFacade } from '../facades/conversion-tracker.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { BehaviorSubject, distinctUntilChanged, filter, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-update-conversion-code-values-dialog',
  templateUrl: './upsert-conversion-code-values-dialog.component.html',
  styleUrls: ['./upsert-conversion-code-values-dialog.component.scss'],
})
export class UpsertConversionCodeValuesDialogComponent implements OnInit, OnDestroy {
  // Typed Reactive FormGroup using NonNullableFormBuilder
  conversionCodeValueForm: FormGroup<{
    updateCodeControl: FormControl<string>;
    inTreatmentCodeControl: FormControl<string>;
    completedCodeControl: FormControl<string>;
  }>;

  public readonly TreatmentStatus = TreatmentStatus;

  readonly types: ActiveTreatmentStatus[] = [
    TreatmentStatus.InTreatment,
    TreatmentStatus.Completed,
  ];
  readonly errorMessages = {
    required: 'Code is required.',
    maxlength: 'Code is up to 15 characters.',
    duplicate: "You can't add a duplicate code.",
  };

  readonly typeOptions = enumEntries(TreatmentStatus).filter(s =>
    [TreatmentStatus.InTreatment, TreatmentStatus.Completed].includes(<TreatmentStatus>s.value),
  );

  private codeValues = new BehaviorSubject<ConversionCodeValue[]>([]);
  public codeValues$ = this.codeValues.asObservable();
  public conversionCodeValuesByStatus: { [key in ActiveTreatmentStatus]: ConversionCodeValue[] } = {
    [TreatmentStatus.InTreatment]: [],
    [TreatmentStatus.Completed]: [],
  };
  private clinicId: number = 0;

  private destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpsertConversionCodeValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConversionCodeDialogData,
    private conversionTrackerFacade: ConversionTrackerFacade,
    private clinicFacade: ClinicFacade,
  ) {
    this.conversionCodeValueForm = this.fb.group({
      updateCodeControl: this.fb.control(null, {
        validators: [Validators.required, Validators.maxLength(15)],
      }),
      inTreatmentCodeControl: this.fb.control(null, {
        validators: [
          Validators.required,
          Validators.maxLength(15),
          this.duplicateCodeValidator(TreatmentStatus.InTreatment),
        ],
      }),
      completedCodeControl: this.fb.control(null, {
        validators: [
          Validators.required,
          Validators.maxLength(15),
          this.duplicateCodeValidator(TreatmentStatus.Completed),
        ],
      }),
    });
  }

  get title() {
    return this.data.mode == 'create' ? 'Create Conversion Code' : 'Update Conversion Code';
  }

  get inTreatmentCodeControl() {
    return this.conversionCodeValueForm.controls.inTreatmentCodeControl;
  }

  get completedCodeControl() {
    return this.conversionCodeValueForm.controls.completedCodeControl;
  }

  get updateCodeControl() {
    return this.conversionCodeValueForm.controls.updateCodeControl;
  }

  ngOnInit() {
    if (this.data.mode === 'update') {
      this.updateCodeControl.setValue(this.data.conversionCode.consultCode);
    }
    this.codeValues.next(this.data.conversionCode?.codeValues || []);

    this.clinicFacade.currentClinics$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        filter(clinics => !!clinics && clinics.length > 0),
        map(clinics => clinics[0]),
      )
      .subscribe(clinic => {
        this.clinicId = clinic.id;
      });

    this.conversionTrackerFacade.createConversionCodeValueSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter(conversionCodeValue => !!conversionCodeValue),
      )
      .subscribe(conversionCodeValue => {
        this.codeValues.next([...this.codeValues.value, conversionCodeValue]);
      });
    this.codeValues$.pipe(takeUntil(this.destroy$)).subscribe(codeValues => {
      this.conversionCodeValuesByStatus = codeValues.reduce(
        (acc, curr) => {
          acc[curr.type].push(curr);
          return acc;
        },
        {
          [TreatmentStatus.InTreatment]: [],
          [TreatmentStatus.Completed]: [],
        },
      );
    });

    // this.typeConrol.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(type => {
    //   this.codeValuesByType = this.filterCodeValuesByType(this.codeValues.value, type);
    // });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  addCodeValue(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    // Add our keyword
    // if (this.codeControl.valid) {
    // this.conversionTrackerFacade.createConversionCodeValue({
    //   clinicId: this.clinicId,
    //   conversionCodeId: this.data.conversionCode?.recordId,
    //   code: value,
    // });

    event.chipInput!.clear();
    // }
  }

  onAddCodeValue(code: string, status: TreatmentStatus) {
    const control = this.getControlForStatus(status);
    if (control.invalid) {
      return;
    }

    // if (
    //   (<ConversionCodeValue[]>this.conversionCodeValuesByStatus[status])
    //     .map(conversionCodeValue => conversionCodeValue.code)
    //     .includes(code)
    // ) {
    //   control.setErrors({ duplicate: true });
    //   control.markAsTouched();
    //   return;
    // }
    let codeValue: ConversionCodeValue = {
      code,
      type: status,
    };
    this.codeValues.next([...this.codeValues.value, codeValue]);
  }

  removeCodeValue(codeValue: ConversionCodeValue) {
    this.codeValues.next(this.codeValues.value.filter(c => c.recordId != codeValue.recordId));
    this.conversionTrackerFacade.deleteConversionCodeValue(this.clinicId, codeValue.recordId);
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  filterCodeValuesByType(
    codeValues: ConversionCodeValue[],
    type: ActiveTreatmentStatus,
  ): ConversionCodeValue[] {
    return codeValues.filter(c => c.type === type);
  }

  private duplicateCodeValidator(status: TreatmentStatus): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const code = <string>control.value;
      const existingValues = this.conversionCodeValuesByStatus[status] as ConversionCodeValue[];

      const isDuplicate = existingValues.some(v => v.code === code);
      return isDuplicate ? { duplicate: true } : null;
    };
  }

  /** Map each TreatmentStatus to its FormControl */
  private getControlForStatus(status: TreatmentStatus): FormControl {
    switch (status) {
      case TreatmentStatus.InTreatment:
        return this.inTreatmentCodeControl;
      case TreatmentStatus.Completed:
        return this.completedCodeControl;
      default:
        throw new Error(`Unsupported TreatmentStatus: ${status}`);
    }
  }

  getCodeError(ctrl: FormControl) {
    const key = Object.keys(this.errorMessages).find(err => ctrl.hasError(err));

    // if we found one, return its message; otherwise empty string
    return key ? this.errorMessages[key] : '';
  }
}
