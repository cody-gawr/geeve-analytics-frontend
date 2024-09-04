import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { ClinicService } from '../clinic.service';

export interface IApiResponse<T> {
    status: string;
    success?: boolean;
    message: string;
    error?: string;
    count: number;
    data: T;
  }

@Component({
  selector: 'app-dentally-connection-dialog',
  templateUrl: './dentally-connection-dialog.component.html',
  styleUrls: ['./dentally-connection-dialog.component.scss']
})
export class DentallyConnectionDialogComponent {
  public clinic_id!: number;
  constructor(
    public dialogRef: MatDialogRef<DentallyConnectionDialogComponent>,
    private clinicSvc: ClinicService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  onSubmit() {
    this.clinic_id = this.data.id;
    this.clinicSvc.getDentallyAuthorizeUrl(this.clinic_id).pipe(take(1))
      .subscribe({
        next: (response: IApiResponse<any>) => {
          if (!response.success) {
            this.toastr.error('Could not retrieve the Dentally Authoriz URL', 'Dentally connection');
          } else {
            const responseURL = response.data;
            if (responseURL) {
              var win = window.open(responseURL, 'MsgWindow', 'width=1000,height=800');
              var timer = setInterval(() => {
                if (win?.closed) {
                  this.dialogRef.close('success');
                  clearTimeout(timer);
                }
              }, 1000);
            }
          }
        },
        error: err => {
          console.log(err);
          this.toastr.error('Could not retrieve the Dentally Authoriz URL', 'Dentally connection');
        },
      });
  }
}

