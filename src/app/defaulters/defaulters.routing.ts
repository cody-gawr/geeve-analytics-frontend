import { Routes } from '@angular/router';

import { DefaultersComponent } from './defaulters.component';

export const DefaultersRoutes: Routes = [
  {
    path: '',
    component: DefaultersComponent,
    data: {
      title: 'Defaulters'
    }
  }
];
