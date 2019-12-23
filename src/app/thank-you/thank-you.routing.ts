import { Routes } from '@angular/router';

import { ThankYouComponent } from './thank-you.component';

export const ThankYouRoutes: Routes = [
  {
    path: '',
    component: ThankYouComponent,
    data: {
      title: 'Thank You'
    }
  }
];
