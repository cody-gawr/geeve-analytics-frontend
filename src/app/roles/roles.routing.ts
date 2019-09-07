import { Routes } from '@angular/router';

import { RolesComponent } from './roles.component';

export const RolesRoutes: Routes = [
  {
   path: '',
    component: RolesComponent,
    data: {
      title: 'Roles'
    }
  }
];
