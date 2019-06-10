import { Routes } from '@angular/router';

import { ClinicGoalsComponent } from './clinic-goals.component';

export const ClinicGoalsRoutes: Routes = [
  {
   path: '',
    component: ClinicGoalsComponent,
    data: {
      title: 'Clinic Goals'
    }
  }
];
