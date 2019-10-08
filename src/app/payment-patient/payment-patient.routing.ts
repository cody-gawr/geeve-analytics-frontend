import { Routes } from '@angular/router';

import { PaymentPatientComponent } from './payment-patient.component';

export const PaymentPatientRoutes: Routes = [
  {
    path: '',
    component: PaymentPatientComponent,
    data: {
      title: 'Payment Patient'
    }
  }
];
