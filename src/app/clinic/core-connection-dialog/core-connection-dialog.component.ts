import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { ClinicService } from '../clinic.service';
import { SetupService } from '@/app/setup/setup.service';

export interface IApiResponse<T> {
  status: string;
  success?: boolean;
  message: string;
  error?: string;
  count: number;
  data: T;
}

@Component({
  selector: 'app-core-connection-dialog',
  templateUrl: './core-connection-dialog.component.html',
  styleUrls: ['./core-connection-dialog.component.scss'],
})
export class CoreConnectionDialogComponent {
  public clinic_id!: number;
  constructor(
    public dialogRef: MatDialogRef<CoreConnectionDialogComponent>,
    private setupSvc: SetupService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  onSubmit() {
    this.clinic_id = this.data.id;
    this.setupSvc
      .getConnectCoreLink(this.clinic_id)
      .pipe(take(1))
      .subscribe({
        next: response => {
          if (response.status == 200 && response.body.success) {
            console.log(`gtt: in CoreLink, res.body: ${JSON.stringify(response.body)}`);
            const responseURL = response.body.data;
            if (responseURL) {
              var win = window.open(responseURL, 'MsgWindow', 'width=1000,height=800');
              var timer = setInterval(() => {
                if (win?.closed) {
                  this.dialogRef.close('success');
                  clearTimeout(timer);
                }
              }, 1000);
            }
          } else {
            this.toastr.error('Could not retrieve the Core Authoriz URL', 'Core connection');
          }
        },
        error: err => {
          console.log(err);
          this.toastr.error('Could not retrieve the Dentally Authoriz URL', 'Dentally connection');
        },
      });
  }
}
