import { Routes } from '@angular/router';

import { StepperComponent } from './stepper.component';

export const StepperRoutes: Routes = [
  {
    path: '',
    component: StepperComponent,
    data: {
      title: 'Stepper'
    }
  }
];
