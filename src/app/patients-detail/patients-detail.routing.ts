import { Routes } from '@angular/router';

import { PatientsDetailComponent } from './patients-detail.component';

export const PatientsDetailRoutes: Routes = [
  {
    path: '',
    component: PatientsDetailComponent,
    data: {
      title: 'PatientsDetail'
    }
  }
];
