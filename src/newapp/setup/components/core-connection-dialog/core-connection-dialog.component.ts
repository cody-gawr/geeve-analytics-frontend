import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { JeeveResponse } from '@/newapp/models/clinic';
import { ClinicService } from '@/newapp/clinic/services/clinic.service';

@Component({
  selector: 'app-core-connection-dialog',
  templateUrl: './core-connection-dialog.component.html',
  styleUrls: ['./core-connection-dialog.component.scss'],
})
export class CoreConnectionDialogComponent {
  public clinic_id!: number;
  constructor(
    public dialogRef: MatDialogRef<CoreConnectionDialogComponent>,
    private toastr: ToastrService,
    private coreSvc: ClinicService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.LocationData.length > 0) {
      if (this.selectedLocationId) {
        this.setLocationId(this.selectedLocationId);
      } else {
        this.toastr.error('Please select a location', 'Core connection');
      }
    } else {
      this.clinic_id = this.data.id;
      this.coreSvc
        .getClinicAuthorizeUrl(this.clinic_id)
        .pipe(take(1))
        .subscribe({
          next: (response: JeeveResponse<any>) => {
            if (!response.success) {
              this.toastr.error('Could not retrieve the Core Authoriz URL', 'Core connection');
            } else {
              const responseURL = response.data;
              if (responseURL) {
                var win = window.open(responseURL, 'MsgWindow', 'width=1000,height=800');
                var timer = setInterval(() => {
                  if (win?.closed) {
                    // this.dialogRef.close('success');
                    this.getClinicLocations();
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

  public LocationData = [];
  public selectedLocationId = '';

  getClinicLocations() {
    this.coreSvc.getClinicLocations(this.clinic_id).subscribe(res => {
      console.log('res', res);
      if (res.message == 'success') {
        if (res.data.length > 1) {
          this.LocationData = res.data;
        } else {
          this.dialogRef.close('success');
        }
      }
    });
  }

  setLocationId(locationId: string) {
    this.coreSvc.saveCoreLocation(this.clinic_id, locationId).subscribe(res => {
      if (res.message == 'success') {
        this.dialogRef.close('success');
      }
    });
  }
}
