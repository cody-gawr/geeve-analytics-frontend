import { Routes } from '@angular/router';

import { PatientPaymentinfoComponent } from './patient-paymentinfo.component';

export const PatientPaymentinfoRoutes: Routes = [
  {
   path: '',
    component: PatientPaymentinfoComponent,
    data: {
      title: 'Patient Detail'
    }
  }
];
