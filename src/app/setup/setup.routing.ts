import { Routes } from '@angular/router';

import { SetupComponent } from './setup.component';

export const SetupRoutes: Routes = [
  {
    path: '',
    component: SetupComponent,
    data: {
      title: 'Setup',
    },
  },
];
