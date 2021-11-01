import { Routes } from '@angular/router';
import { XeroLoginComponent } from './xerologin.component';
export const XeroLoginRoutes: Routes = [
{
    path: '',
    component: XeroLoginComponent,
    data: {
      title: 'Xero Login'
    }
  }
];
