import { DialogData } from '@/app/shared/stripe-payment-modal/stripe-payment-modal.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-conversion-code-values-dialog',
  templateUrl: './update-conversion-code-values-dialog.component.html',
  styleUrls: ['./update-conversion-code-values-dialog.component.scss'],
})
export class UpdateConversionCodeValuesDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UpdateConversionCodeValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit() {}
}
