import { Routes } from '@angular/router';

import { ClinicComponent } from './clinic.component';

export const ClinicRoutes: Routes = [
  {
    path: '',
    component: ClinicComponent,
    data: {
      title: 'Clinic'
    }
  }
];
