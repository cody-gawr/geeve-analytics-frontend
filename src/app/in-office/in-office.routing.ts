import { Routes } from '@angular/router';

import { InOfficeComponent } from './in-office.component';

export const InOfficeRoutes: Routes = [
  {
    path: '',
    component: InOfficeComponent,
    data: {
      title: 'In Office'
    }
  }
];
