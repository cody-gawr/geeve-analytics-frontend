import { ClinicService } from '@/newapp/clinic/services/clinic.service';
import { JeeveResponse } from '@/newapp/models/clinic';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
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

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    this.clinic_id = this.data.id;
    this.clinicSvc.getDentallyAuthorizeUrl(this.clinic_id).pipe(take(1))
      .subscribe({
        next: (response: JeeveResponse<any>) => {
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
          this.toastr.error('Could not retrieve the Core Authoriz URL', 'Core connection');
        },
      });
  }
}

