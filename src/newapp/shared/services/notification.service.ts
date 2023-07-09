import { Injectable, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService, private zone: NgZone) {}

  showSuccess(message: string) {
    this.zone.run(() => {
      this.toastr.success(message);
    });
  }

  showError(message: string, title: string = ''): void {
    this.zone.run(() => {
      this.toastr.error(message, title);
    });
  }
}
