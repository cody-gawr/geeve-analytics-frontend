import { Routes } from '@angular/router';

import { ClinicSettingsComponent } from './clinic-settings.component';

export const ClinicSettingsRoutes: Routes = [
  {
   path: '',
    component: ClinicSettingsComponent,
    data: {
      title: 'Clinic Settings'
    }
  }
];
