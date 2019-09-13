import { Routes } from '@angular/router';

import { XeroComponent } from './xero.component';

export const XeroRoutes: Routes = [
  {
    path: '',
    component: XeroComponent,
    data: {
      title: 'Xero'
    }
  }
];
