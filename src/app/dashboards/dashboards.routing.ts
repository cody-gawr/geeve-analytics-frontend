import { Routes } from '@angular/router';

import { ClinicianAnalysisComponent } from './cliniciananalysis/cliniciananalysis.component';
import { ClinicianProceeduresComponent } from './clinicianproceedures/clinicianproceedures.component';

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cliniciananalysis/:id',
        component: ClinicianAnalysisComponent
      },
      {
        path: 'clinicianproceedures/:id',
        component: ClinicianProceeduresComponent
      }
    ]
  }
];
