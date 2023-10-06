import { Routes } from '@angular/router';

import { DentistGoalsComponent } from './dentist-goals.component';

export const DentistGoalsRoutes: Routes = [
  {
    path: '',
    component: DentistGoalsComponent,
    data: {
      title: 'Dentist Goals',
    },
  },
];
