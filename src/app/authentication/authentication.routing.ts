import { Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: '404',
        component: ErrorComponent
      },
      {
        path: 'reset/:id',
        component: ResetComponent
      }
    ]
  }
];
