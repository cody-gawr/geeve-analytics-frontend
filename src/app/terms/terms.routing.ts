import { Routes } from '@angular/router';

import { TermsComponent } from './terms.component';

export const TermsRoutes: Routes = [
  {
    path: '',
    component: TermsComponent,
    data: {
      title: 'Terms'
    }
  }
];
