import { Routes } from '@angular/router';

import { ClinicianAnalysisComponent } from './cliniciananalysis/cliniciananalysis.component';
export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cliniciananalysis/:id',
        component: ClinicianAnalysisComponent
      }
     ]
  }
];
