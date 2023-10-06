import { Routes } from '@angular/router';

import { RolesUsersComponent } from './roles-users.component';

export const RolesUsersRoutes: Routes = [
  {
    path: '',
    component: RolesUsersComponent,
    data: {
      title: 'Roles Users',
    },
  },
];
