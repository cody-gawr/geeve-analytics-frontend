import { Routes } from '@angular/router';

import { SupportComponent } from './support.component';

export const SupportRoutes: Routes = [
  {
    path: '',
    component: SupportComponent,
    data: {
      title: 'Support'
    }
  }
];
