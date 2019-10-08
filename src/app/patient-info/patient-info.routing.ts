import { Routes } from '@angular/router';

import { PatientInfoComponent } from './patient-info.component';

export const PatientInfoRoutes: Routes = [
  {
   path: '',
    component: PatientInfoComponent,
    data: {
      title: 'Patient Detail'
    }
  }
];
