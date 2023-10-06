import { Routes } from '@angular/router';

import { PlansComponent } from './plans.component';

export const PlansRoutes: Routes = [
  {
    path: '',
    component: PlansComponent,
    data: {
      title: 'Plans',
    },
  },
];
