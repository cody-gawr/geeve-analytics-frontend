import { Routes } from '@angular/router';

import { InOfficeHistoryComponent } from './in-office-history.component';

export const InOfficeHistoryRoutes: Routes = [
  {
   path: '',
    component: InOfficeHistoryComponent,
    data: {
      title: 'In-Office History'
    }
  }
];
