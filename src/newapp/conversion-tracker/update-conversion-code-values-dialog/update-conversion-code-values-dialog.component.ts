import { ActiveTreatmentStatus, TreatmentStatus } from '@/newapp/enums/treatment-status.enum';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { enumEntries } from '@/newapp/shared/helpers';
import { ConversionCode, ConversionCodeValue } from '@/newapp/models/conversion-tracker';
import { MatChipInputEvent } from '@angular/material/chips';
import { ConversionTrackerFacade } from '../facades/conversion-tracker.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  takeUntil,
} from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-update-conversion-code-values-dialog',
  templateUrl: './update-conversion-code-values-dialog.component.html',
  styleUrls: ['./update-conversion-code-values-dialog.component.scss'],
})
export class UpdateConversionCodeValuesDialogComponent implements OnInit, OnDestroy {
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

  private codeValues = new BehaviorSubject<ConversionCodeValue[]>([]);
  public codeValues$ = this.codeValues.asObservable();
  public codeValuesByType: ConversionCodeValue[] = [];
  private clinicId: number = 0;

  private destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateConversionCodeValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConversionCode,
    private conversionTrackerFacade: ConversionTrackerFacade,
    private clinicFacade: ClinicFacade,
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
    this.codeValues.next(this.data.codeValues);

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
      this.codeValuesByType = this.filterCodeValuesByType(codeValues, this.typeConrol.value);
    });

    this.typeConrol.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(type => {
      this.codeValuesByType = this.filterCodeValuesByType(this.codeValues.value, type);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  addCodeValue(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    // Add our keyword
    if (this.codeControl.valid) {
      this.conversionTrackerFacade.createConversionCodeValue({
        clinicId: this.clinicId,
        conversionCodeId: this.data.recordId,
        treatmentStatus: this.typeConrol.value,
        code: value,
      });

      event.chipInput!.clear();
    }
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
}
