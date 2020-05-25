import { Routes } from '@angular/router';

import { UpdateCardComponent } from './update-card.component';

export const UpdateCardRoutes: Routes = [
  {
    path: '',
    component: UpdateCardComponent,
    data: {
      title: 'Update Card'
    }
  }
];
