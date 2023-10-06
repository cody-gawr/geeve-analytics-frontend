import { Routes } from '@angular/router';

import { DentistComponent } from './dentist.component';

export const DentistRoutes: Routes = [
  {
    path: '',
    component: DentistComponent,
    data: {
      title: 'Dentist',
    },
  },
];
