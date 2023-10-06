import { Routes } from '@angular/router';

import { StepperHeaderComponent } from './header.component';

export const HeaderRoutes: Routes = [
  {
    path: '',
    component: StepperHeaderComponent,
    data: {
      title: 'Header',
    },
  },
];
