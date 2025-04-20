import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unsubscribed-page',
  templateUrl: './unsubscribed-page.component.html',
  styleUrls: ['./unsubscribed-page.component.scss'],
})
export class UnsubscribedPageComponent {
  public unsubscribedClinic: any = null;
  constructor(private router: Router) {
    if (router.url === '/newapp/dashboard/unsubscribed') {
      const clinicStr = localStorage.getItem('unsubscribed_clinic');
      this.unsubscribedClinic = clinicStr && JSON.parse(clinicStr);
    } else {
      this.unsubscribedClinic = null;
    }
  }

  getText() {
    if (this.unsubscribedClinic?.has_analytics_subscription && this.unsubscribedClinic?.no_access) {
      return 'Please contact your administrator to grant you access to Jeeve Analytics';
    }
    return 'Upgrade your subscription to include Jeeve Analytics now - book a demo with one of our specialists to learn more';
  }
}
