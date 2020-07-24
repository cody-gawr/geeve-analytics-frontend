import { Routes } from '@angular/router';

import { StepperAppHeaderComponent } from './header.component';

export const HeaderRoutes: Routes = [
  {
    path: '',
    component: StepperAppHeaderComponent,
    data: {
      title: 'Header'
    }
  }
];
