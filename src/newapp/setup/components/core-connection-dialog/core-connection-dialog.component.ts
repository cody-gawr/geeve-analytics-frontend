import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { JeeveResponse } from '@/newapp/models/clinic';
import { ClinicService } from '@/newapp/clinic/services/clinic.service';

@Component({
  selector: 'app-core-connection-dialog',
  templateUrl: './core-connection-dialog.component.html',
  styleUrls: ['./core-connection-dialog.component.scss']
})
export class CoreConnectionDialogComponent {
  public clinic_id!: number;
  constructor(
    public dialogRef: MatDialogRef<CoreConnectionDialogComponent>,
    private toastr: ToastrService,
    private coreSvc: ClinicService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.clinic_id = this.data.id;
    this.coreSvc.getClinicAuthorizeUrl(this.clinic_id).pipe(take(1))
      .subscribe({
        next: (response: JeeveResponse<any>) => {
          if (!response.success) {
            this.toastr.error('Could not retrieve the Core Authoriz URL', 'Core connection');
          } else {
            const responseURL = response.data;
            if (responseURL) {
              var win = window.open(responseURL, 'MsgWindow', 'width=1000,height=800');
              var timer = setInterval( () => {
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
          this.toastr.error('Could not retrieve the Core Authoriz URL', 'Core connection');
        },
      });
  }
}

