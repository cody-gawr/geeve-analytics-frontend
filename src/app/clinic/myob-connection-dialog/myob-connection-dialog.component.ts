import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { ClinicSettingsService } from '@/app/clinic-settings/clinic-settings.service';

@Component({
  selector: 'app-myob-connection-dialog',
  templateUrl: './myob-connection-dialog.component.html',
  styleUrls: ['./myob-connection-dialog.component.scss']
})
export class MyobConnectionDialogComponent {
  public clinic_id!: number;
  constructor(
    public dialogRef: MatDialogRef<MyobConnectionDialogComponent>,
    private clinicSvc: ClinicSettingsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  onSubmit() {
    this.clinic_id = this.data.id;
    this.clinicSvc.getMyobLink(this.clinic_id).pipe(take(1))
      .subscribe({
        next: (response) => {
            if (response.status == 200) {
                console.log(
                  `gtt: in getmyoblink, res.body: ${JSON.stringify(response.body)}`
                );
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
            }else{
                this.toastr.error('Could not retrieve the Myob Authoriz URL', 'Myob connection');
            }
        },
        error: err => {
          console.log(err);
          this.toastr.error('Could not retrieve the Myob Authoriz URL', 'Myob connection');
        },
      });
  }
}

