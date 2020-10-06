import { Routes } from '@angular/router';

import { PlanpaymentComponent } from './planpayment.component';

export const PlanpaymentRoutes: Routes = [
  {
    path: '',
    component: PlanpaymentComponent,
    data: {
      title: 'Planpayment'
    }
  }
];
