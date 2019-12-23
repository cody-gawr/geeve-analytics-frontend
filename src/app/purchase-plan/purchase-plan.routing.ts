import { Routes } from '@angular/router';

import { PurchasePlanComponent } from './purchase-plan.component';

export const PurchasePlanRoutes: Routes = [
  {
    path: '',
    component: PurchasePlanComponent,
    data: {
      title: 'Purchase Plan'
    }
  }
];
