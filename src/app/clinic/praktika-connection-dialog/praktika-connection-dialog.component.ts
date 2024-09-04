import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { ClinicService } from '../clinic.service';

import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
interface Customer {
  id: number;
  name: string;
}
@Component({
  selector: 'app-praktika-connection-dialog',
  templateUrl: './praktika-connection-dialog.component.html',
  styleUrls: ['./praktika-connection-dialog.component.scss'],
})
export class PraktikaConnectionDialogComponent {
  public form: FormGroup;
  public formSubmitted: boolean = false;
  public customers: Customer[];
  constructor(
    private formBuilder: FormBuilder,
    private pmsService: ClinicService,
    private toastr: ToastrService,
    private _adapter: DateAdapter<any>,
    public dialogRef: MatDialogRef<PraktikaConnectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const todayDate = new Date();
    this._adapter.setLocale('en-UK');
    this.form = this.formBuilder.group({
      customer_user: ['', [Validators.required]],
      customer_secret: ['', [Validators.required]],
      customer_id: ['']
    });
    this.customers = [];
  }

  get FormGroup(): FormGroup {
    return this.form;
  }

  public onSubmit() {
    this.formSubmitted = true;
    const { customer_user, customer_secret, customer_id } = this.form.getRawValue();
    if (this.customers.length > 0 && customer_id) {
      this.pmsService
        .CreatePraktikaConfig(
          customer_user,
          customer_secret,
          this.data.clinic_id,
          customer_id
        )
        .subscribe({
          next: response => {
            if (!response.response) {
              this.toastr.error(
                'Failed to connect Praktika account',
                'Praktika Account'
              );
              return;
            }
            this.toastr.success(
              'Praktika account connected',
              'Praktika Account'
            );
            this.dialogRef.close('success');
          },
          error: err =>
            this.toastr.error(
              'Failed to connect Praktika account',
              'Praktika Account'
            ),
        });
    } else {
      this.pmsService
        .validatePraktikaLogin(customer_user, customer_secret)
        .subscribe({
          next: response => {
            if (!response.response) {
              this.toastr.error(
                'Failed to connect Praktika account',
                'Praktika Account'
              );
              return;
            }
            this.toastr.success(
              'Praktika account connected',
              'Praktika Account'
            );
            if(!this.data?.clinic_id){
              this.dialogRef.close({ customer_user, customer_secret });
            }else{
              this.customers = response.response?.data?.customers;
              this.form.controls['customer_id'].setValue(this.customers[0]?.id);
            }
          },
          error: err =>
            this.toastr.error(
              'Failed to connect Praktika account',
              'Praktika Account'
            ),
        });
    }
  }
}
