import { Routes } from '@angular/router';

import { AppHeaderComponent } from './header.component';

export const HeaderRoutes: Routes = [
  {
    path: '',
    component: AppHeaderComponent,
    data: {
      title: 'Header',
    },
  },
];
