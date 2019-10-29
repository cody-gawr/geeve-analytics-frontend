import { Routes } from '@angular/router';

import { TreatmentsComponent } from './treatments.component';

export const TreatmentsRoutes: Routes = [
  {
    path: '',
    component: TreatmentsComponent,
    data: {
      title: 'Roles Users'
    }
  }
];
