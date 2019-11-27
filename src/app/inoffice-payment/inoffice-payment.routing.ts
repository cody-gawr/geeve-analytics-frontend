import { Routes } from '@angular/router';

import { InofficePaymentComponent } from './inoffice-payment.component';

export const InofficePaymentRoutes: Routes = [
  {
    path: '',
    component: InofficePaymentComponent,
    data: {
      title: 'Inoffice Payment'
    }
  }
];
